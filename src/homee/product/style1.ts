import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {Editor} from "../../editor.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    // https://liondesign.tw/restaurant/index.html?type=editor&dialog=caddDialog&page=footer

    return {
        allPage:{
            title: "allPage",
            subContent: "",
            defaultData: {
                "qty": 1,
                "intro": [{
                    "text": "<p>OLVAN 檯燈外形簡約優雅，能為您的睡房添加充滿格調，同時具有極佳質感的照明單品。</p>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img style=\"margin-bottom: 14px; float: none;\" alt=\"\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/8842090_1024x1024.jpg?v=1675167211\" data-mce-src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/8842090_1024x1024.jpg?v=1675167211\" data-mce-style=\"margin-bottom: 14px; float: none;\"></div>\n<p>OLVAN 檯燈底座採用實木材料，具有優良出色的穩固承重力，整體厚實穩固。棉布或百頁材質燈罩讓燈光更柔和，輕鬆營造朦朧浪漫的氛圍，為你快節奏的生活中帶來一些平靜和溫柔，別有一番浪漫情懷。</p>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img style=\"margin-bottom: 14px; float: none;\" alt=\"\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/8842091_1024x1024.jpg?v=1675167329\" data-mce-src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/8842091_1024x1024.jpg?v=1675167329\" data-mce-style=\"margin-bottom: 14px; float: none;\"></div>\n<p>OLVAN 檯燈有多重款式任你選擇，很適合自用或作為禮品送給親友。HOMEE 成就每一個明亮溫馨的家，與您一同構建理想中的質感生活！</p>\n<p> </p>\n<p> </p>\n<h4>商品規格</h4>\n<table width=\"100%\">\n<tbody>\n<tr>\n<td style=\"width: 30%; text-align: center; background-color: #efefef;\" data-mce-style=\"width: 30%; text-align: center; background-color: #efefef;\">\n<p><strong>直徑</strong></p>\n</td>\n<td style=\"width: 70%;\" data-mce-style=\"width: 70%;\">\n<p>棉布款：26 公分，百頁：24 公分</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 30%; text-align: center; background-color: #efefef;\" data-mce-style=\"width: 30%; text-align: center; background-color: #efefef;\">\n<p><strong>寬</strong></p>\n</td>\n<td style=\"width: 70%;\" data-mce-style=\"width: 70%;\">\n<p>32 公分</p>\n</td>\n</tr>\n</tbody>\n</table>\n<br>\n<table width=\"100%\">\n<tbody>\n<tr>\n<td style=\"width: 30%; text-align: center; background-color: #efefef;\" data-mce-style=\"width: 30%; text-align: center; background-color: #efefef;\">\n<p data-mce-style=\"text-align: left;\"><strong>材質說明</strong></p>\n</td>\n<td data-mce-style=\"width: 70%;\">\n<p>底座：原木，燈罩：棉布 / PVC</p>\n</td>\n</tr>\n</tbody>\n</table>\n<p> </p>\n<p> </p>\n<h4>相關說明</h4>\n<p>※ 訂購前敬請詳閱<a href=\"https://homee.cc/legal/refund-policy\" target=\"_blank\">退換貨說明</a>，您送出訂單的同時將視同您已詳閱、同意以下規定。</p>\n<p>※ 顏色差異：商品顏色或布料會因您觀看的裝置 (手機、平板或電腦等) 而無法100%相同，商品顏色與布料以實品為主。</p>\n<p>※ 尺寸誤差：所有產品尺寸皆為人工丈量，可能因測量不同而存在誤差，0.5 - 2 公分 屬正常。</p>\n<p>※ 溫馨提醒：家具類商品長途運輸難免有碰撞風險，HOMEE 將盡力協助您服務至商品完善，您可放心選購。</p>\n<p>※ 商品交期：HOMEE 提供平台讓您使用合宜價錢直接向供應廠採購因此交期會因工廠有無現貨而有異動，有現貨約 1 週配送，無現貨需等約 2~4 週。 </p>",
                    "title": "商品介紹"
                }],
                "price": "9960",
                "marginL": "10px",
                "marginR": "10px",
                "sale_price": "13500",
                "preview_image": "",
                "attribute_list": [{
                    "attribute_key": "定制款式",
                    "display_order": 1,
                    "attribute_values": [{"value": "棉布款", "display_order": 1, "selected": true}, {
                        "value": "百頁款",
                        "display_order": 2
                    }]
                }],
                "name": "OLVAN 檯燈",
                "productData": {
                    "attribute_list": [{
                        "attribute_key": "定制款式",
                        "display_order": 1,
                        "attribute_values": [{
                            "value": "棉布款",
                            "display_order": 1,
                            "selected": true
                        }, {"value": "百頁款", "display_order": 2}]
                    }],
                    "product_detail": {
                        "id": 8129130922284,
                        "name": "OLVAN 檯燈",
                        "handle": "olvan-檯燈",
                        "images": ["https://cdn.shopify.com/s/files/1/0704/0158/9548/products/44609065.jpg?v=1675167898&width=720", "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/44471483.jpg?v=1675167898&width=720", "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/44471451.jpg?v=1675167898&width=720", "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/44471499.jpg?v=1675167898&width=720", "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/44471468.jpg?v=1675167898&width=720", "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/44471467.jpg?v=1675167898&width=720", "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/44471477.jpg?v=1675167898&width=720", "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/44609066.jpg?v=1675167898&width=720"],
                        "created_time": 1675166918000,
                        "updated_time": 1675175826000,
                        "bodyHtml": "<p>OLVAN 檯燈外形簡約優雅，能為您的睡房添加充滿格調，同時具有極佳質感的照明單品。</p>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img style=\"margin-bottom: 14px; float: none;\" alt=\"\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/8842090_1024x1024.jpg?v=1675167211\" data-mce-src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/8842090_1024x1024.jpg?v=1675167211\" data-mce-style=\"margin-bottom: 14px; float: none;\"></div>\n<p>OLVAN 檯燈底座採用實木材料，具有優良出色的穩固承重力，整體厚實穩固。棉布或百頁材質燈罩讓燈光更柔和，輕鬆營造朦朧浪漫的氛圍，為你快節奏的生活中帶來一些平靜和溫柔，別有一番浪漫情懷。</p>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img style=\"margin-bottom: 14px; float: none;\" alt=\"\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/8842091_1024x1024.jpg?v=1675167329\" data-mce-src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/8842091_1024x1024.jpg?v=1675167329\" data-mce-style=\"margin-bottom: 14px; float: none;\"></div>\n<p>OLVAN 檯燈有多重款式任你選擇，很適合自用或作為禮品送給親友。HOMEE 成就每一個明亮溫馨的家，與您一同構建理想中的質感生活！</p>\n<p> </p>\n<p> </p>\n<h4>商品規格</h4>\n<table width=\"100%\">\n<tbody>\n<tr>\n<td style=\"width: 30%; text-align: center; background-color: #efefef;\" data-mce-style=\"width: 30%; text-align: center; background-color: #efefef;\">\n<p><strong>直徑</strong></p>\n</td>\n<td style=\"width: 70%;\" data-mce-style=\"width: 70%;\">\n<p>棉布款：26 公分，百頁：24 公分</p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 30%; text-align: center; background-color: #efefef;\" data-mce-style=\"width: 30%; text-align: center; background-color: #efefef;\">\n<p><strong>寬</strong></p>\n</td>\n<td style=\"width: 70%;\" data-mce-style=\"width: 70%;\">\n<p>32 公分</p>\n</td>\n</tr>\n</tbody>\n</table>\n<br>\n<table width=\"100%\">\n<tbody>\n<tr>\n<td style=\"width: 30%; text-align: center; background-color: #efefef;\" data-mce-style=\"width: 30%; text-align: center; background-color: #efefef;\">\n<p data-mce-style=\"text-align: left;\"><strong>材質說明</strong></p>\n</td>\n<td data-mce-style=\"width: 70%;\">\n<p>底座：原木，燈罩：棉布 / PVC</p>\n</td>\n</tr>\n</tbody>\n</table>\n<p> </p>\n<p> </p>\n<h4>相關說明</h4>\n<p>※ 訂購前敬請詳閱<a href=\"https://homee.cc/legal/refund-policy\" target=\"_blank\">退換貨說明</a>，您送出訂單的同時將視同您已詳閱、同意以下規定。</p>\n<p>※ 顏色差異：商品顏色或布料會因您觀看的裝置 (手機、平板或電腦等) 而無法100%相同，商品顏色與布料以實品為主。</p>\n<p>※ 尺寸誤差：所有產品尺寸皆為人工丈量，可能因測量不同而存在誤差，0.5 - 2 公分 屬正常。</p>\n<p>※ 溫馨提醒：家具類商品長途運輸難免有碰撞風險，HOMEE 將盡力協助您服務至商品完善，您可放心選購。</p>\n<p>※ 商品交期：HOMEE 提供平台讓您使用合宜價錢直接向供應廠採購因此交期會因工廠有無現貨而有異動，有現貨約 1 週配送，無現貨需等約 2~4 週。 </p>"
                    },
                    "sku_list": {
                        "棉布款": {
                            "sku_id": "G010025-1",
                            "attribute_key": "棉布款",
                            "attribute_value": "棉布款",
                            "attribute_list": ["棉布款", null, null],
                            "isEnabled": true,
                            "sale_price": 519,
                            "price": 519,
                            "image_index": 0
                        },
                        "百頁款": {
                            "sku_id": "G010025-2",
                            "attribute_key": "百頁款",
                            "attribute_value": "百頁款",
                            "attribute_list": ["百頁款", null, null],
                            "isEnabled": true,
                            "sale_price": 519,
                            "price": 519,
                            "image_index": 7
                        }
                    }
                }
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/allPage.js',import.meta.url))
        },
        code:{
            title: "code",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/code.js',import.meta.url))
        },

        footer:{
            title: "footer",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
    }
})