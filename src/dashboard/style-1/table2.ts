import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";

import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    // @ts-ignore
                    let db = new Dashboard();
                    let sourceData = {
                        data:{
                            mode: "table",
                            col: { pc: 4, tab: 6 },
                            title: "社群平台每日使用者(萬)",
                            table: [
                                { 平台: "Facebook", 使用者: 5228, 滯留時間: { td_catalog: "processBar", color: "#82E0AA", percent: 27 }, 運作: 1 },
                                { 平台: "Line", 使用者: 2536, 滯留時間: { td_catalog: "processBar", color: "#3498DB", percent: 82 }, 運作: 1 },
                                { 平台: "Instagram", 使用者: 1425, 滯留時間: { td_catalog: "processBar", color: "#3498DB", percent: 46 }, 運作: 1 },
                                { 平台: "Twitter", 使用者: 560, 滯留時間: { td_catalog: "processBar", color: "#3498DB", percent: 65 }, 運作: 1 },
                                { 平台: "LinkedIn", 使用者: 205, 滯留時間: { td_catalog: "processBar", color: "#3498DB", percent: 36 }, 運作: 1 },
                            ],
                        }
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <div class="row">
                                ${db[sourceData.data.mode](sourceData.data , 0)}
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