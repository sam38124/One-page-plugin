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
            ScriptStyle1.getRout('assets/images/favicon.ico'),
            ScriptStyle1.getRout('assets/css/vendor/jquery-jvectormap-1.2.2.css'),
            ScriptStyle1.getRout('assets/css/icons.min.css'),
            ScriptStyle1.getRout('assets/css/app.min.css'),
            ScriptStyle1.getRout('assets/css/app-dark.min.css'),
        ]).then();
        gvc.addMtScript([
            "assets/js/vendor/apexcharts.min.js",
            "assets/js/vendor.min.js",
            "assets/js/app.min.js",
            "assets/js/vendor/Chart.bundle.min.js",
            "assets/js/vendor/jquery-jvectormap-1.2.2.min.js",
            "assets/js/vendor/jquery-jvectormap-world-mill-en.js",
            "dashboard.js"
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
