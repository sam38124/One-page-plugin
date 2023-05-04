import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {Editor} from "../../editor.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    // https://liondesign.tw/restaurant/index.html?type=editor&dialog=caddDialog&page=footer

    return {

        search:{
            title: "search",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/search.js',import.meta.url))
        },
    }
})