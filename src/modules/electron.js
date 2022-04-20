const oConfig = require('../public/data/config.json');

const { app, BrowserWindow, dialog, Menu, Tray } = require('electron');
const vPath = require('path');
const vOpen = require('open');

class cElectron {
    vGenerateWindows() {
        let vApp = app, vTrayInit = null;
        let vBrowserWindow = BrowserWindow, vMenu = Menu, vTray = Tray;

        const vCreateWindow = () => {
            const vWin = new vBrowserWindow({
                width: 800,
                height: 600,
                icon: vPath.join(__dirname, '../global/img/small-icon.png')
            });

            vWin.loadFile('./src/home/vue/index.html');

            vWin.on('minimize', () => {
                if (vTrayInit) {
                    return vWin.hide();
                };

                vTrayInit = new vTray(vPath.join(__dirname, '../global/img/small-icon.png'));

                const aTemplate = [
                    {
                        label: 'Node Keyboard', click: () => {
                            vOpen('https://github.com/oskardn/node_keyboard');
                        },
                        icon: vPath.join(__dirname, '../global/img/very-small-icon.png'),
                        enabled: true,
                    },
                    {
                        type: 'separator',
                    },
                    {
                        label: 'Afficher l\'application', click: () => {
                            vWin.show();
                        },
                    },
                    {
                        label: 'Quitter l\'application', click: () => {
                            vWin.close();
                        },
                    },
                ];

                const vContextMenu = vMenu.buildFromTemplate(aTemplate);

                vTrayInit.setContextMenu(vContextMenu);
                vTrayInit.setToolTip('Node Keyboard');

                vWin.hide();
            });
        };

        vApp.whenReady().then(() => {
            vCreateWindow();

            vApp.on('activate', () => {
                if (vBrowserWindow.getAllWindows().length === 0) {
                    vCreateWindow();
                };
            });
        });

        vApp.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                vApp.quit();
            };
        });
    }

    vAlertBox(vType, sTitre, sMessage, sDetail) {
        let vDialog = dialog;

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
        
        vDialog.showMessageBox(null, oOptions, (vResponse, vCheckboxChecked) => {
            console.log(vResponse);
            console.log(vCheckboxChecked);
        });
    }

    vRelaunchApp() {
        vApp.relaunch();
        vApp.exit();
    }
}

module.exports = cElectron;