import {Plugin} from "./glitterBundle/plugins/plugin-creater.js";
import {Api} from "./homee/homee/api/homee-api.js";
import {GVC} from "./glitterBundle/GVController.js";
import {Dialog} from "./homee/dialog/dialog-mobile.js";

export function appConfig(): {
    //HOMEE API backend route
    serverURL: string,
    //HOMEE API token
    token: string,
    //Upload image
    uploadImage: (photoFile: any, callback: (result: string) => void) => void,
    //Change to other page
    changePage: (gvc: GVC, tag: string, obj?: any, option?: any) => void
    //setHome
    setHome: (gvc: GVC, tag: string, obj?: any, option?: any) => void
    //translation
    translation: any
    //Get user data
    getUserData: ({callback}: { callback: (result: any) => void }) => void
    //Set user data
    setUserData: ({value, callback}: { value: any, callback: (result: any) => void }) => void,
    //getTopInset
    getTopInset: (callback: (inset: number) => void) => void
    //getBottomInset
    getBottomInset: (callback: (inset: number) => void) => void
} {
    return Plugin.getAppConfig("HOMEEAppConfig", {
        serverURL: "http://127.0.0.1:3080",
        token: "",
        uploadImage: (photoFile: any, callback: (result: string) => void) => {
            const glitter = (window as any).glitter
            const dialog=new Dialog()
            console.log(photoFile)
            dialog.dataLoading(true)
            $.ajax({
                url: Api.serverURL + '/api/v1/scene/getSignedUrl',
                type: 'post',
                data: JSON.stringify({file_name: `${new Date().getTime()}.` + photoFile.name.split('.').pop()}),
                contentType: 'application/json; charset=utf-8',
                headers: {Authorization: appConfig().token},
                success: (data1: { url: string; fullUrl: string }) => {
                    $.ajax({
                        url: data1.url,
                        type: 'put',
                        data: photoFile,
                        processData: false,
                        crossDomain: true,
                        success: (data2: any) => {
                            dialog.dataLoading(false)
                            dialog.showInfo("上傳成功")
                            callback(data1.fullUrl)
                        },
                        error: (err: any) => {
                            dialog.showInfo("上傳失敗")
                        },
                    });
                },
                error: (err: any) => {
                    dialog.dataLoading(false)
                    dialog.showInfo("上傳失敗")
                },
            });
        },
        changePage: (gvc: GVC, tag: string, obj?: any, option?: any) => {
            gvc.glitter.defaultSetting.pageAnimation = appConfig().translation
            const api = new Api()
            const dialog = new Dialog(gvc)
            // dialog.dataLoading(true)
            const saasConfig: {
                config: any;
                api: any;
            } = (window as any).saasConfig;
            saasConfig.api.getPage(saasConfig.config.appName).then((res: any) => {

                // gvc.glitter.htmlGenerate.setHome(
                //     {
                //         page_config: res.response.result[0].page_config,
                //         config: res.response.result[0].config,
                //         data: {},
                //         tag: gvc.glitter.getUrlParameter('page')
                //     }
                // );

                gvc.glitter.changePage(
                    'glitterBundle/plugins/html-render.js',
                    gvc.glitter.getUrlParameter('page'),
                    true,
                    {
                        page_config:{},
                        config: res.response.result.find((item:any)=>{if (item.tag==tag)return item}).config,
                        editMode: false,
                        data: obj,
                    },
                    obj.option ?? {}
                );

                // gvc.glitter.htmlGenerate.changePage(
                //     {
                //         config: res.response.result[0].config,
                //         data: obj,
                //         tag: tag,
                //         goBack: true,
                //         option: option
                //     }
                // )
            });




        },
        setHome: (gvc: GVC, tag: string, obj?: any, option?: any) => {
            const api = new Api()
            const dialog = new Dialog(gvc)
            dialog.dataLoading(true)
            const saasConfig: {
                config: any;
                api: any;
            } = (window as any).saasConfig;
            saasConfig.api.getPage(saasConfig.config.appName).then((data: any) => {
                dialog.dataLoading(false)
                console.log(data)
                gvc.glitter.htmlGenerate.setHome(
                        {
                            config: data.response.result[0].config,
                            data: obj,
                            tag: tag,
                            option: option
                        }
                    )
            });
            // api.homeeAJAX({
            //     api: Api.serverURL,
            //     route: '/api/v1/lowCode/pageConfig?query=config&tag=' + tag,
            //     method: 'get'
            // }, (res:any) => {
            //     dialog.dataLoading(false)
            //
            //     gvc.glitter.htmlGenerate.setHome(
            //         {
            //             config: res.result[0].config,
            //             data: obj,
            //             tag: tag,
            //             option: option
            //         }
            //     )
            //
            //
            // })
        },
        translation: (() => {
            const glitter = (window as any).glitter
            return glitter.animation.rightToLeft
        })(),
        getUserData: ({callback}: { callback: (result: any) => void }) => {
            const glitter = (window as any).glitter
            glitter.getPro("daiqdmoiwme21", (response: any) => {
                try {
                    const userData: any = JSON.parse(response.data)
                    userData.name=userData.name ?? userData.first_name+userData.last_name
                    userData.photo=userData.photo ?? `https://assets.imgix.net/~text?bg=7ED379&txtclr=ffffff&w=200&h=200&txtsize=90&txt=${userData.first_name}&txtfont=Helvetica&txtalign=middle,center`
                    callback(userData)
                } catch (e) {
                    callback({})
                }

            })
        },
        setUserData: ({value, callback}: { value: any, callback: (result: any) => void }) => {
            const glitter = (window as any).glitter
            // todo value.pwd cry
            glitter.setPro("daiqdmoiwme21", JSON.stringify(value), (response: any) => {
                callback(response)
            })
            glitter.runJsInterFace("storeUserData",value,(response:any)=>{})
        },
        getTopInset: (callback: (inset: number) => void) => {
            const glitter = (window as any).glitter
            glitter.runJsInterFace("getTopInset", {}, (response: any) => {
                callback(response.data)
            }, {
                webFunction: () => {
                    return {data: 0}
                }
            })
        },
        getBottomInset: (callback: (inset: number) => void) => {
            const glitter = (window as any).glitter
            glitter.runJsInterFace("getBottomInset", {}, (response: any) => {
                callback(response.data)
            }, {
                webFunction: () => {
                    return {data: 0}
                }
            })
        }

    })
}