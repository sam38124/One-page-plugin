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
            subData = subData ?? {}
            let readonly=subData.readonly
            console.log(`readonly--${readonly}`)
            subData = subData.formData ?? subData
            widget.data.btnList = widget.data.btnList ?? []
            widget.data.btnListExpand = widget.data.btnListExpand ?? {}
            widget.data.formFrom = widget.data.formFrom ?? {}
            let refreshTimer:any=0
            const id = glitter.getUUID()
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget)
                    let loading = true
                    let haveGroup: any = []
                    let formListComponent: any = widget.data.formList
                    let formListIndex :any= []

                    function generateForm(formList: any, formData: any, appendGroup?: string) {
                        return formList.map((data: any) => {
                            if (data.group && !appendGroup) {
                                if (haveGroup.indexOf(data.group) === -1) {
                                    haveGroup.push(data.group)
                                    return Editor.toggleExpand({
                                        gvc: gvc, title: data.group, data: data, innerText: () => {
                                            return `<div class="row">${
                                                generateForm(formList.filter((dd: any) => {
                                                    return data.group === dd.group
                                                }), formData, data.group)
                                            }</div>`
                                        }, color: `#4c6ac9`,
                                        class: `border-white`,
                                        style: ``
                                    }) + `<div class="mb-2"></div>`
                                } else {
                                    return ``
                                }
                            }
                            if (data.type !== 'arrayItem') {
                                formData[data.key] = (formData[data.key] == undefined) ? (data.def ?? '') : formData[data.key]
                            } else {
                                formData[data.key] = (formData[data.key] == undefined) ? [] : formData[data.key]
                            }

                            return `
                  <div class="col-sm-${data.col} col-${data.colm}">
                  <div class="position-relative ${(data.type === 'arrayItem' || data.type === 'custom') ? `` : `mb-2`}" >
                    <label for="email" class="form-label fs-base ${(data.type === 'arrayItem' || data.type === 'custom') ? `d-none` : ``}"  >${data.label}</label>
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
                                                if (data.search === 'search') {
                                                    return {
                                                        bind: id,
                                                        view: () => {
                                                            return Editor.searchInput({
                                                                title: '',
                                                                gvc: gvc,
                                                                def: (vm.data.find((dd: any) => {
                                                                    return `${dd.value}` === `${formData[data.key]}`
                                                                }) ?? {}).key ?? "",
                                                                array: vm.data.map((dd: any) => {
                                                                    return dd.key
                                                                }),
                                                                callback: (text: string) => {
                                                                    formData[data.key] = (vm.data.find((dd: any) => {
                                                                        return dd.key === text
                                                                    }) ?? {}).value
                                                                    gvc.notifyDataChange(id)
                                                                },
                                                                placeHolder: "請輸入" + data.label
                                                            })
                                                        },
                                                        divCreate: {
                                                            elem: `div`
                                                        },
                                                        onCreate: () => {
                                                        }
                                                    }
                                                } else {
                                                    return {
                                                        bind: id,
                                                        view: () => {
                                                            return vm.data.map((dd: any) => {
                                                                formData[data.key] = formData[data.key] ?? dd.value
                                                                if (dd.visible === 'invisible' && (dd.value !== formData[data.key])) {
                                                                    return ``
                                                                }
                                                                return /*html*/ `<option class="" value="${dd.value}" ${`${dd.value}` === `${formData[data.key]}` ? `selected` : ``}>
                                ${dd.key}
                            </option>`;
                                                            }).join('') + `<option value="" ${formData[data.key] === '' ? `selected` : ``}>
                                選擇${data.label}
                            </option>`
                                                        },
                                                        divCreate: {
                                                            elem: `select`, class: `form-select`, option: [{
                                                                key: 'onchange',
                                                                value: gvc.event((e) => {
                                                                    formData[data.key] = e.value
                                                                })
                                                            }, {
                                                                key: (data.states === '1' || readonly) ? `disabled` : (() => {
                                                                    const dd = vm.data.find((dd: any) => {
                                                                        return dd.value === formData[data.key]
                                                                    })
                                                                    if (dd && dd.visible === 'invisible' || readonly) {
                                                                        return `disabled`
                                                                    } else {
                                                                        return ``
                                                                    }
                                                                })(),
                                                                value: ''
                                                            }]
                                                        }
                                                    }
                                                }
                                            })
                                        } else {
                                            if (data.search === 'search') {
                                                const id = glitter.getUUID()
                                                return {
                                                    bind: id,
                                                    view: () => {
                                                        return Editor.searchInput({
                                                            title: '',
                                                            gvc: gvc,
                                                            def: (data.selectList.find((dd: any) => {
                                                                return `${dd.value}` === `${formData[data.key]}`
                                                            }) ?? {}).key ?? "",
                                                            array: data.selectList.map((dd: any) => {
                                                                return dd.key
                                                            }),
                                                            callback: (text: string) => {
                                                                formData[data.key] = (data.selectList.find((dd: any) => {
                                                                    return dd.key === text
                                                                }) ?? {}).value
                                                                gvc.notifyDataChange(id)
                                                            },
                                                            placeHolder: "請輸入" + data.label
                                                        })
                                                    },
                                                    divCreate: {
                                                        elem: `div`
                                                    }
                                                }
                                            } else {
                                                return `<select
                class="form-select"
                onchange="${gvc.event((e: any) => {
                                                    formData[data.key] = e.value
                                                })}"
                ${(data.states === '1') ? `disabled` : (() => {
                                                    const dd = data.selectList.find((dd: any) => {
                                                        return dd.value === formData[data.key]
                                                    })
                                                    if (dd && dd.visible === 'invisible' || readonly) {
                                                        return `disabled`
                                                    } else {
                                                        return ``
                                                    }
                                                })()}
            >
                ${data.selectList.map((dd: any) => {
                                                    if (dd.visible === 'invisible' && (dd.value !== formData[data.key])) {
                                                        return ``
                                                    }
                                                    formData[data.key] = (formData[data.key]!==undefined && formData[data.key]!=='') ? formData[data.key] : dd.value
                                                    return /*html*/ `<option value="${dd.value}" ${dd.value === formData[data.key] ? `selected` : ``}>
                                ${dd.name}
                            </option>`;
                                                }).join('')}
            </select>`
                                            }
                                        }
                                    case 'textArea':
                                        return `<textArea class="form-control" style="height:100px;" onchange="${gvc.event((e) => {
                                            formData[data.key] = e.value
                                        })}" ${(data.states === '1' || readonly) ? `readonly` : ``}>${formData[data.key] ?? ""}</textArea>`
                                    case 'imageUpload':
                                        return Editor.uploadImage({
                                            gvc: gvc,
                                            title: ``,
                                            def: formData[data.key] ?? "",
                                            callback: (e) => {
                                                subData[data.key] = e
                                                formData[data.key] = e
                                            },
                                            readonly: data.states === '1'
                                        })
                                    case 'arrayItem':
                                        return Editor.arrayItem({
                                            originalArray: formData[data.key],
                                            gvc: gvc,
                                            title: data.label,
                                            array: formData[data.key].map((dd: any, index: number) => {
                                                return {
                                                    title: `${data.index ?? '項目'}:${index + 1}`,
                                                    expand: dd,
                                                    innerHtml: (() => {
                                                        return `<div class="row" >${generateForm(JSON.parse(JSON.stringify(data.elemList)), dd)}</div>`
                                                    }),
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
                                            color1: '#2c2c2c',
                                            color2: "#404954",
                                            class: `border-white`,
                                            readonly:data.states === '1' || readonly
                                        }) + `<div class="my-2 " style=""></div>`
                                    case 'custom':
                                        if(data.component){
                                            return data.component.view()
                                        }
                                        return component.render(gvc, {
                                            data: data,
                                            refreshComponent: widget.refreshComponent
                                        } as any, setting, hoverID, {
                                            formData: subData,
                                            formList: formListComponent,
                                            readonly:data.states === '1'
                                        }).view()
                                    case 'cal':
                                        return `<input type="${data.type}" id="${data.key}"
   value="${(() => {
                                            try {
                                                return eval(data.def)
                                            } catch (e) {
                                                return ``
                                            }
                                        })()}" class="form-control form-control-lg" style="font-size:15px;" readonly>`
                                    default:
                                        return `<input type="${data.type}" id="${data.key}"
   value="${formData[data.key] ?? ""}" class="form-control form-control-lg" style="font-size:15px;" onchange="${gvc.event((e) => {
                                            formData[data.key] = e.value
                                            widget.refreshComponent()
                                        })}" ${(data.states === '1' || readonly) ? `readonly` : ``}>`;
                                }
                            })()}
                  </div>
                </div>
                                `
                        }).join('')
                    }

                    return gvc.bindView(() => {

                        async function getData(){
                            await new Promise((resolve, reject)=>{
                                if (widget.data.formFrom.clickEvent) {
                                    TriggerEvent.trigger({
                                        gvc, widget, clickEvent: widget.data.formFrom, subData: {
                                            callback: (data: any) => {
                                                if (data) {
                                                    subData = data
                                                }
                                                resolve(true)
                                                gvc.notifyDataChange(id)
                                            }
                                        }
                                    });
                                } else {
                                    resolve(true)
                                }
                            })
                            for(const  a of widget.data.formList){
                                if(a.type==='custom'){
                                    // alert('sss')
                                    await new Promise((resolve, reject)=>{
                                        a.component=component.render(gvc, {
                                            data: a,
                                            refreshComponent: widget.refreshComponent
                                        } as any, setting, hoverID, {
                                            formData: subData,
                                            formList: formListComponent,
                                            readonly:a.states === '1',
                                            callback: (data: any) => {
                                                if(data.config[0].data.formList){
                                                    formListComponent = formListComponent.concat(data.config[0].data.formList)
                                                }
                                                // formListComponent = formListComponent.concat(data.config[0].data.formList)
                                                resolve(true)
                                            }
                                        })
                                        a.component.view()
                                    })
                                }
                            }
                        }



                        getData().then(()=>{
                            loading=false
                            gvc.notifyDataChange(id)
                        })
                        return {
                            bind: id,
                            view: () => {
                                if (loading) {
                                    return ``
                                }
                                return `
                   <div class="row">
                      ${generateForm(widget.data.formList, subData)}
</div>
<div class="w-100 d-flex ">
<div class="flex-fill"></div>
${widget.data.btnList.map((dd: any) => {
                                    return `<button class="btn btn-warning ms-auto ${glitter.htmlGenerate.styleEditor(dd).class()}" onclick="${gvc.event(() => {
                                        TriggerEvent.trigger({
                                            gvc: gvc, widget: widget, clickEvent: dd, subData: subData
                                        })
                                    })}" style="${glitter.htmlGenerate.styleEditor(dd).style()}">${dd.name}</button>`
                                }).join('')}

</div>

                    `
                            },
                            divCreate: {},
                            onCreate: () => {
                            }
                        }
                    })

                },
                editor: () => {
                    function getFormEditor(array: any) {
                        return Editor.arrayItem({
                            originalArray: array,
                            gvc: gvc,
                            title: '表單項目',
                            array: array.map((dd: any, index: number) => {
                                dd.formExpand = dd.formExpand ?? {}
                                return {
                                    title: dd.label || `區塊:${index + 1}`,
                                    expand: dd.formExpand,
                                    innerHtml: (()=>{
                                        return gvc.map([
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
                                            Editor.select({
                                                title: `狀態`,
                                                gvc: gvc,
                                                def: dd.states,
                                                array: [
                                                    {
                                                        title: '可讀可寫',
                                                        value: `0`,
                                                    },
                                                    {
                                                        title: '可讀',
                                                        value: `1`,
                                                    },
                                                    {
                                                        title: '隱藏',
                                                        value: `2`,
                                                    }
                                                ],
                                                callback: (text) => {
                                                    dd.states = text;
                                                    widget.refreshComponent();
                                                },
                                            }),
                                            glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: '群組',
                                                default: dd.group || '',
                                                placeHolder: "設定群組",
                                                callback: (text) => {
                                                    dd.group = text
                                                    widget.refreshComponent()
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
                                                        title: '日期',
                                                        value: `date`,
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
                                                    },
                                                    {
                                                        title: '自定義元件',
                                                        value: `custom`,
                                                    },
                                                    {
                                                        title: "計算式",
                                                        value: 'cal'
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
                                                    }) + Editor.select({
                                                        title: '類型',
                                                        gvc: gvc,
                                                        def: dd.search ?? 'default',
                                                        array: [{
                                                            title: '一般', value: 'default'
                                                        }, {
                                                            title: '字元搜索', value: 'search'
                                                        }],
                                                        callback: (text) => {
                                                            dd.search = text;
                                                            widget.refreshComponent()
                                                        }
                                                    })
                                                    if (dd.selectType === 'manual') {
                                                        html += `<div class="alert alert-dark mt-2">${(Editor.arrayItem({
                                                            gvc: gvc,
                                                            title: "選項集合",
                                                            originalArray: dd.selectList,
                                                            array: dd.selectList.map((dd: any, index: number) => {
                                                                dd.visible = dd.visible ?? 'visible'
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
                                                                        }) +
                                                                        `${Editor.select({
                                                                            title: "參數可見度",
                                                                            gvc: gvc,
                                                                            def: dd.visible ?? 'visible',
                                                                            array: [
                                                                                {title: '隱藏', value: "invisible"},
                                                                                {title: '可選', value: "visible"}
                                                                            ],
                                                                            callback: (text) => {
                                                                                dd.visible = text
                                                                                widget.refreshComponent()
                                                                            }
                                                                        })}`
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
                                                    return glitter.htmlGenerate.editeInput({
                                                        gvc: gvc,
                                                        title: '索引標題',
                                                        default: dd.index,
                                                        placeHolder: '請輸入索引標題',
                                                        callback: (text) => {
                                                            dd.index = text
                                                            widget.refreshComponent()
                                                        },
                                                    }) + glitter.htmlGenerate.editeInput({
                                                        gvc: gvc,
                                                        title: '添加按鈕標題',
                                                        default: dd.addBt,
                                                        placeHolder: '請輸入添加按鈕標題',
                                                        callback: (text) => {
                                                            dd.addBt = text
                                                            widget.refreshComponent()
                                                        },
                                                    }) + getFormEditor(dd.elemList)
                                                } else if (dd.type === 'custom') {
                                                    return component.render(gvc, {
                                                        data: dd,
                                                        refreshComponent: widget.refreshComponent
                                                    } as any, setting, hoverID, subData).editor()
                                                } else if (dd.type === 'cal') {
                                                    return glitter.htmlGenerate.editeText({
                                                        gvc: gvc,
                                                        title: '計算式',
                                                        default: dd.def,
                                                        placeHolder: '請輸入計算式',
                                                        callback: (text) => {
                                                            dd.def = text
                                                            widget.refreshComponent()
                                                        },
                                                    })
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
                                        ])
                                    }),
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

                    return `<div class="mt-2"></div>` + TriggerEvent.editer(gvc, widget, widget.data.formFrom, {
                        hover: true,
                        option: [],
                        title: "表單資料來源"
                    }) + gvc.map([
                        getFormEditor(widget.data.formList),
                        Editor.arrayItem({
                            gvc: gvc,
                            title: "按鈕集合",
                            originalArray: widget.data.btnList,
                            array: widget.data.btnList.map((dd: any, index: number) => {
                                return {
                                    title: dd.name || `按鈕:${index + 1}`,
                                    expand: dd,
                                    innerHtml:(()=>{
                                        return  glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: `按鈕名稱`,
                                                default: dd.name,
                                                placeHolder: "輸入按鈕名稱",
                                                callback: (text) => {
                                                    dd.name = text
                                                    widget.refreshComponent()
                                                }
                                            }) +
                                            glitter.htmlGenerate.styleEditor(dd).editor(gvc, () => {
                                                widget.refreshComponent()
                                            }, '按鈕設計樣式') +
                                            TriggerEvent.editer(gvc, widget, dd, {
                                                hover: true,
                                                option: [],
                                                title: "按鈕事件"
                                            })
                                    }),
                                    minus: gvc.event(() => {
                                        widget.data.btnList.splice(index, 1)
                                        widget.refreshComponent()
                                    })
                                }
                            }),
                            expand: widget.data.btnListExpand,
                            plus: {
                                title: "添加按鈕",
                                event: gvc.event(() => {
                                    widget.data.btnList.push({name: '確認送出'})
                                    widget.refreshComponent()
                                })
                            },
                            refreshComponent: () => {
                                widget.refreshComponent()
                            }
                        })
                    ])

                }
            }
        }
    }
})