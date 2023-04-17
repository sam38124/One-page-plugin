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
                    let team = {
                        title: widget.data.title ?? "我們的團隊",
                        desc: widget.data.desc ?? "我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽",
                        dataList: widget.data.dataList ?? {
                            list: [
                                {
                                    img: ScriptStyle1.getRout("assets/img/team/team-1.jpg"),
                                    name: "陳志賢",
                                    pro: "執行長",
                                    desc: "企業中負責日常營運的最高行政人員。其專業與領導能力，讓公司的股東可以信任該公司的決策與產品",
                                    link: ["https://www.facebook.com/", "https://www.instagram.com/"],
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/team/team-3.jpg"),
                                    name: "黃國玟",
                                    pro: "UI／UX設計師",
                                    desc: "在使用者體驗和互動的指導下對電腦、電器、機器、移動通訊裝置、軟體或應用以及網站進行的設計",
                                    link: ["https://www.instagram.com/", "https://squarestudio.tw"],
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/team/team-2.jpg"),
                                    name: "陳佳玲",
                                    pro: "系統規劃師",
                                    desc: "評估並分析現行運作系統，確定其需求，據此發展系統架構以改良使用環境及產作業效率",
                                    link: ["https://squarestudio.tw", "#"],
                                },
                            ]
                        },
                    };
                    if (!widget.data.dataList) {
                        widget.data.dataList = team.dataList;
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <!-- ======= Team Section ======= -->
                            <section id="team" class="team">
                              <div class="container">
                                <div class="section-title">
                                  <span>${team.title}</span>
                                  <h2>${team.title}</h2>
                                  <p>${team.desc}</p>
                                </div>
                    
                                <div class="row">
                                ${glitter.print(function () {
                                let tmp = "";
                                team.dataList.list.map((t) => {
                                    tmp += `
                                      <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in">
                                        <div class="member">
                                          <img src="${t.img}" alt="" />
                                          <h4>${t.name}</h4>
                                          <span>${t.pro}</span>
                                          <p>${t.desc}</p>
                                          <div class="social">
                                          ${glitter.print(function () {
                                        let tmp = "";
                                        t.link.map((l) => {
                                            tmp += ` <a href="${l}"  style="cursor:pointer">
                                                      <i class="${ScriptStyle1.urlIcon(l, "bi")}"></i>
                                                    </a> `;
                                        });
                                        return tmp;
                                    })}
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
                            <!-- End Team Section -->
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
                            title: `索引`,
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
                            placeHolder: '輸入副標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.dataList,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.dataList.list.map((dd, index) => {
                                return {
                                    title: dd.name || `人員:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.name,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `職稱`,
                                            default: dd.pro,
                                            placeHolder: '輸入職稱',
                                            callback: (text) => {
                                                dd.pro = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `職位敘述`,
                                            default: dd.desc,
                                            placeHolder: '介紹此職位',
                                            callback: (text) => {
                                                dd.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '照片',
                                            def: dd.img,
                                            callback: (data) => {
                                                dd.img = data;
                                                widget.refreshComponent();
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.dataList,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({
                                        img: ScriptStyle1.getRout("assets/img/team/team-1.jpg"),
                                        name: "陳志賢",
                                        pro: "執行長",
                                        desc: "企業中負責日常營運的最高行政人員。其專業與領導能力，讓公司的股東可以信任該公司的決策與產品",
                                        link: ["https://www.facebook.com/", "https://www.instagram.com/"],
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        })
                    ]);
                }
            };
        },
    };
});
