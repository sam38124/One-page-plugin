class Greenhost {
  constructor(p, d) {
    var event = window.event;
    ["base", "nav", "footer"].map((n) => (d[n] = glitter.api.getData([n])[n]));

    function nav() {
      return /*html*/ `
        <!-- Spinner Start -->
        <div
          id="spinner"
          class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
        >
          <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">${glitter.share.language.loading}...</span>
          </div>
        </div>
        <!-- Spinner End -->

        <!-- Navbar & Hero Start -->
        <div class="container-xxl position-relative p-0">
          <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <a class="navbar-brand p-0" onclick="${event(() => glitter.location.reload())}" style="cursor:pointer">
              <h1 class="m-0 fs-3"><img src="${d.nav.logo}" class="me-3" />${d.nav.title}</h1>
              <!-- <img src="img/logo.png" alt="Logo"> -->
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span class="fa fa-bars"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav ms-auto py-0">
                ${glitter.print(function () {
                  var tmp = "";
                  d.nav.bar.map((n) => {
                    if (n.list === undefined) {
                      tmp += /*html*/ `<a class="nav-item nav-link" onclick="${event(() => funnel.hyperLink(n.link))}">${n.name}</a>`;
                    } else {
                      tmp += /*html*/ `
                        <div class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">${n.name}</a>
                          <div class="dropdown-menu m-0">
                            ${glitter.print(function () {
                              var tmp = "";
                              n.list.map((l) => {
                                tmp += /*html*/ `
                                  <a class="dropdown-item" onclick="${event(() => funnel.hyperLink(l.link))}">${l.name}</a>
                                `;
                              });
                              return tmp;
                            })}
                          </div>
                        </div>
                      `;
                    }
                  });
                  return tmp;
                })}
              </div>
              <button type="button" class="btn text-secondary ms-3" data-bs-toggle="modal" data-bs-target="#searchModal">
                <i class="fa fa-search"></i>
              </button>
              <a href="" class="btn btn-secondary py-2 px-4 ms-3">${glitter.share.language.signIn}</a>
            </div>
          </nav>
          <div id="keyVision">
            <div class="bg-primary" style="height:6rem"></div>
          </div>
        </div>
        ${search()}
      `;
    }
    function footer() {
      return /*html*/ `
        <!-- Footer Start -->
        <div class="container-fluid bg-primary text-white footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
          <div class="container py-5 px-lg-5">
            <div class="row gy-5 gx-4 pt-5">
              <div class="col-12">
                <h5 class="fw-bold text-white mb-4">${glitter.share.language.subscribeNews}</h5>
                <div class="position-relative" style="max-width: 400px;">
                  <input
                    class="form-control bg-white border-0 w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="${glitter.share.language.emailHint}"
                  />
                  <button type="button" class="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2">
                    ${glitter.share.language.submit}
                  </button>
                </div>
              </div>
              <div class="col-lg-5 col-md-12">
                <div class="row gy-5 g-4">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.footer.map.map((m) => {
                      tmp += /*html*/ `<div class="col-md-6">
                        ${glitter.print(function () {
                          var tmp = /*html*/ `<h5 class="fw-bold text-white mb-4">${m.title}</h5>`;
                          m.list.map((l) => {
                            tmp += /*html*/ `<a class="btn btn-link" onclick="${event(() => funnel.hyperLink(l.link))}">${l.name}</a>`;
                          });
                          return tmp;
                        })}
                      </div>`;
                    });
                    return tmp;
                  })}
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <h5 class="fw-bold text-white mb-4">聯絡資訊</h5>
                ${glitter.print(function () {
                  var tmp = "";
                  d.footer.info.map((f) => {
                    tmp += /*html*/ ` <p class="mb-2"><i class="${f.icon} text-center" style="width:2.5em"></i>${f.text}</p> `;
                  });
                  return tmp;
                })}
                <div class="d-flex pt-2">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.footer.link.map((f) => {
                      tmp += /*html*/ `
                        <a class="btn btn-outline-light btn-social" onclick="${event(() => funnel.hyperLink(f))}"
                          ><i class="${funnel.urlIcon(f)}"></i
                        ></a>
                      `;
                    });
                    return tmp;
                  })}
                </div>
              </div>
              <div class="col-md-6 col-lg-4 mt-lg-n5">
                <div class="bg-light rounded" style="padding: 30px;">
                  <input type="text" class="form-control border-0 py-2 mb-2" placeholder="${glitter.share.language.fullNameHint}" />
                  <input type="email" class="form-control border-0 py-2 mb-2" placeholder="${glitter.share.language.emailHint}" />
                  <textarea class="form-control border-0 mb-2" rows="2" placeholder="${glitter.share.language.plzContent}"></textarea>
                  <button class="btn btn-primary w-100 py-2">${glitter.share.language.sendMessage}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="container px-lg-5 copyright text-center text-md-end mb-md-0">
            &copy; All Right Reserved. Designed By
            <a role="button" class="border-bottom" onclick="${event(() => funnel.hyperLink("https://squarestudio.tw"))}">Lion Design</a>
          </div>
        </div>
        <a href="#" class="btn btn-lg btn-secondary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
      `;
    }
    function search() {
      return /*html*/ `
        <!-- Full Screen Search Start -->
        <div class="modal fade" id="searchModal" tabindex="-1">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content" style="background: rgba(29, 40, 51, 0.8);">
              <div class="modal-header border-0">
                <button type="button" class="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body d-flex align-items-center justify-content-center">
                <div class="input-group" style="max-width: 600px;">
                  <input type="text" class="form-control bg-transparent border-light p-3 text-white" placeholder="輸入搜尋關鍵字" />
                  <button class="btn btn-light px-4"><i class="bi bi-search"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Full Screen Search End -->
      `;
    }
    function keyVision() {
      setTimeout(() => {
        $("#keyVision").html(/*html*/ `
          <div class="container-xxl py-5 bg-primary hero-header mb-5">
            <div class="container my-5 py-5 px-lg-5">
              <div class="row g-5">
                <div class="col-lg-6 pt-5 text-center text-lg-start">
                  <h1 class="display-4 text-white mb-4 animated slideInLeft">${d.keyVision.title}</h1>
                  <p class="text-white animated slideInLeft">${d.keyVision.desc}</p>
                  <h1 class="text-white mb-4 animated slideInLeft">
                    <small class="align-top fw-normal" style="font-size: 15px; line-height: 25px;">${d.keyVision.prod.title}：</small>
                    <span>$${funnel.addQuantile(d.keyVision.prod.price)}</span>
                    <small class="align-bottom fw-normal" style="font-size: 15px; line-height: 33px;">/ 元</small>
                  </h1>
                  <a
                    class="btn btn-secondary py-sm-3 px-sm-5 me-3 animated slideInLeft"
                    onclick="${event(() => funnel.hyperLink(d.keyVision.btn.link))}"
                    >${d.keyVision.btn.name}</a
                  >
                </div>
                <div class="col-lg-6 text-center text-lg-start">
                  <img class="img-fluid animated zoomIn" src="${d.keyVision.img}" alt="" />
                </div>
              </div>
            </div>
          </div>
        `);
      }, 100);
      return ``;
    }
    function domain() {
      return /*html*/ `
        <!-- Domain Search Start -->
        <div class="container-xxl domain mb-5" style="margin-top: 90px;">
          <div class="container px-lg-5">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div
                  class="section-title position-relative text-center mx-auto mb-4 pb-4 wow fadeInUp"
                  data-wow-delay="0.1s"
                  style="max-width: 600px;"
                >
                  <h1 class="mb-3">${d.domain.title}</h1>
                  <p class="mb-1">${d.domain.desc}</p>
                </div>
                <div class="position-relative w-100 my-3 wow fadeInUp" data-wow-delay="0.3s">
                  <input class="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="${d.domain.placeholder}" />
                  <button type="button" class="btn btn-primary py-2 px-3 position-absolute top-0 end-0 mt-2 me-2">
                    ${glitter.share.language.search}
                  </button>
                </div>
                <div class="row g-3 mt-2 wow fadeInUp" data-wow-delay="0.5s">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.domain.list.map((l) => {
                      tmp += /*html*/ `
                        <div class="col-lg-2 col-md-3 col-sm-4 col-6 text-center">
                          <h5 class="fw-bold text-primary mb-1">${l.name}</h5>
                          <p class="mb-0">${l.text}</p>
                        </div>
                      `;
                    });
                    return tmp;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Domain Search End -->
      `;
    }
    function about() {
      return /*html*/ `
        <!-- About Start -->
        <div class="container-xxl py-5">
          <div class="container px-lg-5">
            <div class="row g-5 align-items-center">
              <div class="col-lg-7 wow fadeInUp" data-wow-delay="0.1s">
                <div class="section-title position-relative mb-4 pb-4">
                  <h1 class="mb-2">${d.about.title}</h1>
                </div>
                <p class="mb-4">${d.about.desc}</p>
                <div class="row g-3">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.about.list.map((l, j) => {
                      tmp += /*html*/ `
                        <div class="col-sm-4 wow fadeIn" data-wow-delay="${0.1 + j * 0.2}s">
                          <div class="bg-light rounded text-center p-4">
                            <i class="${l.icon} fa-2x text-primary mb-2"></i>
                            <h2 class="mb-1" data-toggle="counter-up">${l.num}</h2>
                            <p class="mb-0">${l.title}</p>
                          </div>
                        </div>
                      `;
                    });
                    return tmp;
                  })}
                </div>
              </div>
              <div class="col-lg-5">
                <img class="img-fluid wow zoomIn" data-wow-delay="0.5s" src="${d.about.img}" />
              </div>
            </div>
          </div>
        </div>
        <!-- About End -->
      `;
    }
    function price() {
      return /*html*/ `
        <!-- Pricing Start -->
        <div class="container-xxl py-5">
          <div class="container px-lg-5">
            <div
              class="section-title position-relative text-center mx-auto mb-5 pb-4 wow fadeInUp"
              data-wow-delay="0.1s"
              style="max-width: 600px;"
            >
              <h1 class="mb-3">${d.price.title}</h1>
              <p class="mb-1">${d.price.desc}</p>
            </div>
            <div class="row gy-5 gx-4">
              ${glitter.print(function () {
                var tmp = "";
                d.price.list.map((l, j) => {
                  tmp += /*html*/ `
                    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${0.2 + 0.2 * j}s">
                      <div class="position-relative shadow rounded border-top border-5 border-${l.highlight ? "secondary" : "primary"}">
                        <div
                          class="d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle bg-${
                            l.highlight ? "secondary" : "primary"
                          } rounded-circle"
                          style="width: 45px; height: 45px; margin-top: -3px;"
                        >
                          <i class="fa fa-share-alt text-white"></i>
                        </div>
                        <div class="text-center border-bottom p-4 pt-5">
                          <h4 class="fw-bold">${l.title}</h4>
                          <p class="mb-0">${l.desc}</p>
                        </div>
                        <div class="text-center border-bottom p-4">
                          <!-- <p class="text-primary mb-1">Latest Offer - <strong>Save 30%</strong></p> -->
                          <h1 class="mb-3">
                            <small class="align-top" style="font-size: 22px; line-height: 45px;">$</small>${funnel.addQuantile(
                              l.price.num
                            )}<small class="align-bottom" style="font-size: 16px; line-height: 40px;">/ ${l.price.unit}</small>
                          </h1>
                          <a
                            class="btn btn-${l.highlight ? "secondary" : "primary"} px-4 py-2"
                            onclick="${event(() => funnel.hyperLink(l.btn.link))}"
                            >${l.btn.name}</a
                          >
                        </div>
                        <div class="p-4">
                          ${glitter.print(function () {
                            var tmp = "";
                            l.detail.map((t) => {
                              tmp += /*html*/ `
                                <p class="border-bottom pb-3">
                                  ${
                                    t.not
                                      ? `<i class="fa fa-times text-secondary text-center" style="width:2em"></i>`
                                      : `<i class="fa fa-check text-primary text-center" style="width:2em"></i>`
                                  }
                                  ${t.text}
                                </p>
                              `;
                            });
                            return tmp;
                          })}
                        </div>
                      </div>
                    </div>
                  `;
                });
                return tmp;
              })}
            </div>
          </div>
        </div>
        <!-- Pricing End -->
      `;
    }
    function comp() {
      return /*html*/ `
        <!-- Comparison Start -->
        <div class="container-xxl py-5">
          <div class="container px-lg-5">
            <div
              class="section-title position-relative text-center mx-auto mb-5 pb-4 wow fadeInUp"
              data-wow-delay="0.1s"
              style="max-width: 600px;"
            >
              <h1 class="mb-3">${d.comp.title}</h1>
              <p class="mb-1">${d.comp.desc}</p>
            </div>
            <div class="row g-5 comparison position-relative">
              ${glitter.print(function () {
                var tmp = "";
                d.comp.list.map((l) => {
                  tmp += /*html*/ `
                    <div class="col-lg-6 pe-lg-5">
                      <div class="section-title position-relative mx-auto mb-4 pb-4">
                        <h3 class="fw-bold mb-0">${l.name}</h3>
                      </div>
                      <div class="row gy-3 gx-5">
                        ${glitter.print(function () {
                          var tmp = "";
                          l.detail.map((t, j) => {
                            tmp += /*html*/ `
                              <div class="col-sm-6 wow fadeIn" data-wow-delay="${0.1 + 0.2 * j}s">
                                <i class="${t.icon} fa-3x mb-3" style="color:${l.color}"></i>
                                <h5 class="fw-bold">${t.title}</h5>
                                <p>${t.desc}</p>
                              </div>
                            `;
                          });
                          return tmp;
                        })}
                      </div>
                    </div>
                  `;
                });
                return tmp;
              })}
            </div>
          </div>
        </div>
        <!-- Comparison Start -->
      `;
    }
    function test() {
      return /*html*/ `
        <!-- Testimonial Start -->
        <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
          <div class="container px-lg-5">
            <div class="owl-carousel testimonial-carousel">
              ${glitter.print(function () {
                var tmp = "";
                d.test.map((t) => {
                  tmp += /*html*/ `
                    <div class="testimonial-item position-relative bg-light border-top border-5 border-primary rounded p-4 my-4">
                      <div
                        class="d-flex align-items-center justify-content-center position-absolute top-0 start-0 ms-5 translate-middle bg-primary rounded-circle"
                        style="width: 45px; height: 45px; margin-top: -3px;"
                      >
                        <i class="fa fa-quote-left text-white"></i>
                      </div>
                      <p class="mt-3">「${t.text}」</p>
                      <div class="d-flex align-items-center">
                        <img class="img-fluid flex-shrink-0 rounded-circle" src="${t.img}" style="width: 50px; height: 50px;" />
                        <div class="ps-3">
                          <h6 class="fw-bold mb-1">${t.name}</h6>
                          <small>${t.pro}</small>
                        </div>
                      </div>
                    </div>
                  `;
                });
                return tmp;
              })}
            </div>
          </div>
        </div>
        <!-- Testimonial End -->
      `;
    }
    function team() {
      return /*html*/ `
        <!-- Team Start -->
        <div class="container-xxl py-5">
          <div class="container px-lg-5">
            <div
              class="section-title position-relative text-center mx-auto mb-5 pb-4 wow fadeInUp"
              data-wow-delay="0.1s"
              style="max-width: 600px;"
            >
              <h1 class="mb-3">${d.team.title}</h1>
              <p class="mb-1">${d.team.desc}</p>
            </div>
            <div class="row g-4">
              ${glitter.print(function () {
                var tmp = "";
                d.team.list.map((l) => {
                  tmp += /*html*/ `
                    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                      <div class="team-item border-top border-5 border-primary rounded shadow overflow-hidden">
                        <div class="text-center p-4">
                          <img class="img-fluid rounded-circle mb-4" src="${l.img}" alt="" />
                          <h5 class="fw-bold mb-1">${l.name}</h5>
                          <small>${l.pro}</small>
                        </div>
                        <div class="d-flex justify-content-center bg-primary p-3">
                          ${glitter.print(function () {
                            var tmp = "";
                            l.link.map(
                              (s) =>
                                (tmp += /*html*/ `<a
                                  class="btn btn-square text-primary bg-white m-1"
                                  onclick="${event(() => funnel.hyperLink(s))}"
                                  ><i class="${funnel.urlIcon(s)}"></i
                                ></a>`)
                            );
                            return tmp;
                          })}
                        </div>
                      </div>
                    </div>
                  `;
                });
                return tmp;
              })}
            </div>
          </div>
        </div>
        <!-- Team End -->
      `;
    }

    this.frame = function () {
      var h = "";
      p.map((page) => (h += eval(page + "()")));
      return /*html*/ ` <div class="container-xxl bg-white p-0">${nav() + h + footer()}</div> `;
    };
  }
}
