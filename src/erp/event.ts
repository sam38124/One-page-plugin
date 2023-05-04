import {TriggerEvent} from "../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../editor.js";
import {BaseApi} from "./api/base.js";
import {ShareDialog} from "../dialog/ShareDialog.js";
import {ErpConfig} from "./erp-config.js";
import {User} from "../glitter/model/User.js";


class GlobalData {
    public static data = {
        pageList: [],
        isRunning: false,
        run: () => {
            if (GlobalData.data.isRunning) {
                return;
            }
            GlobalData.data.isRunning = true;
            const saasConfig: {
                config: any;
                api: any;
            } = (window as any).saasConfig;
            saasConfig.api.getPage(saasConfig.config.appName).then((data: any) => {
                if (data.result) {
                    GlobalData.data.pageList = data.response.result.map((dd: any) => {
                        dd.page_config = dd.page_config ?? {};
                        return dd;
                    });
                } else {
                    GlobalData.data.isRunning = false;
                    GlobalData.data.run();
                }
            });
        },
    };
}

(window as any).glitter.addMtScript([{src: 'https://momentjs.com/downloads/moment-with-locales.min.js'}], () => {}, () => {})


TriggerEvent.create(import.meta.url, {
    login: {
        title: 'ERP-登入按鈕',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            widget.data.loginSuccess = widget.data.loginSuccess ?? {}
            return {
                editor: () => {
                    return `<div class="mt-2"></div>${ErpConfig.roleList.map((data: any) => {
                        widget.data.loginSuccess[data.code] = widget.data.loginSuccess[data.code] ?? {}
                        return Editor.toggleExpand({
                            gvc: gvc,
                            title: data.name + "-登入成功的事件",
                            data: data,
                            innerText: () => {
                                return TriggerEvent.editer(gvc, widget, widget.data.loginSuccess[data.code], {
                                    hover: true,
                                    option: [],
                                    title: ''
                                })
                            },
                            color: `#3d3f41`
                        })
                    }).join('<div class="my-2"></div>')}`
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/user/login`,
                        "type": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(
                            {
                                "account": subData.account,
                                "pwd": subData.pwd,
                                "company": subData.company
                            }
                        )
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            ErpConfig.setToken(d2.response.userData.token)
                            ErpConfig.setRole(d2.response.userData.role)
                            TriggerEvent.trigger({
                                gvc, widget, clickEvent: widget.data.loginSuccess[d2.response.userData.role]
                            })

                        } else {
                            shareDialog.errorMessage({text: "登入失敗"})
                        }
                    })
                },
            };
        },
    },
    register: {
        title: 'ERP-註冊按鈕',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            widget.data.registerSuccess = widget.data.registerSuccess ?? {}
            return {
                editor: () => {
                    return TriggerEvent.editer(gvc, widget, widget.data.registerSuccess, {
                        hover: true,
                        option: [],
                        title: "登入成功的事件"
                    })
                },
                event: () => {
                    const shareDialog = new ShareDialog(glitter)
                    let userData: any = {}
                    Object.keys(subData).map((dd) => {
                        if (['account', 'pwd', 'company', 'confirmPwd'].indexOf(dd) === -1) {
                            userData[dd] = subData[dd]
                        }
                    })
                    const json = {
                        "account": subData.account,
                        "pwd": subData.pwd,
                        "company": subData.company,
                        "userData": userData
                    }
                    if (subData.pwd !== subData.confirmPwd) {
                        shareDialog.errorMessage({
                            text: "請再次確認密碼"
                        })
                        return;
                    }
                    shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/user/register`,
                        "type": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(json)
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            TriggerEvent.trigger({
                                gvc, widget, clickEvent: widget.data.registerSuccess
                            })
                        } else {
                            shareDialog.errorMessage({text: "註冊失敗"})
                        }
                    })
                },
            };
        },
    },
    setting: {
        title: 'ERP-初始設定',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    object.childAccount = object.childAccount ?? []
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `後端路徑`,
                            default: object.api ?? "",
                            placeHolder: "輸入後端路徑",
                            callback: (text: string) => {
                                object.api = text
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                            gvc: gvc,
                            title: "子帳號管理",
                            originalArray: object.childAccount,
                            array: object.childAccount.map((dd: any, index: number) => {
                                return {
                                    title: dd.name || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml:
                                        gvc.map([
                                            glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: `角色名稱`,
                                                default: dd.name,
                                                placeHolder: "輸入角色名稱",
                                                callback: (text: string) => {
                                                    dd.name = text
                                                    widget.refreshComponent()
                                                }
                                            }),
                                            glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: `代號`,
                                                default: dd.code,
                                                placeHolder: "輸入角色代號",
                                                callback: (text: string) => {
                                                    dd.code = text
                                                    widget.refreshComponent()
                                                }
                                            }),
                                            Editor.select({
                                                title: "存貨可視權限",
                                                gvc: gvc,
                                                def: dd.sku_p ?? 'only',
                                                array: [{title: '全部', value: 'all'}, {
                                                    title: '自己的',
                                                    value: 'only'
                                                }],
                                                callback: (text) => {
                                                    dd.sku_p = text
                                                    widget.refreshComponent()
                                                }
                                            })
                                        ]),
                                    minus: gvc.event(() => {
                                        object.childAccount.splice(index, 1)
                                        widget.refreshComponent()
                                    })
                                }
                            }),
                            expand: object,
                            plus: {
                                title: "添加區塊",
                                event: gvc.event(() => {
                                    object.childAccount.push({name: '預設', code: 'default'})
                                    widget.refreshComponent()
                                })
                            },
                            refreshComponent: () => {
                                widget.refreshComponent()
                            }
                        })
                    ])
                },
                event: () => {
                    return new Promise((resolve, reject) => {
                        glitter.share.backendInfo=glitter.share.backendInfo??{}
                        ErpConfig.roleList = object.childAccount.map((dd: any) => {
                            dd.sku_p = dd.sku_p ?? 'only'
                            return dd
                        })
                        ErpConfig.api = object.api
                        BaseApi.create({
                            "url": ErpConfig.api + `/api/v1/user`,
                            "type": "GET",
                            "timeout": 0,
                            "headers": {
                                "Content-Type": "application/json",
                                "Authorization": ErpConfig.getToken()
                            },
                        }).then((d2) => {
                            if (!d2.result) {
                                gvc.glitter.setUrlParameter('page', 'home')
                                if(glitter.getUrlParameter('page')!=='home'){
                                    location.reload()
                                }
                                resolve(true)
                            } else {
                                ErpConfig.setRole(d2.response.result[0].role)
                                ErpConfig.role = d2.response.result[0].role
                                glitter.share.role = ErpConfig.role
                                resolve(true)
                                glitter.share.backendInfo.name=d2.response.result[0].userData.name
                                glitter.share.backendInfo.role=[
                                    {value:"0",title:"最高管理員"},
                                    {value:"1",title:"營運端"},
                                    {value:"2",title:"A型供應商"},
                                    {value:"8",title:"B型供應商"},
                                    {value:"9",title:"C型供應商"},
                                    {value:"3",title:"海運端"},
                                    {value:"4",title:"倉儲端"},
                                    {value:"5",title:"物流端"},
                                    {value:"6",title:"財務端"},
                                    {value:"7",title:"後勤端"},
                                    {value:"10",title:"拆櫃場"},
                                ].find((dd)=>{
                                    return dd.value===`${ErpConfig.role}`
                                })!.title
                            }
                        })

                    })
                },
            };
        },
    },
    getMember: {
        title: 'ERP-取得用戶資料',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            if (!object.comeFrom) {
                ErpConfig.roleList.map((dd) => {
                    object.comeFrom = dd.code
                    return {title: dd.name, value: dd.code}
                })
            }
            return {
                editor: () => {
                    return Editor.select({
                        title: "設定用戶來源",
                        gvc: gvc,
                        def: object.comeFrom,
                        array: ErpConfig.roleList.map((dd) => {
                            return {title: dd.name, value: dd.code}
                        }),
                        callback: (text) => {
                            object.comeFrom = text
                            widget.refreshComponent()
                        }
                    })
                },
                event: () => {

                    const shareDialog = new ShareDialog(gvc.glitter)
                    // shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/user/getMember?role=${object.comeFrom}`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                    }).then((d2) => {
                        if (d2.result) {
                            subData.data = d2.response.result.map((dd: any) => {
                                dd.userData.account = dd.account
                                dd.userData.userID = dd.userID
                                dd.userData.email = dd.account
                                return dd
                            });
                            subData.callback()
                        } else {
                            shareDialog.errorMessage({text: "認證失敗"})
                        }
                    })
                }
            }
        }
    },
    selectMember: {
        title: 'ERP-選擇用戶',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            object.comeFromArray = object.comeFromArray ?? []
            if (!object.comeFrom) {
                ErpConfig.roleList.map((dd) => {
                    object.comeFrom = dd.code
                    return {title: dd.name, value: dd.code}
                })
            }
            return {
                editor: () => {
                    return Editor.arrayItem({
                        originalArray: object.comeFromArray,
                        gvc: gvc,
                        title: '設定用戶來源',
                        array: object.comeFromArray.map((dd: any, index: number) => {
                            ErpConfig.roleList.map((d2) => {
                                dd.comeFrom = dd.comeFrom ?? d2.code
                            })
                            return {
                                title: `用戶角色:${index + 1}`, innerHtml: () => {
                                    return Editor.select({
                                        title: '',
                                        gvc: gvc,
                                        def: dd.comeFrom,
                                        array: ErpConfig.roleList.map((dd) => {
                                            return {title: dd.name, value: dd.code}
                                        }),
                                        callback: (text) => {
                                            dd.comeFrom = text
                                            widget.refreshComponent()
                                        }
                                    })
                                },
                                expand: dd,
                                minus: gvc.event(() => {
                                    object.comeFromArray.splice(index, 1)
                                    widget.refreshComponent()
                                })
                            }
                        }),
                        expand: object,
                        plus: {
                            title: '添加區塊',
                            event: gvc.event(() => {
                                object.comeFromArray.push({});
                                widget.refreshComponent();
                            }),
                        },
                        refreshComponent: () => {
                            widget.refreshComponent()
                        }
                    })
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    // shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/user/getMember?role=${object.comeFromArray.map((dd: any) => {
                            return dd.comeFrom
                        }).join(',')}`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                    }).then((d2) => {
                        if (d2.result) {
                            subData.data = d2.response.result.map((dd: any) => {
                                dd.userData.account = dd.account
                                dd.userData.userID = dd.userID
                                return {
                                    key: dd.userData.name, value: dd.userID
                                }
                            });
                            subData.callback()
                        } else {
                            shareDialog.errorMessage({text: "認證失敗"})
                        }
                    })
                }
            }
        }
    },
    selectPd: {
        title: 'ERP-選擇商品',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    // shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/product?type=select`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                    }).then((d2) => {
                        if (d2.result) {
                            subData.data = d2.response.data.map((dd: any) => {
                                return {
                                    key: dd.sku, value: dd.sku
                                }
                            });
                            subData.callback()
                        } else {
                            shareDialog.errorMessage({text: "認證失敗"})
                        }
                    })
                }
            }
        }
    },
    setMember: {
        title: 'ERP-設定用戶',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    object.role = object.role ?? ErpConfig.roleList[0].code
                    return [
                        Editor.select({
                            title: "設定至用戶群組",
                            gvc: gvc,
                            def: object.role,
                            array: ErpConfig.roleList.map((dd) => {
                                return {
                                    title: dd.name, value: dd.code
                                }
                            }),
                            callback: (text) => {
                                object.role = text
                            }
                        })
                    ].join('')
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    shareDialog.dataLoading({visible: true})
                    subData.role = object.role
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/user/updateChild`,
                        "type": "PUT",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data: JSON.stringify({
                            userData: subData
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            shareDialog.successMessage({text: "設定成功"})
                            subData.callback()
                            location.reload()
                        } else {
                            shareDialog.errorMessage({text: "設定失敗"})
                        }
                    })
                }
            }
        }
    },
    getSKU: {
        title: 'ERP-取得SKU商品資料',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            if (!object.comeFrom) {
                ErpConfig.roleList.map((dd) => {
                    object.comeFrom = dd.code
                    return {title: dd.name, value: dd.code}
                })
            }
            object.limit = object.limit ?? 50;
            return {
                editor: () => {

                    return glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: '每頁筆數',
                        default: object.limit,
                        placeHolder: '請輸入每頁筆數',
                        callback: (text: string) => {
                            object.limit = (text);
                            widget.refreshComponent()
                        },
                    })
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/product?sku=${object.sku ?? ''}&page=${subData.page}&limit=${object.limit}&vendor=${ErpConfig.roleList.find((dd) => {
                            return `${dd.code}` === `${ErpConfig.role}`
                        })!.sku_p === 'only'}`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                    }).then((d2) => {
                        if (d2.result) {
                            subData.data = d2.response.data.map((dd: any) => {
                                return [{
                                    key: '●',
                                    value: '<input type="checkbox" class="form-check-input batchDel" id="bat-461">'
                                }, {key: '商品名稱', value: dd.config.name ?? '未命名'}, {
                                    key: 'sku代號',
                                    value: dd.sku
                                },
                                    {key: '庫存數量', value: dd.config.inventory ?? '0'},
                                    {key: '成本價', value: dd.config.price},
                                    {key: '供應商代號', value: dd.vendor}]
                            })
                            subData.editData = d2.response.data.map((dd: any) => {
                                dd.config.id = dd.id
                                return dd.config
                            })
                            subData.pageSize = Math.floor(d2.response.total / object.limit)
                            subData.callback()
                        } else {
                            shareDialog.errorMessage({text: "認證失敗"})
                        }
                    })
                }
            }
        }
    },
    setSKU: {
        title: 'ERP-設定SKU',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    return [].join('')
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/product`,
                        "type": subData.id ? "PUT" : "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data: JSON.stringify({
                            id: subData.id,
                            config: subData,
                            sku: subData.sku,
                            vendor: subData.vendor,
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            location.reload()
                            shareDialog.successMessage({text: "設定成功"})
                            subData.callback()
                        } else {
                            shareDialog.errorMessage({text: "SKU已遭使用"})
                        }
                    })
                }
            }
        }
    },
    addOrder: {
        title: 'ERP-新增訂單',
        fun: (gvc, widget, object, subData) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    shareDialog.dataLoading({visible: true})
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/order`,
                        "type": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data: JSON.stringify({
                            "orderID": subData.orderID,
                            "line_item": subData.line_item,
                            "config": subData
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            if (d2.response.result) {
                                location.reload()
                                shareDialog.successMessage({text: "新增成功"})
                                subData.callback()
                            } else {
                                shareDialog.errorMessage({text: d2.response.message})
                            }
                        } else {
                            shareDialog.errorMessage({text: "新增失敗"})
                        }
                    })
                }
            }
        }
    },
    setShipemtState: {
        title: 'ERP-設定出貨單',
        fun: (gvc, widget, object, subData) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    subData.log = undefined;
                    const glitter = (window as any).glitter;
                    const shareDialog = new ShareDialog(gvc.glitter);
                    shareDialog.dataLoading({visible: true});
                    const index = ['f_14', 'f_14_30', 'f_31_60'].indexOf(subData.order_status)
                    if (index !== -1) {
                        subData.deadLine = (window as any).moment().add([14, 30, 60][index], "days").format('YYYY-MM-DD HH:mm:ss');
                    }

                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/order/shippingState`,
                        "type": "PUT",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data: JSON.stringify({
                            shipping_state_token: subData.token,
                            data: subData
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            if (d2.response.result) {
                                location.reload()
                                shareDialog.successMessage({text: "新增成功"})
                                subData.callback()
                            } else {
                                shareDialog.errorMessage({text: d2.response.message})
                            }
                        } else {
                            shareDialog.errorMessage({text: "設定失敗"})
                        }
                    })
                }
            }
        }
    },
    getOrderList: {
        title: 'ERP-取得Order列表',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            if (!object.comeFrom) {
                ErpConfig.roleList.map((dd) => {
                    object.comeFrom = dd.code
                    return {title: dd.name, value: dd.code}
                })
            }
            object.limit = object.limit ?? 50;
            return {
                editor: () => {
                    return glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: '每頁筆數',
                        default: object.limit,
                        placeHolder: '請輸入每頁筆數',
                        callback: (text: string) => {
                            object.limit = (text);
                            widget.refreshComponent()
                        },
                    })
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter)
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/order?page=${subData.page}&limit=${object.limit}`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                    }).then((d2) => {
                        if (d2.result) {
                            subData.data = d2.response.data.map((dd: any) => {
                                return [{
                                    key: '●',
                                    value: '<input type="checkbox" class="form-check-input batchDel" id="bat-461">'
                                }, {key: '訂單編號', value: dd.orderID},
                                    {key: '建立日期', value: dd.created_at.replace('T', " ").replace('.000Z', '')}]
                            })
                            subData.editData = d2.response.data.map((dd: any) => {
                                dd.config.id = dd.id
                                dd.config['orderID'] = dd.orderID
                                return dd.config
                            })
                            subData.pageSize = Math.floor(d2.response.total / object.limit)
                            subData.callback()
                        } else {
                            shareDialog.errorMessage({text: "認證失敗"})
                        }
                    })
                }
            }
        }
    },
    getShippemtState: {
        title: 'ERP-取得出貨列表',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            if (!object.comeFrom) {
                ErpConfig.roleList.map((dd) => {
                    object.comeFrom = dd.code
                    return {title: dd.name, value: dd.code}
                })
            }
            object.limit = object.limit ?? 50;
            return {
                editor: () => {
                    return glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: '每頁筆數',
                        default: object.limit,
                        placeHolder: '請輸入每頁筆數',
                        callback: (text: string) => {
                            object.limit = (text);
                            widget.refreshComponent()
                        },
                    })
                },
                event: () => {
                    const orderStatus = [
                        {
                            "name": "待確認",
                            "value": "needCheck"
                        },
                        {
                            "name": "已確認",
                            "value": "waitOut"
                        },
                        {
                            "name": "14天內可出貨",
                            "value": "f_14"
                        },
                        {
                            "name": "14-30天內可出貨",
                            "value": "f_14_30"
                        },
                        {
                            "name": "31-60天 / 暫時缺貨",
                            "value": "f_31_60"
                        },
                        {
                            "name": "待客服確認",
                            "value": "wait"
                        },
                        {
                            "name": "停產",
                            "value": "discontinued"
                        },
                        {
                            "name": "待請款",
                            "value": "waitPay"
                        },
                        {
                            "name": (() => {

                                if (`${ErpConfig.role}` === `3`) {
                                    return "待檢驗"
                                } else {
                                    return "已出貨"
                                }
                            })(),
                            "value": "Shipped"
                        },
                        {
                            "name": "已取消",
                            "value": "cancel"
                        },
                        {
                            "name": "異常情況",
                            "value": "error"
                        },
                        {
                            "name": "已送達",
                            "value": "arrived"
                        },
                        {
                            "name": "海運-異常",
                            "value": "error_product"
                        },
                        {
                            "name": "海運-異常",
                            "value": "crash_box"
                        },
                        {
                            "name": "海運-異常",
                            "value": "errorCount"
                        },
                        {
                            "name": "已檢驗",
                            "value": "ship_passcheck"
                        },
                        {
                            "name": "倉儲-異常",
                            "value": "error_product2",
                        },
                        {
                            "name": "倉儲-異常",
                            "value": "crash_box2"
                        },
                        {
                            "name": "倉儲-異常",
                            "value": "errorCount2",
                        },
                        {
                            "name": "倉儲-已入庫",
                            "value": "to_stored",
                        },
                        {
                            "name": "配送中",
                            "value": "on_progress",
                        },
                        {
                            "name": "已配送至客戶",
                            "value": "arrived",
                        },
                        {
                            "name": "配送異常",
                            "value": "car_error",
                        },
                        {
                            "name": "等待物流取貨",
                            "value": "waitcartoget"
                        },
                        {
                            "name": "已裝櫃",
                            "value": "to-shipp"
                        },
                        {
                            "name": "已下櫃",
                            "value": "out_of_ship"
                        }
                    ]
                    const payment_status = [
                        {
                            "name": "已付款",
                            "value": "pay",
                        },
                        {
                            "name": "未付款",
                            "value": "notPay",
                        },
                        {
                            "name": "待審核",
                            "value": "needCheck",
                        },
                        {
                            "name": "等待撥款",
                            "value": "needPay"
                        }
                    ]
                    const shareDialog = new ShareDialog(gvc.glitter)
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/order/shippingState?page=${subData.page}&limit=${object.limit}&vendor=${ErpConfig.roleList.find((dd) => {
                            return `${dd.code}` === `${ErpConfig.role}`
                        })!.sku_p === 'only'}${(() => {
                            if (glitter.getUrlParameter('jsonQuery')) {
                                return `&jsonQuery=${glitter.getUrlParameter('jsonQuery')}`
                            } else {
                                return ``
                            }
                        })()}`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                    }).then((d2) => {
                        if (d2.result) {
                            ErpConfig.selectOrder=[]
                            d2.response.data = d2.response.data.filter((dd: any) => {
                                return dd.product !== undefined
                            })
                            subData.data = d2.response.data.map((dd: any) => {
                                const pd = (dd.product as any);
                                pd.price = pd.price ?? 0
                                const a =dd.orderData.config
                                dd.config.customer_address=a.customer_address
                                dd.config.customer_phone=a.customer_phone
                                dd.config.customer_email=a.customer_email
                                dd.config.customer_name=a.customer_name
                                dd.config.payment_status = dd.config.payment_status ?? 'notPay'
                                const array = [{
                                    key: '●',
                                    value: `<input type="checkbox" class="form-check-input batchDel" onchange="${gvc.event((e, event)=>{
                                    if(e.checked){
                                        ErpConfig.selectOrder.push(dd)
                                    }else{
                                        ErpConfig.selectOrder=ErpConfig.selectOrder.filter((d2)=>{
                                            return dd.id !== d2.id
                                        })
                                    }
                                 
                                        e.stopPropagation()
                                    })}" onclick="${gvc.event((e, event)=>{
                                        event.stopPropagation()
                                    })}">`
                                },{
                                    key: 'QRCODE',
                                    value: gvc.bindView(() => {
                                        const id = gvc.glitter.getUUID()
                                        const visible = gvc.glitter.getUUID()
                                        return {
                                            bind: id,
                                            view: () => {
                                                return `<div class="d-none" id="${gvc.id(visible)}"></div>`
                                            },
                                            divCreate: {
                                                elem: `div`,
                                                style: ``,
                                                class: ` d-flex align-items-center justify-content-center`
                                            },
                                            onCreate: () => {
                                                gvc.glitter.addMtScript([
                                                    {src: new URL('../lib/qrcode.js', import.meta.url)}
                                                ], () => {
                                                    let url = new URL(location.href)
                                                    url.searchParams.set('page', 'redirectToForm')
                                                    url.searchParams.set('token', dd.token)
                                                    new (window as any).QRCode(document.getElementById(gvc.id(id)), {
                                                        text: url.href,
                                                        width: 45,
                                                        height: 45,
                                                    });
                                                    new (window as any).QRCode(document.getElementById(gvc.id(visible)), {
                                                        text: url.href,
                                                        width: 512,
                                                        height: 512,
                                                    });
                                                    $(`#${gvc.id(id)} img`).click((event) => {
                                                        glitter.openDiaLog(new URL('../dialog/image-preview.js', import.meta.url), 'preview',
                                                            $(`#${gvc.id(visible)} img`).attr('src'))
                                                        event.stopPropagation()
                                                    })
                                                }, () => {
                                                })

                                            }
                                        }
                                    })
                                }, {
                                    key: '訂單狀態',
                                    value: `<div class="badge  ${(() => {
                                        switch (dd.config.order_status) {
                                            case 'out_of_ship':
                                            case 'waitOut':
                                                return `bg-primary`
                                            case 'waitcartoget':
                                            case 'on_progress':
                                            case 'car_error':
                                            case 'to-shipp':
                                            case 'ship_passcheck':
                                            case 'to_stored':
                                            case 'f_14':
                                                return `bg-dark text-black`
                                            case 'arrived':
                                                return `bg-success text-black`
                                            case 'Shipped':
                                                return `bg-primary `
                                            default :
                                                return `bg-danger`
                                        }
                                    })()} fs-4" >${(orderStatus.find((d2) => {
                                        return d2.value === dd.config.order_status
                                    }) ?? {name: '異常訂單'}).name}</div>`
                                },
                                    {
                                        key: '[出貨/拆櫃]', value: (() => {
                                            const index = ['f_14', 'f_14_30', 'f_31_60'].indexOf(dd.config.order_status)
                                            if (index !== -1) {
                                                const startDate = (window as any).moment();
                                                const endDate = (window as any).moment(dd.config.deadLine).format('YYYY-MM-DD');
                                                const min = (window as any).moment(endDate).diff(startDate, 'day')
                                                if (min > 0) {
                                                    return `<span style="color:orange;">剩餘${min}天</span>`
                                                } else {
                                                    return `<span style="color:red;">已逾時</span>`
                                                }

                                            }
                                            if (['waitOut', 'needCheck'].indexOf(dd.config.order_status) !== -1) {
                                                return `<span>尚未開始</span>`
                                            } else {
                                                if (dd.config.order_status === 'to-shipp') {
                                                    const startDate = (window as any).moment();
                                                    const endDate = (window as any).moment(dd.config.unpack_date).format('YYYY-MM-DD');
                                                    const min = (window as any).moment(endDate).diff(startDate, 'day')
                                                    if (min >= 0) {
                                                        return `<span style="color:orange;">剩餘${min}天</span>`
                                                    } else {
                                                        return `<span style="color:red;">已逾時</span>`
                                                    }
                                                } else {
                                                    return `<span>已結束</span>`
                                                }

                                            }

                                        })()
                                    },
                                    {key: '訂單編號', value: dd.orderID},
                                    {key: 'SKU', value: dd.config.sku},
                                    {key: '訂單總額', value: parseInt(dd.config.quantity, 10) * pd.price},
                                    {key: '建立日期', value: dd.created_at.replace('T', " ").replace('.000Z', '')}]
                                if (['1', '0', '2', '6', '8', '9'].indexOf(`${ErpConfig.role}`) !== -1) {
                                    array.splice(3, 0, {
                                        key: '供應/請款狀態',
                                        value: `<div class="badge ${(() => {
                                            switch (dd.config.payment_status) {
                                                case 'notPay':
                                                    return `bg-dark text-black`
                                                case 'pay':
                                                    return `bg-success text-black`
                                                case 'needCheck':
                                                    return `bg-danger`
                                                case 'needPay':
                                                    return `bg-warring`
                                                default :
                                                    return `bg-danger`
                                            }
                                        })()} fs-4">${(payment_status.find((d2) => {
                                            return d2.value === dd.config.payment_status
                                        }) ?? {name: '異常單據'}).name}</div>`
                                    });
                                }
                                if (['1', '0',  '6', '3'].indexOf(`${ErpConfig.role}`) !== -1) {
                                    array.splice(4, 0, {
                                        key: '海運/請款狀態',
                                        value: `<div class="badge ${(() => {
                                            dd.config.payment_status2=dd.config.payment_status2??'notPay'
                                            switch (dd.config.payment_status2) {
                                                case 'notPay':
                                                    return `bg-dark text-black`
                                                case 'pay':
                                                    return `bg-success text-black`
                                                case 'needCheck':
                                                    return `bg-danger`
                                                case 'needPay':
                                                    return `bg-warring`
                                                default :
                                                    return `bg-danger`
                                            }
                                        })()} fs-4">${(payment_status.find((d2) => {
                                            return d2.value === dd.config.payment_status2
                                        }) ?? {name: '未付款'}).name}</div>`
                                    });
                                }
                                return array
                            });
                            subData.editData = d2.response.data.filter((dd: any) => {
                                try {
                                    dd.config.id = dd.id
                                    if (dd.product) {

                                        Object.keys(dd.product).map((d2) => {
                                            if (d2 !== 'id') {
                                                dd.config[d2] = dd.product[d2]
                                            }
                                        })
                                    }
                                    dd.config.carbadge = parseInt(dd.config.quantity, 10) * dd.product.price
                                    dd.config.totalMoney = parseInt(dd.config.shipping_value, 10) + dd.config.carbadge
                                    dd.config.token = dd.token
                                    dd.config['orderID'] = dd.orderID
                                    dd.config['order_date'] = dd.created_at.replace('T', " ").replace('.000Z', '')
                                    return true
                                } catch (e) {
                                    return false
                                }
                            })
                            subData.editData = subData.editData.map((dd: any) => {
                                dd.config.vendorName = dd.vendor.userData.name
                                dd.config.vendorCompanyName = dd.vendor.userData.companyName
                                dd.config.vendorEmail = dd.vendor.userData.email
                                dd.config.vendorNote = dd.vendor.userData.note
                                dd.config.vendorCompanyID = dd.vendor.userData.companyID
                                dd.config.clickEvent = () => {
                                    glitter.setUrlParameter('token', dd.token)
                                }
                                return dd.config
                            })
                            subData.pageSize = Math.floor(d2.response.total / object.limit)
                            subData.callback(subData.data)

                        } else {
                            shareDialog.errorMessage({text: "認證失敗"})
                        }
                    })
                }
            }
        }
    },
    setAuth: {
        title: 'ERP-設定可視權限',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    object.role = object.role ?? []
                    return Editor.arrayItem({
                        originalArray: object.role,
                        gvc: gvc,
                        title: '區塊內容',
                        array: object.role.map((dd: any, index: number) => {
                            return {
                                title: `用戶:${index + 1}`,
                                expand: dd,
                                innerHtml: [
                                    Editor.select({
                                        title: "設定可視群組",
                                        gvc: gvc,
                                        def: dd.role,
                                        array: ErpConfig.roleList.map((dd) => {
                                            return {
                                                title: dd.name, value: dd.code
                                            }
                                        }),
                                        callback: (text) => {
                                            dd.role = text
                                        }
                                    })
                                ].join(''),
                                minus: gvc.event(() => {
                                    object.role.splice(index, 1);
                                    widget.refreshComponent();
                                }),
                            };
                        }),
                        expand: object,
                        plus: {
                            title: '添加用戶',
                            event: gvc.event(() => {
                                object.role.push({
                                    role: ErpConfig.roleList[0].code
                                });
                                widget.refreshComponent();
                            }),
                        },
                        refreshComponent: () => {
                            widget.refreshComponent();
                        }
                    })
                },
                event: () => {
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/user`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                    }).then((d2) => {

                        if (d2.result && object.role.map((dd: any) => {
                            return dd.role.indexOf(`${d2.response.result[0].role}`) !== -1
                        })) {

                        } else {
                            gvc.glitter.setUrlParameter('page', '')
                            if ((window.parent as any).editerData === undefined) {
                                location.reload()
                            }

                        }
                    })
                }
            }
        }
    },
    toPay: {
        title: 'ERP-申請撥款',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    const dialog = new ShareDialog(glitter as any);
                    if (subData.payment_status !== 'notPay') {
                        dialog.errorMessage({text: '已申請，請稍候審核'})
                        return;
                    }
                    if (!subData.shipping_value) {
                        dialog.errorMessage({text: '請輸入木架費與運費'})
                        return;
                    }
                    if (subData.order_status == 'waitOut') {
                        dialog.errorMessage({text: '請回壓訂單狀態'})
                        return;
                    }
                    if (['Shipped', 'nostore'].indexOf(subData.order_status) !== -1) {
                        dialog.errorMessage({text: '商品已出貨或停產不得申請請款'})
                        return;
                    }
                    subData.payment_status = 'needCheck'
                    subData.log = undefined;
                    const shareDialog = new ShareDialog(gvc.glitter);
                    shareDialog.dataLoading({visible: true});
                    const index = ['f_14', 'f_14_30', 'f_31_60'].indexOf(subData.order_status)
                    if (index !== -1) {
                        subData.deadLine = (window as any).moment().add([14, 30, 60][index], "days").format('YYYY-MM-DD HH:mm:ss');
                    }

                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/order/shippingState`,
                        "type": "PUT",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data: JSON.stringify({
                            shipping_state_token: subData.token,
                            data: subData
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            if (d2.response.result) {
                                location.reload()
                                shareDialog.successMessage({text: "新增成功"})
                                subData.callback()
                            } else {
                                shareDialog.errorMessage({text: d2.response.message})
                            }
                        } else {
                            shareDialog.errorMessage({text: "設定失敗"})
                        }
                    })
                }
            }
        }
    },
    goShippmentState: {
        title: 'ERP-進行出貨',
        fun: (gvc, widget, object, subData) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter);
                    if (subData.order_status === 'Shipped') {
                        if (subData.payment_status !== 'pay') {
                            shareDialog.errorMessage({text: "請先等待撥款完成"})
                            return
                        }
                        if (!subData['package_list'] || subData['package_list'].find((dd: any) => {
                            return (!dd.size_h) || (!dd.size_l) || (!dd.size_w) || (!dd.waybill_number)
                        })) {
                            shareDialog.errorMessage({text: "請確實填寫完包建項目"})
                            return;
                        }
                        for (const a of ['package', 'assembly', 'countdown']) {

                            if ((subData[a] === '') || (subData[a] === undefined)) {

                                shareDialog.errorMessage({text: "請確實填寫完出貨項目"})
                                return;
                            }
                        }
                        if ((subData.outside_photo ?? []).length < 2) {
                            shareDialog.errorMessage({text: "請上傳至少兩張外箱照片"})
                            return;
                        }
                    } else if (subData.order_status === 'waitOut') {
                        shareDialog.errorMessage({text: "請回壓訂單狀態!"})
                        return;
                    }
                    if (!subData.nostored_license && (subData.order_status === 'discontinued')) {
                        shareDialog.errorMessage({text: "停產需上傳證明文件!"})
                        return;
                    }
                    subData.log = undefined;
                    shareDialog.dataLoading({visible: true});
                    const index = ['f_14', 'f_14_30', 'f_31_60'].indexOf(subData.order_status)
                    if (index !== -1) {
                        subData.deadLine = (window as any).moment().add([14, 30, 60][index], "days").format('YYYY-MM-DD HH:mm:ss');
                    }

                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/order/shippingState`,
                        "type": "PUT",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data: JSON.stringify({
                            shipping_state_token: subData.token,
                            data: subData
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            if (d2.response.result) {
                                if (subData.order_status === 'Shipped') {

                                    shareDialog.successMessage({
                                        text: "請將QRCODE貼上外箱完成出貨．", callback: () => {
                                            gvc.glitter.addMtScript([
                                                {src: new URL('../lib/qrcode.js', import.meta.url)}
                                            ], () => {
                                                $('#qrcodeGenerater').remove()
                                                $('body').append('<div id="qrcodeGenerater" class="d-none"></div>')
                                                let url = new URL(location.href)
                                                url.searchParams.set('page', 'redirectToForm')
                                                url.searchParams.set('token', subData.token)
                                                new (window as any).QRCode(document.getElementById('qrcodeGenerater'), {
                                                    text: url.href,
                                                    width: 512,
                                                    height: 512,
                                                });
                                                setTimeout(() => {
                                                    gvc.glitter.openDiaLog(new URL('../dialog/image-preview.js', import.meta.url).href, 'preview',
                                                        $(`#qrcodeGenerater img`).attr('src'))
                                                }, 500)

                                            }, () => {
                                            })
                                        }
                                    })

                                } else {
                                    shareDialog.successMessage({text: "設定成功"})
                                }
                                subData.callback()
                            } else {
                                shareDialog.errorMessage({text: d2.response.message})
                            }
                        } else {
                            shareDialog.errorMessage({text: "設定失敗"})
                        }
                    })
                }
            }
        }
    },
    goShippmentState2: {
        title: 'ERP-海關審核',
        fun: (gvc, widget, object, subData) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter);
                    if (subData.order_status === 'Shipped') {
                        shareDialog.errorMessage({text: "請回壓檢核結果!"})
                        return;
                    }
                    if ((subData.actual_photo_ship ?? []).length < 2) {
                        shareDialog.errorMessage({text: "請上傳至少兩張外箱照片"})
                        return;
                    }
                    if (subData.order_status === 'to-shipp') {
                        for (const a of ['pack_date', 'unpack_date', 'box_number', 'cuft', 'box_price']) {
                            if ((subData[a] === '') || (subData[a] === undefined)) {
                                shareDialog.errorMessage({text: "請確實填寫完裝櫃明細"})
                                return;
                            }
                        }
                    }


                    subData.log = undefined;
                    shareDialog.dataLoading({visible: true});

                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/order/shippingState`,
                        "type": "PUT",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data: JSON.stringify({
                            shipping_state_token: subData.token,
                            data: subData
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            if (d2.response.result) {
                                shareDialog.successMessage({text: "設定成功"})
                                subData.callback()
                            } else {
                                shareDialog.errorMessage({text: d2.response.message})
                            }
                        } else {
                            shareDialog.errorMessage({text: "設定失敗"})
                        }
                    })
                }
            }
        }
    },
    goShippmentState3: {
        title: 'ERP-倉儲審核',
        fun: (gvc, widget, object, subData) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter);
                    if (subData.order_status === 'ship_passcheck') {
                        shareDialog.errorMessage({text: "請回壓檢核結果!"})
                        return;
                    }
                    if ((subData.actual_photo_stored ?? []).length < 2) {
                        shareDialog.errorMessage({text: "請上傳至少兩張外箱照片"})
                        return;
                    }
                    subData.log = undefined;
                    shareDialog.dataLoading({visible: true});
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/order/shippingState`,
                        "type": "PUT",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data: JSON.stringify({
                            shipping_state_token: subData.token,
                            data: subData
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            if (d2.response.result) {
                                shareDialog.successMessage({text: "設定成功"})
                                subData.callback()
                            } else {
                                shareDialog.errorMessage({text: d2.response.message})
                            }
                        } else {
                            shareDialog.errorMessage({text: "設定失敗"})
                        }
                    })
                }
            }
        }
    },
    goShippmentState4: {
        title: 'ERP-物流審核',
        fun: (gvc, widget, object, subData) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    const shareDialog = new ShareDialog(gvc.glitter);
                    if ((subData.car_image ?? []).length < 2) {
                        shareDialog.errorMessage({text: "請上傳至少兩張外箱照片"})
                        return;
                    }
                    subData.log = undefined;
                    shareDialog.dataLoading({visible: true});
                    BaseApi.create({
                        "url": ErpConfig.api + `/api/v1/order/shippingState`,
                        "type": "PUT",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": ErpConfig.getToken()
                        },
                        data: JSON.stringify({
                            shipping_state_token: subData.token,
                            data: subData
                        })
                    }).then((d2) => {
                        shareDialog.dataLoading({visible: false})
                        if (d2.result) {
                            if (d2.response.result) {
                                shareDialog.successMessage({text: "設定成功"})
                                subData.callback()
                            } else {
                                shareDialog.errorMessage({text: d2.response.message})
                            }
                        } else {
                            shareDialog.errorMessage({text: "設定失敗"})
                        }
                    })
                }
            }
        }
    },
    toForm: {
        title: 'ERP-取得出貨表單資料',
        fun: (gvc, widget, object, subData) => {
            object.triggerEvent = object.triggerEvent ?? []
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    if (gvc.glitter.getUrlParameter('token') !== undefined) {
                        const shareDialog = new ShareDialog(gvc.glitter)
                        BaseApi.create({
                            "url": ErpConfig.api + `/api/v1/order/shippingState?token=${gvc.glitter.getUrlParameter('token')}`,
                            "type": "GET",
                            "timeout": 0,
                            "headers": {
                                "Content-Type": "application/json",
                                "Authorization": ErpConfig.getToken()
                            },
                        }).then((d2) => {
                            if (d2.result) {
                                subData.editData = d2.response.data.filter((dd: any) => {
                                    try {
                                        dd.config.id = dd.id
                                        if (dd.product) {

                                            Object.keys(dd.product).map((d2) => {
                                                if (d2 !== 'id') {
                                                    dd.config[d2] = dd.product[d2]
                                                }
                                            })
                                        }
                                        const a =dd.orderData.config
                                        dd.config.customer_address=a.customer_address
                                        dd.config.customer_phone=a.customer_phone
                                        dd.config.customer_email=a.customer_email
                                        dd.config.customer_name=a.customer_name
                                        dd.config.carbadge = parseInt(dd.config.quantity, 10) * dd.product.price
                                        dd.config.totalMoney = parseInt(dd.config.shipping_value, 10) + dd.config.carbadge
                                        dd.config.token = dd.token
                                        dd.config['orderID'] = dd.orderID
                                        dd.config['order_date'] = dd.created_at.replace('T', " ").replace('.000Z', '')
                                        return true
                                    } catch (e) {
                                        return false
                                    }
                                })
                                subData.editData = subData.editData.map((dd: any) => {
                                    dd.config.vendorName = dd.vendor.userData.name
                                    dd.config.vendorCompanyName = dd.vendor.userData.companyName
                                    dd.config.vendorEmail = dd.vendor.userData.email
                                    dd.config.vendorNote = dd.vendor.userData.note
                                    dd.config.vendorCompanyID = dd.vendor.userData.companyID
                                    return dd.config
                                })
                                subData.callback(subData.editData[0])
                            } else {
                                shareDialog.errorMessage({text: "認證失敗"})
                            }
                        })
                    } else {
                        subData.callback()
                    }

                    return ``
                }
            }
        }
    },
    setShippmentType: {
        title: 'ERP-設定訂單來源',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    glitter.setUrlParameter("jsonQuery", element?.e.value)
                    gvc.recreateView()
                }
            }
        }
    },
    getShipmentListTitle: {
        title: 'ERP-取得訂單列表標題',
        fun: (gvc, widget, object, subData, element) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    return ``
                },
                event: () => {

                    return `出貨列表${(() => {
                        switch (gvc.glitter.getUrlParameter('jsonQuery')) {
                            case 'order_status=cancel':
                                return `->訂單已取消`
                            case 'order_status=Shipped':
                                return `->供應商-已出貨`
                            case 'order_status=out_of_ship':
                                return `->海運-已下櫃`
                            case 'order_status=wait':
                                return `->後勤-待客服確認`
                            case 'order_status=on_progress':
                                return `->物流-配送中`
                            case 'order_status=arrived':
                                return `->物流-配送完成`
                            case 'order_status=car_error':
                                return `->物流-配送異常`
                            case 'payment_status=pay':
                                return `->供應商-已付款`
                            case 'payment_status=notPay':
                                return `->供應商-未付款`
                            default:
                                return ``
                        }
                    })()}`
                }
            }
        }
    },
    logout: {
        title: 'ERP-登出',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    ErpConfig.setToken('')
                    location.reload()
                }
            }
        }
    },
    mutilipleSelect: {
        title: 'ERP-多選元件',
        fun: (gvc, widget, object, subData) => {
            const glitter = (window as any).glitter
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    return new Promise((resolve, reject)=>{
                        if(`${ErpConfig.role}`==='3'){
                            resolve(`<button class="btn btn-primary" onclick="${gvc.event((e,event)=>{
                                async function exe(){
                                    const shareDialog = new ShareDialog(gvc.glitter)
                                    shareDialog.dataLoading({visible: false})
                                    
                                    for (const subData of ErpConfig.selectOrder){
                                        for (const a of ['pack_date', 'unpack_date', 'box_number', 'cuft', 'box_price']) {
                                            if ((subData.config[a] === '') || (subData.config[a] === undefined)) {
                                                shareDialog.errorMessage({text: "請確實填寫完裝櫃明細"})
                                                return;
                                            }
                                        }
                                        if ((subData.config.actual_photo_ship ?? []).length < 2) {
                                            shareDialog.errorMessage({text: "請上傳至少兩張外箱照片"})
                                            return;
                                        }
                                    }
                                   
                                    for (const a of ErpConfig.selectOrder){
                                    
                                        const result=await (new Promise((resolve, reject)=>{
                                            a.config.order_status='to-shipp'
                                            a.config.log=undefined
                                            BaseApi.create({
                                                "url": ErpConfig.api + `/api/v1/order/shippingState`,
                                                "type": "PUT",
                                                "timeout": 0,
                                                "headers": {
                                                    "Content-Type": "application/json",
                                                    "Authorization": ErpConfig.getToken()
                                                },
                                                data: JSON.stringify({
                                                    shipping_state_token: a.token,
                                                    data: a.config
                                                })
                                            }).then((d2) => {
                                                if (d2.result) {
                                                    resolve(true)
                                                } else {
                                                    resolve(false)
                                                }
                                            })
                                        }))
                                        if(!result){
                                            shareDialog.dataLoading({visible: false})
                                            shareDialog.errorMessage({text:"更新異常!"})
                                            return
                                        }
                                    }
                                    shareDialog.dataLoading({visible: false})
                                    shareDialog.successMessage({text:"更新成功!"})
                                    location.reload()
                                }
                                exe()
                            })}">批量上櫃</button>`)
                        }else{
                            resolve(``)
                        }

                    })
                }
            }
        }
    },
})