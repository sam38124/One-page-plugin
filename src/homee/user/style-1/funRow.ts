import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {
            left: "我的訂單",
            right: "查看全部",
            click: () => {

            },
        },
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    widget.data.left = widget.data.left??"我的訂單";
                    widget.data.right = widget.data.right??"查看全部";

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            gvc.addStyle(`
                            .serviceRow{
                                padding : 0px 20px;
                                gap : 8px;
                                           
                                height : 68px;
                                
                                background : #FBF9F6;
                                border-radius : 20px;
                                
                                margin-bottom : 12px;
                            }      
                            .leftText{
                                font-family: 'Noto Sans TC';
                                font-style: normal;
                                font-weight: 500;
                                font-size: 16px;
                                line-height: 23px;
                                
                                /* HOMEE black */
                
                                color: #292929;
                
                            }   
                            .rightText{
                                font-family: 'Noto Sans TC';
                                font-style: normal;
                                font-weight: 400;
                                font-size: 13px;
                                line-height: 14px;
                                /* identical to box height, or 108% */
                                
                                
                                /* HOMEE dark grey */
                                
                                color: #858585;
                
                            }   
                        `)
                            return `
                        <div class="d-flex align-items-center  w-100 serviceRow" onclick="${gvc.event(() => {
                                // TriggerEvent.trigger({
                                //     gvc, widget, clickEvent: widget.data
                                // })
                            })}">
                            <div class="d-flex me-auto leftText" style="padding-left:2px;height: 29px;align-items: center;" >
                                ${widget.data.left}
                            </div>
                            <div class="d-flex align-items-center ms-auto rightText">
                                ${widget.data.right}
                                <img class="ms-auto" src="${new URL!(`../../img/component/angle-right.svg`, import.meta.url)}" alt="" style="width: 16px;height: 16px;">
                            </div>
                        </div>
                        `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "左方文字",
                            default: widget.data.left,
                            placeHolder: "請輸入左方文字",
                            callback: (text: string) => {
                                widget.data.left = text
                                widget.refreshAll()
                            }
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "右方文字",
                            default: widget.data.right,
                            placeHolder: "請輸入右方文字",
                            callback: (text: string) => {
                                widget.data.right = text
                                widget.refreshAll()
                            }
                        }),
                        TriggerEvent.editer(gvc, widget, widget.data)
                    ])
                }
            }
        },
    }
})