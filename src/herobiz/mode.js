class Mode {
  constructor(p, d, k) {
    var event = window.event;
    ["base", "nav", "footer"].map((n) => (d[n] = glitter.api.getData([n])[n]));

    function recursive(r, first) {
      var h = "";
      if (r.list === undefined) {
        h += /*html*/ `<li>
          <a
            class="${first ? "nav-link scrollto" : ""}"
            onclick="${event(() => funnel.hyperLink(r.link, false, { name: r.name }))}"
            style="cursor:pointer"
            data-hash=${r.link}
            >${r.name}
          </a>
        </li>`;
      } else if (r.mode === "mega") {
        h += /*html*/ `
          <li class="dropdown megamenu">
            <a class="${first ? "nav-link scrollto" : ""}">${r.name}<i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              ${glitter.print(function () {
                var tmp = "";
                r.list.map((l) => {
                  tmp += /*html*/ `
                    <li>
                      ${glitter.print(function () {
                        var tmp = "";
                        l.map(
                          (e) =>
                            (tmp += /*html*/ `<a
                              onclick="${event(() => funnel.hyperLink(e.link, false, { name: e.name }))}"
                              style="cursor:pointer"
                              >${e.name}
                            </a>`)
                        );
                        return tmp;
                      })}
                    </li>
                  `;
                });
                return tmp;
              })}
            </ul>
          </li>
        `;
      } else {
        h += /*html*/ `<li class="dropdown">
          <a class="${first ? "nav-link scrollto" : ""}">${r.name}<i class="bi bi-chevron-down dropdown-indicator"></i></a>
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
      return /*html*/ ` <!-- ======= Header ======= -->
        <header id="header" class="header fixed-top" data-scrollto-offset="0">
          <div class="container-fluid d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center logo scrollto me-auto me-lg-0" 
            onclick="${event(() => glitter.location.reload())}" style="cursor:pointer">
              <img src="${d.nav.logo}" alt="logo" class="img-fluid mx-2" />
              <h1>${d.nav.title}</h1>
            </div>

            <nav id="navbar" class="navbar">
              <ul>
              ${glitter.print(function () {
                var tmp = "";
                d.nav.bar.map((b) => (tmp += recursive(b, true)));
                return tmp;
              })}
              </ul>
              <i class="bi bi-list mobile-nav-toggle d-none"></i>
            </nav>
            <!-- .navbar -->

            <a class="btn-getstarted scrollto me-lg-4" onclick="${event(() => funnel.hyperLink(d.nav.btn.link))}" style="cursor:pointer">
            ${d.nav.btn.name}</a>
          </div>
        </header>
        <!-- End Header -->`;
    }
    function footer() {
      return /*html*/ ` <!-- ======= Footer ======= -->
        <footer id="footer" class="footer">
          <div class="footer-content">
            <div class="container">
              <div class="row">
                <div class="col-lg-3 col-md-6">
                  <div class="footer-info">
                    <h3>${d.footer.info.title}</h3>
                    ${glitter.print(function () {
                      var tmp = "";
                      d.footer.info.list.map((f) => {
                        tmp += /*html*/ `<div class="d-flex align-items-center mb-3">
                          <i class="${f.icon} fs-5 me-3"></i><span class="pb-1"><a>${f.title}</a></span>
                        </div> `;
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
                                <i class="bi bi-chevron-right"></i>
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

          <div class="footer-legal text-center">
            <div class="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">
              <div class="d-flex flex-column align-items-center align-items-lg-start">
                <div class="copyright">${funnel.copyRight("aqua")}</div>
                <div class="credits">
                  <!-- All the links in the footer should remain intact. -->
                  <!-- You can delete the links only if you purchased the pro version. -->
                  <!-- Licensing information: https://bootstrapmade.com/license/ -->
                  <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/herobiz-bootstrap-business-template/ -->
                  Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
              </div>

              <div class="social-links order-first order-lg-last mb-3 mb-lg-0">
                ${glitter.print(function () {
                  var tmp = "";
                  d.footer.link.map((k) => {
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
        </footer>
        <!-- End Footer -->

        <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
        <div id="preloader"></div>
        `;
    }
    function error404() {
      return /*html*/ `<h1 style="margin:24px">404 Not Found</h1>`;
    }
    function keyVision() {
      return /*html*/ ` <section
        id="hero-fullscreen"
        class="hero-fullscreen d-flex align-items-center"
        style="background: url(${d.keyVision.img}) center center;"
      >
        <div class="container d-flex flex-column align-items-center position-relative" data-aos="zoom-out">
          <h2>${d.keyVision.title}</h2>
          <p>${d.keyVision.desc}</p>
          <div class="d-flex">
            <a class="btn-get-started scrollto" onclick="${event(() => funnel.hyperLink(d.keyVision.video.link))}" style="cursor:pointer"
              >${d.keyVision.btn.name}</a
            >
            <a href="${d.keyVision.video.link}" class="glightbox btn-watch-video d-flex align-items-center"
              ><i class="bi bi-play-circle"></i><span>${d.keyVision.video.name}</span></a
            >
          </div>
        </div>
      </section>`;
    }
    function banner() {
      return /*html*/ `
        <!-- ======= Featured Services Section ======= -->
        <section id="featured-services" class="featured-services">
          <div class="container">
            <div class="row gy-4">
              ${glitter.print(function () {
                var tmp = "";
                d.banner.map((f) => {
                  tmp += /*html*/ `
                    <div class="col-xl-3 col-md-6 d-flex" data-aos="zoom-out">
                      <div class="service-item position-relative">
                        <div class="icon"><i class="${f.icon} icon"></i></div>
                        <h4><a href="" class="stretched-link">${f.title}</a></h4>
                        <p>${f.desc}</p>
                      </div>
                    </div>
                    <!-- End Service Item -->
                  `;
                });
                return tmp;
              })}
            </div>
          </div>
        </section>
        <!-- End Featured Services Section -->
      `;
    }
    function about() {
      return /*html*/ `
        <!-- ======= About Section ======= -->
        <section id="about" class="about">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>${d.about.title}</h2>
              <p>${d.about.desc}</p>
            </div>

            <div class="row g-4 g-lg-5" data-aos="fade-up" data-aos-delay="200">
              <div class="col-lg-5">
                <div class="about-img"><img src="${d.about.img}" class="img-fluid" alt="" /></div>
              </div>

              <div class="col-lg-7">
                <h3 class="pt-0 pt-lg-5">${d.about.slogan}</h3>

                <!-- Tabs -->
                <ul class="nav nav-pills mb-3">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.about.list.map((t, i) => {
                      tmp += /*html*/ `
                        <li><a class="nav-link ${i == 0 ? `active` : ``}" data-bs-toggle="pill" href="#tab${i}">${t.tab}</a></li>
                      `;
                    });
                    return tmp;
                  })}
                </ul>
                <!-- End Tabs -->

                <!-- Tab Content -->
                <div class="tab-content">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.about.list.map((t, i) => {
                      tmp += /*html*/ `
                        <div class="tab-pane fade show ${i == 0 ? `active` : ``} px-3" id="tab${i}"><p>${t.content}</p></div>
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
    function client() {
      return /*html*/ `
        <!-- ======= Clients Section ======= -->
        <section id="clients" class="clients">
          <div class="container" data-aos="zoom-out">
            <div class="clients-slider swiper">
              <div class="swiper-wrapper align-items-center">
              ${glitter.print(function () {
                var tmp = "";
                d.client.map((c) => {
                  tmp += /*html*/ ` <div class="swiper-slide"><img src="${c}" class="img-fluid" alt="" /></div> `;
                });
                return tmp;
              })}
              </div>
            </div>
          </div>
        </section>
        <!-- End Clients Section -->
      `;
    }
    function action() {
      return /*html*/ `
        <!-- ======= Call To Action Section ======= -->
        <section id="cta" class="cta">
          <div class="container" data-aos="zoom-out">
            <div class="row g-5">
              <div class="col-lg-8 col-md-6 content d-flex flex-column justify-content-center order-last order-md-first">
                <h3>${d.action.title}</h3>
                <p>${d.action.desc}</p>
                <a class="cta-btn align-self-start" onclick="${event(() => funnel.hyperLink(d.action.btn.link))}" style="cursor:pointer">
                ${d.action.btn.name}</a>
              </div>

              <div class="col-lg-4 col-md-6 order-first order-md-last d-flex align-items-center">
                <div class="img">
                  <img src="${d.action.img}" alt="" class="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End Call To Action Section -->
      `;
    }
    function focus() {
      return /*html*/ `
        <!-- ======= On Focus Section ======= -->
        <section id="focus" class="onfocus">
          <div class="container-fluid p-0" data-aos="fade-up">
            <div class="row g-0">
              <div class="col-lg-6 video-play position-relative">
                <a href="${d.focus.video}" class="glightbox play-btn"></a>
              </div>
              <div class="col-lg-6">
                <div class="content d-flex flex-column justify-content-center h-100">
                  <h3>${d.focus.title}</h3>
                  <p>${d.focus.desc}</p>
                  <a class="read-more align-self-start" onclick="${event(() => funnel.hyperLink(d.focus.btn.link))}" style="cursor:pointer"
                    ><span>${d.focus.btn.name}</span><i class="bi bi-arrow-right"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End On Focus Section -->
      `;
    }
    function feature() {
      return /*html*/ `
        <!-- ======= Features Section ======= -->
        <section id="features" class="features">
          <div class="container" data-aos="fade-up">
            <ul class="nav nav-tabs row gy-4 d-flex">
            ${glitter.print(function () {
              var tmp = "";
              d.feature.map((l, i) => {
                tmp += /*html*/ `
                  <li class="nav-item col-6 col-md-4 col-lg-2">
                    <a class="nav-link ${i == 0 ? `active show` : ``}" data-bs-toggle="tab" data-bs-target="#tab-${i}">
                      <i class="${l.icon.name}" style="color:${l.icon.color}"></i>
                      <h4>${l.tab}</h4>
                    </a>
                  </li>
                `;
              });
              return tmp;
            })}
            </ul>

            <div class="tab-content">
            ${glitter.print(function () {
              var tmp = "";
              d.feature.map((l, i) => {
                tmp += /*html*/ `
                  <div class="tab-pane ${i == 0 ? `active show` : ``}" id="tab-${i}">
                    <div class="row gy-4">
                      <div class="col-lg-8 order-2 order-lg-1 pt-lg-4" data-aos="fade-up" data-aos-delay="100">
                        <h3>${l.title}</h3>
                        <p>${l.desc}</p>
                      </div>
                      <div class="col-lg-4 order-1 order-lg-2 text-center" data-aos="fade-up" data-aos-delay="200">
                      <div style="background:url(${l.img});
                            width: 100%;
                            padding-bottom: 60%;
                            background-size:cover;
                            background-position:center center;"
                            ></div>
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
        <!-- End Features Section -->
      `;
    }
    function service() {
      return /*html*/ `
        <!-- ======= Services Section ======= -->
        <section id="service" class="services">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>${d.service.title}</h2>
              <p>${d.service.desc}</p>
            </div>

            <div class="row gy-5">
              ${glitter.print(function () {
                var tmp = "";
                d.service.list.map((l, i) => {
                  tmp += /*html*/ `
                    <div class="col-xl-4 col-md-6" data-aos="zoom-in" data-aos-delay="${200 + 100 * i}">
                      <div class="service-item">
                        <div class="img">
                          <img src="${l.img}" class="img-fluid" alt="" />
                        </div>
                        <div class="details position-relative">
                          <div class="icon">
                            <i class="${l.icon}"></i>
                          </div>
                          <a class="stretched-link" onclick="${event(() => funnel.hyperLink(l.link))}" style="cursor:pointer">
                            <h3>${l.title}</h3>
                          </a>
                          <p>${l.desc}</p>
                        </div>
                      </div>
                    </div>
                    <!-- End Service Item -->
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
        <section id="testimonials" class="testimonials">
          <div class="container" data-aos="fade-up">
            <div class="testimonials-slider swiper">
              <div class="swiper-wrapper">
              ${glitter.print(function () {
                var tmp = "";
                d.test.map((t) => {
                  tmp += /*html*/ `
                    <div class="swiper-slide">
                      <div class="testimonial-item">
                        <img src="${t.img}" class="testimonial-img" alt="" />
                        <h3>${t.name}</h3>
                        <h4>${t.pro}</h4>
                        <p>
                          <i class="bi bi-quote quote-icon-left"></i>
                          ${t.text}
                          <i class="bi bi-quote quote-icon-right"></i>
                        </p>
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
      return /*html*/ `
            <!-- ======= Pricing Section ======= -->
    <section id="price" class="pricing">
      <div class="container" data-aos="fade-up">

        <div class="section-header">
          <h2>${d.price.title}</h2>
          <p>${d.price.desc}</p>
        </div>

        <div class="row gy-4">

          ${glitter.print(function () {
            var tmp = "";
            d.price.list.map((l, i) => {
              tmp += /*html*/ `
                <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="${200 * (i + 1)}">
                  <div class="pricing-item ${l.highlight ? `featured` : ``}">
                    <div class="pricing-header">
                      <h3>${l.title}</h3>
                      <h4><sup>$</sup>${funnel.addQuantile(l.price.num)}<span> / ${l.price.unit}</span></h4>
                    </div>

                    <ul>
                      ${glitter.print(function () {
                        var tmp = "";
                        l.detail.map((t) => {
                          var li = t.not ? `<li class="na"><i class="bi bi-x me-2">` : `<li><i class="bi bi-check">`;
                          tmp += /*html*/ ` ${li}</i> <span>${t.text}</span></li> `;
                        });
                        return tmp;
                      })}
                    </ul>

                    <div class="text-center mt-auto">
                      <a class="buy-btn" onclick="${event(() => funnel.hyperLink(l.btn.link))}" style="cursor:pointer">${l.btn.name}</a>
                    </div>
                  </div>
                </div>
                <!-- End Pricing Item -->
              `;
            });
            return tmp;
          })}

        </div>

      </div>
    </section><!-- End Pricing Section -->
      `;
    }
    function faq() {
      return /*html*/ `
        <!-- ======= F.A.Q Section ======= -->
        <section id="faq" class="faq">
          <div class="container-fluid" data-aos="fade-up">
            <div class="row gy-4">
              <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">
                <div class="content px-xl-5">
                  <h3>${d.faq.title}</h3>
                  <p>${d.faq.desc}</p>
                </div>

                <div class="accordion accordion-flush px-xl-5" id="faqlist">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.faq.list.map((l, i) => {
                      tmp += /*html*/ `
                        <div class="accordion-item" data-aos="fade-up" data-aos-delay="${200 + 100 * i}">
                          <h3 class="accordion-header">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#faq-content-${i}"
                            >
                              <i class="bi bi-question-circle question-icon"></i>
                              ${l.q}
                            </button>
                          </h3>
                          <div id="faq-content-${i}" class="accordion-collapse collapse" data-bs-parent="#faqlist">
                            <div class="accordion-body">${l.a}</div>
                          </div>
                        </div>
                        <!-- # Faq item-->
                      `;
                    });
                    return tmp;
                  })}
                </div>
              </div>

              <div class="col-lg-5 align-items-stretch order-1 order-lg-2 img" style="background-image: url(${d.faq.img});">&nbsp;</div>
            </div>
          </div>
        </section>
        <!-- End F.A.Q Section -->
      `;
    }
    function portfolio() {
      return /*html*/ `
        <!-- ======= Portfolio Section ======= -->
        <section id="portfolio" class="portfolio" data-aos="fade-up">
          <div class="container">
            <div class="section-header">
              <h2>${d.portfolio.title}</h2>
              <p>${d.portfolio.desc}</p>
            </div>
          </div>

          <div class="container-fluid" data-aos="fade-up" data-aos-delay="200">
            <div class="portfolio-isotope" data-portfolio-filter="*" data-portfolio-layout="masonry" data-portfolio-sort="original-order">
              <ul class="portfolio-flters">
                ${glitter.print(function () {
                  var tmp = "";
                  d.portfolio.tag.map((a, i) => {
                    tmp += /*html*/ `<li data-filter="${a.className}" ${i == 0 ? `class="filter-active"` : ``}>${a.title}</li>`;
                  });
                  return tmp;
                })}
              </ul>
              <!-- End Portfolio Filters -->

              <div class="row g-0 portfolio-container">
              ${glitter.print(function () {
                var tmp = "";
                d.portfolio.list.map((l) => {
                  var tagClass = "";
                  l.tag.map((m) => (tagClass += `${m} `));
                  tmp += /*html*/ `
                    <div class="col-xl-3 col-lg-4 col-md-6 portfolio-item ${tagClass}">
                      <div
                        style="background:url(${l.img});
                            width: 100%;
                            padding-bottom: 70%;
                            background-size:cover;
                            background-position:center center;"
                      ></div>
                      <div class="portfolio-info">
                        <h4>${l.title}</h4>
                        <a href="${l.img}" title="${l.title}" data-gallery="portfolio-gallery" class="glightbox preview-link"
                          ><i class="bi bi-zoom-in"></i
                        ></a>
                        <a title="More Details" class="details-link" onclick="${event(() => funnel.hyperLink("#"))}" style="cursor:pointer"
                          ><i class="bi bi-link-45deg"></i
                        ></a>
                      </div>
                    </div>
                    <!-- End Portfolio Item -->
                  `;
                });
                return tmp;
              })}
              </div>
              <!-- End Portfolio Container -->
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
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>${d.team.title}</h2>
              <p>${d.team.desc}</p>
            </div>

            <div class="row gy-5">
            ${glitter.print(function () {
              var tmp = "";
              d.team.list.map((l, i) => {
                tmp += /*html*/ `
                  <div class="col-xl-4 col-md-6 d-flex" data-aos="zoom-in" data-aos-delay="${200 * (i + 1)}">
                    <div class="team-member">
                      <div class="member-img">
                        <img src="${l.img}" class="img-fluid" alt="" />
                      </div>
                      <div class="member-info">
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
                        <h4>${l.name}</h4>
                        <span>${l.pro}</span>
                      </div>
                    </div>
                  </div>
                  <!-- End Team Member -->
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
    function news() {
      return /*html*/ `
        <!-- ======= Recent Blog Posts Section ======= -->
        <section id="news" class="recent-blog-posts">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>${d.news.title}</h2>
              <p>${d.news.desc}</p>
            </div>

            <div class="row">
            ${glitter.print(function () {
              var tmp = "";
              d.news.list.map((n, i) => {
                tmp += /*html*/ `
                  <div class="col-lg-4" data-aos="fade-up" data-aos-delay="${200 * (i + 1)}">
                    <div class="post-box">
                      <div
                        class="post-img"
                        style="background:url(${n.img});
                        width: 100%;
                        padding-bottom: 55%;
                        background-size: cover;
                        background-position: center center"
                      ></div>
                      <div class="meta">
                        <span class="post-date">${n.ago}</span>
                        <span class="post-author"> / ${n.author.name}</span>
                      </div>
                      <h3 class="post-title">${n.title}</h3>
                      <p>${n.desc}</p>
                      <a class="readmore stretched-link" onclick="${event(() => funnel.hyperLink(n.btn.link))}" style="cursor:pointer"
                        ><span>${n.btn.name}</span><i class="bi bi-arrow-right"></i
                      ></a>
                    </div>
                  </div>
                `;
              });
              return tmp;
            })}
            </div>
          </div>
        </section>
        <!-- End Recent Blog Posts Section -->
      `;
    }
    function contact() {
      return /*html*/ `
        <!-- ======= Contact Section ======= -->
        <section id="contact" class="contact">
          <div class="container">
            <div class="section-header">
              <h2>${d.contact.title}</h2>
              <p>${d.contact.desc}</p>
            </div>
          </div>

          <div class="map">
            <iframe src="${d.contact.map}" frameborder="0" allowfullscreen></iframe>
          </div>
          <!-- End Google Maps -->

          <div class="container">
            <div class="row gy-5 gx-lg-5">
              <div class="col-lg-4">
                <div class="info">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.contact.info.map((f) => {
                      tmp += /*html*/ ` <div class="info-item d-flex">
                          <i class="${f.icon} flex-shrink-0"></i>
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
