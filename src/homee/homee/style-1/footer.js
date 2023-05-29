import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { Editor } from "../../../editor.js";
import { ScriptStyle1 } from "../../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            widget.data.dataList = widget.data.dataList ?? [
                {
                    title: "首頁",
                    icon: new URL('../../img/component/footer/home.svg', import.meta.url).href,
                    toPage: "",
                    click: () => {
                    }
                },
                {
                    title: "靈感",
                    icon: new URL('../../img/component/footer/idea.svg', import.meta.url).href,
                    toPage: "",
                    click: () => {
                    }
                },
                {
                    title: "我的空間",
                    icon: new URL('../../img/component/footer/myspace.svg', import.meta.url).href,
                    toPage: "",
                    click: () => {
                    }
                },
                {
                    title: "購物車",
                    icon: new URL('../../img/component/footer/shoopingCart.svg', import.meta.url).href,
                    toPage: "",
                    click: () => {
                    }
                },
                {
                    title: "會員",
                    icon: new URL('../../img/component/footer/user.svg', import.meta.url).href,
                    toPage: "",
                    click: () => {
                    }
                },
            ];
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    glitter.runJsInterFace("getBottomInset", {}, (response) => {
                        var _a;
                        if (((_a = widget.data) === null || _a === void 0 ? void 0 : _a.bottomInset) != response.data) {
                            widget.data.bottomInset = response.data;
                            try {
                                widget.refreshAll();
                            }
                            catch (e) {
                            }
                        }
                    }, {
                        webFunction: () => {
                            return { data: 20 };
                        }
                    });
                    gvc.addStyle(`
                        footer{
                            background:white;
                            box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.05);
                            padding-top:18px;
                        }
                        .footerTitle{
                            font-family: 'Noto Sans TC';
                            font-style: normal;
                            font-weight: 400;
                            font-size: 12px;
                            line-height: 17px;
                            text-align: center;
                            color: #1E1E1E;
                        }
                        .selected{
                            color:#FE5541;
                        }
                    `);
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                        <footer class="d-flex align-items-center justify-content-between     w-100" style="padding-bottom: ${widget.data.bottomInset - 10}px;position: fixed;bottom: 0px;left: 0px;z-index:2;">
                            ${(() => {
                                return gvc.map(widget.data.dataList.map((data, index) => {
                                    data.badge = data.badge ?? {};
                                    return `
                                <div class="d-flex flex-column align-items-center" style="width: 64px;" onclick="${gvc.event((e) => {
                                        TriggerEvent.trigger({
                                            gvc, widget, clickEvent: data
                                        });
                                    })}">
                                    <img src=${data.icon} style="width: 28px;height: 28px;">
                                    <div class="footerTitle" style="color:${data.color ?? `black`};">${data.title}</div>
                                   ${gvc.bindView(() => {
                                        let badge = 0;
                                        const id = gvc.glitter.getUUID();
                                        data.badge.callback = (count) => {
                                            badge = count;
                                            gvc.notifyDataChange(id);
                                        };
                                        return {
                                            bind: id,
                                            view: () => {
                                                if (badge === 0) {
                                                    return ``;
                                                }
                                                return `<div class=" d-flex align-items-center justify-content-center" style="position: absolute;
width: 16px;
height: 16px;

background: #FE5541;
border: 1px solid #FFFFFF;
font-size: 9px;

color: white;
border-radius: 8px;">${badge}</div>`;
                                            },
                                            divCreate: { class: `position-relative position-absolute` }
                                        };
                                    })}
                                    
                                </div>
                                `;
                                }));
                            })()}
                        </footer>
                    `;
                        },
                        divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    console.log("-------------------");
                    return Editor.arrayItem({
                        title: "列表項目",
                        gvc: gvc,
                        array: widget.data.dataList.map((dd, index) => {
                            dd.badge = dd.badge ?? {};
                            return {
                                title: dd.title ?? `選項.${index + 1}`,
                                innerHtml: () => {
                                    return gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `名稱`,
                                            default: dd.title,
                                            placeHolder: dd.title,
                                            callback: (text) => {
                                                widget.data.dataList[index].title = text;
                                                widget.refreshAll();
                                            }
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc,
                                            title: "字體顏色",
                                            default: dd.color ?? "black",
                                            placeHolder: "請輸入字體顏色",
                                            callback: (text) => {
                                                dd.color = text;
                                                widget.refreshComponent();
                                            }
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '圖片',
                                            def: dd.icon,
                                            callback: (text) => {
                                                dd.icon = text;
                                                widget.refreshComponent();
                                            }
                                        }),
                                        TriggerEvent.editer(gvc, widget, dd),
                                        TriggerEvent.editer(gvc, widget, dd.badge, { hover: false, option: ['cartBadge'], title: "數量提示" })
                                    ]);
                                },
                                expand: dd,
                                minus: gvc.event(() => {
                                    widget.data.dataList.splice(index, 1);
                                    widget.refreshComponent();
                                })
                            };
                        }),
                        originalArray: widget.data.dataList,
                        expand: widget.data,
                        plus: {
                            title: "新增按鈕",
                            event: gvc.event((e, event) => {
                            })
                        },
                        refreshComponent: () => {
                            widget.refreshComponent();
                        }
                    });
                }
            };
        },
    };
});
