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
                    widget.data.title = widget.data.title ?? "合作夥伴";
                    widget.data.desc = widget.data.desc ?? "萊恩設計公司的服務與顧客的合作"
                    widget.data.client = widget.data.client ?? {
                        clientLogo:[
                            {img:ScriptStyle1.getRout("assets/img/clients/client-1.png")},
                            {img:ScriptStyle1.getRout("assets/img/clients/client-2.png")},
                            {img:ScriptStyle1.getRout("assets/img/clients/client-3.png")},
                            {img:ScriptStyle1.getRout("assets/img/clients/client-4.png")},
                            {img:ScriptStyle1.getRout("assets/img/clients/client-5.png")},
                            {img:ScriptStyle1.getRout("assets/img/clients/client-6.png")}
                        ],
                    }




                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let client:{
                                title:string,
                                desc:string,
                                client:{
                                    clientLogo:{
                                        img:string
                                    }[]
                                }
                            } = {
                                title : widget.data.title,
                                desc : widget.data.desc,
                                client : widget.data.client,
                            }
                            return /*html*/ `
        <!-- ======= Clients Section ======= -->
        <section id="client" class="clients section-bg">
          <div class="container mt-5" data-aos="fade-up">
            <div class="section-title">
              <h2>${client.title}</h2>
              <p>${client.desc}</p>
            </div>

            <div class="clients-slider swiper" data-aos="fade-up" data-aos-delay="100">
              <div class="swiper-wrapper align-items-center">
                ${glitter.print(function () {
                                var tmp = "";
                                client.client.clientLogo.map((t) => {
                                    tmp += /*html*/ ` <div class="swiper-slide"><img src="${t.img}" class="img-fluid" alt="" /></div> `;
                                });
                                return tmp;
                            })}
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </section>
        <!-- End Clients Section -->
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                            // @ts-ignore
                            new Swiper(".clients-slider", {
                                speed: 400,
                                loop: true,
                                autoplay: {
                                    delay: 5000,
                                    disableOnInteraction: false,
                                },
                                slidesPerView: "auto",
                                pagination: {
                                    el: ".swiper-pagination",
                                    type: "bullets",
                                    clickable: true,
                                },
                                breakpoints: {
                                    320: {
                                        slidesPerView: 2,
                                        spaceBetween: 40,
                                    },
                                    480: {
                                        slidesPerView: 3,
                                        spaceBetween: 60,
                                    },
                                    640: {
                                        slidesPerView: 4,
                                        spaceBetween: 80,
                                    },
                                    992: {
                                        slidesPerView: 6,
                                        spaceBetween: 120,
                                    },
                                },
                            });
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
                            placeHolder: '輸入副標題內容',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.client,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.client.clientLogo.map((dd: any, index: number) => {
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
                                        widget.data.list.clientLogo.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.client,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.client.clientLogo.push({img:""});
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