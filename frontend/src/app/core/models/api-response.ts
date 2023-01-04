export interface ApiResponse<T> {
    success: boolean;
    status: number;
    message: string;
    data: T;
    page: Page;
}

export interface Page {
    nextPage: string;
    prevPage: string;
    totalCount: string;
}
