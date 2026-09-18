/* Measure the SAME metrics at several viewport widths, with a coarse
   "gutter color" reading so we can tell a real padding fix from a
   measurement artifact. Also isolates WHY about.html reported null. */
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { MiniWS } = require('./mini-ws.js');

function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
function get(url) {
  return new Promise(function (resolve, reject) {
    http.get(url, function (res) {
      let b = '';
      res.on('data', function (d) { b += d; });
      res.on('end', function () { resolve(b); });
    }).on('error', reject);
  });
}

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9333;
const WIDTHS = [375, 414, 768, 1440];
const root = path.join(__dirname, '..');

(async function () {
  const userDir = path.join(require('os').tmpdir(), 'strat-mb-' + Date.now());
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + userDir, '--no-first-run', '--allow-file-access-from-files', 'about:blank',
  ], { stdio: 'ignore' });

  await wait(2500);

  let targets;
  for (let i = 0; i < 20; i++) {
    try { targets = await get('http://127.0.0.1:' + PORT + '/json/list'); break; } catch (e) { await wait(500); }
  }
  if (!targets) { console.log('could not reach Chrome (set CHROME_PATH)'); chrome.kill(); return; }

  const page = JSON.parse(targets).find(function (t) { return t.type === 'page'; });
  const ws = new MiniWS(page.webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  await new Promise(function (res) { ws.on('open', res); });
  ws.on('message', function (raw) {
    const m = JSON.parse(raw);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  function send(method, params) {
    return new Promise(function (resolve) { const my = ++id; pending.set(my, resolve); ws.send(JSON.stringify({ id: my, method: method, params: params || {} })); });
  }
  await send('Page.enable'); await send('Runtime.enable');

  const files = fs.readdirSync(root).filter(function (f) { return f.endsWith('.html'); }).sort();
  const totalByWidth = {};

  for (const w of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768,
      screenWidth: w, screenHeight: 900,
    });
    // Force the CSS layout viewport to the requested width, otherwise a
    // mobile emulation uses a 980px default and every measurement is wrong.
    await send('Emulation.setPageScaleFactor', { pageScaleFactor: 1 });
    console.log('\n######## viewport ' + w + 'px ########');
    let total = 0;
    for (const file of files) {
      const url = 'file:///' + path.join(root, file).replace(/\\/g, '/');
      await send('Page.navigate', { url: url });
      await wait(2000);
      const expr = `(function(){
        var vw = ${w};
        var out = { min: null, count: 0, sample: null, kinds: {} };
        var nodes = document.querySelectorAll('h1,h2,h3,h4,p,li,blockquote,label,input,textarea,select,button,span,a');
        for (var i=0;i<nodes.length;i++){
          var el = nodes[i], r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          var cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.display === 'none') continue;
          var c = el.getAttribute('class') || '';
          if (c.indexOf('sr-only') !== -1) continue;
          if (c.indexOf('slot') !== -1) continue;
          if (el.closest && el.closest('[data-calendar-scroll]')) continue;
          var txt = (el.textContent || '').trim();
          var own = (txt.length > 0 && el.children.length === 0) || ['INPUT','TEXTAREA','SELECT','BUTTON'].indexOf(el.tagName) !== -1;
          if (!own) continue;
          var l = Math.round(r.left), rt = Math.round(r.right);
          if (l >= vw || rt <= 0) continue;
          out.count++;
          if (out.min === null || l < out.min) { out.min = l; out.sample = el.tagName.toLowerCase() + ' | ' + txt.slice(0,34); }
          var k = el.tagName.toLowerCase();
          if (l < 12 || rt > vw - 12) { out.kinds[k] = (out.kinds[k]||0)+1; out.offenders = out.offenders || []; out.offenders.push(k + ' left=' + l + ' right=' + rt + ' | "' + txt.slice(0,40) + '" | ' + c.slice(0,70)); }
        }
        out.vw = document.documentElement.clientWidth;
        out.iw = window.innerWidth;
        return JSON.stringify(out);
      })()`;
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      let d; try { d = JSON.parse(res.result.result.value); } catch (e) { d = { min: 'ERR', kinds: {} }; }
      const bad = Object.keys(d.kinds || {}).reduce(function (a, k) { return a + d.kinds[k]; }, 0);
      total += bad;
      console.log('  ' + file.padEnd(28) + ' measured=' + String(d.count).padStart(4) + '  minInset=' + String(d.min).padStart(5) + 'px  edgeViolations=' + bad + '  [clientW=' + d.vw + ']');
      (d.offenders || []).forEach(function (o) { console.log('        OFFENDER ' + o); });
    }
    totalByWidth[w] = total;
  }

  console.log('\n######## summary: elements within 12px of an edge ########');
  WIDTHS.forEach(function (w) { console.log('  ' + w + 'px  ->  ' + totalByWidth[w] + ' violations'); });

  ws.close(); chrome.kill();
})();