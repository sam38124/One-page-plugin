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

            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/nav.js',import.meta.url))
        },
        hero:{
            title: "hero",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/hero.js',import.meta.url))
        },
        about:{
            title: "about",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/about.js',import.meta.url))
        },
        service:{
            title: "service",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/service.js',import.meta.url))
        },
        project:{
            title: "project",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/project.js',import.meta.url))
        },
        FAQ:{
            title: "FAQ",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/FAQ.js',import.meta.url))
        },
        team:{
            title: "team",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/team.js',import.meta.url))
        },
        client:{
            title: "client",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/client.js',import.meta.url))
        },
        contact:{
            title: "contact",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/contact.js',import.meta.url))
        },
        footer:{
            title: "footer",
                subContent: "",
                defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
    }
})