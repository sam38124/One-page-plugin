export class ErpConfig {
    public static tokenKey='wnqnk3j212313c'
    public static roleKey='asdamkl32'
    public static api=''
    public static role=''
    public static userData={}
    public static roleList:{code:string,name:string,sku_p:string}[]=[]
public static selectOrder:any[]=[]
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
    public static getRole(){
        const glitter=(window as any).glitter
        return glitter.getCookieByName(ErpConfig.roleKey)
    }

    public static setRole(role?:string){
        const glitter=(window as any).glitter
        if(role){
            glitter.setCookie(ErpConfig.roleKey,role)
        }else{
            glitter.removeCookie([ErpConfig.roleKey])
        }

    }

    public static permission:{
        sku_p:'only'|'all'
    }={
        sku_p:'only'
    }

}