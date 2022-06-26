const Launch = require("./launch");

const { app, BrowserWindow, ipcMain, dialog, Menu, Tray } = require("electron");
const vPath = require("path");
const vOpen = require("open");

const vLaunch = new Launch();

let vApp = app;

class Electron {
	vGenerateWindows() {
		let vTrayInit = null;
		let vBrowserWindow = BrowserWindow,
			vMenu = Menu,
			vTray = Tray;

		const vCreateWindow = () => {
			const vWin = new vBrowserWindow({
				width: 800,
				height: 600,
				icon: vPath.join(__dirname, "../global/img/small-icon.png"),
				webPreferences: {
					preload: vPath.join(__dirname, "preload.js"),
				},
			});

			vWin.loadFile("./src/home/vue/index.html");

			vWin.on("minimize", () => {
				if (vTrayInit) {
					return vWin.hide();
				}

				vTrayInit = new vTray(
					vPath.join(__dirname, "../global/img/small-icon.png")
				);

				const aTemplate = [
					{
						label: "Sikontrol",
						click: () => {
							vOpen("https://github.com/oskardn/sikontrol");
						},
						icon: vPath.join(
							__dirname,
							"../global/img/very-small-icon.png"
						),
						enabled: true,
					},
					{
						type: "separator",
					},
					{
						label: "Afficher l'application",
						click: () => {
							vWin.show();
						},
						icon: vPath.join(__dirname, "../global/img/show.png"),
					},
					{
						label: "Quitter l'application",
						click: () => {
							vWin.close();
						},
						icon: vPath.join(__dirname, "../global/img/quit.png"),
					},
				];

				const vContextMenu = vMenu.buildFromTemplate(aTemplate);

				vTrayInit.setContextMenu(vContextMenu);
				vTrayInit.setToolTip("Sikontrol");

				vWin.hide();
			});
		};

		vApp.whenReady().then(() => {
			vCreateWindow();

			this.#vIpcMainEvents();

			vApp.on("activate", () => {
				if (vBrowserWindow.getAllWindows().length === 0) {
					vCreateWindow();
				}
			});
		});

		vApp.on("window-all-closed", () => {
			if (process.platform !== "darwin") {
				vApp.quit();
			}
		});
	}

	vRelaunchApp() {
		vApp.relaunch();
		vApp.exit();
	}

	#vIpcMainEvents() {
		const Settings = require("./settings");

		const vSettings = new Settings();

		const vIpcMain = ipcMain;

		vIpcMain.on("start-server", (event, args) => {
			vLaunch.vInit();
		});

		vIpcMain.on("stop-server", (event, args) => {
			vLaunch.vStop();
		});

		vIpcMain.on("new-port", (event, args) => {
			vSettings.vChangeServerPort(args);
		});

		vIpcMain.on("new-token", (event, args) => {
			vSettings.vChangeServerToken(args);
		});
	}
}

module.exports = Electron;
