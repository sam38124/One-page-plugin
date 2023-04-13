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
                    // @ts-ignore
                    setTimeout(() => $("#dash-daterange").daterangepicker({ singleDatePicker: !0 }), 500);

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            const nav = {
                                title: widget.data.title??"萊恩設計",
                                logo: widget.data.logo??"",
                                bar: [
                                    ...widget.data.bar,
                                    {
                                        title: "更多內容",
                                        list: [
                                            ...widget.data.moreLink
                                        ],
                                    },
                                ],
                                top: {
                                    phone: "0918-563-927",
                                    clock: "週一至週五 09:00 - 19:00",
                                },
                                btn: { name: "登入", link: "#" },
                            }
                            return `
                            <!-- ======= Header ======= -->
                            <header id="header" class="fixed-top d-flex align-items-cente">
                              <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
                                <div class="d-flex logo" onclick="${gvc.event(()=>{})}" style="cursor:pointer">
                                  <img src="${nav.logo}" alt="" class="img-fluid me-3" />
                                  <h1 class="logo me-auto me-lg-0"><a>${nav.title}</a></h1>
                                </div>
                    
                                <nav id="navbar" class="navbar order-last order-lg-0">
                                  <ul>
                                    ${(()=>{
                                var tmp = "";
                                nav.bar.map((b) => (tmp += ScriptStyle1.recursive(b, true)));
                                return tmp;
                            })()}
                                   
                                  </ul>
<!--                                  todo 這顆漢堡不會作動-->
                                  <i class="bi bi-list mobile-nav-toggle"></i>
                                </nav>
                    
                                <a
                                  class="book-a-table-btn scrollto d-none d-lg-flex"
                                  onclick=""
                                  style="cursor:pointer"
                                  >${nav.btn.name}</a
                                >
                              </div>
                            </header>
                            <!-- End Header -->
                            `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `Logo圖片`,
                            def: widget.data.logo,
                            callback: (e) => {
                                widget.data.logo = e;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '公司名稱',
                            default: widget.data.title ?? '',
                            placeHolder: '請輸入公司名稱',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        `<div class="mt-3"></div>`
                        ,
                        Editor.arrayItem({
                            originalArray:widget.data.list,
                            gvc: gvc,
                            title: '主要導覽列',
                            array: widget.data.bar.map((BARData: any, index: number) => {
                                return {
                                    title: `連結:${index + 1}`,
                                    expand: widget.data.bar,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '連結名稱',
                                            default: BARData.title,
                                            placeHolder: '請描述此連結的顯示資訊',
                                            callback: (text) => {
                                                BARData.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),

                                        ClickEvent.editer(gvc, widget, BARData, {
                                            hover: true,
                                            option: [],
                                            title: "點擊事件"
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.bar.splice(index, 1);
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
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.moreLink,
                            gvc: gvc,
                            title: '更多內容',
                            array: widget.data.moreLink.map((hiddenData: any, index: number) => {
                                return {
                                    title: `連結:${index + 1}`,
                                    expand: widget.data.moreLink,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '連結名稱',
                                            default: hiddenData.title,
                                            placeHolder: '請描述此連結的顯示資訊',
                                            callback: (text) => {
                                                hiddenData.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),

                                        ClickEvent.editer(gvc, widget, hiddenData, {
                                            hover: true,
                                            option: [],
                                            title: "點擊事件"
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.moreLink.splice(index, 1);
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
                        }),

                    ])

                }
            }
        },
    }
})