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
        oneblock:{
            title: "測試區塊",
            subContent: "測試全部塞再一起",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/oneblock.js',import.meta.url))
        },
        colCard:{
            title: "卡片",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/colCard.js',import.meta.url))
        },


        empty:{
            title: "",
                subContent: "",
                defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
    }
})