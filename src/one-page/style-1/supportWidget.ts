import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            ScriptStyle1.initialScript(gvc, widget);
            widget.data.bgSrc = widget.data.bgSrc ?? "https://liondesign-prd.s3.amazonaws.com/file/252530754/1680596876179-pexels-ingrid-north-1851190-3840x2160-25fps.mp4"
            widget.data.title = widget.data.title ?? "支援模組"
            widget.data.list = widget.data.list ?? [
                {
                    icon: {
                        value:`bx bxl-instagram-alt`
                    }, title: "自媒體應用", subtitle: '如果您是網紅、自媒體，您可以打造您的專屬內容，供用戶觀看，甚至透過分潤機制重中獲取收益．'
                }
            ]
            return {
                view: () => {
                    return `
<div class="position-relative">
 ${(() => {
                        var s = widget.data.bgSrc.split('.').pop()
                        if (['mp4', 'mpeg', 'mov'].indexOf(s) !== -1) {
                            return `<video autoplay loop muted playsinline defaultmuted preload="auto"  style="position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;object-fit: cover;
z-index: 0;">
  <source src="${widget.data.bgSrc}" type="video/mp4">
</video>
    <div class="position-absolute w-100 h-100" style="background-color: rgba(0,0,0,0.6);z-index: 1;top: 0px;left: 0px;"></div>
`
                        } else {
                            return `
<div style="position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;z-index: 0;
                      background-size:cover;background-position:center center;background-repeat:no-repeat;
                      background-image: url('${widget.data.bgSrc}');
                      ">
</div>
`
                        }
                    })()}

    <section id="features" class="container pt-5 position-relative">
  
              <div class="row pb-xl-3 position-relative" style="z-index: 1;" >
             
                <!-- Feature list -->
                <div class="col-lg-12 mt-0">
                  <h2 class="h1 text-center pb-3 pb-lg-4">${widget.data.title}</h2>
                  <div class="row row-cols-1 row-cols-sm-2 pt-2 pt-sm-3 pt-xl-2 px-2">
                  ${widget.data.list.map((dd:any)=>{
                      return `<div class="col pb-2 pb-xl-0 mb-4 mb-xl-5">
                      <div class="d-flex align-items-start pe-xl-3">
                        <div class="bg-secondary rounded-3 d-flex align-items-center justify-content-center flex-column" style="min-width: 55px!important;height: 55px;">
                          <i class="${dd.icon.value} text-gradient-primary   ${glitter.htmlGenerate.styleEditor(dd.icon).class()}" style="
     font-size: 28px;;
  display: block;
  background: -webkit-linear-gradient(#9c47fc, #356ad2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
                          ${glitter.htmlGenerate.styleEditor(dd.icon).style()};"></i>
                        </div>
                        <div class="ps-4 ps-sm-3 ps-md-4">
                          <h3 class="h5 pb-1 mb-2">${dd.title}</h3>
                          <p class="mb-0">${dd.subtitle}</p>
                        </div>
                      </div>
                    </div>`
                    }).join('')}
                  </div>
                </div>
              </div>
            </section>
</div>
`;
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title,
                            placeHolder: "標題",
                            callback: (text) => {
                                widget.data.title = text
                                widget.refreshComponent()
                            }
                        }),
                        Editor.uploadFile({
                            gvc: gvc,
                            title: `背景圖或者影片[mp4,mpeg,mov]`,
                            def: widget.data.bgSrc,
                            callback: (data) => {
                                widget.data.bgSrc = data
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.list,
                            gvc: gvc,
                            title: "項目區塊",
                            array: widget.data.list.map((dd: any, index: number) => {
                                return {
                                    title: dd.title || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml:
                                        gvc.map([
                                            glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: `標題`,
                                                default: dd.title,
                                                placeHolder: "輸入標題名稱",
                                                callback: (text) => {
                                                    dd.title = text
                                                    widget.refreshComponent()
                                                }
                                            }),glitter.htmlGenerate.editeText({
                                                gvc: gvc,
                                                title: `子標題`,
                                                default: dd.subtitle,
                                                placeHolder: "輸入標題名稱",
                                                callback: (text) => {
                                                    dd.subtitle = text
                                                    widget.refreshComponent()
                                                }
                                            }),
                                            Editor.fontawesome({
                                                gvc: gvc,
                                                title: `Icon樣式`,
                                                def: dd.icon.value,
                                                callback: (text) => {
                                                    dd.icon.value = text
                                                    widget.refreshComponent()
                                                }
                                            }),
                                            glitter.htmlGenerate.styleEditor(dd.icon).editor(gvc,()=>{
                                                widget.refreshComponent()
                                            },'Icon設計樣式')
                                        ]),
                                    minus: gvc.event(() => {
                                        widget.data.list.splice(index, 1)
                                        widget.refreshComponent()
                                    })
                                }
                            }),
                            expand: widget.data,
                            plus: {
                                title: "添加區塊",
                                event: gvc.event(() => {
                                    widget.data.list.push( {
                                        icon: {
                                            value:`bx bxl-instagram-alt`
                                        }, title: "自媒體應用", subtitle: '如果您是網紅、自媒體，您可以打造您的專屬內容，供用戶觀看，甚至透過分潤機制重中獲取收益．'
                                    })
                                    widget.refreshComponent()
                                })
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        })
                    ]);
                },
            };
        },
    }
})

