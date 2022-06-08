const Electron = require("./electron");

const vDetectPort = require("detect-port");
const { app } = require("electron");
const vEditJSON = require("edit-json-file");
const path = require("path");

const vElectron = new Electron();

const oConfigLocation = app.getAppPath();
const vConfigPath = path.join(oConfigLocation, "\\..\\..");
const vFile = vEditJSON(`${vConfigPath}\\config.json`);

class Settings {
	vChangeServerPort(oResponse) {
		let nPort = oResponse.data;

		if (!nPort) {
			const vType = "warning",
				sTitre = "Avertissement",
				sMessage = "Port non renseigné";
			const sDetail =
				"Vous devez renseinger le port pour pouvoir le changer.";

			vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
		} else {
			if (isNaN(nPort)) {
				const vType = "error",
					sTitre = "Erreur",
					sMessage = "Paramètre invalide";
				const sDetail =
					"Vous avez renseigné une valeur du port non valide";

				vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
			} else {
				if (nPort >= 1 && nPort <= 65535) {
					vDetectPort(nPort, (vError, vOtherPort) => {
						if (vError) {
							console.log(vError);
						}

						if (nPort == vOtherPort) {
							vFile.set("APP_PORT", Number(nPort));
							vFile.save();

							vElectron.vRelaunchApp();
						} else {
							const vType = "error",
								sTitre = "Erreur",
								sMessage = "Port non disponible";
							const sDetail = `Vous avez renseigné un port non disponible.\nEssayez le port : ${vOtherPort}`;

							vElectron.vAlertBox(
								vType,
								sTitre,
								sMessage,
								sDetail
							);
						}
					});
				} else {
					const vType = "error",
						sTitre = "Erreur",
						sMessage = "Port non disponible";
					const sDetail = `Vous avez renseigné un port non disponible. Le port doit être situé entre 0 et 65535.`;

					vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
				}
			}
		}
	}

	vChangeServerToken(oResponse) {
		let sToken = oResponse.data;

		if (!sToken) {
			const vType = "warning",
				sTitre = "Avertissement",
				sMessage = "Token non renseigné";
			const sDetail =
				"Vous devez renseigner le token pour pouvoir le changer.";

			vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
		} else {
			vFile.set("APP_TOKEN", sToken);
			vFile.save();

			vElectron.vRelaunchApp();
		}
	}
}

module.exports = Settings;
