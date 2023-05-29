import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {Myspace, Space} from "../../api/myspace.js";
import {appConfig} from "../../../config.js";
import {Dialog} from "../../dialog/dialog-mobile.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return gvc.bindView(() => {
                                const id = gvc.glitter.getUUID()
                                let viewGuide = false;
                                let vm: {
                                    loading: boolean,
                                    height: string,
                                    data: Space[],
                                    showMore: boolean
                                } = {
                                    loading: true,
                                    height: `100vh`,
                                    data: [],
                                    showMore: true
                                }


                                function getData() {
                                    vm.data =[]
                                    vm.loading=true
                                    glitter.getPro("viewGuide",(response:any)=>{
                                        viewGuide=(response.data)==='true'
                                        viewGuide=glitter.share.viewGuide||viewGuide
                                        gvc.notifyDataChange(id)
                                    })


                                    Myspace.getModelList((data) => {
                                        vm.loading=false
                                        if (data) {
                                            vm.data = data as Space[]
                                            vm.data = vm.data.sort(function (a, b) {
                                                return b.time - a.time;
                                            });
                                            vm.showMore = vm.data.length >= 4
                                            vm.data = vm.data.filter((dd, index) => {
                                                return index < 4
                                            })
                                            spaceData = vm.data.map((dd) => {
                                                return {title: dd.key, date: dd.store_time, img: dd.space_image, config: dd}
                                            })
                                        }
                                        gvc.notifyDataChange(id)
                                    })
                                }

                                getData()

                                async function getPageHeight() {
                                    let top = await new Promise((resolve, reject) => {
                                        appConfig().getTopInset((number) => {
                                            resolve(number)
                                        })
                                    }) as number
                                    let bottom = await new Promise((resolve, reject) => {
                                        appConfig().getBottomInset((number) => {
                                            resolve(number)
                                        })
                                    }) as number
                                    console.log(JSON.stringify({top: top, bottom: bottom}))
                                    vm.height = `calc(100vh - ${63 + top + 63}px)`
                                    gvc.notifyDataChange(id)
                                }

                                getPageHeight()

                                let topInset: number = 0
                                let spaceData: { title: string, date: string, img: string, config: Space }[] = []
                                let clickEvent = glitter.ut.clock()

                                glitter.runJsInterFace("getTopInset", {}, (response) => {
                                    topInset=response.data
                                    gvc.notifyDataChange(['coverGuide'])
                                }, {
                                    webFunction: () => {
                                        return {data: 0}
                                    }
                                })
                                return {
                                    bind: id,
                                    view: () => {
                                        if(vm.loading){
                                            return  `<div class="w-100">
                                            <div class=" rounded py-5 h-100 d-flex align-items-center flex-column">
                                                <div class="spinner-border" role="status"></div>
                                            </div>
                                        </div>`
                                        }
                                        glitter.share.blockBack=false
                                        return `
                                        ${gvc.bindView({
                                            bind:"coverGuide",
                                            view : ()=>{
                                                return ``
                                                if (!viewGuide){

                                                    return `
                                                <div  style="position:fixed;z-index:999999;top:0;height: 100vh;width: 100vw;background: #1E1E1E;opacity: 0.5">
                                                    
                                                </div>
                                                <div style="position:fixed;z-index:999999;top:0;height: 100vh;width: 100vw;">
                                                    <div class="d-flex align-items-center justify-content-end" style="height: ${topInset+63}px; padding: 0 26px;">
                                                        <div style="padding:6px 9px;position:relative;background: white;opacity: 1;border-radius: 14px;color: #FE5541;font-family: 'Noto Sans TC';font-style: normal;font-weight: 500;font-size: 17px;line-height: 25px;text-align: center;" onclick="${gvc.event(()=>{
                                                        viewGuide=true
                                                        gvc.notifyDataChange('coverGuide')
                                                        appConfig().changePage(gvc , "guide1");
                                                        glitter.share.blockBack=true
                                                        glitter.share.viewGuide=true
                                                    })}">
                                                            掃描教學
                                                            <div style="background:white;border-radius: 16px;position: absolute;right:calc(100% + 2px);top:calc(100% + 4px);padding: 8px 12px;font-family: 'Noto Sans TC';font-style: normal;font-weight: 400;font-size: 18px;line-height: 26px;color: #1E1E1E;">觀看掃描教學影片</div>
                                                            <img  src="https://homee-ai.github.io/glitter-htmlExtension/src/img/component/mysapce/leadingGuide.svg" class="" style="position:absolute;right:calc(100% - 5px);top:calc(100% + 4px);height:12px;width: 13px;">
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                `
                                                }else {
                                                    return ``
                                                }

                                            },divCreate:{}
                                        })}
<div class="w-100 position-fixed  d-flex align-items-center justify-content-center flex-column"
style="background: #F8F3ED;height: ${vm.height};">
<div class="d-flex flex-column align-items-center" style="width: calc(100% - 48px);transform: translateY(-40px);">

${spaceData.length === 0 ? `
<img src="https://homee-ai.github.io/glitter-htmlExtension/src/img/noSpace.png" class="" style="width: calc(100% - 114px);">
` : `
<div class="w-100" style="height: 1px;background: #EAD8C2;width: calc(100% - 94px);margin-bottom: 24px;"></div>
${spaceData.map((dd) => {
                                            return `
<div class="w-100 bg-white d-flex align-items-center position-relative" style="height: 100px;border-radius: 20px;"
onclick="${gvc.event((e, event) => {
                                                if (clickEvent.stop() > 50) {
                                                    (dd.config as any).json = JSON.stringify(dd.config)
                                                        .replace(/server_rout/g, 'serverRout')
                                                        .replace(/store_time/g, 'storeTime')
                                                        .replace(/space_image/g, 'spaceImage')
                                                        .replace(/preview_image/g, 'previewImage')
                                                        .replace(/model_url/g, 'modelUrl')
                                                    glitter.runJsInterFace("openMySpaceMd", dd.config, () => {
                                                        getData()
                                                    })
                                                }
                                            })}">
<div class="h-100 bg-white" style="width: 160px;background: url('${dd.img}')  50% / cover; border-top-left-radius: 20px;border-bottom-left-radius: 20px;"></div>
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
<img class="position-absolute top-0 right-0" src="'https://homee-ai.github.io/glitter-htmlExtension/src/img/more.svg'" style="width: 32px;height: 32px;right: 6px;" onclick="${
                                                gvc.event((e, event) => {
                                                    if (clickEvent.stop() > 50) {
                                                        clickEvent.zeroing()
                                                        glitter.runJsInterFace("showSpaceAction", {
                                                            json:JSON.stringify(dd.config) .replace(/server_rout/g, 'serverRout')
                                                                .replace(/store_time/g, 'storeTime')
                                                                .replace(/space_image/g, 'spaceImage')
                                                                .replace(/preview_image/g, 'previewImage')
                                                                .replace(/model_url/g, 'modelUrl')
                                                        }, () => {
                                                            getData()
                                                        })
                                                    }
                                                })
                                            }">
</div>`
                                        }).join('<div style="height: 16px;"></div>')}
<div class="w-100" style="height: 1px;background: #EAD8C2;width: calc(100% - 94px);margin-top: 14px;"></div>
`}

${(() => {
                                            if (vm.showMore) {
                                                return `<div style="font-family: 'Noto Sans TC';
font-style: normal;font-weight: 400;font-size: 15px;margin-top: 14px;line-height: 150%;color: #1E1E1E;
" onclick="${gvc.event(()=>{
                                                    appConfig().changePage(gvc,'more_space',{})
                                                })}">更多空間</div>`
                                            } else {
                                                return ``
                                            }
                                        })()}
</div>
<div id="" class="position-absolute d-flex  flex-column align-items-center justify-content-center p-0" style="
padding: 0;margin: 0 59px;bottom:25px;width:calc(100vw - 108px);height:48px;
background: #FE5541;border-radius: 24px; " onclick="${
                                            gvc.event((e) => {
                                                const dialog = new Dialog()
                                                glitter.runJsInterFace("startScan", {}, () => {
                                                        getData()
                                                    },
                                                    {
                                                        webFunction: () => {
                                                            dialog.showInfo("僅支援APP版本")
                                                        }
                                                    })
                                            })
                                        }">
<h3 style="
font-family: 'Noto Sans TC';
font-style: normal;
font-weight: 700;
font-size: 18px;
text-align: center;
letter-spacing: 0.15em;
color: #FFFFFF;" class="m-0" >開始掃描</h3>
                                    </div>
</div>`
                                    },
                                    divCreate: {}
                                }
                            })
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return``
                }
            }
        },
    }
})