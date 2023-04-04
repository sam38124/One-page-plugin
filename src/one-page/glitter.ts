import { HtmlJson, Plugin } from '../glitterBundle/plugins/plugin-creater.js';
import { Glitter } from '../glitterBundle/Glitter.js';
import { GVC } from '../glitterBundle/GVController';
import { Editor } from '../editor';
import { ClickEvent } from '../glitterBundle/plugins/click-event';

Plugin.create(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        landingHeader: {
            title: '著陸頁',
            subContent: '顯示星澄基地的項目宣傳．',
            defaultData: {},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                widget.data.image=widget.data.image??""
                widget.data.image2=widget.data.image2??""
                return {
                    view: () => {
                        return `<div class="container pt-4 pt-xl-5 mt-5" style="position: relative; z-index: 1;">
                <div class="row pt-md-2 pt-lg-5">
                  <div class="col-md-5 d-flex flex-column mt-md-4 pt-5 pb-3 pb-sm-4 py-md-5">
                    <h1 class="display-4 text-center text-md-start mb-4" style="font-weight: 400;">
                      低成本打造專屬於您的社群、自媒體與電商應用．
                    </h1>
                    <p class="fs-lg text-center text-md-start">
                      星澄基地 -
                      提供您企業，社團，電商，教育與自媒體應用的最佳解決方案，免後台串接免程式開發，幾項設定步驟就能為您打造屬於您的專屬應用．
                    </p>
                    <div class="w-100 d-flex">
                      <button class="btn btn-warning  fs-lg text-center text-md-start flex-fill me-1 d-flex align-items-center" onclick="clickMap['5'].fun(this,event);" data-gs-event-5="event">
                        <i class="bx bx-play-circle me-1 fs-4"></i>線上演示
                      </button>
                      <button class="btn btn-danger  fs-lg text-center text-md-start flex-fill ms-1 d-flex align-items-center" onclick="clickMap['6'].fun(this,event);" data-gs-event-6="event">
                        立即開始<i class="bx bx-chevron-right fs-4"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-7 align-self-end">
                    <div class="position-relative overflow-hidden mt-4 pb-3 pt-4 mx-auto me-md-0" style="max-width: 632px;">
                      <div class="ratio ratio-1x1"></div>
                      <img src="${widget.data.image ?? ""}" class="rellax position-absolute top-0 start-0 zindex-2" data-rellax-speed="1.6" data-disable-parallax-down="md" alt="Phone" style="transform: translate3d(0px, 0px, 0px);">
                      <img src="${widget.data.image2 ?? ""}" class="rellax position-absolute top-0 start-0" data-rellax-speed="2.8" data-disable-parallax-down="md" alt="Phone" style="transform: translate3d(0px, 0px, 0px);">
                    </div>
                  </div>
                </div>
              </div>`;
                    },
                    editor: () => {
                        return gvc.map([
                            Editor.uploadImage({
                                gvc: gvc,
                                title: `預覽圖片1`,
                                def:widget.data.image,
                                callback:(data)=>{
                                    widget.data.mobile.m.lottie=data
                                    widget.refreshComponent()
                                }
                            }),Editor.uploadImage({
                                gvc: gvc,
                                title: `預覽圖片2`,
                                def:widget.data.mobile.m.lottie,
                                callback:(data)=>{
                                    widget.data.mobile.m.lottie=data
                                    widget.refreshComponent()
                                }
                            })
                        ]);
                    },
                };
            },
        },
    };
});