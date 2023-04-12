import { TriggerEvent } from "../glitterBundle/plugins/trigger-event.js";
import { BaseApi } from "./api/base.js";
import { ShareDialog } from "../dialog/ShareDialog.js";
class GlobalData {
    static data = {
        pageList: [],
        isRunning: false,
        run: () => {
            if (GlobalData.data.isRunning) {
                return;
            }
            GlobalData.data.isRunning = true;
            const saasConfig = window.saasConfig;
            saasConfig.api.getPage(saasConfig.config.appName).then((data) => {
                if (data.result) {
                    GlobalData.data.pageList = data.response.result.map((dd) => {
                        dd.page_config = dd.page_config ?? {};
                        return dd;
                    });
                }
                else {
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
            const glitter = window.glitter;
            widget.data.loginSuccess = widget.data.loginSuccess ?? {};
            return {
                editor: () => {
                    return TriggerEvent.editer(gvc, widget, widget.data.loginSuccess, {
                        hover: true,
                        option: [],
                        title: "登入成功的事件"
                    });
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter);
                    shareDialog.dataLoading({ visible: true });
                    BaseApi.create({
                        "url": glitter.share.erp.url + `/api/v1/user/login`,
                        "type": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({
                            "account": subData.account,
                            "pwd": subData.pwd,
                            "company": subData.company
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({ visible: false });
                        if (d2.result) {
                            TriggerEvent.trigger({
                                gvc, widget, clickEvent: widget.data.loginSuccess
                            });
                        }
                        else {
                            shareDialog.errorMessage({ text: "登入失敗" });
                        }
                    });
                },
            };
        },
    },
    register: {
        title: 'ERP-註冊按鈕',
        fun: (gvc, widget, object, subData) => {
            const glitter = window.glitter;
            widget.data.registerSuccess = widget.data.registerSuccess ?? {};
            return {
                editor: () => {
                    return TriggerEvent.editer(gvc, widget, widget.data.registerSuccess, {
                        hover: true,
                        option: [],
                        title: "登入成功的事件"
                    });
                },
                event: () => {
                    const shareDialog = new ShareDialog(glitter);
                    let userData = {};
                    Object.keys(subData).map((dd) => {
                        if (['account', 'pwd', 'company', 'confirmPwd'].indexOf(dd) === -1) {
                            userData[dd] = subData[dd];
                        }
                    });
                    const json = {
                        "account": subData.account,
                        "pwd": subData.pwd,
                        "company": subData.company,
                        "userData": userData
                    };
                    if (subData.pwd !== subData.confirmPwd) {
                        shareDialog.errorMessage({
                            text: "請再次確認密碼"
                        });
                        return;
                    }
                    shareDialog.dataLoading({ visible: true });
                    BaseApi.create({
                        "url": glitter.share.erp.url + `/api/v1/user/register`,
                        "type": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(json)
                    }).then((d2) => {
                        shareDialog.dataLoading({ visible: false });
                        if (d2.result) {
                            TriggerEvent.trigger({
                                gvc, widget, clickEvent: widget.data.registerSuccess
                            });
                        }
                        else {
                            shareDialog.errorMessage({ text: "註冊失敗" });
                        }
                    });
                },
            };
        },
    }
});