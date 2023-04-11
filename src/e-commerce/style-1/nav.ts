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
                    let nav = {
                        logo: ScriptStyle1.getRout("assets/images/icons/logo-01.png"),
                        menuList:{
                            menu: [
                                {
                                    name: "MEN",
                                    link: ["#"],
                                    list: [
                                        {
                                            name: "上衣",
                                            link: ["#"],
                                            list: [
                                                { name: "上衣", link: ["#"], hot: true },
                                                { name: "襯衫", link: ["#"] },
                                                { name: "外套", link: ["#"] },
                                            ],
                                        },
                                        {
                                            name: "襯衫",
                                            link: ["#"],
                                            hot: true,
                                        },
                                        {
                                            name: "外套",
                                            link: ["#"],
                                            list: [
                                                { name: "上衣", link: ["#"], hot: true },
                                                { name: "襯衫", link: ["#"], hot: true },
                                                { name: "外套", link: ["#"], hot: true },
                                            ],
                                        },
                                    ],
                                    hot: true,
                                },
                                {
                                    name: "WOMEN",
                                    link: ["#"],
                                    list: [
                                        { name: "聯名印花短T", link: ["#"] },
                                        { name: "外套", link: ["#"] },
                                        { name: "洋裝", link: ["#"] },
                                    ],
                                },
                                {
                                    name: "KIDS",
                                    link: ["#"],
                                    list: [
                                        { name: "上衣", link: ["#"] },
                                        { name: "外套", link: ["#"] },
                                        { name: "配件", link: ["#"] },
                                    ],
                                },
                                { name: "NEWS", link: ["#"] },
                                { name: "CONTACT", link: "contact" },
                            ]
                        },

                    }
                    function hotSpan(boo:any) {
                        return boo ? `<span class="badge badge-pill bg-danger ml-1" style="position: relative;bottom: 4px">HOT</span>` : ``;
                    }
                    function routeMenu(obj:any) {
                        return /*html*/ ` 
                        <a onclick="" style="cursor:pointer">
                          ${obj.name + hotSpan(obj.hot)}
                        </a>`;
                    }
                    function showCartJS() {
                        $(".js-show-cart").on("click", function () {
                            $(".js-panel-cart").addClass("show-header-cart");
                        });

                        $(".js-hide-cart").on("click", function () {
                            $(".js-panel-cart").removeClass("show-header-cart");
                        });
                    }

                    function menuShow(menu:any, dev?:any) {
                        var temp = "";
                        menu.map((m:any) => {
                            switch (dev) {
                                case "mobile":
                                    if (m.list !== undefined) {
                                        temp += /*html*/ `<li>
                                          ${routeMenu(m)}
                                          <ul class="sub-menu-m text-dark">
                                            ${menuShow(m.list)}
                                          </ul>
                                          <span class="arrow-main-menu-m">
                                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                                          </span>
                                        </li>`;
                                    } else {
                                        temp += /*html*/ `<li>${routeMenu(m)}</li>`;
                                    }
                                    break;

                                default:
                                    if (m.list !== undefined) {
                                        temp += /*html*/ `<li>
                                          ${routeMenu(m)}
                                          <ul class="sub-menu">
                                            ${menuShow(m.list)}
                                          </ul>
                                        </li>`;
                                    } else {
                                        temp += /*html*/ `<li>${routeMenu(m)}</li>`;
                                    }
                                    break;
                            }
                        });
                        return temp;
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return ``
                            return `
                            <header class="header-v2">
                              <!-- Header desktop -->
                              <div class="container-menu-desktop trans-03">
                                <div class="wrap-menu-desktop">
                                  <nav class="limiter-menu-desktop p-l-45">
                                    <!-- Logo desktop -->
                                    <a class="logo" onclick="" style="cursor:pointer">
                                      <img src="${nav.logo}" alt="IMG-LOGO" />
                                    </a>
                    
                                    <!-- Menu desktop -->
                                    <div class="menu-desktop">
                                      <ul class="main-menu">
                                        ${menuShow(nav.menuList.menu)}
                                      </ul>
                                    </div>
                    
                                    <!-- Icon header -->
                                    <div class="wrap-icon-header flex-w flex-r-m h-full">
                                      <div class="flex-c-m h-full p-r-24">
                                        <div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-modal-search">
                                          <i class="zmdi zmdi-search"></i>
                                        </div>
                                      </div>
                    
                                      <div class="flex-c-m h-full p-l-18 p-r-25 bor5" id="cartNoti">
                                        ${gvc.bindView({
                                            bind: "cartNoti",
                                            view: function () {
                                                var html = "";
                                                html += /*html*/ `
                                                      <div
                                                        class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart"
                                                        data-notify=""
                                                      >
                                                        <i class="zmdi zmdi-shopping-cart"></i>
                                                      </div>
                                                    `;
                                                return html;
                                            },
                                            onCreate: () => {showCartJS()}
                                        })}
                                      </div>
                    
                                      <div class="flex-c-m h-full p-lr-19">
                                        <div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-sidebar">
                                          <i class="zmdi zmdi-menu"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </nav>
                                </div>
                              </div>
                    
                              <!-- Header Mobile -->
                              <div class="wrap-header-mobile">
                                <!-- Logo moblie -->
                                <div class="logo-mobile">
                                  <a onclick="" style="cursor:pointer">
                                    <img src="${nav.logo}" alt="IMG-LOGO" />
                                  </a>
                                </div>
                    
                                <!-- Icon header -->
                                <div class="wrap-icon-header flex-w flex-r-m h-full m-r-15">
                                  <div class="flex-c-m h-full p-r-10">
                                    <div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-modal-search">
                                      <i class="zmdi zmdi-search"></i>
                                    </div>
                                  </div>
                                </div>
                    
                                <!-- Button show menu -->
                                <div class="btn-show-menu-mobile hamburger hamburger--squeeze">
                                  <span class="hamburger-box">
                                    <span class="hamburger-inner"></span>
                                  </span>
                                </div>
                              </div>
                    
                              <!-- Menu Mobile -->
                              <div class="menu-mobile">
                                <ul class="main-menu-m">
                                  ${menuShow(nav.menuList.menu, "mobile")}
                                </ul>
                              </div>
                    
                              <!-- Modal Search -->
                              <div class="modal-search-header flex-c-m trans-04 js-hide-modal-search">
                                <div class="container-search-header">
                                  <button class="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
                                    <img src="images/icons/icon-close2.png" alt="CLOSE" />
                                  </button>
                    
                                  <form class="wrap-search-header flex-w p-l-15">
                                    <button class="flex-c-m trans-04">
                                      <i class="zmdi zmdi-search"></i>
                                    </button>
                                    <input class="plh3" type="text" name="search" placeholder="${glitter.share.language.search}..." />
                                  </form>
                                </div>
                              </div>
                            </header>                          
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
        },
    }
})