import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";

import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import * as $ from 'jquery';

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    let slider = {
                        dataList:[
                            {
                                img: ScriptStyle1.getRout("assets/images/slide-03.jpg"),
                                subtitle: { text: "Men Collection 2018", show: "fadeInDown" },
                                title: { text: "New arrivals", show: "fadeInUp" },
                                btn: { text: "Shop Now", link: ["#"], show: "zoomIn" },
                            },
                            {
                                img: ScriptStyle1.getRout("assets/images/slide-02.jpg"),
                                subtitle: { text: "Men New-Season", show: "rollIn" },
                                title: { text: "Jackets & Coats", show: "lightSpeedIn" },
                                btn: { text: "Shop Now", link: ["#"], show: "slideInUp" },
                            },
                            {
                                img: ScriptStyle1.getRout("assets/images/slide-04.jpg"),
                                subtitle: { text: "Women Collection 2018", show: "rotateInDownLeft" },
                                title: { text: "NEW SEASON", show: "rotateInUpRight" },
                                btn: { text: "Shop Now", link: ["#"], show: "rotateIn" },
                            },
                        ]
                    }
                    let load =false;

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <section class="section-slide">
                              <div class="wrap-slick1 rs1-slick1">
                                <div class="slick1">
                                  ${glitter.print(function () {
                                    var tmp = "";
                                    slider.dataList.map((s) => {
                                        tmp += /*html*/ `
                                        <div class="item-slick1" style="background-image: url(${s.img})">
                                          <div class="container h-full">
                                            <div class="flex-col-l-m h-full p-t-100 p-b-30">
                                              <div class="layer-slick1 animated visible-false" data-appear="${s.subtitle.show}" data-delay="0">
                                                <span class="ltext-202 cl2 respon2"> ${s.subtitle.text} </span>
                                              </div>
                    
                                              <div class="layer-slick1 animated visible-false" data-appear="${s.title.show}" data-delay="800">
                                                <h2 class="ltext-104 cl2 p-t-19 p-b-43 respon1">${s.title.text}</h2>
                                              </div>
                    
                                              <div class="layer-slick1 animated visible-false" data-appear="${s.btn.show}" data-delay="1600">
                                                <a
                                                  class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                                                  onclick=""
                                                  style="cursor:pointer"
                                                >
                                                  ${s.btn.text}
                                                </a>
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
                          `
                        },divCreate:{},
                        onCreate:()=>{
                            if (!load){
                                gvc.addStyleLink([
                                    ScriptStyle1.getRout("assets/vendor/slick/slick.css"),
                                ]).then()
                                gvc.addMtScript([
                                    "assets/vendor/slick/slick.min.js",
                                    "assets/js/slick-custom.js",
                                ].map(((dd)=>{
                                    return   {src: ScriptStyle1.getRout(dd)}
                                })), () => {
                                    try {
                                        load = true;

                                    } catch (e) {
                                    }

                                }, () => {

                                })
                            }

                        }

                    })
                },
                editor:()=>{
                    return ``
                }
            }
        },
    }
})