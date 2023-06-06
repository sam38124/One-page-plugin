'use strict';
export class Entry {
    static onCreate(glitter) {
        glitter.runJsInterFace("dismiss", {}, () => { });
        glitter.ut.frSize({
            sm: `ProShake 媒合平台`
        }, 'ProShake') `<div class="vw-100 vh-100 position-absolute z-index-1 justify-content-sm-start" style="background:rgba(0,0,0,0.6);"></div>`;
        glitter.htmlGenerate.resourceHook = (src) => {
            if (location.host === `127.0.0.1:3080`) {
                return src.replace(`$style1`, `http://127.0.0.1:3080/lionHtmlExtension`);
            }
            else {
                return src.replace(`$style1`, `https://sam38124.github.io/One-page-plugin/src`);
            }
        };
        glitter.htmlGenerate.resourceHook = (src) => {
            if (glitter) {
            }
            if (location.host === `127.0.0.1:3080`) {
                return src.replace(`$style1`, `http://127.0.0.1:3080/lionHtmlExtension`);
            }
            else {
                return src.replace(`$style1`, `https://sam38124.github.io/One-page-plugin/src`);
            }
        };
    }
}
