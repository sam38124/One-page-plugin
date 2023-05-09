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
                    const footer = {
                        title: widget.data.title ?? "Lion Design"
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                                <!-- ======= Footer ======= -->
  <footer id="footer" style="background:black;margin:0;" class="footer">
    <div class="container">
      <div class="copyright">
        &copy;  Copyright <strong><span>PhotoFolio</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/photofolio-bootstrap-photography-website-template/ -->
        Designed by <a href="https://bootstrapmade.com/">${footer.title}</a>
      </div>
    </div>
  </footer><!-- End Footer -->

  <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>`;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
                    return glitter.htmlGenerate.editeInput({
                        gvc: gvc,
                        title: '標題',
                        default: widget.data.title,
                        placeHolder: '請輸入標題',
                        callback: (text) => {
                            widget.data.title = text;
                            widget.refreshComponent();
                        },
                    });
                }
            };
        },
    };
});
