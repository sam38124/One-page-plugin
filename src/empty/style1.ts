import {HtmlJson, Plugin} from "../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../glitterBundle/Glitter.js";
import {GVC} from "../glitterBundle/GVController.js";
import {Editor} from "../editor.js";
import {ClickEvent} from "../glitterBundle/plugins/click-event.js";
import {ScriptStyle1} from "./script-style-1.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    // https://liondesign.tw/restaurant/index.html?type=editor&dialog=caddDialog&page=footer

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