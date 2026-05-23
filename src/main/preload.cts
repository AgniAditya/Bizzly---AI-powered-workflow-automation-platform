const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', { 
    greet: (name: string) => ipcRenderer.invoke('greet', name)
})