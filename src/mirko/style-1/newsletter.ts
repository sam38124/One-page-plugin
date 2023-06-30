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

                    widget.data.sub = widget.data.sub??{ desc: "想收到與萊恩設計有關的最新消息及網站資訊，請立即訂閱我們的電子報，我們會將資訊傳送至你的信箱。" }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let subs=widget.data.sub;
                            console.log("-----------------------------------------")
                            console.log(subs)
                            return /*html*/ `
                            <section class="newsletter text-light py-5">
                              <div class="container">
                                <div class="row">
                                  <div class="col-lg-6 text-center text-lg-start" data-aos="fade-right">
                                    <h4 class="py-1 mb-2">訂閱我們</h4>
                                    <p class="para-light">${subs.desc}</p>
                                  </div>
                                  <div class="col-lg-6 d-flex align-items-center" data-aos="fade-down">
                                    <div class="input-group my-3">
                                      <input
                                        type="text"
                                        class="form-control p-2"
                                        placeholder="請輸入你的電子郵件"
                                        aria-label="Recipient's email"
                                      />
                                      <button class="btn-secondary text-light" type="button">訂閱</button>
                                    </div>
                                  </div>
                                </div>
                                <!-- end of row -->
                              </div>
                              <!-- end of container -->
                            </section>
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
                            title: `訂閱文字`,
                            default: widget.data.sub.desc,
                            placeHolder: '輸入文字',
                            callback: (text) => {
                                widget.data.sub.desc = text;
                                widget.refreshComponent();
                            },
                        })
                    ])
                }
            }
        },
    }
})