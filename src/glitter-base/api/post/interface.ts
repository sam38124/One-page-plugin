import {TriggerEvent} from "../../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../../editor.js";
import {component} from "../../../official/component.js";
import {ShareDialog} from "../../../dialog/ShareDialog.js";
import {ApiUser} from "../../route/user.js";
import {GlobalUser} from "../../global/global-user.js";
import {ApiPost} from "../../route/post.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {post} from "./post-data.js";
import {getData} from "./get-data.js";

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
                            default: object.formKey,
                            placeHolder: '請輸入表單索引位址',
                            callback: (text: string) => {
                                object.formKey = text
                                widget.refreshComponent()
                            }
                        })
                    ])
                },
                event: () => {
                    return new Promise((resolve, reject) => {
                        (post.fun(gvc, {} as any, {}, {
                            data: gvc.getBundle()[object.formKey]
                        }) as any).event().then((response: any) => {
                            if (response) {
                                resolve(true)
                            } else {
                                resolve(false)
                            }
                        })
                    })

                },
            };
        },
    },
    uploadImage: {
        title: '官方事件-內容-上傳圖片',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = (window as any).glitter
            object.uploadEvent = object.uploadEvent ?? {}
            return {
                editor: () => {
                    return TriggerEvent.editer(gvc, widget, object.uploadEvent, {
                        hover: false,
                        option: [],
                        title: "上傳成功後要觸發的事件"
                    })
                },
                event: () => {
                    const uploadImage = ''
                    return new Promise<string>((resolve, reject) => {
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
                                                gvc, widget, clickEvent: object.uploadEvent, subData: {
                                                    image: data1.fullUrl
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
    },
    get: {
        title: '官方事件-內容-取得內容',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = (window as any).glitter
            let vm: {
                data: any,
                query: { key: string, value: any, type: string, query?: any }[],
                page: number,
                limit: number,
                count: number,
                datasource: string[]
            } = {
                data: [],
                query: [],
                page: 0,
                limit: 10,
                count: 0,
                datasource: []
            };
            widget.data.searchText = widget.data.searchText ?? `{
                data: [],
                query: [],
                page: 0,
                limit: 10,
                count: 0,
                datasource: []
            }`
            widget.data.search = widget.data.search ?? "s"
            function getArrayItem(data:any){
                data.query=data.query??[]
                data.queryExpand=data.queryExpand??{}
                return  Editor.arrayItem({
                    originalArray:data.query,
                    gvc: gvc,
                    title: '搜索條件',
                    array: data.query.map((data: any, index: number) => {
                        return {
                            title: data.key ?? `項目:${index+1}`,
                            expand: data,
                            innerHtml:gvc.map([
                                glitter.htmlGenerate.editeText({
                                    gvc : gvc,
                                    title : 'Key',
                                    default : data.key  ?? "",
                                    placeHolder : `直接輸入參數，或者輸入程式碼Return內容進行返回．`,
                                    callback:(text:string)=>{
                                        data.key = text;
                                        widget.refreshComponent();
                                    }
                                }),
                                glitter.htmlGenerate.editeText({
                                    gvc : gvc,
                                    title : 'Value',
                                    default : data.value  ?? "",
                                    placeHolder : `直接輸入參數，或者輸入程式碼Return內容進行返回．`,
                                    callback:(text:string)=>{
                                        data.value= text;
                                        widget.refreshComponent();
                                    }
                                }),
                                Editor.select({
                                    gvc : gvc,
                                    title : '資料類型',
                                    def : data.dataType  ?? "text",
                                    array:[
                                        {title:"文字",value:"text"},
                                        {title:"數字",value:"number"}
                                    ],
                                    callback:(text)=>{
                                        data.dataType= text;
                                        widget.refreshComponent();
                                    }
                                }),
                                Editor.select({
                                    gvc : gvc,
                                    title : '比較值',
                                    def : data.type  ?? "text",
                                    array:[
                                        {title:"內容關聯",value:"relative_post"},
                                        {title:">",value:">"},
                                        {title:"=",value:"="},
                                        {title:"<",value:"<"},
                                        {title:"<=",value:"<="}
                                    ],
                                    callback:(text)=>{
                                        data.type= text;
                                        widget.refreshComponent();
                                    }
                                }),
                                (()=>{
                                    if(data.type==='relative_post'){
                                        data.query=data.query??[]
                                        return getArrayItem(data)
                                    }else{
                                        return ``
                                    }
                                })()
                            ]),
                            minus: gvc.event(() => {
                                data.query.splice(index, 1);
                                widget.refreshComponent();
                            }),
                        };
                    }),
                    expand: data.queryExpand,
                    plus: {
                        title: '添加區塊',
                        event: gvc.event(() => {
                            data.query.push({

                            });
                            widget.refreshComponent();
                        }),
                    },
                    refreshComponent:()=>{
                        widget.refreshComponent()
                    }
                })
            }
            return {
                editor: () => {
                    return gvc.bindView(() => {
                        const id = glitter.getUUID()
                        return {
                            bind: id,
                            view: () => {
                                return gvc.map([
                                    getArrayItem(widget.data)
                                ])
                            },
                            divCreate: {}
                        }
                    })
                },
                event: () => {
                    function getQuery(dd:any){
                        if(dd.dataType==='number'){
                            dd.value=parseInt(dd.value,10)
                        }
                        if(dd.query){
                            dd.query=dd.query.map((d2:any)=>{
                                return getQuery(d2)
                            })
                        }
                        let key=dd.key
                        let value=dd.value
                        try {
                            key=eval(dd.key)
                        }catch (e){

                        }
                        try {
                            value=eval(dd.value)
                        }catch (e){

                        }
                        return {key: key, value: value, type: dd.type,query:dd.query}
                    }
                    JSON.parse(JSON.stringify(widget.data.query)).map((dd:any)=>{
                        vm.query.push(getQuery(dd))
                    })
                    return new Promise<any>((resolve, reject) => {
                        (getData.fun(gvc, {} as any, {}, {
                            page: vm.page,
                            limit: vm.limit,
                            query: vm.query,
                            datasource: vm.datasource,
                            callback: (response: any) => {
                                vm.data = response.data
                                vm.count = response.count
                                resolve(vm)
                            }
                        }) as any).event()
                    })
                },
            };
        },
    },
    put: {
        title: '官方事件-內容-更新內容',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "表單位址",
                            default: object.formKey,
                            placeHolder: '請輸入表單索引位址',
                            callback: (text: string) => {
                                object.formKey = text
                                widget.refreshComponent()
                            }
                        })
                    ])
                },
                event: () => {
                    return new Promise((resolve, reject)=>{
                        const dialog = new ShareDialog(gvc.glitter)
                        dialog.dataLoading({visible: true})
                        ApiPost.put({
                            "postData": gvc.getBundle()[object.formKey]
                        })?.then((r) => {
                            dialog.dataLoading({visible: false})
                            if (!r.result) {
                                resolve(false)
                            } else {
                                resolve(true)
                            }
                        })
                    })

                },
            };
        },
    },
});



