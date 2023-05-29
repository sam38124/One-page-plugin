import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {
            link: []
        },
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            // https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1677773334893
            //https://prd-homee-api-public.s3.amazonaws.com/scene/undefined/1678638656166
            widget.data.link = widget.data.link ?? [{img: `https://oursbride.com/wp-content/uploads/2018/06/no-image.jpg`}]
            let data: { link: { img: string, code?: string, clickEvent?: any }[] } = {
                link : widget.data.link
            }
            // const data: { link: { img: string, code?: string, clickEvent?: any }[] } = widget.data
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    gvc.addStyle(`
            .swiper-pagination-bullet{
            background-color: black !important;
            }
              .swiper-pagination-bullet-active{
            width:8px !important;
            background-color: white  !important;
            }
            `)
                    gvc.addStyleLink(`https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css`)
                    function slideControl(pageImgArray: any, pagination: boolean, navigation: boolean, scrollbar: boolean) {
                        const glitter = gvc.glitter
                        gvc.addStyle(`
            .swiper-slide{
                width: 100%;
                background-repeat: no-repeat;
            }
             .swiper-pagination-bullet {
                            ${(()=>{
                            if (widget.data.slideColor){
                                return `background: ${widget.data.slideColor};`;
                            }else return ``
                        })()}
                            ${(()=>{
                            if (widget.data.slideBorderColor){
                                return `background: ${widget.data.slideBorderColor};`;
                            }else return ``
                        })()}                            
                            width:7px;
                            height:7px;                         
                        }
                        .swiper-pagination-bullet-active {
                      
                            ${(()=>{
                            if (widget.data.slideSelectColor){
                                return `background: ${widget.data.slideSelectColor};`;
                            }else return ``
                        })()}
                            ${(()=>{
                            if (widget.data.slideSelectBorderColor){
                                return `border: ${widget.data.slideSelectBorderColor};`;
                            }else return ``
                        })()}                       
                        }
        `)
                        let slidePage = ``
                        pageImgArray.forEach((item: any, index: number) => {
                            // <!-- Slides -->
                            slidePage += `
                 <div class="swiper-slide" style="padding-bottom: ${widget.data.height ?? 128}%; background:50% / cover url(${item.img});" onclick="${gvc.event(() => {
                                TriggerEvent.trigger({
                                    gvc, widget, clickEvent: item.clickEvent
                                })
                            })}">
                </div>
            `
                        })
                        let id = `${glitter.getUUID()}`
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
                                        return `<div class="swiper-pagination"></div>`
                                    } else {
                                        return ``
                                    }
                                })()}
              ${(() => {
                                    if (navigation) {
                                        return `
                          <div class="swiper-button-prev"></div>
                          <div class="swiper-button-next"></div>`
                                    } else {
                                        return ''
                                    }
                                })()}
              ${(() => {
                                    if (scrollbar) {
                                        return `<div class="swiper-scrollbar"></div>`
                                    } else {
                                        return ``
                                    }
                                })()}
              `
                            },
                            divCreate: {class: `swiper ${id}`},
                            onCreate: () => {
                                glitter.addMtScript([{
                                    src: 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js'
                                }], () => {
                                    const Swiper = (window as any).Swiper

                                    const swiper = new Swiper(`.${id}`, {
                                        // Optional parameters
                                        direction: 'horizontal',
                                        loop: true,
                                        // If we need pagination
                                        pagination: {
                                            el: `.${id} .swiper-pagination`,
                                        },
                                        // Navigation arrows
                                        navigation: {
                                            nextEl: `.${id} .swiper-button-next`,
                                            prevEl: `.${id} .swiper-button-prev`,
                                        },
                                        // And if we need scrollbar
                                        scrollbar: {
                                            el: `.${id} .swiper-scrollbar`,
                                        },
                                    });
                                    glitter.share.swiper=glitter.share.swiper ?? []
                                    glitter.share.swiper.push(swiper)
                                }, () => {
                                })
                            }
                        })}
        `;
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return slideControl(data.link, true, false, false)

                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor: () => {
                    const editorID = glitter.getUUID()
                    if (data.link.length==0){
                        data.link.push({img: `https://oursbride.com/wp-content/uploads/2018/06/no-image.jpg`});
                    }
                    return gvc.map([
                        // slideColor:"#E0E0E0",
                        // slideBorderColor:"",
                        // slideSelectColor:"#FFFFFF",
                        // slideSelectBorderColor:"1px solid #FE5541",
                        `
                            <h3 class="text-black" style="font-size: 16px;">圖片標示點顏色</h3>
                            <div class="d-flex align-items-center">                                
                                <input class="" type="color" value="${widget.data.slideColor ?? ""}" onchange="${gvc.event((e:HTMLInputElement)=>{
                            widget.data.slideColor = e.value;
                            widget.refreshAll();
                        })}">
                                <input class="form-control" type="text" value="${widget.data.slideColor ?? ""}" onchange="${gvc.event((e:HTMLInputElement)=>{
                            widget.data.slideColor = e.value
                            widget.refreshAll();
                        })}">
                            </div>
                            <h3 class="text-black" style="font-size: 16px;">圖片標示點邊框(border的Css)</h3>
                            <div class="d-flex align-items-center">                                
                                <input class="form-control" type="text" value="${widget.data.slideBorderColor ?? ""}" onchange="${gvc.event((e:HTMLInputElement)=>{
                            widget.data.slideBorderColor = e.value
                            widget.refreshAll();
                        })}">
                            </div>
                            <h3 class="text-black" style="font-size: 16px;">目前圖片標示點顏色</h3>
                            <div class="d-flex align-items-center">                                
                                <input class="" type="color" value="${widget.data.slideSelectColor ?? ""}" onchange="${gvc.event((e:HTMLInputElement)=>{
                            widget.data.slideSelectColor = e.value;
                            widget.refreshAll();
                        })}">
                                <input class="form-control" type="text" value="${widget.data.slideSelectColor ?? ""}" onchange="${gvc.event((e:HTMLInputElement)=>{
                            widget.data.slideSelectColor = e.value
                            widget.refreshAll();
                        })}">
                            </div>
                            <h3 class="text-black" style="font-size: 16px;">目前圖片標示點邊框(border的Css)</h3>
                            <div class="d-flex align-items-center">                                
                                <input class="form-control" type="text" value="${widget.data.slideSelectBorderColor ?? ""}" onchange="${gvc.event((e:HTMLInputElement)=>{
                            widget.data.slideSelectBorderColor = e.value
                            widget.refreshAll();
                        })}">
                            </div>
<!--                                1px solid #FE5541-->
                            <h3 style="color: black;font-size: 16px;margin-bottom: 10px;" class="mt-2">圖片寬高比</h3>
                            <input class="mt-2 form-control" value="${widget.data.height??128}" onchange="${gvc.event((e:HTMLInputElement)=>{
                            widget.data.height = e.value;
                            widget.refreshAll();
                        })}">
<!--                            data.link-->
                            `,
                        Editor.arrayItem({
                            originalArray:widget.data.link,
                            gvc: gvc,
                            title: '輪播圖',
                            array: widget.data.link.map((dd: any, index: number) => {
                                dd.clickEvent = dd.clickEvent ?? {}
                                return {
                                    title: `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '圖片',
                                            def:dd.img,
                                            callback:(data)=>{
                                                dd.img=data
                                                widget.refreshComponent()
                                            }
                                        }),
                                        TriggerEvent.editer(gvc, widget, dd.clickEvent, {
                                            hover: true,
                                            option: [],
                                            title: "點擊事件"
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.link.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.link.push({img: `https://oursbride.com/wp-content/uploads/2018/06/no-image.jpg`})
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