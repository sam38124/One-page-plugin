import { TriggerEvent } from './glitterBundle/plugins/trigger-event.js';
import { Editor } from './editor.js';
import { component } from "./official/component.js";
import { BaseApi } from "./api/base.js";
export class GlobalData {
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
                    }).sort((a, b) => `${a.group}-${a.name}`.localeCompare(`${b.group}-${b.name}`));
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
    link: {
        title: '官方事件-畫面-頁面跳轉',
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return gvc.bindView(() => {
                        const id = gvc.glitter.getUUID();
                        function recursive() {
                            if (GlobalData.data.pageList.length === 0) {
                                GlobalData.data.run();
                                setTimeout(() => {
                                    recursive();
                                }, 200);
                            }
                            else {
                                gvc.notifyDataChange(id);
                            }
                        }
                        recursive();
                        setTimeout(() => {
                            gvc.notifyDataChange(id);
                        }, 1000);
                        return {
                            bind: id,
                            view: () => {
                                if (![
                                    { title: '內部連結', value: 'inlink' },
                                    { title: '外部連結', value: 'outlink' },
                                    { title: 'HashTag', value: 'hashTag' },
                                ].find((dd) => {
                                    return dd.value === object.link_change_type;
                                })) {
                                    object.link_change_type = 'inlink';
                                }
                                return ` ${Editor.h3('跳轉方式')}
                                    <select
                                        class="form-control form-select"
                                        onchange="${gvc.event((e) => {
                                    object.link_change_type = e.value;
                                    gvc.notifyDataChange(id);
                                })}"
                                    >
                                        ${[
                                    { title: '內部連結', value: 'inlink' },
                                    { title: '外部連結', value: 'outlink' },
                                    { title: 'HashTag', value: 'hashTag' },
                                ]
                                    .map((dd) => {
                                    return `<option value="${dd.value}" ${dd.value == object.link_change_type ? `selected` : ``}>
                                            ${dd.title}
                                        </option>`;
                                })
                                    .join('')}
                                    </select>
                                    ${(() => {
                                    if (object.link_change_type === 'inlink') {
                                        object.stackControl = object.stackControl ?? "home";
                                        return `
${Editor.select({
                                            title: '堆棧控制',
                                            gvc: gvc,
                                            def: object.stackControl,
                                            callback: (text) => {
                                                object.stackControl = text;
                                                widget.refreshComponent();
                                            },
                                            array: [{ title: '設為首頁', value: "home" }, {
                                                    title: '頁面跳轉',
                                                    value: "page"
                                                }],
                                        })}
${Editor.h3("選擇頁面")}
<select
                                            class="form-select form-control mt-2"
                                            onchange="${gvc.event((e) => {
                                            console.log(window.$(e).val());
                                            object.link = window.$(e).val();
                                        })}"
                                        >
                                            ${GlobalData.data.pageList.map((dd) => {
                                            object.link = object.link ?? dd.tag;
                                            return `<option value="${dd.tag}" ${object.link === dd.tag ? `selected` : ``}>
                                                    ${dd.group}-${dd.name}
                                                </option>`;
                                        })}
                                        </select>`;
                                    }
                                    else if (object.link_change_type === 'outlink') {
                                        return gvc.glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '',
                                            default: object.link,
                                            placeHolder: '輸入跳轉的連結',
                                            callback: (text) => {
                                                object.link = text;
                                                widget.refreshAll();
                                            },
                                        });
                                    }
                                    else {
                                        return gvc.glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '',
                                            default: object.link,
                                            placeHolder: '輸入跳轉的HashTag',
                                            callback: (text) => {
                                                object.link = text;
                                                widget.refreshAll();
                                            },
                                        });
                                    }
                                })()}`;
                            },
                            divCreate: {},
                        };
                    });
                },
                event: () => {
                    object.link_change_type = object.link_change_type ?? object.type;
                    if (object.link_change_type === 'inlink') {
                        return new Promise(async (resolve, reject) => {
                            const url = new URL('./', location.href);
                            url.searchParams.set('page', object.link);
                            const saasConfig = window.saasConfig;
                            saasConfig.api.getPage(saasConfig.config.appName, object.link).then((data) => {
                                if (data.response.result.length === 0) {
                                    const url = new URL("./", location.href);
                                    url.searchParams.set('page', data.response.redirect);
                                    location.href = url.href;
                                    return;
                                }
                                if (object.stackControl === 'home') {
                                    gvc.glitter.htmlGenerate.setHome({
                                        page_config: data.response.result[0].page_config,
                                        config: data.response.result[0].config,
                                        data: {},
                                        tag: object.link,
                                        option: {
                                            animation: gvc.glitter.animation.fade,
                                        }
                                    });
                                    resolve(true);
                                }
                                else {
                                    gvc.glitter.htmlGenerate.changePage({
                                        page_config: data.response.result[0].page_config,
                                        config: data.response.result[0].config,
                                        data: {},
                                        tag: object.link,
                                        goBack: true,
                                        option: {
                                            animation: gvc.glitter.ut.frSize({
                                                sm: gvc.glitter.animation.fade
                                            }, gvc.glitter.animation.rightToLeft)
                                        }
                                    });
                                    resolve(true);
                                }
                            });
                        });
                    }
                    else if (object.link_change_type === 'hashTag') {
                        const yOffset = $("header").length > 0 ? -$("header").height() : 0;
                        const element = document.getElementsByClassName(`glitterTag${object.link}`)[0];
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                        return true;
                    }
                    else {
                        gvc.glitter.location.href = object.link;
                        return true;
                    }
                },
            };
        },
    },
    dialog: {
        title: '官方事件-畫面-彈跳視窗',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    const id = gvc.glitter.getUUID();
                    const glitter = gvc.glitter;
                    widget.data.coverData = widget.data.coverData ?? {};
                    function recursive() {
                        if (GlobalData.data.pageList.length === 0) {
                            GlobalData.data.run();
                            setTimeout(() => {
                                recursive();
                            }, 200);
                        }
                        else {
                            gvc.notifyDataChange(id);
                        }
                    }
                    recursive();
                    return gvc.bindView(() => {
                        return {
                            bind: id,
                            view: () => {
                                return [`<select
                                            class="form-select form-control mt-2"
                                            onchange="${gvc.event((e) => {
                                        object.link = window.$(e).val();
                                    })}"
                                        >
                                            ${GlobalData.data.pageList.map((dd) => {
                                        object.link = object.link ?? dd.tag;
                                        return `<option value="${dd.tag}" ${object.link === dd.tag ? `selected` : ``}>
                                                    ${dd.group}-${dd.name}
                                                </option>`;
                                    })}
                                        </select>`, TriggerEvent.editer(gvc, widget, widget.data.coverData, {
                                        hover: true,
                                        option: [],
                                        title: "夾帶資料-[將存於新頁面的gvc.getBundle().carryData之中]"
                                    })].join('');
                            },
                            divCreate: {}
                        };
                    });
                },
                event: () => {
                    subData = subData ?? {};
                    return new Promise(async (resolve, reject) => {
                        const data = await TriggerEvent.trigger({
                            gvc, widget, clickEvent: widget.data.coverData, subData
                        });
                        gvc.glitter.innerDialog((gvc) => {
                            gvc.getBundle().carryData = data;
                            return new Promise(async (resolve, reject) => {
                                const view = await component.render(gvc, {
                                    data: {
                                        tag: object.link
                                    }
                                }, [], [], subData).view();
                                resolve(view);
                            });
                        }, gvc.glitter.getUUID());
                    });
                }
            };
        }
    },
    drawer: {
        title: '官方事件-畫面-左側導覽列',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    const id = gvc.glitter.getUUID();
                    function recursive() {
                        if (GlobalData.data.pageList.length === 0) {
                            GlobalData.data.run();
                            setTimeout(() => {
                                recursive();
                            }, 200);
                        }
                        else {
                            gvc.notifyDataChange(id);
                        }
                    }
                    recursive();
                    return gvc.bindView(() => {
                        return {
                            bind: id,
                            view: () => {
                                return `${Editor.h3("選擇頁面")}
                       <select
                                            class="form-select form-control mt-2"
                                            onchange="${gvc.event((e) => {
                                    console.log(window.$(e).val());
                                    object.link = window.$(e).val();
                                })}"
                                        >
                                            ${GlobalData.data.pageList.map((dd) => {
                                    object.link = object.link ?? dd.tag;
                                    return `<option value="${dd.tag}" ${object.link === dd.tag ? `selected` : ``}>
                                                    ${dd.group}-${dd.name}
                                                </option>`;
                                })}
                                        </select>
${gvc.glitter.htmlGenerate.styleEditor(object, gvc).editor(gvc, () => {
                                    widget.refreshComponent();
                                }, "背景樣式")}
`;
                            },
                            divCreate: {}
                        };
                    });
                },
                event: () => {
                    let fal = 0;
                    let data = undefined;
                    async function getData() {
                        return new Promise(async (resolve, reject) => {
                            const saasConfig = window.saasConfig;
                            BaseApi.create({
                                "url": saasConfig.config.url + `/api/v1/template?appName=${saasConfig.config.appName}&tag=${object.link}`,
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
                                    resolve(data);
                                }
                            });
                        });
                    }
                    getData().then((data) => {
                        const id = gvc.glitter.getUUID();
                        gvc.glitter.setDrawer(`<div class="w-100 h-100 ${gvc.glitter.htmlGenerate.styleEditor(object, gvc).class()}"
style="${gvc.glitter.htmlGenerate.styleEditor(object, gvc).style()}"
>${gvc.bindView(() => {
                            return {
                                bind: id,
                                view: () => {
                                    if (!data) {
                                        return ``;
                                    }
                                    return new window.glitter.htmlGenerate(data.config, [], subData ?? {}).render(gvc);
                                },
                                divCreate: {}
                            };
                        })}</div>`, () => {
                            gvc.glitter.openDrawer();
                        });
                    });
                },
            };
        },
    },
    code: {
        title: '官方事件-觸發-代碼區塊',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return gvc.glitter.htmlGenerate.editeText({
                        gvc: gvc,
                        title: "代碼區塊",
                        default: object.code ?? "",
                        placeHolder: "請輸入代碼區塊",
                        callback: (text) => {
                            object.code = text;
                        }
                    });
                },
                event: () => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const a = (eval(object.code));
                            if (a.then) {
                                a.then((data) => {
                                    resolve(data);
                                });
                            }
                            else {
                                resolve(a);
                            }
                        }
                        catch (e) {
                            resolve(object.errorCode ?? false);
                        }
                    });
                },
            };
        },
    },
    registerNotify: {
        title: '官方事件-推播-註冊推播頻道',
        fun: (gvc, widget, object, subData, element) => {
            object.getEvent = object.getEvent ?? {};
            return {
                editor: () => {
                    return TriggerEvent.editer(gvc, widget, object.getEvent, {
                        option: [],
                        title: "取得推播頻道",
                        hover: false
                    });
                },
                event: () => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const topic = await TriggerEvent.trigger({
                                gvc, widget, clickEvent: object.getEvent, subData: subData, element
                            });
                            if (typeof topic == "string") {
                                gvc.glitter.runJsInterFace("regNotification", {
                                    topic: topic
                                }, (response) => {
                                });
                            }
                            else {
                                topic.map((dd) => {
                                    gvc.glitter.runJsInterFace("regNotification", {
                                        topic: dd
                                    }, (response) => {
                                    });
                                });
                            }
                            resolve(true);
                        }
                        catch (e) {
                            resolve(object.errorCode ?? false);
                        }
                    });
                },
            };
        },
    },
});
