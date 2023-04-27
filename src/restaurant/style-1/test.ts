import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    return `<h3>${widget.data.text}</h3>`
                },
                editor:()=>{
                    return glitter.htmlGenerate.editeInput(
                        {
                            gvc:gvc,
                            title:'標題',
                            default:widget.data.text ?? "",
                            placeHolder:"",
                            callback:(text)=>{
                                widget.data.text=text
                                widget.refreshComponent()
                            }
                        }
                    )
                }
            }
        },
    }
})