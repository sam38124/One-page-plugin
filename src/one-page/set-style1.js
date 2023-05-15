import { TriggerEvent } from "../glitterBundle/plugins/trigger-event.js";
import { Editor } from "../editor.js";
import { ScriptStyle1 } from "./script-style-1.js";
TriggerEvent.create(import.meta.url, {
    setStyle: {
        title: '樣式設定',
        fun: (gvc, widget, object) => {
            object.style = object.style ?? "dark-mode";
            return {
                editor: () => {
                    return Editor.select({
                        title: "樣式設定",
                        gvc: gvc,
                        def: object.style,
                        array: [{ title: "深色", value: "dark-mode" }, { title: "淺色", value: "light-mode" }],
                        callback: (text) => {
                            object.style = text;
                        }
                    });
                },
                event: () => {
                    ScriptStyle1.style = object.style;
                    return new Promise((resolve, reject) => {
                        gvc.glitter.addStyleLink([
                            ScriptStyle1.getRout('assets/vendor/boxicons/css/boxicons.min.css'),
                            ScriptStyle1.getRout('assets/vendor/swiper/swiper-bundle.min.css'),
                            'https://unpkg.com/aos@next/dist/aos.css',
                            ScriptStyle1.getRout('assets/css/theme.min.css'),
                            ScriptStyle1.getRout('app.css'),
                        ]);
                        resolve(true);
                        window.root.classList.remove('dark-mode');
                        window.root.classList.remove('light-mode');
                        window.root.classList.add(ScriptStyle1.style);
                    });
                },
            };
        },
    }
});
