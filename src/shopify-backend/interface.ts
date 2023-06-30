import {Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    return {
        nav:{
            title: "商品上傳頁面",
            subContent: "商品上傳頁面",
            defaultData:{
            },
            render: Plugin.setComponent(import.meta.url,new URL('./product/post.js',import.meta.url))
        },
        OrderPost:{
            title: "訂單詳細頁面",
            subContent: "訂單詳細頁面",
            defaultData:{
            },
            render: Plugin.setComponent(import.meta.url,new URL('./order/post.js',import.meta.url))
        },
    }
})