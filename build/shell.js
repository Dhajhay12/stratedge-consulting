/* Build helper: extracts the shared shell (head, header, footer) from index.html
   and assembles the other 9 pages with per-page title/description/content. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const bodyStart = indexHtml.indexOf('<body');
// no-op guard so shell edits stay in sync with index.html
const headPart = indexHtml.slice(0, bodyStart); // through </head>\n
const mainStart = indexHtml.indexOf('<main id="main">');
const headerPart = indexHtml.slice(bodyStart, mainStart); // skip link + header + mobile menu
const footerStart = indexHtml.indexOf('<!-- ============ FOOTER');
const footerPart = indexHtml.slice(footerStart); // footer + scripts + </html>

const DEFAULT_TITLE = 'StratEdge Consulting — Helping Businesses Grow Smarter';
const DEFAULT_DESC = 'StratEdge Consulting is a boutique firm helping growth-stage businesses sharpen strategy, understand their markets, and operate more efficiently.';

function setActive(html, page) {
  // strip current-page marker from Home, add it to the active page's nav links
  let out = html.replace('<a href="index.html" aria-current="page"', '<a href="index.html"');
  if (page !== 'index.html') {
    out = out.replace(new RegExp(`href="${page}" class="link-underline`, 'g'), `href="${page}" aria-current="page" class="link-underline`);
  }
  return out;
}

function buildPage({ file, title, description, content }) {
  let head = headPart
    .replace(`<title>${DEFAULT_TITLE}</title>`, `<title>${title}</title>`)
    .replace(`<meta name="description" content="${DEFAULT_DESC}">`, `<meta name="description" content="${description}">`);
  const header = setActive(headerPart, file);
  const html =
    head +
    header +
    `\n  <main id="main">\n\n` +
    content +
    `\n  </main>\n\n` +
    footerPart;
  fs.writeFileSync(path.join(ROOT, file), html, 'utf8');
  console.log('wrote', file, html.length, 'chars');
}

module.exports = { buildPage, ROOT };
