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

// Function to recursively find all JS files
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith('.js') || file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Update HTML files
const htmlFiles = ['index.html', 'popup.html'].map(f => path.join(outDir, f));
htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    updateFileReferences(file);
  }
});

// Update all JS files in the out directory (including chunks)
const nextDir = path.join(outDir, '_next');
if (fs.existsSync(nextDir)) {
  const jsFiles = findJsFiles(nextDir);
  jsFiles.forEach(file => {
    updateFileReferences(file);
  });
  console.log(`Updated ${jsFiles.length} JS/HTML files`);
}

console.log('✅ Fixed _next references to next/');

