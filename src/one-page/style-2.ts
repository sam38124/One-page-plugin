import { HtmlJson, Plugin } from '../glitterBundle/plugins/plugin-creater.js';
import { Glitter } from '../glitterBundle/Glitter.js';
import { GVC } from '../glitterBundle/GVController.js';
import { Editor } from '../editor.js';
import { TriggerEvent } from '../glitterBundle/plugins/trigger-event.js';
import { Tool } from './tool.js';

Plugin.create(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    function getRout(link: string) {
        return new URL('./' + link, import.meta.url).href;
    }

    return {
        keyVision: {
            title: '主視覺',
            subContent: '網站進入時的首頁主視覺',
            defaultData: {},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                const word = [
                    { key: 'title', text: '標題', style: 'font-size: 30px;' },
                    { key: 'slogan', text: '口號', style: 'font-size: 20px;' },
                    { key: 'content', text: '簡述', style: 'font-size: 14px;' },
                ];

                word.map((x) => {
                    widget.data[x.key] = widget.data[x.key] ?? {};
                    widget.data[x.key].web = widget.data[x.key].web ?? { text: `網頁${[x.text]}未定義` };
                    widget.data[x.key].mobile = widget.data[x.key].mobile ?? { text: `手機${[x.text]}未定義` };
                });

                widget.data.circles = widget.data.circles ?? {
                    count: glitter.ut.frSize({ md: 120 }, Math.floor(120 * 0.5)),
                    bg: 'linear-gradient(to right, #434343 0%, black 100%);',
                    radius: { start: 30, end: 100 },
                };

                widget.data.btnList =
                    widget.data.btnList !== undefined && widget.data.btnList.length > 0
                        ? widget.data.btnList
                        : [
                              { name: '線上演示', icon: 'bx bx-play-circle', color: 'primary', hyperLink: '' },
                              { name: '立即開始', icon: 'bx bx-chevron-right', color: 'danger', hyperLink: '' },
                          ];

                widget.data.lottie =
                    widget.data.lottie !== undefined && widget.data.lottie.length > 0
                        ? widget.data.lottie
                        : [
                              {
                                  displayOrder: 0,
                                  json: 'https://assets5.lottiefiles.com/packages/lf20_xfx6wio6.json',
                                  size: 30,
                                  top: 30,
                                  right: 12,
                              },
                              {
                                  displayOrder: 1,
                                  json: 'https://assets1.lottiefiles.com/packages/lf20_mnn2ubr9.json',
                                  size: 30,
                                  top: 7,
                                  right: 30,
                              },
                          ];

                function circlesGene(style: { count: number; bg?: string; radius?: { start: number; end: number } }) {
                    gvc.addStyle(/*css*/ `
                    .area {
                        background-image: ${style?.bg ?? 'linear-gradient(to right, #94bdae 0%, #1866a2 100%)'};
                        width: 100%;
                        height: 100vh;
                    }
                    .circles {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    .circles li {
                        position: absolute;
                        display: block;
                        list-style: none;
                        width: 20px;
                        height: 20px;
                        background: rgba(255, 255, 255, 0.2);
                        animation: animate 5s linear infinite;
                        bottom: -150px;
                    }
                    @keyframes animate {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                            border-radius: ${style?.radius?.start ?? 30}%;
                        }
                    
                        100% {
                            transform: translateY(-1000px) rotate(720deg);
                            opacity: 0;
                            border-radius: ${style?.radius?.end ?? 30}%;
                        }
                    }
                    `);
                    let h = '<ul class="circles">';
                    for (let i = 0; i < style.count; i++) {
                        const wh = Math.floor(Math.random() * 70) + 30;
                        gvc.addStyle(/*css*/ `.circles li:nth-child(${i + 1}) {
                            left: ${Math.floor(Math.random() * 100)}%;
                            width: ${wh}px;
                            height: ${wh}px;
                            animation-delay: ${Math.floor(Math.random() * 15)}s;
                            animation-duration: ${Math.floor(Math.random() * 20) + 10}s;
                        }`);
                        h += '<li></li>';
                    }
                    h += '</ul>';
                    return h;
                }

                return {
                    view: () => {
                        return /*html*/ `
                            <div class="vh-100 area">
                                ${circlesGene(widget.data.circles)}
                                <div class="col-md-5">
                                    ${(() => {
                                        return glitter.ut.frSize(
                                            {
                                                lg: /*html*/ `
                                                    <div style="padding: 30% 0 5% 20%">
                                                        ${glitter.print(() => {
                                                            let h = '';
                                                            word.map((x) => {
                                                                h += /*html*/ `<div class="mb-5">
                                                                    <h3
                                                                        class="${glitter.htmlGenerate
                                                                            .styleEditor(widget.data[x.key].web)
                                                                            .class()}"
                                                                        style="${glitter.htmlGenerate
                                                                            .styleEditor(widget.data[x.key].web)
                                                                            .style()}"
                                                                    >
                                                                        ${widget.data[x.key].web.text}
                                                                    </h3>
                                                                </div>`;
                                                            });
                                                            return h;
                                                        })}
                                                    </div>
                                                `,
                                            },
                                            /*html*/ `
                                                <div style="padding: 30% 5% 8% 5%; text-align: center">
                                                    ${glitter.print(() => {
                                                        let h = '';
                                                        word.map((x) => {
                                                            h += /*html*/ `<div class="mt-2">
                                                                <h3
                                                                    class="${glitter.htmlGenerate
                                                                        .styleEditor(widget.data[x.key].mobile)
                                                                        .class()}"
                                                                    style="${glitter.htmlGenerate
                                                                        .styleEditor(widget.data[x.key].mobile)
                                                                        .style()}"
                                                                >
                                                                    ${widget.data[x.key].mobile.text}
                                                                </h3>
                                                            </div>`;
                                                        });
                                                        return h;
                                                    })}
                                                </div>
                                            `
                                        );
                                    })()}
                                    <div class="w-100 d-flex flex-wrap" style="padding: 0 ${glitter.ut.frSize({ lg: 20 }, 3)}%">
                                        ${glitter.print(() => {
                                            let h = '';
                                            widget.data.btnList.map(
                                                (x: { name: string; icon: string; color: string; hyperLink: string }) => {
                                                    h += /*html*/ `<div
                                                        class="btn btn-${x.color} text-center text-md-start flex-fill mx-2 d-flex align-items-center"
                                                    >
                                                        ${x.name}<i class="${x.icon} ms-1 fs-4"></i>
                                                    </div>`;
                                                }
                                            );
                                            return h;
                                        })}
                                    </div>
                                    ${glitter.print(() => {
                                        let h = '';
                                        if (glitter.ut.frSize({ lg: false }, true)) {
                                            h += '<div class="row mt-4">';
                                            widget.data.lottie.map(
                                                (x: { displayOrder: number; json: string; size: number; top: number; right: number }) => {
                                                    h += /*html*/ `<div class="col-6 mt-3 d-flex justify-content-center" style="">
                                                        <lottie-player autoplay loop mode="normal" src="${x.json}" style="width: 10em;">
                                                        </lottie-player>
                                                    </div>`;
                                                }
                                            );
                                            h += '</div>';
                                        }
                                        return h;
                                    })}
                                </div>
                                <div class="col-md-7">
                                    ${glitter.print(() => {
                                        let h = '';
                                        const bi = Number((window as any).$(window).width()) / 1920;
                                        if (glitter.ut.frSize({ lg: true }, false)) {
                                            widget.data.lottie.map(
                                                (x: { displayOrder: number; json: string; size: number; top: number; right: number }) => {
                                                    h += /*html*/ `<div
                                                        class=""
                                                        style="position: absolute; top: ${x.top}%; right: ${x.right}%; z-index:${
                                                        x.displayOrder
                                                    }"
                                                    >
                                                        <lottie-player
                                                            autoplay
                                                            loop
                                                            mode="normal"
                                                            src="${x.json}"
                                                            style="width: ${x.size * bi}em;"
                                                        >
                                                        </lottie-player>
                                                    </div>`;
                                                }
                                            );
                                        }
                                        return h;
                                    })}
                                </div>
                            </div>
                        `;
                    },
                    editor: () => {
                        let a = '';
                        word.map((x) => {
                            a += `<div class="mt-2">${Editor.toggleExpand({
                                gvc: gvc,
                                title: x.text,
                                data: widget.data[x.key],
                                innerText: ()=>{
                                    return gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `電腦版 - ${x.text}`,
                                            default: widget.data[x.key].web.text,
                                            placeHolder: `輸入${x.text}`,
                                            callback: (text) => {
                                                widget.data[x.key].web.text = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        /*html*/ `<div class="alert-dark alert p-2 mt-2">
                                        ${(glitter.htmlGenerate as any)
                                            .styleEditor(widget.data[x.key].web)
                                            .editor(gvc, widget as any, '設計樣式')}
                                    </div>`,
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `手機板 - 標題`,
                                            default: widget.data[x.key].mobile.text,
                                            placeHolder: `輸入${x.text}`,
                                            callback: (text) => {
                                                widget.data[x.key].mobile.text = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        /*html*/ `<div class="alert-dark alert p-2 mt-2">
                                        ${(glitter.htmlGenerate as any)
                                            .styleEditor(widget.data[x.key].mobile)
                                            .editor(gvc, widget as any, '設計樣式')}
                                    </div>`,
                                    ])
                                },
                            })}</div>`;
                        });
                        return gvc.map([
                            a,
                            `<div class="mt-2">${Editor.toggleExpand({
                                gvc: gvc,
                                title: '圖片/動畫',
                                data: widget.data.lottie,
                                innerText: ()=>{
                                    return gvc.map([
                                        Editor.uploadLottie({
                                            gvc: gvc,
                                            title: `圖片或Lottie動畫 1`,
                                            def: widget.data.lottie[0].json,
                                            callback: (text) => {
                                                widget.data.lottie[0].json = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadLottie({
                                            gvc: gvc,
                                            title: `圖片或Lottie動畫 2`,
                                            def: widget.data.lottie[1].json,
                                            callback: (text) => {
                                                widget.data.lottie[1].json = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ])
                                },
                            })}</div>`,
                        ]);
                    },
                };
            },
        },
        service: {
            title: '服務簡介',
            subContent: '各種服務簡介說明',
            defaultData: {},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                widget.data.title = widget.data.title ?? '作品案例';
                widget.data.bg = widget.data.bg ?? {};
                widget.data.service = widget.data.service ?? [
                    {
                        title: '社群應用',
                        sub: '獨立管理的社群平台',
                        tag: [],
                        img: getRout(`img/project/scholl.png`),
                        page: '',
                    },
                    {
                        title: '社群應用',
                        sub: '提供快速發文 · 活動規劃功能',
                        tag: [],
                        img: getRout(`img/project/scholl.png`),
                        page: '',
                    },
                    {
                        title: '自媒體應用',
                        sub: '展現自媒體獨特一面的個人頁面',
                        tag: [],
                        img: getRout(`img/project/scholl.png`),
                        page: '',
                    },
                    {
                        title: '自媒體應用',
                        sub: '接受多媒體貼文與串流網站',
                        tag: [],
                        img: getRout(`img/project/scholl.png`),
                        page: '',
                    },
                    {
                        title: '電商應用',
                        sub: '美觀的導覽列與橫幅式廣告',
                        tag: [],
                        img: getRout(`img/project/scholl.png`),
                        page: '',
                    },
                    {
                        title: '電商應用',
                        sub: '細節詳細不失美觀 · 最佳瀏覽觀感',
                        tag: [],
                        img: getRout(`img/project/scholl.png`),
                        page: '',
                    },
                    {
                        title: '資料儀錶板',
                        sub: '商業最常見的資料呈現用圖表',
                        tag: [],
                        img: getRout(`img/project/scholl.png`),
                        page: '',
                    },
                    {
                        title: '資料儀錶板',
                        sub: '圖卡資料畫面統一 · 寬度自由彈性',
                        tag: [],
                        img: getRout(`img/project/scholl.png`),
                        page: '',
                    },
                ];

                widget.data.tag = widget.data.tag ?? [
                    {
                        style: `background-color:var(--bs-indigo);`,
                        title: `APP`,
                    },
                    {
                        style: `background-color:var(--bs-purple);`,
                        title: `後台系統`,
                    },
                    {
                        style: `background-color:var(--bs-orange);`,
                        title: `資料分析`,
                    },
                    {
                        style: `background-color:var(--bs-red);`,
                        title: `網頁設計`,
                    },
                ];
                return {
                    view: () => {
                        return /*html*/ `<div
                            style="background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; background-blend-mode: multiply,multiply;"
                        >
                            ${gvc.bindView(() => {
                                const swiperID = gvc.glitter.getUUID();
                                return {
                                    bind: `project`,
                                    view: () => {
                                        return /*html*/ `<h2 class="h1 py-4 text-center">${widget.data.title}</h2>
                                            <div class="position-relative px-xl-5">
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
                                                <div class="px-xl-2">
                                                    <div id="${swiperID}" class="swiper mx-n2">
                                                        <div class="swiper-wrapper">
                                                            ${glitter.print(function () {
                                                                let tmp = '';
                                                                widget.data.service.map((l: any) => {
                                                                    tmp += /*html*/ `
                                                                        <div class="swiper-slide h-auto pb-3">
                                                                            <article class="card h-100 border-0 shadow-sm mx-2">
                                                                                <div class="position-relative">
                                                                                    <div
                                                                                        style="width: 100%; height: 350px; background-size: cover; background-position: center center; background:url(${
                                                                                            l.img
                                                                                        }); "
                                                                                    ></div>
                                                                                </div>
                                                                                <div class="card-body text-center d-flex flex-column">
                                                                                    <div
                                                                                        class="d-flex align-items-center mb-3"
                                                                                        style="gap: 10px;"
                                                                                    >
                                                                                        ${glitter.print(function () {
                                                                                            let tmp = '';
                                                                                            console.log(l.tag);
                                                                                            l.tag.map((t: any) => {
                                                                                                let tag: any = widget.data.tag.find(
                                                                                                    (g: any) => g.title == t
                                                                                                );
                                                                                                console.log(tag);
                                                                                                if (tag) {
                                                                                                    tmp += /*html*/ `
                                                                                                        <a
                                                                                                            class="badge fs-sm text-nav text-decoration-none ${glitter.htmlGenerate
                                                                                                                .styleEditor(tag)
                                                                                                                .class()}"
                                                                                                            style="${glitter.htmlGenerate
                                                                                                                .styleEditor(tag)
                                                                                                                .style()}"
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

                                                                                    <div
                                                                                        class="fs-5 mb-2"
                                                                                        style="word-break: break-all;white-space: normal;"
                                                                                    >
                                                                                        ${l.sub}
                                                                                    </div>
                                                                                </div>
                                                                            </article>
                                                                        </div>
                                                                    `;
                                                                });
                                                                return tmp;
                                                            })}
                                                        </div>

                                                        <div class="swiper-pagination position-relative bottom-0 mt-4 mb-lg-2"></div>
                                                    </div>
                                                </div>
                                            </div>`;
                                    },
                                    divCreate: {
                                        class: `container px-3 py-4 ${glitter.htmlGenerate.styleEditor(widget.data.bg).class()}`,
                                        style: glitter.htmlGenerate.styleEditor(widget.data.bg).style(),
                                    },
                                    onCreate: () => {
                                        const tool = new Tool();
                                        tool.waitLoadModule('Swiper', () => {
                                            new (window as any).Swiper(`#${swiperID}`, {
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
                                        });
                                    },
                                };
                            })}
                        </div>`;
                    },
                    editor: () => {
                        return gvc.map([
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: `標題`,
                                default: widget.data.title,
                                placeHolder: `輸入標題`,
                                callback: (text) => {
                                    widget.data.title = text;
                                    widget.refreshComponent();
                                },
                            }),
                            /*html*/ `<div class="alert alert-dark p-2 mt-2">
                                ${Editor.h3('案例列表')}
                                ${widget.data.service
                                    .map((data: any, index: number) => {
                                        data.tabExpand = data.tabExpand ?? {};
                                        return Editor.toggleExpand({
                                            gvc: gvc,
                                            title: Editor.minusTitle(
                                                data.title || `案例:${index + 1}`,
                                                gvc.event(() => {
                                                    widget.data.list.splice(index, 1);
                                                    widget.refreshComponent();
                                                })
                                            ),
                                            data: data,
                                            innerText: ()=>{
                                                return gvc.map([
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
                                                    /*html*/ `<div class="mb-2"></div>`,
                                                    Editor.toggleExpand({
                                                        gvc: gvc,
                                                        title: `標籤設定`,
                                                        data: data.tabExpand,
                                                        innerText:
                                                            ()=>{
                                                            return  data.tag
                                                                    .map((d2: any, index: number) => {
                                                                        return Editor.searchInput({
                                                                            gvc: gvc,
                                                                            title: Editor.minusTitle(
                                                                                d2 || `標籤:${index + 1}`,
                                                                                gvc.event(() => {
                                                                                    data.tag.splice(index, 1);
                                                                                    widget.refreshComponent();
                                                                                })
                                                                            ),
                                                                            def: d2,
                                                                            placeHolder: '標籤',
                                                                            callback: (text) => {
                                                                                data.tag[index] = text;
                                                                                widget.refreshComponent();
                                                                            },
                                                                            array: widget.data.tag.map((dd: any) => {
                                                                                return dd.title;
                                                                            }),
                                                                        });
                                                                    })
                                                                    .join(/*html*/ `<div class="my-2"></div>`) +
                                                                Editor.plusBtn(
                                                                    '添加標籤',
                                                                    gvc.event(() => {
                                                                        data.tag.push('');
                                                                        widget.refreshComponent();
                                                                    })
                                                                )
                                                            },
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
                                                ])
                                            },
                                        });
                                    })
                                    .join(/*html*/ `<div class="my-2"></div>`)}
                            </div>`,
                        ]);
                    },
                };
            },
        },
        about: {
            title: '關於欄位',
            subContent: '文字圖片來做服務介紹',
            defaultData: {},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                widget.data = widget.data ?? {};
                widget.data.title = widget.data.title ?? { text: '這是標題' };
                widget.data.contents = widget.data.contents ?? { text: '這是簡述' };
                return {
                    view: () => {
                        return /*html*/ `
                            <div class="row py-5 align-items-center" style="background-image: linear-gradient(-20deg, #616161 0%, #9bc5c3 100%); w1e">
                                <div class="col-lg-5">
                                    <img src="assets/images/features-1.svg" class="img-fluid" alt="" />
                                </div>
                                <div class="col-lg-6 offset-lg-1">
                                    <h3 class="fw-normal">${widget.data.title.text}</h3>
                                    <p class="text-muted mt-3">${widget.data.contents.text}</p>

                                    <div class="mt-4">
                                        <p class="text-muted"><i class="mdi mdi-circle-medium text-primary"></i> Projects &amp; Tasks</p>
                                        <p class="text-muted">
                                            <i class="mdi mdi-circle-medium text-primary"></i> Ecommerce Application Pages
                                        </p>
                                        <p class="text-muted">
                                            <i class="mdi mdi-circle-medium text-primary"></i> Profile, pricing, invoice
                                        </p>
                                        <p class="text-muted">
                                            <i class="mdi mdi-circle-medium text-primary"></i> Login, signup, forget password
                                        </p>
                                    </div>

                                    <a href="" class="btn btn-primary btn-rounded mt-3"
                                        >Read More <i class="mdi mdi-arrow-right ms-1"></i
                                    ></a>
                                </div>
                            </div>
                        `;
                    },
                    editor: () => {
                        return gvc.map([
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: '標題',
                                default: widget.data.title.text,
                                placeHolder: '輸入標題',
                                callback: (text) => {
                                    widget.data.title.text = text;
                                    widget.refreshComponent();
                                },
                            }),
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: '描述',
                                default: widget.data.contents.text,
                                placeHolder: '輸入描述',
                                callback: (text) => {
                                    widget.data.contents.text = text;
                                    widget.refreshComponent();
                                },
                            }),
                        ]);
                    },
                };
            },
        },
    };
});
