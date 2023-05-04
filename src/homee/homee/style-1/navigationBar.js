import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { ScriptStyle1 } from "../../script-style-1.js";
import { SharedView } from "../../commenPage/shareView.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    const sharedView = new SharedView(gvc);
                    widget.data.left = widget.data.left ?? [
                        { img: "https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1676612939990" }
                    ];
                    widget.data.right = widget.data.right ?? [
                        { img: "https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1677515010761" },
                        { img: "https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1677515023026" }
                    ];
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return sharedView.navigationBar({
                                title: widget.data.title ?? "標題",
                                leftIcon: widget.data.left.map((dd) => {
                                    dd.type = dd.type ?? 'image';
                                    if (dd.type === 'image') {
                                        return (dd.img && `<img class="" src="${dd.img}" style="height: ${dd.imgHeight || "24px"};width: ${dd.imgWidth || "24px"};" alt="" onclick="${gvc.event(() => {
                                        })}">`);
                                    }
                                    else {
                                        return `<span class="${dd.class ?? ""}" style="${dd.style ?? ""}" onclick="${gvc.event(() => {
                                        })}">${dd.title ?? ""}</span>`;
                                    }
                                }).join('<div class="mx-2"></div>'),
                                rightIcon: widget.data.right.map((dd) => {
                                    dd.badge = dd.badge ?? {};
                                    dd.type = dd.type ?? 'image';
                                    return `<div class="position-relative">
${(() => {
                                        if (dd.type === 'image') {
                                            return (dd.img && `<img class="" src="${dd.img}" style="height: ${dd.imgHeight || "24px"};width: ${dd.imgWidth || "24px"};" alt="" onclick="${gvc.event(() => {
                                            })}">`);
                                        }
                                        else {
                                            return `<span class="${dd.class ?? ""}" style="${dd.style ?? ""}" onclick="${gvc.event(() => {
                                            })}">${dd.title ?? ""}</span>`;
                                        }
                                    })()}
      ${gvc.bindView(() => {
                                        let badge = 0;
                                        const id = gvc.glitter.getUUID();
                                        dd.badge.callback = (count) => {
                                            badge = count;
                                            gvc.notifyDataChange(id);
                                        };
                                        TriggerEvent.trigger({
                                            gvc, widget, clickEvent: dd.badge
                                        });
                                        return {
                                            bind: id,
                                            view: () => {
                                                if (badge === 0) {
                                                    return ``;
                                                }
                                                return `<div class=" d-flex align-items-center justify-content-center" style="position: absolute;
width: 16px;
height: 16px;
background: #FE5541;
border: 1px solid #FFFFFF;
font-size: 9px;

color: white;
border-radius: 8px;" >${badge}</div>`;
                                            },
                                            divCreate: { class: `position-absolute top-0 right-0`, style: `top:0px;
right: 8px;` }
                                        };
                                    })}
</div>`;
                                }).join('<div class="mx-2"></div>'),
                                background: widget.data.bgcolor ?? "white"
                            });
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return ``;
                }
            };
        },
    };
});
