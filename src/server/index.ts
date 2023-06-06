// 渲染进程
import * as path from 'path';
import { getPath } from '../utils/pathUtil';
import { BrowserWindow, getCurrentWindow, Menu } from '@electron/remote';
import { MenuItem } from 'electron/main';

/**
 * @description nodejs API 用于创建对应的内容
 */
window.addEventListener('DOMContentLoaded', () => {
  let button = document.getElementById("btn")
  button.addEventListener("click", () => {
    const win = new BrowserWindow({
      height: 600,
      width: 800,
      parent: getCurrentWindow(), // 该配置会指定父子关系,
      // modal:true, // 该配置会将父窗口指定不能修改
      webPreferences: {
        preload: path.join(__dirname, './test_add.js'),
        nodeIntegration: true,
        contextIsolation: false,

      },

    })


    win.loadFile(getPath("pages/test_add.html"))

    win.on("ready-to-show", () => {
      win.show()
    })
  })

})

const menuContext = [
  { label: "Run Code", },
  { label: "转到定义" },

]
const context = Menu.buildFromTemplate(menuContext)
window.addEventListener("contextmenu", function (ev) {
  ev.preventDefault()
  context.popup({ window: getCurrentWindow() })
})