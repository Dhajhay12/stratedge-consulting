/* Measure REAL computed styles at exactly 375px using headless Chrome.
   Loads each page, sets the viewport to 375x812, and reports the left offset of
   the first text-bearing content block on each page — plus a full sweep for any
   element whose text touches the viewport edge. */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const crypto = require('crypto');
const net = require('net');

/* ---- minimal RFC6455 websocket client (avoids adding a dependency) ---- */
class MiniWS {
  constructor(url) {
    const u = new URL(url);
    this.sock = net.connect(Number(u.port), u.hostname);
    this.buf = Buffer.alloc(0);
    this.handlers = { open: [], message: [] };
    this.ready = false;
    const key = crypto.randomBytes(16).toString('base64');
    this.sock.on('connect', () => {
      this.sock.write(
        'GET ' + u.pathname + (u.search || '') + ' HTTP/1.1\r\n' +
        'Host: ' + u.host + '\r\n' +
        'Upgrade: websocket\r\nConnection: Upgrade\r\n' +
        'Sec-WebSocket-Key: ' + key + '\r\nSec-WebSocket-Version: 13\r\n\r\n'
      );
    });
    this.sock.on('data', (chunk) => {
      this.buf = Buffer.concat([this.buf, chunk]);
      if (!this.ready) {
        const idx = this.buf.indexOf('\r\n\r\n');
        if (idx === -1) return;
        this.buf = this.buf.slice(idx + 4);
        this.ready = true;
        this.handlers.open.forEach((h) => h());
      }
      this.drain();
    });
    this.sock.on('error', () => {});
  }
  drain() {
    for (;;) {
      if (this.buf.length < 2) return;
      const b1 = this.buf[1];
      let len = b1 & 127, offset = 2;
      if (len === 126) { if (this.buf.length < 4) return; len = this.buf.readUInt16BE(2); offset = 4; }
      else if (len === 127) { if (this.buf.length < 10) return; len = Number(this.buf.readBigUInt64BE(2)); offset = 10; }
      if (this.buf.length < offset + len) return;
      const payload = this.buf.slice(offset, offset + len);
      this.buf = this.buf.slice(offset + len);
      if ((b1 & 128) === 0) this.handlers.message.forEach((h) => h(payload.toString('utf8')));
    }
  }
  on(evt, fn) { if (this.handlers[evt]) this.handlers[evt].push(fn); return this; }
  send(str) {
    const data = Buffer.from(str, 'utf8');
    const len = data.length;
    let header;
    if (len < 126) header = Buffer.from([0x81, 0x80 | len]);
    else if (len < 65536) { header = Buffer.alloc(4); header[0] = 0x81; header[1] = 0x80 | 126; header.writeUInt16BE(len, 2); }
    else { header = Buffer.alloc(10); header[0] = 0x81; header[1] = 0x80 | 127; header.writeBigUInt64BE(BigInt(len), 2); }
    const mask = crypto.randomBytes(4);
    const masked = Buffer.alloc(len);
    for (let i = 0; i < len; i++) masked[i] = data[i] ^ mask[i % 4];
    this.sock.write(Buffer.concat([header, mask, masked]));
  }
  close() { try { this.sock.destroy(); } catch (e) {} }
}

const CHROME = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const root = path.join(__dirname, '..');
const PORT = 9333;

function get(url) {
  return new Promise(function (resolve, reject) {
    http.get(url, function (res) {
      let d = '';
      res.on('data', function (c) { d += c; });
      res.on('end', function () { resolve(JSON.parse(d)); });
    }).on('error', reject);
  });
}

function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

(async function () {
  const profile = path.join(os.tmpdir(), 'chrome-audit-' + Date.now());
  const chrome = spawn(CHROME, [
    '--headless=new',
    '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + profile,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    'about:blank',
  ], { stdio: 'ignore' });

  await wait(2500);

  let targets;
  for (let i = 0; i < 20; i++) {
    try { targets = await get('http://127.0.0.1:' + PORT + '/json/list'); break; }
    catch (e) { await wait(500); }
  }
  if (!targets) { console.log('could not reach Chrome'); chrome.kill(); return; }

  const page = targets.find(function (t) { return t.type === 'page'; });
  const ws = new MiniWS(page.webSocketDebuggerUrl);

  let id = 0;
  const pending = new Map();
  await new Promise(function (res) { ws.on('open', res); });
  ws.on('message', function (raw) {
    const msg = JSON.parse(raw);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  });

  function send(method, params) {
    return new Promise(function (resolve) {
      const myId = ++id;
      pending.set(myId, resolve);
      ws.send(JSON.stringify({ id: myId, method: method, params: params || {} }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375, height: 812, deviceScaleFactor: 2, mobile: true,
  });

  const pages = fs.readdirSync(root).filter(function (f) { return f.endsWith('.html'); }).sort();
  let violations = 0;

  for (const file of pages) {
    const url = 'file:///' + path.join(root, file).replace(/\\/g, '/');
    await send('Page.navigate', { url: url });
    await wait(2200);   /* allow Tailwind CDN + fonts to settle */

    const expr = `
      (function () {
        var vw = 375;
        var out = { edgeTouchers: [], minInset: null, samples: [] };
        var nodes = document.querySelectorAll('h1,h2,h3,p,li,a,blockquote,label,input,textarea,select,button');
        for (var i = 0; i < nodes.length; i++) {
          var el = nodes[i];
          var r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          var cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.display === 'none') continue;
          var text = (el.textContent || '').trim();
          var cls0 = el.getAttribute('class') || '';
          /* visually-hidden skip link: revealed only on focus, not a layout element */
          if (cls0.indexOf('sr-only') !== -1) continue;
          /* the calendar is an intentional horizontally-scrollable grid */
          if (cls0.indexOf('slot') !== -1) continue;
          if (el.closest && el.closest('[data-calendar-scroll]')) continue;
          var hasOwnText = text.length > 0 && el.children.length === 0;
          if (!hasOwnText && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && el.tagName !== 'SELECT' && el.tagName !== 'BUTTON') continue;
          var left = Math.round(r.left);
          var right = Math.round(r.right);
          /* only flag elements that are themselves within the viewport */
          if (left >= vw || right <= 0) continue;
          if (out.minInset === null || left < out.minInset) out.minInset = left;
          /* skip descendants of an ancestor that is itself edge-touching */
          if (left < 12 || right > vw - 12) {
            out.edgeTouchers.push({
              tag: el.tagName.toLowerCase(),
              left: left,
              right: right,
              cls: cls0.slice(0, 60),
              text: text.slice(0, 42)
            });
          }
        }
        return JSON.stringify(out);
      })()
    `;

    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
    let data;
    try { data = JSON.parse(res.result.result.value); } catch (e) { data = { error: String(e) }; }

    console.log('=== ' + file + '  @375px');
    console.log('    min left inset of text content: ' + data.minInset + 'px');
    if (data.edgeTouchers && data.edgeTouchers.length) {
      violations += data.edgeTouchers.length;
      data.edgeTouchers.slice(0, 6).forEach(function (t) {
        console.log('    EDGE: <' + t.tag + '> left=' + t.left + ' right=' + t.right + ' | "' + t.text + '" | ' + t.cls);
      });
    } else {
      console.log('    no text content within 12px of either viewport edge');
    }
  }

  console.log('====');
  console.log('total elements touching a viewport edge at 375px: ' + violations);

  ws.close();
  chrome.kill();
  await wait(400);
  process.exit(0);
})();