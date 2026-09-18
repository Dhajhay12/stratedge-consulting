/* Audit: verify every TOP-LEVEL content container has mobile horizontal padding.
   Nested elements (p, blockquote, inner divs) inherit padding from an ancestor
   container and are correctly excluded.

   Strategy: walk the HTML tracking element nesting. A container is "top-level"
   when its nearest enclosing element that has a max-w-* class is itself, or when
   no max-w-* ancestor exists. That's the element responsible for insetting content
   from the viewport edge at 375px. */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const SPACING = { '0': 0, '1': 4, '2': 8, '3': 12, '4': 16, '5': 20, '6': 24, '7': 28, '8': 32, '10': 40, '12': 48, '14': 56, '16': 64 };

function paddingAt375(cls) {
  let px = null;
  cls.split(/\s+/).forEach(function (c) {
    const m = c.match(/^px-(.+)$/);
    if (!m) return;
    if (/^(sm|md|lg|xl):/.test(c)) return;          // inactive at 375px
    const token = m[1];
    if (token.indexOf('[') === 0) px = parseFloat(token.replace(/[^0-9.]/g, ''));
    else if (SPACING[token] !== undefined) px = SPACING[token];
  });
  return px;
}

const VOID = new Set(['br','hr','img','input','meta','link','source','area','base','col','embed','track','wbr']);

function auditPage(file) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  /* strip comments so commented-out containers don't count */
  const clean = html.replace(/<!--[\s\S]*?-->/g, '');
  const tagRe = /<(\/?)([a-zA-Z0-9]+)([^>]*?)(\/?)>/g;
  const stack = [];
  let m;
  const offenders = [];

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
    const hasMaxW = /max-w-(6xl|5xl|4xl|3xl|2xl|prose|xl)(?![a-z0-9-])/.test(cls);

    if (hasMaxW) {
      /* is this the outermost max-w container on the stack? */
      const nested = stack.some(function (s) { return s.hasMaxW; });
      const isRule = /rule-brass/.test(cls);
      /* Leaf text elements (p/blockquote/li/headings) are not layout containers:
         they always inherit their inset from an ancestor wrapper, so they must
         never be reported as "missing padding". */
      const isLeafText = ['p', 'blockquote', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figcaption', 'span'].indexOf(tag) !== -1;
      if (!nested && !isRule && !isLeafText) {
        const px = paddingAt375(cls);
        if (px === null || px < 16) {
          const lineNo = clean.slice(0, m.index).split(/\r?\n/).length;
          offenders.push({ line: lineNo, px: px, cls: cls.slice(0, 70), tag: tag });
        }
      }
      stack.push({ tag: tag, hasMaxW: true });
    } else if (!selfClose) {
      stack.push({ tag: tag, hasMaxW: false });
    }
    if (selfClose) stack.pop();
  }
  return offenders;
}

let totalOffenders = 0;
const pages = fs.readdirSync(root).filter(function (f) { return f.endsWith('.html'); });

pages.forEach(function (file) {
  const offenders = auditPage(file);
  offenders.forEach(function (o) {
    totalOffenders++;
    console.log('  MISSING  ' + file + ':' + o.line + '  px=' + o.px + '  <' + o.tag + ' class="' + o.cls + '">');
  });
});

console.log('====');
console.log('pages checked: ' + pages.length + '  (' + pages.sort().join(', ') + ')');
console.log('top-level content containers with < 16px mobile padding: ' + totalOffenders);