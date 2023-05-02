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
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css',
            ScriptStyle1.getRout('css/bootstrap-icons/bootstrap-icons.css'),
            ScriptStyle1.getRout('lib/animate/animate.min.css'),
            ScriptStyle1.getRout('lib/owlcarousel/assets/owl.carousel.min.css'),
            ScriptStyle1.getRout('css/bootstrap.min.css'),
            ScriptStyle1.getRout('css/style.css'),
        ]).then();
        gvc.addMtScript(["https://code.jquery.com/jquery-3.4.1.min.js",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"].map((dd) => {
            return { src: dd };
        }), () => {
            try {
                widget.refreshComponent();
            }
            catch (e) {
            }
        }, () => {
        });
        gvc.addMtScript([
            "greenhost.js",
            "lib/wow/wow.min.js",
            "lib/easing/easing.min.js",
            "lib/waypoints/waypoints.min.js",
            "lib/counterup/counterup.min.js",
            "lib/owlcarousel/owl.carousel.min.js",
            "js/main.js",
        ].map(((dd) => {
            return { src: ScriptStyle1.getRout(dd) };
        })), () => {
            try {
                widget.refreshComponent();
            }
            catch (e) {
            }
        }, () => {
        });
    }
    static recursive(r, first) {
        var h = "";
        if (r.list === undefined) {
            h += `
              <li>
                <a
                  class="${first ? "nav-link" : ""} scrollto"
                  onclick=""
                  style="cursor:pointer"
                  data-hash=${r.link}
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
                r.list.map((r2) => (tmp += ScriptStyle1.recursive(r2)));
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
            else if (size == "fa") {
                return `fas fa-link`;
            }
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
            if (size == "fa") {
                return `fab fa-${returnString.toLowerCase()}`;
            }
            else {
                return `${size} ${size}l-${returnString.toLowerCase()}`;
            }
        }
        else {
            if (size == "bi")
                return `bi bi-link-45deg`;
            else if (size == "bx")
                return `bx bx-link-alt`;
            else if (size == "fa")
                return `fas fa-link`;
        }
        return "";
    }
    static swapArr(arr, index1, index2) {
        const data = arr[index1];
        arr.splice(index1, 1);
        arr.splice(index2, 0, data);
    }
}
