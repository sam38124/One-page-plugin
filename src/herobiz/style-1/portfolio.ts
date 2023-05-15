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
            widget.data.desc = widget.data.desc ?? "萊恩設計接手過400+的案件，網頁設計與 APP 製作流程非常值得信賴";
            widget.data.tagObject = widget.data.tagObject ?? {tags:[
                { className: "*", title: "所有案例" },
                { className: ".app", title: "APP", color: "indigo" },
                { className: ".web", title: "網頁設計", color: "purple" },
                { className: ".cms", title: "後台系統", color: "red" },
                { className: ".dashboard", title: "資料分析", color: "orange" },
                { className: ".ble", title: "藍芽產品", color: "green" },
            ]}
            widget.data.dataList=widget.data.dataList??{
                list: [
                    {
                        title: "高雄醫藥大學",
                        tag: ["app", "cms"],
                        img: ScriptStyle1.getRout("assets/img/portfolio/app-1.jpg"),
                    },
                    {
                        title: "橙的電子",
                        tag: ["cms", "dashboard", "web"],
                        img: ScriptStyle1.getRout("assets/img/portfolio/books-1.jpg"),
                    },
                    { title: "緒玹科技", tag: ["app"], img: ScriptStyle1.getRout("assets/img/portfolio/books-1.jpg") },
                    { title: "御天科技", tag: ["app"], img: ScriptStyle1.getRout("assets/img/portfolio/app-2.jpg") },
                    { title: "緒玹科技", img: ScriptStyle1.getRout("assets/img/portfolio/product-1.jpg") },
                    {
                        title: "Petstagram寵生活",
                        tag: ["app", "web"],
                        img: ScriptStyle1.getRout("assets/img/portfolio/product-3.jpg"),
                    },
                    {
                        title: "橙的電子",
                        tag: ["ble", "app"],
                        img: ScriptStyle1.getRout("assets/img/portfolio/branding-2.jpg"),
                    },
                    {
                        title: "橙的電子",
                        tag: ["cms", "dashboard", "web"],
                        img: ScriptStyle1.getRout("assets/img/portfolio/branding-2.jpg"),
                    },
                    {
                        title: "緒玹科技",
                        tag: ["cms", "app", "web"],
                        img: ScriptStyle1.getRout("assets/img/portfolio/books-1.jpg"),
                    },
                    {
                        title: "橙的電子",
                        tag: ["app", "ble"],
                        img: ScriptStyle1.getRout("assets/img/portfolio/branding-1.jpg"),
                    },
                    { title: "橙的電子", sub: "USB-PAD藍芽無線燒錄器", tag: ["app", "ble"], img: ScriptStyle1.getRout("assets/img/portfolio/product-2.jpg") },
                    {
                        title: "星澄基地",
                        tag: ["web", "cms", "dashboard"],
                        img: ScriptStyle1.getRout("assets/img/portfolio/branding-1.jpg"),
                    },
                    {
                        title: "星澄基地",
                        tag: ["web", "cms", "dashboard"],
                        img: ScriptStyle1.getRout("assets/img/portfolio/books-3.jpg"),
                    },
                    { title: "萊恩設計", tag: ["web"], img: ScriptStyle1.getRout("assets/img/portfolio/app-3.jpg")},
                ],
            }

            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            const portfolio:{
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
                                        img:string,
                                        tag:string[]
                                    }[]
                                }
                            } = {
                                title: widget.data.title,
                                desc: widget.data.desc,
                                tagObject : widget.data.tagObject,
                                dataList : widget.data.dataList
                            }


                            return /*html*/ `
        <!-- ======= Portfolio Section ======= -->
        <section id="portfolio" class="portfolio" data-aos="fade-up">
          <div class="container">
            <div class="section-header">
              <h2>${portfolio.title}</h2>
              <p>${portfolio.desc}</p>
            </div>
          </div>

          <div class="container-fluid" data-aos="fade-up" data-aos-delay="200">
            <div class="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order">
              <ul class="portfolio-flters">
                ${glitter.print(function () {
                                var tmp = "";
                                portfolio.tagObject.tags.map((a, i) => {
                                    tmp += /*html*/ `<li data-filter="${a.className}" ${i == 0 ? `class="filter-active"` : ``}>${a.title}</li>`;
                                });
                                return tmp;
                            })}
              </ul>
              <!-- End Portfolio Filters -->

              <div class="row g-0 portfolio-container">
              ${glitter.print(function () {
                                var tmp = "";
                                portfolio.dataList.list.map((l) => {
                                    var tagClass = "";
                                    l.tag.map((m) => (tagClass += `${m} `));
                                    tmp += /*html*/ `
                    <div class="col-xl-3 col-lg-4 col-md-6 portfolio-item ${tagClass}">
                      <div
                        style="background:url(${l.img});
                            width: 100%;
                            padding-bottom: 70%;
                            background-size:cover;
                            background-position:center center;"
                      ></div>
                      <div class="portfolio-info">
                        <h4>${l.title}</h4>
                        <a href="${l.img}" title="${l.title}" data-gallery="portfolio-gallery" class="glightbox preview-link"
                          ><i class="bi bi-zoom-in"></i
                        ></a>
                        <a title="More Details" class="details-link" href="#" style="cursor:pointer"
                          ><i class="bi bi-link-45deg"></i
                        ></a>
                      </div>
                    </div>
                    <!-- End Portfolio Item -->
                  `;
                                });
                                return tmp;
                            })}
              </div>
              <!-- End Portfolio Container -->
            </div>
          </div>
        </section>
        <!-- End Portfolio Section -->
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            const glightbox = GLightbox({
                                selector: ".glightbox",
                            });
                            let portfolionIsotope = document.querySelector(".portfolio-isotope");
                            if (portfolionIsotope) {

                                let portfolioFilter = portfolionIsotope.getAttribute("data-portfolio-filter")
                                    ? portfolionIsotope.getAttribute("data-portfolio-filter")
                                    : "*";
                                let portfolioLayout = portfolionIsotope.getAttribute("data-portfolio-layout")
                                    ? portfolionIsotope.getAttribute("data-portfolio-layout")
                                    : "masonry";
                                let portfolioSort = portfolionIsotope.getAttribute("data-portfolio-sort")
                                    ? portfolionIsotope.getAttribute("data-portfolio-sort")
                                    : "original-order";

                                // @ts-ignore
                                let portfolioIsotope = new Isotope(document.querySelector(".portfolio-container"), {
                                    itemSelector: ".portfolio-item",
                                    layoutMode: portfolioLayout,
                                    filter: portfolioFilter,
                                    sortBy: portfolioSort,
                                });

                                let menuFilters = document.querySelectorAll(".portfolio-isotope .portfolio-flters li");


                                menuFilters.forEach(function (el) {
                                    el.addEventListener(
                                        "click",
                                        function () {

                                            document!.querySelector(".portfolio-isotope .portfolio-flters .filter-active")!.classList.remove("filter-active");
                                            // @ts-ignore
                                            this.classList.add("filter-active");
                                            // @ts-ignore
                                            portfolioIsotope.arrange({
                                                // @ts-ignore
                                                filter: this.getAttribute("data-filter"),
                                            });
                                            // @ts-ignore
                                            if (typeof aos_init === "function") {
                                                // @ts-ignore
                                                aos_init();
                                            }
                                        },
                                        false
                                    );
                                });
                            }

                            // @ts-ignore
                            AOS.init();


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
                            list.tagList = list.tagList??{}
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