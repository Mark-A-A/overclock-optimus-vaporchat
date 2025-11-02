# CapThat! Chrome Extension

A powerful Chrome extension for capturing and managing webpage screenshots with ease.

## Features

- 🎯 **Quick Capture**: Click the "Cap!" button overlay on any image to save it
- 📸 **Image Gallery**: View all captured images in a beautiful grid layout
- 📦 **Export Options**: Export as JSON, download individual images, or export all at once
- 🗑️ **Smart Management**: Delete individual images or clear all captures
- 💾 **Local Storage**: All images stored securely in Chrome's local storage
- 🎨 **Beautiful UI**: Modern, responsive design with a clean color scheme

## Installation

### Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build the Extension**
   ```bash
   npm run build:extension
   ```

   This command will:
   - Generate extension icons
   - Build the Next.js application
   - Copy all necessary files to the `out` directory

   Alternatively, you can use the bash script:
   ```bash
   chmod +x scripts/build.sh
   ./scripts/build.sh
   ```

3. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `out` folder from this project
   - The CapThat! extension is now installed! 🎉

## Usage

### Capturing Images

1. Navigate to any webpage with images
2. Hover over images to see the "Cap!" button in the bottom-right corner
3. Click "Cap!" to save the image
4. Watch for the "Saving..." and "Saved!" confirmation

### Managing Captures

1. Click the CapThat! extension icon in your Chrome toolbar
2. View all your captured images in the popup window
3. Click on images to select them (checkbox appears)
4. Use the action buttons at the bottom:
   - **Clear Cap Board**: Delete all captured images
   - **Export JSON**: Export capture metadata as JSON
   - **Export CapBoard**: Download all images as a ZIP file
   - **Export Individual Caps**: Download selected images as a ZIP file

### Deleting Images

- **Individual**: Hover over an image and click the red X button
- **Selected**: Select images and delete them in bulk
- **All**: Use the "Clear Cap Board" button to remove everything

## Color Scheme

The extension uses a carefully chosen color palette:

- `#68C5DB` - Primary/Main color (turquoise)
- `#0197F6` - Capture button color (bright blue)
- `#02182B` - Header/Dark elements (dark blue)
- `#448FA3` - Action buttons (teal)
- `#D7263D` - Delete/Danger actions (red)

## Technology Stack

- **Next.js 14** - React framework for the popup UI
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Chrome Extension Manifest V3** - Latest extension platform
- **html2canvas** - Screenshot capture library
- **JSZip** - ZIP file creation for exports

## Project Structure

```
capthat-extension/
├── components/          # React components
│   ├── ActionButtons.tsx
│   └── ImageGrid.tsx
├── pages/              # Next.js pages
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── public/             # Static assets
│   ├── content.js      # Content script
│   ├── content.css     # Content script styles
│   ├── popup.html      # Extension popup
│   └── icons/          # Extension icons
├── scripts/            # Build scripts
│   ├── build.sh
│   └── generate-icons.js
├── styles/             # Global styles
│   └── globals.css
├── types/              # TypeScript types
│   └── index.ts
├── manifest.json       # Extension manifest
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind configuration
└── package.json        # Dependencies
```

## Development

### Running in Development Mode

```bash
npm run dev
```

This starts the Next.js development server. However, for testing the actual Chrome extension functionality, you need to build and load it in Chrome.

### Building for Production

```bash
npm run build:extension
```

This creates an optimized build in the `out` directory ready for Chrome.

Alternatively:
```bash
./scripts/build.sh
```

### Making Changes

1. Make your code changes
2. Rebuild the extension: `npm run build:extension`
3. Go to `chrome://extensions/`
4. Click the refresh icon on the CapThat! extension card
5. Test your changes

## Features in Detail

### Content Script
- Automatically adds "Cap!" buttons to all images on web pages
- Handles dynamically loaded images (single-page apps)
- Manages CORS issues when capturing images
- Shows loading states during capture

### Popup Interface
- Responsive grid layout (5 columns by default)
- Image selection with visual feedback
- Hover effects showing page titles
- Quick delete on hover
- Smooth animations and transitions

### Storage Management
- Uses Chrome's local storage API
- Stores full image data as base64
- Includes metadata (URL, title, timestamp)
- No server required - everything is local

### Export Capabilities
- **JSON Export**: Full metadata including URLs and timestamps
- **ZIP Export**: All images packaged together
- **Selective Export**: Only export chosen images
- **Automatic naming**: Files named with timestamps

## Troubleshooting

### Images not capturing
- Check if the image is large enough (minimum 100x100px)
- Some images may have CORS restrictions
- Try refreshing the page

### Extension not appearing
- Make sure Developer mode is enabled
- Check if the extension is enabled in `chrome://extensions/`
- Try reloading the extension

### Popup not loading
- Check the browser console for errors
- Ensure all files were copied to the `out` directory
- Try rebuilding the extension

## Future Enhancements

- [ ] Image categorization and tagging
- [ ] Search and filter capabilities
- [ ] Multiple export formats (PDF, different image types)
- [ ] Cloud sync options
- [ ] Keyboard shortcuts
- [ ] Right-click context menu integration
- [ ] Automatic image optimization
- [ ] Bulk editing features

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project as you wish.

---

**CapThat!** - Capture the web, one image at a time! 📸
