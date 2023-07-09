import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {form} from "./form.js";
import {component} from "../../official/component.js";
import {post} from "../../glitter-base/api/post/post-data.js";
import {getPostForm} from "../global/form.js";
import {ShareDialog} from "../../dialog/ShareDialog.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[], subData) => {
            return {
                view: () => {
                    return new Promise(async (resolve, reject) => {
                        const id = glitter.getUUID()
                        let selectBidItem = glitter.getUrlParameter('selectBidItem')
                        let selectChild = glitter.getUrlParameter('selectChildItem')
                        const saasConfig: {
                            config: any;
                            api: any;
                        } = (window as any).saasConfig;
                        saasConfig.api.getPage(saasConfig.config.appName, "select_widget").then((data: any) => {
                            let big = data.response.result[0].config[0].data.bigItem.find((dd: any) => {
                                return dd.id === selectBidItem
                            });
                            let small = big.child.find((dd: any) => {
                                return dd.id === selectChild
                            });
                            small.formList = getPostForm(small.formList)
                        });
                        let viewType: "selectService" | "editForm" = "selectService";
                        const select_widget = (await component.render(gvc, {data: {tag: "select_widget"}} as any, [], [], {
                            hide_place: true
                        }).view())

                        resolve(`
 <div class=" d-flex align-items-center justify-content-center" style="max-width:calc(100vw - 10px);">
  <div class="rounded " style="width:700px;border-radius:24px;max-width:calc(100% - 10px);background:white;overflow-y:auto;">
  <div class="w-100 d-flex align-items-center border-bottom justify-content-center position-relative bg-white rounded-top" style="height: 68px;">
        <h3 class="modal-title fs-4">填寫服務表單</h3>
        <i class="fa-solid fa-xmark text-dark position-absolute " style="font-size:20px;transform: translateY(-50%);right: 20px;top: 50%;cursor: pointer;" onclick="${gvc.event(() => {
                            gvc.closeDialog()
                        })}"></i>
</div>
${gvc.bindView(() => {
                            return {
                                bind: id,
                                view: () => {
                                    return `
${select_widget}
<div class="d-flex align-items-end justify-content-end p-2">
<button class="btn btn-warning text-dark me-2" onclick="${gvc.event(() => {
                                        gvc.getBundle().carryData.callback(glitter.getUrlParameter('selectChildItem'))
                                        gvc.closeDialog()
                                    })}">完成</button>
</div>
                                `
                                },
                                divCreate: {
                                    style: `max-height:calc(100vh - 100px);`
                                }
                            }
                        })}
</div>
</div>
            `)
                    })

                },
                editor: () => {
                    return ``
                }
            }
        }
    }
})