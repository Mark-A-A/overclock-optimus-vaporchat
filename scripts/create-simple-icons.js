// Create simple colored square PNG icons for CapThat
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../public/icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Simple 16x16 turquoise icon
const icon16 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGklEQVR42mNgGAWjYBSMglEw' +
  'CkbBKBgFAAgAAAQQAAF/TXiOAAAAAElFTkSuQmCC',
  'base64'
);

// Simple 48x48 turquoise icon with blue center
const icon48 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAG0lEQVR42mNgGAWjYBSMglEw' +
  'CkbBKBgFwwgAABEAARE5eUUhAAAAAElFTkSuQmCC',
  'base64'
);

// Simple 128x128 turquoise icon
const icon128 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAHElEQVR42mNgGAWjYBSMglEw' +
  'CkbBKBgFowgAABHAAREI3VroAAAAAElFTkSuQmCC',
  'base64'
);

// Write icons
fs.writeFileSync(path.join(iconsDir, 'icon16.png'), icon16);
fs.writeFileSync(path.join(iconsDir, 'icon48.png'), icon48);
fs.writeFileSync(path.join(iconsDir, 'icon128.png'), icon128);

console.log('✅ Simple PNG icons created successfully!');

