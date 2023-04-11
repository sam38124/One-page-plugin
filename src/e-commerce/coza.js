class Coza {
  constructor(p, d) {
    var event = window.event;
    var prod = undefined;
    ["base", "nav", "footer", "sidebar"].map((n) => (d[n] = glitter.api.getData([n])[n]));

    // Test Original HTML
    function allTest() {
      return template.home2();
    }

    // Section
    function nav() {
      function hotSpan(boo) {
        return boo ? `<span class="badge badge-pill bg-danger ml-1" style="position: relative;bottom: 4px">HOT</span>` : ``;
      }

      function routeMenu(obj) {
        return /*html*/ ` <a onclick="${event(() => funnel.hyperLink(obj.link))}" style="cursor:pointer">
          ${obj.name + hotSpan(obj.hot)}
        </a>`;
      }

      function menuShow(menu, dev) {
        var temp = "";
        menu.map((m) => {
          switch (dev) {
            case "mobile":
              if (m.list !== undefined) {
                temp += /*html*/ `<li>
                  ${routeMenu(m, dev)}
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

      return /*html*/ `
        <header class="header-v2">
          <!-- Header desktop -->
          <div class="container-menu-desktop trans-03">
            <div class="wrap-menu-desktop">
              <nav class="limiter-menu-desktop p-l-45">
                <!-- Logo desktop -->
                <a class="logo" onclick="${event(() => glitter.location.reload())}" style="cursor:pointer">
                  <img src="${d.nav.logo}" alt="IMG-LOGO" />
                </a>

                <!-- Menu desktop -->
                <div class="menu-desktop">
                  <ul class="main-menu">
                    ${menuShow(d.nav.menu)}
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
                    ${bindView({
                      bind: "cartNoti",
                      view: function () {
                        var html = "";
                        html += /*html*/ `
                          <div
                            class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart"
                            data-notify="${glitter.cartData ? glitter.cartData.length : 0}"
                          >
                            <i class="zmdi zmdi-shopping-cart"></i>
                          </div>
                        `;
                        return html;
                      },
                      onCreate: () => showCartJS(),
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
              <a onclick="${event(() => funnel.hyperLink(framePage))}" style="cursor:pointer">
                <img src="${d.nav.logo}" alt="IMG-LOGO" />
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
              ${menuShow(d.nav.menu, "mobile")}
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
        ${cart()} ${sidebar()}
      `;
    }
    function footer() {
      return /*html*/ `
        <!-- Footer -->
        <footer class="bg3 p-t-75 p-b-32">
          <div class="container">
            <div class="row">
              ${glitter.print(function () {
                var tmp = "";
                Object.keys(d.footer).map((f) => {
                  switch (f) {
                    case "map":
                      d.footer[f].map((m) => {
                        tmp += /*html*/ `
                          <div class="col-sm-6 col-lg-3 p-b-50">
                            <h4 class="stext-301 cl0 p-b-30">${m.title}</h4>
                            <ul>
                              ${glitter.print(function () {
                                var tmp = "";
                                m.list.map((l) => {
                                  tmp += /*html*/ `
                                    <li class="p-b-10">
                                      <a
                                        class="stext-107 cl7 hov-cl1 trans-04"
                                        onclick="${event(() => funnel.hyperLink(l.link))}"
                                        style="cursor:pointer"
                                      >
                                        ${l.name}
                                      </a>
                                    </li>
                                  `;
                                });
                                return tmp;
                              })}
                            </ul>
                          </div>
                        `;
                      });
                      break;
                    case "info":
                      tmp += /*html*/ `<div class="col-sm-6 col-lg-3 p-b-50">
                        <h4 class="stext-301 cl0 p-b-30">${d.footer[f].title}</h4>
                        <p class="stext-107 cl7 size-201">${d.footer[f].desc}</p>
                        <div class="p-t-27">
                          ${glitter.print(function () {
                            var tmp = "";
                            var iconList = {
                              facebook: "fa fa-facebook",
                              instagram: "fa fa-instagram",
                              pinterest: "fa fa-pinterest-p",
                              link: "fa fa-link",
                            };
                            d.footer[f].link.map((l) => {
                              tmp += /*html*/ `
                                <a
                                  class="fs-18 cl7 hov-cl1 trans-04 m-r-16 text-white"
                                  onclick="${event(() => funnel.hyperLink(l))}"
                                  style="cursor:pointer"
                                >
                                  <i class="${funnel.urlIcon(l, iconList)}"></i>
                                </a>
                              `;
                            });
                            return tmp;
                          })}
                        </div>
                      </div>`;
                      break;
                    case "news":
                      tmp += /*html*/ `<div class="col-sm-6 col-lg-3 p-b-50">
                        <h4 class="stext-301 cl0 p-b-30">${d.footer[f].title}</h4>
                        <form>
                          <div class="wrap-input1 w-full p-b-4">
                            <input
                              class="input1 bg-none plh1 stext-107 cl7"
                              type="text"
                              name="email"
                              placeholder="${glitter.share.language.emailHint}"
                            />
                            <div class="focus-input1 trans-04"></div>
                          </div>
                          <div class="p-t-18">
                            <button class="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                              ${d.footer[f].btn.name}
                            </button>
                          </div>
                        </form>
                      </div>`;
                      break;
                  }
                });
                return tmp;
              })}
            </div>

            <div class="p-t-40">
              <div class="flex-c-m flex-w p-b-18">
                ${glitter.print(function () {
                  var tmp = "";
                  var piList = {
                    paypal: "images/icons/icon-pay-01.png",
                    visa: "images/icons/icon-pay-02.png",
                    mastercard: "images/icons/icon-pay-03.png",
                    default: "images/icons/icon-pay-def.png",
                  };
                  d.footer.payment.map((p) => {
                    var card = Object.keys(piList).find((y) => y == p) ? piList[p] : piList.default;
                    tmp += /*html*/ `<a class="m-all-1"><img src="${card}" alt="ICON-PAY" /></a>`;
                  });
                  return tmp;
                })}
              </div>

              <p class="stext-107 cl6 txt-center">${funnel.copyRight()}</p>
            </div>
          </div>
        </footer>

        <!-- Back to top -->
        <div class="btn-back-to-top" id="myBtn">
          <span class="symbol-btn-back-to-top">
            <i class="zmdi zmdi-chevron-up"></i>
          </span>
        </div>
      `;
    }
    function sidebar() {
      return /*html*/ `
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
                  d.sidebar.map.map((m) => {
                    tmp += /*html*/ `
                      <li class="p-b-13">
                        <a class="stext-102 cl2 hov-cl1 trans-04" onclick="${event(() => funnel.hyperLink(m.link))}" style="cursor:pointer">
                          ${m.name}
                        </a>
                      </li>
                    `;
                  });
                  return tmp;
                })}
              </ul>

              <div class="sidebar-gallery w-full p-tb-30">
                <span class="mtext-101 cl5"> ${d.sidebar.gallery.title} </span>
                <div class="flex-w flex-sb p-t-36 gallery-lb">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.sidebar.gallery.list.map((l) => {
                      tmp += /*html*/ `
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
                <span class="mtext-101 cl5"> ${d.sidebar.article.title} </span>
                <p class="stext-108 cl6 p-t-27">${d.sidebar.article.desc}</p>
              </div>
            </div>
          </div>
        </aside>
      `;
    }
    function cart() {
      glitter.cartData === undefined && (glitter.cartData = []);
      return /*html*/ `
        <!-- Cart -->
        <div class="wrap-header-cart js-panel-cart">
          <div class="s-full js-hide-cart"></div>
          <div class="header-cart flex-col-l p-l-65 p-r-25">
            <div class="header-cart-title flex-w flex-sb-m p-b-8">
              <span class="mtext-103 cl2"> ${glitter.share.language.yourCart} </span>
              <div class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
                <i class="zmdi zmdi-close"></i>
              </div>
            </div>

            <div class="header-cart-content flex-w js-pscroll" id="cartPage">
              ${bindView({
                bind: "cartPage",
                view: function () {
                  var total = 0;
                  return /*html*/ `
                    <ul class="header-cart-wrapitem w-full">
                      ${glitter.print(function () {
                        var tmp = "";
                        glitter.cartData.map((p) => {
                          total += p.count * p.price;
                          tmp += /*html*/ `
                            <li class="header-cart-item flex-w flex-t m-b-12">
                              <div class="header-cart-item-img">
                                <img src="${p.img}" alt="IMG" />
                              </div>
                              <div class="header-cart-item-txt p-t-8">
                                <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04"> ${p.name} </a>
                                <span class="header-cart-item-info"> ${p.count} x $${funnel.addQuantile(p.price)} </span>
                              </div>
                            </li>
                          `;
                        });
                        return tmp;
                      })}
                    </ul>
                    <div class="w-full">
                      <div class="header-cart-total w-full p-tb-40">${glitter.share.language.subtotal}: $${funnel.addQuantile(total)}</div>
                      <div class="header-cart-buttons flex-w w-full">
                        <a
                          class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10 text-white"
                          onclick="${event(() => funnel.hyperLink(["checkout"]))}"
                          style="cursor:pointer"
                        >
                          View Cart
                        </a>
                        <a
                          class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10 text-white"
                          onclick="${event(() => funnel.hyperLink(framePage))}"
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
    function slider() {
      return /*html*/ `
        <section class="section-slide">
          <div class="wrap-slick1 rs1-slick1">
            <div class="slick1">
              ${glitter.print(function () {
                var tmp = "";
                d.slider.map((s) => {
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
                              onclick="${event(() => funnel.hyperLink(s.subtitle.link))}"
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
      `;
    }
    function banner() {
      return /*html*/ `
        <div class="sec-banner bg0">
          <div class="flex-w flex-c-m">
            ${glitter.print(function () {
              var tmp = "";
              d.banner.map((b) => {
                tmp += /*html*/ `
                  <div class="size-202 m-lr-auto respon4">
                    <div class="block1 wrap-pic-w">
                      <img src="${b.img}" alt="IMG-BANNER" />
                      <a
                        class="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                        onclick="${event(() => funnel.hyperLink(b.btn.link))}"
                        style="cursor:pointer"
                      >
                        <div class="block1-txt-child1 flex-col-l">
                          <span class="block1-name ltext-102 trans-04 p-b-8"> ${b.title} </span>
                          <span class="block1-info stext-102 trans-04"> ${b.subtitle} </span>
                        </div>
                        <div class="block1-txt-child2 p-b-4 trans-05">
                          <div class="block1-link stext-101 cl0 trans-09">${b.btn.name}</div>
                        </div>
                      </a>
                    </div>
                  </div>
                `;
              });
              return tmp;
            })}
          </div>
        </div>
      `;
    }
    function shop() {
      return /*html*/ `
        <div class="wrap-modal1 js-modal1 p-t-60 p-b-20">
          <div class="overlay-modal1 js-hide-modal1"></div>

          <div class="container">
            <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
              <button class="how-pos3 hov3 trans-04 js-hide-modal1">
                <img src="images/icons/icon-close.png" alt="CLOSE" />
              </button>

              <div class="row" id="quickView">
                ${bindView({
                  bind: "quickView",
                  view: () => (prod ? cozaHTML.quickView(prod) : ``),
                  onCreate: () => (quickViewJS(), addcart()),
                })}
              </div>
            </div>
          </div>
        </div>
        <section class="bg0 p-t-23 p-b-140">
          <div class="container">
            <div class="flex-w flex-sb-m p-b-52">
              <!-- Tag List -->
              <div class="flex-w flex-l-m filter-tope-group m-tb-10">
                <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter="*">所有商品</button>
                ${glitter.print(function () {
                  var tmp = "";
                  d.shop.tagList.map((t) => {
                    tmp += /*html*/ `<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".${t.tag}">
                      ${t.name}
                    </button>`;
                  });
                  return tmp;
                })}
              </div>

              <!-- Button -->
              <div class="flex-w flex-c-m m-tb-10">
                <div class="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
                  <i class="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                  <i class="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                  ${glitter.share.language.filter}
                </div>
                <div class="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
                  <i class="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                  <i class="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                  ${glitter.share.language.search}
                </div>
              </div>

              <!-- Search product -->
              <div class="dis-none panel-search w-full p-t-10 p-b-15">
                <div class="bor8 dis-flex p-l-15">
                  <button class="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                    <i class="zmdi zmdi-search"></i>
                  </button>
                  <input
                    class="mtext-107 cl2 size-114 plh2 p-r-15"
                    type="text"
                    name="search-product"
                    placeholder="${glitter.share.language.search}"
                  />
                </div>
              </div>

              <!-- Filter -->
              <div class="dis-none panel-filter w-full p-t-10">
                <div class="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                  ${glitter.print(function () {
                    var tmp = "";
                    var theTitle = {
                      sort: "排序",
                      categories: "類別",
                      color: "顏色",
                    };
                    Object.keys(d.shop.filter).map((t, i) => {
                      tmp += /*html*/ ` <div class="filter-col3 p-r-15 p-b-27">
                        <div class="mtext-102 cl2 p-b-15">${theTitle[t]}</div>
                        <ul class="filter-det fil${i}">
                          ${glitter.print(function () {
                            var tmp = "";
                            d.shop.filter[t].map((a) => (tmp += cozaHTML[t](a)));
                            return tmp;
                          })}
                        </ul>
                      </div>`;
                    });
                    return tmp;
                  })}
                </div>
              </div>
            </div>

            <!-- Product grid -->
            <div class="row isotope-grid">
              ${glitter.print(function () {
                var tmp = "";
                d.shop.product.map((p) => {
                  tmp += /*html*/ `
                    <div
                      class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${glitter.print(function () {
                        var tmp = "";
                        p.tag.map((t) => (tmp += t + ` `)), p.color.map((t) => (tmp += t.replace("#", "") + ` `));
                        return tmp;
                      })}"
                    >
                      <div class="d-none">
                        ${glitter.print(function () {
                          var tmp = "";
                          Object.keys(p).map((k) => {
                            tmp += /*html*/ typeof k === "string" ? `<a class="${k}-item">${p[k]}</a>` : ``;
                          });
                          return tmp;
                        })}
                      </div>
                      <!-- Block2 -->
                      <div class="block2">
                        <div class="block2-pic hov-img0">
                          <img src="${p.img}" alt="IMG-PRODUCT" />

                          <a
                            class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                            onclick="${event(() => {
                              (prod = p), notifyDataChange(`quickView`);
                            })}"
                          >
                            詳細介紹
                          </a>
                        </div>

                        <div class="block2-txt flex-w flex-t p-t-14">
                          <div class="block2-txt-child1 flex-col-l">
                            <a
                              class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                              onclick="${event(() => {
                                funnel.hyperLink(["product", "banner"], { path: ["shop", "product"], key: "id", value: p.id });
                              })}"
                            >
                              ${p.name}
                            </a>
                            <span class="stext-105 cl3 price-item">$${funnel.addQuantile(p.price)}</span>
                          </div>

                          <div class="block2-txt-child2 flex-r p-t-3">
                            <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                              <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                              <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
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

            <!-- Load more -->
            <div class="flex-c-m flex-w w-full p-t-45">
              <a class="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"> 更多商品 </a>
            </div>
          </div>
        </section>
      `;
    }
    function product() {
      return /*html*/ `
        <section class="sec-product-detail bg0 p-t-65 p-b-60">
          <div class="container">
            <div class="row" id="product">
              ${bindView({
                bind: "product",
                view: () => cozaHTML.quickView(d.product),
                onCreate: () => {
                  $(".js-select2").each(function () {
                    $(this).select2({
                      minimumResultsForSearch: 20,
                      dropdownParent: $(this).next(".dropDownSelect2"),
                    });
                  });
                  $(".color-select").on("click", function () {
                    $(".color-select").each(function () {
                      $(this).removeClass("color-selected bor20");
                    });
                    $(this).addClass("color-selected bor20");
                  });
                  addcart();
                },
              })}
            </div>
            <div class="bor10 m-t-50 p-t-43 p-b-40">
              <div class="tab01">
                <ul class="nav nav-tabs" role="tablist">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.product.tab.map((t, i) => {
                      tmp += /*html*/ `
                        <li class="nav-item p-b-10">
                          <a class="nav-link ${i === 0 ? `active` : ``}" data-toggle="tab" href="#tab${i}" role="tab">${t.tabName}</a>
                        </li>
                      `;
                    });
                    return tmp;
                  })}
                </ul>
                <div class="tab-content p-t-43">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.product.tab.map((t, i) => {
                      tmp += /*html*/ ` <div class="tab-pane fade ${i === 0 ? `show active` : ``}" id="tab${i}" role="tabpanel">
                        ${glitter.print(function () {
                          var cont = "";
                          switch (t.mode) {
                            case "info":
                              cont = /*html*/ `<div class="row">
                                <div class="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                  <ul class="p-lr-28 p-lr-15-sm">
                                    ${glitter.print(function () {
                                      var tmp = "";
                                      t.data.map((f) => {
                                        tmp += /*html*/ `
                                          <li class="flex-w flex-t p-b-7">
                                            <span class="stext-102 cl3 size-205"> ${f.title} </span>
                                            <span class="stext-102 cl6 size-206"> ${f.text} </span>
                                          </li>
                                        `;
                                      });
                                      return tmp;
                                    })}
                                  </ul>
                                </div>
                              </div>`;
                              break;
                            case "reviews":
                              cont = /*html*/ `
                                <div class="row">
                                  <div class="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                    <div class="p-b-30 m-lr-15-sm">
                                      ${glitter.print(function () {
                                        var tmp = "";
                                        t.data.map((r) => {
                                          tmp += /*html*/ `
                                            <div class="flex-w flex-t p-b-68">
                                              <div class="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                                                <img src="${r.img}" alt="AVATAR" />
                                              </div>

                                              <div class="size-207">
                                                <div class="flex-w flex-sb-m p-b-17">
                                                  <span class="mtext-107 cl2 p-r-20"> ${r.name} </span>

                                                  <span class="fs-18 cl11">
                                                    ${glitter.print(function () {
                                                      var tmp = "";
                                                      [...Array(5)].map((s) => {
                                                        tmp +=
                                                          r.star > 0
                                                            ? `<i class="zmdi zmdi-star"></i>`
                                                            : `<i class="zmdi zmdi-star-outline"></i>`;
                                                        r.star -= 1;
                                                      });
                                                      return tmp;
                                                    })}
                                                  </span>
                                                </div>

                                                <p class="stext-102 cl6">「${r.desc}」</p>
                                              </div>
                                            </div>
                                          `;
                                        });
                                        return tmp;
                                      })}
                                      <form class="w-full">
                                        <h5 class="mtext-108 cl2 p-b-7">${glitter.share.language.writeReview}</h5>

                                        <p class="stext-102 cl6">您的評論會與個人姓名及頭貼一併公開顯示。</p>

                                        <div class="flex-w flex-m p-t-50 p-b-23">
                                          <span class="stext-102 cl3 m-r-16"> ${glitter.share.language.yourScore} </span>

                                          <span class="wrap-rating fs-18 cl11 pointer">
                                            <i class="item-rating pointer zmdi zmdi-star-outline"></i>
                                            <i class="item-rating pointer zmdi zmdi-star-outline"></i>
                                            <i class="item-rating pointer zmdi zmdi-star-outline"></i>
                                            <i class="item-rating pointer zmdi zmdi-star-outline"></i>
                                            <i class="item-rating pointer zmdi zmdi-star-outline"></i>
                                            <input class="dis-none" type="number" name="rating" />
                                          </span>
                                        </div>

                                        <div class="row p-b-25">
                                          <div class="col-12 p-b-5">
                                            <label class="stext-102 cl3" for="review">${glitter.share.language.yourReviews}</label>
                                            <textarea
                                              class="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                                              id="review"
                                              name="review"
                                            ></textarea>
                                          </div>

                                          <div class="col-sm-6 p-b-5">
                                            <label class="stext-102 cl3" for="name">${glitter.share.language.fullName}</label>
                                            <input class="size-111 bor8 stext-102 cl2 p-lr-20" id="name" type="text" name="name" />
                                          </div>

                                          <div class="col-sm-6 p-b-5">
                                            <label class="stext-102 cl3" for="email">${glitter.share.language.email}</label>
                                            <input class="size-111 bor8 stext-102 cl2 p-lr-20" id="email" type="text" name="email" />
                                          </div>
                                        </div>

                                        <button class="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                                          ${glitter.share.language.submit}
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              `;
                              break;
                            default:
                              cont = /*html*/ `<div class="how-pos2 p-lr-15-md">
                                <p class="stext-102 cl6">${t.data}</p>
                              </div>`;
                              break;
                          }
                          return cont;
                        })}
                      </div>`;
                    });
                    return tmp;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }
    function checkout() {
      var Total = 0;
      glitter.cartData.map((m) => (Total += m.price * m.count));
      return /*html*/ `
        <form class="bg0 p-t-75 p-b-85">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 m-lr-auto m-b-50">
                <div class="m-l-25 m-r--38 m-lr-0-xl">
                  <div class="wrap-table-shopping-cart">
                    <table class="table-shopping-cart">
                      <tr class="table_head">
                        <th class="column-1">${glitter.share.language.product}</th>
                        <th class="column-2"></th>
                        <th class="column-3">${glitter.share.language.price}</th>
                        <th class="column-4">${glitter.share.language.count}</th>
                        <th class="column-5">${glitter.share.language.total}</th>
                      </tr>

                      ${glitter.print(function () {
                        var tmp = "";
                        glitter.cartData.map((c, i) => {
                          tmp += /*html*/ `
                            <tr class="table_row">
                              <td class="column-1">
                                <div class="how-itemcart1">
                                  <img src="${c.img}" alt="IMG" />
                                </div>
                              </td>
                              <td class="column-2">${c.name}</td>
                              <td class="column-3">$ ${funnel.addQuantile(c.price)}</td>
                              <td class="column-4">
                                <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                  <div
                                    class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                    onclick="${event(() => {
                                      c.count = parseInt(c.count) - 1;
                                      c.count = c.count <= 0 ? 0 : c.count;
                                      Total = 0;
                                      [`prodTotal${i}`, `total`].map((n) => notifyDataChange(n));
                                    })}"
                                  >
                                    <i class="fs-16 zmdi zmdi-minus"></i>
                                  </div>

                                  <input class="mtext-104 cl3 txt-center num-product num-product${i}" type="number" value="${c.count}" />

                                  <div
                                    class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                    onclick="${event(() => {
                                      c.count = parseInt(c.count) + 1;
                                      Total = 0;
                                      [`prodTotal${i}`, `total`].map((n) => notifyDataChange(n));
                                    })}"
                                  >
                                    <i class="fs-16 zmdi zmdi-plus"></i>
                                  </div>
                                </div>
                              </td>
                              <td class="column-5" id="prodTotal${i}">
                                ${bindView({
                                  bind: `prodTotal${i}`,
                                  view: () => {
                                    return /*html*/ ` <a class="prodTotal" data-sum="${c.price * c.count}">
                                      $ ${funnel.addQuantile(c.price * c.count)}
                                    </a>`;
                                  },
                                })}
                              </td>
                            </tr>
                          `;
                        });
                        return tmp;
                      })}
                    </table>
                  </div>
                  <div class="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                    <div class="flex-w flex-m m-r-20 m-tb-5">
                      <input
                        class="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5"
                        type="text"
                        name="coupon"
                        placeholder="${glitter.share.language.enterCoupon}"
                      />
                      <div class="flex-c-m stext-101 cl2 size-118 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-5">新增優惠碼</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
                <div class="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
                  <h4 class="mtext-109 cl2 p-b-30"></h4>
                  <div class="flex-w flex-t bor12 p-b-13">${glitter.share.language.cartTotal}</div>
                  <div class="flex-w flex-t bor12 p-t-15 p-b-30">
                    <div class="size-208">
                      <span class="stext-110 cl2"> ${glitter.share.language.subtotal}: </span>
                    </div>

                    <div class="size-209">
                      <span class="mtext-110 cl2" id="total">
                        ${bindView({
                          bind: "total",
                          view: () => {
                            $(".prodTotal").map(function () {
                              Total += $(this).data("sum");
                            });
                            return /*html*/ ` <a class="subtotal" data-sum="${Total}"> $ ${funnel.addQuantile(Total)} </a>`;
                          },
                        })}
                      </span>
                    </div>
                  </div>

                  <div class="flex-w flex-t bor12 p-t-15 p-b-30">
                    <div class="size-208 w-full-ssm">
                      <span class="stext-110 cl2"> ${glitter.share.language.shipping}: </span>
                    </div>

                    <div class="size-209 p-r-18 p-r-0-sm w-full-ssm">
                      <div class="p-t-15">
                        <div class="rs1-select2 rs2-select2 bor8 bg0 m-b-12 m-t-9" id="ship">
                          ${bindView({
                            bind: "ship",
                            view: function () {
                              var html = "";
                              html += /*html*/ `
                                <select class="js-select2" name="time">
                                  <option>預設地點...</option>
                                  <option>台中市西區中正路185號</option>
                                  <option>高雄市楠梓區創新路1號</option>
                                </select>
                                <div class="dropDownSelect2"></div>
                              `;
                              return html;
                            },
                            onCreate: () => {
                              $(".js-select2").each(function () {
                                $(this).select2({
                                  minimumResultsForSearch: 20,
                                  dropdownParent: $(this).next(".dropDownSelect2"),
                                });
                              });
                            },
                          })}
                        </div>

                        <div class="bor8 bg0 m-b-12">
                          <input class="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="state" placeholder="縣 / 市" />
                        </div>

                        <div class="bor8 bg0 m-b-22">
                          <input class="stext-111 cl8 plh3 size-111 p-lr-15" type="text" name="postcode" placeholder="地址" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex-w flex-t p-t-27 p-b-33">
                    <div class="size-208">
                      <span class="mtext-101 cl2"> ${glitter.share.language.total}: </span>
                    </div>

                    <div class="size-209 p-t-1">
                      <span class="mtext-110 cl2"> $${funnel.addQuantile(Total)} </span>
                    </div>
                  </div>
                  <button class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">送出訂單</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      `;
    }

    // Function
    function quickViewJS() {
      $(".wrap-slick3").each(function () {
        $(this)
          .find(".slick3")
          .slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 6000,

            arrows: true,
            appendArrows: $(this).find(".wrap-slick3-arrows"),
            prevArrow: '<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
            nextArrow: '<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',

            dots: true,
            appendDots: $(this).find(".wrap-slick3-dots"),
            dotsClass: "slick3-dots",
            customPaging: function (slick, index) {
              var portrait = $(slick.$slides[index]).data("thumb");
              return '<img src=" ' + portrait + ' "/><div class="slick3-dot-overlay"></div>';
            },
          });
      });

      $(".js-select2").each(function () {
        $(this).select2({
          minimumResultsForSearch: 20,
          dropdownParent: $(this).next(".dropDownSelect2"),
        });
      });

      $(".btn-num-product-down").on("click", function () {
        var numProduct = Number($(this).next().val());
        if (numProduct > 0)
          $(this)
            .next()
            .val(numProduct - 1);
      });

      $(".btn-num-product-up").on("click", function () {
        var numProduct = Number($(this).prev().val());
        $(this)
          .prev()
          .val(numProduct + 1);
      });

      $(".color-select").on("click", function () {
        $(".color-select").each(function () {
          $(this).removeClass("color-selected bor20");
        });
        $(this).addClass("color-selected bor20");
      });
    }
    function addcart() {
      $(".js-addcart-detail").each(function () {
        var nameProduct = $(this).parent().parent().parent().parent().find(".js-name-detail").html();
        $(this).on("click", function () {
          swal(nameProduct, "已加入購物車！", "success");
          var addProd = {
            id: $(".dataID").html(),
            name: nameProduct,
            img: $(".img-selected").data("img"),
            size: $(".js-select2").val(),
            color: $(".color-selected").data("tooltip"),
            count: $(".num-product").val(),
            price: $(".price-selected").data("price"),
          };
          glitter.cartData.push(addProd);
          notifyDataChange(`cartNoti`);
          notifyDataChange(`cartPage`);
        });
      });
    }
    function showCartJS() {
      $(".js-show-cart").on("click", function () {
        $(".js-panel-cart").addClass("show-header-cart");
      });

      $(".js-hide-cart").on("click", function () {
        $(".js-panel-cart").removeClass("show-header-cart");
      });
    }

    this.frame = function () {
      var h = "";
      p.map((page) => (h += eval(page + "()")));
      return p.includes("allTest") ? h : nav() + h + footer();
    };
  }
}
