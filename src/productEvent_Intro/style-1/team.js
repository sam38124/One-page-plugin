import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let team = {
                        title: "我們的團隊",
                        desc: "我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽",
                        btn: { name: "了解更多", link: ["#"] },
                        list: [
                            { img: ScriptStyle1.getRout("img/team (1).jpg"), name: "陳志賢", pro: "執行長", link: ["https://www.facebook.com/", "https://www.instagram.com/"] },
                            { img: ScriptStyle1.getRout("img/team (2).jpg"), name: "黃國玟", pro: "UI／UX設計師", link: ["https://www.instagram.com/", "https://squarestudio.tw"] },
                            {
                                img: ScriptStyle1.getRout("img/team (3).jpg"),
                                name: "韓俊榮",
                                pro: "前端工程師",
                                link: ["https://twitter.com/", "https://www.instagram.com/", "https://github.com"],
                            },
                            { img: ScriptStyle1.getRout("img/team (4).jpg"), name: "陳佳玲", pro: "系統規劃師", link: ["https://squarestudio.tw", "#"] },
                            { img: ScriptStyle1.getRout("img/team (5).jpg"), name: "黃雅茹", pro: "產品業務", link: ["https://www.facebook.com/", "https://squarestudio.tw", "#"] },
                        ],
                    };
                    const iconLibrary = {
                        fab: {
                            facebook: "fab fa-facebook-f",
                            instagram: "fab fa-instagram",
                            twitter: "fab fa-twitter",
                            linkedin: "fab fa-linkedin-in",
                            youtube: "fab fa-youtube",
                            line: "fab fa-line",
                            link: "fas fa-link",
                        },
                        fa: {
                            facebook: "fa fa-facebook",
                            instagram: "fa fa-instagram",
                            pinterest: "fa fa-pinterest-p",
                            link: "fa fa-link",
                        },
                        bx: {
                            twitter: "bx bxl-twitter",
                            facebook: "bx bxl-facebook",
                            instagram: "bx bxl-instagram",
                            skype: "bx bxl-skype",
                            linkedin: "bx bxl-linkedin",
                            link: "bx bx-link-alt",
                        },
                        ion: {
                            facebook: "ion-social-facebook",
                            instagram: "ion-social-instagram-outline",
                            twitter: "ion-social-twitter",
                            linkedin: "ion-social-linkedin",
                            youtube: "ion-social-youtube",
                            github: "ion-social-github",
                            googleplus: "ion-social-googleplus",
                            link: "ion-link",
                        },
                        ti: {
                            facebook: "ti-facebook",
                            twitter: "ti-twitter-alt",
                            instagram: "ti-instagram",
                            link: "ti-link",
                        },
                        bi: {
                            facebook: "bi bi-facebook",
                            twitter: "bi bi-twitter",
                            instagram: "bi bi-instagram",
                            linkedin: "bi bi-linkedin",
                            link: "bi bi-link-45deg",
                        },
                    };
                    function urlIcon(url, list) {
                        var sw = { object: list, string: iconLibrary[list], undefined: iconLibrary.fab };
                        var l = sw[typeof list];
                        return l[Object.keys(l).find((a) => url.includes(a)) ?? "link"];
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
        <section id="team" class="section team-section">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="col-section-header">
                  <h2>${team.title}</h2>
                  <p>${team.desc}</p>
                  <a class="btn-minimal" href="${team.btn.link}"> ${team.btn.name} </a>
                </div>
              </div>
              <div class="col-md-8">
                <div class="team-persons">
                  ${glitter.print(function () {
                                var tmp = "";
                                team.list.map((l, n) => {
                                    n % 3 == 0 ? (tmp += `<div class="row">`) : ``;
                                    tmp += `
                        <div class="col-md-4">
                          <div class="team-member">
                            <img src="${l.img}" alt />
                            <div class="overlay">
                              <div class="v-align">
                                <div class="inner">
                                  <h4>${l.name}</h4>
                                  <p>${l.pro}</p>
                                  <ul class="team-social">
                                    ${glitter.print(function () {
                                        let iconList = {
                                            facebook: "ion-social-facebook",
                                            instagram: "ion-social-instagram-outline",
                                            twitter: "ion-social-twitter",
                                            linkedin: "ion-social-linkedin",
                                            youtube: "ion-social-youtube",
                                            github: "ion-social-github",
                                            googleplus: "ion-social-googleplus",
                                            link: "ion-link",
                                        };
                                        let tmp = "";
                                        l.link.map((k) => {
                                            tmp += `
                                          <li>
                                            <a href="${k}" >
                                              <i class="${urlIcon(k, iconList)}"></i>
                                            </a>
                                          </li>
                                        `;
                                        });
                                        return tmp;
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      `;
                                    n % 3 == 2 ? (tmp += `</div>`) : ``;
                                });
                                return tmp;
                            })}
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return ``;
                }
            };
        },
    };
});
