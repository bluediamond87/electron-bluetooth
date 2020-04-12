document.querySelector('#scan-btn')
    .addEventListener('click', function () {
        console.log("clicked scan button");
        scanDevices();
    });

const serviceUUID = 0x1234;

/**filters是一个过滤BLE设备的数组，形式为：
 *[
     { services: [filterService] },
     { name: filterName },
     { namePrefix: filterNamePrefix }
  ]
 */
function buildMachineFilter() {
    let filters = [{
		services: [serviceUUID]
	}];
    return filters;
}

function scanDevices() {
    let options = {};
    // options.filters = buildMachineFilter();
    options.acceptAllDevices = true;
    options.optionalServices = [serviceUUID]
    
    console.log('Requesting Bluetooth Device...');
    let device = navigator
        .bluetooth
        .requestDevice(options)
        .then(device => {
            console.log('> Name:             ' + device.name);
            console.log('> Id:               ' + device.id);
            console.log('> Initially, connected?        ' + device.gatt.connected);
            return device.gatt.connect();
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
}