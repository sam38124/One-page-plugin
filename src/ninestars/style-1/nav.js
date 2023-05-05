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
                        { title: "服務項目", link: "#service" },
                        { title: "產品介紹", link: "#project" },
                        { title: "定價方案", link: "#price" },
                        { title: "聯絡我們", link: "#contact" },
                    ];
                    widget.data.moreLink = widget.data.moreLink ?? [
                        { title: "技術與能力", link: "#banner" },
                        { title: "公司團隊", link: "#team" },
                    ];
                    widget.data.logoStyle = widget.data.logoStyle ?? {};
                    widget.data.btn = widget.data.btn ?? { name: "登入", link: "#" };
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
                            console.log(widget.data);
                            const nav = {
                                title: widget.data.title ?? "萊恩設計",
                                logo: widget.data.logo ?? ScriptStyle1.getRout("../glitterBundle/img/logo.svg"),
                                bar: [
                                    ...widget.data.bar,
                                ],
                                btn: widget.data.btn
                            };
                            if (widget.data.moreLink.length > 0) {
                                nav.bar.push({
                                    title: "更多內容",
                                    list: [
                                        ...widget.data.moreLink
                                    ],
                                });
                            }
                            return ` <!-- ======= Header ======= -->
        <header id="header" class="fixed-top d-flex align-items-center">
          <div class="container d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center logo" onclick="${gvc.event(() => { glitter.location.reload(); })}" style="cursor:pointer">
              <img src="${nav.logo}" alt="logo" class="img-fluid me-3" />
              <h1><a>${nav.title}</a></h1>
            </div>

            <nav id="navbar" class="navbar">
              <ul>
                ${glitter.print(function () {
                                var tmp = "";
                                nav.bar.map((b) => (tmp += ScriptStyle1.recursive(b, true)));
                                return tmp;
                            })}
                ${nav.btn
                                ? `<li>
                      <a class="getstarted scrollto" href="${nav.btn.link}" style="cursor:pointer"
                        >${nav.btn.name}</a
                      >
                    </li>`
                                : ``}
              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
            <!-- .navbar -->
          </div>
        </header>
        <!-- End Header -->`;
                        }, divCreate: {},
                        onCreate: () => {
                            const selectHeader = document.querySelector("#header");
                            if (selectHeader) {
                                document.addEventListener("scroll", () => {
                                    window.scrollY > 100 ? selectHeader.classList.add("sticked") : selectHeader.classList.remove("sticked");
                                });
                            }
                            let navbarlinks = document.querySelectorAll("#navbar .scrollto");
                            function navbarlinksActive() {
                                navbarlinks.forEach((navbarlink) => {
                                    if (!$(navbarlink).data("hash"))
                                        return;
                                    let section = document.querySelector($(navbarlink).data("hash"));
                                    if (!section)
                                        return;
                                    let position = window.scrollY;
                                    if ($(navbarlink).data("hash") != "#header")
                                        position += 200;
                                    if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
                                        navbarlink.classList.add("active");
                                    }
                                    else {
                                        navbarlink.classList.remove("active");
                                    }
                                });
                            }
                            window.addEventListener("load", navbarlinksActive);
                            document.addEventListener("scroll", navbarlinksActive);
                            function scrollto(el) {
                                const selectHeader = document.querySelector("#header");
                                let offset = 0;
                                if (selectHeader.classList.contains("sticked")) {
                                    offset = document.querySelector("#header.sticked").offsetHeight;
                                }
                                else if (selectHeader.hasAttribute("data-scrollto-offset")) {
                                    offset = selectHeader.offsetHeight - parseInt(selectHeader.getAttribute("data-scrollto-offset"));
                                }
                                window.scrollTo({
                                    top: document.querySelector(el).offsetTop - offset,
                                    behavior: "smooth",
                                });
                            }
                            let selectScrollto = document.querySelectorAll(".scrollto");
                            selectScrollto.forEach((el) => el.addEventListener("click", function (event) {
                                if (document.querySelector($(this).data("hash"))) {
                                    event.preventDefault();
                                    let mobileNavActive = document.querySelector(".mobile-nav-active");
                                    if (mobileNavActive) {
                                        mobileNavActive.classList.remove("mobile-nav-active");
                                        let navbarToggle = document.querySelector(".mobile-nav-toggle");
                                        navbarToggle.classList.toggle("bi-list");
                                        navbarToggle.classList.toggle("bi-x");
                                    }
                                    scrollto($(this).data("hash"));
                                }
                            }));
                            window.addEventListener("load", () => {
                                if (window.location.hash) {
                                    if (document.querySelector(window.location.hash)) {
                                        scrollto(window.location.hash);
                                    }
                                }
                            });
                            const mobileNavToogle = document.querySelector(".mobile-nav-toggle");
                            if (mobileNavToogle) {
                                mobileNavToogle.addEventListener("click", function (event) {
                                    event.preventDefault();
                                    document.querySelector("body").classList.toggle("mobile-nav-active");
                                    this.classList.toggle("bi-list");
                                    this.classList.toggle("bi-x");
                                });
                            }
                            const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");
                            navDropdowns.forEach((el) => {
                                el.addEventListener("click", function (event) {
                                    if (document.querySelector(".mobile-nav-active")) {
                                        event.preventDefault();
                                        this.classList.toggle("active");
                                        this.nextElementSibling.classList.toggle("dropdown-active");
                                        let dropDownIndicator = this.querySelector(".dropdown-indicator");
                                        dropDownIndicator.classList.toggle("bi-chevron-up");
                                        dropDownIndicator.classList.toggle("bi-chevron-down");
                                    }
                                });
                            });
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
                                    title: hiddenData.title || `連結:${index + 1}`,
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
