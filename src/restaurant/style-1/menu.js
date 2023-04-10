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
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            const menu = {
                                title: widget.data.title ?? "菜單",
                                desc: widget.data.desc ?? "由米其林四星主廚坐鎮，給你最佳美食饗宴與餐廳服務",
                                tagObject: widget.data.tagObject ?? {
                                    tags: [
                                        { className: "*", title: "所有餐點", expand: {} },
                                        { className: "starters", title: "主食", expand: {} },
                                        { className: "salads", title: "副食", expand: {} },
                                        { className: "specialty", title: "甜點", expand: {} },
                                    ]
                                },
                                dataList: widget.data.dataList ?? {
                                    list: [
                                        {
                                            img: ScriptStyle1.getRout("assets/img/menu/lobster-bisque.jpg"),
                                            title: "蝦滋圈",
                                            desc: "金黃色又澎又厚的圈圈，選用鮮美飽滿的100%純蝦泥，搭配梅子醬或灑上鹹蛋黃，鹹甜鹹甜的獨特口感，沾點辣粉更開胃，一朵圈圈多重滋味！",
                                            price: `$ 2390`,
                                            tag: ["starters"],
                                            expand: {}
                                        },
                                        {
                                            img: ScriptStyle1.getRout("assets/img/menu/bread-barrel.jpg"),
                                            title: "芋香黑糯米 (冰/熱)",
                                            desc: "享用糯米的獨特Q感，搭配芋頭的香鬆軟，熱熱吃更加香濃迷人~",
                                            price: `$ 2390`,
                                            tag: ["specialty"],
                                            expand: {}
                                        },
                                        {
                                            img: ScriptStyle1.getRout("assets/img/menu/cake.jpg"),
                                            title: "泰式春捲",
                                            desc: "有冬粉、木耳、豬肉、竹筍、高麗菜的豐富內餡，外皮香酥，一口咬下、雙重滿足。",
                                            price: `$ 2390`,
                                            tag: ["starters"],
                                            expand: {}
                                        },
                                    ]
                                }
                            };
                            if (!widget.data.title) {
                                widget.data = menu;
                            }
                            gvc.addStyle(`.menu .menu-contentnc::after {
    content: "";
    position: absolute;
    left: 20px;
    right: 0;
    top: -4px;
    z-index: 1;
    color: #bab3a6;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}`);
                            return `
                                <!-- ======= Menu Section ======= -->
                                <section id="menu" class="menu section-bg">
                                    <div class="container" data-aos="fade-up">
                                        <div class="section-title">
                                            <h2>${menu.title}</h2>
                                            <p>${menu.desc}</p>
                                        </div>                                    
                                        <div class="row" data-aos="fade-up" data-aos-delay="100">
                                            <div class="col-lg-12 d-flex justify-content-center">
                                                <ul id="menu-flters">
                                                ${(() => {
                                let tmp = "";
                                menu.tagObject.tags.map((t, i) => {
                                    tmp += ` <li data-filter=".${t.className}" ${i == 0 ? `class="filter-active"` : ``} onclick="${gvc.event((e) => {
                                        let b = t.className;
                                        if (b !== "*") {
                                            b = "." + b;
                                        }
                                        $('.filter-active').removeClass('filter-active');
                                        $(e).addClass('filter-active');
                                        $(".isot").isotope({ filter: b });
                                    })}">${t.title}</li> `;
                                });
                                return tmp;
                            })()}                                          
                                                </ul>
                                            </div>
                                        </div>                                    
                                        <div class="row menu-container isot" data-aos="fade-up" data-aos-delay="200">
                                            ${(() => {
                                let tmp = "";
                                menu.dataList.list.map((l) => {
                                    let tagClass = "";
                                    l.tag.map((m) => (tagClass += `${m} `));
                                    tmp += `
                                                        <div class="col-lg-6 menu-item ${tagClass}">
                                                          <img src="${l.img}" class="menu-img" alt="" />
                                                          <div class="menu-content " style="background: none !important;content: none!important;" ><a href="#">${l.title}</a><span>${l.price.toLocaleString()}</span></div>
                                                          <div class="menu-ingredients" style="white-space:normal;word-wrap:break-word;word-break:break-all;">${l.desc}</div>
                                                        </div>
                                                      `;
                                });
                                return tmp;
                            })()}
                                        </div>
                                    </div>
                                </section>
                                <!-- End Menu Section -->
                              `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                            $(".isot").isotope({ filter: '*' });
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
                            originalArray: widget.data,
                            gvc: gvc,
                            title: '標籤設定',
                            array: widget.data.tagObject.tags.map((tag, index) => {
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
                                            title: `標籤連結[* 代表全部]`,
                                            default: tag.className,
                                            placeHolder: '請至少輸入一個*',
                                            callback: (text) => {
                                                tag.className = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.tagObject.tags.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.tagObject.tags.push({ className: "*", title: "新標籤" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.dataList,
                            gvc: gvc,
                            title: '行列內容',
                            array: widget.data.dataList.list.map((list, index) => {
                                return {
                                    title: `第${index + 1}列資訊`,
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
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `價目`,
                                            default: list.price,
                                            placeHolder: '輸入價格',
                                            callback: (text) => {
                                                list.price = text;
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
                                            data: list.expand,
                                            innerText: list.tag.map((d2, index) => {
                                                return Editor.searchInput({
                                                    gvc: gvc,
                                                    title: Editor.minusTitle((widget.data.tagObject.tags.find((dd) => {
                                                        return dd.className === `.${d2}`;
                                                    }) ?? {}).title || `標籤:${index + 1}`, gvc.event(() => {
                                                        list.tag.splice(index, 1);
                                                        widget.refreshComponent();
                                                    })),
                                                    def: (widget.data.tagObject.tags.find((dd) => {
                                                        return dd.className === `.${d2}`;
                                                    }) ?? {}).title ?? "",
                                                    placeHolder: "標籤",
                                                    callback: (text) => {
                                                        list.tag[index] = widget.data.tagObject.tags.find((dd) => {
                                                            return dd.title === text;
                                                        }).className;
                                                        widget.refreshComponent();
                                                    },
                                                    array: widget.data.tagObject.tags.map((dd) => {
                                                        return dd.title;
                                                    })
                                                });
                                            }).join(`<div class="my-2"></div>`) + Editor.plusBtn("添加標籤", gvc.event(() => {
                                                list.tag.push('*');
                                                console.log("----------list--------");
                                                console.log(list);
                                                widget.refreshComponent();
                                            })),
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
                                    widget.data.dataList.list.push({ img: "",
                                        title: "新標題",
                                        desc: "新敘述",
                                        price: 0,
                                        tag: [] });
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
