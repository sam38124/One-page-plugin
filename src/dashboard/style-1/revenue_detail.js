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
                            mode: "revenue_detail",
                            col: { pc: 12 },
                            title: "收益圖表(精細)",
                            detail: [
                                { name: "上週收益總額", dot: "primary", value: 585254 },
                                { name: "本週收益總額", dot: "success", value: 648529 },
                            ],
                            board: {
                                title: "本日總收益: $42,530",
                                desc: "本週進入春季最後兩個週次，營業收入比起上個月成長約13.06%，維持這個平均銷售量，夏季將...",
                            },
                            data: {
                                series: [
                                    { name: "上週收益總額", data: db.numberList(7) },
                                    { name: "本週收益總額", data: db.numberList(7) },
                                ],
                                color: ["#727cf5", "#0acf97"],
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
