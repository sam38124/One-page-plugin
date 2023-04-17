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
                        title: widget.data.title??"想傳達您的訊息給萊恩設計嗎？",
                        desc: widget.data.desc??"若想要了解我們的服務<br />填妥以下表單，萊恩設計將儘速回應您。",
                        map: widget.data.map??"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621",
                        infoList:widget.data.infoList??{
                            info: [
                                { icon: "bx bx-map", title: "地址", text: "台中市臺灣大道二段285號20樓" },
                                { icon: "bx bx-phone", title: "電話", text: "(886) 0978-028-730" },
                                { icon: "bx bx-time-five", title: "營業時間", text: "週一至週五 09:00 AM – 19:00 PM" },
                                { icon: "bx bx-envelope", title: "信箱", text: "jianzhi.wang@ncdesign.info" },
                            ],
                        },
                        formList:widget.data.formList??{
                            form: [
                                { title: "姓名", id: "name", need: true },
                                { title: "信箱", id: "email", need: true },
                                { title: "電話 / 手機", id: "phone", need: true },
                                { title: "主旨", id: "subject", need: true },
                                { title: "想說的內容", id: "message", need: true },
                            ],
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

                    if (!widget.data.infoList){

                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
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
                                        contact.infoList.info.map((f:any) => {
                                            tmp += /*html*/ `
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
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
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
                            placeHolder: '副標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.outro,
                            gvc: gvc,
                            title: '行內資訊',
                            array: widget.data.contactInf.inf.map((data: any, index: number) => {
                                return {
                                    title: `第${index+1}個聯絡資訊`,
                                    expand: widget.data.contactInf,
                                    innerHtml:glitter.htmlGenerate.editeInput({
                                        gvc : gvc,
                                        title : '聯絡資訊',
                                        default : data.title,
                                        placeHolder : `請輸入聯絡資訊`,
                                        callback:(text)=>{
                                            data.title = text;
                                            widget.refreshComponent();
                                        }
                                    })+Editor.fontawesome({
                                        gvc: gvc,
                                        title: '圖示',
                                        def: data.icon,
                                        callback: (text: string) => {
                                            data.icon = text;
                                            widget.refreshComponent();
                                        },
                                    })

                                    ,
                                    minus: gvc.event(() => {
                                        widget.data.contactInf.inf.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.outro.socialData,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.contactInf.inf.push({title:"jianzhi.wang@ncdesign.info" , icon:"bx bx-envelope fs-5 m-2"});
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        })
                    ])
                }
            }
        },
    }
})