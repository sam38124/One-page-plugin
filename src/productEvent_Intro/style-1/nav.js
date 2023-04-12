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
                    let nav = {
                        datalist: [
                            { title: "intro", name: "首頁" },
                            { title: "features", name: "產品特色" },
                            { title: "screenshots", name: "畫面演示" },
                            { title: "video", name: "影片" },
                            { title: "pricing", name: "售價" },
                            { title: "contact", name: "聯絡我們" },
                        ]
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <div class="page-borders">
                              <div class="left"></div>
                              <div class="right"></div>
                            </div>
                    
                            <a href="#" class="menu-btn">
                              <span class="lines">
                                <span class="l1"></span>
                                <span class="l2"></span>
                                <span class="l3"></span>
                              </span>
                            </a>
                    
                            <nav class="menu">
                              <ul>
                                ${glitter.print(function () {
                                var tmp = "";
                                nav.datalist.map((l) => (tmp += `<li><a href="#${l.title}" style="font-size:16px"> ${l.name} </a></li>`));
                                return tmp;
                            })}
                              </ul>
                            </nav>
                    
<!--                            <div id="preloader">-->
<!--                              <div class="loader">-->
<!--                                <img src="${ScriptStyle1.getRout('img/loader.gif')}" alt />-->
<!--                              </div>-->
<!--                            </div>-->
                          `;
                        }, divCreate: {
                            class: 'showBody'
                        },
                        onCreate: () => {
                            $(".menu-btn").on("click", function (e) {
                                e.preventDefault();
                                $(".showBody").toggleClass("show-menu");
                            });
                            $(".menu > ul > li > a").on("click", function () {
                                var $offset = $($(this).attr("href")).offset().top;
                                $("body, html").animate({
                                    scrollTop: $offset,
                                }, 700);
                                $("showBody").removeClass("show-menu");
                            });
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
