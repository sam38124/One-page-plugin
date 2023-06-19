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
                    let features_4:any = {
                        img: ScriptStyle1.getRout("img/phone3.png"),
                        left: [
                            {
                                icon: "ion-ios-heart-outline",
                                title: "電商應用",
                                desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成",
                            },
                            { icon: "ion-ios-loop", title: "資料視覺化", desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現" },
                        ],
                        right: [
                            {
                                icon: "ion-ios-pie-outline",
                                title: "企業管理",
                                desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
                            },
                            { icon: "ion-ios-cart-outline", title: "個人網站", desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地" },
                        ],
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <section id="features-4" class="section features-4-section">
          <div class="container">
            <div class="row">
              <div class="col-md-4 features-col text-right">
                ${glitter.print(function () {
                    let tmp = "";
                    features_4.left.map((l:any) => {
                        tmp += /*html*/ `
                      <div class="col-feature">
                        <div class="icon">
                          <i class="${l.icon}"></i>
                        </div>
                        <div class="content">
                          <h4>${l.title}</h4>
                          <p>${l.desc}</p>
                        </div>
                      </div>
                    `;
                    });
                    return tmp;
                })}
              </div>
              <div class="col-md-4">
                <div class="features-phone">
                  <img src="${features_4.img}" alt />
                </div>
              </div>
              <div class="col-md-4 features-col">
                ${glitter.print(function () {
                    var tmp = "";
                    features_4.right.map((l:any) => {
                        tmp += /*html*/ `
                      <div class="col-feature">
                        <div class="icon">
                          <i class="${l.icon}"></i>
                        </div>
                        <div class="content">
                          <h4>${l.title}</h4>
                          <p>${l.desc}</p>
                        </div>
                      </div>
                    `;
                                });
                                return tmp;
                            })}
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