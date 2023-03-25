export const styleAttr = [
    {
        tag: "margin", title: "間距", innerHtml: (gvc, data) => {
            const glitter = window.glitter;
            return `
            <div class="alert alert-dark mt-2">
            <span class="fw-bold">範例:</span>10px,10em,10pt,10%
</div>
            ${['margin-left', 'margin-right', 'margin-top', 'margin-bottom'].map((dd, index) => {
                const k = ["左", "右", "上", "下"][index];
                return glitter.htmlGenerate.editeInput({
                    gvc: gvc,
                    title: `${k}側間距`,
                    default: data[dd] ?? "",
                    placeHolder: `輸入${k}側間距`,
                    callback: (text) => {
                        data[dd] = text;
                    }
                });
            }).join('')}`;
        }
    },
];
