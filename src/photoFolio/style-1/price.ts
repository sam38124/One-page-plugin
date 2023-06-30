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
                    widget.data.title = widget.data.title??"Prices";
                    widget.data.desc = widget.data.desc??"Check my adorable pricing";
                    widget.data.list = widget.data.list??[
                        {
                            title : "Portrait Photography",
                            price : "$160.00"
                        },
                        {
                            title : "Fashion Photography",
                            price : "$300.00"
                        },
                        {
                            title : "Sports Photography",
                            price : "$200.00"
                        },
                        {
                            title : "Still Life Photography",
                            price : "$120.00"
                        },
                        {
                            title : "Wedding Photography",
                            price : "$500.00"
                        },
                        {
                            title : "Photojournalism",
                            price : "$200.00"
                        },
                    ]

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let price:{
                                title:string,
                                desc:string,
                                list : {
                                    title : string,
                                    price : string
                                }[]
                            }={
                                title:widget.data.title,
                                desc:widget.data.desc,
                                list:widget.data.list
                            }
                            return `
<main>
    <!-- ======= Pricing Section ======= -->
    <section id="pricing" class="pricing">
      <div class="container">

        <div class="section-header">
          <h2>${price.title}</h2>
          <p>${price.desc}</p>
        </div>

        <div class="row gy-4 gx-lg-5">
            ${(()=>{
                let html = ``;
                price.list.map((data)=>{
                    html += `
                    <div class="col-lg-6">
                        <div class="pricing-item d-flex justify-content-between">
                          <h3>${data.title}</h3>
                          <h4>${data.price}</h4>
                        </div>
                    </div><!-- End Pricing Item -->
                    `
                })
                return html   
            })()}


        </div>
    </section><!-- End Pricing Section -->                            
</main>
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
                            placeHolder: '輸入標題文字',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題文字',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.list,
                            gvc: gvc,
                            title: '價目表',
                            array: widget.data.list.map((dd: any, index: number) => {
                                return {
                                    title: dd.title || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `服務名稱`,
                                            default: dd.title,
                                            placeHolder: '輸入服務名稱',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `價格`,
                                            default: dd.price,
                                            placeHolder: '輸入價格',
                                            callback: (text) => {
                                                dd.price = text;
                                                widget.refreshComponent();
                                            },
                                        }),
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
                                    widget.data.list.push({
                                        title : "Portrait Photography",
                                        price : "$160.00"
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        })
                    ])
                }
            }
        },
    }
})