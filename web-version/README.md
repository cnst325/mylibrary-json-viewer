# MyLibrary JSON Viewer - Web Version 🌐

**Pure browser-based viewer - No installation required!**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Try%20Now-brightgreen)](https://cnst325.github.io/mylibrary-json-viewer/web-version/)

---

## ✨ Features

- 🌐 **Pure Web Browser** - No installation, just open and use
- 🔒 **Privacy First** - All data processed locally in your browser
- ⚡ **Fast Loading** - Lightweight and quick execution
- 🛡️ **No Security Warnings** - Safe to use without installation files
- 💻 **Cross-Platform** - Works identically on Windows, Mac, Linux
- 📱 **Responsive Design** - Desktop, tablet, and mobile support
- 🌍 **Multilingual** - English, Korean, Japanese, German
- 🔄 **Auto-Save** - Last file automatically loaded (valid for 7 days)

---

## 🚀 How to Use

### Method 1: Online (Recommended) ⭐

**Live Demo:**
```
https://cnst325.github.io/mylibrary-json-viewer/web-version/
```

1. Visit the URL above
2. Click "📂 Open JSON File" button
3. Select your JSON backup file
4. Browse your library data!

### Method 2: Local File (Offline)

1. Download this folder or the ZIP file
2. Double-click `index.html` to open in your browser
   ```bash
   # Mac
   open index.html
   
   # Windows (PowerShell)
   start index.html
   
   # Linux
   xdg-open index.html
   ```

3. Click "📂 Open JSON File"
4. Select your JSON backup file

### Method 3: Local Server (For Development)

#### Using Python 3
```bash
cd web-version
python3 -m http.server 8000
```

Then visit: http://localhost:8000

#### Using Node.js
```bash
cd web-version
npx http-server -p 8000
```

Then visit: http://localhost:8000

---

## � Security & Privacy

### ✅ Complete Local Processing
- All data is processed **entirely in your browser**
- No data sent to any server
- Works completely offline (after initial page load)
- No cookies, no tracking, no analytics

### ✅ Data Storage
- JSON file loaded into memory only
- All data cleared on page refresh
- localStorage only stores: language preference and last file (optional, 7-day expiry)

---

## 💡 Capabilities

### 📖 Data Viewer
- **Collection**: Books, eBooks, audiobooks, and all media types
- **Loans**: Loan history and current loan status
- **Borrowers**: Registered borrower information
- **Wishlist**: Books you plan to purchase
- **Locations**: Physical storage locations

### 🔍 Search & Sort
- Real-time search across all data
- Independent search per tab
- Column sorting (click headers)
- Auto-detection of Korean/English/Japanese/German text

### 💾 Data Export
- **CSV Export**: Book list compatible with Excel

### 🌐 Multilingual Support
- English / 한국어 / 日本語 / Deutsch
- Auto-detection of browser language
- Manual language switching
- Preference saved to localStorage

---

## 🔧 Technical Details

### File Structure
```
web-version/
├── index.html      # Main HTML file
├── app.js          # JavaScript logic (2,100+ lines)
├── styles.css      # Stylesheet (500+ lines)
└── README.md       # This file
```

### Tech Stack
- **Vanilla JavaScript** (ES6+)
- **HTML5** (File API, Blob API, localStorage)
- **CSS3** (Grid, Flexbox)
- **No External Dependencies** (Pure implementation)

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers supported

**Recommended:** Desktop with screen width 960px or higher

---

## 📝 Notes & Limitations

### File Path Restrictions
For security reasons, browsers only show the filename, not the full file path.

### Large Files
Files with 10,000+ items may take a few seconds to render.

### Mobile Usage
Works on mobile browsers, but larger screens are recommended for the best experience.

---

## 🆘 Troubleshooting

### JSON file won't load
- Verify the file is valid JSON format
- Check browser console (F12) for error messages
- Try a different browser

### Text appears garbled
- Ensure file is UTF-8 encoded
- CSV exports automatically include BOM for Excel compatibility

### No response after selecting file
- Check if file size is too large (100MB+)
- Look for error messages in browser console (F12)
- Try with a smaller test file

---

## � Data Format

This viewer supports JSON backup files from the **MyLibrary Management Android app**.

**Expected JSON structure:**
```json
{
  "backupDate": "2024-11-04T12:00:00Z",
  "books": [...],
  "wishlistItems": [...],
  "loans": [...],
  "borrowers": [...],
  "locations": [...]
}
```

---

## 🚀 Deploying to GitHub Pages

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add web viewer"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository **Settings**
2. Click **Pages** in left sidebar
3. Under **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

### Step 3: Access Your Site
After 5-10 minutes, visit:
```
https://[username].github.io/mylibrary-json-viewer/web-version/
```

---

## 📄 License

MIT License - Free to use, modify, and distribute

---

## 🔗 Related Projects

- **MyLibrary Management** - Android library management app

---

Made with ❤️ for MyLibrary users | © CNST
