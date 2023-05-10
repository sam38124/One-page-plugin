import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController.js";
import {Editor} from "../editor.js";
import {ClickEvent} from "../glitterBundle/plugins/click-event.js";
import {ScriptStyle1} from "./script-style-1.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    // https://liondesign.tw/restaurant/index.html?type=editor&dialog=caddDialog&page=footer
    return {
        nav:{
            title: "導覽列",
            subContent: "用來快速抵達頁面各處的nav",
            defaultData:{
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/nav.js',import.meta.url))
        },
        hero:{
            title: "主視覺圖",
            subContent: "透過標語、圖片來代表或表達品牌、活動或產品，提供直觀且易於辨識的網頁元件。",
            defaultData:{
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/hero.js',import.meta.url))
        },
        gallery:{
            title: "畫廊",
            subContent: "排列展示自己的作品圖片",
            defaultData:{
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/gallery.js',import.meta.url))
        },
        footer:{
            title: "頁腳",
            subContent: "用於顯示版權信息、聯絡資訊、導航連結及其他相關頁面，提供用戶方便的導航和訊息查詢。",
            defaultData:{
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
        about:{
            title: "關於自己",
            subContent: "探索我們的故事、成就和熱情，一起開啟新的連結。",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/about.js',import.meta.url))
        },
        test:{
            title: "用戶回饋",
            subContent: "他人分享的意見和建議，協助我們不斷改進。",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/test.js',import.meta.url))
        },
        service:{
            title: "服務簡介",
            subContent: "探索我們提供的多元化服務，滿足您的需求。",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/service.js',import.meta.url))
        },
        price:{
            title: "服務價格",
            subContent: "清晰呈現各項服務的價格，讓您輕鬆了解成本概況。",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/price.js',import.meta.url))
        },
        contact:{
            title: "聯繫資訊",
            subContent: "輕鬆建立聯繫資訊，分享問題、意見或需求，以便提供個性化的支援和解答。",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/contact.js',import.meta.url))
        },


        empty:{
            title: "空的",
                subContent: "",
                defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
    }
})