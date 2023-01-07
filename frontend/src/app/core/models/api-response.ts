export interface ApiResponse<T> {
    success: boolean;
    status: number;
    message: string;
    data: T;
    metaData: MetaData;
}

export interface MetaData {
    links: Link[];
    page: Page
}

export interface Page {
    nextPage: string;
    prevPage: string;
    totalCount: number;
}

export interface Link {
    first: string;
    last: string;
}
