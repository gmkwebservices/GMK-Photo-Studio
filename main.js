const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 980,
    minHeight: 640,
    icon: path.join(__dirname, 'icon.ico'),
    autoHideMenuBar: true,
    backgroundColor: '#14161c',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Camera / microphone access (used by the ID-photo capture feature)
  // needs explicit approval inside Electron's sandboxed webContents.
  win.webContents.session.setPermissionRequestHandler((wc, permission, callback) => {
    const allowed = ['media', 'camera', 'microphone', 'clipboard-read', 'clipboard-sanitized-write'];
    callback(allowed.includes(permission));
  });

  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  win.once('ready-to-show', () => win.show());
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
