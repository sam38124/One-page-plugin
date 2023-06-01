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
    },
    caseInitial: {
        title: '媒合平台-服務加載',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    return new Promise((resolve, reject) => {
                        const saasConfig = window.saasConfig;
                        saasConfig.api.getPage(saasConfig.config.appName, "select_widget").then((data) => {
                            try {
                                gvc.glitter.share.service = [];
                                data.response.result[0].config[0].data.bigItem.map((dd) => {
                                    dd.child.map((d2) => {
                                        gvc.glitter.share.service.push(d2);
                                    });
                                });
                                resolve(true);
                            }
                            catch (e) {
                                resolve(false);
                            }
                        });
                    });
                },
            };
        },
    }
});
