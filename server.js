const oConfig = require('./src/public/data/config.json');

const cSettings = require('./src/modules/settings');
const cElectron = require('./src/modules/electron');
const cExpress = require('./src/modules/express');
const cSockerIO = require('./src/modules/socket.io');
const cNodeAudio = require('./src/modules/node-audio-volume-mixer');

const vHttp = require('http');
const { Server } = require('socket.io');
const vBodyParser = require('body-parser');

const vElectron = new cElectron();
const vExpress = new cExpress();
const vSettings = new cSettings();
const vSocketIO = new cSockerIO();
const vNodeAudio = new cNodeAudio();

const vApp = vExpress.vReturnApp();
const vHttpServer = vHttp.createServer(vApp);
const vIo = new Server(vHttpServer);

vIo.on('connection', (vSocket) => {
    const sPassword = vSocket.handshake.auth.token;
    
    vSocketIO.vSocketEvents(vSocket, sPassword);
    vNodeAudio.vRefreshSliderValue(vSocket);
});

vApp.use(vBodyParser.json());
vApp.use(vBodyParser.urlencoded());
vApp.use(vBodyParser.urlencoded({ extended: true }));

vApp.get('/', (req, res) => {
    res.sendStatus(404);
});

vApp.post('/port', (req, res) => {
    let oResponse = req.body;
    
    vSettings.vChangeServerPort(oResponse);
});

vApp.post('/token', (req, res) => {
    let oResponse = req.body;
    
    vSettings.vChangeServerToken(oResponse);
});

const nPort = oConfig.APP_PORT;

vHttpServer.listen((nPort || 3000), () => {
    console.log('Websocket server started');
    console.log('Express server started');
});

vElectron.vGenerateWindows();