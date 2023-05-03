import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {Funnel} from "../../glitterBundle/funnel.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.outro=widget.data.outro ??{
                title: "萊恩設計",
                desc: "提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站",
                socialData:{
                    link:[
                        {src:"https://www.facebook.com/"},
                        {src:"https://twitter.com/"} ,
                        {src:"https://www.instagram.com/"},
                        {src:"https://squarestudio.tw/"}]
                }
            }
            widget.data.map=widget.data.map ?? [
                {
                    title: "網站導覽",
                    listData: {
                        list:[{ name: "菜單", link: "#menu" },
                            { name: "產品介紹", link: "#feature" },
                            { name: "定價方案", link: "#slider" },
                            { name: "技術領域", link: "#banner" },
                            { name: "公司團隊", link: "#team" }]
                    },
                },
                {
                    title: "推薦網站",
                    listData: {
                        list: [
                            { name: "Google", link: "https://www.google.com.tw/" },
                            { name: "Yahoo", link: "https://tw.yahoo.com/" },
                        ]
                    },

                },
            ]
            widget.data.subs=widget.data.subs?? { desc: "想收到與萊恩設計有關的最新消息，請立即訂閱我們的電子報，我們會將資訊送至你的信箱。", link: "#" }
            return {
                view:()=>{

                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    const footer = {
                        subs: widget.data.subs,
                        outro: widget.data.outro,
                        map:widget.data.map,
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let funnel = new Funnel(gvc);
                            return /*html*/ `<!-- ======= Footer ======= -->
        <footer id="footer">
          <div class="footer-top">
            <div class="container">
              <div class="row">
                <div class="col-lg-3 col-md-6">
                  <div class="footer-info">
                    <h3>${footer.outro.title}</h3>
                    <p>${footer.outro.desc}</p>
                    <div class="social-links mt-3">
                      ${glitter.print(function () {
                                var tmp = "";
                                footer.outro.socialData.link.map((r:any) => {
                                    tmp += /*html*/ `
                            <a class="text-white" href="${r.src}" style="cursor:pointer">
                              <i class="${ScriptStyle1.urlIcon(r.src, "bx")}"></i>
                            </a>
                          `;
                                });
                                return tmp;
                            })}
                    </div>
                  </div>
                </div>

                ${glitter.print(function () {
                                var tmp = "";
                                footer.map.map((m:any) => {
                                    tmp += /*html*/ `
                      <div class="col-lg-2 col-md-6 footer-links">
                        <h4>${m.title}</h4>
                        <ul>
                          ${glitter.print(function () {
                                        var tmp = "";
                                        
                                        m.listData.list.map((l:any) => {
                                            tmp += /*html*/ `<li>
                                <i class="bx bx-chevron-right"></i>
                                <a
                                  class="scrollto"
                                  href="${l.link}"
                                  style="cursor:pointer"
                                  data-hash=${l.link}
                                  >${l.name}</a
                                >
                              </li>`;
                                        });
                                        return tmp;
                                    })}
                        </ul>
                      </div>
                    `;
                                });
                                return tmp;
                            })}

                <div class="col-lg-4 col-md-6 footer-newsletter">
                  <h4>訂閱</h4>
                  <p>${footer.subs.desc}</p>
                  <form><input type="email" name="email" /><input type="submit" value="送出" /></form>
                </div>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="copyright">${funnel.copyRight("Lion Design","","#1bac91")}</div>
            <div class="credits">
              <!-- All the links in the footer should remain intact. -->
              <!-- You can delete the links only if you purchased the pro version. -->
              <!-- Licensing information: https://bootstrapmade.com/license/ -->
              <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/maxim-free-onepage-bootstrap-theme/ -->
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>
        <!-- End Footer -->

        <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>`;
                        },divCreate:{},
                        onCreate:()=>{
                            (function () {
                                // @ts-ignore
                                const select = (el, all = false) => {
                                    el = el.trim();
                                    if (all) {
                                        return [...document.querySelectorAll(el)];
                                    } else {
                                        return document.querySelector(el);
                                    }
                                };
                                // @ts-ignore
                                const onscroll = (el, listener) => {
                                    el.addEventListener("scroll", listener);
                                };
                                /**
                                 * Back to top button
                                 */
                                let backtotop = select(".back-to-top");
                                if (backtotop) {
                                    const toggleBacktotop = () => {
                                        if (window.scrollY > 100) {
                                            backtotop.classList.add("active");
                                        } else {
                                            backtotop.classList.remove("active");
                                        }
                                    };
                                    window.addEventListener("load", toggleBacktotop);
                                    onscroll(document, toggleBacktotop);
                                }
                            })();

                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        `<div class="mt-2"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '基本資訊',
                            data: widget.data.outro,
                            innerText: ()=>{
                                return `${glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '左大標題',
                                        default: widget.data.outro.title,
                                        placeHolder: '請輸入左大標題',
                                        callback: (text) => {
                                            widget.data.outro.title = text;
                                            widget.refreshComponent();
                                        },
                                    })}`+
                                    `
                                ${glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: '左大標敘文',
                                        default: widget.data.outro.desc,
                                        placeHolder: '請輸入左大標下方的描述文',
                                        callback: (text) => {
                                            widget.data.outro.desc = text;
                                            widget.refreshComponent();
                                        },
                                    })}
                                `+
                                    Editor.arrayItem({
                                        originalArray:widget.data.outro,
                                        gvc: gvc,
                                        title: '行內資訊',
                                        array: widget.data.outro.socialData.link.map((socialData: any, index: number) => {
                                            return {
                                                title: `第${index+1}個社群資訊`,
                                                expand: widget.data.outro.socialData,
                                                innerHtml:glitter.htmlGenerate.editeInput({
                                                    gvc : gvc,
                                                    title : '社群網址',
                                                    default : socialData.src,
                                                    placeHolder : `請輸入社群網站的網址`,
                                                    callback:(text)=>{
                                                        socialData.src = text;
                                                        widget.refreshComponent();
                                                    }
                                                })+Editor.fontawesome({
                                                    gvc: gvc,
                                                    title: '圖示',
                                                    def: socialData.icon,
                                                    callback: (text: string) => {
                                                        socialData.icon = text;
                                                        widget.refreshComponent();
                                                    },
                                                })

                                                ,
                                                minus: gvc.event(() => {
                                                    widget.data.outro.socialData.link.splice(index, 1);
                                                    widget.refreshComponent();
                                                }),
                                            };
                                        }),
                                        expand: widget.data.outro.socialData,
                                        plus: {
                                            title: '添加區塊',
                                            event: gvc.event(() => {
                                                widget.data.outro.socialData.link.push("");
                                                widget.refreshComponent();
                                            }),
                                        },
                                        refreshComponent:()=>{
                                            widget.refreshComponent()
                                        }
                                    })
                            }

                        }),
                        `<div class="mt-2"></div>`,
                        Editor.arrayItem({
                            originalArray:widget.data.map,
                            gvc: gvc,
                            title: '中間資訊',
                            array: widget.data.map.map((lineData: any, index: number) => {
                                return {
                                    title: `第${index+1}行資訊`,
                                    expand: lineData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '行名',
                                            default: lineData.title,
                                            placeHolder: '這行連結資料的大標',
                                            callback: (text) => {
                                                lineData.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.arrayItem({
                                            originalArray:lineData.listData.list,
                                            gvc: gvc,
                                            title: '行內資訊',
                                            array: lineData.listData.list.map((rowData: any, rowIndex: number) => {
                                                return {
                                                    title: `第${rowIndex+1}列資訊`,
                                                    expand: rowData,
                                                    innerHtml: gvc.map([
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: '連結名稱',
                                                            default: rowData.name,
                                                            placeHolder: '請描述此連結的顯示資訊',
                                                            callback: (text) => {
                                                                rowData.name = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                        TriggerEvent.editer(gvc, widget, rowData, {
                                                            hover: true,
                                                            option: [],
                                                            title: "點擊事件"
                                                        })

                                                    ]),
                                                    minus: gvc.event(() => {
                                                        lineData.listData.list.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: lineData.listData,
                                            plus: {
                                                title: '添加區塊',
                                                event: gvc.event(() => {
                                                    lineData.listData.list.push({name: '', link:{}});
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent:()=>{
                                                widget.refreshComponent()
                                            }
                                        })

                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.map.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加行數',
                                event: gvc.event(() => {
                                    widget.data.map.push({title: '內容', listData:{list:[]},expand:true});
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                        `<div class="mt-2"></div>`
                    ])

                }
            }
        },
    }
})
