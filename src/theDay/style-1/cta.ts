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
                    let id = glitter.getUUID()
                    let fullbg= {
                        title: widget.data.title??"讓資訊科技更貼近生活",
                        desc: widget.data.desc??"優質服務範圍包括網路連線諮詢與整合、受管理網路服務和軟體定義的網路",
                        btn: widget.data.btn??{ name: "了解更多", link: "https://squarestudio.tw/"},
                        img: widget.data.img??ScriptStyle1.getRout("assets/img/cta-bg.jpg"),
                    }
                    let bg = `linear-gradient(rgba(2, 2, 2, 0.5), rgba(0, 0, 0, 0.5)), url(${fullbg.img}) fixed center center;`;
                    if (!widget.data.btn){
                        widget.data.btn = fullbg.btn;
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <!-- ======= Cta Section ======= -->
                            <section id="cta" class="cta" style="background: ${bg}">
                              <div class="container" data-aos="zoom-in">
                                <div class="text-center">
                                  <h3>${fullbg.title}</h3>
                                  <p>${fullbg.desc}</p>
                                  <a class="cta-btn" onclick="${gvc.event(()=>{
                                    TriggerEvent.trigger({
                                        gvc, widget, clickEvent:fullbg.btn.link,
                                    })    
                                  })}" style="cursor:pointer"
                                    >${fullbg.btn.name}</a
                                  >
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
                            title: '按鍵',
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