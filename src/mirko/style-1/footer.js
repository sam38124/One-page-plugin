import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { Funnel } from "../../glitterBundle/funnel.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            widget.data.info = widget.data.info ?? {
                title: "萊恩設計",
                desc: "提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站",
                social: [
                    { icon: "fab fa-facebook-f", link: "https://www.facebook.com/" },
                    { icon: "fab fa-twitter", link: "https://twitter.com/" },
                    { icon: "fab fa-instagram", link: "https://www.instagram.com/" },
                ],
            };
            widget.data.map = widget.data.map ?? [
                {
                    title: "網站導覽",
                    list: [
                        { name: "服務項目", link: "#service" },
                        { name: "產品介紹", link: "#project" },
                        { name: "定價方案", link: "#price" },
                        { name: "技術與能力", link: "#banner" },
                        { name: "公司團隊", link: "#team" },
                    ],
                },
                {
                    title: "推薦網站",
                    list: [
                        { name: "Google", link: "https://www.google.com.tw/" },
                        { name: "Yahoo", link: "https://tw.yahoo.com/" },
                    ],
                },
            ];
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    const footer = {
                        info: widget.data.info,
                        map: widget.data.map,
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let funnel = new Funnel(gvc);
                            return `
        <section class="footer text-light">
          <div class="container">
            <div class="row" data-aos="fade-right">
              <div class="col-lg-3 py-4 py-md-5">
                <div class="d-flex align-items-center">
                  <h4>${footer.info.title}</h4>
                </div>
                <p class="py-3 para-light">${footer.info.desc}</p>
                <div class="d-flex">
                  ${glitter.print(function () {
                                var tmp = "";
                                console.log("------------------------------------");
                                console.log(footer);
                                footer.info.social.map((s) => {
                                    console.log(s);
                                    tmp += `
                        <div class="me-3">
                          <a href="${s.link}">
                            <i class="${s.icon} fa-2x py-2"></i>
                          </a>
                        </div>
                      `;
                                });
                                return tmp;
                            })}
                </div>
              </div>
              <!-- end of col -->

              ${glitter.print(function () {
                                var tmp = "";
                                if (footer.map) {
                                    footer.map.map((m) => {
                                        tmp += `
                      <div class="col-lg-3 py-4 py-md-5">
                        <div>
                          <h4 class="py-2">${m.title}</h4>
                          ${glitter.print(function () {
                                            var tmp = "";
                                            m.list.map((l) => {
                                                tmp += `
                                <div class="d-flex align-items-center py-2">
                                  <i class="fas fa-caret-right"></i>
                                  <a href="${l.link}"><p class="ms-3">${l.name}</p></a>
                                </div>
                              `;
                                            });
                                            return tmp;
                                        })}
                        </div>
                      </div>
                    `;
                                    });
                                }
                                return tmp;
                            })}

              <div class="col-lg-3 py-4 py-md-5">
                <div class="d-flex align-items-center">
                  <h4>訂閱</h4>
                </div>
                <p class="py-3 para-light"></p>
                <div class="d-flex align-items-center">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control p-2"
                      placeholder="請輸入您的電子郵件"
                      aria-label="Recipient's email"
                    />
                    <button class="btn-secondary text-light"><i class="fas fa-envelope fa-lg"></i></button>
                  </div>
                </div>
              </div>
              <!-- end of col -->
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
        <button onclick="topFunction()" id="myBtn">
          <img src="assets/images/up-arrow.png" alt="alternative" />
        </button>
      `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
                    widget.data.mapExpand = widget.data.mapExpand ?? {};
                    widget.data.info.socialExpand = widget.data.info.socialExpand ?? {};
                    return gvc.map([
                        `<div class="mt-2"></div>`,
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '左大標題',
                            default: widget.data.info.title,
                            placeHolder: '請輸入左大標題',
                            callback: (text) => {
                                widget.data.info.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '副標題',
                            default: widget.data.info.desc,
                            placeHolder: '請輸入副標題文字',
                            callback: (text) => {
                                widget.data.info.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.info.social,
                            gvc: gvc,
                            title: '社群資訊',
                            array: widget.data.info.social.map((rowData, rowIndex) => {
                                return {
                                    title: `第${rowIndex + 1}列資訊`,
                                    expand: rowData,
                                    innerHtml: gvc.map([
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: rowData.icon,
                                            callback: (text) => {
                                                rowData.icon = text;
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '連結網址',
                                            default: rowData.link,
                                            placeHolder: '請輸入連結網址',
                                            callback: (text) => {
                                                rowData.link = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.info.social.splice(rowIndex, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.info.socialExpand,
                            plus: {
                                title: '添加資訊',
                                event: gvc.event(() => {
                                    widget.data.info.social.push({ icon: "fab fa-instagram", link: "https://www.instagram.com/" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.map,
                            gvc: gvc,
                            title: '中間資訊',
                            array: widget.data.map.map((lineData, index) => {
                                lineData.list.expand = lineData.list.expand ?? {};
                                return {
                                    title: lineData.title ?? `第${index + 1}行資訊`,
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
                                            originalArray: lineData.list,
                                            gvc: gvc,
                                            title: '行內資訊',
                                            array: lineData.list.map((rowData, rowIndex) => {
                                                return {
                                                    title: `第${rowIndex + 1}列資訊`,
                                                    expand: rowData,
                                                    innerHtml: gvc.map([
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
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: '連結網址',
                                                            default: rowData.link,
                                                            placeHolder: '請輸入連結網址',
                                                            callback: (text) => {
                                                                rowData.link = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                    ]),
                                                    minus: gvc.event(() => {
                                                        lineData.list.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: lineData.list.expand,
                                            plus: {
                                                title: '添加區塊',
                                                event: gvc.event(() => {
                                                    lineData.list.push({ name: '', link: "" });
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent: () => {
                                                widget.refreshComponent();
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.map.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.mapExpand,
                            plus: {
                                title: '添加行數',
                                event: gvc.event(() => {
                                    widget.data.map.push({ title: '內容', list: [], expand: true });
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
