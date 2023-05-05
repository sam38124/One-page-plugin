import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        nav: {
            title: "導覽列",
            subContent: "用來快速抵達頁面各處的nav",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/nav.js', import.meta.url))
        },
        empty: {
            title: "",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
    };
});
