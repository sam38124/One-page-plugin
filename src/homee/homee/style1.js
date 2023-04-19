import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        homeTitleBar: {
            title: "首頁標頭",
            subContent: "",
            defaultData: {
                bar: [],
                moreLink: [],
            },
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/nav.js', import.meta.url))
        },
        navigationBar: {
            title: "navigationBar",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/navigationBar.js', import.meta.url))
        },
        banner: {
            title: "輪播圖",
            subContent: "",
            defaultData: {
                bar: [],
                moreLink: [],
            },
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/banner.js', import.meta.url))
        },
        image: {
            title: "單一圖片",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/image.js', import.meta.url))
        },
        rankingBlock: {
            title: "多商品 大家都在買",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/rankingBlock.js', import.meta.url))
        },
        label: {
            title: "文字區塊",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/label.js', import.meta.url))
        },
        productItem: {
            title: "商品卡片",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/productItem.js', import.meta.url))
        },
        footer: {
            title: "footer",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
    };
});
