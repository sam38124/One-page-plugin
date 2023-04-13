import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(`<h3 class="" style="color: black;">test</h3>`);
                        }, 3000);
                    });
                },
                editor: () => {
                    return ``;
                },
            };
        },
    };
});
