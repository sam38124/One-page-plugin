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
                            title: "專案負責人",
                            col: { pc: 6, tab: 12 },
                            hideHead: true,
                            table: [
                                {
                                    0: {
                                        td_catalog: "notify",
                                        img: ScriptStyle1.getRout("assets/images/users/avatar-2.jpg"),
                                        h5: "陳宥茵",
                                        small: "2019-08-17",
                                        span: `從事前端開發與參與UIUX設計流程`,
                                    },
                                    1: { td_catalog: "span_h5", h5: "技術組 - 前端設計師", span: "職稱" },
                                    2: { td_catalog: "threeDot" },
                                },
                                {
                                    0: {
                                        td_catalog: "notify",
                                        img: ScriptStyle1.getRout("assets/images/users/avatar-6.jpg"),
                                        h5: "侯政勳",
                                        small: "2020-05-20",
                                        span: `提供業主需求與進度報告的工作`,
                                    },
                                    1: { td_catalog: "span_h5", h5: "業務組 - 產品經理", span: "職稱" },
                                    2: { td_catalog: "threeDot" },
                                },
                                {
                                    0: {
                                        td_catalog: "notify",
                                        img: ScriptStyle1.getRout("assets/images/users/avatar-3.jpg"),
                                        h5: "張欣怡",
                                        small: "2019-09-15",
                                        span: `提供業主需求與進度報告的工作`,
                                    },
                                    1: { td_catalog: "span_h5", h5: "業務組 - 產品經理", span: "職稱" },
                                    2: { td_catalog: "threeDot" },
                                },
                                {
                                    0: {
                                        td_catalog: "notify",
                                        img: ScriptStyle1.getRout("assets/images/users/avatar-4.jpg"),
                                        h5: "林書瑋",
                                        small: "2019-04-09",
                                        span: `產品設計與開發藍圖確認`,
                                    },
                                    1: { td_catalog: "span_h5", h5: "設計組 - 主管", span: "職稱" },
                                    2: { td_catalog: "threeDot" },
                                },
                                {
                                    0: {
                                        td_catalog: "notify",
                                        img: ScriptStyle1.getRout("assets/images/users/avatar-5.jpg"),
                                        h5: "鐘博彬",
                                        small: "2020-11-02",
                                        span: `負責資料庫設計與資訊安全驗證`,
                                    },
                                    1: { td_catalog: "span_h5", h5: "技術組 - 資料工程師", span: "職稱" },
                                    2: { td_catalog: "threeDot" },
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