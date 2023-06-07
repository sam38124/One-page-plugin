import {BaseApi} from "../../api/base.js";
import {GlobalUser} from "../global/global-user.js";


export class ApiPost {
    constructor() {
    }

    public static post(json: {
        "postData": any
    }) {
        return BaseApi.create({
            "url": getBaseUrl() + `/api-public/v1/post`,
            "type": "POST",
            "headers": {
                "Content-Type": "application/json",
                "g-app": getConfig().config.appName,
                "Authorization": GlobalUser.token
            },
            data: JSON.stringify(json)
        })
    }

    public static get(json: {
        page: number,
        limit: number,
        query:{key:string,value:string,type:string}[]
    }) {
        return BaseApi.create({
            "url": getBaseUrl() + `/api-public/v1/post?page=${json.page}&limit=${json.limit}&query=${JSON.stringify(json.query)}`,
            "type": "GET",
            "headers": {
                "Content-Type": "application/json",
                "g-app": getConfig().config.appName,
                "Authorization": GlobalUser.token
            }
        })
    }
}

function getConfig() {
    const saasConfig: { config: any; api: any } = (window as any).saasConfig;
    return saasConfig
}

function getBaseUrl() {
    return getConfig().config.url
}