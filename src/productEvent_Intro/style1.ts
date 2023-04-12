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
                bar:[],
                moreLink:[],
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/nav.js',import.meta.url))
        },
        intro:{
            title: "介紹頁面",
            subContent: "簡短介紹",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/intro.js',import.meta.url))
        },
        feature:{
            title: "特色",
            subContent: "特色跟重點介紹",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/feature.js',import.meta.url))
        },
        feature2:{
            title: "另一種特色呈現",
            subContent: "特色跟重點介紹",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/feature2.js',import.meta.url))
        },
        feature3:{
            title: "第三種特色呈現",
            subContent: "特色跟重點介紹",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/feature3.js',import.meta.url))
        },
        feature4:{
            title: "第四種特色呈現",
            subContent: "特色跟重點介紹",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/feature4.js',import.meta.url))
        },
        screenshots:{
            title: "實際操作畫面",
            subContent: "畫面展示",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/screenshots.js',import.meta.url))
        },
        video:{
            title: "宣傳影片",
            subContent: "簡單影片和介紹文宣",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/video.js',import.meta.url))
        },
        price:{
            title: "資費",
            subContent: "資費方案資訊",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/price.js',import.meta.url))
        },
        sub:{
            title: "訂閱",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/sub.js',import.meta.url))
        },
        team:{
            title: "團隊介紹",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/team.js',import.meta.url))
        },
        client:{
            title: "用戶回饋",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/client.js',import.meta.url))
        },
        faq:{
            title: "常見問題",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/faq.js',import.meta.url))
        },
        download:{
            title: "app下載",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/download.js',import.meta.url))
        },
        contact:{
            title: "聯絡我們",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/contact.js',import.meta.url))
        },
        footer:{
            title: "頁腳",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },

    }
})