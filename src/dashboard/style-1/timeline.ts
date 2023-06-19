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
                            mode: "timeline",
                            col: { pc: 3, tab: 6 },
                            title: "部門通知",
                            item: [
                                {
                                    icon: "mdi mdi-upload",
                                    color: "info",
                                    title: "王偉誠 通知你會議資訊",
                                    text: `下午3點15分 會議室H2 與專案小組報告進度會議`,
                                    ago: "5 分鐘前",
                                },
                                {
                                    icon: "mdi mdi-airplane",
                                    color: "primary",
                                    title: "李俊洋 公布新的產業資訊",
                                    text: `歐洲最新法規 <span class="fw-bold">3C產品轉接頭皆使用Type-C</span>`,
                                    ago: "35 分鐘前",
                                },
                                {
                                    icon: "mdi mdi-microphone",
                                    color: "info",
                                    title: "謝俊宏 完成專案進度通知",
                                    text: `已完成 <span class="fw-bold">"上傳商品至商店"</span> 的功能`,
                                    ago: "2 小時前",
                                },
                                {
                                    icon: "mdi mdi-upload",
                                    color: "primary",
                                    title: "簡如君",
                                    text: `更新圖片 <span class="fw-bold">"Error404.jpg"</span>`,
                                    ago: "12 小時前",
                                },
                                {
                                    icon: "mdi mdi-upload",
                                    color: "info",
                                    title: "產品已在 Dave shop 上線",
                                    text: `記錄新增在 <span class="fw-bold">官方管理員</span> 上`,
                                    ago: "15 小時前",
                                },
                                {
                                    icon: "mdi mdi-microphone",
                                    color: "primary",
                                    title: "陳樂剛 通知了你",
                                    text: `觀看郵件 <span class="fw-bold">"你完成了嗎?"</span>`,
                                    ago: "2 天前",
                                },
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