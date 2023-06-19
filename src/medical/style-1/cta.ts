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
                    let dataIndex = 0;
                    widget.data.dataList = widget.data.dataList ?? {
                        list:[
                            {
                                img:ScriptStyle1.getRout('assets/img/landing/medical/cta/01.jpg'),
                                title:`New Service — Start Your Care <span class="text-success">Online</span> Now`,
                                desc: `Morbi lacus vulputate mauris ut et nunc, tempor. Placerat augue eu amet feugiat mi sagittis velit. Sed suscipit nunc suspendisse morbi pharetra libero consectetur. Proin eros sollicitudin augue tempus. Aliquet id sit donec aliquam.`,
                                btn :{
                                    text : "Learn more",
                                    color : "#1ca44e",
                                    link:""
                                }
                            },
                            {
                                img:ScriptStyle1.getRout('assets/img/landing/medical/cta/02.jpg'),
                                title:`Support Groups for <span class="text-danger">Depression</span> &amp; Anxiety`,
                                desc: `Magna cursus feugiat sed sodales praesent vehicula integer arcu. Felis duis lectus felis, tempus aliquet quis non. At integer consectetur eget nunc, fames. Et facilisi vel, luctus sed interdum vitae nec, velit. Maecenas purus et pharetra, at volutpat aenean.`,
                                btn :{
                                    text : "Learn more",
                                    color : "#ec2121",
                                    link:""
                                }
                            }
                        ]
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let cta:{
                                list:{
                                    img:string,
                                    title:string,
                                    desc:string,
                                    btn:{
                                        link: string;
                                        text:string,
                                        color:string
                                    }
                                }[]
                            } = widget.data.dataList

                            return `
                            
      <!-- CTA carousel -->
      <section class="pb-5 mb-2 mb-md-4 mb-lg-5" style="padding-top: 80px;">
        <div class="bg-secondary pb-lg-4 pb-xl-5">
          <div class="container pb-4 pb-md-5">
            <div class="row">
              <div class="col-xl-5 col-lg-6" style="margin-top: -80px;">

                <!-- Swiper tabs -->
                <div class="swiper-tabs mx-auto" style="max-width: 526px;">
                    ${(()=>{
                        return `
                            <div id="image-${dataIndex + 1}" class="swiper-tab active">
                                <img src="${cta.list[dataIndex].img}" class="rounded-3" alt="Image">
                            </div>
                        `    
                    })()}
                
                </div>
              </div>
              <div class="col-xl-5 col-lg-6 offset-xl-1 pt-2 pt-md-4 pt-lg-5 mt-4">

                <!-- Slider prev/next buttons -->
                <div class="d-flex justify-content-center justify-content-lg-start pb-3 mb-3">
                  <button type="button" id="prev" class="btn btn-prev btn-icon btn-sm me-2" onclick="${gvc.event(()=>{
                       dataIndex = (dataIndex + cta.list.length - 1)%(cta.list.length);                        
                       gvc.notifyDataChange(id)
                  })}">
                    <i class="bx bx-chevron-left"></i>
                  </button>
                  <button type="button" id="next" class="btn btn-next btn-icon btn-sm ms-2" onclick="${gvc.event(()=>{
                      dataIndex = (dataIndex + 1)%(cta.list.length);
                      gvc.notifyDataChange(id)
                  })}">
                    <i class="bx bx-chevron-right"></i>
                  </button>
                </div>

                <!-- Swiper slider -->
                <div class="swiperCTA mx-0 mb-md-n2 mb-xxl-n3" data-swiper-options='{
                  "spaceBetween": 30,
                  "loop": true,
                  "tabs": true,
                  "navigation": {
                    "prevEl": "#prev",
                    "nextEl": "#next"
                  }
                }'>
                  <div class="swiper-wrapper text-center text-lg-start">
                    ${(()=>{
                        
                        return `
                        <!-- Item -->
                        <div class="swiper-slide pb-4 swiper-slide-active"  data-swiper-tab="#image-1" >
                          <h2 class="h1 mb-4">${cta.list[dataIndex].title}</h2>
                          <p class="pb-2 pb-xl-0 mb-4 mb-xl-5">${cta.list[dataIndex].desc}</p>
                          <a href="${cta.list[dataIndex].btn.link}" class="btn btn-lg shadow-success" style="background-color:${cta.list[dataIndex].btn.color}">${cta.list[dataIndex].btn.text}</a>
                        </div>
                        `
                    })()}
        
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
                           `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return Editor.arrayItem({
                        originalArray:widget.data.dataList,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.dataList.list.map((dd: any, index: number) => {
                            return {
                                title: dd.title || `區塊:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: '預覽圖片1',
                                        def:dd.img,
                                        callback:(data)=>{
                                            dd.img=data
                                            widget.refreshComponent()
                                        }
                                    }),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `標題`,
                                        default: dd.title,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.title = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `副標題`,
                                        default: dd.desc,
                                        placeHolder: '輸入描述',
                                        callback: (text) => {
                                            dd.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `按鍵文字`,
                                        default: dd.btn.text,
                                        placeHolder: '輸入文字',
                                        callback: (text) => {
                                            dd.btn.text = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `按鍵超連結`,
                                        default: dd.btn.link,
                                        placeHolder: '輸入網址',
                                        callback: (text) => {
                                            dd.btn.link = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `按鍵背景色`,
                                        type:"color",
                                        default: dd.btn.color,
                                        placeHolder: '輸入文字',
                                        callback: (text) => {
                                            dd.btn.color = text;
                                            widget.refreshComponent();
                                        },
                                    }),

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
                                    img:ScriptStyle1.getRout('assets/img/landing/medical/cta/01.jpg'),
                                    title:`New Service — Start Your Care <span class="text-success">Online</span> Now`,
                                    desc: `Morbi lacus vulputate mauris ut et nunc, tempor. Placerat augue eu amet feugiat mi sagittis velit. Sed suscipit nunc suspendisse morbi pharetra libero consectetur. Proin eros sollicitudin augue tempus. Aliquet id sit donec aliquam.`,
                                    btn :{
                                        text : "Learn more",
                                        color : "#1ca44e",
                                        link:""
                                    } });
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