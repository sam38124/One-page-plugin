import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController.js";
import {Editor} from "../editor.js";
import {TriggerEvent} from "../glitterBundle/plugins/trigger-event.js";
import {ScriptStyle1} from "./script-style-1.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{

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
            defaultData:{ },
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/topbar.js',import.meta.url))
        },
        nav:{
            title: "導覽列",
            subContent: "用來快速抵達頁面各處的nav",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/nav.js',import.meta.url))
        },
        footer:{
            title: "頁腳",
            subContent: "放在最下方的資訊，以及對網站所有地方的導引",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/footer.js',import.meta.url))
        },
        banner:{
            title: "橫幅",
            subContent: "簡單介紹",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/banner.js',import.meta.url))
        },
        about:{
            title: "關於我們",
            subContent: "用來介紹這網站的用途",
            defaultData:{
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
        empty:{
            title: "test",
            subContent: "test",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/test.js',import.meta.url))
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
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/gallery.js',import.meta.url))
        },
        team:{
            title: "人員介紹",
            subContent: "藉由圖片和文字的方式介紹團隊成員",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/team.js',import.meta.url))
        },
        Contact:{
            title: "聯絡我們",
            subContent: "公司聯絡資訊和聯絡表單",
            defaultData:{},
            render: Plugin.setComponent(import.meta.url,new URL('./style-1/contact-us.js',import.meta.url))
        },
        empty1:{
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