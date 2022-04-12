const oConfig = require('../public/data/config.json');
const { app, BrowserWindow } = require('electron');
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
    
            // win.loadURL(`http://localhost:${nPort}`);
            win.removeMenu();
            // win.loadFile('./src/config/vue/index.html');
            win.loadURL('http://localhost:3000');
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