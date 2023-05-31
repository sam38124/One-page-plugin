import { TriggerEvent } from "../glitterBundle/plugins/trigger-event.js";
TriggerEvent.create(import.meta.url, {
    postCase: {
        title: '媒合平台-發布案子',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    window.glitter.openDiaLog(new URL('dialog/postform.js', import.meta.url).href, "postform", {});
                },
            };
        },
    }
});
