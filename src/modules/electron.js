const Launch = require("./launch");

const { app, BrowserWindow, ipcMain, dialog, Menu, Tray } = require("electron");
const path = require("path");
const open = require("open");

const launch = new Launch();

class Electron {
	generateWindows() {
		let trayInit = null;

		const createWindow = () => {
			const win = new BrowserWindow({
				width: 800,
				height: 600,
				icon: path.join(__dirname, "../global/img/small-icon.png"),
				webPreferences: {
					preload: path.join(__dirname, "preload.js"),
				},
			});

			win.loadFile("./src/home/vue/index.html");

			win.on("minimize", () => {
				if (trayInit) {
					return win.hide();
				}

				trayInit = new Tray(
					path.join(__dirname, "../global/img/small-icon.png")
				);

				const template = [
					{
						label: "Sikontrol",
						click: () => {
							open("https://github.com/sikelio/sikontrol");
						},
						icon: path.join(
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
							win.show();
						},
						icon: path.join(__dirname, "../global/img/show.png"),
					},
					{
						label: "Quitter l'application",
						click: () => {
							win.close();
						},
						icon: path.join(__dirname, "../global/img/quit.png"),
					},
				];

				const contextMenu = Menu.buildFromTemplate(template);

				trayInit.setContextMenu(contextMenu);
				trayInit.setToolTip("Sikontrol");

				win.hide();
			});
		};

		app.whenReady().then(() => {
			createWindow();

			this.#ipcMainEvents();

			app.on("activate", () => {
				if (BrowserWindow.getAllWindows().length === 0) {
					createWindow();
				}
			});
		});

		app.on("window-all-closed", () => {
			if (process.platform !== "darwin") {
				app.quit();
			}
		});
	}

	relaunchApp() {
		app.relaunch();
		app.exit();
	}

	#ipcMainEvents() {
		const Settings = require("./settings");

		const settings = new Settings();

		ipcMain.on("start-server", (event, args) => {
			launch.init();
		});

		ipcMain.on("stop-server", (event, args) => {
			launch.stop();
		});

		ipcMain.on("new-port", (event, args) => {
			settings.changeServerPort(args);
		});

		ipcMain.on("new-token", (event, args) => {
			settings.changeServerToken(args);
		});
	}
}

module.exports = Electron;
