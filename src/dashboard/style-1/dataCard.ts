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
                            mode: "dataCard",
                            col: { pc: 12, tab: 12 },
                            card: [
                                {
                                    col: { pc: 3, tab: 6 },
                                    title: "存貨",
                                    value: 9184,
                                    up: "3.27%",
                                    type: "bar",
                                    data: {
                                        series: db.numberList(10),
                                        color: "#727cf5",
                                    },
                                },
                                {
                                    col: { pc: 3, tab: 6 },
                                    title: "應收帳款(千)",
                                    value: 3254,
                                    down: "5.38%",
                                    type: "line",
                                    data: {
                                        series: db.numberList(10),
                                        color: "#0acf97",
                                    },
                                },
                                {
                                    col: { pc: 3, tab: 6 },
                                    title: "運費(千)",
                                    value: 864,
                                    up: "4.87%",
                                    type: "bar",
                                    data: {
                                        series: db.numberList(12),
                                        color: "#fa5c7c",
                                    },
                                },
                                {
                                    col: { pc: 3, tab: 6 },
                                    title: "本期收益",
                                    value: "$253k",
                                    up: "11.7%",
                                    type: "bar",
                                    data: {
                                        series: db.numberList(10),
                                        color: "#ffbc00",
                                    },
                                },
                                {
                                    col: { pc: 6, tab: 12 },
                                    title: "營運成本",
                                    value: 1845766,
                                    down: "2.97%",
                                    type: "bar",
                                    data: {
                                        series: db.numberList(20),
                                        color: "#5BB3EF",
                                    },
                                },
                                {
                                    col: { pc: 6, tab: 12 },
                                    title: "市值",
                                    value: 542923534,
                                    down: "5.38%",
                                    type: "line",
                                    data: {
                                        series: db.numberList(18),
                                        color: "#9BD836",
                                    },
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