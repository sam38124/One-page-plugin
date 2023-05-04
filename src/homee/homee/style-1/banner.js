import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { ScriptStyle1 } from "../../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {
            link: []
        },
        render: (gvc, widget, setting, hoverID) => {
            const data = widget.data;
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    function slideControl(pageImgArray, pagination, navigation, scrollbar) {
                        const glitter = gvc.glitter;
                        gvc.addStyle(`
                        .swiper-slide{
                            width: 100%;
                            background-repeat: no-repeat;
                        }
                         .swiper-pagination-bullet {
                            ${(() => {
                            if (widget.data.slideColor) {
                                return `background: ${widget.data.slideColor};`;
                            }
                            else
                                return ``;
                        })()}
                            ${(() => {
                            if (widget.data.slideBorderColor) {
                                return `background: ${widget.data.slideBorderColor};`;
                            }
                            else
                                return ``;
                        })()}                            
                            width:7px;
                            height:7px;                         
                        }
                        .swiper-pagination-bullet-active {
                      
                            ${(() => {
                            if (widget.data.slideSelectColor) {
                                return `background: ${widget.data.slideSelectColor};`;
                            }
                            else
                                return ``;
                        })()}
                            ${(() => {
                            if (widget.data.slideSelectBorderColor) {
                                return `border: ${widget.data.slideSelectBorderColor};`;
                            }
                            else
                                return ``;
                        })()}                       
                            }
                        `);
                        let slidePage = ``;
                        pageImgArray.forEach((item, index) => {
                            slidePage += `
                            <div class="swiper-slide" style="padding-bottom: ${widget.data.height ?? 128}%; background:50% / cover url(${item.img});" onclick="${gvc.event(() => {
                                TriggerEvent.trigger({
                                    gvc, widget, clickEvent: item
                                });
                            })}">
                            </div>
            `;
                        });
                        let id = `${glitter.getUUID()}`;
                        return `
            <!-- Slider main container -->
            ${gvc.bindView({
                            bind: id,
                            view: () => {
                                return `
              <div class="swiper-wrapper">
                  ${slidePage}
              </div>
              ${(() => {
                                    if (pagination) {
                                        return `<div class="swiper-pagination"></div>`;
                                    }
                                    else {
                                        return ``;
                                    }
                                })()}
              ${(() => {
                                    if (navigation) {
                                        return `
                          <div class="swiper-button-prev"></div>
                          <div class="swiper-button-next"></div>`;
                                    }
                                    else {
                                        return '';
                                    }
                                })()}
              ${(() => {
                                    if (scrollbar) {
                                        return `<div class="swiper-scrollbar"></div>`;
                                    }
                                    else {
                                        return ``;
                                    }
                                })()}
              `;
                            },
                            divCreate: { class: `swiper ${id}` },
                            onCreate: () => {
                                glitter.addMtScript([{
                                        src: 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js'
                                    }], () => {
                                    const Swiper = window.Swiper;
                                    const swiper = new Swiper(`.${id}`, {
                                        direction: 'horizontal',
                                        loop: true,
                                        pagination: {
                                            el: `.${id} .swiper-pagination`,
                                        },
                                        navigation: {
                                            nextEl: `.${id} .swiper-button-next`,
                                            prevEl: `.${id} .swiper-button-prev`,
                                        },
                                        scrollbar: {
                                            el: `.${id} .swiper-scrollbar`,
                                        },
                                    });
                                    glitter.share.swiper = glitter.share.swiper ?? [];
                                    glitter.share.swiper.push(swiper);
                                }, () => {
                                });
                            }
                        })}
        `;
                    }
                    gvc.addStyle(`
            .swiper-pagination-bullet{
            background-color: black !important;
            }
              .swiper-pagination-bullet-active{
            width:8px !important;
            background-color: white  !important;
            }
            `);
                    gvc.addStyleLink(`https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css`);
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return slideControl(widget.data.link, true, false, false);
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    const editorID = glitter.getUUID();
                    return gvc.map([
                        `
                            <h3 class="text-white" style="font-size: 16px;">圖片標示點顏色</h3>
                            <div class="d-flex align-items-center">                                
                                <input class="" type="color" value="${widget.data.slideColor ?? ""}" onchange="${gvc.event((e) => {
                            widget.data.slideColor = e.value;
                            widget.refreshAll();
                        })}">
                                <input class="form-control" type="text" value="${widget.data.slideColor ?? ""}" onchange="${gvc.event((e) => {
                            widget.data.slideColor = e.value;
                            widget.refreshAll();
                        })}">
                            </div>
                            <h3 class="text-white" style="font-size: 16px;">圖片標示點邊框(border的Css)</h3>
                            <div class="d-flex align-items-center">                                
                                <input class="form-control" type="text" value="${widget.data.slideBorderColor ?? ""}" onchange="${gvc.event((e) => {
                            widget.data.slideBorderColor = e.value;
                            widget.refreshAll();
                        })}">
                            </div>
                            <h3 class="text-white" style="font-size: 16px;">目前圖片標示點顏色</h3>
                            <div class="d-flex align-items-center">                                
                                <input class="" type="color" value="${widget.data.slideSelectColor ?? ""}" onchange="${gvc.event((e) => {
                            widget.data.slideSelectColor = e.value;
                            widget.refreshAll();
                        })}">
                                <input class="form-control" type="text" value="${widget.data.slideSelectColor ?? ""}" onchange="${gvc.event((e) => {
                            widget.data.slideSelectColor = e.value;
                            widget.refreshAll();
                        })}">
                            </div>
                            <h3 class="text-white" style="font-size: 16px;">目前圖片標示點邊框(border的Css)</h3>
                            <div class="d-flex align-items-center">                                
                                <input class="form-control" type="text" value="${widget.data.slideSelectBorderColor ?? ""}" onchange="${gvc.event((e) => {
                            widget.data.slideSelectBorderColor = e.value;
                            widget.refreshAll();
                        })}">
                            </div>

<!--                                1px solid #FE5541-->
                            
                            `,
                        gvc.bindView({
                            bind: editorID,
                            view: () => {
                                function swapArr(arr, index1, index2) {
                                    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                                    return arr;
                                }
                                return `
<h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">圖片寬高比</h3>
<input class="mt-2 form-control" value="${widget.data.height ?? 128}" onchange="${gvc.event((e) => {
                                    widget.data.height = e.value;
                                    widget.refreshAll();
                                })}">
<h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">圖片連結</h3>
<div class="mt-2"></div>
`;
                            },
                            divCreate: {}
                        })
                    ]);
                }
            };
        },
    };
});
