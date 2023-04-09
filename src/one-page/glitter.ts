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
    };
});

