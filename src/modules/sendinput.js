const vSendInput = require("sendinput");

class SendInput {
	vInputs(ioActions, sPassword, oConfig) {
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

module.exports = SendInput;
