import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let faq = {
                        title: "常見問題",
                        desc: "以下常見問題，萊恩設計為你回答",
                        list: [
                            {
                                q: "星澄基地是什麼？",
                                a: "星澄基地是萊恩設計所開發的套版應用平台，集結了我們所有的開發案例，讓您能用最低的成本打造您的應用",
                            },
                            { q: "是否支援APP上架服務？", a: "當然，購買白金方案後，會有專人聯繫您APP上架相關事宜。" },
                            {
                                q: "是否支援電商與金流功能？",
                                a: "可以，我們採用綠界科技作為金流平台，由後台簡易帶入HASHKEY與特店編號，即可串接金流服務。",
                            },
                            { q: "我能從網站或 APP 中販售商品嗎？", a: "可以，您可以在電商平台上販售您設計的商品。" },
                        ],
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
        <section id="faq" class="section faq-section">
          <div class="container">
            <div class="top-section-header">
              <h2>${faq.title}</h2>
              <p>${faq.desc}</p>
            </div>
            ${glitter.print(function () {
                                var tmp = "";
                                faq.list.map((l, n) => {
                                    n % 2 == 0 ? (tmp += `<div class="row">`) : ``;
                                    tmp += `
                  <div class="col-md-6">
                    <div class="faq">
                      <h4>${l.q}</h4>
                      <p>${l.a}</p>
                    </div>
                  </div>
                `;
                                    n % 2 == 1 ? (tmp += `</div>`) : ``;
                                });
                                return tmp;
                            })}
          </div>
        </section>
      `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return ``;
                }
            };
        },
    };
});
