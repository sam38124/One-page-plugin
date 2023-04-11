import {TriggerEvent} from "../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../editor.js";
import {BaseApi} from "./api/base.js";
import {ShareDialog} from "../dialog/ShareDialog.js";
import {User} from "./model/User.js";



class GlobalData {
    public static data = {
        pageList: [],
        isRunning: false,
        run: () => {
            if (GlobalData.data.isRunning) {
                return;
            }
            GlobalData.data.isRunning = true;
            const saasConfig: {
                config: any;
                api: any;
            } = (window as any).saasConfig;
            saasConfig.api.getPage(saasConfig.config.appName).then((data: any) => {
                if (data.result) {
                    GlobalData.data.pageList = data.response.result.map((dd: any) => {
                        dd.page_config = dd.page_config ?? {};
                        return dd;
                    });
                } else {
                    GlobalData.data.isRunning = false;
                    GlobalData.data.run();
                }
            });
        },
    };

}

/*Config配置
* glitter.share.erp.url
* */
TriggerEvent.create(import.meta.url, {
    login: {
        title: 'Glitter-登入按鈕',
        fun: (gvc, widget, object, subData) => {
            const saasConfig: {
                config: any;
                api: any;
            } = (window as any).saasConfig;
            const glitter = (window as any).glitter
            widget.data.loginSuccess = widget.data.loginSuccess ?? {}
            return {
                editor: () => {
                    return TriggerEvent.editer(gvc, widget, widget.data.loginSuccess, {
                        hover: true,
                        option: [],
                        title: "登入成功的事件"
                    })
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": saasConfig.config.url + `/api/v1/user/login`,
                        "type": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(
                            {
                                "account": subData.account,
                                "pwd": subData.pwd,
                                "company": subData.company
                            }
                        )
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            User.setToken(d2.response.userData.token)
                            TriggerEvent.trigger({
                                gvc, widget, clickEvent: widget.data.loginSuccess
                            })
                        } else {
                            shareDialog.errorMessage({text: "登入失敗"})
                        }
                    })
                },
            };
        },
    },
    register: {
        title: 'Glitter-註冊按鈕',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            widget.data.registerSuccess = widget.data.registerSuccess ?? {}
            return {
                editor: () => {
                    return TriggerEvent.editer(gvc, widget, widget.data.registerSuccess, {
                        hover: true,
                        option: [],
                        title: "登入成功的事件"
                    })
                },
                event: () => {
                    const saasConfig: {
                        config: any;
                        api: any;
                    } = (window as any).saasConfig;
                    const shareDialog = new ShareDialog(glitter)
                    let userData: any = {}
                    Object.keys(subData).map((dd) => {
                        if (['account', 'pwd', 'company','confirmPwd'].indexOf(dd) === -1) {
                            userData[dd] = subData[dd]
                        }
                    })
                    const json = {
                        "account": subData.account,
                        "pwd": subData.pwd,
                        "company": subData.company,
                        "userData": userData
                    }
                    if(subData.pwd!==subData.confirmPwd){
                        shareDialog.errorMessage({
                            text:"請再次確認密碼"
                        })
                        return;
                    }
                    shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": saasConfig.config.url + `/api/v1/user/register`,
                        "type": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(json)
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            User.setToken(d2.response.token)
                            TriggerEvent.trigger({
                                gvc, widget, clickEvent: widget.data.registerSuccess
                            })
                        } else {
                            shareDialog.errorMessage({text: "註冊失敗"})
                        }
                    })
                },
            };
        },
    },
    logOut:{
        title: 'Glitter-登出按鈕',
        fun: (gvc, widget, object, subData) =>{
            return {
                editor: () =>{
                    return ``
                },
                event: () =>{
                    User.setToken(undefined)
                    const url=new URL(location.href)
                    url.searchParams.delete('page')
                    location.href=url.href
                }
            }
        }
    },
    checkLogin:{
        title: 'Glitter-登入檢查',
        fun: (gvc, widget, object, subData) =>{
            return {
                editor: () =>{
                    return ``
                },
                event: () =>{
                    if(!User.getToken()){
                        const url=new URL(location.href)
                        url.searchParams.delete('page')
                        location.href=url.href
                    }
                }
            }
        }
    },
    createAPP:{
        title:'Glitter-創建APP',
        fun: (gvc, widget, object, subData) =>{
            return {
                editor: () =>{
                    return gvc.glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: `複製專案名稱`,
                        default: object.appName ?? "",
                        placeHolder: '輸入複製專案名稱',
                        callback: (text) => {
                            object.appName  = text;
                            widget.refreshComponent();
                        },
                    })
                },
                event: () =>{
                    const glitter = (window as any).glitter
                    const shareDialog = new ShareDialog(glitter)
                    if(!widget.data.createAPP){
                        shareDialog.errorMessage({text:"請輸入APP名稱"})
                        return;
                    }
                    const saasConfig: {
                        config: any;
                        api: any;
                    } = (window as any).saasConfig;
                    shareDialog.dataLoading({
                        visible:true
                    })
                    BaseApi.create({
                        "url": saasConfig.config.url + `/api/v1/app`,
                        "type": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": User.getToken()
                        },
                        "data": JSON.stringify({
                            "domain": widget.data.createAPP,
                            "appName": widget.data.createAPP,
                            "copyApp":object.appName
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            location.reload()
                        } else {
                            shareDialog.errorMessage({text: "創建失敗，此名稱已被使用!"})
                        }
                    })
                }
            }
        }
    }
})