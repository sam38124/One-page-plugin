import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    widget.data.clickEvent=widget.data.clickEvent ?? {}

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return ` 
                            <img class="w-100 ${widget.data.layout} ${widget.data.class}" style="${widget.data.style}" src="${widget.data.link ?? `https://oursbride.com/wp-content/uploads/2018/06/no-image.jpg`}"
                            onclick="${gvc.event(()=>{
                                TriggerEvent.trigger({
                                    gvc,
                                    widget,
                                    clickEvent:widget.data.clickEvent
                                })
                            })}">`
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '圖片1',
                            def:widget.data.link,
                            callback:(data)=>{
                                widget.data.link=data
                                widget.refreshComponent()
                            }
                        })
                    ])
                }
            }
        },
    }
})