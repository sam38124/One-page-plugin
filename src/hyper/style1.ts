import {Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";

Plugin.create(import.meta.url, (glitter: Glitter, editMode: boolean) => {

    return {
        topNav: {
            title: '後台管理系統',
            subContent: '後台管理系統常用元件．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/backend-manager.js',import.meta.url)),
        },
        memberManager: {
            title: '用戶管理',
            subContent: '用戶管理元件．',
            defaultData: { },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/member-manager.js',import.meta.url)),
        },
        form:{
            title: '編輯用表單',
            subContent: '編輯用表單，可用來編輯內容',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/form.js',import.meta.url)),
        },
        table:{
            title: '表格顯示區塊',
            subContent: '用來顯示表格的區塊內容',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/table.js',import.meta.url)),
        },
        changememory:{
            title:"修改紀錄",
            subContent: '用來顯示表格的區塊內容',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/change-memory.js',import.meta.url))
        }
    }
})