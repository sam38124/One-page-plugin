import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.about=widget.data.about ?? {
                img: ScriptStyle1.getRout("assets/img/about.jpg"),
                title: "關於我們能為您做些甚麼",
                desc: `我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。<ul><li><i class="bi bi-check-circle"></i> 從電商網站設計、後台管理、產品投放分析、網站架設、金流串接</li><li><i class="bi bi-check-circle"></i> 無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格</li><li><i class="bi bi-check-circle"></i> 薪資管理、班表分配、客戶表單，企業基本經營的功能與系統</li><li><i class="bi bi-check-circle"></i> 網紅經營部落格、分享資訊、個人專屬的網站</li></ul>從電商網站設計、後台管理、搜尋應用、網站架設、金流串接，我們都有經驗能替您完成服務<br><br>資料視覺化的長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現；企業管理中的薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統。`,
            }
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    const about = widget.data.about;
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `                        
                                <!-- ======= About Section ======= -->
                                <section id="about" class="about">
                                  <div class="container">
                                    <div class="row">
                                      <div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left">
                                        <img src="${about.img}" class="img-fluid" alt="" />
                                      </div>
                                      <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right">
                                        <h3>${about.title}</h3>
                                        <p>${about.desc}</p>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                                <!-- End About Section -->
                                `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            AOS.init();
                        }

                    })
                },
                editor:()=>{
                    return glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: '大標題',
                        default: widget.data.about.title,
                        placeHolder: '請輸入大標題所顯示的文字',
                        callback: (text) => {
                            widget.data.about.title = text;
                            widget.refreshComponent();
                        },
                    })+
                    `
                    <div class="mt-3"></div>
                    `+
                    Editor.uploadImage({
                        gvc: gvc,
                        title: `右方圖片`,
                        def: widget.data.about.img,
                        callback: (e) => {
                            widget.data.about.img = e;
                            widget.refreshComponent();
                        },
                    })+
                    `
                    <div class="mt-3"></div>
                    `+
                    glitter.htmlGenerate.editeText({
                        gvc: gvc,
                        title: '文案',
                        default: widget.data.about.desc,
                        placeHolder: "文案",
                        callback: (text) => {
                            widget.data.about.desc = text
                            widget.refreshComponent()
                        }
                    })
                }
            }
        },
    }
})