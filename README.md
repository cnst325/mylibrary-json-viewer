# MyLibrary JSON Viewer 🌐

A web-based viewer for JSON backup files exported from the MyLibrary Management app.

**🌟 No Installation Required | No Security Warnings | Cross-Platform**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Try%20Now-brightgreen)](https://cnst325.github.io/mylibrary-json-viewer/web-version/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🚀 Quick Start

### Method 1: Use Online (Recommended) ⭐

**👉 [https://cnst325.github.io/mylibrary-json-viewer/web-version/](https://cnst325.github.io/mylibrary-json-viewer/web-version/)**

1. Click the link above
2. Click "📂 Open JSON File" button
3. Select your JSON backup file from MyLibrary app
4. View your data!

> 💡 All data is processed locally in your browser and never sent to any server.

### Method 2: Use Offline

1. Download `mylibrary-viewer-web.zip` from [latest release](https://github.com/cnst325/mylibrary-json-viewer/releases/latest)
2. Extract the ZIP file
3. Double-click `index.html` to open in your web browser

---

## ✨ Key Features

- 🌐 **No Installation**: Run directly in web browser
- 🔒 **Privacy First**: All data processed locally in your browser
- 🌍 **Multilingual**: English, Korean (한국어), Japanese (日本語), German (Deutsch)
- 📊 **Complete Data Preservation**: Display all JSON data with 100% accuracy
- 🔍 **Search & Sort**: Quick data search and column sorting
- 📑 **Category Views**: Collection, Wishlist, Loans, Borrowers, Locations
- 👁️ **Detailed View**: View complete information for each item (reading records, loan history, etc.)
- 💾 **CSV Export**: Export data to Excel-compatible CSV format
- 🔄 **Auto-Save**: Automatically load last opened file (valid for 7 days)
- 🎨 **Modern UI**: Clean and intuitive interface
- 💻 **Cross-Platform**: Works on Windows, Mac, Linux, and mobile browsers

---

## 📖 How to Use

### 1️⃣ Prepare JSON File

Export a JSON backup file from MyLibrary Management app:
- Open MyLibrary app → Settings → "Backup & Restore" → "Backup"

### 2️⃣ Open Viewer

- **Online**: Visit [web viewer](https://cnst325.github.io/mylibrary-json-viewer/web-version/)
- **Offline**: Double-click the downloaded `index.html` file

### 3️⃣ Explore Your Data

- Click tabs to navigate between categories
- Use search box to find titles, authors, ISBN, etc.
- Click table headers to sort columns
- Click any row to view detailed information

### 4️⃣ Export Data (Optional)

- Click "📊 Export CSV" button to create Excel-compatible CSV file

---

## 📊 Supported Data Types

Display all data from your MyLibrary JSON backup:

- **📖 Collection**: Title, author, publisher, ISBN, category, location, reading status, rating, notes, etc.
- **⭐ Wishlist**: Books you want to read, priority, estimated price
- **📤 Loans**: Borrower, loan date, due date, overdue information
- **👥 Borrowers**: Name, contact info, total loans
- **📍 Locations**: Location name, room, shelf, description

---

## 🌐 Language Support

Automatically detects system language, with manual switching available.

**Supported Languages:**
- 🇺🇸 English
- 🇰🇷 한국어 (Korean)
- 🇯🇵 日本語 (Japanese)
- 🇩🇪 Deutsch (German)

---

## 🔐 Privacy & Security

- ✅ All data processed locally in browser
- ✅ No data sent to any server
- ✅ Works completely offline (after initial load)
- ✅ Open source for transparency

---

## 💻 Technical Details

**Built with:**
- Pure HTML5, CSS3, JavaScript (ES6+)
- No external libraries or dependencies
- Browser standard APIs only (File API, localStorage)

**Browser Compatibility:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

**Recommended:** Desktop with screen width 960px or higher

---

## 🛠️ For Developers

### Local Development

```bash
# Clone repository
git clone https://github.com/cnst325/mylibrary-json-viewer.git
cd mylibrary-json-viewer/web-version

# Start local server (Python)
python3 -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```

Visit `http://localhost:8000` in your browser

### Project Structure

```
mylibrary-json-viewer/
└── web-version/
    ├── index.html    # Main HTML file
    ├── app.js        # Application logic
    ├── styles.css    # Stylesheet
    └── README.md     # Documentation
```

---

## 📄 License

MIT License - Free to use, modify, and distribute

See [LICENSE](LICENSE) file for details

---

## 🤝 Contributing

Bug reports, feature requests, and pull requests are welcome!

1. Fork the Project
2. Create Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit Changes (`git commit -m 'Add AmazingFeature'`)
4. Push to Branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Support

Having issues? Please report them on our [Issues](https://github.com/cnst325/mylibrary-json-viewer/issues) page.

---

## 🔗 Related Projects

- **MyLibrary Management** - Android library management app

---

## 📸 Screenshots

### Main Collection View
Browse your book collection with sorting and search capabilities.

### Detailed Book Information
View complete details including reading records, notes, and media-specific information.

### Multilingual Support
Switch between English, Korean, Japanese, and German interfaces.

---

Made with ❤️ for MyLibrary users | © CNST

