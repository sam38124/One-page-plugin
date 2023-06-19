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
                    widget.data.title = widget.data.title ?? "給客戶滿意的網站設計，是我們致力奉獻的服務";
                    widget.data.desc = widget.data.desc ?? "可以看看我們的客戶與業主給我們什麼樣的回饋！";
                    widget.data.dataList = widget.data.dataList ?? [
                        {
                            name: "陳志賢",
                            pro: "平面設計師",
                            img: ScriptStyle1.getRout("assets/img/testimonials/testimonials-1.jpg"),
                            text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
                        },
                        { name: "陳佳玲", pro: "寵物店 店長", img: ScriptStyle1.getRout("assets/img/testimonials/testimonials-2.jpg"), text: "萊恩設計公司的服務與溝通方式很友善" },
                        { name: "韓俊榮", pro: "XX拉麵 廚師兼店長", img: ScriptStyle1.getRout("assets/img/testimonials/testimonials-3.jpg"), text: "合作得很愉快，很喜歡萊恩設計" },
                        {
                            name: "黃國玟",
                            pro: "OO診所 護理師",
                            img: ScriptStyle1.getRout("assets/img/testimonials/testimonials-4.jpg"),
                            text: "達成客戶的需求，替客戶早一步想到問題點很棒",
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
        <!-- ======= Testimonials Section ======= -->
        <section id="testimonials" class="testimonials">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${test.title}</h2>
              <p>${test.desc}</p>
            </div>

            <div class="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
              <div class="swiper-wrapper">
                ${glitter.print(function () {
                                var tmp = "";
                                test.dataList.map((l) => {
                                    tmp += /*html*/ `
                      <div class="swiper-slide">
                        <div class="testimonial-item">
                          <p>
                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                            ${l.text}
                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                          </p>
                          <img src="${l.img}" class="testimonial-img" alt="" />
                          <h3>${l.name}</h3>
                          <h4>${l.pro}</h4>
                        </div>
                      </div>
                      <!-- End testimonial item -->
                    `;
                                });
                                return tmp;
                            })}
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </section>
        <!-- End Testimonials Section -->
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();

                            // @ts-ignore
                            new Swiper(".testimonials-slider", {
                                speed: 600,
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
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },

                                    1200: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                },
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