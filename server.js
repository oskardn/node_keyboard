const cElectron = require("./src/modules/electron");

const vHttp = require("http");
const { Server } = require("socket.io");
const vFs = require("fs");
const { app } = require("electron");
const path = require("path");

const vElectron = new cElectron();

const oConfigLocation = app.getAppPath();
const vConfigPath = path.join(oConfigLocation, "\\..\\..");

if (vFs.existsSync(`${vConfigPath}\\config.json`) == false) {
	vFs.writeFileSync(
		`${vConfigPath}\\config.json`,
		'{"APP_PORT": 3000, "APP_TOKEN": "1234"}',
		(err) => {
			if (err) {
				console.error(err);
			}
		}
	);

	vElectron.vRelaunchApp();
} else {
	const cExpress = require("./src/modules/express");
	const cSockerIO = require("./src/modules/socket.io");
	const cNodeAudio = require("./src/modules/node-audio-volume-mixer");
	const cStartup = require("./src/modules/startup");

	const vExpress = new cExpress();
	const vSocketIO = new cSockerIO();
	const vNodeAudio = new cNodeAudio();
	const vStartup = new cStartup();

	const oConfig = require(`${vConfigPath}\\config.json`);

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
}
