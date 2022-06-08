const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");
const { app } = require("electron");
const path = require("path");

const oConfigLocation = app.getAppPath();
const vConfigPath = path.join(oConfigLocation, "\\..\\..");
const oConfig = require(`${vConfigPath}\\config.json`);

class NodeAudio {
	vShowProcessList(ioVolumeApps, sPassword) {
		const sPasswordJSON = oConfig.APP_TOKEN;

		const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
		const eSession = aSessions.find((aValue) => {
			return aValue.name === ioVolumeApps.action;
		});

		if (ioVolumeApps.action) {
			if (sPassword == sPasswordJSON) {
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
		const sPasswordJSON = oConfig.APP_TOKEN;

		const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
		const eSession = aSessions.find((aValue) => {
			return aValue.name === vMuteButton.vApp;
		});

		if (vMuteButton.vApp) {
			if (sPassword == sPasswordJSON) {
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
}

module.exports = NodeAudio;
