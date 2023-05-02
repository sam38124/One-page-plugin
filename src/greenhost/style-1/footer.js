import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            widget.data.outro = widget.data.outro ?? {
                title: "萊恩設計",
                desc: "提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站",
                socialData: {
                    link: [
                        { src: "https://www.facebook.com/", icon: `bx bxl-facebook` },
                        { src: "https://twitter.com/", icon: `bx bxl-twitter` },
                        { src: "https://twitter.com/", icon: `bx bxl-instagram` },
                        { src: "https://twitter.com/", icon: `bx bx-link-alt` }
                    ]
                },
            };
            widget.data.contactInf = widget.data.contactInf ?? {
                inf: [
                    { title: "台中市北屯區後庄北路18號", icon: "far fa-map" },
                    { title: " (886) 0978-028-730", icon: "fas fa-mobile-alt" },
                    { title: "週一至週五 09:00 AM – 19:00 PM", icon: "far fa-clock" },
                    { title: "jianzhi.wang@ncdesign.info", icon: "far fa-envelope" }
                ]
            };
            widget.data.map = widget.data.map ?? [
                {
                    title: "網站導覽",
                    listData: {
                        list: [{ name: "菜單", link: "#menu" },
                            { name: "產品介紹", link: "#feature" },
                            { name: "定價方案", link: "#slider" },
                            { name: "技術領域", link: "#banner" },
                            { name: "公司團隊", link: "#team" }]
                    },
                },
                {
                    title: "推薦網站",
                    listData: {
                        list: [
                            { name: "Google", link: "https://www.google.com.tw/" },
                            { name: "Yahoo", link: "https://tw.yahoo.com/" },
                        ]
                    },
                },
            ];
            widget.data.link = widget.data.link ?? [
                "https://www.facebook.com/",
                "https://twitter.com/",
                "https://www.youtube.com/",
                "https://www.linkedin.com/",
                "https://www.google.com.tw/",
            ];
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    const footer = {
                        subs: widget.data.subs,
                        outro: widget.data.outro,
                        map: widget.data.map,
                        contactInf: widget.data.contactInf,
                        link: widget.data.link
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
        <!-- Footer Start -->
        <div class="container-fluid bg-primary text-white footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
          <div class="container py-5 px-lg-5">
            <div class="row gy-5 gx-4 pt-5">
              <div class="col-12">
                <h5 class="fw-bold text-white mb-4">訂閱電子報</h5>
                <div class="position-relative" style="max-width: 400px;">
                  <input
                    class="form-control bg-white border-0 w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="請輸入你的電子郵件"
                  />
                  <button type="button" class="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2">
                    送出
                  </button>
                </div>
              </div>
              <div class="col-lg-5 col-md-12">
                <div class="row gy-5 g-4">
                  ${glitter.print(function () {
                                var tmp = "";
                                footer.map.map((m) => {
                                    tmp += `<div class="col-md-6">
                        ${glitter.print(function () {
                                        var tmp = `<h5 class="fw-bold text-white mb-4">${m.title}</h5>`;
                                        m.listData.list.map((l) => {
                                            tmp += `<a class="btn btn-link" href="${l.link}" >${l.name}</a>`;
                                        });
                                        return tmp;
                                    })}
                  </div>`;
                                });
                                return tmp;
                            })}
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <h5 class="fw-bold text-white mb-4">聯絡資訊</h5>
                ${glitter.print(function () {
                                var tmp = "";
                                footer.contactInf.inf.map((f) => {
                                    tmp += ` <p class="mb-2"><i class="${f.icon} text-center" style="width:2.5em"></i>${f.title}</p> `;
                                });
                                return tmp;
                            })}
                <div class="d-flex pt-2">
                  ${glitter.print(function () {
                                var tmp = "";
                                footer.link.map((f) => {
                                    tmp += `
                        <a class="btn btn-outline-light btn-social" href="${f}" 
                          ><i class="${ScriptStyle1.urlIcon(f, "fa")}"></i
                        ></a>
                      `;
                                });
                                return tmp;
                            })}
                </div>
              </div>
              <div class="col-md-6 col-lg-4 mt-lg-n5">
                <div class="bg-light rounded" style="padding: 30px;">
                  <input type="text" class="form-control border-0 py-2 mb-2" placeholder="請輸入你的全名" />
                  <input type="email" class="form-control border-0 py-2 mb-2" placeholder="請輸入你的電子郵件" />
                  <textarea class="form-control border-0 mb-2" rows="2" placeholder="請輸入內容"></textarea>
                  <button class="btn btn-primary w-100 py-2">傳送訊息</button>
                </div>
              </div>
            </div>
          </div>
          <div class="container px-lg-5 copyright text-center text-md-end mb-md-0">
            &copy; All Right Reserved. Designed By
            <a role="button" class="border-bottom" href="https://liondesign.tw/glitter/?page=index">Lion Design</a>
          </div>
        </div>
        <a href="#" class="btn btn-lg btn-secondary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
      `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        `<div class="mt-2"></div>`,
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
                                })}` +
                                    Editor.arrayItem({
                                        originalArray: widget.data.outro,
                                        gvc: gvc,
                                        title: '行內資訊',
                                        array: widget.data.contactInf.inf.map((data, index) => {
                                            return {
                                                title: `第${index + 1}個聯絡資訊`,
                                                expand: widget.data.contactInf,
                                                innerHtml: glitter.htmlGenerate.editeInput({
                                                    gvc: gvc,
                                                    title: '聯絡資訊',
                                                    default: data.title,
                                                    placeHolder: `請輸入聯絡資訊`,
                                                    callback: (text) => {
                                                        data.title = text;
                                                        widget.refreshComponent();
                                                    }
                                                }) + Editor.fontawesome({
                                                    gvc: gvc,
                                                    title: '圖示',
                                                    def: data.icon,
                                                    callback: (text) => {
                                                        data.icon = text;
                                                        widget.refreshComponent();
                                                    },
                                                }),
                                                minus: gvc.event(() => {
                                                    widget.data.contactInf.inf.splice(index, 1);
                                                    widget.refreshComponent();
                                                }),
                                            };
                                        }),
                                        expand: widget.data.outro.socialData,
                                        plus: {
                                            title: '添加區塊',
                                            event: gvc.event(() => {
                                                widget.data.contactInf.inf.push({ title: "jianzhi.wang@ncdesign.info", icon: "bx bx-envelope fs-5 m-2" });
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
                                            originalArray: lineData.listData.list,
                                            gvc: gvc,
                                            title: '行內資訊',
                                            array: lineData.listData.list.map((rowData, rowIndex) => {
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
                                                        TriggerEvent.editer(gvc, widget, rowData, {
                                                            hover: true,
                                                            option: [],
                                                            title: "點擊事件"
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
                                        widget.data.map.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加行數',
                                event: gvc.event(() => {
                                    widget.data.map.push({ title: '內容', listData: { list: [] }, expand: true });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        `<div class="mt-2"></div>`
                    ]);
                }
            };
        },
    };
});
