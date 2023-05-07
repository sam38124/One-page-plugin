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
                    let plans = {
                        title: widget.data.title ?? "RWD響應式網頁 · SEO關鍵字搜尋 · 萊恩設計專業客製",
                        desc: widget.data.desc ?? "社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站",
                        dataList: widget.data.dataList ?? {
                            list: [
                                {
                                    title: "A方案",
                                    desc: "基本方案，最基本的開發環境",
                                    detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
                                    price: "$249元／每月",
                                    btn: { name: "選擇方案", link: "#" },
                                    expand: {}
                                },
                                {
                                    title: "B方案",
                                    desc: "黃金方案，提供多個開發需求與一個 WEB 視覺設計",
                                    detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C" }],
                                    price: "$399元／每月",
                                    btn: { name: "選擇方案", link: "#" },
                                    expand: {}
                                },
                                {
                                    title: "C方案",
                                    desc: "白金方案，個性化開法與 APP 雙平台的上架",
                                    detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
                                    price: "$799元／每月",
                                    btn: { name: "選擇方案", link: "#" },
                                    expand: {}
                                },
                            ]
                        },
                    };
                    if (!widget.data.dataList) {
                        widget.data.dataList = plans.dataList;
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
        <section class="plans d-flex align-items-center py-5" id="plans">
          <div class="container text-light">
            <div class="text-center pb-4">
              <p class="mb-3">我們的定價方案</p>
              <h2 class="py-2">${plans.title}</h2>
              <p class="para-light">${plans.desc}</p>
            </div>
            <div class="row gy-4" data-aos="zoom-in">
              ${glitter.print(function () {
                                var tmp = "";
                                plans.dataList.list.map((p) => {
                                    tmp += `
                    <div class="col-lg-4">
                      <div class="card bg-transparent px-4">
                        <h4 class="py-2">${p.title}</h4>
                        <p class="py-3">${p.desc}</p>
                        ${glitter.print(function () {
                                        var tmp = "";
                                        p.detail.map((t) => {
                                            tmp += `
                              <div class="mt-2 block d-flex align-items-center">
                                <p class="pe-2 text-center" style="width:2em">
                                  ${t.not
                                                ? `<i class="fas fa-times fa-1x" style="color:#ff4a4a"></i>`
                                                : `<i class="fas fa-check fa-1x" style="color:#45ee81"></i>`}
                                </p>
                                <p>${t.text}</p>
                              </div>
                            `;
                                        });
                                        return tmp;
                                    })}
                        <h4 class="py-3">${p.price}</h4>
                        <div class="my-3">
                          <a class="btn" href="${p.btn.link}">${p.btn.name}</a>
                        </div>
                      </div>
                    </div>
                  `;
                                });
                                return tmp;
                            })}
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
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
                            placeHolder: '輸入副標題名稱',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.dataList,
                            gvc: gvc,
                            title: '方案內容',
                            array: widget.data.dataList.list.map((dd, index) => {
                                dd.detailExpand = dd.detailExpand ?? {};
                                return {
                                    title: `方案${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
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
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `副標題`,
                                            default: dd.desc,
                                            placeHolder: '輸入副標題名稱',
                                            callback: (text) => {
                                                dd.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: dd.icon,
                                            callback: (text) => {
                                                dd.icon = text;
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `價格`,
                                            default: dd.price.num,
                                            placeHolder: '請輸入價格',
                                            callback: (text) => {
                                                dd.price.num = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `收費方案單位`,
                                            default: dd.price.unit,
                                            placeHolder: '請輸入時間單位(年/月/日)',
                                            callback: (text) => {
                                                dd.price.unit = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `按鍵名稱`,
                                            default: dd.btn.name,
                                            placeHolder: '請輸入按鍵呈現的名稱',
                                            callback: (text) => {
                                                dd.btn.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `連結`,
                                            default: dd.btn.link,
                                            placeHolder: '輸入連結網址',
                                            callback: (text) => {
                                                dd.btn.link = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.arrayItem({
                                            originalArray: dd.detail,
                                            gvc: gvc,
                                            title: '功能列表',
                                            array: dd.detail.map((fun, index) => {
                                                return {
                                                    title: `功能:${index + 1}`,
                                                    expand: fun,
                                                    innerHtml: gvc.map([
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `方案`,
                                                            default: fun.text,
                                                            placeHolder: '輸入方案名稱',
                                                            callback: (text) => {
                                                                fun.text = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                        Editor.select({
                                                            title: '畫線',
                                                            gvc: gvc,
                                                            def: fun.not ? `true` : `false`,
                                                            callback: (text) => {
                                                                fun.not = text === 'true';
                                                                widget.refreshComponent();
                                                            },
                                                            array: ['true', 'false'],
                                                        }),
                                                    ]),
                                                    minus: gvc.event(() => {
                                                        dd.detail.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: dd.detailExpand,
                                            plus: {
                                                title: '添加功能',
                                                event: gvc.event(() => {
                                                    dd.detail.push({ text: "功能 B", not: true });
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
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({
                                        title: "C方案",
                                        desc: "白金方案，個性化開法與 APP 雙平台的上架",
                                        detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
                                        price: "$799元／每月",
                                        btn: { name: "選擇方案", link: ["#"] },
                                        expand: {}
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
