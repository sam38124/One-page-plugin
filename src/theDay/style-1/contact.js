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
                    let contact = {
                        title: widget.data.title ?? "想傳達您的訊息給萊恩設計嗎？",
                        desc: widget.data.desc ?? "若想要了解我們的服務<br />填妥以下表單，萊恩設計將儘速回應您。",
                        map: widget.data.map ?? "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621",
                        infoList: widget.data.infoList ?? {
                            info: [
                                { icon: "bx bx-map", title: "地址", text: "台中市北屯區後庄北路18號" },
                                { icon: "bx bx-phone", title: "電話", text: "(886) 0978-028-730" },
                                { icon: "bx bx-time-five", title: "營業時間", text: "週一至週五 09:00 AM – 19:00 PM" },
                                { icon: "bx bx-envelope", title: "信箱", text: "jianzhi.wang@ncdesign.info" },
                            ],
                        },
                        formList: widget.data.formList ?? {
                            form: [
                                { title: "姓名", type: "name", need: true },
                                { title: "信箱", type: "email", need: true },
                                { title: "電話 / 手機", type: "number", need: true },
                                { title: "主旨", type: "text", need: true },
                                { title: "想說的內容", type: "textArea", need: true },
                            ],
                        }
                    };
                    function lightForm(obj, attr) {
                        attr = attr ?? false;
                        let type = { email: "email", phone: "number" };
                        return `
                            <div ${attr.div ?? ``}>
                                ${(() => {
                            let tmp = "";
                            obj.map((l) => {
                                switch (l.type) {
                                    case "textarea":
                                        tmp += ` <div class="form-group mb-3">
                                                        <textarea
                                                          ${attr.textarea ?? ``}
                                                          name="message"
                                                          id="message"
                                                          cols="30"
                                                          rows="5"
                                                          placeholder=""
                                                          onblur=""
                                                        ></textarea>
                                                      </div>`;
                                        break;
                                    default:
                                        tmp += `
                                            <div class="form-group mb-3">
                                              <input
                                                ${attr.input}
                                                name="${l.type}"
                                                id="${l.title}"
                                                type="${l.type}"
                                                placeholder="${l.title}"
                                                onblur=""
                                              />
                                            </div>
                                          `;
                                        break;
                                }
                            });
                            return tmp;
                        })()}
                              
                    
                              <div class="text-center text-md-right mt-3">
                                <button ${attr.btn} onclick="">傳送訊息</button>
                              </div>
                            </div>
                          `;
                    }
                    if (!widget.data.infoList) {
                        widget.data.infoList = contact.infoList;
                    }
                    if (!widget.data.formList) {
                        widget.data.formList = contact.formList;
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <!-- ======= Contact Section ======= -->
                            <section id="contact" class="contact">
                              <div class="container">
                                <div class="section-title">
                                  <span>${contact.title}</span>
                                  <h2>${contact.title}</h2>
                                  <p>${contact.desc}</p>
                                </div>
                    
                                <div class="row" data-aos="fade-up">
                                    ${glitter.print(function () {
                                var tmp = "";
                                contact.infoList.info.map((f) => {
                                    tmp += `
                                              <div class="col-lg-3 col-md-6">
                                                <div class="info-box mb-4">
                                                  <i class="${f.icon}"></i>
                                                  <h3>${f.title}</h3>
                                                  <p>${f.text}</p>
                                                </div>
                                              </div>
                                            `;
                                });
                                return tmp;
                            })}
                                </div>
                    
                                <div class="row" data-aos="fade-up">
                                  <div class="col-lg-6 ">
                                    <iframe
                                      class="mb-4 mb-lg-0"
                                      src="${contact.map}"
                                      frameborder="0"
                                      style="border:0; width: 100%; height: 470px;"
                                      allowfullscreen
                                    ></iframe>
                                  </div>
                    
                                  <div class="col-lg-6">
                                    ${lightForm(contact.formList.form, {
                                div: `class="php-email-form"`,
                                input: `class="form-control"`,
                                textarea: `class="form-control"`,
                                btn: `type="submit"`,
                            })}
                                  </div>
                                </div>
                              </div>
                            </section>
                            <!-- End Contact Section -->
                          `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title ?? '',
                            placeHolder: '請輸入標題',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '地圖',
                            default: widget.data.map ?? '',
                            placeHolder: '請輸入地圖位址',
                            callback: (text) => {
                                widget.data.map = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '子標題',
                            default: widget.data.desc ?? '',
                            placeHolder: '請輸入子標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            gvc: gvc,
                            originalArray: widget.data.infoList,
                            title: '聯絡條目',
                            array: widget.data.infoList.info.map((dd, index) => {
                                return {
                                    title: dd.title || `條目:${index + 1}`,
                                    expand: dd,
                                    innerHtml: Editor.fontawesome({
                                        title: 'icon',
                                        gvc: gvc,
                                        def: dd.icon,
                                        callback: (text) => {
                                            dd.icon = text;
                                        },
                                    }) +
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.title,
                                            placeHolder: '輸入標題',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }) + glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `描述`,
                                        default: dd.text,
                                        placeHolder: '輸入描述',
                                        callback: (text) => {
                                            dd.text = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    minus: gvc.event(() => {
                                        widget.data.infoList.info.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.infoList,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.infoList.info.push({
                                        icon: 'bx bx-map',
                                        title: '地址',
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.formList,
                            gvc: gvc,
                            title: '表單項目',
                            array: widget.data.formList.form.map((dd, index) => {
                                return {
                                    title: `條目:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `問題`,
                                            default: dd.title,
                                            placeHolder: '輸入問題',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.select({
                                            title: '輸入類型',
                                            gvc: gvc,
                                            def: dd.type,
                                            callback: (text) => {
                                                dd.type = text;
                                                widget.refreshComponent();
                                            },
                                            array: ['text', 'number', 'email', 'textArea'],
                                        }),
                                        Editor.select({
                                            title: '必填',
                                            gvc: gvc,
                                            def: dd.need ? `true` : `false`,
                                            callback: (text) => {
                                                dd.need = text === 'true';
                                                widget.refreshComponent();
                                            },
                                            array: ['true', 'false'],
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.formList.form.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.formList,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.formList.form.push({ title: "姓名", type: "text", need: true });
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
