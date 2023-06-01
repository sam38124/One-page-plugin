import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
import { Editor } from "../../editor.js";
export const selectComponent = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID, subData) => {
            const data = subData.data;
            const formData = subData.formData;
            const readonly = subData.readonly;
            return {
                view: () => {
                    if (data.selectType === 'api') {
                        data.selectAPI = data.selectAPI ?? {};
                        return gvc.bindView(() => {
                            const id = glitter.getUUID();
                            const vm = {
                                callback: () => {
                                    gvc.notifyDataChange(id);
                                },
                                data: []
                            };
                            TriggerEvent.trigger({
                                gvc: gvc, widget: widget, clickEvent: data.selectAPI, subData: vm
                            });
                            if (data.search === 'search') {
                                return {
                                    bind: id,
                                    view: () => {
                                        return Editor.searchInput({
                                            title: '',
                                            gvc: gvc,
                                            def: (vm.data.find((dd) => {
                                                return `${dd.value}` === `${formData[data.key]}`;
                                            }) ?? {}).key ?? "",
                                            array: vm.data.map((dd) => {
                                                return dd.key;
                                            }),
                                            callback: (text) => {
                                                formData[data.key] = (vm.data.find((dd) => {
                                                    return dd.key === text;
                                                }) ?? {}).value;
                                                gvc.notifyDataChange(id);
                                            },
                                            placeHolder: "請輸入" + data.label
                                        });
                                    },
                                    divCreate: {
                                        elem: `div`
                                    },
                                    onCreate: () => {
                                    }
                                };
                            }
                            else {
                                return {
                                    bind: id,
                                    view: () => {
                                        return vm.data.map((dd) => {
                                            formData[data.key] = formData[data.key] ?? dd.value;
                                            if (dd.visible === 'invisible' && (dd.value !== formData[data.key])) {
                                                return ``;
                                            }
                                            return `<option class="" value="${dd.value}" ${`${dd.value}` === `${formData[data.key]}` ? `selected` : ``}>
                                ${dd.key}
                            </option>`;
                                        }).join('') + `<option value="" ${formData[data.key] === '' ? `selected` : ``}>
                                選擇${data.label}
                            </option>`;
                                    },
                                    divCreate: {
                                        elem: `select`, class: `form-select`, option: [{
                                                key: 'onchange',
                                                value: gvc.event((e) => {
                                                    formData[data.key] = e.value;
                                                })
                                            }, {
                                                key: (data.states === '1' || readonly) ? `disabled` : (() => {
                                                    const dd = vm.data.find((dd) => {
                                                        return dd.value === formData[data.key];
                                                    });
                                                    if (dd && dd.visible === 'invisible' || readonly) {
                                                        return `disabled`;
                                                    }
                                                    else {
                                                        return ``;
                                                    }
                                                })(),
                                                value: ''
                                            }]
                                    }
                                };
                            }
                        });
                    }
                    else {
                        if (data.search === 'search') {
                            const id = glitter.getUUID();
                            return gvc.bindView(() => {
                                return {
                                    bind: id,
                                    view: () => {
                                        return Editor.searchInput({
                                            title: '',
                                            gvc: gvc,
                                            def: (data.selectList.find((dd) => {
                                                return `${dd.value}` === `${formData[data.key]}`;
                                            }) ?? {}).key ?? "",
                                            array: data.selectList.map((dd) => {
                                                return dd.key;
                                            }),
                                            callback: (text) => {
                                                formData[data.key] = (data.selectList.find((dd) => {
                                                    return dd.key === text;
                                                }) ?? {}).value;
                                                gvc.notifyDataChange(id);
                                            },
                                            placeHolder: "請輸入" + data.label
                                        });
                                    },
                                    divCreate: {
                                        elem: `div`
                                    }
                                };
                            });
                        }
                        else {
                            return `<select
                class="form-select"
                onchange="${gvc.event((e) => {
                                formData[data.key] = e.value;
                            })}"
                ${(data.states === '1') ? `disabled` : (() => {
                                const dd = data.selectList.find((dd) => {
                                    return dd.value === formData[data.key];
                                });
                                if (dd && dd.visible === 'invisible' || readonly) {
                                    return `disabled`;
                                }
                                else {
                                    return ``;
                                }
                            })()}
            >
                ${data.selectList.map((dd) => {
                                if (dd.visible === 'invisible' && (dd.value !== formData[data.key])) {
                                    return ``;
                                }
                                formData[data.key] = (formData[data.key] !== undefined && formData[data.key] !== '') ? formData[data.key] : dd.value;
                                return `<option value="${dd.value}" ${dd.value === formData[data.key] ? `selected` : ``}>
                                ${dd.name}
                            </option>`;
                            }).join('')}
            </select>`;
                        }
                    }
                },
                editor: () => {
                    const dd = subData.dd;
                    dd.selectList = dd.selectList ?? [];
                    dd.selectType = dd.selectType ?? 'manual';
                    const list = dd.selectList;
                    let html = ``;
                    if (dd.selectType === 'manual') {
                        html += `<div class="alert alert-dark mt-2">${(Editor.arrayItem({
                            gvc: gvc,
                            title: "選項集合",
                            originalArray: dd.selectList,
                            array: dd.selectList.map((dd, index) => {
                                dd.visible = dd.visible ?? 'visible';
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
                        }) + glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '預設值',
                            default: dd.def,
                            placeHolder: '請輸入預設值',
                            callback: (text) => {
                                dd.def = text;
                                widget.refreshComponent();
                            },
                        }))}</div>`;
                    }
                    else {
                        dd.selectAPI = dd.selectAPI ?? {};
                        html += TriggerEvent.editer(gvc, widget, dd.selectAPI, {
                            hover: true,
                            option: [],
                            title: "選擇API"
                        });
                    }
                    return html;
                }
            };
        }
    };
});
