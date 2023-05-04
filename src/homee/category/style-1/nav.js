import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../../script-style-1.js";
import { SharedView } from "../../commenPage/shareView.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {
            searchDefault: "大家都在搜尋:沙發"
        },
        render: (gvc, widget, setting, hoverID) => {
            widget.data.searchDefault = widget.data.searchDefault ?? "大家都在搜尋:沙發";
            glitter.runJsInterFace("getTopInset", {}, (response) => {
                if (widget.data?.topInset != response.data) {
                    widget.data.topInset = response.data;
                    widget.refreshAll();
                }
            }, {
                webFunction: () => {
                    return { data: 10 };
                }
            });
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            const sharedView = new SharedView(gvc);
                            return sharedView.navigationBar({
                                title: ``,
                                leftIcon: `<img class="" src="${new URL('../../img/component/left-arrow.svg', import.meta.url).href}" style="width: 24px;height: 24px;margin-right: 16px" alt="" onclick="${gvc.event(() => {
                                    if (gvc.glitter.pageConfig.length <= 1) {
                                    }
                                    else {
                                    }
                                })}">
                            <div class="  form-control flex-fill" style="
border-radius: 20px;
font-family: 'Noto Sans TC';
padding-left: 30px;
font-style: normal;
font-weight: 400;
background: url(https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675061987473) no-repeat scroll 7px 7px,rgba(41, 41, 41, 0.1);;
background-size: 20px;
font-size: 14px;
line-height: 150%;
color: #858585;
width: calc(100vw - 180px);
" placeholder="${widget.data.searchDefault}" onclick="${gvc.event(() => {
                                })}" >${widget.data.searchDefault}</div>
                            `,
                                rightIcon: `
                             <img class="" src="https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675061894470" style="width: 28px;height: 28px;margin-right: 16px" alt="" onclick="${gvc.event(() => {
                                    glitter.runJsInterFace("noticeBell", {}, () => { });
                                })}">
                                <img class="" src="https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675061418331" style="width: 28px;height: 28px;" alt="" onclick="${gvc.event(() => {
                                    glitter.runJsInterFace("qrcodeScanner", {}, () => { });
                                })}">
                            `
                            });
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "預設搜尋內容",
                            default: widget.data.searchDefault,
                            placeHolder: "大家都在搜尋:沙發",
                            callback: (text) => {
                                widget.data.searchDefault = text;
                                widget.refreshAll();
                            }
                        }),
                    ]);
                }
            };
        },
    };
});
