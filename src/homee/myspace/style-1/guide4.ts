import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {appConfig} from "../../../config.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    widget.data.model=widget.data.model??{
                        title:"移動掃描被遮蔽空間",
                        slogan:"記錄所有空間樣貌！",
                        BTN:"開始掃描",
                        prevPage:"guide3",
                        nextPage:"",
                        background:`https://homee-ai.github.io/glitter-htmlExtension/src/guide/video/homee%20%E6%93%8D%E4%BD%9C%E6%95%99%E5%AD%B8(%E6%AD%A5%E9%A9%9F%E5%9B%9B).mp4`
                    };
                    let topInset = 0
                    let bottomInset = 0

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            gvc.addStyle(`
                            body{
                                background-color: transparent!important;
                            }
                            .laravel{
                                background: #F8F3ED;
                                box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.1);
                                border-radius: 56px 56px 0px 0px;  
                                padding-top:50px;
                                position:fixed;
                                left:0;
                                bottom:0;
                            }
                            .titleText{
                                font-weight: 700;
                                font-size: 32px;
                                line-height: 46px;
                                color: #292929;
                            }
                            .sloganText{
                                font-weight: 400;
                                font-size: 14px;
                                line-height: 150%;
                                color: #858585;
                                
                                margin-top:8px;
                            }
                            .nextBTN{
                                width: 256px;
                                height: 48px;
                                background: #FD6A58;
                                border-radius: 24px;
                                font-weight: 700;
                                font-size: 18px;
                                line-height: 26px;
                                letter-spacing: 0.15em;
                                color: #FFFFFF;
                                
                                
                            }
                            
                        
                        `)
                            glitter.runJsInterFace("getTopInset", {}, (response) => {
                                if (topInset != response.data){
                                    topInset = (response.data)
                                    gvc.notifyDataChange('mainView')
                                }

                            }, {
                                webFunction: () => {
                                    return {data: 10}
                                }
                            })
                            glitter.runJsInterFace("getBottomInset", {}, (response) => {
                                if (bottomInset != response.data){
                                    bottomInset = (response.data)
                                    gvc.notifyDataChange('laravel')
                                }

                            }, {
                                webFunction: () => {
                                    return {data: 10}
                                }
                            })
                            return `                                
                        <div class="w-100 background-guide" style="height: 100vh;padding-top: ${10 + glitter.share.topInset}px;">
                            <div class="w-100" style="">
                                <img class="" src="https://homee-ai.github.io/glitter-htmlExtension/src/img/sample/idea/left-arrow-white.svg" style="position:absolute; left:19px;top:${10 + glitter.share.topInset};z-index:3;width: 24px;height: 24px;margin-right: 16px" alt="" onclick="${gvc.event(() => {
                                    return``
                                    // glitter.getPro("viewGuide",(response:any)=>{
                                //     if((response.data)!=='true' && glitter.share.blockBack){
                                //         glitter.openDiaLog(`${new URL!(`../component/guide/confirm.js`, import.meta.url)}`, 'leaveGuide', {
                                //             callback: () => {
                                //
                                //             }
                                //         }, {
                                //             backGroundColor:"rgba(41, 41, 41, 0.3)",
                                //             animation: glitter.animation.fade
                                //         })
                                //     }else{
                                //         appConfig().setHome(gvc, "myspace", {});
                                //     }
                                // })

                            })}">
                            </div>
                            <video autoplay loop muted playsinline defaultmuted preload="auto" style="height: 100%;width: 100%;position:absolute;left: 0;top: -10%;object-fit: cover;" muted>
                                <source src="${widget.data.model.background}" type="video/mp4">
                            </video>
                            
                        </div>
                        ${gvc.bindView({
                                bind:glitter.getUUID(),
                                view : ()=>{

                                    return `
                            <div class="laravel w-100 d-flex flex-column align-items-center" style="padding-bottom: ${glitter.share?.bottomInset||10}px;font-family: 'Noto Sans TC';font-style: normal;">
                                <div class="titleText d-flex flex-wrap justify-content-center align-items-center" style="font-weight: 700;font-size: 32px;line-height: 46px;color: #1E1E1E;">
                                    ${widget.data.model.title}
                                </div>
                                <div class="sloganText d-flex flex-wrap justify-content-center align-items-center" style="font-weight: 400;font-size: 14px;line-height: 150%;color: #858585;">
                                    ${widget.data.model.slogan}
                                </div>
                                <div class="d-flex align-items-center" style="margin-top:38px;">   
                                 <img class="" src="https://homee-ai.github.io/glitter-htmlExtension/src/img/guide-back.svg" style="width: 40px;height: 40px; margin-right: 10px;" alt="" onclick="${gvc.event(() => {
                                        glitter.goBack()
                                    })}">                             
                                    <button class="border-0 nextBTN" style="position: relative" onclick="${gvc.event(()=>{
                                        appConfig().changePage(gvc ,widget.data.model.nextPage)
                                    })}">${widget.data.model.BTN}
                                    </button>
                                </div>
                                
                            </div>
                        `
                                },
                                divCreate:{style:`animation-delay: 0s;`}

                            })}
                    `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return gvc.map([ `
                            <h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">背景影片</h3>
                            <div class="mt-2"></div>
                            <div class="d-flex align-items-center mb-3">
                                <input class="flex-fill form-control " placeholder="請輸入圖片連結" value="${widget.data.model.background}">
                                <div class="" style="width: 1px;height: 25px;background-color: white;"></div>
                                <i class="fa-regular fa-upload text-white ms-2" style="cursor: pointer;" onclick="${gvc.event(()=>{
                        glitter.ut.chooseMediaCallback({
                            single:true,
                            accept:'image/*',
                            callback(data: { file:any;data: any; type: string; name: string; extension: string }[]) {
                                glitter.share.publicInterface["glitter"].upload(data[0].file,(link:string)=>{
                                    widget.data.model.background=link;
                                    widget.refreshAll!()
                                })
                            }
                        })
                    })}"></i>
                            </div>
                        `,
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "最上方文字",
                            default: widget.data.model.title ?? "",
                            placeHolder: `請輸入最上方文字內容`,
                            callback: (text: string) => {
                                widget.data.model.title = text
                                widget.refreshAll()
                            }
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "灰色文字",
                            default: widget.data.model.slogan ?? "",
                            placeHolder: `請輸入最上方文字內容`,
                            callback: (text: string) => {
                                widget.data.model.slogan = text
                                widget.refreshAll()
                            }
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: "按鍵文字",
                            default: widget.data.model.BTN ?? "",
                            placeHolder: `請輸入最上方文字內容`,
                            callback: (text: string) => {
                                widget.data.model.BTN = text
                                widget.refreshAll()
                            }
                        })
                    ])
                }
            }
        },
    }
})