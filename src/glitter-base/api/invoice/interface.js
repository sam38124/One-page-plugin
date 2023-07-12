import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { ShareDialog } from "../../../dialog/ShareDialog.js";
import { GlobalUser } from "../../global/global-user.js";
import { BaseApi } from "../../../api/base.js";
import { Base } from "../../base.js";
TriggerEvent.create(import.meta.url, {
    post_invoice: {
        title: '官方事件-發票-開立發票',
        fun: (gvc, widget, object, subData, element) => {
            object.resource = object.resource ?? {};
            return {
                editor: () => {
                    return TriggerEvent.editer(gvc, widget, object.resource, {
                        hover: false,
                        option: [],
                        title: "發票資料來源"
                    });
                },
                event: () => {
                    const dialog = new ShareDialog(gvc.glitter);
                    dialog.dataLoading({ visible: true });
                    return new Promise(async (resolve, reject) => {
                        const params = (await TriggerEvent.trigger({ gvc: gvc, widget: widget, clickEvent: object.resource, subData: subData, element: element }));
                        BaseApi.create({
                            "url": Base.getBaseUrl() + `/api-public/v1/invoice`,
                            "type": "POST",
                            "headers": {
                                "Content-Type": "application/json",
                                "g-app": Base.getConfig().config.appName,
                                "Authorization": GlobalUser.token
                            },
                            data: JSON.stringify({
                                invoice_data: params
                            })
                        }).then((r) => {
                            setTimeout(() => {
                                dialog.dataLoading({ visible: false });
                                if (r.result && r.response.result) {
                                    dialog.successMessage({ text: "發票開立成功!" });
                                }
                                else {
                                    dialog.errorMessage({ text: "發票開立失敗!" });
                                }
                            }, 500);
                        });
                    });
                },
            };
        },
    }
});
