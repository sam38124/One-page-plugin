import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {Editor} from "../../editor.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    // https://liondesign.tw/restaurant/index.html?type=editor&dialog=caddDialog&page=footer

    return {
        login:{
            title: "login",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/login.js',import.meta.url))
        },
        register:{
            title: "register",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/register.js',import.meta.url))
        },

        forgotPW:{
            title: "forgotPW",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/forgotPW.js',import.meta.url))
        },

        footer:{
            title: "footer",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
    }
})