import {HtmlJson} from "../glitterBundle/plugins/plugin-creater.js";

export class ScriptStyle1 {
    public static hi: boolean = false;

    public static getRout(link: string) {
        return new URL('./' + link, import.meta.url).href;
    }

    public static initialScript(gvc: any, widget: HtmlJson) {
        if (ScriptStyle1.hi) {
            return;
        }
        ScriptStyle1.hi = true;
        (window as any).root = document.getElementsByTagName('html')[0];
        (window as any).root.classList.add('dark-mode');
        gvc.addStyleLink(this.getRout('assets/vendor/font-awesome/css/all.min.css'));
        gvc.addStyleLink(this.getRout(`assets/css/icons.min.css`));
        gvc.addStyleLink(this.getRout(`assets/css/app.min.css`));
        gvc.addStyleLink(this.getRout(`css/main.css`));
        gvc.addMtScript(
            [
                {src: this.getRout('assets/js/Sortable.min.js')},
                {src:this.getRout('assets/js/jquery-sortable.js')},
                {src: 'https://kit.fontawesome.com/02e2dc09e3.js'},
                {src: 'https://momentjs.com/downloads/moment-with-locales.min.js'},
                {src: ScriptStyle1.getRout(`assets/js/vendor.js`)},
                {src: ScriptStyle1.getRout(`assets/js/app.min.js`)}
            ],
            () => {
                document.querySelector('body')?.setAttribute('data-layout-color', 'dark');
                document.querySelector('body')?.setAttribute('data-leftbar-theme', 'dark');
                // document.querySelector('body')?.setAttribute('data-layout-mode', 'boxed');
                document.querySelector('body')?.setAttribute('data-rightbar-onstart', 'true');
                // funnel.ensure(document.querySelector("link[href='assets/css/app.min.css']")).id = 'app-style';
                widget.refreshComponent()
            },
            (error: any) => () => {

            }
        );
    }

    public static swapArr(arr: any, index1: number, index2: number) {
        const data = arr[index1];
        arr.splice(index1, 1);
        arr.splice(index2, 0, data);
    }
}