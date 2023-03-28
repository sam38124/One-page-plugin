'use strict';
import { Glitter } from './glitterBundle/Glitter.js';

export class Entry {
    public static onCreate(glitter: Glitter) {
        glitter.htmlGenerate.resourceHook = (src) => {
            if (location.host === `127.0.0.1:3080`) {
                return src.replace(`$style1`, `http://127.0.0.1:3080/lionHtmlExtension`);
            } else {
                return src.replace(`$style1`, `https://sam38124.github.io/One-page-plugin/src`);
            }
        };
        glitter.htmlGenerate.resourceHook = (src) => {
            if (glitter) {
            }
            if (location.host === `127.0.0.1:3080`) {
                return src.replace(`$style1`, `http://127.0.0.1:3080/lionHtmlExtension`);
            } else {
                return src.replace(`$style1`, `https://sam38124.github.io/One-page-plugin/src`);
            }
        };
    }
}
