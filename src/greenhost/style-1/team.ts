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

                    widget.data.title = widget.data.title ?? "我們的團隊";
                    widget.data.desc = widget.data.desc ?? "我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽";
                    widget.data.list = widget.data.list ?? [
                        { img: ScriptStyle1.getRout("img/team-1.jpg"), name: "陳志賢", pro: "執行長", link: [{src:"https://www.facebook.com/"}, {src:"https://www.instagram.com/"}] },
                        { img: ScriptStyle1.getRout("img/team-3.jpg"), name: "黃國玟", pro: "UI／UX設計師", link: [{src:"https://www.instagram.com/"}, {src:"https://squarestudio.tw"}] },
                        {
                            img: ScriptStyle1.getRout("img/team-4.jpg"),
                            name: "韓俊榮",
                            pro: "前端工程師",
                            link: [{src:"https://twitter.com/"}, {src:"https://www.instagram.com/"}, {src:"https://squarestudio.tw"}],
                        },
                        { img: ScriptStyle1.getRout("img/team-2.jpg"), name: "陳佳玲", pro: "系統規劃師", link: [{src:"https://squarestudio.tw"}, {src:"#"}] },
                    ];
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let team= {
                                title: widget.data.title,
                                desc: widget.data.desc,
                                list: widget.data.list,
                            }
                            return /*html*/ `
        <!-- Team Start -->
        <div class="container-xxl py-5">
          <div class="container px-lg-5">
            <div
              class="section-title position-relative text-center mx-auto mb-5 pb-4 wow fadeInUp"
              data-wow-delay="0.1s"
              style="max-width: 600px;"
            >
              <h1 class="mb-3">${team.title}</h1>
              <p class="mb-1">${team.desc}</p>
            </div>
            <div class="row g-4">
              ${glitter.print(function () {
                                var tmp = "";
                                team.list.map((l:any) => {
                                    tmp += /*html*/ `
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                      <div class="team-item border-top border-5 border-primary rounded shadow overflow-hidden">
                        <div class="text-center p-4">
                          <img class="img-fluid rounded-circle mb-4" src="${l.img}" alt="" />
                          <h5 class="fw-bold mb-1">${l.name}</h5>
                          <small>${l.pro}</small>
                        </div>
                        <div class="d-flex justify-content-center bg-primary p-3">
                          ${glitter.print(function () {
                                        var tmp = "";
                                        l.link.map((s:any) =>
                                            (tmp += /*html*/ `<a
                                  class="btn btn-square text-primary bg-white m-1"
                                  href="${s.src}"
                                  ><i class="${ScriptStyle1.urlIcon(s.src,'fa')}"></i
                                ></a>`)
                                        );
                                        return tmp;
                                    })}
                        </div>
                      </div>
                    </div>
                  `;
                                });
                                return tmp;
                            })}
            </div>
          </div>
        </div>
        <!-- Team End -->
      `;
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `標題`,
                            default: widget.data.title,
                            placeHolder: '輸入標題名稱',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題名稱',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.list,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.list.map((dd: any, index: number) => {
                                dd.detailExpand =dd.detailExpand??{}
                                return {
                                    title: dd.name || `人員1:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `索引`,
                                            default: dd.name,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `職稱`,
                                            default: dd.pro,
                                            placeHolder: '輸入職位名稱',
                                            callback: (text) => {
                                                dd.pro = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '照片',
                                            def:dd.img,
                                            callback:(data)=>{
                                                dd.img=data
                                                widget.refreshComponent()
                                            }
                                        }),
                                        Editor.arrayItem({
                                            originalArray:dd.link,
                                            gvc: gvc,
                                            title: '社群連結',
                                            array: dd.link.map((dd: any, index: number) => {
                                                return {
                                                    title: `社群連結:${index + 1}`,
                                                    expand: dd,
                                                    innerHtml: gvc.map([
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `連結`,
                                                            default: dd.src,
                                                            placeHolder: '連結網址',
                                                            callback: (text) => {
                                                                dd.src = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                    ]),
                                                    minus: gvc.event(() => {
                                                        dd.link.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: dd.detailExpand,
                                            plus: {
                                                title: '添加社群',
                                                event: gvc.event(() => {
                                                    dd.link.push(
                                                        [{src:"https://twitter.com/"}]
                                                    );
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent:()=>{
                                                widget.refreshComponent()
                                            }
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
                                title: '添加人員',
                                event: gvc.event(() => {
                                    widget.data.list.push({
                                        img: ScriptStyle1.getRout("img/team-4.jpg"),
                                        name: "韓俊榮",
                                        pro: "前端工程師",
                                        link: [{src:"https://twitter.com/"}],
                                    });
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