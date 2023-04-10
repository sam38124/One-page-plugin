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
                    let price= {
                        title: "響應單頁式網頁 · 關鍵字搜尋<br />萊恩設計專業客製",
                        desc: "社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站",
                        dataList:{
                            list: [
                                {
                                    title: "A方案",
                                    desc: "基本方案，最基本的開發環境",
                                    icon: "fa fa-share-alt",
                                    detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
                                    price: { num: 249, unit: "月" },
                                    btn: { name: "選擇方案", link: "#" },
                                },
                                {
                                    title: "B方案",
                                    desc: "黃金方案，提供多個開發需求與 WEB 視覺設計",
                                    icon: "fa fa-share-alt",
                                    highlight: true,
                                    detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C" }],
                                    price: { num: 399, unit: "月" },
                                    btn: { name: "選擇方案", link: "#" },
                                },
                                {
                                    title: "C方案",
                                    desc: "白金方案，個性化開法與 APP 雙平台的上架",
                                    icon: "fa fa-cog",
                                    detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
                                    price: { num: 799, unit: "月" },
                                    btn: { name: "選擇方案", link: "#" },
                                },
                            ],
                        },

                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                             <!-- ======= Pricing Section ======= -->
                            <section id="price" class="pricing section-bg">
                              <div class="container">
                                <div class="section-title" data-aos="fade-up">
                                  <h2>${price.title}</h2>
                                  <p>${price.desc}</p>
                                </div>
                    
                                <div class="row d-flex justify-content-center">
                                  ${glitter.print(function () {
                                    var tmp = "";
                                    price.dataList.list.map((l) => {
                                        tmp += /*html*/ `
                                        <div class="col-lg-3 col-md-6 mt-4 mt-md-0">
                                          <div class="box ${l.highlight ? `featured` : ``}" data-aos="zoom-in" data-aos-delay="100">
                                            <h3>${l.title}</h3>
                                            <h4><sup>$</sup>${l.price.num.toLocaleString()}<span> / ${l.price.unit}</span></h4>
                                            <ul>
                                              ${glitter.print(function () {
                                                  let tmp = "";
                                                  l.detail.map((t) => {
                                                      var li = t.not ? `<li class="na">` : `<li>`;
                                                      tmp += /*html*/ ` ${li}</i> <span>${t.text}</span></li> `;
                                                  });
                                                  return tmp;
                                              })}
                                            </ul>
                                            <div class="btn-wrap">
                                              <a class="btn-buy" onclick="${gvc.event(()=>{l.btn.link})}" style="cursor:pointer">${l.btn.name}</a>
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
                            <!-- End Pricing Section -->
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