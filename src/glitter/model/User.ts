export class User{
    public static setToken(token?:string){
        const glitter=(window as any).glitter
        if(token){
            glitter.setCookie('glitterToken',token)
        }else{
            glitter.removeCookie(['glitterToken'])
        }

    }
    public static getToken(){
        const glitter=(window as any).glitter
        return glitter.getCookieByName('glitterToken')
    }
}