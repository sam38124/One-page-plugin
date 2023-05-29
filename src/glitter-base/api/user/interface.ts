import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../../editor.js";
import {component} from "../../../official/component.js";
import {ShareDialog} from "../../../dialog/ShareDialog.js";
import {ApiUser} from "../../route/user.js";
import {GlobalUser} from "../../global/global-user.js";

TriggerEvent.create(import.meta.url, {
    login: {
        title: '官方事件-用戶-登入',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    object.loginEvent = object.loginEvent ?? {}
                    return TriggerEvent.editer(gvc, widget, object.registerEvent, {
                        hover: false,
                        option: [],
                        title: "登入成功後的觸發事件"
                    })
                },
                event: () => {
                    const dialog = new ShareDialog(gvc.glitter)
                    const json = {
                        account: gvc.getBundle().account,
                        pwd: gvc.getBundle().pwd
                    }
                    dialog.dataLoading({visible: true})
                    ApiUser.login(json)?.then((r) => {
                        dialog.dataLoading({visible: false})
                        if (!r.result) {
                            dialog.errorMessage({
                                text: "帳號或密碼輸入錯誤!"
                            })
                        } else {
                            gvc.glitter.share.public_api = gvc.glitter.share.public_api ?? {}
                            gvc.glitter.share.public_api.GlobalUser = GlobalUser
                            GlobalUser.token = r.response.token
                            GlobalUser.userData = r.response.userData
                            TriggerEvent.trigger({
                                gvc, widget, clickEvent: object.registerEvent, subData, element
                            })
                        }
                    })
                },
            };
        },
    },
    register: {
        title: '官方事件-用戶-註冊',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    object.registerEvent = object.registerEvent ?? {}
                    return TriggerEvent.editer(gvc, widget, object.registerEvent, {
                        hover: false,
                        option: [],
                        title: "註冊成功後的觸發事件"
                    })
                },
                event: () => {
                    gvc.getBundle().userData = gvc.getBundle().userData ?? {};
                    const json: any = {
                        account: '',
                        pwd: '',
                        cpwd: '',
                        userData: {},
                        checkPolicy: gvc.getBundle().checkPolicy
                    }
                    for (let index = 0; index < $("*[register-form]").length; index++) {
                        const obj = ($("*[register-form]").get(index) as any);
                        const key = ($(obj) as any).attr('register-form')
                        const value = obj.value
                        if (['checkPolicy', 'account', 'pwd', 'cpwd'].indexOf(key) !== -1) {
                            json[key] = value
                        } else {
                            json.userData[key] = value
                        }
                    }
                    const dialog = new ShareDialog(gvc.glitter)
                    if (!json.account || json.account.length < 8) {
                        dialog.errorMessage({text: "帳號必須大於8碼"})
                    } else if (!json.pwd || json.pwd.length < 8) {
                        dialog.errorMessage({text: "密碼必須大於8碼"})
                    } else if (json.pwd !== json.cpwd) {
                        dialog.errorMessage({text: "請再次確認密碼"})
                    } else if (!json.checkPolicy) {
                        dialog.errorMessage({text: "請同意隱私權政策"})
                    } else {
                        dialog.dataLoading({visible: true})
                        ApiUser.register(json)?.then((r) => {
                            dialog.dataLoading({visible: false})
                            if (!r.result) {
                                dialog.errorMessage({
                                    text: "此帳號已經遭到註冊!"
                                })
                            } else {
                                GlobalUser.token = r.response.token
                                GlobalUser.userData = json.userData
                                TriggerEvent.trigger({
                                    gvc, widget, clickEvent: object.registerEvent, subData, element
                                })
                            }
                        })
                    }
                },
            };
        },
    },
    getUser: {
        title: '官方事件-用戶-Initial事件',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    gvc.glitter.share.public_api=gvc.glitter.share.public_api??{}
                    gvc.glitter.share.public_api.GlobalUser=GlobalUser
                    new Promise((resolve, reject)=>{
                        ApiUser.getUserData(GlobalUser.token)?.then((r) => {
                            if (!r.result) {
                                GlobalUser.token=''
                            } else {
                                GlobalUser.userData = r.response
                            }
                            //gvc.glitter.share.public_api.GlobalUser.userData
                            resolve(true)
                        })
                    })

                },
            };
        },
    }
});
