import { SendTracker } from "../common";

function isLoaded(callback) {
    if (document.readyState === 'complete') {
        callback && callback();
    } else {
        window.addEventListener('load', callback);
    }
}
export function injectWhiteScreenError() {
    const wrapperElements = ['html', 'body'];
    // 计算空白点
    let emptyPoints = 0;
    function isWrapper(element) {
        return wrapperElements.indexOf(element.tagName.toLowerCase()) !== -1;
    }
    for (let i = 1; i <= 9; i++) {
        let xElements = document.elementsFromPoint(window.innerWidth * i / 10, window.innerHeight / 2);
        let yElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight * i / 10);
        console.log('xElements', xElements);
        console.log('yElements', yElements);
    }
    if (emptyPoints >= 9) {
        // 发送请求
        const errorInfo = {
            kind: 'stability',
            type: 'whiteScreen',
            emptyPoints,
            screen: window.screen.width + 'X' + window.screen.height,
            viewPoint: window.innerWidth + 'X' + window.innerHeight,
            selector: '',
        };
        // SendTracker.send(errorInfo);
    }
}

