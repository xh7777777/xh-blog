import { getLastEvent, getSelector, SendTracker } from "../common"
import { getStackLines } from "../common";
export function injectJsError() {
    window.addEventListener('error', (event) => {
        let lastEvent = getLastEvent(); // 获取最后一个交互事件
        // 如果是资源加载错误
        if (event.target) {
            const target = event.target as HTMLElement
            if (target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement) {
                handleResourceError(event as ErrorEvent)
                return
            }
        }
        const { message, filename, lineno, colno, error } = event
        const stack = error ? error.stack : null
        const errorInfo = {
            timestamp: new Date().getTime().toString(),
            userAgent: window.navigator.userAgent,
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


// 资源加载错误
const handleResourceError = (event: ErrorEvent) => {
    const target = event.target || event.srcElement;
    // @ts-ignore
    const url = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement ? target.src || target.href : '';
    const errorInfo = {
        timestamp: new Date().getTime().toString(),
        userAgent: window.navigator.userAgent,
        kind: 'stability',
        type: 'error',
        errorType: 'resourceError',
        message: '',
        filename: url,
        lineno: 0,
        colno: 0,
        stack: null,
        selector: null,
    }
    console.log('resourceError', errorInfo)
    SendTracker.send(errorInfo)
}



