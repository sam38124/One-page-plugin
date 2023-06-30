import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        nav: {
            title: "商品上傳頁面",
            subContent: "商品上傳頁面",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./product/post.js', import.meta.url))
        },
    };
});
