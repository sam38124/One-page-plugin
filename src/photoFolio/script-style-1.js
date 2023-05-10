import { TriggerEvent } from "../glitterBundle/plugins/trigger-event.js";
export class ScriptStyle1 {
    static hi = false;
    static getRout(link) {
        return new URL('./' + link, import.meta.url).href;
    }
    static initialScript(gvc, widget) {
        if (ScriptStyle1.hi) {
            return;
        }
        ScriptStyle1.hi = true;
        window.mode = 'dark';
        window.root = document.getElementsByTagName('html')[0];
        window.root.classList.add('dark-mode');
        gvc.addStyleLink([
            ScriptStyle1.getRout('assets/img/favicon.png'),
            ScriptStyle1.getRout('assets/img/apple-touch-icon.png'),
            ScriptStyle1.getRout('assets/vendor/bootstrap/css/bootstrap.min.css'),
            ScriptStyle1.getRout('assets/vendor/bootstrap-icons/bootstrap-icons.css'),
            ScriptStyle1.getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            ScriptStyle1.getRout('assets/vendor/glightbox/css/glightbox.min.css'),
            ScriptStyle1.getRout('assets/vendor/aos/aos.css'),
            ScriptStyle1.getRout('assets/css/main.css')
        ]).then();
        gvc.addMtScript([
            "assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
            "assets/vendor/swiper/swiper-bundle.min.js",
            "assets/vendor/glightbox/js/glightbox.min.js",
            "assets/vendor/aos/aos.js",
            "assets/vendor/php-email-form/validate.js",
            "assets/js/main.js"
        ].map(((dd) => {
            return { src: ScriptStyle1.getRout(dd) };
        })), () => {
            try {
                console.log("OK");
                widget.refreshComponent();
            }
            catch (e) {
            }
        }, () => {
        });
    }
    static recursive(gvc, widget, r, first) {
        var h = "";
        if (r.list === undefined) {
            h += `
              <li>
                <a
                  class="${first ? "nav-link" : ""} scrollto"
                  onclick='${gvc.event(() => {
                TriggerEvent.trigger({
                    gvc, widget, clickEvent: r.click,
                });
            })}'
                  style="cursor:pointer"
                  
                >
                  ${r.title}
                </a>
              </li>
            `;
        }
        else {
            h += ` <li class="dropdown">
          <a class="">${r.title}<i class="bi bi-chevron-${first ? "down" : "right"}"></i></a>
          <ul class="">
            ${(() => {
                var tmp = "";
                r.list.map((r2) => (tmp += ScriptStyle1.recursive(gvc, widget, r2)));
                return tmp;
            })()}
           
          </ul>
        </li>`;
        }
        return h;
    }
    static urlIcon(link, size) {
        if (link == "#") {
            if (size == "bi")
                return `bi bi-link-45deg`;
            else if (size == "bx")
                return `bx bx-link-alt`;
        }
        let domains = "";
        if (link.match("https://")) {
            domains = link.split("https://")[1];
        }
        else {
            domains = link.split("http://")[1];
        }
        let socialDomain = ["instagram", "twitter", "facebook"];
        let returnString = "";
        if (domains.split(".")[0] == "www") {
            returnString = domains.split(".")[1];
        }
        else {
            returnString = domains.split(".")[0];
        }
        const isMatch = socialDomain.some((domain) => domain.toLowerCase() === returnString.toLowerCase());
        if (isMatch) {
            return `${size} ${size}l-${returnString.toLowerCase()}`;
        }
        else {
            if (size == "bi")
                return `bi bi-link-45deg`;
            else if (size == "bx")
                return `bx bx-link-alt`;
        }
        return "";
    }
    static swapArr(arr, index1, index2) {
        const data = arr[index1];
        arr.splice(index1, 1);
        arr.splice(index2, 0, data);
    }
}