// Render og.png (1200×630) from copy.json. Run with any node_modules that has sharp:
//   NODE_PATH=/path/to/node_modules node og.mjs
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const copy = JSON.parse(fs.readFileSync(new URL('./copy.json', import.meta.url)));
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

const words = copy.h1.split(' '); const lines = []; let cur = '';
for (const w of words) { if ((cur + ' ' + w).trim().length > 15) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }
lines.push(cur.trim());

const secs = ['build','proj','cozy','sets','lucha','face','nails','dress','gear','wild','do'].map(k => copy.sections[k].title);
const TAPE = '#e3c98a', INK = '#1c1a16', PAPER = '#fbf6ea', MUTED = '#6b6455';

// a roll of masking tape with its end pulled free, drawn flat
const roll = `<g transform="translate(930 250)">
  <circle r="150" fill="${TAPE}"/><circle r="150" fill="none" stroke="#cdb06a" stroke-width="3"/>
  <circle r="112" fill="none" stroke="#d6bb78" stroke-width="2"/><circle r="128" fill="none" stroke="#d6bb78" stroke-width="2"/>
  <circle r="72" fill="#c9b48a"/><circle r="60" fill="${PAPER}"/>
  <path d="M0 150 L250 150 L262 120 L250 96 L60 96 Z" fill="${TAPE}" stroke="#cdb06a" stroke-width="3"/>
  <path d="M250 150 l12 -30 l-12 -24 l10 0 l-6 14 l8 12 l-8 14 l8 14 z" fill="${PAPER}"/>
</g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect y="618" width="1200" height="12" fill="#b3261e"/>
  ${roll}
  <text x="60" y="92" font-family="Helvetica, Arial" font-size="22" letter-spacing="3" fill="${MUTED}">A SHOPPING LOOKBOOK</text>
  ${lines.map((l, i) => `<rect x="52" y="${176 + i * 84}" width="${Math.min(700, l.length * 37 + 20)}" height="30" fill="${TAPE}"/>
  <text x="60" y="${200 + i * 84}" font-family="Georgia, serif" font-weight="bold" font-size="70" fill="${INK}">${esc(l)}</text>`).join('')}
  <text x="60" y="${188 + lines.length * 84}" font-family="Helvetica, Arial" font-size="27" fill="${INK}">Gifts for a boy turning five, each under $75</text>
  ${secs.map((s, i) => `<text x="${60 + (i % 3) * 370}" y="${486 + Math.floor(i / 3) * 24}" font-family="Menlo, monospace" font-size="19" fill="${MUTED}">${esc(s)}</text>`).join('')}
  <text x="60" y="596" font-family="Helvetica, Arial" font-size="22" fill="${MUTED}">drewhoover.com/five-year-old-gift-lookbook</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile(new URL('./og.png', import.meta.url).pathname);
console.log('wrote og.png');
