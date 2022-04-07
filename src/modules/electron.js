
require('dotenv').config();
const { app, BrowserWindow } = require('electron');

class Electron {
    #vPrivateVar;
    vPublicVar;

    constructor(value = null) {};

    vGenerateWindows() {
        const nPort = process.env.APP_PORT || 3000;

        const createWindow = () => {
            const win = new BrowserWindow({
                width: 800,
                height: 600
            });
    
            win.loadURL(`http://localhost:${nPort}`);
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