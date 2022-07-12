const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("apiSikontrol", {
	startServer: () => ipcRenderer.send("start-server"),
	stopServer: () => ipcRenderer.send("stop-server"),
	sendNewPort: (port) => ipcRenderer.send("new-port", port),
	sendNewToken: (token) => ipcRenderer.send("new-token", token)
});