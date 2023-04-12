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
                    let video:any = {
                        title: "宣傳影片",
                        desc: "我們服務客戶，為提高公眾可見度或知名度所使用的方式。其訊息是介紹公司服務內容給大眾了解",
                        link: "https://www.youtube.com/embed/GIalL5fkhPM",
                    }
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
                            <section id="video" class="section video-section bg-lightgray">
                              <div class="container">
                                <div class="row">
                                  <div class="col-md-4">
                                    <div class="col-section-header">
                                      <h2>${video.title}</h2>
                                      <p>${video.desc}</p>
                                    </div>
                                  </div>
                                  <div class="col-md-8">
                                    <div class="video-container">
                                      <iframe
                                        width="560"
                                        height="315"
                                        src="${video.link}"
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                      ></iframe>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          `;
                        },divCreate:{},
                        onCreate:()=>{

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