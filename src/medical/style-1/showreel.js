import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    widget.data.title = widget.data.title ?? "See What Makes Us Different";
                    widget.data.desc = widget.data.desc ?? "Your best care begins here. Hurry up to get top health care quality from leading doctors of the world.";
                    widget.data.youtubeLink = widget.data.youtubeLink ?? "https://www.youtube.com/embed/wJC1LFT_GD0";
                    widget.data.previewImg = widget.data.previewImg ?? ScriptStyle1.getRout('assets/img/landing/medical/video-cover.jpg');
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let showreel = {
                                title: widget.data.title,
                                desc: widget.data.desc,
                                youtubeLink: widget.data.youtubeLink,
                                previewImg: widget.data.previewImg
                            };
                            return `
                            <!-- Video showreel -->
      <section class="container text-center pb-5 mb-3 mb-md-4 mb-lg-5">
        <h2 class="h1 pt-1 mb-4">${showreel.title}</h2>
        <div class="row justify-content-center mb-md-2 mb-lg-5">
          <div class="col-lg-6 col-md-8">
            <p class="fs-lg text-muted mb-lg-0">${showreel.desc}</p>
          </div>
        </div>
        <div class="position-relative rounded-3 overflow-hidden mb-lg-3">
          <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center zindex-5">
            <a href="${showreel.youtubeLink}" target="_blank" class="btn btn-video btn-icon btn-xl stretched-link bg-white" data-bs-toggle="video">
              <i class="bx bx-play"></i>
            </a>
          </div>
          <span class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-35"></span>
          <img src="${showreel.previewImg}" alt="Cover image">
        </div>
      </section>
                           `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `標題內容`,
                            default: widget.data.title,
                            placeHolder: '輸入文字',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `副標題內容`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `youtube連結`,
                            default: widget.data.youtubeLink,
                            placeHolder: '輸入連結',
                            callback: (text) => {
                                widget.data.youtubeLink = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '預覽圖片',
                            def: widget.data.previewImg,
                            callback: (data) => {
                                widget.data.previewImg = data;
                                widget.refreshComponent();
                            }
                        })
                    ]);
                }
            };
        },
    };
});
