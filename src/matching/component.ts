import {Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";

Plugin.create(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        serviceBlock: {
            title: '服務區塊',
            subContent: '設定服務的區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./widgets/service.js',import.meta.url)),
        },
        serviceList: {
            title: '服務列表',
            subContent: '顯示所有服務列表．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./widgets/getcase.js',import.meta.url)),
        },
        form_budget: {
            title: '表單預算',
            subContent: '表單預算填寫．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./widgets/form_budget.js',import.meta.url)),
        },
        form:{
            title: '表單設定',
            subContent: '設定表單內容．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./widgets/form.js',import.meta.url)),
        },
        post_form:{
            title: '發案表單',
            subContent: '發案表單設定．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./widgets/post_form.js',import.meta.url)),
        },
    }
})