export {};

declare global {
    interface Window {
        electron: {
            greet: (name: string) => Promise<string>;
        }
    }
}