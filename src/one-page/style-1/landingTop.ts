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
            widget.data.bgSrc=widget.data.bgSrc??"https://liondesign-prd.s3.amazonaws.com/file/252530754/1680596876179-pexels-ingrid-north-1851190-3840x2160-25fps.mp4"
            widget.data.appImage=widget.data.appImage ?? {
                i1:`https://liondesign-prd.s3.amazonaws.com/file/252530754/1680594749017-hero-phone-1.png`,
                i2:`https://liondesign-prd.s3.amazonaws.com/file/252530754/1680594776332-hero-phone-2.png`
            }
            widget.data.appImage.style1=widget.data.appImage.style1??{}
            widget.data.appImage.style2=widget.data.appImage.style2??{}
            widget.data.title=widget.data.title??"低成本打造專屬於您的社群、自媒體與電商應用．"
            widget.data.desc= widget.data.desc??`星澄基地 -
                      提供您企業，社團，電商，教育與自媒體應用的最佳解決方案，免後台串接免程式開發，幾項設定步驟就能為您打造屬於您的專屬應用．`
            widget.data.btn1=widget.data.btn1??{
                title:`<i class="bx bx-play-circle me-1 fs-4"></i>線上演示`
            }
            widget.data.btn2=widget.data.btn2??{
                title:`立即開始<i class="bx bx-chevron-right fs-4"></i>`
            }
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc,widget)
                    return `<section
              class="overflow-hidden  position-lg-relative position-relative"
              style=""
            >
              ${(() => {
                        var s = widget.data.bgSrc.split('.').pop()
                        if (['mp4', 'mpeg', 'mov'].indexOf(s) !== -1) {
                            return `<video autoplay loop muted playsinline defaultmuted preload="auto"  style="position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;object-fit: cover;">
  <source src="${widget.data.bgSrc}" type="video/mp4">
</video>`
                        } else {
                            return `
<div style="position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;
                      background-size:cover;background-position:center center;background-repeat:no-repeat;
                      background-image: url('${widget.data.bgSrc}');
                      ">
</div>
`
                        }
                    })()}
              <!-- <div class="position-absolute w-100 h-100" style="background-color: rgba(0,0,0,0.6);z-index: 1;"></div> -->
              <div class="container pt-4 pt-xl-5 mt-5 position-relative" style="z-index: 2;">
                <div class="row pt-md-2 pt-lg-5">
                  <div class="col-md-5 d-flex flex-column mt-md-4 pt-5 pb-3 pb-sm-4 py-md-5">
                    <h1 class="display-4 text-center text-md-start mb-4" style="font-weight: 400;">
                      ${widget.data.title}
                    </h1>
                    <p class="fs-lg text-center text-md-start">
                      ${widget.data.desc}
                    </p>
                    <div class="w-100 d-flex">
                      <button
                        class="btn btn-warning  fs-lg text-center text-md-start  me-1 d-flex align-items-center 
                        ${glitter.htmlGenerate.styleEditor(widget.data.btn1).class()}"
                        style="${glitter.htmlGenerate.styleEditor(widget.data.btn1).style()}"
                        onclick="${gvc.event(() => {
                        TriggerEvent.trigger({
                            gvc, widget, clickEvent: widget.data.btn1,
                        })
                    })}" 
                      >
                        ${widget.data.btn1.title}
                      </button>
                      <button
                        class="btn btn-danger  fs-lg text-center text-md-start  ms-1 d-flex align-items-center  ${glitter.htmlGenerate.styleEditor(widget.data.btn2).class()}"
                        style="${glitter.htmlGenerate.styleEditor(widget.data.btn2).style()}"
                        onclick="${gvc.event(() => {
                        TriggerEvent.trigger({
                            gvc, widget, clickEvent: widget.data.btn2,
                        })
                    })}"
                      >
                        ${widget.data.btn2.title}
                      </button>
                    </div>
                  </div>
                  <div class="col-md-7 align-self-end">
                    <div class="position-relative overflow-hidden mt-4 pb-3 pt-4 mx-auto me-md-0" style="max-width: 632px;">
                      <div class="ratio ratio-1x1"></div>
                      <img
                        src="${widget.data.appImage.i1}"
                        class="rellax position-absolute top-0 start-0 zindex-2 ${glitter.htmlGenerate.styleEditor(widget.data.appImage.style1).class()}
                        ${(!widget.data.appImage.i1) ? `d-none`:``}"
                        data-rellax-speed="1.6"
                        data-disable-parallax-down="md"
                        style="${glitter.htmlGenerate.styleEditor(widget.data.appImage.style1).style()}"
                        alt="Phone"
                      />
                      <img
                        src="${widget.data.appImage.i2}"
                        class="rellax position-absolute top-0 start-0 ${glitter.htmlGenerate.styleEditor(widget.data.appImage.style2).class()}
                        ${(!widget.data.appImage.i2) ? `d-none`:``}"
                        data-rellax-speed="2.8"
                        data-disable-parallax-down="md"
                          style="${glitter.htmlGenerate.styleEditor(widget.data.appImage.style2).style()}"
                        alt="Phone"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>`
                },
                editor: () => {
                    return gvc.map([
                        Editor.uploadFile({
                            gvc: gvc,
                            title: `背景圖或者影片[mp4,mpeg,mov]`,
                            def:widget.data.bgSrc,
                            callback:(data)=>{
                                widget.data.bgSrc=data
                                widget.refreshComponent()
                            }
                        }),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `手機圖片一`,
                            def:widget.data.appImage.i1,
                            callback:(data)=>{
                                widget.data.appImage.i1=data
                                widget.refreshComponent()
                            }
                        }),
                        glitter.htmlGenerate.styleEditor(widget.data.appImage.style1).editor(gvc,()=>{
                            widget.refreshComponent()
                        },"圖片樣式一"),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `手機圖片二`,
                            def:widget.data.appImage.i2,
                            callback:(data)=>{
                                widget.data.appImage.i2=data
                                widget.refreshComponent()
                            }
                        }),
                        glitter.htmlGenerate.styleEditor(widget.data.appImage.style2).editor(gvc,()=>{
                            widget.refreshComponent()
                        },"圖片樣式二"),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title,
                            placeHolder: "標題",
                            callback: (text) => {
                                widget.data.title = text
                                widget.refreshComponent()
                            }
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '描述',
                            default: widget.data.desc,
                            placeHolder: "描述",
                            callback: (text) => {
                                widget.data.desc = text
                                widget.refreshComponent()
                            }
                        }),
                        `<div class="my-2"></div>`,
                        ['btn1','btn2'].map((key,index)=>{
                            return Editor.toggleExpand({
                                gvc: gvc, title: "按鈕:"+(index+1), data: widget.data[key], innerText: ()=>{
                                    return gvc.map([
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: '按鈕標題',
                                            default: widget.data[key].title,
                                            placeHolder: "按鈕標題",
                                            callback: (text) => {
                                                widget.data[key].title = text
                                                widget.refreshComponent()
                                            }
                                        }),
                                        glitter.htmlGenerate.styleEditor(widget.data[key]).editor(gvc,()=>{
                                            widget.refreshComponent()
                                        },'按鈕設計樣式'),
                                        TriggerEvent.editer(gvc, widget, widget.data[key], {
                                            hover: true,
                                            option: [],
                                            title: "點擊事件"
                                        })
                                    ])
                                }
                            })
                        }).join('<div class="my-2"></div>')
                    ]);
                },
            };
        },
    }
})