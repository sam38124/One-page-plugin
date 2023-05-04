import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {ClickEvent} from "../../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../../script-style-1.js";
import {Dialog} from "../../dialog/dialog-mobile.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.layout = widget.data.layout ?? {};
            widget.data.layout.lottie = widget.data.layout.lottie ?? new URL('../../img/component/login/login_page.json', import.meta.url)
            widget.data.layout.titleImage = widget.data.layout.titleImage ?? {
                type: 'image',
                src: new URL('../../img/component/login/logo.svg', import.meta.url)
            }
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()

                    gvc.addStyle(`
                    main{
                        position: relative;
                        height: 100vh;
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
                        margin-top: 60px;                 
            
                    }
                    .loginRow{
                        padding-bottom: 11px;
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
                    .userPic{
                        width: 96px;
                        height: 96px;
                        background: #C4C5C9;
                        margin-bottom: 44px;
                    }
                    .registerElement{
                        width: 148px;
                        height: 32px;
                        border-bottom: 1px solid #FD6A58;
                        margin-right: 24px;
                    }
                    .registerElement img{
                        width: 24px;
                        height: 24px;
                        margin-right: 16px;
            
                    }
                    .registerElement input , .registerElement select{
            
                        width: 90px;
                        height: 24px;
                        margin-right: 16px;
                        border: 0;
            
                        font-family: 'Noto Sans TC',serif;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 150%;
                    }
                    .elementMargin{
                        margin-top: 24px;
                    }
                    .loginBTN{
                        /* HOMEE red */
                        width: calc(100% - 94px);
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
                        margin-top: 35px;
            
                    }
                    .moreLogin{
                        /* Noto Sans TC - Regular - 15 */
                        font-family: 'Noto Sans TC',serif;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 15px;
                        line-height: 150%;
                        /* identical to box height, or 22px */
            
            
                        /* HOMEE grey */
            
                        color: #858585;
            
                        margin-top: 40px;
                    }
                    .funGroup{
                        padding: 0 68px;
                    }
                    .funGroup img {
                        width: 40px;
                        height: 40px;
                        margin-top: 16px;
                    }
                   `)

                    function checkRegister() {
                        //todo 全部都填的話
                        const dialog = new Dialog(gvc)
                        if (widget.data.loginData.gender === "-1" || widget.data.loginData.lastName === '' || widget.data.loginData.firstName === '' || widget.data.loginData.birthDay === '' || widget.data.loginData.name === '') {
                            dialog.showInfo("請填寫完整資料!");
                        } else {
                            let temp = {
                                third:gvc.parameter.pageConfig?.obj.data.third,
                                first: widget.data.loginData.firstName,
                                last: widget.data.loginData.lastName,
                                inviteCode: (widget.data.loginData.inviteCode) || undefined,
                                email: widget.data.loginData.email,
                                pwd: widget.data.loginData.password,
                                gender: widget.data.loginData.gender,
                                birth: widget.data.loginData.birthDay,
                                userName: widget.data.loginData.name,
                            }
                            dialog.dataLoading(true)
                        }
                    }
                    gvc.addMtScript([{src: `https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js`}], () => {
                        gvc.notifyDataChange('mainView')
                    }, () => {
                    })
                    glitter.runJsInterFace("getTopInset", {}, (response) => {
                        widget.data.topInset = response.data
                        gvc.notifyDataChange('mainView')
                    }, {
                        webFunction: () => {
                            return {data: 10}
                        }
                    })

                    const $ = gvc.glitter.$;

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                                        <main style="overflow-x: hidden;">
                                            <div class="w-100" style="position: absolute;">
                                                  ${(widget.data.layout.lottie.split('.').pop() === "json") ? `
                                <lottie-player src="${widget.data.layout.lottie}"  background="#F8F3ED"  speed="1"  onclick="${gvc.event((e) => {
                                    glitter.goBack()
                            })}" style="width: 100%;height: 900px;position: absolute;transform: translateY(-350px);"  loop  autoplay></lottie-player>
                                ` : `
                                <img src="${widget.data.layout.lottie}"  style="width: 100%;height: 900px;position: absolute;transform: translateY(-350px);" onclick="${gvc.event((e) => {
                                glitter.goBack()
                            })}">
                                `}
                                            </div>
                                            <div class="loginBoard d-flex flex-column align-items-center">
                                                   ${(widget.data.layout.titleImage.type === 'image') ? `<img src="${widget.data.layout.titleImage.src}"
class="${glitter.htmlGenerate.styleEditor(widget.data.layout.titleImage).class()}"
style="${glitter.htmlGenerate.styleEditor(widget.data.layout.titleImage).style()}"
>` : `
                                   <h3 style="font-size:15px;font-family: 'Noto Sans TC', sans-serif;${glitter.htmlGenerate.styleEditor(widget.data.layout.titleImage).style()};"
                                   class="${glitter.htmlGenerate.styleEditor(widget.data.layout.titleImage).class()}">${widget.data.layout.titleImage.src}</h3>
                                   `}
                                                <div class="loginInf d-flex flex-column align-items-center">
                                                    <div class="userPic d-none" style="border-radius: 50%;background: whitesmoke url('${new URL('../../img/component/login/userPic.png', import.meta.url)}') no-repeat 50% 50%;background-size: contain" onclick="${gvc.event((e) => {

                                glitter.ut.chooseMediaCallback({
                                    single: true,
                                    accept: "image/*",
                                    callback(data: { data: any; type: string; name: string; extension: string }[]) {
                                        if (data.length > 0) {
                                            glitter.$(e).css('background', `50%/cover no-repeat url('${data[0].data}')`)
                                        }
                                    }
                                })
                            })}">
                                                    </div>                        
                                                <!--四個註冊元素 每個都必填-->
                                                
                                                <div class="d-flex flex-wrap w-100" style="padding-left: 47px;padding-right: 47px;">                                                    
                                                    <div class="d-flex w-100 w-100 me-0">
                                                        <div class="registerElement d-flex elementMargin w-100 me-0">                                                           
                                                            <img src="${new URL('../../img/component/login/message.svg', import.meta.url)}">
                                                            <input class="w-100" placeholder="電子郵件地址或手機號碼" name="email" onchange="${gvc.event((e: HTMLInputElement) => {
                                widget.data.loginData.email = e.value
                            })}">                                                           
                                                        </div>                       
                                                    </div>
                                                    <div class="d-flex w-100 w-100 me-0">
                                                        <div class="registerElement d-flex elementMargin w-100 me-0">                                                           
                                                            <img src="${new URL('../../img/component/login/password.svg', import.meta.url)}">
                                                            <input class="w-100" placeholder="密碼" name="password" type="password" onchange="${gvc.event((e: HTMLInputElement) => {
                                widget.data.loginData.password = e.value
                            })}">                                                           
                                                        </div>                       
                                                    </div>
                                                    <div class="d-flex w-100">
                                                        <div class="registerElement d-flex elementMargin">                                                           
                                                            <img src="${new URL('../../img/component/login/L.svg', import.meta.url)}">
                                                            <input class="" placeholder="姓氏" name="last" onchange="${gvc.event((e: HTMLInputElement) => {
                                widget.data.loginData.firstName = e.value
                            })}">                                                           
                                                        </div>
                                                        <div class="registerElement d-flex  elementMargin">
                                                            <img src="${new URL('../../img/component/login/F.svg', import.meta.url)}">
                                                            <input class="" placeholder="名稱" name="name" value="" onchange="${gvc.event((e: HTMLInputElement) => {
                                widget.data.loginData.lastName = e.value
                            })}">
                                                        </div>
                                                    </div>
                                                    <div class="d-flex w-100 w-100 me-0">
                                                        <div class="registerElement d-flex elementMargin w-100 me-0">                                                           
                                                            <img src="${new URL('../../img/component/login/addUser.svg', import.meta.url)}">
                                                            <input class="w-100" placeholder="用戶名稱" name="name" onchange="${gvc.event((e: HTMLInputElement) => {
                                widget.data.loginData.name = e.value
                            })}">                                                           
                                                        </div>                       
                                                    </div>
                                                    <div class="d-flex w-100">
                                                        <div class="registerElement d-flex elementMargin">
                                                            <img src="${new URL('../../img/component/login/profile.svg', import.meta.url)}">
                                                            <select name="gender" style="background: none;color: black;" onchange="${gvc.event((e: HTMLInputElement) => {
                                widget.data.loginData.gender = e.value;
                            })}">
                                                                <option selected value="-1" hidden>性別</option>
                                                                <option  value="1">男性</option>
                                                                <option  value="0">女性</option>
                                                            </select>                       
                                                        </div>
                                                        <div class="registerElement d-flex me-0 elementMargin ">
                                                            <img src="${new URL('../../img/component/login/calender.svg', import.meta.url)}">
                                                            <input class="w-100" type="date" style="background: none;color: black;"  name="birth" onchange="${gvc.event((e: HTMLInputElement) => {
                                widget.data.loginData.birthDay = e.value
                            })}" placeholder="出生日期" placeholder="MM/DD/YYYY"
                                                            onclick="${gvc.event((e: HTMLInputElement) => {
                                glitter.runJsInterFace("datePicker", {}, (response) => {
                                    //todo
                                    glitter.$(e).val(response.data)
                                    widget.data.loginData.birthDay = response.data
                                })
                                //todo readonly先拿起來了 等上面能正確使用記得加回去
                            })}"   >
                                                        </div>
                                                    </div>     
                                                    <div class="d-flex w-100 d-none">
                                                        <div class="registerElement d-flex elementMargin w-100 me-0">                                                           
                                                            <img src="${new URL('../../img/component/login/TicketStar.svg', import.meta.url)}">
                                                            <input class="w-100 me-0" placeholder="用戶邀請碼" name="inviteCode" onchange="${gvc.event((e: HTMLInputElement) => {
                                widget.data.loginData.inviteCode = e.value
                            })}">                                                           
                                                        </div>                       
                                                    </div>  
                                                                    
                                                </div>                                                
                                                <!--會員編號拿掉-->
                                                <!--註冊-->
                                                <!--todo click-->
                                                    <div class="loginBTN d-flex justify-content-center align-items-center" onclick="${gvc.event(() => {
                                checkRegister()
                            })} ">
                                                        註冊
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
                    return gvc.map([
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: "客製化頁面",
                            data: widget.data.layout,
                            innerText: () => {
                                return [Editor.uploadLottie({
                                    gvc: gvc,
                                    title: `背景區塊[可選圖檔或Lottie動畫區塊]`,
                                    def: widget.data.layout.lottie ?? "",
                                    callback: (text) => {
                                        widget.data.layout.lottie = text;
                                        widget.refreshComponent();
                                    }
                                }), gvc.bindView(() => {
                                    const id = glitter.getUUID()
                                    return {
                                        bind: id,
                                        view: () => {
                                            return gvc.map([
                                                Editor.select({
                                                    title: "Logo類型",
                                                    gvc: gvc,
                                                    def: widget.data.layout.titleImage.type,
                                                    array: [
                                                        {title: "圖檔", value: "image"},
                                                        {title: "文字", value: "text"}
                                                    ],
                                                    callback: (text) => {
                                                        widget.data.layout.titleImage.type = text
                                                        widget.refreshComponent()
                                                    }
                                                }),
                                                (() => {
                                                    if (widget.data.layout.titleImage.type === 'image') {
                                                        return Editor.uploadImage({
                                                            gvc: gvc,
                                                            title: "請輸入圖片連結",
                                                            def: widget.data.layout.titleImage.src,
                                                            callback: (text: string) => {
                                                                widget.data.layout.titleImage.src = text
                                                                widget.refreshComponent()
                                                            }
                                                        })
                                                    } else {
                                                        return glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: "請輸入文字",
                                                            default: widget.data.layout.titleImage.src,
                                                            placeHolder: "請輸入文字內容",
                                                            callback: (text: string) => {
                                                                widget.data.layout.titleImage.src = text
                                                                widget.refreshComponent()
                                                            }
                                                        })
                                                    }
                                                })(),
                                                glitter.htmlGenerate.styleEditor(widget.data.layout.titleImage).editor(gvc, () => {
                                                    widget.refreshComponent()
                                                }, 'Logo設計樣式')
                                            ])
                                        },
                                        divCreate: {}
                                    }
                                })].join('')
                            }
                        })
                    ])
                }
            }
        },
    }
})