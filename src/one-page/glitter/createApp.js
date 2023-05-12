import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        render: (gvc, widget, setting, hoverID, subData) => {
            return {
                view: () => {
                    return `<section class="position-relative  pt-0" >
        <div class="container mt-3 pt-md-2 pt-lg-4 pb-2 pb-md-4 pb-lg-5 px-0">
        ${template(gvc, widget, setting, hoverID).view()}
        </div>
        <!-- Slider progress -->
        <div id="swiper-progress" class="swiper-pagination bottom-0" style="top: auto;"></div>
      </section>`;
                },
                editor: () => {
                    return Editor.toggleExpand({
                        gvc: gvc, title: "模板設定", data: widget.data, innerText: () => {
                            return template(gvc, widget, setting, hoverID).editor();
                        }
                    });
                }
            };
        }
    };
});
const template = (gvc, widget, setting, hoverID) => {
    const glitter = gvc.glitter;
    widget.data.tag = widget.data.tag ?? [
        { className: "*", title: "所有模板" },
        { className: "onepage", title: "單頁式網頁" },
        { className: "shop", title: "電商服務" },
        { className: "social", title: "社群平台" },
        { className: "event", title: "活動網站" },
        { className: "dashboard", title: "儀錶板" },
        { className: "blog", title: "部落格" },
    ];
    widget.data.title = widget.data.title ?? "萊恩設計網頁模板";
    widget.data.desc = widget.data.desc ?? "一頁式網站、多功能前後台、只要您有需求和資料，萊恩設計都能提供相對應的模板，點擊圖片可開啟該模板演示";
    widget.data.list = widget.data.list ?? [
        {
            img: ScriptStyle1.getRout(`img/template/restaurantly.png`),
            tag: ["onepage"],
            name: "企業形象單頁式網站 - 活躍藍",
            link: `${glitter.webUrl}/restaurantly/home`,
        },
        {
            img: ScriptStyle1.getRout("img/template/scaffold.png"),
            tag: ["onepage"],
            name: "企業形象單頁式網站 - 活躍藍",
            link: `${glitter.webUrl}/scaffold/home`
        },
        {
            img: ScriptStyle1.getRout("img/template/maxim.png"),
            tag: ["onepage"],
            name: "企業形象單頁式網站 - 綠意黑",
            link: `${glitter.webUrl}/maxim/home`
        },
        {
            img: ScriptStyle1.getRout("img/template/herobiz.png"),
            tag: ["onepage"],
            name: "企業形象單頁式網站 - 靈活青",
            link: `${glitter.webUrl}/herobiz2/home`
        },
        {
            img: ScriptStyle1.getRout("img/template/theday.png"),
            tag: ["onepage"],
            name: "企業形象單頁式網站 - 紅光黑",
            link: `${glitter.webUrl}/theday2/home`
        },
    ];
    widget.data.titleStyle = widget.data.titleStyle ?? {};
    widget.data.descStyle = widget.data.descStyle ?? {};
    const template = {
        title: widget.data.title,
        desc: widget.data.desc,
        tag: widget.data.tag,
        list: widget.data.list,
    };
    return {
        view: () => {
            ScriptStyle1.initialScript(gvc, widget);
            const id = glitter.getUUID();
            return gvc.bindView(() => {
                return {
                    bind: id,
                    view: () => {
                        return ` <h2 class="h1 mb-4 text-center ${glitter.htmlGenerate.styleEditor(widget.data.descStyle).class()}"
 style="${glitter.htmlGenerate.styleEditor(widget.data.descStyle).style()}"
 >${template.title}</h2>
          <p class="fs-lg pb-2 pb-md-3 pb-lg-0 mb-4 mb-lg-5 text-center ${glitter.htmlGenerate.styleEditor(widget.data.descStyle).class()}"
            style="${glitter.htmlGenerate.styleEditor(widget.data.descStyle).style()}"
            >${template.desc}</p>
          <ul class="nav nav-tabs flex-nowrap justify-content-lg-center overflow-auto pb-2 mb-3 mb-lg-4" role="tablist">
            ${glitter.print(function () {
                            var tmp = "";
                            template.tag.map((a, i) => {
                                tmp += `
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link text-nowrap ${i == 0 ? `active` : ``}"
                      data-bs-toggle="tab"
                      type="button"
                      role="tab"
                      onclick="${gvc.event(() => {
                                    let b = a.className;
                                    if (b !== "*") {
                                        b = "." + b;
                                    }
                                    $(".isot").isotope({ filter: b });
                                })}"
                    >
                      ${a.title}
                    </button>
                  </li>
                `;
                            });
                            return tmp;
                        })}
          </ul>
          <div class="masonry-grid row g-md-4 g-3 mb-4 isot">
            <!-- Project grid -->
            ${glitter.print(function () {
                            var tmp = "";
                            template.list.map((p) => {
                                var tagClass = "";
                                p.tag.map((m) => (tagClass += `${m} `));
                                tmp += `
                  <div class="masonry-grid-item col-md-4 col-sm-6 col-12 ${tagClass}" style="display:none">
                    <a class="card card-portfolio card-hover bg-transparent border-0">
                      <div
                        class="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3"
                        onclick="${gvc.event(() => {
                                    TriggerEvent.trigger({
                                        gvc, widget, clickEvent: p,
                                    });
                                })}"
                        style="cursor:pointer"
                      >
                        <span class="position-absolute top-0 start-0 w-100 h-100 opacity-75  rounded-3" style="background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);"></span>
                        <div class="position-relative text-center zindex-2 d-flex flex-column align-items-center">
                         <button class="btn btn-danger" style="height:40px;border-radius:20px;" onclick="${gvc.event((e, event) => {
                                    event.stopPropagation();
                                    TriggerEvent.trigger({
                                        gvc, widget, clickEvent: p.create,
                                    });
                                })}"><i class="fa-duotone fa-check me-2"></i>選用模板</button>
                          <button class="btn btn-primary mt-3 " style="height:40px;border-radius:20px;" 
                          onclick="${gvc.event((e, event) => {
                                    event.stopPropagation();
                                    TriggerEvent.trigger({
                                        gvc, widget, clickEvent: p.preView,
                                    });
                                })}"><i class="fa-regular fa-eye me-2"></i>預覽模板</button>
                        </div>
                      </div>
                      <div class="card-img">
                        <div
                          style="background:url(${p.img});
                            width: 100%;
                            padding-bottom: 70%;
                            background-size:cover;
                            background-position:center center;"
                        ></div>
                      </div>
                    </a>
                  </div>
                `;
                            });
                            return tmp;
                        })}
          </div>`;
                    },
                    divCreate: {
                        elem: `section`, class: `container mb-5 pt-lg-2 pt-xl-4 pb-2 pb-md-3 pb-lg-5`
                    },
                    onCreate: () => {
                        try {
                            const imagesLoaded = window.imagesLoaded;
                            setTimeout((() => {
                                imagesLoaded(document.querySelector('#' + gvc.id(id)), function (instance) {
                                    $(".isot").isotope({ filter: ':not("*")' }), $(".isot").isotope({ filter: "*" });
                                });
                            }), 200);
                        }
                        catch (e) {
                        }
                    }
                };
            });
        },
        editor: () => {
            widget.data.tabExpand = widget.data.tabExpand ?? {};
            return gvc.map([
                glitter.htmlGenerate.editeInput({
                    gvc: gvc,
                    title: `標題`,
                    default: widget.data.title,
                    placeHolder: "輸入標題名稱",
                    callback: (text) => {
                        widget.data.title = text;
                        widget.refreshComponent();
                    }
                }),
                glitter.htmlGenerate.styleEditor(widget.data.titleStyle).editor(gvc, () => {
                    widget.refreshComponent();
                }, '標題樣式'),
                glitter.htmlGenerate.editeText({
                    gvc: gvc,
                    title: `描述`,
                    default: widget.data.desc,
                    placeHolder: "輸入描述",
                    callback: (text) => {
                        widget.data.desc = text;
                        widget.refreshComponent();
                    }
                }),
                glitter.htmlGenerate.styleEditor(widget.data.descStyle).editor(gvc, () => {
                    widget.refreshComponent();
                }, '描述樣式'),
                `<div class="my-2"></div>`,
                Editor.arrayItem({
                    originalArray: widget.data.tag,
                    gvc: gvc,
                    title: '標籤設定',
                    array: widget.data.tag.map((data, index) => {
                        return {
                            title: data.title || "標籤" + (index + 1),
                            expand: data,
                            innerHtml: gvc.map([
                                glitter.htmlGenerate.editeInput({
                                    gvc: gvc,
                                    title: '標籤名稱',
                                    default: data.title,
                                    placeHolder: "標籤",
                                    callback: (text) => {
                                        data.title = text;
                                        widget.refreshComponent();
                                    }
                                }),
                                glitter.htmlGenerate.editeInput({
                                    gvc: gvc,
                                    title: '標籤連結[* 代表全部]',
                                    default: data.className,
                                    placeHolder: "標籤",
                                    callback: (text) => {
                                        data.className = text;
                                        widget.refreshComponent();
                                    }
                                })
                            ]),
                            minus: gvc.event(() => {
                                widget.data.tag.splice(index, 1);
                                widget.refreshComponent();
                            })
                        };
                    }),
                    expand: widget.data.tabExpand,
                    plus: {
                        title: '添加區塊',
                        event: gvc.event(() => {
                            widget.data.tag.push({
                                style: `background-color:var(--bs-red);`,
                                class: ``,
                                title: `網頁設計`
                            });
                            widget.refreshComponent();
                        }),
                    },
                    refreshComponent: () => {
                        widget.refreshComponent();
                    }
                }),
                `<div class="alert alert-primary bg-primary p-2 mt-2">
${Editor.h3('項目列表')}
                            ${(() => {
                    let dragm = {
                        start: 0,
                        end: 0,
                    };
                    return widget.data.list.map((data, index) => {
                        data.tabExpand = data.tabExpand ?? {};
                        data.btnList = data.btnList ?? [];
                        data.btnExpand = data.btnExpand ?? {};
                        data.preView = data.preView ?? {};
                        data.create = data.create ?? {};
                        return Editor.toggleExpand({
                            gvc: gvc,
                            title: `<div    draggable="true"  ondragenter="${gvc.event((e, event) => {
                                dragm.end = index;
                            })}" ondragstart="${gvc.event(() => {
                                dragm.start = index;
                                dragm.end = index;
                            })}"   ondragend="${gvc.event(() => {
                                ScriptStyle1.swapArr(widget.data.list, dragm.start, dragm.end);
                                widget.refreshComponent();
                            })}">${Editor.minusTitle(data.name || `案例:${index + 1}`, gvc.event(() => {
                                widget.data.list.splice(index, 1);
                                widget.refreshComponent();
                            }))}</div>`,
                            data: data,
                            innerText: () => {
                                return gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '標題',
                                        default: data.name ?? "",
                                        placeHolder: "輸入標題",
                                        callback: (text) => {
                                            data.name = text;
                                            widget.refreshComponent();
                                        }
                                    }),
                                    `<div class="mb-2"></div>`,
                                    Editor.toggleExpand({
                                        gvc: gvc,
                                        title: `標籤設定`,
                                        data: data.tabExpand,
                                        innerText: () => {
                                            return data.tag.map((d2, index) => {
                                                return Editor.searchInput({
                                                    gvc: gvc,
                                                    title: Editor.minusTitle((widget.data.tag.find((dd) => {
                                                        return dd.className === d2;
                                                    }) ?? {}).title || `標籤:${index + 1}`, gvc.event(() => {
                                                        data.tag.splice(index, 1);
                                                        widget.refreshComponent();
                                                    })),
                                                    def: (widget.data.tag.find((dd) => {
                                                        return dd.className === d2;
                                                    }) ?? {}).title ?? "",
                                                    placeHolder: "標籤",
                                                    callback: (text) => {
                                                        data.tag[index] = widget.data.tag.find((dd) => {
                                                            return dd.title === text;
                                                        }).className;
                                                        widget.refreshComponent();
                                                    },
                                                    array: widget.data.tag.map((dd) => {
                                                        return dd.title;
                                                    })
                                                });
                                            }).join(`<div class="my-2"></div>`) + Editor.plusBtn("添加標籤", gvc.event(() => {
                                                data.tag.push('');
                                                widget.refreshComponent();
                                            }));
                                        },
                                        color: `#0062c0`
                                    }),
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: '圖片',
                                        def: data.img,
                                        callback: (text) => {
                                            data.img = text;
                                            widget.refreshComponent();
                                        }
                                    }),
                                    TriggerEvent.editer(gvc, widget, data, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
                                    }),
                                    TriggerEvent.editer(gvc, widget, data.preView, {
                                        hover: true,
                                        option: [],
                                        title: "預覽事件"
                                    }),
                                    TriggerEvent.editer(gvc, widget, data.create, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
                                    })
                                ]);
                            }
                        });
                    }).join(`<div class="my-2"></div>`);
                })()}
${Editor.plusBtn("添加項目", gvc.event(() => {
                    widget.data.list.push({
                        title: "萊恩設計",
                        sub: "官方形象網站",
                        tag: [],
                        img: ScriptStyle1.getRout("img/project/LionWeb.png"),
                        page: `project`
                    });
                    widget.refreshComponent();
                }))}
</div>`
            ]);
        }
    };
};
