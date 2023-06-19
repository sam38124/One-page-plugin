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
                    widget.data.title = widget.data.title??"Qualified Medical Specialists"
                    widget.data.btn = widget.data.btn??{
                        text:"btn",
                        link:""
                    };
                    widget.data.dataList = widget.data.dataList??{
                        list:[
                            {
                                img:ScriptStyle1.getRout('assets/img/team/16.jpg'),
                                name:"Dr. Ronald Richards",
                                pro:"Neurosurgeon",
                                star:5,
                                reviews:19,
                                socialLink:[
                                    {
                                        src:"www.twitter.com"
                                    },
                                    {
                                        src:"www.facebook.com"
                                    },
                                    {
                                        src:"www.linkedin.com"
                                    },
                                ]
                            },
                            {
                                img:ScriptStyle1.getRout('assets/img/team/17.jpg'),
                                    name:"Dr. Esther Howard",
                                pro:"Therapist",
                                star:5,
                                reviews:4,
                                socialLink:[
                                {
                                    src:"www.twitter.com"
                                },
                                {
                                    src:"www.facebook.com"
                                },
                                {
                                    src:"www.linkedin.com"
                                },
                            ]
                            },
                            {
                                img:ScriptStyle1.getRout('assets/img/team/18.jpg'),
                                    name:"Dr. Jerome Bell",
                                pro:"Anesthesiologist",
                                star:4,
                                reviews:12,
                                socialLink:[
                                {
                                    src:"www.twitter.com"
                                },
                                {
                                    src:"www.facebook.com"
                                },
                                {
                                    src:"www.linkedin.com"
                                },
                            ]
                            },
                            {
                                img:ScriptStyle1.getRout('assets/img/team/19.jpg'),
                                    name:"Dr. Ralph Edwards",
                                pro:"Surgeon",
                                star:5,
                                reviews:8,
                                socialLink:[
                                {
                                    src:"www.twitter.com"
                                },
                                {
                                    src:"www.facebook.com"
                                },
                                {
                                    src:"www.linkedin.com"
                                },
                            ]
                            },
                        ]
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let team :{
                                title:string,
                                btn:{
                                    text:string,
                                    link:string
                                },
                                dataList:{
                                   list:{
                                      img:string,
                                      name:string,
                                      pro:string,
                                      star:number,
                                      reviews:number,
                                      socialLink:{
                                          src:string
                                      }[]
                                   }[]
                                }
                            } = {
                                title:widget.data.title,
                                btn:widget.data.btn,
                                dataList:widget.data.dataList
                            }
                            return `
                            <!-- Team -->
      <section class="container pt-xl-2 pb-5 mb-md-3 mb-lg-5">
        <div class="d-md-flex align-items-center justify-content-between text-center text-md-start pb-1 pb-lg-0 mb-4 mb-lg-5">
          <h2 class="h1 mb-md-0">${team.title}</h2>
          <a href="${team.btn.link}" class="btn btn-outline-primary">
            ${team.btn.text}
            <i class="bx bx-right-arrow-alt fs-xl ms-2 me-n1"></i>
          </a>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            ${(()=>{
                let html = ``
                team.dataList.list.map((data,index)=>{
                    html += `
                        <!-- Item -->
          <div class="col">
            <div class="card card-hover border-0 bg-transparent">
              <div class="position-relative">
                <img src="${data.img}" class="rounded-3" alt="Dr. Ronald Richards">
                <div class="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3">
                  <span class="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-35 rounded-3"></span>
                  <div class="position-relative d-flex zindex-2">
                    ${(()=>{
                        let socialHtml = ``
                        
                        data.socialLink.map((link,index)=>{
                            socialHtml+= `
                            <a href="${link.src}" class="btn btn-icon btn-secondary btn-facebook btn-sm bg-white me-2">
                              <i class="${ScriptStyle1.urlIcon(link.src,'bx')}"></i>
                            </a>
                            `
                        })
                        return socialHtml
                    })()}
                   
                  </div>
                </div>
              </div>
              <div class="card-body text-center p-3">
                <h3 class="fs-lg fw-semibold pt-1 mb-2">${data.name}</h3>
                <p class="fs-sm mb-2">${data.pro}</p>
                <div class="d-flex align-items-center justify-content-center">
                  <div class="text-nowrap me-1">
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
                  <span class="fs-xs text-muted">(${data.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
                    `
                })
                return html    
            })()}         
        </div>
      </section>
                           `
                        },divCreate:{},
                        onCreate:()=>{

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
                            title: '區塊內容',
                            array: widget.data.dataList.list.map((dd: any, index: number) => {
                                dd.socialExpand = dd.socialExpand ?? {}
                                return {
                                    title: dd.name || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `人員姓名`,
                                            default: dd.name,
                                            placeHolder: '輸入人員姓名',
                                            callback: (text) => {
                                                dd.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `負責的部門或職位`,
                                            default: dd.pro,
                                            placeHolder: '輸入敘述',
                                            callback: (text) => {
                                                dd.pro = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `評分星數`,
                                            default: dd.star,
                                            type:"number",
                                            placeHolder: '輸入敘述',
                                            callback: (text) => {
                                                dd.star = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `評分人數`,
                                            default: dd.reviews,
                                            type:"number",
                                            placeHolder: '輸入人數',
                                            callback: (text) => {
                                                dd.reviews = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '照片',
                                            def:dd.img,
                                            callback:(data)=>{
                                                dd.img=data
                                                widget.refreshComponent()
                                            }
                                        }),
                                        Editor.arrayItem({
                                            originalArray:dd.socialLink,
                                            gvc: gvc,
                                            title: '社群內容',
                                            array: dd.socialLink.map((link: any, index: number) => {
                                                return {
                                                    title: `連結:${index + 1}`,
                                                    expand: link,
                                                    innerHtml: gvc.map([
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `社群網址`,
                                                            default: link.src,
                                                            placeHolder: '輸入網址',
                                                            callback: (text) => {
                                                                link.src = text;
                                                                widget.refreshComponent();
                                                            },
                                                        })

                                                    ]),
                                                    minus: gvc.event(() => {
                                                        dd.socialLink.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: dd.socialExpand,
                                            plus: {
                                                title: '添加社群連結',
                                                event: gvc.event(() => {
                                                    dd.socialLink.push({
                                                        src:"www.twitter.com"
                                                    });
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent:()=>{
                                                widget.refreshComponent()
                                            }
                                        })

                                    ]),
                                    minus: gvc.event(() => {
                                        dd.socialLink.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.dataList,
                            plus: {
                                title: '添加人員',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({
                                        img:ScriptStyle1.getRout('assets/img/team/16.jpg'),
                                        name:"Dr. Ronald Richards",
                                        pro:"Neurosurgeon",
                                        star:5,
                                        reviews:19,
                                        socialLink:[
                                            {
                                                src:"www.twitter.com"
                                            },
                                            {
                                                src:"www.facebook.com"
                                            },
                                            {
                                                src:"www.linkedin.com"
                                            },
                                        ]
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