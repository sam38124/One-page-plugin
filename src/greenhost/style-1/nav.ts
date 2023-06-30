import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";

import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {

            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    widget.data.bar=widget.data.bar??[
                        { name: "服務項目", link: "#service" },
                        { name: "產品介紹", link: "#project" },
                        { name: "定價方案", link: "#price" },
                        { name: "聯絡我們", link: "#contact" },
                        {
                            name: "更多內容",
                            list: [
                                { name: "技術與能力", link: "#banner" },
                                { name: "公司團隊", link: "#team" },
                            ],
                        },
                    ]
                    widget.data.moreLink=widget.data.moreLink??[]
                    widget.data.logoStyle=widget.data.logoStyle??{}
                    widget.data.logoTitleStyle=widget.data.logoTitleStyle??{}

                    function search() {
                        return /*html*/ `
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
                        bind:id,
                        view:()=>{
                            const nav = {
                                title: widget.data.title??"萊恩設計",
                                logo: widget.data.logo??ScriptStyle1.getRout("../glitterBundle/img/logo.svg"),
                                bar: [
                                    ...widget.data.bar,
                                ],
                            }
                            if(widget.data.moreLink.length>0){
                                nav.bar.push({
                                    title: "更多內容",
                                    list: [
                                        ...widget.data.moreLink
                                    ],
                                })
                            }
                            return /*html*/ `
        <!-- Spinner Start -->
<!--        <div-->
<!--          id="spinner"-->
<!--          class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"-->
<!--        >-->
<!--          <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">-->
<!--            <span class="sr-only">讀取中...</span>-->
<!--          </div>-->
<!--        </div>-->
        <!-- Spinner End -->

        <!-- Navbar & Hero Start -->
        <div class="container-xxl position-relative p-0">
          <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <a class="navbar-brand p-0" onclick="${gvc.event(()=>{glitter.location.reload()})}" style="cursor:pointer">
              <h1 class="m-0 fs-3"><img src="${nav.logo}" class="me-3" />${nav.title}</h1>
              <!-- <img src="img/logo.png" alt="Logo"> -->
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span class="fa fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav ms-auto py-0">
                ${glitter.print(function () {
                                var tmp = "";
                                console.log(nav)
                                nav.bar.map((n:any) => {
                                    console.log("---------------data---------------")
                                    console.log(n)
                                    if (n.list === undefined) {
                                        tmp += /*html*/ `<a class="nav-item nav-link" href="${n.link}" onclick="">${n.name}</a>`;
                                    } else {
                                        tmp += /*html*/ `
                        <div class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">${n.name}</a>
                          <div class="dropdown-menu m-0">
                            ${glitter.print(function () {
                                            var tmp = "";
                                            n.list.map((l:any) => {
                                                tmp += /*html*/ `
                                  <a class="dropdown-item" href="${l.link}" onclick="">${l.name}</a>
                                `;
                                            });
                                            return tmp;
                                        })}
                          </div>
                        </div>
                      `;
                                    }
                                });
                                return tmp;
                            })}
              </div>
              <button type="button" class="btn text-secondary ms-3" data-bs-toggle="modal" data-bs-target="#searchModal">
                <i class="fa fa-search"></i>
              </button>
              <a href="" class="btn btn-secondary py-2 px-4 ms-3">登入</a>
            </div>
          </nav>
          <div id="keyVision">
            <div class="bg-primary" style="height:6rem"></div>
          </div>
        </div>
        ${search()}
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // Sticky Navbar
                            $(window).scroll(function () {
                                // @ts-ignore
                                if ($(this).scrollTop() > 45) {
                                    $(".navbar").addClass("sticky-top shadow-sm");
                                } else {
                                    $(".navbar").removeClass("sticky-top shadow-sm");
                                }
                            });

                            // Dropdown on mouse hover
                            const $dropdown = $(".dropdown");
                            const $dropdownToggle = $(".dropdown-toggle");
                            const $dropdownMenu = $(".dropdown-menu");
                            const showClass = "show";

                            $(window).on("load resize", function () {
                                if (this.matchMedia("(min-width: 992px)").matches) {
                                    $dropdown.hover(
                                        function () {
                                            const $this = $(this);
                                            $this.addClass(showClass);
                                            $this.find($dropdownToggle).attr("aria-expanded", "true");
                                            $this.find($dropdownMenu).addClass(showClass);
                                        },
                                        function () {
                                            const $this = $(this);
                                            $this.removeClass(showClass);
                                            $this.find($dropdownToggle).attr("aria-expanded", "false");
                                            $this.find($dropdownMenu).removeClass(showClass);
                                        }
                                    );
                                } else {
                                    $dropdown.off("mouseenter mouseleave");
                                }
                            });
                        }

                    })
                },
                editor:()=>{
                    widget.data.logoExpand= widget.data.logoExpand??{}
                    widget.data.linkExpand= widget.data.linkExpand??{}
                    widget.data.moreLinkExpand= widget.data.moreLinkExpand??{}
                    return gvc.map([
                        `<div class="mt-3" style=""></div>`,
                        Editor.toggleExpand({
                            gvc:gvc,
                            title:"Logo區塊",
                            data:widget.data.logoExpand,
                            innerText:()=>{
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
                                    glitter.htmlGenerate.styleEditor(widget.data.logoStyle).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },"圖片設計樣式"),
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
                                    glitter.htmlGenerate.styleEditor(widget.data.logoTitleStyle).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },"標題設計樣式")
                                ])
                            }
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.bar,
                            gvc: gvc,
                            title: '主要導覽列',
                            array: widget.data.bar.map((BARData: any, index: number) => {

                                return {
                                    title: BARData.title || `連結:${index + 1}`,
                                    expand: BARData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '連結名稱',
                                            default: BARData.title,
                                            placeHolder: '請描述此連結的顯示資訊',
                                            callback: (text) => {
                                                BARData.title = text;
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
                                    widget.data.bar.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.moreLink,
                            gvc: gvc,
                            title: '更多內容',
                            array: widget.data.moreLink.map((hiddenData: any, index: number) => {
                                return {
                                    title: hiddenData.title||`連結:${index + 1}`,
                                    expand: hiddenData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '連結名稱',
                                            default: hiddenData.title,
                                            placeHolder: '請描述此連結的顯示資訊',
                                            callback: (text) => {
                                                hiddenData.title = text;
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
                                    widget.data.moreLink.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),

                    ])

                }
            }
        },
    }
})