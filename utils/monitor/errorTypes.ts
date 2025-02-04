export interface ErrorInfo {
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