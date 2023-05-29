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
                    let bottomInset = 0
                    widget.data.model = widget.data.model??{
                        title:"填充陰影完成空間掃描",
                        slogan:"探索空間搭配創意世界！",
                        BTN:"下一步",
                        nextPage:"guide2",
                        background:`https://homee-ai.github.io/glitter-htmlExtension/src/guide/video/homee%20%E6%93%8D%E4%BD%9C%E6%95%99%E5%AD%B8(%E6%AD%A5%E9%A9%9F%E4%B8%80).mp4`
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let backBTN = false;
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
                            const guideNav=glitter.getUUID()
                            return `      
                        ${gvc.bindView({
                                bind:guideNav,
                                view:()=>{
                                    return `
                                    <div class="w-100 background-guide" style="height: 100vh;padding-top: ${10 + glitter.share.topInset}px;">
                                        <div class="w-100" style="">
                                            <img class="" src="https://homee-ai.github.io/glitter-htmlExtension/src/img/sample/idea/left-arrow-white.svg" style="position:absolute; left:19px;top:${10 + glitter.share.topInset};z-index:3;width: 24px;height: 24px;margin-right: 16px" alt="" onclick="${gvc.event(() => {
                                                return``
                                        //         glitter.getPro("viewGuide",(response:any)=>{
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
                                        appConfig().setHome(gvc, "myspace", {});
                                            })}">
                                        </div>
                                        <video autoplay loop muted playsinline defaultmuted preload="auto" style="height: 100%;width: 100%;position:absolute;left: 0;top: -10%;object-fit: cover;">
                                            <source src="${widget.data.model.background}" type="video/mp4">
                                        </video>
                                        
                                    </div>
                                `
                                },
                                divCreate : {}
                            })}                          
                        
                        ${gvc.bindView({
                                bind:glitter.getUUID(),
                                view : ()=>{
                                    return `
                                    <div class="laravel w-100 d-flex flex-column align-items-center" style="padding-bottom: ${glitter.share?.bottomInset||10}px;">
                                        <div class="titleText d-flex flex-wrap justify-content-center align-items-center">
                                            ${widget.data.model.title}
                                        </div>
                                        <div class="sloganText d-flex flex-wrap justify-content-center align-items-center">
                                            ${widget.data.model.slogan}
                                        </div>
                                        <button class="border-0 nextBTN" style="margin-top:38px;" onclick="${gvc.event(()=>{
                                        appConfig().changePage(gvc ,widget.data.model.nextPage)

                                    })}">${widget.data.model.BTN}</button>
                                    </div>
                                `
                                },
                                divCreate:{style:``}

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