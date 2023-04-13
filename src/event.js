import { TriggerEvent } from './glitterBundle/plugins/trigger-event.js';
import { Editor } from './editor.js';
import { component } from "./official/component.js";
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
    link: {
        title: 'Glitter-連結跳轉',
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
                        return {
                            bind: id,
                            view: () => {
                                object.type = object.type ?? 'inlink';
                                return ` ${Editor.h3('跳轉方式')}
                                    <select
                                        class="form-control form-select"
                                        onchange="${gvc.event((e) => {
                                    object.type = e.value;
                                    gvc.notifyDataChange(id);
                                })}"
                                    >
                                        ${[
                                    { title: '內部連結', value: 'inlink' },
                                    { title: '外部連結', value: 'outlink' },
                                ]
                                    .map((dd) => {
                                    return `<option value="${dd.value}" ${dd.value == object.type ? `selected` : ``}>
                                            ${dd.title}
                                        </option>`;
                                })
                                    .join('')}
                                    </select>
                                    ${(() => {
                                    if (object.type === 'inlink') {
                                        return `<select
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
                                        </select>`;
                                    }
                                    else if (object.type === 'outlink') {
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
                                        return ``;
                                    }
                                })()}`;
                            },
                            divCreate: {},
                        };
                    });
                },
                event: () => {
                    if (object.type === 'inlink') {
                        const url = new URL('./', location.href);
                        url.searchParams.set('page', object.link);
                        location.href = url.href;
                    }
                    else {
                        gvc.glitter.runJsInterFace('openWeb', {
                            url: object.link,
                        }, (data) => { }, {
                            webFunction(data, callback) {
                                gvc.glitter.openNewTab(object.link);
                            },
                        });
                    }
                },
            };
        },
    },
    dialog: {
        title: 'Glitter-彈出頁面區塊',
        fun: (gvc, widget, object, subData) => {
            return {
                editor: () => {
                    const id = gvc.glitter.getUUID();
                    const glitter = gvc.glitter;
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
                                return `<select
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
                                        </select>` +
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '標題',
                                        default: object.title ?? "",
                                        placeHolder: "",
                                        callback: (text) => {
                                            object.title = text;
                                        }
                                    });
                            },
                            divCreate: {}
                        };
                    });
                },
                event: () => {
                    const id = gvc.glitter.getUUID();
                    if (document.getElementById(id)) {
                        $(`#${id}`).remove();
                    }
                    $('body').append(`
<div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-hidden="true" style="">
<div class="modal-dialog modal-dialog-centered modal-lg" style="">
     <div class="modal-content">
            <div class="modal-header ">
            <h4 class="modal-title" id="myCenterModalLabel">${object.title}</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
</div>
<section class="position-relative  pt-0" >
       ${component.render(gvc, {
                        data: {
                            tag: object.link
                        }
                    }, [], [], subData).view()}
      </section>
            </div>
</div>
</div>
`);
                    $(`#${id}`).modal('show');
                }
            };
        }
    },
    test: {
        title: 'Glitter-點擊測試',
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    alert('test');
                },
            };
        },
    },
    code: {
        title: 'Glitter-程式碼區塊',
        fun: (gvc, widget, object) => {
            const glitter = window.glitter;
            return {
                editor: () => {
                    object.code = object.code ?? "";
                    return glitter.htmlGenerate.editeText({
                        gvc: gvc,
                        title: '程式碼區塊',
                        default: object.code,
                        placeHolder: "程式碼區塊",
                        callback: (text) => {
                            object.code = text;
                            widget.refreshComponent();
                        }
                    });
                },
                event: () => {
                    eval(object.code);
                },
            };
        }
    }
});
