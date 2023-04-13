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
            widget.data.mobile = widget.data.mobile ?? {
                m: {
                    img: ScriptStyle1.getRout('img/index/mobile-kv.png'),
                    title: 'Web & APP Design',
                    desc: '多樣主題網頁模板及 Android 、 iOS 雙平台開發<br />打造專屬應用程式與網站',
                    lottie: 'https://assets5.lottiefiles.com/packages/lf20_zxau6gfz.json',
                    btn: [],
                },
            };
            widget.data.desktop = widget.data.desktop ?? {
                l: {
                    img: ScriptStyle1.getRout('img/index/web-kv.png'),
                    title: 'Web',
                    desc: '單頁式 RWD 網頁，眾多主流模板可供您選擇',
                    lottie: {
                        json: 'https://assets2.lottiefiles.com/packages/lf20_jtupaj9e.json',
                        size: 300,
                    },
                    text: '10 種以上風格、主題豐富多樣<br>最低只要 7,800 元起',
                    btn: {name: '了解主題模板', link: ['template']},
                },
                r: {
                    img: ScriptStyle1.getRout('img/index/app-kv.png'),
                    title: 'APP',
                    desc: 'IoT、藍芽傳遞、社群平台，任何主題都能打造專屬應用程式',
                    lottie: {
                        json: 'https://assets1.lottiefiles.com/packages/lf20_wloxwco0.json',
                        size: 320,
                    },
                    text: '傾聽用戶的需求與設計<br>同時支援 Android 與 iOS 雙平台',
                    btn: {name: '觀看作品案例', link: '#project'},
                },
            };
            ScriptStyle1.initialScript(gvc, widget);
            return {
                view: () => {
                    const keyVision2 = {
                        l: widget.data.desktop.l,
                        r: widget.data.desktop.r,
                        m: widget.data.mobile.m,
                    };
                    return gvc.bindView(()=>{
                        return {
                            bind:glitter.getUUID(),
                            view:()=>{
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
                                    TriggerEvent.trigger({
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
                                    TriggerEvent.trigger({
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
                <h1 data-aos="fade-down" data-aos-delay="200" data-aos-duration="1000" style="word-break: break-word;white-space: normal;">${
                                    keyVision2.m.title
                                }</h1>

                <div
                  class="col-12 col-lg-12 mt-4 ps-3 d-flex justify-content-center"
                  data-aos="fade-up"
                  data-aos-delay="600"
                  data-aos-duration="1000"
                >
                <img src="">
                ${
                                    keyVision2.m.lottie.split('.').pop() === 'json'
                                        ? `
                <lottie-player autoplay loop mode="normal" src="${keyVision2.m.lottie}" style="height: 32vh;width: 32vh;">`
                                        : `
                <img src="${keyVision2.m.lottie}" style="height: 32vh;width: 32vh;">`
                                }
                  
                  </lottie-player>
                </div>

                <h2 data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">${keyVision2.m.desc}</h2>

                <div class="mt-5 d-flex justify-content-evenly">
                ${keyVision2.m.btn
                                    .map((dd: any) => {
                                        return /*html*/ `<button
                            class="btn btn-primary kv-btn ${glitter.htmlGenerate.styleEditor(dd).class()}"
                            onclick="${gvc.event(() => {
                                            TriggerEvent.trigger({
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
        </section>`
                            },
                            divCreate:{},
                            onCreate:()=>{
                                glitter.addMtScript([ {src: `https://unpkg.com/aos@next/dist/aos.js`}],()=>{
                                    //@ts-ignore
                                    AOS.init();
                                },()=>{})

                            }
                        }
                    });
                },
                editor: () => {
                    widget.data.mobile.m.btnExpand = widget.data.mobile.m.btnExpand ?? {};
                    widget.data.mobile.m.btn = widget.data.mobile.m.btn ?? [];

                    function getDBlock(data: any) {
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
                            /*html*/ `<div class="alert-dark alert p-2 mt-2">
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
                                    ${(glitter.htmlGenerate as any).styleEditor(data.btn).editor(gvc, widget)}
                                    ${TriggerEvent.editer(gvc, widget, data.btn, {
                                hover: true,
                                option: [],
                                title: '點擊事件',
                            })}
                                </div>`,
                        ];
                    }

                    return gvc.map([
                        /*html*/ `<div class="mt-2"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '手機版',
                            data: widget.data.mobile.m,
                            innerText: ()=>{
                                return gvc.map([
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
                                        innerText:
                                            ()=>{
                                            return widget.data.mobile.m.btn
                                                    .map((data: any, index: number) => {
                                                        return gvc.map([
                                                            Editor.minusTitle(
                                                                '按鈕:' + (index + 1),
                                                                gvc.event(() => {
                                                                    widget.data.mobile.m.btn.splice(index, 1), widget.refreshComponent();
                                                                })
                                                            ),
                                                            (glitter.htmlGenerate as any).styleEditor(data).editor(gvc, widget),
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
                                                            TriggerEvent.editer(gvc, widget, data, {
                                                                hover: true,
                                                                option: [],
                                                                title: '點擊事件',
                                                            }),
                                                        ]);
                                                    })
                                                    .join('') +
                                                Editor.plusBtn(
                                                    '添家按鈕',
                                                    gvc.event(() => {
                                                        widget.data.mobile.m.btn.push({
                                                            title: ``,
                                                        });
                                                        widget.refreshComponent();
                                                    })
                                                )
                                            },
                                        color: `#0062c0`,
                                    }),
                                ])
                            },
                        }),
                        /*html*/ `<div class="mt-2" style="color: #272993;"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '電腦版',
                            data: widget.data.desktop,
                            innerText:()=>{
                                return  [
                                    Editor.toggleExpand({
                                        gvc: gvc,
                                        title: '左側區塊',
                                        data: widget.data.desktop.l,
                                        innerText: ()=>{
                                            return gvc.map(getDBlock(widget.data.desktop.l))
                                        },
                                        color: `#272993FF`,
                                    }),
                                    Editor.toggleExpand({
                                        gvc: gvc,
                                        title: '右側區塊',
                                        data: widget.data.desktop.r,
                                        innerText: ()=>{
                                            return gvc.map(getDBlock(widget.data.desktop.r))
                                        },
                                        color: `#272993FF`,
                                    }),
                                ].join(/*html*/ `<div class="my-2"></div>`)
                            },
                        }),
                    ]);
                },
            };
        }
    }
})