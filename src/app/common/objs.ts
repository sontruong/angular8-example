export class OnesPaging<T> {
    page: number;
    total_pages: number;
    total_results: number;
    results: T[];

    constructor(data: any) {
        this.page = data.page;
        this.total_pages = data.total_pages;
        this.total_results = data.total_results;
        this.results = data.results;
    }
}

export class OneMsg {
    status_code: number;
    status_message: string;
}