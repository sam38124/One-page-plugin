import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ScriptStyle1} from "../script-style-1.js";
import {Editor} from "../../editor.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
import {component} from "../../official/component.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.title = widget.data.title ?? "Glitter星澄基地"
            widget.data.image = widget.data.image ?? "https://cdn.shopify.com/s/files/1/0704/0158/9548/files/logo_79b2fa6d-96db-4dad-8ddc-8d2b21ad1d68_32x32.png?v=1673697392"
            widget.data.expand = widget.data.expand ?? {}
            widget.data.formList = widget.data.formList ?? [
                {
                    type: 'label',
                    name: '會員管理'
                }, {
                    type: 'button',
                    value: {
                        name: '訂單管理',
                        icon: 'fa-light fa-list',
                        click:()=>{}
                    }
                },
                {
                    type: 'buttonList',
                    value: {
                        name: '金流設定',
                        icon: 'fa-light fa-coin',
                        click:()=>{}
                    },
                    list: [
                        {
                            type: 'button',
                            value: {
                                name: '藍新金流',
                                icon: 'fa-light fa-list',
                                click:()=>{}
                            }

                        }, {
                            type: 'button',
                            value: {
                                name: '綠界金流',
                                icon: 'fa-light fa-list',
                                click:()=>{}
                            }

                        }
                    ]

                }
            ]
            let formList = widget.data.formList
            widget.data.expandS=widget.data.expandS??{}
            glitter.share.backendInfo=glitter.share.backendInfo??{}
            widget.data.navagationBtn=widget.data.navagationBtn??[]
            widget.data.navagationExp=widget.data.navagationExp??{}
            const userData=glitter.share.backendInfo ?? {}
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget)
                    const id=glitter.getUUID()
                    return gvc.bindView(()=>{
                        return {
                            bind:id,
                            view:()=>{
                                return `<div
                            class="wrapper"
                            ${glitter.ut.frSize({lg: ''}, 'style="margin: 0% 2%; max-width: 100% "')}
                        >
                            <div class="leftside-menu">
                                <a
                                    class="logo text-center logo-light border-bottom border-end "
                                    style="cursor:pointer;"
                                    onclick="${gvc.event(() => {
                                })}"
                                >
                                    <span class="logo-lg text-white font-20 m-auto ">
                                    <div class="w-100 d-flex align-items-center justify-content-center">
                                     <img
                                            src="${widget.data.image}"
                                            width="40"
                                            alt="Glitter"
                                            class="img-fluid rounded-circle me-2"
                                        />
                                        ${widget.data.title}
</div>
                                    </span>
                                    <span class="logo-sm m-auto  ">
                                        <img
                                            src="${widget.data.image}"
                                            width="42"
                                            alt="Glitter"
                                            class="img-fluid rounded-circle me-1"
                                        />
                                    </span>
                                </a>
                                <div class="h-100" id="leftside-menu-container" data-simplebar>
                                    <ul class="side-nav">
                                        ${menuFactory(gvc, formList)}
                                    </ul>
                                </div>
                            </div>

                            <div class="content-page left-0px">
                                <div class="content">
                                    <div class="navbar-custom ${glitter.ut.frSize({sm: ''}, 'position-fixed m-0')}">
                                        <span
                                            class="logo-lg text-white d-flex align-items-center justify-content-center d-sm-none position-absolute font-18 ms-2"
                                            style="height: 70px;left:50px;"
                                        >
                                            <img
                                                src="${widget.data.image}"
                                                width="36"
                                                alt="Glitter"
                                                class="img-fluid rounded-circle me-1"
                                            />
                                            HOMEE 後台系統
                                        </span>
                                        <ul class="list-unstyled topbar-menu float-end mb-0 ">
                                            <li class="dropdown notification-list">
                                                <div
                                                    class="nav-link dropdown-toggle nav-user arrow-none me-0"
                                                    onclick="${gvc.event((e, event)=>{
                                                        $('.dropdown .dropdown-menu').toggleClass('show')
                                })}"
                                                >
                                                    <span class="account-user-avatar">
                                                        <img
                                                            src="https://assets.imgix.net/~text?bg=5499C7&txtclr=ffffff&w=200&h=200&txtsize=100&txt=${glitter.share.backendInfo.name ?? ""}&txtfont=Helvetica&txtalign=middle,center"
                                                            alt="user-image"
                                                            class="img-fluid rounded-circle"
                                                        />
                                                    </span>
                                                    <span>
                                                        <span class="account-user-name">${glitter.share.backendInfo.name ?? ""}</span>
                                                        <span class="account-position">${glitter.share.backendInfo.role ?? ""}</span>
                                                    </span>
                                                </div>
                                                <div
                                                    class="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown"
                                                >
                                      ${widget.data.navagationBtn.map((dd:any)=>{
                                    return `  <a
                                                        style="cursor:pointer"
                                                        onclick="${gvc.event(() => {
                                        TriggerEvent.trigger({
                                            gvc, widget, clickEvent: dd
                                        })
                                    })}"
                                                        class="dropdown-item notify-item"
                                                    >
                                                        <i class="${dd.icon} me-1"></i>
                                                        <span>${dd.title}</span>
                                                    </a>`
                                }).join('')}
                                                 
                                                </div>
                                            </li>
                                        </ul>

                                        <button class="button-menu-mobile open-left">
                                            <i class="mdi mdi-menu"></i>
                                        </button>
                                    </div>
                                    <div class="container-fluid m-0 m-sm-2 p-0 p-sm-2" id="container-fluid"></div>
                                </div>
                            </div>
                        </div>`;
                            },
                            onCreate:()=>{
                                gvc.addMtScript(
                                    [{ src: ScriptStyle1.getRout('assets/js/vendor.min.js') }, { src: ScriptStyle1.getRout('assets/js/app.min.js') }],
                                    () => {},
                                    () => {}
                                );
                            },
                            divCreate:{}
                        }
                    })
                },
                editor: () => {
                    return new Promise((resolve, reject)=>{

                        function recursive(data:any,first?:boolean){
                            return  Editor.arrayItem({
                                originalArray:data,
                                gvc: gvc,
                                title: '列表內容',
                                array: data.map((dd: any, index: number) => {
                                    return {
                                        title: ((dd.type === 'label') && dd.name) || (dd.value &&  dd.value.name) || `區塊:${index + 1}`,
                                        expand: dd,
                                        innerHtml: ()=>{
                                            return gvc.bindView(()=>{
                                                const id=glitter.getUUID()
                                                return {
                                                    bind:id,
                                                    view: ()=>{
                                                        return Editor.select({
                                                            title:"類型",
                                                            gvc:gvc,
                                                            def:dd.type,
                                                            array:[
                                                                {title:"標題",value:"label"},
                                                                {title:"按鈕",value:"button"},
                                                                {title:"按鈕列表",value:"buttonList"}
                                                            ],
                                                            callback:(text)=>{
                                                                dd.type=text
                                                              widget.refreshComponent()
                                                            }
                                                        })+(()=>{
                                                            switch (dd.type){
                                                                case 'label':
                                                                    return  glitter.htmlGenerate.editeInput({
                                                                        gvc: gvc,
                                                                        title: `標題名稱`,
                                                                        default: dd.name,
                                                                        placeHolder: "請輸入標題名稱",
                                                                        callback: (text) => {
                                                                            dd.name = text
                                                                            widget.refreshComponent()
                                                                        }
                                                                    })
                                                                case 'button':
                                                                    dd.page=dd.page??{
                                                                        data:{}
                                                                    }
                                                                    dd.page.refreshComponent=()=>{
                                                                    gvc.notifyDataChange(id)
                                                                }
                                                                    return gvc.map([
                                                                        glitter.htmlGenerate.editeInput({
                                                                            gvc: gvc,
                                                                            title: `標題名稱`,
                                                                            default: dd.value.name,
                                                                            placeHolder: "請輸入標題名稱",
                                                                            callback: (text) => {
                                                                                dd.value.name = text
                                                                                widget.refreshComponent()
                                                                            }
                                                                        }),
                                                                        `<div class="w-100">${component.render(gvc,dd.page as any,setting,hoverID).editor() as string}</div>`
                                                                    ])
                                                                case 'buttonList':
                                                                    dd.list=dd.list??[]
                                                                    return    glitter.htmlGenerate.editeInput({
                                                                        gvc: gvc,
                                                                        title: `標題名稱`,
                                                                        default: dd.value.name,
                                                                        placeHolder: "請輸入標題名稱",
                                                                        callback: (text) => {
                                                                            dd.value.name = text
                                                                            widget.refreshComponent()
                                                                        }
                                                                    })+( (first) ? Editor.fontawesome({
                                                                        title:'icon',
                                                                        gvc:gvc,
                                                                        def:dd.value.icon ?? "",
                                                                        callback:(text)=>{
                                                                            dd.value.icon=text
                                                                            widget.refreshComponent()
                                                                        }
                                                                    }):``)+recursive(dd.list)
                                                                default:
                                                                    return;
                                                            }
                                                        })()
                                                    },
                                                    divCreate:{}
                                                }
                                            })
                                        },
                                        minus: gvc.event(() => {
                                            data.splice(index, 1);
                                            widget.refreshComponent();
                                        }),
                                    };
                                }),
                                expand: widget.data,
                                plus: {
                                    title: '添加區塊',
                                    event: gvc.event(() => {
                                        data.push( {
                                            type: 'label',
                                            name: '會員管理',
                                            value:{
                                                name: '訂單管理',
                                                icon: 'fa-light fa-list',
                                            }
                                        });
                                        widget.refreshComponent();
                                    }),
                                },
                                refreshComponent:()=>{
                                    widget.refreshComponent()
                                }
                            })
                        }
                        resolve(gvc.map([
                            `<div class="mt-2"></div>`,
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: "設計區塊",
                                data: widget.data.expandS,
                                innerText: ()=>{
                                    return gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: widget.data.title,
                                            placeHolder: "輸入標題名稱",
                                            callback: (text) => {
                                                widget.data.title = text
                                                widget.refreshComponent()
                                            }
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: `ICON`,
                                            def: widget.data.image,
                                            callback: (dd) => {
                                                widget.data.image = dd;
                                                widget.refreshComponent();
                                            },
                                        })
                                    ])
                                }
                            }),
                            Editor.arrayItem({
                                originalArray:widget.data.navagationBtn,
                                gvc: gvc,
                                title: '導覽列內容',
                                array: widget.data.navagationBtn.map((dd: any, index: number) => {
                                    return {
                                        title: dd.title || `區塊:${index + 1}`,
                                        expand: dd,
                                        innerHtml: (()=>{
                                            return gvc.map([
                                                Editor.fontawesome({
                                                    title: 'icon',
                                                    gvc: gvc,
                                                    def: dd.icon,
                                                    callback: (text: string) => {
                                                        dd.icon = text;
                                                        widget.refreshComponent()
                                                    },
                                                }),
                                                glitter.htmlGenerate.editeInput({
                                                    gvc: gvc,
                                                    title: '導覽標題',
                                                    default: dd.title,
                                                    placeHolder: '請輸入導覽標題',
                                                    callback: (text: string) => {
                                                        dd.title=(text);
                                                        widget.refreshComponent()
                                                    },
                                                }),
                                                ClickEvent.editer(gvc, widget, dd, {
                                                    hover: false,
                                                    option: [],
                                                    title: "點擊事件"
                                                })
                                            ])
                                        }),
                                        minus: gvc.event(() => {
                                            widget.data.navagationBtn.splice(index, 1);
                                            widget.refreshComponent();
                                        }),
                                    };
                                }),
                                expand: widget.data.navagationExp,
                                plus: {
                                    title: '添加區塊',
                                    event: gvc.event(() => {
                                        widget.data.navagationBtn.push({});
                                        widget.refreshComponent();
                                    }),
                                },
                                refreshComponent:()=>{
                                    widget.refreshComponent()
                                }
                            }),
                            recursive(widget.data.formList,true)
                        ]));
                    })
                },
            };
        },
    }
})

function menuFactory(gvc: GVC, obj: any, icon?: boolean) {

    var html = '';
    obj.map((d2: any,index:number) => {
        switch (d2.type) {
            case 'label':
                html += /*html*/ `<li class="side-nav-title side-nav-item fs-5 fw-light font-15" style="">${d2.name}</li>`;
                break;
            case 'button':
                if (icon) {
                    const id=gvc.glitter.getUUID()
                    if(d2.value.name === (window as any).glitter.getUrlParameter('select') ){
                        setTimeout(()=>{
                          $('#'+id).click()
                        },500)
                    }
                    html += /*html*/ `
                                <li>
                                    <a id="${id}"
                                        onclick="${gvc.event((e)=>{
                        $('#container-fluid').html(component.render(gvc,d2.page as any,{} as any,[]).view() as string)
                        $('.active').removeClass('active');
                        $(e).addClass('active');
                        $('.menuitem-active').removeClass('menuitem-active');
                        $(e).parent().addClass('menuitem-active');
                        $('.sidebar-enable').removeClass('sidebar-enable hide-menu');
                        (window as any).glitter.setUrlParameter('select',d2.value.name);
                    })}"
                                        style="cursor:pointer; font-size:15px"
                                        >${d2.value.name}</a
                                    >
                                </li>
                            `;
                } else {
                    const id=gvc.glitter.getUUID()
                    if(d2.value.name === (window as any).glitter.getUrlParameter('select') ){
                        setTimeout(()=>{
                            $('#'+id).click()
                        },500)
                    }
                    html += /*html*/ `
                                <li class="side-nav-item">
                                    <a
                                        class="side-nav-link font-15" id="${id}"
                                        onclick="${gvc.event((e) => {
                        $('#container-fluid').html(component.render(gvc,d2.page as any,{} as any,[]).view() as string)
                        $('.active').removeClass('active');
                        $('.menuitem-active').removeClass('menuitem-active');
                        $('.sidebar-enable').removeClass('sidebar-enable hide-menu');
                        $(e).parent().addClass('menuitem-active');
                        (window as any).glitter.setUrlParameter('select',d2.value.name);
                    })}"
                                    >
                                        <i class="${d2.value.icon}"></i>
                                        <span> ${d2.value.name} </span>
                                    </a>
                                </li>
                            `;
                }
                break;
            case 'buttonList':
                var n = gvc.glitter.getUUID();
                var innerHtml = /*html*/ `
                            <li class="side-nav-item">
                                <a
                                    data-bs-toggle="collapse"
                                    aria-expanded="false"
                                    class="side-nav-link font-15${d2.class ? ` ${d2.class}` : ``}"
                                    onclick="${gvc.event(()=>{
                                        $(`#sidebar${n}`).toggleClass('show')
                })}"
                                >
                                    ${icon ? `` : `<i class="me-1 ${d2.value.icon}"></i>`}
                                    <span> ${d2.value.name} </span>
                                    <span class="menu-arrow"></span>
                                </a>
                                <div class="collapse" id="sidebar${n}">
                                    <ul class="side-nav-second-level ps-2">
                                        ${menuFactory(gvc,d2.list, true)}
                                    </ul>
                                </div>
                            </li>
                        `;
                html += /*html*/ `<div>${innerHtml}</div>`;
                break;
        }
    });
    return html;
}