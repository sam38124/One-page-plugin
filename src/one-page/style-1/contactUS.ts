import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            ScriptStyle1.initialScript(gvc, widget);
            widget.data.bg = widget.data.bg ?? `https://liondesign-prd.s3.amazonaws.com/file/252530754/1679686154087-contact-bg.jpeg`;
            widget.data.info = widget.data.info ?? {
                title: '我們的基地',
                map: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.490657177669!2d120.66029061543678!3d24.189589577772235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3469164a65e9e0b7%3A0xdc39a68f46771d07!2zNDA25Y-w5Lit5biC5YyX5bGv5Y2A5ZCO5bqE5YyX6LevMTjomZ8!5e0!3m2!1szh-TW!2stw!4v1679685389362!5m2!1szh-TW!2stw" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade`,
            };
            widget.data.form = widget.data.form ?? {
                email: `jianzhi.wang@ncdesign.info`,
                title: '聯絡我們 Contact Us',
                desc: `想要更加了解我們的服務？<br />填妥以下表單，或直接聯絡此信箱 <a class="sent_mail" href="mailto:jianzhi.wang@ncdesign.info">jianzhi.wang@ncdesign.info</a><br />萊恩設計將儘速回應您。`,
                data: [
                    {title: 'projectName', name: '專案名稱', type: 'text', elem: 'input', need: true},
                    {title: 'e-mail', name: '電子信箱', type: 'email', elem: 'input', need: true},
                    {title: 'phone', name: '電話／手機', type: 'number', elem: 'input'},
                    {title: 'company', name: '公司／單位／社團名稱', type: 'text', elem: 'input'},
                    {title: 'payment', name: '預算', type: 'number', elem: 'input'},
                    {title: 'name', name: '其他想傳達的訊息', type: 'textArea', elem: 'textArea'},
                ],
            };
            widget.data.infoList = widget.data.infoList ?? [
                {icon: 'bx bx-map', title: '台中市臺灣大道二段285號20樓'},
                {icon: 'bx bx-phone-call', title: '(886) 0978-028-730'},
                {
                    icon: 'bx bx-time',
                    title: /*html*/ `<span class="text-dark fw-semibold me-1">週一至週五</span> 09:00 AM – 19:00 PM`,
                },
                {
                    icon: 'bx bx-envelope',
                    title: /*html*/ `<a class="sent_mail" href="mailto:">jianzhi.wang@ncdesign.info</a>`,
                },
            ];
            return {
                view: () => {
                    const contact = {
                        bg: widget.data.bg,
                        info: widget.data.info,
                        form: widget.data.form,
                        infoList: widget.data.infoList,
                    };
                    return `
                        <section class="jarallax dark-mode bg-dark py-xxl-5 m-0" id="contact">
          <div class="jarallax-img opacity-25" style="background-image: url(${contact.bg})"></div>
          <div class="container">
            <div class="row py-3">
              <!-- Contact form -->
              <div class="rounded p-3 m-auto col-11 col-sm-6" style="border: 1px solid white;">
                <h2 class="h2 text-center text-md-center mt-2">${contact.form.title}</h2>
                <p class="text-white-50">${contact.form.desc}</p>
                <div class="form-horizontal m-auto" style="color: black;">
                  ${glitter.print(function () {
                        var tmp = '';
                        var data: any = contact.form.data;
                        tmp += gvc.map(
                            contact.form.data.map((data: any) => {
                                data.value = '';
                                return /*html*/ `<div class="mt-2 w-100">
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
                            })
                        );
                        // tmp += funnel.generateForm(data, false, window);
                        tmp += /*html*/ /*html*/ `<div class="d-flex w-100 align-items-center justify-content-center">
                          <button
                              type="submit"
                              class="btn btn-info mx-auto mt-3"
                              style="width: calc(100% - 10px);"
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
              <!-- Contact info -->
              <div class="col-12 col-sm-5 d-flex flex-column">
                <div class="w-100">
                  <h2 class="h1 text-center pb-4 mb-1 mb-lg-3 mt-4 mt-sm-0">${contact.info.title}</h2>
                  <ul class="list-unstyled pb-3 mb-0 mb-lg-3">
                    ${glitter.print(function () {
                        var tmp = '';
                        contact.infoList.map((n: any) => {
                            tmp += /*html*/ /*html*/ `<li class="d-flex mb-3">
                                <i class="${n.icon} text-muted fs-xl mt-1 me-2"></i>${n.title}
                            </li> `;
                        });
                        return tmp;
                    })}
                  </ul>
                </div>
                <iframe
                  src="${contact.info.map}"
                  height="450"
                  class="rounded"
                  style="width:100%;border:0;${glitter.ut.frSize({sm: ``}, 'height:calc(100vw - 20px);margin-bottom:10px;')}"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  
                ></iframe>
              </div>
            </div>
          </div>
        </section>
                        `;
                },
                editor: () => {
                    return gvc.map([
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `背景圖片`,
                            def: widget.data.bg,
                            callback: (data) => {
                                widget.data.bg = data;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: `表單區塊`,
                            data: widget.data.form,
                            innerText: ()=>{
                                return [
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '標題',
                                        default: widget.data.form.title,
                                        placeHolder: '標題',
                                        callback: (text) => {
                                            widget.data.form.title = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: '副標題[HTML]',
                                        default: widget.data.form.desc,
                                        placeHolder: '副標題',
                                        callback: (text) => {
                                            widget.data.form.form = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    Editor.arrayItem({
                                        originalArray:widget.data.form.data,
                                        gvc: gvc,
                                        title: '聯絡條目',
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
                                    }),
                                ].join('')
                            },
                        }),
                        /*html*/ `<div class="my-2"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: `右側區塊`,
                            data: widget.data.info,
                            innerText:()=>{
                                return  [
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '標題',
                                        default: widget.data.info.title,
                                        placeHolder: '標題',
                                        callback: (text) => {
                                            widget.data.info.title = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: 'Google嵌入地址',
                                        default: widget.data.info.map,
                                        placeHolder: 'Google嵌入地址',
                                        callback: (text) => {
                                            widget.data.info.map = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    Editor.arrayItem({
                                        gvc: gvc,
                                        originalArray:widget.data.infoList,
                                        title: '聯絡條目',
                                        array: widget.data.infoList.map((dd: any, index: number) => {
                                            return {
                                                title: `條目:${index + 1}`,
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
                                                    glitter.htmlGenerate.editeText({
                                                        gvc: gvc,
                                                        title: `標題`,
                                                        default: dd.title,
                                                        placeHolder: '輸入標題',
                                                        callback: (text) => {
                                                            dd.title = text;
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
                                ].join('')
                            },
                        }),
                    ]);
                },
            };
        },
    }
})