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
                    let nav:any = {
                        datalist : [
                            { title: "intro", name: "首頁" },
                            { title: "features", name: "產品特色" },
                            { title: "screenshots", name: "畫面演示" },
                            { title: "video", name: "影片" },
                            { title: "pricing", name: "售價" },
                            { title: "contact", name: "聯絡我們" },
                        ]
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
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
                                    nav.datalist.map((l:any) => (tmp += /*html*/ `<li><a href="#${l.title}" style="font-size:16px"> ${l.name} </a></li>`));
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
                        },divCreate:{
                            class:'showBody'
                        },
                        onCreate:()=>{
                            $(".menu-btn").on("click", function (e) {
                                e.preventDefault();

                                $(".showBody").toggleClass("show-menu");
                            });
                            $(".menu > ul > li > a").on("click", function () {
                                // @ts-ignore
                                var $offset = $($(this).attr("href")).offset().top;
                                $("body, html").animate(
                                    {
                                        scrollTop: $offset,
                                    },
                                    700
                                );
                                $("showBody").removeClass("show-menu");
                            });
                        }

                    })
                },
                editor:()=>{
                    return``

                }
            }
        },
    }
})