const audio = require("win-audio").speaker;

audio.polling(200);

class WinAudio {
	changeMasterVolume(volumeMaster, password, config) {
		const passwordJSON = config.APP_TOKEN;

		if (password == passwordJSON) {
			switch (volumeMaster) {
				case isNaN:
					return;
					break;
				default:
					if (
						volumeMaster.volume >= 0 &&
						volumeMaster.volume <= 100
					) {
						audio.set(parseInt(volumeMaster.volume));
					} else {
						return;
					}
					break;
			}
		} else {
			return;
		}
	}

	muteMasterVolume(ioMasterMute, password, config) {
		const sPasswordJSON = config.APP_TOKEN;

		if (password == sPasswordJSON) {
			if (audio.isMuted() == false) {
				audio.mute();
			} else if (audio.isMuted() == true) {
				audio.unmute();
			}
		}
	}

	isMasterMute() {
		return audio.isMuted();
	}
}

module.exports = WinAudio;
