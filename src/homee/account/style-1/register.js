import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { Dialog } from "../../dialog/dialog-mobile.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    widget.data = {
                        loginData: {
                            account: undefined,
                            head: '',
                            lastName: '',
                            firstName: '',
                            gender: '-1',
                            birthDay: '',
                            name: '',
                            inviteCode: '',
                            email: '',
                            pwd: ''
                        },
                        topInset: 10,
                        background: new URL('../../img/component/login/login_page.json', import.meta.url),
                    };
                    gvc.addStyle(`
                    body{
                    overflow-x: hidden;
                    }
                    html{
                    overflow-x: hidden;
                    }
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
                        background-position: center 40%;
                        background-size: 100%;
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
                   `);
                    function checkRegister() {
                        const dialog = new Dialog(gvc);
                        if (widget.data.loginData.gender === "-1" || widget.data.loginData.lastName === '' || widget.data.loginData.firstName === '' || widget.data.loginData.birthDay === '' || widget.data.loginData.name === '') {
                            dialog.showInfo("請填寫完整資料!");
                        }
                        else {
                            let temp = {
                                third: gvc.parameter.pageConfig?.obj.data.third,
                                first: widget.data.loginData.firstName,
                                last: widget.data.loginData.lastName,
                                inviteCode: (widget.data.loginData.inviteCode) || undefined,
                                email: widget.data.loginData.email,
                                pwd: widget.data.loginData.password,
                                gender: widget.data.loginData.gender,
                                birth: widget.data.loginData.birthDay,
                                userName: widget.data.loginData.name,
                            };
                            dialog.dataLoading(true);
                        }
                    }
                    gvc.addMtScript([{ src: `https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js` }], () => {
                        gvc.notifyDataChange('mainView');
                    }, () => {
                    });
                    glitter.runJsInterFace("getTopInset", {}, (response) => {
                        widget.data.topInset = response.data;
                        gvc.notifyDataChange('mainView');
                    }, {
                        webFunction: () => {
                            return { data: 10 };
                        }
                    });
                    const $ = gvc.glitter.$;
                    let exists = widget.data.loginData.account == "";
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                                        <main style="overflow-x: hidden;">
                                            <div class="w-100" style="position: absolute;">
                                                <lottie-player src="${new URL('../img/component/login/login_page.json', import.meta.url)}"  background="#F8F3ED"  speed="1"  onclick="${gvc.event((e) => {
                                glitter.goBack();
                            })}" style="width: 100%;height: 1073px;position: absolute;transform: translateY(-40%);"  loop  autoplay></lottie-player>
                                            </div>
                                            <div class="loginBoard d-flex flex-column align-items-center">
                                                <img src="${new URL('../img/component/login/logo.svg', import.meta.url)}" alt="LOGO">
                                                <div class="loginInf d-flex flex-column align-items-center">
                                                    <div class="userPic" style="border-radius: 50%;background: whitesmoke url('${new URL('../../img/component/login/userPic.png', import.meta.url)}') no-repeat 50% 50%;background-size: contain" onclick="${gvc.event((e) => {
                                glitter.ut.chooseMediaCallback({
                                    single: true,
                                    accept: "image/*",
                                    callback(data) {
                                        if (data.length > 0) {
                                            glitter.$(e).css('background', `50%/cover no-repeat url('${data[0].data}')`);
                                        }
                                    }
                                });
                            })}">
                                                    </div>                        
                                                <!--四個註冊元素 每個都必填-->
                                                
                                                <div class="d-flex flex-wrap w-100" style="padding-left: 47px;padding-right: 47px;">                                                    
                                                    <div class="d-flex w-100 w-100 me-0">
                                                        <div class="registerElement d-flex elementMargin w-100 me-0">                                                           
                                                            <img src="${new URL('../../img/component/login/message.svg', import.meta.url)}">
                                                            <input class="w-100" placeholder="電子郵件地址或手機號碼" name="email" onchange="${gvc.event((e) => {
                                widget.data.loginData.email = e.value;
                            })}">                                                           
                                                        </div>                       
                                                    </div>
                                                    <div class="d-flex w-100 w-100 me-0">
                                                        <div class="registerElement d-flex elementMargin w-100 me-0">                                                           
                                                            <img src="${new URL('../../img/component/login/password.svg', import.meta.url)}">
                                                            <input class="w-100" placeholder="密碼" name="password" type="password" onchange="${gvc.event((e) => {
                                widget.data.loginData.password = e.value;
                            })}">                                                           
                                                        </div>                       
                                                    </div>
                                                    <div class="d-flex w-100">
                                                        <div class="registerElement d-flex elementMargin">                                                           
                                                            <img src="${new URL('../../img/component/login/L.svg', import.meta.url)}">
                                                            <input class="" placeholder="姓氏" name="last" onchange="${gvc.event((e) => {
                                widget.data.loginData.firstName = e.value;
                            })}">                                                           
                                                        </div>
                                                        <div class="registerElement d-flex  elementMargin">
                                                            <img src="${new URL('../../img/component/login/F.svg', import.meta.url)}">
                                                            <input class="" placeholder="名稱" name="name" value="" onchange="${gvc.event((e) => {
                                widget.data.loginData.lastName = e.value;
                            })}">
                                                        </div>
                                                    </div>
                                                    <div class="d-flex w-100 w-100 me-0">
                                                        <div class="registerElement d-flex elementMargin w-100 me-0">                                                           
                                                            <img src="${new URL('../../img/component/login/addUser.svg', import.meta.url)}">
                                                            <input class="w-100" placeholder="用戶名稱" name="name" onchange="${gvc.event((e) => {
                                widget.data.loginData.name = e.value;
                            })}">                                                           
                                                        </div>                       
                                                    </div>
                                                    <div class="d-flex w-100">
                                                        <div class="registerElement d-flex elementMargin">
                                                            <img src="${new URL('../../img/component/login/profile.svg', import.meta.url)}">
                                                            <select name="gender" style="background: none;color: black;" onchange="${gvc.event((e) => {
                                widget.data.loginData.gender = e.value;
                            })}">
                                                                <option selected value="-1" hidden>性別</option>
                                                                <option  value="1">男性</option>
                                                                <option  value="0">女性</option>
                                                            </select>                       
                                                        </div>
                                                        <div class="registerElement d-flex me-0 elementMargin ">
                                                            <img src="${new URL('../../img/component/login/calender.svg', import.meta.url)}">
                                                            <input class="w-100" type="date" style="background: none;color: black;"  name="birth" onchange="${gvc.event((e) => {
                                widget.data.loginData.birthDay = e.value;
                            })}" placeholder="出生日期" placeholder="MM/DD/YYYY"
                                                            onclick="${gvc.event((e) => {
                                glitter.runJsInterFace("datePicker", {}, (response) => {
                                    glitter.$(e).val(response.data);
                                    widget.data.loginData.birthDay = response.data;
                                });
                            })}"   >
                                                        </div>
                                                    </div>     
                                                    <div class="d-flex w-100">
                                                        <div class="registerElement d-flex elementMargin w-100 me-0">                                                           
                                                            <img src="${new URL('../../img/component/login/TicketStar.svg', import.meta.url)}">
                                                            <input class="w-100 me-0" placeholder="用戶邀請碼" name="inviteCode" onchange="${gvc.event((e) => {
                                widget.data.loginData.inviteCode = e.value;
                            })}">                                                           
                                                        </div>                       
                                                    </div>  
                                                                    
                                                </div>                                                
                                                <!--會員編號拿掉-->
                                                <!--註冊-->
                                                <!--todo click-->
                                                    <div class="loginBTN d-flex justify-content-center align-items-center" style="${(exists) ? `margin-top: 50px;` : ``}" onclick="${gvc.event(() => {
                                checkRegister();
                            })} ">
                                                        註冊
                                                    </div>
                                                </div>                        
                                            </div>
                                        </main>
                                    `;
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
