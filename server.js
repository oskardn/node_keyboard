let sendInput = require('sendinput');

const VOLUME_MUTE = 173, VOLUME_DOWN = 174, VOLUME_UP = 175;
const MEDIA_NEXT = 176, MEDIA_PREV = 177, MEDIA_STOP = 178, MEDIA_PLAY = 179;

sendInput.SendInput
([
    {val: MEDIA_PLAY, type: 0 }
]);