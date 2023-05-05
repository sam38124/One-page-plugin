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
            let footer= {
                info: {
                    title: "萊恩設計",
                    list: [
                        { icon: "bi bi-map", title: "台中市臺灣大道二段285號20樓" },
                        { icon: "bi bi-telephone", title: "(886) 0978-028-730" },
                        { icon: "bi bi-alarm", title: `週一至週五 09:00 AM – 19:00 PM` },
                        { icon: "bi bi-envelope", title: `jianzhi.wang@ncdesign.info` },
                    ],
                },
                map: [
                    {
                        title: "網站導覽",
                        list: [
                            { name: "服務項目", link: "#service" },
                            { name: "產品介紹", link: "#project" },
                            { name: "定價方案", link: "#price" },
                            { name: "技術與能力", link: "#banner" },
                            { name: "公司團隊", link: "#team" },
                        ],
                    },
                    {
                        title: "推薦網站",
                        list: [
                            { name: "Google", link: "https://www.google.com.tw/" },
                            { name: "Yahoo", link: "https://tw.yahoo.com/" },
                        ],
                    },
                ],
                subs: { desc: "想收到與萊恩設計有關的最新消息，請立即訂閱我們的電子報，我們會將資訊送至你的信箱。", link: "#" },
                link: [
                    "https://twitter.com/",
                    "https://www.facebook.com/",
                    "https://www.instagram.com/",
                    "https://www.skype.com/",
                    "https://linkedin.com/",
                ],
            }
            widget.data.info = widget.data.info??{
                title:"萊恩設計",
                list: [
                    { icon: "bi bi-map", title: "台中市臺灣大道二段285號20樓" },
                    { icon: "bi bi-telephone", title: "(886) 0978-028-730" },
                    { icon: "bi bi-alarm", title: `週一至週五 09:00 AM – 19:00 PM` },
                    { icon: "bi bi-envelope", title: `jianzhi.wang@ncdesign.info` },
                ]
            };
            widget.data.map = widget.data.map??[
                {
                    title: "網站導覽",
                    list: [
                        { name: "服務項目", link: "#service" },
                        { name: "產品介紹", link: "#project" },
                        { name: "定價方案", link: "#price" },
                        { name: "技術與能力", link: "#banner" },
                        { name: "公司團隊", link: "#team" },
                    ],
                },
                {
                    title: "推薦網站",
                    list: [
                        { name: "Google", link: "https://www.google.com.tw/" },
                        { name: "Yahoo", link: "https://tw.yahoo.com/" },
                    ],
                },
            ];
            widget.data.subs = widget.data.subs??{
                desc: "想收到與萊恩設計有關的最新消息，請立即訂閱我們的電子報，我們會將資訊送至你的信箱。", link: "#"
            }
            widget.data.link = widget.data.link?? [
                "https://twitter.com/",
                "https://www.facebook.com/",
                "https://www.instagram.com/",
                "https://www.skype.com/",
                "https://linkedin.com/",
            ]

            return {
                view:()=>{

                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    const footer = {
                        info: widget.data.info,
                        map: widget.data.map,
                        subs:widget.data.subs,
                        link:widget.data.link
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let funnel = new Funnel(gvc);
                            return /*html*/ ` <!-- ======= Footer ======= -->
        <footer id="footer" class="footer">
          <div class="footer-content">
            <div class="container">
              <div class="row">
                <div class="col-lg-3 col-md-6">
                  <div class="footer-info">
                    <h3>${footer.info.title}</h3>
                    ${glitter.print(function () {
                                var tmp = "";
                                footer.info.list.map((f:any) => {
                                    tmp += /*html*/ `<div class="d-flex align-items-center mb-3">
                          <i class="${f.icon} fs-5 me-3"></i><span class="pb-1"><a>${f.title}</a></span>
                        </div> `;
                                });
                                return tmp;
                            })}
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
                                        m.list.map((l:any) => {
                                            tmp += /*html*/ `<li>
                                <i class="bi bi-chevron-right"></i>
                                <a href="${l.link}" style="cursor:pointer"> ${l.name}</a>
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
               
              </div>
            </div>
          </div>

          <div class="footer-legal text-center">
            <div class="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
              <div class="d-flex flex-column align-items-center align-items-lg-start">
                <div class="copyright">${funnel.copyRight("Lion Design","","aqua") }</div>
                <div class="credits">
                  <!-- All the links in the footer should remain intact. -->
                  <!-- You can delete the links only if you purchased the pro version. -->
                  <!-- Licensing information: https://bootstrapmade.com/license/ -->
                  <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/herobiz-bootstrap-business-template/ -->
                  Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
              </div>

              <div class="social-links order-first order-lg-last mb-3 mb-lg-0">
                ${glitter.print(function () {
                                var tmp = "";
                                footer.link.map((k:string) => {
                                    tmp += /*html*/ `
                      <a href="${k}" style="cursor:pointer"
                        ><i class="${ScriptStyle1.urlIcon(k, "bi")}"></i
                      ></a>
                    `;
                                });
                                return tmp;
                            })}
              </div>
            </div>
          </div>
        </footer>
        <!-- End Footer -->

        <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
   
        `;
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    widget.data.mapExpand = widget.data.mapExpand ?? {}
                    return gvc.map([
                        `<div class="mt-2"></div>`,
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '左大標題',
                            default: widget.data.info.title,
                            placeHolder: '請輸入左大標題',
                            callback: (text) => {
                                widget.data.info.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.info,
                            gvc: gvc,
                            title: '聯絡資訊',
                            array: widget.data.info.list.map((lineData: any, index: number) => {
                                return {
                                    title: `第${index+1}行資訊`,
                                    expand: lineData,
                                    innerHtml: gvc.map([
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: lineData.icon,
                                            callback: (text: string) => {
                                                lineData.icon = text;
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '資訊',
                                            default: lineData.title,
                                            placeHolder: '請輸入聯絡資訊',
                                            callback: (text) => {
                                                lineData.title = text;
                                                widget.refreshComponent();
                                            },
                                        })

                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.map.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.info,
                            plus: {
                                title: '添加行數',
                                event: gvc.event(() => {
                                    widget.data.info.list.push({icon: "bi bi-envelope", title: `jianzhi.wang@ncdesign.info`});
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.map,
                            gvc: gvc,
                            title: '中間資訊',
                            array: widget.data.map.map((lineData: any, index: number) => {
                                lineData.list.expand = lineData.list.expand??{}
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
                                            originalArray:lineData.list,
                                            gvc: gvc,
                                            title: '行內資訊',
                                            array: lineData.list.map((rowData: any, rowIndex: number) => {
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
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: '連結網址',
                                                            default: rowData.link,
                                                            placeHolder: '請輸入連結網址',
                                                            callback: (text) => {
                                                                rowData.link = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),

                                                    ]),
                                                    minus: gvc.event(() => {
                                                        lineData.list.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: lineData.list.expand,
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
                            expand: widget.data.mapExpand,
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

                    ])


                }
            }
        },
    }
})