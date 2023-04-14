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
                            mode: "rowCard",
                            card: [
                                { icon: "dripicons-briefcase", value: "29件", name: "今年完成專案數" },
                                { icon: "dripicons-lightbulb", value: "75件", name: "專利權數量" },
                                { icon: "dripicons-user-group", value: "31位", name: "公司成員" },
                                { icon: "dripicons-graph-line", value: "13%", name: "去年營業成長率" },
                                { icon: "dripicons-cloud-download", value: "31個", name: "雲端串接服務" },
                                { icon: "dripicons-jewel", value: "254個", name: "顧客五星評價數" },
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