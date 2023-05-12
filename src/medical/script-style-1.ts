import {HtmlJson} from "../glitterBundle/plugins/plugin-creater.js";
import {TriggerEvent} from "../glitterBundle/plugins/trigger-event.js";

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
            ScriptStyle1.getRout('assets/vendor/boxicons/css/boxicons.css'),
            ScriptStyle1.getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            ScriptStyle1.getRout('assets/vendor/lightgallery/css/lightgallery-bundle.min.css'),

            ScriptStyle1.getRout('assets/css/theme.min.css'),
            ScriptStyle1.getRout('assets/css/style.css')
        ]).then()
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
        ].map(((dd)=>{
            return   {src: ScriptStyle1.getRout(dd)}
        })), () => {
            try {
                let mode = window.localStorage.getItem('mode'),
                    root = document.getElementsByTagName('html')[0];
                if (mode !== null && mode === 'dark') {
                    root.classList.add('dark-mode');
                } else {
                    root.classList.remove('dark-mode');
                }
                (function () {
                    window.onload = function () {
                        const preloader = document.querySelector('.page-loading');
                        // @ts-ignore
                        preloader.classList.remove('active');
                        setTimeout(function () {
                            // @ts-ignore
                            preloader.remove();
                        }, 1000);
                    };
                })();
                widget.refreshComponent()

            } catch (e) {
            }

        }, () => {

        })
    }
    public static recursive(r:any, first?:boolean) {
        var h = "";
        if (r.list === undefined) {
            h += /*html*/ `
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
        } else {
            console.log("------------------------")
            console.log("test")
            h += /*html*/ ` 
            <li class="nav-item dropdown">
                <div class="nav-link dropdown-toggle">${r.title}</div>
                <ul class="dropdown-menu">
                    ${(()=>{
                        let tmp = "";
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