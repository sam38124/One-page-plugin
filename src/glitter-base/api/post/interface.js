import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
TriggerEvent.create(import.meta.url, {
    post: {
        title: '官方事件-發布內容',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                },
            };
        },
    }
});
