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
                    let subs = { title: "訂閱我們的電子報", desc: "", btn: { name: "", link: ["#"] } };
                    let base = {
                        ios: "#",
                        android: "#",
                        background: ScriptStyle1.getRout("img/tree.png"),
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
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
