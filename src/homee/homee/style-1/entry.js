import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../../editor.js";
import { ScriptStyle1 } from "../../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        render: (gvc, widget, setting, hoverID, subData) => {
            widget.data.layout = widget.data.layout ?? {};
            widget.data.layout.lottie = widget.data.layout.lottie ?? new URL('../img/homeelogo.json', import.meta.url);
            return {
                editor: () => {
                    return Editor.toggleExpand({
                        gvc: gvc,
                        title: "啟動動畫",
                        data: widget.data.layout,
                        innerText: () => {
                            return [Editor.uploadLottie({
                                    gvc: gvc,
                                    title: `啟動動畫[可選圖檔或Lottie動畫區塊]`,
                                    def: widget.data.layout.lottie ?? "",
                                    callback: (text) => {
                                        widget.data.layout.lottie = text;
                                        widget.refreshComponent();
                                    }
                                })].join('');
                        }
                    });
                },
                view: () => {
                    const id = glitter.getUUID();
                    ScriptStyle1.initialScript(gvc, widget);
                    gvc.addMtScript([{ src: `https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js` }], () => {
                        gvc.notifyDataChange(id);
                    }, () => {
                    });
                    return gvc.bindView(() => {
                        return {
                            bind: id,
                            view: () => {
                                return `
                       <div class="w-100 d-flex align-items-center justify-content-center flex-column vh-100 ">
                       ${(widget.data.layout.lottie.split('.').pop() === "json") ? `
                                <lottie-player src="${widget.data.layout.lottie}"    speed="1"  onclick="${gvc.event((e) => {
                                })}" class="vw-100 "  loop  autoplay></lottie-player>
                                ` : `
                                <img src="${widget.data.layout.lottie}"  class="vw-100">
                                `}
                       </div>`;
                            },
                            divCreate: {}
                        };
                    });
                }
            };
        }
    };
});
