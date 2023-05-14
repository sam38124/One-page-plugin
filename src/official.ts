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
            render: Plugin.setComponent(import.meta.url, new URL('./official/widget.js', import.meta.url)),
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
`, glitter.htmlGenerate.styleEditor(widget.data.styleEd).editor(gvc, () => {
                                widget.refreshComponent()
                            }, '包裝容器樣式')
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
