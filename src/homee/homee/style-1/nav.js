import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { SharedView } from "../../commenPage/shareView.js";
import { appConfig } from "../../../config.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {
            logo: {
                src: ``, width: ``, height: ``
            }
        },
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    console.log("----------here---------");
                    console.log(ScriptStyle1.getRout("img/home_logo.svg"));
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            const shareView = new SharedView(gvc);
                            let logo = {
                                width: widget.data.logo ?? "auto",
                                height: widget.data.height ?? "20px",
                                src: widget.data.src ?? "https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675147810222"
                            };
                            return shareView.navigationBar({
                                title: `<span style="font-family: 'Noto Sans TC';
font-style: normal;
font-weight: 700;
font-size: 16px;
color: #1E1E1E;
line-height: 150%;">${widget.data.centerText ?? ""}</span>`,
                                leftIcon: `<div class="d-flex align-items-center"><img 
style="
width: ${logo.width};
height: ${logo.height};
"
src="${logo.src}"><h3 class="p-0 m-0" style="${widget.data.titleStyle ?? ""}">${widget.data.title ?? ""}</h3></div>`,
                                rightIcon: `
                                <div class="d-flex align-items-center" style="gap:15px;">
                       
                                   <img src="${ScriptStyle1.getRout('../img/component/scan.svg')}" onclick="${gvc.event(() => {
                                    glitter.runJsInterFace("qrcodeScanner", {}, () => {
                                    });
                                })}">
                                    <img src="${ScriptStyle1.getRout('../img/notify.svg')}" onclick="${gvc.event(() => {
                                    glitter.runJsInterFace("noticeBell", {}, () => {
                                    });
                                })}">
                                    <img src="https://homee-ai.github.io/glitter-htmlExtension/src//homee/src/category.svg" onclick="${gvc.event(() => {
                                    appConfig().changePage(gvc, 'category');
                                })}">
                       
                                </div>
                       `
                            });
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return ``;
                }
            };
        },
    };
});
