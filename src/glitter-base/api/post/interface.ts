import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../../editor.js";
import {component} from "../../../official/component.js";
import {ShareDialog} from "../../../dialog/ShareDialog.js";
import {ApiUser} from "../../route/user.js";
import {GlobalUser} from "../../global/global-user.js";
import {ApiPost} from "../../route/post.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {post} from "./post-data.js";

TriggerEvent.create(import.meta.url, {
    post: {
        title: '官方事件-內容-發布內容',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "表單位址",
                            default: widget.data.formKey,
                            placeHolder: '請輸入表單索引位址',
                            callback: (text: string) => {
                                widget.data.formKey = text
                                widget.refreshComponent()
                            }
                        })
                    ])
                },
                event: () => {
                    (post.fun(gvc, {} as any, {}, {
                        data: gvc.getBundle()[widget.data.formKey],
                        callback: (response: boolean) => {
                            if (response) {
                                glitter.closeDiaLog()
                            }
                        }
                    }) as any).event()
                },
            };
        },
    }
});



