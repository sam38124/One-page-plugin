import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../../editor.js";
import { Dialog } from "../../dialog/dialog-mobile.js";
import { User } from "../../api/user.js";
import { appConfig } from "../../../config.js";
import { ScriptStyle1 } from "../../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            widget.data.layout = widget.data.layout ?? {};
            widget.data.layout.lottie = widget.data.layout.lottie ?? new URL('../../img/component/login/login_page.json', import.meta.url);
            widget.data.layout.titleImage = widget.data.layout.titleImage ?? {
                type: 'image',
                src: new URL('../../img/component/login/logo.svg', import.meta.url)
            };
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    gvc.addStyle(`
                body{
                overflow-x: hidden;
                }
                html{
                overflow-x: hidden;
                }
             
                main{
                    position: relative;
                    height: 100vh;
                }
                .showGIF{
                    background-image: url("img/sample/login/BG.gif") ;
                    background-position: center 60%;
                    background-size: 100%;
                    height: 50%;
                }
                .arrow{
                    width: 24px;
                    height: 24px;
                    position: absolute;
        
                }
                .BG{
                    width: 100%;
                    height: 100%;
                }
                .loginBoard{
                    position: absolute;
                    width: 100vw;
        
                    left: 0;
                    bottom: 0;
                    z-index: 3;
                    /* HOMEE white */
        
                    background: #FFFFFF;
        
                    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
                    border-radius: 56px 56px 0 0;
                    padding-top: 48px;
        
        
                }
                .loginInf{
                    margin-top: 76px;
                    padding: 0 47px 25px;
                }
                .loginRow{
                    padding-bottom: 11px;
                    margin-right: 0px;
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
                .fogetPW{
                    /* Noto Sans TC - Regular - 12 */
        
                    font-family: 'Noto Sans TC';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 17px;
                    /* identical to box height */
        
        
                    color: #FD6A58;
                }
                .loginBTN{
                    /* HOMEE red */
                    width: 100%;
                    height: 64px;
        
                    background: #FD6A58;
                    border-radius: 32px;
        
                    margin-top: 50px;
        
                    font-family: 'Noto Sans TC';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 18px;
                    line-height: 26px;
        
                    /* HOMEE white */
                    color: #FFFFFF;       
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
                    let id = glitter.getUUID();
                    widget.data.accountData = {
                        account: '',
                        password: ''
                    };
                    gvc.addMtScript([{ src: `https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js` }], () => {
                        gvc.notifyDataChange('mainView');
                    }, () => {
                    });
                    glitter.runJsInterFace("getTopInset", {}, (response) => {
                        if (widget.data.topInset != response.data) {
                            widget.data.topInset = response.data;
                            gvc.notifyDataChange('mainView');
                        }
                    }, {
                        webFunction: () => {
                            return { data: 10 };
                        }
                    });
                    const dialog = new Dialog(gvc);
                    function login() {
                        User.login({
                            third: vm.fet ? { type: 'fet', uid: vm.fet } : undefined,
                            pwd: widget.data.accountData.password,
                            account: widget.data.accountData.account,
                            callback(data) {
                                dialog.dataLoading(false);
                                if (!data) {
                                    dialog.showInfo('密碼輸入錯誤或是查無此帳號');
                                }
                                else {
                                    dialog.showInfo('登入成功!');
                                    appConfig().setHome(gvc, 'user_setting', {});
                                    const url = new URL('./', location.href);
                                    url.searchParams.set('page', 'user_setting');
                                    location.href = url.href;
                                }
                            },
                        });
                    }
                    function checkRegister() {
                        dialog.dataLoading(true);
                        User.checkUserExists(widget.data.accountData.account, (response) => {
                            if (response === undefined) {
                                dialog.dataLoading(false);
                                dialog.showInfo("連線逾時");
                            }
                            else if (response) {
                                dialog.showInfo("此帳號已被使用");
                            }
                            else {
                                setTimeout(() => {
                                    dialog.dataLoading(false);
                                    appConfig().changePage(gvc, "register", {
                                        pwd: widget.data.accountData.password,
                                        account: widget.data.accountData.account,
                                        third: vm.fet ? { type: 'fet', uid: vm.fet } : undefined
                                    }, {
                                        animation: glitter.animation.fade
                                    });
                                }, 500);
                            }
                        });
                    }
                    const vm = {
                        fet: ''
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return gvc.bindView({
                                bind: `mainView`,
                                dataList: [{ obj: vm, key: 'fet' }],
                                view: () => {
                                    return `
                            <main style="overflow-x: hidden;">
                                <div class="w-100" style="position: absolute;z-index:0;">
                                ${(widget.data.layout.lottie.split('.').pop() === "json") ? `
                                <lottie-player src="${widget.data.layout.lottie}"  background="#F8F3ED"  speed="1"  onclick="${gvc.event((e) => {
                                    })}" style="width: 100%;height: 900px;position: absolute;transform: translateY(-350px);"  loop  autoplay></lottie-player>
                                ` : `
                                <img src="${widget.data.layout.lottie}"  style="width: 100%;height: 900px;position: absolute;transform: translateY(-350px);">
                                `}
                                </div>
                                 <div class="loginBoard d-flex flex-column align-items-center w-100">
                                   ${(widget.data.layout.titleImage.type === 'image') ? `<img src="${widget.data.layout.titleImage.src}"
class="${glitter.htmlGenerate.styleEditor(widget.data.layout.titleImage).class()}"
style="${glitter.htmlGenerate.styleEditor(widget.data.layout.titleImage).style()}"
>` : `
                                   <h3 style="font-size:15px;font-family: 'Noto Sans TC', sans-serif;${glitter.htmlGenerate.styleEditor(widget.data.layout.titleImage).style()};"
                                   class="${glitter.htmlGenerate.styleEditor(widget.data.layout.titleImage).class()}">${widget.data.layout.titleImage.src}</h3>
                                   `}
                                    <div class="loginInf d-flex flex-column align-items-center w-100">
                                         <div class="loginRow d-flex w-100" style="border-bottom: 1px solid #FD6A58;">
                                                <img src="${new URL('../../img/component/login/message.svg', import.meta.url)}" alt="" style="width: 24px;height: 24px;">
                                                <input class="w-100 border-0 bg-white" placeholder="電子郵件地址或手機號碼" onchange="${gvc.event((e) => {
                                        widget.data.accountData.account = e.value;
                                    })}">
                                            </div>
                                        <div class="loginRow d-flex w-100" style="margin-top: 40px;border-bottom: 1px solid #FD6A58;">
                                            <img src="${new URL('../../img/component/login/password.svg', import.meta.url)}" alt="" style="width: 24px;height: 24px;">
                                            <input type="password" class="w-100 border-0" name="password" placeholder="密碼" onchange="${gvc.event((e) => {
                                        widget.data.accountData.password = e.value;
                                    })}">
                                        </div>
                                        <div class="loginRow w-100 d-flex" style="margin-top: 8px;padding-bottom: 0px;">
                    <!--                    todo sethome trans to changepage-->
                                            <div class="fogetPW ms-auto" onclick="${gvc.event(() => {
                                    })}">忘記密碼？</div>
                                           
                                        </div>
                                        <div class="loginBTN d-flex justify-content-center align-items-center" style="margin-top: 40px;height: 56px;" onclick="${gvc.event(() => {
                                        if (!widget.data.accountData.account) {
                                            alert("帳號不得為空!");
                                        }
                                        else if (widget.data.accountData.password.length < 8) {
                                            alert("密碼必須大於8位數");
                                        }
                                        else {
                                            login();
                                        }
                                    })}">
                                            登入
                                        </div>
                                        <div class="w-100 d-flex align-items-center justify-content-center" style="margin-top:16px;font-weight: 500;font-size: 18px;line-height: 26px;font-feature-settings: 'pnum' on, 'lnum' on;color: #1E1E1E;" onclick="${gvc.event(() => {
                                        appConfig().changePage(gvc, "register", {
                                            pwd: widget.data.accountData.password,
                                            account: widget.data.accountData.account,
                                            third: vm.fet ? { type: 'fet', uid: vm.fet } : undefined
                                        }, {
                                            animation: glitter.animation.fade
                                        });
                                    })}">註冊帳號</div>
                                        <div class="w-100 text-danger text-center mt-2 ${vm.fet ? '' : 'd-none'}">驗證成功，登入或註冊後即可綁定遠傳帳號</div>
                                        <div class="moreLogin d-flex justify-content-center align-items-center d-none">更多的登入方式</div>
                                        <div class="funGroup d-flex justify-content-between d-none">
                                            <img src="${new URL('../../img/component/login/FB.png', import.meta.url)}" style="height: 50px;width:50px;" alt="" onclick="${gvc.event(() => {
                                        glitter.runJsInterFace("loginWithFB", {}, (response) => {
                                            dialog.dataLoading(false);
                                            if (response.email && response.token) {
                                            }
                                        });
                                    })}">
                                            <img src="${new URL('../../img/component/login/apple.png', import.meta.url)}" style="height: 55px;width:55px;margin-left: 16px;margin-right: 16px;" onclick="${gvc.event(() => {
                                    })}" alt="">
                                            <img src="${new URL('../../img/component/login/FET.png', import.meta.url)}"  style="height: 45px;width:45px;" onclick="${gvc.event(() => {
                                        glitter.runJsInterFace("loginWithFet", {}, (response) => { });
                                    })}" alt="" >
                                        </div>
                                    </div>
                                </div>
                            </main>
                       `;
                                },
                                divCreate: { class: ``, style: `` }
                            });
                        },
                        divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
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
                                        const id = glitter.getUUID();
                                        return {
                                            bind: id,
                                            view: () => {
                                                return gvc.map([
                                                    Editor.select({
                                                        title: "Logo類型",
                                                        gvc: gvc,
                                                        def: widget.data.layout.titleImage.type,
                                                        array: [
                                                            { title: "圖檔", value: "image" },
                                                            { title: "文字", value: "text" }
                                                        ],
                                                        callback: (text) => {
                                                            widget.data.layout.titleImage.type = text;
                                                            widget.refreshComponent();
                                                        }
                                                    }),
                                                    (() => {
                                                        if (widget.data.layout.titleImage.type === 'image') {
                                                            return Editor.uploadImage({
                                                                gvc: gvc,
                                                                title: "請輸入圖片連結",
                                                                def: widget.data.layout.titleImage.src,
                                                                callback: (text) => {
                                                                    widget.data.layout.titleImage.src = text;
                                                                    widget.refreshComponent();
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            return glitter.htmlGenerate.editeInput({
                                                                gvc: gvc,
                                                                title: "請輸入文字",
                                                                default: widget.data.layout.titleImage.src,
                                                                placeHolder: "請輸入文字內容",
                                                                callback: (text) => {
                                                                    widget.data.layout.titleImage.src = text;
                                                                    widget.refreshComponent();
                                                                }
                                                            });
                                                        }
                                                    })(),
                                                    glitter.htmlGenerate.styleEditor(widget.data.layout.titleImage).editor(gvc, () => {
                                                        widget.refreshComponent();
                                                    }, 'Logo設計樣式')
                                                ]);
                                            },
                                            divCreate: {}
                                        };
                                    })].join('');
                            }
                        })
                    ]);
                }
            };
        },
    };
});
