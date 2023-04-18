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
            subContent: "放在最下方的資訊，以及對網站所有地方的導引",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
        hero: {
            title: "主視覺圖",
            subContent: "進入頁面後的第一頁面",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/hero.js', import.meta.url))
        },
        about: {
            title: "關於我們",
            subContent: "概略介紹關於自己",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/about.js', import.meta.url))
        },
        feature: {
            title: "特色區塊",
            subContent: "系統化介紹特色功能",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/feature.js', import.meta.url))
        },
        service: {
            title: "服務",
            subContent: "卡片式介紹服務",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/service.js', import.meta.url))
        },
        portfolio: {
            title: "作品案例",
            subContent: "展示所有作品的內容",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/portfolio.js', import.meta.url))
        },
        cta: {
            title: "CTA",
            subContent: "編輯這個網站的cta",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/cta.js', import.meta.url))
        },
        testimonial: {
            title: "客戶回饋",
            subContent: "編輯客戶的回饋和留言卡片",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/testimonial.js', import.meta.url))
        },
        team: {
            title: "成員介紹",
            subContent: "卡片式介紹成員",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/team.js', import.meta.url))
        },
        client: {
            title: "合作夥伴",
            subContent: "圖的方式放置合作夥伴的標誌",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/client.js', import.meta.url))
        },
        price: {
            title: "價目表",
            subContent: "說明各式方案和價格",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/price.js', import.meta.url))
        },
        FAQ: {
            title: "常見問題",
            subContent: "列舉常見問題和回答",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/FAQ.js', import.meta.url))
        },
        contact: {
            title: "聯絡我們",
            subContent: "聯繫資訊和表單",
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
