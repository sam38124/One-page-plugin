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
                    widget.data.title = widget.data.title ?? "服務介紹";
                    widget.data.desc = widget.data.desc ?? "萊恩設計有能力製作多種設計、多功能的單頁式網站或系統軟體";
                    widget.data.placeholder = widget.data.placeholder ?? "輸入想了解的服務";
                    widget.data.list = widget.data.list ?? [
                        { name: "社群平台", text: "$45,000" },
                        { name: "電商網站", text: "$38,900" },
                        { name: "個人部落格", text: "$35,900" },
                        { name: "企業管理", text: "$100,000" },
                        { name: "資料視覺化", text: "$59,800" },
                        { name: "線上課程", text: "$42,000" },
                    ];
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let domain = {
                                title: widget.data.title,
                                desc: widget.data.desc,
                                placeholder: widget.data.placeholder,
                                list: widget.data.list,
                            };
                            return `
        <!-- Domain Search Start -->
        <div class="container-xxl domain mb-5" style="margin-top: 90px;">
          <div class="container px-lg-5">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div
                  class="section-title position-relative text-center mx-auto mb-4 pb-4 wow fadeInUp"
                  data-wow-delay="0.1s"
                  style="max-width: 600px;"
                >
                  <h1 class="mb-3">${domain.title}</h1>
                  <p class="mb-1">${domain.desc}</p>
                </div>
                <div class="position-relative w-100 my-3 wow fadeInUp" data-wow-delay="0.3s">
                  <input class="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="${domain.placeholder}" />
                  <button type="button" class="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2">
                    搜尋
                  </button>
                </div>
                <div class="row g-3 mt-2 wow fadeInUp" data-wow-delay="0.5s">
                  ${glitter.print(function () {
                                var tmp = "";
                                domain.list.map((l) => {
                                    tmp += `
                        <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                          <h5 class="fw-bold text-primary mb-1">${l.name}</h5>
                          <p class="mb-0">${l.text}</p>
                        </div>
                      `;
                                });
                                return tmp;
                            })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Domain Search End -->
      `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title ?? '',
                            placeHolder: '請輸入標題文字',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '副標題',
                            default: widget.data.desc ?? '',
                            placeHolder: '請輸入副標題文字',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '搜尋欄的預設文字',
                            default: widget.data.placeholder ?? '',
                            placeHolder: '請輸入預設文字',
                            callback: (text) => {
                                widget.data.placeholder = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.list,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.list.map((dd, index) => {
                                return {
                                    title: dd.title || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `索引`,
                                            default: dd.name,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `文字`,
                                            default: dd.text,
                                            placeHolder: '輸入方案價格',
                                            callback: (text) => {
                                                dd.text = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.list.push({ name: "線上課程", text: "$42,000" });
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
