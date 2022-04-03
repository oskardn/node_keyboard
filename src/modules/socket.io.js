const WinAudio = require('./win-audio');
const SendInput = require('./sendinput');

const vAudio = require('win-audio').speaker;

const vWinAudio = new WinAudio();
const vSendInput = new SendInput();

class SockerIO {
    #vPrivateVar;
    vPublicVar;

    constructor(value = null) {};

    vSocketEvents(vSocket) {
        vSocket.emit('vWindowsActualVolume', vAudio.get());

        vAudio.events.on('change', (vVal) => {
            vSocket.emit('vWindowsVolumeChange', vVal.new);
        });

        vSocket.on('vActions', (vActions) => {
            vSendInput.vInputs(vActions);
        });

        vSocket.on('ioVolumeMaster', (ioVolumeMaster) => {
            vWinAudio.vChangeMasterVolume(ioVolumeMaster);
        });
    }
}

module.exports = SockerIO;