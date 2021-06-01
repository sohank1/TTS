declare class Dev {
    BASE_URL: string;
    CLIENT_URL: string;
    API_URL: string;
}
declare class Prod {
    BASE_URL: string;
    CLIENT_URL: string;
    API_URL: string;
}
export declare const Environment: Dev | Prod;
export {};
