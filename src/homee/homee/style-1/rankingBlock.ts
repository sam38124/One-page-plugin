import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {ClickEvent} from "../../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.titleStyle = widget.data.titleStyle ?? `font-family: 'Noto Sans TC';
font-style: normal;
color: black;
font-size: 16px;
margin-top: 16px;
margin-left: 12px;
font-weight: 700;`
            widget.data.rank = widget.data.rank ?? [
            {
                data:{
                    preview_image:ScriptStyle1.getRout("../img/rank1.webp"),
                    sale_price:"7900"
                }
            },
            {
                data:{
                    preview_image:ScriptStyle1.getRout("../img/rank2.webp"),
                    sale_price:"4100"
                }
            },
            {
                data:{
                    preview_image:ScriptStyle1.getRout("../img/rank3.webp"),
                    sale_price:"5125"
                }
            }]
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    console.log(widget.data)
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                <div class="" style="background-color: ${widget.data.bgcolor};border-radius:${widget.data.radius}px;">
                <h3 style="${widget.data.titleStyle}">${widget.label}</h3>
                   <div class="d-flex align-items-center justify-content-around " style="width:calc(100% -24px);margin-left: 12px;margin-right: 12px;gap: 8px;padding-bottom: 15px;">
               ${gvc.map(['firstRank.svg', 'secondRank.svg', 'thirdRank.svg'].map((dd, index) => {
                                const data = widget.data.rank[index]
                                data.data = data.data ?? {}
                                return ` <div class="d-flex flex-column align-items-center justify-content-center" style="width:calc(100% - 16px);">
 <div class="bg-white flex-fill position-relative" style="width:100%;border-radius: 8px;padding-bottom: calc(100%);" onclick="${gvc.event(() => {
                                    ClickEvent.trigger({
                                        gvc,
                                        widget,
                                        clickEvent: data
                                    })
                                })}">
 <img src="${data.data.preview_image}" class="position-absolute w-100 h-100" style="top: 0px;">
         <img src="${ScriptStyle1.getRout('../img/homeeExtension')}/${dd}" class="position-absolute" style="top: 0px;">       
</div>
<span class="" style="font-family: 'Noto Sans TC';
font-style: normal;
font-weight: 500;
font-size: 10px;
line-height: 14px;
text-align: center;
margin-top: 4px;
color: #FE5541;">$ ${data.data.sale_price}</span>
</div>`
                            }))}
</div>
</div>
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