const WinAudio = require('./win-audio');
const SendInput = require('./sendinput');
const NodeAudio = require('./node-audio-volume-mixer');

const vAudio = require('win-audio').speaker;
const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");

const vWinAudio = new WinAudio();
const vSendInput = new SendInput();
const vNodeAudio = new NodeAudio();

const oAppBlocklist = require('../public/data/blocklist.json');

class cSockerIO {
    vSocketEvents(vSocket, sPassword) {
        vSocket.emit('vIsMasterMute', vWinAudio.vIsMasterMute());

        vSocket.emit('vWindowsActualVolume', vAudio.get());

        vAudio.events.on('change', (vVal) => {
            vSocket.emit('vWindowsVolumeChange', vVal.new);
        });

        const aSessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
        vSocket.emit('aSessions', aSessions);
        vSocket.emit('oAppBlocklist', oAppBlocklist);

        vSocket.on('ioActions', (ioActions) => {
            vSendInput.vInputs(ioActions, sPassword);
        });

        vSocket.on('ioVolumeMaster', (ioVolumeMaster) => {
            vWinAudio.vChangeMasterVolume(ioVolumeMaster, sPassword);
        });

        vSocket.on('ioMasterMute', (ioMasterMute) => {
            vWinAudio.vMuteMasterVolume(ioMasterMute, sPassword);
            vWinAudio.vIsMasterMute();
        });

        vSocket.on('ioVolumeApps', (ioVolumeApps) => {
            vNodeAudio.vShowProcessList(ioVolumeApps, sPassword);
        });

        vSocket.on('vMuteButton', (vMuteButton) => {
            vNodeAudio.vNodeAppMute(vMuteButton, sPassword);
        });
    }
}

module.exports = cSockerIO;