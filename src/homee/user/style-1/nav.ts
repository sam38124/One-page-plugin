import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {ClickEvent} from "../../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {
            topInset: 10,
        },
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    glitter.runJsInterFace("getTopInset", {}, (response) => {
                        if (widget.data.topInset != response.data) {
                            widget.data.topInset = response.data;
                            widget.refreshComponent()
                        }
                    }, {
                        webFunction: () => {
                            return {data: 10}
                        }
                    })

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <div class="w-100 d-flex" style="padding-right: 26px;padding-top: ${10 + widget.data.topInset}px;">
                                ${gvc.bindView(() => {
                                let noticeCount = 0
                                glitter.runJsInterFace("setNotificationBadgeCallBack", {}, (response) => {
                                    
                                    noticeCount = parseInt(response.data, 10)
                                    gvc.notifyDataChange('notification')
                                })
                                return {
                                    bind: `notification`,
                                    view: () => {
                                        return ` 
                                            <img class="ms-auto" src="${new URL!(`../../img/component/notification.svg`, import.meta.url)}" alt="" onclick="${gvc.event(() => {
                                            glitter.runJsInterFace("noticeBell", {}, () => {
                                            })
                                        })}">
                                            ${(noticeCount > 0) ? `<div class="mySpaceCount" style="position: absolute;right:-4px;top:-4px;z-index: 5;">${noticeCount}</div>` : ``}
                                        `
                                    },
                                    divCreate: {class: `ms-auto position-relative`},
                                    onCreate: () => {
                                    }
                                }
                            })}
                                <img  src = "https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1676918883480" alt="" style="margin-left: 20px;width: 28px;height: 28px;" onclick="${gvc.event(() => {
                                // appConfig().changePage(gvc, "system_setting", {})
                                })}">
                            </div>
                        `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return``
                }
            }
        },
    }
})