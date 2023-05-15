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
                    widget.data.title = widget.data.title??"Highly Innovative Technology &amp; Services";
                    widget.data.desc = widget.data.desc??"We appreciate your trust greatly. Our patients choose us and our services because they know we are the best. We offer complete health care to individuals with various health concerns.";
                    widget.data.btn = widget.data.btn??{
                        text:"All services",
                        link:""
                    };
                    widget.data.list = widget.data.list??[
                        {
                            icon:ScriptStyle1.getRout("assets/img/landing/medical/services/cardiology.svg"),
                            title:"Cardiology",
                            desc:"Id mollis consectetur congue egestas egestas suspendisse blandit justo.",
                            hyperLink:""
                        },
                        {
                            icon:ScriptStyle1.getRout("assets/img/landing/medical/services/scalpel.svg"),
                            title:"Surgery",
                            desc:"Mattis urna ultricies non amet, purus in auctor non. Odio vulputate ac nibh.",
                            hyperLink:""
                        },
                        {
                            icon:ScriptStyle1.getRout("assets/img/landing/medical/services/x-ray.svg"),
                            title:"Radiology",
                            desc:"Faucibus cursus maecenas lorem cursus nibh.",
                            hyperLink:""
                        },{
                            icon:ScriptStyle1.getRout("assets/img/landing/medical/services/stethoscope.svg"),
                            title:"Family Medicine",
                            desc:"Augue pulvinar justo, fermentum fames aliquam.",
                            hyperLink:""
                        },
                        {
                            icon:ScriptStyle1.getRout("assets/img/landing/medical/services/lungs.svg"),
                            title:"Pulmonary",
                            desc:"Ullamcorper in magna varius quisque enim tempor iaculis proin sed.",
                            hyperLink:""
                        },
                        {
                            icon:ScriptStyle1.getRout("assets/img/landing/medical/services/tooth.svg"),
                            title:"Dental Care",
                            desc:"Faucibus cursus maecenas lorem cursus nibh. Sociis sit facilisis dolor arcu.",
                            hyperLink:""
                        },


                    ]

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let service:{
                                title:string,
                                desc:string,
                                btn:{
                                    text:string,
                                    link:string
                                },
                                list:{
                                    icon:string,
                                    title:string,
                                    desc:string,
                                    hyperlink:string
                                }[]
                            } = {
                                title:widget.data.title,
                                desc:widget.data.desc,
                                btn:widget.data.btn,
                                list:widget.data.list
                            }
                            return `
                            <!-- Services -->
      <section class="container pb-5 mb-md-2 mb-lg-5">
        <div class="row">
          <div class="col-lg-4 text-center text-lg-start pb-3 pb-lg-0 mb-4 mb-lg-0">
            <h2 class="h1 mb-lg-4">${service.title}</h2>
            <p class="pb-4 mb-0 mb-lg-3">${service.desc}</p>
            <a href="${service.btn.link}" class="btn btn-primary shadow-primary btn-lg">${service.btn.text}</a>
          </div>
          <div class="col-xl-7 col-lg-8 offset-xl-1">
            <div class="row row-cols-1 row-cols-md-2">
                ${(()=>{
                    let left = ``;
                    let right = ``;
                    service.list.map((data , index)=>{
                        let temp = `
                            <div class="card card-hover bg-secondary border-0 mb-4">
                              <div class="card-body d-flex align-items-start">
                                <div class="flex-shrink-0 bg-light rounded-3 p-3">
                                  <img src="${data.icon}" width="28" alt="Icon">
                                </div>
                                <div class="ps-4">
                                  <h3 class="h5 pb-2 mb-1">${data.title}</h3>
                                  <p class="pb-2 mb-1">${data.desc}</p>
                                  <a href="${data.hyperlink}" class="btn btn-link stretched-link px-0">
                                    Learn more
                                    <i class="bx bx-right-arrow-alt fs-xl ms-2"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                        `
                        if (index<service.list.length/2){
                            left += temp
                        }else{
                            right += temp
                        }
                    })
                    return `
                        <div class="col">
                            ${left}
                        </div>
                        <div class="col">
                            ${right}
                        </div>
                    `
                })()}
             
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
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題內文',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.list,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.list.map((dd: any, index: number) => {
                                return {
                                    title: dd.title || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '上方icon',
                                            def:dd.icon,
                                            callback:(data)=>{
                                                dd.icon=data
                                                widget.refreshComponent()
                                            }
                                        }),
                                        glitter.htmlGenerate.editeInput({
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
                                            title: `描述`,
                                            default: dd.desc,
                                            placeHolder: '輸入描述',
                                            callback: (text) => {
                                                dd.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `按鍵連結的網址`,
                                            default: dd.hyperlink,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.hyperlink = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
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
                                    widget.data.list.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
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