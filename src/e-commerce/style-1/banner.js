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
                    let banner = {
                        dataList: [{ img: ScriptStyle1.getRout("assets/images/banner-04.jpg"), title: "女裝", subtitle: "年度盛宴", btn: { name: "了解更多", link: ["#"] } },
                            { img: ScriptStyle1.getRout("assets/images/banner-05.jpg"), title: "男裝", subtitle: "2022 春季新款", btn: { name: "了解更多", link: ["#"] } },
                            { img: ScriptStyle1.getRout("assets/images/banner-06.jpg"), title: "背包", subtitle: "最新款式", btn: { name: "了解更多", link: ["#"] } },]
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <div class="sec-banner bg0">
                              <div class="flex-w flex-c-m">
                                ${glitter.print(function () {
                                var tmp = "";
                                banner.dataList.map((b) => {
                                    tmp += `
                                  <div class="size-202 m-lr-auto respon4">
                                    <div class="block1 wrap-pic-w">
                                      <img src="${b.img}" alt="IMG-BANNER" />
                                      <a
                                        class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                                        onclick=""
                                        style="cursor:pointer"
                                      >
                                        <div class="block1-txt-child1 flex-col-l">
                                          <span class="block1-name ltext-102 trans-04 p-b-8"> ${b.title} </span>
                                          <span class="block1-info stext-102 trans-04"> ${b.subtitle} </span>
                                        </div>
                                        <div class="block1-txt-child2 p-b-4 trans-05">
                                          <div class="block1-link stext-101 cl0 trans-09">${b.btn.name}</div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                `;
                                });
                                return tmp;
                            })}
                              </div>
                            </div>
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
