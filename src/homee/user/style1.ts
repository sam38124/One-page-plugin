import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {Editor} from "../../editor.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    // https://liondesign.tw/restaurant/index.html?type=editor&dialog=caddDialog&page=footer

    return {
        nav:{
            title: "nav",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/nav.js',import.meta.url))
        },
        information:{
            title: "information",
            subContent: "",
            defaultData:{

            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/information.js',import.meta.url))
        },
        funRow:{
            title: "funRow",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/funRow.js',import.meta.url))
        },
        funPuzzle:{
            title: "funPuzzle",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/funPuzzle.js',import.meta.url))
        },
        ourService:{
            title: "ourService",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/ourService.js',import.meta.url))
        },
        edit:{
            title: "edit",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/edit.js',import.meta.url))
        },
        systemSetting:{
            title: "systemSetting",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/systemSetting.js',import.meta.url))
        },

        footer:{
            title: "footer",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
    }
})