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
                    widget.data.title = widget.data.title??"優良的公司文化 · 創新彈性的工作環境";
                    widget.data.desc = widget.data.desc??"我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽";
                    widget.data.list = widget.data.list?? [
                        { icon: "fas fa-briefcase", num: 1258, title: "歷史專案數" },
                        { icon: "fas fa-award", num: 150, title: "專利數量" },
                        { icon: "fas fa-users", num: 642, title: "員工數" },
                        { icon: "fas fa-clock", num: 86, title: "平均開發時間（工作日）" },
                    ]
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let work:{
                                title:string,
                                desc:string,
                                list:{
                                    icon:string,
                                    num:number,
                                    title:string
                                }[]
                            } = {
                                title: widget.data.title,
                                desc: widget.data.desc,
                                list: widget.data.list,
                            }
                            return /*html*/ `
        <section class="work d-flex align-items-center py-5" id="work">
          <div class="container-fluid text-light">
            <div class="row">
              <div class="col-lg-6 d-flex align-items-center" data-aos="fade-right">
                <img class="img-fluid" src="${ScriptStyle1.getRout("./assets/images/work.jpg")}" alt="work" />
              </div>
              <div class="col-lg-5 d-flex align-items-center px-4 py-3" data-aos="">
                <div class="row">
                  <div class="text-center text-lg-start py-4 pt-lg-0">
                    <p class="mb-3">我們的作品與榮譽</p>
                    <h2 class="py-2">${work.title}</h2>
                    <p class="para-light">${work.desc}</p>
                  </div>
                  <div class="container" data-aos="fade-up">
                    <div class="row g-5">
                      ${glitter.print(function () {
                                var tmp = "";
                                work.list.map((l) => {
                                    tmp += /*html*/ `
                            <div class="col-6 text-start">
                              <i class="${l.icon} fa-2x text-start"></i>
                              <h2
                                class="purecounter"
                                data-purecounter-start="0"
                                data-purecounter-end="${l.num}"
                                data-purecounter-duration="3"
                              >
                                ${l.num}
                              </h2>
                              <p>${l.title}</p>
                            </div>
                          `;
                                });
                                return tmp;
                            })}
                    </div>
                  </div>
                  <!-- end of container -->
                </div>
                <!-- end of row -->
              </div>
              <!-- end of col-lg-5 -->
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
                    return gvc.map([glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: `標題`,
                        default: widget.data.title,
                        placeHolder: '輸入標題名稱',
                        callback: (text) => {
                            widget.data.title = text;
                            widget.refreshComponent();
                        },
                    }),glitter.htmlGenerate.editeText({
                        gvc: gvc,
                        title: `敘述`,
                        default: widget.data.desc,
                        placeHolder: '輸入敘述文字',
                        callback: (text) => {
                            widget.data.desc = text;
                            widget.refreshComponent();
                        },
                    }),Editor.arrayItem({
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
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `統計資料數字`,
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
                                widget.data.list.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
                                widget.refreshComponent();
                            }),
                        },
                        refreshComponent:()=>{
                            widget.refreshComponent()
                        }
                    })])
                }
            }
        },
    }
})
