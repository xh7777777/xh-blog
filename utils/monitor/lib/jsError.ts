import { getLastEvent, getSelector, SendTracker } from "../common"
import { getStackLines } from "../common";
export function injectJsError() {
    window.addEventListener('error', (event) => {
        let lastEvent = getLastEvent(); // 获取最后一个交互事件
        const { message, filename, lineno, colno, error } = event
        const stack = error ? error.stack : null
        const errorInfo = {
            kind: 'stability',
            type: 'error',
            errorType: 'jsError',
            // url: window.location.href, 
            message,
            filename,
            lineno,
            colno,
            stack: stack ? getStackLines(stack) : null,
            selector: lastEvent ? getSelector(lastEvent.composedPath()) : null,  // 最后一个点击的元素
        }
        console.log('jsError', errorInfo)
        SendTracker.send(errorInfo)
    })
}



