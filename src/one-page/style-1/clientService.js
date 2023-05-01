import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            widget.data.title =
                widget.data.title ??
                    `<p class="lead mb-3">沒有那麼多的預算</p>
                        <h2 class="h1 pb-2 pb-md-4">
                            前往<img
                                src="img/index/glitter.png"
                                class="bg-white rounded-circle p-2 mb-2 mx-2"
                                style="width: 50px;height: 50px;"
                            />星澄基地<br />快速打造專屬於您的系統
                        </h2>`;
            widget.data.btn = widget.data.btn ?? { name: '點此前往' };
            widget.data.list = widget.data.list ?? [
                {
                    q: '星澄基地是什麼？',
                    a: '星澄基地是萊恩設計所開發的套版應用平台，集結了我們所有的開發案例，讓您能用最低的成本打造您的應用',
                },
                { q: '是否支援APP上架服務？', a: '當然，購買白金方案後，會有專人聯繫您APP上架相關事宜。' },
                {
                    q: '是否支援電商與金流功能？',
                    a: '可以，我們採用綠界科技作為金流平台，由後台簡易帶入HASHKEY與特店編號，即可串接金流服務。',
                },
                { q: '我能從網站或 APP 中販售商品嗎？', a: '可以，您可以在電商平台上販售您設計的商品。' },
            ];
            const faq = {
                title: widget.data.title,
                btn: widget.data.btn,
                list: widget.data.list,
            };
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    return `<section class="container" id="glitterBase">
                            <div class="bg-secondary rounded-3 my-2 my-md-4 my-lg-5 py-5 px-3 px-md-0">
                                <div class="row align-items-center">
                                    <!-- FAQ desc -->
                                    <div
                                        class="col-md-5 offset-lg-1 text-center text-md-start ps-md-5 ps-lg-0 ps-xl-5 pb-2 pb-md-0 mb-4 mb-md-0"
                                    >
                                        ${faq.title}
                                        <a
                                            class="btn btn-primary btn-lg ${glitter.htmlGenerate.styleEditor(faq.btn).class()}"
                                            onclick="${gvc.event(() => {
                        TriggerEvent.trigger({
                            gvc,
                            widget,
                            clickEvent: faq.btn,
                        });
                    })}"
                                            style="cursor:pointer;${glitter.htmlGenerate.styleEditor(faq.btn).style()}"
                                        >
                                            ${faq.btn.name}
                                        </a>
                                    </div>
                                    <!-- FAQ show -->
                                    <div class="col-md-5">
                                        <div class="accordion">
                                            ${glitter.print(function () {
                        var tmp = '';
                        faq.list.map((b, i) => {
                            tmp += `
                                                        <div class="accordion-item border-0 rounded-3 shadow-sm mb-3">
                                                            <h2 class="accordion-header" id="q${i}-heading">
                                                                <button
                                                                    class="accordion-button shadow-none rounded-3 fs-5 ${i != 0 ? `collapsed` : ``}"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#q${i}"
                                                                    aria-expanded="true"
                                                                    aria-controls="q${i}"
                                                                >
                                                                    ${b.q}
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="q${i}"
                                                                class="accordion-collapse collapse ${i == 0 ? `show` : ``}"
                                                                aria-labelledby="q${i}-heading"
                                                                data-bs-parent="#faq"
                                                            >
                                                                <div class="accordion-body fs-6 pt-0">
                                                                    <p>${b.a}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    `;
                        });
                        return tmp;
                    })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>`;
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '描述文字「HTML」',
                            default: widget.data.title,
                            placeHolder: '輸入描述文字',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.list,
                            gvc: gvc,
                            title: '問答區塊',
                            array: widget.data.list.map((dd, index) => {
                                return {
                                    title: dd.q || `問題:${index + 1}`,
                                    expand: dd,
                                    innerHtml: glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `問題`,
                                        default: dd.q,
                                        placeHolder: '輸入問題',
                                        callback: (text) => {
                                            dd.q = text;
                                            widget.refreshComponent();
                                        },
                                    }) +
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `回答`,
                                            default: dd.a,
                                            placeHolder: '輸入回答',
                                            callback: (text) => {
                                                dd.a = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.list.push({
                                        q: '星澄基地是什麼？',
                                        a: '星澄基地是萊恩設計所開發的套版應用平台，集結了我們所有的開發案例，讓您能用最低的成本打造您的應用',
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        `<div class="my-2"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '按鈕',
                            data: widget.data.btn,
                            innerText: () => {
                                return gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `按鈕名稱`,
                                        default: widget.data.btn.name,
                                        placeHolder: '輸入按鈕名稱',
                                        callback: (text) => {
                                            widget.data.btn.name = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.styleEditor(widget.data.btn).editor(gvc, widget, '按鈕設計樣式'),
                                    TriggerEvent.editer(gvc, widget, widget.data.btn, {
                                        hover: true,
                                        option: [],
                                        title: '點擊事件',
                                    }),
                                ]);
                            },
                        }),
                    ]);
                },
            };
        },
    };
});
