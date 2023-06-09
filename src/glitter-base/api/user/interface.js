import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { ShareDialog } from "../../../dialog/ShareDialog.js";
import { ApiUser } from "../../route/user.js";
import { GlobalUser } from "../../global/global-user.js";
TriggerEvent.create(import.meta.url, {
    login: {
        title: '官方事件-用戶-登入',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    object.loginEvent = object.loginEvent ?? {};
                    return TriggerEvent.editer(gvc, widget, object.loginEvent, {
                        hover: false,
                        option: [],
                        title: "登入成功後的觸發事件"
                    });
                },
                event: () => {
                    const dialog = new ShareDialog(gvc.glitter);
                    const json = {
                        account: gvc.getBundle().account,
                        pwd: gvc.getBundle().pwd
                    };
                    dialog.dataLoading({ visible: true });
                    ApiUser.login(json)?.then((r) => {
                        dialog.dataLoading({ visible: false });
                        if (!r.result) {
                            dialog.errorMessage({
                                text: "帳號或密碼輸入錯誤!"
                            });
                        }
                        else {
                            gvc.glitter.share.public_api = gvc.glitter.share.public_api ?? {};
                            gvc.glitter.share.public_api.GlobalUser = GlobalUser;
                            GlobalUser.token = r.response.token;
                            GlobalUser.userInfo = r.response;
                            GlobalUser.updateUserData = JSON.parse(JSON.stringify(r.response));
                            TriggerEvent.trigger({
                                gvc, widget, clickEvent: object.loginEvent, subData, element
                            });
                        }
                    });
                },
            };
        },
    },
    register: {
        title: '官方事件-用戶-註冊',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    object.registerEvent = object.registerEvent ?? {};
                    object.verifyEvent = object.verifyEvent ?? {};
                    return TriggerEvent.editer(gvc, widget, object.registerEvent, {
                        hover: false,
                        option: [],
                        title: "註冊成功後的觸發事件"
                    }) + TriggerEvent.editer(gvc, widget, object.verifyEvent, {
                        hover: false,
                        option: [],
                        title: "認證頁面跳轉"
                    });
                },
                event: () => {
                    gvc.getBundle().userData = gvc.getBundle().userData ?? {};
                    const json = {
                        account: '',
                        pwd: '',
                        cpwd: '',
                        userData: {},
                        checkPolicy: gvc.getBundle().checkPolicy
                    };
                    for (let index = 0; index < $("*[register-form]").length; index++) {
                        const obj = $("*[register-form]").get(index);
                        const key = $(obj).attr('register-form');
                        const value = obj.value;
                        if (['checkPolicy', 'account', 'pwd', 'cpwd'].indexOf(key) !== -1) {
                            json[key] = value;
                        }
                        else {
                            json.userData[key] = value;
                        }
                    }
                    const dialog = new ShareDialog(gvc.glitter);
                    if (!json.account || json.account.length < 8) {
                        dialog.errorMessage({ text: "帳號必須大於8碼" });
                    }
                    else if (!json.pwd || json.pwd.length < 8) {
                        dialog.errorMessage({ text: "密碼必須大於8碼" });
                    }
                    else if (json.pwd !== json.cpwd) {
                        dialog.errorMessage({ text: "請再次確認密碼" });
                    }
                    else if (!json.checkPolicy) {
                        dialog.errorMessage({ text: "請同意隱私權政策" });
                    }
                    else {
                        dialog.dataLoading({ visible: true });
                        ApiUser.register(json)?.then((r) => {
                            dialog.dataLoading({ visible: false });
                            if (!r.result) {
                                dialog.errorMessage({
                                    text: "此帳號已經遭到註冊!"
                                });
                            }
                            else {
                                if (r.response.type === 'normal') {
                                    GlobalUser.token = r.response.token;
                                    GlobalUser.userInfo = json.userData;
                                    setTimeout(() => {
                                        TriggerEvent.trigger({
                                            gvc, widget, clickEvent: object.registerEvent, subData, element
                                        });
                                    }, 1000);
                                }
                                else {
                                    dialog.successMessage({
                                        text: `認證信已發送，請前往郵件認證您的信箱並進行登入`,
                                        callback: () => {
                                            TriggerEvent.trigger({
                                                gvc, widget, clickEvent: object.verifyEvent, subData, element
                                            });
                                        }
                                    });
                                }
                            }
                        });
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
                    return ``;
                },
                event: () => {
                    gvc.glitter.share.public_api = gvc.glitter.share.public_api ?? {};
                    gvc.glitter.share.public_api.GlobalUser = GlobalUser;
                    return new Promise((resolve, reject) => {
                        if (gvc.glitter.getUrlParameter('token')) {
                            GlobalUser.token = gvc.glitter.getUrlParameter('token');
                            gvc.glitter.setUrlParameter('token', undefined);
                        }
                        ApiUser.getUserData(GlobalUser.token)?.then((r) => {
                            if (!r.result) {
                                GlobalUser.token = '';
                            }
                            else {
                                GlobalUser.userInfo = r.response;
                                GlobalUser.updateUserData = JSON.parse(JSON.stringify(r.response));
                            }
                            resolve(true);
                        });
                    });
                },
            };
        },
    },
    updateUser: {
        title: '官方事件-用戶-更改資料',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    gvc.glitter.share.public_api = gvc.glitter.share.public_api ?? {};
                    return new Promise((resolve, reject) => {
                        ApiUser.updateUserData(GlobalUser.updateUserData)?.then((r) => {
                            const dialog = new ShareDialog(gvc.glitter);
                            if (!r.result) {
                                dialog.errorMessage({ text: "連線異常，或帳號已被使用" });
                            }
                            else {
                                location.reload();
                            }
                            resolve(true);
                        });
                    });
                },
            };
        },
    },
    checkUser: {
        title: '官方事件-用戶-判斷是否登入',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    return GlobalUser.token;
                },
            };
        },
    },
    userLogOut: {
        title: '官方事件-用戶-登出',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    GlobalUser.token = '';
                    location.reload();
                },
            };
        },
    },
    checkLogin: {
        title: '官方事件-用戶-登入判斷',
        fun: (gvc, widget, object, subData, element) => {
            widget.data.loginUserEvent = widget.data.loginUserEvent ?? {};
            return {
                editor: () => {
                    return `<div class="border border-white m-2 p-2">
${TriggerEvent.editer(gvc, widget, widget.data.loginUserEvent, {
                        option: [],
                        title: "已登入用戶的事件",
                        hover: false
                    })}
</div>
<div class="border border-white m-2 p-2">
${TriggerEvent.editer(gvc, widget, widget.data, {
                        option: [],
                        title: "未登入用戶的事件",
                        hover: false
                    })}
</div>
`;
                },
                event: () => {
                    if (!GlobalUser.token) {
                        TriggerEvent.trigger({
                            gvc, widget, clickEvent: widget.data,
                        });
                    }
                    else {
                        TriggerEvent.trigger({
                            gvc, widget, clickEvent: widget.data.loginUserEvent,
                        });
                    }
                },
            };
        },
    },
    getUserData: {
        title: '官方事件-用戶-取得用戶資料',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return gvc.glitter.htmlGenerate.editeText({
                        gvc: gvc,
                        title: "用戶ID",
                        default: object.code ?? "",
                        placeHolder: "請輸入程式代碼或者參數",
                        callback: (text) => {
                            object.code = text;
                        }
                    });
                },
                event: () => {
                    let userID = '';
                    try {
                        userID = eval(object.code);
                    }
                    catch (e) {
                        userID = object.code;
                    }
                    return new Promise((resolve, reject) => {
                        ApiUser.getPublicUserData(userID)?.then((r) => {
                            resolve(r.response);
                        });
                    });
                },
            };
        },
    },
    forgetPwd: {
        title: '官方事件-用戶-忘記密碼',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    object.pwdResource = object.pwdResource ?? {};
                    return TriggerEvent.editer(gvc, widget, object.pwdResource, {
                        hover: false,
                        option: [],
                        title: "取得信箱資料"
                    });
                },
                event: () => {
                    return new Promise(async (resolve, reject) => {
                        const data = await TriggerEvent.trigger({
                            gvc: gvc, widget: widget, clickEvent: object.pwdResource
                        });
                        if (data) {
                            ApiUser.forgetPwd(data)?.then((r) => {
                                resolve(r.response.result);
                                const dialog = new ShareDialog(gvc.glitter);
                                if (!r.response.result) {
                                    dialog.errorMessage({ text: `此信箱尚未進行註冊．` });
                                }
                            });
                        }
                    });
                },
            };
        },
    },
    resetPwd: {
        title: '官方事件-用戶-重設密碼',
        fun: (gvc, widget, object, subData, element) => {
            object.resetPwd = object.resetPwd ?? {};
            object.resetSuccess = object.resetSuccess ?? {};
            return {
                editor: () => {
                    return [TriggerEvent.editer(gvc, widget, object.resetPwd, {
                            hover: false,
                            option: [],
                            title: "取得舊密碼和新密碼"
                        }), TriggerEvent.editer(gvc, widget, object.resetSuccess, {
                            hover: false,
                            option: [],
                            title: "重設成功跳轉"
                        })].join('');
                },
                event: () => {
                    return new Promise(async (resolve, reject) => {
                        const data = await TriggerEvent.trigger({
                            gvc: gvc, widget: widget, clickEvent: object.resetPwd
                        });
                        const dialog = new ShareDialog(gvc.glitter);
                        if (data.cPwd !== data.newPwd) {
                            dialog.errorMessage({ text: `請再次確認密碼．` });
                        }
                        else {
                            ApiUser.resetPwd(data.oldPwd, data.newPwd)?.then((r) => {
                                resolve(r.response.result);
                                const dialog = new ShareDialog(gvc.glitter);
                                if (!r.result || !r.response.result) {
                                    dialog.errorMessage({ text: `密碼輸入錯誤．` });
                                }
                                else {
                                    TriggerEvent.trigger({
                                        gvc: gvc,
                                        widget: widget,
                                        clickEvent: object.resetSuccess
                                    });
                                }
                            });
                        }
                    });
                },
            };
        },
    },
});
