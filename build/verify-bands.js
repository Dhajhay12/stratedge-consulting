/* Confirms two things the padding fix must not have broken:
   1. tinted full-bleed bands still span the full viewport width
   2. their TEXT is still inset by the gutter
   3. document.scrollWidth never exceeds the viewport (no h-scroll) */
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');
const os = require('os');
const { MiniWS } = require('./mini-ws.js');

function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
function get(url) {
  return new Promise(function (resolve, reject) {
    http.get(url, function (res) { let b = ''; res.on('data', function (d) { b += d; }); res.on('end', function () { resolve(b); }); }).on('error', reject);
  });
}

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9335;
const root = path.join(__dirname, '..');

(async function () {
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + path.join(os.tmpdir(), 'strat-tint-' + Date.now()),
    '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
  await wait(2500);

  let targets;
  for (let i = 0; i < 20; i++) { try { targets = await get('http://127.0.0.1:' + PORT + '/json/list'); break; } catch (e) { await wait(500); } }
  if (!targets) { console.log('no chrome'); chrome.kill(); return; }
  const page = JSON.parse(targets).find(function (t) { return t.type === 'page'; });
  const ws = new MiniWS(page.webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  await new Promise(function (r) { ws.on('open', r); });
  ws.on('message', function (raw) { const m = JSON.parse(raw); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  function send(method, params) { return new Promise(function (res) { const my = ++id; pending.set(my, res); ws.send(JSON.stringify({ id: my, method: method, params: params || {} })); }); }
  await send('Page.enable'); await send('Runtime.enable');

  const files = ['index.html', 'about.html', 'services.html', 'case-studies.html', 'blog.html', 'contact.html'];

  for (const w of [375, 768]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768, screenWidth: w, screenHeight: 900 });
    console.log('\n==== ' + w + 'px ====');
    for (const file of files) {
      await send('Page.navigate', { url: 'file:///' + path.join(root, file).replace(/\\/g, '/') });
      await wait(2000);
      const expr = `(function(){
        var vw = document.documentElement.clientWidth;
        var out = { vw: vw, scrollW: document.documentElement.scrollWidth, bands: [], tintedTextMin: null };
        var all = document.querySelectorAll('section,div,footer,header');
        for (var i=0;i<all.length;i++){
          var el = all[i];
          var cls = el.getAttribute('class') || '';
          if (cls.indexOf('surface-tint') === -1 && cls.indexOf('bg-navy-9') === -1 && cls.indexOf('bg-stone') === -1) continue;
          var r = el.getBoundingClientRect();
          if (r.width < 200) continue;
          var kids = el.querySelectorAll('h1,h2,h3,p,li');
          var inset = null;
          for (var j=0;j<kids.length;j++){
            var k = kids[j].getBoundingClientRect();
            if (k.width === 0) continue;
            var d = Math.round(k.left);
            if (inset === null || d < inset) inset = d;
          }
          out.bands.push((cls.split(' ')[0]) + ' W=' + Math.round(r.width) + ' textInset=' + inset);
        }
        return JSON.stringify(out);
      })()`;
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      const d = JSON.parse(res.result.result.value);
      const ok = d.scrollW <= d.vw + 1 ? 'NO-HSCROLL' : 'HSCROLL! ' + d.scrollW;
      console.log('  ' + file.padEnd(20) + d.vw + 'px viewport -> scrollWidth ' + d.scrollW + '  [' + ok + ']');
      d.bands.slice(0, 5).forEach(function (b) { console.log('        ' + b); });
    }
  }

  ws.close(); chrome.kill();
})();