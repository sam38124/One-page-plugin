import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            function recursive(r:any, first?:any) {
                var h = "";
                if (r.list === undefined) {
                    h += /*html*/ `
              <li>
                <a
                  class="${first ? "nav-link" : ""} scrollto"
                  onclick="${gvc.event(()=>{
                        TriggerEvent.trigger({
                            gvc: gvc, widget: widget, clickEvent: r
                        });
                        glitter.ut.frSize({
                            sm:``
                        },()=>{ $("#navbar").toggleClass("navbar-mobile");
                            $('.mobile-nav-toggle').toggleClass("bi-list")
                            $('.mobile-nav-toggle').toggleClass("bi-x")})()

                    })}"
                  style="cursor:pointer"
                  data-hash=${r.link}
                >
                  ${r.title}
                </a>
              </li>
            `;
                } else {
                    h += /*html*/ ` <li class="dropdown">
          <a class="">${r.title}<i class="bi bi-chevron-${first ? "down" : "right"}"></i></a>
          <ul class="">
            ${(()=>{
                        var tmp = "";
                        r.list.map((r2:any) => (tmp += recursive(r2)));
                        return tmp;
                    })()}
           
          </ul>
        </li>`;
                }
                return h;
            }
            return {
                view:()=>{
                    widget.data.bar=widget.data.bar??[]
                    widget.data.link=widget.data.link??[]
                    widget.data.moreLink=widget.data.moreLink??[]
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    widget.data.logoStyle=widget.data.logoStyle??{}
                    widget.data.logoTitleStyle=widget.data.logoTitleStyle??{}
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            const nav = {
                                title: widget.data.title??"萊恩設計",
                                logo: widget.data.logo??"",
                                bar: [
                                    ...widget.data.bar,
                                ],
                                link: widget.data.link??[{src : "https://www.facebook.com/"}, {src : "https://twitter.com/"}, {src : "https://www.instagram.com/"}, {src : "https://squarestudio.tw/"}],
                            }
                            if(widget.data.moreLink.length>0){
                                nav.bar.push({
                                    title: "更多內容",
                                    list: [
                                        ...widget.data.moreLink
                                    ],
                                })
                            }
                            return /*html*/ `<!-- ======= Header ======= -->
                              <header id="header" class="fixed-top d-flex align-items-center">
                                <div class="container d-flex align-items-center justify-content-between">
                                  <div class="logo d-flex align-items-center" onclick="" style="cursor:pointer">
                                      <img src="${nav.logo}" alt="" class="img-fluid me-3" />
                                      <h1 style="width:12rem"><a>${nav.title}</a></h1>
                                  </div>
                            
                                  <nav id="navbar" class="navbar order-last order-lg-0">
                                    <ul>
                                      ${glitter.print(function () {
                                            let tmp = "";
                                            nav.bar.map((r) => (tmp += recursive(r, 1)));
                                            return tmp;
                                      })}
                                    </ul>
                                    <i class="bi bi-list mobile-nav-toggle"></i>
                                  </nav><!-- .navbar -->
                            
                                  <div class="header-social-links d-flex align-items-center">
                                    ${glitter.print(function () {
                                        let tmp = "";
                                        nav.link.map((k:any) => {
                                            tmp += /*html*/ `<a class="facebbok" href="${k.src}" style="cursor:pointer"
                                                ><i class="${ScriptStyle1.urlIcon(k.src, "bi")}"></i
                                              ></a>`;
                                        });
                                        return tmp;
                                    })}
                                  </div>
                            
                                </div>
                              </header><!-- End Header -->`;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    widget.data.logoExpand= widget.data.logoExpand??{}
                    widget.data.soicalExpand= widget.data.soicalExpand??{}

                    return gvc.map([
                        `<div class="mt-3" style=""></div>`,
                        Editor.toggleExpand({
                            gvc:gvc,
                            title:"Logo區塊",
                            data:widget.data.logoExpand,
                            innerText:()=>{
                                return gvc.map([
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: `圖片`,
                                        def: widget.data.logo,
                                        callback: (e) => {
                                            widget.data.logo = e;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.styleEditor(widget.data.logoStyle).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },"圖片設計樣式"),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '標題',
                                        default: widget.data.title ?? '',
                                        placeHolder: '請輸入標題',
                                        callback: (text) => {
                                            widget.data.title = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.styleEditor(widget.data.logoTitleStyle).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },"標題設計樣式")
                                ])
                            }
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.bar,
                            gvc: gvc,
                            title: '主要導覽列',
                            array: widget.data.bar.map((BARData: any, index: number) => {

                                return {
                                    title: BARData.title || `連結:${index + 1}`,
                                    expand: BARData,
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

                                        TriggerEvent.editer(gvc, widget, BARData, {
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
                                    widget.data.bar.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
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
                                    title: hiddenData.title||`連結:${index + 1}`,
                                    expand: hiddenData,
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

                                        TriggerEvent.editer(gvc, widget, hiddenData, {
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
                                    widget.data.moreLink.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.link,
                            gvc: gvc,
                            title: '社群連結',
                            array: widget.data.link.map((linkData: any, index: number) => {
                                return {
                                    title: `社群連結:${index + 1}`,
                                    expand: linkData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '連結名稱',
                                            default: linkData.src,
                                            placeHolder: '請描述此連結的顯示資訊',
                                            callback: (text) => {
                                                linkData.src = text;
                                                widget.refreshComponent();
                                            },
                                        }),

                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.moreLink.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.soicalExpand,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.link.push({ src: "03" });
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