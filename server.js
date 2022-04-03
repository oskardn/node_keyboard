/**
 * Type de codage
 * 
 * a  -> array
 * e  -> element
 * io -> socket.io
 * n  -> number
 * o  -> object
 * s  -> string
 * v  -> void
 */

const Express = require('./src/modules/express');
const SockerIO = require('./src/modules/socket.io');

const vHttp = require('http');
const { Server } = require('socket.io');

const vExpress = new Express();
const vSocketIO = new SockerIO();

vExpress.vCallExpress();

const vHttpServer = vHttp.createServer(vExpress.vHttpServer());
const vIo = new Server(vHttpServer);

vIo.on('connection', (vSocket) => {
    vSocketIO.vSocketEvents(vSocket);
});

vHttpServer.listen(3000, () => {
    console.log('Server started');
});