import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        serviceBlock: {
            title: '服務區塊',
            subContent: '設定服務的區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./widgets/service.js', import.meta.url)),
        },
        serviceList: {
            title: '服務列表',
            subContent: '顯示所有服務列表．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./widgets/getcase.js', import.meta.url)),
        },
        form_budget: {
            title: '表單預算',
            subContent: '表單預算填寫．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./widgets/form_budget.js', import.meta.url)),
        }
    };
});
