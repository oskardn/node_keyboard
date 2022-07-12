const NodeAudio = require("../modules/node-audio-volume-mixer");
const SockerIO = require("../modules/socket.io");

const { app, dialog } = require("electron");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const nodeAudio = new NodeAudio();
const socketIO = new SockerIO();

let launch = false;

const httpServer = http.createServer();
const io = new Server(httpServer);

class Launch {
    init() {
        if (launch == false) {
            const configLocation = app.getAppPath();
            const configPath = path.join(configLocation, "\\..\\..");

            if (fs.existsSync(`${configPath}\\config.json`) == true) {
                const config = require(`${configPath}\\config.json`);

                io.on("connection", (socket) => {
                    const password = socket.handshake.auth.token;
        
                    socketIO.socketEvents(socket, password, config);
                    nodeAudio.refreshSliderValue(socket);
                })
        
                httpServer.listen(config.APP_PORT || 3000, () => {
                    launch = true;
                });
            } else {
                const type = "error",
                    title = "Erreur",
                    message = "Fichier de configuration manquant",
                    detail = `Le fichier de configuration est indisponible, veuillez redémarrer l'application.`;

                this.#alertBox(type, title, message, detail);
            }
        }
    }

    stop() {
        if (launch == true) {
            httpServer.close(() => {
                launch = false;
            });
        }
    }

    #alertBox(type, title, message, detail) {
		const options = {
			type: type,
			buttons: ["OK"],
			defaultId: 2,
			title: title,
			message: message,
			detail: detail,
			checkboxLabel: "Se souvenir de mon choix",
			checkboxChecked: false,
		};

		dialog.showMessageBox(
			null,
			options,
			(response, checkboxChecked) => {
				console.log(response);
				console.log(checkboxChecked);
			}
		);
	}
}

module.exports = Launch;
