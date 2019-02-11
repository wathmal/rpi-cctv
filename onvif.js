const onvif = require('node-onvif');
const http = require('http');


const discover = async () => {
    console.log('start the discovery process.');

    try {
        const devices = await onvif.startProbe();
        const deviceStreams = [];

        for(let i =0; i < devices.length; i++) {
            const device = new onvif.OnvifDevice({
                xaddr: d.xaddrs[0]
            });

            await device.init();
            deviceStreams.push(device.getUdpStreamUrl());
		}

        return deviceStreams;
    } catch (e) {
		console.error(e.message);
		return [];
	}
};


const server = http.createServer((req, res) => {
	discover().then((list) => {
        const body = JSON.stringify(list);
        const content_length = body.length;
        res.writeHead(200, {
            'Content-Length': content_length,
            'Content-Type': 'text/plain' });

        res.end(body);
	});

});
server.listen(4000);
console.log('server is running on port 4000');

/*discover().then(list => {
	console.log(`list: ${JSON.stringify(list)}`);
});*/
// Find the ONVIF network cameras.
// It will take about 3 seconds.
/*
onvif.startProbe().then(( devices) => {
  console.log( devices.length + ' devices were found.');
  // Show the device name and the URL of the end point.
   devices.forEach((info) => {
    console.log('- ' + info.urn);
    console.log('  - ' + info.name);
    

    let device = new onvif.OnvifDevice({
	  xaddr: info.xaddrs[0]
	});



	device.init().then(() => {
	  // Get the UDP stream URL
	  let url = device.getUdpStreamUrl();
	  console.log(url);
	}).catch((error) => {
	  console.error(error);
	});
  });
}).catch((error) => {
  console.error(error);
});

*/
