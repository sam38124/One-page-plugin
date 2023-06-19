import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";

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
                    widget.data.title = widget.data.title??"想要得到 <em>萊恩設計</em> 的相關資訊嗎？";
                    widget.data.desc = widget.data.desc??"提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站，我們擅長達成客戶的需求，替客戶早一步想到問題點";
                    widget.data.img = widget.data.img??ScriptStyle1.getRout("assets/img/cta.jpg");
                    widget.data.btn = widget.data.btn??{ name: "聯絡我們", link: "#contact" };



                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let action:{
                                title: string,
                                desc: string,
                                img: string,
                                btn: { name: string, link: string },
                            } = {
                                title: "想要得到 <em>萊恩設計</em> 的相關資訊嗎？",
                                desc: "提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站，我們擅長達成客戶的需求，替客戶早一步想到問題點",
                                img: ScriptStyle1.getRout("assets/img/cta.jpg"),
                                btn: { name: "聯絡我們", link: "#contact" },
                            }
                            return /*html*/ `
        <!-- ======= Call To Action Section ======= -->
        <section id="cta" class="cta">
          <div class="container" data-aos="zoom-out">
            <div class="row g-5">
              <div class="col-lg-8 col-md-6 content d-flex flex-column justify-content-center order-last order-md-first">
                <h3>${action.title}</h3>
                <p>${action.desc}</p>
                <a class="cta-btn align-self-start" href="${action.btn.link}" style="cursor:pointer">
                ${action.btn.name}</a>
              </div>

              <div class="col-lg-4 col-md-6 order-first order-md-last d-flex align-items-center">
                <div class="img">
                  <img src="${action.img}" alt="" class="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End Call To Action Section -->
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
                            placeHolder: '輸入文字',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `描述`,
                            default: widget.data.desc,
                            placeHolder: '輸入描述',
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
                            title: `按鍵文字`,
                            default: widget.data.btn.name,
                            placeHolder: '輸入文字',
                            callback: (text) => {
                                widget.data.btn.name = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `超連結`,
                            default: widget.data.btn.link,
                            placeHolder: '輸入超連結',
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