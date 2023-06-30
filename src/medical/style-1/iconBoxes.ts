import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";

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
                    widget.data.card = widget.data.card??[
                        {
                            img:ScriptStyle1.getRout("assets/img/landing/medical/icons/doctor.svg"),
                            title:"Find a Doctor",
                            desc:"See all doctors",
                            hyperlink:{
                                link:{},
                                text:"See all doctors"
                            }
                        },
                        {
                            img:ScriptStyle1.getRout("assets/img/landing/medical/icons/ambulance.svg"),
                            title:"Emergency Service",
                            desc:`<i class="bx bx-phone-call fs-4 text-muted me-1"></i>(406) 555-0120`,
                            hyperlink:{
                                link:{},
                                text:"Contact us"
                            }
                        },
                        {
                            img:ScriptStyle1.getRout("assets/img/landing/medical/icons/virus.svg"),
                            title:"COVID-19 Info",
                            desc:"We offer quick COVID-19 testing by appointment.",
                            hyperlink:{
                                link:{},
                                text:"Learn more"
                            }
                        },
                    ]

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let card:{
                                img:string,
                                title:string,
                                desc:string,
                                hyperlink:{
                                    link:{},
                                    text:string
                                }
                            }[] = widget.data.card
                            return `
                            <!-- Icon boxes (Features) -->
      <section class="container py-5 mb-2 mb-md-4 mb-lg-5">
        <div class="row row-cols-1 row-cols-md-3 g-4 pt-2 pt-md-4 pb-lg-2">
            ${(()=>{
                let temp = ``
                card.map((data)=>{
                    temp += `
<div class="col">
    <div class="card flex-column flex-sm-row flex-md-column flex-xxl-row align-items-center card-hover border-primary h-100">
        <img src="${data.img}" width="168" alt="Doctor icon">
        <div class="card-body text-center text-sm-start text-md-center text-xxl-start pb-3 pb-sm-2 pb-md-3 pb-xxl-2">
            <h3 class="h5 mb-2 mt-n4 mt-sm-0 mt-md-n4 mt-xxl-0">${data.title}</h3>
            <p class="fs-sm mb-1">${data.desc}</p>
                <a href="#" class="btn btn-link stretched-link px-0">
                    ${data.hyperlink.text}
                    <i class="bx bx-right-arrow-alt fs-xl ms-1"></i>
                </a>
        </div>
    </div>
</div>
                    `
                })
                return temp    
            })()}
          <!-- Item -->
          

        </div>
      </section>
                           `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    widget.data.expand = widget.data.expand ?? {}
                    return Editor.arrayItem({
                        originalArray:widget.data.card,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.card.map((dd: any, index: number) => {
                            return {
                                title: dd.title || `卡片:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
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
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `敘述`,
                                        default: dd.desc,
                                        placeHolder: '輸入敘述內容',
                                        callback: (text) => {
                                            dd.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `超連結文字`,
                                        default: dd.hyperlink.text,
                                        placeHolder: '輸入文字內容',
                                        callback: (text) => {
                                            dd.hyperlink.text = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: '卡片圖片',
                                        def:dd.img,
                                        callback:(data)=>{
                                            dd.img=data
                                            widget.refreshComponent()
                                        }
                                    })
                                ]),
                                minus: gvc.event(() => {
                                    widget.data.card.splice(index, 1);
                                    widget.refreshComponent();
                                }),
                            };
                        }),
                        expand: widget.data.expand ,
                        plus: {
                            title: '添加區塊',
                            event: gvc.event(() => {
                                widget.data.card.push({
                                    img:ScriptStyle1.getRout("assets/img/landing/medical/icons/doctor.svg"),
                                    title:"Find a Doctor",
                                    desc:"See all doctors",
                                    hyperlink:{
                                        link:{},
                                        text:"See all doctors"
                                    }
                                });
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