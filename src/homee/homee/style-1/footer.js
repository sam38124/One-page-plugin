import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../../glitterBundle/plugins/trigger-event.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { appConfig } from "../../../config.js";
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
                    return `
` + gvc.map(widget.data.dataList.map((dd, index) => {
                        dd.badge = dd.badge ?? {};
                        return `<div class="alert alert-dark mt-2">
<h3 style="color: white;font-size: 17px;color: orangered;">
<i class="fa-regular fa-circle-minus text-danger me-2" style="font-size: 20px;cursor: pointer;" onclick="${gvc.event(() => {
                            widget.data.dataList.splice(index, 1);
                            widget.refreshComponent();
                        })}"></i>
選項.${index + 1}</h3>
${glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `名稱`,
                            default: dd.title,
                            placeHolder: dd.title,
                            callback: (text) => {
                                widget.data.dataList[index].title = text;
                                widget.refreshAll();
                            }
                        }) +
                            `
 ${glitter.htmlGenerate.editeInput({
                                gvc,
                                title: "字體顏色",
                                default: dd.color ?? "black",
                                placeHolder: "請輸入字體顏色",
                                callback: (text) => {
                                    dd.color = text;
                                    widget.refreshComponent();
                                }
                            })}
                                <h3 style="color: white;font-size: 16px;margin-bottom: 10px;" class="mt-2">圖片</h3>
                                <div class="mt-2"></div>
                                <div class="d-flex align-items-center mb-3">
                                    <input class="flex-fill form-control " placeholder="請輸入圖片連結" value="${widget.data.dataList[index].icon}">
                                    <div class="" style="width: 1px;height: 25px;background-color: white;"></div>
                                    <i class="fa-regular fa-upload text-white ms-2" style="cursor: pointer;" onclick="${gvc.event(() => {
                                glitter.ut.chooseMediaCallback({
                                    single: true,
                                    accept: 'image/*',
                                    callback(data) {
                                        appConfig().uploadImage(data[0].file, (link) => {
                                            widget.data.dataList[index].icon = link;
                                            widget.refreshAll();
                                        });
                                    }
                                });
                            })}"></i>
                                </div>
                            `
                            + TriggerEvent.editer(gvc, widget, dd)
                            + TriggerEvent.editer(gvc, widget, dd.badge, { hover: false, option: ['cartBadge'], title: "數量提示" })}
</div>`;
                    })) + `<div class="text-white align-items-center justify-content-center d-flex p-1 rounded mt-3" style="border: 2px dashed white;" onclick="${gvc.event(() => {
                        widget.data.dataList.push({
                            title: "標題",
                            icon: new URL('../../img/component/footer/home.svg', import.meta.url).href
                        });
                        widget.refreshComponent();
                    })}">添加按鈕</div>`;
                }
            };
        },
    };
});
