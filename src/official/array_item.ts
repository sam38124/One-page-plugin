import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController.js";
import {TriggerEvent} from "../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../editor.js";
import {component} from "./component.js";

export const array_item = Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[], subData) => {
            // widget.refreshComponent=()=>{
            //     // widget.refreshAll()
            // }
            return {
                view: () => {
                   return new Promise((resolve, reject)=>{
                       let view:any=[]
                       subData.createOption=(()=>{
                           return {
                               class:glitter.htmlGenerate.styleEditor(widget.data).class(),
                               style:glitter.htmlGenerate.styleEditor(widget.data).style()
                           }
                       })
                       async function getView(){
                           for(const a of [0,1,2,3]){
                               view.push(await component.render(gvc,widget,setting,hoverID,subData).view())
                           }
                         resolve(view.join(''))
                       }
                       getView().then(r => {})
                   })
                    // return gvc.bindView(()=>{
                    //
                    //
                    //     createOption
                    //     return {
                    //         bind:id,
                    //         view:()=>{
                    //             return view.join('')
                    //         },
                    //         divCreate:
                    //         (()=>{
                    //             return {
                    //                 class:glitter.htmlGenerate.styleEditor(widget.data).class(),
                    //                 style:glitter.htmlGenerate.styleEditor(widget.data).style()
                    //             }
                    //         })
                    //     }
                    // })
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.styleEditor(widget.data).editor(gvc,()=>{
                            widget.refreshComponent()
                        },"容器樣式"),
                        TriggerEvent.editer(gvc, widget, widget.data, {
                            hover: false,
                            option: [],
                            title: "資料來源"
                        }),
                        component.render(gvc,widget,setting,hoverID,subData).editor() as string
                    ])
                },
            };
        }
    }
})