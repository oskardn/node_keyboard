const oConfig = require('./src/public/data/config.json');

const cSettings = require('./src/modules/settings');
const cElectron = require('./src/modules/electron');
const cExpress = require('./src/modules/express');
const cSockerIO = require('./src/modules/socket.io');
const cNodeAudio = require('./src/modules/node-audio-volume-mixer');
const cStartup = require('./src/modules/startup');

const vHttp = require('http');
const { Server } = require('socket.io');

const vElectron = new cElectron();
const vExpress = new cExpress();
const vSettings = new cSettings();
const vSocketIO = new cSockerIO();
const vNodeAudio = new cNodeAudio();
const vStartup = new cStartup();

const vApp = vExpress.vReturnApp();
const vHttpServer = vHttp.createServer(vApp);
const vIo = new Server(vHttpServer);

vSettings.vInitConfig();
vExpress.vStartExpress();

vIo.on('connection', (vSocket) => {
    const sPassword = vSocket.handshake.auth.token;

    vSocketIO.vSocketEvents(vSocket, sPassword);
    vNodeAudio.vRefreshSliderValue(vSocket);
});

const nPort = oConfig.APP_PORT;

vHttpServer.listen((nPort || 3000), () => {
    vStartup.vAsciiLogo();
});

vElectron.vGenerateWindows();