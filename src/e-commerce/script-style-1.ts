import {HtmlJson} from "../glitterBundle/plugins/plugin-creater.js";

export class ScriptStyle1{
    public static   hi: boolean = false;
    public static  getRout(link: string) {
        return new URL('./' + link, import.meta.url).href;
    }
    public static initialScript(gvc: any, widget: HtmlJson) {
        if (ScriptStyle1.hi) {
            return
        }
        ScriptStyle1.hi = true;

        (window as any).mode = 'dark';
        (window as any).root = document.getElementsByTagName('html')[0];
        (window as any).root.classList.add('dark-mode');
        gvc.addStyleLink([
            ScriptStyle1.getRout("assets/vendor/bootstrap/css/bootstrap.min.css"),
            ScriptStyle1.getRout("assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css"),
            ScriptStyle1.getRout("assets/fonts/iconic/css/material-design-iconic-font.min.css"),
            ScriptStyle1.getRout("assets/fonts/linearicons-v1.0.0/icon-font.min.css"),
            ScriptStyle1.getRout("assets/vendor/animate/animate.css"),
            ScriptStyle1.getRout("assets/vendor/css-hamburgers/hamburgers.min.css"),
            ScriptStyle1.getRout("assets/vendor/animsition/css/animsition.min.css"),
            ScriptStyle1.getRout("assets/vendor/select2/select2.min.css")
        ]).then()
        gvc.addMtScript(["https://cdn.jsdelivr.net/npm/sweetalert2@11"], () => {
            try {
                widget.refreshComponent()
            } catch (e) {
            }

        }, () => {

        })
        gvc.addMtScript([
            "../glitterBundle/ControlInstance.js",
            "dataAPI.js",
            "assets/vendor/js/homeTemp.js",
            "assets/vendor/js/cozahtml.js",
            "coza.js",
            'assets/vendor/jquery/jquery-3.2.1.min.js',
            'assets/js/main.js',
            "assets/vendor/animsition/js/animsition.min.js",
            "assets/vendor/bootstrap/js/popper.js",
            "assets/vendor/bootstrap/js/bootstrap.min.js",
            "assets/vendor/select2/select2.min.js",
            "assets/vendor/daterangepicker/moment.min.js",
            "assets/vendor/daterangepicker/daterangepicker.js",
            "assets/vendor/slick/slick.min.js",
            "assets/js/slick-custom.js",
            "assets/vendor/parallax100/parallax100.js",
            "assets/vendor/MagnificPopup/jquery.magnific-popup.min.js",
            "assets/vendor/isotope/isotope.pkgd.min.js",
            "assets/vendor/sweetalert/sweetalert.min.js",
            "assets/vendor/perfect-scrollbar/perfect-scrollbar.min.js",
        ].map(((dd)=>{
            return   {src: ScriptStyle1.getRout(dd)}
        })), () => {
            try {
                widget.refreshComponent()
            } catch (e) {
            }

        }, () => {

        })
    }
    public static recursive(r:any, first?:any) {
        var h = "";
        if (r.list === undefined) {
            h += /*html*/ `
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
        } else {
            h += /*html*/ ` <li class="dropdown">
          <a class="">${r.title}<i class="bi bi-chevron-${first ? "down" : "right"}"></i></a>
          <ul class="">
            ${(()=>{
                var tmp = "";
                r.list.map((r2:any) => (tmp += ScriptStyle1.recursive(r2)));
                return tmp;
            })()}
           
          </ul>
        </li>`;
        }
        return h;
    }
    public static  urlIcon(link:string , size:string){

        if (link == "#"){
            if (size == "bi")
                return `bi bi-link-45deg`;
            else if (size == "bx")
                return `bx bx-link-alt`;
        }
        let domains = ""
        if (link.match("https://")){
            domains = link.split("https://")[1];
        }else {
            domains = link.split("http://")[1];
        }

        let socialDomain = ["instagram" , "twitter" , "facebook"]
        let returnString = ""

        if (domains.split(".")[0]=="www"){
            returnString = domains.split(".")[1];
        }else {
            returnString = domains.split(".")[0];
        }
        // let split = url.split(".");
        const isMatch = socialDomain.some((domain) => domain.toLowerCase() === returnString.toLowerCase());
        if (isMatch){
            return `${size} ${size}l-${returnString.toLowerCase()}`;
        }else {
            if (size == "bi")
                return `bi bi-link-45deg`;
            else if (size == "bx")
                return `bx bx-link-alt`;
        }
        return ""
    }
    public static  swapArr(arr: any, index1: number, index2: number) {
        const data = arr[index1];
        arr.splice(index1, 1);
        arr.splice(index2, 0, data);
    }
}