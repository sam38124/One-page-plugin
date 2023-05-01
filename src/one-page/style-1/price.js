import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { TriggerEvent } from "../../glitterBundle/plugins/trigger-event.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
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
            widget.data.bg = widget.data.bg ?? ScriptStyle1.getRout('img/index/price-bg.jpg');
            const price = {
                main: widget.data.main,
                sub: widget.data.sub,
                bg: widget.data.bg,
            };
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
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
                        TriggerEvent.trigger({
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
                        TriggerEvent.trigger({
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
                                    ${TriggerEvent.editer(gvc, widget, data.btn, {
                                hover: true,
                                option: [],
                                title: '點擊事件',
                            })}
                                </div>`,
                            Editor.toggleExpand({
                                gvc: gvc,
                                title: '列表項目',
                                data: data,
                                innerText: () => {
                                    return data.list
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
                                        }));
                                },
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
                            innerText: () => {
                                return Editor.uploadLottie({
                                    gvc: gvc,
                                    title: `圖片或Lottie動畫區塊`,
                                    def: widget.data.main.lottie,
                                    callback: (data) => {
                                        widget.data.main.lottie = data;
                                        widget.refreshComponent();
                                    },
                                }) + getData(widget.data.main);
                            },
                        }),
                        Editor.toggleExpand({
                            gvc: gvc,
                            title: '右側區塊',
                            data: widget.data.sub,
                            innerText: () => {
                                return getData(widget.data.sub);
                            },
                        }),
                    ].join('<div class="my-2"></div>');
                },
            };
        },
    };
});
