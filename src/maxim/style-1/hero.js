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
                    widget.data.btn = widget.data.btn ?? { name: "了解更多", link: "#" };
                    let keyVision = {
                        title: widget.data.title ?? "關於<span>萊恩設計</span>，我們能為您做什麼？",
                        desc: widget.data.desc ?? "優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                        img: widget.data.img ?? ScriptStyle1.getRout("assets/img/hero-bg.jpg"),
                        btn: widget.data.btn ?? { name: "瞭解更多", link: "#" },
                    };
                    let id = glitter.getUUID();
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
        <!-- ======= Hero Section ======= -->
        <section
          id="hero"
          class="d-flex flex-column justify-content-center align-items-center"
          style="background: url(${keyVision.img}) center center"
        >
          <div class="container text-center text-md-left" data-aos="fade-up">
            <h1>${keyVision.title}</h1>
            <h2>${keyVision.desc}</h2>
            <a class="btn-get-started scrollto" href="${keyVision.btn.link}" style="cursor:pointer">
              ${keyVision.btn.name}</a
            >
          </div>
        </section>
        <!-- End Hero -->
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
                            title: '大標題',
                            default: widget.data.title,
                            placeHolder: '請輸入大標題',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '敘述',
                            default: widget.data.desc,
                            placeHolder: '請輸入副標題和敘述',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '右方圖片',
                            def: widget.data.img,
                            callback: (data) => {
                                widget.data.img = data;
                                widget.refreshComponent();
                            }
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '按鍵名稱',
                            default: widget.data.btn.name,
                            placeHolder: '請輸入按鍵要顯示的名稱',
                            callback: (text) => {
                                widget.data.btn.name = text;
                                widget.refreshComponent();
                            },
                        }),
                        TriggerEvent.editer(gvc, widget, widget.data.btn.link, {
                            hover: true,
                            option: [],
                            title: "點擊事件"
                        })
                    ]);
                }
            };
        },
    };
});
