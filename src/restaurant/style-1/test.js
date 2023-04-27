import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    return `<h3>${widget.data.text}</h3>`;
                },
                editor: () => {
                    return glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: '標題',
                        default: widget.data.text ?? "",
                        placeHolder: "",
                        callback: (text) => {
                            widget.data.text = text;
                            widget.refreshComponent();
                        }
                    });
                }
            };
        },
    };
});
