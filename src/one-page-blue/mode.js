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
              class="${first ? "nav-link" : ""} scrollto"
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
    <div class="container d-flex align-items-center justify-content-between">
      <div class="logo d-flex align-items-center" onclick="${event(() => glitter.location.reload())}" style="cursor:pointer">
              <img src="${d.nav.logo}" alt="" class="img-fluid me-3" />
              <h1 style="width:12rem"><a>${d.nav.title}</a></h1>
            </div>

      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          ${glitter.print(function () {
            var tmp = "";
            d.nav.bar.map((r) => (tmp += recursive(r, 1)));
            return tmp;
          })}
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

      <div class="header-social-links d-flex align-items-center">
      ${glitter.print(function () {
        var tmp = "";
        d.nav.link.map((k) => {
          tmp += /*html*/ `<a class="facebbok" onclick="${event(() => funnel.hyperLink(k))}" style="cursor:pointer"
            ><i class="${funnel.urlIcon(k, "bi")}"></i
          ></a>`;
        });
        return tmp;
      })}
      </div>

    </div>
  </header><!-- End Header -->`;
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
                            <a onclick="${event(() => funnel.hyperLink(r))}" style="cursor:pointer">
                              <i class="${funnel.urlIcon(r, "bi")}"></i>
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
      <div class="copyright">${funnel.copyRight("#009cea")}</div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/scaffold-bootstrap-metro-style-template/ -->
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>`;
    }
    function error404() {
      return /*html*/ `<h1 style="margin:24px">404 Not Found</h1>`;
    }
    function keyVision() {
      return /*html*/ ` 
      <section id="hero">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center" data-aos="fade-up">
          <div>
            <h1>${d.keyVision.title}</h1>
            <h2>${d.keyVision.desc}</h2>
            <a class="btn-get-started scrollto" 
            onclick="${event(() => funnel.hyperLink(d.keyVision.btn.link))}" style="cursor:pointer">${d.keyVision.btn.name}</a>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left">
          <img src="${d.keyVision.img}" class="img-fluid" alt="">
        </div>
      </div>
    </div>
  </section><!-- End Hero -->`;
    }
    function about() {
      return /*html*/ `
        <!-- ======= About Section ======= -->
        <section id="about" class="about">
          <div class="container">
            <div class="row">
              <div class="col-lg-6" data-aos="zoom-in">
                <img src="${d.about.img}" class="img-fluid" alt="" />
              </div>
              <div class="col-lg-6 d-flex flex-column justify-contents-center" data-aos="fade-left">
                <div class="content pt-4 pt-lg-0">
                  <h3>${d.about.title}</h3>
                  <div class="px-3">${d.about.desc}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End About Section -->
      `;
    }
    function client() {
      return /*html*/ `
        <!-- ======= Clients Section ======= -->
        <section id="clients" class="clients">
          <div class="container" data-aos="zoom-out">
                  <div class="section-title" data-aos="fade-up">
          <h2>${d.client.title}</h2>
          <p>${d.client.desc}</p>
        </div>
            <div class="row no-gutters clients-wrap clearfix wow fadeInUp">
              ${glitter.print(function () {
                var tmp = "";
                d.client.list.map((c) => {
                  tmp += /*html*/ `
                  <div class="col-lg-3 col-md-4 col-xs-6">
            <div class="client-logo" data-aos="zoom-in">
              <img src="${c}" class="img-fluid" alt="">
            </div>
          </div>`;
                });
                return tmp;
              })}
            </div>
          </div>
        </section>
        <!-- End Clients Section -->
      `;
    }
    function feature() {
      return /*html*/ `
      
    <!-- ======= Features Section ======= -->
    <section id="features" class="features">
      <div class="container">

        <div class="row">
          <div class="col-lg-6 mt-2 mb-tg-0 order-2 order-lg-1">
            <ul class="nav nav-tabs flex-column">
              ${glitter.print(function () {
                var tmp = "";
                d.feature.map((f, i) => {
                  tmp += /*html*/ `<li class="nav-item" data-aos="fade-up">
                    <a class="nav-link ${i == 0 ? `active show` : ``}" data-bs-toggle="tab" href="#tab-${i}">
                      <div class="row">
                        <div class="col-2 text-center fs-2">
                          <span><i class="${f.icon.name}" style="color:${f.icon.color}"></i></span>
                        </div>
                        <div class="col-10">
                          <h4>${f.tab}</h4>
                          <p>${f.title}</p>
                        </div>
                      </div>
                    </a>
                  </li>`;
                });
                return tmp;
              })}
            </ul>
          </div>
          <div class="col-lg-6 order-1 order-lg-2" data-aos="zoom-in">
            <div class="tab-content">
            ${glitter.print(function () {
              var tmp = "";
              d.feature.map((f, i) => {
                tmp += /*html*/ `
                  <div class="tab-pane ${i == 0 ? `active show` : ``}" id="tab-${i}">
                    <figure>
                      <img src="${f.img}" alt="" class="img-fluid" />
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
    </section><!-- End Features Section -->
      `;
    }
    function service() {
      return /*html*/ `
        <!-- ======= Services Section ======= -->
        <section id="services" class="services section-bg">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.service.title}</h2>
              <p>${d.service.desc}</p>
            </div>

            <div class="row">
            ${glitter.print(function () {
              var tmp = "";
              d.service.list.map((l) => {
                tmp += /*html*/ `
                  <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-3" data-aos="zoom-in">
                    <div class="icon-box icon-box-pink">
                      <div class="icon mb-3"><i class="${l.icon.name}" style="color:${l.icon.color}"></i></div>
                      <h4 class="title"><a href="">${l.title}</a></h4>
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
    function test() {
      return /*html*/ `
        <!-- ======= Testimonials Section ======= -->
        <section id="test" class="testimonials">
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
    function price() {
      return /*html*/ ` <!-- ======= Pricing Section ======= -->
        <section id="price" class="pricing section-bg">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.price.title}</h2>
              <p>${d.price.desc}</p>
            </div>

            <div class="row d-flex justify-content-center">
              ${glitter.print(function () {
                var tmp = "";
                d.price.list.map((l) => {
                  tmp += /*html*/ `
                    <div class="col-lg-3 col-md-6 mt-4 mt-md-0">
                      <div class="box ${l.highlight ? `featured` : ``}" data-aos="zoom-in" data-aos-delay="100">
                        <h3>${l.title}</h3>
                        <h4><sup>$</sup>${funnel.addQuantile(l.price.num)}<span> / ${l.price.unit}</span></h4>
                        <ul>
                          ${glitter.print(function () {
                            var tmp = "";
                            l.detail.map((t) => {
                              var li = t.not ? `<li class="na">` : `<li>`;
                              tmp += /*html*/ ` ${li}</i> <span>${t.text}</span></li> `;
                            });
                            return tmp;
                          })}
                        </ul>
                        <div class="btn-wrap">
                          <a class="btn-buy" onclick="${event(() => funnel.hyperLink(l.btn.link))}" style="cursor:pointer">${l.btn.name}</a>
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
        <!-- End Pricing Section -->`;
    }
    function faq() {
      return /*html*/ ` <!-- ======= F.A.Q Section ======= -->
        <section id="faq" class="faq">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.faq.title}</h2>
            </div>

            <ul class="faq-list">
            ${glitter.print(function () {
              var tmp = "";
              d.faq.list.map((l, i) => {
                tmp += /*html*/ `
                  <li>
                    <div data-bs-toggle="collapse" class="collapsed question" href="#faq${i}">
                      ${l.q} <i class="bi bi-chevron-down icon-show"></i><i class="bi bi-chevron-up icon-close"></i>
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
        <!-- End Frequently Asked Questions Section -->`;
    }
    function project() {
      return /*html*/ `
        <!-- ======= Portfolio Section ======= -->
        <section id="project" class="portfolio">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.project.title}</h2>
              <p>${d.project.desc}</p>
            </div>

            <div class="row">
              <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
                <ul id="portfolio-flters">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.project.tag.map((t, i) => {
                      tmp += /*html*/ ` <li data-filter="${t.className}" ${i == 0 ? `class="filter-active"` : ``}>${t.title}</li> `;
                    });
                    return tmp;
                  })}
                </ul>
              </div>
            </div>

            <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
            ${glitter.print(function () {
              var tmp = "";
              d.project.list.map((l) => {
                var tagClass = "";
                l.tag.map((m) => (tagClass += `${m} `));
                tmp += /*html*/ `

                    <div class="col-lg-4 col-md-6 portfolio-item border-0 ${tagClass}">
                <div class="portfolio-wrap">
                  <img src="${l.img}" class="img-fluid" alt="" />
                  <div class="portfolio-info">
                    <h4>${l.title}</h4>
                    <p>${l.desc}</p>
                  </div>
                  <div class="portfolio-links">
                    <a href="${l.img}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${l.title}"
                      ><i class="bx bx-plus"></i
                    ></a>
                    <a title="More Details" onclick="${event(() =>
                      funnel.hyperLink("#")
                    )}" style="cursor:pointer"><i class="bx bx-link"></i></a>
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
      var ttt = /*html*/ ` <!-- ======= Team Section ======= -->
        <section id="team" class="team">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>Team</h2>
              <p>
                Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit.
                Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem
                hic quas.
              </p>
            </div>

            <div class="row">
              <div class="col-lg-4 col-md-6">
                <div class="member" data-aos="zoom-in">
                  <div class="pic"><img src="assets/img/team/team-1.jpg" class="img-fluid" alt="" /></div>
                  <div class="member-info">
                    <h4>Walter White</h4>
                    <span>Chief Executive Officer</span>
                    <div class="social">
                      <a href=""><i class="bi bi-twitter"></i></a>
                      <a href=""><i class="bi bi-facebook"></i></a>
                      <a href=""><i class="bi bi-instagram"></i></a>
                      <a href=""><i class="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6">
                <div class="member" data-aos="zoom-in" data-aos-delay="100">
                  <div class="pic"><img src="assets/img/team/team-2.jpg" class="img-fluid" alt="" /></div>
                  <div class="member-info">
                    <h4>Sarah Jhonson</h4>
                    <span>Product Manager</span>
                    <div class="social">
                      <a href=""><i class="bi bi-twitter"></i></a>
                      <a href=""><i class="bi bi-facebook"></i></a>
                      <a href=""><i class="bi bi-instagram"></i></a>
                      <a href=""><i class="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6">
                <div class="member" data-aos="zoom-in" data-aos-delay="200">
                  <div class="pic"><img src="assets/img/team/team-3.jpg" class="img-fluid" alt="" /></div>
                  <div class="member-info">
                    <h4>William Anderson</h4>
                    <span>CTO</span>
                    <div class="social">
                      <a href=""><i class="bi bi-twitter"></i></a>
                      <a href=""><i class="bi bi-facebook"></i></a>
                      <a href=""><i class="bi bi-instagram"></i></a>
                      <a href=""><i class="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End Team Section -->`;
        return /*html*/ `
        <!-- ======= Team Section ======= -->
        <section id="team" class="team">
          <div class="container">
            <div class="section-title" data-aos="fade-up">
              <h2>${d.team.title}</h2>
              <p>${d.team.desc}</p>
            </div>

            <div class="row gy-5">
            ${glitter.print(function () {
              var tmp = "";
              d.team.list.map((l, i) => {
                tmp += /*html*/ `
                <div class="col-lg-4 col-md-6" data-aos-delay="${200 * (i + 1)}">
                <div class="member" data-aos="zoom-in">
                  <div class="pic"><img src="${l.img}" class="img-fluid" alt="" /></div>
                  <div class="member-info">
                    <h4>${l.name}</h4>
                    <span>${l.pro}</span>
                    <div class="social">
                    ${glitter.print(function () {
                      var tmp = "";
                      l.link.map((k) => {
                        tmp += /*html*/ ` <a onclick="${event(() =>
                          funnel.hyperLink(k)
                        )}" style="cursor:pointer"><i class="${funnel.urlIcon(k, "bi")}"></i></a>`;
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
    function contact() {
      return /*html*/ `
        <!-- ======= Contact Section ======= -->
        <section id="contact" class="contact">

          <div class="section-title" data-aos="fade-up">
              <h2>${d.contact.title}</h2>
              <p>${d.contact.desc}</p>
        </div>

          <div class="container">
            <div class="row gy-5 gx-lg-5">
              <div class="col-lg-4">
                <div class="info">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.contact.info.map((f) => {
                      tmp += /*html*/ ` <div class="info-item d-flex">
                          <div>
                          <i class="${f.icon} flex-shrink-0"></i>
                            <h4>${f.title}</h4>
                            <p>${f.text}</p>
                          </div>
                        </div>
                        <!-- End Info Item -->`;
                    });
                    return tmp;
                  })}
                  <iframe src="${d.contact.map}" frameborder="0" style="border:0; width: 100%; height: 290px;" allowfullscreen></iframe>
                </div>
              </div>

              <div class="col-lg-8">
                ${funnel.lightForm(d.contact.form, {
                  div: `class="php-email-form"`,
                  input: `class="form-control"`,
                  textarea: `class="form-control"`,
                  btn: `type="submit"`,
                })}
              </div>
              <!-- End Contact Form -->
            </div>
          </div>
        </section>
        <!-- End Contact Section -->
      `;
    }
    function action() {
      return /*html*/ `
        <!-- ======= Cta Section ======= -->
        <section id="cta" class="cta"
        style="background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${d.action.img}) center center;">
          <div class="container">
            <div class="row" data-aos="zoom-in">
              <div class="col-lg-9 text-center text-lg-start">
                <h3>${d.action.title}</h3>
                <p>${d.action.desc}</p>
              </div>
              <div class="col-lg-3 cta-btn-container text-center">
                <a class="cta-btn align-middle" 
                onclick="${event(() => funnel.hyperLink(d.action.btn.link))}" style="cursor:pointer">${d.action.btn.name}</a>
              </div>
            </div>
          </div>
        </section>
        <!-- End Cta Section -->
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
