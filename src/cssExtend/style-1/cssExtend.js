import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    let id = glitter.getUUID();
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                           `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return `
                    <button type="button" class="btn  w-100  shadow mt-2" style="background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);" onclick="${gvc.event((e) => {
                        glitter.openDiaLog(`${new URL('../dialog/dialog.js', import.meta.url)}`, 'cssExtend', "");
                    })}">設計樣式</button>
                    `;
                }
            };
        },
    };
});
