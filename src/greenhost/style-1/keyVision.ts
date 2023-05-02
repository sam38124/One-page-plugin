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
                    widget.data.img = widget.data.img ?? ScriptStyle1.getRout("/img/hero.png");
                    widget.data.title = widget.data.title ?? `打造優質<span class="home_text">網路服務</span><br />選擇萊恩設計`;
                    widget.data.desc = widget.data.desc ?? "優質服務範圍包括網路連線諮詢與整合、受管理網路服務和軟體定義的網路";
                    widget.data.prod = widget.data.prod ?? { title: "單頁式響應式網頁", price: 24900 };
                    widget.data.btn = widget.data.btn ?? { name: "了解更多", link: "https://squarestudio.tw/" };

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let keyVision = {
                                img : widget.data.img,
                                title : widget.data.title,
                                desc : widget.data.desc,
                                prod : widget.data.prod,
                                btn : widget.data.btn
                            }
                            return `
          <div class="container-xxl py-5 bg-primary hero-header mb-5">
            <div class="container my-5 py-5 px-lg-5">
              <div class="row g-5">
                <div class="col-lg-6 pt-5 text-center text-lg-start">
                  <h1 class="display-4 text-white mb-4 animated slideInLeft">${keyVision.title}</h1>
                  <p class="text-white animated slideInLeft">${keyVision.desc}</p>
                  <h1 class="text-white mb-4 animated slideInLeft">
                    <small class="align-top fw-normal" style="font-size: 15px; line-height: 25px;">${keyVision.prod.title}：</small>
                    <span>$${keyVision.prod.price.toLocaleString()}</span>
                    <small class="align-bottom fw-normal" style="font-size: 15px; line-height: 33px;">/ 元</small>
                  </h1>
                  <a
                    class="btn btn-secondary py-sm-3 px-sm-5 me-3 animated slideInLeft"
                    href="${keyVision.btn.link}"
                    onclick=""
                    >${keyVision.btn.name}</a
                  >
                </div>
                <div class="col-lg-6 text-center text-lg-start">
                  <img class="img-fluid animated zoomIn" src="${keyVision.img}" alt="" />
                </div>
              </div>
            </div>
          </div>
        `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `圖片`,
                            def: widget.data.img,
                            callback: (e) => {
                                widget.data.img = e;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title ?? '',
                            placeHolder: '請輸入標題',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.desc ?? '',
                            placeHolder: '請輸入標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '產品名稱',
                            default: widget.data.prod.title ?? '',
                            placeHolder: '請輸入產品標題',
                            callback: (text) => {
                                widget.data.prod.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '產品名稱',
                            default: widget.data.prod.price ?? '',
                            placeHolder: '請輸入價格',
                            callback: (text) => {
                                widget.data.prod.price = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '按鍵標題',
                            default: widget.data.btn.name ?? '',
                            placeHolder: '請輸入按鍵內文',
                            callback: (text) => {
                                widget.data.btn.name = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '按鍵的導向網址',
                            default: widget.data.btn.link ?? '',
                            placeHolder: '請輸入網址',
                            callback: (text) => {
                                widget.data.btn.link = text;
                                widget.refreshComponent();
                            },
                        }),
                    ])
                }
            }
        },
    }
})