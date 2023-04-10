import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    let project= {
                        title: "作品案例",
                        desc: "萊恩設計有能力製作多種設計、多功能的單頁式網站或系統軟體，可在下方查找相關案例",
                        tagList:{
                            tag: [
                                { className: "*", title: "所有作品" },
                                { className: ".app", title: "APP" },
                                { className: ".card", title: "活動" },
                                { className: ".web", title: "網頁" },
                            ]
                        },
                        dataList:{
                            list: [
                                { title: "Mani", desc: "App 1, Card 1", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-1.jpg"), tag: ["app", "card"] },
                                { title: "Tablet", desc: "Card 2", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-2.jpg"), tag: ["card"] },
                                { title: "Phone Useful", desc: "Web 1", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-3.jpg"), tag: ["web"] },
                                { title: "Cheer up", desc: "App 2", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-4.jpg"), tag: ["app"] },
                                { title: "Light", desc: "Card 3", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-5.jpg"), tag: ["app", "card"] },
                                { title: "Booker", desc: "Web 2", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-6.jpg"), tag: ["app", "web"] },
                                { title: "Thanks", desc: "App 3", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-7.jpg"), tag: ["app"] },
                                { title: "Tea Time", desc: "Card 4", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-8.jpg"), tag: ["card"] },
                                { title: "Watch", desc: "Web 3", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-9.jpg"), tag: ["card", "web"] },
                            ],
                        }

                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <!-- ======= Portfolio Section ======= -->
                            <section id="project" class="portfolio">
                              <div class="container">
                                <div class="section-title" data-aos="fade-up">
                                  <h2>${project.title}</h2>
                                  <p>${project.desc}</p>
                                </div>
                    
                                <div class="row">
                                  <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
                                    <ul id="portfolio-flters">
                                      ${glitter.print(function () {
                                          let tmp = "";
                                          project.tagList.tag.map((t, i) => {
                                              tmp += /*html*/ ` <li data-filter="${t.className}" ${i == 0 ? `class="filter-active"` : ``}>${t.title}</li> `;
                                          });
                                          return tmp;
                                      })}
                                    </ul>
                                  </div>
                                </div>
                    
                                <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
                                ${glitter.print(function () {
                                    let tmp = "";
                                    project.dataList.list.map((l) => {
                                        var tagClass = "";
                                        l.tag.map((m) => (tagClass += `${m} `));
                                        tmp += /*html*/ `                    
                                        <div class="col-lg-4 col-md-6 portfolio-item border-0 ${tagClass}">
                                            <div class="portfolio-wrap">
                                              <img src="${l.img}" class="img-fluid" alt="" />
                                              <div class="portfolio-info">
                                                <h4>${l.title}</h4>
                                                <p>${l.desc}</p>
                                              </div>
                                              <div class="portfolio-links">
                                                <a href="${l.img}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${l.title}"
                                                  ><i class="bx bx-plus"></i
                                                ></a>
                                                <a title="More Details" onclick="${gvc.event(()=>{
                                                    
                                                })}" style="cursor:pointer"><i class="bx bx-link"></i></a>
                                              </div>
                                            </div>
                                          </div>
                                        `;
                                    });
                                    return tmp;
                                })}
                                </div>
                              </div>
                            </section>
                            <!-- End Portfolio Section -->
                            `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();

                            // @ts-ignore
                            let portfolioContainer = select(".portfolio-container");
                            function select(el:any, all = false){
                                el = el.trim();
                                if (all) {
                                    return [...document.querySelectorAll(el)];
                                } else {
                                    return document.querySelector(el);
                                }
                            }
                            function on(type:any, el:any, listener:any, all = false){
                                let selectEl = select(el, all);
                                if (selectEl) {
                                    if (all) {
                                        selectEl.forEach((e:any) => e.addEventListener(type, listener));
                                    } else {
                                        selectEl.addEventListener(type, listener);
                                    }
                                }
                            }



                            if (portfolioContainer) {
                                // @ts-ignore
                                let portfolioIsotope = new Isotope(portfolioContainer, {
                                    itemSelector: ".portfolio-item",
                                    layoutMode: "fitRows",
                                });

                                let portfolioFilters = select("#portfolio-flters li", true);
                                // @ts-ignore
                                on(
                                    "click",
                                    "#portfolio-flters li",
                                    // @ts-ignore
                                    function (e) {
                                        e.preventDefault();
                                        // @ts-ignore
                                        portfolioFilters.forEach(function (el) {
                                            el.classList.remove("filter-active");
                                        });
                                        // @ts-ignore
                                        this.classList.add("filter-active");

                                        portfolioIsotope.arrange({
                                            // @ts-ignore
                                            filter: this.getAttribute("data-filter"),
                                        });
                                        portfolioIsotope.on("arrangeComplete", function () {
                                            // @ts-ignore
                                            AOS.refresh();
                                        });
                                    },
                                    true
                                );
                            }
                        }

                    })
                },
                editor:()=>{
                    return ``
                    return Editor.arrayItem({
                        originalArray:widget.data.list,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.list.map((dd: any, index: number) => {
                            return {
                                title: dd.title || `區塊:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `索引`,
                                        default: dd.number,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.number = text;
                                            widget.refreshComponent();
                                        },
                                    }),
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
                                    glitter.htmlGenerate.styleEditor(dd).editor(gvc,()=>{
                                        widget.refreshComponent()
                                    },'標題設計樣式'),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `描述`,
                                        default: dd.desc,
                                        placeHolder: '輸入描述',
                                        callback: (text) => {
                                            dd.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    ClickEvent.editer(gvc, widget, dd, {
                                        hover: true,
                                        option: [],
                                        title: "點擊事件"
                                    })
                                ]),
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
                                widget.data.list.push({ number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" });
                                widget.refreshComponent();
                            }),
                        },
                        refreshComponent:()=>{
                            widget.refreshComponent()
                        }
                    })
                }
            }
        },
    }
})