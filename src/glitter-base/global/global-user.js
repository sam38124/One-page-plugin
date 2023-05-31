export class GlobalUser {
    static tagId = "sjnsannsai23ij3as";
    static getTag(tag) {
        return `${GlobalUser.tagId}${tag}`;
    }
    static get token() {
        return window.glitter.getCookieByName(GlobalUser.getTag('token'));
    }
    static set token(value) {
        window.glitter.setCookie(GlobalUser.getTag('token'), value);
    }
    static userData = {};
    static updateUserData = {};
}
