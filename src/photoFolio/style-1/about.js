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
                    widget.data.image = widget.data.image ?? ScriptStyle1.getRout('assets/img/profile-img.jpg');
                    widget.data.title = widget.data.title ?? "Professional Photographer from New York";
                    widget.data.desc = widget.data.desc ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
                    widget.data.infList = widget.data.infList ?? [
                        {
                            dataList: [
                                {
                                    title: "Birthday",
                                    data: "1 May 1995"
                                },
                                {
                                    title: "Website",
                                    data: "www.example.com"
                                },
                                {
                                    title: "Phone",
                                    data: "+123 456 7890"
                                },
                                {
                                    title: "City",
                                    data: "New York, USA"
                                },
                            ]
                        },
                        {
                            dataList: [
                                {
                                    title: "Age",
                                    data: "30"
                                },
                                {
                                    title: "Degree",
                                    data: "Master"
                                },
                                {
                                    title: "PhEmailone",
                                    data: "email@example.com"
                                },
                                {
                                    title: "Freelance",
                                    data: "Available"
                                },
                            ]
                        },
                    ];
                    widget.data.introList = widget.data.introList ?? [
                        `Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius omnis.Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia repellendus itaque neque. Aliquid amet quidem ut quaerat cupiditate. Ab et eum qui repellendus omnis culpa magni laudantium dolores.`,
                        `Recusandae est praesentium consequatur eos voluptatem. Vitae dolores aliquam itaque odio nihil. Neque ut neque ut quae voluptas. Maxime corporis aut ut ipsum consequatur. Repudiandae sunt sequi minus qui et. Doloribus molestiae officiis.Soluta eligendi fugiat omnis enim. Numquam alias sint possimus eveniet ad. Ratione in earum eum magni totam.`
                    ];
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let about = {
                                image: widget.data.image,
                                title: widget.data.title,
                                desc: widget.data.desc,
                                infList: widget.data.infList,
                                introList: widget.data.introList
                            };
                            return `
<main>
                            <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container">

        <div class="row gy-4 justify-content-center">
          <div class="col-lg-4">
            <img src="${about.image}" class="img-fluid" alt="">
          </div>
          <div class="col-lg-5 content">
            <h2>${about.title}</h2>
            <p class="fst-italic py-3">
              ${about.desc}
            </p>
            <div class="row">
                ${(() => {
                                let split = 12 / about.infList.length;
                                let html = ``;
                                console.log(about);
                                about.infList.map((inf) => {
                                    let temp = ``;
                                    inf.dataList.map((data) => {
                                        temp += `<li><i class="bi bi-chevron-right"></i> <strong>${data.title}:</strong> <span>${data.data}</span></li>`;
                                    });
                                    html += `
                        <div class="col-lg-${split}">
                            <ul>
                              ${temp}
                            </ul>
                        </div>
                        `;
                                });
                                return html;
                            })()}
             
            </div>
            ${(() => {
                                let html = ``;
                                about.introList.map((intro, index) => {
                                    let appendClass = "py-3";
                                    if (index == about.introList.length - 1) {
                                        appendClass = "m-0";
                                    }
                                    html += `
                    <p class="${appendClass}">
                      ${intro}
                    </p>
                    `;
                                });
                                return html;
                            })()}           
          </div>
        </div>

      </div>
    </section><!-- End About Section -->
</main>
`;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
                    widget.data.infExpand = widget.data.infExpand ?? {};
                    widget.data.introExpand = widget.data.introExpand ?? {};
                    return gvc.map([
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '左方圖片',
                            def: widget.data.image,
                            callback: (data) => {
                                widget.data.image = data;
                                widget.refreshComponent();
                            }
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `標題`,
                            default: widget.data.title,
                            placeHolder: '輸入標題文字',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入敘述文字',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.infList,
                            gvc: gvc,
                            title: '個人資料區塊',
                            array: widget.data.infList.map((inf, index) => {
                                return {
                                    title: `第${index + 1}行資料`,
                                    expand: inf,
                                    innerHtml: gvc.map([
                                        Editor.arrayItem({
                                            originalArray: inf,
                                            gvc: gvc,
                                            title: '區塊內容',
                                            array: inf.dataList.map((dd, index) => {
                                                return {
                                                    title: `第${index + 1}列資料`,
                                                    expand: dd,
                                                    innerHtml: gvc.map([
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `標題`,
                                                            default: dd.title,
                                                            placeHolder: '輸入標題文字',
                                                            callback: (text) => {
                                                                dd.title = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `此標題對應的訊息`,
                                                            default: dd.data,
                                                            placeHolder: '輸入文字',
                                                            callback: (text) => {
                                                                dd.data = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                    ]),
                                                    minus: gvc.event(() => {
                                                        inf.dataList.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: inf,
                                            plus: {
                                                title: '添加區塊',
                                                event: gvc.event(() => {
                                                    inf.dataList.push({
                                                        title: "Birthday",
                                                        data: "1 May 1995"
                                                    });
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent: () => {
                                                widget.refreshComponent();
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        inf.dataList.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.infExpand,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.infList.push({ datalist: [] });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.introList,
                            gvc: gvc,
                            title: '自我介紹區塊',
                            array: widget.data.introList.map((dd, index) => {
                                return {
                                    title: `第${index + 1}段文字`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `文字內容`,
                                            default: dd,
                                            placeHolder: '輸入文字',
                                            callback: (text) => {
                                                dd = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.introList.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.introExpand,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.introList.push({
                                        title: "Birthday",
                                        data: "1 May 1995"
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
