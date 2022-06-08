const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	vStartServer: () => ipcRenderer.send("ipcStartServer"),
	vStopServer: () => ipcRenderer.send("ipcStopServer"),
});
