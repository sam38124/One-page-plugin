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
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    let faq = {
                        title: widget.data.title??"沒有那麼多的預算？",
                        desc: `前往星澄基地，快速打造專屬於您的系統`,
                        dataList:widget.data.dataList??{
                            list: [
                                {
                                    q: "星澄基地是什麼？",
                                    a: "星澄基地是萊恩設計所開發的套版應用平台，集結了我們所有的開發案例，讓您能用最低的成本打造您的應用",
                                },
                                { q: "是否支援APP上架服務？", a: "當然，購買白金方案後，會有專人聯繫您APP上架相關事宜。" },
                                {
                                    q: "是否支援電商與金流功能？",
                                    a: "可以，我們採用綠界科技作為金流平台，由後台簡易帶入HASHKEY與特店編號，即可串接金流服務。",
                                },
                                { q: "我能從網站或 APP 中販售商品嗎？", a: "可以，您可以在電商平台上販售您設計的商品。" },
                            ]
                        },
                    }
                    widget.data = faq;
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <!-- ======= F.A.Q Section ======= -->
        <section id="faq" class="faq section-bg">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${faq.title}</h2>
              <p>${faq.desc}</p>
            </div>

            <div class="faq-list">
              <ul>
                ${glitter.print(function () {
                                var tmp = "";
                                faq.dataList.list.map((l:any, i:number) => {
                                    tmp += /*html*/ `
                      <li data-aos="fade-up" data-aos-delay="${i * 100}">
                        <i class="bx bx-help-circle icon-help"></i>
                        <a data-bs-toggle="collapse" data-bs-target="#faq-list-${i}" class="collapse${i == 0 ? `` : `d`}"
                          >${l.q}<i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i
                        ></a>
                        <div id="faq-list-${i}" class="collapse ${i == 0 ? `show` : ``}" data-bs-parent=".faq-list">
                          <p>${l.a}</p>
                        </div>
                      </li>
                    `;
                                });
                                return tmp;
                            })}
              </ul>
            </div>
          </div>
        </section>
        <!-- End F.A.Q Section -->
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
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題名稱',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.dataList,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.dataList.list.map((dd: any, index: number) => {
                                return {
                                    title: `問題${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `問題`,
                                            default: dd.q,
                                            placeHolder: '請描述問題',
                                            callback: (text) => {
                                                dd.q = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `回答`,
                                            default: dd.a,
                                            placeHolder: '請輸入此問題回答',
                                            callback: (text) => {
                                                dd.a = text;
                                                widget.refreshComponent();
                                            },
                                        }),


                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.dataList.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.dataList,
                            plus: {
                                title: '添加問題',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({
                                        q: "星澄基地是什麼？",
                                        a: "星澄基地是萊恩設計所開發的套版應用平台，集結了我們所有的開發案例，讓您能用最低的成本打造您的應用",
                                        });
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