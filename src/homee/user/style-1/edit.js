import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { SharedView } from "../../commenPage/shareView.js";
import { Dialog } from "../../dialog/dialog-mobile.js";
import { Funnel } from "../../../glitterBundle/funnel.js";
import { ViewModel } from "../viewModel/viewModel.js";
import { appConfig } from "../../../config.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    widget.data = {
                        topInset: widget.data.topInset ?? 10,
                        nav: widget.data.nav ?? {
                            title: "",
                            leftIcon: new URL('../../img/component/left-arrow.svg', import.meta.url),
                            leftPage: "",
                            boxShadow: true,
                            background: "#FFFFFF"
                        },
                    };
                    let id = glitter.getUUID();
                    let classStyle = {
                        mySpaceCount: `
                                width: 18px;
                                height: 18px;
                    
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;                                
                                font-weight: 700;
                                font-size: 12px;
                                line-height: 15px;
                                text-align: center;                      
                    
                                border: 1px solid #FFFFFF;
                                border-radius: 8px;                             
                    
                                color: #FFFFFF;
                            `,
                        indexTitle: `
                            font-weight: 400;
                            font-size: 15px;
                            line-height: 150%;                
                            color: #292929;
                            `,
                        save: `
                                font-weight: 500;
                                font-size: 17px;
                                line-height: 25px;                                                               
                                text-align: center;                                                                                                
                                color: #FD6A58;
                            `,
                        changePhoto: `
                                font-weight: 700;
                                font-size: 14px;
                                line-height: 20px;
                                font-feature-settings: 'pnum' on, 'lnum' on;
                                color: #FD6A58;                            
                                margin-top : 8px;
                            `,
                        accTitle: `
                                font-weight: 700;
                                font-size: 24px;
                                line-height: 35px;
                                color: #292929;
                                margin-bottom : 18px;
                            `,
                        addrAdd: `
                                font-weight: 400;
                                font-size: 15px;
                                line-height: 150%;
                                color: #FD6A58;
                            `,
                        addrEdit: `
                                font-weight: 400;
                                font-size: 15px;
                                line-height: 150%;
                                color: #FD6A58;
                                margin-right : 12px;
                            `,
                        addrDel: `
                                font-weight: 400;
                                font-size: 15px;
                                line-height: 150%;
                                color: #858585;
                            `,
                        left: `
                                width: 21%;
                                font-size: 18px;
                                font-weight: 500;
                                line-height: 26px;
                                color: #1E1E1E;
                            `,
                        right: `
                                font-weight: 400;
                                font-size: 16px;
                                line-height: 23px;
                                color: #292929;
                                border-bottom: 1px solid #E0E0E0;
                            `
                    };
                    const sharedView = new SharedView(gvc);
                    let viewModel = new ViewModel(gvc);
                    let dialog = new Dialog(gvc);
                    const vm = {
                        loading: true,
                        data: undefined,
                        userData: undefined,
                        addressModel: []
                    };
                    let photoFile = undefined;
                    let b64 = undefined;
                    let resetPassword = false;
                    let addressModel = [];
                    appConfig().getUserData({
                        callback: (response) => {
                            vm.data = [
                                {
                                    left: "姓名",
                                    type: "name",
                                    name: "name",
                                    placehold: {
                                        get last() {
                                            return response?.last_name || "";
                                        },
                                        set last(value) {
                                            response.last_name = value;
                                        },
                                        get first() {
                                            return response?.first_name || "";
                                        },
                                        set first(value) {
                                            response.first_name = value;
                                        }
                                    }
                                },
                                {
                                    left: "用戶名稱",
                                    type: "text",
                                    name: "userName",
                                    get placehold() {
                                        return (response.name) ?? ((vm.data.first_name + vm.data.last_name) || "");
                                    },
                                    set placehold(value) {
                                        response.name = value;
                                    }
                                },
                                {
                                    left: "電子郵件",
                                    type: "email",
                                    name: "email",
                                    get placehold() {
                                        return response.email || "";
                                    },
                                    set placehold(value) {
                                        response.email = value;
                                    }
                                },
                                {
                                    left: "電話",
                                    type: "number",
                                    name: "phone",
                                    get placehold() {
                                        return response.phone;
                                    },
                                    set placehold(value) {
                                        response.phone = value;
                                    }
                                },
                                {
                                    left: "密碼",
                                    type: "password",
                                    name: "password",
                                    check: false,
                                    placehold: ""
                                },
                                {
                                    visible: false,
                                    left: "新密碼",
                                    type: "password",
                                    name: "newPassword",
                                    placehold: ""
                                },
                                {
                                    visible: false,
                                    left: "再次輸入",
                                    type: "password",
                                    name: "confirmPassword",
                                    placehold: ""
                                }
                            ];
                            if (response.addressModel) {
                                vm.addressModel = [
                                    {
                                        left: "姓名",
                                        type: "name",
                                        name: "addressName",
                                        placehold: {
                                            last: response.addressModel.last_name,
                                            first: response.addressModel.first_name
                                        }
                                    },
                                    {
                                        left: "電話",
                                        type: "number",
                                        name: "addressPhone",
                                        placehold: response.addressModel.address_phone
                                    },
                                    {
                                        left: "公司名稱",
                                        type: "text",
                                        name: "addressCompany",
                                        placehold: response.addressModel.company
                                    },
                                    {
                                        left: "地址",
                                        type: "text",
                                        name: "address",
                                        placehold: response.addressModel.address
                                    }
                                ];
                            }
                            else {
                                vm.addressModel = gvc.parameter.pageConfig?.obj.data?.addressModel ?? [];
                            }
                            vm.userData = response;
                            vm.loading = false;
                        }
                    });
                    function saveData() {
                    }
                    function dataURLtoFile(dataurl, filename) {
                        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                        while (n--) {
                            u8arr[n] = bstr.charCodeAt(n);
                        }
                        return new File([u8arr], filename, { type: mime });
                    }
                    function deleteFirstAddress() {
                        if (confirm("確定刪除?")) {
                            glitter.runJsInterFace("deleteAddress", {}, (response) => {
                                vm.addressModel = [];
                                gvc.notifyDataChange('firstAddress');
                            }, {
                                webFunction: () => {
                                    return { result: "OK" };
                                }
                            });
                        }
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return gvc.map([
                                sharedView.navigationBar({
                                    title: '我的帳號',
                                    leftIcon: `<img class="" src="${new URL('../../img/component/left-arrow.svg', import.meta.url)}" style="width: 24px;height: 24px;margin-right: 16px" alt="" onclick="${gvc.event(() => {
                                        if (glitter.getUrlParameter('navagation') == "true") {
                                            glitter.runJsInterFace("dismiss", {}, () => {
                                            });
                                        }
                                        else {
                                            glitter.goBack();
                                        }
                                    })}">`,
                                    rightIcon: `<div class="save" onclick="${gvc.event(() => {
                                        saveData();
                                    })}">儲存</div>`,
                                    boxShadow: widget.data.nav.boxShadow,
                                    background: widget.data.nav.background,
                                }),
                                `
                                <main style="overflow-x: hidden;margin-top: 50px;">                                   
                                ${(() => {
                                    let funnel = new Funnel(gvc);
                                    return gvc.map([`
                                    <input
                                    type="file"
                                    class="d-none"
                                    id="${gvc.id("photo")}"
                                    onchange="${gvc.event((e) => {
                                            for (let i = 0; i < $(e).get(0).files.length; i++) {
                                                let canvas = document.createElement('canvas');
                                                let ctx = canvas.getContext('2d');
                                                let file = $(e).get(0).files[i];
                                                let img = new Image();
                                                img.src = URL.createObjectURL(file);
                                                img.onload = function () {
                                                    let width = img.width;
                                                    if (width > 200) {
                                                        canvas.width = 200;
                                                        canvas.height = img.height * 200 / img.width;
                                                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                                                        let f = $(e).get(0).files[i];
                                                        let ran = funnel.randomString(3);
                                                        const regex = new RegExp('[^.]+$');
                                                        const extension = f.name.match(regex);
                                                        let compressedImageURL = canvas.toDataURL(`image/${extension}`, 0.75);
                                                        photoFile = {
                                                            ran: ran,
                                                            fullName: f.name,
                                                            name: f.name.substring(0, extension.index - 1),
                                                            ext: extension[0],
                                                            data: dataURLtoFile(compressedImageURL, f.name),
                                                        };
                                                        b64 = compressedImageURL;
                                                    }
                                                    else {
                                                        const regex = new RegExp('[^.]+$');
                                                        let f = $(e).get(0).files[i];
                                                        const extension = f.name.match(regex);
                                                        let ran = funnel.randomString(3);
                                                        photoFile = {
                                                            ran: ran,
                                                            fullName: f.name,
                                                            name: f.name.substring(0, extension.index - 1),
                                                            ext: extension[0],
                                                            data: f,
                                                        };
                                                    }
                                                };
                                            }
                                        })}"
                                    ></input>`,
                                        gvc.bindView({
                                            dataList: [
                                                {
                                                    obj: vm,
                                                    key: 'loading'
                                                }
                                            ],
                                            bind: gvc.glitter.getUUID(),
                                            view: () => {
                                                return `
                                                <div class="w-100 d-flex flex-column align-items-center">                            
                                                    <img id="${gvc.id('photoImage')}" src="${(photoFile !== undefined) ? b64 : vm.userData?.photo ?? `https://assets.imgix.net/~text?bg=7ED379&txtclr=ffffff&w=200&h=200&txtsize=90&txt=${vm.data?.last_name ?? ''}&txtfont=Helvetica&txtalign=middle,center`}" style="width: 128px;height: 128px;border-radius: 50%"
                                                    onclick="${gvc.event(() => {
                                                    $(`#${gvc.id("photo")}`).click();
                                                })}">
                                                    <div class="" style="${classStyle.changePhoto}" onclick="${gvc.event(() => {
                                                    $(`#${gvc.id("photo")}`).click();
                                                })}">更換大頭貼</div>                                                      
                                                </div>
                                            `;
                                            },
                                            divCreate: {
                                                class: `w-100 d-flex justify-content-center align-items-center`,
                                                style: `margin-bottom : 40px;`
                                            }
                                        })]);
                                })()}    
<!--                                                    上排資料-->
                                ${gvc.bindView({
                                    dataList: [
                                        {
                                            obj: vm,
                                            key: 'loading'
                                        }
                                    ],
                                    bind: "accountData",
                                    view: () => {
                                        return `
                                        <div class="w-100 d-flex flex-column">
                                            <div class="" style="${classStyle.accTitle}">帳號資料</div>
                                            ${gvc.map(vm.data.map((dd) => {
                                            if (dd.name === 'password' && dd.check == false) {
                                                return gvc.bindView({
                                                    bind: `${dd.name}-inputRow`,
                                                    view: () => {
                                                        return `                   
                                                            <div class="" style="${classStyle.left}">${dd.left}</div>
                                                            <div class="" style="${classStyle.right} width: 78%;position: relative">
                                                            <input class="w-100 border-0 pwInput" name="password" type="password" placeholder="輸入原先密碼" onchange="${gvc.event((e) => {
                                                            dd.placehold = e.value;
                                                        })}" value="${dd.placehold}">
                                                                    ${(dd.check) ? `` : ` 
                                                                    <div class="pwCheck" style="font-weight: 400;font-size: 12px;line-height: 17px;color: #FE5541;position: absolute;bottom: 0;right: 0;" onclick="${gvc.event(() => {
                                                            if (vm.userData.pwd !== dd.placehold) {
                                                                dialog.showInfo("密碼輸入錯誤!");
                                                            }
                                                            else {
                                                                vm.data.map((d2) => {
                                                                    if (d2.left != "密碼") {
                                                                        d2.visible = 'true';
                                                                    }
                                                                    else {
                                                                        d2.visible = false;
                                                                    }
                                                                });
                                                                dd.visible = false;
                                                                dd.check = true;
                                                                resetPassword = true;
                                                                gvc.notifyDataChange('accountData');
                                                            }
                                                        })}">更改密碼</div>    
                                                                `}
                                                                                   
                                                </div>                               
                                                
                                                                `;
                                                    },
                                                    divCreate: { style: ``, class: `d-flex align-items-center input-row` }
                                                });
                                            }
                                            else {
                                                if (dd.visible === false) {
                                                    return ``;
                                                }
                                                else {
                                                    return viewModel.inputRow(dd);
                                                }
                                            }
                                        }))}
                                        </div>`;
                                    },
                                    divCreate: {}
                                })}
                                ${gvc.bindView({
                                    bind: "firstAddress",
                                    view: () => {
                                        let returnData = ``;
                                        vm.addressModel.forEach((data) => {
                                            returnData += viewModel.inputRow(data, "readonly");
                                        });
                                        let addBtn = ``;
                                        if (vm.addressModel.length == 0) {
                                            addBtn = `<div class="addr-add" onclick="${gvc.event(() => {
                                            })}">新增</div>`;
                                        }
                                        else {
                                            addBtn = `
                                            <div class="d-flex">
                                                <div class="addr-edit" onclick="${gvc.event(() => {
                                                vm.addressModel[3].type = "address";
                                            })}">編輯</div>
                                                <div class="addr-del" onclick="${gvc.event(() => {
                                                deleteFirstAddress();
                                            })}">刪除</div>
                                            </div>`;
                                        }
                                        return ``;
                                        return `
                                            <div class="w-100 d-flex flex-column d-none" style="margin-top:6px;">
                                                <div class="w-100 acc-title d-flex justify-content-between align-items-center">
                                                    <div class="">首選地址</div>${addBtn}
                                                </div>                                            
                                                ${returnData}               
                                            </div>`;
                                    }, divCreate: {}
                                })}
                                
                            </main>
                                `
                            ]);
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
