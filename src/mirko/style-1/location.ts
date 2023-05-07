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

                    widget.data.location = widget.data.location ?? [
                        { icon: "far fa-map", title: "地址", text: "台中市臺灣大道二段285號20樓" },
                        { icon: "fas fa-mobile-alt", title: "電話／手機", text: "(886) 0978-028-730" },
                        { icon: "far fa-envelope", title: "電子信箱", text: "jianzhi.wang@ncdesign.info" },
                        { icon: "far fa-clock", title: "營業時間", text: "週一至週五 09:00 ~ 19:00" },
                    ]

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let location:{
                                icon:string,
                                title:string,
                                text:string
                            }[] = widget.data.location;
                            return /*html*/ `
        <section class="location text-light py-5">
          <div class="container" data-aos="zoom-in">
            <div class="row">
              ${glitter.print(function () {
                                var tmp = "";
                                location.map((c) => {
                                    tmp += /*html*/ `
                    <div class="col d-flex align-items-center">
                      <div class="p-2"><i class="${c.icon} fa-3x"></i></div>
                      <div class="ms-2">
                        <h6 class="fw-bold">${c.title}</h6>
                        <p>${c.text}</p>
                      </div>
                    </div>
                  `;
                                });
                                return tmp;
                            })}
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();

                        }

                    })
                },
                editor:()=>{
                    return Editor.arrayItem({
                        originalArray:widget.data.location,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.location.map((dd: any, index: number) => {
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
                                        title: `內文`,
                                        default: dd.text,
                                        placeHolder: '輸入內文文字',
                                        callback: (text) => {
                                            dd.text = text;
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
                                    })
                                ]),
                                minus: gvc.event(() => {
                                    widget.data.location.splice(index, 1);
                                    widget.refreshComponent();
                                }),
                            };
                        }),
                        expand: widget.data,
                        plus: {
                            title: '添加區塊',
                            event: gvc.event(() => {
                                widget.data.location.push({ icon: "far fa-clock", title: "營業時間", text: "週一至週五 09:00 ~ 19:00" });
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