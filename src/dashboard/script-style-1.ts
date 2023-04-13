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
            ScriptStyle1.getRout('assets/images/favicon.ico'),
            ScriptStyle1.getRout('assets/css/vendor/jquery-jvectormap-1.2.2.css'),
            ScriptStyle1.getRout('assets/css/icons.min.css'),
            ScriptStyle1.getRout('assets/css/app.min.css'),
            ScriptStyle1.getRout('assets/css/app-dark.min.css'),
        ]).then()
        gvc.addMtScript([
            "assets/js/vendor/apexcharts.min.js",
            "assets/js/vendor.min.js",
            "assets/js/app.min.js",
            "assets/js/vendor/Chart.bundle.min.js",
            "assets/js/vendor/jquery-jvectormap-1.2.2.min.js",
            "assets/js/vendor/jquery-jvectormap-world-mill-en.js",
            "dashboard.js"
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