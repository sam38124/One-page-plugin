import {HtmlJson, Plugin} from "./glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "./glitterBundle/Glitter.js";
import {GVC} from "./glitterBundle/GVController.js";
import {Editor} from "./editor.js";
import {TriggerEvent} from "./glitterBundle/plugins/trigger-event.js";

Plugin.create(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        widget: {
            title: 'HTML元件',
            subContent: '添加一個HTML元素',
            defaultData: {},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                widget.data.elem = widget.data.elem ?? "h3"
                widget.data.inner = widget.data.inner ?? ""
                widget.data.attr=widget.data.attr??[]
                return {
                    view: () => {
                        return `
<${widget.data.elem}
class="${glitter.htmlGenerate.styleEditor(widget.data).class()}" style="${glitter.htmlGenerate.styleEditor(widget.data).style()}"
${widget.data.attr.map((dd:any)=>{
    if(dd.type==='par'){
        return `${dd.attr}="${dd.value}"`
    }else{
        return `${dd.attr}="${gvc.event(() => {
            TriggerEvent.trigger({
                gvc: gvc,
                widget: widget,
                clickEvent: dd
            })
        })}"`
    }
                        }).join(' ')}
 >${widget.data.inner}</${widget.data.elem}>`;
                    },
                    editor: () => {
                        widget.type = widget.type ?? "elem"
                        widget.data.elemExpand=widget.data.elemExpand??[]
                        widget.data.atrExpand=widget.data.atrExpand??{}
                        return gvc.map([
                            `<div class="mt-2"></div>`,
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: '基本設定',
                                data: widget.data.elemExpand,
                                innerText: ()=>{
                                    return gvc.map([
                                        glitter.htmlGenerate.styleEditor(widget.data).editor(gvc, () => {
                                        widget.refreshComponent()
                                    }, '元素設計樣式'),
                                        Editor.searchInput({
                                            title: 'HTML元素標籤',
                                            gvc: gvc,
                                            def: widget.data.elem,
                                            array: ['button', 'h1', 'h2', 'h3', 'h4', 'h5', 'li', 'ul', 'table', 'div', 'header', 'section', 'span', 'p', 'a', 'img'
                                                , 'input'],
                                            callback: (text: string) => {
                                                widget.data.elem = text
                                                widget.refreshComponent()
                                            },
                                            placeHolder: "請輸入元素標籤"
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
                                        })])
                                }
                            }),
                            Editor.arrayItem({
                                originalArray: widget.data.attr,
                                gvc: gvc,
                                title: '特徵值',
                                array: widget.data.attr.map((dd:any, index:number) => {
                                    // TriggerEvent.editer(gvc, widget, widget.data)
                                    dd.type=dd.type??"par"
                                    dd.attr=dd.attr??""
                                    return {
                                        title:  `特徵:${index + 1}`,
                                        expand: dd,
                                        innerHtml: (()=>{
                                            return gvc.map([
                                                Editor.select({
                                                    title: "特徵類型",
                                                    gvc: gvc,
                                                    def: dd.type,
                                                    array: [{
                                                        title:'參數',value:'par'
                                                    },{
                                                        title:'觸發事件',value:'event'
                                                    }],
                                                    callback: (text) => {
                                                        dd.type = text
                                                        widget.refreshComponent()
                                                    }
                                                }),
                                                Editor.searchInput({
                                                    title: '特徵標籤',
                                                    gvc: gvc,
                                                    def: dd.attr,
                                                    array: ['onclick','oninput','onchange','ondrag'],
                                                    callback: (text: string) => {
                                                        dd.attr = text
                                                        widget.refreshComponent()
                                                    },
                                                    placeHolder: "請輸入特徵標籤"
                                                }),
                                                (()=>{
                                                    if(dd.type === 'par'){
                                                        return glitter.htmlGenerate.editeText({
                                                            gvc: gvc,
                                                            title: '參數編輯',
                                                            default: dd.value ?? "",
                                                            placeHolder: "輸入參數內容",
                                                            callback: (text) => {
                                                                dd.value=text
                                                                widget.refreshComponent()
                                                            }
                                                        })
                                                    }else{
                                                        return TriggerEvent.editer(gvc, widget, dd)
                                                    }
                                                })()
                                            ])
                                        }),
                                        minus: gvc.event(() => {
                                            widget.data.attr.splice(index, 1);
                                            widget.refreshComponent();
                                        }),
                                    };
                                }),
                                expand: widget.data.atrExpand,
                                plus: {
                                    title: '添加特徵',
                                    event: gvc.event(() => {
                                        widget.data.attr.push({});
                                        widget.refreshComponent();
                                    }),
                                },
                                refreshComponent: () => {
                                    widget.refreshComponent();
                                }
                            })
                        ]);
                    },
                };
            },
        },
        container: {
            title: '容器',
            subContent: '一個父容器，可以存放多個元件．',
            defaultData: {
                setting: []
            },
            render: (gvc, widget, setting, hoverID) => {

                widget.data.setting = widget.data.setting ?? []
                widget.data.styleEd = widget.data.styleEd ?? {}
                const htmlGenerate = new glitter.htmlGenerate(widget.data.setting, hoverID);
                return {
                    view: () => {
                        return htmlGenerate.render(gvc, {
                            class: `${glitter.htmlGenerate.styleEditor(widget.data.styleEd).class()}`,
                            style: glitter.htmlGenerate.styleEditor(widget.data.styleEd).style()
                        })
                    },
                    editor: (() => {
                        return gvc.map([
                            `
                            ${(() => {
                                if (widget.data.layout == "d-flex") {
                                    return `                                    
                                        <span class="w-100 mb-2 fw-500 mt-2 " style="color: orange;">垂直對齊</span>
                                        <select class="form-select mt-2 " onchange="${gvc.event((e: any) => {
                                        widget.data.alignItems = e.value
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
                                            return `<option value="${it.value}" ${(widget.data.alignItems === it.value) ? `selected` : ``} >${it.tit}</option>`
                                        }))
                                    })()}
                                        </select>
                                    
                                    `
                                }
                                return ``
                            })()}
                            ${(() => {
                                if (widget.data.layout == "d-flex") {
                                    return `
                                        <span class="w-100 mb-2 fw-500 mt-2 " style="color: orange;">水平對齊</span>
                                        <select class="form-select mt-2 " onchange="${gvc.event((e: any) => {
                                        widget.data.justifyContent = e.value
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
                                            return `<option value="${it.value}" ${(widget.data.justifyContent === it.value) ? `selected` : ``} >${it.tit}</option>`
                                        }))
                                    })()}
                                        </select>
                                    
                                    `
                                }
                                return ``
                            })()}
`, glitter.htmlGenerate.styleEditor(widget.data.styleEd).editor(gvc, () => {
                                widget.refreshComponent()
                            }, '包裝容器樣式'), (() => {
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
        component: {
            title: "嵌入模塊",
            subContent: "將製作好的頁面，當作模塊進行嵌入．",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./official/component.js', import.meta.url)),
        }
    }
})
