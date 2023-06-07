import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../../editor.js";
import {component} from "../../../official/component.js";
import {ShareDialog} from "../../../dialog/ShareDialog.js";
import {ApiUser} from "../../route/user.js";
import {GlobalUser} from "../../global/global-user.js";
import {ApiPost} from "../../route/post.js";

TriggerEvent.create(import.meta.url, {
    post: {
        title: '官方事件-發布內容',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {

                },
            };
        },
    }
});



