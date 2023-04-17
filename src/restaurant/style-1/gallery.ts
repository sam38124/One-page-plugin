import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.title=widget.data.title??'實際餐廳畫面'
            widget.data.desc=widget.data.desc??'餐廳空間設計與實際用餐的感覺'
            widget.data.list=widget.data.list??[
                {src:ScriptStyle1.getRout("assets/img/gallery/gallery-1.jpg")},
                {src:ScriptStyle1.getRout("assets/img/gallery/gallery-2.jpg")},
                {src:ScriptStyle1.getRout("assets/img/gallery/gallery-3.jpg")},
                {src:ScriptStyle1.getRout("assets/img/gallery/gallery-4.jpg")},
                {src:ScriptStyle1.getRout("assets/img/gallery/gallery-5.jpg")},
                {src:ScriptStyle1.getRout("assets/img/gallery/gallery-6.jpg")},
                {src:ScriptStyle1.getRout("assets/img/gallery/gallery-7.jpg")},
                {src:ScriptStyle1.getRout("assets/img/gallery/gallery-8.jpg")},
            ]
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    const gallery= {
                        title: widget.data.title,
                        desc: widget.data.desc,
                        list: widget.data.list,
                    }
                    return gvc.bindView({
                        bind:glitter.getUUID(),
                        view:()=>{
                            return `
                                <!-- ======= Gallery Section ======= -->
                                <section id="gallery" class="gallery">
                                    <div class="container" data-aos="fade-up">
                                        <div class="section-title">
                                            <h2>${gallery.title}</h2>
                                            <p>${gallery.desc}</p>
                                        </div>
                                    </div>
                        
                                    <div class="container-fluid" data-aos="fade-up" data-aos-delay="100">
                                        <div class="row g-0">
                                            ${glitter.print(function () {
                                let tmp = "";
                                widget.data.list.map((l:any) => {
                                    tmp += /*html*/ `
                                                        <div class="col-lg-3 col-md-4">
                                                            <div class="gallery-item">
                                                                <a href="${(l.src)}" class="gallery-lightbox" data-gall="gallery-item">
                                                                    <img src="${(l.src)}" alt="" class="img-fluid" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                      `;
                                });
                                return tmp;
                            })}
                                        </div>
                                    </div>
                                </section>
                                <!-- End Gallery Section -->
                                `
                        },divCreate:{},
                        onCreate:()=>{


                        }
                    })

                },
                editor:()=>{
                    return gvc.map([ glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: '標題',
                        default: widget.data.title,
                        placeHolder: '請輸入標題',
                        callback: (text) => {
                            widget.data.title=text
                            widget.refreshComponent()
                        },
                    }), glitter.htmlGenerate.editeText({
                        gvc: gvc,
                        title: '描述',
                        default: widget.data.desc,
                        placeHolder: '請輸入描述',
                        callback: (text) => {
                            widget.data.desc=text
                            widget.refreshComponent()
                        },
                    }),
                        Editor.arrayItem({
                            originalArray: widget.data.list,
                            gvc: gvc,
                            title: '圖片列表',
                            array: widget.data.list.map((dd:any, index:number) => {
                                return {
                                    title:  `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: Editor.uploadImage({
                                        gvc: gvc,
                                        title: '圖片',
                                        def: dd.src,
                                        callback: (text) => {
                                            dd.src= text;
                                            widget.refreshComponent();
                                        },
                                    }),
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
                                    widget.data.list.push({ src: ScriptStyle1.getRout("assets/img/gallery/gallery-1.jpg")});
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        })
                    ])
                }
            }
        }
    }
})