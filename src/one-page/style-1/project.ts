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
                    img: ScriptStyle1.getRout(`img/project/scholl.png`),
                    page: `project`,
                },
                {
                    title: '橙的電子',
                    sub: '胎壓偵測器之物聯網後台平台<br />(Web)',
                    tag: ['cms', 'dashboard', 'web'],
                    img: ScriptStyle1.getRout('img/project/orangeback.png'),
                    page: `project`,
                },
                {
                    title: '緒玹科技',
                    sub: '外包媒合平台 (Android / iOS)',
                    tag: ['app'],
                    img: ScriptStyle1.getRout('img/project/matching.png'),
                    page: `project`,
                },
                {
                    title: '御天科技',
                    sub: 'GOT-IT EIP (Android / iOS)',
                    tag: ['app'],
                    img: ScriptStyle1.getRout('img/project/eip.png'),
                    page: `project`,
                },
                {
                    title: '緒玹科技',
                    sub: '外包媒合平台 (Web)',
                    tag: ['web'],
                    img: ScriptStyle1.getRout('img/project/proshake_web.png'),
                    page: `project`,
                },
                {
                    title: 'Petstagram寵生活',
                    sub: '為寵物量身打造的社群媒體平台',
                    tag: ['app', 'web'],
                    img: ScriptStyle1.getRout('img/project/Petstagram.jpg'),
                    page: `project`,
                },
                {
                    title: '橙的電子',
                    sub: 'Android 手持應用終端 Sensor 燒錄器',
                    tag: ['ble', 'app'],
                    img: ScriptStyle1.getRout('img/project/pda.png'),
                    page: `project`,
                },
                {
                    title: '橙的電子',
                    sub: '後端數據分析平台',
                    tag: ['cms', 'dashboard', 'web'],
                    img: ScriptStyle1.getRout('img/project/orange_backany.png'),
                    page: `project`,
                },
                {
                    title: '奇樂旅遊',
                    sub: '自媒體社群平台',
                    tag: ['web', 'app'],
                    img: ScriptStyle1.getRout('img/project/phone.png'),
                    page: `project`,
                },
                {
                    title: '橙的電子',
                    sub: 'O-Genius Lite',
                    tag: ['ble'],
                    img: ScriptStyle1.getRout('img/project/oglite_f03.png'),
                    page: `project`,
                },
                {
                    title: '緒玹科技',
                    sub: '訂單與薪資管理<br />(Android / iOS / Web)',
                    tag: ['cms', 'app', 'web'],
                    img: ScriptStyle1.getRout('img/project/order.png'),
                    page: `project`,
                },
                {
                    title: '橙的電子',
                    sub: '胎壓偵測器之物聯網接收',
                    tag: ['app', 'ble'],
                    img: ScriptStyle1.getRout('img/project/tpmsiot.png'),
                    page: `project`,
                },
                {
                    title: '橙的電子',
                    sub: 'USB-PAD藍芽無線燒錄器',
                    tag: ['app', 'ble'],
                    img: ScriptStyle1.getRout('img/project/usbpad.png'),
                    page: `project`,
                },
                {
                    title: '星澄基地',
                    sub: '星澄基地，跨站式程式開發平台．',
                    tag: ['web', 'cms', 'dashboard'],
                    img: ScriptStyle1.getRout('img/project/glitterp.png'),
                    page: `project`,
                },
                {
                    title: '星澄基地',
                    sub: '星澄基地，一站式後台管理平台．',
                    tag: ['web', 'cms', 'dashboard'],
                    img: ScriptStyle1.getRout('img/project/bg_manager.png'),
                    page: `project`,
                },
                {
                    title: '萊恩設計',
                    sub: '官方形象網站',
                    tag: ['web'],
                    img: ScriptStyle1.getRout('img/project/LionWeb.png'),
                    page: `project`,
                },
            ];
            widget.data.bg = widget.data.bg ?? {};
            const project = {
                title: widget.data.title,
                tag: widget.data.tag,
                list: widget.data.list,
            };
            project.list.map((data: any) => {
                data.btn = data.btn ?? {
                    title: '前往查看',
                };
            });
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    return `
${gvc.bindView(() => {
                        const swiperID = gvc.glitter.getUUID();
                        const pjid=glitter.getUUID()
                        return {
                            bind: pjid,
                            view: () => {
                                return /*html*/ `<h2 class="h1 pb-3 pb-lg-4 text-center">${project.title}</h2>
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
                                    project.list.map((l: any) => {
                                        tmp += /*html*/ `
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
                                            l.tag.map((t: any) => {
                                                var tag: any = project.tag.find((g: any) => g.title == t);
                                                if (tag) {
                                                    tmp += /*html*/ `
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
                                            TriggerEvent.trigger({
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
                                try{
                                    //@ts-ignore
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
                                }catch (e){
                                    setTimeout(()=>{
                                        gvc.notifyDataChange(pjid)
                                    },100)
                                }
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
                        glitter.htmlGenerate.styleEditor(widget.data.bg).editor(
                            gvc,
                            () => {
                                widget.refreshComponent();
                            },
                            '背景設計樣式'
                        ),
                        /*html*/ `<div class="mb-2"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: `標籤設定`,
                            data: widget.data.tabExpand,
                            innerText:
                                ()=>{
                                return widget.data.tag
                                        .map((data: any, index: number) => {
                                            return Editor.toggleExpand({
                                                gvc: gvc,
                                                title: Editor.minusTitle(
                                                    data.title || '標籤' + (index + 1),
                                                    gvc.event(() => {
                                                        widget.data.tag.splice(index, 1);
                                                        widget.refreshComponent();
                                                    })
                                                ),
                                                data: data,
                                                innerText: ()=>{
                                                    return gvc.map([
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
                                                    ])
                                                },
                                                color: `#004281`,
                                            });
                                        })
                                        .join(/*html*/ `<div class="my-2"></div>`) +
                                    Editor.plusBtn(
                                        '新增標籤',
                                        gvc.event(() => {
                                            widget.data.tag.push({
                                                style: `background-color:var(--bs-red);`,
                                                class: ``,
                                                title: `網頁設計`,
                                            });
                                            widget.refreshComponent();
                                        })
                                    )
                                },
                            color: `#0062c0`,
                        }),
                        /*html*/ `<div class="alert alert-dark p-2 mt-2">
                                ${Editor.h3('案例列表')}
                                ${(() => {
                            let dragm = {
                                start: 0,
                                end: 0,
                            };

                            return widget.data.list
                                .map((data: any, index: number) => {
                                    data.tabExpand = data.tabExpand ?? {};
                                    return Editor.toggleExpand({
                                        gvc: gvc,
                                        title: `<div    draggable="true"  ondragenter="${gvc.event((e, event) => {
                                            dragm.end = index;
                                        })}" ondragstart="${gvc.event(() => {
                                            dragm.start = index;
                                            dragm.end = index;
                                        })}"   ondragend="${gvc.event(() => {
                                            ScriptStyle1.swapArr(widget.data.list, dragm.start, dragm.end);
                                            widget.refreshComponent()
                                        })}">${Editor.minusTitle(
                                            data.title || `案例:${index + 1}`,
                                            gvc.event(() => {
                                                widget.data.list.splice(index, 1);
                                                widget.refreshComponent();
                                            })
                                        )}</div>`,
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
                                                glitter.htmlGenerate.styleEditor(data.btn).editor(gvc, widget as any, '按鈕設計樣式'),
                                                TriggerEvent.editer(gvc, widget, data.btn, {
                                                    hover: true,
                                                    option: [],
                                                    title: '點擊事件',
                                                }),
                                            ])
                                        },
                                    })
                                })
                                .join(/*html*/ `<div class="my-2"></div>`)
                        })()}
                                ${Editor.plusBtn(
                            '添加案例',
                            gvc.event(() => {
                                widget.data.list.push({
                                    title: '萊恩設計',
                                    sub: '官方形象網站',
                                    tag: [],
                                    img: ScriptStyle1.getRout('img/project/LionWeb.png'),
                                    page: `project`,
                                });
                                widget.refreshComponent();
                            })
                        )}
                            </div>`,
                    ]);
                },
            };
        },
    }
})
