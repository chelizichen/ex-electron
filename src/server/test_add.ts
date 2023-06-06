import { ipcRenderer } from 'electron';
// 渲染进程

/**
 * @description nodejs API 用于创建对应的内容
 */
window.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById("btn")
    button.addEventListener("click", function () {
        button.style.color = "red"
        ipcRenderer.send("msg","发送消息")
    })
})

