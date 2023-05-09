import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {ShareDialog} from "../../dialog/ShareDialog.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    let type='SignIn'
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.title=widget.data.title??"See What Makes Us Different"
            widget.data.link=widget.data.link??""
            widget.data.content=widget.data.content??"Your best care begins here. Hurry up to get top health care quality from leading doctors of the world."
            return {
                view: () => {
                    var loading=false
                    const id=glitter.getUUID()
                    gvc.addStyleLink([ScriptStyle1.getRout('assets/vendor/lightgallery/css/lightgallery-bundle.min.css')]).then(()=>{
                        gvc.addMtScript(
                            [
                                {src: ScriptStyle1.getRout(`assets/vendor/rellax/rellax.min.js`)},
                                {src: ScriptStyle1.getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`)},
                                {src: ScriptStyle1.getRout(`assets/vendor/lightgallery/lightgallery.min.js`)},
                                {src: ScriptStyle1.getRout(`assets/vendor/lightgallery/plugins/fullscreen/lg-fullscreen.min.js`)},
                                {src: ScriptStyle1.getRout(`assets/vendor/lightgallery/plugins/zoom/lg-zoom.min.js`)},
                                {src: ScriptStyle1.getRout(`assets/vendor/lightgallery/plugins/video/lg-video.min.js`)}
                            ],
                            () => {
                                try {
                                    gvc.notifyDataChange(id)
                                } catch (e) {
                                }
                            },
                            () => {
                            }
                        );
                    })
                    return gvc.bindView(()=>{
                        return {
                            bind:id,
                            view:()=>{
                                if(widget.data.type==='column'){
                                    return `<section class="container text-center">
        <h2 class="h1 pt-1 mb-4">${widget.data.title}</h2>
        <div class="row justify-content-center mb-md-2 mb-lg-5">
          <div class="col-lg-6 col-md-8">
            <p class="fs-lg text-muted mb-lg-0">${widget.data.content}</p>
          </div>
        </div>
        <div class="position-relative rounded-3 overflow-hidden mb-lg-3">
        
          <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center zindex-5">
            <a href="${widget.data.link}" class="btn btn-video btn-icon btn-xl stretched-link bg-white" data-bs-toggle="video" data-lg-id="510c2edd-d4e2-4c1a-92c7-7cb0185224a1">
              <i class="bx bx-play"></i>
            </a>
          </div>
          <span class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-35 " style=""></span>
          <img src="${widget.data.backengImage ?? "assets/img/landing/medical/video-cover.jpg"}" alt="Cover image">
        </div>
      </section>`
                                }else{
                                    return  ` <div class="row align-items-center">
                                    ${(()=>{
                                        let list=([` <div class="col-md-6 pb-2 pb-md-0 mb-4 mb-md-0">
                                        <div class="pe-lg-5">
                                         <div class="position-relative rounded-3 overflow-hidden mb-lg-3">
        
          <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center zindex-5">
            <a href="${widget.data.link}" class="btn btn-video btn-icon btn-xl stretched-link bg-white" data-bs-toggle="video" data-lg-id="510c2edd-d4e2-4c1a-92c7-7cb0185224a1">
              <i class="bx bx-play"></i>
            </a>
          </div>
          <span class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-35 " style=""></span>
          <img src="${widget.data.backengImage ?? "assets/img/landing/medical/video-cover.jpg"}" alt="Cover image">
        </div>
                                        </div>
                                    </div>
                                    `,`     <div class="col-md-6">
                                        <h2 class="h3 mb-sm-4">${widget.data.title}</h2>
                                        <p class=" pb-2 pb-md-3 mb-3">${widget.data.content}</p>
                                    </div>`])
                                        if( widget.data.alignt=='right'){
                                            list=list.reverse()
                                        }
                                        return gvc.map(list)
                                    })()}
                                   
                               
                                </div>`
                                }

                            },
                            divCreate:{}
                        }
                    })
                },
                editor: () => {
                  return [
                      Editor.select({
                          title: `排序方式`,
                          gvc: gvc,
                          def: widget.data.alignt ?? "linear",
                          array: [
                              {
                                  title: '垂直',
                                  value: `column`,
                              },
                              {
                                  title: '橫向',
                                  value: `linear`,
                              },
                          ],
                          callback: (text) => {
                              widget.data.alignt = text;
                              widget.refreshComponent();
                          },
                      }),
                      glitter.htmlGenerate.editeInput(
                      {
                          gvc:gvc,
                          title:'標題',
                          default:widget.data.title ?? "",
                          placeHolder:"",
                          callback:(text)=>{
                              widget.data.title=text
                              widget.refreshComponent()
                          }
                      }
                  ),glitter.htmlGenerate.editeText(
                      {
                          gvc:gvc,
                          title:'內文',
                          default:widget.data.content ?? "",
                          placeHolder:"",
                          callback:(text)=>{
                              widget.data.content=text
                              widget.refreshComponent()
                          }
                      }
                  ),glitter.htmlGenerate.editeInput(
                      {
                          gvc:gvc,
                          title:'Youtube連結',
                          default:widget.data.link ?? "",
                          placeHolder:"",
                          callback:(text)=>{
                              widget.data.link=text
                              widget.refreshComponent()
                          }
                      }
                  ),Editor.uploadImage({
                      gvc: gvc,
                      title: `背景圖片`,
                      def: widget.data.backengImage,
                      callback: (e) => {
                          widget.data.backengImage = e;
                          widget.refreshComponent();
                      },
                  })].join('')
                },
            };
        },
    }
})