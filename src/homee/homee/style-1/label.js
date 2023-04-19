import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `<h3 style="${glitter.htmlGenerate.styleEditor(widget.data).style()} " class="${glitter.htmlGenerate.styleEditor(widget.data).class()}">${widget.label}</h3>`;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return glitter.htmlGenerate.styleEditor(widget.data).editor(gvc, () => {
                        widget.refreshComponent();
                    }, '內部文字設計樣式');
                }
            };
        },
    };
});
