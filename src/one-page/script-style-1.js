export class ScriptStyle1 {
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
            ScriptStyle1.getRout('assets/vendor/boxicons/css/boxicons.min.css'),
            ScriptStyle1.getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            'https://unpkg.com/aos@next/dist/aos.css',
            ScriptStyle1.getRout('assets/css/theme.min.css'),
            ScriptStyle1.getRout('app.css'),
        ]).then();
        gvc.addMtScript([
            { src: 'https://kit.fontawesome.com/02e2dc09e3.js' },
            { src: ScriptStyle1.getRout(`assets/js/isotope.pkgd.min.js`) },
            { src: ScriptStyle1.getRout(`assets/js/tgs-player.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/jarallax/dist/jarallax.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/swiper/swiper-bundle.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/shufflejs/dist/shuffle.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`) },
            { src: ScriptStyle1.getRout(`assets/js/theme.min.js`) },
            { src: ScriptStyle1.getRout(`assets/js/main.js`) }
        ], () => {
            try {
                widget.refreshComponent();
            }
            catch (e) {
            }
        }, () => {
        });
    }
    static swapArr(arr, index1, index2) {
        const data = arr[index1];
        arr.splice(index1, 1);
        arr.splice(index2, 0, data);
    }
}
ScriptStyle1.hi = false;