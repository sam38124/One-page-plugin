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
                    let features_2:any = {
                        img: { front: ScriptStyle1.getRout("img/phone-white.png"), back: ScriptStyle1.getRout("img/phone-black.png")},
                        title: "簡單、簡潔",
                        desc: "每一個細小的區域性和裝飾，深思熟慮，在畫面上更要求精工細作。",
                        btn: { name: "了解更多", link: "https://squarestudio.tw" },
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <section id="features-2" class="section features-2-section bg-lightgray">
          <div class="container">
            <div class="row">
              <div class="col-md-6 col-md-push-6">
                <div class="phones">
                  <img class="front" src="${features_2.img.front}" alt />
                  <img class="back" src="${features_2.img.back}" alt />
                </div>
              </div>
              <div class="col-md-6 col-md-pull-6">
                <div class="screen-info-text">
                  <h2>${features_2.title}</h2>
                  <p>${features_2.desc}</p>
                  <a class="btn-minimal" onclick="" href="${features_2.btn.link}"> ${features_2.btn.name} </a>
                </div>
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