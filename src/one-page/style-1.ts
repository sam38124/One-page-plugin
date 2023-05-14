import {HtmlJson, Plugin} from '../glitterBundle/plugins/plugin-creater.js';
import {Glitter} from '../glitterBundle/Glitter.js';
import {GVC} from '../glitterBundle/GVController.js';
import {Editor} from '../editor.js';
import {TriggerEvent} from '../glitterBundle/plugins/trigger-event.js';

Plugin.create(import.meta.url, (glitter: Glitter, editMode: boolean) => {

    return {
        topNav: {
            title: '網站導覽列',
            subContent: '顯示多個超連結與頁面跳轉導覽的區塊．',
            defaultData: {
                nav: {},
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/topNav.js',import.meta.url)),
        },
        topBanner: {
            title: '廣告輪播',
            subContent: '顯示廣告Banner的置頂大圖',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/topBanner.js',import.meta.url)),
        },
        price: {
            title: '服務價位',
            subContent: '顯示服務價位，與瞭解更多的按鈕．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/price.js',import.meta.url)),
        },
        service: {
            title: '服務區塊',
            subContent: '顯示服務區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/service.js',import.meta.url)),
        },
        project: {
            title: '案例參考',
            subContent: '顯示用戶案例參考列表',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/project.js',import.meta.url)),
        },
        client: {
            title: '合作夥伴',
            subContent: '顯示合作夥伴的區塊',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/client.js',import.meta.url)),
        },
        clientService: {
            title: '問答區塊',
            subContent: '提供問答的區塊',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/clientService.js',import.meta.url)),
        },
        aboutUS: {
            title: '關於我們',
            subContent: '顯示關於我們的區塊',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/aboutUS.js',import.meta.url)),
        },
        contactUS: {
            title: '聯絡我們',
            subContent: '顯示聯絡我們的區塊',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/contactUS.js',import.meta.url)),
        },
        footer: {
            title: '底部區塊',
            subContent: '顯示網頁底部區塊',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url)),
        },
        serviceDetail: {
            title: '服務區塊',
            subContent: '顯示服務區塊的文章內容．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/serviceDetail.js',import.meta.url)),
        },
        otherService: {
            title: '其他服務區塊',
            subContent: '顯示其他服務區塊的內容',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/otherService.js',import.meta.url)),
        },
        template: {
            title: "模板瀏覽",
            subContent: '顯示模板瀏覽的內容',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/template.js',import.meta.url)),
        },
        price2: {
            title: '價位區塊',
            subContent: '顯示價位區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/price2.js',import.meta.url)),
        },
        landingTop: {
            title: '頁面介紹區塊',
            subContent: 'APP置頂介紹區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/landingTop.js',import.meta.url)),
        },
        support: {
            title: '支援項目',
            subContent: '列表顯示支援項目區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/supportWidget.js',import.meta.url)),
        },
        login: {
            title: '登入與註冊．樣式一',
            subContent: '顯示登入與註冊的區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/login.js',import.meta.url)),
        },
        login2: {
            title: '登入與註冊．樣式二',
            subContent: '顯示登入與註冊的區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/login2.js',import.meta.url)),
        },
        videoSample:{
            title: '影片描述',
            subContent: '影片描述顯示區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/videoDesc.js',import.meta.url)),
        }
    };
});



