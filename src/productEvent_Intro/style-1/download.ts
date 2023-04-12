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
                    let base:any= {
                        ios: "#",
                        android: "#",
                        background: ScriptStyle1.getRout("img/tree.png"),
                    }
                    let download:any= {
                        title: "iOS & Android 下載",
                        desc: "下載最新版本的 APP ，雙平台皆可支援",
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <section id="download" class="section download-section" style="background-image: url(${base.background})">
          <div class="container">
            <div class="row text-center">
              <div class="col-md-8 col-md-offset-2">
                <div class="download-text">
                  <h2>${download.title}</h2>
                  <p>${download.desc}</p>
                </div>
              </div>
            </div>
            <div class="download-btns text-center">
              <a class="app-btn" href="${base.android}" >
                <img src="${ScriptStyle1.getRout('img/appstore.png')}" alt />
              </a>
              <a class="app-btn" href="${base.ios}" >
                <img src="${ScriptStyle1.getRout('img/googleplay.png')}" alt />
              </a>
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