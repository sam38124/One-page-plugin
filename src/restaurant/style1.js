import { Plugin } from "../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "./script-style-1.js";
Plugin.create(import.meta.url, (glitter, editMode) => {
    function recursive(r, first) {
        var h = "";
        if (r.list === undefined) {
            h += `
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
        }
        else {
            h += ` <li class="dropdown">
          <a class="">${r.title}<i class="bi bi-chevron-${first ? "down" : "right"}"></i></a>
          <ul class="">
            ${(() => {
                var tmp = "";
                r.list.map((r2) => (tmp += recursive(r2)));
                return tmp;
            })()}
           
          </ul>
        </li>`;
        }
        return h;
    }
    function urlIcon(link, size) {
        if (link == "#") {
            if (size == "bi")
                return `bi bi-link-45deg`;
            else if (size == "bx")
                return `bx bx-link-alt`;
        }
        let domains = "";
        if (link.match("https://")) {
            domains = link.split("https://")[1];
        }
        else {
            domains = link.split("http://")[1];
        }
        let socialDomain = ["instagram", "twitter", "facebook"];
        let returnString = "";
        if (domains.split(".")[0] == "www") {
            returnString = domains.split(".")[1];
        }
        else {
            returnString = domains.split(".")[0];
        }
        const isMatch = socialDomain.some((domain) => domain.toLowerCase() === returnString.toLowerCase());
        if (isMatch) {
            return `${size} ${size}l-${returnString.toLowerCase()}`;
        }
        else {
            if (size == "bi")
                return `bi bi-link-45deg`;
            else if (size == "bx")
                return `bx bx-link-alt`;
        }
        return "";
    }
    return {
        topbar: {
            title: "導覽列上方的資訊",
            subContent: "用來顯示聯絡資訊",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/topbar.js', import.meta.url))
        },
        nav: {
            title: "導覽列",
            subContent: "用來快速抵達頁面各處的nav",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/nav.js', import.meta.url))
        },
        footer: {
            title: "頁腳",
            subContent: "放在最下方的資訊，以及對網站所有地方的導引",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url))
        },
        banner: {
            title: "橫幅",
            subContent: "簡單介紹",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/banner.js', import.meta.url))
        },
        about: {
            title: "關於我們",
            subContent: "用來介紹這網站的用途",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/about.js', import.meta.url))
        },
        whyUs: {
            title: "服務內容",
            subContent: "介紹公司服務的內容項目",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/whyUs.js', import.meta.url))
        },
        menu: {
            title: "服務菜單",
            subContent: "各式各樣的菜品介紹和價格",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/menu.js', import.meta.url))
        },
        special: {
            title: "特色料理",
            subContent: "分頁式顯示料理和介紹",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/special.js', import.meta.url))
        },
        empty: {
            title: "test",
            subContent: "test",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/test.js', import.meta.url))
        },
        slider: {
            title: "滑動式頁面",
            subContent: "滑動式頁面",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/slider.js', import.meta.url))
        },
        testimonials: {
            title: "用戶回饋",
            subContent: "卡片式顯示過往用戶的回饋資訊",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/testimonials.js', import.meta.url))
        },
        gallery: {
            title: "畫廊",
            subContent: "方格式展覽作品",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/gallery.js', import.meta.url))
        },
        team: {
            title: "人員介紹",
            subContent: "藉由圖片和文字的方式介紹團隊成員",
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                return {
                    view: () => {
                        ScriptStyle1.initialScript(gvc, widget);
                        const team = {
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
                        };
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
                            team.list.map((l) => {
                                tmp += `
                                                    <div class="col-lg-4 col-md-6">
                                                        <div class="member" data-aos="zoom-in" data-aos-delay="100">
                                                            <img src="${ScriptStyle1.getRout(l.img)}" class="img-fluid" alt="" />
                                                            <div class="member-info">
                                                                <div class="member-info-content">
                                                                    <h4>${l.name}</h4>
                                                                    <span>${l.pro}</span>
                                                                </div>
                                                                <div class="social">
                                                                    ${(() => {
                                    let tmp = "";
                                    l.link.map((k) => {
                                        tmp += `
                                                                                <a onclick="" style="cursor:pointer"
                                                                                    ><i class="${urlIcon(k, "bi")}"></i
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
                            `;
                    },
                    editor: () => {
                        return ``;
                    }
                };
            }
        },
        Contact: {
            title: "聯絡我們",
            subContent: "公司聯絡資訊和聯絡表單",
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/contact-us.js', import.meta.url))
        },
        empty1: {
            title: "",
            subContent: "",
            defaultData: {},
            render: (gvc, widget, setting, hoverID) => {
                return {
                    view: () => {
                        ScriptStyle1.initialScript(gvc, widget);
                        const top = {
                            phone: "0918-563-927",
                            clock: "週一至週五 09:00 - 19:00",
                        };
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
                            `;
                    },
                    editor: () => {
                        return ``;
                    }
                };
            }
        },
    };
});
