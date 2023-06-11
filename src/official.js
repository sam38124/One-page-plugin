import { Plugin } from "./glitterBundle/plugins/plugin-creater.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    return {
        widget: {
            title: 'HTML元件',
            subContent: '添加一個HTML元素',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./official/widget.js', import.meta.url)),
        },
        container: {
            title: '容器',
            subContent: '一個父容器，可以存放多個元件．',
            defaultData: {
                setting: []
            },
            render: (gvc, widget, setting, hoverID) => {
                return {
                    view: () => {
                        return ``;
                    },
                    editor: (() => {
                        return ``;
                    })
                };
            }
        },
        component: {
            title: "嵌入模塊",
            subContent: "將製作好的頁面，當作模塊進行嵌入．",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./official/component.js', import.meta.url)),
        },
        mobileFooter: {
            title: '手機版導覽列',
            subContent: '手機版底部導覽列．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./official/footer.js', import.meta.url)),
        },
        arrayItem: {
            title: '陣列元件',
            subContent: '陣列元件產生．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./official/array_item.js', import.meta.url)),
        },
    };
});
