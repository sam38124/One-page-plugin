import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let price = {
                        title: widget.data.title ?? "客製專案價格",
                        desc: widget.data.desc ?? "社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站",
                        dataList: widget.data.dataList ?? {
                            list: [
                                {
                                    title: "A方案",
                                    desc: "基本方案，最基本的開發環境",
                                    detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
                                    price: { num: 249, unit: "月" },
                                    btn: { name: "選擇方案", link: {} },
                                    expand: {}
                                },
                                {
                                    title: "B方案",
                                    desc: "黃金方案，提供多個開發需求與 WEB 視覺設計",
                                    highlight: true,
                                    detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C" }],
                                    price: { num: 399, unit: "月" },
                                    btn: { name: "選擇方案", link: {} },
                                    expand: {}
                                },
                                {
                                    title: "C方案",
                                    desc: "白金方案，個性化開法與 APP 雙平台的上架",
                                    detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
                                    price: { num: 799, unit: "月" },
                                    btn: { name: "選擇方案", link: {} },
                                    expand: {}
                                },
                            ]
                        },
                    };
                    if (!widget.data.dataList) {
                        widget.data.dataList = price.dataList;
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                             <!-- ======= Pricing Section ======= -->
                            <section id="price" class="pricing">
                              <div class="container">
                                <div class="section-title">
                                  <span>${price.title}</span>
                                  <h2>${price.title}</h2>
                                  <p>${price.desc}</p>
                                </div>
                    
                                <div class="row">
                                ${glitter.print(function () {
                                var tmp = "";
                                price.dataList.list.map((l) => {
                                    tmp += `
                                      <div class="col-lg-4 col-md-6" data-aos="zoom-in">
                                        <div class="box ${l.highlight ? `featured` : ``}">
                                          <h3>${l.title}</h3>
                                          <h4><sup>$</sup>${l.price.num.toLocaleString()}<span> / ${l.price.unit}</span></h4>
                                          <ul>
                                            ${glitter.print(function () {
                                        var tmp = "";
                                        l.detail.map((t) => {
                                            tmp += `<li ${t.not ? `class="na"` : ``}>${t.text}</li>`;
                                        });
                                        return tmp;
                                    })}
                                          </ul>
                                          <div class="btn-wrap">
                                            <a class="btn-buy"  onclick="${gvc.event(() => {
                                        TriggerEvent.trigger({
                                            gvc, widget, clickEvent: l.btn.link,
                                        });
                                    })}" style="cursor:pointer">${l.btn.name}</a>
                                          </div>
                                        </div>
                                      </div>
                                    `;
                                });
                                return tmp;
                            })}
                                </div>
                              </div>
                            </section>
                            <!-- End Pricing Section -->
                            `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
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
                            originalArray: widget.data.dataList,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.dataList.list.map((dd, index) => {
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
                                        Editor.arrayItem({
                                            originalArray: dd.detail,
                                            gvc: gvc,
                                            title: '功能列表',
                                            array: dd.detail.map((fun, index) => {
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
                                                            callback: (text) => {
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
                                            refreshComponent: () => {
                                                widget.refreshComponent();
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
                                        title: "A方案",
                                        desc: "基本方案，最基本的開發環境",
                                        detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
                                        price: { num: 249, unit: "月" },
                                        btn: { name: "選擇方案", link: {} },
                                        expand: {}
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        })
                    ]);
                }
            };
        },
    };
});
