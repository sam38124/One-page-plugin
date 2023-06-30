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
                    let id = glitter.getUUID()
                    let service= {
                        title: widget.data.title??"星澄基地",
                        desc: widget.data.desc??"提供您企業，社團，電商，教育與自媒體應用的最佳解決方案，免後台串接免程式開發，幾項設定步驟就能為您打造屬於您的專屬應用",
                        dataList: widget.data.dataList??{
                            list: [
                                { icon: "bx bx-receipt", title: "個性化的發布內容", desc: "個性化推薦可以幫助用戶看到最好的結果" },
                                { icon: "bx bx-cube-alt", title: "提供快速發文", desc: "發文附圖是近年來使用社群的基本公式" },
                                { icon: "bx bx-images", title: "活動規劃功能", desc: "使用活動排程規劃工具來追蹤所有重要的活動" },
                                { icon: "bx bx-shield", title: "資料視覺化", desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現" },
                                { icon: "bx bx-atom", title: "個人網站", desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地" },
                                { icon: "bx bx-id-card", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零組件更換" },
                            ],
                        }
                    }
                    if (!widget.data.dataList){
                        widget.data.dataList = service.dataList;
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <!-- ======= Services Section ======= -->
                            <section id="service" class="services">
                              <div class="container">
                                <div class="section-title">
                                  <span>${service.title}</span>
                                  <h2>${service.title}</h2>
                                  <p>${service.desc}</p>
                                </div>
                    
                                <div class="row">
                                  ${glitter.print(function () {
                                    let tmp = "";
                                    service.dataList.list.map((l:any, i:number) => {
                                        tmp += /*html*/ `
                                        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-3" data-aos="fade-up" data-aos-delay="${150 * i}">
                                          <div class="icon-box w-100">
                                            <div class="icon"><i class="${l.icon}"></i></div>
                                            <h4><a href="">${l.title}</a></h4>
                                            <p>${l.desc}</p>
                                          </div>
                                        </div>
                                      `;
                                        });
                                        return tmp;
                                    })}
                                </div>
                              </div>
                            </section>
                            <!-- End Services Section -->
                            `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
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
                                widget.data.title= text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `敘文`,
                            default: widget.data.desc,
                            placeHolder: '輸入敘文文字',
                            callback: (text) => {
                                widget.data.desc= text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.dataList ,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.dataList .list.map((dd: any, index: number) => {
                                return {
                                    title: `服務:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        Editor.fontawesome({
                                            gvc: gvc,
                                            title: '圖示',
                                            def: dd.icon,
                                            callback: (text: string) => {
                                                dd.icon = text;
                                                widget.refreshComponent();
                                            },
                                        })+
                                        glitter.htmlGenerate.editeInput({
                                            gvc : gvc,
                                            title : '服務標題',
                                            default : dd.title,
                                            placeHolder : `請輸入標題內容`,
                                            callback:(text)=>{
                                                dd.title = text;
                                                widget.refreshComponent();
                                            }
                                        })+
                                        glitter.htmlGenerate.editeText({
                                            gvc : gvc,
                                            title : '副標題',
                                            default : dd.desc,
                                            placeHolder : `請輸入副標題內容`,
                                            callback:(text)=>{
                                                dd.desc = text;
                                                widget.refreshComponent();
                                            }
                                        })

                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.dataList.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.dataList ,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({ icon: "bx bx-receipt", title: "個性化的發布內容", desc: "個性化推薦可以幫助用戶看到最好的結果" });
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