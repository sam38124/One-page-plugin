import {init} from "../glitterBundle/GVController.js";

init((gvc, glitter, gBundle)=>{
glitter.addMtScript([{src:`https://kit.fontawesome.com/02e2dc09e3.js`}],()=>{},()=>{})
    return {
        onCreateView:()=>{
            return `<div class="vw-100 vh-100 d-flex align-items-center justify-content-center" style="background-color: rgba(0,0,0,0.5);">
<div style="width:50px;height:50px;right:0;top:0;background-color: rgba(0,0,0,0.8);" class="position-absolute d-flex align-items-center justify-content-center" onclick="${gvc.event(() => {
                glitter.closeDiaLog()
            })}"><i class="fa-solid fa-xmark " style="color:white;"></i></div>
<img style="max-width: 100%;max-height: 100%;" src="${gBundle}">
</div>`
        }
    }
})