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
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    let features_3:any = {
                        img: { front: ScriptStyle1.getRout("img/phone-white.png"), back: ScriptStyle1.getRout("img/phone-black.png")},
                        title: "人性化 & 客製化",
                        desc: "響應式網頁，電腦、手機、平板 網站一次搞定，提升搜尋好感度，任何需求都能滿足",
                        btn: { name: "Get Start", link: "https://squarestudio.tw" },
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
                            <section id="features-3" class="section features-2-section">
                              <div class="container">
                                <div class="row">
                                  <div class="col-md-6">
                                    <div class="phones order-alt">
                                      <img class="back" src="${features_3.img.back}" alt />
                                      <img class="front" src="${features_3.img.front}" alt />
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <div class="screen-info-text">
                                      <h2>${features_3.title}</h2>
                                      <p>${features_3.desc}</p>
                                      <a class="btn-minimal" onclick="" href="${features_3.btn.link}"> ${features_3.btn.name} </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          `;
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return ``
                    return Editor.arrayItem({
                        originalArray:widget.data.list,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.list.map((dd: any, index: number) => {
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
                                    glitter.htmlGenerate.styleEditor(dd).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },'標題設計樣式'),
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
                                    ClickEvent.editer(gvc, widget, dd, {
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
                        refreshComponent:()=>{
                            widget.refreshComponent()
                        }
                    })
                }
            }
        },
    }
})