import { injectJsError } from "./lib/jsError";
import { injectLastEvent } from "./common";
import { injectPromiseError } from "./lib/promiseError";
import { injectFetchError } from "./lib/fetchError";
import { injectWhiteScreenError } from "./lib/whiteScreenError";
import { injectTiming } from "./lib/timing";
export function injectMonitor() {
    injectLastEvent();
    injectJsError();
    injectPromiseError();
    injectFetchError();
    injectWhiteScreenError();
    injectTiming();
}