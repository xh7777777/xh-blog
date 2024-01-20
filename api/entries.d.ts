export interface strapiQueryOptions {
    pagination?: {
        page: number;
        pageSize: number;
    }
}

export interface IPostFilter {
    title?: string;
}