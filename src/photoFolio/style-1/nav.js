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
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            const nav = {
                                title: widget.data.title ?? "PhotoFolio",
                                logo: widget.data.logo ?? "bi bi-camera",
                                bar: widget.data.bar ?? [
                                    {
                                        title: "HOME",
                                        click: {}
                                    },
                                    {
                                        title: "ABOUT",
                                        click: {}
                                    },
                                    {
                                        title: "GALLERY",
                                        click: {},
                                        list: [
                                            {
                                                title: "Nature",
                                                click: {},
                                            },
                                            {
                                                title: "People",
                                                click: {},
                                            },
                                            {
                                                title: "Architecture",
                                                click: {},
                                            },
                                            {
                                                title: "Animals",
                                                click: {},
                                            },
                                            {
                                                title: "Sports",
                                                click: {},
                                            },
                                            {
                                                title: "Travel",
                                                click: {},
                                            },
                                            {
                                                title: "Sub Menu",
                                                click: {},
                                                list: [
                                                    {
                                                        title: "Sub Menu 1",
                                                        click: {},
                                                    },
                                                    {
                                                        title: "Sub Menu 2",
                                                        click: {},
                                                    },
                                                    {
                                                        title: "Sub Menu 3",
                                                        click: {},
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        title: "SERVICES",
                                        click: {}
                                    },
                                    {
                                        title: "CONTACT",
                                        click: {}
                                    },
                                ],
                                socialLink: widget.data.socialLink ?? {
                                    link: [
                                        {
                                            src: "https://twitter.com/",
                                            icon: "bi bi-twitter"
                                        },
                                        {
                                            src: "https://facebook.com/",
                                            icon: "bi bi-facebook"
                                        },
                                        {
                                            src: "https://instagram.com/",
                                            icon: "bi bi-instagram"
                                        },
                                        {
                                            src: "https://linkedin.com/",
                                            icon: "bi bi-linkedin"
                                        }
                                    ]
                                }
                            };
                            widget.data = nav;
                            return `
                                <!-- ======= Header ======= -->
                              <header id="header" class="header d-flex align-items-center fixed-top">
                                <div class="container-fluid d-flex align-items-center justify-content-between">                            
                                  <a href="index.html" class="logo d-flex align-items-center  me-auto me-lg-0">
                                    <!-- Uncomment the line below if you also wish to use an image logo -->
               
                                    ${(() => {
                                if (nav.logo == "bi bi-camera") {
                                    return `<i class="${nav.logo}"></i>`;
                                }
                                else {
                                    return `<img style="" src="${nav.logo}">`;
                                }
                            })()}
                                    <h1>${nav.title}</h1>
                                  </a>
                            
                                  <nav id="navbar" class="navbar">
                                    <ul>
                                        ${(() => {
                                let text = "";
                                nav.bar.map((rowData, index) => {
                                    text += ScriptStyle1.recursive(gvc, widget, rowData, true);
                                });
                                return text;
                            })()}
                                  
                                    </ul>
                                  </nav><!-- .navbar -->
                            
                                  <div class="header-social-links">
                                    ${(() => {
                                let html = '';
                                nav.socialLink.link.map((link, index) => {
                                    html += `
                                                <a href="${link.src}" class=""><i class="${link.icon}"></i></a>
                                            `;
                                });
                                return html;
                            })()}                         
                                  </div>
                                  <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
                                  <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
                            
                                </div>
                              </header><!-- End Header -->
                            `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
                    widget.data.barExpand = widget.data.barExpand ?? {};
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
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '預覽圖片1',
                            def: widget.data.logo,
                            callback: (data) => {
                                widget.data.logo = data;
                                widget.refreshComponent();
                            }
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.bar,
                            gvc: gvc,
                            title: '連結區塊',
                            array: widget.data.bar.map((dd, index) => {
                                return {
                                    title: dd.title ?? `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.title,
                                            placeHolder: '輸入標題文字',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.select({
                                            title: `白色凸顯`,
                                            gvc: gvc,
                                            def: dd.highlight ?? "false",
                                            array: [
                                                {
                                                    title: '是',
                                                    value: `true`,
                                                },
                                                {
                                                    title: '否',
                                                    value: `false`,
                                                },
                                            ],
                                            callback: (text) => {
                                                dd.highlight = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        TriggerEvent.editer(gvc, widget, dd.click, {
                                            hover: true,
                                            option: [],
                                            title: "點擊事件"
                                        }),
                                        `${(() => {
                                            if (dd?.list) {
                                                dd.listExpand = dd.listExpand ?? {};
                                                return Editor.arrayItem({
                                                    originalArray: dd.list,
                                                    gvc: gvc,
                                                    title: '連結分區塊',
                                                    array: dd.list.map((dd, index) => {
                                                        return {
                                                            title: dd.title ?? `區塊:${index + 1}`,
                                                            expand: dd,
                                                            innerHtml: gvc.map([
                                                                glitter.htmlGenerate.editeInput({
                                                                    gvc: gvc,
                                                                    title: `標題`,
                                                                    default: dd.title,
                                                                    placeHolder: '輸入標題文字',
                                                                    callback: (text) => {
                                                                        dd.title = text;
                                                                        widget.refreshComponent();
                                                                    },
                                                                }),
                                                                TriggerEvent.editer(gvc, widget, dd.click, {
                                                                    hover: true,
                                                                    option: [],
                                                                    title: "點擊事件"
                                                                }),
                                                                `${(() => {
                                                                    if (dd?.list) {
                                                                        dd.listExpand = dd.listExpand ?? {};
                                                                        return Editor.arrayItem({
                                                                            originalArray: dd.list,
                                                                            gvc: gvc,
                                                                            title: '連結子區塊',
                                                                            array: dd.list.map((dd, index) => {
                                                                                return {
                                                                                    title: dd.title ?? `區塊:${index + 1}`,
                                                                                    expand: dd,
                                                                                    innerHtml: gvc.map([
                                                                                        glitter.htmlGenerate.editeInput({
                                                                                            gvc: gvc,
                                                                                            title: `標題`,
                                                                                            default: dd.title,
                                                                                            placeHolder: '輸入標題文字',
                                                                                            callback: (text) => {
                                                                                                dd.title = text;
                                                                                                widget.refreshComponent();
                                                                                            },
                                                                                        }),
                                                                                        TriggerEvent.editer(gvc, widget, dd.click, {
                                                                                            hover: true,
                                                                                            option: [],
                                                                                            title: "點擊事件"
                                                                                        }),
                                                                                    ]),
                                                                                    minus: gvc.event(() => {
                                                                                        widget.data.bar.splice(index, 1);
                                                                                        widget.refreshComponent();
                                                                                    }),
                                                                                };
                                                                            }),
                                                                            expand: dd.listExpand,
                                                                            plus: {
                                                                                title: '添加區塊',
                                                                                event: gvc.event(() => {
                                                                                    dd.list.push({
                                                                                        title: "HOME",
                                                                                        click: {}
                                                                                    });
                                                                                    widget.refreshComponent();
                                                                                }),
                                                                            },
                                                                            refreshComponent: () => {
                                                                                widget.refreshComponent();
                                                                            }
                                                                        });
                                                                    }
                                                                    return ``;
                                                                })()}`
                                                            ]),
                                                            minus: gvc.event(() => {
                                                                widget.data.bar.splice(index, 1);
                                                                widget.refreshComponent();
                                                            }),
                                                        };
                                                    }),
                                                    expand: dd.listExpand,
                                                    plus: {
                                                        title: '添加區塊',
                                                        event: gvc.event(() => {
                                                            dd.list.push({
                                                                title: "HOME",
                                                                click: {}
                                                            });
                                                            widget.refreshComponent();
                                                        }),
                                                    },
                                                    refreshComponent: () => {
                                                        widget.refreshComponent();
                                                    }
                                                });
                                            }
                                            else {
                                                return ``;
                                            }
                                        })()}`
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.bar.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.barExpand,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.bar.push({
                                        title: "HOME",
                                        click: {}
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.socialLink.link,
                            gvc: gvc,
                            title: '社群網址',
                            array: widget.data.socialLink.link.map((dd, index) => {
                                return {
                                    title: `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `連結網址`,
                                            default: dd.src,
                                            placeHolder: '輸入網址',
                                            callback: (text) => {
                                                dd.src = text;
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
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.socialLink.link.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.socialLink,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.socialLink.link.push({
                                        src: "https://twitter.com/",
                                        icon: "bi bi-twitter"
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
