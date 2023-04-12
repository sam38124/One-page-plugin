class Miapp {
  constructor(p, d) {
    var event = window.event;
    ["base", "nav", "footer"].map((n) => (d[n] = glitter.api.getData([n])[n]));

    function nav() {
      return /*html*/ `
        <div class="page-borders">
          <div class="left"></div>
          <div class="right"></div>
        </div>

        <a href="#" class="menu-btn">
          <span class="lines">
            <span class="l1"></span>
            <span class="l2"></span>
            <span class="l3"></span>
          </span>
        </a>

        <nav class="menu">
          <ul>
            ${glitter.print(function () {
              var tmp = "";
              d.nav.map((l) => (tmp += /*html*/ `<li><a href="#${l.title}" style="font-size:16px"> ${l.name} </a></li>`));
              return tmp;
            })}
          </ul>
        </nav>

        <div id="preloader">
          <div class="loader">
            <img src="img/loader.gif" alt />
          </div>
        </div>
      `;
    }
    function footer() {
      return /*html*/ `
        <footer>
          <div class="container text-center">
            <p>
              &copy; All Right Reserved. Designed By
              <a role="button" onclick="${event(() => funnel.hyperLink("https://squarestudio.tw"))}">Lion Design</a>
            </p>
          </div>
        </footer>
      `;
    }

    // Section
    function intro() {
      return /*html*/ `
        <section id="intro" class="section intro-section">
          <div class="container">
            <div class="row intro-cols">
              <div class="col-md-6 col-md-push-6">
                <div class="phone">
                  <div class="phone-img">
                    <img src="${d.intro.img}" alt />
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-md-pull-6">
                <div class="v-align">
                  <div class="inner">
                    <div class="intro-text">
                      <h1>${d.intro.title ?? ""}</h1>
                      <p>${d.intro.desc ?? ""}</p>
                      <div class="intro-download-btns">
                        <a class="app-btn" onclick="${event(() => funnel.hyperLink(d.base.android))}">
                          <img src="img/appstore.png" alt />
                        </a>
                        <a class="app-btn" onclick="${event(() => funnel.hyperLink(d.base.ios))}">
                          <img src="img/googleplay.png" alt />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }
    function features() {
      return /*html*/ `
        <section id="features" class="section features-section">
          <div class="container">
            <div class="phone-img">
              <img src="${d.features.img}" alt />
            </div>
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <div class="features-text">
                  <h2>${d.features.title}</h2>
                  <p>${d.features.desc}</p>
                </div>
              </div>
            </div>
            <div class="row features-row">
              ${glitter.print(function () {
                var tmp = "";
                d.features.list.map((l) => {
                  tmp += /*html*/ `
                    <div class="col-md-4 col-sm-6">
                      <div class="feature">
                        <div class="icon">
                          <i class="${l.icon}"></i>
                        </div>
                        <div class="content">
                          <h4>${l.title}</h4>
                          <p>${l.desc}</p>
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
    function features_2() {
      return /*html*/ `
        <section id="features-2" class="section features-2-section bg-lightgray">
          <div class="container">
            <div class="row">
              <div class="col-md-6 col-md-push-6">
                <div class="phones">
                  <img class="front" src="${d.features_2.img.front}" alt />
                  <img class="back" src="${d.features_2.img.back}" alt />
                </div>
              </div>
              <div class="col-md-6 col-md-pull-6">
                <div class="screen-info-text">
                  <h2>${d.features_2.title}</h2>
                  <p>${d.features_2.desc}</p>
                  <a class="btn-minimal" onclick="${event(() => funnel.hyperLink(d.features_2.btn.link))}"> ${d.features_2.btn.name} </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }
    function features_3() {
      return /*html*/ `
        <section id="features-3" class="section features-2-section">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="phones order-alt">
                  <img class="back" src="${d.features_3.img.back}" alt />
                  <img class="front" src="${d.features_3.img.front}" alt />
                </div>
              </div>
              <div class="col-md-6">
                <div class="screen-info-text">
                  <h2>${d.features_3.title}</h2>
                  <p>${d.features_3.desc}</p>
                  <a class="btn-minimal" onclick="${event(() => funnel.hyperLink(d.features_3.btn.link))}"> ${d.features_3.btn.name} </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }
    function features_4() {
      return /*html*/ `
        <section id="features-4" class="section features-4-section">
          <div class="container">
            <div class="row">
              <div class="col-md-4 features-col text-right">
                ${glitter.print(function () {
                  var tmp = "";
                  d.features_4.left.map((l) => {
                    tmp += /*html*/ `
                      <div class="col-feature">
                        <div class="icon">
                          <i class="${l.icon}"></i>
                        </div>
                        <div class="content">
                          <h4>${l.title}</h4>
                          <p>${l.desc}</p>
                        </div>
                      </div>
                    `;
                  });
                  return tmp;
                })}
              </div>
              <div class="col-md-4">
                <div class="features-phone">
                  <img src="${d.features_4.img}" alt />
                </div>
              </div>
              <div class="col-md-4 features-col">
                ${glitter.print(function () {
                  var tmp = "";
                  d.features_4.right.map((l) => {
                    tmp += /*html*/ `
                      <div class="col-feature">
                        <div class="icon">
                          <i class="${l.icon}"></i>
                        </div>
                        <div class="content">
                          <h4>${l.title}</h4>
                          <p>${l.desc}</p>
                        </div>
                      </div>
                    `;
                  });
                  return tmp;
                })}
              </div>
            </div>
          </div>
        </section>
      `;
    }
    function screenshots() {
      return /*html*/ ` <section id="screenshots" class="section screenshots-section bg-lightgray">
        <div class="container">
          <div class="top-section-header">
            <h2>${d.screenshots.title}</h2>
            <p>${d.screenshots.desc}</p>
          </div>
          <ul class="screenshots-slider">
            ${glitter.print(function () {
              var tmp = "";
              d.screenshots.img.map((g) => {
                tmp += /*html*/ `
                  <li>
                    <div class="inner">
                      <img src="${g}" alt />
                      <div class="overlay">
                        <a href="${g}" class="view-btn">
                          <i class="ion-ios-plus-empty"></i>
                        </a>
                      </div>
                    </div>
                  </li>
                `;
              });
              return tmp;
            })}
          </ul>
        </div>
      </section>`;
    }
    function video() {
      return /*html*/ `
        <section id="video" class="section video-section bg-lightgray">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="col-section-header">
                  <h2>${d.video.title}</h2>
                  <p>${d.video.desc}</p>
                </div>
              </div>
              <div class="col-md-8">
                <div class="video-container">
                  <iframe
                    width="560"
                    height="315"
                    src="${d.video.link}"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }
    function price() {
      return /*html*/ `
        <section id="pricing" class="section pricing-section">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="col-section-header">
                  <h2>${d.price.title}</h2>
                  <p>${d.price.desc}</p>
                </div>
              </div>
              ${glitter.print(function () {
                var tmp = "";
                d.price.list.map((l) => {
                  tmp += /*html*/ `
                    <div class="col-md-4">
                      <div class="p-table">
                        <div class="header">
                          <h4>${l.title}</h4>
                          <div class="price">
                            <span class="currency">$</span>
                            <span class="amount" style="font-size:54px">${funnel.addQuantile(l.price.num)}</span>
                            <span class="period">/${l.price.unit}</span>
                          </div>
                        </div>
                        <ul class="items">
                          ${glitter.print(function () {
                            var tmp = "";
                            l.detail.map((t) => {
                              tmp += /*html*/ `<li>
                                ${
                                  (t.not
                                    ? `<i class="ion-ios-close h4" style="color:red"></i>`
                                    : `<i class="ion-ios-checkmark h4" style="color:green"></i>`) +
                                  " " +
                                  t.text
                                }
                              </li>`;
                            });
                            return tmp;
                          })}
                        </ul>
                        <a class="btn-minimal" onclick="${event(() => funnel.hyperLink(l.btn.link))}"> ${l.btn.name} </a>
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
    function subs() {
      return /*html*/ `
        <section id="subscribe" class="section subscribe-section" style="background-image: url(${d.base.background})">
          <div class="container">
            <div class="section-header">
              <h2>${d.subs.title}</h2>
            </div>
            <div class="row">
              <div class="col-md-6 col-md-offset-3">
                <div class="subscribe-form">
                  <input type="text" class="subscribe-input" placeholder="${glitter.share.language.emailHint}" name="subscribe-input" />
                  <a class="subscribe-btn">${glitter.share.language.subscribeNews}</a>
                </div>
                <p class="hate-spam">${d.subs.desc}</p>
              </div>
            </div>
          </div>
        </section>
      `;
    }
    function team() {
      return /*html*/ `
        <section id="team" class="section team-section">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="col-section-header">
                  <h2>${d.team.title}</h2>
                  <p>${d.team.desc}</p>
                  <a class="btn-minimal" onclick="${event(() => funnel.hyperLink(d.team.btn.link))}"> ${d.team.btn.name} </a>
                </div>
              </div>
              <div class="col-md-8">
                <div class="team-persons">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.team.list.map((l, n) => {
                      n % 3 == 0 ? (tmp += `<div class="row">`) : ``;
                      tmp += /*html*/ `
                        <div class="col-md-4">
                          <div class="team-member">
                            <img src="${l.img}" alt />
                            <div class="overlay">
                              <div class="v-align">
                                <div class="inner">
                                  <h4>${l.name}</h4>
                                  <p>${l.pro}</p>
                                  <ul class="team-social">
                                    ${glitter.print(function () {
                                      var iconList = {
                                        facebook: "ion-social-facebook",
                                        instagram: "ion-social-instagram-outline",
                                        twitter: "ion-social-twitter",
                                        linkedin: "ion-social-linkedin",
                                        youtube: "ion-social-youtube",
                                        github: "ion-social-github",
                                        googleplus: "ion-social-googleplus",
                                        link: "ion-link",
                                      };
                                      var tmp = "";
                                      l.link.map((k) => {
                                        tmp += /*html*/ `
                                          <li>
                                            <a onclick="${event(() => funnel.hyperLink(k))}">
                                              <i class="${funnel.urlIcon(k, iconList)}"></i>
                                            </a>
                                          </li>
                                        `;
                                      });
                                      return tmp;
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      `;
                      n % 3 == 2 ? (tmp += `</div>`) : ``;
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
    function client() {
      return /*html*/ `
        <section id="clients" class="section clients-section bg-lightgray">
          <div class="container">
            <div class="top-section-header">
              <h2>${d.client.title}</h2>
              <p>${d.client.desc}</p>
            </div>
            <div class="row">
              <div class="col-md-6">
                <ul class="clients">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.client.logo.map((c) => (tmp += /*html*/ `<li><img src="${c}" alt /></li>`));
                    return tmp;
                  })}
                </ul>
              </div>
              <div class="col-md-6">
                <div class="testimonials-slider">
                  ${glitter.print(function () {
                    var tmp = "";
                    d.client.test.map((s) => {
                      tmp += /*html*/ `
                        <div class="testimonial">
                          <div class="icon">
                            <i class="ion-quote"></i>
                          </div>
                          <div class="content">
                            <p>${s.text}</p>
                          </div>
                          <div class="author">
                            <h4>${s.name}</h4>
                            <span>${s.pro}</span>
                          </div>
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
      `;
    }
    function faq() {
      return /*html*/ `
        <section id="faq" class="section faq-section">
          <div class="container">
            <div class="top-section-header">
              <h2>${d.faq.title}</h2>
              <p>${d.faq.desc}</p>
            </div>
            ${glitter.print(function () {
              var tmp = "";
              d.faq.list.map((l, n) => {
                n % 2 == 0 ? (tmp += `<div class="row">`) : ``;
                tmp += /*html*/ `
                  <div class="col-md-6">
                    <div class="faq">
                      <h4>${l.q}</h4>
                      <p>${l.a}</p>
                    </div>
                  </div>
                `;
                n % 2 == 1 ? (tmp += `</div>`) : ``;
              });
              return tmp;
            })}
          </div>
        </section>
      `;
    }
    function download() {
      return /*html*/ `
        <section id="download" class="section download-section" style="background-image: url(${d.base.background})">
          <div class="container">
            <div class="row text-center">
              <div class="col-md-8 col-md-offset-2">
                <div class="download-text">
                  <h2>${d.download.title}</h2>
                  <p>${d.download.desc}</p>
                </div>
              </div>
            </div>
            <div class="download-btns text-center">
              <a class="app-btn" onclick="${event(() => funnel.hyperLink(d.base.android))}">
                <img src="img/appstore.png" alt />
              </a>
              <a class="app-btn" onclick="${event(() => funnel.hyperLink(d.base.ios))}">
                <img src="img/googleplay.png" alt />
              </a>
            </div>
          </div>
        </section>
      `;
    }
    function contact() {
      return /*html*/ `
        <section id="contact" class="section contact-section">
          <div class="container">
            <div class="top-section-header">
              <h2>${d.contact.title}</h2>
              <p>${d.contact.desc}</p>
            </div>
            <form class="contact-form" id="contact-form" data-toggle="validator" method="post">
              <div id="contact-form-result"></div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="${glitter.share.language.fullNameHint}" name="name" required />
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="form-group">
                    <input type="email" class="form-control" placeholder="${glitter.share.language.emailHint}" name="email" required />
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="form-group">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="${glitter.share.language.enterHint + glitter.share.language.phone}"
                      name="phone"
                      required
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <textarea class="form-control" placeholder="${glitter.share.language.sharePtHint}" name="message" required></textarea>
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="form-group text-center">
                    <button class="btn-minimal btn-block" type="submit">${glitter.share.language.send}</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      `;
    }

    this.frame = function () {
      var h = "";
      p.map((page) => (h += eval(page + "()")));
      return nav() + `<div id="main-wrapper">${h + footer()}</div>`;
    };
  }
}
