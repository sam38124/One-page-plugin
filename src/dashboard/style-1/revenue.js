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
                            mode: "revenue",
                            col: { pc: 7, tab: 12 },
                            title: "公司收益",
                            detail: [
                                { name: "上個月", value: 42025 },
                                { name: "本月", value: 74651 },
                            ],
                            data: {
                                series: [
                                    { name: "總收入", type: "area", data: db.numberList(12) },
                                    { name: "總支出", type: "line", data: db.numberList(12) },
                                ],
                                labels: monthTW(),
                                color: ["#727cf5", "#0acf97"],
                                yaxis: { title: "Revenue (TWD)" },
                            },
                        }
                    };
                    function monthTW() {
                        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
                    }
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
