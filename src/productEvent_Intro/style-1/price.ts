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
                    let price:any = {
                        title: "資費方案",
                        desc: "方便自己尋找合適的資費，功能有社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站",
                        list: [
                            {
                                title: "A方案",
                                detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
                                price: { num: 2499, unit: "月" },
                                btn: { name: "選擇方案", link: ["#"] },
                            },
                            {
                                title: "B方案",
                                detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C", not: true }],
                                price: { num: 3299, unit: "月" },
                                btn: { name: "選擇方案", link: ["#"] },
                            },
                        ],
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <section id="pricing" class="section pricing-section">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="col-section-header">
                  <h2>${price.title}</h2>
                  <p>${price.desc}</p>
                </div>
              </div>
              ${glitter.print(function () {
                                var tmp = "";
                                price.list.map((l:any) => {
                                    tmp += /*html*/ `
                    <div class="col-md-4">
                      <div class="p-table">
                        <div class="header">
                          <h4>${l.title}</h4>
                          <div class="price">
                            <span class="currency">$</span>
                            <span class="amount" style="font-size:54px">${l.price.num.toLocaleString()}</span>
                            <span class="period">/${l.price.unit}</span>
                          </div>
                        </div>
                        <ul class="items">
                          ${glitter.print(function () {
                            var tmp = "";
                            l.detail.map((t:any) => {
                                tmp += /*html*/ `<li>
                                ${
                                    (t.not
                                        ? `<i class="ion-ios-close h4" style="color:red"></i>`
                                        : `<i class="ion-ios-checkmark h4" style="color:green"></i>`) +
                                    " " +
                                    t.text
                                }
                              </li>`;
                                });
                                return tmp;
                            })}
                        </ul>
                        <a class="btn-minimal" href="${l.btn.link}" > ${l.btn.name} </a>
                      </div>
                    </div>
                  `;
                                });
                                return tmp;
                            })}
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