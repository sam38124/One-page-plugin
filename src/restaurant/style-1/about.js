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
                                return gvc.map(about.block.map((block) => {
                                    return `<p class="py-3" style="white-space:normal;word-wrap:break-word;word-break:break-all;">${block.text}</p>`;
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
                        ` +
                        Editor.arrayItem({
                            originalArray: widget.data.about.descObject,
                            gvc: gvc,
                            title: '左邊大塊文字',
                            array: widget.data.about.block.map((block, index) => {
                                return {
                                    title: `區塊:${index + 1}`,
                                    expand: block,
                                    innerHtml: glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `第${index + 1}段落文字`,
                                        default: block.text,
                                        placeHolder: '請輸入此段落的文字',
                                        callback: (text) => {
                                            widget.data.about.descArray[index] = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    minus: gvc.event(() => {
                                        widget.data.about.block.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.about,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.about.block.push({ text: "" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        });
                }
            };
        },
    };
});
