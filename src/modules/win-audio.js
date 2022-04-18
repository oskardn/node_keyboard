const oConfig = require('../public/data/config.json');
const vAudio = require('win-audio').speaker;

vAudio.polling(200);

class WinAudio {
    vChangeMasterVolume(ioVolumeMaster, sPassword) {
        const sEnvPassword = oConfig.TOKEN;

        if (sPassword == sEnvPassword) {
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
            };
        } else {
            return;
        };
    }

    vMuteMasterVolume(ioMasterMute, sPassword) {
        const sEnvPassword = oConfig.TOKEN;

        if (sPassword == sEnvPassword) {
            if (vAudio.isMuted() == false) {
                vAudio.mute();
            } else if (vAudio.isMuted() == true) {
                vAudio.unmute();
            };
        };
    }
}

module.exports = WinAudio;