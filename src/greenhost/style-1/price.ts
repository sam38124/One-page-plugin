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
                    widget.data.title = widget.data.title??"響應單頁式網頁 · 關鍵字搜尋<br />萊恩設計專業客製";
                    widget.data.desc = widget.data.desc??"社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站";
                    widget.data.list = widget.data.list ??[
                        {
                            title: "A方案",
                            desc: "基本方案，最基本的開發環境",
                            icon: "fa fa-share-alt",
                            detail: [{ text: "功能 A" ,not: false  }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
                            price: { num: 249, unit: "月" },
                            btn: { name: "選擇方案", link: ["#"] },
                        },
                        {
                            title: "B方案",
                            desc: "黃金方案，提供多個開發需求與 WEB 視覺設計",
                            icon: "fa fa-share-alt",
                            highlight: true,
                            detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C" }],
                            price: { num: 399, unit: "月" },
                            btn: { name: "選擇方案", link: ["#"] },
                        },
                        {
                            title: "C方案",
                            desc: "白金方案，個性化開法與 APP 雙平台的上架",
                            icon: "fa fa-cog",
                            detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
                            price: { num: 799, unit: "月" },
                            btn: { name: "選擇方案", link: ["#"] },
                        },
                    ]

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let price = {
                                title:widget.data.title,
                                desc:widget.data.desc,
                                list:widget.data.list
                            }
                            return /*html*/ `
        <!-- Pricing Start -->
        <div class="container-xxl py-5">
          <div class="container px-lg-5">
            <div
              class="section-title position-relative text-center mx-auto mb-5 pb-4 wow fadeInUp"
              data-wow-delay="0.1s"
              style="max-width: 600px;"
            >
              <h1 class="mb-3">${price.title}</h1>
              <p class="mb-1">${price.desc}</p>
            </div>
            <div class="row gy-5 gx-4">
              ${glitter.print(function () {
                                var tmp = "";
                                price.list.map((l:any, j:number) => {
                                    tmp += /*html*/ `
                    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${0.2 + 0.2 * j}s">
                      <div class="position-relative shadow rounded border-top border-5 border-${l.highlight ? "secondary" : "primary"}">
                        <div
                          class="d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle bg-${
                                        l.highlight ? "secondary" : "primary"
                                    } rounded-circle"
                          style="width: 45px; height: 45px; margin-top: -3px;"
                        >
                          <i class="fa fa-share-alt text-white"></i>
                        </div>
                        <div class="text-center border-bottom p-4 pt-5">
                          <h4 class="fw-bold">${l.title}</h4>
                          <p class="mb-0">${l.desc}</p>
                        </div>
                        <div class="text-center border-bottom p-4">
                          <!-- <p class="text-primary mb-1">Latest Offer - <strong>Save 30%</strong></p> -->
                          <h1 class="mb-3">
                            <small class="align-top" style="font-size: 22px; line-height: 45px;">$</small>${l.price.num.toLocaleString()}<small class="align-bottom" style="font-size: 16px; line-height: 40px;">/ ${l.price.unit}</small>
                          </h1>
                          <a
                            class="btn btn-${l.highlight ? "secondary" : "primary"} px-4 py-2"
                            href="${l.btn.link}"
                            >${l.btn.name}</a
                          >
                        </div>
                        <div class="p-4">
                          ${glitter.print(function () {
                                        var tmp = "";
                                        l.detail.map((t:any) => {
                                            tmp += /*html*/ `
                                <p class="border-bottom pb-3">
                                  ${
                                                (t.not==true || t.not == "true")
                                                    ? `<i class="fa fa-times text-secondary text-center" style="width:2em"></i>`
                                                    : `<i class="fa fa-check text-primary text-center" style="width:2em"></i>`
                                            }
                                  ${t.text}
                                </p>
                              `;
                                        });
                                        return tmp;
                                    })}
                        </div>
                      </div>
                    </div>
                  `;
                                });
                                return tmp;
                            })}
            </div>
          </div>
        </div>
        <!-- Pricing End -->
      `;
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title ?? '',
                            placeHolder: '請輸入標題',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '副標題',
                            default: widget.data.desc ?? '',
                            placeHolder: '請輸入副標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.list,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.list.map((dd: any, index: number) => {
                                dd.detailExpand = dd.detailExpand??{}
                                return {
                                    title: dd.title || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `索引`,
                                            default: dd.title,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `副標題`,
                                            default: dd.desc,
                                            placeHolder: '輸入副標題名稱',
                                            callback: (text) => {
                                                dd.desc = text;
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
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `價格`,
                                            default: dd.price.num,
                                            placeHolder: '輸入價格資訊',
                                            callback: (text) => {
                                                dd.price.num = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `價格單位`,
                                            default: dd.price.unit,
                                            placeHolder: '輸入價格單位',
                                            callback: (text) => {
                                                dd.price.unit = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `按鍵文字`,
                                            default: dd.btn.name,
                                            placeHolder: '輸入按鍵內文',
                                            callback: (text) => {
                                                dd.btn.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `按鍵網址`,
                                            default: dd.btn.link,
                                            placeHolder: '輸入網址',
                                            callback: (text) => {
                                                dd.btn.link = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.arrayItem({
                                            originalArray:dd.detail,
                                            gvc: gvc,
                                            title: '功能清單',
                                            array: dd.detail.map((detail: any, index: number) => {
                                                return {
                                                    title: detail.title || `功能:${index + 1}`,
                                                    expand: detail,
                                                    innerHtml: gvc.map([
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `功能名稱`,
                                                            default: detail.text,
                                                            placeHolder: '輸入名稱',
                                                            callback: (text) => {
                                                                detail.text = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                        Editor.select({
                                                            title: `是否打勾`,
                                                            gvc: gvc,
                                                            def: detail.not,
                                                            array: [
                                                                {
                                                                    title: '打勾',
                                                                    value:  "false",
                                                                },
                                                                {
                                                                    title: '打叉',
                                                                    value: "true",
                                                                },
                                                            ],
                                                            callback: (text) => {
                                                                detail.not = text;
                                                                widget.refreshComponent();
                                                            },
                                                        })
                                                    ]),
                                                    minus: gvc.event(() => {
                                                        dd.detail.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: dd.detailExpand,
                                            plus: {
                                                title: '添加功能',
                                                event: gvc.event(() => {
                                                    dd.detail.push({ text: "功能 B", not: true });
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent:()=>{
                                                widget.refreshComponent()
                                            }
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
                                    widget.data.list.push({ title: "A方案",
                                        desc: "基本方案，最基本的開發環境",
                                        icon: "fa fa-share-alt",
                                        detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
                                        price: { num: 249, unit: "月" },
                                        btn: { name: "選擇方案", link: ["#"] } });
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