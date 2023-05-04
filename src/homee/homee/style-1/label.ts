import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `<h3 style="${glitter.htmlGenerate.styleEditor(widget.data).style()} " class="${glitter.htmlGenerate.styleEditor(widget.data).class()}">${widget.label}</h3>`
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return glitter.htmlGenerate.styleEditor(widget.data).editor(gvc,()=>{
                        widget.refreshComponent()
                    },'內部文字設計樣式')
                }
            }
        },
    }
})