export class Base{
    public static getConfig(){
        const saasConfig: { config: any; api: any } = (window as any).saasConfig;
        return saasConfig
    }
    public static  getBaseUrl(){
        return Base.getConfig().config.url
    }
}