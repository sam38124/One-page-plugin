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
        banner:{
            title: "banner",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/banner.js',import.meta.url))
        },
        service:{
            title: "service",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/service.js',import.meta.url))
        },
        about:{
            title: "about",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/about.js',import.meta.url))
        },
        client:{
            title: "client",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/client.js',import.meta.url))
        },
        cta:{
            title: "cta",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/cta.js',import.meta.url))
        },
        focus:{
            title: "focus",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/focus.js',import.meta.url))
        },


        empty:{
            title: "",
                subContent: "",
                defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
    }
})