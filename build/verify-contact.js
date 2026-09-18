/* Verify the two contact.html findings by walking their full ancestor chain.
   A nested element is fine if ANY ancestor is a padded container or the element
   (or an ancestor) carries its own padding utility. */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const VOID = new Set(['br','hr','img','input','meta','link','source','area','base','col','embed','track','wbr']);
const PADDED = /(^|\s)(p|px|py|pt|pr|pb|pl)-[1-9]/;

function chainFor(file, targetLine) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const clean = html.replace(/<!--[\s\S]*?-->/g, '');
  const tagRe = /<(\/?)([a-zA-Z0-9]+)([^>]*?)(\/?)>/g;
  const stack = [];
  let m;
  let startIndex = 0;
  const lines = clean.split(/\r?\n/);
  for (let i = 0; i < targetLine - 1; i++) startIndex += lines[i].length + 1;

  while ((m = tagRe.exec(clean)) !== null) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const attrs = m[3] || '';
    const selfClose = m[4] === '/' || VOID.has(tag);

    if (closing) {
      const idx = stack.map(function (s) { return s.tag; }).lastIndexOf(tag);
      if (idx >= 0) stack.length = idx;
      continue;
    }
    const clsMatch = attrs.match(/class="([^"]*)"/);
    const cls = clsMatch ? clsMatch[1] : '';
    if (m.index <= startIndex && m.index + m[0].length >= startIndex) {
      return { nestedChain: stack.map(function (s) { return { tag: s.tag, cls: s.cls }; }) };
    }
    if (!selfClose) stack.push({ tag: tag, cls: cls });
    else stack.pop();
  }
  return { nestedChain: [] };
}

[['contact.html', 155], ['contact.html', 169]].forEach(function (pair) {
  const info = chainFor(pair[0], pair[1]);
  console.log('--- ' + pair[0] + ':' + pair[1]);
  info.nestedChain.forEach(function (a) {
    const pad = PADDED.test(a.cls) ? '  <-- has own padding' : '';
    console.log('    ancestor <' + a.tag + ' class="' + a.cls.slice(0, 78) + '">' + pad);
  });
  const anyPadded = info.nestedChain.some(function (a) { return PADDED.test(a.cls); });
  console.log('    => covered by an ancestor padding utility: ' + anyPadded);
});