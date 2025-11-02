// Script to fix Next.js _next folder references for Chrome extension compatibility
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');

// Function to recursively update file references
function updateFileReferences(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace _next with next in the content
  const updated = content.replace(/_next\//g, 'next/');
  
  if (updated !== content) {
    fs.writeFileSync(filePath, updated);
    console.log(`Updated: ${path.basename(filePath)}`);
  }
}

// Update HTML files
const htmlFiles = ['index.html', 'popup.html'].map(f => path.join(outDir, f));
htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    updateFileReferences(file);
  }
});

console.log('✅ Fixed _next references to next/');

