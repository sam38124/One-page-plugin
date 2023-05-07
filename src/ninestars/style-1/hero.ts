import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    widget.data.btn = widget.data.btn??{ name: "了解更多", link: "#"};
                        let keyVision= {
                        title: widget.data.title??"關於萊恩設計<br />我們能為您做什麼？",
                        desc: widget.data.desc??"優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                        img: widget.data.img??ScriptStyle1.getRout("assets/img/hero-img.svg"),
                        btn: widget.data.btn??{ name: "點我了解", link: "#"  },
                    }
                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ ` <!-- ======= Hero Section ======= -->
        <section id="hero" class="d-flex align-items-center mb-0">
          <div class="container mt-5">
            <div class="row gy-4">
              <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1>${keyVision.title}</h1>
                <h2>${keyVision.desc}</h2>
                <div>
                  <a
                    class="btn-get-started scrollto"
                    href="${keyVision.btn.link}"
                    style="cursor:pointer"
                  >
                    ${keyVision.btn.name}</a
                  >
                </div>
              </div>
              <div class="col-lg-6 order-1 order-lg-2 hero-img">
                <img src="${keyVision.img}" class="img-fluid animated" alt="" />
              </div>
            </div>
          </div>
        </section>
        <!-- End Hero -->`;
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
                            def:widget.data.img,
                            callback:(data)=>{
                                widget.data.img=data
                                widget.refreshComponent()
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
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '超連結',
                            default: widget.data.btn.link,
                            placeHolder: '請輸入超連結網址',
                            callback: (text) => {
                                widget.data.btn.link = text;
                                widget.refreshComponent();
                            },
                        }),
                    ])

                }
            }
        },
    }
})