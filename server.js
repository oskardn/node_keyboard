/**
 * Librairie à importer
 */
require('dotenv').config()

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const jwt = require('jsonwebtoken');
const sendInput = require('sendinput');
const audio = require('win-audio').speaker;

/**
 * Variables
 * 
 * 1 - Port
 * 2 - Keycodes Windows
 * 3 - Token
 */
const PORT = 3000;

const MEDIA_NEXT = 176, MEDIA_PREV = 177, MEDIA_PLAY_PAUSE = 179;

let token = jwt.sign({
        oskar: process.env.JWT_PASS
    },
    process.env.JWT_SALT, {
        expiresIn: 60
    });

let decoded = jwt.verify(token, process.env.JWT_SALT);

/**
 * Redirection vers la page web
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

/**
 * Verification token
 */
jwt.verify(token, process.env.JWT_SALT, (err, decoded) => {
    console.log(token);
});

/**
 * Écoute des évenement lorsque quelqu'un est connecté
 */
io.on('connection', (socket) => {
    /**
     * Écoute de l'action des boutons prev/play/pause/next
     */
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
                
        };
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
        socket.emit('volume change', val.new);
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
                    audio.set(parseInt(volume));
                } else {
                    return;
                }
                break;
        };
    });
});

/**
 * Port sur lequel écouter
 */
server.listen(PORT, () => {
    console.log(`Écoute sur le port: ${PORT}`);
});