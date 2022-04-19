const Electron = require('./electron');

const vPath = require('path');
const vEditJsonFile = require('edit-json-file');
const vDetectPort = require('detect-port');

const vElectron = new Electron();

const oConfig = require('../public/data/config.json');

class Settings {
    vChangeServerSettings(oResponse) {
        let nPort = oResponse.port, sToken = oResponse.token;
        let vFile = vEditJsonFile(vPath.join(__dirname, '../public/data/config.json'));

        if (!(nPort) && !(sToken)) {
            const vType = 'warning', sTitre = 'Avertissement', sMessage = 'Paramètres manquants';
            const sDetail = 'Vous devez renseinger au moins un champ\n- Port\n- Token';

            vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
        } else {
            if (nPort) {
                if (isNaN(nPort)) {
                    const vType = 'error', sTitre = 'Erreur', sMessage = 'Paramètre invalide';
                    const sDetail = 'Vous avez renseigné une valeur du port non valide';

                    vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
                } else {
                    vDetectPort(nPort, (vError, vOtherPort) => {
                        if (vError) {
                            console.log(vError);
                        };
        
                        if (nPort == vOtherPort) {
                            vFile.set('APP_PORT', parseInt(nPort));
                            vFile.save();
                        } else {
                            const vType = 'error', sTitre = 'Erreur', sMessage = 'Port non disponible';
                            const sDetail = `Vous avez renseigné un port non disponible.\nEssayez le port : ${vOtherPort}`;

                            vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
                        };
                    });
                };
            };
            
            if (sToken) {
                vFile.set('TOKEN', sToken);
                vFile.save();
            };
        };

        // vElectron.vRelaunchApp();
    }
}

module.exports = Settings;