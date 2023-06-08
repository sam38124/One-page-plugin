import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
import { Api } from './api/homee-api.js';
import { User } from "../api/user.js";
import { Dialog } from "../dialog/dialog-mobile.js";
import { Checkout } from "../api/checkout.js";
import { appConfig } from "../../config.js";
import { Funnel } from "../../glitterBundle/funnel.js";
import { BaseApi } from "../../api/base.js";
import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
const machiDomain = 'https://machi-app.com/';
class GlobalData {
    static data = {
        pageList: [],
        isRunning: false,
        run: () => {
            if (GlobalData.data.isRunning) {
                return;
            }
            GlobalData.data.isRunning = true;
            const saasConfig = window.saasConfig;
            saasConfig.api.getPage(saasConfig.config.appName).then((data) => {
                if (data.result) {
                    GlobalData.data.pageList = data.response.result.map((dd) => {
                        dd.page_config = dd.page_config ?? {};
                        return dd;
                    });
                }
                else {
                    GlobalData.data.isRunning = false;
                    GlobalData.data.run();
                }
            });
        },
    };
}
TriggerEvent.create(import.meta.url, {
    link: {
        title: "連結跳轉",
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return gvc.glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: "連結跳轉",
                        default: object.link,
                        placeHolder: "輸入跳轉的連結",
                        callback: (text) => {
                            object.link = text;
                            widget.refreshAll();
                        }
                    });
                },
                event: () => {
                    gvc.glitter.runJsInterFace("openWeb", {
                        url: object.link
                    }, (data) => {
                    }, {
                        webFunction(data, callback) {
                            gvc.glitter.openNewTab(object.link);
                        }
                    });
                }
            };
        }
    },
    pageSwitchNeedLogin: {
        title: "頁面跳轉-需要登入",
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    const vm = {
                        loading: true,
                        data: []
                    };
                    const id = gvc.glitter.getUUID();
                    const api = new Api();
                    object.selectPage = object.selectPage ?? {};
                    api.homeeAJAX({
                        api: Api.serverURL,
                        route: '/api/v1/lowCode/pageConfig?query=tag,`group`,name',
                        method: 'get'
                    }, (res) => {
                        vm.data = res.result;
                        vm.loading = false;
                        gvc.notifyDataChange(id);
                    });
                    return `
                    <h3 class="m-0 mb-2 mt-2" style="font-size: 16px;">選擇頁面</h3>
                    ${gvc.bindView(() => {
                        return {
                            bind: id,
                            view: () => {
                                if (vm.loading) {
                                    return `<option value='${JSON.stringify(object.selectPage)}'>${object.selectPage.name ?? "尚未選擇"}</option>`;
                                }
                                let haveData = false;
                                return gvc.map(vm.data.map((dd) => {
                                    haveData = haveData || object.selectPage.tag === dd.tag;
                                    return `<option value='${JSON.stringify(dd)}' ${(object.selectPage.tag === dd.tag) ? `selected` : ``}>${dd.name}</option>`;
                                })) + ((haveData) ? `` : `<option selected>尚未定義</option>`);
                            },
                            divCreate: {
                                class: `form-control`, elem: `select`, option: [
                                    {
                                        key: 'onChange',
                                        value: gvc.event((e, event) => {
                                            object.selectPage = JSON.parse(e.value);
                                            widget.refreshAll();
                                        })
                                    }
                                ]
                            }
                        };
                    })}
                    `;
                },
                event: () => {
                    appConfig().getUserData({
                        callback: (userData) => {
                            try {
                                const dialog = new Dialog(gvc);
                                dialog.dataLoading(true);
                                if (userData.token) {
                                    User.checkToken(userData.token, (response) => {
                                        if (response) {
                                            dialog.dataLoading(false);
                                            appConfig().changePage(gvc, object.selectPage.tag);
                                        }
                                        else {
                                            User.login({
                                                account: userData.email,
                                                pwd: userData.pwd,
                                                callback: (response) => {
                                                    dialog.dataLoading(false);
                                                    if (response) {
                                                        appConfig().changePage(gvc, object.selectPage.tag);
                                                    }
                                                    else {
                                                        appConfig().setHome(gvc, "login");
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                                else {
                                    appConfig().setHome(gvc, "login");
                                }
                            }
                            catch (e) {
                                appConfig().setHome(gvc, "login");
                            }
                        }
                    });
                }
            };
        }
    },
    setHome: {
        title: "首頁設定",
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    const vm = {
                        loading: true,
                        data: []
                    };
                    const id = gvc.glitter.getUUID();
                    const api = new Api();
                    object.selectPage = object.selectPage ?? {};
                    const saasConfig = window.saasConfig;
                    saasConfig.api.getPage(saasConfig.config.appName).then((res) => {
                        vm.data = res['response']['result'];
                        vm.loading = false;
                        gvc.notifyDataChange(id);
                    });
                    return `
<h3 class="m-0 mb-2 mt-2" style="font-size: 16px;">選擇頁面</h3>
${gvc.bindView(() => {
                        return {
                            bind: id,
                            view: () => {
                                if (vm.loading) {
                                    return `<option value='${JSON.stringify(object.selectPage)}'>${object.selectPage.name ?? "尚未選擇"}</option>`;
                                }
                                let haveData = false;
                                return gvc.map(vm.data.map((dd) => {
                                    haveData = haveData || object.selectPage.tag === dd.tag;
                                    return `<option value='${JSON.stringify(dd)}' ${(object.selectPage.tag === dd.tag) ? `selected` : ``}>${dd.name}</option>`;
                                })) + ((haveData) ? `` : `<option selected>尚未定義</option>`);
                            },
                            divCreate: {
                                class: `form-control`, elem: `select`, option: [
                                    {
                                        key: 'onChange',
                                        value: gvc.event((e, event) => {
                                            object.selectPage = JSON.parse(e.value);
                                            widget.refreshAll();
                                        })
                                    }
                                ]
                            }
                        };
                    })}
`;
                },
                event: () => {
                    appConfig().setHome(gvc, object.selectPage.tag);
                }
            };
        }
    },
    setHomeNeedLogin: {
        title: "首頁設定-需要登入",
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    const vm = {
                        loading: true,
                        data: []
                    };
                    const id = gvc.glitter.getUUID();
                    const api = new Api();
                    object.selectPage = object.selectPage ?? {};
                    api.homeeAJAX({
                        api: Api.serverURL,
                        route: '/api/v1/lowCode/pageConfig?query=tag,`group`,name',
                        method: 'get'
                    }, (res) => {
                        vm.data = res.result;
                        vm.loading = false;
                        gvc.notifyDataChange(id);
                    });
                    return `
<h3 class="m-0 mb-2 mt-2" style="font-size: 16px;">選擇頁面</h3>
${gvc.bindView(() => {
                        return {
                            bind: id,
                            view: () => {
                                if (vm.loading) {
                                    return `<option value='${JSON.stringify(object.selectPage)}'>${object.selectPage.name ?? "尚未選擇"}</option>`;
                                }
                                let haveData = false;
                                return gvc.map(vm.data.map((dd) => {
                                    haveData = haveData || object.selectPage.tag === dd.tag;
                                    return `<option value='${JSON.stringify(dd)}' ${(object.selectPage.tag === dd.tag) ? `selected` : ``}>${dd.name}</option>`;
                                })) + ((haveData) ? `` : `<option selected>尚未定義</option>`);
                            },
                            divCreate: {
                                class: `form-control`, elem: `select`, option: [
                                    {
                                        key: 'onChange',
                                        value: gvc.event((e, event) => {
                                            object.selectPage = JSON.parse(e.value);
                                            widget.refreshAll();
                                        })
                                    }
                                ]
                            }
                        };
                    })}
`;
                },
                event: () => {
                    appConfig().getUserData({
                        callback: (userData) => {
                            try {
                                const dialog = new Dialog(gvc);
                                dialog.dataLoading(true);
                                if (userData.token) {
                                    User.checkToken(userData.token, (response) => {
                                        if (response) {
                                            dialog.dataLoading(false);
                                            appConfig().setHome(gvc, object.selectPage.tag);
                                        }
                                        else {
                                            User.login({
                                                account: userData.email,
                                                pwd: userData.pwd,
                                                callback: (response) => {
                                                    dialog.dataLoading(false);
                                                    if (response) {
                                                        appConfig().setHome(gvc, object.selectPage.tag);
                                                    }
                                                    else {
                                                        appConfig().setHome(gvc, "login");
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                                else {
                                    appConfig().setHome(gvc, "login");
                                }
                            }
                            catch (e) {
                                appConfig().setHome(gvc, "login");
                            }
                        }
                    });
                }
            };
        }
    },
    category: {
        title: "商品分類",
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    const api = new Api();
                    function getInput(object) {
                        return gvc.bindView(() => {
                            const id = gvc.glitter.getUUID();
                            const vm = {
                                loading: true,
                                colOption: ''
                            };
                            function load() {
                                function lo() {
                                    gvc.glitter.share.storeCollection.map((x) => {
                                        vm.colOption += `
                                        <option value='${JSON.stringify({
                                            id: x.id,
                                            name: x.name
                                        })}' ${x.name == object.name ? `selected=""` : ``}>
                                             ${x.name} 
                                        </option>
                                    `;
                                        x.group.map((y) => (vm.colOption += ` <option
                                                value='${JSON.stringify({
                                            id: y.id,
                                            name: y.name
                                        })}'
                                                ${y.name == object.name ? `selected=""` : ``}
                                            >
                                                ${y.name}
                                            </option>`));
                                    });
                                    gvc.notifyDataChange(id);
                                }
                                if (gvc.glitter.share.storeCollection) {
                                    lo();
                                }
                                api.homeeAJAX({ route: '/collection', method: 'get' }, (res) => {
                                    gvc.glitter.share.storeCollection = res;
                                    lo();
                                });
                            }
                            load();
                            return {
                                bind: id,
                                view: () => {
                                    return `
                            <select
                                class="form-select flex-fill"
                                onchange="${gvc.event((e) => {
                                        const val = JSON.parse(e.value);
                                        object.value = val.id;
                                        object.name = val.name;
                                        widget.refreshAll();
                                    })}"
                            >
                               ${(vm.colOption === '') ? `<option>${object.name ?? "請稍候..."}</option>` : vm.colOption}
                            </select>

`;
                                },
                                divCreate: { class: `flex-fill` }
                            };
                        });
                    }
                    return `
<div class="alert alert-dark mt-2">
<h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">大分類</h3>
                    ${getInput(object)}
                    <h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">跳轉後的子分類首頁</h3>
                    <select
                        class="form-select flex-fill"
                        onchange="${gvc.event((e) => {
                        const val = JSON.parse(e.value);
                        object.selectIndex = val;
                        widget.refreshAll();
                    })}">
                    ${(() => {
                        let returnHTML = `
                            
                        `;
                        if (object.subCategory) {
                            object.subCategory.forEach((data, index) => {
                                let select = (index == object.selectIndex) ? "selected" : "";
                                returnHTML += `
                                <option value="${index}" ${select}>${data.appearText ?? data.name}</option>
                            `;
                            });
                        }
                        return returnHTML;
                    })()}
                    </select>
                    <h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">子分類</h3>
                    
                    ${gvc.map((object.subCategory ?? []).map((dd, index) => {
                        return `<div class="mb-3 d-flex align-items-center w-100"><i class="fa-regular fa-circle-minus text-danger me-2" style="font-size: 20px;cursor: pointer;" onclick="${gvc.event(() => {
                            object.subCategory.splice(index, 1);
                            widget.refreshAll();
                        })}"></i>${getInput(dd)}</div>`;
                    }))}
                 <div class="text-white align-items-center justify-content-center d-flex p-1 rounded mt-3" style="border: 2px dashed white;" onclick="${gvc.event(() => {
                        object.subCategory = object.subCategory ?? [];
                        object.subCategory.push({});
                        widget.refreshAll();
                    })}">添加子分類</div>   
</div>
                    
                    `;
                },
                event: () => {
                    appConfig().changePage(gvc, "sub_category", {
                        title: object.name,
                        object: object,
                        category: "sub_category_id",
                        selectIndex: object?.selectIndex ?? 0
                    });
                }
            };
        }
    },
    toProductDetail: {
        title: "商品詳情",
        fun: (gvc, widget, obj) => {
            const api = new Api();
            return {
                editor: () => {
                    const funnel = new Funnel(gvc);
                    return funnel.optionSreach({
                        path: Api.serverURL + '/api/v1/product?product_name=',
                        key: 'name',
                        def: (obj.data ?? {}).name ?? "",
                    }, (res) => {
                        let apiData = {
                            "total_count": 7,
                            "product_list": [
                                {
                                    "id": 8133741674796,
                                    "name": "（限量現貨搶購中）FORLI 岩板餐桌, D型腳座, 140*80 公分, 馬肚型",
                                    "images": [
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50372935.jpg?v=1675362731"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50246608.jpg?v=1675362732"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50246597.jpg?v=1675362732"
                                        }
                                    ],
                                    "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50372935.jpg?v=1675362731&width=720",
                                    "sale_price": 12290,
                                    "price": 16800,
                                    "showUp": false,
                                    "quantity": 1
                                },
                                {
                                    "id": 8138815668524,
                                    "name": "FORLI 岩板餐桌",
                                    "images": [
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/files/A49.jpg?v=1683040400"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/25490065_6411fe56-7dd4-4108-98e3-1f9fdb95fba6.jpg?v=1683121170"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/17799164_eecfb3fb-841e-4deb-8a3b-1caccd6e1dee.jpg?v=1683121170"
                                        }
                                    ],
                                    "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/files/A49.jpg?v=1683040400&width=720",
                                    "sale_price": 6900,
                                    "price": 27000,
                                    "showUp": true,
                                    "quantity": 1
                                },
                                {
                                    "id": 8139694145836,
                                    "name": "（限量現貨搶購中）FORLI 岩板餐桌, A型腳座, 140*80 公分, 馬肚形",
                                    "images": [
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_1cee277e-4be6-4f52-83ab-3c74f1daa661.jpg?v=1675689090"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50374060.jpg?v=1675689090"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50374061.jpg?v=1675689090"
                                        }
                                    ],
                                    "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_1cee277e-4be6-4f52-83ab-3c74f1daa661.jpg?v=1675689090&width=720",
                                    "sale_price": 8990,
                                    "price": 11400,
                                    "showUp": false,
                                    "quantity": 1
                                },
                                {
                                    "id": 8139707089196,
                                    "name": "（限量現貨搶購中）FIRENZE 漂浮岩板餐桌, FORLI, 160*90 公分, 直邊圓角",
                                    "images": [
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_1b2d1455-2e88-4c5a-b423-9e0fd861d052.jpg?v=1675690539"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50248625.jpg?v=1675690539"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50248626.jpg?v=1675690539"
                                        }
                                    ],
                                    "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_1b2d1455-2e88-4c5a-b423-9e0fd861d052.jpg?v=1675690539&width=720",
                                    "sale_price": 19390,
                                    "price": 24300,
                                    "showUp": false,
                                    "quantity": 1
                                },
                                {
                                    "id": 8217925812524,
                                    "name": "（限量現貨搶購中）FORLI 岩板餐桌, A型腳座, 160*90 公分, 直邊圓角",
                                    "images": [
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_4ee2267c-a15a-4b33-93e8-8c3967e792d1.jpg?v=1679066692"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50374060_cc2ea874-b83f-4d72-aada-21eb8534d898.jpg?v=1679066692"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50374061_09e0ae68-0ab5-428c-a3d5-1d4f8e48744e.jpg?v=1679066692"
                                        }
                                    ],
                                    "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_4ee2267c-a15a-4b33-93e8-8c3967e792d1.jpg?v=1679066692&width=720",
                                    "sale_price": 9490,
                                    "price": 9490,
                                    "showUp": false,
                                    "quantity": 1
                                },
                                {
                                    "id": 8217939083564,
                                    "name": "（限量現貨搶購中）FIRENZE 漂浮岩板餐桌, FORLI, 160*90 公分, 直邊圓角",
                                    "images": [
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_70059521-62c1-411c-8345-599c7ceb36fe.jpg?v=1679066837"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50248625_b9f9d93b-d9d5-4d72-a782-27d80afb2cb4.jpg?v=1679066837"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50248626_19e0196b-2980-4401-8120-98411d985c11.jpg?v=1679066837"
                                        }
                                    ],
                                    "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_70059521-62c1-411c-8345-599c7ceb36fe.jpg?v=1679066837&width=720",
                                    "sale_price": 19390,
                                    "price": 24300,
                                    "showUp": false,
                                    "quantity": 1
                                },
                                {
                                    "id": 8217964118316,
                                    "name": "（限量現貨搶購中）FORLI 岩板餐桌, A型腳座, 160*90 公分, 直邊圓角",
                                    "images": [
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_676d93c8-7ed4-4b43-a94b-01fe6ea4a9dc.jpg?v=1679067545"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50374060_eb8d7c22-91ee-4b6e-87cd-d874fdbf5a6f.jpg?v=1679067545"
                                        },
                                        {
                                            "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/50374061_3ddaea2b-befc-492b-8d63-5ffee1d1acdd.jpg?v=1679067545"
                                        }
                                    ],
                                    "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_676d93c8-7ed4-4b43-a94b-01fe6ea4a9dc.jpg?v=1679067545&width=720",
                                    "sale_price": 9490,
                                    "price": 9490,
                                    "showUp": false,
                                    "quantity": 1
                                }
                            ]
                        };
                        let newApiData = [
                            {
                                "name": "name1",
                                "id": 1,
                                "type": "type1",
                                "updated_at": "2023-05-30 09:57:25",
                                "description": "description1",
                                "created_at": "2023-05-30 09:57:25"
                            },
                            {
                                "name": "name2",
                                "id": 2,
                                "type": "type2",
                                "updated_at": "2023-05-31 05:48:40",
                                "description": "description2",
                                "created_at": "2023-05-31 05:48:40"
                            }
                        ];
                        obj.data = res;
                        widget.refreshAll();
                    });
                },
                event: () => {
                    appConfig().changePage(gvc, "product_show", obj.data);
                }
            };
        }
    },
    goBack: {
        title: "返回上一頁",
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    if (gvc.glitter.pageConfig.length <= 1) {
                        appConfig().setHome(gvc, "home", {});
                    }
                    else {
                        gvc.glitter.goBack();
                    }
                }
            };
        }
    },
    engineer: {
        title: "開發中",
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    new Dialog(gvc).showInfo("開發中...2/26完成!");
                }
            };
        }
    },
    openMyspace: {
        title: '我的空間',
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    gvc.glitter.runJsInterFace("openMyspace", {}, () => {
                    });
                }
            };
        }
    },
    testMode: {
        title: '測試空間',
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    gvc.glitter.runJsInterFace("testMyspace", {}, () => {
                    });
                }
            };
        }
    },
    cartBadge: {
        title: '購物車數量',
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return ``;
                },
                event: () => {
                    gvc.glitter.share.cart = gvc.glitter.share.cart ?? {};
                    gvc.glitter.share.cart.callback = gvc.glitter.share.cart.callback ?? [];
                    function getCount() {
                        let count = 0;
                        Checkout.getCart((cartData) => {
                            Object.keys(cartData).map((key) => {
                                Object.values(cartData[key]).map((d2) => {
                                    count += d2.count;
                                });
                            });
                            object.callback(count);
                        });
                    }
                    gvc.glitter.share.cart.callback.push((() => {
                        getCount();
                    }));
                    getCount();
                }
            };
        }
    },
    setMachi: {
        title: '設定Machi後端撈取路徑',
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return gvc.map([
                        gvc.glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '公司代號',
                            default: object.company ?? "",
                            placeHolder: '公司代號',
                            callback: (text) => {
                                object.company = text;
                                widget.refreshAll();
                            },
                        }), gvc.glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '帳號',
                            default: object.account ?? "",
                            placeHolder: '輸入跳轉的連結',
                            callback: (text) => {
                                object.account = text;
                                widget.refreshAll();
                            },
                        }), gvc.glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '密碼',
                            default: object.pwd ?? "",
                            placeHolder: '輸入跳轉的連結',
                            callback: (text) => {
                                object.pwd = text;
                                widget.refreshAll();
                            },
                        })
                    ]);
                },
                event: () => {
                    return new Promise((resolve, reject) => {
                        BaseApi.create({
                            "url": `${machiDomain}/api/bm/member/login`,
                            "type": "POST",
                            "timeout": 0,
                            headers: { 'Content-Type': 'application/json' },
                            "data": JSON.stringify({
                                "account": object.account,
                                "password": object.pwd,
                                "group_code": object.company
                            })
                        }).then((d2) => {
                            Plugin.setAppConfig('HOMEEAppConfig', {
                                token: d2.response.token
                            });
                            resolve(true);
                        });
                    });
                }
            };
        }
    },
    link2: {
        title: 'Glitter-連結跳轉',
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return gvc.bindView(() => {
                        const id = gvc.glitter.getUUID();
                        function recursive() {
                            if (GlobalData.data.pageList.length === 0) {
                                GlobalData.data.run();
                                setTimeout(() => {
                                    recursive();
                                }, 200);
                            }
                            else {
                                gvc.notifyDataChange(id);
                            }
                        }
                        recursive();
                        return {
                            bind: id,
                            view: () => {
                                object.type = object.type ?? 'inlink';
                                return ` ${Editor.h3('跳轉方式')}
                                    <select
                                        class="form-control form-select"
                                        onchange="${gvc.event((e) => {
                                    object.type = e.value;
                                    gvc.notifyDataChange(id);
                                })}"
                                    >
                                        ${[
                                    { title: '內部連結', value: 'inlink' },
                                    { title: '外部連結', value: 'outlink' },
                                    { title: 'HashTag', value: 'hashTag' },
                                ]
                                    .map((dd) => {
                                    return `<option value="${dd.value}" ${dd.value == object.type ? `selected` : ``}>
                                            ${dd.title}
                                        </option>`;
                                })
                                    .join('')}
                                    </select>
                                    ${(() => {
                                    if (object.type === 'inlink') {
                                        return `<select
                                            class="form-select form-control mt-2"
                                            onchange="${gvc.event((e) => {
                                            console.log(window.$(e).val());
                                            object.link = window.$(e).val();
                                        })}"
                                        >
                                            ${GlobalData.data.pageList.map((dd) => {
                                            object.link = object.link ?? dd.tag;
                                            return `<option value="${dd.tag}" ${object.link === dd.tag ? `selected` : ``}>
                                                    ${dd.group}-${dd.name}
                                                </option>`;
                                        })}
                                        </select>`;
                                    }
                                    else if (object.type === 'outlink') {
                                        return gvc.glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '',
                                            default: object.link,
                                            placeHolder: '輸入跳轉的連結',
                                            callback: (text) => {
                                                object.link = text;
                                                widget.refreshAll();
                                            },
                                        });
                                    }
                                    else {
                                        return gvc.glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '',
                                            default: object.link,
                                            placeHolder: '輸入跳轉的HashTag',
                                            callback: (text) => {
                                                object.link = text;
                                                widget.refreshAll();
                                            },
                                        });
                                    }
                                })()}`;
                            },
                            divCreate: {},
                        };
                    });
                },
                event: () => {
                    if (object.type === 'inlink') {
                        const url = new URL('./', location.href);
                        url.searchParams.set('page', object.link);
                        location.href = url.href;
                    }
                    else if (object.type === 'hashTag') {
                        const yOffset = $("header").length > 0 ? -$("header").height() : 0;
                        const element = document.getElementsByClassName(`glitterTag${object.link}`)[0];
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                    }
                    else {
                        gvc.glitter.runJsInterFace('openWeb', {
                            url: object.link,
                        }, (data) => { }, {
                            webFunction(data, callback) {
                                gvc.glitter.openNewTab(object.link);
                            },
                        });
                    }
                },
            };
        },
    },
    setClient: {
        title: 'SAAS的client設定',
        fun: (gvc, widget, object) => {
            return {
                editor: () => {
                    return gvc.bindView(() => {
                        const id = gvc.glitter.getUUID();
                        return {
                            bind: id,
                            view: () => {
                                object.type = object.type ?? 'client-1';
                                object.value = object.value ?? 'client-1';
                                return ` ${Editor.h3('client選擇')}
                                <select
                                    class="form-control form-select"
                                    onchange="${gvc.event((e) => {
                                    object.type = e.value;
                                    gvc.notifyDataChange(id);
                                })}">
                                ${[
                                    { title: 'client-1', value: 'client-1' },
                                ]
                                    .map((dd) => {
                                    return `<option value="${dd.value}" ${dd.value == object.type ? `selected` : ``}>
                                            ${dd.title}
                                        </option>`;
                                })
                                    .join('')}
                                    </select>
                                    
                                    `;
                            },
                            divCreate: {},
                        };
                    });
                },
                event: () => {
                    let inf = {};
                    inf["client-1"] = {
                        client_id: "VQXDuC3AIlPkr4s6uKzY7hbXmJlTgZnp",
                        client_secret: "rk5BGqdDD6pUuVwtr7d4MisZSrEtoNovXiERNFB7drkO4LYZX-x_LxQkCJ25Tznw",
                        username: "zack.lai@homee.ai",
                        password: "HomeeClientsTest!",
                        grant_type: "password",
                        audience: "https://stg.api.homee.ai/",
                        "X-Client-Id": "1"
                    };
                },
            };
        },
    },
});
