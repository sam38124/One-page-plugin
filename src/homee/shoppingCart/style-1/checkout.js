import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { Checkout } from "../../api/checkout.js";
import { Dialog } from "../../dialog/dialog-mobile.js";
import { Product } from "../../api/product.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    widget.data.cartItem = widget.data.cartItem ?? [
                        {
                            category: "HOMEE 商城",
                            category_id: "1",
                            item: [
                                {
                                    item_id: "1",
                                    name: "SORIA 雙抽玻璃移門電視櫃",
                                    img: `${new URL('../img/component/shoppingCart/img.png', import.meta.url)}`,
                                    kind: "150公分",
                                    qty: 1,
                                    price: 11520,
                                    subtotal: 11520,
                                    select: true,
                                }
                            ]
                        },
                        {
                            category: "客廳沙發區",
                            category_id: "2",
                            item: [
                                {
                                    item_id: "2",
                                    name: "LINZ 三人座羽絨沙發",
                                    kind: "四人座沙發布套 淺灰藍色",
                                    qty: 1,
                                    price: 40500,
                                    subtotal: 40500,
                                    select: false,
                                },
                                {
                                    item_id: "3",
                                    name: "SORIA 儲物櫃",
                                    kind: "",
                                    qty: 1,
                                    price: 16100,
                                    subtotal: 16100,
                                    select: false,
                                }
                            ]
                        },
                        {
                            category: "媽媽新家搭配",
                            category_id: "3",
                            item: [
                                {
                                    item_id: "4",
                                    name: "SORIA 雙抽玻璃移門電視櫃",
                                    kind: "150 公分",
                                    qty: 1,
                                    price: 11520,
                                    subtotal: 11520,
                                    select: false,
                                },
                                {
                                    item_id: "5",
                                    name: "SORIA 儲物櫃",
                                    kind: "",
                                    qty: 1,
                                    price: 16100,
                                    subtotal: 16100,
                                    select: false,
                                },
                                {
                                    item_id: "6",
                                    name: "SORIA 玻璃移門儲物書櫃",
                                    kind: "小儲物書櫃",
                                    qty: 1,
                                    price: 9665,
                                    subtotal: 9665,
                                    select: false,
                                },
                            ]
                        },
                        {
                            category: "電視區搭配",
                            category_id: "4",
                            item: [
                                {
                                    item_id: "7",
                                    name: "SORIA 雙抽玻璃移門電視櫃",
                                    kind: "150 公分",
                                    qty: 1,
                                    price: 11520,
                                    subtotal: 11520,
                                    select: true,
                                },
                                {
                                    item_id: "8",
                                    name: "SORIA 儲物櫃",
                                    kind: "",
                                    qty: 1,
                                    price: 16100,
                                    subtotal: 16100,
                                    select: false,
                                },
                                {
                                    item_id: "9",
                                    name: "SORIA 玻璃移門儲物書櫃",
                                    kind: "小儲物書櫃",
                                    qty: 1,
                                    price: 9665,
                                    subtotal: 9665,
                                    select: false,
                                },
                            ]
                        },
                    ];
                    gvc.addStyle(`
                     html{
                        margin: 0;
                        box-sizing: border-box;    
                        font-family: 'Noto Sans TC';        
                        font-style: normal;
                        background:#F8F3ED;
                    }
                    input[type="number"]::-webkit-inner-spin-button, 
                    input[type="number"]::-webkit-outer-spin-button { 
                      margin: 0;
                      -webkit-appearance: none;
                      appearance: none;
                    } 
                                    .item-title{
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 15px;
                                        color: #1E1E1E;
                                    }
                                    .item-edit{
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 15px;
                                        color: #858585;
                                    }
                                    .checkboxImg{
                                        width:20px;
                                        height:20px;
                                        margin-right:10px;
                                    }
                                `);
                    const cartSubTotalVM = {
                        loading: true,
                        result: false
                    };
                    let cartIn = [];
                    let cartOut = [];
                    let voucherUse = 0;
                    let subTotal = 0;
                    let total = 0;
                    let cartData = undefined;
                    const skuDataInfo = {};
                    const dialog = new Dialog(gvc);
                    let rebat = 0;
                    let refreshTimer = 0;
                    function storeLocal() {
                        let mapData = {};
                        widget.data.cartItem.map((data) => {
                            const map2 = {};
                            data.item.map((d2) => {
                                map2[d2.item_id] = { "count": d2.qty, "sku": d2.item_id, "isSelect": d2.select };
                            });
                            mapData[data.category] = map2;
                        });
                        console.log(`storeLocal:` + JSON.stringify(mapData));
                        Checkout.setCart({
                            cartData: mapData, callback: (response) => {
                            }
                        });
                    }
                    function refreshCart() {
                        initial();
                        gvc.notifyDataChange(['cartIn', 'cartSubtotal', 'cartOut']);
                        storeLocal();
                        console.log('cartData---' + JSON.stringify(cartData));
                        cartSubTotalVM.loading = true;
                        clearInterval(refreshTimer);
                        refreshTimer = setTimeout(() => {
                            let skuAmount = [];
                            widget.data.cartItem.map((d3) => {
                                d3.item.map((dd) => {
                                    if (dd.select) {
                                        const it = skuAmount.find((d2) => {
                                            return dd.item_id === d2.sku_id;
                                        });
                                        if (!it) {
                                            skuAmount.push({ sku_id: dd.item_id, amount: dd.qty });
                                        }
                                        else {
                                            it.amount += dd.qty;
                                        }
                                    }
                                });
                            });
                            cartSubTotalVM.skuData = skuAmount;
                            Checkout.setCheckOut({
                                data: skuAmount, callback: (data) => {
                                    if (data) {
                                        cartSubTotalVM.data = data;
                                        cartSubTotalVM.loading = false;
                                        total = cartSubTotalVM.data.total_amount + cartSubTotalVM.data.discount;
                                    }
                                }
                            });
                        }, 1000);
                    }
                    dialog.dataLoading(true);
                    function getCartProData() {
                        Checkout.getCart((cdata) => {
                            cartData = cdata;
                            let apiData = {
                                "購物車": {
                                    "A020147-1-1": {
                                        "count": 1,
                                        "sku": "A020147-1-1",
                                        "isSelect": true
                                    }
                                }
                            };
                            let needGetInfoSku = [];
                            Object.keys(cartData).map((dd) => {
                                const obj = cartData[dd];
                                return {
                                    item: Object.keys(obj).map((d4) => {
                                        if (needGetInfoSku.indexOf(d4) === -1) {
                                            needGetInfoSku.push(d4);
                                        }
                                    })
                                };
                            });
                            Checkout.getCartSkuInfo({ skuID: needGetInfoSku, next: (response) => {
                                    console.log("--------------------");
                                    console.log(response);
                                    dialog.dataLoading(false);
                                    if (!response) {
                                        widget.data.cartItem = [];
                                    }
                                    else {
                                        console.log("getCartSkuInfo:" + JSON.stringify(response));
                                        response.map((dd) => {
                                            skuDataInfo[dd.sku_id] = dd;
                                        });
                                        widget.data.cartItem = Object.keys(cartData).map((dd) => {
                                            const obj = cartData[dd];
                                            return {
                                                category: dd,
                                                category_id: dd,
                                                item: Object.keys(obj).filter((d2) => {
                                                    return skuDataInfo[d2].availableForSale;
                                                }).map((d4) => {
                                                    const oc = obj[d4];
                                                    needGetInfoSku.push(d4);
                                                    if (!skuDataInfo[d4]) {
                                                        return {
                                                            item_id: d4,
                                                            name: "error",
                                                            img: ``,
                                                            kind: "error",
                                                            price: oc.price ?? 0,
                                                            subtotal: oc.price ?? 0,
                                                            deleteEvent: () => {
                                                                obj[d4] = undefined;
                                                            },
                                                            get qty() {
                                                                return oc.count;
                                                            },
                                                            set qty(newValue) {
                                                                oc.count = parseInt(newValue, 10);
                                                            },
                                                            get select() {
                                                                return oc.isSelect;
                                                            },
                                                            set select(newValue) {
                                                                oc.isSelect = newValue;
                                                            }
                                                        };
                                                    }
                                                    else {
                                                        return {
                                                            item_id: d4,
                                                            name: skuDataInfo[d4].name,
                                                            img: skuDataInfo[d4].preview_image,
                                                            kind: skuDataInfo[d4].attribute_value,
                                                            price: skuDataInfo[d4].price,
                                                            subtotal: skuDataInfo[d4].price * oc.count,
                                                            deleteEvent: () => {
                                                                obj[d4] = undefined;
                                                            },
                                                            get qty() {
                                                                return oc.count;
                                                            },
                                                            set qty(newValue) {
                                                                oc.count = parseInt(newValue, 10);
                                                            },
                                                            get select() {
                                                                return oc.isSelect;
                                                            },
                                                            set select(newValue) {
                                                                oc.isSelect = newValue;
                                                            }
                                                        };
                                                    }
                                                })
                                            };
                                        });
                                        widget.data.cartItem = widget.data.cartItem.filter((d4) => {
                                            return d4.item.length > 0;
                                        });
                                    }
                                    refreshCart();
                                } });
                        });
                    }
                    getCartProData();
                    function initial() {
                        cartIn = [];
                        cartOut = [];
                        console.log("--------------------");
                        console.log(widget.data.cartItem);
                        widget.data.cartItem.forEach((cartCategory) => {
                            let checkPush = false;
                            cartCategory.item.forEach((item) => {
                                if (item.select) {
                                    checkPush = true;
                                }
                            });
                            if (checkPush) {
                                cartIn.push(cartCategory);
                            }
                            else {
                                cartOut.push(cartCategory);
                            }
                        });
                    }
                    initial();
                    function addThousandSeparator(item) {
                        item.subtotal = item.qty * item.price;
                        return (item.subtotal).toLocaleString();
                    }
                    function checkOut() {
                        if (cartSubTotalVM.loading) {
                            dialog.showInfo('請先等待金額計算完畢!');
                            return;
                        }
                        dialog.dataLoading(true);
                        let skuAmount = cartSubTotalVM.skuData;
                        Checkout.checkOut({
                            data: {
                                cartInfo: skuAmount.map((dd) => {
                                    return { sku: dd.sku_id, quantity: dd.amount };
                                }),
                                voucherArray: (cartSubTotalVM.data.voucherArray).filter((d2) => {
                                    return d2.code;
                                }).map((dd) => {
                                    return dd.code;
                                }),
                                use_rebate: voucherUse
                            },
                            callback: (response) => {
                                dialog.dataLoading(false);
                                if (response) {
                                    console.log(`redirect:${response.redirect}`);
                                    Checkout.deleteCart(() => {
                                        getCartProData();
                                        gvc.glitter.runJsInterFace("openWeb", {
                                            url: response.redirect
                                        }, (data) => { }, {
                                            webFunction(data, callback) {
                                                location.href = response.redirect;
                                            }
                                        });
                                    });
                                }
                                else {
                                    dialog.showInfo('訂單新增異常!');
                                }
                            }
                        });
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                        <div style="">
                            ${gvc.bindView({
                                bind: "cartIn",
                                view: () => {
                                    return gvc.map(cartIn.map((category, categoryIndex) => {
                                        return gvc.bindView({
                                            bind: category.category_id,
                                            view: () => {
                                                let categoryCheck = true;
                                                category.item.forEach((item) => {
                                                    if (!item.select) {
                                                        categoryCheck = false;
                                                    }
                                                });
                                                let checkPic = (categoryCheck) ? 'https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/select.png' : 'https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/unselect.png';
                                                return `
                                            <div class="w-100 d-flex align-items-center" style="padding: 12px;">
                                                <img class="checkboxImg" alt="選擇" src="${checkPic}" onclick="${gvc.event(() => {
                                                    category.item.forEach((item) => {
                                                        item.select = !categoryCheck;
                                                    });
                                                    refreshCart();
                                                })}">
                                                <div class="item-category">${category.category}</div>
                                                <div class="ms-auto item-edit" onclick="${gvc.event(() => {
                                                    category.delete = (category?.delete) ? !category.delete : true;
                                                    if (widget.data.DomText == "完成") {
                                                        widget.data.DomText = "編輯";
                                                    }
                                                    else {
                                                        widget.data.DomText = "完成";
                                                    }
                                                    refreshCart();
                                                })}">${widget.data?.DomText ?? "編輯"}</div>
                                            </div>
                                            <div style="height:1px; width: 100%;background: #E0E0E0;margin-bottom:12px;"></div>
                                            <div style="padding:0 12px;">   
                                                ${gvc.bindView({
                                                    bind: `itemGroup${category.category_id}`,
                                                    view: () => {
                                                        gvc.addStyle(`
                                                            .item-name{
                                                                font-family: 'Noto Sans TC';
                                                                font-style: normal;
                                                                font-weight: 400;
                                                                font-size: 15px;
                                                                color: #1E1E1E;
                                                            }
                                                            .item-kind{
                                                                font-family: 'Noto Sans TC';
                                                                font-style: normal;
                                                                font-weight: 400;
                                                                font-size: 10px;
                                                                color: #858585;
                                                            }
                                                            .itemImg{
                                                                width:64px;
                                                                height:64px;
                                                                border-radius: 12px;
                                                                background:white;
                                                                margin-right:16px;
                                                            }
                                                            .item-price{
                                                                font-family: 'Noto Sans TC';
                                                                font-style: normal;
                                                                font-weight: 400;
                                                                font-size: 15px;
                                                                color: #FE5541;
                                                            }
                                                        `);
                                                        return gvc.map(category.item.map((item, itemIndex) => {
                                                            if (item.select) {
                                                                item.subtotal = item.qty * item.price;
                                                            }
                                                            return gvc.bindView({
                                                                bind: `item${category.category_id}${item.item_id}`,
                                                                view: () => {
                                                                    let chooseEvent = () => {
                                                                        item.select = !item.select;
                                                                        refreshCart();
                                                                    };
                                                                    let checkPic = (item.select) ? 'https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/select.png' : 'https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/unselect.png';
                                                                    if (category.delete) {
                                                                        checkPic = 'https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/deleteCircle.png';
                                                                        chooseEvent = () => {
                                                                            dialog.confirm("確定要刪除嘛?", (result) => {
                                                                                if (result == true) {
                                                                                    item.deleteEvent();
                                                                                    category.item.splice(itemIndex, 1);
                                                                                    if (category.item.length == 0) {
                                                                                        let indexToRemove = widget.data.cartItem.findIndex((item) => item.category_id == category.category_id);
                                                                                        widget.data.cartItem.splice(indexToRemove, 1);
                                                                                        refreshCart();
                                                                                    }
                                                                                    else {
                                                                                        refreshCart();
                                                                                    }
                                                                                }
                                                                            });
                                                                        };
                                                                    }
                                                                    return `
                                                                    <img class="checkboxImg" alt="選擇" src="${checkPic}" onclick="${gvc.event(() => {
                                                                        chooseEvent();
                                                                    })}">
                                                                    <img class="itemImg" src="${item.img}">
                                                                    <div class="d-flex flex-column flex-grow-1">
                                                                        <div class="item-name" style="white-space:normal;word-wrap:break-word;word-break:break-all;">${item.name}</div>
                                                                        <div class="d-flex" onclick="${gvc.event(() => {
                                                                        if (item.kind) {
                                                                            const dialog = new Dialog();
                                                                            dialog.dataLoading(true);
                                                                            Product.productDetailwithSkuid(item.item_id, (result) => {
                                                                                dialog.dataLoading(false);
                                                                                glitter.openDiaLog(`${new URL(`../component/shoppingCart/selectProductKind.js`, import.meta.url)}`, 'changeSku', {
                                                                                    item: item,
                                                                                    other: result,
                                                                                    callback: () => {
                                                                                        refreshCart();
                                                                                    }
                                                                                }, {
                                                                                    animation: glitter.animation.fade
                                                                                });
                                                                            });
                                                                        }
                                                                    })}">
                                                                    ${(() => {
                                                                        if (item.kind && item.kind != "Default Title") {
                                                                            return `
                                                                        <div class="item-kind" onclick="${gvc.event(() => {
                                                                            })}">${item.kind}</div>
                                                                        <img style="width:16px;height:16px;margin-left: 8px;" src="https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/downArrow.svg">
                                                                                        `;
                                                                        }
                                                                        return ``;
                                                                    })()}                                                                        
                                                                        </div>
                                                                        <div class="d-flex " style="margin-top: 13px;">
                                                                            <div class="d-flex" style="">
                                                                                <img style="width: 24px;height: 24px;" src="https://homee-ai.github.io/glitter-htmlExtension/src/img/component/minusCircle.svg" onclick="${gvc.event(() => {
                                                                        item.qty--;
                                                                        if (item.qty == 0) {
                                                                            dialog.confirm("確定要刪除嘛?", (result) => {
                                                                                if (result == true) {
                                                                                    item.deleteEvent();
                                                                                    category.item.splice(itemIndex, 1);
                                                                                    if (category.item.length == 0) {
                                                                                        let indexToRemove = widget.data.cartItem.findIndex((item) => item.category_id == category.category_id);
                                                                                        widget.data.cartItem.splice(indexToRemove, 1);
                                                                                        refreshCart();
                                                                                    }
                                                                                    else {
                                                                                        refreshCart();
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            refreshCart();
                                                                        }
                                                                    })}">
                                                                    ${gvc.bindView({
                                                                        bind: `qtyNumber${item.item_id}`,
                                                                        view: () => {
                                                                            return `
                                                                        <input class="border-0" style="width: 48px;text-align: center;" type="number" value="${item.qty}" onchange="${gvc.event((e) => {
                                                                                item.qty = e.value;
                                                                                if (widget.data.qty < 1) {
                                                                                    item.qty = 1;
                                                                                }
                                                                                item.subtotal = item.qty * item.price;
                                                                                refreshCart();
                                                                            })}">`;
                                                                        },
                                                                        divCreate: { class: `qtyNumber`, style: `` }
                                                                    })}
                                                                <img style="width: 24px;height: 24px;" src="https://homee-ai.github.io/glitter-htmlExtension/src/img/component/plusCircle.svg" onclick="${gvc.event(() => {
                                                                        item.qty++;
                                                                        item.subtotal = item.qty * item.price;
                                                                        refreshCart();
                                                                    })}">                                        
                                                                            </div>
                                                                            ${gvc.bindView({
                                                                        bind: `itemTotal${item.item_id}`,
                                                                        view: () => {
                                                                            return `NT$ ${addThousandSeparator(item)}`;
                                                                        },
                                                                        divCreate: { class: `item-price ms-auto`, style: `` }
                                                                    })}                                                                        
                                                                        </div>
                                                                    </div>                                                            
                                                                `;
                                                                },
                                                                divCreate: {
                                                                    class: `d-flex align-items-center`,
                                                                    style: `margin-bottom:16px;`
                                                                }
                                                            });
                                                        }));
                                                    }, divCreate: { style: ``, class: `` }
                                                })}   
                                            </div>
                                            `;
                                            },
                                            divCreate: {
                                                class: `border`,
                                                style: `background: #FFFFFF;border-radius: 20px;margin:12px`
                                            }
                                        });
                                    }));
                                },
                                divCreate: { class: `d-flex flex-column`, style: `` }
                            })}
                        ${gvc.bindView(() => {
                                return {
                                    dataList: [{
                                            obj: cartSubTotalVM,
                                            key: "loading",
                                        }],
                                    bind: "cartSubtotal",
                                    view: () => {
                                        gvc.addStyle(`
                                    .subTotal{
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 15px;
                                        color: #1E1E1E;
                                    }
                                    .voucherBlock{
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 700;
                                        font-size: 15px;
                                        color: #FE5541;
                                    }
                                    .voucher{
                                        color: #FE5541;
                                    }
                                    .voucherInput{
                                        height:100%;
                                        width:24px;
                                    }
                                    .shippingText{
                                        font-weight: 400;
                                        font-size: 12px;
                                        color: #1E1E1E;
                                        padding-top:9px;
                                    }
                                    .totalText{                                        
                                        font-weight: 400;
                                        font-size: 15px;
                                        color: #858585;
                                        padding-top:3px;
                                    }
                                    .total{
                                        font-weight: 500;
                                        font-size: 18px;
                                        color: #1E1E1E;
                                        margin-left:8px;
                                    }
                                    .checkout-left{
                                        width:60%;
                                        background:#FFDC6A;
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 500;
                                        font-size: 24px;
                                        border-radius: 26px 0px 0px 26px;
                                        padding-left:28px;
                                        color: #1E1E1E;
                                    }
                                    .checkout-right{
                                        width:40%;
                                        background:#FE5541;
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 700;
                                        font-size: 20px;
                                        border-radius: 0px 26px 26px 0px;
                                        color: #FFFFFF;                                        
                                        letter-spacing: 0.15em;
                                    }
                                `);
                                        subTotal = 0;
                                        cartIn.forEach((category) => {
                                            category.item.forEach((item) => {
                                                console.log(`category.item--` + JSON.stringify(item));
                                                if (item.select) {
                                                    subTotal += item.subtotal;
                                                }
                                            });
                                        });
                                        total = subTotal - voucherUse;
                                        return `
                                    <div class="d-flex align-items-center justify-content-between subTotal" style="padding:12px;">
                                        <div>小計金額</div>
                                        <div>${(cartSubTotalVM.loading) ? `計算中...` : subTotal.toLocaleString()}</div>
                                    </div>
                                                                            
                                    
                                    <div style="height:1px; width: 100%;background: #E0E0E0;"></div>
                                    <div class="d-flex justify-content-between" style="padding:12px;">
                                        <div class="shippingText">運費將在結帳時計算</div>
                                        <div class="d-flex">
                                            <div class="totalText">總計金額:</div>
                                            <div class="total">
                                                NT$ ${(cartSubTotalVM.loading) ? `計算中...` : (cartSubTotalVM.data.total_amount + cartSubTotalVM.data.discount - voucherUse).toLocaleString()}
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="d-flex" style="position:fixed;left:0;bottom:${widget.data.buttonPadding ?? 106}px;height:52px;width: calc(100% - 24px);margin-left: 12px;">
                                        <div class="checkout-left d-flex align-items-center">NT$ ${(cartSubTotalVM.loading) ? `計算中...` : (cartSubTotalVM.data.total_amount + cartSubTotalVM.data.discount - voucherUse).toLocaleString()}</div>
                                        <div class="checkout-right d-flex align-items-center justify-content-center" onclick="${gvc.event(() => {
                                            checkOut();
                                        })}">結帳</div>
                                    </div>
                                `;
                                    },
                                    divCreate: {
                                        class: `d-flex flex-column border`,
                                        style: `border-radius: 20px;margin:12px;background: #FFFFFF;`
                                    },
                                    onCreate: () => {
                                    }
                                };
                            })}
                        ${gvc.bindView({
                                bind: "cartOut",
                                view: () => {
                                    return gvc.map(cartOut.map((category, categoryIndex) => {
                                        return `
                                    ${gvc.bindView({
                                            bind: `cartOut` + category.category_id,
                                            view: () => {
                                                let categoryCheck = true;
                                                category.item.forEach((item) => {
                                                    if (!item.select) {
                                                        categoryCheck = false;
                                                    }
                                                });
                                                let checkPic = (categoryCheck) ? 'https://homee-ai.github.io/glitter-htmlExtension/src/img/component/select.png' : 'https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/unselect.png';
                                                return `
                                            <div class="w-100 d-flex align-items-center" style="padding: 12px;">
                                                <img class="checkboxImg" alt="選擇" src="${checkPic}" onclick="${gvc.event(() => {
                                                    category.item.forEach((item) => {
                                                        item.select = !categoryCheck;
                                                    });
                                                    refreshCart();
                                                })}">
                                                <div class="item-category">${category.category}</div>
                                                <div class="ms-auto item-edit" onclick="${gvc.event(() => {
                                                    category.delete = (category?.delete) ? !category.delete : true;
                                                    refreshCart();
                                                })}">編輯</div>
                                            </div>
                                            <div style="height:1px; width: 100%;background: #E0E0E0;margin-bottom:12px;"></div>
                                            <div style="padding:0 12px;">  
                                            ${(() => {
                                                    gvc.addStyle(`
                                                            .item-name{
                                                                font-family: 'Noto Sans TC';
                                                                font-style: normal;
                                                                font-weight: 400;
                                                                font-size: 15px;
                                                                color: #1E1E1E;
                                                            }
                                                            .item-kind{
                                                                font-family: 'Noto Sans TC';
                                                                font-style: normal;
                                                                font-weight: 400;
                                                                font-size: 10px;
                                                                color: #858585;
                                                            }
                                                            .itemImg{
                                                                width:64px;
                                                                height:64px;
                                                                border-radius: 12px;
                                                                background:white;
                                                                margin-right:16px;
                                                            }
                                                            .item-price{
                                                                font-family: 'Noto Sans TC';
                                                                font-style: normal;
                                                                font-weight: 400;
                                                                font-size: 15px;
                                                                color: #FE5541;
                                                            }
                                                        `);
                                                    return gvc.map(category.item.map((item, itemIndex) => {
                                                        return gvc.bindView({
                                                            bind: `item${item.item_id}`,
                                                            view: () => {
                                                                let chooseEvent = () => {
                                                                    item.select = !item.select;
                                                                    refreshCart();
                                                                };
                                                                let checkPic = (item.select) ? 'https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/select.png' : 'https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/unselect.png';
                                                                if (category.delete) {
                                                                    checkPic = 'https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/deleteCircle.png';
                                                                    chooseEvent = () => {
                                                                        dialog.confirm("確定要刪除嘛?", (check) => {
                                                                            if (check) {
                                                                                item.deleteEvent();
                                                                                category.item.splice(itemIndex, 1);
                                                                                if (category.item.length == 0) {
                                                                                    let indexToRemove = widget.data.cartItem.findIndex((item) => item.category_id == category.category_id);
                                                                                    widget.data.cartItem.splice(indexToRemove, 1);
                                                                                    refreshCart();
                                                                                }
                                                                                else {
                                                                                    refreshCart();
                                                                                }
                                                                            }
                                                                        });
                                                                    };
                                                                }
                                                                return `
                                                                    <img class="checkboxImg" alt="選擇" src="${checkPic}" onclick="${gvc.event(() => {
                                                                    chooseEvent();
                                                                })}">
                                                                    <img class="itemImg" src="${item.img}">
                                                                    <div class="d-flex flex-column flex-grow-1">
                                                                        <div class="item-name">${item.name}</div>
                                                                        <div class="d-flex" onclick="${gvc.event(() => {
                                                                    if (item.kind) {
                                                                        const dialog = new Dialog();
                                                                        dialog.dataLoading(true);
                                                                        Product.productDetailwithSkuid(item.item_id, (result) => {
                                                                            dialog.dataLoading(false);
                                                                            glitter.openDiaLog(`${new URL(`../component/shoppingCart/selectProductKind.js`, import.meta.url)}`, 'changeSku', {
                                                                                item: item,
                                                                                other: result,
                                                                                callback: () => {
                                                                                    refreshCart();
                                                                                }
                                                                            }, {
                                                                                animation: glitter.animation.fade
                                                                            });
                                                                        });
                                                                    }
                                                                })}">
                                                                            ${(() => {
                                                                    if (item.kind && item.kind != "Default Title") {
                                                                        return `
                                                                                <div class="item-kind" onclick="${gvc.event(() => {
                                                                        })}">${item.kind}</div>
                                                                                <img style="width:16px;height:16px;margin-left: 8px;" src="https://homee-ai.github.io/glitter-htmlExtension/src/img/component/shoppingCart/downArrow.svg">
                                                                                                `;
                                                                    }
                                                                    return ``;
                                                                })()}                                                                        
                                                                        </div>
                                                                        <div class="d-flex " style="margin-top: 13px;">
                                                                            <div class="d-flex" style="">
                                                                                <img style="width: 24px;height: 24px;" src="https://homee-ai.github.io/glitter-htmlExtension/src/img/component/minusCircle.svg" onclick="${gvc.event(() => {
                                                                    item.qty--;
                                                                    item.qty = (item.qty < 1) ? 1 : item.qty;
                                                                    item.subtotal = item.qty * item.price;
                                                                    refreshCart();
                                                                })}">
                                                                                ${gvc.bindView({
                                                                    bind: `qtyNumber${item.item_id}`,
                                                                    view: () => {
                                                                        return `
                                                                                            <input class="border-0" style="width: 48px;text-align: center;" type="number" value="${item.qty}" onchange="${gvc.event((e) => {
                                                                            item.qty = e.value;
                                                                            if (widget.data.qty < 1) {
                                                                                item.qty = 1;
                                                                            }
                                                                            item.subtotal = item.qty * item.price;
                                                                            refreshCart();
                                                                        })}">`;
                                                                    }, divCreate: { class: `qtyNumber`, style: `` }
                                                                })}
                                                                                <img style="width: 24px;height: 24px;" src="${new URL('https://homee-ai.github.io/glitter-htmlExtension/src/img/component/plusCircle.svg', import.meta.url)}" onclick="${gvc.event((e) => {
                                                                    item.qty++;
                                                                    item.subtotal = item.qty * item.price;
                                                                    refreshCart();
                                                                })}">                                        
                                                                            </div>
                                                                            <div class="item-price ms-auto">NT$ ${addThousandSeparator(item)}</div>
                                                                        </div>
                                                                    </div>                                                            
                                                                `;
                                                            },
                                                            divCreate: {
                                                                class: `d-flex align-items-center`,
                                                                style: `margin-bottom:16px;`
                                                            }
                                                        });
                                                    }));
                                                })()}                                                                                
                                            </div>
                                            
                                            `;
                                            },
                                            divCreate: {
                                                class: `border`,
                                                style: `background: #FFFFFF;border-radius: 20px;margin:12px;margin-bottom:16px`
                                            }
                                        })}
                                    `;
                                    }));
                                },
                                divCreate: { class: `d-flex flex-column`, style: `padding-bottom:100px;` }
                            })}
                        </div>
                        `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return ``;
                }
            };
        },
    };
});
