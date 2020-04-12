const { app, BrowserWindow } = require('electron');
let currentDeviceList = [];

app
  .commandLine
  .appendSwitch('enable-web-bluetooth', true);

function createWindow () {   
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 并且为你的应用加载index.html
  win.loadFile('src/index.html')

  // 打开开发者工具
  win.webContents.openDevTools()

  const { ipcMain } = require('electron');
  const content = win.webContents;
  content.on('select-bluetooth-device', (event, deviceList, callback) => {
    event.preventDefault();
    deviceList.forEach(device => {
      if (currentDeviceList.find(item => item.deviceId == device.deviceId)) return;
      currentDeviceList.push(device);
      if (currentDeviceList.length > 3) {
        console.log('Device list:', currentDeviceList);
        // Display the device list in a window.
        content.send('display-ble-device', currentDeviceList);
        callback('');
      }
    })
  });

  mainWindow.webContents.send('main-process-messages', 'nihao');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  console.log('create windows log')
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  app.quit()
  // if (process.platform !== 'darwin') {
    
  // }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});