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
            widget.data.keyVision=widget.data.keyVision ?? {
                title: "關於<span>萊恩設計</span>我們能為您做什麼？",
                desc: "優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                video: "https://www.youtube.com/watch?v=u6BOC7CDUTQ",
                img: ScriptStyle1.getRout("assets/img/hero-bg.jpg"),
                listData: {
                    list:[
                        { name: "菜單", link: "#" },
                        { name: "門市據點", link: "#" },
                    ]},
            }
            widget.data.keyVision.titleStyle=widget.data.keyVision.titleStyle??{}
            widget.data.keyVision.subTitleStyle=widget.data.keyVision.subTitleStyle??{}
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)

                    const keyVision= widget.data.keyVision
                    return ` 
                        <section id="hero" class="d-flex align-items-center" style="background-image: url(${keyVision.img}) ;
                        background-position: center;background-repeat: no-repeat;background-size: cover;">
                            <!--         data-aos="zoom-in"不能作動                   -->
                            <div class="container position-relative text-center text-lg-start"  data-aos-delay="100">
                                <div class="row" style="">
                                    <div class="col-lg-8">
                                        <h1 class="mb-3 ${glitter.htmlGenerate.styleEditor(widget.data.keyVision.titleStyle).class()}" style="${glitter.htmlGenerate.styleEditor(widget.data.keyVision.titleStyle).style()}">${keyVision.title}</h1>
                                        <h2 class="mb-5 text-left
                                        ${glitter.htmlGenerate.styleEditor(widget.data.keyVision.subTitleStyle).class()}
                                        " style="white-space:normal;word-wrap:break-word;word-break:break-all;
                                          ${glitter.htmlGenerate.styleEditor(widget.data.keyVision.subTitleStyle).style()}">${keyVision.desc}</h2>
                
                                        <div class="btns">
                                            ${glitter.print(function () {
                                                var tmp = "";
                                                keyVision.listData.list.map((l:any) => {
                                                    tmp += /*html*/ `
                                                    <a
                                                        class="btn-get-started scrollto"
                                                        onclick="${gvc.event(()=>{
                                                        TriggerEvent.trigger({
                                                            gvc,
                                                            widget,
                                                            clickEvent: l.link,
                                                        });
                                                    })}"
                                                    style="cursor:pointer"
                                                    >${l.name}</a>`;
                                                });
                                                return tmp;
                                            })}
                                        </div>
                                    </div>     
                                    <!--data-aos="zoom-in"-->
                                    <div
                                        class="col-lg-4 d-flex align-items-center justify-content-center position-relative"
                                        
                                        data-aos-delay="200"
                                      >
                                        <a href="${keyVision.video}" class="glightbox play-btn"></a>
                                      </div>                               
                                </div>
                          </div>
                        </section>`

                },
                editor:()=>{
                    widget.data.keyVision.titleStyleEx=widget.data.keyVision.titleStyleEx??{}
                    widget.data.keyVision.titleStylesEx=widget.data.keyVision.titleStylesEx??{}
                    return `
                        ${Editor.uploadImage({
                            gvc: gvc,
                            title: `背景圖片`,
                            def: widget.data.keyVision.img,
                            callback: (e) => {
                                widget.data.keyVision.img = e;
                                widget.refreshComponent();
                            },
                        })}
                        `+`<div class="mt-3" style="line-height: 20px;"></div>`+ Editor.toggleExpand({
                            gvc:gvc,
                            title:'大標題',
                            data:widget.data.keyVision.titleStyleEx,
                            innerText:()=>{
                                return gvc.map([
                                    glitter.htmlGenerate.styleEditor(widget.data.keyVision.titleStyle).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },'大標題樣式'),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: '大標題',
                                        default: widget.data.keyVision.title,
                                        placeHolder: '請輸入大標題所顯示的文字，也能用簡單的html敘述',
                                        callback: (text) => {
                                            widget.data.keyVision.title = text;
                                            widget.refreshComponent();
                                        },
                                    })
                                ])
                            }
                        })+`<div class="mt-3"></div>`+
                        Editor.toggleExpand({
                            gvc:gvc,
                            title:'副標題',
                            data:widget.data.keyVision.titleStylesEx,
                            innerText:()=>{
                                return gvc.map([
                                    glitter.htmlGenerate.styleEditor(widget.data.keyVision.subTitleStyle).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },'副標題樣式'),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: '副標題',
                                        default: widget.data.keyVision.desc,
                                        placeHolder: '請輸入副標題所要顯示的文字',
                                        callback: (text) => {
                                            widget.data.keyVision.desc = text;
                                            widget.refreshComponent();
                                        },
                                    })
                                ])
                            }
                        })+
                        `<div class="mt-3"></div>
                        `+
                        Editor.arrayItem({
                            originalArray:widget.data.keyVision.listData,
                            gvc: gvc,
                            title: '按鍵區塊',
                            array: widget.data.keyVision.listData.list.map((linkData: any, index: number) => {
                                return {
                                    title: `第${index+1}個按鍵`,
                                    expand: linkData,
                                    innerHtml: `
                                 ${glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '按鍵名稱',
                                        default: linkData.name,
                                        placeHolder: '這個按鍵會顯示的名稱',
                                        callback: (text) => {
                                            linkData.name = text;
                                            widget.refreshComponent();
                                        },
                                    })}
                                 ${TriggerEvent.editer(gvc, widget, linkData.link, {
                                        hover: true,
                                        option: [],
                                        title: "這個按鍵的事件"
                                    })}
                                 <div class="mb-3 mt-3" style="width: 100%;height: 1px;background: black"></div>
                                `,
                                    minus: gvc.event(() => {
                                        widget.data.keyVision.listData.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.keyVision.listData,
                            plus: {
                                title: '添加行數',
                                event: gvc.event(() => {
                                    widget.data.keyVision.listData.list.push({name: "", link: ""});
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