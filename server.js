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
const Electron = require('./src/modules/electron');
const SockerIO = require('./src/modules/socket.io');
const NodeAudio = require('./src/modules/node-audio-volume-mixer');

const vHttp = require('http');
const { Server } = require('socket.io');

const vElectron = new Electron();
const vSocketIO = new SockerIO();
const vNodeAudio = new NodeAudio();

const vHttpServer = vHttp.createServer();
const vIo = new Server(vHttpServer);

vIo.on('connection', (vSocket) => {
    const sPassword = vSocket.handshake.auth.token;
    
    vSocketIO.vSocketEvents(vSocket, sPassword);
    vNodeAudio.vRefreshSliderValue(vSocket);
});

const nPort = oConfig.APP_PORT;

vHttpServer.listen((nPort || 3000), () => {
    console.log('Server started');
});

vElectron.vGenerateWindows();