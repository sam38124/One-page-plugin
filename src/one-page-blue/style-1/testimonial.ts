import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
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
                    let test= {
                        title: "給客戶滿意的網站設計，是我們致力奉獻的服務",
                            desc: "可以看看我們的客戶與業主給我們什麼樣的回饋！",
                            dataList:{
                                list: [
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
                                    },
                                ],
                            },

                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{

                            return `
                            <!-- ======= Testimonials Section ======= -->
                            <section id="test" class="testimonials">
                              <div class="container">
                                <div class="section-title" data-aos="fade-up">
                                  <h2>${test.title}</h2>
                                  <p>${test.desc}</p>
                                </div>
                    
                                <div class="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                                  <div class="swiper-wrapper">
                                  ${glitter.print(function () {
                                        var tmp = "";
                                        test.dataList.list.map((l) => {
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
                                  <div class="id swiper-pagination"></div>
                                </div>
                              </div>
                            </section>
                            <!-- End Testimonials Section -->
                            `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                            /**
                             * Testimonials slider
                             */
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
                                    el: `.${id} .swiper-pagination`,
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
                    return ``
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
                                    ClickEvent.editer(gvc, widget, dd, {
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