import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {Editor} from "../../editor.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    return {
        orderHistory:{
            title: "orderHistory",
            subContent: "",
            defaultData:{
                //maxlength is 6
                orderData: [{
                    number: "20220718",
                    date: "2022-07-18",
                    paysStatus: 3,
                    processingStatus: 0,
                    amount: 470,
                },
                    {
                        number: "20211108",
                        date: "2021-11-08",
                        paysStatus: 3,
                        processingStatus: 2,
                        amount: 470,
                    }],
                event: {},
                payStatus: ["未付款", "付款失敗", "超過付款時間", "已付款", "退款中", "以退款"],
                processingStatus: ["待出貨", "出貨中", "已出貨", "已取消"]
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/orderHistory.js',import.meta.url))
        },
        orderAllHistory:{
            title: "orderAllHistory",
            subContent: "",
            defaultData: {
                orderData: [{
                    number: "20220718",
                    date: "2022-07-18",
                    paysStatus: 3,
                    processingStatus: 0,
                    amount: 470,
                },
                    {
                        number: "20211108",
                        date: "2021-11-08",
                        paysStatus: 3,
                        processingStatus: 2,
                        amount: 470,
                    },],
                event: {},
                payStatus: ["未付款", "付款失敗", "超過付款時間", "已付款", "退款中", "以退款"],
                processingStatus: ["待出貨", "出貨中", "已出貨", "已取消"]
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/orderAllHistory.js',import.meta.url))
        },

        footer:{
            title: "footer",
            subContent: "",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
    }
})