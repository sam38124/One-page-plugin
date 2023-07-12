export class Base {
    static getConfig() {
        const saasConfig = window.saasConfig;
        return saasConfig;
    }
    static getBaseUrl() {
        return Base.getConfig().config.url;
    }
}
