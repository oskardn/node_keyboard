const vAudio = require("win-audio").speaker;

vAudio.polling(200);

class WinAudio {
	vChangeMasterVolume(ioVolumeMaster, sPassword, oConfig) {
		const sPasswordJSON = oConfig.APP_TOKEN;

		if (sPassword == sPasswordJSON) {
			switch (ioVolumeMaster) {
				case isNaN:
					return;
					break;
				default:
					if (
						ioVolumeMaster.volume >= 0 &&
						ioVolumeMaster.volume <= 100
					) {
						vAudio.set(parseInt(ioVolumeMaster.volume));
					} else {
						return;
					}
					break;
			}
		} else {
			return;
		}
	}

	vMuteMasterVolume(ioMasterMute, sPassword, oConfig) {
		const sPasswordJSON = oConfig.APP_TOKEN;

		if (sPassword == sPasswordJSON) {
			if (vAudio.isMuted() == false) {
				vAudio.mute();
			} else if (vAudio.isMuted() == true) {
				vAudio.unmute();
			}
		}
	}

	vIsMasterMute() {
		return vAudio.isMuted();
	}
}

module.exports = WinAudio;
