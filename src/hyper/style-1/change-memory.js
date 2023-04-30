import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID, subData) => {
            return {
                view: () => {
                    subData.formData.log = subData.formData.log ?? [];
                    return `<div class="w-100 p-0 m-0" style="white-space:normal;">${subData.formData.log.filter((dd) => {
                        return dd.key !== 'expand' && subData.formList.find((d2) => {
                            return dd.key === d2.key;
                        });
                    }).reverse().map((data) => {
                        if (!data.key) {
                            return ``;
                        }
                        function updateText(data, formList) {
                            const key = formList.find((dd) => {
                                return dd.key === data.key;
                            });
                            if (key.type === 'select') {
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
                                        return {
                                            bind: id,
                                            view: () => {
                                                return (vm.data.find((dd) => {
                                                    return dd.value === data.value;
                                                }) ?? { name: data.value }).name;
                                            },
                                            divCreate: { elem: `span` }
                                        };
                                    });
                                }
                                else {
                                    try {
                                        const dd = key.selectList.find((dd) => {
                                            return dd.value === data.value;
                                        }) ?? { name: data.value };
                                        return `被 <span style="color:darksalmon;" class="fw-bold">${data.name ?? data.userID}</span> 更新成 『<span class="fw-bold " style="color:darkorange;">${dd.name}</span>』`;
                                    }
                                    catch (e) {
                                        return ``;
                                    }
                                }
                            }
                            else if (key.type === 'arrayItem') {
                                return `中的內容被 ${data.name ?? data.userID} 更新了`;
                            }
                            else {
                                return `被 <span style="color:darksalmon;">${data.name ?? data.userID}</span> 更新成『<span class="fw-bold " style="color:darkorange;">${data.value}</span>』`;
                            }
                        }
                        return `<div class="alert alert-primary p-2 d-flex flex-wrap align-items-center" style="white-space:normal;color:white;word-break:break-all;">
<span class="fs-4">
<span class="badge bg-warning" style="color:black;">${data.updated_at}</span>
${`<span style="" class="fw-bold text-warning" >${(() => {
                            const key = subData.formList.find((dd) => {
                                return dd.key === data.key;
                            });
                            if (key.group) {
                                return `${key.group}中的${key.label}`;
                            }
                            else {
                                return key.label;
                            }
                        })()}</span>  ${(() => {
                            return updateText(data, subData.formList);
                        })()}`}
</span></div>`;
                    }).join('<div class="w-100 bg-white my-2" style="height:1px;"></div>')}</div>`;
                },
                editor: () => {
                    return ``;
                }
            };
        }
    };
});
