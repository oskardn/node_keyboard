const WinAudio = require("./win-audio");
const SendInput = require("./sendinput");
const NodeAudio = require("./node-audio-volume-mixer");

const vAudio = require("win-audio").speaker;
const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");

const vWinAudio = new WinAudio();
const vSendInput = new SendInput();
const vNodeAudio = new NodeAudio();

class SockerIO {
	vSocketEvents(vSocket, sPassword, oConfig) {
		vSocket.emit("ioIsMasterMute", vWinAudio.vIsMasterMute());

		vSocket.emit("ioWindowsActualVolume", vAudio.get());

		vAudio.events.on("change", (vVal) => {
			vSocket.emit("ioWindowsVolumeChange", vVal.new);
		});

		const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
		vSocket.emit("aSessions", aSessions);

		vSocket.on("ioActions", (ioActions) => {
			vSendInput.vInputs(ioActions, sPassword, oConfig);
		});

		vSocket.on("ioVolumeMaster", (ioVolumeMaster) => {
			vWinAudio.vChangeMasterVolume(ioVolumeMaster, sPassword, oConfig);
		});

		vSocket.on("ioMasterMute", (ioMasterMute) => {
			vWinAudio.vMuteMasterVolume(ioMasterMute, sPassword, oConfig);
			vWinAudio.vIsMasterMute();
		});

		vSocket.on("ioVolumeApps", (ioVolumeApps) => {
			vNodeAudio.vShowProcessList(ioVolumeApps, sPassword, oConfig);
		});

		vSocket.on("ioMuteButton", (vMuteButton) => {
			vNodeAudio.vNodeAppMute(vMuteButton, sPassword, oConfig);
		});
	}
}

module.exports = SockerIO;
