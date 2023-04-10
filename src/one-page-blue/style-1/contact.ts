import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";


Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    let contact = {
                        title: "聯絡我們 Contact Us",
                        desc: "想要更加了解我們的服務？填妥以下表單，或直接聯絡信箱，萊恩設計將儘速回應您。",
                        map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621",
                        infoList:{
                            info: [
                                { icon: "bi bi-geo-alt", title: "地址", text: "台中市臺灣大道二段285號20樓" },
                                { icon: "bi bi-phone", title: "電話", text: "(886) 0978-028-730" },
                                { icon: "bi bi-envelope", title: "信箱", text: "jianzhi.wang@ncdesign.info" },
                            ]
                        },
                        formList:{
                            form: [
                                { title: "姓名", id: "name", need: true },
                                { title: "信箱", id: "email", need: true },
                                { title: "電話 / 手機", id: "phone", need: true },
                                { title: "想說的訊息", id: "message", need: true },
                            ]
                        }

                    }
                    // 表格 輕量化版本

                    function lightForm(obj:any, attr:any) {
                        attr = attr ?? false;
                        let type:any = { email: "email", phone: "number" };

                        return `
                            <div ${attr.div ?? ``}>
                                ${(()=>{
                                    let tmp = "";
                                    
                                    obj.map((l: any) => {
                                        switch (l.id) {
                                            case "message":
                                                tmp += /*html*/ ` <div class="form-group mb-3">
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
                                                tmp += /*html*/ `
                                                        <div class="form-group mb-3">
                                                          <input
                                                            ${attr.input}
                                                            name="${l.id}"
                                                            id="${l.id}"
                                                            type="${type[l.id] ?? "text"}"
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


                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
                            <!-- ======= Contact Section ======= -->
                            <section id="contact" class="contact">
                    
                                <div class="section-title" data-aos="fade-up">
                                    <h2>${contact.title}</h2>
                                    <p>${contact.desc}</p>
                                </div>
                    
                                <div class="container">
                                    <div class="row gy-5 gx-lg-5">
                                      <div class="col-lg-4">
                                        <div class="info">
                                          ${glitter.print(function () {
                                            var tmp = "";
                                            contact.infoList.info.map((f) => {
                                                tmp += /*html*/ ` 
                                                <div class="info-item d-flex">
                                                  <div>
                                                  <i class="${f.icon} flex-shrink-0"></i>
                                                    <h4>${f.title}</h4>
                                                    <p>${f.text}</p>
                                                  </div>
                                                </div>
                                                <!-- End Info Item -->`;
                                                });
                                                return tmp;
                                            })}
                                          <iframe src="${contact.map}" frameborder="0" style="border:0; width: 100%; height: 290px;" allowfullscreen></iframe>
                                        </div>
                                      </div>
                                    
                                      <div class="col-lg-8">
                                        ${lightForm(contact.formList.form, {
                                            div: `class="php-email-form"`,
                                            input: `class="form-control"`,
                                            textarea: `class="form-control"`,
                                            btn: `type="submit"`,
                                        })}
                                      </div>
                                      <!-- End Contact Form -->
                                    </div>
                                </div>
                            </section>
                            <!-- End Contact Section -->
                          `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    return ``
                    return Editor.arrayItem({
                        originalArray:widget.data.list,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.list.map((dd: any, index: number) => {
                            return {
                                title: dd.title || `區塊:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `索引`,
                                        default: dd.number,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.number = text;
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
                                    glitter.htmlGenerate.styleEditor(dd).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },'標題設計樣式'),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `描述`,
                                        default: dd.desc,
                                        placeHolder: '輸入描述',
                                        callback: (text) => {
                                            dd.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    ClickEvent.editer(gvc, widget, dd, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
                                    })
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
                                widget.data.list.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
                                widget.refreshComponent();
                            }),
                        },
                        refreshComponent:()=>{
                            widget.refreshComponent()
                        }
                    })
                }
            }
        },
    }
})