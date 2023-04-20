import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {ClickEvent} from "../../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    widget.data.model = widget.data.model ?? [
                        {
                            title: "我的空間",
                            icon: new URL!(`../../img/component/footer/homeBlack.svg`, import.meta.url),
                            count: 0,
                            click: () => {

                            }
                        },
                        {
                            title: "我的靈感",
                            icon: new URL!(`../../img/component/footer/idea.svg`, import.meta.url),
                            count: 0,
                            click: () => {

                            }
                        },
                        {
                            title: "回饋優惠",
                            icon: new URL!(`../../img/component/discount.svg`, import.meta.url),
                            count: 0,
                            click: () => {

                            }
                        }]
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            gvc.addStyle(`
                     .mySpaceCount{
                        width: 16px;
                        height: 16px;
            
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Noto Sans TC';
                        font-style: normal;
                        font-weight: 700;
                        font-size: 10px;
                        line-height: 15px;
                        text-align: center;
                        background: #FD6A58;
                        /* HOMEE white */
            
                        border: 1px solid #FFFFFF;
                        border-radius: 8px;
                        /* HOMEE white */
            
                        color: #FFFFFF;
            
                    }
                    `)
                            return gvc.bindView({
                                bind: "funPuzzle",
                                view: () => {
                                    return gvc.map(widget.data.model.map((item: any, index: number) => {
                                        let length = widget.data.model.length;
                                        let width = (100 / length);
                                        let style = (index != length - 1) ? "border-right:1px solid #EAD8C2" : "";

                                        return `
                                    <div class="d-flex flex-column align-items-center" style="width: ${width}%;height: 56px; ${style}" onclick="${gvc.event(() => {
                                            ClickEvent.trigger({gvc,widget,clickEvent:item
                                            })
                                        })}">
                                        <div style="position: relative;width: 30px;height: 30px;">
                                            ${(() => {
                                            if (item.count != 0) {
                                                return `<div class="mySpaceCount" style="position: absolute;right:-4px;top:-4px;z-index: 5;">${item.count}</div>`
                                            } else {
                                                return ``
                                            }
                                        })()}
                                            <img class="h-100 w-100" src="${item.icon}" style="">
                                        </div>
                                        <div class="indexTitle" style="margin-top: 5px;font-family: 'Noto Sans TC';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 23px;
color: #1E1E1E;
">
                                            ${item.title}
                                        </div>
                                        
                                    </div>
                   
                            `
                                    }))
                                }, divCreate: {
                                    class: `d-flex justify-content-between `,
                                    style: `padding: 28px 20px;border-radius: 20px; gap: 8px; margin-top: 16px;margin-bottom: 12px;background : #FBF9F6;`
                                }
                            })
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return``
                }
            }
        },
    }
})