import {TriggerEvent} from "../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../editor.js";
import {BaseApi} from "./api/base.js";
import {ShareDialog} from "../dialog/ShareDialog.js";
import {ErpConfig} from "./erp-config.js";
import {User} from "../glitter/model/User.js";


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

TriggerEvent.create(import.meta.url, {
    login: {
        title: 'ERP-登入按鈕',
        fun: (gvc, widget, object, subData) => {
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
                        "url": ErpConfig.api + `/api/v1/user/login`,
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
                            ErpConfig.setToken(d2.response.userData.token)
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
        title: 'ERP-註冊按鈕',
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
                    const shareDialog = new ShareDialog(glitter)
                    let userData: any = {}
                    Object.keys(subData).map((dd) => {
                        if (['account', 'pwd', 'company', 'confirmPwd'].indexOf(dd) === -1) {
                            userData[dd] = subData[dd]
                        }
                    })
                    const json = {
                        "account": subData.account,
                        "pwd": subData.pwd,
                        "company": subData.company,
                        "userData": userData
                    }
                    if (subData.pwd !== subData.confirmPwd) {
                        shareDialog.errorMessage({
                            text: "請再次確認密碼"
                        })
                        return;
                    }
                    shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/user/register`,
                        "type": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(json)
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
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
    setting: {
        title: 'ERP-初始設定',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    object.childAccount=object.childAccount??[]
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `後端路徑`,
                            default: object.api ?? "",
                            placeHolder: "輸入後端路徑",
                            callback: (text: string) => {
                                object.api = text
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                            gvc:gvc,
                            title:"子帳號管理",
                            originalArray:object.childAccount,
                            array:object.childAccount.map((dd:any,index:number)=>{
                                return {
                                    title:dd.name || `區塊:${index+1}`,
                                    expand:dd,
                                    innerHtml:
                                        gvc.map([
                                            glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: `角色名稱`,
                                                default: dd.name,
                                                placeHolder: "輸入角色名稱",
                                                callback: (text:string) => {
                                                    dd.name = text
                                                    widget.refreshComponent()
                                                }
                                            }),
                                            glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: `代號`,
                                                default: dd.code,
                                                placeHolder: "輸入角色代號",
                                                callback: (text:string) => {
                                                    dd.code = text
                                                    widget.refreshComponent()
                                                }
                                            })
                                        ]),
                                    minus:gvc.event(()=>{
                                        object.childAccount.splice(index,1)
                                        widget.refreshComponent()
                                    })
                                }
                            }),
                            expand:object,
                            plus:{
                                title:"添加區塊",
                                event:gvc.event(()=>{
                                    object.childAccount.push({name:'預設',code:'default'})
                                    widget.refreshComponent()
                                })
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        })
                    ])
                },
                event: () => {
                    ErpConfig.roleList=object.childAccount
                    ErpConfig.api = object.api
                },
            };
        },
    },
    getMember: {
        title: 'ERP-取得用戶資料',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            if(!object.comeFrom){
                ErpConfig.roleList.map((dd)=>{
                    object.comeFrom=dd.code
                    return {title:dd.name,value:dd.code}
                })
            }
            return {
                editor: () => {
                    return Editor.select({
                        title:"設定用戶來源",
                        gvc:gvc,
                        def:object.comeFrom,
                        array:ErpConfig.roleList.map((dd)=>{
                            return {title:dd.name,value:dd.code}
                        }),
                        callback:(text)=>{
                            object.comeFrom=text
                            widget.refreshComponent()
                        }
                    })
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    // shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/user/getMember?role=${object.comeFrom}`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                    }).then((d2) => {
                        if (d2.result) {
                            subData.data=d2.response.result.map((dd:any)=>{
                                dd.userData.account=dd.account
                                dd.userData.userID=dd.userID
                                return dd
                            });
                            subData.callback()
                        } else {
                            shareDialog.errorMessage({text: "認證失敗"})
                        }
                    })
                }
            }
        }
    },
    selectMember: {
        title: 'ERP-選擇用戶',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            if(!object.comeFrom){
                ErpConfig.roleList.map((dd)=>{
                    object.comeFrom=dd.code
                    return {title:dd.name,value:dd.code}
                })
            }
            return {
                editor: () => {
                    return Editor.select({
                        title:"設定用戶來源",
                        gvc:gvc,
                        def:object.comeFrom,
                        array:ErpConfig.roleList.map((dd)=>{
                            return {title:dd.name,value:dd.code}
                        }),
                        callback:(text)=>{
                            object.comeFrom=text
                            widget.refreshComponent()
                        }
                    })
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    // shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/user/getMember?role=${object.comeFrom}`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                    }).then((d2) => {
                        if (d2.result) {
                            subData.data=d2.response.result.map((dd:any)=>{
                                dd.userData.account=dd.account
                                dd.userData.userID=dd.userID
                                return {
                                    key:dd.userData.name,value:dd.userID
                                }
                            });
                            subData.callback()
                        } else {
                            shareDialog.errorMessage({text: "認證失敗"})
                        }
                    })
                }
            }
        }
    },
    setMember: {
        title: 'ERP-設定用戶',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    object.role=object.role??ErpConfig.roleList[0].code
                    return [
                       Editor.select({
                           title:"設定至用戶群組",
                           gvc:gvc,
                           def:object.role,
                           array:ErpConfig.roleList.map((dd)=>{
                               return {
                                   title:dd.name,value:dd.code
                               }
                           }),
                           callback:(text)=>{
                               object.role=text
                           }
                       })
                    ].join('')
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    shareDialog.dataLoading({visible: true})
                    subData.role=object.role
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/user/updateChild`,
                        "type": "PUT",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data:JSON.stringify({
                            userData:subData
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            shareDialog.successMessage({text:"設定成功"})
                            subData.callback()
                            location.reload()
                        } else {
                            shareDialog.errorMessage({text: "設定失敗"})
                        }
                    })
                }
            }
        }
    },
    getSKU: {
        title: 'ERP-取得SKU商品資料',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            if(!object.comeFrom){
                ErpConfig.roleList.map((dd)=>{
                    object.comeFrom=dd.code
                    return {title:dd.name,value:dd.code}
                })
            }
            object.limit=object.limit??50;
            return {
                editor: () => {

                    return glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: '每頁筆數',
                        default: object.limit,
                        placeHolder: '請輸入每頁筆數',
                        callback: (text:string) => {
                            object.limit=(text);
                            widget.refreshComponent()
                        },
                    })
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/product?sku=${object.sku ?? ''}&page=${subData.page}&limit=${object.limit}`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                    }).then((d2) => {
                        if (d2.result) {
                            subData.data=d2.response.data.map((dd:any)=>{
                                return [{
                                    key:'●',value:'<input type="checkbox" class="form-check-input batchDel" id="bat-461">'
                                },{key:'商品名稱',value:dd.config.productName ?? '未命名'},{key:'sku代號',value:dd.sku},
                                    {key:'庫存數量',value:dd.config.inventory ?? '0'},
                                    {key:'成本價',value:dd.config.price},
                                    {key:'供應商代號',value:dd.vendor}]
                            })
                            subData.editData=d2.response.data.map((dd:any)=>{
                                dd.config.id=dd.id
                                return dd.config
                            })
                            subData.pageSize=Math.floor(d2.response.total / object.limit)
                            subData.callback()
                        } else {
                            shareDialog.errorMessage({text: "認證失敗"})
                        }
                    })
                }
            }
        }
    },
    setSKU: {
        title: 'ERP-設定SKU',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    return [].join('')
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/product`,
                        "type": subData.id ? "PUT":"POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data:JSON.stringify({
                            id:subData.id,
                            config:subData,
                            sku:subData.sku,
                            vendor:subData.vendor,
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            shareDialog.successMessage({text:"設定成功"})
                            subData.callback()
                            location.reload()
                        } else {
                            shareDialog.errorMessage({text: "SKU已遭使用"})
                        }
                    })
                }
            }
        }
    },
})