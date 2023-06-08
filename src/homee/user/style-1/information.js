import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../../script-style-1.js";
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
                    glitter.share.userToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNHQ2VwY3Zyb2NtWkpFd2JkU2h3bCJ9.eyJpc3MiOiJodHRwczovL3N0Zy1jbGllbnQtMS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjQzOGUwYzBiN2FkZDE1YTg5YjRjMjRhIiwiYXVkIjoiaHR0cHM6Ly9zdGcuYXBpLmhvbWVlLmFpLyIsImlhdCI6MTY4NjIxMTc3MywiZXhwIjoxNjg2Mjk4MTczLCJhenAiOiJ0V2VlT0NRZ3FheTdSRmFTSWM5V3drZFBYUUFhbDEwSiIsImd0eSI6InBhc3N3b3JkIn0.Xg2ahkDPUHKYqeoLuRS7xUBe6LXdzxevgmwXuwCfdeRRhqGx_8p5shnisVUtIYFhVgV5YB7dMwNDrRD8sEUXGGhGTgudho7YGDQA3-Gh-eYNe_hiy_fBSPZl9WALQACzmlIg0pbi2dXmj5TRH3EJwTmKDNQBq2RaMctkZf3VGvB4i7B4RQN5nsf99GjgUay2H2ZbDr7I1s2JyBIOIXnOWl9N8g5GxMuL1WUEnU2c1YtJ4Vya6LPopCEwPzEWdbwayIyNSTdaV2BzY-9H6bG4tUjDUfswfbkLCfuwVxx5bbQdvAJ9tamDEKcKmxYvve_JE1eHIsz2Myg-JRKyrsHdJg";
                    appConfig().getUserData({
                        callback: (response) => {
                            vm.data = response;
                            console.log(vm.data);
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
