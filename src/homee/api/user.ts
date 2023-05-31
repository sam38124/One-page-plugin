import {Glitter} from "../../glitterBundle/Glitter.js"
import {Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {appConfig} from "../../config.js";
export class User {
    public static getUserData(next: () => void){
        const glitter=Glitter.glitter
        glitter.runJsInterFace("getUserData", {}, function (response) {
            glitter.share.userData = response.data
            Plugin.setAppConfig('HOMEEAppConfig',{
                token:glitter.share.userData.AUTH,
                serverURL:glitter.share.apiURL
            })
            next()
        }, {
            webFunction(data: {}, callback: (data: any) => void): any {
                $.ajax({
                    url: `${glitter.share.apiURL}/api/v1/user/login`,
                    type: 'post',
                    data: JSON.stringify({email: 'sam94074@gmail.com', pwd: `sam12345`}),
                    contentType: 'application/json; charset=utf-8',
                    success: (suss: any) => {
                        console.log(suss)
                        callback({
                            data: {
                                user_id: 12052350,
                                last_name: "Rdtest",
                                first_name: "Rdtes22t",
                                name: "Rdtest Rd",
                                photo: suss.photo,
                                AUTH: suss.token
                            },
                            beta:true
                        })
                    },
                    error: (err: any) => {
                    },
                });
            }
        })
    }


    public static setUserData(userData:any,next: (response:any) => void){
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/user`,
            type: 'put',
            data: JSON.stringify(userData),
            headers: {Authorization: userData.token},
            contentType: 'application/json; charset=utf-8',
            success: (suss: any) => {
                next(suss)
            },
            error: (err: any) => {
                next(false)
            },
        });
    }
    public static login({
                account,
                pwd,
                callback,
                third
        }: { third?:any,account: string, pwd: string, callback: (data: { user_id: number; last_name: string; first_name: string; name: string; photo: string; AUTH: string } | boolean,code:any) => void }){
        const glitter=Glitter.glitter

        $.ajax({
            url: `${appConfig().serverURL}/api/v1/user/login`,
            type: 'post',
            data: JSON.stringify({email: account, pwd: pwd,third:third}),
            contentType: 'application/json; charset=utf-8',
            success: (suss: any) => {
                let apiData = {
                    "user_id": 14077302,
                    "email": "a0981825882@gmail.com",
                    "first_name": "賴",
                    "last_name": "仁鴻",
                    "gender": 1,
                    "create_time": 1678261652,
                    "phone": "",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNDA3NzMwMiwiZW1haWwiOiJhMDk4MTgyNTg4MkBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoi6LO0IiwibGFzdF9uYW1lIjoi5LuB6bS7IiwiZ2VuZGVyIjoxLCJpYXQiOjE2ODU1MTY1NDEsImV4cCI6MTY4NTUzNDU0MX0.zxyroDTmY34Ka3FGkFe373u7GZeiwiY1IeFLMK0iaTM",
                    "photo": null,
                    "name": "仁鴻",
                    "shopify_pwd": "j9b9usdkrr",
                    "invite_code": "UZMOGN",
                    "pwd": "s42503516"
                }
                if(suss){
                    suss.pwd=pwd
                    appConfig().setUserData({
                        value:suss,callback:(response)=>{
                            Plugin.setAppConfig('HOMEEAppConfig',{
                                token:suss.token,
                                serverURL:appConfig().serverURL
                            })
                        }
                    })
                }
                callback(suss,200)
            },
            error: (err: any) => {
                const resp= JSON.parse(err.responseText).message
                callback(false,resp)
            },
        });
    }
    public static forgetPwd(email:string,callback:(result:any,code:any)=>void){
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/user/forgetPwd`,
            type: 'post',
            data: JSON.stringify({email: email}),
            contentType: 'application/json; charset=utf-8',
            success: (suss: any) => {
                if(suss){
                    appConfig().setUserData({
                        value:suss,callback:(response)=>{
                            Plugin.setAppConfig('HOMEEAppConfig',{
                                token:suss.token,
                                serverURL:appConfig().serverURL
                            })
                        }
                    })
                }
                callback(suss,200)
            },
            error: (err: any) => {
                const resp= JSON.parse(err.responseText).message
                callback(false,resp)
            },
        });
    }
    public static loginFB(email:string,token:string,third:any,callback: (data: { user_id: number; last_name: string; first_name: string; name: string; photo: string; AUTH: string } | boolean,code:any) => void ){
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/user/signInWithFacebook`,
            type: 'post',
            data: JSON.stringify({email: email, token: token,third:third}),
            contentType: 'application/json; charset=utf-8',
            success: (suss: any) => {
                if(suss){
                    appConfig().setUserData({
                        value:suss,callback:(response)=>{
                            Plugin.setAppConfig('HOMEEAppConfig',{
                                token:suss.token,
                                serverURL:appConfig().serverURL
                            })
                        }
                    })
                }
                callback(suss,200)
            },
            error: (err: any) => {
                const resp= JSON.parse(err.responseText).message
                callback(false,resp)
            },
        });
    }
    public static loginApple(token:string,bundle:string,callback: (data: { user_id: number; last_name: string; first_name: string; name: string; photo: string; AUTH: string } | boolean,code:any) => void ){
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/user/signInWithApple`,
            type: 'post',
            data: JSON.stringify({token: token,bundle:bundle}),
            contentType: 'application/json; charset=utf-8',
            success: (suss: any) => {
                if(suss){
                    appConfig().setUserData({
                        value:suss,callback:(response)=>{
                            Plugin.setAppConfig('HOMEEAppConfig',{
                                token:suss.token,
                                serverURL:appConfig().serverURL
                            })
                        }
                    })
                }
                callback(suss,200)
            },
            error: (err: any) => {
                const resp= JSON.parse(err.responseText).message
                callback(false,resp)
            },
        });
    }
    public static loginFet(token:string,callback: (data: { user_id: number; last_name: string; first_name: string; name: string; photo: string; AUTH: string } | boolean,code:any) => void ){
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/user/signInWithFet`,
            type: 'post',
            data: JSON.stringify({token: token}),
            contentType: 'application/json; charset=utf-8',
            success: (suss: any) => {
                if(suss){
                    appConfig().setUserData({
                        value:suss,callback:(response)=>{
                            Plugin.setAppConfig('HOMEEAppConfig',{
                                token:suss.token,
                                serverURL:appConfig().serverURL
                            })
                        }
                    })
                }
                callback(suss,200)
            },
            error: (err: any) => {
                const resp= JSON.parse(err.responseText).message
                callback(false,resp)
            },
        });
    }
    public static register(obj: { third?:any,first: string, inviteCode:string,last: string, email: string, pwd: string, gender: string, birth: string, userName: string, callback: (data: { user_id: number; last_name: string; first_name: string; name: string; photo: string; AUTH: string } | boolean,code:any) => void }){
        const glitter=Glitter.glitter
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/user`,
            type: 'post',
            data: JSON.stringify(obj),
            contentType: 'application/json; charset=utf-8',
            success: (suss: any) => {
                User.login({account:obj.email,pwd:obj.pwd,callback:obj.callback})
            },
            error: (err: any) => {
                User.login({account:obj.email,pwd:obj.pwd,callback:obj.callback})
            },
        });
    }

    public static checkUserExists(account:string,callback:(result:boolean|undefined)=>void){
        const glitter=Glitter.glitter
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/user/checkUserExist?email=${account}`,
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            success: (suss: any) => {
                callback(suss.exists)
            },
            error: (err: any) => {
                callback(false)
            },
        });
    }

    public static checkToken(token:string,callback:(result:boolean)=>void){
        const glitter=Glitter.glitter
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/user/checkToken`,
            type: 'get',
            headers: {Authorization: token},
            data: JSON.stringify({token:token}),
            contentType: 'application/json; charset=utf-8',
            success: (suss: any) => {
                callback(suss.result)
            },
            error: (err: any) => {
                callback(false)
            },
        });
    }

}