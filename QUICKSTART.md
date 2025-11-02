# CapThat! Quick Start Guide

Get up and running with CapThat in 3 simple steps! ⚡

## 🚀 Quick Install (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```
*Takes about 1-2 minutes*

### Step 2: Build Extension
```bash
npm run build:extension
```
*Takes about 30-60 seconds*

### Step 3: Load in Chrome
1. Open Chrome → `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `out` folder
5. Done! 🎉

## 📸 How to Use

### Capture Images
1. Visit any webpage
2. Look for the **Cap!** button on images (bottom-right corner)
3. Click it to save!

### View & Manage
1. Click the CapThat icon in Chrome toolbar
2. See all your captures in a grid
3. Click images to select them
4. Use buttons at bottom to export or delete

## 🎯 Features at a Glance

| Feature | What it does |
|---------|--------------|
| **Cap! Button** | Appears on all images - click to capture |
| **Image Grid** | Shows all your captures in a 5-column grid |
| **Selection** | Click images to select/deselect them |
| **Export JSON** | Download metadata of all captures |
| **Export CapBoard** | Download ALL images as ZIP |
| **Export Selected** | Download only selected images as ZIP |
| **Delete** | Remove individual or all captures |
| **Hover Info** | See page title when hovering over captures |

## 🎨 Color Scheme

- **Turquoise** (#68C5DB) - Main color
- **Bright Blue** (#0197F6) - Cap button
- **Dark Blue** (#02182B) - Headers
- **Teal** (#448FA3) - Action buttons
- **Red** (#D7263D) - Delete buttons

## 🛠️ Rebuilding After Changes

```bash
npm run build:extension
```

Then click the refresh icon on the extension at `chrome://extensions/`

## ❓ Common Issues

**Extension not showing?**
- Make sure Developer mode is ON
- Check you selected the `out` folder

**Images not capturing?**
- Some sites block it (CORS)
- Very small images are skipped

**Popup blank?**
- Right-click extension icon → Inspect popup
- Check console for errors

## 📁 Project Structure

```
📦 capthat-extension
├── 📁 components/        ← React components
├── 📁 pages/            ← Next.js pages
├── 📁 public/           ← Static files & content script
├── 📁 scripts/          ← Build scripts
├── 📁 styles/           ← CSS files
├── 📁 types/            ← TypeScript types
├── 📄 manifest.json     ← Extension config
└── 📁 out/             ← Built extension (load this!)
```

## 🎓 Next Steps

1. **Try it out**: Visit any site and capture some images
2. **Customize**: Edit the color scheme in `tailwind.config.js`
3. **Extend**: Add new features in `components/` or `pages/`

## 💡 Pro Tips

- Hold Shift and click to select multiple images quickly
- The extension works on most websites, but some may block it
- Images are stored in Chrome's local storage (private & secure)
- Export JSON to keep a record of where you captured images from

---

**Need detailed help?** Check `INSTALL.md` and `README.md`

**Happy Capturing!** 📸✨

