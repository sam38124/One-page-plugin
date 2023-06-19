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
                    widget.data.dataList = widget.data.dataList ?? [
                        {
                            name: "陳志賢",
                            pro: "平面設計師",
                            img: ScriptStyle1.getRout("img/testimonial-2.jpg"),
                            text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
                        },
                        { name: "陳佳玲", pro: "寵物店 店長", img: ScriptStyle1.getRout("img/testimonial-1.jpg"), text: "萊恩設計公司的服務與溝通方式很友善" },
                        { name: "韓俊榮", pro: "XX拉麵 廚師兼店長", img: ScriptStyle1.getRout("img/testimonial-3.jpg"), text: "合作得很愉快，很喜歡萊恩設計" },
                        {
                            name: "黃國玟",
                            pro: "OO診所 護理師",
                            img: ScriptStyle1.getRout("img/testimonial-4.jpg"),
                            text: "達成客戶的需求，替客戶早一步想到問題點很棒",
                        },
                    ]

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let test=widget.data.dataList
                            console.log("---------------------data-----------------")
                            console.log(test)
                            return /*html*/ `
        <!-- Testimonial Start -->
        <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
          <div class="container px-lg-5">
            <div class="owl-carousel testimonial-carousel">
              ${glitter.print(function () {
                                var tmp = "";
                                test.map((t:any) => {
                                    tmp += /*html*/ `
                    <div class="testimonial-item position-relative bg-light border-top border-5 border-primary rounded p-4 my-4">
                      <div
                        class="d-flex align-items-center justify-content-center position-absolute top-0 start-0 ms-5 translate-middle bg-primary rounded-circle"
                        style="width: 45px; height: 45px; margin-top: -3px;"
                      >
                        <i class="fa fa-quote-left text-white"></i>
                      </div>
                      <p class="mt-3">「${t.text}」</p>
                      <div class="d-flex align-items-center">
                        <img class="img-fluid flex-shrink-0 rounded-circle" src="${t.img}" style="width: 50px; height: 50px;" />
                        <div class="ps-3">
                          <h6 class="fw-bold mb-1">${t.name}</h6>
                          <small>${t.pro}</small>
                        </div>
                      </div>
                    </div>
                  `;
                                });
                                return tmp;
                            })}
            </div>
          </div>
        </div>
        <!-- Testimonial End -->
      `;
                        },divCreate:{},
                        onCreate:()=>{

                            (function ($) {
                                // @ts-ignore
                                $(".testimonial-carousel").owlCarousel({
                                    autoplay: true,
                                    smartSpeed: 1000,
                                    margin: 25,
                                    dots: true,
                                    loop: true,
                                    center: true,
                                    responsive: {
                                        0: {
                                            items: 1,
                                        },
                                        576: {
                                            items: 1,
                                        },
                                        768: {
                                            items: 2,
                                        },
                                        992: {
                                            items: 3,
                                        },
                                    },
                                });
                            })(jQuery);
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
                                    name: "黃國玟",
                                    pro: "OO診所 護理師",
                                    img: ScriptStyle1.getRout("img/testimonial-4.jpg"),
                                    text: "達成客戶的需求，替客戶早一步想到問題點很棒",
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