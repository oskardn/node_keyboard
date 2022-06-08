const Electron = require("./src/modules/electron");

const vHttp = require("http");
const { Server } = require("socket.io");
const vFs = require("fs");
const { app } = require("electron");
const vPath = require("path");

const vElectron = new Electron();

const vApp = app;
const oConfigLocation = vApp.getAppPath();
const vConfigPath = vPath.join(oConfigLocation, "\\..\\..");

if (vFs.existsSync(`${vConfigPath}\\config.json`) == false) {
	vFs.writeFileSync(
		`${vConfigPath}\\config.json`,
		'{"APP_PORT": 3000, "APP_TOKEN": "1234"}',
		(vErr) => {
			if (vErr) {
				console.error(vErr);
			}
		}
	);

	vElectron.vRelaunchApp();
} else {
	const Express = require("./src/modules/express");
	const SockerIO = require("./src/modules/socket.io");
	const NodeAudio = require("./src/modules/node-audio-volume-mixer");
	const Startup = require("./src/modules/startup");

	const vExpress = new Express();
	const vSocketIO = new SockerIO();
	const vNodeAudio = new NodeAudio();
	const vStartup = new Startup();

	const oConfig = require(`${vConfigPath}\\config.json`);

	const vAppExpress = vExpress.vReturnApp();
	const vHttpServer = vHttp.createServer(vAppExpress);
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
