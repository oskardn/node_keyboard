const vAudio = require('win-audio').speaker;

vAudio.polling(200);

class WinAudio {
    #vPrivateVar;
    vPublicVar;

    constructor(value = null) {};

    vChangeMasterVolume(ioVolumeMaster) {
        switch (ioVolumeMaster) {
            case isNaN:
                return;
                break;
            default:
                if (ioVolumeMaster.volume >= 0 && ioVolumeMaster.volume <= 100) {
                    vAudio.set(parseInt(ioVolumeMaster.volume));
                } else {
                    return;
                }
                break;
        }
    }
}

module.exports = WinAudio;