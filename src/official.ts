import {HtmlJson, Plugin} from "./glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "./glitterBundle/Glitter.js";
import {GVC} from "./glitterBundle/GVController.js";
import {BaseApi} from "./api/base.js";
import {Editor} from "./editor.js";
import {TriggerEvent} from "./glitterBundle/plugins/trigger-event.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    return {
        widget:{
            title: 'HTML元件',
            subContent: '添加一個HTML元素',
            defaultData: {},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                widget.data.elem=widget.data.elem??"h3"
                widget.data.inner=widget.data.inner??""
                return {
                    view: () => {
                        return `<${widget.data.elem}
class="${glitter.htmlGenerate.styleEditor(widget.data).class()}" style="${glitter.htmlGenerate.styleEditor(widget.data).style()}"
 onclick="${gvc.event(()=>{
                            TriggerEvent.trigger({
                                gvc:gvc,
                                widget:widget,
                                clickEvent:widget.data
                            })
                        })}">${widget.data.inner}</${widget.data.elem}>`;
                    },
                    editor: () => {
                        widget.type=widget.type??"elem"
                        return gvc.map([
                            Editor.select({
                                title:"元素類型",
                                gvc:gvc,
                                def:widget.type,
                                array:[
                                    {title:'容器',value:"container"},
                                    {title:'元件',value:"widget"}
                                ],
                                callback:(text)=>{
                                    widget.type=text
                                    widget.refreshComponent()
                                }
                            }),
                            glitter.htmlGenerate.styleEditor(widget.data).editor(gvc,()=>{
                                widget.refreshComponent()
                            },'元素設計樣式'),
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: 'HTML元素標籤',
                                default: widget.data.elem,
                                placeHolder: "輸入元素標籤",
                                callback: (text) => {
                                    widget.data.elem = text
                                    widget.refreshComponent()
                                }
                            }),
                            glitter.htmlGenerate.editeText({
                                gvc: gvc,
                                title: '內容',
                                default: widget.data.inner,
                                placeHolder: "輸入內容",
                                callback: (text) => {
                                    widget.data.inner = text
                                    widget.refreshComponent()
                                }
                            }),
                            TriggerEvent.editer(gvc,widget,widget.data)
                        ]);
                    },
                };
            },
        },
        container: {
            title: '容器',
            subContent: '一個父容器，可以存放多個元件．',
            defaultData:{
                setting:[]
            },
            render:(gvc, widget, setting, hoverID) => {

                widget.data.setting = widget.data.setting ?? []
                widget.data.styleEd=widget.data.styleEd??{}
                const htmlGenerate = new glitter.htmlGenerate(widget.data.setting,hoverID);
                return {
                    view: ()=>{
                        return htmlGenerate.render(gvc, {class:`${glitter.htmlGenerate.styleEditor(widget.data.styleEd).class()}`,
                        style:glitter.htmlGenerate.styleEditor(widget.data.styleEd).style()})
                    },
                    editor: (() => {
                        return gvc.map([
                            `
                            ${(()=>{
                                if (widget.data.layout == "d-flex"){
                                    return `                                    
                                        <span class="w-100 mb-2 fw-500 mt-2 " style="color: orange;">垂直對齊</span>
                                        <select class="form-select mt-2 " onchange="${gvc.event((e:any) => {
                                        widget.data.alignItems=e.value
                                        widget.refreshAll!()
                                    })}" >
                                        ${(() => {
                                        const data = [
                                            {tit: "無", value: ``},
                                            {tit: "對齊最上方", value: `align-items-start`},
                                            {tit: "對齊最下方", value: `align-items-end`},
                                            {tit: "對齊中間", value: `align-items-center`},
                                            {tit: "元素的基線置中對齊", value: `align-items-baseline`},
                                            {tit: "元件拉伸填滿高度並對齊", value: `align-items-stretch`},
                                        ]

                                        return gvc.map(data.map((it) => {
                                            return `<option value="${it.value}" ${(widget.data.alignItems === it.value) ? `selected`:``} >${it.tit}</option>`
                                        }))
                                    })()}
                                        </select>
                                    
                                    `
                                }
                                return ``
                            })()}
                            ${(()=>{
                                if (widget.data.layout == "d-flex"){
                                    return `
                                        <span class="w-100 mb-2 fw-500 mt-2 " style="color: orange;">水平對齊</span>
                                        <select class="form-select mt-2 " onchange="${gvc.event((e:any) => {
                                        widget.data.justifyContent=e.value
                                        widget.refreshAll!()
                                    })}" >
                                        ${(() => {
                                        const data = [
                                            {tit: "無", value: ``},
                                            {tit: "水平置左", value: `justify-content-start`},
                                            {tit: "水平置右", value: `justify-content-end`},
                                            {tit: "水平置中", value: `justify-content-center`},
                                            {tit: "水平平均分布不留左右", value: `justify-content-between`},
                                            {tit: "水平平均分布留左右", value: `justify-content-around`},
                                            {tit: "水平和左右接平均分布", value: `justify-content-evenly`},
                                        ]

                                        return gvc.map(data.map((it) => {
                                            return `<option value="${it.value}" ${(widget.data.justifyContent === it.value) ? `selected`:``} >${it.tit}</option>`
                                        }))
                                    })()}
                                        </select>
                                    
                                    `
                                }
                                return ``
                            })()}
`,  glitter.htmlGenerate.styleEditor(widget.data.styleEd).editor(gvc,()=>{
                                widget.refreshComponent()
                            },'容器設計樣式'), (() => {
                                if (widget.data.setting.length > 0) {
                                    return htmlGenerate.editor(gvc, {
                                        return_: true,
                                        refreshAll: widget.refreshAll!
                                    })
                                } else {
                                    return ``
                                }
                            })()
                        ])

                    })
                }
            }
        },
        component:{
            title: "嵌入模塊",
            subContent: "可嵌入頁面的模塊．",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./official/component.js',import.meta.url)),
        }
    }
})