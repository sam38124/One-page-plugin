import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { Editor } from "../../editor.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
export const form = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID, subData) => {
            widget.data.formExpand = widget.data.formExpand ?? {};
            widget.data.formList = widget.data.formList ?? [];
            widget.data.formEvent = widget.data.formEvent ?? {};
            subData = subData ?? {};
            let formData = subData;
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    return `
                   <div class="row">
                      ${widget.data.formList.map((data) => {
                        return `
                                <div class="col-sm-${data.col} col-${data.colm}">
                  <div class="position-relative mb-2">
                    <label for="email" class="form-label fs-base">${data.label}</label>
                    ${(() => {
                            switch (data.type) {
                                case 'select':
                                    return `<select
                class="form-select"
                onchange="${gvc.event((e) => {
                                        formData[data.key] = e.value;
                                    })}"
            >
                ${data.selectList.map((dd) => {
                                        formData[data.key] = formData[data.key] ?? dd.value;
                                        return `<option value="${dd.value}" ${dd.value === formData[data.key] ? `selected` : ``}>
                                ${dd.name}
                            </option>`;
                                    })
                                        .join('')}
            </select>`;
                                case 'textArea':
                                    return `<textArea class="form-control" style="height:100px;" onchange="${gvc.event((e) => {
                                        formData[data.key] = e.value;
                                    })}">${formData[data.key] ?? ""}</textArea>`;
                                default:
                                    return `  <input type="${data.type}" id="${data.key}"
   value="${formData[data.key] ?? ""}" class="form-control form-control-lg" style="font-size:15px;" onchange="${gvc.event((e) => {
                                        formData[data.key] = e.value;
                                    })}">`;
                            }
                        })()}
                  </div>
                </div>
                                `;
                    }).join('')}
</div>
<div class="w-100 d-flex ">
<div class="flex-fill"></div>
<button class="btn btn-warning ms-auto" onclick="${gvc.event(() => {
                        TriggerEvent.trigger({
                            gvc: gvc, widget: widget, clickEvent: widget.data.formEvent, subData: formData
                        });
                    })}">送出表單</button>
</div>

                    `;
                },
                editor: () => {
                    return `<div class="mt-2"></div>` + gvc.map([Editor.toggleExpand({
                            gvc: gvc, title: "表單", data: widget.data.formExpand, innerText: () => {
                                return gvc.map([
                                    Editor.arrayItem({
                                        originalArray: widget.data.formList,
                                        gvc: gvc,
                                        title: '表單項目',
                                        array: widget.data.formList.map((dd, index) => {
                                            dd.formExpand = dd.formExoand ?? {};
                                            return {
                                                title: dd.label || `區塊:${index + 1}`,
                                                expand: dd,
                                                innerHtml: gvc.map([
                                                    Editor.toggleExpand({
                                                        gvc: gvc, title: "表單設計樣式",
                                                        data: dd.formExpand,
                                                        innerText: () => {
                                                            dd.colm = dd.colm ?? 12;
                                                            return gvc.map([Editor.select({
                                                                    title: `寬度`,
                                                                    gvc: gvc,
                                                                    def: dd.col,
                                                                    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((data) => {
                                                                        return `${data}`;
                                                                    }),
                                                                    callback: (text) => {
                                                                        dd.col = text;
                                                                        widget.refreshComponent();
                                                                    },
                                                                }),
                                                                Editor.select({
                                                                    title: `寬度手機版`,
                                                                    gvc: gvc,
                                                                    def: dd.colm,
                                                                    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((data) => {
                                                                        return `${data}`;
                                                                    }),
                                                                    callback: (text) => {
                                                                        dd.colm = text;
                                                                        widget.refreshComponent();
                                                                    },
                                                                })]);
                                                        }
                                                    }),
                                                    glitter.htmlGenerate.editeInput({
                                                        gvc: gvc,
                                                        title: '標題',
                                                        default: dd.label || '',
                                                        placeHolder: "標題",
                                                        callback: (text) => {
                                                            dd.label = text;
                                                            widget.refreshComponent();
                                                        }
                                                    }),
                                                    glitter.htmlGenerate.editeInput({
                                                        gvc: gvc,
                                                        title: 'Key值',
                                                        default: dd.key || '',
                                                        placeHolder: "Key值",
                                                        callback: (text) => {
                                                            dd.key = text;
                                                            widget.refreshComponent();
                                                        }
                                                    }),
                                                    Editor.select({
                                                        title: `輸入類型`,
                                                        gvc: gvc,
                                                        def: dd.type,
                                                        array: [
                                                            {
                                                                title: '文字',
                                                                value: `text`,
                                                            },
                                                            {
                                                                title: '信箱',
                                                                value: `email`,
                                                            },
                                                            {
                                                                title: '密碼',
                                                                value: `password`,
                                                            },
                                                            {
                                                                title: '電話',
                                                                value: `phone`,
                                                            },
                                                            {
                                                                title: '地址',
                                                                value: `address`,
                                                            },
                                                            {
                                                                title: '公司',
                                                                value: `company`,
                                                            },
                                                            {
                                                                title: '選擇器',
                                                                value: `select`,
                                                            },
                                                            {
                                                                title: '多行文字',
                                                                value: `textArea`,
                                                            }
                                                        ],
                                                        callback: (text) => {
                                                            dd.type = text;
                                                            widget.refreshComponent();
                                                        },
                                                    }) + (() => {
                                                        if (dd.type === 'select') {
                                                            dd.selectList = dd.selectList ?? [];
                                                            const list = dd.selectList;
                                                            return Editor.arrayItem({
                                                                gvc: gvc,
                                                                title: "選項集合",
                                                                originalArray: dd.selectList,
                                                                array: dd.selectList.map((dd, index) => {
                                                                    return {
                                                                        title: dd.name || `區塊:${index + 1}`,
                                                                        expand: dd,
                                                                        innerHtml: glitter.htmlGenerate.editeInput({
                                                                            gvc: gvc,
                                                                            title: `參數標題`,
                                                                            default: dd.name,
                                                                            placeHolder: "輸入參數標題",
                                                                            callback: (text) => {
                                                                                dd.name = text;
                                                                                widget.refreshComponent();
                                                                            }
                                                                        }) + glitter.htmlGenerate.editeInput({
                                                                            gvc: gvc,
                                                                            title: `Value`,
                                                                            default: dd.value,
                                                                            placeHolder: "輸入參數值",
                                                                            callback: (text) => {
                                                                                dd.value = text;
                                                                                widget.refreshComponent();
                                                                            }
                                                                        }),
                                                                        minus: gvc.event(() => {
                                                                            list.splice(index, 1);
                                                                            widget.refreshComponent();
                                                                        })
                                                                    };
                                                                }),
                                                                expand: widget.data,
                                                                plus: {
                                                                    title: "添加區塊",
                                                                    event: gvc.event(() => {
                                                                        dd.selectList.push({
                                                                            name: "名稱", value: "", key: "default"
                                                                        });
                                                                        widget.refreshComponent();
                                                                    })
                                                                },
                                                                refreshComponent: () => {
                                                                    widget.refreshComponent();
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            return ``;
                                                        }
                                                    })()
                                                ]),
                                                minus: gvc.event(() => {
                                                    widget.data.formList.splice(index, 1);
                                                    widget.refreshComponent();
                                                }),
                                            };
                                        }),
                                        expand: widget.data,
                                        plus: {
                                            title: '添加區塊',
                                            event: gvc.event(() => {
                                                widget.data.formList.push({
                                                    type: 'text', key: 'block', label: "表單區塊", col: "12"
                                                });
                                                widget.refreshComponent();
                                            }),
                                        },
                                        refreshComponent: () => {
                                            widget.refreshComponent();
                                        }
                                    }),
                                    TriggerEvent.editer(gvc, widget, widget.data.formEvent, {
                                        hover: true,
                                        option: [],
                                        title: "送出按鈕"
                                    })
                                ]);
                            }
                        })]);
                }
            };
        }
    };
});
