import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController.js";
import {Editor} from "../editor.js";
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
        topbar:{
            title: "導覽列上方的資訊",
            subContent: "用來顯示聯絡資訊",
            defaultData:{ },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/topbar.js',import.meta.url))
        },
        footer:{
            title: "頁腳",
            subContent: "放在最下方的資訊，以及對網站所有地方的導引",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
        banner:{
            title: "橫幅",
            subContent: "簡單介紹",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/banner.js',import.meta.url))
        },
        about:{
            title: "關於我們",
            subContent: "用來介紹這網站的用途",
            defaultData:{
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/about.js',import.meta.url))
        },
        whyUs:{
            title: "服務內容",
            subContent: "介紹公司服務的內容項目",
            defaultData:{

            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/whyUs.js',import.meta.url))
        },
        client:{
            title: "用戶清單",
            subContent: "顯示客戶的清單和icom",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/client.js',import.meta.url))
        },
        service:{
            title: "服務列表",
            subContent: "卡片式顯示服務的範圍",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/service.js',import.meta.url))
        },
        cta:{
            title: "CTA",
            subContent: "編輯這個網站的cta",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/cta.js',import.meta.url))
        },
        project:{
            title: "作品集",
            subContent: "顯示作品集和分頁顯示",
            defaultData:{},
            //todo 這邊分頁顯示跟上標籤的js沒上
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/project.js',import.meta.url))
        },
        price:{
            title: "價目表",
            subContent: "對應方案所需要的價格",
            defaultData:{},
            //todo 這邊分頁顯示跟上標籤的js沒上
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/price.js',import.meta.url))
        },
        ourTeam:{
            title: "團隊介紹",
            subContent: "卡片式介紹團隊",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/ourTeam.js',import.meta.url))
        },
        contact:{
            title: "聯絡我們",
            subContent: "公司的連絡資訊",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/contact.js',import.meta.url))
        },


        empty:{
            title: "測試",
                subContent: "",
                defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
    }
})