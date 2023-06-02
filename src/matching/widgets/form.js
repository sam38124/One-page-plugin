import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { component } from "../../official/component.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
import { placeSelect } from "./selectPlace.js";
import { selectComponent } from "../../form-component/normalstyle/select.js";
import { checkbox } from "../../form-component/normalstyle/checkbox.js";
const staticObj = {
    type: [
        {
            title: '勾選欄位',
            value: `checkbox`,
        },
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
            title: '時間',
            value: `time`,
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
        },
        {
            title: "地區選擇",
            value: "placeSelect"
        }
    ]
};
export const form = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID, subData) => {
            widget.data.formExpand = widget.data.formExpand ?? {};
            widget.data.formList = widget.data.formList ?? [];
            widget.data.formEvent = widget.data.formEvent ?? {};
            subData = subData ?? {};
            let readonly = subData.readonly;
            subData = subData.formData ?? subData;
            widget.data.btnList = widget.data.btnList ?? [];
            widget.data.btnListExpand = widget.data.btnListExpand ?? {};
            widget.data.formFrom = widget.data.formFrom ?? {};
            let refreshTimer = 0;
            const id = glitter.getUUID();
            return {
                view: () => {
                    let loading = true;
                    let haveGroup = [];
                    let formListComponent = widget.data.formList;
                    let formListIndex = [];
                    function generateForm(formList, formData, appendGroup) {
                        return formList.map((data) => {
                            if (data.group && !appendGroup) {
                                if (haveGroup.indexOf(data.group) === -1) {
                                    haveGroup.push(data.group);
                                    return Editor.toggleExpand({
                                        gvc: gvc, title: data.group, data: data, innerText: () => {
                                            return `<div class="row">${generateForm(formList.filter((dd) => {
                                                return data.group === dd.group;
                                            }), formData, data.group)}</div>`;
                                        }, color: `#4c6ac9`,
                                        class: `border-white`,
                                        style: ``
                                    }) + `<div class="mb-2"></div>`;
                                }
                                else {
                                    return ``;
                                }
                            }
                            if (data.type !== 'arrayItem') {
                                formData[data.key] = (formData[data.key] == undefined) ? (data.def ?? '') : formData[data.key];
                            }
                            else {
                                formData[data.key] = (formData[data.key] == undefined) ? [] : formData[data.key];
                            }
                            return `
                  <div class="col-sm-${data.col} col-${data.colm}">
                  <div class="position-relative ${(data.type === 'arrayItem' || data.type === 'custom') ? `` : `mb-2`}" >
                    <label  class="form-label fs-base ${(data.type === 'arrayItem' || data.type === 'custom') ? `d-none` : ``}"  >${(data.requirement === 'true') ? `<span class="text-danger ms-2"> * </span>${data.label}` : data.label}</label>
                    ${(() => {
                                switch (data.type) {
                                    case 'checkbox':
                                        return checkbox.render(gvc, widget, setting, hoverID, {
                                            data: data,
                                            formData: formData,
                                            readonly: readonly
                                        }).view();
                                    case 'select':
                                        return selectComponent.render(gvc, widget, setting, hoverID, {
                                            data: data,
                                            formData: formData,
                                            readonly: readonly
                                        }).view();
                                    case 'textArea':
                                        return `<textArea class="form-control" style="height:100px;" onchange="${gvc.event((e) => {
                                            formData[data.key] = e.value;
                                        })}" ${(data.states === '1' || readonly) ? `readonly` : ``}>${formData[data.key] ?? ""}</textArea>`;
                                    case 'imageUpload':
                                        return Editor.uploadImage({
                                            gvc: gvc,
                                            title: ``,
                                            def: formData[data.key] ?? "",
                                            callback: (e) => {
                                                subData[data.key] = e;
                                                formData[data.key] = e;
                                            },
                                            readonly: data.states === '1'
                                        });
                                    case 'arrayItem':
                                        return Editor.arrayItem({
                                            originalArray: formData[data.key],
                                            gvc: gvc,
                                            title: data.label,
                                            array: formData[data.key].map((dd, index) => {
                                                return {
                                                    title: `${data.index ?? '項目'}:${index + 1}`,
                                                    expand: dd,
                                                    innerHtml: (() => {
                                                        return `<div class="row" >${generateForm(JSON.parse(JSON.stringify(data.elemList)), dd)}</div>`;
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
                                                widget.refreshComponent();
                                            },
                                            color1: '#2c2c2c',
                                            color2: "#404954",
                                            class: `border-white`,
                                            readonly: data.states === '1' || readonly
                                        }) + `<div class="my-2 " style=""></div>`;
                                    case 'custom':
                                        if (data.component) {
                                            return data.component.view();
                                        }
                                        return component.render(gvc, {
                                            data: data,
                                            refreshComponent: widget.refreshComponent
                                        }, setting, hoverID, {
                                            formData: subData,
                                            formList: formListComponent,
                                            readonly: data.states === '1'
                                        }).view();
                                    case 'cal':
                                        return `<input type="${data.type}" id="${data.key}"
   value="${(() => {
                                            try {
                                                return eval(data.def);
                                            }
                                            catch (e) {
                                                return ``;
                                            }
                                        })()}" class="form-control form-control-lg" style="font-size:15px;" readonly>`;
                                    case 'placeSelect':
                                        return placeSelect.render(gvc, widget, setting, hoverID, {
                                            formData: formData
                                        }).view();
                                    default:
                                        return `<input type="${data.type}" id="${data.key}"
   value="${formData[data.key] ?? ""}" class="form-control form-control-lg" style="font-size:15px;" onchange="${gvc.event((e) => {
                                            formData[data.key] = e.value;
                                            widget.refreshComponent();
                                        })}" ${(data.states === '1' || readonly) ? `readonly` : ``}>`;
                                }
                            })()}
                  </div>
                </div>
                                `;
                        }).join('');
                    }
                    return gvc.bindView(() => {
                        async function getData() {
                            await new Promise((resolve, reject) => {
                                if (widget.data.formFrom.clickEvent) {
                                    TriggerEvent.trigger({
                                        gvc, widget, clickEvent: widget.data.formFrom, subData: {
                                            callback: (data) => {
                                                if (data) {
                                                    subData = data;
                                                }
                                                resolve(true);
                                                gvc.notifyDataChange(id);
                                            }
                                        }
                                    });
                                }
                                else {
                                    resolve(true);
                                }
                            });
                            for (const a of widget.data.formList) {
                                if (a.type === 'custom') {
                                    await new Promise((resolve, reject) => {
                                        a.component = component.render(gvc, {
                                            data: a,
                                            refreshComponent: widget.refreshComponent
                                        }, setting, hoverID, {
                                            formData: subData,
                                            formList: formListComponent,
                                            readonly: a.states === '1',
                                            callback: (data) => {
                                                if (data.config[0].data.formList) {
                                                    formListComponent = formListComponent.concat(data.config[0].data.formList);
                                                }
                                                resolve(true);
                                            }
                                        });
                                        a.component.view();
                                    });
                                }
                            }
                        }
                        getData().then(() => {
                            loading = false;
                            gvc.notifyDataChange(id);
                        });
                        return {
                            bind: id,
                            view: () => {
                                if (loading) {
                                    return ``;
                                }
                                return `
                   <div class="row">
                      ${generateForm(widget.data.formList, subData)}
</div>
<div class="w-100 d-flex ">
<div class="flex-fill"></div>
${widget.data.btnList.map((dd) => {
                                    return `<button class="btn btn-warning ms-auto ${glitter.htmlGenerate.styleEditor(dd).class()}" onclick="${gvc.event(() => {
                                        TriggerEvent.trigger({
                                            gvc: gvc, widget: widget, clickEvent: dd, subData: subData
                                        });
                                    })}" style="${glitter.htmlGenerate.styleEditor(dd).style()}">${dd.name}</button>`;
                                }).join('')}

</div>

                    `;
                            },
                            divCreate: {},
                            onCreate: () => {
                            }
                        };
                    });
                },
                editor: () => {
                    function getFormEditor(array) {
                        return Editor.arrayItem({
                            originalArray: array,
                            gvc: gvc,
                            title: '表單項目',
                            array: array.map((dd, index) => {
                                dd.formExpand = dd.formExpand ?? {};
                                dd.requirement = dd.requirement ?? "true";
                                return {
                                    title: dd.label || `區塊:${index + 1}`,
                                    expand: dd.formExpand,
                                    innerHtml: (() => {
                                        return gvc.map([
                                            glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: '標題',
                                                default: dd.label || '',
                                                placeHolder: "標題",
                                                callback: (text) => {
                                                    dd.label = text;
                                                    dd.key = text;
                                                    widget.refreshComponent();
                                                }
                                            }),
                                            Editor.select({
                                                title: `輸入類型`,
                                                gvc: gvc,
                                                def: dd.type,
                                                array: staticObj.type,
                                                callback: (text) => {
                                                    dd.type = text;
                                                    widget.refreshComponent();
                                                },
                                            }) + Editor.select({
                                                title: `是否必填`,
                                                gvc: gvc,
                                                def: dd.requirement,
                                                array: [{ title: "是", value: "true" }, { title: "否", value: "false" }],
                                                callback: (text) => {
                                                    dd.requirement = text;
                                                    widget.refreshComponent();
                                                },
                                            }) + (() => {
                                                switch (dd.type) {
                                                    case 'checkbox':
                                                        return checkbox.render(gvc, widget, setting, hoverID, {
                                                            dd: dd,
                                                        }).editor();
                                                    case 'select':
                                                        return selectComponent.render(gvc, widget, setting, hoverID, {
                                                            dd: dd,
                                                        }).editor();
                                                    case 'arrayItem':
                                                        dd.elemList = dd.elemList ?? [];
                                                        return glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: '索引標題',
                                                            default: dd.index,
                                                            placeHolder: '請輸入索引標題',
                                                            callback: (text) => {
                                                                dd.index = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }) + glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: '添加按鈕標題',
                                                            default: dd.addBt,
                                                            placeHolder: '請輸入添加按鈕標題',
                                                            callback: (text) => {
                                                                dd.addBt = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }) + getFormEditor(dd.elemList);
                                                    case 'custom':
                                                        return component.render(gvc, {
                                                            data: dd,
                                                            refreshComponent: widget.refreshComponent
                                                        }, setting, hoverID, subData).editor();
                                                    case 'cal':
                                                        return glitter.htmlGenerate.editeText({
                                                            gvc: gvc,
                                                            title: '計算式',
                                                            default: dd.def,
                                                            placeHolder: '請輸入計算式',
                                                            callback: (text) => {
                                                                dd.def = text;
                                                                widget.refreshComponent();
                                                            },
                                                        });
                                                    default: return glitter.htmlGenerate.editeInput({
                                                        gvc: gvc,
                                                        title: '預設值',
                                                        default: dd.def,
                                                        placeHolder: '請輸入預設值',
                                                        callback: (text) => {
                                                            dd.def = text;
                                                            widget.refreshComponent();
                                                        },
                                                    });
                                                }
                                            })(),
                                        ]);
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
                                        type: 'text', key: glitter.getUUID(), label: "表單區塊", col: "12", colm: "12"
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        });
                    }
                    return `<div class="mt-2"></div>` + gvc.map([
                        getFormEditor(widget.data.formList)
                    ]);
                }
            };
        }
    };
});
