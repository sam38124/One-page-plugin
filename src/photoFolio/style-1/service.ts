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
                    let banner= {
                        listData:widget.data.listData??{
                            list: [
                            {
                                icon: { name: "bi bi-activity"},
                                title: "電商應用",
                                desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                                link: "#",
                            },
                            {
                                icon: { name: "bi bi-broadcast"},
                                title: "資料視覺化",
                                desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
                                link: "#",
                            },
                            {
                                icon: { name: "bi bi-easel"},
                                title: "企業管理",
                                desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
                                link: "#",
                            },
                            {
                                icon: { name: "bi bi-bounding-box-circles"},
                                title: "個人網站",
                                desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
                                link: "#",
                            },
                            {
                                icon: { name: "bi bi-calendar4-week"},
                                title: "社群平台",
                                desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
                                link: "#",
                            },
                            {
                                icon: { name: "bi bi-chat-square-text"},
                                title: "線上課程網站",
                                desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
                                link: "#",
                            },
                            ],
                        },

                    }
                    widget.data = banner;
                    return gvc.bindView({
                        bind:id,
                        view:()=>{

                            return /*html*/ `
<main>
        <!-- ======= Featured Services Section ======= -->
            <section id="services" class="services">
      <div class="container">

        <div class="row gy-4">
          ${(()=>{
              let html = ``;
              banner.listData.list.map((listData:any)=>{
                  html += `
                    <div class="col-xl-3 col-md-6 d-flex">
                        <div class="service-item position-relative">
                            <i class="${listData.icon.name}"></i>
                            <h4><a href="" class="stretched-link">${listData.title}</a></h4>
                            <p>${listData.desc}</p>
                        </div>
                    </div><!-- End Service Item -->
                  `
              })
                                
              return html    
          })()}

          


        </div>

      </div>
    </section><!-- End Services Section -->
</main>
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
                        Editor.arrayItem({
                            originalArray:widget.data.listData,
                            gvc: gvc,
                            title: '服務',
                            array: widget.data.listData.list.map((linkData: any, index: number) => {
                                return {
                                    title: linkData.title??`項目:${index + 1}`,
                                    expand: linkData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '服務標題',
                                            default: linkData.title,
                                            placeHolder: '請輸入服務的標題',
                                            callback: (text) => {
                                                linkData.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: '服務敘述',
                                            default: linkData.desc,
                                            placeHolder: '請描述此服務的內容',
                                            callback: (text) => {
                                                linkData.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: linkData.icon.name,
                                            callback: (text: string) => {
                                                linkData.icon.name = text;
                                            },
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.listData.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.listData,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.listData.list.push({ icon: { name: "bi bi-chat-square-text", color: "#ADD8E6" },
                                        title: "線上課程網站",
                                        desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
                                        link: "#", });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                    ])

                }
            }
        },
    }
})