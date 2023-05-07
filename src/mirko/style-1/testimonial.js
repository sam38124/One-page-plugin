import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let test = {
                        title: widget.data.title ?? "給客戶滿意的網站設計，是我們致力奉獻的服務",
                        desc: widget.data.desc ?? "可以看看我們的客戶與業主給我們什麼樣的回饋！",
                        dataList: widget.data.dataList ?? {
                            list: [
                                {
                                    name: "陳志賢",
                                    pro: "平面設計師",
                                    img: ScriptStyle1.getRout("./assets/images/testimonial-1.jpg"),
                                    text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
                                },
                                { name: "陳佳玲", pro: "寵物店 店長", img: ScriptStyle1.getRout("./assets/images/testimonial-2.jpg"), text: "萊恩設計公司的服務與溝通方式很友善" },
                                { name: "韓俊榮", pro: "XX拉麵 廚師兼店長", img: ScriptStyle1.getRout("./assets/images/testimonial-3.jpg"), text: "合作得很愉快，很喜歡萊恩設計" },
                                {
                                    name: "黃國玟",
                                    pro: "OO診所 護理師",
                                    img: ScriptStyle1.getRout("./assets/images/testimonial-4.jpg"),
                                    text: "達成客戶的需求，替客戶早一步想到問題點很棒",
                                },
                            ],
                        },
                    };
                    widget.data = test;
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
        <div class="slider-1 testimonial text-light d-flex align-items-center" id="test">
          <div class="container">
            <div class="row">
              <div class="text-center w-lg-75 m-auto pb-4">
                <p class="mb-3">客戶們的評價</p>
                <h2 class="py-2">${test.title}</h2>
                <p class="para-light">${test.desc}</p>
              </div>
            </div>
            <!-- end of row -->
            <div class="row p-2" data-aos="zoom-in">
              <div class="col-lg-12">
                <!-- Card Slider -->
                <div class="slider-container">
                  <div class="swiper-container card-slider">
                    <div class="swiper-wrapper">
                      ${glitter.print(function () {
                                var tmp = "";
                                test.dataList.list.map((l) => {
                                    tmp += `
                            <!-- Slide -->
                            <div class="swiper-slide">
                              <div class="testimonial-card p-4">
                                <p>「${l.text}」</p>
                                <div class="d-flex pt-4">
                                  <div><img class="avatar" src="${l.img}" alt="testimonial" /></div>
                                  <div class="ms-3 pt-2">
                                    <h6>${l.name}</h6>
                                    <p>${l.pro}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- end of swiper-slide -->
                            <!-- end of slide -->
                          `;
                                });
                                return tmp;
                            })}
                    </div>
                    <!-- end of swiper-wrapper -->

                    <!-- Add Arrows -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <!-- end of add arrows -->
                  </div>
                  <!-- end of swiper-container -->
                </div>
                <!-- end of slider-container -->
                <!-- end of card slider -->
              </div>
              <!-- end of col -->
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </div>
      `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                            var cardSlider = new Swiper(".card-slider", {
                                autoplay: {
                                    delay: 4000,
                                    disableOnInteraction: false,
                                },
                                loop: true,
                                navigation: {
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                },
                                slidesPerView: 3,
                                spaceBetween: 70,
                                breakpoints: {
                                    767: {
                                        slidesPerView: 1,
                                    },
                                    991: {
                                        slidesPerView: 2,
                                        spaceBetween: 40,
                                    },
                                },
                            });
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title,
                            placeHolder: '這段的大標',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '副標題',
                            default: widget.data.desc,
                            placeHolder: '給一段適合的副標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.dataList,
                            gvc: gvc,
                            title: '客戶回饋資訊卡',
                            array: widget.data.dataList.list.map((dd, index) => {
                                return {
                                    title: `資訊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `客戶名稱`,
                                            default: dd.name,
                                            placeHolder: '輸入客戶名稱',
                                            callback: (text) => {
                                                dd.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `客戶職業`,
                                            default: dd.pro,
                                            placeHolder: '輸入客戶職業',
                                            callback: (text) => {
                                                dd.pro = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `客戶回饋`,
                                            default: dd.text,
                                            placeHolder: '輸入客戶回饋',
                                            callback: (text) => {
                                                dd.text = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '圖片',
                                            def: dd.img,
                                            callback: (data) => {
                                                dd.img = data;
                                                widget.refreshComponent();
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
                                    widget.data.dataList.list.push({
                                        name: "黃國玟",
                                        pro: "OO診所 護理師",
                                        img: ScriptStyle1.getRout("./assets/images/testimonial-4.jpg"),
                                        text: "達成客戶的需求，替客戶早一步想到問題點很棒",
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        })
                    ]);
                }
            };
        },
    };
});
