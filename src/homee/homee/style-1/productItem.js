import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { ScriptStyle1 } from "../../script-style-1.js";
export const product = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {
            data: {
                id: 8837303,
                name: "HOVE 雙人床架",
                price: 23580,
                sale_price: 23580,
                preview_image: "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/qwsdcdsw.jpg?v=1675758840"
            },
            clickEvent: {
                src: "http://127.0.0.1:3090/test/homee/event.js",
                route: "toProductDetail"
            }
        },
        render: (gvc, widget, setting, hoverID) => {
            widget.data.data = widget.data.data ?? {
                id: 8837303,
                name: "HOVE 雙人床架",
                price: 23580,
                sale_price: 23580,
                preview_image: [{ url: ScriptStyle1.getRout('../img/21003239.webp') }, { url: "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/qwsdcdsw.jpg?v=1675758840" }, { url: "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/qwsdcdsw.jpg?v=1675758840" }]
            };
            widget.data.clickEvent = widget.data.clickEvent ?? {
                src: "http://127.0.0.1:3090/test/homee/event.js",
                route: "toProductDetail"
            };
            let images = widget.data.data.images ?? widget.data.data.preview_image;
            gvc.addStyleLink(`https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css`);
            gvc.addStyle(`
                    .swiper-pagination-bullet {
                        background: #E0E0E0!important;;                    
                    }
                    .swiper-pagination-bullet-active{
                        background: #FE5541!important;;
                    }
                `);
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    const pageID = glitter.getUUID();
                    return `
                    <div class="${widget.data.class ?? ""}p-0 w-100" style="${widget.data.style ?? ""}; 
                        break-inside: avoid;margin-top: 16px;                                
                        height: auto;background: #FBF9F6;border-radius: 16px;" onclick="${gvc.event(() => {
                        console.log(widget.data);
                        TriggerEvent.trigger({
                            gvc,
                            widget,
                            clickEvent: widget.data
                        });
                    })}">
                                
                    ${gvc.bindView({
                        bind: pageID,
                        view: () => {
                            return `
                              <!-- Additional required wrapper -->
                              <div class="swiper-wrapper w-100" style="background-clip: padding-box;">
                                <!-- Slides -->
                                ${(() => {
                                let returnHTML = ``;
                                for (let i = 0; i < 3 && i < images.length; i++) {
                                    returnHTML += `
                                            <div class="swiper-slide" style="padding-bottom: 100%;background: 50%/cover no-repeat url('${images[i].url}') , white;"></div>
                                        `;
                                }
                                return returnHTML;
                            })()}                                                                                
                              </div>
                              <div class="w-100" style="position:absolute;left:0;top:0;height:100%;border: 4px solid rgba(248, 243, 237, 0.3);background:transparent;z-index: 3;border-radius: 16px;pointer-events:none;" onscroll=""></div>
                              <!-- If we need pagination -->
                              <div class="swiper-pagination" id="${pageID}"></div>                                                                                                                                                                          
                            `;
                        }, divCreate: { class: `swiper ${pageID} w-100`, style: `border-radius: 16px;position: relative;` },
                        onCreate: () => {
                            glitter.addMtScript([{
                                    src: 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js'
                                }], () => {
                                const Swiper = window.Swiper;
                                const swiper = new Swiper(`.${pageID}`, {
                                    slidesPerView: 'auto',
                                    direction: 'horizontal',
                                    loop: false,
                                    pagination: {
                                        el: `#${pageID}`,
                                    },
                                });
                            }, () => {
                            });
                        }
                    })}
<!--                                <div class="w-100 m-0" style="box-sizing:border-box;border-radius: 16px;padding-bottom: 100%;background: 50%/cover no-repeat url('${widget.data.data.preview_image}'), white;"></div>-->
                    <h3 class="w-100" style="padding:0 8px;font-family: 'Noto Sans TC';font-style: normal;font-weight: 700;font-size: 14px;margin-top: 8px;word-break: break-word;white-space: normal;margin-bottom: 0px;color: #292929;">
                        ${widget.data.data.name ?? "尚未設定"}
                    </h3>
                    <div class="d-flex align-items-baseline" style="padding:0 8px;margin-top: 8px;padding-bottom: 8px;">
                        <span style="font-family: 'Noto Sans TC';font-style: normal;font-weight: 400;font-size: 14px;color: #FD6A58;line-height: 150%;">
                            NT$ ${widget.data.data.sale_price ?? "尚未設定"} ${(() => {
                        if (widget.data.data.showUp) {
                            return "up";
                        }
                        return "";
                    })()}
                        </span>
                        <div class="flex-fill"></div>
                        <span class="${(widget.data.data.price === widget.data.data.sale_price) ? `d-none` : ``}" style="font-family: 'Noto Sans TC';font-style: normal;font-weight: 400;font-size: 10px;line-height: 14px;text-align: right;text-decoration-line: line-through;color: #858585;" >
                            NT$ ${widget.data.data.sale_price}
                        </span>
                    </div>
                </div>
                    `;
                },
                editor: () => {
                    return gvc.map([
                        TriggerEvent.editer(gvc, widget, widget.data, {
                            option: ['toProductDetail'],
                            hover: true
                        })
                    ]);
                }
            };
        },
    };
});
