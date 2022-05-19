const cElectron = require("./src/modules/electron");
const cExpress = require("./src/modules/express");
const cSockerIO = require("./src/modules/socket.io");
const cNodeAudio = require("./src/modules/node-audio-volume-mixer");
const cStartup = require("./src/modules/startup");

const vHttp = require("http");
const { Server } = require("socket.io");
const { app } = require("electron");
const vFs = require("fs");

const oConfigLocation = app.getAppPath("userData");
if (vFs.existsSync(`${oConfigLocation}\\config.json`) == false) {
	vFs.writeFileSync(`${oConfigLocation}\\config.json`, "{\"APP_PORT\": 3000, \"APP_TOKEN\": \"1234\"}", (err) => {
		if (err) {
			console.error(err);
		}
	})
}

const oConfig = require(`${oConfigLocation}\\config.json`);

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