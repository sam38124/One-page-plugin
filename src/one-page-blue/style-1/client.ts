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
                    let client= {
                        title: widget.data.title??"合作夥伴",
                        desc: widget.data.desc??"萊恩設計公司的服務與顧客的合作",
                        dataList:widget.data.dataList??{
                            list:[
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-1.png")
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-2.png")
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-3.png")
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-4.png")
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-5.png")
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/clients/client-6.png")
                                },
                            ]
                        },
                    }
                    widget.data=client;
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <!-- ======= Clients Section ======= -->
                            <section id="clients" class="clients">
                                <div class="container" data-aos="zoom-out">
                                  <div class="section-title" data-aos="fade-up">
                                      <h2>${client.title}</h2>
                                      <p>${client.desc}</p>
                                 </div>
                                <div class="row no-gutters clients-wrap clearfix wow fadeInUp">
                                    ${glitter.print(function () {
                                    var tmp = "";
                                    client.dataList.list.map((c:any) => {
                                        tmp += /*html*/ `
                                      <div class="col-lg-3 col-md-4 col-xs-6">
                                        <div class="client-logo" data-aos="zoom-in">
                                          <img src="${c.img}" class="img-fluid" alt="">
                                        </div>
                                      </div>`;
                                        });
                                        return tmp;
                                    })}
                                </div>
                              </div>
                            </section>
                            <!-- End Clients Section -->
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
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題敘述',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.dataList,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.dataList.list.map((dd: any, index: number) => {
                                return {
                                    title: `用戶:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '用戶圖片',
                                            def:dd.img,
                                            callback:(data)=>{
                                                dd.img=data
                                                widget.refreshComponent()
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.dataList.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.dataList,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({img:""});
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