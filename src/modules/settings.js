const detectPort = require("detect-port");
const { app, dialog } = require("electron");
const editJSON = require("edit-json-file");
const path = require("path");

const configLocation = app.getAppPath();
const configPath = path.join(configLocation, "\\..\\..");
const file = editJSON(`${configPath}\\config.json`);

class Settings {
	changeServerPort(response) {
		if (!response) {
			const type = "warning",
				title = "Avertissement",
				message = "Port non renseigné",
				detail = "Vous devez renseinger le port pour pouvoir le changer.";

			this.#alertBox(type, title, message, detail);
		} else {
			if (isNaN(response)) {
				const type = "error",
					title = "Erreur",
					message = "Paramètre invalide",
					detail = "Vous avez renseigné une valeur du port non valide";

				this.#alertBox(type, title, message, detail);
			} else {
				if (response >= 1 && response <= 65535) {
					detectPort(response, (error, otherPort) => {
						if (error) {
							console.error(error);
						}

						if (response == otherPort) {
							file.set("APP_PORT", Number(response));
							file.save();

							this.#relaunchApp();
						} else {
							const type = "error",
								title = "Erreur",
								message = "Port non disponible",
								detail = `Vous avez renseigné un port non disponible.\nEssayez le port : ${otherPort}`;

							this.#alertBox(
								type,
								title,
								message,
								detail
							);
						}
					});
				} else {
					const type = "error",
						title = "Erreur",
						message = "Port non disponible",
						detail = `Vous avez renseigné un port non disponible. Le port doit être situé entre 0 et 65535.`;

					this.#alertBox(type, title, message, detail);
				}
			}
		}
	}

	changeServerToken(response) {
		if (!response) {
			const type = "warning",
				title = "Avertissement",
				message = "Token non renseigné",
				detail = "Vous devez renseigner le token pour pouvoir le changer.";

			this.#alertBox(type, title, message, detail);
		} else {
			file.set("APP_TOKEN", response);
			file.save();

			this.#relaunchApp();
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

	#relaunchApp() {
		app.relaunch();
		app.exit();
	}
}

module.exports = Settings;
