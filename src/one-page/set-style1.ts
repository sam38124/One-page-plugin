import {TriggerEvent} from "../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../editor.js";
import {ScriptStyle1} from "./script-style-1.js";

TriggerEvent.create(import.meta.url,{
    setStyle:{
        title: '樣式設定',
        fun: (gvc, widget, object) => {
            object.style=object.style ?? "dark-mode";
            return {
                editor: () => {
                    return Editor.select({
                        title:"樣式設定",
                        gvc:gvc,
                        def:object.style,
                        array:[{title:"深色",value:"dark-mode"},{title:"淺色",value:"light-mode"}],
                        callback:(text)=>{
                            object.style=text
                        }
                    })
                },
                event: () => {
                    ScriptStyle1.style=object.style
                },
            };
        },
    }
})