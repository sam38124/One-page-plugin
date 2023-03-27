import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        temp: {
            title: "h3",
            subContent: "編輯h3．",
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                return {
                    view: () => {
                        return `
                        <h3 class="${glitter.htmlGenerate.styleEditor(widget.data).class()}" style="${glitter.htmlGenerate.styleEditor(widget.data).style()}">${widget.data.title ?? "為定義"}</h3>
                        `;
                    },
                    editor: () => {
                        return gvc.map([
                            glitter.htmlGenerate.styleEditor(widget.data).editor(gvc, () => {
                                widget.refreshComponent();
                            }, "H3的設計樣式"),
                        ]);
                    }
                };
            }
        }
    };
});
