export class ErpConfig {
    static tokenKey = 'wnqnk3j212313c';
    static api = '';
    static roleList = [];
    static setToken(token) {
        const glitter = window.glitter;
        if (token) {
            glitter.setCookie(ErpConfig.tokenKey, token);
        }
        else {
            glitter.removeCookie([ErpConfig.tokenKey]);
        }
    }
    static getToken() {
        const glitter = window.glitter;
        return glitter.getCookieByName(ErpConfig.tokenKey);
    }
}
