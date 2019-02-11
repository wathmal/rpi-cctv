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
