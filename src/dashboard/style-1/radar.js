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
                            mode: "radar",
                            col: { pc: 4, tab: 6 },
                            title: "瀏覽器品牌市佔率",
                            data: {
                                series: [{ name: "市佔率", data: db.numberList(6) }],
                                labels: ["Chrome", "Firefox", "Safari", "Opera", "Edge", "Explorer"],
                                color: "#727cf5",
                            },
                        }
                    };
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
