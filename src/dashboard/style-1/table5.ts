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
                            col: { pc: 6, tab: 8 },
                            title: "產品銷售排行",
                            hideHead: true,
                            table: [
                                [
                                    { td_catalog: "h5_span", h5: "ASOS YUF Gaming", span: "2018-04-17" },
                                    { td_catalog: "h5_span", h5: "$79.49", span: "出貨價格" },
                                    { td_catalog: "h5_span", h5: "32", span: "數量" },
                                    { td_catalog: "h5_span", h5: "$6,518.18", span: "銷售額" },
                                ],
                                [
                                    { td_catalog: "h5_span", h5: "Chrorebook Vetachable CZ1", span: "2018-03-23" },
                                    { td_catalog: "h5_span", h5: "$128.50", span: "出貨價格" },
                                    { td_catalog: "h5_span", h5: "75", span: "數量" },
                                    { td_catalog: "h5_span", h5: "$4,754.50", span: "銷售額" },
                                ],
                                [
                                    { td_catalog: "h5_span", h5: "Logi Wireless Earbuds", span: "2018-06-01" },
                                    { td_catalog: "h5_span", h5: "$39.99", span: "出貨價格" },
                                    { td_catalog: "h5_span", h5: "64", span: "數量" },
                                    { td_catalog: "h5_span", h5: "$2,559.36", span: "銷售額" },
                                ],
                                [
                                    { td_catalog: "h5_span", h5: "AJ telephone mic", span: "2018-05-12" },
                                    { td_catalog: "h5_span", h5: "$20.00", span: "出貨價格" },
                                    { td_catalog: "h5_span", h5: "184", span: "數量" },
                                    { td_catalog: "h5_span", h5: "$3,680.00", span: "銷售額" },
                                ],
                                [
                                    { td_catalog: "h5_span", h5: "realUR GT Neo3", span: "2019-01-06" },
                                    { td_catalog: "h5_span", h5: "$28.49", span: "出貨價格" },
                                    { td_catalog: "h5_span", h5: "69", span: "數量" },
                                    { td_catalog: "h5_span", h5: "$1,965.81", span: "銷售額" },
                                ],
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