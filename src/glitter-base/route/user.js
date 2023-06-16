import { BaseApi } from "../../api/base.js";
import { GlobalUser } from "../global/global-user.js";
export class ApiUser {
    constructor() { }
    static register(json) {
        return BaseApi.create({
            "url": getBaseUrl() + `/api-public/v1/user/register`,
            "type": "POST",
            "headers": {
                "Content-Type": "application/json",
                "g-app": getConfig().config.appName
            },
            data: JSON.stringify(json)
        });
    }
    static getUserData(token) {
        return BaseApi.create({
            "url": getBaseUrl() + `/api-public/v1/user`,
            "type": "GET",
            "headers": {
                "g-app": getConfig().config.appName,
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
    }
    static getPublicUserData(id) {
        return BaseApi.create({
            "url": getBaseUrl() + `/api-public/v1/user/userdata?userID=${id}`,
            "type": "GET",
            "headers": {
                "g-app": getConfig().config.appName,
                "Content-Type": "application/json"
            }
        });
    }
    static updateUserData(json) {
        return BaseApi.create({
            "url": getBaseUrl() + `/api-public/v1/user`,
            "type": "PUT",
            "headers": {
                "g-app": getConfig().config.appName,
                "Content-Type": "application/json",
                "Authorization": GlobalUser.token
            },
            data: JSON.stringify({
                userData: json
            })
        });
    }
    static login(json) {
        return BaseApi.create({
            "url": getBaseUrl() + `/api-public/v1/user/login`,
            "type": "POST",
            "headers": {
                "Content-Type": "application/json",
                "g-app": getConfig().config.appName
            },
            data: JSON.stringify(json)
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
