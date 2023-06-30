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
                    widget.data.dataList = widget.data.dataList??[
                        {
                            title: "電商應用",
                            desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                            img: ScriptStyle1.getRout("assets/img/features-1.png"),
                        },
                        {
                            title: "資料視覺化",
                            desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
                            img: ScriptStyle1.getRout("assets/img/features-2.png"),
                        },
                        {
                            title: "企業管理",
                            desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
                            img: ScriptStyle1.getRout("assets/img/features-3.png"),
                        },
                        {
                            title: "個人網站",
                            desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
                            img: ScriptStyle1.getRout("assets/img/features-4.png"),
                        },
                        {
                            title: "社群平台",
                            desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
                            img: ScriptStyle1.getRout("assets/img/features-1.png"),
                        },
                    ]



                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            const feature : {
                                dataList:{title:string,desc:string,img:string}[]
                            }={
                                dataList : widget.data.dataList
                            }
                            return /*html*/ `
        <!-- ======= Features Section ======= -->
        <section id="feature" class="features">
          <div class="container">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-4 mb-5 mb-lg-0" data-aos="fade-right">
                <ul class="nav nav-tabs flex-column">
                  ${glitter.print(function () {
                                var tmp = "";
                                feature.dataList.map((l, i) => {
                                    tmp += /*html*/ `
                        <li class="nav-item">
                          <a class="nav-link ${i == 0 ? `active show` : ``}" data-bs-toggle="tab" href="#tab-${i}">
                            <h4>${l.title}</h4>
                            <p>${l.desc}</p>
                          </a>
                        </li>
                      `;
                                });
                                return tmp;
                            })}
                </ul>
              </div>
              <div class="col-lg-7 ml-auto d-flex justify-content-center" data-aos="fade-left">
                <div class="tab-content">
                  ${glitter.print(function () {
                                var tmp = "";
                                feature.dataList.map((l, i) => {
                                    tmp += /*html*/ `
                        <div class="tab-pane ${i == 0 ? `active show` : ``}" id="tab-${i}">
                          <figure>
                            <img src="${l.img}" alt="" class="img-fluid" />
                          </figure>
                        </div>
                      `;
                                });
                                return tmp;
                            })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End Features Section -->
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
                            originalArray:widget.data.dataList,
                            gvc: gvc,
                            title: '項次詳細',
                            array: widget.data.dataList.map((linkData: any, index: number) => {
                                return {
                                    title: linkData.title??`項次:${index + 1}`,
                                    expand: linkData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '標題',
                                            default: linkData.title,
                                            placeHolder: '請輸入標題文字',
                                            callback: (text) => {
                                                linkData.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '概述',
                                            default: linkData.desc,
                                            placeHolder: '請輸入項次概述',
                                            callback: (text) => {
                                                linkData.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '預覽圖片1',
                                            def: linkData.img,
                                            callback:(data)=>{
                                                linkData.img=data
                                                widget.refreshComponent()
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.dataList.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.dataList.push( {
                                        title: "社群平台",
                                        desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
                                        img: ScriptStyle1.getRout("assets/img/features-1.png"),
                                    } );
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