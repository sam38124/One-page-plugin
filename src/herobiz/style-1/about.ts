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
                    widget.data.title = widget.data.title ?? "萊恩設計的介紹";
                    widget.data.desc = widget.data.desc ?? "我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署<br/>我們皆能一條龍的替您服務到好";
                    widget.data.img = widget.data.img ?? ScriptStyle1.getRout("assets/img/about.jpg");
                    widget.data.slogan = widget.data.slogan ?? "只要有需求，我來打造專屬於你的系統";
                    widget.data.list = widget.data.list ?? [
                        {
                            tab: "科技界定身分",
                            content: `<p>
            乍看之下，此項進展迅速的科技革新和非洲農民或蒙古牧民似乎沒什麼關係，但多虧了電話網路，才將這些人與科技連結起來。目前世界上每3人就有2人擁有或使用手機，就連在非洲撒哈拉沙漠以南的低度開發國家也很常見。現代人主要透過手機（電信）交流，網際網路反倒不如手機這般普及
            </p>
            <p class="py-2">
            據統計，已開發國家的每5個家庭有4個能上網，低度開發國家則降至每10個家庭還不到1個有網路。我們有理由擔心這樣的科技鴻溝（或者說數位鴻溝），但無法簡單將此現象與其他社會問題畫上等號。不難想見，不同的年齡層也隔著上述鴻溝。根據英國2016年的1份調查，近3個月曾使用網際網路的比例，16歲至24歲人士超過99％，75歲以上人士僅39％。
            </p>
            <p class="py-2">
            網際網路的使用情況僅代表趨勢的一角。行動網路讓網路使用模式轉向「永遠在線」的心態。1990年代出生的人，即所謂的「Z世代」，從未見識過無電腦和手機的年代，而這些人現在陸續成年。2011年，英國有份調查取樣16歲至24歲人士，發現45％的人覺得處在「上線」狀態的時候最快樂。現在多數公司會要求員工以手機和電郵隨時聯繫，人們也會利用手機與電郵在上班時間處理家務或私人事務，職場與家庭的界線也因此被打破。
            </p>
            <p class="mb-4">
            類似統計不勝枚舉，箇中意涵卻非顯而易見。若以當前統計數據外推，意謂著10年過後，全世界會有四分之三的人擁有手機。然而使用手機對肯亞農人或蒙古牧民，以及對倫敦金融中心的交易員來說，結果是兩碼子事。
            </p>`,
                        },
                        {
                            tab: "人類大未來",
                            content: `
            <div class="text-box">
              <h3>書籍介紹</h3>
              <p>
              街上人們踩著懸浮滑板，出門再也不用自己開車；科學家發明能讓人感到幸福的藥丸，基因改造讓人們永遠不再生病；AI就是你的管家，生活大小事都靠機器人打理；蜘蛛絲能建造出比鋼筋更堅固的橋，有記憶的金屬能夠自動修復；週末搭太空船去月球旅行；時光機讓你回到過去挽回曾經犯下的錯……
              </p>
            </div><p class="pb-3">
            若說我們可從中得出以下關乎人類未來的啟示，應不至於有爭議：每個人的身分不再像過去那般單一且固定，將變得比我們想像的更多元。我們在不同的情況下使用不同的身分；這些身分互有重疊而且日益難分，卻又能清楚地以不同的方式劃定個人的觀點和選擇。特別是傳統用來界定身分的社會標準（例如年齡和國籍）都將不再那麼重要，公私身分的界線也變得越來越模糊。以社會階級、族群歸屬、政治立場為本的身分定義，將讓位給新的劃分標準，例如出身城鄉或教育程度的高低。
            </p>
            <p class="pb-3">
            如果個人身分的傳統特質變得支離破碎，可以想見未來社群的向心力將會更為疏遠，社會階層的流動性降低或是邊緣化，讓種族隔離或極端主義有機可趁。但換個角度來看，科技及網路帶來人際關係的「超連結」（hyperconnectivity），將有機會強化正向群體認同，賦予營造社群的新契機。未來，無論是生活或身分，人與人都會逐漸變得密不可分。這究竟是好事還是壞事？我認為有好也有壞，而且不論何者的影響都會越來越大。
            </p>`,
                        },
                        {
                            tab: "清單列表",
                            content: `<ul class="list-unstyled li-space-lg mb-5">
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>銷售及收款循環</strong> 包括訂單處理、授信管理、運送貨品、開立銷貨發票、開出帳單、記錄收入及應收帳款、執行與記錄現金收入等之政策及程序。
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>採購及付款循環</strong> 包括請購、進貨或採購原料、物料、資產和勞務、處理採購單、經收貨品、檢驗品質、填寫驗收報告書或處理退貨
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>生產循環</strong> 包括擬訂生產計畫、開立用料清單、儲存材料、投入生產、計算存貨生產成本、計算銷貨成本等之政策及程序。
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>薪工循環</strong> 包括僱用、請假、加班、辭退、訓練、退休、決定薪資率、計時、計算薪津總額、計算薪資稅及各項代扣款、設置薪資紀錄
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>融資循環</strong> 包括借款、保證、承兌、租賃、發行公司債及其他有價證券等資金融通事項之授權、執行與記錄等之政策及程序。
                </div>
              </li>
            </ul>`,
                        },
                    ];



                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let about:{
                                title:string,
                                desc:string,
                                img:string,
                                slogan:string,
                                list:{
                                    tab:string,
                                    content:string
                                }[]
                            } = {
                                title: widget.data.title,
                                desc: widget.data.desc,
                                img: widget.data.img,
                                slogan: widget.data.slogan,
                                list: widget.data.list
                            }
                            return /*html*/ `
        <!-- ======= About Section ======= -->
        <section id="about" class="about">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>${about.title}</h2>
              <p>${about.desc}</p>
            </div>

            <div class="row g-4 g-lg-5" data-aos="fade-up" data-aos-delay="200">
              <div class="col-lg-5">
                <div class="about-img"><img src="${about.img}" class="img-fluid" alt="" /></div>
              </div>

              <div class="col-lg-7">
                <h3 class="pt-0 pt-lg-5">${about.slogan}</h3>

                <!-- Tabs -->
                <ul class="nav nav-pills mb-3">
                  ${glitter.print(function () {
                                var tmp = "";
                                about.list.map((t, i) => {
                                    tmp += /*html*/ `
                        <li><a class="nav-link ${i == 0 ? `active` : ``}" data-bs-toggle="pill" href="#tab${i}">${t.tab}</a></li>
                      `;
                                });
                                return tmp;
                            })}
                </ul>
                <!-- End Tabs -->

                <!-- Tab Content -->
                <div class="tab-content">
                  ${glitter.print(function () {
                                var tmp = "";
                                about.list.map((t, i) => {
                                    tmp += /*html*/ `
                        <div class="tab-pane fade show ${i == 0 ? `active` : ``} px-3" id="tab${i}"><p>${t.content}</p></div>
                      `;
                                });
                                return tmp;
                            })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End About Section -->
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    widget.data.listExpand = widget.data.listExpand??{}
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '服務標題',
                            default: widget.data.title,
                            placeHolder: '請輸入服務的標題',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '服務敘述',
                            default: widget.data.desc,
                            placeHolder: '請描述此服務的內容',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `背景圖片`,
                            def: widget.data.img,
                            callback: (e) => {
                                widget.data.img = e;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.list,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.list.map((dd: any, index: number) => {
                                return {
                                    title: dd.tab || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: `頁面標籤`,
                                            default: dd.tab,
                                            placeHolder: '輸入標題名稱',
                                            callback: (text) => {
                                                dd.tab = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `頁面內文`,
                                            default: dd.content,
                                            placeHolder: '輸入內容',
                                            callback: (text) => {
                                                dd.content = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.listExpand,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.list.push({
                                        tab: "清單列表",
                                        content: `<ul class="list-unstyled li-space-lg mb-5">
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>銷售及收款循環</strong> 包括訂單處理、授信管理、運送貨品、開立銷貨發票、開出帳單、記錄收入及應收帳款、執行與記錄現金收入等之政策及程序。
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>採購及付款循環</strong> 包括請購、進貨或採購原料、物料、資產和勞務、處理採購單、經收貨品、檢驗品質、填寫驗收報告書或處理退貨
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>生產循環</strong> 包括擬訂生產計畫、開立用料清單、儲存材料、投入生產、計算存貨生產成本、計算銷貨成本等之政策及程序。
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>薪工循環</strong> 包括僱用、請假、加班、辭退、訓練、退休、決定薪資率、計時、計算薪津總額、計算薪資稅及各項代扣款、設置薪資紀錄
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>融資循環</strong> 包括借款、保證、承兌、租賃、發行公司債及其他有價證券等資金融通事項之授權、執行與記錄等之政策及程序。
                </div>
              </li>
            </ul>`,
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