import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {appConfig} from "../../../config.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    widget.data.model = widget.data.model ??{
                        remind:"此功能需使用支援 LiDAR 光學感測功能之手機",
                        BTN:"邀請好友協助掃描"
                    }
                    gvc.addStyle(`
                            body{
                                background-color: transparent!important;
                            }
                            .laravel{
                                background: #FFFFFF;
                                box-shadow: -3px 3px 15px rgba(0, 0, 0, 0.1);
                                border-radius: 20px;          
                                padding:32px 24px 16px;         
                            }
                            .remind{
                                font-family: 'Noto Sans TC';
                                font-style: normal;
                                font-weight: 500;
                                font-size: 18px;
                                color: #292929;
                                margin-bottom:32px;
                                word-break: break-all;
                                white-space: normal;
                                text-align: center;
                            }
                            .startBTN{
                                height: 40px;
                                background: #FD6A58;
                                border-radius: 20px;
                                font-family: 'Noto Sans TC';
                                font-style: normal;
                                font-weight: 700;
                                font-size: 18px;
                                color: #FFFFFF;
                            }
                        
                        `)

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            ${gvc.bindView({
                                bind:"laravel",
                                view : ()=>{
                                    return `
                                    <div class="laravel" >
                                        <div class="remind d-flex flex-wrap justify-content-center align-items-center">
                                            ${widget.data.model.remind}
                                        </div>
                                        <button class="w-100 border-0 startBTN" onclick="${gvc.event(()=>{
                                        appConfig().changePage(gvc ,"guide1" )

                                    })}">${widget.data.model.BTN}</button>
                                    </div>
                                `
                                },
                                divCreate:{style:`padding : 0 55px;height:100vh ` , class:`w-100  d-flex justify-content-center align-items-center`}

                            })}
                        `
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