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
                    let service = {
                        title: widget.data.title ?? "產品服務項目",
                        desc: widget.data.desc ?? "我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。",
                        listData: widget.data.listData ?? {
                            list: [
                                {
                                    img: ScriptStyle1.getRout("assets/img/services-1.jpg"),
                                    icon: "bi bi-activity",
                                    title: "電商應用",
                                    desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                                    link: "#",
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/services-2.jpg"),
                                    icon: "bi bi-broadcast",
                                    title: "資料視覺化",
                                    desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
                                    link: "#",
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/services-3.jpg"),
                                    icon: "bi bi-easel",
                                    title: "企業管理",
                                    desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
                                    link: "#",
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/services-4.jpg"),
                                    icon: "bi bi-bounding-box-circles",
                                    title: "個人網站",
                                    desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
                                    link: "#",
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/services-5.jpg"),
                                    icon: "bi bi-calendar4-week",
                                    title: "社群平台",
                                    desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
                                    link: "#",
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/services-6.jpg"),
                                    icon: "bi bi-chat-square-text",
                                    title: "線上課程網站",
                                    desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
                                    link: "#",
                                },
                            ]
                        },
                    };
                    widget.data = service;
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
        <!-- ======= Services Section ======= -->
        <section id="service" class="services">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>${service.title}</h2>
              <p>${service.desc}</p>
            </div>

            <div class="row gy-5">
              ${glitter.print(function () {
                                var tmp = "";
                                service.listData.list.map((l, i) => {
                                    tmp += `
                    <div class="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="${200 + 100 * i}">
                      <div class="service-item">
                        <div class="img">
                          <img src="${l.img}" class="img-fluid" alt="" />
                        </div>
                        <div class="details position-relative">
                          <div class="icon">
                            <i class="${l.icon}"></i>
                          </div>
                          <a class="stretched-link" href="${l.link}" style="cursor:pointer">
                            <h3>${l.title}</h3>
                          </a>
                          <p>${l.desc}</p>
                        </div>
                      </div>
                    </div>
                    <!-- End Service Item -->
                  `;
                                });
                                return tmp;
                            })}
            </div>
          </div>
        </section>
        <!-- End Services Section -->
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
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '連結網址',
                                            default: linkData.link,
                                            placeHolder: '請描述連結網址',
                                            callback: (text) => {
                                                linkData.link = text;
                                                widget.refreshComponent();
                                            },
                                        }),
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
                                    widget.data.listData.list.push({ img: ScriptStyle1.getRout("assets/img/services-6.jpg"),
                                        icon: "bi bi-chat-square-text",
                                        title: "線上課程網站",
                                        desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
                                        link: "#", });
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
