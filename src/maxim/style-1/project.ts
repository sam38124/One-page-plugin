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
            widget.data.title = widget.data.title ?? "作品案例";
            widget.data.desc = widget.data.desc ?? "萊恩設計有能力製作多種設計、多功能的單頁式網站或系統軟體";
            widget.data.tagObject = widget.data.tagObject ?? {tags:[
                { className: "*", title: "所有作品" },
                { className: ".app", title: "APP" },
                { className: ".card", title: "活動" },
                { className: ".web", title: "網頁" },
            ]}
            widget.data.dataList=widget.data.dataList??{
                list: [
                    { title: "Mani", desc: "App 1, Card 1", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-1.jpg"), tag: ["app", "card"] ,expand:false , tagList:{}},
                    { title: "Tablet", desc: "Card 2", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-2.jpg"), tag: ["card"] ,expand:false , tagList:{}},
                    { title: "Phone Useful", desc: "Web 1", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-3.jpg"), tag: ["web"] ,expand:false , tagList:{}},
                    { title: "Cheer up", desc: "App 2", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-4.jpg"), tag: ["app"] ,expand:false , tagList:{}},
                    { title: "Light", desc: "Card 3", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-5.jpg"), tag: ["app", "card"] ,expand:false , tagList:{}},
                    { title: "Booker", desc: "Web 2", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-6.jpg"), tag: ["app", "web"] ,expand:false , tagList:{}},
                    { title: "Thanks", desc: "App 3", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-7.jpg"), tag: ["app"] ,expand:false , tagList:{}},
                    { title: "Tea Time", desc: "Card 4", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-8.jpg"), tag: ["card"] ,expand:false , tagList:{}},
                    { title: "Watch", desc: "Web 3", link: "#", img: ScriptStyle1.getRout("assets/img/portfolio/portfolio-9.jpg"), tag: ["card", "web"] ,expand:false , tagList:{}},
                ],
            }

            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            const project:{
                                title:string,
                                desc:string,
                                tagObject:{
                                    tags:{
                                       className:string,
                                       title:string
                                    }[]
                                },
                                dataList:{
                                    list:{
                                        title:string,
                                        desc:string,
                                        link:string,
                                        img:string,
                                        tag:string[]
                                    }[]
                                }
                            } = {
                                title: widget.data.title,
                                desc: widget.data.desc,
                                tagObject : widget.data.tagObject??{
                                    tags:[
                                        { className: "*", title: "所有作品" },
                                        { className: ".app", title: "APP" },
                                        { className: ".card", title: "活動" },
                                        { className: ".web", title: "網頁" },
                                    ]
                                },
                                dataList : widget.data.dataList
                            }


                            return /*html*/ `
        <!-- ======= Portfolio Section ======= -->
        <section id="project" class="portfolio section-bg">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${project.title}</h2>
              <p>${project.desc}</p>
            </div>

            <div class="row" data-aos="fade-up">
              <div class="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                  ${glitter.print(function () {
                                var tmp = "";
                                project.tagObject.tags.map((a, i) => {
                                    tmp += /*html*/ `<li data-filter="${a.className}" ${i == 0 ? `class="filter-active"` : ``}>${a.title}</li>`;
                                });
                                return tmp;
                            })}
                </ul>
              </div>
            </div>

            <div class="row portfolio-container" data-aos="fade-up">
              ${glitter.print(function () {
                                var tmp = "";
                                project.dataList.list.map((l) => {
                                    var tagClass = "";
                                    l.tag.map((m) => (tagClass += `${m} `));
                                    tmp += /*html*/ `
                    <div class="col-lg-4 col-md-6 border-0 portfolio-item ${tagClass}">
                      <div class="portfolio-wrap">
                        <img src="${l.img}" class="img-fluid" alt="" />
                        <div class="portfolio-info">
                          <h4>${l.title}</h4>
                          <p>${l.desc}</p>
                          <div class="portfolio-links">
                            <a href="${l.img}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${l.title}"
                              ><i class="bx bx-plus"></i
                            ></a>
                            <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                          </div>
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
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            const portfolioLightbox = GLightbox({
                                selector: '.portfolio-lightbox'
                            });
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
                                    itemSelector: '.portfolio-item'
                                });

                                let portfolioFilters = select('#portfolio-flters li', true);

                                on('click', '#portfolio-flters li', function(e:any) {
                                    e.preventDefault();
                                    // @ts-ignore
                                    portfolioFilters.forEach(function(el) {
                                        el.classList.remove('filter-active');
                                    });
                                    // @ts-ignore
                                    this.classList.add('filter-active');

                                    portfolioIsotope.arrange({
                                        // @ts-ignore
                                        filter: this.getAttribute('data-filter')
                                    });
                                    portfolioIsotope.on('arrangeComplete', function() {
                                        // @ts-ignore
                                        AOS.refresh()
                                    });
                                }, true);
                            }

                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.title,
                            placeHolder: '這段的大標',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '副標題',
                            default: widget.data.desc,
                            placeHolder: '給一段適合的副標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray: widget.data.tagObject.tags,
                            gvc: gvc,
                            title: '標籤設定',
                            array: widget.data.tagObject.tags.map((tag: any, index: number) => {
                                return {
                                    title: tag.title??`標題資訊`,
                                    expand: tag,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: tag.title,
                                            placeHolder: '輸入大標題',
                                            callback: (text) => {
                                                tag.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標籤連結[* 代表全部] 最前方請+.`,
                                            default: tag.className,
                                            placeHolder: '請至少輸入一個*',
                                            callback: (text) => {
                                                tag.className = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.tagObject.tags.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.tagObject,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.tagObject.tags.push({ className: "*", title: "新標籤",expand:true });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                        originalArray:widget.data.dataList.list,
                        gvc: gvc,
                        title: '行列內容',
                        array: widget.data.dataList.list.map((list: any, index: number) => {
                            return {
                                title: list.title || `第${index + 1}列資訊`,
                                expand: list,
                                innerHtml: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `標題`,
                                        default: list.title,
                                        placeHolder: '輸入大標題',
                                        callback: (text) => {
                                            list.title = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeText({
                                        gvc: gvc,
                                        title: `內文敘述`,
                                        default: list.desc,
                                        placeHolder: '輸入內文',
                                        callback: (text) => {
                                            list.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    Editor.uploadImage({
                                        gvc: gvc,
                                        title: '主要圖片',
                                        def:list.img,
                                        callback:(data)=>{
                                            list.img=data
                                            widget.refreshComponent()
                                        }
                                    }),
                                    Editor.toggleExpand({
                                        gvc: gvc,
                                        title: `標籤設定`,
                                        data: list.tagList,

                                        innerText:()=>{

                                            return  list.tag.map((d2: any, index: number) => {

                                                return Editor.searchInput({
                                                    gvc: gvc,
                                                    title: Editor.minusTitle((widget.data.tagObject.tags.find((dd: any) => {
                                                        return dd.className === `${d2}`
                                                    }) ?? {}).title || `標籤:${index + 1}`, gvc.event(() => {
                                                        list.tag.splice(index, 1)
                                                        widget.refreshComponent()
                                                    })),
                                                    def: (widget.data.tagObject.tags.find((dd: any) => {
                                                        return dd.className === `.${d2}`
                                                    }) ?? {}).title ?? "",
                                                    placeHolder: "標籤",
                                                    callback: (text) => {
                                                        list.tag[index] = widget.data.tagObject.tags.find((dd: any) => {
                                                            return dd.title === text
                                                        }).className
                                                        if (list.tag[index][0]=='.'){
                                                            list.tag[index] = list.tag[index].substr(1);
                                                        }

                                                        widget.refreshComponent()
                                                    },
                                                    array: widget.data.tagObject.tags.map((dd: any) => {
                                                        return dd.title
                                                    })
                                                })
                                            }).join(`<div class="my-2"></div>`) + Editor.plusBtn("添加標籤", gvc.event(() => {
                                                list.tag.push('*')

                                                widget.refreshComponent()
                                            }))
                                        },
                                        color: `#0062c0`
                                    }),

                                ]),
                                minus: gvc.event(() => {
                                    widget.data.dataList.list.splice(index, 1);
                                    widget.refreshComponent();
                                }),
                            };
                        }),
                        expand: widget.data.dataList,
                        plus: {
                            title: '添加區塊',
                            event: gvc.event(() => {
                                widget.data.dataList.list.push({ img: "",
                                    title: "新標題",
                                    desc: "新敘述",
                                    price: 0,
                                    tag: [] ,expand:false});
                                widget.refreshComponent();
                            }),
                        },
                        refreshComponent:()=>{
                            widget.refreshComponent()
                        }
                    })
                    ])
                }
            }
        },
    }
})