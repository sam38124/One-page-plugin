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
        window.root = document.getElementsByTagName('html')[0];
        window.root.classList.add('dark-mode');
        gvc.addStyleLink(this.getRout('assets/vendor/font-awesome/css/all.min.css'));
        gvc.addStyleLink(this.getRout(`assets/css/icons.min.css`));
        gvc.addStyleLink(this.getRout(`assets/css/app.min.css`));
        gvc.addStyleLink(this.getRout(`css/main.css`));
        gvc.addMtScript([
            { src: this.getRout('assets/js/Sortable.min.js') },
            { src: this.getRout('assets/js/jquery-sortable.js') },
            { src: 'https://kit.fontawesome.com/02e2dc09e3.js' },
            { src: 'https://momentjs.com/downloads/moment-with-locales.min.js' },
            { src: ScriptStyle1.getRout(`assets/js/vendor.js`) },
            { src: ScriptStyle1.getRout(`assets/js/app.min.js`) }
        ], () => {
            document.querySelector('body')?.setAttribute('data-layout-color', 'dark');
            document.querySelector('body')?.setAttribute('data-leftbar-theme', 'dark');
            document.querySelector('body')?.setAttribute('data-rightbar-onstart', 'true');
            widget.refreshComponent();
        }, (error) => () => {
        });
    }
    static swapArr(arr, index1, index2) {
        const data = arr[index1];
        arr.splice(index1, 1);
        arr.splice(index2, 0, data);
    }
}
