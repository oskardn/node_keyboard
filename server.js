const oConfig = require("./src/global/config.json")

const cElectron = require("./src/modules/electron");
const cExpress = require("./src/modules/express");
const cSockerIO = require("./src/modules/socket.io");
const cNodeAudio = require("./src/modules/node-audio-volume-mixer");
const cStartup = require("./src/modules/startup");

const vHttp = require("http");
const { Server } = require("socket.io");

const vSQLite3 = require("sqlite3").verbose();
const sDbName = "config.local.db";
const vDb = new vSQLite3.Database(sDbName);

const vElectron = new cElectron();
const vExpress = new cExpress();
const vSocketIO = new cSockerIO();
const vNodeAudio = new cNodeAudio();
const vStartup = new cStartup();

const vApp = vExpress.vReturnApp();
const vHttpServer = vHttp.createServer(vApp);
const vIo = new Server(vHttpServer);

vExpress.vStartExpress();

vIo.on("connection", (vSocket) => {
	const sPassword = vSocket.handshake.auth.token;

	vSocketIO.vSocketEvents(vSocket, sPassword);
	vNodeAudio.vRefreshSliderValue(vSocket);
});

vHttpServer.listen(oConfig.APP_PORT || 3000, () => {
	vStartup.vAsciiLogo();
});

vElectron.vGenerateWindows();