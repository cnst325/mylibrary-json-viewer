const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
const userDataPath = app.getPath('userData');
const lastFilePathStorage = path.join(userDataPath, 'last-file.json');

// 마지막 파일 경로 저장
function saveLastFilePath(filePath) {
  try {
    fs.writeFileSync(lastFilePathStorage, JSON.stringify({ lastFilePath: filePath }));
  } catch (error) {
    console.error('Error saving last file path:', error);
  }
}

// 마지막 파일 경로 불러오기
function getLastFilePath() {
  try {
    if (fs.existsSync(lastFilePathStorage)) {
      const data = fs.readFileSync(lastFilePathStorage, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.lastFilePath;
    }
  } catch (error) {
    console.error('Error reading last file path:', error);
  }
  return null;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    minWidth: 1200,
    minHeight: 700,
    icon: path.join(__dirname, '../assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    title: 'MyLibrary JSON Viewer',
    backgroundColor: '#ffffff'
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // 페이지 로드 완료 후 마지막 파일 자동 로드
  mainWindow.webContents.on('did-finish-load', () => {
    const lastFilePath = getLastFilePath();
    if (lastFilePath && fs.existsSync(lastFilePath)) {
      try {
        const content = fs.readFileSync(lastFilePath, 'utf-8');
        const fileName = path.basename(lastFilePath);
        const stats = fs.statSync(lastFilePath);
        
        mainWindow.webContents.send('auto-load-file', {
          fileName,
          filePath: lastFilePath,
          content,
          lastModified: stats.mtimeMs
        });
      } catch (error) {
        console.error('Error auto-loading last file:', error);
      }
    }
  });

  // 개발 모드에서 DevTools 열기
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 시스템 로케일 가져오기
ipcMain.handle('get-system-locale', async () => {
  return app.getLocale();
});

// 앱 준비 완료
app.whenReady().then(createWindow);

// 모든 윈도우가 닫혔을 때
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// macOS에서 독 아이콘 클릭 시
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// JSON 파일 열기 다이얼로그
ipcMain.handle('open-json-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  try {
    const filePath = result.filePaths[0];
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const stats = fs.statSync(filePath);
    
    // 파일 경로 저장
    saveLastFilePath(filePath);
    
    return {
      fileName,
      filePath,
      content,
      lastModified: stats.mtimeMs // 파일 수정 시간 추가
    };
  } catch (error) {
    console.error('Error reading file:', error);
    return {
      error: error.message
    };
  }
});

// JSON 파일 저장
ipcMain.handle('save-json-file', async (event, jsonData, defaultFileName) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultFileName || 'mylibrary_backup.json',
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (result.canceled || !result.filePath) {
    return { success: false, canceled: true };
  }

  try {
    fs.writeFileSync(result.filePath, jsonData, 'utf-8');
    return { success: true, filePath: result.filePath };
  } catch (error) {
    console.error('Error saving JSON file:', error);
    return { success: false, error: error.message };
  }
});

// CSV 파일 저장
ipcMain.handle('save-csv-file', async (event, csvData, defaultFileName) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultFileName || 'mylibrary_export.csv',
    filters: [
      { name: 'CSV Files', extensions: ['csv'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (result.canceled || !result.filePath) {
    return { success: false, canceled: true };
  }

  try {
    fs.writeFileSync(result.filePath, csvData, 'utf-8');
    return { success: true, filePath: result.filePath };
  } catch (error) {
    console.error('Error saving CSV file:', error);
    return { success: false, error: error.message };
  }
});

// 에러 처리
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});
