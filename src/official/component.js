import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
import { BaseApi } from "../api/base.js";
import { Editor } from "../editor.js";
import { TriggerEvent } from "../glitterBundle/plugins/trigger-event.js";
export const component = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        render: (gvc, widget, setting, hoverID, subData) => {
            widget.data.list = widget.data.list ?? [];
            return {
                view: () => {
                    return new Promise((resolve, reject) => {
                        let data = undefined;
                        const saasConfig = window.saasConfig;
                        let fal = 0;
                        subData.parentConfig = widget;
                        async function getData() {
                            let tag = widget.data.tag;
                            for (const b of widget.data.list) {
                                b.evenet = b.evenet ?? {};
                                if (b.triggerType === 'trigger') {
                                    const result = await new Promise((resolve, reject) => {
                                        (TriggerEvent.trigger({
                                            gvc: gvc,
                                            widget: widget,
                                            clickEvent: b.evenet,
                                            subData
                                        })).then((data) => {
                                            resolve(data);
                                        });
                                    });
                                    if (result) {
                                        tag = b.tag;
                                        break;
                                    }
                                }
                                else {
                                    if ((await eval(b.code)) === true) {
                                        tag = b.tag;
                                        break;
                                    }
                                }
                            }
                            BaseApi.create({
                                "url": saasConfig.config.url + `/api/v1/template?appName=${saasConfig.config.appName}&tag=${tag}`,
                                "type": "GET",
                                "timeout": 0,
                                "headers": {
                                    "Content-Type": "application/json"
                                }
                            }).then((d2) => {
                                if (!d2.result) {
                                    fal += 1;
                                    if (fal < 20) {
                                        setTimeout(() => {
                                            getData();
                                        }, 200);
                                    }
                                }
                                else {
                                    data = d2.response.result[0];
                                    try {
                                        subData.callback(data);
                                    }
                                    catch (e) {
                                    }
                                    resolve(new glitter.htmlGenerate(data.config, [], subData ?? {}).render(gvc, undefined, subData.createOption ?? {}));
                                }
                            });
                        }
                        setTimeout(() => {
                            getData();
                        }, 10);
                    });
                },
                editor: () => {
                    const id = glitter.getUUID();
                    const data = {
                        dataList: undefined
                    };
                    const saasConfig = window.saasConfig;
                    function getData() {
                        BaseApi.create({
                            "url": saasConfig.config.url + `/api/v1/template?appName=${saasConfig.config.appName}`,
                            "type": "GET",
                            "timeout": 0,
                            "headers": {
                                "Content-Type": "application/json"
                            }
                        }).then((d2) => {
                            data.dataList = d2.response.result;
                            gvc.notifyDataChange(id);
                        });
                    }
                    function setPage(pd) {
                        let group = [];
                        let selectGroup = '';
                        let id = glitter.getUUID();
                        data.dataList.map((dd) => {
                            if (dd.tag === pd.tag) {
                                selectGroup = dd.group;
                            }
                            if (group.indexOf(dd.group) === -1) {
                                group.push(dd.group);
                            }
                        });
                        let data2 = undefined;
                        let fal = 0;
                        function getDd() {
                            let tag = widget.data.tag;
                            for (const b of widget.data.list) {
                                if (eval(b.code) === true) {
                                    tag = b.tag;
                                    break;
                                }
                            }
                            BaseApi.create({
                                "url": saasConfig.config.url + `/api/v1/template?appName=${saasConfig.config.appName}&tag=${tag}`,
                                "type": "GET",
                                "timeout": 0,
                                "headers": {
                                    "Content-Type": "application/json"
                                }
                            }).then((d2) => {
                                if (!d2.result) {
                                    fal += 1;
                                    if (fal < 5) {
                                        setTimeout(() => {
                                            getDd();
                                        }, 200);
                                    }
                                }
                                else {
                                    data2 = d2.response.result[0];
                                    try {
                                        subData.callback(data);
                                    }
                                    catch (e) {
                                    }
                                    gvc.notifyDataChange(id);
                                }
                            });
                        }
                        return gvc.bindView(() => {
                            return {
                                bind: id,
                                view: () => {
                                    return Editor.select({
                                        title: "選擇嵌入頁面",
                                        gvc: gvc,
                                        def: pd.tag ?? "",
                                        array: [
                                            {
                                                title: '選擇嵌入頁面', value: ''
                                            }
                                        ].concat(data.dataList.sort((function (a, b) {
                                            if (a.group.toUpperCase() < b.group.toUpperCase()) {
                                                return -1;
                                            }
                                            if (a.group.toUpperCase() > b.group.toUpperCase()) {
                                                return 1;
                                            }
                                            return 0;
                                        })).map((dd) => {
                                            return {
                                                title: `${dd.group}-${dd.name}`, value: dd.tag
                                            };
                                        })),
                                        callback: (text) => {
                                            pd.tag = text;
                                        },
                                    }) + (() => {
                                        if (data2) {
                                            return ``;
                                        }
                                        return ``;
                                    })();
                                },
                                divCreate: {}
                            };
                        });
                    }
                    return gvc.bindView(() => {
                        return {
                            bind: id,
                            view: () => {
                                if (data.dataList) {
                                    return `
   ${setPage(widget.data)}
  ${Editor.arrayItem({
                                        gvc: gvc,
                                        title: "判斷式頁面嵌入",
                                        array: widget.data.list.map((dd, index) => {
                                            return {
                                                title: dd.name || `判斷式:${index + 1}`,
                                                expand: dd,
                                                innerHtml: glitter.htmlGenerate.editeInput({
                                                    gvc: gvc,
                                                    title: `判斷式名稱`,
                                                    default: dd.name,
                                                    placeHolder: "輸入判斷式名稱",
                                                    callback: (text) => {
                                                        dd.name = text;
                                                        gvc.notifyDataChange(id);
                                                    }
                                                }) +
                                                    Editor.select({
                                                        title: '類型',
                                                        gvc: gvc,
                                                        def: dd.triggerType,
                                                        array: [{
                                                                title: '程式碼', value: 'manual'
                                                            }, {
                                                                title: '觸發事件', value: 'trigger'
                                                            }],
                                                        callback: (text) => {
                                                            dd.triggerType = text;
                                                            gvc.notifyDataChange(id);
                                                        }
                                                    }) +
                                                    (() => {
                                                        if (dd.triggerType === 'trigger') {
                                                            dd.evenet = dd.evenet ?? {};
                                                            return TriggerEvent.editer(gvc, widget, dd.evenet, {
                                                                hover: false,
                                                                option: [],
                                                                title: "觸發事件"
                                                            });
                                                        }
                                                        else {
                                                            return glitter.htmlGenerate.editeText({
                                                                gvc: gvc,
                                                                title: `判斷式內容`,
                                                                default: dd.code,
                                                                placeHolder: "輸入程式碼",
                                                                callback: (text) => {
                                                                    dd.code = text;
                                                                    gvc.notifyDataChange(id);
                                                                }
                                                            });
                                                        }
                                                    })() + `
 ${setPage(dd)}`,
                                                minus: gvc.event(() => {
                                                    widget.data.list.splice(index, 1);
                                                    widget.refreshComponent();
                                                })
                                            };
                                        }),
                                        expand: widget.data,
                                        plus: {
                                            title: "添加判斷",
                                            event: gvc.event(() => {
                                                widget.data.list.push({ code: '' });
                                                gvc.notifyDataChange(id);
                                            })
                                        },
                                        refreshComponent: () => {
                                            widget.refreshComponent();
                                        },
                                        originalArray: widget.data.list
                                    })}
`;
                                }
                                else {
                                    return ``;
                                }
                            },
                            divCreate: {},
                            onCreate: () => {
                                if (!data.dataList) {
                                    setTimeout(() => {
                                        getData();
                                    }, 100);
                                }
                            }
                        };
                    });
                }
            };
        }
    };
});
