import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import * as path from 'path';
import { getPath } from './utils/pathUtil';
let mainWindow: Electron.BrowserWindow;

//@ts-ignore
process.env.isProduction = "false";

// 主进程
let mainId = null; // mainID 可以作为其他的子窗口

function createWindow(): void {
    /**
     * @description 可以跟mainWindow 给对应的回调函数
     */
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        x: 100,
        y: 100,
        webPreferences: {
            preload: path.join(__dirname, './server/index.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainId = mainWindow.id;
    require('@electron/remote/main').initialize()
    require("@electron/remote/main").enable(mainWindow.webContents)


    // 创建菜单栏
    const menuTable = [
        {
            label: '文件', submenu: [
                { label: '测试' },
                { type: "separator" },
                { label: '打开' },
                { label: '关于', role: 'about' }
            ]
        },
        { label: "编辑" }
    ]
    // @ts-ignore
    let menu = Menu.buildFromTemplate(menuTable)
    Menu.setApplicationMenu(menu);

    ipcMain.on("msg",(ev,data)=>{
        console.log('data',data);
    })

    mainWindow.loadFile(getPath("pages/index.html"));
    mainWindow.on("ready-to-show", () => {
        mainWindow.show()
    })
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        console.log("被关闭了");

        mainWindow = null;
    });

}
app.on('ready', createWindow);



app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
