// 渲染进程
import * as path from 'path';
import { getPath } from '../utils/pathUtil';
import { BrowserWindow, getCurrentWindow, Menu,dialog } from '@electron/remote';
import { MenuItem } from 'electron/main';

/**
 * @description nodejs API 用于创建对应的内容
 */
window.addEventListener('DOMContentLoaded', () => {
  let button = document.getElementById("btn")
  button.addEventListener("click", () => {
    dialog.showOpenDialog({
      buttonLabel:"测试111",
      title:"测试标题",
      // 预设 多选|目录不存在则创建
      properties:['multiSelections','promptToCreate','openFile'],
      filters:[
        {
          'name':'taro协议文件',extensions:['taro']
        }
      ]
    }).then(res=>{
      // 编译taro 文件
      const _filePath_ = res.filePaths[0]
      
      console.log(res);
    })
    // const win = new BrowserWindow({
    //   height: 600,
    //   width: 800,
    //   parent: getCurrentWindow(), // 该配置会指定父子关系,
    //   // modal:true, // 该配置会将父窗口指定不能修改
    //   webPreferences: {
    //     preload: path.join(__dirname, './test_add.js'),
    //     nodeIntegration: true,
    //     contextIsolation: false,

    //   },
    // })


    // win.loadFile(getPath("pages/test_add.html"))

    // win.on("ready-to-show", () => {
    //   win.show()
    // })
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