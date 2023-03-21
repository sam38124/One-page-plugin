import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../editor.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    function getRout(link) {
        return new URL("./" + link, import.meta.url).href;
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
            getRout('app.css')
        ]).then();
        gvc.addMtScript([
            { src: 'https://kit.fontawesome.com/ca42445a45.js' },
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
        }, () => {
        });
    }
    return {
        topNav: {
            title: "網站導覽列",
            subContent: "顯示多個超連結與頁面跳轉導覽的區塊．",
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
                widget.data.nav = widget.data.nav ?? {};
                widget.data.nav.logo = widget.data.nav.logo ?? `https://squarestudio.tw/LionDesign/page/plugin/lionDesign/img/index/logo.svg`;
                widget.data.nav.title = widget.data.nav.title ?? {
                    pc: `萊恩設計`,
                    phone: `萊恩設計`
                };
                const nav = {
                    logo: widget.data.nav.logo,
                    title: widget.data.nav.title,
                    bar: {
                        home: true,
                        list: [
                            {
                                name: "客製化服務項目",
                                list: [
                                    { name: "電商應用", link: ["service_detail"] },
                                    { name: "資料視覺化", link: ["service_detail"] },
                                    { name: "企業管理", link: ["service_detail"] },
                                    { name: "個人網站", link: ["service_detail"] },
                                    { name: "社群平台", link: ["service_detail"] },
                                    { name: "線上課程網站", link: ["service_detail"] },
                                    { name: "藍芽產品應用", link: ["service_detail"] },
                                    { name: "後台模組化服務", link: ["service_detail"] },
                                ],
                            },
                            { name: "模板瀏覽", link: ["template"] },
                            { name: "方案價格", link: "#price" },
                            { name: "作品案例", link: "#project" },
                            { name: "關於我們", link: "#team" },
                            { name: "聯絡資訊", link: "#contact" },
                        ],
                    },
                    btn: [{ bg: "outline-primary", name: "星澄基地", link: "public.glitterBase", icon: "bx bxs-star" }],
                };
                return {
                    view: () => {
                        function recursive(r, first) {
                            var h = "";
                            if (r.list === undefined) {
                                h += `<li>
          <a
            class="${first ? "nav-link text-white" : "dropdown-item"} ${typeof r.link === "object" && first ? r.link[0] : ``}"
            onclick="${gvc.event(() => {
                                    $("#navbarNav").offcanvas("hide");
                                    alert(r.link);
                                })}"
            style="cursor:pointer"
            name="${typeof r.link === "string" ? r.link.replace("#", "") : ``}"
            >${r.name}</a
          >
        </li>`;
                            }
                            else {
                                h += `<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">${r.name}</a>
          <ul class="dropdown-menu">
            ${glitter.print(function () {
                                    var tmp = "";
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
            <a class="navbar-brand fs-lg pe-0 pe-sm-3" onclick="${gvc.event(() => glitter.location.reload())}" style="cursor:pointer">
              <img class="me-2" src="${nav.logo}" width="30" />${glitter.ut.frSize({ sm: nav.title.pc }, nav.title.phone)}
            </a>
            <button
              class="d-flex d-md-none btn btn-dark py-1 kv-btn w-25"
              onclick="${gvc.event(() => {
                        })}"
              style="cursor:pointer;margin-left:5rem"
            >
              聯絡我們
            </button>
            <div id="navbarNav" class="offcanvas offcanvas-end">
              <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title">${nav.title.pc ?? nav.title.phone}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <!-- Menu -->
                  ${glitter.print(function () {
                            var tmp = "";
                            nav.bar
                                .list.map((r) => (tmp += recursive(r, true)));
                            return tmp;
                        })}
                </ul>
              </div>
              <div class="offcanvas-footer border-top">
                <!-- Menu button -->
                ${glitter.print(function () {
                            var tmp = "";
                            nav.btn.map((b) => {
                                tmp += `
                      <a
                        class="btn btn-${b.bg} w-100 mt-2"
                        onclick="${gvc.event(() => {
                                    $("#navbarNav").offcanvas("hide");
                                })}"
                        style="cursor:pointer"
                      >
                        <i class="${b.icon} fs-4 lh-1 me-1"></i>
                        &nbsp;${b.name}
                      </a>
                    `;
                            });
                            return tmp;
                        })}
              </div>
            </div>
            <div class="row">
              <!-- Menu button (Mobile) -->
              ${glitter.print(function () {
                            var tmp = "";
                            nav.btn.map((b) => {
                                tmp += `
                    <div class="col-6">
                      <a
                        class="btn btn-${b.bg} btn-sm fs-sm rounded d-none d-lg-inline-flex"
                        onclick="${gvc.event(() => {
                                })}"
                        style="cursor:pointer"
                      >
                        <i class="${b.icon} fs-5 lh-1 me-1"></i>
                        &nbsp;${b.name}
                      </a>
                    </div>
                  `;
                            });
                            return tmp;
                        })}
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
                        return gvc.map([
                            Editor.uploadImage({
                                gvc: gvc,
                                title: `Logo圖片`,
                                def: widget.data.nav.logo,
                                callback: (e) => {
                                    widget.data.nav.logo = e;
                                }
                            }),
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: '電腦版標題',
                                default: widget.data.nav.title.pc,
                                placeHolder: "輸入電腦版標題",
                                callback: (text) => {
                                    widget.data.nav.title.pc = text;
                                    widget.refreshComponent();
                                }
                            }),
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: '手機版標題',
                                default: widget.data.nav.title.phone,
                                placeHolder: "輸入電腦版標題",
                                callback: (text) => {
                                    widget.data.nav.title.phone = text;
                                    widget.refreshComponent();
                                }
                            })
                        ]);
                    }
                };
            }
        },
        topBanner: {
            title: "廣告輪播",
            subContent: "顯示廣告Banner的置頂大圖",
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                initialScript(gvc, widget);
                return {
                    view: () => {
                        const keyVision2 = {
                            l: {
                                img: getRout("img/index/web-kv.png"),
                                title: "Web",
                                desc: "單頁式 RWD 網頁，眾多主流模板可供您選擇",
                                lottie: { json: "https://assets2.lottiefiles.com/packages/lf20_jtupaj9e.json", size: 300 },
                                text: "10 種以上風格、主題豐富多樣<br>最低只要 7,800 元起",
                                btn: { name: "了解主題模板", link: ["template"] },
                            },
                            r: {
                                img: getRout("img/index/app-kv.png"),
                                title: "APP",
                                desc: "IoT、藍芽傳遞、社群平台，任何主題都能打造專屬應用程式",
                                lottie: { json: "https://assets1.lottiefiles.com/packages/lf20_wloxwco0.json", size: 320 },
                                text: "傾聽用戶的需求與設計<br>同時支援 Android 與 iOS 雙平台",
                                btn: { name: "觀看作品案例", link: "#project" },
                            },
                            m: {
                                img: getRout("img/index/mobile-kv.png"),
                                title: "Web & APP Design",
                                desc: "多樣主題網頁模板及 Android 、 iOS 雙平台開發<br />打造專屬應用程式與網站",
                                lottie: "https://assets5.lottiefiles.com/packages/lf20_zxau6gfz.json",
                                btn1: { name: "看網頁模板", link: ["template"] },
                                btn2: { name: "看作品案例", link: "#project" },
                            },
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
                      class="btn btn-danger mt-3 w-50 fs-5 kv-btn"
                      onclick="${gvc.event(() => {
                        })}"
                      style="cursor:pointer"
                    >
                      <i class="fas fa-hand-point-right"></i>&ensp;${keyVision2.l.btn.name}
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
                      class="btn btn-primary mt-3 w-50 fs-5 kv-btn"
                      onclick="${gvc.event(() => { })}"
                      style="cursor:pointer"
                    >
                      <i class="fas fa-hand-point-right"></i>&ensp;${keyVision2.r.btn.name}
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
                  <lottie-player autoplay loop mode="normal" src="${keyVision2.m.lottie}" style="height: 32vh;width: 32vh;">
                  </lottie-player>
                </div>

                <h2 data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">${keyVision2.m.desc}</h2>

                <div class="mt-5 d-flex justify-content-evenly">
                  <button
                    class="btn btn-primary kv-btn"
                    onclick="${gvc.event(() => { })}"
                    style="cursor:pointer"
                    data-aos="fade-right"
                    data-aos-delay="600"
                    data-aos-duration="1000"
                  >
                    <i class="fas fa-hand-point-right"></i>&ensp;${keyVision2.m.btn1.name}
                  </button>
                  <button
                    class="btn btn-danger kv-btn"
                    onclick="${gvc.event(() => { })}"
                    style="cursor:pointer"
                    data-aos="fade-left"
                    data-aos-delay="600"
                    data-aos-duration="1000"
                  >
                    <i class="fas fa-hand-point-right"></i>&ensp;${keyVision2.m.btn2.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>`;
                    },
                    editor: () => {
                        return ``;
                    }
                };
            }
        },
        price: {
            title: "服務價位",
            subContent: "顯示服務價位，與瞭解更多的按鈕．",
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                const price = {
                    main: {
                        title: "品牌形象官方網站",
                        list: ["Bootstrap 4, 5", "單頁式 RWD 網站", "多種 Icon 設計", "只需輸入資料，即可快速建立", "多種模板、多個頁面元件"],
                        price: { num: 7800, unit: "元 / 個" },
                        btn: { name: "了解更多", link: ["price_detail"] },
                        lottie: "https://assets8.lottiefiles.com/packages/lf20_wqd1jwoz.json",
                    },
                    sub: {
                        title: "系統網站與應用程式開發",
                        list: ["Web、Android App、iOS App", "UI / UX 設計", "前後台系統", "客製化用戶需求", "金流串接、自動寄送郵件"],
                        price: { num: 30000, unit: "元起" },
                        btn: { name: "了解更多", link: ["price_detail"] },
                    },
                    bg: getRout('img/index/price-bg.jpg')
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
                            var tmp = "";
                            price.main.list.map((l) => (tmp += ` <li>${l}</li> `));
                            return tmp;
                        })}
                </ul>
                <div class="dollar-line">
                  <sup>$</sup>
                  <span>${price.main.price.num}</span>
                  <sup>${price.main.price.unit}</sup>
                </div>
                <div class="text-center">
                  <button class="btn btn-dark mt-3" 
                  onclick="${gvc.event(() => { })}" style="cursor:pointer">
                  ${price.main.btn.name}
                  </button>
                </div>
              </div>
              <div class="col-12 col-lg-6 d-flex justify-content-center">
                <lottie-player
                  autoplay
                  loop
                  mode="normal"
                  src="${price.main.lottie}"
                  style="width: ${glitter.ut.frSize({ sm: 360 }, 200)}px;"
                >
                </lottie-player>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4 card card-price">
            ${glitter.ut.frSize({ sm: `<h3 class="mb-4">${price.sub.title}</h3>` }, `<h2>${price.sub.title}</h2>`)}
            <ul>
              ${glitter.print(function () {
                            var tmp = "";
                            price.sub.list.map((l) => (tmp += ` <li>${l}</li> `));
                            return tmp;
                        })}
            </ul>
            <div class="dollar-line">
              <sup>$</sup>
              <span>${price.sub.price.num}</span>
              <sup>${price.sub.price.unit}</sup>
            </div>
            <div class="text-center">
              <button class="btn btn-dark mt-3" 
              onclick="${gvc.event(() => {
                        })}" style="cursor:pointer">
              ${price.sub.btn.name}
              </button>
            </div>
        </div>
      </section>`;
                    },
                    editor: () => {
                        return ``;
                    }
                };
            }
        },
        service: {
            title: "服務區塊",
            subContent: "顯示服務區塊．",
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                let service = {
                    title: "萊恩設計的服務",
                    desc: `我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。<br /><br />或是想快速建立特定功能網站，自主管理頁面與功能，<a class="text-white" href= target="_blank" rel="noopener">「星澄基地」</a>會是您的好選擇`,
                    list: [
                        {
                            name: "電商應用",
                            link: ["service_detail"],
                            tab: "shop",
                            icon: "bx bx-store-alt",
                            desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                        },
                        {
                            name: "資料視覺化",
                            link: ["service_detail"],
                            tab: "dashboard",
                            icon: "bx bxs-dashboard bx-flip-vertical",
                            desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
                        },
                        {
                            name: "企業管理",
                            link: ["service_detail"],
                            tab: "erp",
                            icon: "bx bx-buildings",
                            desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
                        },
                        {
                            name: "個人網站",
                            link: ["service_detail"],
                            tab: "profile",
                            icon: "bx bxl-blogger",
                            desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
                        },
                        {
                            name: "社群平台",
                            link: ["service_detail"],
                            tab: "social",
                            icon: "bx bx-shape-polygon",
                            desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
                        },
                        {
                            name: "線上課程網站",
                            link: ["service_detail"],
                            tab: "course",
                            icon: "bx bx-code-curly",
                            desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
                        },
                        {
                            name: "藍芽產品應用",
                            link: ["service_detail"],
                            tab: "bluetooth",
                            icon: "bx bx-bluetooth",
                            desc: "手機藍芽串接硬體設備，讀取/寫入特徵值，收聽藍芽廣播，已有豐富的業界開發經驗．",
                        },
                        {
                            name: "後台模組化服務",
                            link: ["service_detail"],
                            tab: "bgunit",
                            icon: "bx bx-unite",
                            desc: "透過我司自行開發的模組化系統[✨Glitter星澄基地]，既可能的增加網站靈活度，讓您能十分方便的自行更改介面設計與添加其功能．",
                        },
                    ],
                    bg: getRout(`img/index/service-bg.jpg`)
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
                <p class="mb-md-0 ${glitter.ut.frSize({ sm: "fs-lg" }, "")}">${service.desc}</p>
              </div>
              <div class="col-md-4 d-flex justify-content-center">
                <img src="${getRout(`img/index/logoFull.svg`)}" width="${glitter.ut.frSize({ sm: 140 }, 0)}" />
              </div>
            </div>
            <div class="row row-cols-2 row-cols-md-2">
              <!-- Sevice grid -->
              ${glitter.print(function () {
                            var tmp = "";
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
                          <div class="d-inline-block bg-primary shadow-primary rounded-3 position-absolute top-0 translate-middle-y p-3">
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
                        return ``;
                    }
                };
            }
        },
        project: {
            title: "案例參考",
            subContent: "顯示用戶案例參考列表",
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                const project = {
                    title: "作品案例",
                    tag: [
                        { className: "*", title: "所有案例" },
                        { className: ".app", title: "APP", color: "indigo" },
                        { className: ".web", title: "網頁設計", color: "purple" },
                        { className: ".cms", title: "後台系統", color: "red" },
                        { className: ".dashboard", title: "資料分析", color: "orange" },
                        { className: ".ble", title: "藍芽產品", color: "green" },
                    ],
                    list: [
                        {
                            title: "高雄醫藥大學",
                            sub: "高雄醫藥大學校友聯繫平台<br />(Android / iOS)",
                            tag: ["app", "cms"],
                            img: getRout(`img/project/scholl.png`),
                            page: `project`,
                        },
                        {
                            title: "橙的電子",
                            sub: "胎壓偵測器之物聯網後台平台<br />(Web)",
                            tag: ["cms", "dashboard", "web"],
                            img: getRout("img/project/orangeback.png"),
                            page: `project`,
                        },
                        { title: "緒玹科技", sub: "外包媒合平台 (Android / iOS)", tag: ["app"], img: getRout("img/project/matching.png"), page: `project` },
                        { title: "御天科技", sub: "GOT-IT EIP (Android / iOS)", tag: ["app"], img: getRout("img/project/eip.png"), page: `project` },
                        { title: "緒玹科技", sub: "外包媒合平台 (Web)", tag: ["web"], img: getRout("img/project/proshake_web.png"), page: `project` },
                        {
                            title: "Petstagram寵生活",
                            sub: "為寵物量身打造的社群媒體平台",
                            tag: ["app", "web"],
                            img: getRout("img/project/Petstagram.jpg"),
                            page: `project`,
                        },
                        { title: "橙的電子", sub: "Android 手持應用終端 Sensor 燒錄器", tag: ["ble", "app"], img: getRout("img/project/pda.png"), page: `project` },
                        {
                            title: "橙的電子",
                            sub: "後端數據分析平台",
                            tag: ["cms", "dashboard", "web"],
                            img: getRout("img/project/orange_backany.png"),
                            page: `project`,
                        },
                        { title: "奇樂旅遊", sub: "自媒體社群平台", tag: ["web", "app"], img: getRout("img/project/phone.png"), page: `project` },
                        { title: "橙的電子", sub: "O-Genius Lite", tag: ["ble"], img: getRout("img/project/oglite_f03.png"), page: `project` },
                        {
                            title: "緒玹科技",
                            sub: "訂單與薪資管理<br />(Android / iOS / Web)",
                            tag: ["cms", "app", "web"],
                            img: getRout("img/project/order.png"),
                            page: `project`,
                        },
                        { title: "橙的電子", sub: "胎壓偵測器之物聯網接收", tag: ["app", "ble"], img: getRout("img/project/tpmsiot.png"), page: `project` },
                        { title: "橙的電子", sub: "USB-PAD藍芽無線燒錄器", tag: ["app", "ble"], img: getRout("img/project/usbpad.png"), page: `project` },
                        {
                            title: "星澄基地",
                            sub: "星澄基地，跨站式程式開發平台．",
                            tag: ["web", "cms", "dashboard"],
                            img: getRout("img/project/glitterp.png"),
                            page: `project`,
                        },
                        {
                            title: "星澄基地",
                            sub: "星澄基地，一站式後台管理平台．",
                            tag: ["web", "cms", "dashboard"],
                            img: getRout("img/project/bg_manager.png"),
                            page: `project`,
                        },
                        { title: "萊恩設計", sub: "官方形象網站", tag: ["web"], img: getRout("img/project/LionWeb.png"), page: `project` },
                    ],
                };
                return {
                    view: () => {
                        return `
                        <section class="container py-5 mb-2 mb-lg-4" id="project">
        <h2 class="h1 pb-3 pb-lg-4 text-center">${project.title}</h2>
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
            <div
              class="swiper mx-n2"
              data-swiper-options='{
                "slidesPerView": 1,
                "loop": true,
                "pagination": {
                  "el": ".swiper-pagination",
                  "clickable": true
                },
                "navigation": {
                  "prevEl": "#prev-news",
                  "nextEl": "#next-news"
                },
                "breakpoints": {
                  "500": {
                    "slidesPerView": 2
                  },
                  "1000": {
                    "slidesPerView": 3
                  }
                }
              }'
            >
              <div class="swiper-wrapper">
                ${glitter.print(function () {
                            var tmp = "";
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
                            <div class="h4 text-secondary mb-2"><a>${l.title}</a></div>
                            <div class="fs-5 mb-2"><a>${l.sub}</a></div>
                            <div class="d-flex align-items-center justify-content-evenly my-3">
                              ${glitter.print(function () {
                                    var tmp = "";
                                    l.tag.map((t) => {
                                        var tag = project.tag.find((g) => g.className == `.${t}`);
                                        tmp += `
                                    <a class="badge fs-sm text-nav text-decoration-none" style="background-color:var(--bs-${tag.color})"
                                      >${tag.title}</a
                                    >
                                  `;
                                    });
                                    return tmp;
                                })}
                            </div>
                            <div
                              class="btn btn-outline-light w-100 mt-auto"
                              onclick="${gvc.event(() => {
                                })}"
                              style="cursor:pointer"
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
        </div>
      </section>
                        `;
                    },
                    editor: () => {
                        return ``;
                    }
                };
            }
        },
        client: {
            title: '合作夥伴',
            subContent: '顯示合作夥伴的區塊',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                return {
                    view: () => {
                        const client = {
                            title: "合作夥伴",
                            list: [
                                { src: "橙的電子", type: "text" },
                                { src: "高雄醫學大學", type: "text" },
                                { src: "御天科技", type: "text" },
                                { src: "緒玹科技", type: "text" },
                                { src: "奇樂旅遊", type: "text" },
                                { src: "星澄基地", type: "text" },
                            ],
                        };
                        return `  <section class="container pb-5 mt-4" id="client">
          <h2 class="h1 pb-3 pb-lg-4 text-center">${client.title}</h2>
          <div
            class="swiper mx-n2 swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
            data-swiper-options='{
          "slidesPerView": 2,
          "pagination": {
            "el": ".swiper-pagination",
            "clickable": true
          },
          "breakpoints": {
            "500": {
              "slidesPerView": 3,
              "spaceBetween": 8
            },
            "650": {
              "slidesPerView": 4,
              "spaceBetween": 8
            },
            "900": {
              "slidesPerView": 5,
              "spaceBetween": 8
            },
            "1100": {
              "slidesPerView": 6,
              "spaceBetween": 8
            }
          }
        }'
          >
            <div
              class="swiper-wrapper"
              id="swiper-wrapper-5fa6577aa9a310abb"
              aria-live="polite"
              style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;"
            >
              ${glitter.print(function () {
                            var tmp = "";
                            client.list.map((c, i) => {
                                tmp += `
                    <div
                      class="swiper-slide py-3"
                      role="group"
                      aria-label="${i + 1} / ${client.list.length}"
                      style="width: 185.5px; margin-right: 8px;"
                    >
                      <div class="card card-body card-hover px-2 mx-2" style="min-width: 154px;min-height: 100px;">
                        ${glitter.print(() => {
                                    switch (c.type) {
                                        case "text":
                                            return ` <span class="d-block mx-auto my-2 fw-bold fs-3" style="">${c.src}</span>`;
                                        case "image":
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
              <span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 1"></span
              ><span class="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 2"></span
              ><span
                class="swiper-pagination-bullet swiper-pagination-bullet-active"
                tabindex="0"
                role="button"
                aria-label="Go to slide 3"
                aria-current="true"
              ></span>
            </div>
            <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
          </div>
        </section>`;
                    },
                    editor: () => {
                        return ``;
                    }
                };
            }
        },
        clientService: {
            title: "問答區塊",
            subContent: '提供問答的區塊',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                const faq = {
                    title: "沒有那麼多的預算？",
                    desc: `前往<img src="img/index/glitter.png" class="bg-white rounded-circle p-2 mb-2 mx-2" style="width: 50px;height: 50px;" />星澄基地<br />快速打造專屬於您的系統`,
                    btn: { name: "點此前往", link: "https://google.com" },
                    list: [
                        {
                            q: "星澄基地是什麼？",
                            a: "星澄基地是萊恩設計所開發的套版應用平台，集結了我們所有的開發案例，讓您能用最低的成本打造您的應用",
                        },
                        { q: "是否支援APP上架服務？", a: "當然，購買白金方案後，會有專人聯繫您APP上架相關事宜。" },
                        {
                            q: "是否支援電商與金流功能？",
                            a: "可以，我們採用綠界科技作為金流平台，由後台簡易帶入HASHKEY與特店編號，即可串接金流服務。",
                        },
                        { q: "我能從網站或 APP 中販售商品嗎？", a: "可以，您可以在電商平台上販售您設計的商品。" },
                    ],
                };
                return {
                    view: () => {
                        return `<section class="container" id="glitterBase">
          <div class="bg-secondary rounded-3 my-2 my-md-4 my-lg-5 py-5 px-3 px-md-0">
            <div class="row align-items-center">
              <!-- FAQ desc -->
              <div class="col-md-5 offset-lg-1 text-center text-md-start ps-md-5 ps-lg-0 ps-xl-5 pb-2 pb-md-0 mb-4 mb-md-0">
                <p class="lead mb-3">${faq.title}</p>
                <h2 class="h1 pb-2 pb-md-4">${faq.desc}</h2>
                <a class="btn btn-primary btn-lg" onclick="${gvc.event(() => { })}" style="cursor:pointer">
                  ${faq.btn.name}
                </a>
              </div>
              <!-- FAQ show -->
              <div class="col-md-5">
                <div class="accordion">
                  ${glitter.print(function () {
                            var tmp = "";
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
                        return ``;
                    }
                };
            }
        },
        aboutUS: {
            title: "關於我們",
            subContent: '顯示關於我們的區塊',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                const team = {
                    title: "關於我們",
                    list: [
                        {
                            name: "王建智",
                            title: "萊恩設計<br />CEO",
                            img: getRout("img/index/wang.jpg"),
                            desc: `
      曾於上市櫃公司擔任軟體專案的技術領導者與架構規劃師，也熱衷於軟體技術開源協作，在 Github 已有超過 15+ 開源框架，並且取得貢獻者徽章，有著十分熱忱的技術追求，目前在業界已累積開發超過 20 樣以上的產品。<br /><br />
      因為想追求更多未知的技術，而創立了萊恩設計，希望能在為客戶解決問題的同時，增長自身的技術水平。
      `,
                        },
                        {
                            name: "林致嘉",
                            title: "軟體工程師",
                            img: getRout("img/index/lin.jpg"),
                            desc: `
      畢業於高雄科技大學資訊管理系，大學曾任 PHP 後端工程師，進入萊恩設計後，採用前後端分離技術進行軟體專案的開發，擅長將 JS 渲染工程進行模組化分類，大幅縮短開發時程，降低產品出錯率與提高重複開發效率。<br /><br />
      喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境。
      `,
                        },
                    ],
                    bg: getRout(`img/index/team-bg.jpg`)
                };
                return {
                    view: () => {
                        return `
                        <section class="jarallax dark-mode bg-dark py-xxl-5 mt-5" style="height:100vh" id="team">
          <div class="jarallax-img opacity-25" style="background-image: url(${team.bg})"></div>
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
                data-swiper-options='{
                  "spaceBetween": 12,
                  "loop": true,
                  "pagination": {
                    "el": ".swiper-pagination",
                    "clickable": true
                  },
                  "navigation": {
                    "prevEl": "#team-prev",
                    "nextEl": "#team-next"
                  }
                }'
              >
                <div
                  class="swiper-wrapper pt-4 pb-3"
                  id="swiper-wrapper-93a4a95da5a3f926"
                  aria-live="polite"
                  style="transition-duration: 0ms; transform: translate3d(-2649px, 0px, 0px);"
                >
                  <!-- Team team -->
                  ${glitter.print(function () {
                            var tmp = "";
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
                            <div class="row">
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
          </div>
        </section>
                        `;
                    },
                    editor: () => {
                        return ``;
                    }
                };
            }
        },
        contactUS: {
            title: "聯絡我們",
            subContent: '顯示聯絡我們的區塊',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                return {
                    view: () => {
                        const contact = {
                            bg: getRout("img/index/contact-bg.jpg"),
                            info: {
                                title: "我們的基地",
                                map: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.5346930969567!2d120.66424281543617!3d24.152973879193723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d77d34f55cf%3A0x707bb61a5669b9b6!2zNDAz5Y-w5Lit5biC5YyX5Y2A5Y-w54Gj5aSn6YGT5LqM5q61Mjg16Jmf!5e0!3m2!1szh-TW!2stw!4v1648967400612!5m2!1szh-TW!2stw`,
                            },
                            form: {
                                title: "聯絡我們 Contact Us",
                                desc: `想要更加了解我們的服務？<br />填妥以下表單，或直接聯絡此信箱 <a class="sent_mail" href="mailto:">sam38124@gmail.com</a><br />萊恩設計將儘速回應您。`,
                                data: [
                                    { title: "projectName", name: "專案名稱", type: "text", elem: "input", need: true },
                                    { title: "e-mail", name: "電子信箱", type: "email", elem: "input", need: true },
                                    { title: "phone", name: "電話／手機", type: "number", elem: "input" },
                                    { title: "company", name: "公司／單位／社團名稱", type: "text", elem: "input" },
                                    { title: "payment", name: "預算", type: "number", elem: "input" },
                                    { title: "name", name: "其他想傳達的訊息", type: "text", elem: "textArea" },
                                ],
                            },
                            infoList: [
                                { icon: "bx bx-map", title: "台中市臺灣大道二段285號20樓" },
                                { icon: "bx bx-phone-call", title: "(886) 0978-028-730" },
                                { icon: "bx bx-time", title: `<span class="text-dark fw-semibold me-1">週一至週五</span> 09:00 AM – 19:00 PM` },
                                { icon: "bx bx-envelope", title: `<a class="sent_mail" href="mailto:">sam38124@gmail.com</a>` },
                            ]
                        };
                        return `
                        <section class="jarallax dark-mode bg-dark py-xxl-5" id="contact">
          <div class="jarallax-img opacity-25" style="background-image: url(${contact.bg})"></div>
          <div class="container">
            <div class="row mt-sm-5">
              <!-- Contact form -->
              <div class="rounded p-3 m-auto col-11 col-sm-6" style="border: 1px solid white;">
                <h2 class="h2 text-center text-md-center mt-2">${contact.form.title}</h2>
                <p class="text-white-50">${contact.form.desc}</p>
                <div class="form-horizontal m-auto" style="color: black;">
                  ${glitter.print(function () {
                            var tmp = "";
                            var data = contact.form.data;
                            tmp += gvc.map(contact.form.data.map((data) => {
                                return `<div class="mt-2 w-100">
                <label for="billing-first-name" class="form-label">
                  <span style="color: red;font-size: 16px;font-weight: 300;" class="${(data.need) ? `` : `d-none`}">*</span> ${data.name}</label>
                <div class="input-group input-group-merge">
                ${(data.elem === 'textArea') ? `
                <textArea class="form-control" placeholder="請輸入${data.name}" style="min-height: 100px;"></textArea>
                ` : `
                <input class="form-control" type="${data.type}" placeholder="請輸入${data.name}" id="billing-first-name" >
                `}
                  
                  
                </div>
              </div>`;
                            }));
                            tmp += ` <div class="d-flex w-100 align-items-center justify-content-center">
                      <button
                        type="submit"
                        class="btn btn-info mx-auto mt-3"
                        style="width: calc(100% - 10px);"
                        onclick="${gvc.event(function () {
                                var notFillIn = data.find((data) => data.need && (!data.value));
                                if (notFillIn !== undefined) {
                                    glitter.share.dia.error("請輸入" + notFillIn.name);
                                    return;
                                }
                                glitter.share.dia.dataLoading(true);
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
                            var tmp = "";
                            contact.infoList.map((n) => {
                                tmp += ` <li class="d-flex mb-3"><i class="${n.icon} text-muted fs-xl mt-1 me-2"></i>${n.title}</li> `;
                            });
                            return tmp;
                        })}
                  </ul>
                </div>
                <iframe
                  src="${contact.info.map}"
                  height="450"
                  class="rounded"
                  style="width:100%;border:0;${glitter.ut.frSize({ sm: `` }, "height:calc(100vw - 20px);margin-bottom:10px;")}"
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
                        return ``;
                    }
                };
            }
        },
        footer: {
            title: "底部區塊",
            subContent: '顯示網頁底部區塊',
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                return {
                    view: () => {
                        const footer = {
                            outro: {
                                img: getRout(`img/index/logoFull.svg`),
                                title: "萊恩設計",
                                desc: "無論是套版工具或客製化整合，我們的開發團隊能提供<br />網頁／Android／iOS 的開發服務，將您的想法變成現實！",
                            },
                            info: [
                                { icon: "bx bx-map", title: "台中市臺灣大道二段285號20樓" },
                                { icon: "bx bx-phone-call", title: "(886) 0978-028-730" },
                                { icon: "bx bx-time", title: `<span class="text-dark fw-semibold me-1">週一至週五</span> 09:00 AM – 19:00 PM` },
                                { icon: "bx bx-envelope", title: `<a class="sent_mail" href="mailto:sam38124@gmail.com"> sam38124@gmail.com</a>` },
                            ],
                            btnList: [
                                {
                                    img: "img/index/LINE_App.png",
                                    tip: "LINE",
                                    style: { color: "#00B900" },
                                    click: function () {
                                    },
                                },
                            ],
                        };
                        return ` <footer class="footer dark-mode bg-dark  pb-4 pb-lg-5 border-top" id="footer">
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
                            var tmp = "";
                            footer.info.map((n) => {
                                tmp += ` <li class="d-flex mb-3"><i class="${n.icon} text-muted fs-xl mt-1 me-2"></i>${n.title}</li> `;
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
                            var tmp = "";
                            footer.btnList.map((l, i) => {
                                var style = "";
                                Object.keys(l.style ?? []).map((s) => (style += `${s}:${l.style[s]};`));
                                tmp += ` <a class="btn-conner" id="conner${i}" style="cursor:pointer;${style}" onclick="${gvc.event(l.click)}">
              <span class="btn-conner-tooltip text-muted fs-lg me-2">${l.tip}</span>
              ${l.img ? `<img src="${l.img}" width="40"></img>` : `<i class="btn-conner-icon ${l.icon}"></i>`}
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
                        return ``;
                    }
                };
            }
        }
    };
});
function copyRight() {
    return `Copyright &copy; ${new Date().getFullYear()}
        <a href="https://squarestudio.tw" target="_blank" rel="noreferrer noopener" style="cursor:pointer;color:ivory;"
          >Lion Design</a
        >
        All Rights Reserved.`;
}
