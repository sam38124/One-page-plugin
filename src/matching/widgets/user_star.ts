import {Plugin} from "../../glitterBundle/plugins/plugin-creater.js";

export const user_star = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID, subData) => {
            return {
                view: () => {
                    widget.data.count=widget.data.count??5
                    let starCount:any = parseFloat(widget.data.count).toFixed(1)

                    return `<div class="d-flex align-items-center" style="gap:2px;">
    <span class="text-warning fw-bold me-1">${starCount}</span>
    ${(() => {
                        let html = ''
                        for (let a = 1; a <= 5; a++) {
                            if (starCount >= a) {
                                html+= `<i class="fa-solid fa-star text-warning"></i>`
                            } else if (starCount + 0.5 >= a) {
                                html+= `<i class="fa-duotone fa-star-half text-warning"></i>`
                            } else {
                                html+= `<i class="fa-duotone fa-star " style="color:gray"></i>`
                            }
                        }
                        return html
                    })()}
</div>`
                },
                editor: () => {
                    return ``
                }
            }
        }
    }
})