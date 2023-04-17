import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ScriptStyle1} from "../script-style-1.js";
import {Editor} from "../../editor.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
import {component} from "../../official/component.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

export const form = Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID, subData) => {
            widget.data.formExpand = widget.data.formExpand ?? {}
            widget.data.formList = widget.data.formList ?? []
            widget.data.formEvent = widget.data.formEvent ?? {}


            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget)
                    subData = subData ?? {}

                    function generateForm(formList: any, formData: any) {
                        return formList.map((data: any) => {
                            if (data.type !== 'arrayItem') {
                                formData[data.key] = (formData[data.key] == undefined) ? (data.def ?? '') : formData[data.key]
                            } else {
                                formData[data.key] = (formData[data.key] == undefined) ? [] : formData[data.key]
                            }

                            return `
                  <div class="col-sm-${data.col} col-${data.colm}">
                  <div class="position-relative ${(data.type === 'arrayItem') ? ``:`mb-2`}">
                    <label for="email" class="form-label fs-base ${(data.type === 'arrayItem') ? `d-none`:``}"  >${data.label}</label>
                    ${(() => {
                                switch (data.type) {
                                    case 'select':
                                        if (data.selectType === 'api') {
                                            data.selectAPI = data.selectAPI ?? {}
                                            return gvc.bindView(() => {
                                                const id = glitter.getUUID()
                                                const vm: {
                                                    callback: () => void,
                                                    data: any
                                                } = {
                                                    callback: () => {
                                                        gvc.notifyDataChange(id)
                                                    },
                                                    data: []
                                                }
                                                TriggerEvent.trigger({
                                                    gvc: gvc, widget: widget, clickEvent: data.selectAPI, subData: vm
                                                })
                                                return {
                                                    bind: id,
                                                    view: () => {
                                                        return vm.data.map((dd: any) => {
                                                            formData[data.key] = formData[data.key] ?? dd.value
                                                            return /*html*/ `<option value="${dd.value}" ${dd.value === formData[data.key] ? `selected` : ``}>
                                ${dd.key}
                            </option>`;
                                                        }).join('') + `<option value="" ${formData[data.key] === '' ? `selected` : ``}>
                                選擇供應商
                            </option>`
                                                    },
                                                    divCreate: {
                                                        elem: `select`, class: `form-select`, option: [{
                                                            key: 'onchange',
                                                            value: gvc.event((e) => {
                                                                formData[data.key] = e.value
                                                            })
                                                        }]
                                                    }
                                                }
                                            })
                                        } else {
                                            return `<select
                class="form-select"
                onchange="${gvc.event((e: any) => {
                                                formData[data.key] = e.value
                                            })}"
            >
                ${data.selectList.map((dd: any) => {
                                                formData[data.key] = formData[data.key] ?? dd.value
                                                return /*html*/ `<option value="${dd.value}" ${dd.value === formData[data.key] ? `selected` : ``}>
                                ${dd.name}
                            </option>`;
                                            }).join('')}
            </select>`
                                        }
                                    case 'textArea':
                                        return `<textArea class="form-control" style="height:100px;" onchange="${gvc.event((e) => {
                                            formData[data.key] = e.value
                                        })}">${formData[data.key] ?? ""}</textArea>`
                                    case 'imageUpload':
                                        return Editor.uploadImage({
                                            gvc: gvc,
                                            title: ``,
                                            def: formData[data.key] ?? "",
                                            callback: (e) => {
                                                subData[data.key] = e
                                                formData[data.key] = e
                                            },
                                        })
                                    case 'arrayItem':
                                       return  Editor.arrayItem({
                                            originalArray: formData[data.key],
                                            gvc: gvc,
                                            title: data.label,
                                            array: formData[data.key].map((dd: any, index: number) => {
                                                return {
                                                    title: `${dd.index ?? '項目'}:${index + 1}`,
                                                    expand: dd,
                                                    innerHtml: ``,
                                                    minus: gvc.event(() => {
                                                        formData[data.key].splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: data,
                                            plus: {
                                                title: data.addBt,
                                                event: gvc.event(() => {
                                                    formData[data.key].push({});
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent: () => {
                                                widget.refreshComponent()
                                            },
                                           color1:'#131022',
                                           color2:"#404954"
                                        })+`<div class="my-2"></div>`
                                        return generateForm(data.elemList, formData[data.key])
                                    default:
                                        return `  <input type="${data.type}" id="${data.key}"
   value="${formData[data.key] ?? ""}" class="form-control form-control-lg" style="font-size:15px;" onchange="${gvc.event((e) => {
                                            formData[data.key] = e.value
                                        })}">`;
                                }
                            })()}
                  </div>
                </div>
                                `
                        }).join('')
                    }

                    return `
                   <div class="row">
                      ${generateForm(widget.data.formList, subData)}
</div>
<div class="w-100 d-flex ">
<div class="flex-fill"></div>
<button class="btn btn-warning ms-auto" onclick="${gvc.event(() => {
                        TriggerEvent.trigger({
                            gvc: gvc, widget: widget, clickEvent: widget.data.formEvent, subData: subData
                        })
                    })}">送出表單</button>
</div>

                    `
                },
                editor: () => {
                    function getFormEditor(array: any) {
                        return Editor.arrayItem({
                            originalArray: array,
                            gvc: gvc,
                            title: '表單項目',
                            array: array.map((dd: any, index: number) => {
                                dd.formExpand = dd.formExoand ?? {}
                                return {
                                    title: dd.label || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        Editor.toggleExpand({
                                            gvc: gvc, title: "表單設計樣式",
                                            data: dd.formExpand,
                                            innerText: () => {
                                                dd.colm = dd.colm ?? 12
                                                return gvc.map([
                                                    Editor.select({
                                                        title: `寬度`,
                                                        gvc: gvc,
                                                        def: dd.col,
                                                        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((data: any) => {
                                                            return `${data}`
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
                                                        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((data: any) => {
                                                            return `${data}`
                                                        }),
                                                        callback: (text) => {
                                                            dd.colm = text;
                                                            widget.refreshComponent();
                                                        },
                                                    })
                                                ])
                                            }
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '標題',
                                            default: dd.label || '',
                                            placeHolder: "標題",
                                            callback: (text) => {
                                                dd.label = text
                                                widget.refreshComponent()
                                            }
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: 'Key值',
                                            default: dd.key || '',
                                            placeHolder: "Key值",
                                            callback: (text) => {
                                                dd.key = text
                                                widget.refreshComponent()
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
                                                },
                                                {
                                                    title: '圖片上傳',
                                                    value: `imageUpload`,
                                                },
                                                {
                                                    title: '多項列表',
                                                    value: `arrayItem`,
                                                }
                                            ],
                                            callback: (text) => {
                                                dd.type = text;
                                                widget.refreshComponent();
                                            },
                                        }) + (() => {
                                            if (dd.type === 'select') {
                                                dd.selectList = dd.selectList ?? []
                                                dd.selectType = dd.selectType ?? 'manual'
                                                const list = dd.selectList
                                                let html = Editor.select({
                                                    title: '資料來源',
                                                    gvc: gvc,
                                                    def: dd.selectType,
                                                    array: [{
                                                        title: '手動設定', value: 'manual'
                                                    }, {
                                                        title: 'API', value: 'api'
                                                    }],
                                                    callback: (text) => {
                                                        dd.selectType = text;
                                                        widget.refreshComponent()
                                                    }
                                                })
                                                if (dd.selectType === 'manual') {
                                                    html += `<div class="alert alert-dark mt-2">${(Editor.arrayItem({
                                                        gvc: gvc,
                                                        title: "選項集合",
                                                        originalArray: dd.selectList,
                                                        array: dd.selectList.map((dd: any, index: number) => {
                                                            return {
                                                                title: dd.name || `區塊:${index + 1}`,
                                                                expand: dd,
                                                                innerHtml:
                                                                    glitter.htmlGenerate.editeInput({
                                                                        gvc: gvc,
                                                                        title: `參數標題`,
                                                                        default: dd.name,
                                                                        placeHolder: "輸入參數標題",
                                                                        callback: (text) => {
                                                                            dd.name = text
                                                                            widget.refreshComponent()
                                                                        }
                                                                    }) + glitter.htmlGenerate.editeInput({
                                                                        gvc: gvc,
                                                                        title: `Value`,
                                                                        default: dd.value,
                                                                        placeHolder: "輸入參數值",
                                                                        callback: (text) => {
                                                                            dd.value = text
                                                                            widget.refreshComponent()
                                                                        }
                                                                    })
                                                                ,
                                                                minus: gvc.event(() => {
                                                                    list.splice(index, 1)
                                                                    widget.refreshComponent()
                                                                })
                                                            }
                                                        }),
                                                        expand: widget.data,
                                                        plus: {
                                                            title: "添加區塊",
                                                            event: gvc.event(() => {
                                                                dd.selectList.push({
                                                                    name: "名稱", value: "", key: "default"
                                                                })
                                                                widget.refreshComponent()
                                                            })
                                                        },
                                                        refreshComponent: () => {
                                                            widget.refreshComponent()
                                                        }
                                                    }) + glitter.htmlGenerate.editeInput({
                                                        gvc: gvc,
                                                        title: '預設值',
                                                        default: dd.def,
                                                        placeHolder: '請輸入預設值',
                                                        callback: (text) => {
                                                            dd.def = text
                                                            widget.refreshComponent()
                                                        },
                                                    }))}</div>`
                                                } else {
                                                    dd.selectAPI = dd.selectAPI ?? {}
                                                    html += TriggerEvent.editer(gvc, widget, dd.selectAPI, {
                                                        hover: true,
                                                        option: [],
                                                        title: "選擇API"
                                                    })
                                                }
                                                return html
                                            } else if (dd.type === 'arrayItem') {
                                                dd.elemList = dd.elemList ?? []
                                                return  glitter.htmlGenerate.editeInput({
                                                    gvc: gvc,
                                                    title: '添加按鈕標題',
                                                    default: dd.index,
                                                    placeHolder: '請輸入添加按鈕標題',
                                                    callback: (text) => {
                                                        dd.index = text
                                                        widget.refreshComponent()
                                                    },
                                                }) +glitter.htmlGenerate.editeInput({
                                                    gvc: gvc,
                                                    title: '添加按鈕標題',
                                                    default: dd.addBt,
                                                    placeHolder: '請輸入添加按鈕標題',
                                                    callback: (text) => {
                                                        dd.addBt = text
                                                        widget.refreshComponent()
                                                    },
                                                }) + getFormEditor(dd.elemList)
                                            } else {
                                                return glitter.htmlGenerate.editeInput({
                                                    gvc: gvc,
                                                    title: '預設值',
                                                    default: dd.def,
                                                    placeHolder: '請輸入預設值',
                                                    callback: (text) => {
                                                        dd.def = text
                                                        widget.refreshComponent()
                                                    },
                                                })
                                            }
                                        })()
                                    ]),
                                    minus: gvc.event(() => {
                                        array.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    array.push({
                                        type: 'text', key: 'block', label: "表單區塊", col: "12"
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent()
                            }
                        })
                    }

                    return `<div class="mt-2"></div>` + gvc.map([Editor.toggleExpand({
                        gvc: gvc, title: "表單", data: widget.data.formExpand, innerText: () => {
                            return gvc.map([
                                getFormEditor(widget.data.formList),
                                TriggerEvent.editer(gvc, widget, widget.data.formEvent, {
                                    hover: true,
                                    option: [],
                                    title: "送出按鈕"
                                })
                            ])
                        }
                    })])

                }
            }
        }
    }
})