import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        nav: {
            title: "導覽列",
            subContent: "用來快速抵達頁面各處的nav",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/nav.js', import.meta.url))
        },
        footer: {
            title: "頁腳",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
        keyVision: {
            title: "keyVision",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/keyVision.js', import.meta.url))
        },
        domain: {
            title: "domain",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/domain.js', import.meta.url))
        },
        about: {
            title: "about",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/about.js', import.meta.url))
        },
        price: {
            title: "price",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/price.js', import.meta.url))
        },
        comp: {
            title: "comp",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/comp.js', import.meta.url))
        },
        test: {
            title: "test",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/test.js', import.meta.url))
        },
        team: {
            title: "team",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/team.js', import.meta.url))
        },
        empty: {
            title: "",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
    };
});
