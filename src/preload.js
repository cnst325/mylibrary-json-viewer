const { contextBridge, ipcRenderer } = require('electron');

// 안전한 API를 렌더러 프로세스에 노출
contextBridge.exposeInMainWorld('electronAPI', {
  openJsonFile: () => ipcRenderer.invoke('open-json-file'),
  saveJsonFile: (jsonData, defaultFileName) => ipcRenderer.invoke('save-json-file', jsonData, defaultFileName),
  saveCsvFile: (csvData, defaultFileName) => ipcRenderer.invoke('save-csv-file', csvData, defaultFileName),
  onAutoLoadFile: (callback) => ipcRenderer.on('auto-load-file', (event, data) => callback(data)),
  getSystemLocale: () => ipcRenderer.invoke('get-system-locale')
});
