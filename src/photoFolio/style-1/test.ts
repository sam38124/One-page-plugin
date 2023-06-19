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
                    widget.data.title = widget.data.title ?? "Testimonials";
                    widget.data.desc = widget.data.desc ?? "What they are saying";
                    widget.data.dataList = widget.data.dataList ?? [
                        {
                            name: "Saul Goodman",
                            pro: "Ceo &amp; Founder",
                            img: ScriptStyle1.getRout("assets/img/testimonials/testimonials-1.jpg"),
                            text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
                        },
                        { name: "Sara Wilsson", pro: "Designer", img: ScriptStyle1.getRout("assets/img/testimonials/testimonials-2.jpg"), text: "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa." },
                        { name: "Jena Karlis", pro: "Store Owner", img: ScriptStyle1.getRout("assets/img/testimonials/testimonials-3.jpg"), text: "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim." },
                        {
                            name: "Matt Brandon",
                            pro: "Freelancer",
                            img: ScriptStyle1.getRout("assets/img/testimonials/testimonials-4.jpg"),
                            text: "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.",
                        },
                        {
                            name: "John Larson",
                            pro: "Entrepreneur",
                            img: ScriptStyle1.getRout("assets/img/testimonials/testimonials-5.jpg"),
                            text: "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.",
                        }
                    ]

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let test:{
                                title : string,
                                desc : string,
                                dataList:{
                                    name : string,
                                    pro : string,
                                    img : string,
                                    text : string
                                }[]
                            }={
                                title:widget.data.title,
                                desc:widget.data.desc,
                                dataList:widget.data.dataList
                            }

                            return /*html*/ `
<main>
<!-- ======= Testimonials Section ======= -->
    <section id="testimonials" class="testimonials">
      <div class="container">

        <div class="section-header">
          <h2>Testimonials</h2>
          <p>What they are saying</p>
        </div>

        <div class="slides-3 swiper">
          <div class="swiper-wrapper">
            ${(()=>{
                let html = ``;
                test.dataList.map((data)=>{
                    html += `
                    <div class="swiper-slide">
                      <div class="testimonial-item">
                        <div class="stars">
                          <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                        </div>
                        <p>
                          ${data.text}
                        </p>
                        <div class="profile mt-auto">
                          <img src="${data.img}" class="testimonial-img" alt="">
                          <h3>${data.name}</h3>
                          <h4>${data.pro}</h4>
                        </div>
                      </div>
                    </div><!-- End testimonial item -->
                    `
                })    
                return html
            })()}

          </div>
          <div class="swiper-pagination"></div>
        </div>

      </div>
    </section><!-- End Testimonials Section -->
</main>
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();


                            /**
                             * Init swiper slider with 3 slides at once in desktop view
                             */
                            // @ts-ignore
                            new Swiper('.slides-3', {
                                speed: 600,
                                loop: true,
                                autoplay: {
                                    delay: 5000,
                                    disableOnInteraction: false
                                },
                                slidesPerView: 'auto',
                                pagination: {
                                    el: '.swiper-pagination',
                                    type: 'bullets',
                                    clickable: true
                                },
                                navigation: {
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                },
                                breakpoints: {
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 40
                                    },

                                    1200: {
                                        slidesPerView: 3,
                                    }
                                }
                            });

                        }

                    })
                },
                editor:()=>{
                    return Editor.arrayItem({
                        originalArray:widget.data.dataList,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.dataList.map((dd: any, index: number) => {
                            return {
                                title: dd.name || `人員1:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `索引`,
                                        default: dd.name,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.name = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `職稱`,
                                        default: dd.pro,
                                        placeHolder: '輸入職位名稱',
                                        callback: (text) => {
                                            dd.pro = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `回饋`,
                                        default: dd.text,
                                        placeHolder: '輸入回饋文字',
                                        callback: (text) => {
                                            dd.text = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: '人物圖片',
                                        def:dd.img,
                                        callback:(data)=>{
                                            dd.img=data
                                            widget.refreshComponent()
                                        }
                                    })
                                ]),
                                minus: gvc.event(() => {
                                    widget.data.dataList.splice(index, 1);
                                    widget.refreshComponent();
                                }),
                            };
                        }),
                        expand: widget.data,
                        plus: {
                            title: '添加人員',
                            event: gvc.event(() => {
                                widget.data.dataList.push({
                                    name: "陳志賢",
                                    pro: "平面設計師",
                                    img: ScriptStyle1.getRout("assets/img/testimonials/testimonials-1.jpg"),
                                    text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
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