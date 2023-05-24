import {BaseApi} from "../../api/base.js";


export class ApiUser{
    constructor() { }

    public static register(json:{account:string,pwd:string,userData:any}){
        return BaseApi.create({
            "url": getBaseUrl()+`/api-public/v1/user/register`,
            "type": "POST",
            "headers": {
                "Content-Type": "application/json",
                "g-app":getConfig().config.appName
            },
            data:JSON.stringify(json)
        })
    }
    public static getUserData(token:string){
        return BaseApi.create({
            "url": getBaseUrl()+`/api-public/v1/user`,
            "type": "GET",
            "headers": {
                "g-app":getConfig().config.appName,
                "Content-Type": "application/json",
                "Authorization":token
            }
        })
    }
    public static login(json:{account:string,pwd:string}){
        return BaseApi.create({
            "url": getBaseUrl()+`/api-public/v1/user/login`,
            "type": "POST",
            "headers": {
                "Content-Type": "application/json",
                "g-app":getConfig().config.appName
            },
            data:JSON.stringify(json)
        })
    }
}

function getConfig(){
    const saasConfig: { config: any; api: any } = (window as any).saasConfig;
    return saasConfig
}
function getBaseUrl(){
    return getConfig().config.url
}