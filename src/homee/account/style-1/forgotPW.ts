import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {ClickEvent} from "../../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {Dialog} from "../../dialog/dialog-mobile.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    let email='';

                    widget.data= {

                        topInset: 10
                    }
                    gvc.addStyle(`
                @font-face {
                    font-family: 'Noto Sans TC';
                    src: url(assets/Font/NotoSansTC-Bold.otf);
                    font-weight: bold;
                }
        
                @font-face {
                    font-family: 'Noto Sans TC';
                    src: url(assets/Font/NotoSansTC-Regular.otf);
                    font-weight: normal;
                }
                main{
                    position: relative;
                    height: 100vh;
                }
                .showGIF{
                    background-image: url("img/sample/login/BG.gif") ;
                    background-position: center 60%;
                    background-size: 300%;
                    height: 50%;
                }
                .arrow{
                    width: 24px;
                    height: 24px;
                    position: absolute;        
                }
        
                .loginBoard{
                    position: absolute;
                    width: 100%;
        
                    left: 0;
                    bottom: 0;
                    z-index: 3;
                    /* HOMEE white */
        
                    background: #FFFFFF;
        
                    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
                    border-radius: 56px 56px 0 0;
                    padding-top: 48px;
                    padding-bottom: 48px;
        
                }
                .loginInf{
                    margin-top: 56px;
                    padding-bottom: 25px;
        
                }
                .loginRow{
                    width: 320px;
                    height: 32px;
                    padding-bottom: 11px;
                    margin-right: 18px;
        
                    border-bottom: 1px solid #FD6A58;
                }
                .loginRow input{
        
                    /* Noto Sans TC - Regular - 14 */
                    font-family: 'Noto Sans TC',serif;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 150%;
                    /* identical to box height, or 21px */
                    margin-left: 16px;
        
                    /* HOMEE grey */
        
                    color: #292929;
        
                }
                .hint{
                    width: 360px;
                    height: 46px;
                    font-family: 'Noto Sans TC',serif;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 23px;
                    font-feature-settings: 'pnum' on, 'lnum' on;
        
                    /* Homee-Black */
                    color: #292929;
                    margin-bottom: 67px;
                    white-space:normal;
                    word-wrap:break-word;            
                    word-break:break-all;
        
                }
                .authRow{
                    width: 160px;
                    height: 40px;
                    padding-bottom: 11px;
                    margin-right: 18px;
                    font-size: 14px;
        
                    border-bottom: 1px solid #FD6A58;
                    padding-top: 8px;
                }
        
                .authBtn{
                    width: 160px;
                    height: 40px;
        
                    font-size: 18px;
        
                    background: #D6D6D6;
                    border-radius: 20px;
        
                }
                .authBtnOK{
                    background:#FD6A58
                }
        
                .loginBTN{
                    /* HOMEE red */
                    width: 100%;
                    height: 64px;
        
                    background: #FD6A58;
                    border-radius: 32px;
        
                    font-family: 'Noto Sans TC';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 18px;
                    line-height: 26px;
        
                    /* HOMEE white */
                    color: #FFFFFF;
                    margin-top: 80px;
        
                }
                .helpText{
                    width:338px;
                    font-family: 'Noto Sans TC';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    color: #FD6A58;
                }
               `)
                    widget.data.background=new URL('../../img/component/login/login_page.json', import.meta.url)
                    glitter.runJsInterFace("getTopInset", {}, (response) => {

                        if (widget.data.topInset == response.data) {
                            widget.data.topInset = response.data
                            gvc.notifyDataChange('mainView')
                        }

                    }, {
                        webFunction: () => {
                            return {data: 10}
                        }
                    })
                    gvc.addMtScript([{src: `https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js`}], () => {
                        gvc.notifyDataChange('mainView')
                    }, () => {
                    })

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                                    <main style="">                                       
                                        <div class="w-100" style="position: absolute;">
                                            <lottie-player src="${widget.data.background}"  background="#F8F3ED"  speed="1"  onclick="${gvc.event((e) => {
                                // appConfig().setHome(gvc,"login")
                            })}" style="width: 100%;height: 1073px;position: absolute;transform: translateY(-40%);"  loop  autoplay></lottie-player>
                                        </div>
                                        <div class="loginBoard d-flex flex-column align-items-center">
                                            <img src="${new URL('../../img/component/login/logo.svg', import.meta.url)}" alt="LOGO">
                                            <div class="loginInf d-flex flex-column align-items-center">
                                                <div style="font-weight: 700;font-size: 32px;line-height: 46px;text-align: center;color: #1E1E1E;">
                                                    重置密碼
                                                </div>
                                                <div style="font-family: 'Noto Sans TC';font-style: normal;font-weight: 500;font-size: 18px;line-height: 26px;font-feature-settings: 'pnum' on, 'lnum' on;color: #1E1E1E;margin-bottom: 59px;">
                                                    我們將向您發送電子郵件或短信以重置密碼
                                                </div>
                                                <div class="loginRow d-flex align-items-center" style="height: 50px;">
                                                    <img src="${new URL('../../img/component/login/message.svg', import.meta.url)}" alt="" style="width: 24px;height: 24px;">
                                                    <input class="w-100 border-0" placeholder="電子郵件地址" style="height: 30px;" onchange="${gvc.event((e)=>{
                                email=e.value
                            })}">
                                                </div>
                                                <div class="d-flex d-none" style="margin-top: 32px">
                                                    <div class="authRow d-flex align-items-center">
                                                        <img src="${new URL('../../img/component/login/shield.svg', import.meta.url)}" alt="" style="width: 24px;height: 24px;">
                                                        <input class="w-100 border-0" placeholder="驗證碼" style="margin-left: 16px;">
                                                    </div>
                            <!--                    todo 黑轉色 時間count-->
                                                    <div class="authBtn d-flex justify-content-center align-items-center" onclick="${gvc.event(() => {
                            })}">
                                                        確認
                                                    </div>
                                                </div>
<!--                                                todo 協助沒有 目前先拿掉-->
                                                <div class="helpText d-flex align-items-center justify-content-end d-none">
                                                    需要協助？
                                                </div>
                        
                                            <!--todo click-->
                                                <div class="loginBTN d-flex justify-content-center align-items-center" onclick="${gvc.event(() => {
                                const dialog=new Dialog();
                                // dialog.dataLoading(true)
                                // User.forgetPwd(email,(response,code)=>{
                                //     dialog.dataLoading(false)
                                //     if(response){
                                //         dialog.showInfo("驗證信已送出")
                                //         gvc.glitter.goBack()
                                //     }else{
                                //         dialog.showInfo("驗證信送出失敗")
                                //     }
                                // })
                            })}">
                                                    傳送驗證信
                                                </div>
                                            </div>
                        
                                        </div>
                                    </main>
                                    `
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