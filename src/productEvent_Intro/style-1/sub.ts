import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
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
                    let subs:any = { title: "訂閱我們的電子報", desc: "", btn: { name: "", link: ["#"] } }
                    let base:any = {
                        ios: "#",
                        android: "#",
                        background: ScriptStyle1.getRout("img/tree.png"),
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <section id="subscribe" class="section subscribe-section" style="background-image: url(${base.background})">
          <div class="container">
            <div class="section-header">
              <h2>${subs.title}</h2>
            </div>
            <div class="row">
              <div class="col-md-6 col-md-offset-3">
                <div class="subscribe-form">
                  <input type="text" class="subscribe-input" placeholder="請輸入你的電子郵件" name="subscribe-input" />
                  <a class="subscribe-btn">訂閱電子報</a>
                </div>
                <p class="hate-spam">${subs.desc}</p>
              </div>
            </div>
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