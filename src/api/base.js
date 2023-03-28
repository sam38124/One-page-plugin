import { Glitter } from '../glitterBundle/Glitter.js';
export class BaseApi {
    static create(config) {
        const $ = new Glitter(window).$;
        return new Promise((resolve, reject) => {
            config.error = (jqXHR, textStatus, errorThrown) => {
                resolve({ result: false, response: jqXHR });
            };
            config.success = (response) => {
                resolve({ result: true, response: response });
            };
            $.ajax(config);
        });
    }
}
