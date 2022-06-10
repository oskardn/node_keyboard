const Electron = require("./src/modules/electron");

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
	vElectron.vGenerateWindows();
}
