/**
 * Type de codage
 * 
 * a  -> array
 * e  -> element
 * io -> socket.io
 * n  -> number
 * o  -> object
 * s  -> string
 * v  -> void
 */

const oConfig = require('./src/public/data/config.json');

const Settings = require('./src/modules/settings');
const Electron = require('./src/modules/electron');
const Express = require('./src/modules/express');
const SockerIO = require('./src/modules/socket.io');
const NodeAudio = require('./src/modules/node-audio-volume-mixer');

const vHttp = require('http');
const { Server } = require('socket.io');
const vBodyParser = require('body-parser');

const vElectron = new Electron();
const vExpress = new Express();
const vSettings = new Settings();
const vSocketIO = new SockerIO();
const vNodeAudio = new NodeAudio();

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

vApp.post('/settings', (req, res) => {
    let oResponse = req.body;
    
    vSettings.vChangeServerSettings(oResponse);
});

const nPort = oConfig.APP_PORT;

vHttpServer.listen((nPort || 3000), () => {
    console.log('Websocket server started');
    console.log('Express server started');
});

vElectron.vGenerateWindows();