const oConfig = require('../public/data/config.json');
const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

class cElectron {
    vGenerateWindows() {
        const createWindow = () => {
            const win = new BrowserWindow({
                width: 800,
                height: 600,
                // icon: path.join(__dirname, '../global/img/icon.png')
            });

            win.loadFile('./src/home/vue/index.html');
        };

        app.whenReady().then(() => {
            createWindow();

            app.on('activate', () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    createWindow();
                };
            });
        });

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            };
        });
    }

    vAlertBox(vType, sTitre, sMessage, sDetail) {
        const oOptions = {
            type: vType,
            buttons: ['OK'],
            defaultId: 2,
            title: sTitre,
            message: sMessage,
            detail: sDetail,
            checkboxLabel: 'Se souvenir de mon choix',
            checkboxChecked: false,
        };
        
        dialog.showMessageBox(null, oOptions, (vResponse, vCheckboxChecked) => {
            console.log(vResponse);
            console.log(vCheckboxChecked);
        });
    }

    vRelaunchApp() {
        app.relaunch();
        app.exit();
    }
}

module.exports = cElectron;