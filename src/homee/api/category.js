import { appConfig } from "../../config.js";
export class Category {
    glitter;
    constructor(glitter) {
        this.glitter = glitter;
    }
    getSubcategoryList(parCategoryID, callback) {
        const glitter = this.glitter;
        const that = this;
        let jsonData;
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/category`,
            type: 'get',
            data: jsonData,
            contentType: 'application/json; charset=utf-8',
            success: (resposnse) => {
                let allCategoryList = resposnse["category_list"];
                let returnData;
                allCategoryList.forEach((categoryData) => {
                    if (categoryData["store_id"] == parCategoryID) {
                        returnData = categoryData.sub_category;
                    }
                });
                callback(returnData);
            },
            error: (e) => {
                setTimeout(() => {
                }, 1000);
            },
        });
    }
    getCategoryData(parameter, value, callback, sortby) {
        const glitter = this.glitter;
        const that = this;
        let jsonData;
        let sortPara = (sortby) ? `&sort_by=${sortby}` : "";
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/product?easy_id=1&${parameter}=${value}${sortPara}`,
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            success: (response) => {
                callback(response["product_list"]);
            },
            error: (e) => {
                setTimeout(() => {
                }, 1000);
            },
        });
    }
    getPageCategoryData(parameter, value, limit, cursor, callback, sortby) {
        const glitter = this.glitter;
        const that = this;
        let jsonData;
        let sortPara = (sortby) ? `&sort_by=${sortby}` : "";
        let url = `${appConfig().serverURL}/api/v1/product?easy_id=1&${parameter}=${value}${sortPara}`;
        if (limit) {
            url += "&limit=" + limit.toString();
        }
        if (cursor) {
            url += "&cursor=" + cursor;
        }
        $.ajax({
            url: url,
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            success: (response) => {
                let apiData = {
                    "cursor": "eyJsYXN0X2lkIjo4MTM5Mjk2MjQ0MDEyLCJsYXN0X3ZhbHVlIjoxM30=",
                    "total_count": 6,
                    "product_list": [
                        {
                            "id": 8224106709292,
                            "name": "（銀標福利品）MARTI 梳妝台",
                            "images": [
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49205162.jpg?v=1679327415"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49207054.jpg?v=1679327415"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49208706.jpg?v=1679327415"
                                }
                            ],
                            "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49205162.jpg?v=1679327415&width=720",
                            "sale_price": 2900,
                            "price": 8200,
                            "showUp": false,
                            "quantity": 1
                        },
                        {
                            "id": 8224083345708,
                            "name": "（銀標福利品）VALENCIA 床頭收納櫃 深灰 ＃1",
                            "images": [
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49370350.jpg?v=1679325664"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49387027.jpg?v=1679325664"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49386830.jpg?v=1679325664"
                                }
                            ],
                            "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49370350.jpg?v=1679325664&width=720",
                            "sale_price": 2500,
                            "price": 7500,
                            "showUp": false,
                            "quantity": 1
                        },
                        {
                            "id": 8139432100140,
                            "name": "（銀標福利品）MARTI 妝凳",
                            "images": [
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49203217.jpg?v=1675672906"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49203067.jpg?v=1675672907"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49203311.jpg?v=1675672909"
                                }
                            ],
                            "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49203217.jpg?v=1675672906&width=720",
                            "sale_price": 300,
                            "price": 2000,
                            "showUp": false,
                            "quantity": 1
                        },
                        {
                            "id": 8139427250476,
                            "name": "（銀標福利品）COSLADA 鏡櫃",
                            "images": [
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49259984.jpg?v=1675672549"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49261372.jpg?v=1675672549"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49261374.jpg?v=1675672550"
                                }
                            ],
                            "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49259984.jpg?v=1675672549&width=720",
                            "sale_price": 6200,
                            "price": 13990,
                            "showUp": false,
                            "quantity": 1
                        },
                        {
                            "id": 8139397595436,
                            "name": "（銀標福利品）DOLE 餐椅 藍 ＃2",
                            "images": [
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49311492.jpg?v=1675671272"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49311730.jpg?v=1675671271"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49311731.jpg?v=1675671272"
                                }
                            ],
                            "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49311492.jpg?v=1675671272&width=720",
                            "sale_price": 300,
                            "price": 1690,
                            "showUp": false,
                            "quantity": 1
                        },
                        {
                            "id": 8139296244012,
                            "name": "（銀標福利品）TOLEDO 收納五抽櫃 深灰",
                            "images": [
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49365292.jpg?v=1675671067"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49360712.jpg?v=1675671067"
                                },
                                {
                                    "url": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49360703.jpg?v=1675671067"
                                }
                            ],
                            "preview_image": "https://cdn.shopify.com/s/files/1/0704/0158/9548/products/49365292.jpg?v=1675671067&width=720",
                            "sale_price": 5100,
                            "price": 13800,
                            "showUp": false,
                            "quantity": 1
                        }
                    ]
                };
                callback(response);
            },
            error: (e) => {
                setTimeout(() => {
                }, 1000);
            },
        });
    }
    getCategoryAllList(callback) {
        const glitter = this.glitter;
        const that = this;
        let jsonData;
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/category`,
            type: 'get',
            data: '',
            contentType: 'application/json; charset=utf-8',
            success: (response) => {
                callback(response['category_list']);
            },
            error: (e) => {
                setTimeout(() => {
                }, 1000);
            },
        });
    }
}
