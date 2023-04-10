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
                    let client = {
                        title: "合作夥伴",
                        desc: "萊恩設計公司的服務與顧客的合作",
                        dataList: {
                            list: [
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-1.png")
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-2.png")
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-3.png")
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-4.png")
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-5.png")
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-6.png")
                                },
                            ]
                        },
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <!-- ======= Clients Section ======= -->
                            <section id="clients" class="clients">
                                <div class="container" data-aos="zoom-out">
                                  <div class="section-title" data-aos="fade-up">
                                      <h2>${client.title}</h2>
                                      <p>${client.desc}</p>
                                 </div>
                                <div class="row no-gutters clients-wrap clearfix wow fadeInUp">
                                    ${glitter.print(function () {
                                var tmp = "";
                                client.dataList.list.map((c) => {
                                    tmp += `
                                      <div class="col-lg-3 col-md-4 col-xs-6">
                                        <div class="client-logo" data-aos="zoom-in">
                                          <img src="${c.img}" class="img-fluid" alt="">
                                        </div>
                                      </div>`;
                                });
                                return tmp;
                            })}
                                </div>
                              </div>
                            </section>
                            <!-- End Clients Section -->
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
