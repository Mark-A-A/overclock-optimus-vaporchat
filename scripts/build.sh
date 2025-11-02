#!/bin/bash

echo "Building CapThat Chrome Extension..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Generate icons
echo "Generating icons..."
node scripts/generate-icons.js

# Build Next.js app
echo "Building Next.js app..."
npm run build

# Copy necessary files to out directory
echo "Copying extension files..."
cp manifest.json out/
cp -r public/icons out/
cp public/content.js out/
cp public/content.css out/

echo ""
echo "✅ Build complete!"
echo ""
echo "To install the extension in Chrome:"
echo "1. Open Chrome and go to chrome://extensions/"
echo "2. Enable 'Developer mode' in the top right"
echo "3. Click 'Load unpacked'"
echo "4. Select the 'out' folder from this project"
echo ""
echo "The extension is now ready to use!"

