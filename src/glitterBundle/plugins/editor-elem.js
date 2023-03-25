export class EditorElem {
    static h3(title) {
        return `<h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">${title}</h3>`;
    }
    static plusBtn(title, event) {
        return `<div class="w-100 my-3" style="background: white;height: 1px;"></div>
<div class="text-white align-items-center justify-content-center d-flex p-1 rounded mt-3" style="border: 2px dashed white;" onclick="${event}">${title}</div>`;
    }
    static toggleExpand(obj) {
        const color = obj.color ?? `#4144b0;`;
        const glitter = window.glitter;
        return `${obj.gvc.bindView(() => {
            const id = glitter.getUUID();
            return {
                bind: id,
                view: () => {
                    if (obj.data.expand) {
                        return `<div class="w-100  rounded p-2 "  style="background: ${color}; ">
<div class="w-100 d-flex p-0 align-items-center mb-2" onclick="${obj.gvc.event(() => {
                            obj.data.expand = !obj.data.expand;
                            obj.gvc.notifyDataChange(id);
                        })}" data-gs-event-1055="event" style="cursor: pointer;"><h3 style="font-size: 16px;color: lightpink;" class="m-0 p-0">${obj.title}</h3>
<div class="flex-fill"></div>
<div style="cursor: pointer;">收合<i class="fa-solid fa-up ms-2 text-white" ></i></div>
</div>
${(typeof obj.innerText === 'string') ? obj.innerText : obj.innerText()}</div>`;
                    }
                    else {
                    }
                    return `<div class="w-100  rounded p-2 " style="background-color: ${color};">
<div class="w-100 d-flex p-0 align-items-center" onclick="${obj.gvc.event(() => {
                        obj.data.expand = !obj.data.expand;
                        obj.gvc.notifyDataChange(id);
                    })}" style="cursor: pointer;"><h3 style="font-size: 16px;color: lightpink;" class="m-0 p-0">${obj.title}</h3>
<div class="flex-fill"></div>
<div style="cursor: pointer;">展開<i class="fa-solid fa-down ms-2 text-white"></i></div>
</div>
</div>`;
                },
                divCreate: {}
            };
        })}`;
    }
    static minusTitle(title, event) {
        return `<div class="d-flex align-items-center">
<i class="fa-regular fa-circle-minus text-danger me-2" style="font-size: 20px;cursor: pointer;" onclick="${event}"></i>
<h3 style="color: white;font-size: 16px;" class="m-0">${title}</h3>
</div>`;
    }
}
