import { init } from "../../glitterBundle/GVController.js";
import { form } from "../widgets/form.js";
import { post } from "../../glitter-base/api/post/post-data.js";
import { component } from "../../official/component.js";
init((gvc, glitter, gBundle) => {
    return {
        onCreateView: () => {
            const id = glitter.getUUID();
            let selectBidItem = glitter.getUrlParameter('selectBidItem');
            let selectChild = glitter.getUrlParameter('selectChildItem');
            const formData = {};
            let formModel = undefined;
            const saasConfig = window.saasConfig;
            saasConfig.api.getPage(saasConfig.config.appName, "select_widget").then((data) => {
                let big = data.response.result[0].config[0].data.bigItem.find((dd) => {
                    return dd.id === selectBidItem;
                });
                let small = big.child.find((dd) => {
                    return dd.id === selectChild;
                });
                formModel = form.render(gvc, {
                    data: small,
                    refreshComponent: () => {
                        gvc.notifyDataChange(id);
                    }
                }, [], [], formData);
                gvc.notifyDataChange(id);
            });
            formData.serviceID = glitter.getUrlParameter('selectChildItem');
            let viewType = "selectService";
            return `
 <div class="vw-100 vh-100 position-fixed" style="background:rgba(0,0,0,0.7);z-index:-1;"></div>
 <div class="vw-100 vh-100 d-flex align-items-center justify-content-center">
  <div class="rounded " style="width:700px;border-radius:24px;max-width:calc(100% - 10px);background:white;overflow-y:auto;">
  <div class="w-100 d-flex align-items-center border-bottom justify-content-center position-relative bg-white rounded-top" style="height: 68px;">
        <h3 class="modal-title fs-4">填寫服務表單</h3>
        <i class="fa-solid fa-xmark text-dark position-absolute " style="font-size:20px;transform: translateY(-50%);right: 20px;top: 50%;cursor: pointer;" onclick="${gvc.event(() => {
                glitter.closeDiaLog(gvc.parameter.pageConfig?.tag);
            })}"></i>
</div>
${gvc.bindView(() => {
                return {
                    bind: id,
                    view: () => {
                        if (viewType === 'selectService') {
                            return `
${component.render(gvc, { data: { tag: "select_widget" } }, [], [], {
                                test: "boolea"
                            }).view()}
<div class="d-flex align-items-end justify-content-end p-2">
<button class="btn btn-warning text-dark me-2">下一步</button>
</div>
                                `;
                        }
                        else {
                            if (!formModel) {
                                return ``;
                            }
                            return `<div class="p-2">${formModel.view()} 
<div class="d-flex  align-items-end justify-content-end">
<button class="btn-warning text-dark btn mt-2" onclick="${gvc.event((e, event) => {
                                post.fun(gvc, {}, {}, {
                                    data: formData,
                                    callback: (response) => {
                                        if (response) {
                                            glitter.closeDiaLog();
                                        }
                                    }
                                }).event();
                            })}">儲存</button>
</div>
</div>`;
                        }
                    },
                    divCreate: {
                        style: `max-height:calc(100vh - 100px);`
                    }
                };
            })}
</div>
</div>

            `;
        }
    };
});
