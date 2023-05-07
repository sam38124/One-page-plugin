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
                    let service :{
                        title:string,
                        desc:string,
                        listData:{
                            list:{
                                icon:{name:string , color:string},
                                title:string,
                                desc:string,
                                link:string,
                            }[]
                        }
                    }= {
                        title: widget.data.title??"星澄基地",
                        desc: widget.data.desc??"提供您建構網站的最佳解，打造屬於您的專屬應用",
                        listData:widget.data.listData??{
                            list: [
                                { icon: "bx bx-receipt", title: "個性化的發布內容", desc: "個性化推薦可以幫助用戶看到最好的結果", link: "#" },
                                { icon: "bx bx-cube-alt", title: "提供快速發文", desc: "發文附圖是近年來使用社群的基本公式", link: "#" },
                                { icon: "bx bx-images", title: "活動規劃功能", desc: "使用活動排程規劃工具來追蹤所有重要的活動", link: "#" },
                                {
                                    icon: "bx bx-shield",
                                    title: "資料視覺化",
                                    desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
                                    link: "#",
                                },
                                { icon: "bx bx-atom", title: "個人網站", desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地", link: "#" },
                                { icon: "bx bx-id-card", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零組件更換", link: "#" },
                            ]
                        },
                    }
                    widget.data = service;
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <!-- ======= Services Section ======= -->
        <section id="service" class="services section-bg">
          <div class="container mt-5" data-aos="fade-up">
            <div class="section-title">
              <h2>${service.title}</h2>
              <p>${service.desc}</p>
            </div>

            <div class="row">
              ${glitter.print(function () {
                                var tmp = "";
                                service.listData.list.map((l:any, i) => {
                                    tmp += /*html*/ `
                    <div
                      class="col-md-6 col-lg-3 d-flex align-items-stretch justify-content-center"
                      data-aos="zoom-in"
                      data-aos-delay="${100 * i}"
                    >
                      <div class="icon-box" href="${l.link}" style="cursor:pointer">
                        <div class="icon"><i class="${l.icon}"></i></div>
                        <h4 class="title">
                          <a> ${l.title} </a>
                        </h4>
                        <p class="description">${l.desc}</p>
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
                            placeHolder: '輸入副標題的敘述',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
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
                                        }),
                                        `${Editor.h3("修改顏色")}
                                         <input type="color" value="${linkData.icon.color}" onchange="${gvc.event((e:HTMLInputElement)=>{
                                            linkData.icon.color = e.value;
                                            widget.refreshComponent();
                                        })}">
                                        `

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