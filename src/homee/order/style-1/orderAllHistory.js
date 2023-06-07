import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../../script-style-1.js";
import { Checkout } from "../../api/checkout.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let orderList;
                    Checkout.getOrderList({
                        callback: (response) => {
                            orderList = response;
                            orderList = response.map((orderData) => {
                                return {
                                    number: orderData.name,
                                    date: orderData.created_at.substring(0, 10),
                                    paysStatus: (() => {
                                        if (orderData.financial_status === 'paid') {
                                            return `已付款`;
                                        }
                                        else {
                                            return `未付款`;
                                        }
                                    })(),
                                    processingStatus: (() => {
                                        if (orderData.fulfillment_status === 'fulfilled') {
                                            return `已出貨`;
                                        }
                                        else {
                                            return `待出貨`;
                                        }
                                    })(),
                                    amount: orderData.subtotal_price,
                                    origin: orderData
                                };
                            });
                            console.log("-----------------here-----------");
                            console.log(orderList);
                        }
                    });
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            gvc.addStyle(`
                            .fontHomee *{
                                font-family: 'Noto Sans TC';
                                font-style: normal;
                            }
                        `);
                            let classStyle = {
                                ticket: `padding: 11px 24px 12px;gap: 8px;background: #FBF9F6;border-radius: 20px;margin-bottom:12px;`,
                                title: `font-weight: 400;font-size: 18px;line-height: 26px;margin-right:8px;`,
                                orderNo: `font-weight: 400;font-size: 18px;line-height: 26px;color: #FD6A58;`,
                                bar: `background:#D6D6D6;height:1px;margin:4px 0`,
                                status: `width:25%;font-weight: 400;font-size: 12px;line-height: 17px;color: #292929;`,
                                statusValue: `width:25%;font-weight: 400;font-size: 10px;line-height: 14px;color: #292929;`,
                                moreOrder: `font-weight: 400;font-size: 15px;color: #1E1E1E;`
                            };
                            if (!orderList) {
                                return ``;
                            }
                            return `${gvc.map(orderList.map((orderData) => {
                                return `
                                <div class="d-flex flex-column fontHomee" style="${classStyle.ticket}">
                                    <div class="d-flex">
                                        <div class="" style="${classStyle.title}">訂單</div>
                                        <div class="" style="${classStyle.orderNo}">#${orderData.number}</div>
                                    </div>
                                    <div class="w-100">
                                        <div class="d-flex">
                                            <div style="${classStyle.status}">日期</div>
                                            <div style="${classStyle.status}">付款狀態</div>
                                            <div style="${classStyle.status}">處理狀態</div>
                                            <div style="${classStyle.status}">總共</div>
                                        </div>
                                        <div class="w-100" style="${classStyle.bar}"></div>
                                        <div class="d-flex">
                                            <div style="${classStyle.statusValue}">${orderData.date}</div>
                                            <div style="${classStyle.statusValue}">${widget.data.payStatus[orderData.paysStatus]}</div>
                                            <div style="${classStyle.statusValue}">${widget.data.processingStatus[orderData.processingStatus]}</div>
                                            <div style="${classStyle.statusValue}">NT$${orderData.amount}</div>                                            
                                        </div>
                                    </div>
                                </div>
                            `;
                            }))}                            
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
