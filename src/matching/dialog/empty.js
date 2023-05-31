import { init } from "../../glitterBundle/GVController.js";
init((gvc, glitter, gBundle) => {
    return {
        onCreateView: () => {
            return `
 <div class="vw-100 vh-100 position-fixed" style="background:rgba(0,0,0,0.7);"></div>
 <div class="vw-100 vh-100 d-flex align-items-center justify-content-center">
  <div class="bg-white m-auto" style="width:700px;border-radius:24px;max-width:100%;">
          <div class="w-100 d-flex align-items-center border-bottom justify-content-center position-relative bg-white" style="height: 68px;">
        <h3 class="modal-title fs-4">添加頁面</h3>
        <i class="fa-solid fa-xmark text-dark position-absolute " style="font-size:20px;transform: translateY(-50%);right: 20px;top: 50%;cursor: pointer;" onclick="${gvc.event(() => {
                glitter.closeDiaLog(gvc.parameter.pageConfig?.tag);
            })}"></i>
</div>
<div>sddsa</div>
</div>
</div>

            `;
        }
    };
});
