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
                            title: "本月KPI領先者",
                            stripe: true,
                            table: [
                                {
                                    員工: { td_catalog: "h5_span", h5: "王妍凱", span: "業務一部 - Junior" },
                                    訂單數: 187,
                                    完成數: 145,
                                    "銷售額(萬)": 73,
                                },
                                {
                                    員工: { td_catalog: "h5_span", h5: "陳建紫", span: "業務一部 - Senior" },
                                    訂單數: 235,
                                    完成數: 205,
                                    "銷售額(萬)": 33,
                                },
                                {
                                    員工: { td_catalog: "h5_span", h5: "陸俊賢", span: "業務二部 - Senior" },
                                    訂單數: 257,
                                    完成數: 140,
                                    "銷售額(萬)": 85,
                                },
                                {
                                    員工: { td_catalog: "h5_span", h5: "林聖吉", span: "業務一部 - Junior" },
                                    訂單數: 485,
                                    完成數: 105,
                                    "銷售額(萬)": 178,
                                },
                                {
                                    員工: { td_catalog: "h5_span", h5: "楊國維", span: "業務三部 - Senior" },
                                    訂單數: 657,
                                    完成數: 255,
                                    "銷售額(萬)": 369,
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