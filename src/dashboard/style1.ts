import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController.js";
import {Editor} from "../editor.js";

import {ScriptStyle1} from "./script-style-1.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    // https://liondesign.tw/restaurant/index.html?type=editor&dialog=caddDialog&page=footer

    return {
        nav:{
            title: "導覽列",
            subContent: "用來快速抵達頁面各處的nav",
            defaultData:{

            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/nav.js',import.meta.url))
        },
        oneblock:{
            title: "測試區塊",
            subContent: "測試全部塞再一起",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/oneblock.js',import.meta.url))
        },
        colCard:{
            title: "卡片",
            subContent: "小張卡片式顯示時間內數字的變化",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/colCard.js',import.meta.url))
        },
        smoothLine:{
            title: "smoothLine",
            subContent: "給定時間和資料 繪製折線圖",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/smoothLine.js',import.meta.url))
        },
        table_barChart:{
            title: "table_barChart",
            subContent: "繪製直方圖和簡易表格",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/table_barChart.js',import.meta.url))
        },
        radar:{
            title: "radar",
            subContent: "各式資料的雷達圖",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/radar.js',import.meta.url))
        },
        multiRadial:{
            title: "multiRadial",
            subContent: "用圓餅放射圖呈現資料的關係",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/multiRadial.js',import.meta.url))
        },
        table:{
            title: "table",
            subContent: "表格呈現數字和百分比",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/table.js',import.meta.url))
        },
        table2:{
            title: "table2",
            subContent: "表格呈現數字、百分比和一欄自定義功能",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/table2.js',import.meta.url))
        },
        table3:{
            title: "table3",
            subContent: "n列兩欄數字呈現資料表格",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/table3.js',import.meta.url))
        },
        table4:{
            title: "table4",
            subContent: "n列三欄，自帶小標的數字表格",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/table4.js',import.meta.url))
        },
        table5:{
            title: "table5",
            subContent: "一筆資料兩列三行 各自呈現標頭",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/table5.js',import.meta.url))
        },
        table6:{
            title: "table6",
            subContent: "一筆資料兩列 同時帶圖 時間 和設定",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/table6.js',import.meta.url))
        },
        dataCard:{
            title: "dataCard",
            subContent: "各式呈現數字變化的卡片",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/dataCard.js',import.meta.url))
        },
        radial:{
            title: "radial",
            subContent: "用圓餅放射圖呈現資料的關係 並且用顏色、圖式來凸顯資料",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/radial.js',import.meta.url))
        },
        revenue:{
            title: "revenue",
            subContent: "用折線圖或是區塊圖比較兩筆資料",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/revenue.js',import.meta.url))
        },
        stateList:{
            title: "stateList",
            subContent: "人員情報和狀態欄",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/stateList.js',import.meta.url))
        },
        todoList:{
            title: "todoList",
            subContent: "備忘錄 這個套件在dashboard.js的addMtScript有狀況",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/todoList.js',import.meta.url))
        },
        revenue_detail:{
            title: "revenue_detail",
            subContent: "用詳細的折線圖或是區塊圖比較兩筆資料",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/revenue_detail.js',import.meta.url))
        },
        doubleBarChart:{
            title: "doubleBarChart",
            subContent: "兩樣資料相互比較的累積長條圖",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/doubleBarChart.js',import.meta.url))
        },
        donutChart:{
            title: "donutChart",
            subContent: "百分比式環圈圖",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/donutChart.js',import.meta.url))
        },
        timeline:{
            title: "timeline",
            subContent: "帶有時間順序的通知列表",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/timeline.js',import.meta.url))
        },
        rowCard:{
            title: "rowCard",
            subContent: "一列 卡片式呈現資料數字和圖式",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/rowCard.js',import.meta.url))
        },
        donutTrend:{
            title: "donutTrend",
            subContent: "多筆資料數字式環圈圖",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/donutTrend.js',import.meta.url))
        },
        taskList:{
            title: "taskList",
            subContent: "任務表 同時記錄/修改任務狀況",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/taskList.js',import.meta.url))
        },
        barArea:{
            title: "barArea",
            subContent: "任務進度直條圖總覽",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/barArea.js',import.meta.url))
        },
        calendarList:{
            title: "calendarList",
            subContent: "行事曆 但日曆跑不出來",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/calendarList.js',import.meta.url))
        },




        empty:{
            title: "",
                subContent: "",
                defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
    }
})