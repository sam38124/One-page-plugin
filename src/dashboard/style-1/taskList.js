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
                            mode: "taskList",
                            col: { pc: 8 },
                            title: "任務公佈欄",
                            hideHead: true,
                            text: `<p>195 件任務中尚有 <b>107</b> 件未處理</p>`,
                            table: [
                                [
                                    { td_catalog: "h5_span", h5: "藝咖啡 - 主頁設計", span: "已過去3天" },
                                    { td_catalog: "status", state: "普通", color: "warning" },
                                    { td_catalog: "span_h5", h5: "林莉雯", span: "發起人" },
                                    { td_catalog: "span_h5", h5: "3h - 5h", span: "預估工期" },
                                    { td_catalog: "editBar" },
                                ],
                                [
                                    { td_catalog: "h5_span", h5: "2022下半年 - 飲料品牌圖像設計", span: "已過去2天" },
                                    { td_catalog: "status", state: "緊急", color: "danger" },
                                    { td_catalog: "span_h5", h5: "Jerry F. Powell", span: "發起人" },
                                    { td_catalog: "span_h5", h5: "12h - 18h", span: "預估工期" },
                                    { td_catalog: "editBar" },
                                ],
                                [
                                    { td_catalog: "h5_span", h5: "iOS APP 移轉頁面開發", span: "已過去7天" },
                                    { td_catalog: "status", state: "可等待", color: "success" },
                                    { td_catalog: "span_h5", h5: "簡誠凌", span: "發起人" },
                                    { td_catalog: "span_h5", h5: "78h - 90h", span: "預估工期" },
                                    { td_catalog: "editBar" },
                                ],
                                [
                                    { td_catalog: "h5_span", h5: "寄送郵件功能 - 未能送達", span: "已過去5天" },
                                    { td_catalog: "status", state: "緊急", color: "danger" },
                                    { td_catalog: "span_h5", h5: "童曉薇", span: "發起人" },
                                    { td_catalog: "span_h5", h5: "26h - 32h", span: "預估工期" },
                                    { td_catalog: "editBar" },
                                ],
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
