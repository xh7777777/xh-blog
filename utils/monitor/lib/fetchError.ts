import { getLastEvent, getSelector, SendTracker } from "../common"
import { getStackLines } from "../common";
import { FetchErrorInfo } from "../errorTypes";
export function injectFetchError() {
    const originalFetch = window.fetch;
      // 重写 fetch 方法
  window.fetch = async function (url: RequestInfo, options?: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 设置超时时间 5000ms
  
    try {
      // 发起请求
      const response = await originalFetch(url, { ...options, signal: controller.signal });
      // 清除超时定时器
      clearTimeout(timeoutId);
      // 如果响应状态码不是 2xx 范围，认为是异常
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      return response;
    } catch (error: any) {
        if (url instanceof Request && url.url.match(/logstores/) || url.toString().match(/logstores/)) {
            return Promise.reject(error);
        } 
      // 错误捕获
      clearTimeout(timeoutId);
      const errorInfo: FetchErrorInfo = {
        title: 'fetch 请求异常',
        url: String(url),
        timestamp: new Date().getTime().toString(),
        userAgent: window.navigator.userAgent,
        kind: 'stability',
        type: 'error',
        errorType: 'fetchError',
        pathName: window.location.pathname,
        status: error.name === 'AbortError' ? 'timeout' : 'error',
        duration: '5000ms',
        response: error.message,
        params: options?.body ? JSON.stringify(options.body) : '',
      }
      console.log('fetchError', errorInfo);
      SendTracker.send(errorInfo);
  
      // 继续抛出异常
      throw error;
    }
  };
}

