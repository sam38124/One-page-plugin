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
                    const about = widget.data.about;
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `                        
                                <section id="about" class="about" style="background: url(${about.background}) center center">
                                    <!--data-aos="fade-up"-->
                                    <div class="container" data-aos="fade-up">
                                        <div class="row">
                                            <!--data-aos="zoom-in" data-aos-delay="100"-->
                                            <div class="col-lg-6 order-1 order-lg-2"  data-aos="zoom-in" data-aos-delay="100">
                                                <div class="about-img">
                                                    <img class="" src="${about.img}" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                                                <h3 style="color:white;white-space:normal;word-wrap:break-word;word-break:break-all;">${about.title}</h3>
                                                ${(() => {
                                return gvc.map(about.descArray.map((desc) => {
                                    return `<p class="py-3" style="white-space:normal;word-wrap:break-word;word-break:break-all;">${desc}</p>`;
                                }));
                            })()}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
                    return glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: '大標題',
                        default: widget.data.about.title,
                        placeHolder: '請輸入大標題所顯示的文字',
                        callback: (text) => {
                            widget.data.about.title = text;
                            widget.refreshComponent();
                        },
                    }) +
                        `
                        <div class="mt-3"></div>
                        ` +
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `圖片`,
                            def: widget.data.about.img,
                            callback: (e) => {
                                widget.data.about.img = e;
                                widget.refreshComponent();
                            },
                        }) +
                        `
                        <div class="mt-3"></div>
                        `;
                }
            };
        },
    };
});
