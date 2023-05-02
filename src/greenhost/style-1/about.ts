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
                    widget.data.title = widget.data.title ?? "歡迎來到萊恩設計";
                    widget.data.desc = widget.data.desc ?? "從電商網站設計、後台管理、搜尋應用、網站架設、金流串接，我們都有經驗能替您完成服務<br><br>資料視覺化的長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現；企業管理中的薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統<br><br>學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群平台";
                    widget.data.img = widget.data.img ?? ScriptStyle1.getRout("img/about.png");
                    widget.data.list = widget.data.list ?? [
                        { icon: "fas fa-briefcase", num: 1258, title: "歷史專案數" },
                        { icon: "fas fa-award", num: 150, title: "專利數量" },
                        { icon: "fas fa-users", num: 642, title: "員工數" },
                    ];

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let about = {
                                title: widget.data.title,
                                desc: widget.data.desc,
                                list: widget.data.list,
                                img: widget.data.img,
                            }
                            return /*html*/ `
        <!-- About Start -->
        <div class="container-xxl py-5">
          <div class="container px-lg-5">
            <div class="row g-5 align-items-center">
              <div class="col-lg-7 wow fadeInUp" data-wow-delay="0.1s">
                <div class="section-title position-relative mb-4 pb-4">
                  <h1 class="mb-2">${about.title}</h1>
                </div>
                <p class="mb-4">${about.desc}</p>
                <div class="row g-3">
                  ${glitter.print(function () {
                                var tmp = "";
                                about.list.map((l:any, j:number) => {
                                    tmp += /*html*/ `
                        <div class="col-sm-4 wow fadeIn" data-wow-delay="${0.1 + j * 0.2}s">
                          <div class="bg-light rounded text-center p-4">
                            <i class="${l.icon} fa-2x text-primary mb-2"></i>
                            <h2 class="mb-1" data-toggle="counter-up">${l.num}</h2>
                            <p class="mb-0">${l.title}</p>
                          </div>
                        </div>
                      `;
                                });
                                return tmp;
                            })}
                </div>
              </div>
              <div class="col-lg-5">
                <img class="img-fluid wow zoomIn" data-wow-delay="0.5s" src="${about.img}" />
              </div>
            </div>
          </div>
        </div>
        <!-- About End -->
      `;
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
                            placeHolder: '輸入副標題名稱',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '下方圖片',
                            def:widget.data.img,
                            callback:(data)=>{
                                widget.data.img=data
                                widget.refreshComponent()
                            }
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
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `數字`,
                                            default: dd.num,
                                            placeHolder: '輸入數字',
                                            callback: (text) => {
                                                dd.num = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: dd.icon,
                                            callback: (text: string) => {
                                                dd.icon = text;
                                            },
                                        })

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
                                    widget.data.list.push({ icon: "fas fa-users", num: 642, title: "員工數" });
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