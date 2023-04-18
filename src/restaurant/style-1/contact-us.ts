import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render:(gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.title=widget.data.title??'想傳達您的訊息給萊恩設計嗎？'
            widget.data.desc=widget.data.desc??'若想要了解我們的服務，填妥表單，萊恩設計將儘速回應您。'
            widget.data.map=widget.data.map??'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621'
            widget.data.infoList = widget.data.infoList ?? [
                { icon: "bx bx-map", title: "地址", text: "台中市臺灣大道二段<br>285號20樓" },
                { icon: "bx bx-phone", title: "電話", text: "(886) 0978-028-730" },
                { icon: "bx bx-time-five", title: "營業時間", text: "週一至週五<br>09:00 AM – 19:00 PM" },
                { icon: "bx bx-envelope", title: "信箱", text: "jianzhi.wang@ncdesign.info" },
            ];
            widget.data.form=widget.data.form ?? {
                data: [
                    {title: 'e-mail', name: '電子信箱', type: 'email', elem: 'input', need: true},
                    {title: 'phone', name: '電話／手機', type: 'number', elem: 'input'},
                    {title: 'company', name: '公司／單位／社團名稱', type: 'text', elem: 'input'},
                    {title: 'name', name: '想傳達的訊息', type: 'textArea', elem: 'textArea'},
                ],
            }
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    const contact = {
                        title: widget.data.title,
                        desc: widget.data.desc,
                        map: widget.data.map,
                        info: widget.data.infoList,
                        form: widget.data.form,
                    }
                    const id = glitter.getUUID();
                    return gvc.bindView({
                        bind : id,
                        view:()=>{
                            return `
                                    <!-- ======= Contact Section ======= -->
                                    <section id="contact" class="contact">
                                        <div class="container" data-aos="fade-up">
                                            <div class="section-title">
                                                <h2>${contact.title}</h2>
                                                <p>${contact.desc}</p>
                                            </div>
                                        </div>
                            
                                        <div data-aos="fade-up">
                                            <iframe style="border: 0; width: 100%; height: 350px" src="${contact.map}" frameborder="0" allowfullscreen></iframe>
                                        </div>
                            
                                        <div class="container" data-aos="fade-up">
                                            <div class="row mt-5">
                                                <div class="col-lg-4">
                                                    <div class="info">
                                                    ${glitter.print(function () {
                                let tmp = "";
                                contact.info.map((f:any) => {
                                    tmp += /*html*/ `
                                                            <div class="mb-5">
                                                                <i class="${f.icon}"></i>
                                                                <h4>${f.title}</h4>
                                                                <p>${f.text}</p>
                                                            </div>
                                                        `;
                                });
                                return tmp;
                            })}
                                                    </div>
                                                </div>
                                
                                                <div class="col-lg-8 mt-5 mt-lg-0">
                                                    <div class="php-email-form">          
                                                           ${glitter.print(function () {
                                var tmp = '';
                                var data: any = contact.form.data;
                                tmp +=   contact.form.data.map((data: any) => {
                                    data.value = '';
                                    return /*html*/ `<div class=" w-100">
                                  <label for="billing-first-name" class="form-label">
                                      <span style="color: red;font-size: 16px;font-weight: 300;" class="${data.need ? `` : `d-none`}"
                                          >*</span
                                      >
                                      ${data.name}</label
                                  >
                                  <div class="input-group input-group-merge">
                                      ${
                                        data.type === 'textArea'
                                            ? `
                <textArea class="form-control" placeholder="請輸入${data.name}" style="min-height: 100px;" onchange="${gvc.event((e) => {
                                                data.value = e.value;
                                            })}"></textArea>
                `
                                            : `
                <input class="form-control" type="${data.type}" placeholder="請輸入${data.name}"  onchange="${gvc.event((e) => {
                                                data.value = e.value;
                                            })}">
                `
                                    }
                                  </div>
                              </div>`;
                                }).join(`<div class="mt-2"></div>`);
                                // tmp += funnel.generateForm(data, false, window);
                                tmp += /*html*/ /*html*/ `<div class="d-flex w-100 align-items-center justify-content-center">
                          <button
                              type="submit"
                              class="btn btn-info ms-auto mt-3"
                              style=""
                              onclick="${gvc.event(function () {
                                    var notFillIn = data.find((data: any) => data.need && !data.value);
                                    if (notFillIn !== undefined) {
                                        alert('請輸入' + notFillIn.name);
                                        return;
                                    }
                                    glitter.openNewTab(
                                        `mailto:jianzhi.wang@ncdesign.info?body=${encodeURIComponent(
                                            data
                                                .map((dd: any) => {
                                                    return `${dd.name}:\n${dd.value}`;
                                                })
                                                .join(`\n\n`)
                                        )}`
                                    );
                                })}"
                          >
                              送出表單
                          </button>
                      </div>`;
                                return tmp;
                            })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <!-- End Contact Section -->
                                `
                        },divCreate:{},
                        onCreate:()=>{

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
                            title: '地圖',
                            default: widget.data.map ?? '',
                            placeHolder: '請輸入地圖位址',
                            callback: (text: string) => {
                                widget.data.map=text
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
                            gvc: gvc,
                            originalArray:widget.data.infoList,
                            title: '聯絡條目',
                            array: widget.data.infoList.map((dd: any, index: number) => {
                                return {
                                    title: dd.title || `條目:${index + 1}`,
                                    expand: dd,
                                    innerHtml:
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: dd.icon,
                                            callback: (text: string) => {
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
                                        })+ glitter.htmlGenerate.editeText({
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
                                        widget.data.infoList.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.infoList.push({
                                        icon: 'bx bx-map',
                                        title: '台中市北屯區後庄北路18號',
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.form.data,
                            gvc: gvc,
                            title: '表單項目',
                            array: widget.data.form.data.map((dd: any, index: number) => {
                                return {
                                    title: `條目:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `問題`,
                                            default: dd.name,
                                            placeHolder: '輸入問題',
                                            callback: (text) => {
                                                dd.name = text;
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
                                        widget.data.form.data.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.form.data.push(  {title: 'projectName', name: '專案名稱', type: 'text', elem: 'input', need: true});
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
        }
        }
    });