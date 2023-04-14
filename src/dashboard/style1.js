import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        nav: {
            title: "導覽列",
            subContent: "用來快速抵達頁面各處的nav",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/nav.js', import.meta.url))
        },
        oneblock: {
            title: "測試區塊",
            subContent: "測試全部塞再一起",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/oneblock.js', import.meta.url))
        },
        colCard: {
            title: "卡片",
            subContent: "小張卡片式顯示時間內數字的變化",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/colCard.js', import.meta.url))
        },
        smoothLine: {
            title: "smoothLine",
            subContent: "給定時間和資料 繪製折線圖",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/smoothLine.js', import.meta.url))
        },
        table_barChart: {
            title: "table_barChart",
            subContent: "繪製直方圖和簡易表格",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/table_barChart.js', import.meta.url))
        },
        radar: {
            title: "radar",
            subContent: "各式資料的雷達圖",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/radar.js', import.meta.url))
        },
        multiRadial: {
            title: "multiRadial",
            subContent: "用圓餅放射圖呈現資料的關係",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/multiRadial.js', import.meta.url))
        },
        table: {
            title: "table",
            subContent: "表格呈現數字和百分比",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/table.js', import.meta.url))
        },
        table2: {
            title: "table2",
            subContent: "表格呈現數字、百分比和一欄自定義功能",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/table2.js', import.meta.url))
        },
        table3: {
            title: "table3",
            subContent: "n列兩欄數字呈現資料表格",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/table3.js', import.meta.url))
        },
        dataCard: {
            title: "dataCard",
            subContent: "各式呈現數字變化的卡片",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/dataCard.js', import.meta.url))
        },
        radial: {
            title: "radial",
            subContent: "用圓餅放射圖呈現資料的關係 並且用顏色、圖式來凸顯資料",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/radial.js', import.meta.url))
        },
        revenue: {
            title: "revenue",
            subContent: "用折線圖或是區塊圖比較兩筆資料",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/revenue.js', import.meta.url))
        },
        empty: {
            title: "",
            subContent: "",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
    };
});
