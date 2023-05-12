import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {

            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    widget.data.title = widget.data.title??"萊恩設計"
                    widget.data.logo = widget.data.logo??ScriptStyle1.getRout("../glitterBundle/img/logo.svg")
                    widget.data.bar = widget.data.bar??[
                        {
                            title: "HOME",
                            click:{}
                        },
                        {
                            title: "ABOUT",
                            click:{}
                        },
                        {
                            title: "GALLERY",
                            click:{},
                            list:[
                                {
                                    title:"Nature",
                                    click:{},
                                },
                                {
                                    title:"People",
                                    click:{},
                                },
                                {
                                    title:"Architecture",
                                    click:{},
                                },
                                {
                                    title:"Animals",
                                    click:{},
                                },
                                {
                                    title:"Sports",
                                    click:{},
                                },
                                {
                                    title:"Travel",
                                    click:{},
                                },
                                {
                                    title:"Sub Menu",
                                    click:{},
                                },
                            ]
                        },
                        {
                            title: "SERVICES",
                            click:{}
                        },
                        {
                            title: "CONTACT",
                            click:{}
                        },
                    ]

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            const nav = {
                                title: widget.data.title,
                                logo: widget.data.logo,
                                bar: widget.data.bar
                            }

                            return `
                            <header class="header navbar navbar-expand-lg position-absolute navbar-sticky">
        <div class="container px-3">
          <a href="" class="navbar-brand pe-3">
            <img src="${widget.data.logo}" width="47" alt="Silicon">
                ${widget.data.title}
          </a>
          <div id="navbarNav" class="offcanvas offcanvas-end">
            <div class="offcanvas-body">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              ${(()=>{
                  let temp = ``
                  nav.bar.map((barData:any)=>{
                    temp += ScriptStyle1.recursive(barData , true);
                  })
                  return temp;              
              })()}
                
              
              </ul>
            </div>                  
          </div>                         
        </div>
      </header>
                            `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    widget.data.barExpand = widget.data.barExpand??{}

                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `標題`,
                            default: widget.data.title,
                            placeHolder: '輸入標題名稱',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '預覽圖片1',
                            def:widget.data.logo,
                            callback:(data)=>{
                                widget.data.logo = data
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.bar,
                            gvc: gvc,
                            title: '連結區塊',
                            array: widget.data.bar.map((dd: any, index: number) => {
                                return {
                                    title: dd.title??`區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.title,
                                            placeHolder: '輸入標題文字',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.select({
                                            title: `白色凸顯`,
                                            gvc: gvc,
                                            def: dd.highlight ?? "false",
                                            array: [
                                                {
                                                    title: '是',
                                                    value: `true`,
                                                },
                                                {
                                                    title: '否',
                                                    value: `false`,
                                                },
                                            ],
                                            callback: (text) => {
                                                dd.highlight = text
                                                widget.refreshComponent();
                                            },
                                        }),
                                        TriggerEvent.editer(gvc, widget, dd.click, {
                                            hover: true,
                                            option: [],
                                            title: "點擊事件"
                                        }),
                                        `${(()=>{
                                            if (dd?.list){
                                                dd.listExpand = dd.listExpand??{};
                                                return Editor.arrayItem({
                                                    originalArray:dd.list,
                                                    gvc: gvc,
                                                    title: '連結分區塊',
                                                    array: dd.list.map((dd: any, index: number) => {
                                                        return {
                                                            title: dd.title??`區塊:${index + 1}`,
                                                            expand: dd,
                                                            innerHtml: gvc.map([
                                                                glitter.htmlGenerate.editeInput({
                                                                    gvc: gvc,
                                                                    title: `標題`,
                                                                    default: dd.title,
                                                                    placeHolder: '輸入標題文字',
                                                                    callback: (text) => {
                                                                        dd.title = text;
                                                                        widget.refreshComponent();
                                                                    },
                                                                }),
                                                                TriggerEvent.editer(gvc, widget, dd.click, {
                                                                    hover: true,
                                                                    option: [],
                                                                    title: "點擊事件"
                                                                }),
                                                                `${(()=>{
                                                                    if (dd?.list){
                                                                        dd.listExpand = dd.listExpand??{};
                                                                        return Editor.arrayItem({
                                                                            originalArray:dd.list,
                                                                            gvc: gvc,
                                                                            title: '連結子區塊',
                                                                            array: dd.list.map((dd: any, index: number) => {
                                                                                return {
                                                                                    title: dd.title??`區塊:${index + 1}`,
                                                                                    expand: dd,
                                                                                    innerHtml: gvc.map([
                                                                                        glitter.htmlGenerate.editeInput({
                                                                                            gvc: gvc,
                                                                                            title: `標題`,
                                                                                            default: dd.title,
                                                                                            placeHolder: '輸入標題文字',
                                                                                            callback: (text) => {
                                                                                                dd.title = text;
                                                                                                widget.refreshComponent();
                                                                                            },
                                                                                        }),
                                                                                        TriggerEvent.editer(gvc, widget, dd.click, {
                                                                                            hover: true,
                                                                                            option: [],
                                                                                            title: "點擊事件"
                                                                                        }),
                                                                                    ]),
                                                                                    minus: gvc.event(() => {
                                                                                        widget.data.bar.splice(index, 1);
                                                                                        widget.refreshComponent();
                                                                                    }),
                                                                                };
                                                                            }),
                                                                            expand:  dd.listExpand ,
                                                                            plus: {
                                                                                title: '添加區塊',
                                                                                event: gvc.event(() => {
                                                                                    dd.list.push({
                                                                                        title: "HOME",
                                                                                        click:{}
                                                                                    });
                                                                                    widget.refreshComponent();
                                                                                }),
                                                                            },
                                                                            refreshComponent:()=>{
                                                                                widget.refreshComponent()
                                                                            }
                                                                        })
                                                                    }
                                                                    return ``
                                                                })()}`
                                                            ]),
                                                            minus: gvc.event(() => {
                                                                widget.data.bar.splice(index, 1);
                                                                widget.refreshComponent();
                                                            }),
                                                        };
                                                    }),
                                                    expand:  dd.listExpand ,
                                                    plus: {
                                                        title: '添加區塊',
                                                        event: gvc.event(() => {
                                                            dd.list.push({
                                                                title: "HOME",
                                                                click:{}
                                                            });
                                                            widget.refreshComponent();
                                                        }),
                                                    },
                                                    refreshComponent:()=>{
                                                        widget.refreshComponent()
                                                    }
                                                })
                                            }else{
                                                return ``
                                            }
                                        })()}`
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.bar.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand:  widget.data.barExpand,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.bar.push({
                                        title: "HOME",
                                        click:{}
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                    ])

                }
            }
        },
    }
})