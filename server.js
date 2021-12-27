// Keycodes : https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes

const VOLUME_MUTE = 173, VOLUME_DOWN = 174, VOLUME_UP = 175;
const MEDIA_NEXT = 176, MEDIA_PREV = 177, MEDIA_STOP = 178, MEDIA_PLAY = 179;

let sendInput = require('sendinput');

sendInput.SendInput
([
    {val: VOLUME_MUTE, type: 0 }
]);

// Possible d'utiliser aussi la valeur Hexa
// Exemple avec Stop 0xB2 = 178
sendInput.SendInput
([
    {val: 0xB2, type: 0 }
]);