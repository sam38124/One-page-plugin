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
                    let news = {
                            title: "最新消息",
                            desc: "有關《萊恩設計部落格》的最新消息都在這裡",
                            list: [
                                {
                                    id: 1,
                                    img: "https://www-image-cdn.darencademy.com/images/backend/article/x0ae9db6cd34de4aeaaaca0f5538688db.jpg.pagespeed.ic.MabxCeLHhW.webp",
                                    tag: "新聞",
                                    ago: "5 分鐘前",
                                    title: "你常覺得自己不夠優秀嗎？關於「比較」這件事",
                                    desc: "很多人看我現在自己創立公司，常覺得我應該一路都一帆風順，沒經歷這種因比較而產生的焦慮。但事實上，關於「比較｣這件事情，我的辛酸血淚史可是非常豐富啊",
                                    author: { id: 12, name: "姚詩豪", img: "assets/img/avatar/avatar-1.png", job: "自由工作者" },
                                    btn: { name: "閱讀更多", link: "#" },
                                },
                                {
                                    id: 2,
                                    img: "https://www.darencademy.com/images/backend/article/x3edb38da23c8c0391387f00e47acabf9.jpg.pagespeed.ic.-S84TYYMtK.webp",
                                    tag: "職場策略",
                                    ago: "13 分鐘前",
                                    title: "三個方法讓你勇敢說不，避免被工作壓得喘不過氣",
                                    desc: "不論客觀來說是否為真，但相信每個上班族或多或少都會有種「為什麼每次倒霉的都是我」或「為什麼我總是最忙的那個」的感覺。有時候可能只是自己的感覺（客觀來說，搞不好大家都超忙）",
                                    author: { id: 15, name: "MH", img: "assets/img/avatar/avatar-3.png", job: "新聞記者" },
                                    btn: { name: "閱讀更多", link: "#" },
                                },
                                {
                                    id: 3,
                                    img: "https://www.darencademy.com/images/backend/article/x9ad6b1201ff4a719a84d0363762bc7d1.jpg.pagespeed.ic.Xrev0XWc-z.webp",
                                    tag: "如何思考",
                                    ago: "3 小時前",
                                    title: "《最強提問力》讀後心得：學會提問比找答案更加重要",
                                    desc: "愛因斯坦曾經說過：「如果我只有一個小時可以解決一個攸關自身性命的問題，我一定會把前五十五分鐘都拿來判斷我該問的問題是什麼？」諷刺的是，到了二十一世紀資訊爆炸的年代，我們隨時",
                                    author: { id: 6, name: "WAKI 瓦基", img: "assets/img/avatar/avatar-2.png", job: "作家" },
                                    btn: { name: "閱讀更多", link: "#" },
                                },
                            ],
                        }
                    widget.data.title = widget.data.title??"最新消息";
                    widget.data.desc = widget.data.desc??"有關《萊恩設計部落格》的最新消息都在這裡";
                    widget.data.list = widget.data.list??[
                        {
                            id: 1,
                            img: "https://www-image-cdn.darencademy.com/images/backend/article/x0ae9db6cd34de4aeaaaca0f5538688db.jpg.pagespeed.ic.MabxCeLHhW.webp",
                            tag: "新聞",
                            ago: "5 分鐘前",
                            title: "你常覺得自己不夠優秀嗎？關於「比較」這件事",
                            desc: "很多人看我現在自己創立公司，常覺得我應該一路都一帆風順，沒經歷這種因比較而產生的焦慮。但事實上，關於「比較｣這件事情，我的辛酸血淚史可是非常豐富啊",
                            author: { id: 12, name: "姚詩豪", img: "assets/img/avatar/avatar-1.png", job: "自由工作者" },
                            btn: { name: "閱讀更多", link: "#" },
                        },
                        {
                            id: 2,
                            img: "https://www.darencademy.com/images/backend/article/x3edb38da23c8c0391387f00e47acabf9.jpg.pagespeed.ic.-S84TYYMtK.webp",
                            tag: "職場策略",
                            ago: "13 分鐘前",
                            title: "三個方法讓你勇敢說不，避免被工作壓得喘不過氣",
                            desc: "不論客觀來說是否為真，但相信每個上班族或多或少都會有種「為什麼每次倒霉的都是我」或「為什麼我總是最忙的那個」的感覺。有時候可能只是自己的感覺（客觀來說，搞不好大家都超忙）",
                            author: { id: 15, name: "MH", img: "assets/img/avatar/avatar-3.png", job: "新聞記者" },
                            btn: { name: "閱讀更多", link: "#" },
                        },
                        {
                            id: 3,
                            img: "https://www.darencademy.com/images/backend/article/x9ad6b1201ff4a719a84d0363762bc7d1.jpg.pagespeed.ic.Xrev0XWc-z.webp",
                            tag: "如何思考",
                            ago: "3 小時前",
                            title: "《最強提問力》讀後心得：學會提問比找答案更加重要",
                            desc: "愛因斯坦曾經說過：「如果我只有一個小時可以解決一個攸關自身性命的問題，我一定會把前五十五分鐘都拿來判斷我該問的問題是什麼？」諷刺的是，到了二十一世紀資訊爆炸的年代，我們隨時",
                            author: { id: 6, name: "WAKI 瓦基", img: "assets/img/avatar/avatar-2.png", job: "作家" },
                            btn: { name: "閱讀更多", link: "#" },
                        },
                    ]

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let news:{
                                title:string,
                                desc:string,
                                list:{
                                    id:number,
                                    img:string,
                                    tag:string,
                                    ago:string,
                                    title:string,
                                    desc:string,
                                    author:{
                                        id:number,
                                        name:string,
                                        img:string,
                                        job:string,
                                    },
                                    btn:{
                                        name:string,
                                        link:string
                                    }
                                }[]
                            } = {
                                title: "最新消息",
                                desc: "有關《萊恩設計部落格》的最新消息都在這裡",
                                list: [
                                    {
                                        id: 1,
                                        img: "https://www-image-cdn.darencademy.com/images/backend/article/x0ae9db6cd34de4aeaaaca0f5538688db.jpg.pagespeed.ic.MabxCeLHhW.webp",
                                        tag: "新聞",
                                        ago: "5 分鐘前",
                                        title: "你常覺得自己不夠優秀嗎？關於「比較」這件事",
                                        desc: "很多人看我現在自己創立公司，常覺得我應該一路都一帆風順，沒經歷這種因比較而產生的焦慮。但事實上，關於「比較｣這件事情，我的辛酸血淚史可是非常豐富啊",
                                        author: { id: 12, name: "姚詩豪", img: "assets/img/avatar/avatar-1.png", job: "自由工作者" },
                                        btn: { name: "閱讀更多", link: "#" },
                                    },
                                    {
                                        id: 2,
                                        img: "https://www.darencademy.com/images/backend/article/x3edb38da23c8c0391387f00e47acabf9.jpg.pagespeed.ic.-S84TYYMtK.webp",
                                        tag: "職場策略",
                                        ago: "13 分鐘前",
                                        title: "三個方法讓你勇敢說不，避免被工作壓得喘不過氣",
                                        desc: "不論客觀來說是否為真，但相信每個上班族或多或少都會有種「為什麼每次倒霉的都是我」或「為什麼我總是最忙的那個」的感覺。有時候可能只是自己的感覺（客觀來說，搞不好大家都超忙）",
                                        author: { id: 15, name: "MH", img: "assets/img/avatar/avatar-3.png", job: "新聞記者" },
                                        btn: { name: "閱讀更多", link: "#" },
                                    },
                                    {
                                        id: 3,
                                        img: "https://www.darencademy.com/images/backend/article/x9ad6b1201ff4a719a84d0363762bc7d1.jpg.pagespeed.ic.Xrev0XWc-z.webp",
                                        tag: "如何思考",
                                        ago: "3 小時前",
                                        title: "《最強提問力》讀後心得：學會提問比找答案更加重要",
                                        desc: "愛因斯坦曾經說過：「如果我只有一個小時可以解決一個攸關自身性命的問題，我一定會把前五十五分鐘都拿來判斷我該問的問題是什麼？」諷刺的是，到了二十一世紀資訊爆炸的年代，我們隨時",
                                        author: { id: 6, name: "WAKI 瓦基", img: "assets/img/avatar/avatar-2.png", job: "作家" },
                                        btn: { name: "閱讀更多", link: "#" },
                                    },
                                ],
                            }
                            return /*html*/ `
        <!-- ======= Recent Blog Posts Section ======= -->
        <section id="news" class="recent-blog-posts">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>${news.title}</h2>
              <p>${news.desc}</p>
            </div>

            <div class="row">
            ${glitter.print(function () {
                                var tmp = "";
                                news.list.map((n, i) => {
                                    tmp += /*html*/ `
                  <div class="col-lg-4" data-aos="fade-up" data-aos-delay="${200 * (i + 1)}">
                    <div class="post-box">
                      <div
                        class="post-img"
                        style="background:url(${n.img});
                        width: 100%;
                        padding-bottom: 55%;
                        background-size: cover;
                        background-position: center center"
                      ></div>
                      <div class="meta">
                        <span class="post-date">${n.ago}</span>
                        <span class="post-author"> / ${n.author.name}</span>
                      </div>
                      <h3 class="post-title">${n.title}</h3>
                      <p>${n.desc}</p>
                      <a class="readmore stretched-link" href="${n.btn.link}" style="cursor:pointer"
                        ><span>${n.btn.name}</span><i class="bi bi-arrow-right"></i
                      ></a>
                    </div>
                  </div>
                `;
                                });
                                return tmp;
                            })}
            </div>
          </div>
        </section>
        <!-- End Recent Blog Posts Section -->
      `;
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
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