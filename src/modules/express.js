const vExpress = require('express');
const vPath = require('path');

const vApp = vExpress();

class Express {
    vReturnApp() {
        return vApp;
    }

    vRequestSettings() {}
}

module.exports = Express;