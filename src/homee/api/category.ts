import {Glitter} from "../../glitterBundle/Glitter.js";
import {appConfig} from "../../config.js";

export interface ProductData {
    id: string,
    modelUrl: string,
    multiple: string,
    name: string,
    preview_image: string,
    price: number,
    sale_price: number,
    sku: string,
    spec: string,
}

export interface CategoryListData {
    id: number,
    name: string,
    image_url: string,
    store_id: string,
    sub_category: SubCategoryListData[]

}

export interface SubCategoryListData {
    easy_collection_id: number,
    id: number,
    image_url: string,
    name: string,
    parent_category_id: number

}


export class Category {
    public glitter: Glitter

    constructor(glitter: Glitter) {
        this.glitter = glitter;
    }

    //取得文章列表
    public getSubcategoryList(parCategoryID: string, callback: (data: any) => void) {
        const glitter = this.glitter;
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

    public getCategoryData(parameter: string, value: string, callback: (data: ProductData[] ) => void , sortby?:string): void {
        const glitter = this.glitter;
        const that = this;
        let jsonData: any
        let sortPara = (sortby)?`&sort_by=${sortby}`:""
        // sort_by: 'manual' | 'best-selling' | 'alpha' | 'alpha-desc' | 'price' | 'price-desc' | 'lastest' | 'lastest-desc';
        $.ajax({
            url: `${appConfig().serverURL}/api/v1/product?easy_id=1&${parameter}=${value}${sortPara}`,
            type: 'get',
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
    public getPageCategoryData(parameter: string, value: string,  limit:number , cursor:string , callback: (data: any ) => void , sortby?:string): void {
        const glitter = this.glitter;
        const that = this;
        let jsonData: any
        let sortPara = (sortby)?`&sort_by=${sortby}`:""
        let url = `${appConfig().serverURL}/api/v1/product?easy_id=1&${parameter}=${value}${sortPara}`;
        if (limit){
            url += "&limit=" + limit.toString();
        }
        if (cursor){
            url += "&cursor=" + cursor;
        }
        // sort_by: 'manual' | 'best-selling' | 'alpha' | 'alpha-desc' | 'price' | 'price-desc' | 'lastest' | 'lastest-desc';
        $.ajax({
            url: url,
            type: 'get',
            contentType: 'application/json; charset=utf-8',
            success: (response: any) => {
                //原api資料 cursor用來取得下一頁的產品資訊
                let apiData:{
                    cursor:string,
                    total_count:number,
                    product_list:{
                        id:number,
                        name:string,
                        images:{
                            url:string
                        }[],
                        preview_image:string,
                        sale_price:number,
                        price:number,
                        showUp:boolean,
                        quantity:number
                    }[]
                } = {
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
                }
                callback(response)
            },
            error: (e) => {
                setTimeout(() => {
                    // this.getSubcategoryList(data,callback)
                }, 1000)
            },
        });
    }

    public getCategoryAllList(callback: (data: any) => void): void {
        const glitter = this.glitter;
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

