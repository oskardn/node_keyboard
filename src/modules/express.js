const vExpress = require('express');
const vPath = require('path');

const vApp = vExpress();

class cExpress {
    vReturnApp() {
        return vApp;
    }
}

module.exports = cExpress;