import { ErrorInfo, TrackRequest, FetchErrorInfo } from "./errorTypes";

const actions = ['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'];
const host = 'cn-hangzhou.log.aliyuncs.com'
const project = 'blog-track'
const logStore = 'blog'


let lastEvent: Event | null = null;

export function injectLastEvent() {
    actions.forEach(action => {
        document.addEventListener(action, (event) => {
            lastEvent = event;
        }, {
            capture: true,   // 捕获阶段触发
            passive: true    // 不阻止默认行为
        })
    })
}

export function getLastEvent() {
    return lastEvent
}

export function getSelector(path: any[]) {
    return path.reverse().filter(element => {
        return element !== window && element !== document
    }).map(element => {
        let selector = element.tagName;
        if (element.id) {
            selector += '#' + element.id
        }
        if (element.classList.length) {
            selector += '.' + Array.from(element.classList).join('.')
        }
        return selector
    }).join(' ')
}

export class SendTracker {
    static url: string = `https://${project}.${host}/logstores/${logStore}/track`
    static async send(data: ErrorInfo | FetchErrorInfo) {
        console.log('send', data)
        for (let key in data) {
            if (data[key] === null || data[key] === undefined) {
                delete data[key]
            }
            if (typeof data[key] === 'number') {
                data[key] = data[key].toString()
            }
        }
        const request: TrackRequest = {
            project,
            logstoreName: logStore,
            body: {
                __source__: 'web',
                __logs__: [data]
            }
        }
        const res = await fetch(SendTracker.url, {
            method: 'POST',
            body: JSON.stringify(request.body),
            headers: {
                'Content-Type': 'application/json',
                'x-log-apiversion': '0.6.0',
                'x-log-bodyrawsize': JSON.stringify(request).length.toString()
            }
        })
        // const result = await res.json()
        // console.log('send result', result)
    }
}

export function getStackLines(stack: string) {
    return stack.split('\n').slice(1).map((line) => line.replace(/^\s+at\s+/g, '')).join('^')
}

export function isLoaded(callback: () => any) {
    if (document.readyState === 'complete') {
        callback && callback();
    } else {
        window.addEventListener('load', callback);
    }
}