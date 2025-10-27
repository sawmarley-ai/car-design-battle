// frontend/scripts/check_and_strip_bom.js
const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) scanDir(full);
    else {
      if (!full.endsWith('.ts') && !full.endsWith('.tsx') && !full.endsWith('.js') && !full.endsWith('.jsx')) continue;
      const buf = fs.readFileSync(full);
      if (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
        console.log('BOM found and removed in:', full);
        fs.writeFileSync(full, buf.slice(3));
      }
    }
  }
}

const src = path.join(__dirname, '..', 'src');
if (fs.existsSync(src)) scanDir(src);
else console.error('No src directory found at', src);
