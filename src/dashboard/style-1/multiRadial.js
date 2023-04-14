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
                            mode: "multiRadial",
                            col: { pc: 4, tab: 6 },
                            title: "作業系統銷售總表",
                            detail: {
                                title: "作業系統",
                                data: [
                                    { name: "品牌系統", value: 5510 },
                                    { name: "自定義系統", value: 2031 },
                                    { name: "自由／免費系統", value: 850 },
                                    { name: "其他系統", value: 72 },
                                ],
                            },
                            data: {
                                series: db.numberList(4),
                                labels: ["Windows", "Macintosh", "Linux", "Android"],
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
