import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";


Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    // https://liondesign.tw/restaurant/index.html?type=editor&dialog=caddDialog&page=footer

    return {

        extend:{
            title: "cssExtend",
            subContent: "css自動完成的editor",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/cssExtend.js',import.meta.url))
        },

    }
})