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
                    ScriptStyle1.initialScript(gvc,widget);
                    let id = glitter.getUUID();

                    widget.data.img = widget.data.img ?? ScriptStyle1.getRout("./assets/images/about.jpg");
                    widget.data.title = widget.data.title ?? "萊恩 · 提供您最佳網站服務";
                    widget.data.desc = widget.data.desc ?? `我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到UI／UX、頁面、Logo設計、，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。`;
                    widget.data.btn = widget.data.btn ?? { name: "查看更多", link: "#" };
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let about :{
                                img:string,
                                title:string,
                                desc:string,
                                btn:{
                                    name:string,
                                    link:string
                                }
                            } = {
                                img: widget.data.img,
                                title: widget.data.title,
                                desc: widget.data.desc,
                                btn:widget.data.btn
                            }
                            return /*html*/ `
        <section class="about d-flex align-items-center text-light py-5" id="about">
          <div class="container">
            <div class="row d-flex align-items-center">
              <div class="col-lg-7" data-aos="fade-right">
                <p class="mb-3">關於我們</p>
                <h1>${about.title}</h1>
                <p class="py-2 para-light">${about.desc}</p>
                <div class="my-3">
                  <a class="btn" href="${about.btn.link}">${about.btn.name}</a>
                </div>
              </div>
              <div class="col-lg-5 text-center py-4 py-sm-0" data-aos="fade-down">
                <img class="img-fluid" src="${about.img}" alt="about" />
              </div>
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '圖片',
                            def:widget.data.img,
                            callback:(data)=>{
                                widget.data.img=data
                                widget.refreshComponent()
                            }
                        }),
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
                            placeHolder: '輸入副標題敘述',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `按鍵名字`,
                            default: widget.data.btn.name,
                            placeHolder: '輸入按鍵名字',
                            callback: (text) => {
                                widget.data.btn.name = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `按鍵連結`,
                            default: widget.data.btn.name,
                            placeHolder: '輸入按鍵導向的網址',
                            callback: (text) => {
                                widget.data.btn.name = text;
                                widget.refreshComponent();
                            },
                        }),
                    ])
                }
            }
        },
    }
})