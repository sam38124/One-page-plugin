import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
export const form_budget = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID, subData) => {
            return {
                view: () => {
                    const data = subData.data;
                    const formData = subData.formData;
                    const readonly = subData.readonly;
                    console.log(JSON.stringify(data));
                    return `
                   <label class="form-label fs-base mb-n2"><span class="text-danger ms-2"> * </span>我的預算</label>
             <div class="mb-2">
              ${Editor.select({
                        title: "",
                        gvc: gvc,
                        def: (formData[data.key] === "-1") ? `expire` : `nolimit`,
                        array: [
                            { title: "由專家報價", value: "expire" }, { title: "自訂預算", value: "nolimit" }
                        ],
                        callback: (text) => {
                            if (text === 'expire') {
                                formData[data.key] = "-1";
                            }
                            else {
                                formData[data.key] = "3000";
                            }
                            widget.refreshComponent();
                        }
                    })}
              ${(formData[data.key] === "-1") ? `` : `
              ${glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: ` <label class="form-label fs-base mb-n2"><span class="text-danger ms-2"> * </span>輸入預算</label>`,
                        default: formData[data.key],
                        placeHolder: "請輸入預算",
                        callback: (text) => {
                            formData[data.key] = text;
                            widget.refreshComponent();
                        }
                    })}
              `}
</div>
                    `;
                },
                editor: () => {
                    return ``;
                }
            };
        }
    };
});
