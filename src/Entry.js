'use strict';
import { ErpConfig } from "./erp/erp-config.js";
export class Entry {
    static onCreate(glitter) {
        `<div class="d-flex align-items-center"></div>`;
        glitter.htmlGenerate.resourceHook = (src) => {
            if (location.host === `127.0.0.1:3080`) {
                return src.replace(`$style1`, `http://127.0.0.1:3080/lionHtmlExtension`);
            }
            else {
                return src.replace(`$style1`, `https://sam38124.github.io/One-page-plugin/src`);
            }
        };
        glitter.htmlGenerate.resourceHook = (src) => {
            if (glitter) {
            }
            if (location.host === `127.0.0.1:3080`) {
                return src.replace(`$style1`, `http://127.0.0.1:3080/lionHtmlExtension`);
            }
            else {
                return src.replace(`$style1`, `https://sam38124.github.io/One-page-plugin/src`);
            }
        };
        JSON.stringify([
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
                        return "待檢驗";
                    }
                    else {
                        return "已出貨";
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
        ]);
    }
}
