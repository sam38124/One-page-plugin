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
                        { name: "關於我們", link: ["about"] },
                        { name: "服務項目", link: ["services"] },
                        { name: "公司作品", link: ["work"] },
                    ];
                    widget.data.moreLink = widget.data.moreLink ?? [
                        { name: "定價方案", link: ["plans"] },
                        { name: "客戶評價", link: ["test"] },
                        { name: "聯絡我們", link: ["contact"] }
                    ];
                    widget.data.stack = widget.data.stack ?? [
                        { icon: "fa-facebook-f", link: "https://www.facebook.com/" },
                        { icon: "fa-twitter", link: "https://twitter.com/" },
                    ];
                    widget.data.logoStyle = widget.data.logoStyle ?? {};
                    widget.data.btn = widget.data.btn ?? { name: "登入", link: "#" };
                    widget.data.logoTitleStyle = widget.data.logoTitleStyle ?? {};
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
                                btn: widget.data.btn,
                                stack: widget.data.stack
                            };
                            if (widget.data.moreLink.length > 0) {
                                nav.bar.push({
                                    name: "更多內容",
                                    list: [
                                        ...widget.data.moreLink
                                    ],
                                });
                            }
                            return ` <nav id="navbar" class="navbar navbar-expand-lg fixed-top navbar-dark" aria-label="Main navigation">
        <div class="container">
          <!-- Image Logo -->
          <a class="navbar-brand logo-image" onclick="${gvc.event(() => { glitter.location.reload(); })}" style="cursor:pointer">
            <img src="${nav.logo}" />
          </a>
          <a class="navbar-brand logo-text" onclick="${gvc.event(() => { glitter.location.reload(); })}" style="cursor:pointer"> ${nav.title} </a>

          <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ms-auto navbar-nav-scroll">
              ${glitter.print(function () {
                                var HTML = "";
                                nav.bar.map((b) => {
                                    if (b.list === undefined) {
                                        HTML += `
                      <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="${b.link}">${b.name}</a>
                      </li>
                    `;
                                    }
                                    else {
                                        HTML += `<li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false" href="#"
                        >${b.name}</a
                      >
                      <ul class="dropdown-menu" aria-labelledby="dropdown01">
                        ${glitter.print(function () {
                                            var HTML = "";
                                            b.list.map((l, index) => {
                                                HTML += `
                              <li><a class="dropdown-item" href="${l.link}">${l.name}</a></li>
                              ${b.list.length == index + 1 ? `` : `<li><div class="dropdown-divider"></div></li>`}
                            `;
                                            });
                                            return HTML;
                                        })}
                      </ul>
                    </li>`;
                                    }
                                });
                                return HTML;
                            })}
            </ul>
            <span class="nav-item social-icons">
              ${glitter.print(function () {
                                var HTML = "";
                                nav.stack.map((s) => {
                                    HTML += `
                    <span class="fa-stack">
                      <a href="${s.link}">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab ${s.icon} fa-stack-1x"></i>
                      </a>
                    </span>
                  `;
                                });
                                return HTML;
                            })}
            </span>
          </div>
          <!-- end of navbar-collapse -->
        </div>
        <!-- end of container -->
      </nav>`;
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
