import {HtmlJson} from "../glitterBundle/plugins/plugin-creater.js";

export class ScriptStyle1{
    public static style="dark-mode"
    public static   hi: boolean = false;
    public static  getRout(link: string) {
        return new URL('./' + link, import.meta.url).href;
    }
    public static initialScript(gvc: any, widget: HtmlJson) {
        if (ScriptStyle1.hi) {
            return;
        }
        ScriptStyle1.hi = true;
        (window as any).root = document.getElementsByTagName('html')[0];
        gvc.addStyleLink([
            ScriptStyle1.getRout('assets/vendor/boxicons/css/boxicons.min.css'),
            ScriptStyle1.getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            'https://unpkg.com/aos@next/dist/aos.css',
            ScriptStyle1.getRout('assets/css/theme.min.css'),
            ScriptStyle1.getRout('app.css'),
        ]).then(()=>{
            (window as any).root.classList.remove('dark-mode');
            (window as any).root.classList.remove('light-mode');
            (window as any).root.classList.add(ScriptStyle1.style)
        });
        gvc.addMtScript(
            [
                {src: 'https://kit.fontawesome.com/02e2dc09e3.js'},
                {src: ScriptStyle1.getRout(`assets/js/isotope.pkgd.min.js`)},
                {src: ScriptStyle1.getRout(`assets/js/tgs-player.js`)},
                {src: ScriptStyle1.getRout(`assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js`)},
                {src: ScriptStyle1.getRout(`assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js`)},
                {src: ScriptStyle1.getRout(`assets/vendor/jarallax/dist/jarallax.min.js`)},
                {src: ScriptStyle1.getRout(`assets/vendor/swiper/swiper-bundle.min.js`)},
                {src: ScriptStyle1.getRout(`assets/vendor/shufflejs/dist/shuffle.min.js`)},
                {src: ScriptStyle1.getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`)},
                {src: ScriptStyle1.getRout(`assets/js/theme.min.js`)},
                {src: ScriptStyle1.getRout(`assets/js/main.js`)}
            ],
            () => {
                try {
                    widget.refreshComponent();
                } catch (e) {
                }
            },
            () => {
            }
        );
    }
    public static  swapArr(arr: any, index1: number, index2: number) {
        const data = arr[index1];
        arr.splice(index1, 1);
        arr.splice(index2, 0, data);
    }
}