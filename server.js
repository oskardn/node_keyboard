const Electron = require("./src/modules/electron");

const fs = require("fs");
const { app } = require("electron");
const path = require("path");

const electron = new Electron();

const configLocation = app.getAppPath();
const configPath = path.join(configLocation, "\\..\\..");

if (fs.existsSync(`${configPath}\\config.json`) === false) {
	fs.writeFileSync(
		`${configPath}\\config.json`,
		'{"APP_PORT": 3000, "APP_TOKEN": "1234"}',
		(err) => {
			if (err) {
				console.error(err);
			}
		}
	);

	electron.relaunchApp();
} else {
	electron.generateWindows();
}
