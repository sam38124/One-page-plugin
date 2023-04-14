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
                            mode: "stateList",
                            col: { pc: 4, tab: 6 },
                            title: "本週客戶資訊欄",
                            list: [
                                {
                                    img: ScriptStyle1.getRout("assets/images/users/avatar-1.jpg"),
                                    title: "王泰寧",
                                    sub: "richard.john@mail.com",
                                    state: { color: "info", text: "首次會面" },
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/images/users/avatar-2.jpg"),
                                    title: "Margaret D. Evans",
                                    sub: "margaret.evans@rhyta.com",
                                    state: { color: "danger", text: "項目執行中" },
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/images/users/avatar-3.jpg"),
                                    title: "郭一盈",
                                    sub: "bryuellen@dayrep.com",
                                    state: { color: "success", text: "進入驗收" },
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/images/users/avatar-4.jpg"),
                                    title: "劉俊毅",
                                    sub: "collier@jourrapide.com",
                                    state: { color: "info", text: "首次會面" },
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/images/users/avatar-5.jpg"),
                                    title: "Timothy Kauper",
                                    sub: "thykauper@rhyta.com",
                                    state: { color: "info", text: "首次會面" },
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/images/users/avatar-6.jpg"),
                                    title: "郭家瑩",
                                    sub: "austin@dayrep.com",
                                    state: { color: "success", text: "進入驗收" },
                                },
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
