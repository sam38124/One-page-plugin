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
                title: "關於萊恩設計，我們能為您做什麼？",
                desc: "優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                video: { name: "觀賞影片", link: "https://www.youtube.com/watch?v=LXb3EKWsInQ" },
                img: ScriptStyle1.getRout("assets/img/hero-fullscreen-bg.jpg"),
                btn: { name: "點此了解", link: "#" },
            }
            widget.data.keyVision.titleStyle=widget.data.keyVision.titleStyle??{}
            widget.data.keyVision.subTitleStyle=widget.data.keyVision.subTitleStyle??{}
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID();
                    const keyVision= widget.data.keyVision
                    return gvc.bindView({
                        bind:id,
                        view:()=>{

                            return ` <section
        id="hero-fullscreen"
        class="hero-fullscreen d-flex align-items-center"
        style="background: url(${keyVision.img}) center center;"
      >
        <div class="container d-flex flex-column align-items-center position-relative" data-aos="zoom-out">
          <h2>${keyVision.title}</h2>
          <p>${keyVision.desc}</p>
          <div class="d-flex">
            <a class="btn-get-started scrollto" href="keyVision.video.link" style="cursor:pointer"
              >${keyVision.btn.name}</a
            >
            <a href="${keyVision.video.link}" class="glightbox btn-watch-video d-flex align-items-center"
              ><i class="bi bi-play-circle"></i><span>${keyVision.video.name}</span></a
            >
          </div>
        </div>
      </section>`;
                        },onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        },
                        divCreate:{}
                    })


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
                        `+glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '按鍵文字',
                            default: widget.data.keyVision.btn.name,
                            placeHolder: '請輸入大標題所顯示的文字，也能用簡單的html敘述',
                            callback: (text) => {
                                widget.data.keyVision.btn.name = text;
                                widget.refreshComponent();
                            },
                        })+glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '按鍵導向網址',
                            default: widget.data.keyVision.btn.link,
                            placeHolder: '請輸入大標題所顯示的文字，也能用簡單的html敘述',
                            callback: (text) => {
                                widget.data.keyVision.btn.link = text;
                                widget.refreshComponent();
                            },
                        })+glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '按鍵文字',
                            default: widget.data.keyVision.video.name,
                            placeHolder: '請輸入大標題所顯示的文字，也能用簡單的html敘述',
                            callback: (text) => {
                                widget.data.keyVision.video.name = text;
                                widget.refreshComponent();
                            },
                        })+glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '按鍵導向網址',
                            default: widget.data.keyVision.video.link,
                            placeHolder: '請輸入大標題所顯示的文字，也能用簡單的html敘述',
                            callback: (text) => {
                                widget.data.keyVision.video.link = text;
                                widget.refreshComponent();
                            },
                        })
                }
            }
        },
    }
})