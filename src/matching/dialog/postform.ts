import {init} from "../../glitterBundle/GVController.js";
import {form} from "../widgets/form.js";


init((gvc, glitter, gBundle) => {
    return {
        onCreateView: () => {
            const id = glitter.getUUID()
            let selectBidItem = glitter.getUrlParameter('selectBidItem')
            let selectChild = glitter.getUrlParameter('selectChildItem')
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
                formModel = form.render(gvc, {
                    data: small,
                    refreshComponent: () => {
                        gvc.notifyDataChange(id)
                    }
                } as any, [], [], {})
                gvc.notifyDataChange(id)
            })
            return `
 <div class="vw-100 vh-100 position-fixed" style="background:rgba(0,0,0,0.7);z-index:-1;"></div>
 <div class="vw-100 vh-100 d-flex align-items-center justify-content-center">
  <div class="rounded " style="width:700px;border-radius:24px;max-width:calc(100% - 10px);background:white;overflow-y:auto;">
  <div class="w-100 d-flex align-items-center border-bottom justify-content-center position-relative bg-white rounded-top" style="height: 68px;">
        <h3 class="modal-title fs-4">填寫服務表單</h3>
        <i class="fa-solid fa-xmark text-dark position-absolute " style="font-size:20px;transform: translateY(-50%);right: 20px;top: 50%;cursor: pointer;" onclick="${gvc.event(() => {
                glitter.closeDiaLog(gvc.parameter.pageConfig?.tag)
            })}"></i>
</div>
${gvc.bindView(() => {
                return {
                    bind: id,
                    view: () => {
                        if(!formModel){
                            return  ``
                        }
                        return `<div class="p-2">${ (formModel.view() as string)}</div>`
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