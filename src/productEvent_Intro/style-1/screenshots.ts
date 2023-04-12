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
                    let screenshots:any = {
                        title: "實際操作畫面",
                        desc: "系統實際操作複製，給您實際操作的感覺",
                        img: [ScriptStyle1.getRout("img/screens/1.jpg"), ScriptStyle1.getRout("img/screens/2.jpg"), ScriptStyle1.getRout("img/screens/3.jpg"), ScriptStyle1.getRout("img/screens/4.jpg"), ScriptStyle1.getRout("img/screens/5.jpg")],
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ ` <section id="screenshots" class="section screenshots-section bg-lightgray">
        <div class="container">
          <div class="top-section-header">
            <h2>${screenshots.title}</h2>
            <p>${screenshots.desc}</p>
          </div>
          <ul class="screenshots-slider">
            ${glitter.print(function () {
                var tmp = "";
                screenshots.img.map((g:any) => {
                    tmp += /*html*/ `
                      <li>
                        <div class="inner">
                          <img src="${g}" alt />
                          <div class="overlay">
                            <a href="${g}" class="view-btn">
                              <i class="ion-ios-plus-empty"></i>
                            </a>
                          </div>
                        </div>
                      </li>
                    `;
                });
                return tmp;
            })}
          </ul>
        </div>
      </section>`;
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