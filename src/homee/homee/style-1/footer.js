import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
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
                    console.log(widget.data);
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                        <footer class="d-flex align-items-center justify-content-between     w-100" style="padding-bottom: ${widget.data.bottomInset - 10}px;position: fixed;bottom: 0px;left: 0px;">
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
                                        TriggerEvent.trigger({
                                            gvc, widget, clickEvent: data.badge
                                        });
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
