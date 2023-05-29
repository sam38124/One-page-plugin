import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { Myspace } from "../../api/myspace.js";
import { appConfig } from "../../../config.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    const product = (gvc.parameter.pageConfig?.obj.data ?? {}).product;
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return gvc.bindView(() => {
                                const id = gvc.glitter.getUUID();
                                let vm = {
                                    loading: true,
                                    height: `100vh`,
                                    data: [],
                                    showMore: true
                                };
                                function getData() {
                                    vm.data = [];
                                    vm.loading = true;
                                    gvc.notifyDataChange(id);
                                    Myspace.getModelList((data) => {
                                        vm.loading = false;
                                        if (data) {
                                            vm.data = data;
                                            vm.data = vm.data.sort(function (a, b) {
                                                return b.time - a.time;
                                            });
                                            spaceData = vm.data.map((dd) => {
                                                return { title: dd.key, date: dd.store_time, img: dd.space_image, config: dd };
                                            });
                                        }
                                        gvc.notifyDataChange(id);
                                    });
                                }
                                getData();
                                async function getPageHeight() {
                                    let top = await new Promise((resolve, reject) => {
                                        appConfig().getTopInset((number) => {
                                            resolve(number);
                                        });
                                    });
                                    let bottom = await new Promise((resolve, reject) => {
                                        appConfig().getBottomInset((number) => {
                                            resolve(number);
                                        });
                                    });
                                    console.log(JSON.stringify({ top: top, bottom: bottom }));
                                    vm.height = `calc(100vh - ${63 + top + 73}px)`;
                                    gvc.notifyDataChange(id);
                                }
                                getPageHeight();
                                let spaceData = [];
                                let clickEvent = glitter.ut.clock();
                                return {
                                    bind: id,
                                    view: () => {
                                        if (vm.loading) {
                                            return `<div class="w-100">
            <div class=" rounded py-5 h-100 d-flex align-items-center flex-column">
                <div class="spinner-border" role="status"></div>
            </div>
        </div>`;
                                        }
                                        return `
<div class="d-flex flex-column align-items-center mx-auto pt-2" style="padding-left:24px;padding-right: 24px;min-height: 100vh;
background: #F8F3ED;padding-bottom: 24px;">
${spaceData.length === 0 ? `
<img src="https://homee-ai.github.io/glitter-htmlExtension/src/img/noSpace.png" class="" style="width: calc(100% - 114px);">
` : `
${spaceData.map((dd) => {
                                            return `<div class="w-100 bg-white d-flex align-items-center position-relative" style="height: 100px;border-radius: 20px;"
onclick="${gvc.event((e, event) => {
                                                if (clickEvent.stop() > 50) {
                                                    dd.config.json = JSON.stringify(dd.config)
                                                        .replace(/server_rout/g, 'serverRout')
                                                        .replace(/store_time/g, 'storeTime')
                                                        .replace(/space_image/g, 'spaceImage')
                                                        .replace(/preview_image/g, 'previewImage')
                                                        .replace(/model_url/g, 'modelUrl');
                                                    if (product) {
                                                        dd.config['addPD'] = product;
                                                        console.log(JSON.stringify(product));
                                                        glitter.runJsInterFace("selectSpaceToAdd", dd.config, () => { });
                                                    }
                                                    else {
                                                        glitter.runJsInterFace("openMySpaceMd", dd.config, () => {
                                                            getData();
                                                        });
                                                    }
                                                }
                                            })}">
<div class="h-100 bg-white" style="width: 160px;background: url('${dd.img}')  50% / cover;border-top-left-radius: 20px;border-bottom-left-radius: 20px;"></div>
<div class="d-flex flex-column align-items-baseline" style="margin-left: 24px;margin-right: 14px;">
<h3 style="font-family: 'Noto Sans TC';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 23px;
font-feature-settings: 'pnum' on, 'lnum' on;
color: #1E1E1E;">${dd.title}</h3>
<span style="font-family: 'Noto Sans TC';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 17px;
text-align: center;
color: #858585;">儲存時間:${dd.date.substring(0, 16)}</span>
</div>
<img class="position-absolute top-0 right-0" src="https://homee-ai.github.io/glitter-htmlExtension/src/img/more.svg" style="width: 32px;height: 32px;right: 6px;" onclick="${gvc.event((e, event) => {
                                                if (clickEvent.stop() > 50) {
                                                    clickEvent.zeroing();
                                                    glitter.runJsInterFace("showSpaceAction", {
                                                        json: JSON.stringify(dd.config).replace(/server_rout/g, 'serverRout')
                                                            .replace(/store_time/g, 'storeTime')
                                                            .replace(/space_image/g, 'spaceImage')
                                                            .replace(/preview_image/g, 'previewImage')
                                                            .replace(/model_url/g, 'modelUrl')
                                                    }, () => {
                                                        getData();
                                                    });
                                                }
                                            })}">
</div>`;
                                        }).join('<div style="height: 16px;"></div>')}
`}
</div>
`;
                                    },
                                    divCreate: {}
                                };
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
