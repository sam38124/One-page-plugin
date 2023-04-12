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
                    let client:any= {
                        title: "客戶回饋",
                        desc: "給客戶滿意的網站設計，是我們致力奉獻的服務，可以看看我們的客戶與業主給我們什麼樣的回應",
                        logo: [ScriptStyle1.getRout("img/logo1.png"), ScriptStyle1.getRout("img/logo1.png"), ScriptStyle1.getRout("img/logo1.png"), ScriptStyle1.getRout("img/logo1.png"), ScriptStyle1.getRout("img/logo1.png"), ScriptStyle1.getRout("img/logo1.png")],
                        test: [
                            {
                                name: "陳志賢",
                                pro: "平面設計師",
                                text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
                            },
                            { name: "陳佳玲", pro: "寵物店 店長", text: "萊恩設計公司的服務與溝通方式很友善" },
                            { name: "韓俊榮", pro: "XX拉麵 廚師兼店長", text: "合作得很愉快，很喜歡萊恩設計" },
                            {
                                name: "黃國玟",
                                pro: "OO診所 護理師",
                                text: "達成客戶的需求，替客戶早一步想到問題點很棒",
                            },
                        ],
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <section id="clients" class="section clients-section bg-lightgray">
          <div class="container">
            <div class="top-section-header">
              <h2>${client.title}</h2>
              <p>${client.desc}</p>
            </div>
            <div class="row">
              <div class="col-md-6">
                <ul class="clients">
                  ${glitter.print(function () {
                        var tmp = "";
                        client.logo.map((c:string) => (tmp += /*html*/ `<li><img src="${c}" alt /></li>`));
                        return tmp;
                  })}
                </ul>
              </div>
              <div class="col-md-6">
                <div class="testimonials-slider">
                  ${glitter.print(function () {
                        var tmp = "";
                        client.test.map((s:any) => {
                            tmp += /*html*/ `
                        <div class="testimonial">
                          <div class="icon">
                            <i class="ion-quote"></i>
                          </div>
                          <div class="content">
                            <p>${s.text}</p>
                          </div>
                          <div class="author">
                            <h4>${s.name}</h4>
                            <span>${s.pro}</span>
                          </div>
                        </div>
                      `;
                        });
                      return tmp;
                  })}
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