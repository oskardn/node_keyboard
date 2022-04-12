const oConfig = require('../public/data/config.json');
const vSendInput = require('sendinput');

const vNext = 176, vPrevious = 177, vPlayPause = 179;
let vActionCode;

class SendInput {
    #vPrivateVar;
    vPublicVar;

    constructor(value = null) {};

    vInputs(ioActions, sPassword) {
        const sEnvPassword = oConfig.TOKEN;

        if (sPassword == sEnvPassword) {
            switch (ioActions.action) {
                case 'vPrevious':
                    vActionCode = vPrevious;
                    break;
                case 'vPlayPause':
                    vActionCode = vPlayPause;
                    break;
                case 'vNext':
                    vActionCode = vNext;
                    break;
                default:
                    return;
                    break;
            };

            vSendInput.SendInput([
                {
                    val: vActionCode,
                    type: 0
                }
            ]);
        } else {
            return;
        };
    }
}

module.exports = SendInput;