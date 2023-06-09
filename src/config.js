import { Plugin } from "./glitterBundle/plugins/plugin-creater.js";
import { Api } from "./homee/homee/api/homee-api.js";
import { Dialog } from "./homee/dialog/dialog-mobile.js";
export function appConfig() {
    return Plugin.getAppConfig("HOMEEAppConfig", {
        serverURL: "http://127.0.0.1:3080",
        token: "",
        uploadImage: (photoFile, callback) => {
            const glitter = window.glitter;
            const dialog = new Dialog();
            console.log(photoFile);
            dialog.dataLoading(true);
            $.ajax({
                url: Api.serverURL + '/api/v1/scene/getSignedUrl',
                type: 'post',
                data: JSON.stringify({ file_name: `${new Date().getTime()}.` + photoFile.name.split('.').pop() }),
                contentType: 'application/json; charset=utf-8',
                headers: { Authorization: appConfig().token },
                success: (data1) => {
                    $.ajax({
                        url: data1.url,
                        type: 'put',
                        data: photoFile,
                        processData: false,
                        crossDomain: true,
                        success: (data2) => {
                            dialog.dataLoading(false);
                            dialog.showInfo("上傳成功");
                            callback(data1.fullUrl);
                        },
                        error: (err) => {
                            dialog.showInfo("上傳失敗");
                        },
                    });
                },
                error: (err) => {
                    dialog.dataLoading(false);
                    dialog.showInfo("上傳失敗");
                },
            });
        },
        changePage: (gvc, tag, obj, option) => {
            gvc.glitter.defaultSetting.pageAnimation = appConfig().translation;
            const api = new Api();
            const dialog = new Dialog(gvc);
            const saasConfig = window.saasConfig;
            saasConfig.api.getPage(saasConfig.config.appName).then((res) => {
                gvc.glitter.changePage('glitterBundle/plugins/html-render.js', gvc.glitter.getUrlParameter('page'), true, {
                    page_config: {},
                    config: res.response.result.find((item) => { if (item.tag == tag)
                        return item; }).config,
                    editMode: false,
                    data: obj,
                }, obj.option ?? {});
            });
        },
        setHome: (gvc, tag, obj, option) => {
            const api = new Api();
            const dialog = new Dialog(gvc);
            dialog.dataLoading(true);
            const saasConfig = window.saasConfig;
            saasConfig.api.getPage(saasConfig.config.appName).then((data) => {
                dialog.dataLoading(false);
                console.log(data);
                gvc.glitter.htmlGenerate.setHome({
                    config: data.response.result[0].config,
                    data: obj,
                    tag: tag,
                    option: option
                });
            });
        },
        translation: (() => {
            const glitter = window.glitter;
            return glitter.animation.rightToLeft;
        })(),
        getUserData: ({ callback }) => {
            const glitter = window.glitter;
            console.log(glitter.share.userToken);
            var settings = {
                "url": "https://api.stg.homee.ai/users/users/images/presigned_url",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "X-Client-Id": "1",
                    "Authorization": glitter.share.userToken
                },
            };
            $.ajax(settings).done(function (response) {
                const userData = response;
                callback(userData);
            });
        },
        setUserData: ({ value, callback }) => {
            const glitter = window.glitter;
            glitter.setPro("daiqdmoiwme21", JSON.stringify(value), (response) => {
                callback(response);
            });
            glitter.runJsInterFace("storeUserData", value, (response) => { });
        },
        getTopInset: (callback) => {
            const glitter = window.glitter;
            glitter.runJsInterFace("getTopInset", {}, (response) => {
                callback(response.data);
            }, {
                webFunction: () => {
                    return { data: 0 };
                }
            });
        },
        getBottomInset: (callback) => {
            const glitter = window.glitter;
            glitter.runJsInterFace("getBottomInset", {}, (response) => {
                callback(response.data);
            }, {
                webFunction: () => {
                    return { data: 0 };
                }
            });
        }
    });
}
