export class ErpConfig {
    public static tokenKey='wnqnk3j212313c'
    public static api=''

    public static roleList:{code:string,name:string}[]=[]

    public static setToken(token?:string){
        const glitter=(window as any).glitter
        if(token){
            glitter.setCookie(ErpConfig.tokenKey,token)
        }else{
            glitter.removeCookie([ErpConfig.tokenKey])
        }

    }
    public static getToken(){
        const glitter=(window as any).glitter
        return glitter.getCookieByName(ErpConfig.tokenKey)
    }


}