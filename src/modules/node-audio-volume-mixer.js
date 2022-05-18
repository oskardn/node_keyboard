const oConfig = require("../global/config.json");

const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");

class cNodeAudio {
	vShowProcessList(ioVolumeApps, sPassword) {
		const sEnvPassword = oConfig.TOKEN;

		const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
		const eSession = aSessions.find((aValue) => {
			return aValue.name === ioVolumeApps.action;
		});

		if (ioVolumeApps.action) {
			if (sPassword == sEnvPassword) {
				if (ioVolumeApps.volume >= 0 || ioVolumeApps.volume <= 1) {
					NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(
						Number(eSession.pid),
						ioVolumeApps.volume
					);
				}
			}
		}
	}

	vRefreshSliderValue(vSocket) {
		const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();

		aSessions.forEach((eElement) => {
			if (eElement.name) {
				let sAppName = eElement.name;
				let vRefreshSliderValue =
					NodeAudioVolumeMixer.getAudioSessionVolumeLevelScalar(
						eElement.pid
					);
				let vIsAppMute = NodeAudioVolumeMixer.isAudioSessionMuted(
					eElement.pid
				);

				vSocket.emit("vRefreshSliderValue", {
					sAppName: sAppName,
					vRefreshSliderValue: vRefreshSliderValue,
					vIsAppMute: vIsAppMute,
				});
			}
		});
	}

	vNodeAppMute(vMuteButton, sPassword) {
		const sEnvPassword = oConfig.TOKEN;

		const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
		const eSession = aSessions.find((aValue) => {
			return aValue.name === vMuteButton.vApp;
		});

		if (vMuteButton.vApp) {
			if (sPassword == sEnvPassword) {
				if (
					NodeAudioVolumeMixer.isAudioSessionMuted(eSession.pid) ==
					false
				) {
					NodeAudioVolumeMixer.setAudioSessionMute(
						eSession.pid,
						true
					);
				} else if (
					NodeAudioVolumeMixer.isAudioSessionMuted(eSession.pid) ==
					true
				) {
					NodeAudioVolumeMixer.setAudioSessionMute(
						eSession.pid,
						false
					);
				}
			}
		}
	}

	vIsAppMute(sPassword) {}
}

module.exports = cNodeAudio;
