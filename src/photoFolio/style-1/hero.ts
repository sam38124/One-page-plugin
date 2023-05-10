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
                    let id = glitter.getUUID();
                    widget.data.title = widget.data.title??`I'm <span>Jenny Wilson</span> a Professional Photographer from New York City`;
                    widget.data.titleStyle = widget.data.titleStyle ?? {}
                    widget.data.descStyle = widget.data.descStyle ?? {}
                    widget.data.desc = widget.data.desc?? "Blanditiis praesentium aliquam illum tempore incidunt debitis dolorem magni est deserunt sed qui libero. Qui voluptas amet."
                    widget.data.btn = widget.data.btn ?? {text:"Available for hire" , href:{}}
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let hero:{
                                title:string,
                                desc:string,
                                btn:{
                                    text:string,
                                    href:{}
                                }
                            } = {
                                title : widget.data.title,
                                desc : widget.data.desc,
                                btn : widget.data.btn
                            }
                            return `

                            <!-- ======= Hero Section ======= -->
  <section id="hero" class="hero d-flex flex-column justify-content-center align-items-center" data-aos="fade" data-aos-delay="1500">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 text-center">
          <h2 style="${glitter.htmlGenerate.styleEditor(widget.data.titleStyle).style()}" class="${glitter.htmlGenerate.styleEditor(widget.data.titleStyle).class()}">${widget.data.title}</h2>
          <p style="${glitter.htmlGenerate.styleEditor(widget.data.descStyle).style()}" class="${glitter.htmlGenerate.styleEditor(widget.data.descStyle).class()}">${widget.data.desc}</p>
          <a onclick="${gvc.event(()=>{
            TriggerEvent.trigger({
                gvc, widget, clickEvent: hero.btn.href,
            })
          })}" class="btn-get-started">${hero.btn.text}</a>
        </div>
      </div>
    </div>
  </section><!-- End Hero Section -->

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
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `標題`,
                            default: widget.data.title,
                            placeHolder: '輸入標題文字',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.styleEditor(widget.data.titleStyle).editor(gvc,()=>{
                            widget.refreshComponent()
                        },'標題設計樣式'),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題文字',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.styleEditor(widget.data.descStyle).editor(gvc,()=>{
                            widget.refreshComponent()
                        },'副標題設計樣式'),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `按鍵文字`,
                            default: widget.data.btn.text,
                            placeHolder: '輸入按鍵文字',
                            callback: (text) => {
                                widget.data.btn.text = text;
                                widget.refreshComponent();
                            },
                        }),
                        TriggerEvent.editer(gvc, widget, widget.data.btn.href, {
                            hover: true,
                            option: [],
                            title: "按鍵觸發事件"
                        })
                    ])
                }
            }
        },
    }
})