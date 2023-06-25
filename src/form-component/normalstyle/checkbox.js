import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
export const checkbox = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID, subData) => {
            const id = glitter.getUUID();
            return {
                view: () => {
                    const data = subData.data;
                    const formData = subData.formData;
                    if (typeof formData[data.key] !== "object") {
                        formData[data.key] = [];
                    }
                    return gvc.bindView(() => {
                        return {
                            bind: id,
                            view: () => {
                                return data.selectList.map((dd, index) => {
                                    data.boxType = data.boxType || 'single';
                                    return `<div class="form-check">
  <input id="${id}${index}" class="form-check-input" type="checkbox" value="" onchange="${gvc.event((e, event) => {
                                        if (!data.readonly) {
                                            if (data.boxType === 'single') {
                                                formData[data.key] = [];
                                            }
                                            else {
                                                formData[data.key] = formData[data.key].filter((d2) => {
                                                    return d2 !== dd.value;
                                                });
                                            }
                                            if (e.checked) {
                                                formData[data.key].push(dd.value);
                                            }
                                        }
                                        gvc.notifyDataChange(id);
                                    })}" ${(formData[data.key].indexOf(dd.value) !== -1) ? `checked` : ``} >
  <label class="form-check-label" style="font-size:16px;font-weight:500;" for="${id}${index}">
    ${dd.name}
  </label>
</div>`;
                                }).join('');
                            },
                            divCreate: { class: `p-2` }
                        };
                    });
                },
                editor: () => {
                    const dd = subData.dd;
                    dd.selectList = dd.selectList ?? [];
                    const list = dd.selectList;
                    return `<div class="mt-2 alert " style="background:orangered;">${Editor.select({
                        title: "選擇數量",
                        gvc: gvc,
                        def: dd.boxType ?? "single",
                        array: [
                            { title: "單選", value: "single" },
                            { title: "多選", value: "multiple" },
                        ],
                        callback: (text) => {
                            dd.boxType = text;
                            gvc.notifyDataChange(id);
                        }
                    }) + (Editor.arrayItem({
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
                                    title: `選項標題`,
                                    default: dd.name,
                                    placeHolder: "輸入選項標題",
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
                            title: "添加選項",
                            event: gvc.event(() => {
                                dd.selectList.push({
                                    name: "名稱", value: glitter.getUUID()
                                });
                                widget.refreshComponent();
                            })
                        },
                        refreshComponent: () => {
                            widget.refreshComponent();
                        }
                    }))}</div>`;
                }
            };
        }
    };
});
