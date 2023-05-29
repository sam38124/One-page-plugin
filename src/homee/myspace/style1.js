import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        index: {
            title: "index",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/index.js', import.meta.url))
        },
        allSpace: {
            title: "allSpace",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/allSpace.js', import.meta.url))
        },
        scanStart: {
            title: "scanStart",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/scanStart.js', import.meta.url))
        },
        guide1: {
            title: "guide1",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/guide1.js', import.meta.url))
        },
        guide2: {
            title: "guide2",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/guide2.js', import.meta.url))
        },
        guide3: {
            title: "guide3",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/guide3.js', import.meta.url))
        },
        guide4: {
            title: "guide4",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/guide4.js', import.meta.url))
        },
        footer: {
            title: "footer",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
    };
});
