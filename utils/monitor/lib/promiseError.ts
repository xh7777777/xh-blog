import { getLastEvent, getSelector, SendTracker } from "../common"
import { getStackLines } from "../common";
export function injectPromiseError() {
    window.addEventListener('unhandledrejection', (event) => {
        let lastEvent = getLastEvent(); // 获取最后一个交互事件
        let reason = event.reason
        let message = ''
        let filename = ''
        let lineno = 0
        let colno = 0
        let stack = ''
        if (typeof reason === 'string') {
            message = reason
        } else if (typeof reason === 'object') {
            if (reason.stack) {
                let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
                filename = matchResult ? matchResult[1] : ''
                lineno = matchResult ? Number(matchResult[2]) : 0
                colno = matchResult ? Number(matchResult[3]) : 0
                message = reason.message
                stack = getStackLines(reason.stack)
            }
        }

        const errorInfo = {
            kind: 'stability',
            type: 'error',
            errorType: 'promiseError',
            message,
            filename,
            lineno,
            colno,
            stack,
            selector: lastEvent ? getSelector(lastEvent.composedPath()) : null,  // 最后一个点击的元素
        }
        SendTracker.send(errorInfo)
    })
}