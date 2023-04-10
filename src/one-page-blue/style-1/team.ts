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
                    let team = {
                        title: "我們的團隊",
                        desc: "我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽",
                        dataList:{
                            list: [
                                {
                                    img: ScriptStyle1.getRout("assets/img/team/team-1.jpg"),
                                    name: "陳志賢",
                                    pro: "執行長",
                                    link: ["https://www.facebook.com/", "https://www.instagram.com/"],
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/team/team-3.jpg"),
                                    name: "黃國玟",
                                    pro: "UI／UX設計師",
                                    link: [
                                        "https://www.instagram.com/",
                                        "https://squarestudio.tw",
                                        "https://www.instagram.com/",
                                        "https://www.facebook.com/",
                                        "https://twitter.com/",
                                    ],
                                },

                                { img: ScriptStyle1.getRout("assets/img/team/team-2.jpg"), name: "陳佳玲", pro: "系統規劃師", link: ["https://squarestudio.tw", "#"] },
                            ],
                        }

                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <!-- ======= Team Section ======= -->
                            <section id="team" class="team">
                              <div class="container">
                                <div class="section-title" data-aos="fade-up">
                                  <h2>${team.title}</h2>
                                  <p>${team.desc}</p>
                                </div>
                    
                                <div class="row gy-5">
                                ${glitter.print(function () {
                                var tmp = "";
                                team.dataList.list.map((l, i) => {
                                    tmp += /*html*/ `
                                    <div class="col-lg-4 col-md-6" data-aos-delay="${200 * (i + 1)}">
                                    <div class="member" data-aos="zoom-in">
                                      <div class="pic"><img src="${l.img}" class="img-fluid" alt="" /></div>
                                      <div class="member-info">
                                        <h4>${l.name}</h4>
                                        <span>${l.pro}</span>
                                        <div class="social">
                                        ${glitter.print(function () {
                                            var tmp = "";
                                            l.link.map((k) => {
                                                tmp += /*html*/ ` <a onclick="${gvc.event(()=>{})}" style="cursor:pointer"><i class="${ScriptStyle1.urlIcon(k, "bi")}"></i></a>`;
                                            });
                                            return tmp;
                                        })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                    `;
                                    });
                                    return tmp;
                                })}
                                </div>
                              </div>
                            </section>
                            <!-- End Team Section -->
                           `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    return ``
                    return Editor.arrayItem({
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
                                        title: `索引`,
                                        default: dd.number,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.number = text;
                                            widget.refreshComponent();
                                        },
                                    }),
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
                                    glitter.htmlGenerate.styleEditor(dd).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },'標題設計樣式'),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `描述`,
                                        default: dd.desc,
                                        placeHolder: '輸入描述',
                                        callback: (text) => {
                                            dd.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    ClickEvent.editer(gvc, widget, dd, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
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
                    })
                }
            }
        },
    }
})