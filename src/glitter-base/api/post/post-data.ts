import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {ShareDialog} from "../../../dialog/ShareDialog.js";
import {ApiPost} from "../../route/post.js";

export const post=TriggerEvent.createSingleEvent(import.meta.url, (glitter) => {
    return {
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter;
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    const dialog = new ShareDialog(gvc.glitter)
                    dialog.dataLoading({visible: true})
                    ApiPost.post({
                        "postData": subData.data
                    })?.then((r) => {
                        dialog.dataLoading({visible: false})
                        if (!r.result) {
                            dialog.errorMessage({
                                text: "發佈失敗!",
                                callback:()=>{
                                    if(subData.callback){
                                        subData.callback(false)
                                    }
                                }
                            })
                        } else {
                            dialog.successMessage({
                                text: "發佈成功!",
                                callback:()=>{
                                    if(subData.callback){
                                        subData.callback(true)
                                    }
                                }
                            })
                        }
                    })
                }
            };
        }
    }
})