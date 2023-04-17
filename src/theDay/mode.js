class Mode {
  constructor(p, d, k) {
    var event = window.event;
    ["base", "nav", "footer"].map((n) => (d[n] = glitter.api.getData([n])[n]));

    function recursive(r, first) {
      var h = "";
      if (r.list === undefined) {
        h += /*html*/ `<li>
          <a
            class="${first && glitter.frSize({ sm: true }, false) ? "text-white" : ""}"
            onclick="${event(() => funnel.hyperLink(r.link, false, { name: r.name }))}"
            style="cursor:pointer"
            >${r.name}</a
          >
        </li>`;
      } else {
        h += /*html*/ `<li class="dropdown">
          <a>
            <span class="${first && glitter.frSize({ sm: true }, false) ? "text-white" : ""}">${r.name}</span>
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
      return /*html*/ `
        <!-- ======= Top Bar ======= -->
        <section id="topbar" class="d-flex align-items-center">
          ${
            d.nav.top
              ? /*html*/ `
              <div class="container d-flex justify-content-center justify-content-md-between">
                <div class="contact-info d-flex align-items-center">
                  <i class="bi bi-envelope-fill"></i><a href="mailto:contact@example.com">${d.nav.top.email}</a>
                  <i class="bi bi-phone-fill phone-icon"></i> ${d.nav.top.phone}
                </div>
                <div class="social-links d-none d-md-block">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.nav.top.list.map((t) => {
                      tmp += /*html*/ `<a onclick="${event(() => funnel.hyperLink(t))}" style="cursor:pointer">
                        <i class="${funnel.urlIcon(t, "bi")}"></i>
                      </a>`;
                    });
                    return tmp;
                  })}
                </div>
              </div>`
              : ``
          }
        </section>

        <!-- ======= Header ======= -->
        <header id="header" class="d-flex align-items-center">
          <div class="container d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center logo" onclick="${event(() => glitter.location.reload())}" style="cursor:pointer">
              <img src="${d.nav.logo}" alt="logo" class="img-fluid me-3" />
              <a>${d.nav.title}</a>
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
        <!-- End Header -->
      `;
    }
    function footer() {
      return /*html*/ ` <!-- ======= Footer ======= -->
        <footer id="footer">
          <div class="footer-top">
            <div class="container">
              <div class="row">
                <div class="col-lg-4 col-md-6">
                  <div class="footer-info">
                    <h3>${d.footer.info.title}</h3>
                    ${glitter.print(function () {
                      var tmp = "";
                      d.footer.info.list.map((f) => {
                        tmp += /*html*/ ` <i class="${f.icon} fs-5 m-2"></i> <a>${f.title}</a><br /> `;
                      });
                      return tmp;
                    })}
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

                <div class="col-lg-4 col-md-6 footer-newsletter">
                  <h4>${glitter.share.language.subscribe}</h4>
                  <p>${d.footer.subs.desc}</p>
                  <form><input type="email" name="email" /><input type="submit" value="${glitter.share.language.submit}" /></form>
                </div>
              </div>
            </div>
          </div>

          <div class="container">
            <div class="copyright">${funnel.copyRight("#cc1616")}</div>
            <div class="credits">
              <!-- All the links in the footer should remain intact. -->
              <!-- You can delete the links only if you purchased the pro version. -->
              <!-- Licensing information: https://bootstrapmade.com/license/ -->
              <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/day-multipurpose-html-template-for-free/ -->
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>
        <!-- End Footer -->

        <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
        <div id="preloader"></div>`;
    }
    function error404() {
      return /*html*/ `<h1 style="margin:24px">404 Not Found</h1>`;
    }
    function keyVision() {
      return /*html*/ `
        <!-- ======= Hero Section ======= -->
        <section id="hero" class="d-flex align-items-center" style="background: url(${d.keyVision.img} ) top center;">
          <div class="container position-relative" data-aos="fade-up" data-aos-delay="500">
            <h1>${d.keyVision.title}</h1>
            <h2 class="w-75">${d.keyVision.desc}</h2>
            <a class="btn-get-started scrollto" onclick="${event(() => funnel.hyperLink(d.keyVision.link))}" style="cursor:pointer">
              ${d.keyVision.btn.name}
            </a>
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
              <div class="col-lg-6 order-1 order-lg-2" data-aos="fade-left">
                <img src="${d.about.img}" class="img-fluid" alt="" />
              </div>
              <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right">
                <h3>${d.about.title}</h3>
                <p>${d.about.desc}</p>
              </div>
            </div>
          </div>
        </section>
        <!-- End About Section -->
      `;
    }
    function banner() {
      return /*html*/ `
        <!-- ======= Why Us Section ======= -->
        <section id="banner" class="why-us">
          <div class="container">
            <div class="row">
              ${glitter.print(function () {
                var tmp = "";
                d.banner.map((b, i) => {
                  tmp += /*html*/ `
                  <div class="col-lg-4 mb-3" data-aos="fade-up" data-aos-delay="${150 * i}">
                    <div class="box">
                      <span>${b.number}</span><h4>${b.title}</h4><p>${b.desc}</p>
                    </div>
                  </div>
                  `;
                });
                return tmp;
              })}
            </div>
          </div>
        </section>
        <!-- End Why Us Section -->
      `;
    }
    function client() {
      return /*html*/ `
        <!-- ======= Clients Section ======= -->
        <section id="client" class="clients">
          <div class="container" data-aos="zoom-in">
            <div class="row d-flex align-items-center">
            ${glitter.print(function () {
              var tmp = "";
              d.client.map((c) => {
                tmp += /*html*/ `
                  <div class="col-lg-2 col-md-4 col-6">
                    <img src="${c}" class="img-fluid" alt="" />
                  </div>
                `;
              });
              return tmp;
            })}
            </div>
          </div>
        </section>
        <!-- End Clients Section -->
      `;
    }
    function service() {
      return /*html*/ `
        <!-- ======= Services Section ======= -->
        <section id="service" class="services">
          <div class="container">
            <div class="section-title">
              <span>${d.service.title}</span>
              <h2>${d.service.title}</h2>
              <p>${d.service.desc}</p>
            </div>

            <div class="row">
              ${glitter.print(function () {
                var tmp = "";
                d.service.list.map((l, i) => {
                  tmp += /*html*/ `
                    <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-3" data-aos="fade-up" data-aos-delay="${150 * i}">
                      <div class="icon-box w-100">
                        <div class="icon"><i class="${l.icon}"></i></div>
                        <h4><a href="">${l.title}</a></h4>
                        <p>${l.desc}</p>
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
    function fullbg() {
      var bg = `linear-gradient(rgba(2, 2, 2, 0.5), rgba(0, 0, 0, 0.5)), url(${d.fullbg.img}) fixed center center;`;
      return /*html*/ `
        <!-- ======= Cta Section ======= -->
        <section id="cta" class="cta" style="background: ${bg}">
          <div class="container" data-aos="zoom-in">
            <div class="text-center">
              <h3>${d.fullbg.title}</h3>
              <p>${d.fullbg.desc}</p>
              <a class="cta-btn" onclick="${event(() => funnel.hyperLink(d.fullbg.btn.link))}" style="cursor:pointer"
                >${d.fullbg.btn.name}</a
              >
            </div>
          </div>
        </section>
        <!-- End Cta Section -->
      `;
    }
    function project() {
      return /*html*/ `
        <!-- ======= Portfolio Section ======= -->
        <section id="project" class="portfolio">
          <div class="container">
            <div class="section-title">
              <span>${d.project.title}</span>
              <h2>${d.project.title}</h2>
              <p>${d.project.desc}</p>
            </div>

            <div class="row" data-aos="fade-up">
              <div class="col-lg-12 d-flex justify-content-center">
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

            <div class="row portfolio-container" data-aos="fade-up" data-aos-delctaay="150">
              ${glitter.print(function () {
                var tmp = "";
                d.project.list.map((p) => {
                  var tagClass = "";
                  p.tag.map((a) => (tagClass += `${a} `));
                  tmp += /*html*/ `
                    <div class="col-lg-4 col-md-6 portfolio-item border-0 ${tagClass}">
                      <img src="${p.img}" class="img-fluid" alt="" />
                      <div class="portfolio-info">
                        <h4>${p.title}</h4>
                        <p>${p.desc}</p>
                        <a href="${p.img}" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="${p.title}">
                          <i class="bx bx-plus"></i>
                        </a>
                        <a
                          class="details-link"
                          title="More Details"
                          style="cursor:pointer"
                          onclick="${event(() => funnel.hyperLink(p.link))}"
                        >
                          <i class="bx bx-link"></i>
                        </a>
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
    function price() {
      return /*html*/ `
        <!-- ======= Pricing Section ======= -->
        <section id="price" class="pricing">
          <div class="container">
            <div class="section-title">
              <span>${d.price.title}</span>
              <h2>${d.price.title}</h2>
              <p>${d.price.desc}</p>
            </div>

            <div class="row">
            ${glitter.print(function () {
              var tmp = "";
              d.price.list.map((l) => {
                tmp += /*html*/ `
                  <div class="col-lg-4 col-md-6" data-aos="zoom-in">
                    <div class="box ${l.highlight ? `featured` : ``}">
                      <h3>${l.title}</h3>
                      <h4><sup>$</sup>${funnel.addQuantile(l.price.num)}<span> / ${l.price.unit}</span></h4>
                      <ul>
                      ${glitter.print(function () {
                        var tmp = "";
                        l.detail.map((t) => {
                          tmp += /*html*/ `<li ${t.not ? `class="na"` : ``}>${t.text}</li>`;
                        });
                        return tmp;
                      })}
                      </ul>
                      <div class="btn-wrap">
                        <a class="btn-buy" onclick="${event(() => funnel.hyperLink(l.btn.btn))}" style="cursor:pointer">${l.btn.name}</a>
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
        <!-- End Pricing Section -->
      `;
    }
    function team() {
      return /*html*/ `
        <!-- ======= Team Section ======= -->
        <section id="team" class="team">
          <div class="container">
            <div class="section-title">
              <span>${d.team.title}</span>
              <h2>${d.team.title}</h2>
              <p>${d.team.desc}</p>
            </div>

            <div class="row">
            ${glitter.print(function () {
              var tmp = "";
              d.team.list.map((t) => {
                tmp += /*html*/ `
                  <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in">
                    <div class="member">
                      <img src="${t.img}" alt="" />
                      <h4>${t.name}</h4>
                      <span>${t.pro}</span>
                      <p>${t.desc}</p>
                      <div class="social">
                      ${glitter.print(function () {
                        var tmp = "";
                        t.link.map((l) => {
                          tmp += /*html*/ ` <a onclick="${event(() => funnel.hyperLink(l))}" style="cursor:pointer">
                          <i class="${funnel.urlIcon(l, "bi")}"></i>
                          </a> `;
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
        </section>
        <!-- End Team Section -->
      `;
    }
    function contact() {
      return /*html*/ `
        <!-- ======= Contact Section ======= -->
        <section id="contact" class="contact">
          <div class="container">
            <div class="section-title">
              <span>${d.contact.title}</span>
              <h2>${d.contact.title}</h2>
              <p>${d.contact.desc}</p>
            </div>

            <div class="row" data-aos="fade-up">
            ${glitter.print(function () {
              var tmp = "";
              d.contact.info.map((f) => {
                tmp += /*html*/ `
                  <div class="col-lg-3 col-md-6">
                    <div class="info-box mb-4">
                      <i class="${f.icon}"></i>
                      <h3>${f.title}</h3>
                      <p>${f.text}</p>
                    </div>
                  </div>
                `;
              });
              return tmp;
            })}
            </div>

            <div class="row" data-aos="fade-up">
              <div class="col-lg-6 ">
                <iframe
                  class="mb-4 mb-lg-0"
                  src="${d.contact.map}"
                  frameborder="0"
                  style="border:0; width: 100%; height: 470px;"
                  allowfullscreen
                ></iframe>
              </div>

              <div class="col-lg-6">
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
      err && (h = error404());
      return h;
    }
    this.frame = () => nav() + `<main id="main">` + frameRender(p, 1) + `</main>` + footer();
  }
}
