# CapThat Installation Guide

This guide will help you install and run the CapThat Chrome Extension.

## Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Google Chrome browser

## Step-by-Step Installation

### 1. Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including Next.js, React, TypeScript, and other dependencies.

### 2. Build the Extension

Run the build command:

```bash
npm run build:extension
```

Or use the bash script:

```bash
chmod +x scripts/build.sh
./scripts/build.sh
```

This will:
- Generate the extension icons
- Build the Next.js application
- Copy all necessary files to the `out` directory

### 3. Load Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle switch in the top right corner)
4. Click **Load unpacked**
5. Navigate to and select the `out` folder inside your project directory
6. The CapThat extension icon should now appear in your Chrome toolbar!

### 4. Using the Extension

#### Capturing Images

1. Navigate to any website with images
2. Hover over an image to see the "Cap!" button appear in the bottom-right corner
3. Click "Cap!" to save the image
4. You'll see a "Saving..." message, then "Saved!" when complete

#### Managing Your Captures

1. Click the CapThat extension icon in your Chrome toolbar
2. A popup will appear showing all your captured images in a grid
3. Click on images to select them (you'll see a checkbox)
4. Hover over images to see page titles and a delete button

#### Exporting Images

At the bottom of the popup, you'll find four action buttons:

1. **Clear Cap Board** - Delete all captured images (confirmation required)
2. **Export JSON** - Download a JSON file with all capture metadata
3. **Export CapBoard** - Download all images as a ZIP file
4. **Export Individual Caps** - Download only selected images as a ZIP file

## Troubleshooting

### Extension Not Loading

- Make sure Developer mode is enabled
- Check that you selected the `out` folder, not the project root
- Look for errors in the Chrome Extensions page

### Images Not Capturing

- Some websites may block image capture due to CORS policies
- Very small images (< 100x100px) are ignored
- Try refreshing the webpage

### Popup Not Displaying

- Right-click the extension icon and select "Inspect popup" to see console errors
- Make sure the build completed successfully
- Try removing and re-adding the extension

### Build Errors

If you encounter build errors:

```bash
# Clean the build
rm -rf .next out node_modules

# Reinstall dependencies
npm install

# Rebuild
npm run build:extension
```

## Development Mode

To develop the extension:

1. Make your changes to the source code
2. Rebuild: `npm run build:extension`
3. Go to `chrome://extensions/`
4. Click the refresh icon on the CapThat extension card
5. Test your changes

## Updating the Extension

After making code changes:

1. Run `npm run build:extension` again
2. Click the refresh button on the extension in `chrome://extensions/`
3. Your changes are now live!

## File Structure

```
out/                    # Built extension (load this in Chrome)
├── index.html         # Popup interface
├── manifest.json      # Extension configuration
├── content.js         # Content script (adds Cap buttons)
├── content.css        # Content script styles
├── icons/             # Extension icons
└── _next/             # Next.js build files
```

## Need Help?

If you encounter any issues:

1. Check the browser console for errors
2. Check the extension popup console (right-click icon → Inspect)
3. Verify all files are in the `out` directory
4. Make sure you're using a compatible Chrome version
5. Try a fresh build with clean install

## Security & Privacy

- All images are stored locally in Chrome's storage
- No data is sent to external servers
- Images are stored as base64 data URLs
- You can clear all data anytime using "Clear Cap Board"

---

Enjoy using CapThat! 📸

