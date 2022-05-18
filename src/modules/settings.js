const Electron = require("./electron");

const vDetectPort = require("detect-port");
const vSQLite3 = require("sqlite3").verbose();

const vElectron = new Electron();

const oConfig = require("../global/config.json");

const sDbName = "config.local.db";
const vDb = new vSQLite3.Database(sDbName);

class cSettings {
    sqlChangeServerPort(oResponse) {
        let nPort = oResponse.data;

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
                if (nPort >= 1 && nPort <= 65535) {
                    vDetectPort(nPort, (vError, vOtherPort) => {
                        if (vError) {
                            console.log(vError);
                        }

                        if (nPort == vOtherPort) {
                            vDb.run(
                                `UPDATE config SET valeur = ${nPort} WHERE libelle = "port"`
                            );
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

    sqlChangeServerToken(oResponse) {
        let sToken = oResponse.data;

        if (!sToken) {
            const vType = "warning",
                sTitre = "Avertissement",
                sMessage = "Token non renseigné";
            const sDetail =
                "Vous devez renseigner le token pour pouvoir le changer.";

            vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
        } else {
            vDb.run(
                `UPDATE config SET valeur = "${sToken}" WHERE libelle = "token"`
            );
            vElectron.vRelaunchApp();
        }
    }
}

module.exports = cSettings;
