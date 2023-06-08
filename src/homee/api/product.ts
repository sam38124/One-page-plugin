import {appConfig} from "../../config.js";
import {CategoryListData, ProductData} from "./category.js";
import htmlString = JQuery.htmlString;


export class Product {
    public static productDetail(productId: string, callback: (result: any) => void) {

        $.ajax({
            url: `${appConfig().serverURL}/api/v1/product/detail?product_id=${productId}`,
            type: 'get',
            headers: {Authorization: appConfig().token},
            contentType: 'application/json; charset=utf-8',
            success: (response: any) => {
                //api取得的data

                let apiData :{
                    attribute_list:{
                        attribute_key:string,
                        display_order:number,
                        attribute_values:{
                            value:string,
                            display_order:number,
                            selected?:boolean
                        }[],
                    }[],
                    product_detail:{
                        id:string,
                        name:string,
                        handle:string,
                        images:string[],
                        created_time:string,
                        updated_time:string,
                        bodyHtml:string
                    },
                    sku_list:{
                        [key: string]: {
                            sku_id:string,
                            attribute_key:string,
                            attribute_value:string,
                            attribute_list:string[],
                            isEnabled:boolean,
                            sale_price:number,
                            price:number,
                            image_index:number,
                            t3dModel?:string,
                            availableForSale:boolean
                        }
                    }

                }= {
                    attribute_list: [
                        {
                            "attribute_key": "定制腳座",
                            "display_order": 1,
                            "attribute_values": [
                                {
                                    "value": "A型腳座",
                                    "display_order": 1,
                                    "selected": true
                                },
                                {
                                    "value": "D型腳座",
                                    "display_order": 2
                                },
                                {
                                    "value": "M型腳座",
                                    "display_order": 3
                                }
                            ]
                        },
                        {
                            "attribute_key": "尺寸",
                            "display_order": 2,
                            "attribute_values": [
                                {
                                    "value": "120*60 公分",
                                    "display_order": 1,
                                    "selected": true
                                },
                                {
                                    "value": "130*70 公分",
                                    "display_order": 2
                                },
                                {
                                    "value": "140*80 公分",
                                    "display_order": 3
                                },
                                {
                                    "value": "160*90 公分",
                                    "display_order": 4
                                },
                                {
                                    "value": "180*90 公分",
                                    "display_order": 5
                                }
                            ]
                        },
                        {
                            "attribute_key": "台面形狀",
                            "display_order": 3,
                            "attribute_values": [
                                {
                                    "value": "直邊圓角",
                                    "display_order": 1,
                                    "selected": true
                                },
                                {
                                    "value": "馬肚形",
                                    "display_order": 2
                                }
                            ]
                        }
                    ],
                    "product_detail": {
                        "id": "8138815668524",
                        "name": "FORLI 岩板餐桌",
                        "handle": "forli-岩板餐桌",
                        "images": [
                            "https://cdn.shopify.com/s/files/1/0704/0158/9548/files/A49.jpg?v=1683040400&width=720",
                            "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/25490065_6411fe56-7dd4-4108-98e3-1f9fdb95fba6.jpg?v=1683121170&width=720",
                            "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/17799164_eecfb3fb-841e-4deb-8a3b-1caccd6e1dee.jpg?v=1683121170&width=720",
                            "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/17799168.jpg?v=1683121170&width=720",
                            "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/21975930.jpg?v=1683121170&width=720",
                            "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/21975931.jpg?v=1683121170&width=720",
                            "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/17799194.jpg?v=1683121170&width=720",
                            "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/17791705.jpg?v=1683121170&width=720",
                            "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/17791724.jpg?v=1683121170&width=720"
                        ],
                        "created_time": "1675615924000",
                        "updated_time": "1683692112000",
                        "bodyHtml": "<p>FORLI 岩板餐桌簡約的外型和不過份花俏的設計能很好的融入各種空間設計，設計充分詮釋功能實用性和現代簡約形式的和諧統一，為你帶來高品質的家居體驗。</p>\n<p>餐桌桌面由優質進口霧面岩板製成，岩板取材於天然石料，以攝氏 1200 度高溫高壓煅燒而成，嚴謹的加工過程讓岩板桌面硬度優越，抗壓耐用、防刮耐熱且容易清潔。而匠師在考慮其耐用性的的同時也保證了設計的簡約美感，餐桌桌面表層帶有天然石材的紋路，搭配家中光線更能凸顯其桌面紋理的清晰自然，溫潤典雅，別有風味的自然風尚。高密度的岩板經火燒實測帶 A1 級的防火性能，耐熱抗高溫，抗腐蝕性優異，可直接接觸食物也不易留下頑固污漬殘留，讓你日常清潔桌面省心省力。</p>\n<p>餐桌腳座全程使用精湛工藝匠心製造，採用 A3 碳素鋼框架製造而成，硬度高且耐用耐磨損，能穩固支撐傢具，讓你用得安心又放心，同時打理保養極其輕鬆。餐桌邊角採用人性化圓角設計，能有效防止磕碰，讓你使用時更安心舒適，尤其適合有孩子的家庭，絕對是你優雅貼心的選擇。同時桌面底部特別加上內嵌鐵片做支撐，穩固升級，提供使用者多一份的安心保障。</p>\n<p>岩板餐桌有多種桌面及腳座款式及尺寸供你選擇，設計不同，承重依舊，堅固耐用。 FORLI 岩板餐桌是功能主義和藝術美學完美結合的典範之作，體現職人巧思和對家具實用性的考量，以現代化工藝使其和諧共存，簡約不失大氣，精緻不失典雅。餐桌承載著一飯一食中的愛與溫馨，更承載著一個家庭的三餐四季和歲月流轉，HOMEE 希望陪伴你左右，為你增添用餐幸福感，與您一同打造質感生活，成就每一個有溫度的家。</p>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img style=\"float: none;\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/Frame241_1024x1024.jpg?v=1680014651\"></div>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/6561695_1024x1024.jpg?v=1675091671\" style=\"float: none;\" data-mce-style=\"float: none;\"></div>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/6561696_1024x1024.jpg?v=1675091690\" style=\"float: none;\" data-mce-style=\"float: none;\"></div>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img style=\"float: none;\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/8454073_1024x1024.jpg?v=1675258545\" data-mce-style=\"float: none;\" data-mce-src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/8454073_1024x1024.jpg?v=1675258545\"></div>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img data-mce-fragment=\"1\" style=\"float: none;\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/6561699_480x480.png?v=1675687982\" data-mce-src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/6561699_480x480.png?v=1675687982\"></div>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><br></div>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img data-mce-fragment=\"1\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/6944738_480x480.jpg?v=1675688086\" style=\"float: none;\" data-mce-src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/6944738_480x480.jpg?v=1675688086\"></div>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img data-mce-fragment=\"1\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/7400666_480x480.png?v=1675688126\" style=\"float: none;\" data-mce-src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/7400666_480x480.png?v=1675688126\"></div>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img data-mce-fragment=\"1\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/7400663_480x480.png?v=1675688160\" style=\"float: none;\" data-mce-src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/7400663_480x480.png?v=1675688160\"></div>\n<div style=\"text-align: center;\" data-mce-style=\"text-align: center;\"><img data-mce-fragment=\"1\" src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/7400665_480x480.png?v=1675688194\" style=\"float: none;\" data-mce-src=\"https://cdn.shopify.com/s/files/1/0704/0158/9548/files/7400665_480x480.png?v=1675688194\"></div>\n<p> </p>\n<p> </p>\n<h4>商品規格</h4>\n<table width=\"100%\">\n<tbody>\n<tr>\n<td style=\"width: 30%; text-align: center; background-color: #efefef;\" data-mce-style=\"width: 30%; text-align: center; background-color: #efefef;\">\n<p><strong>長</strong></p>\n</td>\n<td data-mce-style=\"width: 70%;\">\n<p><meta charset=\"utf-8\"><span>A : 120 公分  B</span><span> : 130 公分  C : 140 公分  D : 160 公分 E : 180 公分</span></p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 30%; text-align: center; background-color: #efefef;\" data-mce-style=\"width: 30%; text-align: center; background-color: #efefef;\">\n<p><strong>寬</strong></p>\n</td>\n<td data-mce-style=\"width: 70%;\">\n<p><meta charset=\"utf-8\"><meta charset=\"utf-8\"><span data-mce-fragment=\"1\">A : 60 公分  B</span><span data-mce-fragment=\"1\"> : 70 公分  C：80<meta charset=\"utf-8\">公分 DE : 90 公分</span><br></p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 30%; text-align: center; background-color: #efefef;\" data-mce-style=\"width: 30%; text-align: center; background-color: #efefef;\">\n<p><strong>高</strong></p>\n</td>\n<td style=\"width: 70%;\" data-mce-style=\"width: 70%;\">\n<p>75 公分</p>\n</td>\n</tr>\n</tbody>\n</table>\n<br>\n<table width=\"100%\">\n<tbody>\n<tr>\n<td style=\"width: 30%; text-align: center; background-color: #efefef;\" data-mce-style=\"width: 30%; text-align: center; background-color: #efefef;\">\n<p data-mce-style=\"text-align: left;\"><strong>材質說明</strong></p>\n</td>\n<td data-mce-style=\"width: 70%;\">\n<p><meta charset=\"utf-8\"><span>桌面：</span><span>進口優質霧面岩板</span><span>，桌腳：A3</span>碳素鋼框架 </p>\n</td>\n</tr>\n</tbody>\n</table>\n<p> </p>\n<p> </p>\n<h4>相關說明</h4>\n<p>※ HOMEE 為科技家居服務平台，所有商品皆由原廠提供自有包裝，並享受原廠及 HOMEE 延伸保固。</p>\n<p>※ 訂購前敬請詳閱<a href=\"https://homee.cc/pages/%E9%80%80%E6%AC%BE%E6%94%BF%E7%AD%96\">退換貨說明</a>，您送出訂單的同時將視同您已詳閱、同意以下規定。</p>\n<p>※ 每年須檢查螺絲等五金材料緊度數次, 必要時將螺絲或其他五金材料鎖緊。</p>\n<p>※ 清潔時，請用抹布沾些許清水擦拭乾淨，再用乾布擦乾。</p>\n<p>※ 岩板桌面可能出現輕微細紋，此為天然岩石製造加工過程中的正常現象。</p>\n<p>※ 顏色差異：商品顏色或布料會因您觀看的裝置（手機、平板或電腦等）而無法 100% 相同，商品顏色與布料以實品為主。</p>\n<p>※ 尺寸誤差：所有產品尺寸皆為人工丈量，可能因測量不同而存在誤差，0.5 - 2 公分 屬正常。</p>\n<p>※ 溫馨提醒：家具類商品長途運輸難免有碰撞風險，HOMEE 將盡力協助您服務至商品完善，您可放心選購。</p>\n<p>※ 商品交期：HOMEE 提供平台讓您使用合宜價錢直接向供應廠採購因此交期會因工廠有無現貨而有異動，有現貨約 3~5 週配送，無現貨需等約 2~3 月。</p>"
                    },
                    "sku_list": {
                        "A型腳座 / 120*60 公分 / 直邊圓角": {
                            "sku_id": "A010001-1-1-1",
                            "attribute_key": "A型腳座 / 120*60 公分 / 直邊圓角",
                            "attribute_value": "A型腳座, 120*60 公分, 直邊圓角",
                            "attribute_list": [
                                "A型腳座",
                                "120*60 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 6900,
                            "price": 6900,
                            "image_index": 6,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-1-1-1/model-20221115T232410.usdz",
                            "availableForSale": true
                        },
                        "A型腳座 / 120*60 公分 / 馬肚形": {
                            "sku_id": "A010001-1-2-1",
                            "attribute_key": "A型腳座 / 120*60 公分 / 馬肚形",
                            "attribute_value": "A型腳座, 120*60 公分, 馬肚形",
                            "attribute_list": [
                                "A型腳座",
                                "120*60 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 7390,
                            "price": 7390,
                            "image_index": 6,
                            "availableForSale": false
                        },
                        "A型腳座 / 130*70 公分 / 直邊圓角": {
                            "sku_id": "A010001-2-1-1",
                            "attribute_key": "A型腳座 / 130*70 公分 / 直邊圓角",
                            "attribute_value": "A型腳座, 130*70 公分, 直邊圓角",
                            "attribute_list": [
                                "A型腳座",
                                "130*70 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 7690,
                            "price": 7690,
                            "image_index": 6,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-2-1-1/model-20221115T232410.usdz",
                            "availableForSale": true
                        },
                        "A型腳座 / 130*70 公分 / 馬肚形": {
                            "sku_id": "A010001-2-2-1",
                            "attribute_key": "A型腳座 / 130*70 公分 / 馬肚形",
                            "attribute_value": "A型腳座, 130*70 公分, 馬肚形",
                            "attribute_list": [
                                "A型腳座",
                                "130*70 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 8290,
                            "price": 8290,
                            "image_index": 6,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-2-2-1/model-20221115T232410.usdz",
                            "availableForSale": true
                        },
                        "A型腳座 / 140*80 公分 / 直邊圓角": {
                            "sku_id": "A010001-3-1-1",
                            "attribute_key": "A型腳座 / 140*80 公分 / 直邊圓角",
                            "attribute_value": "A型腳座, 140*80 公分, 直邊圓角",
                            "attribute_list": [
                                "A型腳座",
                                "140*80 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 8690,
                            "price": 8690,
                            "image_index": 6,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-3-1-1/model-20221115T232410.usdz",
                            "availableForSale": true
                        },
                        "A型腳座 / 140*80 公分 / 馬肚形": {
                            "sku_id": "A010001-3-2-1",
                            "attribute_key": "A型腳座 / 140*80 公分 / 馬肚形",
                            "attribute_value": "A型腳座, 140*80 公分, 馬肚形",
                            "attribute_list": [
                                "A型腳座",
                                "140*80 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 8990,
                            "price": 8990,
                            "image_index": 6,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-3-2-1/model-20221115T232410.usdz",
                            "availableForSale": true
                        },
                        "A型腳座 / 160*90 公分 / 直邊圓角": {
                            "sku_id": "A010001-4-1-1",
                            "attribute_key": "A型腳座 / 160*90 公分 / 直邊圓角",
                            "attribute_value": "A型腳座, 160*90 公分, 直邊圓角",
                            "attribute_list": [
                                "A型腳座",
                                "160*90 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 9490,
                            "price": 9490,
                            "image_index": 6,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-4-1-1/model-20221115T232410.usdz",
                            "availableForSale": true
                        },
                        "A型腳座 / 160*90 公分 / 馬肚形": {
                            "sku_id": "A010001-4-2-1",
                            "attribute_key": "A型腳座 / 160*90 公分 / 馬肚形",
                            "attribute_value": "A型腳座, 160*90 公分, 馬肚形",
                            "attribute_list": [
                                "A型腳座",
                                "160*90 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 9880,
                            "price": 9880,
                            "image_index": 6,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-4-2-1/model-20221115T232410.usdz",
                            "availableForSale": true
                        },
                        "A型腳座 / 180*90 公分 / 直邊圓角": {
                            "sku_id": "A010001-5-1-1",
                            "attribute_key": "A型腳座 / 180*90 公分 / 直邊圓角",
                            "attribute_value": "A型腳座, 180*90 公分, 直邊圓角",
                            "attribute_list": [
                                "A型腳座",
                                "180*90 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 14890,
                            "price": 14890,
                            "image_index": 6,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-5-1-1/model-20221115T232410.usdz",
                            "availableForSale": true
                        },
                        "A型腳座 / 180*90 公分 / 馬肚形": {
                            "sku_id": "A010001-5-2-1",
                            "attribute_key": "A型腳座 / 180*90 公分 / 馬肚形",
                            "attribute_value": "A型腳座, 180*90 公分, 馬肚形",
                            "attribute_list": [
                                "A型腳座",
                                "180*90 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 15280,
                            "price": 15280,
                            "image_index": 6,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-5-2-1/model-20221115T232410.usdz",
                            "availableForSale": true
                        },
                        "D型腳座 / 120*60 公分 / 直邊圓角": {
                            "sku_id": "A010001-1-1-2",
                            "attribute_key": "D型腳座 / 120*60 公分 / 直邊圓角",
                            "attribute_value": "D型腳座, 120*60 公分, 直邊圓角",
                            "attribute_list": [
                                "D型腳座",
                                "120*60 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 9500,
                            "price": 9500,
                            "image_index": 7,
                            "availableForSale": false
                        },
                        "D型腳座 / 120*60 公分 / 馬肚形": {
                            "sku_id": "A010001-1-2-2",
                            "attribute_key": "D型腳座 / 120*60 公分 / 馬肚形",
                            "attribute_value": "D型腳座, 120*60 公分, 馬肚形",
                            "attribute_list": [
                                "D型腳座",
                                "120*60 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 9990,
                            "price": 9990,
                            "image_index": 7,
                            "availableForSale": false
                        },
                        "D型腳座 / 130*70 公分 / 直邊圓角": {
                            "sku_id": "A010001-2-1-2",
                            "attribute_key": "D型腳座 / 130*70 公分 / 直邊圓角",
                            "attribute_value": "D型腳座, 130*70 公分, 直邊圓角",
                            "attribute_list": [
                                "D型腳座",
                                "130*70 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 10900,
                            "price": 10900,
                            "image_index": 7,
                            "availableForSale": false
                        },
                        "D型腳座 / 130*70 公分 / 馬肚形": {
                            "sku_id": "A010001-2-2-2",
                            "attribute_key": "D型腳座 / 130*70 公分 / 馬肚形",
                            "attribute_value": "D型腳座, 130*70 公分, 馬肚形",
                            "attribute_list": [
                                "D型腳座",
                                "130*70 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 11200,
                            "price": 11200,
                            "image_index": 7,
                            "availableForSale": false
                        },
                        "D型腳座 / 140*80 公分 / 直邊圓角": {
                            "sku_id": "A010001-3-1-2",
                            "attribute_key": "D型腳座 / 140*80 公分 / 直邊圓角",
                            "attribute_value": "D型腳座, 140*80 公分, 直邊圓角",
                            "attribute_list": [
                                "D型腳座",
                                "140*80 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 11990,
                            "price": 11990,
                            "image_index": 7,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-3-1-2/model-20221115T232426.usdz",
                            "availableForSale": true
                        },
                        "D型腳座 / 140*80 公分 / 馬肚形": {
                            "sku_id": "A010001-3-2-2",
                            "attribute_key": "D型腳座 / 140*80 公分 / 馬肚形",
                            "attribute_value": "D型腳座, 140*80 公分, 馬肚形",
                            "attribute_list": [
                                "D型腳座",
                                "140*80 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 12290,
                            "price": 12290,
                            "image_index": 7,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-3-2-2/model-20221115T232426.usdz",
                            "availableForSale": true
                        },
                        "D型腳座 / 160*90 公分 / 直邊圓角": {
                            "sku_id": "A010001-4-1-2",
                            "attribute_key": "D型腳座 / 160*90 公分 / 直邊圓角",
                            "attribute_value": "D型腳座, 160*90 公分, 直邊圓角",
                            "attribute_list": [
                                "D型腳座",
                                "160*90 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 15200,
                            "price": 15200,
                            "image_index": 7,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-4-1-2/model-20221115T232426.usdz",
                            "availableForSale": true
                        },
                        "D型腳座 / 160*90 公分 / 馬肚形": {
                            "sku_id": "A010001-4-2-2",
                            "attribute_key": "D型腳座 / 160*90 公分 / 馬肚形",
                            "attribute_value": "D型腳座, 160*90 公分, 馬肚形",
                            "attribute_list": [
                                "D型腳座",
                                "160*90 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 15390,
                            "price": 15390,
                            "image_index": 7,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-4-2-2/model-20221115T232426.usdz",
                            "availableForSale": true
                        },
                        "D型腳座 / 180*90 公分 / 直邊圓角": {
                            "sku_id": "A010001-5-1-2",
                            "attribute_key": "D型腳座 / 180*90 公分 / 直邊圓角",
                            "attribute_value": "D型腳座, 180*90 公分, 直邊圓角",
                            "attribute_list": [
                                "D型腳座",
                                "180*90 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 18890,
                            "price": 18890,
                            "image_index": 7,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-5-1-2/model-20221115T232426.usdz",
                            "availableForSale": true
                        },
                        "D型腳座 / 180*90 公分 / 馬肚形": {
                            "sku_id": "A010001-5-2-2",
                            "attribute_key": "D型腳座 / 180*90 公分 / 馬肚形",
                            "attribute_value": "D型腳座, 180*90 公分, 馬肚形",
                            "attribute_list": [
                                "D型腳座",
                                "180*90 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 19280,
                            "price": 19280,
                            "image_index": 7,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-5-2-2/model-20221115T232426.usdz",
                            "availableForSale": true
                        },
                        "M型腳座 / 120*60 公分 / 直邊圓角": {
                            "sku_id": "A010001-1-1-3",
                            "attribute_key": "M型腳座 / 120*60 公分 / 直邊圓角",
                            "attribute_value": "M型腳座, 120*60 公分, 直邊圓角",
                            "attribute_list": [
                                "M型腳座",
                                "120*60 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 9500,
                            "price": 9500,
                            "image_index": 8,
                            "availableForSale": false
                        },
                        "M型腳座 / 120*60 公分 / 馬肚形": {
                            "sku_id": "A010001-1-2-3",
                            "attribute_key": "M型腳座 / 120*60 公分 / 馬肚形",
                            "attribute_value": "M型腳座, 120*60 公分, 馬肚形",
                            "attribute_list": [
                                "M型腳座",
                                "120*60 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 9990,
                            "price": 9990,
                            "image_index": 8,
                            "availableForSale": false
                        },
                        "M型腳座 / 130*70 公分 / 直邊圓角": {
                            "sku_id": "A010001-2-1-3",
                            "attribute_key": "M型腳座 / 130*70 公分 / 直邊圓角",
                            "attribute_value": "M型腳座, 130*70 公分, 直邊圓角",
                            "attribute_list": [
                                "M型腳座",
                                "130*70 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 10900,
                            "price": 10900,
                            "image_index": 8,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-2-1-3/model-20221115T232441.usdz",
                            "availableForSale": true
                        },
                        "M型腳座 / 130*70 公分 / 馬肚形": {
                            "sku_id": "A010001-2-2-3",
                            "attribute_key": "M型腳座 / 130*70 公分 / 馬肚形",
                            "attribute_value": "M型腳座, 130*70 公分, 馬肚形",
                            "attribute_list": [
                                "M型腳座",
                                "130*70 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 11200,
                            "price": 11200,
                            "image_index": 8,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-2-2-3/model-20221115T232441.usdz",
                            "availableForSale": true
                        },
                        "M型腳座 / 140*80 公分 / 直邊圓角": {
                            "sku_id": "A010001-3-1-3",
                            "attribute_key": "M型腳座 / 140*80 公分 / 直邊圓角",
                            "attribute_value": "M型腳座, 140*80 公分, 直邊圓角",
                            "attribute_list": [
                                "M型腳座",
                                "140*80 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 11990,
                            "price": 11990,
                            "image_index": 8,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-3-1-3/model-20221115T232441.usdz",
                            "availableForSale": true
                        },
                        "M型腳座 / 140*80 公分 / 馬肚形": {
                            "sku_id": "A010001-3-2-3",
                            "attribute_key": "M型腳座 / 140*80 公分 / 馬肚形",
                            "attribute_value": "M型腳座, 140*80 公分, 馬肚形",
                            "attribute_list": [
                                "M型腳座",
                                "140*80 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 12290,
                            "price": 12290,
                            "image_index": 8,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-3-2-3/model-20221115T232441.usdz",
                            "availableForSale": true
                        },
                        "M型腳座 / 160*90 公分 / 直邊圓角": {
                            "sku_id": "A010001-4-1-3",
                            "attribute_key": "M型腳座 / 160*90 公分 / 直邊圓角",
                            "attribute_value": "M型腳座, 160*90 公分, 直邊圓角",
                            "attribute_list": [
                                "M型腳座",
                                "160*90 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 15200,
                            "price": 15200,
                            "image_index": 8,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-4-1-3/model-20221115T232441.usdz",
                            "availableForSale": true
                        },
                        "M型腳座 / 160*90 公分 / 馬肚形": {
                            "sku_id": "A010001-4-2-3",
                            "attribute_key": "M型腳座 / 160*90 公分 / 馬肚形",
                            "attribute_value": "M型腳座, 160*90 公分, 馬肚形",
                            "attribute_list": [
                                "M型腳座",
                                "160*90 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 15390,
                            "price": 15390,
                            "image_index": 8,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-4-2-3/model-20221115T232441.usdz",
                            "availableForSale": true
                        },
                        "M型腳座 / 180*90 公分 / 直邊圓角": {
                            "sku_id": "A010001-5-1-3",
                            "attribute_key": "M型腳座 / 180*90 公分 / 直邊圓角",
                            "attribute_value": "M型腳座, 180*90 公分, 直邊圓角",
                            "attribute_list": [
                                "M型腳座",
                                "180*90 公分",
                                "直邊圓角"
                            ],
                            "isEnabled": true,
                            "sale_price": 18890,
                            "price": 18890,
                            "image_index": 8,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-5-1-3/model-20221115T232441.usdz",
                            "availableForSale": true
                        },
                        "M型腳座 / 180*90 公分 / 馬肚形": {
                            "sku_id": "A010001-5-2-3",
                            "attribute_key": "M型腳座 / 180*90 公分 / 馬肚形",
                            "attribute_value": "M型腳座, 180*90 公分, 馬肚形",
                            "attribute_list": [
                                "M型腳座",
                                "180*90 公分",
                                "馬肚形"
                            ],
                            "isEnabled": true,
                            "sale_price": 19280,
                            "price": 19280,
                            "image_index": 8,
                            "t3dModel": "https://prd-homee-api-public.s3.amazonaws.com/sku/A010001-5-2-3/model-20221115T232441.usdz",
                            "availableForSale": true
                        }
                    }
                }
                callback(response)
            },
            error: (err: any) => {
                callback(false)
            },
        });
    }
    public static productDetailwithSkuid(productId: string, callback: (result: any) => void) {

        $.ajax({
            url: `${appConfig().serverURL}/api/v1/product/detail?sku=${productId}`,
            type: 'get',
            headers: {Authorization: appConfig().token},
            contentType: 'application/json; charset=utf-8',
            success: (response: any) => {

                callback(response)
            },
            error: (err: any) => {
                callback(false)
            },
        });
    }


    public static getSubcategoryList(parCategoryID: string, callback: (data: any) => void) {
        const that = this;
        let jsonData: any

        $.ajax({
            url: `${appConfig().serverURL}/api/v1/category`,
            type: 'get',
            data: jsonData,
            contentType: 'application/json; charset=utf-8',
            success: (resposnse: any) => {
                let allCategoryList = resposnse["category_list"]
                let returnData: any;
                allCategoryList.forEach((categoryData: any) => {

                    if (categoryData["store_id"] == parCategoryID) {
                        returnData = categoryData.sub_category;
                    }
                })
                callback(returnData)
            },
            error: (e) => {
                setTimeout(() => {
                    // this.getSubcategoryList(data,callback)
                }, 1000)
            },
        });
    }

    public static getCategoryData(parameter: string, value: string, callback: (data: ProductData[]) => void): void {
        const that = this;
        let jsonData: any
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/product?easy_id=1&${parameter}=${value}`,
            type: 'get',
            data: jsonData,
            contentType: 'application/json; charset=utf-8',
            success: (response: any) => {
                callback(response["product_list"])
            },
            error: (e) => {
                setTimeout(() => {
                    // this.getSubcategoryList(data,callback)
                }, 1000)
            },
        });
    }



    public static getCategoryAllList(callback: (data: any) => void): void {
        const that = this;
        let jsonData: any
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/category`,
            type: 'get',
            data: '',
            contentType: 'application/json; charset=utf-8',
            success: (response: any) => {
                callback(response['category_list'] as CategoryListData[])
            },
            error: (e) => {
                setTimeout(() => {
                    // this.getSubcategoryList(data,callback)
                }, 1000)
            },
        });
    }
}