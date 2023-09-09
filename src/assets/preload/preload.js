import { contextBridge } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

console.log('Preloaded')

if (process.contextIsolated) {
	contextBridge.exposeInMainWorld('electron', electronAPI)
}