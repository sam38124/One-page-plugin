class Mirko {
  constructor(p, d) {
    var event = window.event;
    ["base", "nav", "footer"].map((n) => (d[n] = glitter.api.getData([n])[n]));

    function nav() {
      return /*html*/ ` <nav id="navbar" class="navbar navbar-expand-lg fixed-top navbar-dark" aria-label="Main navigation">
        <div class="container">
          <!-- Image Logo -->
          <a class="navbar-brand logo-image" onclick="${event(() => glitter.location.reload())}" style="cursor:pointer">
            <img src="${d.nav.logo}" />
          </a>
          <a class="navbar-brand logo-text" onclick="${event(() => glitter.location.reload())}" style="cursor:pointer"> ${d.nav.title} </a>

          <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav ms-auto navbar-nav-scroll">
              ${glitter.print(function () {
                var HTML = "";
                d.nav.bar.map((b) => {
                  if (b.list === undefined) {
                    HTML += /*html*/ `
                      <li class="nav-item">
                        <a class="nav-link" aria-current="page" onclick="${event(() => funnel.hyperLink(b.link))}">${b.name}</a>
                      </li>
                    `;
                  } else {
                    HTML += /*html*/ `<li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false" href="#"
                        >${b.name}</a
                      >
                      <ul class="dropdown-menu" aria-labelledby="dropdown01">
                        ${glitter.print(function () {
                          var HTML = "";
                          b.list.map((l, index) => {
                            HTML += /*html*/ `
                              <li><a class="dropdown-item" onclick="${event(() => funnel.hyperLink(l.link))}">${l.name}</a></li>
                              ${b.list.length == index + 1 ? `` : `<li><div class="dropdown-divider"></div></li>`}
                            `;
                          });
                          return HTML;
                        })}
                      </ul>
                    </li>`;
                  }
                });
                return HTML;
              })}
            </ul>
            <span class="nav-item social-icons">
              ${glitter.print(function () {
                var HTML = "";
                d.nav.stack.map((s) => {
                  HTML += /*html*/ `
                    <span class="fa-stack">
                      <a onclick="${event(() => funnel.hyperLink(s.link))}">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class="fab ${s.icon} fa-stack-1x"></i>
                      </a>
                    </span>
                  `;
                });
                return HTML;
              })}
            </span>
          </div>
          <!-- end of navbar-collapse -->
        </div>
        <!-- end of container -->
      </nav>`;
    }
    function footer() {
      return /*html*/ `
        <section class="footer text-light">
          <div class="container">
            <div class="row" data-aos="fade-right">
              <div class="col-lg-3 py-4 py-md-5">
                <div class="d-flex align-items-center">
                  <h4>${d.footer.intro.title}</h4>
                </div>
                <p class="py-3 para-light">${d.footer.intro.desc}</p>
                <div class="d-flex">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.footer.intro.social.map((s) => {
                      tmp += /*html*/ `
                        <div class="me-3">
                          <a onclick="${event(() => funnel.hyperLink(s.link))}">
                            <i class="${s.icon} fa-2x py-2"></i>
                          </a>
                        </div>
                      `;
                    });
                    return tmp;
                  })}
                </div>
              </div>
              <!-- end of col -->

              ${glitter.print(function () {
                var tmp = "";
                if (d.footer.map) {
                  d.footer.map.map((m) => {
                    tmp += /*html*/ `
                      <div class="col-lg-3 py-4 py-md-5">
                        <div>
                          <h4 class="py-2">${m.title}</h4>
                          ${glitter.print(function () {
                            var tmp = "";
                            m.list.map((l) => {
                              tmp += /*html*/ `
                                <div class="d-flex align-items-center py-2">
                                  <i class="fas fa-caret-right"></i>
                                  <a onclick="${event(() => funnel.hyperLink(l.link))}"><p class="ms-3">${l.name}</p></a>
                                </div>
                              `;
                            });
                            return tmp;
                          })}
                        </div>
                      </div>
                    `;
                  });
                }
                return tmp;
              })}

              <div class="col-lg-3 py-4 py-md-5">
                <div class="d-flex align-items-center">
                  <h4>訂閱</h4>
                </div>
                <p class="py-3 para-light"></p>
                <div class="d-flex align-items-center">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control p-2"
                      placeholder="${glitter.share.language.emailHint}"
                      aria-label="Recipient's email"
                    />
                    <button class="btn-secondary text-light"><i class="fas fa-envelope fa-lg"></i></button>
                  </div>
                </div>
              </div>
              <!-- end of col -->
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
        <button onclick="topFunction()" id="myBtn">
          <img src="assets/images/up-arrow.png" alt="alternative" />
        </button>
      `;
    }
    function keyVision() {
      return /*html*/ `
        <section
          class="home p-xl-5 d-flex justify-content-${d.keyVision.position} align-items-center"
          id="header"
          style="background-image: url(${d.keyVision.img});"
        >
          <div class="p-xl-3 m-5" style="background-color: ${d.keyVision.rgba};">
            <div class="container text-${d.keyVision.position} text-light py-4" data-aos="fade-right">
              <h1 class="headline">${d.keyVision.headline}</h1>
              <p class="para-light py-3">${d.keyVision.desc ?? ``}</p>
              ${glitter.print(function () {
                var HTML = "";
                d.keyVision.iconline.map((i) => {
                  HTML += /*html*/ `
                    <div class="d-flex justify-content-${d.keyVision.position} align-items-center">
                      <p class="p-2"><i class="${i.icon} fa-lg"></i></p>
                      <p>${i.desc}</p>
                    </div>
                  `;
                });
                return HTML;
              })}
              <div class="my-3">
                ${
                  d.keyVision.btn
                    ? `<a class="btn" href="${d.keyVision.btn.link}" target="_blank" rel="noopener">${d.keyVision.btn.name}</a>`
                    : ``
                }
              </div>
            </div>
          </div>
          <!-- end of container -->
        </section>
      `;
    }
    function info() {
      return /*html*/ `
        <section class="information">
          <div class="container-fluid">
            <div class="row text-light">
              ${glitter.print(function () {
                var HTML = "";
                d.info.map((inf) => {
                  HTML += /*html*/ `
                    <div class="col-lg text-center p-5" data-aos="zoom-in">
                      <i class="fas ${inf.icon} fa-3x p-2"></i>
                      <h4 class="py-3">${inf.title}</h4>
                      <p class="para-light">${inf.desc}</p>
                    </div>
                  `;
                });
                return HTML;
              })}
            </div>
          </div>
        </section>
      `;
    }
    function about() {
      return /*html*/ `
        <section class="about d-flex align-items-center text-light py-5" id="about">
          <div class="container">
            <div class="row d-flex align-items-center">
              <div class="col-lg-7" data-aos="fade-right">
                <p class="mb-3">關於我們</p>
                <h1>${d.about.title}</h1>
                <p class="py-2 para-light">${d.about.desc}</p>
                <div class="my-3">
                  <a class="btn" href="${d.about.btn.link}">${d.about.btn.name}</a>
                </div>
              </div>
              <div class="col-lg-5 text-center py-4 py-sm-0" data-aos="fade-down">
                <img class="img-fluid" src="${d.about.img}" alt="about" />
              </div>
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
      `;
    }
    function services() {
      return /*html*/ `
        <section class="services d-flex align-items-center py-5" id="services">
          <div class="container text-light">
            <div class="text-center pb-4">
              <p class="mb-3">我們的服務</p>
              <h2 class="py-2">${d.services.title}</h2>
              <p class="para-light">${d.services.subTitle}</p>
            </div>
            <div class="row gy-4 py-2" data-aos="zoom-in">
              ${glitter.print(function () {
                var tmp = "";
                d.services.list.map((s) => {
                  tmp += /*html*/ `
                    <div class="col-lg-4" onclick="${event(() => funnel.hyperLink(s.link, { path: s.link, key: "id", value: s.id }))}">
                      <div class="card bg-transparent">
                        <i class="${s.icon} fa-2x"></i>
                        <h4 class="py-2">${s.title}</h4>
                        <p class="para-light">${s.desc}</p>
                      </div>
                    </div>
                  `;
                });
                return tmp;
              })}
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
      `;
    }
    function plans() {
      return /*html*/ `
        <section class="plans d-flex align-items-center py-5" id="plans">
          <div class="container text-light">
            <div class="text-center pb-4">
              <p class="mb-3">我們的定價方案</p>
              <h2 class="py-2">${d.plans.title}</h2>
              <p class="para-light">${d.plans.subTitle}</p>
            </div>
            <div class="row gy-4" data-aos="zoom-in">
              ${glitter.print(function () {
                var tmp = "";
                d.plans.list.map((p) => {
                  tmp += /*html*/ `
                    <div class="col-lg-4">
                      <div class="card bg-transparent px-4">
                        <h4 class="py-2">${p.title}</h4>
                        <p class="py-3">${p.desc}</p>
                        ${glitter.print(function () {
                          var tmp = "";
                          p.detail.map((t) => {
                            tmp += /*html*/ `
                              <div class="mt-2 block d-flex align-items-center">
                                <p class="pe-2 text-center" style="width:2em">
                                  ${
                                    t.not
                                      ? `<i class="fas fa-times fa-1x" style="color:#ff4a4a"></i>`
                                      : `<i class="fas fa-check fa-1x" style="color:#45ee81"></i>`
                                  }
                                </p>
                                <p>${t.text}</p>
                              </div>
                            `;
                          });
                          return tmp;
                        })}
                        <h4 class="py-3">${p.price}</h4>
                        <div class="my-3">
                          <a class="btn" onclick="${event(() => funnel.hyperLink(p.btn.link))}">${p.btn.name}</a>
                        </div>
                      </div>
                    </div>
                  `;
                });
                return tmp;
              })}
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
      `;
    }
    function work() {
      return /*html*/ `
        <section class="work d-flex align-items-center py-5" id="work">
          <div class="container-fluid text-light">
            <div class="row">
              <div class="col-lg-6 d-flex align-items-center" data-aos="fade-right">
                <img class="img-fluid" src="./assets/images/work.jpg" alt="work" />
              </div>
              <div class="col-lg-5 d-flex align-items-center px-4 py-3" data-aos="">
                <div class="row">
                  <div class="text-center text-lg-start py-4 pt-lg-0">
                    <p class="mb-3">我們的作品與榮譽</p>
                    <h2 class="py-2">${d.work.title}</h2>
                    <p class="para-light">${d.work.desc}</p>
                  </div>
                  <div class="container" data-aos="fade-up">
                    <div class="row g-5">
                      ${glitter.print(function () {
                        var tmp = "";
                        d.work.list.map((l) => {
                          tmp += /*html*/ `
                            <div class="col-6 text-start">
                              <i class="${l.icon} fa-2x text-start"></i>
                              <h2
                                class="purecounter"
                                data-purecounter-start="0"
                                data-purecounter-end="${l.num}"
                                data-purecounter-duration="3"
                              >
                                1
                              </h2>
                              <p>${l.title}</p>
                            </div>
                          `;
                        });
                        return tmp;
                      })}
                    </div>
                  </div>
                  <!-- end of container -->
                </div>
                <!-- end of row -->
              </div>
              <!-- end of col-lg-5 -->
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
      `;
    }
    function test() {
      return /*html*/ `
        <div class="slider-1 testimonial text-light d-flex align-items-center" id="test">
          <div class="container">
            <div class="row">
              <div class="text-center w-lg-75 m-auto pb-4">
                <p class="mb-3">客戶們的評價</p>
                <h2 class="py-2">${d.test.title}</h2>
                <p class="para-light">${d.test.desc}</p>
              </div>
            </div>
            <!-- end of row -->
            <div class="row p-2" data-aos="zoom-in">
              <div class="col-lg-12">
                <!-- Card Slider -->
                <div class="slider-container">
                  <div class="swiper-container card-slider">
                    <div class="swiper-wrapper">
                      ${glitter.print(function () {
                        var tmp = "";
                        d.test.list.map((l) => {
                          tmp += /*html*/ `
                            <!-- Slide -->
                            <div class="swiper-slide">
                              <div class="testimonial-card p-4">
                                <p>「${l.text}」</p>
                                <div class="d-flex pt-4">
                                  <div><img class="avatar" src="${l.img}" alt="testimonial" /></div>
                                  <div class="ms-3 pt-2">
                                    <h6>${l.name}</h6>
                                    <p>${l.pro}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- end of swiper-slide -->
                            <!-- end of slide -->
                          `;
                        });
                        return tmp;
                      })}
                    </div>
                    <!-- end of swiper-wrapper -->

                    <!-- Add Arrows -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <!-- end of add arrows -->
                  </div>
                  <!-- end of swiper-container -->
                </div>
                <!-- end of slider-container -->
                <!-- end of card slider -->
              </div>
              <!-- end of col -->
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </div>
      `;
    }
    function subs() {
      return /*html*/ `
        <section class="newsletter text-light py-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 text-center text-lg-start" data-aos="fade-right">
                <h4 class="py-1 mb-2">訂閱我們</h4>
                <p class="para-light">${d.subs.desc}</p>
              </div>
              <div class="col-lg-6 d-flex align-items-center" data-aos="fade-down">
                <div class="input-group my-3">
                  <input
                    type="text"
                    class="form-control p-2"
                    placeholder="${glitter.share.language.emailHint}"
                    aria-label="Recipient's email"
                  />
                  <button class="btn-secondary text-light" type="button">${glitter.share.language.subscribe}</button>
                </div>
              </div>
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
      `;
    }
    function contact() {
      return /*html*/ `
        <section class="contact d-flex align-items-center py-5" id="contact">
          <div class="container-fluid text-light">
            <div class="row">
              <div class="col-lg-6 d-flex justify-content-center justify-content-lg-end align-items-center px-lg-5" data-aos="fade-right">
                <div style="width: 90%">
                  <div class="text-center text-lg-start py-4 pt-lg-0">
                    <p class="mb-3">聯絡我們</p>
                    <h2 class="py-2">${d.contact.title}</h2>
                    <p class="para-light">${d.contact.desc}</p>
                  </div>
                  <div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group py-2">
                          <input
                            type="text"
                            class="form-control form-control-input"
                            id="exampleFormControlInput1"
                            placeholder="${glitter.share.language.fullNameHint}"
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group py-2">
                          <input
                            type="email"
                            class="form-control form-control-input"
                            id="exampleFormControlInput2"
                            placeholder="${glitter.share.language.emailHint}"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group py-1">
                      <input
                        type="number"
                        class="form-control form-control-input"
                        id="exampleFormControlInput3"
                        placeholder="${glitter.share.language.enterHint + glitter.share.language.phone}"
                      />
                    </div>
                    <div class="form-group py-2">
                      <textarea
                        class="form-control form-control-input"
                        id="exampleFormControlTextarea1"
                        rows="6"
                        placeholder="${glitter.share.language.sharePtHint}"
                      ></textarea>
                    </div>
                  </div>
                  <div class="my-3">
                    <a class="btn form-control-submit-button" href="#">${glitter.share.language.send}</a>
                  </div>
                </div>
                <!-- end of div -->
              </div>
              <!-- end of col -->
              <div class="col-lg-6 d-flex align-items-center" data-aos="fade-down">
                <img class="img-fluid d-none d-lg-block" src="${d.contact.img}" alt="contact" />
              </div>
              <!-- end of col -->
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
      `;
    }
    function location() {
      return /*html*/ `
        <section class="location text-light py-5">
          <div class="container" data-aos="zoom-in">
            <div class="row">
              ${glitter.print(function () {
                var tmp = "";
                d.location.map((c) => {
                  tmp += /*html*/ `
                    <div class="col d-flex align-items-center">
                      <div class="p-2"><i class="${c.icon} fa-3x"></i></div>
                      <div class="ms-2">
                        <h6 class="fw-bold">${c.title}</h6>
                        <p>${c.text}</p>
                      </div>
                    </div>
                  `;
                });
                return tmp;
              })}
            </div>
            <!-- end of row -->
          </div>
          <!-- end of container -->
        </section>
      `;
    }
    function article() {
      return /*html*/ `
        <header class="ex-header">
          <div class="container">
            <div class="row">
              <div class="col-xl-10 offset-xl-1">
                <h1>${d.article.title}</h1>
              </div>
            </div>
          </div>
        </header>
        ${d.article.art}
      `;
    }

    this.frame = function () {
      var h = "";
      p.map((page) => (h += eval(page + "()")));
      return nav() + h + footer();
    };
  }
}
