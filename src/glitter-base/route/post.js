import { BaseApi } from "../../api/base.js";
import { GlobalUser } from "../global/global-user.js";
export class ApiPost {
    constructor() {
    }
    static post(json) {
        return BaseApi.create({
            "url": getBaseUrl() + `/api-public/v1/post`,
            "type": "POST",
            "headers": {
                "Content-Type": "application/json",
                "g-app": getConfig().config.appName,
                "Authorization": GlobalUser.token
            },
            data: JSON.stringify(json)
        });
    }
    static get(json) {
        return BaseApi.create({
            "url": getBaseUrl() + `/api-public/v1/post?page=${json.page}&limit=${json.limit}`,
            "type": "GET",
            "headers": {
                "Content-Type": "application/json",
                "g-app": getConfig().config.appName,
                "Authorization": GlobalUser.token
            }
        });
    }
}
function getConfig() {
    const saasConfig = window.saasConfig;
    return saasConfig;
}
function getBaseUrl() {
    return getConfig().config.url;
}
