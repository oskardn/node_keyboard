const vSendInput = require('sendinput');

const vNext = 176, vPrevious = 177, vPlayPause = 179;
let vActionCode;

class SendInput {
    #vPrivateVar;
    vPublicVar;

    constructor(value = null) {};

    vInputs(vActions) {
        switch (vActions.action) {
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
    }
}

module.exports = SendInput;