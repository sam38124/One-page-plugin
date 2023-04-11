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
                        logo: ScriptStyle1.getRout("assets/images/icons/logo-01.png"),
                        menuList: {
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
                    };
                    let sidebarData = {
                        mapList: { map: [
                                { name: "首頁", link: ["#"] },
                                { name: "我的帳戶", link: ["#"] },
                                { name: "許願清單", link: ["#"] },
                                { name: "優惠促銷", link: ["#"] },
                                { name: "門市據點", link: ["#"] },
                                { name: "常見問題", link: ["#"] },
                            ], },
                        gallery: {
                            title: "COZA 商場",
                            list: [
                                "images/gallery-01.jpg",
                                "images/gallery-02.jpg",
                                "images/gallery-03.jpg",
                                "images/gallery-04.jpg",
                                "images/gallery-05.jpg",
                                "images/gallery-06.jpg",
                                "images/gallery-07.jpg",
                                "images/gallery-08.jpg",
                                "images/gallery-09.jpg",
                            ],
                        },
                        article: {
                            title: "關於我們",
                            desc: "優良的公司文化，與創新彈性的工作環境，我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽",
                        },
                    };
                    function hotSpan(boo) {
                        return boo ? `<span class="badge badge-pill bg-danger ml-1" style="position: relative;bottom: 4px">HOT</span>` : ``;
                    }
                    function routeMenu(obj) {
                        return ` 
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
                    function sidebar() {
                        return `
                        <!-- Sidebar -->
                        <aside class="wrap-sidebar js-sidebar">
                          <div class="s-full js-hide-sidebar"></div>
                
                          <div class="sidebar flex-col-l p-t-22 p-b-25">
                            <div class="flex-r w-full p-b-30 p-r-27">
                              <div class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-sidebar">
                                <i class="zmdi zmdi-close"></i>
                              </div>
                            </div>

                            <div class="sidebar-content flex-w w-full p-lr-65 js-pscroll">
                              <ul class="sidebar-link w-full">
                                ${glitter.print(function () {
                            var tmp = "";
                            sidebarData.mapList.map.map((m) => {
                                tmp += `
                                          <li class="p-b-13">
                                            <a class="stext-102 cl2 hov-cl1 trans-04" onclick="" style="cursor:pointer">
                                              ${m.name}
                                            </a>
                                          </li>
                                        `;
                            });
                            return tmp;
                        })}
                              </ul>
                
                              <div class="sidebar-gallery w-full p-tb-30">
                                <span class="mtext-101 cl5"> ${sidebarData.gallery.title} </span>
                                <div class="flex-w flex-sb p-t-36 gallery-lb">
                                  ${glitter.print(function () {
                            var tmp = "";
                            sidebarData.gallery.list.map((l) => {
                                tmp += `
                                        <!-- item gallery sidebar -->
                                    <div class="wrap-item-gallery m-b-10">
                                      <a class="item-gallery bg-img1" href="${l}" data-lightbox="gallery" style="background-image: url('${l}')"></a>
                                    </div>
                                  `;
                            });
                            return tmp;
                        })}
                                </div>
                              </div>
                
                              <div class="sidebar-gallery w-full">
                                <span class="mtext-101 cl5"> ${sidebarData.article.title} </span>
                                <p class="stext-108 cl6 p-t-27">${sidebarData.article.desc}</p>
                              </div>
                            </div>
                          </div>
                        </aside>
                      `;
                    }
                    function menuShow(menu, dev) {
                        var temp = "";
                        menu.map((m) => {
                            switch (dev) {
                                case "mobile":
                                    if (m.list !== undefined) {
                                        temp += `<li>
                                          ${routeMenu(m)}
                                          <ul class="sub-menu-m text-dark">
                                            ${menuShow(m.list)}
                                          </ul>
                                          <span class="arrow-main-menu-m">
                                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                                          </span>
                                        </li>`;
                                    }
                                    else {
                                        temp += `<li>${routeMenu(m)}</li>`;
                                    }
                                    break;
                                default:
                                    if (m.list !== undefined) {
                                        temp += `<li>
                                          ${routeMenu(m)}
                                          <ul class="sub-menu">
                                            ${menuShow(m.list)}
                                          </ul>
                                        </li>`;
                                    }
                                    else {
                                        temp += `<li>${routeMenu(m)}</li>`;
                                    }
                                    break;
                            }
                        });
                        return temp;
                    }
                    function cart() {
                        return `
                        <!-- Cart -->
                        <div class="wrap-header-cart js-panel-cart">
                          <div class="s-full js-hide-cart"></div>
                          <div class="header-cart flex-col-l p-l-65 p-r-25">
                            <div class="header-cart-title flex-w flex-sb-m p-b-8">
                            <!--  <span class="mtext-103 cl2"> glitter.share.language.yourCart </span>                              -->
                              <span class="mtext-103 cl2"> </span>
                              <div class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
                                <i class="zmdi zmdi-close"></i>
                              </div>
                            </div>
                
                            <div class="header-cart-content flex-w js-pscroll" id="cartPage">
                              ${gvc.bindView({
                            bind: "cartPage",
                            view: function () {
                                var total = 0;
                                return `
                                    <ul class="header-cart-wrapitem w-full">
                                      ${glitter.print(function () {
                                    var tmp = "";
                                    return tmp;
                                })}
                                    </ul>
                                    <div class="w-full">
                                      <div class="header-cart-total w-full p-tb-40">小記: $${total.toLocaleString()}</div>
                                      <div class="header-cart-buttons flex-w w-full">
                                        <a
                                          class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10 text-white"
                                          onclick=""
                                          style="cursor:pointer"
                                        >
                                          View Cart
                                        </a>
                                        <a
                                          class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10 text-white"
                                        
                                          href=""
                                          style="cursor:pointer"
                                        >
                                          Check Out
                                        </a>
                                      </div>
                                    </div>
                                  `;
                            },
                        })}
                            </div>
                          </div>
                        </div>
                      `;
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
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
                                    html += `
                                                      <div
                                                        class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart"
                                                        data-notify="0"
                                                      >
                                                        <i class="zmdi zmdi-shopping-cart"></i>
                                                      </div>
                                                    `;
                                    return html;
                                },
                                onCreate: () => { showCartJS(); }
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
                                    <img src="${ScriptStyle1.getRout("assets/images/icons/icon-close2.png")}" alt="CLOSE" />
                                  </button>
                    
                                  <form class="wrap-search-header flex-w p-l-15">
                                    <button class="flex-c-m trans-04">
                                      <i class="zmdi zmdi-search"></i>
                                    </button>
                                    <input class="plh3" type="text" name="search" placeholder="..." />
                                  </form>
                                </div>
                              </div>
                                  ${cart()}
                                  ${sidebar()}
                            </header>                          
                            `;
                        }, divCreate: {},
                        onCreate: () => {
                            function FixedHeader() {
                                let headerDesktop = $(".container-menu-desktop");
                                let wrapMenu = $(".wrap-menu-desktop");
                                let posWrapHeader = 0;
                                if ($(".top-bar").length > 0) {
                                    let posWrapHeader = $(".top-bar").height();
                                }
                                if ($(window).scrollTop() > posWrapHeader) {
                                    $(headerDesktop).addClass("fix-menu-desktop");
                                    $(wrapMenu).css("top", 0);
                                }
                                else {
                                    $(headerDesktop).removeClass("fix-menu-desktop");
                                    $(wrapMenu).css("top", posWrapHeader - $(this).scrollTop());
                                }
                                $(window).on("scroll", function () {
                                    if ($(this).scrollTop() > posWrapHeader) {
                                        $(headerDesktop).addClass("fix-menu-desktop");
                                        $(wrapMenu).css("top", 0);
                                    }
                                    else {
                                        $(headerDesktop).removeClass("fix-menu-desktop");
                                        $(wrapMenu).css("top", posWrapHeader - $(this).scrollTop());
                                    }
                                });
                            }
                            function MenuMobile() {
                                $(".btn-show-menu-mobile").on("click", function () {
                                    $(this).toggleClass("is-active");
                                    $(".menu-mobile").slideToggle();
                                });
                                var arrowMainMenu = $(".arrow-main-menu-m");
                                for (var i = 0; i < arrowMainMenu.length; i++) {
                                    $(arrowMainMenu[i]).on("click", function () {
                                        $(this).parent().find(".sub-menu-m").slideToggle();
                                        $(this).toggleClass("turn-arrow-main-menu-m");
                                    });
                                }
                                $(window).resize(function () {
                                    if ($(window).width() >= 992) {
                                        if ($(".menu-mobile").css("display") == "block") {
                                            $(".menu-mobile").css("display", "none");
                                            $(".btn-show-menu-mobile").toggleClass("is-active");
                                        }
                                        $(".sub-menu-m").each(function () {
                                            if ($(this).css("display") == "block") {
                                                $(this).css("display", "none");
                                                $(arrowMainMenu).removeClass("turn-arrow-main-menu-m");
                                            }
                                        });
                                    }
                                });
                            }
                            function hideModalSearch() {
                                $(".js-show-modal-search").on("click", function () {
                                    $(".modal-search-header").addClass("show-modal-search");
                                    $(this).css("opacity", "0");
                                });
                                $(".js-hide-modal-search").on("click", function () {
                                    $(".modal-search-header").removeClass("show-modal-search");
                                    $(".js-show-modal-search").css("opacity", "1");
                                });
                                $(".container-search-header").on("click", function (e) {
                                    e.stopPropagation();
                                });
                            }
                            function showCart() {
                                $(".js-show-cart").on("click", function () {
                                    $(".js-panel-cart").addClass("show-header-cart");
                                });
                                $(".js-hide-cart").on("click", function () {
                                    $(".js-panel-cart").removeClass("show-header-cart");
                                });
                            }
                            function showSlider() {
                                $(".js-show-sidebar").on("click", function () {
                                    $(".js-sidebar").addClass("show-sidebar");
                                });
                                $(".js-hide-sidebar").on("click", function () {
                                    $(".js-sidebar").removeClass("show-sidebar");
                                });
                            }
                            FixedHeader();
                            MenuMobile();
                            hideModalSearch();
                            showSlider();
                            showCart();
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
