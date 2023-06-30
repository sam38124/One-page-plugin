import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";

import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget);
                    let id = glitter.getUUID();
                    let price = {
                        title: widget.data.title??"響應單頁式網頁 · 關鍵字搜尋<br />萊恩設計專業客製",
                        desc: widget.data.desc??"社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站",
                        dataList:widget.data.dataList??{
                            list: [
                                {
                                    title: "A方案",
                                    desc: "基本方案，最基本的開發環境",
                                    icon: "fa fa-share-alt",
                                    highlight: "false",
                                    detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
                                    price: { num: 249, unit: "月" },
                                    btn: { name: "選擇方案", link: {} },
                                    expand:{}
                                },
                                {
                                    title: "B方案",
                                    desc: "黃金方案，提供多個開發需求與 WEB 視覺設計",
                                    icon: "fa fa-share-alt",
                                    highlight: "true",
                                    detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C" }],
                                    price: { num: 399, unit: "月" },
                                    btn: { name: "選擇方案", link: {} },
                                    expand:{}
                                },
                                {
                                    title: "C方案",
                                    desc: "白金方案，個性化開法與 APP 雙平台的上架",
                                    icon: "fa fa-cog",
                                    highlight: "false",
                                    detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
                                    price: { num: 799, unit: "月" },
                                    btn: { name: "選擇方案", link: {} },
                                    expand:{}
                                },
                            ]
                        },

                    }
                    if (!widget.data.dataList){
                        widget.data.dataList=price.dataList;
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
            <!-- ======= Pricing Section ======= -->
    <section id="price" class="pricing">
      <div class="container" data-aos="fade-up">

        <div class="section-header">
          <h2>${price.title}</h2>
          <p>${price.desc}</p>
        </div>

        <div class="row gy-4">

          ${glitter.print(function () {
                                var tmp = "";
                                price.dataList.list.map((l:any, i:number) => {
                                    tmp += /*html*/ `
                <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="${200 * (i + 1)}">
                  <div class="pricing-item ${l.highlight=="true" ? `featured` : ``}">
                    <div class="pricing-header">
                      <h3>${l.title}</h3>
                      <h4><sup>$</sup>${l.price.num.toLocaleString()}<span> / ${l.price.unit}</span></h4>
                    </div>

                    <ul>
                      ${glitter.print(function () {
                                        var tmp = "";
                                        l.detail.map((t:any) => {
                                            var li = t.not ? `<li class="na"><i class="bi bi-x me-2">` : `<li><i class="bi bi-check">`;
                                            tmp += /*html*/ ` ${li}</i> <span>${t.text}</span></li> `;
                                        });
                                        return tmp;
                                    })}
                    </ul>

                    <div class="text-center mt-auto">
                      <a class="buy-btn" href="${l.btn.link}" style="cursor:pointer">${l.btn.name}</a>
                    </div>
                  </div>
                </div>
                <!-- End Pricing Item -->
              `;
                                });
                                return tmp;
                            })}

        </div>

      </div>
    </section><!-- End Pricing Section -->
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `標題`,
                            default: widget.data.title,
                            placeHolder: '輸入標題名稱',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題名稱',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.dataList,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.dataList.list.map((dd: any, index: number) => {
                                return {
                                    title: `方案${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.title,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `副標題`,
                                            default: dd.desc,
                                            placeHolder: '輸入副標題名稱',
                                            callback: (text) => {
                                                dd.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: dd.icon,
                                            callback: (text: string) => {
                                                dd.icon = text;
                                            },
                                        }),
                                        Editor.select({
                                            title: `highlight`,
                                            gvc: gvc,
                                            def: dd.highlight,
                                            array: [
                                                {
                                                    title: '是',
                                                    value: "true",
                                                },
                                                {
                                                    title: '否',
                                                    value: "false",
                                                },
                                            ],
                                            callback: (text) => {
                                                dd.highlight = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `價格`,
                                            default: dd.price.num,
                                            placeHolder: '請輸入價格',
                                            callback: (text) => {
                                                dd.price.num = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `收費方案單位`,
                                            default: dd.price.unit,
                                            placeHolder: '請輸入時間單位(年/月/日)',
                                            callback: (text) => {
                                                dd.price.unit = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `按鍵名稱`,
                                            default: dd.btn.name,
                                            placeHolder: '請輸入按鍵呈現的名稱',
                                            callback: (text) => {
                                                dd.btn.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        TriggerEvent.editer(gvc, widget, dd.btn.link, {
                                            hover: true,
                                            option: [],
                                            title: "點擊事件"
                                        }),
                                    //    todo A方案B方案C方案的篩選
                                        Editor.arrayItem({
                                            originalArray:dd.detail,
                                            gvc: gvc,
                                            title: '功能列表',
                                            array: dd.detail.map((fun: any, index: number) => {
                                                return {
                                                    title: `功能:${index + 1}`,
                                                    expand: fun,
                                                    innerHtml: gvc.map([
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `方案`,
                                                            default: fun.text,
                                                            placeHolder: '輸入方案名稱',
                                                            callback: (text) => {
                                                                fun.text = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                        Editor.select({
                                                            title: '畫線',
                                                            gvc: gvc,
                                                            def: fun.not ? `true` : `false`,
                                                            callback: (text: string) => {
                                                                fun.not = text === 'true';
                                                                widget.refreshComponent();
                                                            },
                                                            array: ['true', 'false'],
                                                        }),
                                                    ]),
                                                    minus: gvc.event(() => {

                                                        dd.detail.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: dd.expand,
                                            plus: {
                                                title: '添加功能',
                                                event: gvc.event(() => {
                                                    dd.detail.push({ text: "功能 B", not: true });
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent:()=>{
                                                widget.refreshComponent()
                                            }
                                        })

                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.dataList.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({
                                        title: "C方案",
                                        desc: "白金方案，個性化開法與 APP 雙平台的上架",
                                        icon: "fa fa-cog",
                                        highlight: "false",
                                        detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
                                        price: { num: 799, unit: "月" },
                                        btn: { name: "選擇方案", link: {} },
                                        expand:{}});
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