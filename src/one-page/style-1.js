import { Plugin } from '../glitterBundle/plugins/plugin-creater.js';
import { Editor } from '../editor.js';
import { ClickEvent } from '../glitterBundle/plugins/click-event.js';
Plugin.create(import.meta.url, (glitter, editMode) => {
    function getRout(link) {
        return new URL('./' + link, import.meta.url).href;
    }
    let hi = false;
    function initialScript(gvc, widget) {
        if (hi) {
            return;
        }
        hi = true;
        window.mode = 'dark';
        window.root = document.getElementsByTagName('html')[0];
        window.root.classList.add('dark-mode');
        gvc.addStyleLink([
            getRout('assets/vendor/boxicons/css/boxicons.min.css'),
            getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            getRout('assets/css/theme.min.css'),
            getRout('app.css'),
        ]).then();
        gvc.addMtScript([
            { src: 'https://kit.fontawesome.com/02e2dc09e3.js' },
            { src: getRout(`assets/js/isotope.pkgd.min.js`) },
            { src: getRout(`assets/js/tgs-player.js`) },
            { src: getRout(`assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js`) },
            { src: getRout(`assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js`) },
            { src: getRout(`assets/vendor/jarallax/dist/jarallax.min.js`) },
            { src: getRout(`assets/vendor/swiper/swiper-bundle.min.js`) },
            { src: getRout(`assets/vendor/shufflejs/dist/shuffle.min.js`) },
            { src: getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`) },
            { src: getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`) },
            { src: getRout(`assets/js/theme.min.js`) },
            { src: getRout(`assets/js/main.js`) },
        ], () => {
            try {
                widget.refreshComponent();
            }
            catch (e) { }
        }, () => { });
    }
    return {
        topNav: {
            title: '網站導覽列',
            subContent: '顯示多個超連結與頁面跳轉導覽的區塊．',
            defaultData: {
                nav: {},
            },
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
                widget.data.nav = widget.data.nav ?? {};
                widget.data.nav.logo = {
                    url: widget.data.nav.logo.url ?? `https://squarestudio.tw/LionDesign/page/plugin/lionDesign/img/index/logo.svg`,
                    style: widget.data.nav.logo.style ?? '',
                };
                widget.data.nav.title = widget.data.nav.title ?? {
                    pc: `萊恩設計`,
                    phone: `萊恩設計`,
                };
                widget.data.nav.bar = widget.data.nav.bar ?? {
                    home: true,
                    list: [
                        { name: '客製化服務項目', link: '#price' },
                        { name: '模板瀏覽', link: ['template'] },
                        { name: '方案價格', link: '#price' },
                        { name: '作品案例', link: '#project' },
                        { name: '關於我們', link: '#team' },
                        { name: '聯絡資訊', link: '#contact' },
                    ],
                };
                widget.data.nav.btn = widget.data.nav.btn ?? {
                    class: 'outline-primary',
                    name: '星澄基地',
                    link: '',
                    visible: true,
                };
                const nav = {
                    logo: widget.data.nav.logo,
                    title: widget.data.nav.title,
                    bar: widget.data.nav.bar,
                    btn: widget.data.nav.btn,
                };
                return {
                    view: () => {
                        function recursive(r, first) {
                            var h = '';
                            if (r.list === undefined || r.list.length === 0) {
                                h += `<li>
                                    <a
                                        class="${first ? 'nav-link text-white' : 'dropdown-item'} ${typeof r.link === 'object' && first ? r.link[0] : ``}"
                                        onclick="${gvc.event(() => {
                                    $('#navbarNav').offcanvas('hide');
                                    if (r.link) {
                                        ClickEvent.trigger({ gvc, widget, clickEvent: r });
                                    }
                                })}"
                                        style="cursor:pointer"
                                        name="${typeof r.link === 'string' ? r.link.replace('#', '') : ``}"
                                        >${r.name}</a
                                    >
                                </li>`;
                            }
                            else {
                                h += `<li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">${r.name}</a>
                                    <ul class="dropdown-menu">
                                        ${glitter.print(function () {
                                    var tmp = '';
                                    r.list.map((r2) => (tmp += recursive(r2)));
                                    return tmp;
                                })}
                                    </ul>
                                </li>`;
                            }
                            return h;
                        }
                        return `

                        <header class="position-fixed header navbar navbar-expand-lg navbar-light bg-light navbar-sticky w-100" style="z-index:5;top: 0px;">
          <div class="container px-3">
            <a class="navbar-brand fs-lg pe-0 pe-sm-3" onclick="${gvc.event(() => {
                            const url = new URL('./', location.href);
                            url.searchParams.set('page', 'home');
                            location.href = url.href;
                        })}" style="cursor:pointer">
              <img class="me-2" src="${nav.logo.url}" width="30" style="${nav.logo.style}" />${glitter.ut.frSize({ sm: nav.title.pc }, nav.title.phone)}
            </a>
                 ${nav.btn.visible
                            ? `<button
                               class="btn ${nav.btn.class}   d-md-none kv-btn w-25 position-absolute"
                               onclick="${gvc.event(() => {
                                ClickEvent.trigger({
                                    gvc,
                                    widget,
                                    clickEvent: nav.btn,
                                });
                            })}"
                               style="cursor:pointer;width: 100px;right: 60px;height: 40px;${nav.btn.style ?? ''}"
                           >
                               &nbsp;${nav.btn.name}
                           </button>`
                            : ``}
       
            <div id="navbarNav" class="offcanvas offcanvas-end">
              <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title">${nav.title.pc ?? nav.title.phone}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <!-- Menu -->
                  ${glitter.print(function () {
                            var tmp = '';
                            nav.bar.list.map((r) => (tmp += recursive(r, true)));
                            return tmp;
                        })}
                </ul>
              </div>
              <div class="offcanvas-footer border-top">
                <!-- Menu button -->
                 ${nav.btn.visible
                            ? `<a
                               class="btn ${nav.btn.class} w-100 mt-2"
                               onclick="${gvc.event(() => {
                                ClickEvent.trigger({
                                    gvc,
                                    widget,
                                    clickEvent: nav.btn,
                                });
                            })}"
                               style="cursor:pointer;${nav.btn.style ?? ''}"
                           >
                               &nbsp;${nav.btn.name}
                           </a>`
                            : ``}
              </div>
            </div>
            <div class="row">
              <!-- Menu button (Mobile) -->
           <div class="col-6">
           ${nav.btn.visible
                            ? `  <a
                        class="btn ${nav.btn.class} btn-sm fs-sm rounded d-none d-lg-inline-flex "
                        onclick="${gvc.event(() => {
                                ClickEvent.trigger({
                                    gvc,
                                    widget,
                                    clickEvent: nav.btn,
                                });
                            })}"
                        style="cursor:pointer;${nav.btn.style ?? ''}"
                      >
                        &nbsp;${nav.btn.name}
                      </a>`
                            : ``}
                    
                    </div>
            </div>
            <button
              type="button"
              class="navbar-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </header>
                    <div class="w-100" style="height: 50px;"></div>
                        `;
                    },
                    editor: () => {
                        widget.data.nav.btnExpand = widget.data.nav.btnExpand ?? {};
                        return gvc.map([
                            Editor.uploadImage({
                                gvc: gvc,
                                title: `Logo圖片`,
                                def: widget.data.nav.logo.url,
                                callback: (e) => {
                                    widget.data.nav.logo.url = e;
                                    widget.refreshComponent();
                                },
                            }),
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: 'Logo Style',
                                default: widget.data.nav.logo.style ?? '',
                                placeHolder: '輸入按鈕Style',
                                callback: (text) => {
                                    widget.data.nav.logo.style = text;
                                    widget.refreshComponent();
                                },
                            }),
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: '標題設定',
                                data: widget.data.nav.title,
                                innerText: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '電腦版標題',
                                        default: widget.data.nav.title.pc,
                                        placeHolder: '輸入電腦版標題',
                                        callback: (text) => {
                                            widget.data.nav.title.pc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '手機版標題',
                                        default: widget.data.nav.title.phone,
                                        placeHolder: '輸入電腦版標題',
                                        callback: (text) => {
                                            widget.data.nav.title.phone = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                ]),
                            }),
                            `<div class="my-2" style="background: #2F3296FF"></div>`,
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: '重點按鈕',
                                data: widget.data.nav.btnExpand,
                                innerText: gvc.map([
                                    `
                                    ${Editor.h3('是否可見')}
                                    <select  class="form-control form-select" onchange="${gvc.event((e) => {
                                        widget.data.nav.btn.visible = e.value === 'yes';
                                        widget.refreshComponent();
                                    })}">
                                    <option value="yes" ${!widget.data.nav.btn.visible || 'selected'} >是</option>
                                    <option value="no" ${widget.data.nav.btn.visible || 'selected'}>否</option>
</select>
                                    `,
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: '按鈕名稱[HTML]',
                                        default: widget.data.nav.btn.name,
                                        placeHolder: '輸入按鈕名稱',
                                        callback: (text) => {
                                            widget.data.nav.btn.name = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '按鈕Class',
                                        default: widget.data.nav.btn.class,
                                        placeHolder: '輸入按鈕Class',
                                        callback: (text) => {
                                            widget.data.nav.btn.class = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: '按鈕Style',
                                        default: widget.data.nav.btn.style ?? '',
                                        placeHolder: '輸入按鈕Style',
                                        callback: (text) => {
                                            widget.data.nav.btn.style = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    ClickEvent.editer(gvc, widget, widget.data.nav.btn, {
                                        hover: true,
                                        option: [],
                                        title: '點擊事件',
                                    }),
                                ]),
                            }),
                            `<div class="my-2"></div>`,
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: '連結導覽',
                                data: widget.data.nav.btnExpand2 || (widget.data.nav.btnExpand2 = {}),
                                innerText: (() => {
                                    function recursion(data, first) {
                                        if (!data.list || data.list.length === 0) {
                                            data.list = [];
                                            return Editor.plusBtn(first ? `添加連結` : '添加子連結', gvc.event(() => {
                                                data.list.push({ name: '連結名稱', link: '' });
                                                widget.refreshComponent();
                                            }));
                                        }
                                        const innerHtml = data.list
                                            .map((dd, index) => {
                                            return Editor.toggleExpand({
                                                gvc: gvc,
                                                title: `<div class="d-flex align-items-center">
                                                            <i
                                                                class="fa-regular fa-circle-minus text-danger me-2"
                                                                style="font-size: 20px;cursor: pointer;"
                                                                onclick="${gvc.event(() => {
                                                    data.list.splice(index, 1);
                                                    widget.refreshComponent();
                                                })}"
                                                            ></i>
                                                            ${dd.name || `連結:${index + 1}`}
                                                        </div>`,
                                                data: dd,
                                                innerText: gvc.map([
                                                    glitter.htmlGenerate.editeInput({
                                                        gvc: gvc,
                                                        title: '連結標題',
                                                        default: dd.name,
                                                        placeHolder: '請輸入連結標題',
                                                        callback: (text) => {
                                                            dd.name = text;
                                                            widget.refreshComponent();
                                                        },
                                                    }),
                                                    (() => {
                                                        if (dd.list && dd.list.length > 0) {
                                                            return ``;
                                                        }
                                                        else {
                                                            return ClickEvent.editer(gvc, widget, dd, {
                                                                hover: true,
                                                                option: [],
                                                                title: '點擊事件',
                                                            });
                                                        }
                                                    })(),
                                                    recursion(dd, false),
                                                ]),
                                                color: first ? `#004081` : `#0062c0`,
                                            });
                                        })
                                            .join('<div class="my-2"></div>') +
                                            Editor.plusBtn(first ? `添加連結` : '添加子連結', gvc.event(() => {
                                                data.list.push({ name: '連結名稱', link: '' });
                                                widget.refreshComponent();
                                            }));
                                        if (!first) {
                                            data.children = data.children ?? {};
                                            return `
                                            <div class="ms-1 border p-2 mt-2" style="border: white;border-radius: 5px;">
                                            ${Editor.toggleExpand({
                                                gvc: gvc,
                                                title: '子連結',
                                                data: data.children,
                                                innerText: innerHtml,
                                                color: `#004081`,
                                            })}</div>
                                            `;
                                        }
                                        else {
                                            return innerHtml;
                                        }
                                    }
                                    return recursion(nav.bar, true);
                                })(),
                                color: `#0062c0`,
                            }),
                        ]);
                    },
                };
            },
        },
        topBanner: {
            title: '廣告輪播',
            subContent: '顯示廣告Banner的置頂大圖',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                widget.data.mobile = widget.data.mobile ?? {
                    m: {
                        img: getRout('img/index/mobile-kv.png'),
                        title: 'Web & APP Design',
                        desc: '多樣主題網頁模板及 Android 、 iOS 雙平台開發<br />打造專屬應用程式與網站',
                        lottie: 'https://assets5.lottiefiles.com/packages/lf20_zxau6gfz.json',
                        btn: [],
                    },
                };
                widget.data.desktop = widget.data.desktop ?? {
                    l: {
                        img: getRout('img/index/web-kv.png'),
                        title: 'Web',
                        desc: '單頁式 RWD 網頁，眾多主流模板可供您選擇',
                        lottie: {
                            json: 'https://assets2.lottiefiles.com/packages/lf20_jtupaj9e.json',
                            size: 300,
                        },
                        text: '10 種以上風格、主題豐富多樣<br>最低只要 7,800 元起',
                        btn: { name: '了解主題模板', link: ['template'] },
                    },
                    r: {
                        img: getRout('img/index/app-kv.png'),
                        title: 'APP',
                        desc: 'IoT、藍芽傳遞、社群平台，任何主題都能打造專屬應用程式',
                        lottie: {
                            json: 'https://assets1.lottiefiles.com/packages/lf20_wloxwco0.json',
                            size: 320,
                        },
                        text: '傾聽用戶的需求與設計<br>同時支援 Android 與 iOS 雙平台',
                        btn: { name: '觀看作品案例', link: '#project' },
                    },
                };
                initialScript(gvc, widget);
                return {
                    view: () => {
                        const keyVision2 = {
                            l: widget.data.desktop.l,
                            r: widget.data.desktop.r,
                            m: widget.data.mobile.m,
                        };
                        return `  <section id="keyVision2">
          <!-- Web View -->
          <div class="d-none d-md-flex " style="">
            <div class="kv2 vh-100" style="background-image:url(${keyVision2.l.img})">
              <div class="kv2-text">
                <h1 data-aos="fade-down" data-aos-delay="200" data-aos-duration="1000">${keyVision2.l.title}</h1>
                <h2 data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">「${keyVision2.l.desc}」</h2>
                <div class="row pe-5" data-aos="fade-right" data-aos-delay="800" data-aos-duration="1000">
                  <div class="col-12 col-lg-6 d-flex justify-content-end">
                    <lottie-player
                      autoplay
                      loop
                      mode="normal"
                      src="${keyVision2.l.lottie.json}"
                      style="width: ${keyVision2.l.lottie.size}px;"
                    >
                    </lottie-player>
                  </div>
                  <div class="col-12 col-lg-6 kv-2-word">
                    <h3>${keyVision2.l.text}</h3>
                    <button
                      class="btn btn-danger mt-3 w-50 fs-5 kv-btn ${glitter.htmlGenerate.styleEditor(keyVision2.l.btn).class()}"
                      onclick="${gvc.event(() => {
                            ClickEvent.trigger({
                                gvc,
                                widget,
                                clickEvent: keyVision2.l.btn,
                            });
                        })}"
                      style="cursor:pointer ${glitter.htmlGenerate.styleEditor(keyVision2.l.btn).style()}"
                    >
                      ${keyVision2.l.btn.name}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="kv2 vh-100" style="background-image:url(${keyVision2.r.img})">
              <div class="kv2-text">
                <h1 data-aos="fade-down" data-aos-delay="400" data-aos-duration="1000">${keyVision2.r.title}</h1>
                <h2 data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">「${keyVision2.r.desc}」</h2>
                <div class="row ps-5" data-aos="fade-left" data-aos-delay="800" data-aos-duration="1000">
                  <div class="col-12 col-lg-6 kv-2-word">
                    <h3>${keyVision2.r.text}</h3>
                    <button
                      class="btn btn-primary mt-3 w-50 fs-5 kv-btn ${glitter.htmlGenerate.styleEditor(keyVision2.r.btn).class()}"
                      onclick="${gvc.event(() => {
                            ClickEvent.trigger({
                                gvc,
                                widget,
                                clickEvent: keyVision2.r.btn,
                            });
                        })}"
                      style="cursor:pointer;${glitter.htmlGenerate.styleEditor(keyVision2.r.btn).style()}"
                    >
                      ${keyVision2.r.btn.name}
                    </button>
                  </div>
                  <div class="col-12 col-lg-6">
                    <lottie-player
                      autoplay
                      loop
                      mode="normal"
                      src="${keyVision2.r.lottie.json}"
                      style="width: ${keyVision2.r.lottie.size}px;"
                    >
                    </lottie-player>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Moblie View -->
          <div class="d-flex d-md-none">
            <div class="kv2" style="background-image:url(${keyVision2.m.img})">
              <div class="kv2-text">
                <h1 data-aos="fade-down" data-aos-delay="200" data-aos-duration="1000" style="word-break: break-word;white-space: normal;">${keyVision2.m.title}</h1>

                <div
                  class="col-12 col-lg-12 mt-4 ps-3 d-flex justify-content-center"
                  data-aos="fade-up"
                  data-aos-delay="600"
                  data-aos-duration="1000"
                >
                <img src="">
                ${keyVision2.m.lottie.split('.').pop() === 'json'
                            ? `
                <lottie-player autoplay loop mode="normal" src="${keyVision2.m.lottie}" style="height: 32vh;width: 32vh;">`
                            : `
                <img src="${keyVision2.m.lottie}" style="height: 32vh;width: 32vh;">`}
                  
                  </lottie-player>
                </div>

                <h2 data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">${keyVision2.m.desc}</h2>

                <div class="mt-5 d-flex justify-content-evenly">
                ${keyVision2.m.btn
                            .map((dd) => {
                            return `<button
                            class="btn btn-primary kv-btn ${glitter.htmlGenerate.styleEditor(dd).class()}"
                            onclick="${gvc.event(() => {
                                ClickEvent.trigger({
                                    gvc,
                                    widget,
                                    clickEvent: dd,
                                });
                            })}"
                            style="${glitter.htmlGenerate.styleEditor(dd).style()}"
                        >
                            ${dd.title}
                        </button>`;
                        })
                            .join('')}
                </div>
              </div>
            </div>
          </div>
        </section>`;
                    },
                    editor: () => {
                        widget.data.mobile.m.btnExpand = widget.data.mobile.m.btnExpand ?? {};
                        widget.data.mobile.m.btn = widget.data.mobile.m.btn ?? [];
                        function getDBlock(data) {
                            return [
                                Editor.uploadImage({
                                    gvc: gvc,
                                    title: `背景圖`,
                                    def: data.img,
                                    callback: (dd) => {
                                        data.img = data;
                                        widget.refreshComponent();
                                    },
                                }),
                                glitter.htmlGenerate.editeInput({
                                    gvc: gvc,
                                    title: '標題[HTML]',
                                    default: data.title,
                                    placeHolder: '標題',
                                    callback: (text) => {
                                        data.title = text;
                                        widget.refreshComponent();
                                    },
                                }),
                                glitter.htmlGenerate.editeText({
                                    gvc: gvc,
                                    title: '描述[HTML]',
                                    default: data.desc,
                                    placeHolder: '描述',
                                    callback: (text) => {
                                        data.title = text;
                                        widget.refreshComponent();
                                    },
                                }),
                                Editor.uploadLottie({
                                    gvc: gvc,
                                    title: `圖片或Lottie動畫區塊`,
                                    def: data.lottie.json,
                                    callback: (text) => {
                                        data.lottie.json = text;
                                        widget.refreshComponent();
                                    },
                                }),
                                glitter.htmlGenerate.editeInput({
                                    gvc: gvc,
                                    title: '尺寸[單位px]',
                                    default: data.lottie.size,
                                    placeHolder: '尺寸',
                                    callback: (text) => {
                                        data.lottie.size = text;
                                        widget.refreshComponent();
                                    },
                                }),
                                glitter.htmlGenerate.editeText({
                                    gvc: gvc,
                                    title: '子標題[HTML]',
                                    default: data.text,
                                    placeHolder: '子標題',
                                    callback: (text) => {
                                        data.text = text;
                                        widget.refreshComponent();
                                    },
                                }),
                                `<div class="alert-dark alert p-2 mt-2">
                                    ${Editor.h3('按鈕設定')}
                                    ${glitter.htmlGenerate.editeText({
                                    gvc: gvc,
                                    title: '標題',
                                    default: data.btn.name,
                                    placeHolder: '標題',
                                    callback: (text) => {
                                        data.btn.name = text;
                                        widget.refreshComponent();
                                    },
                                })}
                                    ${glitter.htmlGenerate.styleEditor(data.btn).editor(gvc, widget)}
                                    ${ClickEvent.editer(gvc, widget, data.btn, {
                                    hover: true,
                                    option: [],
                                    title: '點擊事件',
                                })}
                                </div>`,
                            ];
                        }
                        return gvc.map([
                            `<div class="mt-2"></div>`,
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: '手機版',
                                data: widget.data.mobile.m,
                                innerText: gvc.map([
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: '標題[HTML]',
                                        default: widget.data.mobile.m.title,
                                        placeHolder: '標題',
                                        callback: (text) => {
                                            widget.data.mobile.m.title = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: '子標題[HTML]',
                                        default: widget.data.mobile.m.desc,
                                        placeHolder: '子標題',
                                        callback: (text) => {
                                            widget.data.mobile.m.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    Editor.uploadLottie({
                                        gvc: gvc,
                                        title: `圖片或Lottie動畫區塊`,
                                        def: widget.data.mobile.m.lottie,
                                        callback: (data) => {
                                            widget.data.mobile.m.lottie = data;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: `背景圖`,
                                        def: widget.data.mobile.m.img,
                                        callback: (data) => {
                                            widget.data.mobile.m.img = data;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    Editor.toggleExpand({
                                        gvc: gvc,
                                        title: '按鈕集',
                                        data: widget.data.mobile.m.btnExpand,
                                        innerText: widget.data.mobile.m.btn
                                            .map((data, index) => {
                                            return gvc.map([
                                                Editor.minusTitle('按鈕:' + (index + 1), gvc.event(() => {
                                                    widget.data.mobile.m.btn.splice(index, 1), widget.refreshComponent();
                                                })),
                                                glitter.htmlGenerate.styleEditor(data).editor(gvc, widget),
                                                glitter.htmlGenerate.editeText({
                                                    gvc: gvc,
                                                    title: '按鈕名稱[HTML]',
                                                    default: data.title,
                                                    placeHolder: '輸入按鈕名稱',
                                                    callback: (text) => {
                                                        data.title = text;
                                                        widget.refreshComponent();
                                                    },
                                                }),
                                                ClickEvent.editer(gvc, widget, data, {
                                                    hover: true,
                                                    option: [],
                                                    title: '點擊事件',
                                                }),
                                            ]);
                                        })
                                            .join('') +
                                            Editor.plusBtn('添家按鈕', gvc.event(() => {
                                                widget.data.mobile.m.btn.push({
                                                    title: ``,
                                                });
                                                widget.refreshComponent();
                                            })),
                                        color: `#0062c0`,
                                    }),
                                ]),
                            }),
                            `<div class="mt-2" style="color: #272993;"></div>`,
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: '電腦版',
                                data: widget.data.desktop,
                                innerText: [
                                    Editor.toggleExpand({
                                        gvc: gvc,
                                        title: '左側區塊',
                                        data: widget.data.desktop.l,
                                        innerText: gvc.map(getDBlock(widget.data.desktop.l)),
                                        color: `#272993FF`,
                                    }),
                                    Editor.toggleExpand({
                                        gvc: gvc,
                                        title: '右側區塊',
                                        data: widget.data.desktop.r,
                                        innerText: gvc.map(getDBlock(widget.data.desktop.r)),
                                        color: `#272993FF`,
                                    }),
                                ].join(`<div class="my-2"></div>`),
                            }),
                        ]);
                    },
                };
            },
        },
        price: {
            title: '服務價位',
            subContent: '顯示服務價位，與瞭解更多的按鈕．',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
                widget.data.main = widget.data.main ?? {
                    title: '品牌形象官方網站',
                    list: ['Bootstrap 4, 5', '單頁式 RWD 網站', '多種 Icon 設計', '只需輸入資料，即可快速建立', '多種模板、多個頁面元件'],
                    price: { num: 7800, unit: '元 / 個' },
                    btn: { name: '了解更多', link: ['price_detail'] },
                    lottie: 'https://assets8.lottiefiles.com/packages/lf20_wqd1jwoz.json',
                };
                widget.data.sub = widget.data.sub ?? {
                    title: '系統網站與應用程式開發',
                    list: ['Web、Android App、iOS App', 'UI / UX 設計', '前後台系統', '客製化用戶需求', '金流串接、自動寄送郵件'],
                    price: { num: 30000, unit: '元起' },
                    btn: { name: '了解更多', link: ['price_detail'] },
                };
                widget.data.bg = widget.data.bg ?? getRout('img/index/price-bg.jpg');
                const price = {
                    main: widget.data.main,
                    sub: widget.data.sub,
                    bg: widget.data.bg,
                };
                return {
                    view: () => {
                        return `<section
        id="price"
        class="jarallax dark-mode bg-dark py-xxl-5 d-flex align-items-center justify-content-center"
        data-jarallax
        data-speed="0.4"
        ${glitter.ut.frSize({ lg: `style="height:100vh"` }, ``)}
      >
        <span class="position-absolute top-0 start-0 w-100 h-100 bg-gradient-dark-translucent"></span>
        <div class="jarallax-img" style="background-image: url(${price.bg})"></div>
        <div class="row w-100 mx-lg-5 my-3 px-3 px-xl-5 d-flex justify-content-center">
          <div class="col-12 col-lg-8 card card-price">
            <h2>${price.main.title}</h2>
            <div class="row">
              <div class="col-12 col-lg-6 mt-2">
                <ul class="mb-4">
                  ${glitter.print(function () {
                            var tmp = '';
                            price.main.list.map((l) => (tmp += `<li>${l}</li> `));
                            return tmp;
                        })}
                </ul>
                <div class="dollar-line">
                  <sup>$</sup>
                  <span>${price.main.price.num}</span>
                  <sup>${price.main.price.unit}</sup>
                </div>
                <div class="text-center">
                  <button class="btn btn-dark mt-3 ${glitter.htmlGenerate.styleEditor(price.main.btn).class()}" 
                  onclick="${gvc.event(() => {
                            ClickEvent.trigger({
                                gvc,
                                widget,
                                clickEvent: price.main.btn,
                            });
                        })}" style="cursor:pointer;${glitter.htmlGenerate.styleEditor(price.main.btn).style()}">
                  ${price.main.btn.name}
                  </button>
                </div>
              </div>
              <div class="col-12 col-lg-6 d-flex justify-content-center">
              ${price.main.lottie.split('.').pop() === 'json'
                            ? `
                <lottie-player autoplay loop mode="normal" src="${price.main.lottie}" style="width: ${glitter.ut.frSize({ sm: 360 }, 200)}px;">`
                            : `
                <img src="${price.main.lottie}" style="width: ${glitter.ut.frSize({ sm: 360 }, 200)}px;">`}
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4 card card-price">
            ${glitter.ut.frSize({ sm: `<h3 class="mb-4">${price.sub.title}</h3>` }, `<h2>${price.sub.title}</h2>`)}
            <div class="d-flex flex-column"></div>
            <ul>
              ${glitter.print(function () {
                            var tmp = '';
                            price.sub.list.map((l) => (tmp += `<li style="list-style:none;">${l}</li> `));
                            return tmp;
                        })}
            </ul>
            <div class="dollar-line">
              <sup>$</sup>
              <span>${price.sub.price.num}</span>
              <sup>${price.sub.price.unit}</sup>
            </div>
            <div class="text-center">
               <button class="btn btn-dark mt-3 ${glitter.htmlGenerate.styleEditor(price.sub.btn).class()}" 
                  onclick="${gvc.event(() => {
                            ClickEvent.trigger({
                                gvc,
                                widget,
                                clickEvent: price.sub.btn,
                            });
                        })}" style="cursor:pointer;${glitter.htmlGenerate.styleEditor(price.sub.btn).style()}">
                  ${price.sub.btn.name}
                  </button>
            </div>
        </div>
      </section>`;
                    },
                    editor: () => {
                        function getData(data) {
                            return [
                                glitter.htmlGenerate.editeInput({
                                    gvc: gvc,
                                    title: '標題',
                                    default: data.title,
                                    placeHolder: '輸入按鈕名稱',
                                    callback: (text) => {
                                        data.title = text;
                                        widget.refreshComponent();
                                    },
                                }),
                                glitter.htmlGenerate.editeInput({
                                    gvc: gvc,
                                    title: '價格',
                                    default: data.price.num,
                                    placeHolder: '輸入價格',
                                    callback: (text) => {
                                        data.price.num = text;
                                        widget.refreshComponent();
                                    },
                                }),
                                glitter.htmlGenerate.editeInput({
                                    gvc: gvc,
                                    title: '單位',
                                    default: data.price.unit,
                                    placeHolder: '輸入單位',
                                    callback: (text) => {
                                        data.price.unit = text;
                                        widget.refreshComponent();
                                    },
                                }),
                                `<div class="alert-dark alert p-2 mt-2">
                                    ${Editor.h3('按鈕設定')}
                                    ${glitter.htmlGenerate.styleEditor(data.btn).editor(gvc, widget, '按鈕設計樣式')}
                                    ${glitter.htmlGenerate.editeText({
                                    gvc: gvc,
                                    title: '標題',
                                    default: data.btn.name,
                                    placeHolder: '標題',
                                    callback: (text) => {
                                        data.btn.name = text;
                                        widget.refreshComponent();
                                    },
                                })}
                                    ${ClickEvent.editer(gvc, widget, data.btn, {
                                    hover: true,
                                    option: [],
                                    title: '點擊事件',
                                })}
                                </div>`,
                                Editor.toggleExpand({
                                    gvc: gvc,
                                    title: '列表項目',
                                    data: data,
                                    innerText: data.list
                                        .map((data2, index) => {
                                        return glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `${Editor.minusTitle(`項目-${index + 1}`, gvc.event(() => {
                                                data.list.splice(index, 1);
                                                widget.refreshComponent();
                                            }))}`,
                                            default: data2,
                                            placeHolder: '輸入項目名稱',
                                            callback: (text) => {
                                                data.list[index] = text;
                                                widget.refreshComponent();
                                            },
                                        });
                                    })
                                        .join('') +
                                        Editor.plusBtn('新增項目', gvc.event(() => {
                                            data.list.push('新增項目');
                                            widget.refreshComponent();
                                        })),
                                    color: '#0062c0',
                                }),
                            ].join('');
                        }
                        return [
                            `<div class="mb-2"></div>`,
                            Editor.uploadImage({
                                gvc: gvc,
                                title: `背景圖`,
                                def: widget.data.bg,
                                callback: (data) => {
                                    widget.data.bg = data;
                                    widget.refreshComponent();
                                },
                            }),
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: '左側區塊',
                                data: widget.data.main,
                                innerText: Editor.uploadLottie({
                                    gvc: gvc,
                                    title: `圖片或Lottie動畫區塊`,
                                    def: widget.data.main.lottie,
                                    callback: (data) => {
                                        widget.data.main.lottie = data;
                                        widget.refreshComponent();
                                    },
                                }) + getData(widget.data.main),
                            }),
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: '右側區塊',
                                data: widget.data.sub,
                                innerText: getData(widget.data.sub),
                            }),
                        ].join('<div class="my-2"></div>');
                    },
                };
            },
        },
        service: {
            title: '服務區塊',
            subContent: '顯示服務區塊．',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
                widget.data.title = widget.data.title ?? '萊恩設計的服務';
                widget.data.desc =
                    widget.data.desc ??
                        '我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。<br /><br />或是想快速建立特定功能網站，自主管理頁面與功能，<a class="text-white" href= target="_blank" rel="noopener">「星澄基地」</a>會是您的好選擇';
                widget.data.list = widget.data.list ?? [
                    {
                        name: '電商應用',
                        link: ['service_detail'],
                        tab: 'shop',
                        icon: 'bx bx-store-alt',
                        desc: '從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務',
                    },
                    {
                        name: '資料視覺化',
                        link: ['service_detail'],
                        tab: 'dashboard',
                        icon: 'bx bxs-dashboard bx-flip-vertical',
                        desc: '無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現',
                    },
                    {
                        name: '企業管理',
                        link: ['service_detail'],
                        tab: 'erp',
                        icon: 'bx bx-buildings',
                        desc: '薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統',
                    },
                    {
                        name: '個人網站',
                        link: ['service_detail'],
                        tab: 'profile',
                        icon: 'bx bxl-blogger',
                        desc: '網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地',
                    },
                    {
                        name: '社群平台',
                        link: ['service_detail'],
                        tab: 'social',
                        icon: 'bx bx-shape-polygon',
                        desc: '學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境',
                    },
                    {
                        name: '線上課程網站',
                        link: ['service_detail'],
                        tab: 'course',
                        icon: 'bx bx-code-curly',
                        desc: '快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網',
                    },
                    {
                        name: '藍芽產品應用',
                        link: ['service_detail'],
                        tab: 'bluetooth',
                        icon: 'bx bx-bluetooth',
                        desc: '手機藍芽串接硬體設備，讀取/寫入特徵值，收聽藍芽廣播，已有豐富的業界開發經驗．',
                    },
                    {
                        name: '後台模組化服務',
                        link: ['service_detail'],
                        tab: 'bgunit',
                        icon: 'bx bx-unite',
                        desc: '透過我司自行開發的模組化系統[✨Glitter星澄基地]，既可能的增加網站靈活度，讓您能十分方便的自行更改介面設計與添加其功能．',
                    },
                ];
                widget.data.bg = widget.data.bg ?? getRout(`img/index/service-bg.jpg`);
                let service = {
                    title: widget.data.title,
                    desc: widget.data.desc,
                    list: widget.data.list,
                    bg: widget.data.bg,
                };
                return {
                    view: () => {
                        return `<section class="jarallax dark-mode bg-dark py-xxl-5" id="service">
                            <div class="jarallax-img opacity-25" style="background-image: url(${service.bg})"></div>
                            <div class="d-none d-lg-block" style="margin-top: -60px; padding-top: 60px"></div>
                            <div class="container py-5 py-lg-3">
                                <div class="row align-items-center pb-5 mb-lg-2">
                                    <div class="col-md-8 text-center text-md-start">
                                        <h2 class="h1 text-center text-md-start mb-lg-4 pt-1 pt-md-4">${service.title}</h2>
                                        <p class="mb-md-0 ${glitter.ut.frSize({ sm: 'fs-lg' }, '')}">${service.desc}</p>
                                    </div>
                                </div>
                                <div class="row row-cols-2 row-cols-md-2">
                                    <!-- Sevice grid -->
                                    ${glitter.print(function () {
                            var tmp = '';
                            service.list.map((s) => {
                                tmp += `
                                                <!-- Item -->
                                                <div class="col-xl-4 col-md-6 py-4 my-2 my-sm-3">
                                                    <a
                                                        class="card card-hover h-100 border-0 shadow-sm text-decoration-none pt-5 px-sm-3 px-md-0 px-lg-3 pb-sm-3 pb-md-0 pb-lg-3 ms-xl-2"
                                                        onclick="${gvc.event(() => { })}"
                                                        style="cursor:pointer"
                                                    >
                                                        <div class="card-body pt-3 px-2">
                                                            <div
                                                                class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3"
                                                            >
                                                                <i class="${s.icon} fs-2 d-block m-1" width="40"></i>
                                                            </div>
                                                            <h2 class="fs-lg d-inline-flex align-items-center">
                                                                ${s.name}
                                                                <i class="bx bx-right-arrow-circle text-primary fs-3 ms-2"></i>
                                                            </h2>
                                                            <p class="text-body mb-0" style="font-size:16px">${s.desc}</p>
                                                        </div>
                                                    </a>
                                                </div>
                                            `;
                            });
                            return tmp;
                        })}
                                </div>
                            </div>
                        </section>`;
                    },
                    editor: () => {
                        return gvc.map([
                            glitter.htmlGenerate.editeText({
                                gvc: gvc,
                                title: '標題[HTML]',
                                default: widget.data.title,
                                placeHolder: '輸入標題內容',
                                callback: (text) => {
                                    widget.data.title = text;
                                    widget.refreshComponent();
                                },
                            }),
                            glitter.htmlGenerate.editeText({
                                gvc: gvc,
                                title: '描述[HTML]',
                                default: widget.data.desc,
                                placeHolder: '輸入描述內容',
                                callback: (text) => {
                                    widget.data.desc = text;
                                    widget.refreshComponent();
                                },
                            }),
                            Editor.uploadImage({
                                gvc: gvc,
                                title: `背景圖`,
                                def: widget.data.bg,
                                callback: (data) => {
                                    widget.data.bg = data;
                                    widget.refreshComponent();
                                },
                            }),
                            `<div class="alert-dark alert">
                                ${widget.data.list
                                .map((dd, index) => {
                                return Editor.toggleExpand({
                                    gvc: gvc,
                                    title: dd.name || `項目:${index + 1}`,
                                    data: dd,
                                    innerText: gvc.map([
                                        Editor.fontawesome({
                                            gvc: gvc,
                                            title: '圖示',
                                            def: dd.icon,
                                            callback: (text) => {
                                                dd.icon = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '項目標題',
                                            default: dd.name,
                                            placeHolder: '項目標題',
                                            callback: (text) => {
                                                dd.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: '項目描述',
                                            default: dd.desc,
                                            placeHolder: '項目描述',
                                            callback: (text) => {
                                                dd.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                });
                            })
                                .join('<div class="my-2"></div>') +
                                Editor.plusBtn('添加項目', gvc.event(() => {
                                    widget.data.list.push({
                                        name: '電商應用',
                                        link: ['service_detail'],
                                        tab: 'shop',
                                        icon: 'bx bx-store-alt',
                                        desc: '從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務',
                                    });
                                }))}
                            </div>`,
                        ]);
                    },
                };
            },
        },
        project: {
            title: '案例參考',
            subContent: '顯示用戶案例參考列表',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
                widget.data.title = widget.data.title ?? '作品案例';
                widget.data.tag = widget.data.tag ?? [
                    {
                        style: `background-color:var(--bs-indigo);`,
                        class: ``,
                        title: `APP`,
                    },
                    {
                        style: `background-color:var(--bs-purple);`,
                        class: ``,
                        title: `後台系統`,
                    },
                    {
                        style: `background-color:var(--bs-orange);`,
                        class: ``,
                        title: `資料分析`,
                    },
                    {
                        style: `background-color:var(--bs-red);`,
                        class: ``,
                        title: `網頁設計`,
                    },
                ];
                widget.data.list = widget.data.list ?? [
                    {
                        title: '高雄醫藥大學',
                        sub: '高雄醫藥大學校友聯繫平台<br />(Android / iOS)',
                        tag: ['app', 'cms'],
                        img: getRout(`img/project/scholl.png`),
                        page: `project`,
                    },
                    {
                        title: '橙的電子',
                        sub: '胎壓偵測器之物聯網後台平台<br />(Web)',
                        tag: ['cms', 'dashboard', 'web'],
                        img: getRout('img/project/orangeback.png'),
                        page: `project`,
                    },
                    {
                        title: '緒玹科技',
                        sub: '外包媒合平台 (Android / iOS)',
                        tag: ['app'],
                        img: getRout('img/project/matching.png'),
                        page: `project`,
                    },
                    {
                        title: '御天科技',
                        sub: 'GOT-IT EIP (Android / iOS)',
                        tag: ['app'],
                        img: getRout('img/project/eip.png'),
                        page: `project`,
                    },
                    {
                        title: '緒玹科技',
                        sub: '外包媒合平台 (Web)',
                        tag: ['web'],
                        img: getRout('img/project/proshake_web.png'),
                        page: `project`,
                    },
                    {
                        title: 'Petstagram寵生活',
                        sub: '為寵物量身打造的社群媒體平台',
                        tag: ['app', 'web'],
                        img: getRout('img/project/Petstagram.jpg'),
                        page: `project`,
                    },
                    {
                        title: '橙的電子',
                        sub: 'Android 手持應用終端 Sensor 燒錄器',
                        tag: ['ble', 'app'],
                        img: getRout('img/project/pda.png'),
                        page: `project`,
                    },
                    {
                        title: '橙的電子',
                        sub: '後端數據分析平台',
                        tag: ['cms', 'dashboard', 'web'],
                        img: getRout('img/project/orange_backany.png'),
                        page: `project`,
                    },
                    {
                        title: '奇樂旅遊',
                        sub: '自媒體社群平台',
                        tag: ['web', 'app'],
                        img: getRout('img/project/phone.png'),
                        page: `project`,
                    },
                    {
                        title: '橙的電子',
                        sub: 'O-Genius Lite',
                        tag: ['ble'],
                        img: getRout('img/project/oglite_f03.png'),
                        page: `project`,
                    },
                    {
                        title: '緒玹科技',
                        sub: '訂單與薪資管理<br />(Android / iOS / Web)',
                        tag: ['cms', 'app', 'web'],
                        img: getRout('img/project/order.png'),
                        page: `project`,
                    },
                    {
                        title: '橙的電子',
                        sub: '胎壓偵測器之物聯網接收',
                        tag: ['app', 'ble'],
                        img: getRout('img/project/tpmsiot.png'),
                        page: `project`,
                    },
                    {
                        title: '橙的電子',
                        sub: 'USB-PAD藍芽無線燒錄器',
                        tag: ['app', 'ble'],
                        img: getRout('img/project/usbpad.png'),
                        page: `project`,
                    },
                    {
                        title: '星澄基地',
                        sub: '星澄基地，跨站式程式開發平台．',
                        tag: ['web', 'cms', 'dashboard'],
                        img: getRout('img/project/glitterp.png'),
                        page: `project`,
                    },
                    {
                        title: '星澄基地',
                        sub: '星澄基地，一站式後台管理平台．',
                        tag: ['web', 'cms', 'dashboard'],
                        img: getRout('img/project/bg_manager.png'),
                        page: `project`,
                    },
                    {
                        title: '萊恩設計',
                        sub: '官方形象網站',
                        tag: ['web'],
                        img: getRout('img/project/LionWeb.png'),
                        page: `project`,
                    },
                ];
                widget.data.bg = widget.data.bg ?? {};
                const project = {
                    title: widget.data.title,
                    tag: widget.data.tag,
                    list: widget.data.list,
                };
                project.list.map((data) => {
                    data.btn = data.btn ?? {
                        title: '前往查看',
                    };
                });
                return {
                    view: () => {
                        return `
${gvc.bindView(() => {
                            const swiperID = gvc.glitter.getUUID();
                            return {
                                bind: `project`,
                                view: () => {
                                    return `<h2 class="h1 pb-3 pb-lg-4 text-center">${project.title}</h2>
                <!-- Multiple slides responsive slider with external Prev / Next buttons and bullets outside -->
                <div class="position-relative px-xl-5">
                    <!-- Slider prev/next buttons -->
                    <button
                        type="button"
                        id="prev-news"
                        class="btn btn-prev btn-icon btn-sm position-absolute top-50 start-0 translate-middle-y d-none d-xl-inline-flex"
                    >
                        <i class="bx bx-chevron-left"></i>
                    </button>
                    <button
                        type="button"
                        id="next-news"
                        class="btn btn-next btn-icon btn-sm position-absolute top-50 end-0 translate-middle-y d-none d-xl-inline-flex"
                    >
                        <i class="bx bx-chevron-right"></i>
                    </button>
                    <!-- Slider -->
                    <div class="px-xl-2">
                        <div id="${swiperID}" class="swiper mx-n2">
                            <div class="swiper-wrapper">
                                ${glitter.print(function () {
                                        var tmp = '';
                                        project.list.map((l) => {
                                            tmp += `
                                            <!-- Item -->
                                            <div class="swiper-slide h-auto pb-3">
                                                <article class="card h-100 border-0 shadow-sm mx-2">
                                                    <div class="position-relative">
                                                        <div
                                                            style="background:url(${l.img});
                                    width: 100%;
                                    height: 350px;
                                    background-size:cover;
                                    background-position:center center;"
                                                        ></div>
                                                    </div>
                                                    <div class="card-body text-center d-flex flex-column">
                                                        <div class="d-flex align-items-center mb-3" style="gap: 10px;">
                                                            ${glitter.print(function () {
                                                var tmp = '';
                                                l.tag.map((t) => {
                                                    var tag = project.tag.find((g) => g.title == t);
                                                    if (tag) {
                                                        tmp += `
                                                                            <a
                                                                                class="badge fs-sm text-nav text-decoration-none ${glitter.htmlGenerate
                                                            .styleEditor(tag)
                                                            .class()}"
                                                                                style="
                                    ${glitter.htmlGenerate.styleEditor(tag).style()}
                                    "
                                                                                >${t}</a
                                                                            >
                                                                        `;
                                                    }
                                                });
                                                return tmp;
                                            })}
                                                        </div>
                                                        <div
                                                            class="h4 text-secondary mb-2 "
                                                            style="word-break: break-all;white-space: normal;"
                                                        >
                                                            <a>${l.title}</a>
                                                        </div>

                                                        <div class="fs-5 mb-2" style="word-break: break-all;white-space: normal;">
                                                            ${l.sub}
                                                        </div>

                                                        <div
                                                            class="btn btn-outline-light w-100 mt-auto ${glitter.htmlGenerate
                                                .styleEditor(l.btn)
                                                .class()}"
                                                            onclick="${gvc.event(() => {
                                                ClickEvent.trigger({
                                                    gvc,
                                                    widget,
                                                    clickEvent: l.btn,
                                                });
                                            })}"
                                                            style="cursor:pointer;${glitter.htmlGenerate.styleEditor(l.btn).style()}"
                                                        >
                                                            前往查看
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                        `;
                                        });
                                        return tmp;
                                    })}
                            </div>

                            <!-- Pagination (bullets) -->
                            <div class="swiper-pagination position-relative bottom-0 mt-4 mb-lg-2"></div>
                        </div>
                    </div>
                </div>`;
                                },
                                divCreate: {
                                    class: `container py-5 mb-2 mb-lg-4 ${glitter.htmlGenerate.styleEditor(widget.data.bg).class()}`,
                                    style: glitter.htmlGenerate.styleEditor(widget.data.bg).style(),
                                },
                                onCreate: () => {
                                    const swiper = new Swiper(`#${swiperID}`, {
                                        slidesPerView: 1,
                                        loop: true,
                                        pagination: {
                                            el: `#${swiperID} .swiper-pagination`,
                                            clickable: true,
                                        },
                                        navigation: {
                                            prevEl: '#prev-news',
                                            nextEl: '#next-news',
                                        },
                                        breakpoints: {
                                            '500': {
                                                slidesPerView: 2,
                                            },
                                            '1000': {
                                                slidesPerView: 3,
                                            },
                                        },
                                    });
                                },
                            };
                        })}
                        `;
                    },
                    editor: () => {
                        widget.data.tabExpand = widget.data.tabExpand ?? {};
                        return gvc.map([
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: '標題',
                                default: widget.data.title,
                                placeHolder: '標題',
                                callback: (text) => {
                                    widget.data.title = text;
                                    widget.refreshComponent();
                                },
                            }),
                            glitter.htmlGenerate.styleEditor(widget.data.bg).editor(gvc, () => {
                                widget.refreshComponent();
                            }, '背景設計樣式'),
                            `<div class="mb-2"></div>`,
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: `標籤設定`,
                                data: widget.data.tabExpand,
                                innerText: widget.data.tag
                                    .map((data, index) => {
                                    return Editor.toggleExpand({
                                        gvc: gvc,
                                        title: Editor.minusTitle(data.title || '標籤' + (index + 1), gvc.event(() => {
                                            widget.data.tag.splice(index, 1);
                                            widget.refreshComponent();
                                        })),
                                        data: data,
                                        innerText: gvc.map([
                                            glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: '標籤名稱',
                                                default: data.title,
                                                placeHolder: '標籤',
                                                callback: (text) => {
                                                    data.title = text;
                                                    widget.refreshComponent();
                                                },
                                            }),
                                            glitter.htmlGenerate.styleEditor(data).editor(gvc, data, '標籤設計樣式'),
                                        ]),
                                        color: `#004281`,
                                    });
                                })
                                    .join(`<div class="my-2"></div>`) +
                                    Editor.plusBtn('新增標籤', gvc.event(() => {
                                        widget.data.tag.push({
                                            style: `background-color:var(--bs-red);`,
                                            class: ``,
                                            title: `網頁設計`,
                                        });
                                        widget.refreshComponent();
                                    })),
                                color: `#0062c0`,
                            }),
                            `<div class="alert alert-dark p-2 mt-2">
                                ${Editor.h3('案例列表')}
                                ${widget.data.list
                                .map((data, index) => {
                                data.tabExpand = data.tabExpand ?? {};
                                return Editor.toggleExpand({
                                    gvc: gvc,
                                    title: Editor.minusTitle(data.title || `案例:${index + 1}`, gvc.event(() => {
                                        widget.data.list.splice(index, 1);
                                        widget.refreshComponent();
                                    })),
                                    data: data,
                                    innerText: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '標題',
                                            default: data.title ?? '',
                                            placeHolder: '輸入標題',
                                            callback: (text) => {
                                                data.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: '子標題',
                                            default: data.sub ?? '',
                                            placeHolder: '輸入子標題',
                                            callback: (text) => {
                                                data.sub = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        `<div class="mb-2"></div>`,
                                        Editor.toggleExpand({
                                            gvc: gvc,
                                            title: `標籤設定`,
                                            data: data.tabExpand,
                                            innerText: data.tag
                                                .map((d2, index) => {
                                                return Editor.searchInput({
                                                    gvc: gvc,
                                                    title: Editor.minusTitle(d2 || `標籤:${index + 1}`, gvc.event(() => {
                                                        data.tag.splice(index, 1);
                                                        widget.refreshComponent();
                                                    })),
                                                    def: d2,
                                                    placeHolder: '標籤',
                                                    callback: (text) => {
                                                        data.tag[index] = text;
                                                        widget.refreshComponent();
                                                    },
                                                    array: widget.data.tag.map((dd) => {
                                                        return dd.title;
                                                    }),
                                                });
                                            })
                                                .join(`<div class="my-2"></div>`) +
                                                Editor.plusBtn('添加標籤', gvc.event(() => {
                                                    data.tag.push('');
                                                    widget.refreshComponent();
                                                })),
                                            color: `#0062c0`,
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '圖片',
                                            def: data.img,
                                            callback: (text) => {
                                                data.img = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '按鈕標題',
                                            default: data.btn.title,
                                            placeHolder: '輸入標題',
                                            callback: (text) => {
                                                data.btn.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.styleEditor(data.btn).editor(gvc, widget, '按鈕設計樣式'),
                                        ClickEvent.editer(gvc, widget, data.btn, {
                                            hover: true,
                                            option: [],
                                            title: '點擊事件',
                                        }),
                                    ]),
                                });
                            })
                                .join(`<div class="my-2"></div>`)}
                                ${Editor.plusBtn('添加案例', gvc.event(() => {
                                widget.data.list.push({
                                    title: '萊恩設計',
                                    sub: '官方形象網站',
                                    tag: [],
                                    img: getRout('img/project/LionWeb.png'),
                                    page: `project`,
                                });
                                widget.refreshComponent();
                            }))}
                            </div>`,
                        ]);
                    },
                };
            },
        },
        client: {
            title: '合作夥伴',
            subContent: '顯示合作夥伴的區塊',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
                widget.data.title = widget.data.title ?? '合作夥伴';
                widget.data.list = widget.data.list ?? [
                    { src: 'HOMEEAI', type: 'text' },
                    { src: '橙的電子', type: 'text' },
                    { src: '高雄醫學大學', type: 'text' },
                    { src: '御天科技', type: 'text' },
                    { src: '緒玹科技', type: 'text' },
                    { src: '奇樂旅遊', type: 'text' },
                    { src: '星澄基地', type: 'text' },
                ];
                const client = {
                    title: widget.data.title,
                    list: widget.data.list,
                };
                return {
                    view: () => {
                        const cl = glitter.getUUID();
                        return gvc.bindView(() => {
                            return {
                                bind: cl,
                                view: () => {
                                    return `<h2 class="h1 pb-3 pb-lg-4 text-center">${client.title}</h2>
                                        <div
                                            class="swiper mx-n2 swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
                                        >
                                            <div
                                                class="swiper-wrapper"
                                                id="swiper-wrapper-5fa6577aa9a310abb"
                                                aria-live="polite"
                                                style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;"
                                            >
                                                ${glitter.print(function () {
                                        var tmp = '';
                                        client.list.map((c, i) => {
                                            tmp += `
                                                            <div
                                                                class="swiper-slide py-3"
                                                                role="group"
                                                                aria-label="${i + 1} / ${client.list.length}"
                                                                style="width: 185.5px; margin-right: 8px;"
                                                            >
                                                                <div
                                                                    class="card card-body card-hover px-2 mx-2"
                                                                    style="min-width: 154px;min-height: 100px;"
                                                                >
                                                                    ${glitter.print(() => {
                                                switch (c.type) {
                                                    case 'text':
                                                        return `<span
                                                                                    class="d-block mx-auto my-2 fw-bold fs-3"
                                                                                    style=""
                                                                                    >${c.src}</span
                                                                                >`;
                                                    case 'image':
                                                        return `  <img src="${c.src}" class="d-block mx-auto my-2" width="154" alt="Brand" />`;
                                                }
                                            })}
                                                                </div>
                                                            </div>
                                                        `;
                                        });
                                        return tmp;
                                    })}
                                            </div>

                                            <!-- Pagination (bullets) -->
                                            <div
                                                class="swiper-pagination position-relative pt-2 mt-4 swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"
                                            >
                                                <span
                                                    class="swiper-pagination-bullet"
                                                    tabindex="0"
                                                    role="button"
                                                    aria-label="Go to slide 1"
                                                ></span
                                                ><span
                                                    class="swiper-pagination-bullet"
                                                    tabindex="0"
                                                    role="button"
                                                    aria-label="Go to slide 2"
                                                ></span
                                                ><span
                                                    class="swiper-pagination-bullet swiper-pagination-bullet-active"
                                                    tabindex="0"
                                                    role="button"
                                                    aria-label="Go to slide 3"
                                                    aria-current="true"
                                                ></span>
                                            </div>
                                            <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                                        </div>`;
                                },
                                divCreate: {
                                    elem: `section`,
                                    class: `container pb-5 mt-4`,
                                    style: ``,
                                },
                                onCreate: () => {
                                    const swiper = new Swiper(`#${gvc.id(cl)} .swiper`, {
                                        slidesPerView: 2,
                                        pagination: {
                                            el: `#${gvc.id(cl)} .swiper-pagination`,
                                            clickable: true,
                                        },
                                        breakpoints: {
                                            '500': {
                                                slidesPerView: 3,
                                                spaceBetween: 8,
                                            },
                                            '650': {
                                                slidesPerView: 4,
                                                spaceBetween: 8,
                                            },
                                            '900': {
                                                slidesPerView: 5,
                                                spaceBetween: 8,
                                            },
                                            '1100': {
                                                slidesPerView: 6,
                                                spaceBetween: 8,
                                            },
                                        },
                                    });
                                },
                            };
                        });
                    },
                    editor: () => {
                        return (glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `區塊標題`,
                            default: widget.data.title,
                            placeHolder: '輸入區塊標題',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }) +
                            Editor.arrayItem({
                                gvc: gvc,
                                title: '文字區塊內容',
                                array: widget.data.list.map((dd, index) => {
                                    return {
                                        title: dd.src || `區塊:${index + 1}`,
                                        expand: dd,
                                        innerHtml: glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.src,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.src = text;
                                                widget.refreshComponent();
                                            },
                                        }),
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
                                        widget.data.list.push({ src: '萊恩設計', type: 'text' });
                                        widget.refreshComponent();
                                    }),
                                },
                            }));
                    },
                };
            },
        },
        clientService: {
            title: '問答區塊',
            subContent: '提供問答的區塊',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
                widget.data.title =
                    widget.data.title ??
                        `<p class="lead mb-3">沒有那麼多的預算</p>
                        <h2 class="h1 pb-2 pb-md-4">
                            前往<img
                                src="img/index/glitter.png"
                                class="bg-white rounded-circle p-2 mb-2 mx-2"
                                style="width: 50px;height: 50px;"
                            />星澄基地<br />快速打造專屬於您的系統
                        </h2>`;
                widget.data.btn = widget.data.btn ?? { name: '點此前往' };
                widget.data.list = widget.data.list ?? [
                    {
                        q: '星澄基地是什麼？',
                        a: '星澄基地是萊恩設計所開發的套版應用平台，集結了我們所有的開發案例，讓您能用最低的成本打造您的應用',
                    },
                    { q: '是否支援APP上架服務？', a: '當然，購買白金方案後，會有專人聯繫您APP上架相關事宜。' },
                    {
                        q: '是否支援電商與金流功能？',
                        a: '可以，我們採用綠界科技作為金流平台，由後台簡易帶入HASHKEY與特店編號，即可串接金流服務。',
                    },
                    { q: '我能從網站或 APP 中販售商品嗎？', a: '可以，您可以在電商平台上販售您設計的商品。' },
                ];
                const faq = {
                    title: widget.data.title,
                    btn: widget.data.btn,
                    list: widget.data.list,
                };
                return {
                    view: () => {
                        return `<section class="container" id="glitterBase">
                            <div class="bg-secondary rounded-3 my-2 my-md-4 my-lg-5 py-5 px-3 px-md-0">
                                <div class="row align-items-center">
                                    <!-- FAQ desc -->
                                    <div
                                        class="col-md-5 offset-lg-1 text-center text-md-start ps-md-5 ps-lg-0 ps-xl-5 pb-2 pb-md-0 mb-4 mb-md-0"
                                    >
                                        ${faq.title}
                                        <a
                                            class="btn btn-primary btn-lg ${glitter.htmlGenerate.styleEditor(faq.btn).class()}"
                                            onclick="${gvc.event(() => {
                            ClickEvent.trigger({
                                gvc,
                                widget,
                                clickEvent: faq.btn,
                            });
                        })}"
                                            style="cursor:pointer;${glitter.htmlGenerate.styleEditor(faq.btn).style()}"
                                        >
                                            ${faq.btn.name}
                                        </a>
                                    </div>
                                    <!-- FAQ show -->
                                    <div class="col-md-5">
                                        <div class="accordion">
                                            ${glitter.print(function () {
                            var tmp = '';
                            faq.list.map((b, i) => {
                                tmp += `
                                                        <div class="accordion-item border-0 rounded-3 shadow-sm mb-3">
                                                            <h2 class="accordion-header" id="q${i}-heading">
                                                                <button
                                                                    class="accordion-button shadow-none rounded-3 fs-5 ${i != 0 ? `collapsed` : ``}"
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target="#q${i}"
                                                                    aria-expanded="true"
                                                                    aria-controls="q${i}"
                                                                >
                                                                    ${b.q}
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id="q${i}"
                                                                class="accordion-collapse collapse ${i == 0 ? `show` : ``}"
                                                                aria-labelledby="q${i}-heading"
                                                                data-bs-parent="#faq"
                                                            >
                                                                <div class="accordion-body fs-6 pt-0">
                                                                    <p>${b.a}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    `;
                            });
                            return tmp;
                        })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>`;
                    },
                    editor: () => {
                        return gvc.map([
                            glitter.htmlGenerate.editeText({
                                gvc: gvc,
                                title: '描述文字「HTML」',
                                default: widget.data.title,
                                placeHolder: '輸入描述文字',
                                callback: (text) => {
                                    widget.data.title = text;
                                    widget.refreshComponent();
                                },
                            }),
                            Editor.arrayItem({
                                gvc: gvc,
                                title: '問答區塊',
                                array: widget.data.list.map((dd, index) => {
                                    return {
                                        title: dd.q || `問題:${index + 1}`,
                                        expand: dd,
                                        innerHtml: glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `問題`,
                                            default: dd.q,
                                            placeHolder: '輸入問題',
                                            callback: (text) => {
                                                dd.q = text;
                                                widget.refreshComponent();
                                            },
                                        }) +
                                            glitter.htmlGenerate.editeText({
                                                gvc: gvc,
                                                title: `回答`,
                                                default: dd.a,
                                                placeHolder: '輸入回答',
                                                callback: (text) => {
                                                    dd.a = text;
                                                    widget.refreshComponent();
                                                },
                                            }),
                                    };
                                }),
                                expand: widget.data,
                                plus: {
                                    title: '添加區塊',
                                    event: gvc.event(() => {
                                        widget.data.list.push({
                                            q: '星澄基地是什麼？',
                                            a: '星澄基地是萊恩設計所開發的套版應用平台，集結了我們所有的開發案例，讓您能用最低的成本打造您的應用',
                                        });
                                        widget.refreshComponent();
                                    }),
                                },
                            }),
                            `<div class="my-2"></div>`,
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: '按鈕',
                                data: widget.data.btn,
                                innerText: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `按鈕名稱`,
                                        default: widget.data.btn.name,
                                        placeHolder: '輸入按鈕名稱',
                                        callback: (text) => {
                                            widget.data.btn.name = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.styleEditor(widget.data.btn).editor(gvc, widget, '按鈕設計樣式'),
                                    ClickEvent.editer(gvc, widget, widget.data.btn, {
                                        hover: true,
                                        option: [],
                                        title: '點擊事件',
                                    }),
                                ]),
                            }),
                        ]);
                    },
                };
            },
        },
        aboutUS: {
            title: '關於我們',
            subContent: '顯示關於我們的區塊',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
                widget.data.title = widget.data.title ?? '關於我們';
                widget.data.list = widget.data.list ?? [
                    {
                        name: '王建智',
                        title: '萊恩設計<br />CEO',
                        img: getRout('img/index/wang.jpg'),
                        desc: `
      曾於上市櫃公司擔任軟體專案的技術領導者與架構規劃師，也熱衷於軟體技術開源協作，在 Github 已有超過 15+ 開源框架，並且取得貢獻者徽章，有著十分熱忱的技術追求，目前在業界已累積開發超過 20 樣以上的產品。<br /><br />
      因為想追求更多未知的技術，而創立了萊恩設計，希望能在為客戶解決問題的同時，增長自身的技術水平。
      `,
                    },
                    {
                        name: '林致嘉',
                        title: '軟體工程師',
                        img: getRout('img/index/lin.jpg'),
                        desc: `
      畢業於高雄科技大學資訊管理系，大學曾任 PHP 後端工程師，進入萊恩設計後，採用前後端分離技術進行軟體專案的開發，擅長將 JS 渲染工程進行模組化分類，大幅縮短開發時程，降低產品出錯率與提高重複開發效率。<br /><br />
      喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境。
      `,
                    },
                ];
                widget.data.bg = widget.data.bg ?? getRout(`img/index/team-bg.jpg`);
                const team = {
                    title: widget.data.title,
                    list: widget.data.list,
                    bg: widget.data.bg,
                };
                return {
                    view: () => {
                        return gvc.bindView(() => {
                            const id = glitter.getUUID();
                            return {
                                view: () => {
                                    return `  <div class="jarallax-img opacity-25" style="background-image: url(${team.bg})"></div>
          <div class="container pt-3 pt-lg-5 ">
            <h2 class="h1 text-center pb-3 pb-lg-0 mb-4 mb-lg-5 mt-5">${team.title}</h2>
            <div class="position-relative px-sm-5 mx-auto" style="max-width: 976px;">
              <!-- Prev button -->
              <button
                type="button"
                id="team-prev"
                class="btn btn-prev btn-icon btn-sm position-absolute top-50 translate-middle-y start-0 d-none d-sm-inline-flex mt-n4"
                tabindex="0"
                aria-label="Previous slide"
                aria-controls="swiper-wrapper-93a4a95da5a3f926"
              >
                <i class="bx bx-chevron-left"></i>
              </button>

              <!-- Next button -->
              <button
                type="button"
                id="team-next"
                class="btn btn-next btn-icon btn-sm position-absolute top-50 translate-middle-y end-0 d-none d-sm-inline-flex mt-n4"
                tabindex="0"
                aria-label="Next slide"
                aria-controls="swiper-wrapper-93a4a95da5a3f926"
              >
                <i class="bx bx-chevron-right"></i>
              </button>

              <!-- Slider -->
              <div
                class="swiper swiper-nav-onhover pt-1 mx-md-2 swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
              >
                <div
                  class="swiper-wrapper pt-4 pb-3"
                  id="swiper-wrapper-93a4a95da5a3f926"
                  aria-live="polite"
                  style="transition-duration: 0ms; transform: translate3d(-2649px, 0px, 0px);"
                >
                  <!-- Team team -->
                  ${glitter.print(function () {
                                        var tmp = '';
                                        team.list.map((p, i) => {
                                            tmp += `
                              <div
                                  class="swiper-slide h-auto px-2 swiper-slide-duplicate-active"
                                  data-swiper-slide-index="0"
                                  style="width: 871px; margin-right: 12px;"
                                  role="group"
                                  aria-label="${i + 1} / ${team.list.length}"
                              >
                                  <figure class="card h-100 position-relative border-0 shadow-sm py-3 p-0 p-xxl-4 my-0">
                                      <span
                                          class="btn btn-icon btn-primary btn-lg shadow-primary pe-none position-absolute top-0 start-0 translate-middle-y ms-4 ms-xxl-5"
                                      >
                                          <i class="bx bxs-user-detail"></i>
                                      </span>
                                      <div class="row  m-auto" style="">
                                          <figcaption class="col-12 col-lg-4 d-flex align-items-center justify-content-center mt-2">
                                              <img src="${p.img}" width="150" class="rounded-circle" alt="Annette Black" />
                                              <div class="ps-3 text-center">
                                                  <h5 class="fw-semibold lh-base mb-0">${p.name}</h5>
                                                  <span class="text-muted">${p.title}</span>
                                              </div>
                                          </figcaption>
                                          <blockquote class="col-12 col-lg-8 card-body mt-2 mb-2">
                                              <p class="fs-lg mb-0">${p.desc}</p>
                                          </blockquote>
                                      </div>
                                  </figure>
                              </div>
                          `;
                                        });
                                        return tmp;
                                    })}
                </div>
                <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
              </div>
            </div>
          </div>`;
                                },
                                bind: id,
                                divCreate: {
                                    class: `jarallax dark-mode bg-dark py-xxl-5 mt-5`,
                                    style: `height:100%;`,
                                },
                                onCreate: () => {
                                    const swiper = new Swiper(`#${gvc.id(id)} .swiper`, {
                                        spaceBetween: 12,
                                        loop: true,
                                        pagination: {
                                            el: '.swiper-pagination',
                                            clickable: true,
                                        },
                                        navigation: {
                                            prevEl: '#team-prev',
                                            nextEl: '#team-next',
                                        },
                                    });
                                },
                            };
                        });
                    },
                    editor: () => {
                        return gvc.map([
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: '區塊標題',
                                default: widget.data.title,
                                callback: (text) => {
                                    widget.data.title = text;
                                    widget.refreshComponent();
                                },
                                placeHolder: `請輸入區塊標題`,
                            }) +
                                Editor.arrayItem({
                                    gvc: gvc,
                                    title: '介紹區塊',
                                    array: widget.data.list.map((dd, index) => {
                                        return {
                                            title: dd.name || `區塊:${index + 1}`,
                                            expand: dd,
                                            innerHtml: [
                                                glitter.htmlGenerate.editeInput({
                                                    gvc: gvc,
                                                    title: `名稱`,
                                                    default: dd.name,
                                                    placeHolder: '輸入專家名稱',
                                                    callback: (text) => {
                                                        dd.name = text;
                                                        widget.refreshComponent();
                                                    },
                                                }),
                                                glitter.htmlGenerate.editeInput({
                                                    gvc: gvc,
                                                    title: `職位`,
                                                    default: dd.title,
                                                    placeHolder: '輸入專家職位',
                                                    callback: (text) => {
                                                        dd.title = text;
                                                        widget.refreshComponent();
                                                    },
                                                }),
                                                glitter.htmlGenerate.editeText({
                                                    gvc: gvc,
                                                    title: `職位`,
                                                    default: dd.desc,
                                                    placeHolder: '輸入描述',
                                                    callback: (text) => {
                                                        dd.desc = text;
                                                        widget.refreshComponent();
                                                    },
                                                }),
                                                Editor.uploadImage({
                                                    title: `頭貼`,
                                                    gvc: gvc,
                                                    def: dd.img,
                                                    callback: (text) => {
                                                        dd.img = text;
                                                        widget.refreshComponent();
                                                    },
                                                }),
                                            ].join(''),
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
                                            widget.data.list.push({
                                                name: '王建智',
                                                title: '萊恩設計<br />CEO',
                                                img: getRout('img/index/wang.jpg'),
                                                desc: `
      曾於上市櫃公司擔任軟體專案的技術領導者與架構規劃師，也熱衷於軟體技術開源協作，在 Github 已有超過 15+ 開源框架，並且取得貢獻者徽章，有著十分熱忱的技術追求，目前在業界已累積開發超過 20 樣以上的產品。<br /><br />
      因為想追求更多未知的技術，而創立了萊恩設計，希望能在為客戶解決問題的同時，增長自身的技術水平。
      `,
                                            });
                                            widget.refreshComponent();
                                        }),
                                    },
                                }),
                        ]);
                    },
                };
            },
        },
        contactUS: {
            title: '聯絡我們',
            subContent: '顯示聯絡我們的區塊',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
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
                        { title: 'projectName', name: '專案名稱', type: 'text', elem: 'input', need: true },
                        { title: 'e-mail', name: '電子信箱', type: 'email', elem: 'input', need: true },
                        { title: 'phone', name: '電話／手機', type: 'number', elem: 'input' },
                        { title: 'company', name: '公司／單位／社團名稱', type: 'text', elem: 'input' },
                        { title: 'payment', name: '預算', type: 'number', elem: 'input' },
                        { title: 'name', name: '其他想傳達的訊息', type: 'textArea', elem: 'textArea' },
                    ],
                };
                widget.data.infoList = widget.data.infoList ?? [
                    { icon: 'bx bx-map', title: '台中市臺灣大道二段285號20樓' },
                    { icon: 'bx bx-phone-call', title: '(886) 0978-028-730' },
                    {
                        icon: 'bx bx-time',
                        title: `<span class="text-dark fw-semibold me-1">週一至週五</span> 09:00 AM – 19:00 PM`,
                    },
                    {
                        icon: 'bx bx-envelope',
                        title: `<a class="sent_mail" href="mailto:">jianzhi.wang@ncdesign.info</a>`,
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
            <div class="row mt-sm-5">
              <!-- Contact form -->
              <div class="rounded p-3 m-auto col-11 col-sm-6" style="border: 1px solid white;">
                <h2 class="h2 text-center text-md-center mt-2">${contact.form.title}</h2>
                <p class="text-white-50">${contact.form.desc}</p>
                <div class="form-horizontal m-auto" style="color: black;">
                  ${glitter.print(function () {
                            var tmp = '';
                            var data = contact.form.data;
                            tmp += gvc.map(contact.form.data.map((data) => {
                                data.value = '';
                                return `<div class="mt-2 w-100">
                                  <label for="billing-first-name" class="form-label">
                                      <span style="color: red;font-size: 16px;font-weight: 300;" class="${data.need ? `` : `d-none`}"
                                          >*</span
                                      >
                                      ${data.name}</label
                                  >
                                  <div class="input-group input-group-merge">
                                      ${data.type === 'textArea'
                                    ? `
                <textArea class="form-control" placeholder="請輸入${data.name}" style="min-height: 100px;" onchange="${gvc.event((e) => {
                                        data.value = e.value;
                                    })}"></textArea>
                `
                                    : `
                <input class="form-control" type="${data.type}" placeholder="請輸入${data.name}"  onchange="${gvc.event((e) => {
                                        data.value = e.value;
                                    })}">
                `}
                                  </div>
                              </div>`;
                            }));
                            tmp += `<div class="d-flex w-100 align-items-center justify-content-center">
                          <button
                              type="submit"
                              class="btn btn-info mx-auto mt-3"
                              style="width: calc(100% - 10px);"
                              onclick="${gvc.event(function () {
                                var notFillIn = data.find((data) => data.need && !data.value);
                                if (notFillIn !== undefined) {
                                    alert('請輸入' + notFillIn.name);
                                    return;
                                }
                                glitter.openNewTab(`mailto:jianzhi.wang@ncdesign.info?body=${encodeURIComponent(data
                                    .map((dd) => {
                                    return `${dd.name}:\n${dd.value}`;
                                })
                                    .join(`\n\n`))}`);
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
                            contact.infoList.map((n) => {
                                tmp += `<li class="d-flex mb-3">
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
                  style="width:100%;border:0;${glitter.ut.frSize({ sm: `` }, 'height:calc(100vw - 20px);margin-bottom:10px;')}"
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
                                innerText: [
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
                                        gvc: gvc,
                                        title: '聯絡條目',
                                        array: widget.data.form.data.map((dd, index) => {
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
                                    }),
                                ].join(''),
                            }),
                            `<div class="my-2"></div>`,
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: `右側區塊`,
                                data: widget.data.info,
                                innerText: [
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
                                        title: '聯絡條目',
                                        array: widget.data.infoList.map((dd, index) => {
                                            return {
                                                title: `條目:${index + 1}`,
                                                expand: dd,
                                                innerHtml: Editor.fontawesome({
                                                    title: 'icon',
                                                    gvc: gvc,
                                                    def: dd.icon,
                                                    callback: (text) => {
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
                                    }),
                                ].join(''),
                            }),
                        ]);
                    },
                };
            },
        },
        footer: {
            title: '底部區塊',
            subContent: '顯示網頁底部區塊',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
                widget.data.outro = widget.data.outro ?? {
                    img: getRout(`img/index/logoFull.svg`),
                    title: '萊恩設計',
                    desc: '無論是套版工具或客製化整合，我們的開發團隊能提供<br />網頁／Android／iOS 的開發服務，將您的想法變成現實！',
                };
                widget.data.copyRight =
                    widget.data.copyRight ??
                        `Copyright &copy; ${new Date().getFullYear()}
        <a href="https://squarestudio.tw" target="_blank" rel="noreferrer noopener" style="cursor:pointer;color:ivory;"
          >Lion Design</a
        >
        All Rights Reserved.`;
                widget.data.info = widget.data.info ?? [
                    { icon: 'bx bx-map', title: '台中市臺灣大道二段285號20樓' },
                    { icon: 'bx bx-phone-call', title: '(886) 0978-028-730' },
                    {
                        icon: 'bx bx-time',
                        title: `<span class="text-dark fw-semibold me-1">週一至週五</span> 09:00 AM – 19:00 PM`,
                    },
                    {
                        icon: 'bx bx-envelope',
                        title: `<a class="sent_mail" href="mailto:sam38124@gmail.com"> sam38124@gmail.com</a>`,
                    },
                ];
                widget.data.btnList = widget.data.btnList ?? [
                    {
                        img: getRout('img/index/LINE_App.png'),
                        tip: 'LINE',
                        style: { color: '#00B900' },
                        click: function () {
                        },
                    },
                ];
                return {
                    view: () => {
                        const footer = {
                            outro: widget.data.outro,
                            info: widget.data.info,
                            btnList: widget.data.btnList,
                        };
                        return `<footer class="footer dark-mode bg-dark  pb-4 pb-lg-5 border-top" id="footer">
                                <div class="container pt-lg-4">
                                    <div class="row pb-0">
                                        <div class="col-sm-4">
                                            <div class="navbar-brand text-dark fs-4 p-0 me-0 mb-2 mb-lg-4 mt-2 mt-sm-0">
                                                <img src="${footer.outro.img}" width="50" alt="Lion Design" style="margin-right: 10px;" />
                                                ${footer.outro.title}
                                            </div>
                                            <p class="text-light opacity-70 pb-lg-3 mb-2">${footer.outro.desc}</p>
                                        </div>
                                        <div class="col-sm-6 offset-xl-2 offset-md-1 pt-2 pt-md-1 pt-lg-0">
                                            <div class="w-100">
                                                <ul class="list-unstyled pb-3 mb-0 mb-lg-3">
                                                    <!-- Footer info -->
                                                    ${glitter.print(function () {
                            var tmp = '';
                            footer.info.map((n) => {
                                tmp += `<li class="d-flex mb-3">
                                                                <i class="${n.icon} text-muted fs-xl mt-1 me-2"></i>${n.title}
                                                            </li> `;
                            });
                            return tmp;
                        })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="fs-xs text-center text-md-start pb-2 pb-lg-0 mb-0 mt-3 mt-sm-0">${copyRight()}</p>
                                </div>
                            </footer>
                            ${glitter.print(function () {
                            var tmp = '';
                            footer.btnList.map((l, i) => {
                                var style = '';
                                Object.keys(l.style ?? []).map((s) => (style += `${s}:${l.style[s]};`));
                                tmp += `<a
                                        class="btn-conner"
                                        id="conner${i}"
                                        style="cursor:pointer;${style}"
                                        onclick="${gvc.event(l.click)}"
                                    >
                                        <span class="btn-conner-tooltip text-muted fs-lg me-2">${l.tip}</span>
                                        ${l.img
                                    ? `<img src="${l.img}" width="40"></img>`
                                    : `<i class="btn-conner-icon ${l.icon}"></i>`}
                                    </a>`;
                            });
                            return tmp;
                        })}
                            <a class="btn-scroll-top" href="#top" data-scroll>
                                <span class="btn-scroll-top-tooltip text-muted fs-lg me-2">Top</span>
                                <i class="btn-scroll-top-icon bx bx-chevron-up"></i>
                            </a>`;
                    },
                    editor: () => {
                        return gvc.map([
                            Editor.uploadImage({
                                gvc: gvc,
                                title: `Logo圖標`,
                                def: widget.data.outro.img,
                                callback: (data) => {
                                    widget.data.outro.img = data;
                                    widget.refreshComponent();
                                },
                            }),
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: '標題',
                                default: widget.data.outro.title,
                                placeHolder: '標題',
                                callback: (text) => {
                                    widget.data.outro.title = text;
                                    widget.refreshComponent();
                                },
                            }),
                            glitter.htmlGenerate.editeText({
                                gvc: gvc,
                                title: '描述',
                                default: widget.data.outro.desc,
                                placeHolder: '描述',
                                callback: (text) => {
                                    widget.data.outro.desc = text;
                                    widget.refreshComponent();
                                },
                            }),
                            glitter.htmlGenerate.editeText({
                                gvc: gvc,
                                title: '版權所有',
                                default: widget.data.copyRight,
                                placeHolder: '版權所有',
                                callback: (text) => {
                                    widget.data.copyRight = text;
                                    widget.refreshComponent();
                                },
                            }),
                            Editor.arrayItem({
                                gvc: gvc,
                                title: '聯絡條目',
                                array: widget.data.info.map((dd, index) => {
                                    return {
                                        title: `條目:${index + 1}`,
                                        expand: dd,
                                        innerHtml: Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: dd.icon,
                                            callback: (text) => {
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
                            }),
                        ]);
                    },
                };
            },
        },
        serviceDetail: {
            title: '服務區塊',
            subContent: '顯示服務區塊的內容',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                widget.data.name = widget.data.name ?? '社群平台';
                widget.data.data = widget.data.data ?? [
                    {
                        section: 'img_desc',
                        img: getRout('img/social/social01.jpg'),
                        title: '組織、社團、公司 · 獨立管理的社群平台',
                        desc: '自家管理的社群平台，無須受到演算法或廣告侵擾',
                        point: [
                            { name: '獨立管理，自定義統籌的平台', icon: 'bx bxs-hand' },
                            { name: '各平台獨立運作，彼此互不影響', icon: 'bx bxl-unsplash' },
                            { name: '允許身分階級控管', icon: 'bx bx-user-check' },
                            { name: '發布更新即時，具備推播通知', icon: 'bx bx-rss' },
                        ],
                    },
                    {
                        section: 'list_img',
                        img: getRout('img/social/social02.jpg'),
                        title: '個性化發布內容 · 活動文章圖片皆適用',
                        list: [
                            '提供快速發文，畫面直覺簡單',
                            '中大型文章可自行設計字型、大小，圖片與影片提供連結儲存',
                            '標籤增加分類方式，更快速找到貼文內容',
                            '活動可規劃日期與時間，並達到推播功能',
                        ],
                        point: [
                            { name: '標籤分類貼文', icon: 'bx bx-tag-alt' },
                            { name: '文章個性化編輯', icon: 'bx bx-customize' },
                        ],
                    },
                    {
                        section: 'img_desc',
                        img: getRout('img/social/social03.jpg'),
                        title: '活動、部落格、相簿影片 · 提供篩選器搜尋',
                        desc: '能以網格或條列呈現排版，並配合標籤和置頂的方式來排序貼文',
                        point: [
                            { name: '網格排版／條列排版', icon: 'bx bx-grid-alt' },
                            { name: '標籤篩選貼文', icon: 'bx bx-purchase-tag' },
                        ],
                    },
                    {
                        section: 'list_img',
                        img: getRout('img/social/social04.jpg'),
                        title: '活動頁面完善 · 參與者一個頁面就能得到所有資訊',
                        list: ['活動狀態設定是否公開或私人、是否自由加入', '參加人員與活動說明一目瞭然，分類明確'],
                        point: [
                            { name: '可自定義功能設定', icon: 'bx bx-slider' },
                            { name: '活動頁面分配明確 ', icon: 'bx bx-layout' },
                        ],
                    },
                ];
                const service_detail = {
                    name: widget.data.name,
                    data: widget.data.data,
                };
                return {
                    view: () => {
                        initialScript(gvc, widget);
                        return `
                        <h1 class="container pb-4 mt-5">${service_detail.name}</h1>
        ${glitter.print(function () {
                            var tmp = '';
                            service_detail.data.map((s) => {
                                s.list = s.list ?? [];
                                s.desc = s.desc ?? '';
                                switch (s.section) {
                                    case 'list_img':
                                        tmp += `
                            <section class="container pt-2 pt-lg-3 mb-md-3 mb-lg-5 pb-5">
                                <div class="row">
                                    <div class="col-md-6 order-md-2 pb-2 pb-md-0 mb-4 mb-md-0">
                                        <div class="ps-lg-5">
                                            <img src="${s.img}" class="rounded-3" alt="Image" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 order-md-1">
                                        <h2 class="h3 mb-sm-4">${s.title}</h2>
                                        <ul class="list-unstyled d-md-block d-none pb-2 pb-md-3 mb-3">
                                            ${glitter.print(function () {
                                            var tmp = '';
                                            s.list.map((l) => {
                                                tmp += `
                                                        <li class="d-flex align-items-center mb-2">
                                                            <i class="bx bx-check lead text-primary me-2"></i>${l}
                                                        </li>
                                                    `;
                                            });
                                            return tmp;
                                        })}
                                        </ul>
                                        ${s.point && s.point.length != 0
                                            ? `
                                                  <div class="border rounded-3 mb-4 mb-lg-5">
                                                      <div class="row row-cols-1 row-cols-sm-2 g-0">
                                                          ${glitter.print(function () {
                                                var tmp = '';
                                                var l = s.point.length;
                                                s.point.map((p, i) => {
                                                    tmp += `<div
                                                                      class="col d-flex align-items-center ${borderCss(i, l)} p-3"
                                                                  >
                                                                      <i class="${p.icon}"></i>
                                                                      <div class="ps-2 ms-1">
                                                                          <h3
                                                                              class="h6 mb-0"
                                                                              style="white-space: normal;word-break: break-all;"
                                                                          >
                                                                              ${p.name}
                                                                          </h3>
                                                                      </div>
                                                                  </div>`;
                                                });
                                                return tmp;
                                            })}
                                                      </div>
                                                  </div>
                                              `
                                            : ``}
                                    </div>
                                </div>
                            </section>
                        `;
                                        break;
                                    case 'img_desc':
                                        tmp += `
                            <section class="container mb-md-3 mb-lg-5 pb-5">
                                <div class="row">
                                    <div class="col-md-6 pb-2 pb-md-0 mb-4 mb-md-0">
                                        <div class="pe-lg-5">
                                            <img src="${s.img}" class="rounded-3" alt="Image" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <h2 class="h3 mb-sm-4">${s.title}</h2>
                                        <p class=" pb-2 pb-md-3 mb-3">${s.desc}</p>
                                        ${s.point && s.point.length != 0
                                            ? `
                                                  <div class="border rounded-3 mb-4 mb-lg-5">
                                                      <div class="row row-cols-1 row-cols-sm-2 g-0">
                                                          ${glitter.print(function () {
                                                var tmp = '';
                                                var l = s.point.length;
                                                s.point.map((p, i) => {
                                                    tmp += `<div
                                                                      class="col d-flex align-items-center ${borderCss(i, l)} p-3"
                                                                  >
                                                                      <i class="${p.icon}"></i>
                                                                      <div class="ps-2 ms-1">
                                                                          <h3
                                                                              class="h6 mb-0 "
                                                                              style="white-space: normal;word-break: break-all;"
                                                                          >
                                                                              ${p.name}
                                                                          </h3>
                                                                      </div>
                                                                  </div>`;
                                                });
                                                return tmp;
                                            })}
                                                      </div>
                                                  </div>
                                              `
                                            : ``}
                                    </div>
                                </div>
                            </section>
                        `;
                                        break;
                                }
                            });
                            return tmp;
                        })}
                        `;
                    },
                    editor: () => {
                        return gvc.map([
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: '標題',
                                default: widget.data.name,
                                placeHolder: '輸入標題',
                                callback: (text) => {
                                    widget.data.name = text;
                                    widget.refreshComponent();
                                },
                            }),
                            Editor.arrayItem({
                                gvc: gvc,
                                title: '項目區塊',
                                array: widget.data.data.map((dd, index) => {
                                    return {
                                        title: dd.title || `區塊:${index + 1}`,
                                        expand: dd,
                                        innerHtml: gvc.map([
                                            Editor.uploadImage({
                                                gvc: gvc,
                                                title: `項目圖片`,
                                                def: dd.img,
                                                callback: (data) => {
                                                    dd.img = data;
                                                    widget.refreshComponent();
                                                },
                                            }),
                                            glitter.htmlGenerate.editeInput({
                                                gvc: gvc,
                                                title: '標題',
                                                default: dd.title,
                                                placeHolder: '輸入標題',
                                                callback: (text) => {
                                                    dd.title = text;
                                                    widget.refreshComponent();
                                                },
                                            }),
                                            Editor.select({
                                                title: `描述方式`,
                                                gvc: gvc,
                                                def: dd.section,
                                                array: [
                                                    {
                                                        title: '列表',
                                                        value: `list_img`,
                                                    },
                                                    {
                                                        title: '文字',
                                                        value: `img_desc`,
                                                    },
                                                ],
                                                callback: (text) => {
                                                    dd.section = text;
                                                    widget.refreshComponent();
                                                },
                                            }),
                                            (() => {
                                                if (dd.section === 'list_img') {
                                                    return `<div class="alert alert-dark mt-2">
                                                        ${dd.list
                                                        .map((d2, index) => {
                                                        return glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: Editor.minusTitle(`條列陳述:` + (index + 1), gvc.event(() => {
                                                                dd.list.splice(index, 1);
                                                                widget.refreshComponent();
                                                            })),
                                                            default: d2,
                                                            placeHolder: '條列陳述項目',
                                                            callback: (text) => {
                                                                dd.list[index] = text;
                                                                widget.refreshComponent();
                                                            },
                                                        });
                                                    })
                                                        .join('<div class="mt-1"></div>')}
                                                        ${Editor.plusBtn('添加項目', gvc.event(() => {
                                                        dd.list.push('項目');
                                                        widget.refreshComponent();
                                                    }))}
                                                    </div>`;
                                                }
                                                else {
                                                    return glitter.htmlGenerate.editeText({
                                                        gvc: gvc,
                                                        title: '描述',
                                                        default: dd.desc,
                                                        placeHolder: '輸入描述',
                                                        callback: (text) => {
                                                            dd.desc = text;
                                                            widget.refreshComponent();
                                                        },
                                                    });
                                                }
                                            })(),
                                            Editor.arrayItem({
                                                gvc: gvc,
                                                title: '表格區塊',
                                                array: dd.point.map((dd, index) => {
                                                    return {
                                                        title: dd.name || `區塊:${index + 1}`,
                                                        expand: dd,
                                                        innerHtml: glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `標題`,
                                                            default: dd.name,
                                                            placeHolder: '輸入標題名稱',
                                                            callback: (text) => {
                                                                dd.name = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }) +
                                                            Editor.fontawesome({
                                                                title: 'icon標籤',
                                                                gvc: gvc,
                                                                def: dd.icon,
                                                                callback: (text) => {
                                                                    dd.icon = text;
                                                                    widget.refreshComponent();
                                                                },
                                                            }),
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
                                                        widget.data.list.push({
                                                            name: '標籤分類貼文',
                                                            icon: 'bx bx-tag-alt',
                                                        });
                                                        widget.refreshComponent();
                                                    }),
                                                },
                                            }),
                                        ]),
                                        minus: gvc.event(() => {
                                            widget.data.data.splice(index, 1);
                                            widget.refreshComponent();
                                        }),
                                    };
                                }),
                                expand: widget.data,
                                plus: {
                                    title: '添加項目區塊',
                                    event: gvc.event(() => {
                                        widget.data.list.push({
                                            section: 'list_img',
                                            img: getRout('img/social/social04.jpg'),
                                            title: '活動頁面完善 · 參與者一個頁面就能得到所有資訊',
                                            list: ['活動狀態設定是否公開或私人、是否自由加入', '參加人員與活動說明一目瞭然，分類明確'],
                                            point: [
                                                { name: '可自定義功能設定', icon: 'bx bx-slider' },
                                                { name: '活動頁面分配明確 ', icon: 'bx bx-layout' },
                                            ],
                                        });
                                        widget.refreshComponent();
                                    }),
                                },
                            }),
                        ]);
                    },
                };
            },
        },
        otherService: {
            title: '其他服務區塊',
            subContent: '顯示其他服務區塊的內容',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                widget.data.title = widget.data.title ?? '看看其他產品服務';
                widget.data.service = widget.data.service ?? [
                    {
                        name: '電商應用',
                        link: {},
                        tab: 'shop',
                        icon: 'bx bx-store-alt',
                        desc: '從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務',
                    },
                    {
                        name: '資料視覺化',
                        link: {},
                        tab: 'dashboard',
                        icon: 'bx bxs-dashboard bx-flip-vertical',
                        desc: '無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現',
                    },
                    {
                        name: '企業管理',
                        link: {},
                        tab: 'erp',
                        icon: 'bx bx-buildings',
                        desc: '薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統',
                    },
                    {
                        name: '個人網站',
                        link: {},
                        tab: 'profile',
                        icon: 'bx bxl-blogger',
                        desc: '網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地',
                    },
                    {
                        name: '社群平台',
                        link: {},
                        tab: 'social',
                        icon: 'bx bx-shape-polygon',
                        desc: '學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境',
                    },
                    {
                        name: '線上課程網站',
                        link: {},
                        tab: 'course',
                        icon: 'bx bx-code-curly',
                        desc: '快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網',
                    },
                    {
                        name: '藍芽產品應用',
                        link: {},
                        tab: 'bluetooth',
                        icon: 'bx bx-bluetooth',
                        desc: '手機藍芽串接硬體設備，讀取/寫入特徵值，收聽藍芽廣播，已有豐富的業界開發經驗．',
                    },
                    {
                        name: '後台模組化服務',
                        link: {},
                        tab: 'bgunit',
                        icon: 'bx bx-unite',
                        desc: '透過我司自行開發的模組化系統[✨Glitter星澄基地]，既可能的增加網站靈活度，讓您能十分方便的自行更改介面設計與添加其功能．',
                    },
                ];
                return {
                    view: () => {
                        initialScript(gvc, widget);
                        const service = widget.data.service;
                        return `<section class="container pt-2 pt-lg-0 pb-5 mb-md-4 mb-lg-5">
                            <h2 class="h1 text-center pb-3 pb-lg-4">${widget.data.title}</h2>
                            <ul class="nav nav-tabs flex-nowrap justify-content-lg-center overflow-auto pb-2 mb-3 mb-lg-4" role="tablist">
                                ${glitter.print(function () {
                            var tmp = '';
                            service.map((a, i) => {
                                tmp += `
                                            <li class="nav-item" role="presentation">
                                                <button
                                                    class="nav-link text-nowrap ${i == 0 && `active`}"
                                                    id="${a.tab}-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#${a.tab}"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="${a.tab}"
                                                    aria-selected="false"
                                                >
                                                    <i class="${a.icon} fs-lg opacity-60 me-2"></i>
                                                    ${a.name}
                                                </button>
                                            </li>
                                        `;
                            });
                            return tmp;
                        })}
                            </ul>

                            <div class="tab-content bg-secondary rounded-3 py-4">
                                ${glitter.print(function () {
                            var tmp = '';
                            service.map((a, i) => {
                                tmp += `
                                            <div
                                                class="tab-pane fade ${i == 0 && `show active`}"
                                                id="${a.tab}"
                                                role="tabpanel"
                                                aria-labelledby="${a.tab}-tab"
                                            >
                                                <div class="row align-items-center pt-3 pt-sm-4 pt-md-0 px-3 px-sm-4 px-lg-0">
                                                    <div class="col-lg-4 col-md-5 offset-lg-1 text-center text-md-start">
                                                        <h3 class="mb-lg-4">${a.name}</h3>
                                                        <p>${a.desc}</p>
                                                        <a
                                                            class="btn btn-primary"
                                                            data-gs-event-7="event"
                                                            onclick="${gvc.event(() => {
                                    ClickEvent.trigger({
                                        gvc,
                                        widget,
                                        clickEvent: a.link,
                                    });
                                })}"
                                                            style="cursor:pointer"
                                                            >點我了解更多</a
                                                        >
                                                    </div>
                                                    <div class="col-lg-6 col-md-7 mt-2 mb-3 mt-md-3">
                                                        <img
                                                            src="${getRout(`img/${a.tab}/${a.tab}01.jpg`)}"
                                                            class="d-block rounded-3 my-lg-2 mx-auto me-md-0"
                                                            width="564"
                                                            alt="Image"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                            });
                            return tmp;
                        })}
                            </div>
                        </section>`;
                    },
                    editor: () => {
                        return (glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `標題`,
                            default: widget.data.title,
                            placeHolder: '輸入標題名稱',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }) +
                            Editor.arrayItem({
                                gvc: gvc,
                                title: '其他服務',
                                array: widget.data.service.map((dd, index) => {
                                    return {
                                        title: dd.name || `區塊:${index + 1}`,
                                        expand: dd,
                                        innerHtml: glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.name,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.name = text;
                                                widget.refreshComponent();
                                            },
                                        }) +
                                            glitter.htmlGenerate.editeText({
                                                gvc: gvc,
                                                title: `描述`,
                                                default: dd.desc,
                                                placeHolder: '輸入描述內文',
                                                callback: (text) => {
                                                    dd.desc = text;
                                                    widget.refreshComponent();
                                                },
                                            }) +
                                            Editor.fontawesome({
                                                title: '圖示',
                                                gvc: gvc,
                                                def: dd.icon,
                                                callback: (text) => {
                                                    dd.icon = text;
                                                    widget.refreshComponent();
                                                },
                                            }) +
                                            ClickEvent.editer(gvc, widget, dd.link, {
                                                hover: true,
                                                option: [],
                                                title: '點擊事件',
                                            }),
                                        minus: gvc.event(() => {
                                            widget.data.servic.splice(index, 1);
                                            widget.refreshComponent();
                                        }),
                                    };
                                }),
                                expand: widget.data,
                                plus: {
                                    title: '添加區塊',
                                    event: gvc.event(() => {
                                        widget.data.service.push({
                                            name: '電商應用',
                                            link: {},
                                            tab: 'shop',
                                            icon: 'bx bx-store-alt',
                                            desc: '從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務',
                                        });
                                        widget.refreshComponent();
                                    }),
                                },
                            }));
                    },
                };
            },
        },
        template: {
            title: '模板瀏覽',
            subContent: '顯示模板瀏覽的內容',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                return {
                    view: () => {
                        initialScript(gvc, widget);
                        const template = {
                            title: '萊恩設計網頁模板',
                            desc: '一頁式網站、多功能前後台、只要您有需求和資料，萊恩設計都能提供相對應的模板，點擊圖片可開啟該模板演示',
                            tag: [
                                { className: '*', title: '所有模板' },
                                { className: '.onepage', title: '單頁式網頁' },
                                { className: '.shop', title: '電商服務' },
                                { className: '.social', title: '社群平台' },
                                { className: '.event', title: '活動網站' },
                                { className: '.dashboard', title: '儀錶板' },
                                { className: '.blog', title: '部落格' },
                            ],
                            list: [
                                {
                                    img: getRout(`img/template/restaurantly.png`),
                                    tag: ['onepage'],
                                    name: '企業形象單頁式網站 - 活躍藍',
                                    link: `${glitter.webUrl}/restaurantly/home`,
                                },
                                {
                                    img: getRout('img/template/scaffold.png'),
                                    tag: ['onepage'],
                                    name: '企業形象單頁式網站 - 活躍藍',
                                    link: `${glitter.webUrl}/scaffold/home`,
                                },
                                {
                                    img: getRout('img/template/maxim.png'),
                                    tag: ['onepage'],
                                    name: '企業形象單頁式網站 - 綠意黑',
                                    link: `${glitter.webUrl}/maxim/home`,
                                },
                                {
                                    img: getRout('img/template/herobiz.png'),
                                    tag: ['onepage'],
                                    name: '企業形象單頁式網站 - 靈活青',
                                    link: `${glitter.webUrl}/herobiz2/home`,
                                },
                                {
                                    img: getRout('img/template/theday.png'),
                                    tag: ['onepage'],
                                    name: '企業形象單頁式網站 - 紅光黑',
                                    link: `${glitter.webUrl}/theday2/home`,
                                },
                            ],
                        };
                        const id = glitter.getUUID();
                        return gvc.bindView(() => {
                            return {
                                bind: id,
                                view: () => {
                                    return `<h2 class="h1 mb-4 text-center">${template.title}</h2>
                                        <p class="fs-lg pb-2 pb-md-3 pb-lg-0 mb-4 mb-lg-5 text-center">${template.desc}</p>
                                        <ul
                                            class="nav nav-tabs flex-nowrap justify-content-lg-center overflow-auto pb-2 mb-3 mb-lg-4"
                                            role="tablist"
                                        >
                                            ${glitter.print(function () {
                                        var tmp = '';
                                        template.tag.map((a, i) => {
                                            tmp += `
                                                        <li class="nav-item" role="presentation">
                                                            <button
                                                                class="nav-link text-nowrap ${i == 0 ? `active` : ``}"
                                                                data-bs-toggle="tab"
                                                                type="button"
                                                                role="tab"
                                                                onclick="${gvc.event(() => {
                                                $('.isot').isotope({ filter: a.className });
                                            })}"
                                                            >
                                                                ${a.title}
                                                            </button>
                                                        </li>
                                                    `;
                                        });
                                        return tmp;
                                    })}
                                        </ul>
                                        <div class="masonry-grid row g-md-4 g-3 mb-4 isot">
                                            <!-- Project grid -->
                                            ${glitter.print(function () {
                                        var tmp = '';
                                        template.list.map((p) => {
                                            var tagClass = '';
                                            p.tag.map((m) => (tagClass += `${m} `));
                                            tmp += `
                                                        <div
                                                            class="masonry-grid-item col-md-4 col-sm-6 col-12 ${tagClass}"
                                                            style="display:none"
                                                        >
                                                            <a class="card card-portfolio card-hover bg-transparent border-0">
                                                                <div
                                                                    class="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3"
                                                                    onclick="${gvc.event(() => { })}"
                                                                    style="cursor:pointer"
                                                                >
                                                                    <span
                                                                        class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50 rounded-3"
                                                                    ></span>
                                                                    <div class="position-relative text-center zindex-2">
                                                                        <h3 class="text-light mb-1">${p.name}</h3>
                                                                        <i class="bx bx-link-alt mt-3 fs-xl mt-1 me-2"></i>
                                                                    </div>
                                                                </div>
                                                                <div class="card-img">
                                                                    <div
                                                                        style="background:url(${p.img});
                            width: 100%;
                            padding-bottom: 70%;
                            background-size:cover;
                            background-position:center center;"
                                                                    ></div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    `;
                                        });
                                        return tmp;
                                    })}
                                        </div>`;
                                },
                                divCreate: {
                                    elem: `section`,
                                    class: `container mb-5 pt-lg-2 pt-xl-4 pb-2 pb-md-3 pb-lg-5`,
                                },
                                onCreate: () => {
                                    try {
                                        const imagesLoaded = window.imagesLoaded;
                                        imagesLoaded(document.querySelector('#' + gvc.id(id)), function (instance) {
                                            $('.isot').isotope({ filter: ':not("*")' }),
                                                $('.isot').isotope({ filter: '*' });
                                        });
                                    }
                                    catch (e) { }
                                },
                            };
                        });
                    },
                    editor: () => {
                        return ``;
                    },
                };
            },
        },
        price2: {
            title: '價位區塊',
            subContent: '顯示價位區塊．',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                const publica = {
                    checkT: `<i class="bx bx-check text-primary fs-3"></i>`,
                    checkF: `<i class="bx bx-x text-danger fs-3"></i>`,
                    email: 'jianzhi.wang@ncdesign.info',
                    glitterBase: 'https://squarestudio.tw/Glitter/home',
                };
                const price_detail = {
                    title: '方案價格',
                    list: [
                        {
                            專案規模: '價格',
                            簡: '3 萬 ～ 20 萬',
                            中: '20 萬～ 60 萬',
                            高: '60 萬以上',
                        },
                        {
                            專案規模: '專案規劃',
                            簡: publica.checkT,
                            中: publica.checkT,
                            高: publica.checkT,
                        },
                        {
                            專案規模: '帳號管理',
                            簡: publica.checkT,
                            中: publica.checkT,
                            高: publica.checkT,
                        },
                        {
                            專案規模: 'UI／UX 設計',
                            簡: '1 種',
                            中: '2 種',
                            高: '3 種',
                        },
                        {
                            專案規模: '後台系統',
                            簡: '套版功能',
                            中: '客製化',
                            高: '客製化',
                        },
                        {
                            專案規模: '支援平台',
                            簡: "<i class='fs-3 bx bx-globe'></i>",
                            中: "<i class='fs-3 bx bxl-android'></i><i class='fs-3 bx bxl-apple' ></i><i class='fs-3 bx bx-globe' ></i>",
                            高: "<i class='fs-3 bx bxl-android'></i><i class='fs-3 bx bxl-apple' ></i><i class='fs-3 bx bx-globe' ></i>",
                        },
                        {
                            專案規模: '數據分析',
                            簡: publica.checkF,
                            中: publica.checkT,
                            高: publica.checkT,
                        },
                        {
                            專案規模: '開發時程',
                            簡: '15天～60天',
                            中: '60天～150天',
                            高: '150天～270天',
                        },
                    ],
                };
                return {
                    view: () => {
                        return `
                            <section class="pt-2" id="price">
                                <div class="container pt-4 pt-sm-2">
                                    <h2 class="h1 mb-4 text-center">${price_detail.title}</h2>
                                    <div class="row mt-4 mt-sm-0">
                                        <div class="tab-pane fade show active mt-3" role="tabpanel">
                                            <!-- Price table -->
                                            <div class="table-responsive border rounded shadow-sm">
                                                ${table_lion(price_detail.list, true, true)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        `;
                    },
                    editor: () => {
                        return ``;
                    },
                };
            },
        },
    };
});
function borderCss(n, len) {
    if (len <= 2) {
        return n == 1 && `border-start-sm`;
    }
    else if (n == len - 1 && len % 2 == 0) {
        return ``;
    }
    else if ((n == len - 2 && len % 2 == 0) || (n == len - 1 && len % 2 == 1)) {
        return `border-end-sm`;
    }
    else if (n % 2 == 0) {
        return `border-end-sm border-bottom`;
    }
    else if (n % 2 == 1) {
        return `border-bottom`;
    }
}
function copyRight() {
    return `Copyright &copy; ${new Date().getFullYear()}
        <a href="https://squarestudio.tw" target="_blank" rel="noreferrer noopener" style="cursor:pointer;color:ivory;">Lion Design</a>
        All Rights Reserved.`;
}
function table_lion(json, stripe, hideHead) {
    const glitter = window.glitter;
    return `
        <table class="table table-sm table-centered table-nowrap mb-0 font-14 table-hover">
            ${hideHead
        ? ``
        : `
                      <thead class="${stripe ? `` : `table-dark`}">
                          <tr class="text-center ${glitter.ut.frSize({ sm: 'fs-4' }, 'fs-6')}" style="height:64px">
                              ${glitter.print(function () {
            var thHTML = '';
            Object.keys(json[0]).map((h) => (thHTML += `<th class="pt-4 pb-4">${h}</th>`));
            return thHTML;
        })}
                          </tr>
                      </thead>
                  `}
            <tbody>
                ${glitter.print(function () {
        var tdHTML = '';
        json.map((row) => {
            tdHTML += `<tr class="text-center ${glitter.ut.frSize({ sm: 'fs-5' }, 'fs-sm')}" style="height: 72px;">
                            ${glitter.print(function () {
                var innertd = '';
                Object.values(row).map((d, i) => (innertd += `<td class="pt-4 pb-4">${d}</td>`));
                return innertd;
            })}
                        </tr>`;
        });
        return tdHTML;
    })}
            </tbody>
        </table>
    `;
}
