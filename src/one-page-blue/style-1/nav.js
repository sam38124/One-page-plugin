import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
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
                            const nav = {
                                title: widget.data.title ?? "萊恩設計",
                                logo: widget.data.logo ?? ScriptStyle1.getRout('./img/homeMark.svg'),
                                bar: widget.data.bar ?? [
                                    { title: "菜單", link: "#menu" },
                                    { title: "產品介紹", link: "#feature" },
                                    { title: "定價方案", link: "#slider" },
                                    { title: "聯絡我們", link: "#contact" },
                                    {
                                        title: "更多內容",
                                        list: [
                                            { title: "技術領域", link: "#banner" },
                                            { title: "公司團隊", link: "#team" },
                                        ],
                                    },
                                ],
                                social: widget.data.social ?? {
                                    links: [{ link: "https://www.facebook.com/" }, { link: "https://twitter.com/" }, { link: "https://www.instagram.com/" }, { link: "https://squarestudio.tw/" }]
                                }
                            };
                            if (!widget.data.title) {
                                widget.data = nav;
                            }
                            return `<!-- ======= Header ======= -->
                              <header id="header" class="fixed-top d-flex align-items-center">
                                <div class="container d-flex align-items-center justify-content-between">
                                  <div class="logo d-flex align-items-center" onclick="${gvc.event(() => { glitter.location.reload(); })}" style="cursor:pointer">
                                      <img src="${nav.logo}" alt="" class="img-fluid me-3" />
                                      <h1 style="width:12rem"><a>${nav.title}</a></h1>
                                  </div>
                            
                                  <nav id="navbar" class="navbar order-last order-lg-0">
                                    <ul>
                                      ${glitter.print(function () {
                                let tmp = "";
                                nav.bar.map((r) => (tmp += ScriptStyle1.recursive(r, 1)));
                                return tmp;
                            })}
                                    </ul>
                                    <i class="bi bi-list mobile-nav-toggle"></i>
                                  </nav><!-- .navbar -->
                            
                                  <div class="header-social-links d-flex align-items-center">
                                      ${glitter.print(function () {
                                let tmp = "";
                                nav.social.links.map((linkData) => {
                                    tmp += `
                                              <a class="facebbok" onclick="${gvc.event(() => { linkData.click; })}" style="cursor:pointer"
                                                ><i class="${ScriptStyle1.urlIcon(linkData.link, "bi")}"></i
                                              ></a>`;
                                });
                                return tmp;
                            })}
                                  </div>
                            
                                </div>
                              </header><!-- End Header -->`;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                            function select(el, all = false) {
                                el = el.trim();
                                if (all) {
                                    return [...document.querySelectorAll(el)];
                                }
                                else {
                                    return document.querySelector(el);
                                }
                            }
                            function on(type, el, listener, all = false) {
                                let selectEl = select(el, all);
                                if (selectEl) {
                                    if (all) {
                                        selectEl.forEach((e) => e.addEventListener(type, listener));
                                    }
                                    else {
                                        selectEl.addEventListener(type, listener);
                                    }
                                }
                            }
                            function scrollto(el) {
                                let header = select("#header");
                                let offset = header.offsetHeight;
                                let elementPos = select(el).offsetTop;
                                window.scrollTo({
                                    top: elementPos - offset,
                                    behavior: "smooth",
                                });
                            }
                            function onscroll(el, listener) {
                                el.addEventListener("scroll", listener);
                            }
                            on("click", ".mobile-nav-toggle", function (e) {
                                select("#navbar").classList.toggle("navbar-mobile");
                                document.querySelector('#navbar').classList.toggle("navbar-mobile");
                                console.log(e.classList);
                            });
                            on("click", ".navbar .dropdown > a", function (e) {
                                if (select("#navbar").classList.contains("navbar-mobile")) {
                                    e.preventDefault();
                                    select("#navbar").nextElementSibling.classList.toggle("dropdown-active");
                                }
                            }, true);
                            let navbarlinks = select("#navbar .scrollto", true);
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
                            onscroll(document, navbarlinksActive);
                            on("click", ".scrollto", function (e) {
                                if (e.data("hash")) {
                                    e.preventDefault();
                                    let navbar = select("#navbar");
                                    if (navbar.classList.contains("navbar-mobile")) {
                                        navbar.classList.remove("navbar-mobile");
                                        let navbarToggle = select(".mobile-nav-toggle");
                                        navbarToggle.classList.toggle("bi-list");
                                        navbarToggle.classList.toggle("bi-x");
                                    }
                                    scrollto(e.data("hash"));
                                }
                            }, true);
                        }
                    });
                },
                editor: () => {
                    return ``;
                    return gvc.map([
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `Logo圖片`,
                            def: widget.data.logo,
                            callback: (e) => {
                                widget.data.logo = e;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '公司名稱',
                            default: widget.data.title ?? '',
                            placeHolder: '請輸入公司名稱',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        `<div class="mt-3"></div>`,
                        Editor.arrayItem({
                            originalArray: widget.data.list,
                            gvc: gvc,
                            title: '主要導覽列',
                            array: widget.data.bar.map((BARData, index) => {
                                return {
                                    title: `連結:${index + 1}`,
                                    expand: widget.data.bar,
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
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.bar.push({ title: "客製化設定", link: "#" });
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
                                    title: `連結:${index + 1}`,
                                    expand: widget.data.moreLink,
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
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.list.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
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
