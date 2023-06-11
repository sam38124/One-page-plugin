import { init } from "../GVController.js";
init((gvc, glitter, gBundle) => {
    return {
        onCreateView: () => {
            return `
 <div class="vw-100 vh-100 position-fixed" style="background:rgba(0,0,0,0.7);"></div>
 <div class="vw-100 vh-100 d-flex align-items-center justify-content-center">
 ${gBundle.getView(gvc)}
</div>

            `;
        }
    };
});
