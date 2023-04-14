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
                            mode: "rowCard",
                            card: [
                                { icon: "dripicons-briefcase", value: "29件", name: "今年完成專案數" },
                                { icon: "dripicons-lightbulb", value: "75件", name: "專利權數量" },
                                { icon: "dripicons-user-group", value: "31位", name: "公司成員" },
                                { icon: "dripicons-graph-line", value: "13%", name: "去年營業成長率" },
                                { icon: "dripicons-cloud-download", value: "31個", name: "雲端串接服務" },
                                { icon: "dripicons-jewel", value: "254個", name: "顧客五星評價數" },
                            ],
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
