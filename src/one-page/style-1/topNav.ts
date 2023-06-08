import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {

            widget.data.headerLayout = widget.data.headerLayout ?? {}
            widget.data.nav = widget.data.nav ?? {};
            widget.data.nav.logo = widget.data.nav.logo ?? {
                url: `https://squarestudio.tw/LionDesign/page/plugin/lionDesign/img/index/logo.svg`,
                style:  '',
            };
            widget.data.nav.title = widget.data.nav.title ?? {
                pc: `萊恩設計`,
                phone: `萊恩設計`,
            };
            widget.data.nav.bar = widget.data.nav.bar ?? {
                home: true,
                list: [
                    {name: '客製化服務項目', link: '#price'},
                    {name: '模板瀏覽', link: ['template']},
                    {name: '方案價格', link: '#price'},
                    {name: '作品案例', link: '#project'},
                    {name: '關於我們', link: '#team'},
                    {name: '聯絡資訊', link: '#contact'},
                ],
            };
            widget.data.nav.btn = widget.data.nav.btn ?? {
                class: 'btn-primary',
                name: '星澄基地',
                link: '',
                visible: true,
            };
            widget.data.logoClick=widget.data.logoClick??{}
            const nav = {
                logo: widget.data.nav.logo,
                title: widget.data.nav.title,
                bar: widget.data.nav.bar,
                btn: widget.data.nav.btn,
            };
            widget.data.menuItem=widget.data.menuItem??{}
            widget.data.linkLayout=widget.data.linkLayout??{}
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    function recursive(r: any, first?: boolean) {
                        var h = '';
                        if (r.list === undefined || r.list.length === 0) {
                            h += /*html*/ `<li>
                                    <a
                                        class="${first ? 'nav-link text-dark' : 'dropdown-item'} ${
                                typeof r.link === 'object' && first ? r.link[0] : ``
                            } ${glitter.htmlGenerate.styleEditor(widget.data.linkLayout).class()}"
                                        onclick="${gvc.event(() => {
                                ($('#navbarNav') as any).offcanvas('hide');
                                if (r.link) {
                                    TriggerEvent.trigger({gvc, widget, clickEvent: r});
                                }
                            })}"
                                        style="cursor:pointer;${(widget.data.textColor&&first) ? `color:${widget.data.textColor}!important;`:``}
                                        ${glitter.htmlGenerate.styleEditor(widget.data.linkLayout).style()}
                                        "
                                        name="${typeof r.link === 'string' ? r.link.replace('#', '') : ``}"
                                        >${r.name}</a
                                    >
                                </li>`;
                        } else {
                            h += /*html*/ `<li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle text-dark  ${glitter.htmlGenerate.styleEditor(widget.data.linkLayout).class()}" data-bs-toggle="dropdown" style="${(widget.data.textColor) ? `color:${widget.data.textColor}!important;`:``} ${glitter.htmlGenerate.styleEditor(widget.data.linkLayout).style()}">${r.name}</a>
                                    <ul class="dropdown-menu">
                                        ${glitter.print(function () {
                                var tmp = '';
                                r.list.map((r2: any) => (tmp += recursive(r2)));
                                return tmp;
                            })}
                                    </ul>
                                </li>`;
                        }
                        return h;
                    }

                    return `<header
                                class="position-fixed header navbar navbar-expand-lg navbar-light  navbar-sticky w-100 ${glitter.htmlGenerate.styleEditor(widget.data.headerLayout).class()}"
                                style="background:#131022;z-index:5;top: 0px; ${glitter.htmlGenerate.styleEditor(widget.data.headerLayout).style()}"
                            >
                            <div class="container px-3">
                                    <a
                                        class="navbar-brand fs-lg pe-0 pe-sm-3"
                                        onclick="${gvc.event(() => {
                        TriggerEvent.trigger({
                            gvc, widget, clickEvent: widget.data.logoClick
                        })
                    })}"
                                        style="cursor:pointer;${(widget.data.textColor) ? `color:${widget.data.textColor}!important;`:``}"
                                    >
                                        <img class="me-2 ${ glitter.htmlGenerate.styleEditor(widget.data.nav.logo).class()}" src="${nav.logo.url}" width="30" style="${  glitter.htmlGenerate.styleEditor(widget.data.nav.logo).style()}" />${glitter.ut.frSize(
                        {sm: nav.title.pc},
                        nav.title.phone
                    )}
                                    </a>
                                    ${
                        nav.btn.visible
                            ? /*html*/ `<button
                               class="btn  d-md-none kv-btn w-25 position-absolute ${glitter.htmlGenerate.styleEditor(nav.btn).class()}"
                               onclick="${gvc.event(() => {
                                TriggerEvent.trigger({
                                    gvc,
                                    widget,
                                    clickEvent: nav.btn,
                                });
                            })}"
                               style="cursor:pointer;width: 100px;right: ${nav.bar.list.length > 0 ? '60':'10'}px;height: 40px;${glitter.htmlGenerate.styleEditor(nav.btn).style()}"
                           >
                               &nbsp;${nav.btn.name}
                           </button>`
                            : ``
                    }

                                    <div id="navbarNav" class="offcanvas offcanvas-end">
                                        <div class="offcanvas-header border-bottom">
                                            <h5 class="offcanvas-title">${nav.title.pc ?? nav.title.phone}</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body">
                                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                                <!-- Menu -->
                                                ${glitter.print(function () {
                        var tmp = '';
                        nav.bar.list.map((r: any) => (tmp += recursive(r, true)));
                        return tmp;
                    })}
                                            </ul>
                                        </div>
                                        <div class="offcanvas-footer border-top">
                                            <!-- Menu button -->
                                            ${
                        nav.btn.visible
                            ? /*html*/ `<a
                               class="btn ${nav.btn.class} w-100 mt-2"
                               onclick="${gvc.event(() => {
                                TriggerEvent.trigger({
                                    gvc,
                                    widget,
                                    clickEvent: nav.btn,
                                });
                            })}"
                               style="cursor:pointer;${nav.btn.style ?? ''}"
                           >
                               &nbsp;${nav.btn.name}
                           </a>`
                            : ``
                    }
                                        </div>
                                    </div>
                                    <div class="row">
                                        <!-- Menu button (Mobile) -->
                                        <div class="col-6">
                                            ${
                        nav.btn.visible
                            ? `  <a
                        class="btn ${nav.btn.class} btn-sm fs-sm rounded d-none d-lg-inline-flex "
                        onclick="${gvc.event(() => {
                                TriggerEvent.trigger({
                                    gvc,
                                    widget,
                                    clickEvent: nav.btn,
                                });
                            })}"
                        style="cursor:pointer;${nav.btn.style ?? ''}"
                      >
                        &nbsp;${nav.btn.name}
                      </a>`
                            : ``
                    }
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        class="navbar-toggler ${nav.bar.list.length>0 ? `d-flex align-items-center justify-content-center`:`d-none`} "
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#navbarNav"
                                        aria-controls="navbarNav"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                    <i class="fa-regular fa-bars ${glitter.htmlGenerate.styleEditor(widget.data.menuItem).class()} fs-3  d-sm-none" style="${glitter.htmlGenerate.styleEditor(widget.data.menuItem).style()}"
                                    ></i>
                                           </button>
                                </div>
                            </header>
                            <div class="w-100" style="height: 50px;"></div> `;
                },
                editor: () => {
                    widget.data.nav.btnExpand = widget.data.nav.btnExpand ?? {};
                    return gvc.map([
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `Logo圖片`,
                            def: widget.data.nav.logo.url,
                            callback: (e) => {
                                widget.data.nav.logo.url = e;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `字體顏色`,
                            default: widget.data.textColor ?? '',
                            placeHolder: '輸入字體顏色',
                            callback: (text) => {
                                widget.data.textColor = text;
                                widget.refreshComponent();
                            },
                        })  ,
                        glitter.htmlGenerate.styleEditor(widget.data.nav.logo).editor(gvc,()=>{
                            widget.refreshComponent()
                        },'Logo 樣式'),
                        `<br>`,
                        glitter.htmlGenerate.styleEditor(widget.data.headerLayout).editor(gvc,()=>{
                            widget.refreshComponent()
                        },'背景樣式'),
                        `<br>`,
                        glitter.htmlGenerate.styleEditor(widget.data.menuItem).editor(gvc,()=>{
                            widget.refreshComponent()
                        },'漢堡包樣式'),
                        `<br>`,
                        glitter.htmlGenerate.styleEditor(widget.data.linkLayout).editor(gvc,()=>{
                            widget.refreshComponent()
                        },'連結樣式'),

                        `<div class="my-2"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '標題設定',
                            data: widget.data.nav.title,
                            innerText: ()=>{
                                return gvc.map([
                                    TriggerEvent.editer(gvc, widget, widget.data.logoClick, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '電腦版標題',
                                        default: widget.data.nav.title.pc,
                                        placeHolder: '輸入電腦版標題',
                                        callback: (text) => {
                                            widget.data.nav.title.pc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '手機版標題',
                                        default: widget.data.nav.title.phone,
                                        placeHolder: '輸入電腦版標題',
                                        callback: (text) => {
                                            widget.data.nav.title.phone = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                ])
                            },
                        }),
                        /*html*/ `<div class="my-2" style="background: #2F3296FF"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '重點按鈕',
                            data: widget.data.nav.btnExpand,
                            innerText: ()=>{
                                return gvc.map([
                                    `
                                    ${Editor.h3('是否可見')}
                                    <select  class="form-control form-select" onchange="${gvc.event((e) => {
                                        widget.data.nav.btn.visible = e.value === 'yes';
                                        widget.refreshComponent();
                                    })}">
                                    <option value="yes" ${!widget.data.nav.btn.visible || 'selected'} >是</option>
                                    <option value="no" ${widget.data.nav.btn.visible || 'selected'}>否</option>
</select>
                                    `,
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: '按鈕名稱[HTML]',
                                        default: widget.data.nav.btn.name,
                                        placeHolder: '輸入按鈕名稱',
                                        callback: (text) => {
                                            widget.data.nav.btn.name = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.styleEditor(widget.data.nav.btn).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },'按鈕設計樣式'),
                                    TriggerEvent.editer(gvc, widget, widget.data.nav.btn, {
                                        hover: true,
                                        option: [],
                                        title: '點擊事件',
                                    }),
                                ])
                            },
                        }),
                        /*html*/ `<div class="my-2"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '連結導覽',
                            data: widget.data.nav.btnExpand2 || (widget.data.nav.btnExpand2 = {}),
                            innerText: (() => {
                                function recursion(data: any, first: boolean) {
                                    if (!data.list || data.list.length === 0) {
                                        data.list = [];
                                        return Editor.plusBtn(
                                            first ? `添加連結` : '添加子連結',
                                            gvc.event(() => {
                                                data.list.push({name: '連結名稱', link: ''});
                                                widget.refreshComponent();
                                            })
                                        );
                                    }
                                    const innerHtml =
                                        data.list
                                            .map((dd: any, index: number) => {
                                                return Editor.toggleExpand({
                                                    gvc: gvc,
                                                    title: /*html*/ `<div class="d-flex align-items-center">
                                                            <i
                                                                class="fa-regular fa-circle-minus text-danger me-2"
                                                                style="font-size: 20px;cursor: pointer;"
                                                                onclick="${gvc.event(() => {
                                                        data.list.splice(index, 1);
                                                        widget.refreshComponent();
                                                    })}"
                                                            ></i>
                                                            ${dd.name || `連結:${index + 1}`}
                                                        </div>`,
                                                    data: dd,
                                                    innerText: ()=>{
                                                        return gvc.map([
                                                            glitter.htmlGenerate.editeInput({
                                                                gvc: gvc,
                                                                title: '連結標題',
                                                                default: dd.name,
                                                                placeHolder: '請輸入連結標題',
                                                                callback: (text) => {
                                                                    dd.name = text;
                                                                    widget.refreshComponent();
                                                                },
                                                            }),
                                                            (() => {
                                                                if (dd.list && dd.list.length > 0) {
                                                                    return ``;
                                                                } else {
                                                                    return TriggerEvent.editer(gvc, widget, dd, {
                                                                        hover: true,
                                                                        option: [],
                                                                        title: '點擊事件',
                                                                    });
                                                                }
                                                            })(),
                                                            recursion(dd, false),
                                                        ])
                                                    },
                                                    color: first ? `#004081` : `#0062c0`,
                                                });
                                            })
                                            .join('<div class="my-2"></div>') +
                                        Editor.plusBtn(
                                            first ? `添加連結` : '添加子連結',
                                            gvc.event(() => {
                                                data.list.push({name: '連結名稱', link: ''});
                                                widget.refreshComponent();
                                            })
                                        );
                                    if (!first) {
                                        data.children = data.children ?? {};
                                        return `
                                            <div class="ms-1 border p-2 mt-2" style="border: white;border-radius: 5px;">
                                            ${Editor.toggleExpand({
                                            gvc: gvc,
                                            title: '子連結',
                                            data: data.children,
                                            innerText: ()=>{
                                                return innerHtml
                                            },
                                            color: `#004081`,
                                        })}</div>
                                            `;
                                    } else {
                                        return innerHtml;
                                    }
                                }

                                return recursion(nav.bar, true);

                            }),
                            color: `#0062c0`,
                        }),
                    ]);
                },
            };
        }
    }
})