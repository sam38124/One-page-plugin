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

                    let feature = {
                        dataList: widget.data.dataList??[
                            {
                                icon: { name: "bi bi-binoculars", color: "#F9BA2B" },
                                tab: "文教",
                                title: "田地在走，科技要有",
                                img: ScriptStyle1.getRout("assets/img/features-1.png"),
                            },
                            {
                                icon: { name: "bi bi-box-seam", color: "#E92BF9" },
                                tab: "消費",
                                title: "庇護工場推中秋伴手禮 即日起開放預購",
                                img: ScriptStyle1.getRout("assets/img/features-2.png"),
                            },
                            {
                                icon: { name: "bi bi-brightness-high", color: "#2B75F9" },
                                tab: "社會",
                                title: "eTrade hub跨境電商大講堂",
                                img: ScriptStyle1.getRout("assets/img/features-3.png"),
                            },
                            {
                                icon: { name: "bi bi-command", color: "#63F92B" },
                                tab: "產能",
                                title: "掌握關鍵新動能 布局高雄大未來",
                                img: ScriptStyle1.getRout("assets/img/features-4.png"),
                            },
                            {
                                icon: { name: "bi bi-easel", color: "#2BF9F9" },
                                tab: "影音",
                                title: "發呆系歌手 沈安『不稀罕別人給的完整╱狂奔』",
                                img: ScriptStyle1.getRout("assets/img/features-2.png"),
                            },
                            {
                                icon: { name: "bi bi-map", color: "#F53D3D" },
                                tab: "藝術",
                                title: "如何正確而有《次第》的學習翡翠",
                                img: ScriptStyle1.getRout("assets/img/features-1.png"),
                            },
                        ]
                    }
                    widget.data = feature;
                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <!-- ======= Features Section ======= -->
                            <section id="features" class="features">
                              <div class="container">
                        
                                <div class="row">
                                  <div class="col-lg-6 mt-2 mb-tg-0 order-2 order-lg-1">
                                    <ul class="nav nav-tabs flex-column">
                                      ${glitter.print(function () {
                                                        var tmp = "";
                                                        feature.dataList.map((f:any, i:number) => {
                                                            tmp += /*html*/ `
                                                              <li class="nav-item" data-aos="fade-up">
                                                                <a class="nav-link ${i == 0 ? `active show` : ``}" data-bs-toggle="tab" href="#tab-${i}">
                                                                  <div class="row">
                                                                    <div class="col-2 text-center fs-2">
                                                                      <span><i class="${f.icon.name}" style="color:${f.icon.color}"></i></span>
                                                                    </div>
                                                                    <div class="col-10">
                                                                      <h4>${f.tab}</h4>
                                                                      <p>${f.title}</p>
                                                                    </div>
                                                                  </div>
                                                                </a>
                                                              </li>`;
                                                        });
                                                        return tmp;
                                                    })}
                                    </ul>
                                  </div>
                                  <div class="col-lg-6 order-1 order-lg-2" data-aos="zoom-in">
                                    <div class="tab-content">
                                    ${glitter.print(function () {
                                        var tmp = "";
                                        feature.dataList.map((f:any, i:number) => {
                                            tmp += /*html*/ `
                                              <div class="tab-pane ${i == 0 ? `active show` : ``}" id="tab-${i}">
                                                <figure>
                                                  <img src="${f.img}" alt="" class="img-fluid" />
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
                           `
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
                                    title: `項次:${index + 1}`,
                                    expand: linkData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '標題',
                                            default: linkData.tab,
                                            placeHolder: '請輸入項次標題',
                                            callback: (text) => {
                                                linkData.tab = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '概述',
                                            default: linkData.title,
                                            placeHolder: '請輸入項次概述',
                                            callback: (text) => {
                                                linkData.title = text;
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
                                        }),
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: linkData.icon.name,
                                            callback: (text: string) => {
                                                linkData.icon.name = text;
                                            },
                                        }),
                                        `<h3>修改顏色</h3>
                                         <input type="color" value="${linkData.icon.color}" onchange="${gvc.event((e:HTMLInputElement)=>{
                                            linkData.icon.color = e.value;
                                            widget.refreshComponent();
                                        })}">
                                        `

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
                                    widget.data.dataList.push({ icon: { name: "bi bi-binoculars", color: "#F9BA2B" },
                                        tab: "文教",
                                        title: "田地在走，科技要有",
                                        img: ScriptStyle1.getRout("assets/img/features-1.png"), });
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