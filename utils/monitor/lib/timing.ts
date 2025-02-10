import { SendTracker, isLoaded } from "../common";

export function injectTiming() {
    let FMP, LCP;
    // 首次绘制
    new PerformanceObserver((entryList, observer) => {
        let perfEntries = entryList.getEntries();
        FMP = perfEntries[0];
        observer.disconnect();
    }).observe({ entryTypes: ['element'] }); // 观察页面元素

    // 最大内容渲染
    new PerformanceObserver((entryList, observer) => {
        let perfEntries = entryList.getEntries();
        LCP = perfEntries[0];
        observer.disconnect();
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID
    new PerformanceObserver((entryList, observer) => {
        let firstInput = entryList.getEntries()[0];
        if (firstInput) {
            let inputDelay = (firstInput as PerformanceEventTiming).processingStart - firstInput.startTime;
            let duration = firstInput.duration;
            if (inputDelay > 0 || duration > 0) {
                console.log('FID', {
                    inputDelay,
                    duration
                })
            }
        }
        observer.disconnect();
    }).observe({ type: 'first-input', buffered: true });

    isLoaded(() => {
        setTimeout(() => {
            const [firstEntry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
            const {requestStart, responseStart, responseEnd, domInteractive, 
                domContentLoadedEventStart, domContentLoadedEventEnd,
                 loadEventStart, loadEventEnd, connectEnd, connectStart, fetchStart} = firstEntry;
            const timingInfo = {
                type: 'timing',
                kind: 'performance',
                ttfbTime: responseStart - requestStart,  // 首字节到达
                responseTime: responseEnd - responseStart, // 响应时间
                connectTime: connectEnd - connectStart,    // 连接时间
                domReadyTime: domInteractive - domContentLoadedEventStart, // dom 准备时间
                parseDOMTime: loadEventStart - domContentLoadedEventEnd, // 解析dom时间
                loadTime: loadEventEnd - loadEventStart, // 加载时间
            }

            let FP = performance.getEntriesByName('first-paint')[0];
            let FCP = performance.getEntriesByName('first-contentful-paint')[0];

            console.log('timingInfo', timingInfo);
            console.log('performance', {
                FCP, // 首次内容绘制
                FP, // 首次绘制
                FMP, // 首次有意义绘制
                LCP, // 最大内容绘制
            })
        }, 3000);
    });
}
