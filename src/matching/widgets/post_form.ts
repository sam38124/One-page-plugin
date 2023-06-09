import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {form} from "./form.js";
import {component} from "../../official/component.js";
import {post} from "../../glitter-base/api/post/post-data.js";
import {getPostForm} from "../global/form.js";
import {ShareDialog} from "../../dialog/ShareDialog.js";

Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[], subData) => {
            return {
                view:()=>{
                    return new Promise(async (resolve, reject)=>{
                        const id = glitter.getUUID()
                        let selectBidItem = glitter.getUrlParameter('selectBidItem')
                        let selectChild = glitter.getUrlParameter('selectChildItem')
                        const formData: any = {
                            contact_phone:gvc.glitter.share.public_api.GlobalUser.userInfo.userData.phone,
                            serviceAddress:gvc.glitter.share.public_api.GlobalUser.updateUserData.userData.address,
                            line_id:gvc.glitter.share.public_api.GlobalUser.updateUserData.userData.line,
                            contact_email:glitter.share.public_api.GlobalUser.userInfo.account
                        }
                        let formModel: any = undefined;
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
                            small.formList=getPostForm(small.formList)
                           new Promise(async (resolve, reject)=>{
                               formModel =  await form.render(gvc, {
                                   data: small,
                                   refreshComponent: () => {
                                       gvc.notifyDataChange(id)
                                   }
                               } as any, [], [], {
                                   carryForm:formData
                               }).view()
                               gvc.notifyDataChange(id)
                           })

                        });
                        formData.serviceID = glitter.getUrlParameter('selectChildItem')
                        let viewType: "selectService" | "editForm" = "selectService";
                        const select_widget=(await  component.render(gvc, {data: {tag: "select_widget"}} as any, [], [], {
                            hide_place: true
                        }).view())
                        resolve( `
 <div class=" d-flex align-items-center justify-content-center" style="max-width:calc(100vw - 10px);">
  <div class="rounded " style="width:700px;border-radius:24px;max-width:calc(100% - 10px);background:white;overflow-y:auto;overflow-x:hidden;">
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
                                    if (viewType === 'selectService') {
                                        return `
${select_widget}
<div class="d-flex align-items-end justify-content-end p-2">
<button class="btn btn-warning text-dark me-2" onclick="${gvc.event(() => {
                                            viewType = "editForm"
                                            gvc.notifyDataChange(id)
                                        })}">下一步</button>
</div>
                                `
                                    } else {
                                        if (!formModel) {
                                            return ``
                                        }
                                        return `<div class="p-2">${(formModel)} 
<div class="d-flex  align-items-end justify-content-end">
<button class="btn-warning text-dark btn mt-2" onclick="${gvc.event((e, event) => {
                                            formData.checkFinish((response:boolean)=>{
                                              if(!response){
                                                  new ShareDialog(gvc.glitter).errorMessage({
                                                      text:"請確實填寫必填項目．"
                                                  })
                                              }else{
                                                  (post.fun(gvc, {} as any, {}, {
                                                      data: formData
                                                  }) as any).event().then((response:any)=>{
                                                      if (response) {
                                                          new ShareDialog(gvc.glitter).successMessage({
                                                              text:"發案成功",
                                                              callback:()=>{
                                                                  location.reload()
                                                              }
                                                          })
                                                      }else{
                                                          new ShareDialog(gvc.glitter).errorMessage({
                                                              text:"發案失敗"
                                                          })
                                                      }
                                                  })
                                              }
                                            })
                                            
                                        })}">儲存</button>
</div>
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
            `)
                    })

                },
                editor:()=>{
                    return ``
                }
            }
        }
    }
})