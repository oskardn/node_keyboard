const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("apiSikontrol", {
	vStartServer: () => ipcRenderer.send("start-server"),
	vStopServer: () => ipcRenderer.send("stop-server"),
	vSendNewPort: (nPort) => ipcRenderer.send("new-port", nPort),
	vSendNewToken: (sToken) => ipcRenderer.send("new-token", sToken)
});