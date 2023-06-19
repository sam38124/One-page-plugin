import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";

import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let about = {
                        img: widget.data.img??ScriptStyle1.getRout("assets/img/about.jpg"),
                        title: widget.data.title??"《人類大未來：下一個五十年》",
                        desc: widget.data.desc??`
                        <p class="py-3">
                        若說我們可從中得出以下關乎人類未來的啟示，應不至於有爭議：每個人的身分不再像過去那般單一且固定，將變得比我們想像的更多元。我們在不同的情況下使用不同的身分；這些身分互有重疊而且日益難分，卻又能清楚地以不同的方式劃定個人的觀點和選擇。特別是傳統用來界定身分的社會標準（例如年齡和國籍）都將不再那麼重要，公私身分的界線也變得越來越模糊。以社會階級、族群歸屬、政治立場為本的身分定義，將讓位給新的劃分標準，例如出身城鄉或教育程度的高低。
                        </p>
                        <p class="py-3">
                        如果個人身分的傳統特質變得支離破碎，可以想見未來社群的向心力將會更為疏遠，社會階層的流動性降低或是邊緣化，讓種族隔離或極端主義有機可趁。但換個角度來看，科技及網路帶來人際關係的「超連結」（hyperconnectivity），將有機會強化正向群體認同，賦予營造社群的新契機。未來，無論是生活或身分，人與人都會逐漸變得密不可分。這究竟是好事還是壞事？我認為有好也有壞，而且不論何者的影響都會越來越大。
                        </p>`,
                    }
                    let id = glitter.getUUID();
                    if (!widget.data.title){
                        widget.data = about;
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <!-- ======= About Section ======= -->
                            <section id="about" class="about">
                              <div class="container">
                                <div class="row">
                                  <div class="col-lg-6" data-aos="zoom-in">
                                    <img src="${about.img}" class="img-fluid" alt="" />
                                  </div>
                                  <div class="col-lg-6 d-flex flex-column justify-contents-center" data-aos="fade-left">
                                    <div class="content pt-4 pt-lg-0">
                                      <h3>${about.title}</h3>
                                      <div class="px-3">${about.desc}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <!-- End About Section -->
                           `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
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
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入標題名稱',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '右方圖片',
                            def:widget.data.img,
                            callback:(data)=>{
                                widget.data.img=data
                                widget.refreshComponent()
                            }
                        })
                    ])
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
                        refreshComponent:()=>{
                            widget.refreshComponent()
                        }
                    })
                }
            }
        },
    }
})