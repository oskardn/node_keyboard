const oConfig = require('../public/data/config.json');
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

class Electron {
    vGenerateWindows() {
        const nPort = oConfig.APP_PORT || 3000;

        const createWindow = () => {
            const win = new BrowserWindow({
                width: 800,
                height: 600,
                webPreferences: {
                    preload: path.join(__dirname, '../config/js/preload.js')
                }
            });

            win.loadFile('./src/home/vue/index.html');
            // win.loadURL(`http://localhost:${nPort}`);
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
}

module.exports = Electron;