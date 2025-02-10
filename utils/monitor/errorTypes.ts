export interface ErrorInfo {
    timestamp: string;
    userAgent: string;
    kind: string;
    type: string;
    errorType: string;
    message: string;
    filename: string;
    lineno: number;
    colno: number;
    stack: string | null;
    selector: string | null;
}

export interface FetchErrorInfo {
    title: string;
    url: string;
    timestamp: string;
    userAgent: string;
    kind: string;
    type: string;
    errorType: string;
    pathName: string;
    status: string;
    duration: string;
    response: string;
    params: string;
}

export interface TrackRequest {
    project: string;
    logstoreName: string;
    body: {
        __topic__?: string;
        __source__: string;
        __logs__: {
            [key: string]: any;
        }[];
        __tags__?: {
            [key: string]: any;
        };
    };
}

export interface PvUvInfo {
    timestamp: string;
    userAgent: string;
    kind: string;
    type: string;
    pathName: string;
    title: string;
    url: string;
    referrer: string;
    selector: string | null;
}