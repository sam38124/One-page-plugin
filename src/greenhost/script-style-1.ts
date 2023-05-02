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
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css',
            ScriptStyle1.getRout('css/bootstrap-icons/bootstrap-icons.css'),
            ScriptStyle1.getRout('lib/animate/animate.min.css'),
            ScriptStyle1.getRout('lib/owlcarousel/assets/owl.carousel.min.css'),
            ScriptStyle1.getRout('css/bootstrap.min.css'),
            ScriptStyle1.getRout('css/style.css'),
        ]).then()

        gvc.addMtScript(["https://code.jquery.com/jquery-3.4.1.min.js",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"].map((dd)=>{
                return  {src: dd}
        }),() => {
            try {
                widget.refreshComponent()
            } catch (e) {

            }

        }, () => {

        })

        gvc.addMtScript([
            "greenhost.js",
            "lib/wow/wow.min.js",
            "lib/easing/easing.min.js",
            "lib/waypoints/waypoints.min.js",
            "lib/counterup/counterup.min.js",
            "lib/owlcarousel/owl.carousel.min.js",
            "js/main.js",
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
            else if (size == "fa"){
                return `fas fa-link`;
            }
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
            if (size=="fa"){
                return `fab fa-${returnString.toLowerCase()}`;
            }else{
                return `${size} ${size}l-${returnString.toLowerCase()}`;
            }
        }else {
            if (size == "bi")
                return `bi bi-link-45deg`;
            else if (size == "bx")
                return `bx bx-link-alt`;
            else if (size == "fa")
                return `fas fa-link`;
        }
        return ""
    }
    public static  swapArr(arr: any, index1: number, index2: number) {
        const data = arr[index1];
        arr.splice(index1, 1);
        arr.splice(index2, 0, data);
    }
}