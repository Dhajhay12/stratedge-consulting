/* Reads the ACTUAL computed padding-left/right of the specific containers
   named in the bug report, at 375px. */
const { spawn } = require('child_process');
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
const PORT = 9337;
const root = path.join(__dirname, '..');

(async function () {
  const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + path.join(os.tmpdir(), 'strat-cs-' + Date.now()),
    '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: 'ignore' });
  await wait(2500);
  let targets;
  for (let i = 0; i < 20; i++) { try { targets = await get('http://127.0.0.1:' + PORT + '/json/list'); break; } catch (e) { await wait(500); } }
  const page = JSON.parse(targets).find(function (t) { return t.type === 'page'; });
  const ws = new MiniWS(page.webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  await new Promise(function (r) { ws.on('open', r); });
  ws.on('message', function (raw) { const m = JSON.parse(raw); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  function send(m, p) { return new Promise(function (res) { const my = ++id; pending.set(my, res); ws.send(JSON.stringify({ id: my, method: m, params: p || {} })); }); }
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true, screenWidth: 375, screenHeight: 812 });

  const jobs = [
    ['services.html', '#business-strategy', 'Business Strategy article'],
    ['services.html', '#market-research', 'Market Research article'],
    ['services.html', '#process-optimization', 'Process Optimization article'],
    ['services.html', '#startup-consulting', 'Startup Consulting article'],
    ['case-studies.html', '#regional-retail', 'Case study 1'],
    ['case-studies.html', '#b2b-saas', 'Case study 2'],
    ['case-studies.html', '#regional-healthcare', 'Case study 3'],
  ];

  for (const file of ['services.html', 'case-studies.html']) {
    await send('Page.navigate', { url: 'file:///' + path.join(root, file).replace(/\\/g, '/') });
    await wait(2200);
    console.log('\n==== ' + file + ' @375px ====');
    for (const [f, sel, label] of jobs.filter(function (j) { return j[0] === file; })) {
      const expr = `(function(){
        var el = document.querySelector('${sel}');
        if (!el) return JSON.stringify({ missing: true });
        var cs = getComputedStyle(el);
        var r = el.getBoundingClientRect();
        var h2 = el.querySelector('h2');
        var p = el.querySelector('p');
        var li = el.querySelector('li');
        return JSON.stringify({
          padL: cs.paddingLeft, padR: cs.paddingRight,
          boxLeft: Math.round(r.left), boxWidth: Math.round(r.width),
          h2Left: h2 ? Math.round(h2.getBoundingClientRect().left) : null,
          pLeft: p ? Math.round(p.getBoundingClientRect().left) : null,
          liLeft: li ? Math.round(li.getBoundingClientRect().left) : null
        });
      })()`;
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      const d = JSON.parse(res.result.result.value);
      if (d.missing) { console.log('  ' + label + ' -> NOT FOUND'); continue; }
      console.log('  ' + label);
      console.log('        padding-left=' + d.padL + '  padding-right=' + d.padR);
      console.log('        <article> box left=' + d.boxLeft + ' w=' + d.boxWidth + '   h2.left=' + d.h2Left + '  p.left=' + d.pLeft + '  li.left=' + d.liLeft);
    }
  }
  ws.close(); chrome.kill();
})();