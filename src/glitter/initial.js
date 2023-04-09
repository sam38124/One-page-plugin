import { InitialEvent } from "../glitterBundle/plugins/initial-event.js";
import { BaseApi } from "./api/base.js";
import { User } from "./model/User.js";
InitialEvent.execute(import.meta.url, (callback) => {
    const glitter = window.glitter;
    const saasConfig = window.saasConfig;
    BaseApi.create({
        "url": saasConfig.config.url + `/api/v1/user/checkToken`,
        "type": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Authorization": User.getToken()
        }
    }).then((d2) => {
        console.log(d2);
        if (!d2.result) {
            User.setToken(undefined);
        }
        callback();
    });
});
