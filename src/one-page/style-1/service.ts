import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            ScriptStyle1.initialScript(gvc, widget);
            widget.data.title = widget.data.title ?? '萊恩設計的服務';
            widget.data.desc =
                widget.data.desc ??
                `我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。<br /><br />或是想快速建立特定功能網站，自主管理頁面與功能，<a class="text-white" href= target="_blank" rel="noopener">「星澄基地」</a>會是您的好選擇`;
            widget.data.list = widget.data.list ?? [
                {
                    name: '電商應用',
                    link: ['service_detail'],
                    tab: 'shop',
                    icon: 'bx bx-store-alt',
                    desc: '從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務',
                },
                {
                    name: '資料視覺化',
                    link: ['service_detail'],
                    tab: 'dashboard',
                    icon: 'bx bxs-dashboard bx-flip-vertical',
                    desc: '無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現',
                },
                {
                    name: '企業管理',
                    link: ['service_detail'],
                    tab: 'erp',
                    icon: 'bx bx-buildings',
                    desc: '薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統',
                },
                {
                    name: '個人網站',
                    link: ['service_detail'],
                    tab: 'profile',
                    icon: 'bx bxl-blogger',
                    desc: '網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地',
                },
                {
                    name: '社群平台',
                    link: ['service_detail'],
                    tab: 'social',
                    icon: 'bx bx-shape-polygon',
                    desc: '學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境',
                },
                {
                    name: '線上課程網站',
                    link: ['service_detail'],
                    tab: 'course',
                    icon: 'bx bx-code-curly',
                    desc: '快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網',
                },
                {
                    name: '藍芽產品應用',
                    link: ['service_detail'],
                    tab: 'bluetooth',
                    icon: 'bx bx-bluetooth',
                    desc: '手機藍芽串接硬體設備，讀取/寫入特徵值，收聽藍芽廣播，已有豐富的業界開發經驗．',
                },
                {
                    name: '後台模組化服務',
                    link: ['service_detail'],
                    tab: 'bgunit',
                    icon: 'bx bx-unite',
                    desc: '透過我司自行開發的模組化系統[✨Glitter星澄基地]，既可能的增加網站靈活度，讓您能十分方便的自行更改介面設計與添加其功能．',
                },
            ];
            widget.data.bg = widget.data.bg ?? ScriptStyle1.getRout(`img/index/service-bg.jpg`);
            let service = {
                title: widget.data.title,
                desc: widget.data.desc,
                list: widget.data.list,
                bg: widget.data.bg,
            };
            return {
                view: () => {
                    return /*html*/ `<section class="jarallax dark-mode bg-dark py-xxl-5" id="service">
                            <div class="jarallax-img opacity-25" style="background-image: url(${service.bg})"></div>
                            <div class="d-none d-lg-block" style="margin-top: -60px; padding-top: 60px"></div>
                            <div class="container py-5 py-lg-3">
                                <div class="row align-items-center pb-5 mb-lg-2">
                                    <div class="col-md-8 text-center text-md-start">
                                        <h2 class="h1 text-center text-md-start mb-lg-4 pt-1 pt-md-4">${service.title}</h2>
                                        <p class="mb-md-0 ${glitter.ut.frSize({sm: 'fs-lg'}, '')}">${service.desc}</p>
                                    </div>
                                </div>
                                <div class="row row-cols-2 row-cols-md-2">
                                    <!-- Sevice grid -->
                                    ${glitter.print(function () {
                        var tmp = '';
                        service.list.map((s: any) => {
                            tmp += /*html*/ `
                                                <!-- Item -->
                                                <div class="col-xl-4 col-md-6 py-4 my-2 my-sm-3">
                                                    <a
                                                        class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2"
                                                        onclick="${gvc.event(() => {
                                ClickEvent.trigger({
                                    gvc, widget, clickEvent: s,
                                })
                            })}"
                                                        style="cursor:pointer"
                                                    >
                                                        <div class="card-body pt-3 px-2">
                                                            <div
                                                                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3" >
                                                                <i class="${s.icon} fs-2 d-block m-1" width="40"></i>
                                                            </div>
                                                            <h2 class="fs-lg d-inline-flex align-items-center">
                                                                ${s.name}
                                                                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
                                                            </h2>
                                                            <p class="text-body mb-0" style="font-size:16px">${s.desc}</p>
                                                        </div>
                                                    </a>
                                                </div>
                                            `;
                        });
                        return tmp;
                    })}
                                </div>
                            </div>
                        </section>`;
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '標題[HTML]',
                            default: widget.data.title,
                            placeHolder: '輸入標題內容',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '描述[HTML]',
                            default: widget.data.desc,
                            placeHolder: '輸入描述內容',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `背景圖`,
                            def: widget.data.bg,
                            callback: (data) => {
                                widget.data.bg = data;
                                widget.refreshComponent();
                            },
                        }),
                        /*html*/ `<div class="alert-dark alert">
                                ${
                            widget.data.list
                                .map((dd: any, index: number) => {
                                    return Editor.toggleExpand({
                                        gvc: gvc,
                                        title: dd.name || `項目:${index + 1}`,
                                        data: dd,
                                        innerText: gvc.map([
                                            Editor.fontawesome({
                                                gvc: gvc,
                                                title: '圖示',
                                                def: dd.icon,
                                                callback: (text: string) => {
                                                    dd.icon = text;
                                                    widget.refreshComponent();
                                                },
                                            }),
                                            glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: '項目標題',
                                                default: dd.name,
                                                placeHolder: '項目標題',
                                                callback: (text) => {
                                                    dd.name = text;
                                                    widget.refreshComponent();
                                                },
                                            }),
                                            glitter.htmlGenerate.editeText({
                                                gvc: gvc,
                                                title: '項目描述',
                                                default: dd.desc,
                                                placeHolder: '項目描述',
                                                callback: (text) => {
                                                    dd.desc = text;
                                                    widget.refreshComponent();
                                                },
                                            }),
                                            ClickEvent.editer(gvc, widget, dd, {
                                                hover: true,
                                                option: [],
                                                title: "點擊事件"
                                            })
                                        ]),
                                    });
                                })
                                .join('<div class="my-2"></div>') +
                            Editor.plusBtn(
                                '添加項目',
                                gvc.event(() => {
                                    widget.data.list.push({
                                        name: '電商應用',
                                        link: ['service_detail'],
                                        tab: 'shop',
                                        icon: 'bx bx-store-alt',
                                        desc: '從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務',
                                    });
                                })
                            )
                        }
                            </div>`,
                    ]);
                },
            };
        },
    }
})