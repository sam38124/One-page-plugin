class Mode {
  constructor(p, d, k) {
    var event = window.event;
    ["base", "nav", "footer"].map((n) => (d[n] = glitter.api.getData([n])[n]));

    function recursive(r, first) {
      var h = "";
      if (r.list === undefined) {
        h += /*html*/ `<li>
          <a class="nav-link" onclick="${event(() => funnel.hyperLink(r.link, false, { name: r.name }))}" style="cursor:pointer"
            >${r.name}</a
          >
        </li>`;
      } else {
        h += /*html*/ `<li class="dropdown">
          <a class="nav-link">
            <span>${r.name}</span>
            <i class="bi bi-chevron-down"></i>
          </a>
          <ul>
            ${glitter.print(function () {
              var tmp = "";
              r.list.map((r2) => (tmp += recursive(r2)));
              return tmp;
            })}
          </ul>
        </li>`;
      }
      return h;
    }

    /* ================ HTML ================ */
    function nav() {
      return /*html*/ ` <!-- ======= Header ======= -->
        <header id="header" class="fixed-top d-flex align-items-center">
          <div class="container d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center logo" onclick="${event(() => glitter.location.reload())}" style="cursor:pointer">
              <img src="${d.nav.logo}" alt="logo" class="img-fluid me-3" />
              <h1><a>${d.nav.title}</a></h1>
            </div>

            <nav id="navbar" class="navbar">
              <ul>
                ${glitter.print(function () {
                  var tmp = "";
                  d.nav.bar.map((b) => (tmp += recursive(b, true)));
                  return tmp;
                })}
                ${
                  d.nav.btn
                    ? /*html*/ `<li>
                      <a class="getstarted scrollto" onclick="${event(() => funnel.hyperLink(d.nav.btn.link))}" style="cursor:pointer"
                        >${d.nav.btn.name}</a
                      >
                    </li>`
                    : ``
                }
              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
            <!-- .navbar -->
          </div>
        </header>
        <!-- End Header -->`;
    }
    function footer() {
      return /*html*/ ` <!-- ======= Footer ======= -->
        <footer id="footer">
          <div class="footer-newsletter">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-6">
                  <h4>${glitter.share.language.subscribe}</h4>
                  <p>${d.footer.subs.desc}</p>
                  <form><input type="email" name="email" /><input type="submit" value="${glitter.share.language.submit}" /></form>
                </div>
              </div>
            </div>
          </div>

          <div class="footer-top">
            <div class="container">
              <div class="row">
                <div class="col-lg-3 col-md-6 footer-contact">
                  <h3>${d.footer.info.title}</h3>
                  ${glitter.print(function () {
                    var tmp = "";
                    d.footer.info.list.map((f) => {
                      tmp += /*html*/ ` <i class="${f.icon} fs-5 m-2"></i> <a>${f.title}</a><br /> `;
                    });
                    return tmp;
                  })}
                </div>

                ${glitter.print(function () {
                  var tmp = "";
                  d.footer.map.map((m) => {
                    tmp += /*html*/ `
                      <div class="col-lg-3 col-md-6 footer-links">
                        <h4>${m.title}</h4>
                        <ul>
                          ${glitter.print(function () {
                            var tmp = "";
                            m.list.map((l) => {
                              tmp += /*html*/ `<li>
                                <i class="bx bx-chevron-right"></i>
                                <a onclick="${event(() => funnel.hyperLink(l.link))}" style="cursor:pointer"> ${l.name}</a>
                              </li>`;
                            });
                            return tmp;
                          })}
                        </ul>
                      </div>
                    `;
                  });
                  return tmp;
                })}

                <div class="col-lg-3 col-md-6 footer-links">
                  <h4>${d.footer.outro.title}</h4>
                  <p>${d.footer.outro.desc}</p>
                  <div class="social-links mt-3">
                    ${glitter.print(function () {
                      var tmp = "";
                      d.footer.outro.social.map((r) => {
                        tmp += /*html*/ `
                          <a class="text-white" onclick="${event(() => funnel.hyperLink(r))}" style="cursor:pointer">
                            <i class="${funnel.urlIcon(r, "bx")}"></i>
                          </a>
                        `;
                      });
                      return tmp;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container mt-5 py-4">
            <div class="copyright">${funnel.copyRight("#cc1616")}</div>
            <div class="credits">
              <!-- All the links in the footer should remain intact. -->
              <!-- You can delete the links only if you purchased the pro version. -->
              <!-- Licensing information: https://bootstrapmade.com/license/ -->
              <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/ninestars-free-bootstrap-3-theme-for-creative/ -->
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>
        <!-- End Footer -->

        <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>`;
    }
    function error404() {
      return /*html*/ `<h1 style="margin:24px">404 Not Found</h1>`;
    }
    function keyVision() {
      return /*html*/ ` <!-- ======= Hero Section ======= -->
        <section id="hero" class="d-flex align-items-center mb-0">
          <div class="container mt-5">
            <div class="row gy-4">
              <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1>${d.keyVision.title}</h1>
                <h2>${d.keyVision.desc}</h2>
                <div>
                  <a
                    class="btn-get-started scrollto"
                    onclick="${event(() => funnel.hyperLink(d.keyVision.btn.link))}"
                    style="cursor:pointer"
                  >
                    ${d.keyVision.btn.name}</a
                  >
                </div>
              </div>
              <div class="col-lg-6 order-1 order-lg-2 hero-img">
                <img src="${d.keyVision.img}" class="img-fluid animated" alt="" />
              </div>
            </div>
          </div>
        </section>
        <!-- End Hero -->`;
    }
    function about() {
      return /*html*/ `
        <!-- ======= About Section ======= -->
        <section id="about" class="about">
          <div class="container mt-5">
            <div class="row justify-content-between">
              <div class="col-lg-5 d-flex align-items-center justify-content-center about-img">
                <img src="${d.about.img}" class="img-fluid" alt="" data-aos="zoom-in" />
              </div>
              <div class="col-lg-6 pt-5 pt-lg-0">
                <h3 data-aos="fade-up">${d.about.title}</h3>
                <p data-aos="fade-up" data-aos-delay="100">${d.about.desc}</p>
                <div class="row">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.about.list.map((l, i) => {
                      tmp += /*html*/ `
                        <div class="col-md-6" data-aos="fade-up" data-aos-delay="${100 * i}">
                          <i class="${l.icon}"></i>
                          <h4>${l.title}</h4>
                          <p>${l.desc}</p>
                        </div>
                      `;
                    });
                    return tmp;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End About Section -->
      `;
    }
    function service() {
      return /*html*/ `
        <!-- ======= Services Section ======= -->
        <section id="service" class="services section-bg">
          <div class="container mt-5" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.service.title}</h2>
              <p>${d.service.desc}</p>
            </div>

            <div class="row">
              ${glitter.print(function () {
                var tmp = "";
                d.service.list.map((l, i) => {
                  tmp += /*html*/ `
                    <div
                      class="col-md-6 col-lg-3 d-flex align-items-stretch justify-content-center"
                      data-aos="zoom-in"
                      data-aos-delay="${100 * i}"
                    >
                      <div class="icon-box" onclick="${event(() => funnel.hyperLink(l.link))}" style="cursor:pointer">
                        <div class="icon"><i class="${l.icon}"></i></div>
                        <h4 class="title">
                          <a> ${l.title} </a>
                        </h4>
                        <p class="description">${l.desc}</p>
                      </div>
                    </div>
                  `;
                });
                return tmp;
              })}
            </div>
          </div>
        </section>
        <!-- End Services Section -->
      `;
    }
    function project() {
      return /*html*/ `
        <!-- ======= Portfolio Section ======= -->
        <section id="project" class="portfolio">
          <div class="container mt-5" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.project.title}</h2>
              <p>${d.project.desc}</p>
            </div>

            <div class="row" data-aos="fade-up" data-aos-delay="100">
              <div class="col-lg-12">
                <ul id="portfolio-flters">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.project.tagList.map((t, i) => {
                      tmp += /*html*/ `<li data-filter="${t.className}" ${i == 0 ? `class="filter-active"` : ``}>${t.title}</li>`;
                    });
                    return tmp;
                  })}
                </ul>
              </div>
            </div>

            <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
              ${glitter.print(function () {
                var tmp = "";
                d.project.list.map((p) => {
                  var tagClass = "";
                  p.tag.map((a) => (tagClass += `${a} `));
                  tmp += /*html*/ `
                    <div class="col-lg-4 col-md-6 portfolio-item border-0 ${tagClass}">
                      <div class="portfolio-wrap">
                        <img src="${p.img}" class="img-fluid" alt="" />
                        <div class="portfolio-links">
                          <a href="${p.img}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${p.title}"
                            ><i class="bi bi-plus"></i
                          ></a>
                          <a
                            class="details-link"
                            title="More Details"
                            style="cursor:pointer"
                            onclick="${event(() => funnel.hyperLink(p.link))}"
                            ><i class="bi bi-link"></i
                          ></a>
                        </div>
                        <div class="portfolio-info">
                          <h4>${p.title}</h4>
                          <p>${p.desc}</p>
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
        <!-- End Portfolio Section -->
      `;
    }
    function faq() {
      return /*html*/ `
        <!-- ======= F.A.Q Section ======= -->
        <section id="faq" class="faq section-bg">
          <div class="container mt-5" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.faq.title}</h2>
              <p>${d.faq.desc}</p>
            </div>

            <ul class="faq-list" data-aos="fade-up" data-aos-delay="100">
              ${glitter.print(function () {
                var tmp = "";
                d.faq.list.map((l, i) => {
                  tmp += /*html*/ `
                    <li>
                      <div data-bs-toggle="collapse" href="#faq${i}" class="collapsed question">
                        ${l.q}<i class="bi bi-chevron-down icon-show"></i><i class="bi bi-chevron-up icon-close"></i>
                      </div>
                      <div id="faq${i}" class="collapse" data-bs-parent=".faq-list">
                        <p>${l.a}</p>
                      </div>
                    </li>
                  `;
                });
                return tmp;
              })}
            </ul>
          </div>
        </section>
        <!-- End F.A.Q Section -->
      `;
    }
    function team() {
      return /*html*/ `
        <!-- ======= Team Section ======= -->
        <section id="team" class="team">
          <div class="container mt-5">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.team.title}</h2>
              <p>${d.team.desc}</p>
            </div>

            <div class="row">
              ${glitter.print(function () {
                var tmp = "";
                d.team.list.map((l, i) => {
                  tmp += /*html*/ `
                    <div class="col-xl-3 col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="${100 * i}">
                      <div class="member">
                        <img src="${l.img}" class="img-fluid" alt="" />
                        <div class="member-info">
                          <div class="member-info-content">
                            <h4>${l.name}</h4>
                            <span>${l.pro}</span>
                          </div>
                          <div class="social">
                            ${glitter.print(function () {
                              var tmp = "";
                              l.link.map((k) => {
                                tmp += /*html*/ `
                                  <a onclick="${event(() => funnel.hyperLink(k))}" style="cursor:pointer"
                                    ><i class="${funnel.urlIcon(k, "bi")}"></i
                                  ></a>
                                `;
                              });
                              return tmp;
                            })}
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
        <!-- End Team Section -->
      `;
    }
    function client() {
      return /*html*/ `
        <!-- ======= Clients Section ======= -->
        <section id="client" class="clients section-bg">
          <div class="container mt-5" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.client.title}</h2>
              <p>${d.client.desc}</p>
            </div>

            <div class="clients-slider swiper" data-aos="fade-up" data-aos-delay="100">
              <div class="swiper-wrapper align-items-center">
                ${glitter.print(function () {
                  var tmp = "";
                  d.client.list.map((t) => {
                    tmp += /*html*/ ` <div class="swiper-slide"><img src="${t}" class="img-fluid" alt="" /></div> `;
                  });
                  return tmp;
                })}
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </section>
        <!-- End Clients Section -->
      `;
    }
    function contact() {
      return /*html*/ `
        <!-- ======= Contact Us Section ======= -->
        <section id="contact" class="contact">
          <div class="container mt-5" data-aos="fade-up">
            <div class="section-title">
              <h2>${d.contact.title}</h2>
              <p>${d.contact.desc}</p>
            </div>

            <div class="row">
              <div class="col-lg-5 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                <div class="info">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.contact.info.map((f) => {
                      tmp += /*html*/ `
                        <div>
                          <div class="info-box mb-4">
                            <i class="${f.icon}"></i>
                            <h4>${f.title}</h4>
                            <p>${f.text}</p>
                          </div>
                        </div>
                      `;
                    });
                    return tmp;
                  })}

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
                    frameborder="0"
                    style="border: 0; width: 100%; height: 290px"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>

              <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                ${funnel.lightForm(d.contact.form, {
                  div: `class="php-email-form"`,
                  input: `class="form-control"`,
                  textarea: `class="form-control"`,
                  btn: `type="submit"`,
                })}
              </div>
            </div>
          </div>
        </section>
        <!-- End Contact Us Section -->
      `;
    }

    /* ================ Frame ================ */
    function frameRender(page, debug) {
      var h = "";
      var err = false;
      page.map((a) => {
        if (debug) {
          h += eval(a + "()");
        } else {
          try {
            h += eval(a + "()");
          } catch (e) {
            err = true;
          }
        }
      });
      err && (h = error404());
      return h;
    }
    this.frame = () => nav() + `<main id="main">` + frameRender(p, 1) + `</main>` + footer();
  }
}
