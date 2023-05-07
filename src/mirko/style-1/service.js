import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let services = {
                        title: widget.data.title ?? "星澄基地",
                        desc: widget.data.desc ?? "提供您建構網站的最佳解，打造屬於您的專屬應用",
                        listData: widget.data.listData ?? {
                            list: [
                                {
                                    icon: "fas fa-store",
                                    title: "電商應用",
                                    desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                                    link: "article",
                                },
                                {
                                    icon: "fas fa-chart-bar",
                                    title: "資料視覺化",
                                    desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
                                    link: "article"
                                },
                                {
                                    icon: "fas fa-building",
                                    title: "企業管理",
                                    desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
                                    link: "article"
                                },
                                {
                                    icon: "fas fa-home",
                                    title: "個人網站",
                                    desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
                                    link: "article",
                                },
                                {
                                    icon: "fas fa-globe-americas",
                                    title: "社群平台",
                                    desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
                                    link: "article"
                                },
                                {
                                    icon: "fas fa-code",
                                    title: "線上課程網站",
                                    desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
                                    link: "article"
                                },
                            ]
                        },
                    };
                    widget.data = services;
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
        <section class="services d-flex align-items-center py-5" id="services">
          <div class="container text-light">
            <div class="text-center pb-4">
              <p class="mb-3">我們的服務</p>
              <h2 class="py-2">${services.title}</h2>
              <p class="para-light">${services.desc}</p>
            </div>
            <div class="row gy-4 py-2" data-aos="zoom-in">
              ${glitter.print(function () {
                                var tmp = "";
                                services.listData.list.map((s) => {
                                    tmp += `
                    <div class="col-lg-4" href="${s.link}">
                      <div class="card bg-transparent">
                        <i class="${s.icon} fa-2x"></i>
                        <h4 class="py-2">${s.title}</h4>
                        <p class="para-light">${s.desc}</p>
                      </div>
                    </div>
                  `;
                                });
                                return tmp;
                            })}
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
      `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `標題`,
                            default: widget.data.title,
                            placeHolder: '輸入標題名稱',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題的敘述',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.listData,
                            gvc: gvc,
                            title: '服務',
                            array: widget.data.listData.list.map((linkData, index) => {
                                return {
                                    title: linkData.title ?? `項目:${index + 1}`,
                                    expand: linkData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '服務標題',
                                            default: linkData.title,
                                            placeHolder: '請輸入服務的標題',
                                            callback: (text) => {
                                                linkData.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: '服務敘述',
                                            default: linkData.desc,
                                            placeHolder: '請描述此服務的內容',
                                            callback: (text) => {
                                                linkData.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: linkData.icon,
                                            callback: (text) => {
                                                linkData.icon = text;
                                            },
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.listData.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.listData,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.listData.list.push({ icon: "fas fa-code",
                                        title: "線上課程網站",
                                        desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
                                        link: "article" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                    ]);
                }
            };
        },
    };
});
