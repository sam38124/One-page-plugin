import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
import { BaseApi } from "../api/base.js";
import { Editor } from "../editor.js";
export const component = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        render: (gvc, widget, setting, hoverID, subData) => {
            widget.data.list = widget.data.list ?? [];
            return {
                view: () => {
                    return gvc.bindView(() => {
                        const id = glitter.getUUID();
                        let data = undefined;
                        const saasConfig = window.saasConfig;
                        let fal = 0;
                        function getData() {
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
                                        setTimeout(() => { getData(); }, 200);
                                    }
                                }
                                else {
                                    data = d2.response.result[0];
                                    gvc.notifyDataChange(id);
                                }
                            });
                        }
                        getData();
                        return {
                            bind: id,
                            view: () => {
                                if (data) {
                                    return new glitter.htmlGenerate(data.config, [], subData ?? {}).render(gvc);
                                }
                                else {
                                    return ``;
                                }
                            },
                            divCreate: {}
                        };
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
                        return gvc.bindView(() => {
                            return {
                                bind: id,
                                view: () => {
                                    return group.map((dd) => {
                                        return `<l1 onclick="${gvc.event(() => {
                                            selectGroup = dd;
                                            gvc.notifyDataChange(id);
                                        })}"  class="list-group-item list-group-item-action border-0 py-2 ${(selectGroup === dd) && 'active'} position-relative " style="border-radius: 0px;cursor: pointer;">${dd || "未分類"}</l1>`
                                            +
                                                `<div class="collapse multi-collapse ${(selectGroup === dd) && 'show'}" style="margin-left: 10px;">
 ${data.dataList.filter((d2) => {
                                                    return d2.group === dd;
                                                }).map((d3) => {
                                                    if (d3.tag !== pd.tag) {
                                                        return `<a onclick="${gvc.event(() => {
                                                            pd.tag = d3.tag;
                                                            widget.refreshComponent();
                                                        })}"  class=" list-group-item list-group-item-action border-0 py-2 px-4"  style="border-radius: 0px;">${d3.name}</a>`;
                                                    }
                                                    else {
                                                        return `<a onclick="${gvc.event(() => {
                                                            pd.tag = d3.tag;
                                                            widget.refreshComponent();
                                                        })}"  class=" list-group-item list-group-item-action border-0 py-2 px-4 bg-warning"  style="cursor:pointer;background-color: #FFDC6A !important;color:black !important;border-radius: 0px;">${d3.name}</a>`;
                                                    }
                                                }).join('')}
</div>`;
                                    }).join('');
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
                                    return Editor.h3("預設嵌入頁面") + `<div class="dropdown-menu show position-relative" style="max-height: calc(100vh - 100px);width:300px;max-width:100%;overflow-y: scroll;">
<ul class="list-group list-group-flush">
    ${setPage(widget.data)}
</ul>

  </div>
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
                                                        widget.refreshComponent();
                                                    }
                                                }) + glitter.htmlGenerate.editeText({
                                                    gvc: gvc,
                                                    title: `判斷式內容`,
                                                    default: dd.code,
                                                    placeHolder: "輸入程式碼",
                                                    callback: (text) => {
                                                        dd.code = text;
                                                        widget.refreshComponent();
                                                    }
                                                }) + `
${Editor.h3("嵌入頁面")}
<div class="dropdown-menu show position-relative" style="max-height: calc(100vh - 100px);width:100%;overflow-y: scroll;">
<ul class="list-group list-group-flush">
    ${setPage(dd)}
</ul>

  </div>`,
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
                                                widget.refreshComponent();
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
