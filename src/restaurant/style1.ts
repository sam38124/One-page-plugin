import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController.js";
import {Editor} from "../editor.js";
import {ClickEvent} from "../glitterBundle/plugins/click-event.js";
import {ScriptStyle1} from "./script-style-1.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    // https://liondesign.tw/restaurant/index.html?type=editor&dialog=caddDialog&page=footer
    // https://squarestudio.tw/restaurantly/home?page=Page_Home
    function recursive(r:any, first?:any) {
        var h = "";
        if (r.list === undefined) {
            h += /*html*/ `
              <li>
                <a
                  class="${first ? "nav-link" : ""} scrollto"
                  onclick=""
                  style="cursor:pointer"
                  data-hash=${r.link}
                >
                  ${r.title}
                </a>
              </li>
            `;
        } else {
            h += /*html*/ ` <li class="dropdown">
          <a class="">${r.title}<i class="bi bi-chevron-${first ? "down" : "right"}"></i></a>
          <ul class="">
            ${(()=>{
                var tmp = "";
                r.list.map((r2:any) => (tmp += recursive(r2)));
                return tmp;
            })()}
           
          </ul>
        </li>`;
        }
        return h;
    }
    function urlIcon(link:string , size:string){

        if (link == "#"){
            if (size == "bi")
                return `bi bi-link-45deg`;
            else if (size == "bx")
                return `bx bx-link-alt`;
        }
        let domains = ""
        if (link.match("https://")){
            domains = link.split("https://")[1];
        }else {
            domains = link.split("http://")[1];
        }

        let socialDomain = ["instagram" , "twitter" , "facebook"]
        let returnString = ""

        if (domains.split(".")[0]=="www"){
            returnString = domains.split(".")[1];
        }else {
            returnString = domains.split(".")[0];
        }
        // let split = url.split(".");
        const isMatch = socialDomain.some((domain) => domain.toLowerCase() === returnString.toLowerCase());
        if (isMatch){
            return `${size} ${size}l-${returnString.toLowerCase()}`;
        }else {
            if (size == "bi")
                return `bi bi-link-45deg`;
            else if (size == "bx")
                return `bx bx-link-alt`;
        }
        return ""
    }
    return {
        topbar:{
            title: "導覽列上方的資訊",
            subContent: "用來顯示聯絡資訊",
            defaultData:{
                INF:[
                    {
                        title:"",
                        value:"",
                        img:""
                    },
                    {
                        title:"",
                        value:"",
                        img:""
                    }

                ]
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/topbar.js',import.meta.url))
        },
        nav:{
            title: "導覽列",
            subContent: "用來快速抵達頁面各處的nav",
            defaultData:{
                bar:[],
                moreLink:[],
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/nav.js',import.meta.url))
        },
        footer:{
            title: "頁腳",
            subContent: "放在最下方的資訊，以及對網站所有地方的導引",
            defaultData:{
                outro: {
                    title: "萊恩設計",
                    desc: "提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站",
                    socialData:{
                        link:["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/", "https://squarestudio.tw/"]
                    }

                },
                map: [
                    {
                        title: "網站導覽",
                        listData: {
                            list:[{ name: "菜單", link: "#menu" },
                            { name: "產品介紹", link: "#feature" },
                            { name: "定價方案", link: "#slider" },
                            { name: "技術領域", link: "#banner" },
                            { name: "公司團隊", link: "#team" }]
                        },
                    },
                    {
                        title: "推薦網站",
                        listData: {
                            list: [
                                { name: "Google", link: "https://www.google.com.tw/" },
                                { name: "Yahoo", link: "https://tw.yahoo.com/" },
                            ]
                        },

                    },
                ],
                subs: { desc: "想收到與萊恩設計有關的最新消息，請立即訂閱我們的電子報，我們會將資訊送至你的信箱。", link: "#" },
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
        banner:{
            title: "橫幅",
            subContent: "簡單介紹",
            defaultData:{
                keyVision: {
                    title: "關於<span>萊恩設計</span>我們能為您做什麼？",
                    desc: "優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
                    video: "https://www.youtube.com/watch?v=u6BOC7CDUTQ",
                    img: ScriptStyle1.getRout("assets/img/hero-bg.jpg"),
                    listData: {
                        list:[
                            { name: "菜單", link: "#" },
                            { name: "門市據點", link: "#" },
                    ]},
                }
            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/banner.js',import.meta.url))
        },
        about:{
            title: "關於我們",
            subContent: "用來介紹這網站的用途",
            defaultData:{
                about : {
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
            },

            render: Plugin.setComponent(import.meta.url,new URL('./style-1/about.js',import.meta.url))
        },
        whyUs:{
            title: "服務內容",
            subContent: "介紹公司服務的內容項目",
            defaultData:{

            },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/whyUs.js',import.meta.url))
        },
        menu:{
            title: "服務菜單",
            subContent: "各式各樣的菜品介紹和價格",
            defaultData:{},
            //todo 這邊分頁顯示跟上標籤的js沒上
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/menu.js',import.meta.url))
        },
        special:{
            title: "特色料理",
            subContent: "分頁式顯示料理和介紹",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/special.js',import.meta.url))
        },
        slider:{
            title: "滑動式頁面",
            subContent: "滑動式頁面",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/slider.js',import.meta.url))
        },
        testimonials:{
            title: "用戶回饋",
            subContent: "卡片式顯示過往用戶的回饋資訊",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/testimonials.js',import.meta.url))
        },
        gallery:{
            title: "畫廊",
            subContent: "方格式展覽作品",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        ScriptStyle1.initialScript(gvc,widget)
                        const gallery= {
                            title: "實際餐廳畫面",
                            desc: "餐廳空間設計與實際用餐的感覺",
                            list: [
                                "assets/img/gallery/gallery-1.jpg",
                                "assets/img/gallery/gallery-2.jpg",
                                "assets/img/gallery/gallery-3.jpg",
                                "assets/img/gallery/gallery-4.jpg",
                                "assets/img/gallery/gallery-5.jpg",
                                "assets/img/gallery/gallery-6.jpg",
                                "assets/img/gallery/gallery-7.jpg",
                                "assets/img/gallery/gallery-8.jpg",
                            ],
                        }
                        return gvc.bindView({
                            bind:glitter.getUUID(),
                            view:()=>{
                                return `
                                <!-- ======= Gallery Section ======= -->
                                <section id="gallery" class="gallery">
                                    <div class="container" data-aos="fade-up">
                                        <div class="section-title">
                                            <h2>${gallery.title}</h2>
                                            <p>${gallery.desc}</p>
                                        </div>
                                    </div>
                        
                                    <div class="container-fluid" data-aos="fade-up" data-aos-delay="100">
                                        <div class="row g-0">
                                            ${glitter.print(function () {
                                                let tmp = "";
                                                gallery.list.map((l:any) => {
                                                    tmp += /*html*/ `
                                                        <div class="col-lg-3 col-md-4">
                                                            <div class="gallery-item">
                                                                <a href="${ScriptStyle1.getRout(l)}" class="gallery-lightbox" data-gall="gallery-item">
                                                                    <img src="${ScriptStyle1.getRout(l)}" alt="" class="img-fluid" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                      `;
                                                });
                                                return tmp;
                                            })}
                                        </div>
                                    </div>
                                </section>
                                <!-- End Gallery Section -->
                                `
                            },divCreate:{},
                            onCreate:()=>{}
                        })

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        team:{
            title: "人員介紹",
            subContent: "藉由圖片和文字的方式介紹團隊成員",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        ScriptStyle1.initialScript(gvc,widget)
                        const team= {
                            title: "我們的主廚團隊",
                            desc: "優良的傳統中，持續將餐點優化，是我們共同維護的榮譽",
                            list: [
                                {
                                    img: "assets/img/chefs/chefs-1.jpg",
                                    name: "陳志賢",
                                    pro: "大廚",
                                    link: ["https://www.facebook.com/", "https://www.instagram.com/"],
                                },
                                {
                                    img: "assets/img/chefs/chefs-2.jpg",
                                    name: "黃國玟",
                                    pro: "二廚",
                                    link: [
                                        "https://www.instagram.com/",
                                        "https://squarestudio.tw",
                                        "https://www.instagram.com/",
                                        "https://www.facebook.com/",
                                        "https://twitter.com/",
                                    ],
                                },
                                { img: "assets/img/chefs/chefs-3.jpg", name: "陳佳玲", pro: "外場經理", link: ["https://squarestudio.tw", "#"] },
                            ],
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
                                            team.list.map((l:any) => {
                                                tmp += /*html*/ `
                                                    <div class="col-lg-4 col-md-6">
                                                        <div class="member" data-aos="zoom-in" data-aos-delay="100">
                                                            <img src="${ScriptStyle1.getRout(l.img)}" class="img-fluid" alt="" />
                                                            <div class="member-info">
                                                                <div class="member-info-content">
                                                                    <h4>${l.name}</h4>
                                                                    <span>${l.pro}</span>
                                                                </div>
                                                                <div class="social">
                                                                    ${(()=>{
                                                                        let tmp = "";
                                                                        l.link.map((k:any) => {
                                                                          
                                                                            // 
                                                                            tmp += /*html*/ `
                                                                                <a onclick="" style="cursor:pointer"
                                                                                    ><i class="${urlIcon(k , "bi")}"></i
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

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        Contact:{
            title: "聯絡我們",
            subContent: "公司聯絡資訊和聯絡表單",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        ScriptStyle1.initialScript(gvc,widget)
                        const contact = {
                            title: "想傳達您的訊息給萊恩設計嗎？",
                            desc: "若想要了解我們的服務，填妥表單，萊恩設計將儘速回應您。",
                            map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621",
                            info: [
                                { icon: "bx bx-map", title: "地址", text: "台中市臺灣大道二段<br>285號20樓" },
                                { icon: "bx bx-phone", title: "電話", text: "(886) 0978-028-730" },
                                { icon: "bx bx-time-five", title: "營業時間", text: "週一至週五<br>09:00 AM – 19:00 PM" },
                                { icon: "bx bx-envelope", title: "信箱", text: "jianzhi.wang@ncdesign.info" },
                            ],
                            form: [
                                { title: "姓名", id: "name", need: true },
                                { title: "信箱", id: "email", need: true },
                                { title: "電話 / 手機", id: "phone", need: true },
                                { title: "主旨", id: "subject", need: true },
                                { title: "想說的內容", id: "message", need: true },
                            ],
                        }
                        const id = glitter.getUUID();
                        return gvc.bindView({
                            bind : id,
                            view:()=>{
                                return `
                                    <!-- ======= Contact Section ======= -->
                                    <section id="contact" class="contact">
                                        <div class="container" data-aos="fade-up">
                                            <div class="section-title">
                                                <h2>${contact.title}</h2>
                                                <p>${contact.desc}</p>
                                            </div>
                                        </div>
                            
                                        <div data-aos="fade-up">
                                            <iframe style="border: 0; width: 100%; height: 350px" src="${contact.map}" frameborder="0" allowfullscreen></iframe>
                                        </div>
                            
                                        <div class="container" data-aos="fade-up">
                                            <div class="row mt-5">
                                                <div class="col-lg-4">
                                                    <div class="info">
                                                    ${glitter.print(function () {
                                                        let tmp = "";
                                                        contact.info.map((f) => {
                                                            tmp += /*html*/ `
                                                            <div class="mb-5">
                                                                <i class="${f.icon}"></i>
                                                                <h4>${f.title}</h4>
                                                                <p>${f.text}</p>
                                                            </div>
                                                        `;
                                                        });
                                                        return tmp;
                                                    })}
                                                    </div>
                                                </div>
                                
                                                <div class="col-lg-8 mt-5 mt-lg-0">
                                                    <div class="php-email-form">          
                                                        <div class="form-group mb-3">
                                                            <input class="form-control" name="name" id="name" type="text" placeholder="請輸入你的姓名" onblur="clickMap['12'].fun(this,event);" data-gs-event-12="event">
                                                        </div>                                                              
                                                        <div class="form-group mb-3">
                                                            <input class="form-control" name="email" id="email" type="email" placeholder="請輸入你的電子郵件" onblur="clickMap['13'].fun(this,event);" data-gs-event-13="event">
                                                        </div>                                                              
                                                        <div class="form-group mb-3">
                                                            <input class="form-control" name="phone" id="phone" type="number" placeholder="請輸入你的電話 / 手機" onblur="clickMap['14'].fun(this,event);" data-gs-event-14="event">
                                                        </div>                                                              
                                                        <div class="form-group mb-3">
                                                            <input class="form-control" name="subject" id="subject" type="text" placeholder="請輸入主旨" onblur="clickMap['15'].fun(this,event);" data-gs-event-15="event">
                                                        </div>
                                                        <div class="form-group mb-3">
                                                            <textarea class="form-control" name="message" id="message" cols="30" rows="5" placeholder="請輸入想說的訊息" onblur="clickMap['16'].fun(this,event);" data-gs-event-16="event"></textarea>
                                                        </div>
                                            
                                                        <div class="text-center text-md-right mt-3">
                                                            <button type="submit" onclick="" data-gs-event-17="event">傳送訊息</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <!-- End Contact Section -->
                                `
                            },divCreate:{},
                            onCreate:()=>{

                            }

                        })


                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
        empty:{
            title: "",
                subContent: "",
                defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        ScriptStyle1.initialScript(gvc,widget)
                        const top= {
                            phone: "0918-563-927",
                            clock: "週一至週五 09:00 - 19:00",
                        }
                        return `
                            <div id="topbar" class="d-flex align-items-center fixed-top">
                                <div class="container d-flex justify-content-center justify-content-md-between">
                                    <div class="contact-info d-flex align-items-center">
                                        <i class="bi bi-phone d-flex align-items-center"><span>${top.phone}</span></i>
                                        <i class="bi bi-clock d-flex align-items-center ms-4"><span> ${top.clock}</span></i>
                                    </div>
                                    <div class="languages d-none d-md-flex align-items-center">
                                        <ul>
                                          <li>中文</li>
                                          <li><a href="#">English</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            `

                    },
                    editor:()=>{
                        return ``
                    }
                }
            }
        },
    }
})