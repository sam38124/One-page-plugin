import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {Editor} from "../../editor.js";


Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                           `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return `
                    <button type="button" class="btn  w-100  shadow mt-2" style="background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);" onclick="${gvc.event((e:any)=>{
                        glitter.openDiaLog(`${new URL('../dialog/dialog.js', import.meta.url)}`, 'cssExtend', "")
                    })}">設計樣式</button>
                    `
                }
            }
        },
    }
})