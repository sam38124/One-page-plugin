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
                            mode: "table_barChart",
                            col: { pc: 4, tab: 12 },
                            title: "台灣專輯排行榜",
                            data: {
                                series: [{ name: "專輯總數", data: db.numberObjList(9) }],
                                color: "#0acf97",
                            },
                            table: [
                                { 專輯: "GOLDEN 太子 BRO", 年度: 2022, 排名: 6 },
                                { 專輯: "我要我們在一起", 年度: 2000, 排名: 1 },
                                { 專輯: "順著河流走", 年度: 2017, 排名: 28 },
                                { 專輯: "為了愛夢一生", 年度: 1991, 排名: 4 },
                                { 專輯: "Ugly Beauty", 年度: 2019, 排名: 2 },
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