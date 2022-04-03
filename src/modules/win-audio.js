require('dotenv').config();
const vAudio = require('win-audio').speaker;

vAudio.polling(200);

class WinAudio {
    #vPrivateVar;
    vPublicVar;

    constructor(value = null) {};

    vChangeMasterVolume(ioVolumeMaster, sPassword) {
        const sEnvPassword = process.env.TOKEN;

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
}

module.exports = WinAudio;