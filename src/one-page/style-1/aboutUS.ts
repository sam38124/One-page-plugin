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
            ScriptStyle1.initialScript(gvc, widget);
            widget.data.title = widget.data.title ?? '關於我們';
            widget.data.list = widget.data.list ?? [
                {
                    name: '王建智',
                    title: '萊恩設計<br />CEO',
                    img: ScriptStyle1.getRout('img/index/wang.jpg'),
                    desc: `
      曾於上市櫃公司擔任軟體專案的技術領導者與架構規劃師，也熱衷於軟體技術開源協作，在 Github 已有超過 15+ 開源框架，並且取得貢獻者徽章，有著十分熱忱的技術追求，目前在業界已累積開發超過 20 樣以上的產品。<br /><br />
      因為想追求更多未知的技術，而創立了萊恩設計，希望能在為客戶解決問題的同時，增長自身的技術水平。
      `,
                },
                {
                    name: '林致嘉',
                    title: '軟體工程師',
                    img: ScriptStyle1.getRout('img/index/lin.jpg'),
                    desc: `
      畢業於高雄科技大學資訊管理系，大學曾任 PHP 後端工程師，進入萊恩設計後，採用前後端分離技術進行軟體專案的開發，擅長將 JS 渲染工程進行模組化分類，大幅縮短開發時程，降低產品出錯率與提高重複開發效率。<br /><br />
      喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境。
      `,
                },
            ];
            widget.data.bg = widget.data.bg ?? ScriptStyle1.getRout(`img/index/team-bg.jpg`);
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
                                    team.list.map((p: any, i: any) => {
                                        tmp += /*html*/ `
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
                                class: `jarallax dark-mode bg-dark py-xxl-5`, style: `height:100%;`
                            }, onCreate: () => {
                                try{
                                    //@ts-ignore
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
                                }catch (e){
                                    setTimeout(()=>{
                                        gvc.notifyDataChange(id)
                                    },100)
                                }

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
                            originalArray:widget.data.list,
                            gvc: gvc,
                            title: '介紹區塊',
                            array: widget.data.list.map((dd: any, index: number) => {
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
                                            callback: (text: string) => {
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
                                        img: ScriptStyle1.getRout('img/index/wang.jpg'),
                                        desc: `
      曾於上市櫃公司擔任軟體專案的技術領導者與架構規劃師，也熱衷於軟體技術開源協作，在 Github 已有超過 15+ 開源框架，並且取得貢獻者徽章，有著十分熱忱的技術追求，目前在業界已累積開發超過 20 樣以上的產品。<br /><br />
      因為想追求更多未知的技術，而創立了萊恩設計，希望能在為客戶解決問題的同時，增長自身的技術水平。
      `,
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                    ]);
                },
            };
        },
    }
})