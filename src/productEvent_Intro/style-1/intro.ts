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
                    let intro:any = {
                        img: ScriptStyle1.getRout("img/phone1.png"),
                        title: "星澄基地",
                        desc: "提供您企業，社團，電商，教育與自媒體應用的最佳解決方案，免後台串接免程式開發，幾項設定步驟就能為您打造屬於您的專屬應用",
                    }
                    let base:any= {
                        ios: "#",
                        android: "#",
                        background: ScriptStyle1.getRout("img/tree.png"),
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
                            <section id="intro" class="section intro-section">
                              <div class="container">
                                <div class="row intro-cols">
                                  <div class="col-md-6 col-md-push-6">
                                    <div class="phone">
                                      <div class="phone-img">
                                        <img src="${intro.img}" alt />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-6 col-md-pull-6">
                                    <div class="v-align">
                                      <div class="inner">
                                        <div class="intro-text">
                                          <h1>${intro.title ?? ""}</h1>
                                          <p>${intro.desc ?? ""}</p>
                                          <div class="intro-download-btns">
                                            <a class="app-btn" href="${base.android}" >
                                              <img src="${ScriptStyle1.getRout('img/appstore.png')}" alt />
                                            </a>
                                            <a class="app-btn" href="${base.ios}" ">
                                              <img src="${ScriptStyle1.getRout('img/googleplay.png')}" alt />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
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
                    return ``

                }
            }
        },
    }
})