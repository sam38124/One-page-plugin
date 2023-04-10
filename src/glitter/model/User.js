export class User {
    static setToken(token) {
        const glitter = window.glitter;
        if (token) {
            glitter.setCookie('glitterToken', token);
        }
        else {
            glitter.removeCookie(['glitterToken']);
        }
    }
    static getToken() {
        const glitter = window.glitter;
        return glitter.getCookieByName('glitterToken');
    }
}
