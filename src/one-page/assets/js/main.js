$(function () {
  /* ========= preloader remove ========= */
  document.getElementsByTagName("html")[0].classList.add("dark-mode");
  const preloader = document.querySelector(".page-loading");
  preloader.classList.remove("active");
  preloader.remove();

  /* ========= navbar underline (change page) ========= */
  $(`.navbar-nav .${glitter.getUrlParameter("page")}`).css("border-bottom", "1px #fff solid");

  /* ========= navbar underline (id herf) ========= */
  $("header .btn,header .nav-link, .kv-btn")
    .not(".dropdown-toggle")
    .on("click", function (e) {
      $("header .nav-link").map((e) => $("header .nav-link").eq(e).css("border-bottom", ""));
      $(this).css("border-bottom", "1px #fff solid");

    });

  /* ========= isotope filter ========= */
  // imagesLoaded(document.querySelector(".isot"), function (instance) {
  //   $(".isot").isotope({ filter: ':not("*")' }), $(".isot").isotope({ filter: "*" });
  // });



  /* ========= conner button ========= */
  $(window).on("scroll", function (e) {
    if (e.currentTarget.pageYOffset > parseInt(600, 10)) {
      $(".btn-conner").addClass("show");
      $(".btn-conner").each(function (e) {
        $(`#conner${e}`).css("bottom", `${5 + 3 * e}rem`);
      });
    } else {
      $(".btn-conner").removeClass("show");
    }
  });

  /* ========= faq button ========= */
  $(".accordion-button").on("click", function (a) {
    $(".accordion-collapse").map(function () {
      $(this).attr("class").includes("show") && $(this).collapse("hide");
    });
    $(this).collapse("hide");
  });

  /* ========= AOS init ========= */
  AOS.init();
});
