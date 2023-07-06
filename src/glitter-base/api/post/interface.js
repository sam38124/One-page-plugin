import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { Editor } from "../../../editor.js";
import { ShareDialog } from "../../../dialog/ShareDialog.js";
import { ApiPost } from "../../route/post.js";
import { post } from "./post-data.js";
import { getData } from "./get-data.js";
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
                            default: object.formKey,
                            placeHolder: '請輸入表單索引位址',
                            callback: (text) => {
                                object.formKey = text;
                                widget.refreshComponent();
                            }
                        })
                    ]);
                },
                event: () => {
                    return new Promise((resolve, reject) => {
                        post.fun(gvc, {}, {}, {
                            data: gvc.getBundle()[object.formKey]
                        }).event().then((response) => {
                            if (response) {
                                resolve(true);
                            }
                            else {
                                resolve(false);
                            }
                        });
                    });
                },
            };
        },
    },
    uploadImage: {
        title: '官方事件-內容-上傳圖片',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = window.glitter;
            object.uploadEvent = object.uploadEvent ?? {};
            return {
                editor: () => {
                    return TriggerEvent.editer(gvc, widget, object.uploadEvent, {
                        hover: false,
                        option: [],
                        title: "上傳成功後要觸發的事件"
                    });
                },
                event: () => {
                    const uploadImage = '';
                    return new Promise((resolve, reject) => {
                        glitter.ut.chooseMediaCallback({
                            single: true,
                            accept: 'json,image/*',
                            callback(data) {
                                const saasConfig = window.saasConfig;
                                const dialog = new ShareDialog(gvc.glitter);
                                dialog.dataLoading({ visible: true });
                                const file = data[0].file;
                                saasConfig.api.uploadFile(file.name).then((data) => {
                                    dialog.dataLoading({ visible: false });
                                    const data1 = data.response;
                                    dialog.dataLoading({ visible: true });
                                    const objP = {
                                        url: data1.url,
                                        type: 'put',
                                        data: file,
                                        headers: {
                                            "Content-Type": data1.type
                                        },
                                        processData: false,
                                        crossDomain: true,
                                        success: () => {
                                            dialog.dataLoading({ visible: false });
                                            TriggerEvent.trigger({
                                                gvc, widget, clickEvent: object.uploadEvent, subData: {
                                                    image: data1.fullUrl
                                                }, element
                                            });
                                        },
                                        error: () => {
                                            dialog.dataLoading({ visible: false });
                                            dialog.errorMessage({ text: '上傳失敗' });
                                        },
                                    };
                                    $.ajax(objP);
                                });
                            },
                        });
                    });
                },
            };
        },
    },
    get: {
        title: '官方事件-內容-取得內容',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = window.glitter;
            let vm = {
                data: [],
                query: [],
                page: 0,
                selectOnly: [],
                limit: 50,
                count: 0,
                datasource: []
            };
            object.searchText = object.searchText ?? `{
                data: [],
                query: [],
                page: 0,
                limit: 10,
                count: 0,
                datasource: []
            }`;
            object.search = object.search ?? "s";
            const id = glitter.getUUID();
            function getArrayItem(data2) {
                data2.query = data2.query ?? [];
                data2.queryExpand = data2.queryExpand ?? {};
                data2.selectOnly = data2.selectOnly ?? [];
                return Editor.arrayItem({
                    originalArray: data2.query,
                    gvc: gvc,
                    title: '搜索條件',
                    array: data2.query.map((data, index) => {
                        return {
                            title: data.key ?? `項目:${index + 1}`,
                            expand: data,
                            innerHtml: gvc.map([
                                glitter.htmlGenerate.editeText({
                                    gvc: gvc,
                                    title: 'Key',
                                    default: data.key ?? "",
                                    placeHolder: `直接輸入參數，或者輸入程式碼Return內容進行返回．`,
                                    callback: (text) => {
                                        data.key = text;
                                        gvc.notifyDataChange(id);
                                    }
                                }),
                                (() => {
                                    if (data.type === 'in') {
                                        return ``;
                                    }
                                    else {
                                        return glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: 'Value',
                                            default: data.value ?? "",
                                            placeHolder: `直接輸入參數，或者輸入程式碼Return內容進行返回．`,
                                            callback: (text) => {
                                                data.value = text;
                                                gvc.notifyDataChange(id);
                                            }
                                        });
                                    }
                                })(),
                                ,
                                Editor.select({
                                    gvc: gvc,
                                    title: '資料類型',
                                    def: data.dataType ?? "text",
                                    array: [
                                        { title: "文字", value: "text" },
                                        { title: "數字", value: "number" }
                                    ],
                                    callback: (text) => {
                                        data.dataType = text;
                                        gvc.notifyDataChange(id);
                                    }
                                }),
                                Editor.select({
                                    gvc: gvc,
                                    title: '比較值',
                                    def: data.type ?? "",
                                    array: [
                                        { title: "內容關聯", value: "relative_post" },
                                        { title: ">", value: ">" },
                                        { title: "=", value: "=" },
                                        { title: "<", value: "<" },
                                        { title: "<=", value: "<=" },
                                        { title: ">=", value: ">=" },
                                        { title: "!=", value: "!=" },
                                        { title: "like", value: "" },
                                        { title: "in", value: "in" },
                                    ],
                                    callback: (text) => {
                                        data.type = text;
                                        gvc.notifyDataChange(id);
                                    }
                                }),
                                (() => {
                                    if (data.type === 'relative_post') {
                                        data.query = data.query ?? [];
                                        return getArrayItem(data);
                                    }
                                    else if (data.type === 'in') {
                                        data.query = data.query ?? [];
                                        data.inExpand = data.inExpand ?? {};
                                        return gvc.bindView(() => {
                                            const id = glitter.getUUID();
                                            return {
                                                bind: id,
                                                view: () => {
                                                    return Editor.arrayItem({
                                                        gvc: gvc,
                                                        title: '包含內容',
                                                        array: data.query.map((dd, index) => {
                                                            return {
                                                                title: dd.value ?? `項次:${index + 1}`,
                                                                expand: dd,
                                                                minus: gvc.event(() => {
                                                                    data.query.splice(index, 1);
                                                                    gvc.notifyDataChange(id);
                                                                }),
                                                                innerHtml: () => {
                                                                    return gvc.map([
                                                                        glitter.htmlGenerate.editeText({
                                                                            gvc: gvc,
                                                                            title: "value",
                                                                            default: dd.value ?? "",
                                                                            placeHolder: "",
                                                                            callback: (text) => {
                                                                                dd.value = text;
                                                                                gvc.notifyDataChange(id);
                                                                            }
                                                                        })
                                                                    ]);
                                                                }
                                                            };
                                                        }),
                                                        originalArray: data.query,
                                                        expand: data.inExpand,
                                                        plus: {
                                                            title: "新增項目",
                                                            event: gvc.event(() => {
                                                                data.query.push({});
                                                                gvc.notifyDataChange(id);
                                                            })
                                                        },
                                                        refreshComponent: () => {
                                                            gvc.notifyDataChange(id);
                                                        }
                                                    });
                                                },
                                                divCreate: {}
                                            };
                                        });
                                    }
                                    else {
                                        return ``;
                                    }
                                })()
                            ]),
                            minus: gvc.event(() => {
                                data2.query.splice(index, 1);
                                gvc.notifyDataChange(id);
                            }),
                        };
                    }),
                    expand: data2.queryExpand,
                    plus: {
                        title: '添加區塊',
                        event: gvc.event(() => {
                            data2.query.push({});
                            gvc.notifyDataChange(id);
                        }),
                    },
                    refreshComponent: () => {
                        gvc.notifyDataChange(id);
                    }
                });
            }
            function getSearchItem(data2) {
                data2.selectOnly = data2.selectOnly ?? [];
                data2.searchExpand = data2.searchExpand ?? {};
                return Editor.arrayItem({
                    originalArray: data2.selectOnly,
                    gvc: gvc,
                    title: '查詢項目',
                    array: data2.selectOnly.map((data, index) => {
                        return {
                            title: data.key ?? `項目:${index + 1}`,
                            expand: data,
                            innerHtml: gvc.map([
                                Editor.select({
                                    gvc: gvc,
                                    title: '類型',
                                    def: data.type ?? "enum",
                                    array: [
                                        { title: "列舉欄位名稱", value: "enum" },
                                        { title: "數量", value: "count" },
                                        { title: "加總", value: "SUM" },
                                        { title: "平均值", value: "AVG" },
                                    ],
                                    callback: (text) => {
                                        data.type = text;
                                        gvc.notifyDataChange(id);
                                    }
                                }),
                                (data.type === 'count') ? `` : glitter.htmlGenerate.editeText({
                                    gvc: gvc,
                                    title: '搜索索引',
                                    default: data.key ?? "",
                                    placeHolder: `直接輸入參數，或者輸入程式碼Return內容進行返回．`,
                                    callback: (text) => {
                                        data.key = text;
                                        gvc.notifyDataChange(id);
                                    }
                                }),
                                (data.type === 'count') ? `` : glitter.htmlGenerate.editeText({
                                    gvc: gvc,
                                    title: '搜索名稱',
                                    default: data.value ?? "",
                                    placeHolder: `直接輸入參數，或者輸入程式碼Return內容進行返回．`,
                                    callback: (text) => {
                                        data.value = text;
                                        gvc.notifyDataChange(id);
                                    }
                                })
                            ]),
                            minus: gvc.event(() => {
                                data2.selectOnly.splice(index, 1);
                                gvc.notifyDataChange(id);
                            }),
                        };
                    }),
                    expand: data2.searchExpand,
                    plus: {
                        title: '添加區塊',
                        event: gvc.event(() => {
                            data2.selectOnly.push({});
                            gvc.notifyDataChange(id);
                        }),
                    },
                    refreshComponent: () => {
                        gvc.notifyDataChange(id);
                    }
                });
            }
            return {
                editor: () => {
                    return gvc.bindView(() => {
                        return {
                            bind: id,
                            view: () => {
                                return gvc.map([
                                    getArrayItem(object),
                                    getSearchItem(object)
                                ]);
                            },
                            divCreate: {}
                        };
                    });
                },
                event: () => {
                    function getQuery(dd) {
                        if (dd.query) {
                            dd.query = dd.query.map((d2) => {
                                return getQuery(d2);
                            });
                        }
                        let key = dd.key;
                        let value = dd.value;
                        try {
                            key = eval(dd.key);
                        }
                        catch (e) {
                        }
                        try {
                            value = eval(dd.value);
                        }
                        catch (e) {
                        }
                        if (dd.dataType === 'number') {
                            value = parseInt(value, 10);
                            if (dd.type === 'in') {
                                dd.query.map((dd) => {
                                    dd.value = parseInt(dd.value, 10);
                                });
                            }
                        }
                        return { key: key, value: value, type: dd.type, query: dd.query };
                    }
                    JSON.parse(JSON.stringify(object.query)).map((dd) => {
                        const q = getQuery(dd);
                        if (q.key !== undefined && q.key !== '') {
                            vm.query.push(getQuery(dd));
                        }
                    });
                    object.selectOnly = object.selectOnly ?? [];
                    JSON.parse(JSON.stringify(object.selectOnly)).map((dd) => {
                        const q = getQuery(dd);
                        if (q.type === 'count' || (q.key !== undefined && (q.key !== ''))) {
                            vm.selectOnly.push(q);
                        }
                    });
                    return new Promise((resolve, reject) => {
                        getData.fun(gvc, {}, {}, {
                            page: vm.page,
                            limit: vm.limit,
                            query: vm.query,
                            selectOnly: vm.selectOnly,
                            datasource: vm.datasource,
                            callback: (response) => {
                                vm.data = response.data;
                                vm.count = response.count;
                                resolve(vm);
                            }
                        }).event();
                    });
                },
            };
        },
    },
    put: {
        title: '官方事件-內容-更新內容',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = window.glitter;
            return {
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "表單位址",
                            default: object.formKey,
                            placeHolder: '請輸入表單索引位址',
                            callback: (text) => {
                                object.formKey = text;
                                widget.refreshComponent();
                            }
                        })
                    ]);
                },
                event: () => {
                    return new Promise((resolve, reject) => {
                        const dialog = new ShareDialog(gvc.glitter);
                        dialog.dataLoading({ visible: true });
                        ApiPost.put({
                            "postData": gvc.getBundle()[object.formKey]
                        })?.then((r) => {
                            dialog.dataLoading({ visible: false });
                            if (!r.result) {
                                resolve(false);
                            }
                            else {
                                resolve(true);
                            }
                        });
                    });
                },
            };
        },
    },
});
