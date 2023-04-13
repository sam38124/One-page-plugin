import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        topNav: {
            title: '後台管理系統',
            subContent: '後台管理系統常用元件．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/backend-manager.js', import.meta.url)),
        },
        memberManager: {
            title: '用戶管理',
            subContent: '用戶管理元件．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/member-manager.js', import.meta.url)),
        },
        form: {
            title: '編輯用表單',
            subContent: '編輯用表單，可用來編輯內容',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/form.js', import.meta.url)),
        }
    };
});
