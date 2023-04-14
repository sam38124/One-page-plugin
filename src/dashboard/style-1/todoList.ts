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
                            mode: "todoList",
                            title: "待辦事項",
                            col: { pc: 4, tab: 6 },
                            list: [
                                { id: "1", text: "設計頁面 & 切版", done: !0 },
                                { id: "2", text: "規劃渲染順序", done: !0 },
                                { id: "3", text: "模組開發", done: !1 },
                                { id: "4", text: "第三方測試", done: !0 },
                                { id: "5", text: "後台系統串接", done: !0 },
                                { id: "6", text: "公布產品資訊", done: !1 },
                                { id: "7", text: "驗收文件格式 & 管道", done: !1 },
                            ],
                        }
                    }
                    console.log(sourceData.data)

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