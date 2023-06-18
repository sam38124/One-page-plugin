export class Plugin {
    constructor() {
    }
    static create(url, fun) {
        const glitter = window.glitter;
        glitter.share.htmlExtension[url] = fun(glitter, window.parent.editerData !== undefined);
        return glitter.share.htmlExtension[url];
    }
    static createComponent(url, fun) {
        const glitter = window.glitter;
        const val = fun(glitter, window.parent.editerData !== undefined);
        let fal = 0;
        function tryLoop() {
            try {
                let delete2 = 0;
                glitter.share.componentCallback[url].map((dd, index) => {
                    dd(val);
                    delete2 = index;
                });
                glitter.share.componentCallback[url].splice(0, delete2);
            }
            catch (e) {
                if (fal < 10) {
                    setTimeout(() => {
                        tryLoop();
                    }, 100);
                }
                fal += 1;
                glitter.deBugMessage(`error` + url);
            }
        }
        tryLoop();
        return val;
    }
    static setComponent(original, url) {
        const glitter = window.glitter;
        url.searchParams.set("original", original);
        return (gvc, widget, setting, hoverID, subData, htmlGenerate) => {
            glitter.share.componentData = glitter.share.componentData ?? {};
            let val = glitter.share.componentData[url.href];
            function startSync(callback) {
                if (val) {
                    callback();
                    return;
                }
                glitter.share.componentCallback = glitter.share.componentCallback ?? {};
                glitter.share.componentCallback[url.href] = glitter.share.componentCallback[url.href] ?? [];
                glitter.share.componentCallback[url.href].push((dd) => {
                    val = glitter.share.componentData[url.href];
                    glitter.share.componentData[url.href] = dd;
                    callback();
                });
                gvc.glitter.addMtScript([
                    {
                        src: url,
                        type: 'module'
                    }
                ], () => {
                    glitter.deBugMessage('setComponent-->' + url);
                }, () => {
                });
            }
            return {
                view: () => {
                    return new Promise((resolve, reject) => {
                        startSync(() => {
                            const data = val.render(gvc, widget, setting, hoverID, subData).view();
                            if (typeof data === 'string') {
                                resolve(data);
                            }
                            else {
                                data.then((res) => {
                                    resolve(res);
                                });
                            }
                        });
                    });
                },
                editor: () => {
                    return new Promise((resolve, reject) => {
                        startSync(() => {
                            const data = val.render(gvc, widget, setting, hoverID, subData).editor();
                            if (typeof data === 'string') {
                                resolve(data);
                            }
                            else {
                                data.then((res) => {
                                    resolve(res);
                                });
                            }
                        });
                    });
                }
            };
        };
    }
    static async initial(gvc, set) {
        for (const a of set) {
            if (!gvc.glitter.share.htmlExtension[a.js]) {
                await new Promise((resolve, reject) => {
                    gvc.glitter.addMtScript([
                        { src: `${a.js}`, type: 'module' }
                    ], () => {
                        resolve(true);
                    }, () => {
                        resolve(false);
                    });
                });
            }
            if (a.type === 'container') {
                await Plugin.initial(gvc, a.data.setting);
            }
        }
        return true;
    }
    static initialConfig(name) {
        const glitter = window.glitter;
        glitter.lowCodeAPP = glitter.lowCodeAPP ?? {};
        glitter.lowCodeAPP[name] = glitter.lowCodeAPP[name] ?? {};
        glitter.lowCodeAPP[name].config = glitter.lowCodeAPP[name].config ?? {};
    }
    static getAppConfig(name, defaultData) {
        const glitter = window.glitter;
        Plugin.initialConfig(name);
        Object.keys(defaultData).map((dd) => {
            defaultData[dd] = glitter.lowCodeAPP[name].config[dd] ?? defaultData[dd];
        });
        return defaultData;
    }
    static setAppConfig(name, setData) {
        const glitter = window.glitter;
        Plugin.initialConfig(name);
        Object.keys(setData).map((dd) => {
            glitter.lowCodeAPP[name].config[dd] = setData[dd];
        });
    }
}
function getUrlParameter(url, sParam) {
    let sPageURL = url.split("?")[1], sURLVariables = sPageURL.split('&'), sParameterName, i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}
