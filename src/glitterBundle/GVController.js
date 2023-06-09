"use strict";
import { GVCType } from "./module/PageManager.js";
const $ = window.$;
class LifeCycle {
    onResume = function () {
    };
    onPause = function () {
    };
    onDestroy = function () {
    };
    onCreate = function () {
    };
    onCreateView = function () {
        return "";
    };
    cssInitial = function () {
        return '';
    };
    notifyDataChange() {
        $('body').html(this.onCreateView());
    }
    constructor() {
    }
}
export class GVC {
    glitter = window.glitter;
    parameter = {
        clickMap: {},
        pageConfig: undefined,
        bindViewList: {},
        clickID: 0,
        styleList: [],
        jsList: [],
        styleLinks: [],
    };
    closeDialog() {
        this.glitter.closeDiaLog(this.parameter.pageConfig?.tag);
    }
    getBundle() {
        this.parameter.pageConfig.obj = this.parameter.pageConfig.obj ?? {};
        return this.parameter.pageConfig?.obj;
    }
    notifyDataChange(id) {
        const gvc = this;
        try {
            gvc.initialElemCallback(gvc.id(id));
            const refresh = (id) => {
                if ($(`[gvc-id="${gvc.id(id)}"]`).length === 0) {
                    return;
                }
                gvc.parameter.bindViewList[id].divCreate = gvc.parameter.bindViewList[id].divCreate ?? {};
                const divCreate = (typeof gvc.parameter.bindViewList[id].divCreate === "function") ? gvc.parameter.bindViewList[id].divCreate() : gvc.parameter.bindViewList[id].divCreate;
                $(`[gvc-id="${gvc.id(id)}"]`).attr('class', divCreate.class ?? "");
                $(`[gvc-id="${gvc.id(id)}"]`).attr('style', divCreate.style ?? "");
                gvc.glitter.elementCallback[gvc.id(id)].updateAttribute();
                $(`[gvc-id="${gvc.id(id)}"]`).html(gvc.parameter.bindViewList[id].view());
                if (gvc.parameter.bindViewList[id].onCreate) {
                    gvc.parameter.bindViewList[id].onCreate();
                }
            };
            function convID() {
                if (typeof id === 'object') {
                    id.map(function (id) {
                        refresh(id);
                    });
                }
                else {
                    refresh(id);
                }
            }
            convID();
        }
        catch (e) {
            if (gvc.glitter.debugMode) {
                console.log(e);
                console.log(e.stack);
                console.log(e.line);
            }
        }
    }
    getBindViewElem(id) {
        const gvc = this;
        return $(`[gvc-id="${gvc.id(id)}"]`);
    }
    recreateView = () => {
    };
    addObserver(obj, callback, viewBind) {
        const gvc = this;
        try {
            if (obj.initial) {
                callback();
            }
            var map = obj.obj;
            if (!map.GlitterJsonStringConversionGetData) {
                var tMap = {};
                map.GlitterJsonStringConversionGetData = function () {
                    return tMap;
                };
            }
            if (!map.GlitterObServerCallBack) {
                var callba = [];
                map.GlitterObServerCallBack = function () {
                    return callba;
                };
            }
            if (viewBind) {
                if (map.GlitterObServerCallBack().filter(function (it) {
                    return it.viewBind === viewBind;
                }).length === 0) {
                    map.GlitterObServerCallBack().push({ key: obj.key, callback: callback, viewBind: viewBind });
                }
            }
            else {
                map.GlitterObServerCallBack().push({ key: obj.key, callback: callback });
            }
            var keys = Object.keys(map);
            for (var a = 0; a < keys.length; a++) {
                let keyVa = keys[a];
                if (keyVa !== 'GlitterJsonStringConversionGetData' && (keyVa !== 'GlitterObServerCallBack') && (keyVa === obj.key)) {
                    gvc.glitter.deBugMessage("add-" + obj.key);
                    if (!map.GlitterJsonStringConversionGetData()[keyVa]) {
                        map.GlitterJsonStringConversionGetData()[keyVa] = map[keyVa];
                    }
                    Object.defineProperty(map, keyVa, {
                        get: function () {
                            return map.GlitterJsonStringConversionGetData()[keyVa];
                        },
                        set(v) {
                            map.GlitterJsonStringConversionGetData()[keyVa] = v;
                            map.GlitterObServerCallBack().map(function (it) {
                                try {
                                    if (it.key === keyVa) {
                                        it.callback({ key: it.key, value: v });
                                    }
                                }
                                catch (e) {
                                    gvc.glitter.deBugMessage(e);
                                    gvc.glitter.deBugMessage(e.stack);
                                    gvc.glitter.deBugMessage(e.line);
                                }
                            });
                        }
                    });
                }
            }
            if (map[obj.key] === undefined) {
                map[obj.key] = '';
                Object.defineProperty(map, obj.key, {
                    get: function () {
                        return map.GlitterJsonStringConversionGetData()[obj.key];
                    },
                    set(v) {
                        map.GlitterJsonStringConversionGetData()[obj.key] = v;
                        map.GlitterObServerCallBack().map(function (it) {
                            try {
                                if (it.key === obj.key) {
                                    it.callback({ key: it.key, value: v });
                                }
                            }
                            catch (e) {
                                gvc.glitter.deBugMessage(e);
                                gvc.glitter.deBugMessage(e.stack);
                                gvc.glitter.deBugMessage(e.line);
                            }
                        });
                    }
                });
            }
        }
        catch (e) {
            gvc.glitter.deBugMessage(e);
            gvc.glitter.deBugMessage(e.stack);
            gvc.glitter.deBugMessage(e.line);
        }
    }
    initialElemCallback(id) {
        const gvc = this;
        gvc.glitter.elementCallback[id] = gvc.glitter.elementCallback[id] ?? {
            onCreate: () => {
            },
            onInitial: () => {
            },
            notifyDataChange: () => {
            },
            getView: () => {
            },
            updateAttribute: () => {
            }
        };
    }
    bindView(map) {
        const gvc = this;
        if (typeof map === "function") {
            map = map();
        }
        gvc.initialElemCallback(gvc.id(map.bind));
        if (map.dataList) {
            map.dataList.map(function (data) {
                $(`[gvc-id="${gvc.id(map.bind)}"]`).html(map.view());
                gvc.addObserver(data, function () {
                    $(`[gvc-id="${gvc.id(map.bind)}"]`).html(map.view());
                    if (map.onCreate()) {
                        map.onCreate();
                    }
                });
            });
        }
        gvc.parameter.bindViewList[map.bind] = map;
        gvc.glitter.elementCallback[gvc.id(map.bind)].onInitial = map.onInitial ?? (() => { });
        gvc.glitter.elementCallback[gvc.id(map.bind)].onCreate = map.onCreate ?? (() => { });
        gvc.glitter.elementCallback[gvc.id(map.bind)].getView = map.view;
        gvc.glitter.elementCallback[gvc.id(map.bind)].updateAttribute = (() => {
            const id = gvc.id(map.bind);
            const divCreate2 = (typeof map.divCreate === "function") ? map.divCreate() : map.divCreate;
            (divCreate2.option ?? []).map((dd) => {
                try {
                    $(`[gvc-id="${id}"]`).attr(dd.key, dd.value);
                }
                catch (e) {
                }
            });
        });
        const divCreate = ((typeof map.divCreate === "function") ? map.divCreate() : map.divCreate) ?? { elem: 'div' };
        return `<${divCreate.elem ?? 'div'}  class="${divCreate.class ?? ""}" style="${divCreate.style ?? ""}" 
 glem="bindView"  gvc-id="${gvc.id(map.bind)}"
 ${gvc.map((divCreate.option ?? []).map((dd) => {
            return ` ${dd.key}="${dd.value}"`;
        }))}
></${divCreate.elem ?? 'div'}>`;
    }
    event(fun, noCycle) {
        const gvc = this;
        if (noCycle === undefined) {
            gvc.parameter.clickID++;
            gvc.parameter.clickMap[`${gvc.parameter.clickID}`] = {
                fun: fun,
                noCycle: false
            };
            return `clickMap['${gvc.parameter.pageConfig.id}']['${gvc.parameter.clickID}'].fun(this,event);`;
        }
        else {
            gvc.parameter.clickMap[noCycle] = {
                fun: fun,
                noCycle: true
            };
            return `clickMap['${gvc.parameter.pageConfig.id}']['${noCycle}'].fun(this,event);`;
        }
    }
    addStyle(style) {
        const gvc = this;
        let sl = {
            id: gvc.glitter.getUUID(),
            style: style
        };
        if (!gvc.parameter.styleList.find((dd) => {
            return dd.style === style;
        })) {
            var css = document.createElement('style');
            css.type = 'text/css';
            css.id = sl.id;
            if (css.styleSheet)
                css.styleSheet.cssText = style;
            else
                css.appendChild(document.createTextNode(style));
            document.getElementsByTagName("head")[0].appendChild(css);
            gvc.parameter.styleList.push(sl);
        }
    }
    async addStyleLink(fs) {
        const gvc = this;
        function add(filePath) {
            var head = document.head;
            const id = gvc.glitter.getUUID();
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = filePath;
            link.id = id;
            if (!gvc.parameter.styleLinks.find((dd) => {
                return dd.src === filePath;
            })) {
                gvc.parameter.styleLinks.push({
                    id: id,
                    src: filePath
                });
                head.appendChild(link);
            }
        }
        if (typeof fs === 'string') {
            add(fs);
        }
        else {
            fs.map((dd) => {
                add(dd);
            });
        }
    }
    addMtScript(urlArray, success, error) {
        const glitter = this.glitter;
        const that = this;
        let index = 0;
        function addScript() {
            if (index === urlArray.length) {
                success();
                return;
            }
            var scritem = urlArray[index];
            scritem.id = glitter.getUUID();
            if (that.parameter.jsList.find((dd) => {
                return dd.src === scritem.src;
            })) {
                index++;
                addScript();
                return;
            }
            that.parameter.jsList.push(scritem);
            let script = document.createElement('script');
            try {
                if (script.readyState) {
                    script.onreadystatechange = () => {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            index++;
                            addScript();
                        }
                    };
                }
                else {
                    script.onload = () => {
                        if (success !== undefined) {
                            index++;
                            addScript();
                        }
                    };
                }
                if (scritem.type === 'text/babel') {
                    glitter.$('body').append(`<script type="text/babel" src="${scritem.src}"></script>`);
                }
                else if (scritem.type !== undefined) {
                    script.setAttribute('type', scritem.type);
                    script.setAttribute('src', scritem.src ?? scritem);
                    script.setAttribute('id', scritem.id ?? undefined);
                    document.getElementsByTagName("head")[0].appendChild(script);
                }
                else {
                    script.setAttribute('src', scritem.src ?? scritem);
                    script.setAttribute('id', scritem.id ?? undefined);
                    document.getElementsByTagName("head")[0].appendChild(script);
                }
            }
            catch (e) {
                error(`Add ${urlArray[index]} ERROR!!`);
            }
        }
        addScript();
    }
    id(id) {
        const gvc = this;
        return `${gvc.parameter.pageConfig.id}${id}`;
    }
    map(array) {
        let html = '';
        array.map((d) => {
            html += d;
        });
        return html;
    }
}
export function init(fun, gt) {
    const glitter = (gt) ?? window.glitter;
    const gvc = new GVC();
    gvc.glitter = glitter;
    gvc.parameter.pageConfig = glitter.nowPageConfig;
    const pageData = fun(gvc, glitter, glitter.nowPageConfig?.obj);
    if (!glitter.modelJsList.find((data) => {
        return data.src === glitter.nowPageConfig?.src;
    })) {
        glitter.modelJsList.push({
            src: glitter.nowPageConfig.src,
            create: (glitter) => {
                init(fun, window.glitter);
            }
        });
    }
    const lifeCycle = new LifeCycle();
    lifeCycle.onResume = pageData.onResume ?? lifeCycle.onResume;
    lifeCycle.onPause = pageData.onPause ?? lifeCycle.onPause;
    lifeCycle.onDestroy = pageData.onDestroy ?? lifeCycle.onDestroy;
    lifeCycle.onCreate = pageData.onCreate ?? lifeCycle.onCreate;
    lifeCycle.onCreateView = pageData.onCreateView;
    lifeCycle.cssInitial = pageData.cssInitial ?? lifeCycle.cssInitial;
    gvc.recreateView = () => {
        $(`#page${gvc.parameter.pageConfig.id}`).html(lifeCycle.onCreateView());
    };
    if ($('.page-loading').length > 0) {
        $('.page-loading').remove();
    }
    window.clickMap = window.clickMap ?? {};
    switch (gvc.parameter.pageConfig?.type) {
        case GVCType.Dialog:
            $('#page' + gvc.parameter.pageConfig.id).html(lifeCycle.onCreateView());
            glitter.setAnimation(gvc.parameter.pageConfig);
            break;
        case GVCType.Page:
            $('#page' + gvc.parameter.pageConfig.id).html(lifeCycle.onCreateView());
            glitter.setAnimation(gvc.parameter.pageConfig);
            break;
    }
    window.clickMap[gvc.parameter.pageConfig.id] = gvc.parameter.clickMap;
    lifeCycle.onCreate();
    gvc.parameter.pageConfig.deleteResource = (destroy) => {
        window.clickMap[gvc.parameter.pageConfig.id] = undefined;
        lifeCycle.onPause();
        gvc.parameter.styleLinks.map((dd) => {
            $(`#${dd.id}`).remove();
        });
        gvc.parameter.styleList.map((dd) => {
            $(`#${dd.id}`).remove();
        });
        gvc.parameter.jsList.map((dd) => {
            $(`#${dd.id}`).remove();
        });
        if (destroy) {
            lifeCycle.onDestroy();
        }
    };
}
