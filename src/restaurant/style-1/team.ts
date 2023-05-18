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
                    let id = glitter.getUUID();

                    widget.data.title = widget.data.title??"我們的團隊",
                    widget.data.desc = widget.data.desc??"萊恩設計中，有著來自四面八方的優質團隊",
                    widget.data.dataList =widget.data.dataList??{
                            list: [
                                {
                                    img: ScriptStyle1.getRout("assets/img/team/team-1.jpg"),
                                    name: "陳志賢",
                                    pro: "執行長",
                                    linkList:{
                                        link : [
                                            {src:"https://www.facebook.com/"},
                                            {src:"https://www.instagram.com/"},
                                        ]
                                    }
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/team/team-3.jpg"),
                                    name: "黃國玟",
                                    pro: "技術長",
                                    linkList:{
                                        link : [
                                            {src:"https://www.instagram.com/"},
                                            {src:"https://squarestudio.tw"},
                                        ],
                                    }
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/team/team-2.jpg"),
                                    name: "陳佳玲",
                                    pro: "系統規劃師",
                                    linkList:{
                                        link : [
                                            {src:"https://squarestudio.tw"},
                                            {src:"#"},
                                        ]
                                    }
                                },
                                {
                                    img: ScriptStyle1.getRout("assets/img/team/team-4.jpg"),
                                    name: "張心瑜",
                                    pro: "業務總管",
                                    linkList:{
                                        link : [
                                            {src:"https://www.facebook.com/"},
                                            {src:"https://www.instagram.com/"},
                                            {src:"#"},
                                        ]
                                    }
                                },
                            ]
                        }


                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            const team= {
                                title: widget.data.title,
                                desc: widget.data.desc,
                                dataList : widget.data.dataList
                            }

                            return `
                             <!-- ======= Chefs Section ======= -->
                            <section id="team" class="chefs">
                                <div class="container" data-aos="fade-up">
                                    <div class="section-title">
                                        <h2>${team.title}</h2>
                                        <p>${team.desc}</p>
                                    </div>
                                
                                    <div class="row">
                                        ${glitter.print(function () {
                                var tmp = "";
                                team.dataList.list.map((l:any) => {
                                    tmp += /*html*/ `
                                                    <div class="col-lg-4 col-md-6">
                                                        <div class="member" data-aos="zoom-in" data-aos-delay="100">
                                                            <img src="${l.img}" class="img-fluid" alt="" />
                                                            <div class="member-info">
                                                                <div class="member-info-content">
                                                                    <h4>${l.name}</h4>
                                                                    <span>${l.pro}</span>
                                                                </div>
                                                                <div class="social">
                                                                    ${(()=>{
                                        let tmp = "";
                                        l.linkList.link.map((k:any) => {

                                            // 
                                            tmp += /*html*/ `
                                                                                <a onclick="" style="cursor:pointer"
                                                                                    ><i class="${ScriptStyle1.urlIcon(k.src , "bi")}"></i
                                                                                ></a>
                                                                            `;
                                        });
                                        return tmp;
                                    })()}                                                                    
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
                            <!-- End Chefs Section -->
                            `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
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
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: `副標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入副標題',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.dataList,
                            gvc: gvc,
                            title: '成員內容',
                            array: widget.data.dataList.list.map((dd: any, index: number) => {
                                return {
                                    title: dd.name || `人員:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
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
                                            placeHolder: '輸入職稱',
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
                                        })
                                        +
                                        Editor.arrayItem({
                                            originalArray:dd.linkList,
                                            gvc: gvc,
                                            title: '社群資訊',
                                            array:dd.linkList.link.map((data: any, index: number) => {
                                                return {
                                                    title: `第${index+1}個社群資訊`,
                                                    expand: data,
                                                    innerHtml:glitter.htmlGenerate.editeInput({
                                                        gvc : gvc,
                                                        title : '社群網址',
                                                        default : data.src,
                                                        placeHolder : `請輸入個人的社群網址首頁`,
                                                        callback:(text)=>{
                                                            data.src = text;
                                                            widget.refreshComponent();
                                                        }
                                                    })

                                                    ,
                                                    minus: gvc.event(() => {
                                                        dd.linkList.link.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: dd.linkList,
                                            plus: {
                                                title: '添加區塊',
                                                event: gvc.event(() => {
                                                    dd.linkList.link.push({src:""});
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent:()=>{
                                                widget.refreshComponent()
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.dataList.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.dataList,
                            plus: {
                                title: '添加成員',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({
                                        img: ScriptStyle1.getRout("assets/img/team/team-1.jpg"),
                                        name: "陳志賢",
                                        pro: "執行長",
                                        desc: "企業中負責日常營運的最高行政人員。其專業與領導能力，讓公司的股東可以信任該公司的決策與產品",
                                        linkList:{
                                            link : [
                                                {src:"https://www.facebook.com/"},
                                                {src:"https://www.instagram.com/"},
                                            ]
                                        }
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