import { Editor } from "./editor.js";
export class TriggerEvent {
    static getUrlParameter(url, sParam) {
        try {
            let sPageURL = url.split("?")[1], sURLVariables = sPageURL.split('&'), sParameterName, i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? undefined : decodeURIComponent(sParameterName[1]);
                }
            }
            return undefined;
        }
        catch (e) {
            return undefined;
        }
    }
    static setEventRouter(original, relative) {
        const glitter = window.glitter;
        const url = new URL(relative, original);
        url.searchParams.set("original", original);
        return (gvc, widget, obj, subData, element) => {
            const editViewId = glitter.getUUID();
            glitter.share.componentData = glitter.share.componentData ?? {};
            let val = glitter.share.componentData[url.href];
            glitter.share.componentCallback = glitter.share.componentCallback ?? {};
            glitter.share.componentCallback[url.href] = glitter.share.componentCallback[url.href] ?? [];
            glitter.share.componentCallback[url.href].push((dd) => {
                glitter.share.componentData[url.href] = dd;
                gvc.notifyDataChange(editViewId);
            });
            gvc.glitter.addMtScript([
                {
                    src: url,
                    type: 'module'
                }
            ], () => {
                val = glitter.share.componentData[url.href];
                console.log('setComponent-->' + url);
            }, () => {
            });
            return {
                event: () => {
                    return new Promise(async (resolve, reject) => {
                        const event = await (new Promise((resolve, reject) => {
                            const timer = setInterval(() => {
                                if (val) {
                                    resolve(val);
                                    clearInterval(timer);
                                }
                            }, 20);
                            setTimeout(() => {
                                clearInterval(timer);
                                resolve(false);
                            }, 3000);
                        }));
                        if (event) {
                            resolve((await val.fun(gvc, widget, obj, subData, element).event()));
                        }
                        else {
                            resolve(false);
                        }
                    });
                },
                editor: () => {
                    return gvc.bindView(() => {
                        return {
                            bind: editViewId,
                            view: () => {
                                if (!val) {
                                    return ``;
                                }
                                else {
                                    return val.fun(gvc, widget, obj, subData, element).editor();
                                }
                            },
                            divCreate: {}
                        };
                    });
                }
            };
        };
    }
    static createSingleEvent(url, fun) {
        const glitter = window.glitter;
        const val = fun(glitter);
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
                console.log('error' + url);
            }
        }
        tryLoop();
        return val;
    }
    static create(url, event) {
        const glitter = window.glitter;
        glitter.share.clickEvent = glitter.share.clickEvent ?? {};
        glitter.share.clickEvent[url] = event;
    }
    static trigger(oj) {
        const glitter = window.glitter;
        let arrayEvent = [];
        let returnData = '';
        async function run(event) {
            console.log(`eventRun:${JSON.stringify(event)}`);
            return new Promise(async (resolve, reject) => {
                async function pass() {
                    try {
                        setTimeout(() => {
                            resolve(true);
                        }, 4000);
                        returnData = await oj.gvc.glitter.share.clickEvent[glitter.htmlGenerate.resourceHook(event.clickEvent.src)][event.clickEvent.route].fun(oj.gvc, oj.widget, event, oj.subData, oj.element).event();
                        resolve(true);
                    }
                    catch (e) {
                        resolve(false);
                    }
                }
                oj.gvc.glitter.share.clickEvent = oj.gvc.glitter.share.clickEvent ?? {};
                if (!oj.gvc.glitter.share.clickEvent[event.clickEvent.src]) {
                    await new Promise((resolve, reject) => {
                        oj.gvc.glitter.addMtScript([
                            { src: `${glitter.htmlGenerate.resourceHook(event.clickEvent.src)}`, type: 'module' }
                        ], () => {
                            pass();
                        }, () => {
                            resolve(false);
                        });
                    });
                }
                else {
                    pass();
                }
            });
        }
        if (oj.clickEvent !== undefined && Array.isArray(oj.clickEvent.clickEvent)) {
            arrayEvent = oj.clickEvent.clickEvent;
        }
        else if (oj.clickEvent !== undefined) {
            arrayEvent = [JSON.parse(JSON.stringify(oj.clickEvent))];
        }
        return new Promise(async (resolve, reject) => {
            let result = true;
            for (const a of arrayEvent) {
                result = await new Promise((resolve, reject) => {
                    let fal = 10;
                    function check() {
                        run(a).then((res) => {
                            if (res || (fal === 0)) {
                                resolve(res);
                            }
                            else {
                                setTimeout(() => {
                                    fal -= 1;
                                    check();
                                }, 100);
                            }
                        });
                    }
                    check();
                });
                if (!result) {
                    break;
                }
            }
            resolve(returnData);
        });
    }
    static editer(gvc, widget, obj, option = { hover: false, option: [] }) {
        return `
<div class="w-100">
<button class="btn btn-warning border-white mt-2 w-100 text-dark" onclick="${gvc.event(() => {
            const tag = gvc.glitter.getUUID();
            gvc.glitter.share.clickEvent = gvc.glitter.share.clickEvent ?? {};
            const glitter = gvc.glitter;
            let arrayEvent = [];
            if (obj.clickEvent !== undefined && Array.isArray(obj.clickEvent)) {
                arrayEvent = obj.clickEvent;
            }
            else if (obj.clickEvent !== undefined) {
                arrayEvent = [JSON.parse(JSON.stringify(obj))];
            }
            obj.clickEvent = arrayEvent;
            window.glitter.innerDialog((gvc) => {
                return gvc.bindView(() => {
                    const did = glitter.getUUID();
                    return {
                        bind: did,
                        view: () => {
                            return ` <div class="w-100 d-flex align-items-center border-bottom justify-content-center position-relative" style="height: 68px;">
        <h3 class="modal-title fs-4">事件叢集設定</h3>
        <i class="fa-solid fa-xmark text-dark position-absolute " style="font-size:20px;transform: translateY(-50%);right: 20px;top: 50%;cursor: pointer;"
        onclick="${gvc.event(() => {
                                glitter.closeDiaLog(tag);
                            })}"></i>
</div>    
<div class="mt-2 border border-white p-2">
${Editor.arrayItem({
                                originalArray: arrayEvent,
                                gvc: gvc,
                                title: '事件集',
                                array: arrayEvent.map((obj, index) => {
                                    return {
                                        title: `第${index + 1}個觸發事件`,
                                        expand: obj,
                                        innerHtml: () => {
                                            const selectID = glitter.getUUID();
                                            return gvc.bindView(() => {
                                                return {
                                                    bind: selectID,
                                                    view: () => {
                                                        var select = false;
                                                        return `<select class="form-select m-0 mt-2" onchange="${gvc.event((e) => {
                                                            if (e.value === 'undefined') {
                                                                obj.clickEvent = undefined;
                                                            }
                                                            else {
                                                                obj.clickEvent = JSON.parse(e.value);
                                                                obj.clickEvent.src = TriggerEvent.getUrlParameter(obj.clickEvent.src, 'resource') ?? obj.clickEvent.src;
                                                            }
                                                            gvc.notifyDataChange(selectID);
                                                        })}">
                        
                        ${gvc.map(Object.keys(glitter.share?.clickEvent || {}).filter((dd) => {
                                                            return TriggerEvent.getUrlParameter(dd, "resource") !== undefined;
                                                        }).map((key) => {
                                                            const value = glitter.share.clickEvent[key];
                                                            return gvc.map(Object.keys(value).map((v2) => {
                                                                if (option.option.length > 0) {
                                                                    if (option.option.indexOf(v2) === -1) {
                                                                        return ``;
                                                                    }
                                                                }
                                                                const value2 = value[v2];
                                                                const selected = JSON.stringify({
                                                                    src: TriggerEvent.getUrlParameter(key, 'resource') ?? obj.clickEvent.src,
                                                                    route: v2
                                                                }) === JSON.stringify(obj.clickEvent);
                                                                select = selected || select;
                                                                return `<option value='${JSON.stringify({
                                                                    src: key,
                                                                    route: v2
                                                                })}' ${(selected) ? `selected` : ``}>${value2.title}</option>`;
                                                            }));
                                                        }))}
<option value="undefined"  ${(!select) ? `selected` : ``}>未定義</option>
</select>
${gvc.bindView(() => {
                                                            const id = glitter.getUUID();
                                                            setTimeout(() => {
                                                                gvc.notifyDataChange(id);
                                                            }, 200);
                                                            return {
                                                                bind: id,
                                                                view: () => {
                                                                    try {
                                                                        if (!glitter.share.clickEvent[glitter.htmlGenerate.resourceHook(obj.clickEvent.src)]) {
                                                                            return ``;
                                                                        }
                                                                        return glitter.share.clickEvent[glitter.htmlGenerate.resourceHook(obj.clickEvent.src)][obj.clickEvent.route].fun(gvc, widget, obj).editor();
                                                                    }
                                                                    catch (e) {
                                                                        return ``;
                                                                    }
                                                                },
                                                                divCreate: {},
                                                                onCreate: () => {
                                                                    glitter.share.clickEvent = glitter.share.clickEvent ?? {};
                                                                    try {
                                                                        if (!glitter.share.clickEvent[glitter.htmlGenerate.resourceHook(obj.clickEvent.src)]) {
                                                                            -glitter.addMtScript([
                                                                                {
                                                                                    src: glitter.htmlGenerate.resourceHook(obj.clickEvent.src),
                                                                                    type: 'module'
                                                                                }
                                                                            ], () => {
                                                                                setTimeout(() => {
                                                                                    gvc.notifyDataChange(id);
                                                                                }, 200);
                                                                            }, () => {
                                                                                console.log(`loadingError:` + obj.clickEvent.src);
                                                                            });
                                                                        }
                                                                    }
                                                                    catch (e) {
                                                                    }
                                                                }
                                                            };
                                                        })}
`;
                                                    },
                                                    divCreate: {}
                                                };
                                            });
                                        },
                                        minus: gvc.event(() => {
                                            arrayEvent.splice(index, 1);
                                            gvc.notifyDataChange(did);
                                        }),
                                    };
                                }),
                                expand: { expand: true },
                                plus: {
                                    title: '添加區塊',
                                    event: gvc.event(() => {
                                        arrayEvent.push({});
                                        gvc.notifyDataChange(did);
                                    }),
                                },
                                refreshComponent: () => {
                                    gvc.recreateView();
                                }
                            })}
</div>
<div class="d-flex border-top py-2 px-2 justify-content-end">
<button class="btn btn-warning d-flex align-items-center text-dark" onclick="${gvc.event(() => {
                                glitter.closeDiaLog(tag);
                            })}"><i class="fa-solid fa-floppy-disk me-2"></i>儲存</button>
</div>
`;
                        },
                        divCreate: {
                            class: `m-auto bg-white shadow rounded overflow-auto`,
                            style: `max-width: 100%;max-height: calc(100% - 20px);width:700px;`
                        }
                    };
                });
            }, tag);
        })}">${option.title ?? "觸發事件"}</button>
</div>

`;
    }
}
