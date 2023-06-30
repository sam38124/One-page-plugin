import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController.js";
import {TriggerEvent} from "../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../editor.js";
import {component} from "./component.js";

export const array_item = Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[], subData) => {
            widget.data.empty=widget.data.empty??{
                data:{}
            }
            widget.data.empty.refreshComponent=()=>{}
            widget.data.loading=widget.data.loading??{
                data:{}
            }
            widget.data.container=widget.data.container??{}
            return {
                view: () => {
                    return  new Promise(async (resolve, reject)=>{
                        const id=glitter.getUUID()
                        const loading=await component.render(gvc, widget.data.loading, setting, hoverID, subData).view()
                        let views:any=undefined;
                        new Promise(async (resolve, reject) => {
                            let view: any = []
                            let createOption = (() => {
                                return {
                                    class: glitter.htmlGenerate.styleEditor(widget.data).class(),
                                    style: glitter.htmlGenerate.styleEditor(widget.data).style()
                                }
                            })
                            const data: any = (await TriggerEvent.trigger({
                                gvc, widget, clickEvent: widget.data,subData:subData
                            }))

                            async function getView() {
                                for (const a of data) {
                                    a.carryData=subData.carryData
                                    const dd=await component.render(gvc, widget, setting, hoverID, a,{
                                        createOption:createOption
                                    }).view()
                                    view.push(dd)
                                }
                                const data2=view.join('') || (await component.render(gvc, widget.data.empty, setting, hoverID, subData,{
                                    createOption:{}
                                }).view())
                                resolve(data2)
                            }
                            getView().then(r => {})
                        }).then((data:any)=>{
                            views=data
                            gvc.notifyDataChange(id)
                        })
                        resolve(  gvc.bindView(()=>{

                            return {
                                bind:id,
                                view:()=>{
                                    if(views){
                                        return views
                                    }
                                    try {
                                        return loading
                                    }catch (e){
                                        return ``
                                    }
                                },
                                onCreate:()=>{

                                },
                                divCreate:{
                                    class:glitter.htmlGenerate.styleEditor(widget.data.container).class(),
                                    style:glitter.htmlGenerate.styleEditor(widget.data.container).style()
                                }
                            }
                        }))
                    })

                },
                editor: () => {
                    // Editor.searchInput()
                    return gvc.map([
                        glitter.htmlGenerate.styleEditor(widget.data.container).editor(gvc, () => {
                            widget.refreshComponent()
                        }, "容器樣式"),
                        `<div class="my-2"></div>`,
                        glitter.htmlGenerate.styleEditor(widget.data).editor(gvc, () => {
                            widget.refreshComponent()
                        }, "元件樣式"),
                        `<div class="alert alert-info mt-2" style="white-space:normal;">
透過返回陣列來進行遍歷，並產生元件畫面．
${ TriggerEvent.editer(gvc, widget, widget.data, {
                            hover: false,
                            option: [],
                            title: "設定資料來源"
                        })}
</div>`,
                        `<div class="border-white border p-2  mt-3" style="background:#a2d4ed;">
${Editor.h3("嵌入模塊")}
${component.render(gvc, widget, setting, hoverID, subData).editor() as string}
</div>`,
                        `<div class="border-white border p-2  mt-3" style="background:#a2d4ed;">
${Editor.h3("空資料顯示")}
${component.render(gvc, widget.data.empty, setting, hoverID, subData).editor() as string}
</div>`,  `<div class="border-white border p-2  mt-3" style="background:#a2d4ed;">
${Editor.h3("加載中顯示")}
${component.render(gvc, widget.data.loading, setting, hoverID, subData).editor() as string}
</div>`,
                    ])
                },
            };
        }
    }
})