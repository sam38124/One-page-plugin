import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
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
                    let id = glitter.getUUID()
                    let action= {
                        title: widget.data.title??"想要得到 <em>萊恩設計</em> 的相關資訊嗎？",
                        desc: widget.data.desc??"提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站，我們擅長達成客戶的需求，替客戶早一步想到問題點",
                        img: widget.data.img??ScriptStyle1.getRout("assets/img/cta-bg.jpg"),
                        btn: widget.data.btn??{ name: "聯絡我們", link: {} },
                    }
                    widget.data = action
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <!-- ======= Cta Section ======= -->
                            <section id="cta" class="cta"
                            style="background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${action.img}) center center;">
                              <div class="container">
                                <div class="row" data-aos="zoom-in">
                                  <div class="col-lg-9 text-center text-lg-start">
                                    <h3>${action.title}</h3>
                                    <p>${action.desc}</p>
                                  </div>
                                  <div class="col-lg-3 cta-btn-container text-center">
                                    <a class="cta-btn align-middle" 
                                    onclick="${gvc.event(()=>{TriggerEvent.trigger({
                                    gvc, widget, clickEvent: action.btn.link,
                                    })})}" style="cursor:pointer">${action.btn.name}</a>
                                  </div>
                                </div>
                              </div>
                            </section>
                            <!-- End Cta Section -->
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
                            gvc : gvc,
                            title : '標題',
                            default : widget.data.title,
                            placeHolder : `請輸入標題內容`,
                            callback:(text)=>{
                                widget.data.title = text;
                                widget.refreshComponent();
                            }
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc : gvc,
                            title : '副標題',
                            default : widget.data.desc,
                            placeHolder : `請輸入副標題內容`,
                            callback:(text)=>{
                                widget.data.desc = text;
                                widget.refreshComponent();
                            }
                        }),
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '基本資訊',
                            data: widget.data.btn,
                            innerText: ()=>{

                                return gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '按鍵資訊',
                                        default: widget.data.btn.name,
                                        placeHolder: '按鍵名稱',
                                        callback: (text) => {
                                            widget.data.btn.name = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    TriggerEvent.editer(gvc, widget, widget.data.btn.link, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
                                    })
                                ])
                            }

                        }),
                    ])
                }
            }
        },
    }
})