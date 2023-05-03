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
                    widget.data.img = widget.data.img ?? ScriptStyle1.getRout("assets/img/about-img.jpg");
                    widget.data.title = widget.data.title ?? "萊恩 · 提供您最佳網站服務";
                    widget.data.desc = widget.data.desc ?? `我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到UI／UX、頁面、Logo設計、，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。`;
                    widget.data.list = widget.data.list ?? [
                        { icon: "bx bx-receipt", title: "個性化的發布內容", desc: "個性化推薦可以幫助用戶看到最好的結果" },
                        { icon: "bx bx-cube-alt", title: "提供快速發文", desc: "發文附圖是近年來使用社群的基本公式" },
                        { icon: "bx bx-images", title: "活動規劃功能", desc: "使用活動排程規劃工具來追蹤所有重要的活動" },
                        { icon: "bx bx-shield", title: "資料視覺化", desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現" },
                    ];
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let about = {
                                img: widget.data.img,
                                title: widget.data.title,
                                desc: widget.data.desc,
                                list: widget.data.list
                            };
                            return `
        <!-- ======= About Section ======= -->
        <section id="about" class="about">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-7" data-aos="fade-right">
                <img src="${about.img}" class="img-fluid" alt="" />
              </div>
              <div class="col-xl-6 col-lg-5 pt-5 pt-lg-0">
                <h3 data-aos="fade-up">${about.title}</h3>
                <p data-aos="fade-up">${about.desc}</p>
                ${glitter.print(function () {
                                var tmp = "";
                                about.list.map((l, i) => {
                                    tmp += `
                      <div class="icon-box" data-aos="fade-up" data-aos-delay="${100 * i}">
                        <i class="${l.icon}"></i>
                        <h4>${l.title}</h4>
                        <p>${l.desc}p</p>
                      </div>
                    `;
                                });
                                return tmp;
                            })}
              </div>
            </div>
          </div>
        </section>
        <!-- End About Section -->
      `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        Editor.uploadImage({
                            gvc: gvc,
                            title: '圖片',
                            def: widget.data.img,
                            callback: (data) => {
                                widget.data.img = data;
                                widget.refreshComponent();
                            }
                        }),
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
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題敘述',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.list,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.list.map((dd, index) => {
                                return {
                                    title: dd.title || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.title,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.title,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: dd.icon,
                                            callback: (text) => {
                                                dd.icon = text;
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.list.push({ icon: "bx bx-receipt", title: "個性化的發布內容", desc: "個性化推薦可以幫助用戶看到最好的結果" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        })
                    ]);
                }
            };
        },
    };
});
