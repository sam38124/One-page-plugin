import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { appConfig } from "../../../config.js";
import { Dialog } from "../../dialog/dialog-mobile.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    const dialog = new Dialog(gvc);
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

        html {
            width: 100%;
            height: 100%;

        }

        body {
            width: 100%;
            height: 100%;
     
        }

        main {
            padding: 24px 35px 44px;
         
            font-family: 'Noto Sans TC';
            margin: 0;
            box-sizing: border-box;
        }
        .logout{
            width: 296px;
            height: 48px;
            background: #FD6A58;
            border-radius: 28px;
            font-weight: 700;
            font-size: 18px;
            line-height: 26px;
            letter-spacing: 0.15em;
            color: #FFFFFF;
        }
        .deleteAccount{
            font-weight: 400;
            font-size: 15px;
            color: #292929;
            margin-top:8px;
        }

        `);
                    let vm = {
                        model: [
                            {
                                img: new URL("../../img/notify.svg", import.meta.url),
                                text: "消息通知",
                                click: () => {
                                    glitter.runJsInterFace("onClickNoti", {}, () => {
                                    });
                                }
                            },
                            {
                                img: new URL("../../img/information.svg", import.meta.url),
                                text: "關於",
                                click: () => {
                                    glitter.runJsInterFace("about", {}, () => {
                                    });
                                }
                            },
                            {
                                img: new URL("../../img/shield.svg", import.meta.url),
                                text: "隱私",
                                click: () => {
                                    glitter.runJsInterFace("privacy", {}, () => {
                                    });
                                }
                            },
                        ],
                        logout: () => {
                            dialog.confirm("是否確認登出帳號?", (result) => {
                                if (result) {
                                    appConfig().setUserData({
                                        value: {}, callback: (resonse) => {
                                            glitter.setPro("tempLeave", "falser", () => {
                                                appConfig().setHome(gvc, 'home');
                                            });
                                        }
                                    });
                                }
                            });
                        },
                        deleteAccount: () => {
                            glitter.runJsInterFace("deleteAccount", {}, (response) => {
                            }, {
                                webFunction: () => {
                                    return {};
                                }
                            });
                        }
                    };
                    let model = undefined;
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                    <main style="padding-left: 27px;padding-right: 27px;padding-top: 0px;">
                        ${gvc.bindView({
                                bind: "",
                                view: () => {
                                    gvc.addStyle(`
                                    .rowText{
                                        font-weight: 500;
                                        font-size: 20px;
                                        line-height: 29px;
                                        color: #292929;                                    
                                    }
                                    .rowBorder{
                                        border-bottom: 1px solid #E0E0E0;
                                    }
                                `);
                                    return gvc.map(vm.model.map((rowData, index) => {
                                        let border = "";
                                        if (index != vm.model.length - 1) {
                                            border = "rowBorder";
                                        }
                                        return `<div class="d-flex align-items-center ${border} " style="padding:35.5px 0;" onclick="${gvc.event(() => {
                                            rowData.click();
                                        })}">
 <img src="${rowData.img}" alt="${rowData.text}" style="width: 35px;height: 32px;margin-right: 16px;">
                                                    <div class="rowText">${rowData.text}</div>
                                                    <img class="ms-auto" src="${new URL("../../img/angle-right.svg", import.meta.url)}" alt="右箭頭" style="height: 24px;width: 24px;" >
</div>`;
                                    }));
                                }, divCreate: { style: `margin-bottom:24px;`, class: `` }
                            })}
                        <div class="d-flex align-items-center justify-content-center" style=""><button class="logout border-0" onclick="${gvc.event(() => {
                                vm.logout();
                            })}">登出</button></div>
                        <div class="deleteAccount d-flex align-items-center justify-content-center" onclick="${gvc.event(() => {
                                vm.deleteAccount();
                            })}">刪除帳號</div>
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
