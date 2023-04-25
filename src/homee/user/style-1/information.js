import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { appConfig } from "../../../config.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {
            userData: {
                user_id: 12052350,
                last_name: "Rdtest",
                first_name: "Rdtes22t",
                name: "Rdtest Rd",
                photo: "https://prd-homee-api-public.s3.amazonaws.com/scene/12577227/headPhoto.png",
                AUTH: ""
            }
        },
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    const vm = {
                        data: {
                            user_id: 12052350,
                            last_name: "Rdtest",
                            first_name: "Rdtes22t",
                            name: "Rdtest Rd",
                            photo: "https://prd-homee-api-public.s3.amazonaws.com/scene/12577227/headPhoto.png",
                            AUTH: ""
                        },
                        loading: true
                    };
                    vm.loading = false;
                    appConfig().getUserData({
                        callback: (response) => {
                            vm.data = response;
                            vm.loading = false;
                        }
                    });
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                        ${gvc.bindView({
                                dataList: [{ obj: vm, key: 'loading' }],
                                bind: "baseUserInf",
                                view: () => {
                                    if (vm.loading) {
                                        return ``;
                                    }
                                    return `
                                <div class="d-flex align-items-center">
                                    <div class="d-flex position-relative">
                                        <img src="${vm.data.photo ?? `https://assets.imgix.net/~text?bg=7ED379&txtclr=ffffff&w=200&h=200&txtsize=90&txt=${vm.data.last_name}&txtfont=Helvetica&txtalign=middle,center`}" style="width: 88px;height: 88px;left: 8px;top: 0px;border-radius: 50%">
                                        <img src="${new URL(`../../img/component/edit.svg`, import.meta.url)}" style="position: absolute;right: 0;bottom: 0;" onclick="${gvc.event(() => {
                                    })}">
                                    </div>
                                    <div class="d-flex flex-column justify-content-center align-baseline" style="margin-left: 32px;">
                                        <div class="d-flex">
                                            <div class="last-name">${vm.data.last_name}</div><div class="first-name">${vm.data.first_name}</div>
                                        </div>
                                        <div class="name">
                                            ${vm.data?.name}
                                        </div>
                                    </div>
                                </div>
                                `;
                                },
                                divCreate: { style: `margin : 40px 0;padding : 0 27px;` }
                            })}   
                        
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
