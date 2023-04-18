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
                                    linkList: {
                                        link: [
                                            { src: "https://www.facebook.com/" },
                                            { src: "https://www.instagram.com/" },
                                        ]
                                    }
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/team/team-3.jpg"),
                                    name: "黃國玟",
                                    pro: "UI／UX設計師",
                                    linkList: {
                                        link: [
                                            { src: "https://www.instagram.com/" },
                                            { src: "https://squarestudio.tw" },
                                            { src: "https://www.instagram.com/" },
                                            { src: "https://www.facebook.com/" },
                                            { src: "https://twitter.com/" },
                                        ],
                                    }
                                },
                                { img: ScriptStyle1.getRout("assets/img/team/team-2.jpg"), name: "陳佳玲", pro: "系統規劃師", link: ["https://squarestudio.tw", "#"] },
                            ],
                        }
                    };
                    widget.data = team;
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <!-- ======= Team Section ======= -->
                            <section id="team" class="team">
                              <div class="container">
                                <div class="section-title" data-aos="fade-up">
                                  <h2>${team.title}</h2>
                                  <p>${team.desc}</p>
                                </div>
                    
                                <div class="row gy-5">
                                ${glitter.print(function () {
                                var tmp = "";
                                team.dataList.list.map((l, i) => {
                                    tmp += `
                                    <div class="col-lg-4 col-md-6" data-aos-delay="${200 * (i + 1)}">
                                    <div class="member" data-aos="zoom-in">
                                      <div class="pic"><img src="${l.img}" class="img-fluid" alt="" /></div>
                                      <div class="member-info">
                                        <h4>${l.name}</h4>
                                        <span>${l.pro}</span>
                                        <div class="social">
                                        ${glitter.print(function () {
                                        var tmp = "";
                                        l.linkList.link.map((k) => {
                                            tmp += ` <a onclick="${gvc.event(() => { })}" style="cursor:pointer"><i class="${ScriptStyle1.urlIcon(k.src, "bi")}"></i></a>`;
                                        });
                                        return tmp;
                                    })}
                                        </div>
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
                            placeHolder: '輸入副標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.dataList,
                            gvc: gvc,
                            title: '成員內容',
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
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '照片',
                                            def: dd.img,
                                            callback: (data) => {
                                                dd.img = data;
                                                widget.refreshComponent();
                                            }
                                        })
                                            +
                                                Editor.arrayItem({
                                                    originalArray: dd.linkList,
                                                    gvc: gvc,
                                                    title: '社群資訊',
                                                    array: dd.linkList.link.map((data, index) => {
                                                        return {
                                                            title: `第${index + 1}個社群資訊`,
                                                            expand: data,
                                                            innerHtml: glitter.htmlGenerate.editeInput({
                                                                gvc: gvc,
                                                                title: '社群網址',
                                                                default: data.src,
                                                                placeHolder: `請輸入個人的社群網址首頁`,
                                                                callback: (text) => {
                                                                    data.src = text;
                                                                    widget.refreshComponent();
                                                                }
                                                            }),
                                                            minus: gvc.event(() => {
                                                                dd.linkList.link.splice(index, 1);
                                                                widget.refreshComponent();
                                                            }),
                                                        };
                                                    }),
                                                    expand: dd.linkList,
                                                    plus: {
                                                        title: '添加區塊',
                                                        event: gvc.event(() => {
                                                            dd.linkList.link.push({ src: "" });
                                                            widget.refreshComponent();
                                                        }),
                                                    },
                                                    refreshComponent: () => {
                                                        widget.refreshComponent();
                                                    }
                                                })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.dataList.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.dataList,
                            plus: {
                                title: '添加成員',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({
                                        img: ScriptStyle1.getRout("assets/img/team/team-1.jpg"),
                                        name: "陳志賢",
                                        pro: "執行長",
                                        linkList: {
                                            link: [
                                                { src: "https://www.facebook.com/" },
                                                { src: "https://www.instagram.com/" },
                                            ]
                                        },
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
