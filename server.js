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

let PORT = process.env.APP_PORT || 3000;
let SALT = process.env.JWT_SALT || "YouHaveToAddSaltToEnvFile";
let TOKEN = process.env.JWT_PASS;

if (typeof TOKEN === undefined) {
    console.error("Aucun token n'a été renseigné dans les paramètres de l'application.\nRajoutez le dans fichier .env");
    process.exit();
}

const MEDIA_NEXT = 176, MEDIA_PREV = 177, MEDIA_PLAY_PAUSE = 179;

let tokencrypt = jwt.sign(
    {
        token: TOKEN
    },
    SALT,
    {
        expiresIn: 60*60 // 1 heure
    }
);
let decoded = jwt.verify(tokencrypt, SALT);

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
    if (tokenSend == TOKEN) {
        res.redirect(`/?token=${tokencrypt}`);
    } else {
        res.redirect('/auth');
    };
});

io.on('connection', (socket) => {

    let ip = socket.handshake;
    
    socket.emit('cryptedtoken', (tokencrypt));

    socket.on('token', (token) => {
        if (token == TOKEN || token == decoded.token) {
            // Tache fini
        } else {
            socket.emit('auth')
        };
    });

    let dateTimestamp = Math.round(new Date().getTime() / 1000);

    socket.on('action', (action) => {
        if (action.token == TOKEN) {
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

    audio.polling(200);

    audio.events.on('change', (val) => {
        socket.emit('volume change', val.new);
    });

    socket.on('volume', (volume) => {
        if (volume.token == TOKEN) {
            switch (volume.volume) {
                case isNaN:
                    return;
                    break;
                default:
                    if (volume.volume >= 0 && volume.volume <= 100) {
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

server.listen(PORT, () => {
    console.log(`Écoute sur le port: ${PORT}`);
});