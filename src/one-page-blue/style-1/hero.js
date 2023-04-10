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
                    let keyVision = {
                        title: widget.data.title ?? "關於萊恩設計<br/>我們能為您做什麼？",
                        desc: widget.data.desc ?? "優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                        img: widget.data.img ?? ScriptStyle1.getRout("assets/img/hero-img.png"),
                        btn: widget.data.btn ?? { name: "了解更多", link: "#" },
                    };
                    let id = glitter.getUUID();
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return ` 
                            <section id="hero" style="">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center" data-aos="fade-up">
                                            <div>
                                                <h1>${keyVision.title}</h1>
                                                <h2>${keyVision.desc}</h2>
                                                <a class="btn-get-started scrollto" 
                                                onclick="${gvc.event(() => { keyVision.btn.link; })}" style="cursor:pointer">${keyVision.btn.name}</a>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left">
                                            <img src="${keyVision.img}" class="img-fluid" alt="">
                                        </div>
                                    </div>
                                </div>
                            </section><!-- End Hero -->`;
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
