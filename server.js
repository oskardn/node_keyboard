let express = require('express');
let app = express();
let http = require('http');
let server = http.createServer(app);
let { Server } = require('socket.io');
let io = new Server(server);
let sendInput = require('sendinput');

let port = 3000;
const MEDIA_NEXT = 176, MEDIA_PREV = 177, MEDIA_PLAY_PAUSE = 179;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

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
});

server.listen(port, () => {
    console.log(`Écoute sur le port localhost:${port}`);
});