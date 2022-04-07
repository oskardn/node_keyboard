const vExpress = require('express');
const path = require('path');

const vApp = vExpress();

class Express {
    #vPrivateVar;
    vPublicVar;

    constructor(value = null) {};

    vCallExpress() {
        this.#vStartExpress();
    }

    vHttpServer() {
        return vApp;
    }

    #vStartExpress() {
        vApp.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/vue/index.html'));
        });

        vApp.use(vExpress.static(path.join(__dirname, '../public')));
    }
}

module.exports = Express;