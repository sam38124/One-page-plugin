import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController";
import {Editor} from "../editor";
import {ClickEvent} from "../glitterBundle/plugins/click-event";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    return {
        temp:{
            title: "h3",
            subContent: "編輯h3．",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                // widget.refreshComponent()
                // widget.data
                return {
                    view:()=>{
                        return `
                        <h3 class="${glitter.htmlGenerate.styleEditor(widget.data).class()}" style="${glitter.htmlGenerate.styleEditor(widget.data).style()}">${widget.data.title ?? "為定義"}</h3>
                        `
                    },
                    editor:()=>{
                        return gvc.map([
                            glitter.htmlGenerate.styleEditor(widget.data).editor(gvc,()=>{
                                widget.refreshComponent()
                            },"H3的設計樣式"),
                        ])
                    }
                }
            }
        }
    }
})