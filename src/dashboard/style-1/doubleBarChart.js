import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let db = new Dashboard();
                    let sourceData = {
                        data: {
                            mode: "doubleBarChart",
                            col: { pc: 7, tab: 12 },
                            title: "進存貨變化長條圖",
                            data: {
                                series: [
                                    { name: "進貨", data: db.numberList(12) },
                                    { name: "存貨", data: db.numberList(12) },
                                ],
                                color: ["#727cf5", "#e3eaef"],
                            },
                        }
                    };
                    console.log(sourceData.data);
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <div class="row">
                                ${db[sourceData.data.mode](sourceData.data, 0)}
                            </div>
                           `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return ``;
                }
            };
        },
    };
});
