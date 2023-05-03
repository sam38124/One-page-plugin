class Mode {
  constructor(p, d, k) {
    var event = window.event;
    ["base", "nav", "footer"].map((n) => (d[n] = glitter.api.getData([n])[n]));

    function recursive(r, first) {
      var h = "";
      if (r.list === undefined) {
        h += /*html*/ `
          <li>
            <a
              class="${first ? "nav-link " : ""}scrollto"
              onclick="${event(() => funnel.hyperLink(r.link, false, { name: r.name }))}"
              style="cursor:pointer"
              data-hash=${r.link}
            >
              ${r.name}
            </a>
          </li>
        `;
      } else {
        h += /*html*/ ` <li class="dropdown">
          <a class="">${r.name}<i class="bi bi-chevron-${first ? "down" : "right"}"></i></a>
          <ul class="">
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
      return /*html*/ `<!-- ======= Header ======= -->
        <header id="header" class="fixed-top d-flex align-items-center">
          <div class="container d-flex justify-content-between">
            <div class="d-flex logo" onclick="${event(() => glitter.location.reload())}" style="cursor:pointer">
              <img src="${d.nav.logo}" alt="" class="img-fluid me-3" />
              <h1 class="me-auto me-lg-0"><a>${d.nav.title}</a></h1>
            </div>

            <nav id="navbar" class="navbar">
              <ul>
                ${glitter.print(function () {
                  var tmp = "";
                  d.nav.bar.map((b) => (tmp += recursive(b, true)));
                  return tmp;
                })}
              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
            <!-- .navbar -->
          </div>
        </header>
        <!-- End Header -->`;
    }
    function footer() {
      return /*html*/ `<!-- ======= Footer ======= -->
        <footer id="footer">
          <div class="footer-top">
            <div class="container">
              <div class="row">
                <div class="col-lg-3 col-md-6">
                  <div class="footer-info">
                    <h3>${d.footer.outro.title}</h3>
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

                ${glitter.print(function () {
                  var tmp = "";
                  d.footer.map.map((m) => {
                    tmp += /*html*/ `
                      <div class="col-lg-2 col-md-6 footer-links">
                        <h4>${m.title}</h4>
                        <ul>
                          ${glitter.print(function () {
                            var tmp = "";
                            m.list.map((l) => {
                              tmp += /*html*/ `<li>
                                <i class="bx bx-chevron-right"></i>
                                <a
                                  class="scrollto"
                                  onclick="${event(() => funnel.hyperLink(l.link))}"
                                  style="cursor:pointer"
                                  data-hash=${l.link}
                                  >${l.name}</a
                                >
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

                <div class="col-lg-4 col-md-6 footer-newsletter">
                  <h4>${glitter.share.language.subscribe}</h4>
                  <p>${d.footer.subs.desc}</p>
                  <form><input type="email" name="email" /><input type="submit" value="${glitter.share.language.submit}" /></form>
                </div>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="copyright">${funnel.copyRight("#1bac91")}</div>
            <div class="credits">
              <!-- All the links in the footer should remain intact. -->
              <!-- You can delete the links only if you purchased the pro version. -->
              <!-- Licensing information: https://bootstrapmade.com/license/ -->
              <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/maxim-free-onepage-bootstrap-theme/ -->
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
      return /*html*/ `
        <!-- ======= Hero Section ======= -->
        <section
          id="hero"
          class="d-flex flex-column justify-content-center align-items-center"
          style="background: url(${d.keyVision.img}) center center"
        >
          <div class="container text-center text-md-left" data-aos="fade-up">
            <h1>${d.keyVision.title}</h1>
            <h2>${d.keyVision.desc}</h2>
            <a class="btn-get-started scrollto" onclick="${event(() => funnel.hyperLink(d.keyVision.btn.link))}" style="cursor:pointer">
              ${d.keyVision.btn.name}</a
            >
          </div>
        </section>
        <!-- End Hero -->
      `;
    }
    function about() {
      return /*html*/ `
        <!-- ======= About Section ======= -->
        <section id="about" class="about">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-7" data-aos="fade-right">
                <img src="${d.about.img}" class="img-fluid" alt="" />
              </div>
              <div class="col-xl-6 col-lg-5 pt-5 pt-lg-0">
                <h3 data-aos="fade-up">${d.about.title}</h3>
                <p data-aos="fade-up">${d.about.desc}</p>
                ${glitter.print(function () {
                  var tmp = "";
                  d.about.list.map((l, i) => {
                    tmp += /*html*/ `
                      <div class="icon-box" data-aos="fade-up" data-aos-delay="${100 * i}">
                        <i class="${l.icon}"></i>
                        <h4>${l.title}</h4>
                        <p>${l.desc}p</p>
                      </div>
                    `;
                  });
                  return tmp;
                })}
              </div>
            </div>
          </div>
        </section>
        <!-- End About Section -->
      `;
    }
    function banner() {
      return /*html*/ `
        <!-- ======= Steps Section ======= -->
        <section id="banner" class="steps section-bg px-3 border-0">
          <div class="container">
            <div class="row no-gutters">
              ${glitter.print(function () {
                var tmp = "";
                d.banner.map((l, i) => {
                  tmp += /*html*/ `
                    <div class="col-lg-4 col-md-6 content-item" data-aos="fade-in" data-aos-delay="${100 * i}">
                      <span>${l.number}</span>
                      <h4>${l.title}</h4>
                      <p>${l.desc}</p>
                    </div>
                  `;
                });
                return tmp;
              })}
            </div>
          </div>
        </section>
        <!-- End Steps Section -->
      `;
    }
    function feature() {
      return /*html*/ `
        <!-- ======= Features Section ======= -->
        <section id="feature" class="features">
          <div class="container">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-4 mb-5 mb-lg-0" data-aos="fade-right">
                <ul class="nav nav-tabs flex-column">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.feature.map((l, i) => {
                      tmp += /*html*/ `
                        <li class="nav-item">
                          <a class="nav-link ${i == 0 ? `active show` : ``}" data-bs-toggle="tab" href="#tab-${i}">
                            <h4>${l.title}</h4>
                            <p>${l.desc}</p>
                          </a>
                        </li>
                      `;
                    });
                    return tmp;
                  })}
                </ul>
              </div>
              <div class="col-lg-7 ml-auto d-flex justify-content-center" data-aos="fade-left">
                <div class="tab-content">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.feature.map((l, i) => {
                      tmp += /*html*/ `
                        <div class="tab-pane ${i == 0 ? `active show` : ``}" id="tab-${i}">
                          <figure>
                            <img src="${l.img}" alt="" class="img-fluid" />
                          </figure>
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
        <!-- End Features Section -->
      `;
    }
    function service() {
      return /*html*/ ` <!-- ======= Services Section ======= -->
        <section id="service" class="services section-bg">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.service.title}</h2>
              <p>${d.service.desc}</p>
            </div>

            <div class="row">
              ${glitter.print(function () {
                var tmp = "";
                d.service.list.map((l, i) => {
                  tmp += /*html*/ `
                    <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-3" data-aos="fade-up" data-aos-delay="${i * 100}">
                      <div class="icon-box">
                        <div class="icon" style="color:${l.icon.color}"><i class="${l.icon.name}"></i></div>
                        <h4 class="title mt-3">
                          <a onclick="${event(() => funnel.hyperLink(l.link))}" style="cursor:pointer"> ${l.title}</a>
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
        <!-- End Services Section -->`;
    }
    function test() {
      return /*html*/ `
        <!-- ======= Testimonials Section ======= -->
        <section id="testimonials" class="testimonials">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.test.title}</h2>
              <p>${d.test.desc}</p>
            </div>

            <div class="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
              <div class="swiper-wrapper">
                ${glitter.print(function () {
                  var tmp = "";
                  d.test.list.map((l) => {
                    tmp += /*html*/ `
                      <div class="swiper-slide">
                        <div class="testimonial-item">
                          <p>
                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                            ${l.text}
                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                          </p>
                          <img src="${l.img}" class="testimonial-img" alt="" />
                          <h3>${l.name}</h3>
                          <h4>${l.pro}</h4>
                        </div>
                      </div>
                      <!-- End testimonial item -->
                    `;
                  });
                  return tmp;
                })}
              </div>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </section>
        <!-- End Testimonials Section -->
      `;
    }
    function project() {
      return /*html*/ `
        <!-- ======= Portfolio Section ======= -->
        <section id="project" class="portfolio section-bg">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.project.title}</h2>
              <p>${d.project.desc}</p>
            </div>

            <div class="row" data-aos="fade-up">
              <div class="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.project.tag.map((a, i) => {
                      tmp += /*html*/ `<li data-filter="${a.className}" ${i == 0 ? `class="filter-active"` : ``}>${a.title}</li>`;
                    });
                    return tmp;
                  })}
                </ul>
              </div>
            </div>

            <div class="row portfolio-container" data-aos="fade-up">
              ${glitter.print(function () {
                var tmp = "";
                d.project.list.map((l) => {
                  var tagClass = "";
                  l.tag.map((m) => (tagClass += `${m} `));
                  tmp += /*html*/ `
                    <div class="col-lg-4 col-md-6 border-0 portfolio-item ${tagClass}">
                      <div class="portfolio-wrap">
                        <img src="${l.img}" class="img-fluid" alt="" />
                        <div class="portfolio-info">
                          <h4>${l.title}</h4>
                          <p>${l.desc}</p>
                          <div class="portfolio-links">
                            <a href="${l.img}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${l.title}"
                              ><i class="bx bx-plus"></i
                            ></a>
                            <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
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
        <!-- End Portfolio Section -->
      `;
    }
    function team() {
      return /*html*/ `
        <!-- ======= Team Section ======= -->
        <section id="team" class="team">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.team.title}</h2>
              <p>${d.team.desc}</p>
            </div>

            <div class="row">
              ${glitter.print(function () {
                var tmp = "";
                d.team.list.map((l, i) => {
                  tmp += /*html*/ `
                    <div class="col-xl-3 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${100 * i}">
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
                              l.link.map((k) => (tmp += /*html*/ `<a href=""><i class="${funnel.urlIcon(k, "bi")}"></i></a>`));
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
    function faq() {
      return /*html*/ `
        <!-- ======= F.A.Q Section ======= -->
        <section id="faq" class="faq section-bg">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.faq.title}</h2>
              <p>${d.faq.desc}</p>
            </div>

            <div class="faq-list">
              <ul>
                ${glitter.print(function () {
                  var tmp = "";
                  d.faq.list.map((l, i) => {
                    tmp += /*html*/ `
                      <li data-aos="fade-up" data-aos-delay="${i * 100}">
                        <i class="bx bx-help-circle icon-help"></i>
                        <a data-bs-toggle="collapse" data-bs-target="#faq-list-${i}" class="collapse${i == 0 ? `` : `d`}"
                          >${l.q}<i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i
                        ></a>
                        <div id="faq-list-${i}" class="collapse ${i == 0 ? `show` : ``}" data-bs-parent=".faq-list">
                          <p>${l.a}</p>
                        </div>
                      </li>
                    `;
                  });
                  return tmp;
                })}
              </ul>
            </div>
          </div>
        </section>
        <!-- End F.A.Q Section -->
      `;
    }
    function contact() {
      return /*html*/ `
        <!-- ======= Contact Section ======= -->
        <section id="contact" class="contact">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.contact.title}</h2>
              <p>${d.contact.desc}</p>
            </div>

            <div class="row no-gutters justify-content-center" data-aos="fade-up">
              <div class="col-lg-5 d-flex align-items-stretch">
                <div class="info">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.contact.info.map((f, i) => {
                      tmp += /*html*/ ` <div ${i == 0 ? `` : `class="mt-4"`}>
                          <i class="${f.icon}"></i>
                          <div>
                            <h4>${f.title}</h4>
                            <p>${f.text}</p>
                          </div>
                        </div>
                        <!-- End Info Item -->`;
                    });
                    return tmp;
                  })}
                </div>
              </div>

              <div class="col-lg-5 d-flex align-items-stretch">
                <iframe style="border: 0; width: 100%; height: 270px" src="${d.contact.map}" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>

            <div class="row mt-5 justify-content-center" data-aos="fade-up">
              <div class="col-lg-10">
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
        <!-- End Contact Section -->
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
      return err ? error404() : nav() + h + footer();
    }
    this.frame = () => frameRender(p, 1);
  }
}
