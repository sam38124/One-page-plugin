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
                    widget.data.video = widget.data.video??"https://www.youtube.com/watch?v=LXb3EKWsInQ";
                    widget.data.title = widget.data.title??"我們的特色 — 星澄基地";
                    widget.data.desc = widget.data.desc??`提供您企業，社團，電商，教育與自媒體應用的最佳解決方案，免後台串接免程式開發，幾項設定步驟就能為您打造屬於您的專屬應用，例如網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地。<ul>
                                <li><i class="bi bi-check-circle"></i> 網路、網際網路、端點、API、雲端、應用程式以及容器等各項與網路有關的安全機制</li>
                                <li><i class="bi bi-check-circle"></i> 設計預算有限也不影響製作品質，打造您專屬的設定頁面</li>
                                <li><i class="bi bi-check-circle"></i> 從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務</li>
                              </ul>`;
                    widget.data.btn = widget.data.btn??{ name: "馬上前往", link: "#" };


                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let focus:{
                                video: string,
                                title: string,
                                desc: string,
                                btn: { name: string, link: string },
                            } = {
                                video: widget.data.video,
                                title: widget.data.title,
                                desc: widget.data.desc,
                                btn: widget.data.btn,
                            }
                            return /*html*/ `
        <!-- ======= On Focus Section ======= -->
        <section id="focus" class="onfocus">
          <div class="container-fluid p-0" data-aos="fade-up">
            <div class="row g-0">
              <div class="col-lg-6 video-play position-relative">
                <a href="${focus.video}" class="glightbox play-btn"></a>
              </div>
              <div class="col-lg-6">
                <div class="content d-flex flex-column justify-content-center h-100">
                  <h3>${focus.title}</h3>
                  <p>${focus.desc}</p>
                  <a class="read-more align-self-start" href="${focus.btn.link}" style="cursor:pointer"
                    ><span>${focus.btn.name}</span><i class="bi bi-arrow-right"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End On Focus Section -->
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
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `影片`,
                            default: widget.data.video,
                            placeHolder: '輸入影片網址',
                            callback: (text) => {
                                widget.data.video = text;
                                widget.refreshComponent();
                            },
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