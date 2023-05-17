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
                    widget.data.title = widget.data.title ?? "Get Free Professional Consultation";
                    widget.data.address = widget.data.address ?? "406台中市北屯區后庄北路18號";
                    widget.data.phone = widget.data.phone ?? "(886) 0978-028-730";
                    widget.data.hours = widget.data.hours ?? "9:00 am – 22:00 pm";
                    widget.data.hours2 = widget.data.hours2 ?? "9:00 am – 20:00 pm";
                    widget.data.email = widget.data.email ?? "example@email.com";
                    widget.data.mapSrc = widget.data.mapSrc ?? "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d909.8721071423331!2d120.66283968121469!3d24.18966768224522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDExJzIzLjAiTiAxMjDCsDM5JzQ0LjkiRQ!5e0!3m2!1szh-TW!2stw!4v1684314338771!5m2!1szh-TW!2stw";
                    widget.data.btn = widget.data.btn ?? {
                        text: "預約",
                        link: ""
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let contact = {
                                title: widget.data.title,
                                address: widget.data.address,
                                phone: widget.data.phone,
                                hours: widget.data.hours,
                                hours2: widget.data.hours2,
                                email: widget.data.email,
                                mapSrc: widget.data.mapSrc,
                                btn: widget.data.btn
                            };
                            return `
                            <!-- Contacts -->
      <section class="container pb-5 mb-1 mb-md-4 mb-lg-5">
        <div class="row pb-xl-3">
          <div class="col-md-6 pb-2 pb-md-0 mb-4 mb-md-0">
            <iframe src="${contact.mapSrc}" style="border:0;width: 100%;height: 100%;vertical-align: middle;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div class="col-xl-5 col-md-6 offset-xl-1">
            <h2 class="h1 pb-4 mb-1 mb-lg-3">${contact.title}</h2>
            <ul class="list-unstyled pb-3 mb-0 mb-lg-3">
              <li class="d-flex mb-3">
                <i class="bx bx-map text-muted fs-xl mt-1 me-2"></i>
                ${contact.address}
              </li>
              <li class="d-flex mb-3">
                <i class="bx bx-phone-call text-muted fs-xl mt-1 me-2"></i>
                ${contact.phone}
              </li>
              <li class="d-flex mb-3">
                <i class="bx bx-time text-muted fs-xl mt-1 me-2"></i>
                <div>
                  <div><span class="text-dark fw-semibold me-1">Mon – Fri:</span>${contact.hours}</div>
                  <div><span class="text-dark fw-semibold me-1">Sat – Sun:</span>${contact.hours2}</div>
                </div>
              </li>
              <li class="d-flex mb-3">
                <i class="bx bx-envelope text-muted fs-xl mt-1 me-2"></i>
                ${contact.email}
              </li>
            </ul>
            <a href="${contact.btn.link}" class="btn btn-primary shadow-primary btn-lg">${contact.btn.text}</a>
          </div>
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
                            title: '地址',
                            default: widget.data.address ?? '',
                            placeHolder: '請輸入地址',
                            callback: (text) => {
                                widget.data.address = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '電話',
                            default: widget.data.phone ?? '',
                            placeHolder: '請輸入電話',
                            callback: (text) => {
                                widget.data.phone = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '平日營業時間',
                            default: widget.data.hours ?? '',
                            placeHolder: '請輸入時間間距',
                            callback: (text) => {
                                widget.data.hours = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '假日營業時間',
                            default: widget.data.hours2 ?? '',
                            placeHolder: '請輸入時間間距',
                            callback: (text) => {
                                widget.data.hours2 = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '信箱',
                            default: widget.data.email ?? '',
                            placeHolder: '請輸入信箱資訊',
                            callback: (text) => {
                                widget.data.email = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '按鍵文字',
                            default: widget.data.btn.text ?? '',
                            placeHolder: '請輸入文字',
                            callback: (text) => {
                                widget.data.btn.text = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '網址',
                            default: widget.data.btn.link ?? '',
                            placeHolder: '請輸入按鍵對應的超連結',
                            callback: (text) => {
                                widget.data.btn.link = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.googleMap({
                            title: '地圖位址',
                            gvc: gvc,
                            def: widget.data.mapSrc,
                            callback: (text) => {
                                widget.data.mapSrc = text;
                            },
                        })
                    ]);
                }
            };
        },
    };
});
