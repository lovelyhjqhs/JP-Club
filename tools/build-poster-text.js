/*
 * 把 tools/poster-text-ocr.ps1 生成的 TSV 转换成 yyh.html 使用的搜索索引 poster-text.js
 *
 * 用法：node tools/build-poster-text.js .tmp-poster-text.txt poster-text.js
 */
const fs = require('fs');
const path = require('path');

const tsvPath = path.resolve(process.argv[2] || '.tmp-poster-text.txt');
const outPath = path.resolve(process.argv[3] || 'poster-text.js');
const manualPath = path.join(__dirname, 'poster-text-manual.json');

const clean = text => (text || '')
  .replace(/\s+/g, '')
  .replace(/[，。、；：？！“”‘’（）《》…—·,.!?;:"'()<>\-]/g, '');

const rows = fs.readFileSync(tsvPath, 'utf8')
  .replace(/^\uFEFF/, '')
  .split(/\r?\n/)
  .filter(Boolean)
  .map(line => line.split('\t'));

const byClass = {};
const empty = [];

for (const [file, , text] of rows) {
  const code = (file.match(/(\d{4})/) || [])[1];
  if (!code) continue;
  const cleaned = clean(text);
  if (!cleaned) { empty.push(file); continue; }
  byClass[code] = (byClass[code] || '') + cleaned;
}

// Hand-entered poster text (for posters whose lettering OCR cannot read)
const manual = fs.existsSync(manualPath)
  ? JSON.parse(fs.readFileSync(manualPath, 'utf8'))
  : {};
for (const code of Object.keys(manual)) {
  byClass[code] = clean(manual[code]) + (byClass[code] || '');
}

const header = [
  '/*',
  ' * 游园会海报文字索引（供 yyh.html 搜索使用）',
  ' *',
  ' * 本文件由 tools/poster-text-ocr.ps1 + tools/build-poster-text.js 自动生成，',
  ' * 仅用于让搜索能命中海报上的文字，不直接展示给访客。',
  ' * 海报更新后重新生成即可：',
  ' *   powershell -NoProfile -ExecutionPolicy Bypass -File tools/poster-text-ocr.ps1 -Root "海报(1)" -Out ".tmp-poster-text.txt"',
  ' *   node tools/build-poster-text.js .tmp-poster-text.txt poster-text.js',
  ' *',
  ' * 键为班级编号，值为该班各张海报识别出的文字（已去除空格与标点）。',
  ' * 手工补充的文案（艺术字海报等）放在 tools/poster-text-manual.json，重新生成时会自动合并。',
  ' */',
  'window.YYH_POSTER_TEXT = {'
].join('\n');

const body = Object.keys(byClass)
  .sort()
  .map(code => '  "' + code + '": "' + byClass[code].replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"')
  .join(',\n');

fs.writeFileSync(outPath, header + '\n' + body + '\n};\n', 'utf8');

console.log('classes: ' + Object.keys(byClass).length);
if (Object.keys(manual).length) console.log('manual entries merged: ' + Object.keys(manual).sort().join(', '));
if (empty.length) console.log('no text recognised: ' + empty.join(', '));
console.log('wrote ' + path.basename(outPath));
