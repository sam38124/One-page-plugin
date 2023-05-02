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

                    widget.data.title = widget.data.title??"軟硬體業務範圍";
                    widget.data.desc = widget.data.desc??"優質服務範圍包括網路連線諮詢與整合、受管理網路服務和軟體定義的網路";
                    widget.data.list = widget.data.list??[
                        {
                            name: "伺服器維護",
                            color: "green",
                            detail: [
                                { icon: "fa fa-server", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零組件更換" },
                                {
                                    icon: "fa fa-shield-alt",
                                    title: "資訊安全",
                                    desc: "網路、網際網路、端點、API、雲端、應用程式以及容器等各項與網路有關的安全機制",
                                },
                                { icon: "fa fa-cog", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造您專屬的設定頁面" },
                                { icon: "fa fa-headset", title: "即時線上服務", desc: "提供即時與處理緊急狀況的撥打專線，隨時替您解除危機" },
                            ],
                        },
                        {
                            name: "系統APP軟體設計",
                            color: "red",
                            detail: [
                                {
                                    icon: "fas fa-store",
                                    title: "電商應用",
                                    desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                                },
                                {
                                    icon: "fas fa-chart-bar",
                                    title: "資料視覺化",
                                    desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
                                },
                                {
                                    icon: "fas fa-building",
                                    title: "企業管理",
                                    desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
                                },
                                {
                                    icon: "fas fa-home",
                                    title: "個人網站",
                                    desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
                                },
                            ],
                        },
                    ];

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let comp = {
                                title: widget.data.title,
                                desc: widget.data.desc,
                                list: widget.data.list,
                            }
                            return /*html*/ `
        <!-- Comparison Start -->
        <div class="container-xxl py-5">
          <div class="container px-lg-5">
            <div
              class="section-title position-relative text-center mx-auto mb-5 pb-4 wow fadeInUp"
              data-wow-delay="0.1s"
              style="max-width: 600px;"
            >
              <h1 class="mb-3">${comp.title}</h1>
              <p class="mb-1">${comp.desc}</p>
            </div>
            <div class="row g-5 comparison position-relative">
              ${glitter.print(function () {
                                var tmp = "";
                                comp.list.map((l:any) => {
                                    tmp += /*html*/ `
                    <div class="col-lg-6 pe-lg-5">
                      <div class="section-title position-relative mx-auto mb-4 pb-4">
                        <h3 class="fw-bold mb-0">${l.name}</h3>
                      </div>
                      <div class="row gy-3 gx-5">
                        ${glitter.print(function () {
                                        var tmp = "";
                                        l.detail.map((t:any, j:number) => {
                                            tmp += /*html*/ `
                              <div class="col-sm-6 wow fadeIn" data-wow-delay="${0.1 + 0.2 * j}s">
                                <i class="${t.icon} fa-3x mb-3" style="color:${l.color}"></i>
                                <h5 class="fw-bold">${t.title}</h5>
                                <p>${t.desc}</p>
                              </div>
                            `;
                                        });
                                        return tmp;
                                    })}
                      </div>
                    </div>
                  `;
                                });
                                return tmp;
                            })}
            </div>
          </div>
        </div>
        <!-- Comparison Start -->
      `;
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title ?? '',
                            placeHolder: '請輸入標題文字',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '副標題',
                            default: widget.data.desc ?? '',
                            placeHolder: '請輸入副標題文字',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.list,
                            gvc: gvc,
                            title: '服務內容',
                            array: widget.data.list.map((dd: any, index: number) => {
                                dd.detailExpand = dd.detailExpand ?? {}
                                return {
                                    title: dd.name || `:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `服務概要`,
                                            default: dd.name,
                                            placeHolder: '輸入概要',
                                            callback: (text) => {
                                                dd.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `服務顏色`,
                                            default: dd.color,
                                            type:"color",
                                            placeHolder: '輸入概要',
                                            callback: (text) => {
                                                dd.color = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.arrayItem({
                                            originalArray:dd.detail,
                                            gvc: gvc,
                                            title: '服務詳細',
                                            array: dd.detail.map((detail: any, index: number) => {
                                                return {
                                                    title: detail.title || `功能:${index + 1}`,
                                                    expand: detail,
                                                    innerHtml: gvc.map([
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `功能概要`,
                                                            default: detail.title,
                                                            placeHolder: '輸入概要',
                                                            callback: (text) => {
                                                                detail.title = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `功能詳細`,
                                                            default: detail.desc,
                                                            placeHolder: '輸入詳細內容',
                                                            callback: (text) => {
                                                                detail.desc = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                        Editor.fontawesome({
                                                            title: 'icon',
                                                            gvc: gvc,
                                                            def: detail.icon,
                                                            callback: (text: string) => {
                                                                detail.icon = text;
                                                            },
                                                        })
                                                    ]),
                                                    minus: gvc.event(() => {
                                                        widget.data.list.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: dd.detailExpand,
                                            plus: {
                                                title: '添加功能',
                                                event: gvc.event(() => {
                                                    widget.data.list.push({ icon: "fa fa-server", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零組件更換" });
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent:()=>{
                                                widget.refreshComponent()
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加服務',
                                event: gvc.event(() => {
                                    widget.data.list.push({  name: "伺服器維護",
                                        color: "green",
                                        detail: [
                                            { icon: "fa fa-server", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零組件更換" },
                                            {
                                                icon: "fa fa-shield-alt",
                                                title: "資訊安全",
                                                desc: "網路、網際網路、端點、API、雲端、應用程式以及容器等各項與網路有關的安全機制",
                                            },
                                            { icon: "fa fa-cog", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造您專屬的設定頁面" },
                                            { icon: "fa fa-headset", title: "即時線上服務", desc: "提供即時與處理緊急狀況的撥打專線，隨時替您解除危機" },
                                        ], });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        })
                    ])
                }
            }
        },
    }
})