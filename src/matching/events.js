import { TriggerEvent } from "../glitterBundle/plugins/trigger-event.js";
import { GlobalUser } from "../glitter-base/global/global-user.js";
import { status } from "./global/status.js";
TriggerEvent.create(import.meta.url, {
    postCase: {
        title: '事件-登入判斷',
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
    caseInitial: {
        title: '媒合平台-服務加載',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    return new Promise((resolve, reject) => {
                        const saasConfig = window.saasConfig;
                        saasConfig.api.getPage(saasConfig.config.appName, "select_widget").then((data) => {
                            try {
                                gvc.glitter.share.service = [];
                                data.response.result[0].config[0].data.bigItem.map((dd) => {
                                    dd.child.map((d2) => {
                                        d2.bigItemId = dd.id;
                                        d2.bidTitle = dd.title;
                                        d2.formList = (d2.formList ?? []).concat([
                                            {
                                                "col": "12",
                                                "key": "budget",
                                                "tag": "form_budget",
                                                "colm": "12",
                                                "type": "custom",
                                                "label": "預算填寫",
                                                "expand": false,
                                                "component": {},
                                                "formExpand": { "expand": true },
                                                "requirement": "true"
                                            }, {
                                                "col": "12",
                                                "key": "serviceDate",
                                                "colm": "12",
                                                "type": "date",
                                                "label": "服務日期",
                                                "requirement": "true",
                                                "formExpand": { "expand": true }
                                            }, {
                                                "col": "12",
                                                "key": "serviceTime",
                                                "colm": "12",
                                                "requirement": "true",
                                                "type": "time",
                                                "label": "服務時間",
                                                "formExpand": { "expand": true }
                                            }, {
                                                "col": "12",
                                                "key": "serviceArea",
                                                "colm": "12",
                                                "type": "placeSelect",
                                                "label": "服務地區",
                                                "requirement": "false",
                                                "formExpand": { "expand": true },
                                                "selectType": "manual"
                                            }, {
                                                "col": "12",
                                                "key": "serviceAddress",
                                                "colm": "12",
                                                "type": "address",
                                                "requirement": "true",
                                                "label": "詳細地址",
                                                "formExpand": { "expand": true }
                                            }, {
                                                "col": "12",
                                                "key": "contact_phone",
                                                "colm": "12",
                                                "type": "phone",
                                                "requirement": "true",
                                                "label": "聯絡電話",
                                                "formExpand": { "expand": true }
                                            }, {
                                                "col": "12",
                                                "key": "line_id",
                                                "colm": "12",
                                                "type": "text",
                                                "requirement": "true",
                                                "label": "line ID",
                                                "formExpand": { "expand": true }
                                            },
                                            {
                                                "col": "12",
                                                "key": "note",
                                                "colm": "12",
                                                "type": "textArea",
                                                "requirement": "true",
                                                "label": "用戶備註",
                                                "formExpand": { "expand": true }
                                            },
                                            {
                                                "col": "12",
                                                "def": "post_case",
                                                "key": "type",
                                                "colm": "12",
                                                "type": "hideData",
                                                "label": "表單類型",
                                                "formExpand": {
                                                    "expand": true
                                                },
                                                "requirement": "true"
                                            },
                                            {
                                                "col": "12",
                                                "def": status.form.onWait,
                                                "key": "progress",
                                                "colm": "12",
                                                "type": "hideData",
                                                "label": "表單類型",
                                                "formExpand": {
                                                    "expand": true
                                                },
                                                "requirement": "true"
                                            }
                                        ]);
                                        gvc.glitter.share.service.push(d2);
                                    });
                                });
                                resolve(true);
                            }
                            catch (e) {
                                resolve(false);
                            }
                        });
                    });
                },
            };
        },
    }
});
