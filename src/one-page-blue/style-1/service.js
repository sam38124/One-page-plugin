import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { ClickEvent } from "../../glitterBundle/plugins/click-event.js";
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
                        title: "產品服務項目",
                        desc: "我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。",
                        listData: {
                            list: [
                                {
                                    icon: { name: "bi bi-activity", color: "#000000" },
                                    title: "電商應用",
                                    desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                                    link: "#",
                                },
                                {
                                    icon: { name: "bi bi-broadcast", color: "#800080" },
                                    title: "資料視覺化",
                                    desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
                                    link: "#",
                                },
                                {
                                    icon: { name: "bi bi-easel", color: "#00FFFF" },
                                    title: "企業管理",
                                    desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
                                    link: "#",
                                },
                                {
                                    icon: { name: "bi bi-bounding-box-circles", color: "#A52A2A" },
                                    title: "個人網站",
                                    desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
                                    link: "#",
                                },
                                {
                                    icon: { name: "bi bi-calendar4-week", color: "#7FFD4" },
                                    title: "社群平台",
                                    desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
                                    link: "#",
                                },
                                {
                                    icon: { name: "bi bi-chat-square-text", color: "#ADD8E6" },
                                    title: "線上課程網站",
                                    desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
                                    link: "#",
                                },
                            ],
                        },
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                                <!-- ======= Services Section ======= -->
                                <section id="services" class="services section-bg">
                                  <div class="container">
                                    <div class="section-title" data-aos="fade-up">
                                      <h2>${service.title}</h2>
                                      <p>${service.desc}</p>
                                    </div>
                        
                                    <div class="row">
                                    ${glitter.print(function () {
                                var tmp = "";
                                service.listData.list.map((l) => {
                                    tmp += `
                                              <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-3" data-aos="zoom-in">
                                                <div class="icon-box icon-box-pink">
                                                  <div class="icon mb-3"><i class="${l.icon.name}" style="color:${l.icon.color}"></i></div>
                                                  <h4 class="title"><a href="">${l.title}</a></h4>
                                                  <p class="description">${l.desc}</p>
                                                </div>
                                              </div>
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
                    return ``;
                    return Editor.arrayItem({
                        originalArray: widget.data.list,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.list.map((dd, index) => {
                            return {
                                title: dd.title || `區塊:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `索引`,
                                        default: dd.number,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.number = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `標題`,
                                        default: dd.title,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.title = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.styleEditor(dd).editor(gvc, () => {
                                        widget.refreshComponent();
                                    }, '標題設計樣式'),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `描述`,
                                        default: dd.desc,
                                        placeHolder: '輸入描述',
                                        callback: (text) => {
                                            dd.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    ClickEvent.editer(gvc, widget, dd, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
                                    })
                                ]),
                                minus: gvc.event(() => {
                                    widget.data.list.splice(index, 1);
                                    widget.refreshComponent();
                                }),
                            };
                        }),
                        expand: widget.data,
                        plus: {
                            title: '添加區塊',
                            event: gvc.event(() => {
                                widget.data.list.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
                                widget.refreshComponent();
                            }),
                        },
                        refreshComponent: () => {
                            widget.refreshComponent();
                        }
                    });
                }
            };
        },
    };
});
