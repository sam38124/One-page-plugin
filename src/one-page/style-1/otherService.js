import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            widget.data.title = widget.data.title ?? '看看其他產品服務';
            widget.data.service = widget.data.service ?? [
                {
                    name: '電商應用',
                    link: {},
                    tab: 'shop',
                    icon: 'bx bx-store-alt',
                    desc: '從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務',
                },
                {
                    name: '資料視覺化',
                    link: {},
                    tab: 'dashboard',
                    icon: 'bx bxs-dashboard bx-flip-vertical',
                    desc: '無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現',
                },
                {
                    name: '企業管理',
                    link: {},
                    tab: 'erp',
                    icon: 'bx bx-buildings',
                    desc: '薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統',
                },
                {
                    name: '個人網站',
                    link: {},
                    tab: 'profile',
                    icon: 'bx bxl-blogger',
                    desc: '網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地',
                },
                {
                    name: '社群平台',
                    link: {},
                    tab: 'social',
                    icon: 'bx bx-shape-polygon',
                    desc: '學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境',
                },
                {
                    name: '線上課程網站',
                    link: {},
                    tab: 'course',
                    icon: 'bx bx-code-curly',
                    desc: '快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網',
                },
                {
                    name: '藍芽產品應用',
                    link: {},
                    tab: 'bluetooth',
                    icon: 'bx bx-bluetooth',
                    desc: '手機藍芽串接硬體設備，讀取/寫入特徵值，收聽藍芽廣播，已有豐富的業界開發經驗．',
                },
                {
                    name: '後台模組化服務',
                    link: {},
                    tab: 'bgunit',
                    icon: 'bx bx-unite',
                    desc: '透過我司自行開發的模組化系統[✨Glitter星澄基地]，既可能的增加網站靈活度，讓您能十分方便的自行更改介面設計與添加其功能．',
                },
            ];
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    const service = widget.data.service;
                    return `<section class="container pt-2 pt-lg-0 pb-5 mb-md-4 mb-lg-5" style="">
                            <h2 class="h1 text-center pb-3 pb-lg-4">${widget.data.title}</h2>
                            <ul class="nav nav-tabs flex-nowrap justify-content-lg-center overflow-auto pb-2 mb-3 mb-lg-4" role="tablist">
                                ${glitter.print(function () {
                        var tmp = '';
                        service.map((a, i) => {
                            tmp += `
                                            <li class="nav-item" role="presentation">
                                                <button
                                                    class="nav-link text-nowrap ${i == 0 && `active`}"
                                                    id="${a.tab}-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#${a.tab}"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="${a.tab}"
                                                    aria-selected="false"
                                                >
                                                    <i class="${a.icon} fs-lg opacity-60 me-2"></i>
                                                    ${a.name}
                                                </button>
                                            </li>
                                        `;
                        });
                        return tmp;
                    })}
                            </ul>

                            <div class="tab-content bg-secondary rounded-3 py-4">
                                ${glitter.print(function () {
                        var tmp = '';
                        service.map((a, i) => {
                            tmp += `
                                            <div
                                                class="tab-pane fade ${i == 0 && `show active`}"
                                                id="${a.tab}"
                                                role="tabpanel"
                                                aria-labelledby="${a.tab}-tab"
                                            >
                                                <div class="row align-items-center pt-3 pt-sm-4 pt-md-0 px-3 px-sm-4 px-lg-0">
                                                    <div class="col-lg-4 col-md-5 offset-lg-1 text-center text-md-start">
                                                        <h3 class="mb-lg-4">${a.name}</h3>
                                                        <p>${a.desc}</p>
                                                        <a
                                                            class="btn btn-primary"
                                                            data-gs-event-7="event"
                                                            onclick="${gvc.event(() => {
                                TriggerEvent.trigger({
                                    gvc,
                                    widget,
                                    clickEvent: a.link,
                                });
                            })}"
                                                            style="cursor:pointer"
                                                            >點我了解更多</a
                                                        >
                                                    </div>
                                                    <div class="col-lg-6 col-md-7 mt-2 mb-3 mt-md-3">
                                                        <img
                                                            src="${ScriptStyle1.getRout(`img/${a.tab}/${a.tab}01.jpg`)}"
                                                            class="d-block rounded-3 my-lg-2 mx-auto me-md-0"
                                                            width="564"
                                                            alt="Image"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                        });
                        return tmp;
                    })}
                            </div>
                        </section>`;
                },
                editor: () => {
                    return (glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: `標題`,
                        default: widget.data.title,
                        placeHolder: '輸入標題名稱',
                        callback: (text) => {
                            widget.data.title = text;
                            widget.refreshComponent();
                        },
                    }) +
                        Editor.arrayItem({
                            gvc: gvc,
                            originalArray: widget.data.service,
                            title: '其他服務',
                            array: widget.data.service.map((dd, index) => {
                                return {
                                    title: dd.name || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `標題`,
                                        default: dd.name,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.name = text;
                                            widget.refreshComponent();
                                        },
                                    }) +
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `描述`,
                                            default: dd.desc,
                                            placeHolder: '輸入描述內文',
                                            callback: (text) => {
                                                dd.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }) +
                                        Editor.fontawesome({
                                            title: '圖示',
                                            gvc: gvc,
                                            def: dd.icon,
                                            callback: (text) => {
                                                dd.icon = text;
                                                widget.refreshComponent();
                                            },
                                        }) +
                                        TriggerEvent.editer(gvc, widget, dd.link, {
                                            hover: true,
                                            option: [],
                                            title: '點擊事件',
                                        }),
                                    minus: gvc.event(() => {
                                        widget.data.servic.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.service.push({
                                        name: '電商應用',
                                        link: {},
                                        tab: 'shop',
                                        icon: 'bx bx-store-alt',
                                        desc: '從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務',
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }));
                },
            };
        },
    };
});
