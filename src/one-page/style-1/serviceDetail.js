import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            ScriptStyle1.initialScript(gvc, widget);
            widget.data.name = widget.data.name ?? '社群平台';
            widget.data.data = widget.data.data ?? [
                {
                    section: 'img_desc',
                    img: ScriptStyle1.getRout('img/social/social01.jpg'),
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
                    img: ScriptStyle1.getRout('img/social/social02.jpg'),
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
                    img: ScriptStyle1.getRout('img/social/social03.jpg'),
                    title: '活動、部落格、相簿影片 · 提供篩選器搜尋',
                    desc: '能以網格或條列呈現排版，並配合標籤和置頂的方式來排序貼文',
                    point: [
                        { name: '網格排版／條列排版', icon: 'bx bx-grid-alt' },
                        { name: '標籤篩選貼文', icon: 'bx bx-purchase-tag' },
                    ],
                },
                {
                    section: 'list_img',
                    img: ScriptStyle1.getRout('img/social/social04.jpg'),
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
                            originalArray: widget.data.data,
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
                                            originalArray: widget.data.point,
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
                                            refreshComponent: () => {
                                                widget.refreshComponent();
                                            }
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
                                        img: ScriptStyle1.getRout('img/social/social04.jpg'),
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
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        }),
                    ]);
                },
            };
        }
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
