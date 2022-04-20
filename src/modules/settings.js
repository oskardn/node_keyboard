const Electron = require('./electron');

const vPath = require('path');
const vEditJsonFile = require('edit-json-file');
const vDetectPort = require('detect-port');

const vElectron = new Electron();

const oConfig = require('../public/data/config.json');

class cSettings {
    vChangeServerPort(oResponse) {
        let nPort = oResponse.data;
        let vFile = vEditJsonFile(vPath.join(__dirname, '../public/data/config.json'));
        
        if(!(nPort)) {
            const vType = 'warning', sTitre = 'Avertissement', sMessage = 'Port non renseigné';
            const sDetail = 'Vous devez renseinger le port pour pouvoir le changer.';

            vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
        } else {
            if (isNaN(nPort)) {
                const vType = 'error', sTitre = 'Erreur', sMessage = 'Paramètre invalide';
                const sDetail = 'Vous avez renseigné une valeur du port non valide';

                vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
            } else {
                if (nPort >=0 && nPort <= 65535) {
                    vDetectPort(nPort, (vError, vOtherPort) => {
                        if (vError) {
                            console.log(vError);
                        };
        
                        if (nPort == vOtherPort) {
                            vFile.set('APP_PORT', parseInt(nPort));
                            vFile.save();
                            vElectron.vRelaunchApp();
                        } else {
                            const vType = 'error', sTitre = 'Erreur', sMessage = 'Port non disponible';
                            const sDetail = `Vous avez renseigné un port non disponible.\nEssayez le port : ${vOtherPort}`;
    
                            vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
                        };
                    });
                } else {
                    const vType = 'error', sTitre = 'Erreur', sMessage = 'Port non disponible';
                    const sDetail = `Vous avez renseigné un port non disponible. Le port doit être situé entre 0 et 65535.`;
    
                    vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
                };
            };
        };
    }

    vChangeServerToken(oResponse) {
        let sToken = oResponse.data;
        let vFile = vEditJsonFile(vPath.join(__dirname, '../public/data/config.json'));

        if (!(sToken)) {
            const vType = 'warning', sTitre = 'Avertissement', sMessage = 'Token non renseigné';
            const sDetail = 'Vous devez renseinger le token pour pouvoir le changer.';

            vElectron.vAlertBox(vType, sTitre, sMessage, sDetail);
        } else {
            vFile.set('TOKEN', sToken);
            vFile.save();
            vElectron.vRelaunchApp();
        };
    }
}

module.exports = cSettings;