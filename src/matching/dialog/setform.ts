import {init} from "../../glitterBundle/GVController.js";
import {form} from "../widgets/form.js";


init((gvc, glitter, gBundle) => {
    return {
        onCreateView: () => {
            const id = glitter.getUUID()
            const formModel = form.render(gvc, {
                data: gBundle.data,
                refreshComponent: () => {
                    gvc.notifyDataChange(id)
                }
            } as any, [], [], {});
            let mode: ('edit' | 'preview') = 'edit'

            return `
 <div class="vw-100 vh-100 position-fixed" style="background:rgba(0,0,0,0.7);z-index:-1;"></div>
 <div class="vw-100 vh-100 d-flex align-items-center justify-content-center">
  <div class="rounded" style="width:700px;border-radius:24px;max-width:100%;background:white;overflow-y:auto;">
  <div class="w-100 d-flex align-items-center border-bottom justify-content-center position-relative bg-white rounded-top" style="height: 68px;">
        <h3 class="modal-title fs-4">設定服務表單</h3>
        <i class="fa-solid fa-xmark text-dark position-absolute " style="font-size:20px;transform: translateY(-50%);right: 20px;top: 50%;cursor: pointer;" onclick="${gvc.event(() => {
                glitter.closeDiaLog(gvc.parameter.pageConfig?.tag)
            })}"></i>
</div>
 ${gvc.bindView(() => {
                return {
                    bind: id,
                    view: () => {
                        const key = [{
                            "col": "12",
                            "key": "serviceDate",
                            "colm": "12",
                            "type": "date",
                            "label": "服務日期",
                            "requirement": "true",
                            "formExpand": {"expand": true}
                        }, {
                            "col": "12",
                            "key": "serviceTime",
                            "colm": "12",
                            "requirement": "true",
                            "type": "time",
                            "label": "服務時間",
                            "formExpand": {"expand": true}
                        }, {
                            "col": "12",
                            "key": "serviceArea",
                            "colm": "12",
                            "type": "placeSelect",
                            "label": "服務地區",
                            "requirement": "true",
                            "formExpand": {"expand": true},
                            "selectType": "manual"
                        }, {
                            "col": "12",
                            "key": "serviceAddress",
                            "colm": "12",
                            "type": "address",
                            "requirement": "true",
                            "label": "詳細地址",
                            "formExpand": {"expand": true}
                        }, {
                            "col": "12",
                            "key": "budget",
                            "tag": "form_budget",
                            "colm": "12",
                            "type": "custom",
                            "label": "預算填寫",
                            "expand": false,
                            "component": {},
                            "formExpand": {"expand": true},
                            "requirement": "true"
                        }].reverse()
                        
                        console.log(JSON.stringify(gBundle.data.formList))
                        if (mode === 'edit') {
                            const a = {
                                "id": "1685445504157",
                                "title": "清潔服務",
                                "expand": true,
                                "btnList": [],
                                "formFrom": {},
                                "formList": [],
                                "formEvent": {},
                                "formExpand": {},
                                "btnListExpand": {}
                            }
                            key.map((data) => {
                                if (!gBundle.data.formList.find((dd: any) => {
                                    return dd.key === data.key
                                })) {
                                    gBundle.data.formList.splice(0, 0, data)
                                }
                            })
                            return `<div class="p-2">${formModel.editor() as string}
<div class="d-flex  align-items-end justify-content-end">
<button class="btn-primary  btn mt-2 me-2" onclick="${gvc.event(() => {
                                mode = 'preview'
                                gvc.notifyDataChange(id)
                            })}"><i class="fa-solid fa-eye me-2"></i>預覽</button>
<button class="btn-warning text-dark btn mt-2 " onclick="${gvc.event(() => {
                                glitter.htmlGenerate.saveEvent()
                                glitter.closeDiaLog()
                            })}">儲存</button></div>
</div>`
                        } else {
                            return `<div class="p-2">${formModel.view() as string}
<div class="d-flex  align-items-end justify-content-end">
<button class="btn-primary  btn mt-2 me-2" onclick="${gvc.event(() => {
                                mode = 'edit'
                                gvc.notifyDataChange(id)
                            })}"><i class="fa-solid fa-pencil me-2"></i>編輯</button>
<button class="btn-warning text-dark btn mt-2 " onclick="${gvc.event(() => {
                                glitter.htmlGenerate.saveEvent()
                                glitter.closeDiaLog()
                            })}">儲存</button></div>
</div>`
                        }
                    },
                    divCreate: {
                        style: `max-height:calc(100vh - 100px);`
                    }
                }
            })}
</div>
</div>

            `
        }
    }
})