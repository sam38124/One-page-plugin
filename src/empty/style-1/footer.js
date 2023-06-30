import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    const footer = {
                        subs: { desc: "想收到與萊恩設計有關的最新消息，請立即訂閱我們的電子報，我們會將資訊送至你的信箱。", link: "#" },
                        outro: widget.data.outro,
                        map: widget.data.map,
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                                <!-- ======= Footer ======= -->
                                <footer id="footer">
                                    <div class="footer-top">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-lg-3 col-md-6">
                                                    <div class="footer-info">
                                                        <h3 style="color: white">${footer.outro.title}</h3>
                                                        <p style="white-space:normal;word-wrap:break-word;word-break:break-all;">${footer.outro.desc}</p>
                                                        <div class="social-links mt-3">
                                                            ${(() => {
                                let tmp = "";
                                footer.outro.socialData.link.map((r) => {
                                    tmp += `
                                                                    <a class="text-white" onclick="" style="cursor:pointer">
                                                                        <i class="${ScriptStyle1.urlIcon(r, "bx")}"></i>
                                                                    </a>
                                                                    `;
                                });
                                console.log(tmp);
                                return tmp;
                            })()}                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                ${(() => {
                                let tmp = "";
                                footer.map.map((m) => {
                                    tmp += `
                                                            <div class="col-lg-2 col-md-6 footer-links">
                                                                <h4>${m.title}</h4>
                                                                <ul>
                                                                    ${(() => {
                                        let tmp = "";
                                        m.listData.list.map((l) => {
                                            tmp += `
                                                                                <li>
                                                                                    <i class="bx bx-chevron-right"></i>
                                                                                    <a
                                                                                      class="scrollto"
                                                                                      onclick=""
                                                                                      style="cursor:pointer"
                                                                                      data-hash=${l.link}
                                                                                      >${l.name}</a
                                                                                    >
                                                                                </li>`;
                                        });
                                        return tmp;
                                    })()}                                                                   
                                                                </ul>
                                                            </div>
                                                        `;
                                });
                                return tmp;
                            })()}                                                                                                       
                                                <div class="col-lg-4 col-md-6 footer-newsletter">
                                                    <h4>訂閱</h4>
                                                    <p style="white-space:normal;word-wrap:break-word;word-break:break-all;">想收到與${footer.outro.title}有關的最新消息，請立即訂閱我們的電子報，我們會將資訊送至你的信箱。</p>
                                                    <form><input type="email" name="email" /><input type="submit" value="送出" onclick="${gvc.event(() => {
                                event.preventDefault();
                                return "";
                            })}"/></form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            
                                    <div class="container">
<!--                                    todo funnel.copyRight("#cda45e")-->
                                        <div class="copyright"></div>
                                        <div class="credits">
                                          <!-- All the links in the footer should remain intact. -->
                                          <!-- You can delete the links only if you purchased the pro version. -->
                                          <!-- Licensing information: https://bootstrapmade.com/license/ -->
                                          <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/restaurantly-restaurant-template/ -->
                                          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                                        </div>
                                    </div>
                                </footer>
                                <!-- End Footer -->`;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '基本資訊',
                            data: widget.data.outro,
                            innerText: () => {
                                return `${glitter.htmlGenerate.editeInput({
                                    gvc: gvc,
                                    title: '左大標題',
                                    default: widget.data.outro.title,
                                    placeHolder: '請輸入左大標題',
                                    callback: (text) => {
                                        widget.data.outro.title = text;
                                        widget.refreshComponent();
                                    },
                                })}` + `
                                ${glitter.htmlGenerate.editeText({
                                    gvc: gvc,
                                    title: '左大標敘文',
                                    default: widget.data.outro.desc,
                                    placeHolder: '請輸入左大標下方的描述文',
                                    callback: (text) => {
                                        widget.data.outro.desc = text;
                                        widget.refreshComponent();
                                    },
                                })}
                                ` +
                                    Editor.arrayItem({
                                        originalArray: widget.data.outro,
                                        gvc: gvc,
                                        title: '行內資訊',
                                        array: widget.data.outro.socialData.link.map((socialData, index) => {
                                            return {
                                                title: `第${index + 1}個社群資訊`,
                                                expand: widget.data.outro.socialData,
                                                innerHtml: glitter.htmlGenerate.editeInput({
                                                    gvc: gvc,
                                                    title: '社群網址',
                                                    default: "",
                                                    placeHolder: `請輸入社群網站的網址`,
                                                    callback: (text) => {
                                                        socialData = text;
                                                        widget.refreshComponent();
                                                    }
                                                }),
                                                minus: gvc.event(() => {
                                                    widget.data.outro.socialData.link.splice(index, 1);
                                                    widget.refreshComponent();
                                                }),
                                            };
                                        }),
                                        expand: widget.data.outro.socialData,
                                        plus: {
                                            title: '添加區塊',
                                            event: gvc.event(() => {
                                                widget.data.outro.socialData.link.push("");
                                                widget.refreshComponent();
                                            }),
                                        },
                                        refreshComponent: () => {
                                            widget.refreshComponent();
                                        }
                                    });
                            }
                        }),
                        `<div class="mt-2"></div>`,
                        Editor.arrayItem({
                            originalArray: widget.data.map,
                            gvc: gvc,
                            title: '中間資訊',
                            array: widget.data.map.map((lineData, index) => {
                                return {
                                    title: `第${index + 1}行資訊`,
                                    expand: lineData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '行名',
                                            default: lineData.title,
                                            placeHolder: '這行連結資料的大標',
                                            callback: (text) => {
                                                lineData.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.arrayItem({
                                            originalArray: lineData,
                                            gvc: gvc,
                                            title: '行內資訊',
                                            array: lineData.listData.list.map((rowData, rowIndex) => {
                                                return {
                                                    title: `第${rowIndex + 1}列資訊`,
                                                    expand: rowData,
                                                    innerHtml: gvc.map([
                                                        `
                                                    <div class="ps-2 pt-2 mb-3 border" style="">
                                                        <h5>第${rowIndex + 1}列</h5>
                                                    `,
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: '連結名稱',
                                                            default: rowData.name,
                                                            placeHolder: '請描述此連結的顯示資訊',
                                                            callback: (text) => {
                                                                rowData.name = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                        TriggerEvent.editer(gvc, widget, rowData.link, {
                                                            hover: true,
                                                            option: [],
                                                            title: "這個連結做的事情"
                                                        })
                                                    ]),
                                                    minus: gvc.event(() => {
                                                        lineData.listData.list.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: lineData.listData,
                                            plus: {
                                                title: '添加區塊',
                                                event: gvc.event(() => {
                                                    lineData.listData.list.push({ name: '', link: {} });
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent: () => {
                                                widget.refreshComponent();
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        lineData.listData.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.map,
                            plus: {
                                title: '添加行數',
                                event: gvc.event(() => {
                                    widget.data.map.push({ title: '', listData: { list: [] } });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        `<div class="mt-2"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '右端資訊',
                            data: widget.data.subs,
                            innerText: () => {
                                return `${glitter.htmlGenerate.editeText({
                                    gvc: gvc,
                                    title: '訂閱資訊',
                                    default: widget.data.subs.desc,
                                    placeHolder: '請輸入訂閱的介紹文',
                                    callback: (text) => {
                                        widget.data.subs.desc = text;
                                        widget.refreshComponent();
                                    },
                                })}` +
                                    `
                                    ${glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '送出的目的地',
                                        default: widget.data.subs.link,
                                        placeHolder: '請輸入左大標下方的描述文',
                                        callback: (text) => {
                                            widget.data.subs.link = text;
                                            widget.refreshComponent();
                                        },
                                    })}
                                `;
                            }
                        })
                    ]);
                }
            };
        },
    };
});
