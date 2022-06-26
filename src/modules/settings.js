const vDetectPort = require("detect-port");
const { app, dialog } = require("electron");
const vEditJSON = require("edit-json-file");
const path = require("path");

const vApp = app;
const oConfigLocation = vApp.getAppPath();
const vConfigPath = path.join(oConfigLocation, "\\..\\..");
const vFile = vEditJSON(`${vConfigPath}\\config.json`);

class Settings {
	vChangeServerPort(oResponse) {
		let nPort = oResponse;

		if (!nPort) {
			const vType = "warning",
				sTitre = "Avertissement",
				sMessage = "Port non renseigné";
			const sDetail =
				"Vous devez renseinger le port pour pouvoir le changer.";

			this.#vAlertBox(vType, sTitre, sMessage, sDetail);
		} else {
			if (isNaN(nPort)) {
				const vType = "error",
					sTitre = "Erreur",
					sMessage = "Paramètre invalide";
				const sDetail =
					"Vous avez renseigné une valeur du port non valide";

				this.#vAlertBox(vType, sTitre, sMessage, sDetail);
			} else {
				if (nPort >= 1 && nPort <= 65535) {
					vDetectPort(nPort, (vError, vOtherPort) => {
						if (vError) {
							console.log(vError);
						}

						if (nPort == vOtherPort) {
							vFile.set("APP_PORT", Number(nPort));
							vFile.save();

							this.#vRelaunchApp();
						} else {
							const vType = "error",
								sTitre = "Erreur",
								sMessage = "Port non disponible";
							const sDetail = `Vous avez renseigné un port non disponible.\nEssayez le port : ${vOtherPort}`;

							this.#vAlertBox(
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

					this.#vAlertBox(vType, sTitre, sMessage, sDetail);
				}
			}
		}
	}

	vChangeServerToken(oResponse) {
		let sToken = oResponse;

		if (!sToken) {
			const vType = "warning",
				sTitre = "Avertissement",
				sMessage = "Token non renseigné";
			const sDetail =
				"Vous devez renseigner le token pour pouvoir le changer.";

			this.#vAlertBox(vType, sTitre, sMessage, sDetail);
		} else {
			vFile.set("APP_TOKEN", sToken);
			vFile.save();

			this.#vRelaunchApp();
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

	#vRelaunchApp() {
		vApp.relaunch();
		vApp.exit();
	}
}

module.exports = Settings;
