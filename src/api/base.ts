import { Glitter } from '../glitterBundle/Glitter.js';
export class BaseApi {
    public static create(config: any) {
        const $ = new Glitter(window).$;
        return new Promise<{ result: boolean; response: any }>((resolve, reject) => {
            config.error = (jqXHR: any, textStatus: any, errorThrown: any) => {
                resolve({ result: false, response: jqXHR });
            };
            config.success = (response: any) => {
                resolve({ result: true, response: response });
            };
            $.ajax(config);
        });
    }
}
