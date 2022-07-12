const sendInput = require("sendinput");

class SendInput {
	inputs(actions, password, config) {
		const next = 176,
			previous = 177,
			playPause = 179;
		let actionCode;

		const passwordJSON = config.APP_TOKEN;

		if (password == passwordJSON) {
			switch (actions.action) {
				case "vPrevious":
					actionCode = previous;
					break;
				case "vPlayPause":
					actionCode = playPause;
					break;
				case "vNext":
					actionCode = next;
					break;
				default:
					return;
					break;
			}

			sendInput.SendInput([
				{
					val: actionCode,
					type: 0,
				},
			]);
		} else {
			return;
		}
	}
}

module.exports = SendInput;
