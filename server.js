let express = require('express');
let path = require('path');
let sendInput = require('sendinput');

let app = express();
let port = 3000;

/**
 * Variables
 */
const MEDIA_NEXT = 176, MEDIA_PREV = 177, MEDIA_PLAY_PAUSE = 179; //MEDIA_STOP = 178,;

/**
 * Redirection vers l'interface web
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

/**
 * Envoi de données
 */
app.post('/prev', (req, res) => {
    sendInput.SendInput
    ([
        {val: MEDIA_PREV, type: 0 }
    ]);
    res.redirect('back');
});
app.post('/playpause', (req, res) => {
    sendInput.SendInput
    ([
        {val: MEDIA_PLAY_PAUSE, type: 0 }
    ]);
    res.redirect('back');
});
app.post('/next', (req, res) => {
    sendInput.SendInput
    ([
        {val: MEDIA_NEXT, type: 0 }
    ]);
    res.redirect('back');
});

/**
 * Écoute du port
 */
app.listen(port);