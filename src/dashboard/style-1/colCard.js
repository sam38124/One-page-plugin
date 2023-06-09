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
                            mode: "colCard",
                            col: { pc: 3, tab: 4 },
                            card: [
                                { icon: "uil uil-laughing", title: "活躍使用者", value: 308, up: "5.27%", desc: "自上週以來" },
                                { icon: "dripicons-checkmark", title: "登入總人數", value: 560, down: "1.08%", desc: "自上週以來" },
                                { icon: "uil uil-cloud-computing", title: "會員總數", value: 13094, up: "3.44%", desc: "自去年以來" },
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
