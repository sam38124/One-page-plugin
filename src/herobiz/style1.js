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
            title: "footer",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
        banner: {
            title: "banner",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/banner.js', import.meta.url))
        },
        service: {
            title: "service",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/service.js', import.meta.url))
        },
        about: {
            title: "about",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/about.js', import.meta.url))
        },
        client: {
            title: "client",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/client.js', import.meta.url))
        },
        cta: {
            title: "cta",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/cta.js', import.meta.url))
        },
        focus: {
            title: "focus",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/focus.js', import.meta.url))
        },
        service2: {
            title: "service2",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/service2.js', import.meta.url))
        },
        testimonials: {
            title: "testimonials",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/test.js', import.meta.url))
        },
        price: {
            title: "price",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/price.js', import.meta.url))
        },
        FAQ: {
            title: "FAQ",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/FAQ.js', import.meta.url))
        },
        portfolio: {
            title: "portfolio",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/portfolio.js', import.meta.url))
        },
        team: {
            title: "team",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/team.js', import.meta.url))
        },
        contact: {
            title: "contact",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/contact.js', import.meta.url))
        },
        empty: {
            title: "",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
    };
});
