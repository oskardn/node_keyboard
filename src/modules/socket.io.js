const WinAudio = require("./win-audio");
const SendInput = require("./sendinput");
const NodeAudio = require("./node-audio-volume-mixer");

const audio = require("win-audio").speaker;
const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");

const winAudio = new WinAudio();
const sendInput = new SendInput();
const nodeAudio = new NodeAudio();

class SockerIO {
	socketEvents(socket, password, config) {
		socket.emit("ioIsMasterMute", winAudio.isMasterMute());

		socket.emit("ioWindowsActualVolume", audio.get());

		audio.events.on("change", (value) => {
			socket.emit("ioWindowsVolumeChange", value.new);
		});

		const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
		socket.emit("aSessions", sessions);

		socket.on("ioActions", (actions) => {
			sendInput.inputs(actions, password, config);
		});

		socket.on("ioVolumeMaster", (volumeMaster) => {
			winAudio.changeMasterVolume(volumeMaster, password, config);
		});

		socket.on("ioMasterMute", (masterMute) => {
			winAudio.muteMasterVolume(masterMute, password, config);
			winAudio.isMasterMute();
		});

		socket.on("ioVolumeApps", (volumeApps) => {
			nodeAudio.showProcessList(volumeApps, password, config);
		});

		socket.on("ioMuteButton", (muteButton) => {
			nodeAudio.vNodeAppMute(muteButton, password, config);
		});
	}
}

module.exports = SockerIO;
