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
                    widget.data.title = widget.data.title ??"What Our Patients Say"
                    widget.data.dataList = widget.data.dataList??{
                        list:[
                            {
                                desc: `Id mollis consectetur congue egestas egestas suspendisse blandit justo. Tellus augue commodo id quis tempus etiam pulvinar at maecenas.`,
                                star: 3,
                                img:ScriptStyle1.getRout('assets/img/avatar/30.jpg'),
                                name : 'Fannie Summers',
                                pro : 'Medical Center patient'
                            },
                            {
                                desc: `Phasellus luctus nisi id orci condimentum, at cursus nisl vestibulum. Orci varius natoque penatibus et magnis dis parturient montes.`,
                                star: 5,
                                img:ScriptStyle1.getRout('assets/img/avatar/32.jpg'),
                                name : 'Robert Fox',
                                pro : 'Medical Center patient'
                            },
                            {
                                desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum odio, bibendum ornare mi at, efficitur urna.`,
                                star: 4,
                                img:ScriptStyle1.getRout('assets/img/avatar/31.jpg'),
                                name : 'Annette Black',
                                pro : 'Medical Center patient'
                            },
                            {
                                desc: `Etiam augue ante, imperdiet et nunc sed, bibendum faucibus est. Suspendisse egestas facilisis erat eu eleifend.`,
                                star: 3,
                                img:ScriptStyle1.getRout('assets/img/avatar/34.jpg'),
                                name : 'Jerome Bell',
                                pro : 'Medical Center patient'
                            },

                        ]
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let test:{
                                title:string
                                dataList:{
                                    list:{
                                        desc:string,
                                        star:number,
                                        img:string,
                                        name:string,
                                        pro:string
                                    }[]
                                }
                            } = {
                                title : widget.data.title,
                                dataList : widget.data.dataList
                            }
                            return `
                            <section class="bg-secondary py-5 mb-2 mb-md-4 mb-lg-5">
        <div class="container pt-lg-4 mt-1">
          <h2 class="h1 text-center pb-3 pb-md-4 pb-xl-5">${test.title}</h2>
        </div>
        <div class="pb-lg-3 px-2 px-sm-0">
          <div class="swiper">
            <div class="swiper-wrapper">
                ${(()=>{
                    let html = ``
                    test.dataList.list.map((data,index)=>{
                        html += `
                            <!-- Item -->
              <div class="swiper-slide h-auto pt-4">
                <figure class="d-flex flex-column h-100 px-2 px-sm-0 mb-0">
                  <div class="card h-100 position-relative border-0 shadow-sm pt-4">
                    <span class="btn btn-icon btn-primary shadow-primary pe-none position-absolute top-0 start-0 translate-middle-y ms-4">
                      <i class="bx bxs-quote-left"></i>
                    </span>
                    <blockquote class="card-body pb-3 mb-0">
                      <p class="mb-0">${data.desc}</p>
                    </blockquote>
                    <div class="card-footer border-0 text-nowrap pt-0">
                        ${(()=>{
                            let star = ``;
                            for (let i = 0 ; i < data.star && i < 5 ; i++){
                                star+= `<i class="bx bxs-star text-warning fs-sm"></i>`
                            }
                            for (let i = 0 ; i < (5 - data.star) && i < 5 ; i++){
                                star+= `<i class="bx bx-star text-muted fs-sm opacity-75"></i>`
                            }

                            return star
                        })()}
                    </div>
                  </div>
                  <figcaption class="d-flex align-items-center ps-4 pt-4">
                    <img src="${data.img}" width="48" class="rounded" alt="Fannie Summers">
                    <div class="ps-3">
                      <h6 class="fs-sm fw-semibold mb-0">${data.name}</h6>
                      <span class="fs-xs text-muted">${data.pro}</span>
                    </div>
                  </figcaption>
                </figure>
              </div>
                        `
                    })            
                    return html   
                })()}
    
            </div>

            <!-- Pagination (bullets) -->
            <div class="swiper-pagination position-relative pt-1 pt-sm-3 mt-5"></div>
          </div>
        </div>
      </section>
                           `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            let swiper = new Swiper('.swiper', {
                                "slidesPerView": 1,
                                "centeredSlides": true,
                                "spaceBetween": 8,
                                "loop": true,
                                "pagination": {
                                    "el": ".swiper-pagination",
                                    "clickable": true
                                },
                                "breakpoints": {
                                    "500": {
                                        "slidesPerView": 2,
                                        "spaceBetween": 24
                                    },
                                    "1000": {
                                        "slidesPerView": 4,
                                        "spaceBetween": 24
                                    },
                                    "1500": {
                                        "slidesPerView": 6,
                                        "spaceBetween": 24
                                    }
                                }
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
                        Editor.arrayItem({
                            originalArray:widget.data.dataList,
                            gvc: gvc,
                            title: '回饋內容',
                            array: widget.data.dataList.list.map((dd: any, index: number) => {
                                return {
                                    title: dd.name || `人員:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `回饋內容`,
                                            default: dd.desc,
                                            placeHolder: '輸入內容',
                                            callback: (text) => {
                                                dd.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `回饋者姓名`,
                                            default: dd.name,
                                            placeHolder: '輸入姓名',
                                            callback: (text) => {
                                                dd.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `回饋者職業`,
                                            default: dd.pro,
                                            placeHolder: '輸入職業',
                                            callback: (text) => {
                                                dd.pro = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `回饋者評比星數`,
                                            default: dd.star,
                                            type:"number",
                                            placeHolder: '輸入數字',
                                            callback: (text) => {
                                                dd.star = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '預覽圖片1',
                                            def:dd.img,
                                            callback:(data)=>{
                                                dd.img=data
                                                widget.refreshComponent()
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.dataList,
                            plus: {
                                title: '添加回饋',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({
                                        desc: `Id mollis consectetur congue egestas egestas suspendisse blandit justo. Tellus augue commodo id quis tempus etiam pulvinar at maecenas.`,
                                        star: 3,
                                        img:ScriptStyle1.getRout('assets/img/avatar/30.jpg'),
                                        name : 'Fannie Summers',
                                        pro : 'Medical Center patient'
                                    });
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