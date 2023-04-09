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
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    const slider= {
                        title: widget.data.title??"活動專案",
                        desc: widget.data.desc??"提供原創活動的餐點服務與流程",
                        background: ScriptStyle1.getRout("assets/img/events-bg.jpg"),
                        dataList:widget.data.dataList??{
                            list: [
                                {
                                    title: "婚禮宴會",
                                    price: 24000,
                                    desc: "飯店提供五星級盛宴場地，佈置雅緻、時尚華麗，專屬的婚宴空間及精心研發料理，真誠的貼心服務，在這值得紀念的時刻，讓我們為您留下幸福與感動，您舉行幸福婚宴最佳場地，賓主盡情享受主廚最上乘好廚藝。",
                                    img: ScriptStyle1.getRout("assets/img/event-birthday.jpg"),
                                },
                                {
                                    title: "企業品酒會",
                                    price: 12000,
                                    desc: "Wine Tasting + Shopping Day意大利葡萄酒有4000年歷史，是世界上最燦爛的葡萄酒生產國。擁有20個產區，近1000種葡萄，約80萬個葡萄園，每年生產約40億瓶葡萄酒 。在過去的五年裡，意大利葡萄酒的產量及出口量都位居世界第一，意大利是當之無愧的葡萄酒生產大國。有人說，外表容易騙人，品酒亦然。除非您的品酒經驗老道，否則您必須透過不同的嘗試才能找到心頭好。所以Wine Passions 及「意大利頂級酒莊聯盟」定期舉行試酒活動，讓您可以參加好評如潮的每月活動——由《新假期 》雜誌評選的「年度必到品酒工作坊」。在輕鬆的環境下，品嚐我們推介的不同美酒，而品酒工作坊亦作社交平台，讓您認識更多朋友！",
                                    img: ScriptStyle1.getRout("assets/img/event-custom.jpg"),
                                },
                                {
                                    title: "親友聚餐",
                                    price: 8000,
                                    desc: "餐點多樣，主打義大利麵，也有拼盤類餐點，適合多人聚餐，多點各式餐點一起分食享用，也有各式啤酒，店內陳設各種啤酒瓶，服務人員態度，服務品質佳，是家庭朋友聚餐會想選擇的項目",
                                    img: ScriptStyle1.getRout("assets/img/event-private.jpg"),
                                },
                            ],
                        }

                    }
                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            if (!widget.data.title){
                                widget.data = slider;
                            }
                            return `
                                <!-- ======= Events Section ======= -->
                                <section id="slider" class="events" style="background: url(${slider.background}) center center no-repeat">
                                    <div class="container" data-aos="fade-up">
                                        <div class="section-title">
                                            <h2>${slider.title}</h2>
                                            <p>${slider.desc}</p>
                                        </div>
                        
                                        <div class="events-slider swiper" data-aos="fade-up" data-aos-delay="100">
                                            <div class="swiper-wrapper">
                                                ${glitter.print(function () {
                                                    let tmp = "";
                                                    slider.dataList.list.map((l:any) => {
                                                        tmp += /*html*/ `
                                                            <div class="swiper-slide">
                                                                <div class="row event-item">
                                                                    <div class="col-lg-6">
                                                                        <img src="${l.img}" class="img-fluid" alt="" />
                                                                    </div>
                                                                    <div class="col-lg-6 pt-4 pt-lg-0 content">
                                                                        <h3>${l.title}</h3>
                                                                        <div class="price">
                                                                            <p><span>$${l.price.toLocaleString()}</span></p>
                                                                        </div>
                                                                        <p style="white-space:normal;word-wrap:break-word;word-break:break-all;">${l.desc}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- End testimonial item -->
                                                            `;
                                                    });
                                                    return tmp;
                                                })}
                                            </div>
                                            <div class="swiper-pagination"></div>
                                        </div>
                                    </div>
                                </section>
                                <!-- End Events Section -->
                            `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();

                            /**
                             * Events slider
                             */
                            // @ts-ignore
                            new Swiper(".events-slider", {
                                speed: 600,
                                loop: true,
                                autoplay: {
                                    delay: 5000,
                                    disableOnInteraction: false,
                                },
                                slidesPerView: "auto",
                                pagination: {
                                    el: ".swiper-pagination",
                                    type: "bullets",
                                    clickable: true,
                                },
                            });
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
                            placeHolder: '給一段適合的口號',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.dataList,
                            gvc: gvc,
                            title: '圖片資訊',
                            array: widget.data.dataList.list.map((dd: any, index: number) => {
                                return {
                                    title: `資訊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
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
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `價格`,
                                            default: dd.price,
                                            placeHolder: '輸入價格',
                                            callback: (text) => {
                                                dd.price = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `敘文`,
                                            default: dd.desc,
                                            placeHolder: '輸入敘述文字',
                                            callback: (text) => {
                                                dd.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '圖片',
                                            def:dd.img,
                                            callback:(data)=>{
                                                dd.img=data
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
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({  title: "婚禮宴會",
                                        price: 24000,
                                        desc: "飯店提供五星級盛宴場地，佈置雅緻、時尚華麗，專屬的婚宴空間及精心研發料理，真誠的貼心服務，在這值得紀念的時刻，讓我們為您留下幸福與感動，您舉行幸福婚宴最佳場地，賓主盡情享受主廚最上乘好廚藝。",
                                        img: ScriptStyle1.getRout("assets/img/event-birthday.jpg") });
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