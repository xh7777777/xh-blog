import { injectJsError } from "./lib/jsError";
import { injectLastEvent } from "./common";
import { injectPromiseError } from "./lib/promiseError";
export function injectMonitor() {
    // injectLastEvent();
    injectJsError();
    injectPromiseError();
}