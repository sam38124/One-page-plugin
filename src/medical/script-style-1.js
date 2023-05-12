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
            ScriptStyle1.getRout('assets/vendor/boxicons/css/boxicons.css'),
            ScriptStyle1.getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            ScriptStyle1.getRout('assets/vendor/lightgallery/css/lightgallery-bundle.min.css'),
            ScriptStyle1.getRout('assets/css/theme.min.css'),
            ScriptStyle1.getRout('assets/css/style.css')
        ]).then();
        gvc.addMtScript([
            "assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js",
            "assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js",
            "assets/vendor/rellax/rellax.min.js",
            "assets/vendor/swiper/swiper-bundle.min.js",
            "assets/vendor/lightgallery/lightgallery.min.js",
            "assets/vendor/lightgallery/plugins/fullscreen/lg-fullscreen.min.js",
            'assets/vendor/lightgallery/plugins/zoom/lg-zoom.min.js',
            'assets/vendor/lightgallery/plugins/video/lg-video.min.js',
            'assets/js/theme.min.js'
        ].map(((dd) => {
            return { src: ScriptStyle1.getRout(dd) };
        })), () => {
            try {
                let mode = window.localStorage.getItem('mode'), root = document.getElementsByTagName('html')[0];
                if (mode !== null && mode === 'dark') {
                    root.classList.add('dark-mode');
                }
                else {
                    root.classList.remove('dark-mode');
                }
                (function () {
                    window.onload = function () {
                        const preloader = document.querySelector('.page-loading');
                        preloader.classList.remove('active');
                        setTimeout(function () {
                            preloader.remove();
                        }, 1000);
                    };
                })();
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
          <li class="${first ? "nav-link " : "dropdown-item"}">
            <div
              class=""
              onclick=""
             
              style="cursor:pointer"
            >
              ${r.title}
            </div>
          </li>
        `;
        }
        else {
            console.log("------------------------");
            console.log("test");
            h += ` 
            <li class="nav-item dropdown">
                <div class="nav-link dropdown-toggle">${r.title}</div>
                <ul class="dropdown-menu">
                    ${(() => {
                let tmp = "";
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
