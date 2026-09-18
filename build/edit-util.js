/* Build helper: small mechanical text substitutions across build sources. */
const fs = require('fs');
const path = require('path');

function replaceIn(file, pairs) {
  const full = path.join(__dirname, file);
  let t = fs.readFileSync(full, 'utf8');
  pairs.forEach(function (pair) {
    const n = t.split(pair[0]).length - 1;
    t = t.split(pair[0]).join(pair[1]);
    console.log(file, '|', n, 'x', pair[0].slice(0, 60));
  });
  fs.writeFileSync(full, t, 'utf8');
}

module.exports = { replaceIn };