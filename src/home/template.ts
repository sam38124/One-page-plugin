import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    return {
        temp:{
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        return ``
                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        }
    }
})