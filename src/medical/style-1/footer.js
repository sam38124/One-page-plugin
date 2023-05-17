import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { ClickEvent } from "../../glitterBundle/plugins/click-event.js";
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
                    widget.data.logo = widget.data.logo ?? ScriptStyle1.getRout("assets/img/logo.svg");
                    widget.data.mark = widget.data.mark ?? "Silicon";
                    widget.data.desc = widget.data.desc ?? "Proin ipsum pharetra, senectus eget scelerisque varius pretium platea velit. Lacus, eget eu vitae nullam proin turpis etiam mi sit. Non feugiat feugiat egestas nulla nec. Arcu tempus, eget elementum dolor ullamcorper sodales ultrices eros.";
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let footer = {
                                logo: widget.data.logo,
                                mark: widget.data.mark
                            };
                            return `
                            <!-- Footer -->
    <footer class="footer bg-secondary pt-5 pb-4 pb-lg-5">
      <div class="container pt-lg-4">
        <div class="row pb-5">
          <div class="col-lg-4 col-md-6">
            <div class="navbar-brand text-dark p-0 me-0 mb-3 mb-lg-4">
              <img src="${footer.logo}" width="47" alt="Silicon">
              ${footer.mark}
            </div>
            <p class="fs-sm pb-lg-3 mb-4">Proin ipsum pharetra, senectus eget scelerisque varius pretium platea velit. Lacus, eget eu vitae nullam proin turpis etiam mi sit. Non feugiat feugiat egestas nulla nec. Arcu tempus, eget elementum dolor ullamcorper sodales ultrices eros.</p>
            <form class="needs-validation" novalidate>
              <label for="subscr-email" class="form-label">Subscribe to our newsletter</label>
              <div class="input-group">
                <input type="email" id="subscr-email" class="form-control rounded-start ps-5" placeholder="Your email" required>
                <i class="bx bx-envelope fs-lg text-muted position-absolute top-50 start-0 translate-middle-y ms-3 zindex-5"></i>
                <div class="invalid-tooltip position-absolute top-100 start-0">Please provide a valid email address.</div>
                <button type="submit" class="btn btn-primary">Subscribe</button>
              </div>
            </form>
          </div>
          <div class="col-xl-6 col-lg-7 col-md-5 offset-xl-2 offset-md-1 pt-4 pt-md-1 pt-lg-0">
            <div id="footer-links" class="row">
              <div class="col-lg-4">
                <h6 class="mb-2">
                  <a href="#useful-links" class="d-block text-dark dropdown-toggle d-lg-none py-2" data-bs-toggle="collapse">Useful Links</a>
                </h6>
                <div id="useful-links" class="collapse d-lg-block" data-bs-parent="#footer-links">
                  <ul class="nav flex-column pb-lg-1 mb-lg-3">
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Home</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">About</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Services</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Prices</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">News</a></li>
                  </ul>
                  <ul class="nav flex-column mb-2 mb-lg-0">
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Terms &amp; Conditions</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-lg-3">
                <h6 class="mb-2">
                  <a href="#social-links" class="d-block text-dark dropdown-toggle d-lg-none py-2" data-bs-toggle="collapse">Socials</a>
                </h6>
                <div id="social-links" class="collapse d-lg-block" data-bs-parent="#footer-links">
                  <ul class="nav flex-column mb-2 mb-lg-0">
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Facebook</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">LinkedIn</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Twitter</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Instagram</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-lg-5 pt-2 pt-lg-0">
                <h6 class="mb-2">Contact Us</h6>
                <a href="mailto:email@example.com" class="fw-medium">email@example.com</a>
              </div>
            </div>
          </div>
        </div>
        <p class="nav d-block fs-xs text-center text-md-start pb-2 pb-lg-0 mb-0">
          &copy; All rights reserved. Made by 
          <a class="nav-link d-inline-block p-0" href="https://createx.studio/" target="_blank" rel="noopener">Createx Studio</a>
        </p>
      </div>
    </footer>


    <!-- Back to top button -->
    <a href="#top" class="btn-scroll-top" data-scroll>
      <span class="btn-scroll-top-tooltip text-muted fs-sm me-2">Top</span>
      <i class="btn-scroll-top-icon bx bx-chevron-up"></i>
    </a>
                            `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '基本資訊',
                            data: widget.data.outro,
                            innerText: () => {
                                return `${glitter.htmlGenerate.editeInput({
                                    gvc: gvc,
                                    title: '左大標題',
                                    default: widget.data.outro.title,
                                    placeHolder: '請輸入左大標題',
                                    callback: (text) => {
                                        widget.data.outro.title = text;
                                        widget.refreshComponent();
                                    },
                                })}` +
                                    `
                                ${glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: '左大標敘文',
                                        default: widget.data.outro.desc,
                                        placeHolder: '請輸入左大標下方的描述文',
                                        callback: (text) => {
                                            widget.data.outro.desc = text;
                                            widget.refreshComponent();
                                        },
                                    })}
                                ` +
                                    Editor.arrayItem({
                                        originalArray: widget.data.outro,
                                        gvc: gvc,
                                        title: '行內資訊',
                                        array: widget.data.outro.socialData.link.map((socialData, index) => {
                                            return {
                                                title: `第${index + 1}個社群資訊`,
                                                expand: widget.data.outro.socialData,
                                                innerHtml: glitter.htmlGenerate.editeInput({
                                                    gvc: gvc,
                                                    title: '社群網址',
                                                    default: "",
                                                    placeHolder: `請輸入社群網站的網址`,
                                                    callback: (text) => {
                                                        socialData = text;
                                                        widget.refreshComponent();
                                                    }
                                                }),
                                                minus: gvc.event(() => {
                                                    widget.data.outro.socialData.link.splice(index, 1);
                                                    widget.refreshComponent();
                                                }),
                                            };
                                        }),
                                        expand: widget.data.outro.socialData,
                                        plus: {
                                            title: '添加區塊',
                                            event: gvc.event(() => {
                                                widget.data.outro.socialData.link.push("");
                                                widget.refreshComponent();
                                            }),
                                        },
                                        refreshComponent: () => {
                                            widget.refreshComponent();
                                        }
                                    });
                            }
                        }),
                        `<div class="mt-2"></div>`,
                        Editor.arrayItem({
                            originalArray: widget.data.map,
                            gvc: gvc,
                            title: '中間資訊',
                            array: widget.data.map.map((lineData, index) => {
                                return {
                                    title: `第${index + 1}行資訊`,
                                    expand: lineData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '行名',
                                            default: lineData.title,
                                            placeHolder: '這行連結資料的大標',
                                            callback: (text) => {
                                                lineData.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.arrayItem({
                                            originalArray: lineData,
                                            gvc: gvc,
                                            title: '行內資訊',
                                            array: lineData.listData.list.map((rowData, rowIndex) => {
                                                return {
                                                    title: `第${rowIndex + 1}列資訊`,
                                                    expand: rowData,
                                                    innerHtml: gvc.map([
                                                        `
                                                    <div class="ps-2 pt-2 mb-3 border" style="">
                                                        <h5>第${rowIndex + 1}列</h5>
                                                    `,
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: '連結名稱',
                                                            default: rowData.name,
                                                            placeHolder: '請描述此連結的顯示資訊',
                                                            callback: (text) => {
                                                                rowData.name = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                        ClickEvent.editer(gvc, widget, rowData.link, {
                                                            hover: true,
                                                            option: [],
                                                            title: "這個連結做的事情"
                                                        })
                                                    ]),
                                                    minus: gvc.event(() => {
                                                        lineData.listData.list.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: lineData.listData,
                                            plus: {
                                                title: '添加區塊',
                                                event: gvc.event(() => {
                                                    lineData.listData.list.push({ name: '', link: {} });
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent: () => {
                                                widget.refreshComponent();
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        lineData.listData.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.map,
                            plus: {
                                title: '添加行數',
                                event: gvc.event(() => {
                                    widget.data.map.push({ title: '', listData: { list: [] } });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                        `<div class="mt-2"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '右端資訊',
                            data: widget.data.subs,
                            innerText: () => {
                                return `${glitter.htmlGenerate.editeText({
                                    gvc: gvc,
                                    title: '訂閱資訊',
                                    default: widget.data.subs.desc,
                                    placeHolder: '請輸入訂閱的介紹文',
                                    callback: (text) => {
                                        widget.data.subs.desc = text;
                                        widget.refreshComponent();
                                    },
                                })}` +
                                    `
                                    ${glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '送出的目的地',
                                        default: widget.data.subs.link,
                                        placeHolder: '請輸入左大標下方的描述文',
                                        callback: (text) => {
                                            widget.data.subs.link = text;
                                            widget.refreshComponent();
                                        },
                                    })}
                                `;
                            }
                        })
                    ]);
                }
            };
        },
    };
});
