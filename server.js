/**
 * Librairie à importer
 */
let express = require('express');
let app = express();
let http = require('http');
let server = http.createServer(app);
let { Server } = require('socket.io');
let io = new Server(server);
let sendInput = require('sendinput');
let audio = require('win-audio').speaker;

/**
 * Variables
 * 
 * 1 - Port
 * 2 - Keycodes Windows
 */
let port = 3000;
const MEDIA_NEXT = 176, MEDIA_PREV = 177, MEDIA_PLAY_PAUSE = 179;

/**
 * Redirection vers la page web
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

/**
 * Écoute de l'action des boutons prev/play/pause/next
 */
io.on('connection', (socket) => {
    socket.on('action', (action) => {
        let actionCode;
        switch (action) {
            case 'prev':
                actionCode = MEDIA_PREV;
                break;
            case 'playpause':
                actionCode = MEDIA_PLAY_PAUSE;
                break;
            case 'next':
                actionCode = MEDIA_NEXT;
                break;
            default:
                return;
                break;
                
        }
        sendInput.SendInput([
            {
                val: actionCode,
                type: 0
            }
        ])
    });

    /**
     * Taux de rafraichissement de la demande du son actuel
     * Envois du volume actuel vers la page web
     */
    audio.polling(200);

    audio.events.on('change', (val) => {
        socket.emit('volume state', val.new);
    });

    /**
     * Vérifier si l'entré est différent d'un string
     * 
     * Écoute de l'action du slider
     */
    socket.on('volume', (volume) => {
        switch (volume) {
            case isNaN:
                return;
                break;
            default:
                if (volume >= 0 && volume <= 100) {
                    console.log(volume);
                    audio.set(parseInt(volume));
                } else {
                    return;
                }
                break;
        }
    });
});

/**
 * Port sur lequel écouter
 */
server.listen(port, () => {
    console.log(`Écoute sur le port: ${port}`);
});