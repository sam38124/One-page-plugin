export class ErpConfig {
    static tokenKey = 'wnqnk3j212313c';
    static roleKey = 'asdamkl32';
    static api = '';
    static role = '';
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
    static getRole() {
        const glitter = window.glitter;
        return glitter.getCookieByName(ErpConfig.roleKey);
    }
    static setRole(role) {
        const glitter = window.glitter;
        if (role) {
            glitter.setCookie(ErpConfig.roleKey, role);
        }
        else {
            glitter.removeCookie([ErpConfig.roleKey]);
        }
    }
    static permission = {
        sku_p: 'only'
    };
}
