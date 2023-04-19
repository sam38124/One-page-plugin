import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
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
                    widget.data.dataList = widget.data.dataList??[
                        {title:"餐桌" , img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675071897159", toPage:""},
                        {title:"椅子" , img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675072457700" , toPage:""},
                        {title:"沙發" , img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675072481671" , toPage:""},
                        {title:"茶几" , img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675072593723" , toPage:""},
                        {title:"TERA\n系統儲物" , img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675072618992" , toPage:""},
                        {title:"BANFF\n系統儲物" , img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675072650712" , toPage:""},
                        {title:"床架" , img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675072676832" , toPage:""},
                        {title:"裝飾畫" , img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675072699256" , toPage:""},
                        {title:"生活用品" , img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675072721565" , toPage:""},
                        {title:"全部" , img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675072765031" , toPage:""},
                    ]
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            gvc.addStyle(`
                        .bannerTitle{
                            font-family: 'Noto Sans TC';
                            font-style: normal;
                            font-weight: 700;
                            font-size: 14px;
                            line-height: 20px;
                            color: #292929;
                            
                            position:absolute;
                            top:8px;
                            left:12px;
                            
                        }
                        .banner-card{
                            border-radius: 12px;
                        }
                    `)
                            return gvc.bindView({
                                bind:"bookcase",
                                view : ()=>{
                                    let returnHTML = gvc.map(widget.data.dataList.map((data:any)=>{
                                        return `
                                     <div class="d-flex flex-column " style="width:20%;padding-right: 16px;" onclick="${gvc.event(() => {
                                            TriggerEvent.trigger({
                                                gvc,widget,clickEvent:data
                                            })
                                        })}">                                        
                                        <div style="width:64px;height:64px;border-radius: 18px;width:100%;height:auto;padding: 0 4px 100%;background: #FBF9F6 url(${data.img}) no-repeat center;background-size: contain;margin-right: 18px;"></div>
                                        <div class="w-100 d-flex align-items-center justify-content-center" style="font-family: 'Noto Sans TC';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 100%;
white-space: normal;
word-break: break-all;
display: flex;
align-items: center;
text-align: center;
margin-bottom: 16px;
margin-top: 4px;
color: #1E1E1E;">${data.title}</div>
                                    </div>
                                
                                `
                                    }));

                                    return `
                            <div style="margin-bottom:12px;padding-left:16px;font-weight: 700;font-size: 18px;line-height: 26px;color: #1E1E1E;">品類</div>
                            <div class="d-flex flex-wrap" style="padding-left:16px;">
                            ${returnHTML}
                            </div>
                        `

                                },
                                divCreate: {class: `d-flex flex-column `, style: `margin-top:16px;`}
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