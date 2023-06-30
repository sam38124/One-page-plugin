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
                    let contact:any= {
                        title: "聯絡我們",
                        desc: "若想要了解我們的服務，填妥以下表單，萊恩設計將儘速回應您",
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <section id="contact" class="section contact-section">
          <div class="container">
            <div class="top-section-header">
              <h2>${contact.title}</h2>
              <p>${contact.desc}</p>
            </div>
            <form class="contact-form" id="contact-form" data-toggle="validator" method="post">
              <div id="contact-form-result"></div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="請輸入您的全名" name="name" required />
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-control" placeholder="請輸入您的電子郵件" name="email" required />
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="form-group">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="請輸入您的電話"
                      name="phone"
                      required
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <textarea class="form-control" placeholder="請寫下您想說的話" name="message" required></textarea>
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="form-group text-center">
                    <button class="btn-minimal btn-block" type="submit">送出</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      `;
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return``
                }
            }
        },
    }
})