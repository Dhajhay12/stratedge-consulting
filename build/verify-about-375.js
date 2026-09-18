/* Focused verification: about.html at 375px, measured several times, reporting the
   left inset of every distinct content block across all sections. */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { MiniWS } = require('./mini-ws.js');

const CHROME = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const root = path.join(__dirname, '..');
const PORT = 9346;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async function () {
  const profile = path.join(require('os').tmpdir(), 'chr-about-' + Date.now());
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile, 'about:blank',
  ], { stdio: 'ignore' });

  await wait(2500);
  const targets = await new Promise((resolve, reject) => {
    require('http').get({ host: '127.0.0.1', port: PORT, path: '/json/list' }, (res) => {
      let b = ''; res.on('data', (c) => (b += c)); res.on('end', () => resolve(b));
    }).on('error', reject);
  });
  const page = JSON.parse(targets).find((t) => t.type === 'page');
  const ws = new MiniWS(page.webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  await new Promise((res) => ws.on('open', res));
  ws.on('message', (raw) => {
    const m = JSON.parse(raw);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const send = (method, params) => new Promise((resolve) => {
    const my = ++id; pending.set(my, resolve);
    ws.send(JSON.stringify({ id: my, method, params: params || {} }));
  });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375, height: 812, deviceScaleFactor: 1, mobile: true, screenWidth: 375, screenHeight: 812,
  });

  const url = 'file:///' + path.join(root, 'about.html').replace(/\\/g, '/');

  for (let pass = 1; pass <= 3; pass++) {
    await send('Page.navigate', { url });
    await wait(2200);
    const expr = `(function(){
      var vw = document.documentElement.clientWidth;
      var out = { clientW: vw, scrollW: document.documentElement.scrollWidth, blocks: [], min: null };
      var nodes = document.querySelectorAll('h1,h2,h3,p,li,blockquote,label,input,textarea,select,button,figcaption');
      for (var i=0;i<nodes.length;i++){
        var el = nodes[i], r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        var cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        var txt = (el.textContent || '').trim();
        if (!txt) continue;
        var l = Math.round(r.left), rt = Math.round(r.right);
        out.blocks.push(el.tagName.toLowerCase() + ' left=' + l + ' right=' + rt + ' :: ' + txt.slice(0,40));
        if (out.min === null || l < out.min) out.min = l;
      }
      out.total = out.blocks.length;
      return JSON.stringify(out);
    })()`;
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
    const d = JSON.parse(res.result.result.value);
    console.log('--- pass ' + pass + ' about.html @375px ---');
    console.log('    clientW=' + d.clientW + '  scrollW=' + d.scrollW +
                '  textBlocks=' + d.total + '  minLeftInset=' + d.min + 'px');
    const tight = d.blocks.filter((b) => {
      const m = b.match(/left=(-?\d+)/); return m && Number(m[1]) < 16;
    });
    console.log('    blocks with left inset < 16px: ' + tight.length);
    tight.slice(0, 8).forEach((t) => console.log('        ' + t));
  }

  ws.close(); chrome.kill();
})();