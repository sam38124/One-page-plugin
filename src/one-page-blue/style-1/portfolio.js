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
                    let project = {
                        title: widget.data.title ?? "作品案例",
                        desc: widget.data.desc ?? "萊恩設計有能力製作多種設計、多功能的單頁式網站或系統軟體，可在下方查找相關案例",
                        tagList: widget.data.tagList ?? {
                            tag: [
                                { className: "*", title: "所有作品" },
                                { className: ".app", title: "APP" },
                                { className: ".card", title: "活動" },
                                { className: ".web", title: "網頁" },
                            ]
                        },
                        dataList: widget.data.dataList ?? {
                            list: [
                                { title: "Mani", desc: "App 1, Card 1", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-1.jpg"), tag: ["app", "card"] },
                                { title: "Tablet", desc: "Card 2", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-2.jpg"), tag: ["card"] },
                                { title: "Phone Useful", desc: "Web 1", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-3.jpg"), tag: ["web"] },
                                { title: "Cheer up", desc: "App 2", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-4.jpg"), tag: ["app"] },
                                { title: "Light", desc: "Card 3", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-5.jpg"), tag: ["app", "card"] },
                                { title: "Booker", desc: "Web 2", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-6.jpg"), tag: ["app", "web"] },
                                { title: "Thanks", desc: "App 3", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-7.jpg"), tag: ["app"] },
                                { title: "Tea Time", desc: "Card 4", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-8.jpg"), tag: ["card"] },
                                { title: "Watch", desc: "Web 3", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-9.jpg"), tag: ["card", "web"] },
                            ],
                        }
                    };
                    widget.data = project;
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <!-- ======= Portfolio Section ======= -->
                            <section id="project" class="portfolio">
                              <div class="container">
                                <div class="section-title" data-aos="fade-up">
                                  <h2>${project.title}</h2>
                                  <p>${project.desc}</p>
                                </div>
                    
                                <div class="row">
                                  <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
                                    <ul id="portfolio-flters">
                                      ${glitter.print(function () {
                                let tmp = "";
                                project.tagList.tag.map((t, i) => {
                                    tmp += ` <li data-filter="${t.className}" ${i == 0 ? `class="filter-active"` : ``}>${t.title}</li> `;
                                });
                                return tmp;
                            })}
                                    </ul>
                                  </div>
                                </div>
                    
                                <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
                                ${glitter.print(function () {
                                let tmp = "";
                                project.dataList.list.map((l) => {
                                    var tagClass = "";
                                    l.tag.map((m) => (tagClass += `${m} `));
                                    tmp += `                    
                                        <div class="col-lg-4 col-md-6 portfolio-item border-0 ${tagClass}">
                                            <div class="portfolio-wrap">
                                              <img src="${l.img}" class="img-fluid" alt="" />
                                              <div class="portfolio-info">
                                                <h4>${l.title}</h4>
                                                <p>${l.desc}</p>
                                              </div>
                                              <div class="portfolio-links">
                                                <a href="${l.img}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${l.title}"
                                                  ><i class="bx bx-plus"></i
                                                ></a>
                                                <a title="More Details" onclick="${gvc.event(() => {
                                    })}" style="cursor:pointer"><i class="bx bx-link"></i></a>
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
                            <!-- End Portfolio Section -->
                            `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                            let portfolioContainer = select(".portfolio-container");
                            function select(el, all = false) {
                                el = el.trim();
                                if (all) {
                                    return [...document.querySelectorAll(el)];
                                }
                                else {
                                    return document.querySelector(el);
                                }
                            }
                            function on(type, el, listener, all = false) {
                                let selectEl = select(el, all);
                                if (selectEl) {
                                    if (all) {
                                        selectEl.forEach((e) => e.addEventListener(type, listener));
                                    }
                                    else {
                                        selectEl.addEventListener(type, listener);
                                    }
                                }
                            }
                            if (portfolioContainer) {
                                let portfolioIsotope = new Isotope(portfolioContainer, {
                                    itemSelector: ".portfolio-item",
                                    layoutMode: "fitRows",
                                });
                                let portfolioFilters = select("#portfolio-flters li", true);
                                on("click", "#portfolio-flters li", function (e) {
                                    e.preventDefault();
                                    portfolioFilters.forEach(function (el) {
                                        el.classList.remove("filter-active");
                                    });
                                    this.classList.add("filter-active");
                                    portfolioIsotope.arrange({
                                        filter: this.getAttribute("data-filter"),
                                    });
                                    portfolioIsotope.on("arrangeComplete", function () {
                                        AOS.refresh();
                                    });
                                }, true);
                            }
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title,
                            placeHolder: '這段的大標',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '副標題',
                            default: widget.data.desc,
                            placeHolder: '給一段適合的副標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.tagList.tag,
                            gvc: gvc,
                            title: '標籤設定',
                            array: widget.data.tagList.tag.map((tag, index) => {
                                return {
                                    title: tag.title ?? `標題資訊`,
                                    expand: tag,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: tag.title,
                                            placeHolder: '輸入大標題',
                                            callback: (text) => {
                                                tag.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標籤連結[* 代表全部] 最前方請+.`,
                                            default: tag.className,
                                            placeHolder: '請至少輸入一個*',
                                            callback: (text) => {
                                                tag.className = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.tagList.tag.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.tagList,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.tagList.tag.push({ className: "*", title: "所有作品" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.dataList.list,
                            gvc: gvc,
                            title: '行列內容',
                            array: widget.data.dataList.list.map((list, index) => {
                                return {
                                    title: list.title || `第${index + 1}列資訊`,
                                    expand: list,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: list.title,
                                            placeHolder: '輸入大標題',
                                            callback: (text) => {
                                                list.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `內文敘述`,
                                            default: list.desc,
                                            placeHolder: '輸入內文',
                                            callback: (text) => {
                                                list.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '主要圖片',
                                            def: list.img,
                                            callback: (data) => {
                                                list.img = data;
                                                widget.refreshComponent();
                                            }
                                        }),
                                        Editor.toggleExpand({
                                            gvc: gvc,
                                            title: `標籤設定`,
                                            data: list.tag,
                                            innerText: () => {
                                                return list.tag.map((d2, index) => {
                                                    return Editor.searchInput({
                                                        gvc: gvc,
                                                        title: Editor.minusTitle((widget.data.tagList.tag.find((dd) => {
                                                            return dd.className === `${d2}`;
                                                        }) ?? {}).title || `標籤:${index + 1}`, gvc.event(() => {
                                                            list.tag.splice(index, 1);
                                                            widget.refreshComponent();
                                                        })),
                                                        def: (widget.data.tagList.tag.find((dd) => {
                                                            return dd.className === `.${d2}`;
                                                        }) ?? {}).title ?? "",
                                                        placeHolder: "標籤",
                                                        callback: (text) => {
                                                            list.tag[index] = widget.data.tagList.tag.find((dd) => {
                                                                return dd.title === text;
                                                            }).className;
                                                            widget.refreshComponent();
                                                        },
                                                        array: widget.data.tagList.tag.map((dd) => {
                                                            return dd.title;
                                                        })
                                                    });
                                                }).join(`<div class="my-2"></div>`) + Editor.plusBtn("添加標籤", gvc.event(() => {
                                                    list.tag.push('*');
                                                    widget.refreshComponent();
                                                }));
                                            },
                                            color: `#0062c0`
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.dataList.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.dataList,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({
                                        title: "Mani",
                                        desc: "App 1, Card 1",
                                        link: "#",
                                        img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-1.jpg"),
                                        tag: ["app", "card"]
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
