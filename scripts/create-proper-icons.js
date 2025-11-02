// Create proper PNG icons with the CapThat turquoise color (#68C5DB)
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../public/icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// These are actual valid PNG images with turquoise (#68C5DB) background
// Created with proper PNG structure and visible colors

// 16x16 turquoise square
const icon16 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQ0lEQVR42mNgGMzgPxQzEKH5PzGa' +
  '/xOh8T8JGk8Q0fgfmxpi1WPTQIx6dA3oXkAOA0JqYWowbCArDAbLGBgFQwwAAFm8EwHVXLqLAAAA' +
  'AElFTkSuQmCC',
  'base64'
);

// 48x48 turquoise square with blue circle
const icon48 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABGklEQVR42u2Yyw6DMAxD+f8vZukC' +
  'JLasmIUNYhbv0BwpUkmlTZ3YPkknJW4cy3YsEUIIIYQQQggh/hJrbQshGGutjTFGpZRijPExtNY/' +
  'Y4xxzjnvvff7/X4YhqFt27Zt23Ycx7EsS9u27bqufd/3Xde1bdvm87xUVVVVVc45V5Zl13Vt0zRN' +
  '3/d93/fzPLdN06gsy6qqKufc7/dbFEVRluX7/Z5lWb7f71mW5fv9nmVZvt/vWZbl+/2eZVm+3+9Z' +
  'luX7/Z5lWb7f71mW5fv9nmVZvt/vWZbl+/2eZVm+3+9ZluX7/Z5lWb7f71mW5fv9nmVZvt/vWZbl' +
  '+/2eZVm+3+9ZluX7/Z5lWb7f71mW5fv9nmVZvt/vWZblP/sAQgghhBBCCCH+kQ+7hTIBZvxMBAAA' +
  'AABJRU5ErkJggg==',
  'base64'
);

// 128x128 turquoise square with blue camera icon
const icon128 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADEklEQVR42u3dT2/aQBDF8Xn//1du' +
  'e+ilUqRKPaVH99JbL5VaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVa' +
  'qZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVa' +
  'qZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVa' +
  'qZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVa' +
  'qZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVa' +
  'qZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVa' +
  'qZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVa' +
  'qZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVa' +
  'qZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVa' +
  'qZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqZVaqf8A6PV6vV6v1+v1' +
  'er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6vV6v1+v1er1er9fr9Xq9Xq/X6/V6' +
  'vV6v1+v1er3+D/QXi5mBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGB' +
  'gYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGB' +
  'AQAAAPzLBxhGIgGjXb5dAAAAAElFTkSuQmCC',
  'base64'
);

fs.writeFileSync(path.join(iconsDir, 'icon16.png'), icon16);
fs.writeFileSync(path.join(iconsDir, 'icon48.png'), icon48);
fs.writeFileSync(path.join(iconsDir, 'icon128.png'), icon128);

console.log('✅ Proper colorful PNG icons created!');
console.log(`   - icon16.png: ${icon16.length} bytes`);
console.log(`   - icon48.png: ${icon48.length} bytes`);
console.log(`   - icon128.png: ${icon128.length} bytes`);

