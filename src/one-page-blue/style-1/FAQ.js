import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { ClickEvent } from "../../glitterBundle/plugins/click-event.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let faq = {
                        title: "沒有那麼多的預算？常見問題為您解答",
                        dataList: {
                            list: [
                                {
                                    q: "星澄基地是什麼？",
                                    a: "星澄基地是萊恩設計所開發的套版應用平台，集結了我們所有的開發案例，讓您能用最低的成本打造您的應用",
                                },
                                { q: "是否支援APP上架服務？", a: "當然，購買白金方案後，會有專人聯繫您APP上架相關事宜。" },
                                {
                                    q: "是否支援電商與金流功能？",
                                    a: "可以，我們採用綠界科技作為金流平台，由後台簡易帶入HASHKEY與特店編號，即可串接金流服務。",
                                },
                                { q: "我能從網站或 APP 中販售商品嗎？", a: "可以，您可以在電商平台上販售您設計的商品。" },
                            ]
                        },
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <!-- ======= F.A.Q Section ======= -->
                            <section id="faq" class="faq">
                              <div class="container">
                                <div class="section-title" data-aos="fade-up">
                                  <h2>${faq.title}</h2>
                                </div>
                    
                                <ul class="faq-list">
                                ${glitter.print(function () {
                                var tmp = "";
                                faq.dataList.list.map((l, i) => {
                                    tmp += `
                                      <li>
                                        <div data-bs-toggle="collapse" class="collapsed question" href="#faq${i}">
                                          ${l.q} <i class="bi bi-chevron-down icon-show"></i><i class="bi bi-chevron-up icon-close"></i>
                                        </div>
                                        <div id="faq${i}" class="collapse" data-bs-parent=".faq-list">
                                          <p>${l.a}</p>
                                        </div>
                                      </li>
                                    `;
                                });
                                return tmp;
                            })}
                                </ul>
                              </div>
                            </section>
                            <!-- End Frequently Asked Questions Section -->
                           `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
                    return ``;
                    return Editor.arrayItem({
                        originalArray: widget.data.list,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.list.map((dd, index) => {
                            return {
                                title: dd.title || `區塊:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `索引`,
                                        default: dd.number,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.number = text;
                                            widget.refreshComponent();
                                        },
                                    }),
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
                                    glitter.htmlGenerate.styleEditor(dd).editor(gvc, () => {
                                        widget.refreshComponent();
                                    }, '標題設計樣式'),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `描述`,
                                        default: dd.desc,
                                        placeHolder: '輸入描述',
                                        callback: (text) => {
                                            dd.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    ClickEvent.editer(gvc, widget, dd, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
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
                            title: '添加區塊',
                            event: gvc.event(() => {
                                widget.data.list.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
                                widget.refreshComponent();
                            }),
                        },
                        refreshComponent: () => {
                            widget.refreshComponent();
                        }
                    });
                }
            };
        },
    };
});
