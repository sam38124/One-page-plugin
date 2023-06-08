import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { Editor } from "../../../editor.js";
import { ScriptStyle1 } from "../../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    widget.data.dataList = widget.data.dataList ?? [
                        { title: "精選人氣商品", img: "https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675063161788" },
                        { title: "岩板餐桌系列", img: "https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675063296082" },
                        { title: "本週新品（ NEW ）", img: "https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675063314153" }
                    ];
                    console.log(widget.data);
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            gvc.addStyle(`
                        .bannerTitle{
                            font-family: 'Noto Sans TC';
                            font-style: normal;
                            font-weight: 700;
                            font-size: 14px;
                            line-height: 20px;
                            color: #292929;
                            
                            position:absolute;
                            top:8px;
                            left:12px;
                            
                        }
                        .banner-card{
                            border-radius: 12px;
                        }
                    `);
                            return `
                        <div class="w-100 d-flex" style="padding: 16px;">
                            <div class="w-50 banner-card" style="margin-right:7px;padding-top: 50%;background:50% / cover url(${widget.data.dataList[0].img});position: relative" onclick="${gvc.event(() => {
                                TriggerEvent.trigger({
                                    gvc, widget, clickEvent: widget.data.dataList[0]
                                });
                            })}">
                                <div class="bannerTitle">${widget.data.dataList[0].title}</div>
                            </div>
                            <div class="w-50 d-flex flex-column" style="margin-left: 7px;" >
                                <div class="banner-card" style="margin-bottom:6px;padding-top: 50%;background:50% / cover url(${widget.data.dataList[1].img});position: relative;" onclick="${gvc.event(() => {
                                TriggerEvent.trigger({
                                    gvc, widget, clickEvent: widget.data.dataList[1]
                                });
                            })}">
                                    <div class="bannerTitle">${widget.data.dataList[1].title}</div>
                                </div>
                                <div class="banner-card" style="margin-top:6px;padding-top: 50%;background:50% / cover url(${widget.data.dataList[2].img});position: relative;" onclick="${gvc.event(() => {
                                TriggerEvent.trigger({
                                    gvc, widget, clickEvent: widget.data.dataList[2]
                                });
                            })}">
                                    <div class="bannerTitle">${widget.data.dataList[2].title}</div>
                                </div>
                            </div>
                        </div>
                    `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return gvc.map(widget.data.dataList.map((dd, index) => {
                        return `<div class="alert border mt-2">
                                ${glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `banner標題${index + 1}`,
                            default: dd.title,
                            placeHolder: dd.title,
                            callback: (text) => {
                                dd.title = text;
                                widget.refreshAll();
                            }
                        })}
                                
                                <h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">banner圖片${index + 1}</h3>
                                <div class="mt-2"></div>
                                <div class="d-flex flex-column mb-3">
                                    ${Editor.uploadImage({
                            gvc: gvc,
                            title: '圖片',
                            def: dd.img,
                            callback: (data) => {
                                dd.img = data;
                                widget.refreshComponent();
                            }
                        })}                                    
                                </div>
                            ${TriggerEvent.editer(gvc, widget, dd)}
                            </div>`;
                    }));
                }
            };
        },
    };
});
