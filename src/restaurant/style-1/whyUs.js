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
                    widget.data.list = widget.data.list ?? [
                        { number: "01", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零件更換" },
                        { number: "02", title: "資訊安全", desc: "網路、網際網路、端點、API、雲端、應用程式" },
                        { number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" },
                        { number: "04", title: "即時線上服務", desc: "提供即時與處理緊急狀況的撥打專線，替您解除危機" },
                        { number: "05", title: "前後台版型多樣性", desc: "多種板塊可自行設計或與我們說明想要的介面" },
                    ];
                    const banner = {
                        title: "我們擅長的領域",
                        desc: "從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署",
                        list: widget.data.list,
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                                    <!-- ======= Why Us Section ======= -->
                                    <section id="banner" class="why-us">
                                        <div class="container" data-aos="fade-up">
                                            <div class="section-title">
                                                <h2>${banner.title}</h2>
                                                <p style="white-space:normal;word-wrap:break-word;word-break:break-all;">${banner.desc}</p>
                                            </div>
                                
                                            <div class="row">
                                                ${glitter.print(function () {
                                var tmp = "";
                                banner.list.map((l, i) => {
                                    tmp += `
                                    <div class="col-lg-4 ${i == 0 && glitter.ut.frSize({ sm: false }, true) ? `` : `mt-4`}"
                                        onclick="${gvc.event(() => {
                                        TriggerEvent.trigger({
                                            gvc, widget, clickEvent: l,
                                        });
                                    })}">
                                        <div class="box" data-aos="zoom-in" data-aos-delay="200">
                                            <span>${l.number}</span>
                                            <h4 class="${glitter.htmlGenerate.styleEditor(l).class()}" style="${glitter.htmlGenerate.styleEditor(l).style()}">${l.title}</h4>
                                            <p>${l.desc}</p>
                                        </div>
                                    </div>
                                  `;
                                });
                                return tmp;
                            })}
                                            </div>
                                        </div>
                                    </section>
                                    <!-- End Why Us Section -->
                                `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return Editor.arrayItem({
                        originalArray: widget.data.list,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.list.map((dd, index) => {
                            return {
                                title: dd.title || `區塊:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `索引`,
                                        default: dd.number,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.number = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `標題`,
                                        default: dd.title,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.title = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.styleEditor(dd).editor(gvc, () => {
                                        widget.refreshComponent();
                                    }, '標題設計樣式'),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `描述`,
                                        default: dd.desc,
                                        placeHolder: '輸入描述',
                                        callback: (text) => {
                                            dd.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    TriggerEvent.editer(gvc, widget, dd, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
                                    })
                                ]),
                                minus: gvc.event(() => {
                                    widget.data.list.splice(index, 1);
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
                    });
                }
            };
        },
    };
});
