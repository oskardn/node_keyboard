const cSettings = require("./settings");

const vExpress = require("express");
const vPath = require("path");
const vBodyParser = require("body-parser");

const vSettings = new cSettings();

const vApp = vExpress();

class cExpress {
    vReturnApp() {
        return vApp;
    }

    vStartExpress() {
        this.#vInitExpress();
    }

    #vInitExpress() {
        vApp.use(vBodyParser.json());
        vApp.use(vBodyParser.urlencoded());
        vApp.use(vBodyParser.urlencoded({ extended: true }));

        vApp.get("/", (req, res) => {
            res.sendStatus(404);
        });

        vApp.post("/port", (req, res) => {
            let oResponse = req.body;

            vSettings.sqlChangeServerPort(oResponse);
        });

        vApp.post("/token", (req, res) => {
            let oResponse = req.body;

            vSettings.sqlChangeServerToken(oResponse);
        });
    }
}

module.exports = cExpress;
