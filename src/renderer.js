// This file is required by the index.html file and will be executed in the
// renderer process for that window. All of the Node.js APIs are available in
// this process.

var ipcRenderer = require('electron').ipcRenderer;

// 监听主进程返回的消息
ipcRenderer.on('display-ble-device', function (event, arg) {
    console.log('render device list:', arg);
    var table = document.body.querySelector('#device-list');
    arg.forEach(device => {
        var li = document.createElement('li');
        li.innerHTML = `name:${device.deviceName} id:${device.deviceId}`
        table.appendChild(li)
    });
    // alert(arg);
});