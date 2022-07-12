const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");

class NodeAudio {
	showProcessList(volumeApps, password, config) {
		const passwordJSON = config.APP_TOKEN;

		const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
		const session = sessions.find((value) => {
			return value.name === volumeApps.action;
		});

		if (volumeApps.action) {
			if (password == passwordJSON) {
				if (volumeApps.volume >= 0 || volumeApps.volume <= 1) {
					NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(
						Number(session.pid),
						volumeApps.volume
					);
				}
			}
		}
	}

	refreshSliderValue(socket) {
		const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();

		aSessions.forEach((element) => {
			if (element.name) {
				let appName = element.name;
				let refreshSliderValue =
					NodeAudioVolumeMixer.getAudioSessionVolumeLevelScalar(
						element.pid
					);
				let isAppMute = NodeAudioVolumeMixer.isAudioSessionMuted(
					element.pid
				);

				socket.emit("vRefreshSliderValue", {
					sAppName: appName,
					vRefreshSliderValue: refreshSliderValue,
					vIsAppMute: isAppMute,
				});
			}
		});
	}

	vNodeAppMute(muteButton, password, config) {
		const passwordJSON = config.APP_TOKEN;

		const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
		const session = sessions.find((aValue) => {
			return aValue.name === muteButton.vApp;
		});

		if (muteButton.vApp) {
			if (password == passwordJSON) {
				if (NodeAudioVolumeMixer.isAudioSessionMuted(session.pid) == false) {
					NodeAudioVolumeMixer.setAudioSessionMute(session.pid, true);
				} else if (NodeAudioVolumeMixer.isAudioSessionMuted(session.pid) == true) {
					NodeAudioVolumeMixer.setAudioSessionMute(session.pid, false);
				}
			}
		}
	}
}

module.exports = NodeAudio;
