const NodeAudio = require("../modules/node-audio-volume-mixer");
const SockerIO = require("../modules/socket.io");

const { app, dialog } = require("electron");
const vFs = require("fs");
const vHttp = require("http");
const vPath = require("path");
const { Server } = require("socket.io");

const vNodeAudio = new NodeAudio();
const vSocketIO = new SockerIO();

let bLaunch = false;

const vHttpServer = vHttp.createServer();
const vIo = new Server(vHttpServer);

class Launch {
    vInit() {
        if (bLaunch == false) {
            const vApp = app;
            const oConfigLocation = vApp.getAppPath();
            const vConfigPath = vPath.join(oConfigLocation, "\\..\\..");

            if (vFs.existsSync(`${vConfigPath}\\config.json`) == true) {
                const oConfigLocation = vApp.getAppPath();
                const vConfigPath = vPath.join(oConfigLocation, "\\..\\..");
                const oConfig = require(`${vConfigPath}\\config.json`);

                vIo.on("connection", (vSocket) => {
                    const sPassword = vSocket.handshake.auth.token;
        
                    vSocketIO.vSocketEvents(vSocket, sPassword, oConfig);
                    vNodeAudio.vRefreshSliderValue(vSocket);
                })
        
                vHttpServer.listen(oConfig.APP_PORT || 3000, () => {
                    bLaunch = true;
                });
            } else {
                const vType = "error",
                    sTitre = "Erreur",
                    sMessage = "Fichier de configuration manquant";
                const sDetail = `Le fichier de configuration est indisponible, veuillez redémarrer l'application.`;

                this.#vAlertBox(vType, sTitre, sMessage, sDetail);
            }
        }
    }

    vStop() {
        if (bLaunch == true) {
            vHttpServer.close(() => {
                bLaunch = false;
            });
        }
    }

    #vAlertBox(vType, sTitre, sMessage, sDetail) {
		const vDialog = dialog;

		const oOptions = {
			type: vType,
			buttons: ["OK"],
			defaultId: 2,
			title: sTitre,
			message: sMessage,
			detail: sDetail,
			checkboxLabel: "Se souvenir de mon choix",
			checkboxChecked: false,
		};

		vDialog.showMessageBox(
			null,
			oOptions,
			(vResponse, vCheckboxChecked) => {
				console.log(vResponse);
				console.log(vCheckboxChecked);
			}
		);
	}
}

module.exports = Launch;
