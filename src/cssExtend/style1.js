import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        extend: {
            title: "cssExtend",
            subContent: "css自動完成的editor",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/cssExtend.js', import.meta.url))
        },
    };
});
