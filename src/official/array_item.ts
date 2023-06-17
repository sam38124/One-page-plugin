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
            return {
                view: () => {
                    return new Promise(async (resolve, reject) => {
                        let view: any = []
                        subData.createOption = (() => {
                            return {
                                class: glitter.htmlGenerate.styleEditor(widget.data).class(),
                                style: glitter.htmlGenerate.styleEditor(widget.data).style()
                            }
                        })
                        const data: any = (await TriggerEvent.trigger({
                            gvc, widget, clickEvent: widget.data,
                        }))

                        async function getView() {
                            if(data.length===0){
                                subData.createOption=(()=>{
                                    return {}
                                })
                            }
                            for (const a of data) {
                                const b=JSON.parse(JSON.stringify(a))
                                b.createOption=subData.createOption
                                console.log(`logg----${JSON.stringify(b)}`)
                                const dd=await component.render(gvc, widget, setting, hoverID, b).view()
                                view.push(dd)
                            }
                            const data2=view.join('') || (await component.render(gvc, widget.data.empty, setting, hoverID, subData).view())
// alert(data2)
                            resolve(data2)
                        }

                        getView().then(r => {
                        })
                    })
                },
                editor: () => {
                    // Editor.searchInput()
                    return gvc.map([
                        glitter.htmlGenerate.styleEditor(widget.data).editor(gvc, () => {
                            widget.refreshComponent()
                        }, "容器樣式"),
                        TriggerEvent.editer(gvc, widget, widget.data, {
                            hover: false,
                            option: [],
                            title: "資料來源"
                        }),
                        `<div class="border-white border p-2  mt-3" style="background:#a2d4ed;">
${Editor.h3("陣列元件")}
${component.render(gvc, widget, setting, hoverID, subData).editor() as string}
</div>`,
                        `<div class="border-white border p-2  mt-3" style="background:#a2d4ed;">
${Editor.h3("空陣列顯示")}
${component.render(gvc, widget.data.empty, setting, hoverID, subData).editor() as string}
</div>`,
                    ])
                },
            };
        }
    }
})