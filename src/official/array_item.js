import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../glitterBundle/plugins/trigger-event.js";
import { component } from "./component.js";
export const array_item = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        render: (gvc, widget, setting, hoverID, subData) => {
            return {
                view: () => {
                    return new Promise((resolve, reject) => {
                        let view = [];
                        subData.createOption = (() => {
                            return {
                                class: glitter.htmlGenerate.styleEditor(widget.data).class(),
                                style: glitter.htmlGenerate.styleEditor(widget.data).style()
                            };
                        });
                        async function getView() {
                            for (const a of [0, 1, 2, 3]) {
                                view.push(await component.render(gvc, widget, setting, hoverID, subData).view());
                            }
                            resolve(view.join(''));
                        }
                        getView().then(r => { });
                    });
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.styleEditor(widget.data).editor(gvc, () => {
                            widget.refreshComponent();
                        }, "容器樣式"),
                        TriggerEvent.editer(gvc, widget, widget.data, {
                            hover: false,
                            option: [],
                            title: "資料來源"
                        }),
                        component.render(gvc, widget, setting, hoverID, subData).editor()
                    ]);
                },
            };
        }
    };
});
