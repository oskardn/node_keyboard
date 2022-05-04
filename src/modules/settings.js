const Electron = require("./electron");

const vPath = require("path");
const vEditJsonFile = require("edit-json-file");
const vDetectPort = require("detect-port");
const vSQLite3 = require("sqlite3").verbose();

const vElectron = new Electron();

const oConfig = require("../public/data/config.json");

const sDbName = "config.local.db";

class cSettings {
    vInitConfig() {
        const vDb = new vSQLite3.Database(sDbName, (vError) => {
            if (vError) {
                throw vError;
            }

            vDb.run(`
                    CREATE TABLE IF NOT EXISTS config(
                        id INTEGER,
                        libelle TEXT,
                        valeur TEXT,
                        PRIMARY KEY(id)
                    );
                `);

            vDb.all("SELECT * FROM config", (vError, oData) => {
                if (vError) {
                    return;
                }

                if (oData == "") {
                    this.#vCreateConfig();
                } else {
                    console.log(oData[0].valeur);
                    console.log(oData[1].valeur);
                }
            });
        });
    }

    #vCreateConfig() {
        const vDb = new vSQLite3.Database(sDbName, (vError) => {
            vDb.run(
                'INSERT INTO config (libelle, valeur) VALUES ("port", 3000)'
            );
            vDb.run(
                'INSERT INTO config (libelle, valeur) VALUES ("token", 1234)'
            );
        });
    }

    vChangeServerPort(oResponse) {
        let nPort = oResponse.data;
        let vFile = vEditJsonFile(
            vPath.join(__dirname, "../public/data/config.json")
        );

        if (!nPort) {
            const vType = "warning",
                sTitre = "Avertissement",
                sMessage = "Port non renseigné";
            const sDetail =
                "Vous devez renseinger le port pour pouvoir le changer.";

            vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
        } else {
            if (isNaN(nPort)) {
                const vType = "error",
                    sTitre = "Erreur",
                    sMessage = "Paramètre invalide";
                const sDetail =
                    "Vous avez renseigné une valeur du port non valide";

                vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
            } else {
                if (nPort >= 0 && nPort <= 65535) {
                    vDetectPort(nPort, (vError, vOtherPort) => {
                        if (vError) {
                            console.log(vError);
                        }

                        if (nPort == vOtherPort) {
                            vFile.set("APP_PORT", parseInt(nPort));
                            vFile.save();
                            vElectron.vRelaunchApp();
                        } else {
                            const vType = "error",
                                sTitre = "Erreur",
                                sMessage = "Port non disponible";
                            const sDetail = `Vous avez renseigné un port non disponible.\nEssayez le port : ${vOtherPort}`;

                            vElectron.vAlertBox(
                                vType,
                                sTitre,
                                sMessage,
                                sDetail
                            );
                        }
                    });
                } else {
                    const vType = "error",
                        sTitre = "Erreur",
                        sMessage = "Port non disponible";
                    const sDetail = `Vous avez renseigné un port non disponible. Le port doit être situé entre 0 et 65535.`;

                    vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
                }
            }
        }
    }

    vChangeServerToken(oResponse) {
        let sToken = oResponse.data;
        // let vFile = vEditJsonFile(vPath.join(__dirname, '../public/data/config.json'));

        if (!sToken) {
            const vType = "warning",
                sTitre = "Avertissement",
                sMessage = "Token non renseigné";
            const sDetail =
                "Vous devez renseinger le token pour pouvoir le changer.";

            vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
        } else {
            // this.#vUpdateConfig();
            // vFile.set('TOKEN', sToken);
            // vFile.save();
            // vElectron.vRelaunchApp();
        }
    }

    #vUpdateConfig() {
        const vDb = new vSQLite3.Database(sDbName, (vError) => {
            if (vError) {
                throw vError;
            }

            // vDb.run('PRAGMA database_list');
        });
    }
}

module.exports = cSettings;
