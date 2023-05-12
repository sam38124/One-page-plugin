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
                    widget.data.rightImg = widget.data.rightImg??ScriptStyle1.getRout("assets/img/landing/medical/hero-img-1.jpg");
                    widget.data.leftImg = widget.data.leftImg??ScriptStyle1.getRout("assets/img/landing/medical/hero-img-2.jpg");
                    widget.data.leftTitle = widget.data.leftTitle??"Professional Medical Center";
                    widget.data.desc = widget.data.desc??"We Take Care of Your Health";
                    widget.data.hint = widget.data.hint??"Don't have insurance?";
                    widget.data.leftBtn = widget.data.leftBtn??{
                        text:"Click here.",
                        click:{}
                    };
                    widget.data.middleTitle = widget.data.middleTitle??"Silicon Medical Center";
                    widget.data.middleDesc = widget.data.middleDesc??"Our medical center provides a wide range of health care services. We use only advanced technologies to keep your family happy and healthy, without any unexpected surprises. We appreciate your trust greatly. Our patients choose us and our services because they know we are the best.";
                    widget.data.middleBtn = widget.data.middleBtn??{
                        text:"about",
                        click:{}
                    };
                    widget.data.time = widget.data.time??[
                        {
                            key:"Mon – Fri:",
                            value:" 9:00 am – 22:00 pm"
                        },
                        {
                            key:"Sat – Sun:",
                            value:" 9:00 am – 20:00 pm"
                        },
                    ];
                    widget.data.reserveBtn = widget.data.reserveBtn ??{
                        text:"Make an appointment",
                        click:{}
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let hero:{
                                leftImg : string,
                                rightImg : string,
                                leftTitle:string,
                                desc:string,
                                hint:string,
                                leftBtn:{
                                    text:string,
                                    click:{}
                                },
                                middleTitle:string,
                                middleDesc:string,
                                middleBtn:{
                                    text:string,
                                    click:{}
                                },
                                time:{
                                   key:string,
                                   value:string
                                }[],
                                reserveBtn:{
                                    text:string,
                                    click:{}
                                }

                            } = {
                                leftImg : widget.data.leftImg,
                                rightImg : widget.data.rightImg,
                                leftTitle : widget.data.leftTitle,
                                desc : widget.data.desc,
                                hint : widget.data.hint,
                                leftBtn: widget.data.leftBtn,
                                middleTitle:widget.data.middleTitle,
                                middleDesc:widget.data.middleDesc,
                                middleBtn : widget.data.middleBtn,
                                time:widget.data.time,
                                reserveBtn:widget.data.reserveBtn,
                            }
                            return `
                            <!-- Hero -->
      <section class="position-relative pt-md-3 pt-lg-5 mb-md-3 mb-lg-5">
        <div class="container position-relative zindex-5 pt-5">
          <div class="row mt-4 pt-5">
            <div class="col-xl-4 col-lg-5 text-center text-lg-start pb-3 pb-md-4 pb-lg-0">
              <h1 class="fs-xl text-uppercase">${hero.leftTitle}</h1>
              <h3 class="display-4 pb-md-2 pb-lg-4">${hero.desc}</h3>
              <p class="fs-lg">${hero.hint} <a href="#" class="fw-medium">${hero.leftBtn.text}</a></p>
            </div>
            <div class="col-xl-5 col-lg-6 offset-xl-1 position-relative zindex-5 mb-5 mb-lg-0">
              <div class="rellax card bg-primary border-0 shadow-primary py-2 p-sm-4 p-lg-5" data-rellax-speed="-1" data-disable-parallax-down="lg">
                <div class="card-body p-lg-3">
                  <h2 class="text-light pb-1 pb-md-3">${hero.middleTitle}</h2>
                  <p class="fs-lg text-light pb-2 pb-md-0 mb-4 mb-md-5">${hero.middleDesc}</p>
                  <a href="#" class="btn btn-light btn-lg">
                    ${hero.middleBtn.text}
                    <i class="bx bx-right-arrow-alt lh-1 fs-4 ms-2 me-n2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="d-none d-lg-block" style="margin-top: -165px;"></div>
          <div class="row align-items-end">
            <div class="col-lg-6 d-none d-lg-block">
              <img src="${hero.leftImg}" class="rellax rounded-3" alt="Image" data-rellax-speed="1.35" data-disable-parallax-down="md">
            </div>
            <div class="col-lg-6 d-flex flex-column flex-md-row align-items-center justify-content-between">
              <div class="d-flex align-items-center ps-xl-5 mb-4 mb-md-0">
                <div class="btn btn-icon btn-secondary btn-lg pe-none rounded d-lg-none d-xl-inline-flex">
                  <i class="bx bx-time text-primary fs-3"></i>
                </div>
                <ul class="list-unstyled ps-3 ps-lg-0 ps-xl-3 mb-0">
                  ${(()=>{
                      let temp = ``
                      hero.time.map((data)=>{
                          temp += `
                            <li><strong class="text-dark">${data.key}</strong>${data.value}</li>
                          `
                      })
                      return temp    
                  })()}
                </ul>
              </div>
              <a href="#" class="btn btn-primary btn-lg shadow-primary">${hero.reserveBtn.text}</a>
            </div>
          </div>
        </div>
        <div class="d-none d-lg-block position-absolute top-0 end-0 w-50 d-flex flex-column ps-3" style="height: calc(100% - 108px);">
          <div class="w-100 h-100 overflow-hidden bg-position-center bg-repeat-0 bg-size-cover" style="background-image: url('${hero.rightImg}'); border-bottom-left-radius: .5rem;"></div>
        </div>
      </section>
                           `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    widget.data.leftExpand = widget.data.leftExpand??{};
                    widget.data.middleExpand = widget.data.middleExpand??{};
                    widget.data.rightExpand = widget.data.rightExpand??{};
                    widget.data.linkExpand = widget.data.linkExpand??{};
                    return gvc.map([
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '左半邊內容',
                            data: widget.data.leftExpand,
                            innerText: ()=>{
                                return gvc.map([
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: '圖片',
                                        def:widget.data.leftImg,
                                        callback:(data)=>{
                                            widget.data.leftImg=data
                                            widget.refreshComponent()
                                        }
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `標題`,
                                        default: widget.data.leftTitle,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            widget.data.leftTitle = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `副標題`,
                                        default: widget.data.desc,
                                        placeHolder: '輸入副標題名稱',
                                        callback: (text) => {
                                            widget.data.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `提醒標語`,
                                        default: widget.data.hint,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            widget.data.hint = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `按鍵文字`,
                                        default: widget.data.leftBtn.text,
                                        placeHolder: '輸入按鍵文字',
                                        callback: (text) => {
                                            widget.data.leftBtn.text = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                ])
                            }

                        }),
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '中間方塊內容',
                            data: widget.data.middleExpand,
                            innerText: ()=>{
                                return gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `標題`,
                                        default: widget.data.middleTitle,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            widget.data.middleTitle = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `副標題`,
                                        default: widget.data.middleDesc,
                                        placeHolder: '輸入副標題名稱',
                                        callback: (text) => {
                                            widget.data.middleDesc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `按鍵文字`,
                                        default: widget.data.middleBtn.text,
                                        placeHolder: '輸入按鍵文字',
                                        callback: (text) => {
                                            widget.data.middleBtn.text = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                ])
                            }

                        }),
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '右方內容',
                            data: widget.data.rightExpand,
                            innerText: ()=>{
                                return gvc.map([
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: '圖片',
                                        def:widget.data.rightImg,
                                        callback:(data)=>{
                                            widget.data.rightImg=data
                                            widget.refreshComponent()
                                        }
                                    }),
                                    Editor.arrayItem({
                                        originalArray:widget.data.time,
                                        gvc: gvc,
                                        title: '營業時間',
                                        array: widget.data.time.map((BARData: any, index: number) => {
                                            return {
                                                title: BARData.name || `區段:${index + 1}`,
                                                expand: BARData,
                                                innerHtml: gvc.map([
                                                    glitter.htmlGenerate.editeInput({
                                                        gvc: gvc,
                                                        title: '營業區段',
                                                        default: BARData.key,
                                                        placeHolder: '請輸入此營業區段的敘述',
                                                        callback: (text) => {
                                                            BARData.key = text;
                                                            widget.refreshComponent();
                                                        },
                                                    }),
                                                    glitter.htmlGenerate.editeInput({
                                                        gvc: gvc,
                                                        title: '區段時間',
                                                        default: BARData.value,
                                                        placeHolder: '請輸入此區段的營業時間',
                                                        callback: (text) => {
                                                            BARData.value = text;
                                                            widget.refreshComponent();
                                                        },
                                                    }),
                                                ]),
                                                minus: gvc.event(() => {
                                                    widget.data.time.splice(index, 1);
                                                    widget.refreshComponent();
                                                }),
                                            };
                                        }),
                                        expand: widget.data.linkExpand,
                                        plus: {
                                            title: '添加營業區間',
                                            event: gvc.event(() => {
                                                widget.data.time.push( {
                                                    key:"Mon – Fri:",
                                                    value:" 9:00 am – 22:00 pm"
                                                });
                                                widget.refreshComponent();
                                            }),
                                        },
                                        refreshComponent:()=>{
                                            widget.refreshComponent()
                                        }
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `按鍵文字`,
                                        default: widget.data.reserveBtn.text,
                                        placeHolder: '輸入按鍵文字',
                                        callback: (text) => {
                                            widget.data.reserveBtn.text = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                ])
                            }

                        }),
                    ])
                }
            }
        },
    }
})