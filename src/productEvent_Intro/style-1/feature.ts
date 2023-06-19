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
                    let features:any = {
                        img: "img/phone2.png",
                        title: "獨立管理的社群平台",
                        desc: "社團建立、資訊推播，可配合標籤和置頂的方式來排序貼文，提供給組織、社團、公司等一個獨立管理與經營的社群平台.",
                        list: [
                            { icon: "ion-ios-heart-outline", title: "個性化的發布內容", desc: "個性化推薦可以幫助用戶看到最好的結果" },
                            { icon: "ion-ios-loop", title: "提供快速發文", desc: "發文附圖是近年來使用社群的基本公式" },
                            { icon: "ion-ios-pie-outline", title: "活動規劃功能", desc: "使用活動排程規劃工具來追蹤所有重要的活動" },
                        ]
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <section id="features" class="section features-section">
          <div class="container">
            <div class="phone-img">
              <img src="${features.img}" alt />
            </div>
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <div class="features-text">
                  <h2>${features.title}</h2>
                  <p>${features.desc}</p>
                </div>
              </div>
            </div>
            <div class="row features-row">
              ${glitter.print(function () {
                var tmp = "";
                features.list.map((l:any) => {
                    tmp += /*html*/ `
                    <div class="col-md-4 col-sm-6">
                      <div class="feature">
                        <div class="icon">
                          <i class="${l.icon}"></i>
                        </div>
                        <div class="content">
                          <h4>${l.title}</h4>
                          <p>${l.desc}</p>
                        </div>
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
                    return ``
                }
            }
        },
    }
})