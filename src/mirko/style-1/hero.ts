import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";

import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)

                    let keyVision= {
                        title: widget.data.title??"打造優質<span class=\"home_text\">網路服務</span><br />選擇萊恩設計",
                        desc: widget.data.desc??"優質服務範圍包括網路連線諮詢與整合、受管理網路服務和軟體定義的網路",
                        img: widget.data.img??ScriptStyle1.getRout("assets/images/home.jpg"),
                        btn: widget.data.btn??{ name: "了解更多", link: "https://squarestudio.tw/"  },
                        rgba: widget.data.rgba??"rgba(120, 120, 120, 0.75)",
                        position: widget.data.position??"start",
                        iconline: widget.data.iconline??[
                            { icon: "fas fa-laptop-house", desc: "更穩定的網路" },
                            { icon: "fas fa-wifi", desc: "更快速的網速" },
                        ]
                    }
                    widget.data = keyVision;
                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <section
          class="home p-xl-5 d-flex justify-content justify-content-${keyVision.position} align-items-center"
          id="header"
          style="background-image: url(${keyVision.img});"
        >
          <div class="p-xl-3 m-5" style="background-color: ${keyVision.rgba};">
            <div class="container text-${keyVision.position} text-light py-4" data-aos="fade-right">
              <h1 class="headline">${keyVision.title}</h1>
              <p class="para-light py-3">${keyVision.desc ?? ``}</p>
              ${glitter.print(function () {
                                var HTML = "";
                                keyVision.iconline.map((i:any) => {
                                    HTML += /*html*/ `
                    <div class="d-flex justify-content-${keyVision.position} align-items-center">
                      <p class="p-2"><i class="${i.icon} fa-lg"></i></p>
                      <p>${i.desc}</p>
                    </div>
                  `;
                                });
                                return HTML;
                            })}
              <div class="my-3">
                ${
                                keyVision.btn
                                    ? `<a class="btn" href="${keyVision.btn.link}" target="_blank" rel="noopener">${keyVision.btn.name}</a>`
                                    : ``
                            }
              </div>
            </div>
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
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '大標題',
                            default: widget.data.title,
                            placeHolder: '請輸入大標題',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '敘述',
                            default: widget.data.desc,
                            placeHolder: '請輸入副標題和敘述',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '右方圖片',
                            def:widget.data.img,
                            callback:(data)=>{
                                widget.data.img=data
                                widget.refreshComponent()
                            }
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '按鍵名稱',
                            default: widget.data.btn.name,
                            placeHolder: '請輸入按鍵要顯示的名稱',
                            callback: (text) => {
                                widget.data.btn.name = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '超連結',
                            default: widget.data.btn.link,
                            placeHolder: '請輸入超連結網址',
                            callback: (text) => {
                                widget.data.btn.link = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '方格背景的顏色',
                            type:"color",
                            default: widget.data.rgba,
                            placeHolder: '請設定顏色',
                            callback: (text) => {
                                widget.data.rgba = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.select({
                            title: `描述方式`,
                            gvc: gvc,
                            def: widget.data.position,
                            array: [
                                {
                                    title: '靠左',
                                    value: `start`,
                                },
                                {
                                    title: '置中',
                                    value: `center`,
                                },
                                {
                                    title: '靠右',
                                    value: `end`,
                                },
                            ],
                            callback: (text) => {
                                widget.data.position = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.iconline,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.iconline.map((dd: any, index: number) => {
                                return {
                                    title: dd.title || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([

                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.iconline,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.iconline.push({ icon: "fas fa-wifi", desc: "更快速的網速" });
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