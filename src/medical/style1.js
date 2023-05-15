import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        nav: {
            title: "導覽列",
            subContent: "用來快速抵達頁面各處的nav",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/nav.js', import.meta.url))
        },
        hero: {
            title: "主視覺圖",
            subContent: "透過標語、圖片來代表或表達品牌、活動或產品，提供直觀且易於辨識的網頁元件。",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/hero.js', import.meta.url))
        },
        iconBoxes: {
            title: "圖示小標語",
            subContent: "透過精美的圖示與簡潔的說明，展現吸引眼球的內容。",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/iconBoxes.js', import.meta.url))
        },
        showreel: {
            title: "影片專區",
            subContent: "透過精心製作的影片，生動的傳達內容",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/showreel.js', import.meta.url))
        },
        service: {
            title: "服務簡介",
            subContent: "探索我們提供的多元化服務，滿足您的需求。",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/service.js', import.meta.url))
        },
        empty: {
            title: "",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
    };
});
