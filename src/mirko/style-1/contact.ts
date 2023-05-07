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
                        mail : widget.data.mail??"jianzhi.wang@ncdesign.info",
                        title: widget.data.title??"想傳達您的訊息給萊恩設計嗎？",
                        desc: widget.data.desc??"若想要了解我們的服務，填妥以下表單，萊恩設計將儘速回應您。",
                        img: ScriptStyle1.getRout("./assets/images/contact.jpg"),
                        map: widget.data.map??"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621",
                        formList:widget.data.formList??{
                            form: [
                                { title: "姓名", type: "name", need: true },
                                { title: "信箱", type: "email", need: true },
                                { title: "電話 / 手機", type: "number", need: true },
                                { title: "想說的內容", type: "textarea", need: true },
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
                                switch (l.type) {
                                    case "textarea":
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
                              
                    
                              <div class="text-md-right mt-3">
                                <button class="btn form-control-submit-button" ${attr.btn} onclick="${gvc.event(function () {
                            var data: any = contact.formList.form.data;
                            var notFillIn = data.find((data: any) => data.need && !data.value);
                            if (notFillIn !== undefined) {
                                alert('請輸入' + notFillIn.name);
                                return;
                            }
                            glitter.openNewTab(
                                `mailto:${contact.mail}?body=${encodeURIComponent(
                                    data
                                        .map((dd: any) => {
                                            return `${dd.name}:\n${dd.value}`;
                                        })
                                        .join(`\n\n`)
                                )}`
                            );
                        })}">送出</button>
                              </div>
                            </div>
                          `;
                    }

                    if (!widget.data.formList){
                        widget.data.formList = contact.formList
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
        <section class="contact d-flex align-items-center py-5" id="contact">
          <div class="container-fluid text-light">
            <div class="row">
              <div class="col-lg-6 d-flex justify-content-center justify-content-lg-end align-items-center px-lg-5" data-aos="fade-right">
                <div style="width: 90%">
                  <div class="text-center text-lg-start py-4 pt-lg-0">
                    <p class="mb-3">聯絡我們</p>
                    <h2 class="py-2">${contact.title}</h2>
                    <p class="para-light">${contact.desc}</p>
                  </div>
                  ${lightForm(contact.formList.form, {
                      div: `class="php-email-form"`,
                      input: `class="form-control"`,
                      textarea: `class="form-control"`,
                      btn: `type="submit"`,
                  })}
                </div>
                <!-- end of div -->
              </div>
              <!-- end of col -->
              <div class="col-lg-6 d-flex align-items-center" data-aos="fade-down">
                <img class="img-fluid d-none d-lg-block" src="${contact.img}" alt="contact" />
              </div>
              <!-- end of col -->
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
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
                            title: '標題',
                            default: widget.data.title ?? '',
                            placeHolder: '請輸入標題',
                            callback: (text: string) => {
                                widget.data.title=text
                                widget.refreshComponent()
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '聯絡的信箱',
                            default: widget.data.mail ,
                            placeHolder: '請輸入mail',
                            callback: (text: string) => {
                                widget.data.mail=text
                                widget.refreshComponent()
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '子標題',
                            default: widget.data.desc ?? '',
                            placeHolder: '請輸入子標題',
                            callback: (text: string) => {
                                widget.data.desc=text
                                widget.refreshComponent()
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.formList,
                            gvc: gvc,
                            title: '表單項目',
                            array: widget.data.formList.form.map((dd: any, index: number) => {
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
                                            callback: (text: string) => {
                                                dd.type = text;
                                                widget.refreshComponent();
                                            },
                                            array: ['text', 'number', 'email', 'textArea'],
                                        }),
                                        Editor.select({
                                            title: '必填',
                                            gvc: gvc,
                                            def: dd.need ? `true` : `false`,
                                            callback: (text: string) => {
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
                                    widget.data.formList.form.push(  {title: "姓名", type: "text", need: true });
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