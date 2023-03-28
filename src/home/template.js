import { Plugin } from '../glitterBundle/plugins/plugin-creater.js';
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        temp: {
            title: '網站導覽列',
            subContent: '顯示多個超連結與頁面跳轉導覽的區塊．',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                return {
                    view: () => {
                        return ``;
                    },
                    editor: () => {
                        return ``;
                    },
                };
            },
        },
    };
});
