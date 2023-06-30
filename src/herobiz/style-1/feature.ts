import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";

import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    widget.data.dataList = widget.data.dataList??[
                        {
                            icon: { name: "bi bi-binoculars", color: "#F9BA2B" },
                            tab: "文教",
                            title: "田地在走，科技要有",
                            desc: `因應「智慧機械、亞洲矽谷、綠能科技、生醫產業、國防產業」及「新農業、循環經濟」等5+2產業創新政策，屏東縣政府、行政院農業委員會農糧署與國立屏東科技大學共同合作，於8月9-10日在屏東智慧農業學校舉辦為期兩天的「農機操作保養訓練班」，共有40名參與，10日縣府勞動暨青年發展處黃鼎倫處長特地到場參與結業式並鼓勵屏東青年投入智慧農業的行列，讓農村產業轉型升級。`,
                            img: ScriptStyle1.getRout("assets/img/features-1.svg"),
                        },
                        {
                            icon: { name: "bi bi-box-seam", color: "#E92BF9" },
                            tab: "消費",
                            title: "庇護工場推中秋伴手禮 即日起開放預購",
                            desc: `中秋節即將到來，新竹市勞工處攜手3家庇護工場推出特色伴手禮，分別有喜憨兒月餅禮盒、慢飛兒咖啡禮盒還有竹夢園手工香皂禮盒，歡迎企業團體踴躍採購。喜憨兒和慢飛兒推出應景的中秋禮盒送禮或是自用都相當適合，另一家庇護工場竹夢園以清潔工作為主，主打「喜迎中秋淨來」精美手工皂禮盒與環保清潔劑。`,
                            img: ScriptStyle1.getRout("assets/img/features-2.svg"),
                        },
                        {
                            icon: { name: "bi bi-brightness-high", color: "#2B75F9" },
                            tab: "社會",
                            title: "eTrade hub跨境電商大講堂",
                            desc: `eTrade hub「電商大講堂」網羅各鏈路跨境電商專業講師，連結產業動態與實務操作，擘劃一套系統性的學習課程，依照企業需求從初階到進階、從操作教學到成功個案分享，札實的內容獲得許多正面的迴響。剛結束的「基礎學程」起步篇，就以平台選擇、商標佈局、選品技巧為軸，吸引逾百位企業員工參與，近90%的學員表示整體課程內容相當實用、高達85%對於講師授課方式與互動表示滿意，更有學員反映「此系列課程幫助企業增廣見聞，讓企業能以新的思維，進行多方嘗試」，成效斐然。`,
                            img: ScriptStyle1.getRout("assets/img/features-3.svg"),
                        },
                        {
                            icon: { name: "bi bi-command", color: "#63F92B" },
                            tab: "產能",
                            title: "掌握關鍵新動能 布局高雄大未來",
                            desc: `大南方崛起，蓄積多項產業轉型關鍵動能的高雄，從重工業之都蛻變高科技新城，全臺目光聚焦高雄，「投資高雄正對時」！高雄市政府今(10)日於高雄林皇宮舉辦「111年投資高雄城市產業論壇」，由財訊雙週刊社長謝金河主持，會中邀請高雄市政府副秘書長王啓川、經濟發展局局長廖泰翔、都市發展局副局長王屯電、學界代表及在地產業代表，從「高科技S廊道成形，掌握高雄轉型關鍵動能」與「高雄新生活，活化整合接軌國際」兩大主題，探討在各產業進駐下市府積極推動產業轉型、打造宜居高雄環境，一同預見更美好的高雄。`,
                            img: ScriptStyle1.getRout("assets/img/features-4.svg"),
                        },
                        {
                            icon: { name: "bi bi-easel", color: "#2BF9F9" },
                            tab: "影音",
                            title: "發呆系歌手 沈安『不稀罕別人給的完整╱狂奔』",
                            desc: `『不稀罕別人給的完整╱狂奔』MV由林世穎& 陶磊兩位新銳導演執導拍攝，延續首部曲『白日夢的悲哀』在白日夢者超現實的迴圈後，畫面節奏跟著狂奔想像堆疊增加速度感，為MV特製的300公分高復刻沈安發呆容貌的大型「發呆至尊寶」呆呆搖擺人入鏡，雙寶共同激起白日夢們的生活情趣熱點。沈安說『“小明一個人在街上跳舞被罵是瘋子，於是他找了朋友跟他一起跳被罵是兩個瘋子。那請問小明找了幾個朋友?” 沈安回憶著他小學到現在都解不開的題目:“朋友要去那裡找?”』，以黑色幽默帶入白日夢者們在異想世界中的同溫層。`,
                            img: ScriptStyle1.getRout("assets/img/features-5.svg"),
                        },
                        {
                            icon: { name: "bi bi-map", color: "#F53D3D" },
                            tab: "藝術",
                            title: "如何正確而有《次第》的學習翡翠",
                            desc: `玉雕是【减法藝術】，力道偏了，就完全沒有後悔和逆轉的機會了。翡翠玉雕跟石雕不同，石雕的材質裡外基本上是一致的，雕刻時不必顧慮材料的變化因素，可以依據創作的擬稿將創意圖示保持完善，在構思創作上相對自由，能自在發揮創意。但，翡翠玉雕有許多無法掌握的因素，玉料裡頭颜色的變化和一吋吋的綹裂出現，該怎樣避開裂和利用色都要立即隨機應變，處處如履薄冰，刀刀要慎之又慎，絲毫不能有半點差池。`,
                            img: ScriptStyle1.getRout("assets/img/features-6.svg"),
                        },
                    ]



                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            const feature : {
                                dataList:{
                                    icon:{ name:string , color:string},
                                    tab:string,
                                    title:string,
                                    desc:string,
                                    img:string
                                }[]
                            }={
                                dataList : widget.data.dataList
                            }
                            return /*html*/ `
        <!-- ======= Features Section ======= -->
        <section id="features" class="features">
          <div class="container" data-aos="fade-up">
            <ul class="nav nav-tabs row gy-4 d-flex">
            ${glitter.print(function () {
                                var tmp = "";
                                feature.dataList.map((l, i) => {
                                    tmp += /*html*/ `
                  <li class="nav-item col-6 col-md-4 col-lg-2">
                    <a class="nav-link ${i == 0 ? `active show` : ``}" data-bs-toggle="tab" data-bs-target="#tab-${i}">
                      <i class="${l.icon.name}" style="color:${l.icon.color}"></i>
                      <h4>${l.tab}</h4>
                    </a>
                  </li>
                `;
                                });
                                return tmp;
                            })}
            </ul>

            <div class="tab-content">
            ${glitter.print(function () {
                                var tmp = "";
                                feature.dataList.map((l, i) => {
                                    tmp += /*html*/ `
                  <div class="tab-pane ${i == 0 ? `active show` : ``}" id="tab-${i}">
                    <div class="row gy-4">
                      <div class="col-lg-8 order-2 order-lg-1 pt-lg-4" data-aos="fade-up" data-aos-delay="100">
                        <h3>${l.title}</h3>
                        <p>${l.desc}</p>
                      </div>
                      <div class="col-lg-4 order-1 order-lg-2 text-center" data-aos="fade-up" data-aos-delay="200">
                      <div style="background:url(${l.img});
                            width: 100%;
                            padding-bottom: 60%;
                            background-size:cover;
                            background-position:center center;"></div>
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
        <!-- End Features Section -->
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        Editor.arrayItem({
                            originalArray:widget.data.dataList,
                            gvc: gvc,
                            title: '項次詳細',
                            array: widget.data.dataList.map((linkData: any, index: number) => {
                                return {
                                    title: linkData.title??`項次:${index + 1}`,
                                    expand: linkData,
                                    innerHtml: gvc.map([
                                        Editor.fontawesome({
                                            title: '分頁icon',
                                            gvc: gvc,
                                            def: linkData.icon.name,
                                            callback: (text: string) => {
                                                linkData.icon.name = text;
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '分頁icon顏色',
                                            default: linkData.icon.color,
                                            type:"color",
                                            placeHolder: '請輸入分頁文字',
                                            callback: (text) => {
                                                linkData.icon.color = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '分頁文字',
                                            default: linkData.tab,
                                            placeHolder: '請輸入分頁文字',
                                            callback: (text) => {
                                                linkData.tab = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '標題',
                                            default: linkData.title,
                                            placeHolder: '請輸入標題文字',
                                            callback: (text) => {
                                                linkData.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: '概述',
                                            default: linkData.desc,
                                            placeHolder: '請輸入項次概述',
                                            callback: (text) => {
                                                linkData.desc = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '預覽圖片1',
                                            def: linkData.img,
                                            callback:(data)=>{
                                                linkData.img=data
                                                widget.refreshComponent()
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.dataList.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.dataList.push( {
                                        icon: { name: "bi bi-map", color: "#F53D3D" },
                                        tab: "藝術",
                                        title: "如何正確而有《次第》的學習翡翠",
                                        desc: `玉雕是【减法藝術】，力道偏了，就完全沒有後悔和逆轉的機會了。翡翠玉雕跟石雕不同，石雕的材質裡外基本上是一致的，雕刻時不必顧慮材料的變化因素，可以依據創作的擬稿將創意圖示保持完善，在構思創作上相對自由，能自在發揮創意。但，翡翠玉雕有許多無法掌握的因素，玉料裡頭颜色的變化和一吋吋的綹裂出現，該怎樣避開裂和利用色都要立即隨機應變，處處如履薄冰，刀刀要慎之又慎，絲毫不能有半點差池。`,
                                        img: ScriptStyle1.getRout("assets/img/features-6.svg"),
                                    } );
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                    ])
                }
            }
        },
    }
})