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
                    widget.data.bar = widget.data.bar ?? [
                        { name: "關於我們", link: "#about" },
                        { name: "產品特色", link: "#feature" },
                        { name: "聯絡我們", link: "#contact" },
                        { name: "服務範圍", link: "#service" },
                    ];
                    widget.data.moreLink = widget.data.moreLink ?? [
                        { name: "公司團隊", link: "#team" },
                        { name: "常見問題", link: "#faq" },
                        { name: "作品案例", link: "#project" }
                    ];
                    widget.data.logoStyle = widget.data.logoStyle ?? {};
                    widget.data.logoTitleStyle = widget.data.logoTitleStyle ?? {};
                    function search() {
                        return `
        <!-- Full Screen Search Start -->
        <div class="modal fade" id="searchModal" tabindex="-1">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content" style="background: rgba(29, 40, 51, 0.8);">
              <div class="modal-header border-0">
                <button type="button" class="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body d-flex align-items-center justify-content-center">
                <div class="input-group" style="max-width: 600px;">
                  <input type="text" class="form-control bg-transparent border-light p-3 text-white" placeholder="輸入搜尋關鍵字" />
                  <button class="btn btn-light px-4"><i class="bi bi-search"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Full Screen Search End -->
      `;
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            const nav = {
                                title: widget.data.title ?? "萊恩設計",
                                logo: widget.data.logo ?? ScriptStyle1.getRout("../glitterBundle/img/logo.svg"),
                                bar: [
                                    ...widget.data.bar,
                                ],
                            };
                            if (widget.data.moreLink.length > 0) {
                                nav.bar.push({
                                    name: "更多內容",
                                    list: [
                                        ...widget.data.moreLink
                                    ],
                                });
                            }
                            return `<!-- ======= Header ======= -->
        <header id="header" class="fixed-top d-flex align-items-center">
          <div class="container d-flex justify-content-between">
            <div class="d-flex logo" onclick="${gvc.event(() => { glitter.location.reload(); })}" style="cursor:pointer">
              <img src="${nav.logo}" alt="" class="img-fluid me-3" />
              <h1 class="me-auto me-lg-0"><a>${nav.title}</a></h1>
            </div>

            <nav id="navbar" class="navbar">
              <ul>
                ${glitter.print(function () {
                                var tmp = "";
                                nav.bar.map((b) => (tmp += ScriptStyle1.recursive(b, true)));
                                return tmp;
                            })}
              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
            <!-- .navbar -->
          </div>
        </header>
        <!-- End Header -->`;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    widget.data.logoExpand = widget.data.logoExpand ?? {};
                    widget.data.linkExpand = widget.data.linkExpand ?? {};
                    widget.data.moreLinkExpand = widget.data.moreLinkExpand ?? {};
                    return gvc.map([
                        `<div class="mt-3" style=""></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: "Logo區塊",
                            data: widget.data.logoExpand,
                            innerText: () => {
                                return gvc.map([
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: `圖片`,
                                        def: widget.data.logo,
                                        callback: (e) => {
                                            widget.data.logo = e;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.styleEditor(widget.data.logoStyle).editor(gvc, () => {
                                        widget.refreshComponent();
                                    }, "圖片設計樣式"),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '標題',
                                        default: widget.data.title ?? '',
                                        placeHolder: '請輸入標題',
                                        callback: (text) => {
                                            widget.data.title = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.styleEditor(widget.data.logoTitleStyle).editor(gvc, () => {
                                        widget.refreshComponent();
                                    }, "標題設計樣式")
                                ]);
                            }
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.bar,
                            gvc: gvc,
                            title: '主要導覽列',
                            array: widget.data.bar.map((BARData, index) => {
                                return {
                                    title: BARData.name || `連結:${index + 1}`,
                                    expand: BARData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '連結名稱',
                                            default: BARData.name,
                                            placeHolder: '請描述此連結的顯示資訊',
                                            callback: (text) => {
                                                BARData.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        TriggerEvent.editer(gvc, widget, BARData, {
                                            hover: true,
                                            option: [],
                                            title: "點擊事件"
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.bar.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.linkExpand,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.bar.push({ name: "關於我們", link: "#about" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.moreLink,
                            gvc: gvc,
                            title: '更多內容',
                            array: widget.data.moreLink.map((hiddenData, index) => {
                                return {
                                    title: hiddenData.name || `連結:${index + 1}`,
                                    expand: hiddenData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '連結名稱',
                                            default: hiddenData.name,
                                            placeHolder: '請描述此連結的顯示資訊',
                                            callback: (text) => {
                                                hiddenData.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        TriggerEvent.editer(gvc, widget, hiddenData, {
                                            hover: true,
                                            option: [],
                                            title: "點擊事件"
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.moreLink.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.moreLinkExpand,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.moreLink.push({ name: "關於我們", link: "#about" });
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
