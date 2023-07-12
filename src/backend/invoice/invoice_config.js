import { BackendPlugin } from "../../glitterBundle/plugins/backend-plugin.js";
import { Editor } from "../../editor.js";
import { ShareDialog } from "../../dialog/ShareDialog.js";
BackendPlugin.createPlugin((gvc) => {
    const id = gvc.glitter.getUUID();
    const vm = {
        loading: true,
        data: {}
    };
    const saasConfig = window.saasConfig;
    saasConfig.api.getPrivateConfig(saasConfig.config.appName, "invoice_setting").then((r) => {
        if (r.response.result[0]) {
            vm.data = r.response.result[0].value;
        }
        vm.loading = false;
        gvc.notifyDataChange(id);
    });
    const html = String.raw;
    const dialog = new ShareDialog(gvc.glitter);
    return gvc.bindView(() => {
        return {
            bind: id,
            view: () => {
                if (vm.loading) {
                    return html `
                        <div class="w-100 d-flex align-items-center justify-content-center">
                            <div class="spinner-border"></div>
                        </div>`;
                }
                return html `<h3 class=" pb-3">推播通知</h3>
                <div class=" m-0" style="max-width:100%;width:250px;">
                    ${(() => {
                    vm.data.fincial = vm.data.fincial ?? "ezpay";
                    return gvc.map([
                        Editor.select({
                            title: "選擇金流",
                            gvc: gvc,
                            def: vm.data.fincial,
                            array: [
                                { title: "藍新", value: "ezpay" },
                                { title: "綠界", value: "green" },
                            ],
                            callback: (text) => {
                                vm.data.fincial = text;
                            }
                        }),
                        Editor.editeInput({
                            gvc: gvc,
                            title: 'HashKey',
                            default: vm.data.hashkey ?? "",
                            type: "text",
                            placeHolder: "請輸入HashKey",
                            callback: (text) => {
                                vm.data.hashkey = vm.data.hashkey ?? text;
                            }
                        }),
                        Editor.editeInput({
                            gvc: gvc,
                            title: 'HashIV',
                            default: vm.data.hashiv ?? "",
                            type: "text",
                            placeHolder: "請輸入HashIV",
                            callback: (text) => {
                                vm.data.hashiv = vm.data.hashiv ?? text;
                            }
                        })
                    ]);
                })()}
                </div>
                <div class="d-flex w-100">
                    <div class="flex-fill"></div>
                    <button class="btn-warning btn" style="color:black;" onclick="${gvc.event(() => {
                    dialog.dataLoading({ text: '設定中', visible: true });
                    saasConfig.api.setPrivateConfig(saasConfig.config.appName, "invoice_setting", vm.data).then((r) => {
                        setTimeout(() => {
                            dialog.dataLoading({ visible: false });
                            if (r.response) {
                                dialog.successMessage({ text: "設定成功" });
                            }
                            else {
                                dialog.errorMessage({ text: "設定失敗" });
                            }
                        }, 1000);
                    });
                })}">儲存
                    </button>
                </div>
                `;
            },
            divCreate: {}
        };
    });
}, import.meta.url);
