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
                    widget.data.title = widget.data.title ?? "Latest News &amp; Healthy Tips";
                    widget.data.dataList = widget.data.dataList ?? {
                        list: [
                            {
                                link: "",
                                bookMark: "",
                                img: ScriptStyle1.getRout('assets/img/landing/medical/news/01.jpg'),
                                type: "Diseases",
                                time: "12 hours ago",
                                title: "Updates on COVID-19 vaccination efforts in your area",
                                poster: {
                                    name: "Ralph Edwards",
                                    pro: "MBBS, MD Gynaecology",
                                    img: ScriptStyle1.getRout("assets/img/avatar/36.jpg")
                                }
                            },
                            {
                                link: "",
                                bookMark: "",
                                img: ScriptStyle1.getRout('assets/img/landing/medical/news/02.jpg'),
                                type: "Healthy Tips",
                                time: "1 day ago",
                                title: "New drug to halt dementia after multiple head injuries",
                                poster: {
                                    name: "Jenny Wilson",
                                    pro: "Ph.D. Physiology",
                                    img: ScriptStyle1.getRout("assets/img/avatar/37.jpg")
                                }
                            },
                            {
                                link: "",
                                bookMark: "",
                                img: ScriptStyle1.getRout('assets/img/landing/medical/news/03.jpg'),
                                type: "Psychology",
                                time: "Nov 24, 2021",
                                title: "Empowering women to make their health a priority",
                                poster: {
                                    name: "Albert Flores",
                                    pro: "M.Sc. Clinical Neuroscience",
                                    img: ScriptStyle1.getRout("assets/img/avatar/38.jpg")
                                }
                            },
                            {
                                link: "",
                                bookMark: "",
                                img: ScriptStyle1.getRout('assets/img/landing/medical/news/04.jpg'),
                                type: "Health",
                                time: "Oct 13, 2021",
                                title: "Vitamin D: benefits, deficiency, sources, and dosage",
                                poster: {
                                    name: "Jenny Wilson",
                                    pro: "Ph.D. Physiology",
                                    img: ScriptStyle1.getRout("assets/img/avatar/37.jpg")
                                }
                            }
                        ]
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let news = {
                                title: widget.data.title,
                                dataList: widget.data.dataList
                            };
                            return `
                              <!-- Latest news -->
      <section class="container py-5 mb-1 mb-md-4 mb-lg-5">
        <h2 class="h1 text-center pt-1 pb-4 mb-1 mb-lg-3">${news.title}</h2>
        <div class="position-relative px-xl-5">
          
          <!-- Slider prev/next buttons -->
          <button type="button" id="prev-news" class="btn btn-prev btn-icon btn-sm position-absolute top-50 start-0 translate-middle-y d-none d-xl-inline-flex">
            <i class="bx bx-chevron-left"></i>
          </button>
          <button type="button" id="next-news" class="btn btn-next btn-icon btn-sm position-absolute top-50 end-0 translate-middle-y d-none d-xl-inline-flex">
            <i class="bx bx-chevron-right"></i>
          </button>

          <!-- Slider -->
          <div class="px-xl-2">
            <div class="swiper2 mx-n2" data-swiper-options='{
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
            }'>
              <div class="swiper-wrapper">
                ${(() => {
                                let html = ``;
                                news.dataList.list.map((data) => {
                                    html += `
                        <!-- Item -->
                <div class="swiper-slide h-auto pb-3">
                  <article class="card h-100 border-0 shadow-sm mx-2">
                    <div class="position-relative">
                      <a href="${data.link}" class="position-absolute top-0 start-0 w-100 h-100" aria-label="Read more"></a>
                      <a href="${data.bookMark}" class="btn btn-icon btn-light bg-white border-white btn-sm rounded-circle position-absolute top-0 end-0 zindex-5 me-3 mt-3" data-bs-toggle="tooltip" data-bs-placement="left" title="Read later">
                        <i class="bx bx-bookmark"></i>
                      </a>
                      <img src="${data.img}" class="card-img-top" alt="Image">
                    </div>
                    <div class="card-body pb-4">
                      <div class="d-flex align-items-center justify-content-between mb-3">                      
                        <a href="#" class="badge fs-sm text-nav bg-secondary text-decoration-none">${data.type}</a>
                        <span class="fs-sm text-muted">${data.time}</span>
                      </div>
                      <h3 class="h5 mb-0">
                        <a href="#">${data.title}</a>
                      </h3>
                    </div>
                    <div class="card-footer py-4">
                      <a href="#" class="d-flex align-items-center text-decoration-none">
                        <img src="${data.poster.img}" class="rounded" width="48" alt="Avatar">
                        <div class="ps-3">
                          <h6 class="fs-base fw-semibold mb-0">${data.poster.name}</h6>
                          <span class="fs-sm text-muted">${data.poster.pro}</span>
                        </div>
                      </a>
                    </div>
                  </article>
                </div>
                        `;
                                });
                                return html;
                            })()}              
              </div>
    
              <!-- Pagination (bullets) -->
              <div class="swiper-pagination2 position-relative pt-2 pt-sm-3 mt-4"></div>
            </div>
          </div>
        </div>
      </section>
                           `;
                        }, divCreate: {},
                        onCreate: () => {
                            let swiper = new Swiper('.swiper2', {
                                "slidesPerView": 1,
                                "loop": true,
                                "pagination": {
                                    "el": ".swiper-pagination2",
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
                            });
                        }
                    });
                },
                editor: () => {
                    return Editor.arrayItem({
                        originalArray: widget.data.dataList,
                        gvc: gvc,
                        title: '貼文管理',
                        array: widget.data.dataList.list.map((dd, index) => {
                            return {
                                title: dd.title || `區塊:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
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
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: '預覽圖片',
                                        def: widget.data.img,
                                        callback: (data) => {
                                            widget.data.img = data;
                                            widget.refreshComponent();
                                        }
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `點擊連結`,
                                        default: dd.link,
                                        placeHolder: '輸入連結網址',
                                        callback: (text) => {
                                            dd.link = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `貼文類型`,
                                        default: dd.type,
                                        placeHolder: '輸入貼文類型',
                                        callback: (text) => {
                                            dd.type = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `日期`,
                                        default: dd.type,
                                        type: "date",
                                        placeHolder: '輸入日期',
                                        callback: (text) => {
                                            dd.type = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `貼文者姓名`,
                                        default: dd.poster.name,
                                        placeHolder: '輸入姓名',
                                        callback: (text) => {
                                            dd.poster.name = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `貼文者職業`,
                                        default: dd.poster.pro,
                                        placeHolder: '輸入貼文者職業',
                                        callback: (text) => {
                                            dd.poster.pro = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                ]),
                                minus: gvc.event(() => {
                                    widget.data.list.splice(index, 1);
                                    widget.refreshComponent();
                                }),
                            };
                        }),
                        expand: widget.data,
                        plus: {
                            title: '添加貼文',
                            event: gvc.event(() => {
                                widget.data.dataList.list.push({
                                    link: "",
                                    bookMark: "",
                                    img: ScriptStyle1.getRout('assets/img/landing/medical/news/04.jpg'),
                                    type: "Health",
                                    time: "Oct 13, 2021",
                                    title: "Vitamin D: benefits, deficiency, sources, and dosage",
                                    poster: {
                                        name: "Jenny Wilson",
                                        pro: "Ph.D. Physiology",
                                        img: ScriptStyle1.getRout("assets/img/avatar/37.jpg")
                                    }
                                });
                                widget.refreshComponent();
                            }),
                        },
                        refreshComponent: () => {
                            widget.refreshComponent();
                        }
                    });
                }
            };
        },
    };
});
