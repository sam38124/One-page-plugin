import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { post } from "./post-data.js";
TriggerEvent.create(import.meta.url, {
    post: {
        title: '官方事件-內容-發布內容',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = window.glitter;
            return {
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "表單位址",
                            default: widget.data.formKey,
                            placeHolder: '請輸入表單索引位址',
                            callback: (text) => {
                                widget.data.formKey = text;
                                widget.refreshComponent();
                            }
                        })
                    ]);
                },
                event: () => {
                    post.fun(gvc, {}, {}, {
                        data: gvc.getBundle()[widget.data.formKey],
                        callback: (response) => {
                            if (response) {
                                glitter.closeDiaLog();
                            }
                        }
                    }).event();
                },
            };
        },
    }
});
