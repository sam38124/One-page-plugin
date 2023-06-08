import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {ShareDialog} from "../../../dialog/ShareDialog.js";
import {ApiPost} from "../../route/post.js";

export const getData=TriggerEvent.createSingleEvent(import.meta.url, (glitter) => {
    return {
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter;
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    const dialog = new ShareDialog(gvc.glitter)
                    ApiPost.get({
                        page:object.page ?? subData.page,
                        limit:object.limit ?? subData.limit,
                        query:object.query ?? subData.query ?? [],
                        datasource:object.datasource ?? subData.datasource ?? [],
                    })?.then((r) => {
                        if (!r.result) {
                            dialog.errorMessage({
                                text: "取得資料失敗!",
                                callback:()=>{
                                    if(subData.callback){
                                        subData.callback(false)
                                    }
                                }
                            })
                        } else {
                            subData.callback(r.response)
                        }
                    })
                }
            };
        }
    }
})