import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.getData = widget.data.getData ?? {}
            widget.data.toPage = widget.data.toPage ?? {}
            return {
                view: () => {
                    gvc.addStyle(`.flex-container::after {
  content: ""; /* 用于清除浮动 */
  flex-grow: 9999; /* 让 ::after 伪元素占据剩余空间，以推动最后一行子项靠左对齐 */
}
.flex-container .flex-item:nth-child(n) {
  /* 让每一行的最后一个子项右边距为 0，以避免 space-between 对齐方式影响最后一行 */
  margin-right: 0;
}
`)
                    ScriptStyle1.initialScript(gvc, widget);
                    return gvc.bindView(() => {
                        const id = glitter.getUUID()
                        const vm={
                            callback: () => {
                                gvc.notifyDataChange(id)
                            },
                            data:[]
                        }
                        TriggerEvent.trigger({
                            gvc: gvc, widget: widget, clickEvent: widget.data.getData, subData: vm
                        })
                        return {
                            bind: id,
                            view: () => {
                                const moment=(window as any).moment
                                moment.locale('llll');
                                return vm.data.map((dd:any)=>{
                                    return ` <div class="flex-item" style="max-width: 100%;width:250px; margin: 10px;
  box-sizing: border-box; 
  flex-grow: 1;">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="text-center">
                                            <img src="https://cdn.shopify.com/s/files/1/0704/0158/9548/files/logo_79b2fa6d-96db-4dad-8ddc-8d2b21ad1d68_32x32.png?v=1673697392" class="rounded-circle avatar-md img-thumbnail " alt="friend">
                                            <h4 class="mt-3 my-1">${dd.userData.name}</h4>
                                            <p class="mb-0 text-muted"><i class="mdi mdi-email-outline me-1"></i>${dd.userData.account}</p>
                                            <hr class="bg-dark-lighten my-2">
                                            <h5 class="fw-semibold text-muted" style="line-height: 30px;">註冊時間:<br>${moment().locale('zh_cn').format('llll')}</h5>
                                            <div class="row mt-2">
                                                <div class="col-6">
                                                    <a href="tel:${dd.userData.phone}" class="btn w-100 btn-light " data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Call" aria-label="Call"><i class="mdi mdi-phone"></i></a>
                                                </div>
                                                <div class="col-6">
                                                    <a href="mailto:${dd.userData.email}" class="btn w-100 btn-light " data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Email" aria-label="Email"><i class="mdi mdi-email-outline"></i></a>
                                                </div>
                                            </div>
                                            <button class="btn btn-warning mt-2 w-100" style="color:black;" onclick="${
                                        gvc.event(()=>{
                                            TriggerEvent.trigger({
                                                gvc:gvc,widget:widget,clickEvent:widget.data.toPage,subData:dd.userData
                                            })
                                        })
                                    }">前往查看</button>
                                        </div>
                                    </div>
                                </div>
                            </div> `
                                }).join('')
                            },
                            divCreate: {class: `d-flex flex-wrap flex-container justify-content-center` ,style:``}
                        }
                    })
                },
                editor: () => {
                    return gvc.map([
                        TriggerEvent.editer(gvc, widget, widget.data.getData, {
                            hover: true,
                            option: [],
                            title: "設定資料來源"
                        }),
                        TriggerEvent.editer(gvc, widget, widget.data.toPage, {
                            hover: true,
                            option: [],
                            title: "前往查看"
                        })
                    ]);
                },
            };
        },
    }
})