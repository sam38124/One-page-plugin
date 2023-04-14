import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
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
                            title: "英國觀光景點遊客流量",
                            table: [
                                { 景點: "Tower of London", "觀光客數量/小時": 5228, 飽和程度: { td_catalog: "processBar", color: "#E59866", percent: 27 } },
                                {
                                    景點: "Buckingham Palace",
                                    "觀光客數量/小時": 2536,
                                    飽和程度: { td_catalog: "processBar", color: "#82E0AA", percent: 82 },
                                },
                                {
                                    景點: "Piccadilly Circus",
                                    "觀光客數量/小時": 1425,
                                    飽和程度: { td_catalog: "processBar", color: "#CB4335", percent: 46 },
                                },
                                {
                                    景點: "Kensington Palace",
                                    "觀光客數量/小時": 560,
                                    飽和程度: { td_catalog: "processBar", color: "#3498DB", percent: 65 },
                                },
                                { 景點: "Stonehenge", "觀光客數量/小時": 205, 飽和程度: { td_catalog: "processBar", color: "#212F3D", percent: 36 } },
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