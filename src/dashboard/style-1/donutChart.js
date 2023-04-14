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
                            mode: "donutChart",
                            col: { pc: 3, tab: 6 },
                            title: "出貨國家佔比",
                            value: ["$300.56", "$135.18", "$148.96", "$254.02"],
                            data: {
                                series: db.numberList(4).map((w) => (w -= 10)),
                                labels: ["荷蘭", "瑞典", "捷克", "新加坡"],
                                color: ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"],
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
