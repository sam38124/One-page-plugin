import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../../script-style-1.js";
import {SharedView} from "../../commenPage/shareView.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    const sharedView = new SharedView(gvc);
                    widget.data.left = widget.data.left ?? [
                        {img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1676612939990"}
                    ]
                    widget.data.right = widget.data.right ?? [
                        {img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1677515010761"},
                        {img:"https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1677515023026"}
                    ]
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return sharedView.navigationBar({
                                title: widget.data.title ?? "標題",
                                leftIcon: widget.data.left.map((dd: any) => {
                                    dd.type=dd.type ?? 'image'
                                    if(dd.type === 'image'){
                                        return  (dd.img && `<img class="" src="${dd.img}" style="height: ${dd.imgHeight||"24px"};width: ${dd.imgWidth||"24px"};" alt="" onclick="${gvc.event(() => {
                                            // TriggerEvent.trigger({gvc, widget, clickEvent: dd.clickEvent})
                                        })}">`)
                                    }else {
                                        return  `<span class="${dd.class ?? ""}" style="${dd.style ?? ""}" onclick="${gvc.event(() => {
                                            // TriggerEvent.trigger({gvc, widget, clickEvent: dd.clickEvent})
                                        })}">${dd.title ?? ""}</span>`
                                    }
                                }).join('<div class="mx-2"></div>'),
                                rightIcon: widget.data.right.map((dd: any) => {
                                    dd.badge=dd.badge ?? {}
                                    dd.type=dd.type ?? 'image'
                                    return `<div class="position-relative">
${(()=>{
                                        if(dd.type === 'image'){
                                            return  (dd.img && `<img class="" src="${dd.img}" style="height: ${dd.imgHeight||"24px"};width: ${dd.imgWidth||"24px"};" alt="" onclick="${gvc.event(() => {
                                                // TriggerEvent.trigger({gvc, widget, clickEvent: dd.clickEvent})
                                            })}">`)
                                        }else {
                                            return  `<span class="${dd.class ?? ""}" style="${dd.style ?? ""}" onclick="${gvc.event(() => {
                                                // TriggerEvent.trigger({gvc, widget, clickEvent: dd.clickEvent})
                                            })}">${dd.title ?? ""}</span>`
                                        }
                                    })()}
      ${gvc.bindView(()=>{
                                        let badge=0
                                        const id=gvc.glitter.getUUID()
                                        dd.badge.callback=(count:number)=>{
                                            badge=count
                                            gvc.notifyDataChange(id)
                                        }
                                        // TriggerEvent.trigger({
                                        //     gvc, widget, clickEvent: dd.badge
                                        // })
                                        return {
                                            bind:id,
                                            view:()=>{
                                                if(badge===0){return  ``}
                                                return `<div class=" d-flex align-items-center justify-content-center" style="position: absolute;
width: 16px;
height: 16px;
background: #FE5541;
border: 1px solid #FFFFFF;
font-size: 9px;

color: white;
border-radius: 8px;" >${badge}</div>`
                                            },
                                            divCreate:{class:`position-absolute top-0 right-0`,style:`top:0px;
right: 8px;`}
                                        }
                                    })}
</div>`
                                }).join('<div class="mx-2"></div>'),
                                background:widget.data.bgcolor ?? "white"
                            })
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    function navItemAction(data: any) {

                        return data.map((dd: any, index: number) => {
                            dd.type=dd.type ?? 'image'
                            dd.badge=dd.badge ?? {}
                            dd.clickEvent = dd.clickEvent ?? {}
                            return `
<div class="alert border border-dark">
${
                                (()=>{
                                    return `
<diu class="d-flex">
    <i class="fa-regular fa-circle-minus text-danger me-2" style="font-size: 20px;cursor: pointer;" onclick="${gvc.event(() => {
        data.splice(index, 1)
        widget.refreshComponent()
    })}"></i>
    <h3 class="text-black" style="font-size: 16px;">類型</h3>
</diu>

<select class="form-control form-select mb-3" onchange="${gvc.event((e) => {
                                        dd.type = e.value
                                        widget.refreshComponent()
                                    })}">
<option value="image" ${dd.type === 'image' && 'selected'}>圖片</option>
<option ${dd.type === 'title' && 'selected'} value="title">文字</option>
</select>
${(dd.type === 'image') ? `<div class="d-flex align-items-center mb-3 mt-1 ">

${Editor.uploadImage({
                                        gvc: gvc,
                                        title: '預覽圖片1',
                                        def: dd.img ,
                                        callback:(data)=>{
                                            dd.img =data
                                            widget.refreshComponent()
                                        }
                                    })}
</div>
    <div class="d-flex w-100">
        <div class="d-flex align-items-center justify-content-center">圖片寬度</div>
        <input class="flex-fill form-control ms-2" style="width: 100px;" value="${dd.imgWidth ?? "24px"}" onchange="${gvc.event((e:HTMLInputElement)=>{
                                        dd.imgWidth = e.value;
                                        widget.refreshAll();
                                    })}">
    </div>
    <div class="d-flex w-100">
        <div class="d-flex align-items-center justify-content-center">圖片高度</div>
        <input class="flex-fill form-control ms-2" style="width: 100px;" value="${dd.imgHeight ?? "24px"}" onchange="${gvc.event((e:HTMLInputElement)=>{
                                        dd.imgHeight = e.value;
                                        widget.refreshAll();
                                    })}">
    </div>
` : gvc.map([glitter.htmlGenerate.editeInput({
                                        gvc:gvc,
                                        title:'按鈕文字',
                                        default:dd.title ?? '',
                                        placeHolder:`請輸入按鈕文字`,
                                        callback:(text)=>{
                                            dd.title=text
                                            widget.refreshComponent()
                                        }
                                    }),glitter.htmlGenerate.editeText({
                                        gvc:gvc,
                                        title:'Style',
                                        default:dd.style ?? '',
                                        placeHolder:``,
                                        callback:(text)=>{
                                            dd.style=text
                                            widget.refreshComponent()
                                        }
                                    }),glitter.htmlGenerate.editeText({
                                        gvc:gvc,
                                        title:'Class',
                                        default:dd.class ?? '',
                                        placeHolder:``,
                                        callback:(text)=>{
                                            dd.class=text
                                            widget.refreshComponent()
                                        }
                                    })])}
`
                                })()
                            }
${TriggerEvent.editer(gvc, widget, dd.clickEvent)}
${TriggerEvent.editer(gvc, widget, dd.badge,{hover:false,option:['cartBadge'],title:"數量提示"})}
</div>
`
                        }).join(`<div class="w-100 my-3" style="background: white;height: 1px;"></div>`)
                    }

                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc,
                            title: "背景",
                            default: widget.data.bgcolor,
                            placeHolder: "請輸入背景色",
                            callback: (text) => {
                                widget.data.bgcolor = text
                                widget.refreshComponent()
                            }
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc,
                            title: "標題",
                            default: widget.data.title,
                            placeHolder: "請輸入標題",
                            callback: (text) => {
                                widget.data.title = text
                                widget.refreshComponent()
                            }
                        }),
                        `<div class="w-100 alert my-2" >
<h3 style="color: black;font-size: 16px;margin-bottom: 10px;" class="mt-2">左側按鈕</h3>
${navItemAction(widget.data.left)}
<div class="text-black align-items-center justify-content-center d-flex p-1 rounded mt-3" style="border: 2px dashed black;" onclick="${
                            gvc.event(() => {
                                widget.data.left.push({})
                                widget.refreshComponent()
                            })
                        }">添加按鈕</div>
</div>`, `<div class="w-100 alert my-2" >
<h3 style="color: black;font-size: 16px;margin-bottom: 10px;" class="mt-2">右側按鈕</h3>
${navItemAction(widget.data.right)}
<div class="text-black align-items-center justify-content-center d-flex p-1 rounded mt-3" style="border: 2px dashed black;" onclick="${
                            gvc.event(() => {
                                widget.data.right.push({})
                                widget.refreshComponent()
                            })
                        }">添加按鈕</div>
</div>`
                    ])
                }
            }
        },
    }
})