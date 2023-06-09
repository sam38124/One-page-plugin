import {BaseApi} from "../../api/base.js";
import {GlobalUser} from "../global/global-user.js";


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
    public static getPublicUserData(id:string){
        return BaseApi.create({
            "url": getBaseUrl()+`/api-public/v1/user/userdata?userID=${id}`,
            "type": "GET",
            "headers": {
                "g-app":getConfig().config.appName,
                "Content-Type": "application/json"
            }
        })
    }
    public static forgetPwd(email:string){
        return BaseApi.create({
            "url": getBaseUrl()+`/api-public/v1/user/forget`,
            "type": "POST",
            "headers": {
                "g-app":getConfig().config.appName,
                "Content-Type": "application/json"
            },
            data:JSON.stringify({
                email:email
            })
        })
    }
    public static resetPwd(pwd:string,newPwd:string){
        return BaseApi.create({
            "url": getBaseUrl()+`/api-public/v1/user/resetPwd`,
            "type": "PUT",
            "headers": {
                "g-app":getConfig().config.appName,
                "Content-Type": "application/json",
                "Authorization":GlobalUser.token
            },
            data:JSON.stringify({
                pwd:pwd,
                newPwd:newPwd
            })
        })
    }
    public static updateUserData(json:any){
        return BaseApi.create({
            "url": getBaseUrl()+`/api-public/v1/user`,
            "type": "PUT",
            "headers": {
                "g-app":getConfig().config.appName,
                "Content-Type": "application/json",
                "Authorization":GlobalUser.token
            },
            data:JSON.stringify({
                userData:json
            })
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