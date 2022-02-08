/**
 * Librairie à importer
 */
require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const sendInput = require('sendinput');
const audio = require('win-audio').speaker;

const { NodeAudioVolumeMixer } = require("node-audio-volume-mixer");
const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();
const session = sessions.find((value) => {
    return value.name === "firefox.exe";
});

const PORT = process.env.APP_PORT;

const MEDIA_NEXT = 176, MEDIA_PREV = 177, MEDIA_PLAY_PAUSE = 179;

let tokencrypt = jwt.sign(
    {
        token: process.env.JWT_PASS
    },
    process.env.JWT_SALT,
    {
        expiresIn: 60*60 // 1 heure
    }
);
let decoded = jwt.verify(tokencrypt, process.env.JWT_SALT);

/**
 * Redirection vers la page web
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/auth', (req, res) => {
    res.sendFile(__dirname + '/auth.html');
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.post('/token', (req, res) => {
    let tokenSend = req.body.token;
    if (tokenSend == process.env.JWT_PASS) {
        res.redirect(`/?token=${tokencrypt}`);
    } else {
        res.redirect('/auth');
    };
});

/**
 * Écoute des évenement lorsque quelqu'un est connecté
 */
io.on('connection', (socket) => {

    let ip = socket.handshake;
    //console.log(ip.headers.host);
    
    socket.emit('cryptedtoken', (tokencrypt));

    socket.on('token', (token) => {
        if (token == process.env.JWT_PASS || token == decoded.token) {
            // Tache fini
        } else {
            socket.emit('auth')
        };
    });

    /**
     * Écoute de l'action des boutons prev/play/pause/next
     */
    let dateTimestamp = Math.round(new Date().getTime() / 1000);

    socket.on('action', (action) => {
        if (action.token == process.env.JWT_PASS) {
            if (action.exp < (Math.round(new Date().getTime() / 1000)) ) {
                socket.emit('auth');
            } else {
                let actionCode;
                switch (action.action) {
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
                };
                sendInput.SendInput([
                    {
                        val: actionCode,
                        type: 0
                    }
                ]);
            };
        };
    });

    /**
     * Taux de rafraichissement de la demande du son actuel
     * Envois du volume actuel vers la page web
     */
    audio.polling(200);

    audio.events.on('change', (val) => {
        socket.emit('volume change', val.new);
    });

    /**
     * Vérifier si l'entré est différent d'un string
     * 
     * Écoute de l'action du slider
     */
    socket.on('volume', (volume) => {
        if (volume.token == process.env.JWT_PASS) {
            switch (volume.volume) {
                case isNaN:
                    return;
                    break;
                default:
                    if (volume.volume >= 0 && volume.volume <= 100) {
                        console.log(volume.volume/100);
                        switch (volume.action.vol) {
                            case 'master':
                                audio.set(parseInt(volume.volume));
                                break;
                            case 'firefox':
                                NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(session.pid, volume.volume / 100);
                                break;
                            default:
                                return;
                                break;
                        }
                    } else {
                        return;
                    }
                    break;
            };
        } else {
            return;
        }
    });
});

/**
 * Port sur lequel écouter
 */
server.listen(PORT, () => {
    console.log(`Écoute sur le port: ${PORT}`);
});