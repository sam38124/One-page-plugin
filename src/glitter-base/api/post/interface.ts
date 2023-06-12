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
    },
    uploadImage:{
        title: '官方事件-內容-上傳圖片',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = (window as any).glitter
            object.uploadEvent=object.uploadEvent??{}
            return {
                editor: () => {
                    return TriggerEvent.editer(gvc, widget, object.uploadEvent, {
                        hover: false,
                        option: [],
                        title: "上傳成功後要觸發的事件"
                    })
                },
                event: () => {
                    const uploadImage=''
                    return new Promise<string>((resolve, reject)=>{
                        glitter.ut.chooseMediaCallback({
                            single: true,
                            accept: 'json,image/*',
                            callback(data: any) {
                                const saasConfig: { config: any; api: any } = (window as any).saasConfig;
                                const dialog = new ShareDialog(gvc.glitter);
                                dialog.dataLoading({visible: true});
                                const file = data[0].file;
                                saasConfig.api.uploadFile(file.name).then((data: any) => {
                                    dialog.dataLoading({visible: false});
                                    const data1 = data.response;
                                    dialog.dataLoading({visible: true});
                                    const objP: any = {
                                        url: data1.url,
                                        type: 'put',
                                        data: file,
                                        headers: {
                                            "Content-Type": data1.type
                                        },
                                        processData: false,
                                        crossDomain: true,
                                        success: () => {
                                            dialog.dataLoading({visible: false});
                                            TriggerEvent.trigger({
                                                gvc, widget, clickEvent: object.uploadEvent, subData:{
                                                    image:data1.fullUrl
                                                }, element
                                            });
                                        },
                                        error: () => {
                                            dialog.dataLoading({visible: false});
                                            dialog.errorMessage({text: '上傳失敗'});
                                        },
                                    }
                                    $.ajax(objP);
                                });
                            },
                        });
                    })

                },
            };
        },
    }
});



