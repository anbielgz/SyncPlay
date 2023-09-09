import { app, BrowserWindow, screen, ipcMain, dialog, shell } from 'electron'
import { is } from '@electron-toolkit/utils'
import { join, basename, extname } from 'path'
import { format } from 'url'

const CURRENT_APP_PATH = app.getAppPath()

//Create Main Window
function createWindow() {	

	const { height, width } = screen.getPrimaryDisplay().workAreaSize

	let win = new BrowserWindow({
		height: Math.floor(height * 0.9),
		width: Math.floor(width * 0.85),
		backgroundColor: "#030303",
		resizable: false,
		title: "SyncPlay",
		frame: false,
		icon: join(__dirname, '../public', 'favicon.ico'),
		webPreferences: {
			preload: join(__dirname, 'assets', 'preload', 'preload.js'),
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: false,
			webSecurity: false
		}
	})

	win.removeMenu()

	if(is.dev && process.env['ELECTRON_RENDERER_URL']) {
		win.loadURL(process.env['ELECTRON_RENDERER_URL'])
	} else {
		win.loadFile(join(__dirname, 'dist', 'index.html'))
	}

	if(is.dev) { win.webContents.openDevTools() }

	ipcMain.handle('close-window', () => {
		win.close()
	})
	
	ipcMain.handle('minimize-window', () => {
		win.minimize()
	})

	//Events For LaunchButton
	ipcMain.handle('open-dialog', async (event) => {
		//Metodo invocado desde el Renderer Process, para selecionar un archivo
		try {
			const result = await dialog.showOpenDialog({
				title: "Selecione un archivo",
				filters: [
					{ name: "Audio Files", extensions: ["mp3", "wav", "ogg", "aac", "flac"]}
				],
				properties: ['openFile']
			})
			//Comprueba si el dialogo no ha sido cancelado, si es asi, devuelve un objeto
			if(!result.canceled) {
				const file = { 
					path: result.filePaths[0],
					name: basename(result.filePaths[0]), //Obtiene solo el nombre del ruta
					ext: extname(result.filePaths[0]) //Obtiene la extension del archivo
				}
				return file
			}
		} catch(err) {
			console.log(err)
		}
	})

	ipcMain.handle('open-folder', () => {
		shell.openPath(CURRENT_APP_PATH)
	})
}

app.whenReady().then(() => {
	createWindow()
})


app.on('window-all-closed', () => {
	if(process.platform !== 'darwin') {
		app.quit()
	}
})