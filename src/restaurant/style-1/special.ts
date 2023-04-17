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
                    let id = glitter.getUUID()
                    const feature = {
                        title: widget.data.title??"料理主題介紹",
                        desc: widget.data.desc??"這是我們堅持做出好料理的理念",
                        dataList:widget.data.dataList??{
                            list: [
                                {
                                    tab: "文教",
                                    title: "田地在走，科技要有",
                                    desc: `因應「智慧機械、亞洲矽谷、綠能科技、生醫產業、國防產業」及「新農業、循環經濟」等5+2產業創新政策，屏東縣政府、行政院農業委員會農糧署與國立屏東科技大學共同合作，於8月9-10日在屏東智慧農業學校舉辦為期兩天的「農機操作保養訓練班」，共有40名參與，10日縣府勞動暨青年發展處黃鼎倫處長特地到場參與結業式並鼓勵屏東青年投入智慧農業的行列，讓農村產業轉型升級。`,
                                    img: ScriptStyle1.getRout("assets/img/specials-1.png",)
                                },
                                {
                                    tab: "消費",
                                    title: "庇護工場推中秋伴手禮 即日起開放預購",
                                    desc: `中秋節即將到來，新竹市勞工處攜手3家庇護工場推出特色伴手禮，分別有喜憨兒月餅禮盒、慢飛兒咖啡禮盒還有竹夢園手工香皂禮盒，歡迎企業團體踴躍採購。喜憨兒和慢飛兒推出應景的中秋禮盒送禮或是自用都相當適合，另一家庇護工場竹夢園以清潔工作為主，主打「喜迎中秋淨來」精美手工皂禮盒與環保清潔劑。`,
                                    img: ScriptStyle1.getRout("assets/img/specials-1.png"),
                                },
                                {
                                    tab: "社會",
                                    title: "eTrade hub跨境電商大講堂",
                                    desc: `eTrade hub「電商大講堂」網羅各鏈路跨境電商專業講師，連結產業動態與實務操作，擘劃一套系統性的學習課程，依照企業需求從初階到進階、從操作教學到成功個案分享，札實的內容獲得許多正面的迴響。剛結束的「基礎學程」起步篇，就以平台選擇、商標佈局、選品技巧為軸，吸引逾百位企業員工參與，近90%的學員表示整體課程內容相當實用、高達85%對於講師授課方式與互動表示滿意，更有學員反映「此系列課程幫助企業增廣見聞，讓企業能以新的思維，進行多方嘗試」，成效斐然。`,
                                    img: ScriptStyle1.getRout("assets/img/specials-2.png")
                                },
                                {
                                    tab: "產能",
                                    title: "掌握關鍵新動能 布局高雄大未來",
                                    desc: `大南方崛起，蓄積多項產業轉型關鍵動能的高雄，從重工業之都蛻變高科技新城，全臺目光聚焦高雄，「投資高雄正對時」！高雄市政府今(10)日於高雄林皇宮舉辦「111年投資高雄城市產業論壇」，由財訊雙週刊社長謝金河主持，會中邀請高雄市政府副秘書長王啓川、經濟發展局局長廖泰翔、都市發展局副局長王屯電、學界代表及在地產業代表，從「高科技S廊道成形，掌握高雄轉型關鍵動能」與「高雄新生活，活化整合接軌國際」兩大主題，探討在各產業進駐下市府積極推動產業轉型、打造宜居高雄環境，一同預見更美好的高雄。`,
                                    img: ScriptStyle1.getRout("assets/img/specials-3.png")
                                },
                                {
                                    tab: "影音",
                                    title: "發呆系歌手 沈安『不稀罕別人給的完整╱狂奔』",
                                    desc: `『不稀罕別人給的完整╱狂奔』MV由林世穎& 陶磊兩位新銳導演執導拍攝，延續首部曲『白日夢的悲哀』在白日夢者超現實的迴圈後，畫面節奏跟著狂奔想像堆疊增加速度感，為MV特製的300公分高復刻沈安發呆容貌的大型「發呆至尊寶」呆呆搖擺人入鏡，雙寶共同激起白日夢們的生活情趣熱點。沈安說『“小明一個人在街上跳舞被罵是瘋子，於是他找了朋友跟他一起跳被罵是兩個瘋子。那請問小明找了幾個朋友?” 沈安回憶著他小學到現在都解不開的題目:“朋友要去那裡找?”』，以黑色幽默帶入白日夢者們在異想世界中的同溫層。`,
                                    img: ScriptStyle1.getRout("assets/img/specials-4.png")
                                },
                                {
                                    tab: "藝術",
                                    title: "如何正確而有《次第》的學習翡翠",
                                    desc: `玉雕是【减法藝術】，力道偏了，就完全沒有後悔和逆轉的機會了。翡翠玉雕跟石雕不同，石雕的材質裡外基本上是一致的，雕刻時不必顧慮材料的變化因素，可以依據創作的擬稿將創意圖示保持完善，在構思創作上相對自由，能自在發揮創意。但，翡翠玉雕有許多無法掌握的因素，玉料裡頭颜色的變化和一吋吋的綹裂出現，該怎樣避開裂和利用色都要立即隨機應變，處處如履薄冰，刀刀要慎之又慎，絲毫不能有半點差池。`,
                                    img: ScriptStyle1.getRout("assets/img/specials-5.png")
                                },
                            ]
                        }

                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            if (!widget.data.title){
                                widget.data = feature;
                            }
                            return`
                                <!-- ======= Specials Section ======= -->
                                <section id="feature" class="specials">
                                    <div class="container" data-aos="fade-up">
                                        <div class="section-title">
                                            <h2>${feature.title}</h2>
                                            <p>${feature.desc}</p>
                                        </div>                        
                                        <div class="row" data-aos="fade-up" data-aos-delay="100">
                                            <div class="col-lg-3">
                                                <ul class="nav nav-tabs flex-column">
                                                    ${glitter.print(function () {
                                                    let tmp = "";
                                                    feature.dataList.list.map((t:any, i:number) => {
                                                        tmp += /*html*/ `
                                                                <li class="nav-item">
                                                                  <a class="nav-link ${i == 0 ? `active show` : ``}" data-bs-toggle="tab" href="#tab-${i}">${t.tab}</a>
                                                                </li>
                                                              `;
                                                        });
                                                        return tmp;
                                                    })}
                                                </ul>
                                          </div>
                                            <div class="col-lg-9 mt-4 mt-lg-0">
                                                <div class="tab-content">
                                                    ${glitter.print(function () {
                                                        let tmp = "";
                                                        feature.dataList.list.map((l:any, i:number) => {
                                                            tmp += /*html*/ `
                                                                <div class="tab-pane ${i == 0 ? `active show` : ``}" id="tab-${i}">
                                                                    <div class="row">
                                                                        <div class="col-lg-8 details order-2 order-lg-1">
                                                                            <h3>${l.title}</h3>
                                                                            <p style="white-space:normal;word-wrap:break-word;word-break:break-all;">${l.desc.replace(/\n/g,'<br>')}</p>
                                                                        </div>
                                                                        <div class="col-lg-4 text-center order-1 order-lg-2">
                                                                            <img src="${l.img}" alt="" class="img-fluid" />
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
                                    </div>
                                </section>
                                <!-- End Specials Section -->`
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
                            title: `小標題`,
                            default: widget.data.desc,
                            placeHolder: '輸入小標題名稱',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.dataList,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.dataList.list.map((dd: any, index: number) => {
                                return {
                                    title: dd.tab || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `分頁`,
                                            default: dd.tab,
                                            placeHolder: '分頁名稱',
                                            callback: (text) => {
                                                dd.tab = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.title,
                                            placeHolder: '內文標題',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `內文`,
                                            default: dd.desc,
                                            placeHolder: '內文文字',
                                            callback: (text) => {
                                                dd.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '區塊右方圖片',
                                            def:dd.img,
                                            callback:(data)=>{
                                                dd.img=data
                                                widget.refreshComponent()
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        dd.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.dataList,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.dataList.list.push({ tab: "文教", title: "田地在走，科技要有", desc: `因應「智慧機械、亞洲矽谷、綠能科技、生醫產業、國防產業」及「新農業、循環經濟」等5+2產業創新政策，屏東縣政府、行政院農業委員會農糧署與國立屏東科技大學共同合作，於8月9-10日在屏東智慧農業學校舉辦為期兩天的「農機操作保養訓練班」，共有40名參與，10日縣府勞動暨青年發展處黃鼎倫處長特地到場參與結業式並鼓勵屏東青年投入智慧農業的行列，讓農村產業轉型升級。`, img: "assets/img/specials-1.png", });
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