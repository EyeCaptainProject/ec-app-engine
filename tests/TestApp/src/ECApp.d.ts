export declare class ECApp {
    private aNumber;
    static getInstanceOf(className: string, path: string): Promise<ECApp>;
    constructor();
    get theNumber(): number;
}
