import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    widget.data.gallery = widget.data.gallery ?? [
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-1.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-2.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-3.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-4.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-5.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-6.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-7.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-8.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-9.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-10.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-11.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-12.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-13.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-14.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-15.jpg")
                        },
                        {
                            src: ScriptStyle1.getRout("assets/img/gallery/gallery-16.jpg")
                        },
                    ];
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let gallery = widget.data.gallery;
                            return `
<main id="main" data-aos="fade" data-aos-delay="1500">
                            <!-- ======= Gallery Section ======= -->
    <section id="gallery"  style="background:black;margin:0;"  class="gallery">
      <div class="container-fluid">

        <div class="row gy-4 justify-content-center">
          ${(() => {
                                let html = ``;
                                gallery.map((photo) => {
                                    html += `
                  <div class="col-xl-3 col-lg-4 col-md-6">
                    <div class="gallery-item h-100">
                      <img src="${photo.src}" class="img-fluid" alt="">
                      <div class="gallery-links d-flex align-items-center justify-content-center">
                        <a href="${photo.src}" title="Gallery 1" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
                        <a href="gallery-single.html" class="details-link"><i class="bi bi-link-45deg"></i></a>
                      </div>
                    </div>
                  </div><!-- End Gallery Item -->
                  `;
                                });
                                return html;
                            })()}          

        </div>

      </div>
    </section><!-- End Gallery Section -->
</main><!-- End #main -->                           
`;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                            const glightbox = GLightbox({
                                selector: '.glightbox'
                            });
                        }
                    });
                },
                editor: () => {
                    return ``;
                }
            };
        },
    };
});
