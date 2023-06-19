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
                            title: "中山路汽機車通勤速度",
                            table: [
                                { "時速 (公里)": "0-30", 車輛總數: 2250, 違規數: 177 },
                                { "時速 (公里)": "31-60", 車輛總數: 11501, 違規數: 924 },
                                { "時速 (公里)": "61-120", 車輛總數: 758, 違規數: 57 },
                                { "時速 (公里)": "121-240", 車輛總數: 12, 違規數: 0 },
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