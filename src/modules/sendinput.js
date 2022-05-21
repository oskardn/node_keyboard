const vSendInput = require("sendinput");
const { app } = require("electron");
const path = require("path");

const oConfigLocation = app.getAppPath();
const vConfigPath = path.join(oConfigLocation, "\\..\\..");
const oConfig = require(`${vConfigPath}\\config.json`);

class cSendInput {
	vInputs(ioActions, sPassword) {
		const vNext = 176,
			vPrevious = 177,
			vPlayPause = 179;
		let vActionCode;

		const sPasswordJSON = oConfig.APP_TOKEN;

		if (sPassword == sPasswordJSON) {
			switch (ioActions.action) {
				case "vPrevious":
					vActionCode = vPrevious;
					break;
				case "vPlayPause":
					vActionCode = vPlayPause;
					break;
				case "vNext":
					vActionCode = vNext;
					break;
				default:
					return;
					break;
			}

			vSendInput.SendInput([
				{
					val: vActionCode,
					type: 0,
				},
			]);
		} else {
			return;
		}
	}
}

module.exports = cSendInput;
