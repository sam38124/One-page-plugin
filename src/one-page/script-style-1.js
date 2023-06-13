export class ScriptStyle1 {
    static style = "dark-mode";
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
        gvc.addStyleLink([
            ScriptStyle1.getRout('assets/vendor/boxicons/css/boxicons.min.css'),
            ScriptStyle1.getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            'https://unpkg.com/aos@next/dist/aos.css',
            ScriptStyle1.getRout('assets/css/theme.min.css'),
            ScriptStyle1.getRout('app.css'),
        ]).then(() => {
            window.root.classList.remove('dark-mode');
            window.root.classList.remove('light-mode');
            window.root.classList.add(ScriptStyle1.style);
        });
        gvc.addMtScript([
            { src: ScriptStyle1.getRout(`assets/js/isotope.pkgd.min.js`) },
            { src: ScriptStyle1.getRout(`assets/js/tgs-player.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/rellax/rellax.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/jarallax/dist/jarallax.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/swiper/swiper-bundle.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/shufflejs/dist/shuffle.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/lightgallery/lightgallery.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/lightgallery/plugins/fullscreen/lg-fullscreen.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/lightgallery/plugins/zoom/lg-zoom.min.js`) },
            { src: ScriptStyle1.getRout(`assets/vendor/lightgallery/plugins/video/lg-video.min.js`) },
            { src: ScriptStyle1.getRout(`assets/js/theme.min.js`) },
            { src: 'https://kit.fontawesome.com/02e2dc09e3.js' }
        ], () => {
            try {
                widget.refreshComponent();
            }
            catch (e) {
            }
        }, () => {
            widget.refreshComponent();
        });
    }
    static swapArr(arr, index1, index2) {
        const data = arr[index1];
        arr.splice(index1, 1);
        arr.splice(index2, 0, data);
    }
}
