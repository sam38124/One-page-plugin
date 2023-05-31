import {Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";

Plugin.create(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        serviceBlock: {
            title: '服務區塊',
            subContent: '設定服務的區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url,new URL('./widgets/service.js',import.meta.url)),
        }
    }
})