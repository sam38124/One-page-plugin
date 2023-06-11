import {HtmlJson, Plugin} from '../glitterBundle/plugins/plugin-creater.js';
import {Glitter} from '../glitterBundle/Glitter.js';

Plugin.create(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        landingHeader: {
            title: 'APP管理頁',
            subContent: '顯示星澄基地的APP管理頁．',
            defaultData: {},
            render:Plugin.setComponent(import.meta.url,new URL('./glitter/appManager.js',import.meta.url)),
        },
        createApp:{
            title: '模板建立',
            subContent: '模板建立頁面．',
            defaultData: {},
            render:Plugin.setComponent(import.meta.url,new URL('./glitter/createApp.js',import.meta.url)),
        },
        createAppV2:{
            title: '模板建立V2',
            subContent: '模板建立V2．',
            defaultData: {},
            render:Plugin.setComponent(import.meta.url,new URL('./glitter/createAppV2.js',import.meta.url)),
        }
    };
});

