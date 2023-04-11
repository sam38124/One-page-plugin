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
            widget.data.about=widget.data.about ?? {
                background: ScriptStyle1.getRout("assets/img/about-bg.jpg"),
                img: ScriptStyle1.getRout("assets/img/about.jpg"),
                title: "《人類大未來：下一個五十年》",
                block:[
                    {
                        text:"若說我們可從中得出以下關乎人類未來的啟示，應不至於有爭議：每個人的身分不再像過去那般單一且固定，將變得比我們想像的更多元。我們在不同的情況下使用不同的身分；這些身分互有重疊而且日益難分，卻又能清楚地以不同的方式劃定個人的觀點和選擇。特別是傳統用來界定身分的社會標準（例如年齡和國籍）都將不再那麼重要，公私身分的界線也變得越來越模糊。以社會階級、族群歸屬、政治立場為本的身分定義，將讓位給新的劃分標準，例如出身城鄉或教育程度的高低。"
                    },
                    {
                        text:"如果個人身分的傳統特質變得支離破碎，可以想見未來社群的向心力將會更為疏遠，社會階層的流動性降低或是邊緣化，讓種族隔離或極端主義有機可趁。但換個角度來看，科技及網路帶來人際關係的「超連結」（hyperconnectivity），將有機會強化正向群體認同，賦予營造社群的新契機。未來，無論是生活或身分，人與人都會逐漸變得密不可分。這究竟是好事還是壞事？我認為有好也有壞，而且不論何者的影響都會越來越大。"
                    }
                ],
                extend:{}
            }
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    const about = widget.data.about;
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `                        
                                <section id="about" class="about" style="background: url(${about.background}) center center">
                                    <!--data-aos="fade-up"-->
                                    <div class="container" data-aos="fade-up">
                                        <div class="row align-items-center">
                                            <!--data-aos="zoom-in" data-aos-delay="100"-->
                                            <div class="col-lg-6 order-1 order-lg-2"  data-aos="zoom-in" data-aos-delay="100">
                                                <div class="about-img">
                                                    <img class="" src="${about.img}" alt="" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                                                <h3 style="color:white;white-space:normal;word-wrap:break-word;word-break:break-all;">${about.title}</h3>
                                                ${(()=>{
                                                    return gvc.map(about.block.map((block:any)=>{
                                                        return `<p class="py-3" style="white-space:normal;word-wrap:break-word;word-break:break-all;">${block.text}</p>`
                                                    }))
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    return glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: '大標題',
                        default: widget.data.about.title,
                        placeHolder: '請輸入大標題所顯示的文字',
                        callback: (text) => {
                            widget.data.about.title = text;
                            widget.refreshComponent();
                        },
                    })+
                        `
                        <div class="mt-3"></div>
                        `+
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `背景圖片`,
                            def: widget.data.about.background,
                            callback: (e) => {
                                widget.data.about.background = e;
                                widget.refreshComponent();
                            },
                        })+
                        `
                        <div class="mt-3"></div>
                        `+
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `右方圖片`,
                            def: widget.data.about.img,
                            callback: (e) => {
                                widget.data.about.img = e;
                                widget.refreshComponent();
                            },
                        })+
                        `
                        <div class="mt-3"></div>
                        `+
                        Editor.arrayItem({
                            originalArray:widget.data.about.descObject,
                            gvc: gvc,
                            title: '左邊大塊文字',
                            array: widget.data.about.block.map((block: any, index: number) => {
                                return {
                                    title: `區塊:${index + 1}`,
                                    expand: block,
                                    innerHtml: glitter.htmlGenerate.editeText({
                                                gvc: gvc,
                                                title: `第${index+1}段落文字`,
                                                default: block.text,
                                                placeHolder: '請輸入此段落的文字',
                                                callback: (text) => {
                                                    block.text = text;
                                                    widget.refreshComponent();
                                                },
                                            }),
                                    minus: gvc.event(() => {
                                        widget.data.about.block.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.about,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.about.block.push({ text:"" });
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