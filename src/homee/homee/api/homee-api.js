'use strict';
import { appConfig } from '../../../config.js';
const machiDomain = 'https://machi-app.com/';
export class Api {
    static serverURL = appConfig().serverURL;
    homeeAJAX;
    constructor() {
        const $ = window.$;
        this.homeeAJAX = (data, callback) => {
            const cont = data.api ? data.api : '/api/bm';
            console.log("-------------------here------------------");
            console.log(cont + data.route);
            console.log(appConfig().token);
            if (data) {
                $.ajax({
                    url: machiDomain + cont + data.route,
                    type: data.method,
                    data: JSON.stringify(data.data),
                    contentType: 'application/json; charset=utf-8',
                    headers: { Authorization: appConfig().token },
                    success: (suss) => callback && callback(suss),
                    error: (err) => {
                        switch (err.status) {
                            case 401:
                                callback && callback(false);
                                break;
                            default:
                                callback && callback(false);
                                break;
                        }
                    },
                });
            }
        };
    }
}
