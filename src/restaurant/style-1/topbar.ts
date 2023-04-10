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
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    widget.data.INF=widget.data.INF ?? [
                        {
                            value:"0978-028-730",
                            img:"fa-light fa-phone"
                        },
                        {
                            value:"週一至週五 09:00 - 19:00",
                            img:"fa-regular fa-clock"
                        }

                    ]
                    const INF = widget.data.INF;
                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                        <div id="topbar" class="d-flex align-items-center fixed-top">
                            <div class="container d-flex justify-content-center justify-content-md-between">
                                <div class="contact-info d-flex align-items-center">
                                    ${(()=>{
                                        return gvc.map(INF.map((INFData:any)=>{
                                            return`
                                                <div class="d-flex align-items-center me-4">
                                                 <i class="${INFData.img} me-2" style="color: white;"></i>
                                                    <span>${INFData.value}</span>
                                                </div>                                                
                                            `
                                        }))
                                    })()}
                                </div>
                            </div>
                        </div>
                                
                           `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    return Editor.arrayItem({
                        originalArray:widget.data.INF,
                        gvc: gvc,
                        title: '聯絡資訊設定',
                        array: widget.data.INF.map((dd: any, index: number) => {
                            return {
                                title: dd.value || `資訊:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `資訊`,
                                        default: dd.value,
                                        placeHolder: '請輸入聯絡資訊',
                                        callback: (text) => {
                                            dd.value = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    Editor.fontawesome({
                                        gvc: gvc,
                                        title: '圖示',
                                        def: dd.img  ,
                                        callback: (text) => {
                                            dd.img = text
                                            widget.refreshComponent()
                                        }
                                    }),
                                    TriggerEvent.editer(gvc, widget, dd, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
                                    })
                                ]),
                                minus: gvc.event(() => {
                                    widget.data.INF.splice(index, 1);
                                    widget.refreshComponent();
                                }),
                            };
                        }),
                        expand: widget.data,
                        plus: {
                            title: '添加區塊',
                            event: gvc.event(() => {
                                widget.data.list.push({ title: '聯絡資訊', value: '' , img:''});
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