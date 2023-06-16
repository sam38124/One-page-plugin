import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { ShareDialog } from "../../../dialog/ShareDialog.js";
import { ApiPost } from "../../route/post.js";
export const post = TriggerEvent.createSingleEvent(import.meta.url, (glitter) => {
    return {
        fun: (gvc, widget, object, subData) => {
            const glitter = window.glitter;
            return {
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "表單位址",
                            default: object.formKey,
                            placeHolder: '請輸入表單索引位址',
                            callback: (text) => {
                                object.formKey = text;
                                widget.refreshComponent();
                            }
                        })
                    ]);
                },
                event: () => {
                    return new Promise((resolve, reject) => {
                        const dialog = new ShareDialog(gvc.glitter);
                        dialog.dataLoading({ visible: true });
                        ApiPost.post({
                            "postData": subData.data
                        })?.then((r) => {
                            dialog.dataLoading({ visible: false });
                            if (!r.result) {
                                resolve(false);
                            }
                            else {
                                resolve(true);
                            }
                        });
                    });
                }
            };
        }
    };
});
