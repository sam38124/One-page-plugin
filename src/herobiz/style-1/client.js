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
                    let client = widget.data.dataList ?? {
                        dataList: {
                            list: [
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
                                }
                            ]
                        },
                    };
                    widget.data = client;
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
        <!-- ======= Clients Section ======= -->
        <section id="clients" class="clients">
          <div class="container" data-aos="zoom-out">
            <div class="clients-slider swiper">
              <div class="swiper-wrapper align-items-center">
              ${glitter.print(function () {
                                var tmp = "";
                                client.dataList.list.map((c) => {
                                    tmp += ` <div class="swiper-slide"><img src="${c.img}" class="img-fluid" alt="" /></div> `;
                                });
                                return tmp;
                            })}
              </div>
            </div>
          </div>
        </section>
        <!-- End Clients Section -->
      `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                            new Swiper(".clients-slider", {
                                speed: 400,
                                loop: true,
                                autoplay: {
                                    delay: 5000,
                                    disableOnInteraction: false,
                                },
                                slidesPerView: "auto",
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
                    });
                },
                editor: () => {
                    return gvc.map([
                        Editor.arrayItem({
                            originalArray: widget.data.dataList,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.dataList.list.map((dd, index) => {
                                return {
                                    title: `用戶:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '用戶圖片',
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
                                    widget.data.dataList.list.push({ img: "" });
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
