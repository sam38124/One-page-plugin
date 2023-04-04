import { Plugin } from '../glitterBundle/plugins/plugin-creater.js';
Plugin.create(import.meta.url, (glitter, editMode) => {
    function getRout(link) {
        return new URL('./' + link, import.meta.url).href;
    }
    const $ = glitter.$;
    let hi = false;
    function initialScript(gvc, widget) {
        if (hi) {
            return;
        }
        hi = true;
        window.mode = 'dark';
        window.root = document.getElementsByTagName('html')[0];
        window.root.classList.add('dark-mode');
        gvc.addStyleLink([
            getRout('assets/vendor/boxicons/css/boxicons.min.css'),
            getRout('assets/vendor/swiper/swiper-bundle.min.css'),
            'https://unpkg.com/aos@next/dist/aos.css',
            getRout('assets/css/theme.min.css'),
            getRout('app.css'),
        ]).then();
        gvc.addMtScript([
            { src: 'https://kit.fontawesome.com/02e2dc09e3.js' },
            { src: getRout(`assets/js/isotope.pkgd.min.js`) },
            { src: getRout(`assets/js/tgs-player.js`) },
            { src: getRout(`assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js`) },
            { src: getRout(`assets/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js`) },
            { src: getRout(`assets/vendor/jarallax/dist/jarallax.min.js`) },
            { src: getRout(`assets/vendor/swiper/swiper-bundle.min.js`) },
            { src: getRout(`assets/vendor/shufflejs/dist/shuffle.min.js`) },
            { src: getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`) },
            { src: getRout(`assets/vendor/imagesloaded/imagesloaded.pkgd.min.js`) },
            { src: getRout(`assets/js/theme.min.js`) },
            { src: getRout(`assets/js/main.js`) }
        ], () => {
            try {
                widget.refreshComponent();
            }
            catch (e) {
            }
        }, () => {
        });
    }
    return {
        topNav: {
            title: '網站導覽列',
            subContent: '顯示多個超連結與頁面跳轉導覽的區塊．',
            defaultData: {
                nav: {},
            },
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/topNav.js', import.meta.url)),
        },
        topBanner: {
            title: '廣告輪播',
            subContent: '顯示廣告Banner的置頂大圖',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/topBanner.js', import.meta.url)),
        },
        price: {
            title: '服務價位',
            subContent: '顯示服務價位，與瞭解更多的按鈕．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/price.js', import.meta.url)),
        },
        service: {
            title: '服務區塊',
            subContent: '顯示服務區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/service.js', import.meta.url)),
        },
        project: {
            title: '案例參考',
            subContent: '顯示用戶案例參考列表',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/project.js', import.meta.url)),
        },
        client: {
            title: '合作夥伴',
            subContent: '顯示合作夥伴的區塊',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/client.js', import.meta.url)),
        },
        clientService: {
            title: '問答區塊',
            subContent: '提供問答的區塊',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/clientService.js', import.meta.url)),
        },
        aboutUS: {
            title: '關於我們',
            subContent: '顯示關於我們的區塊',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/aboutUS.js', import.meta.url)),
        },
        contactUS: {
            title: '聯絡我們',
            subContent: '顯示聯絡我們的區塊',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/contactUS.js', import.meta.url)),
        },
        footer: {
            title: '底部區塊',
            subContent: '顯示網頁底部區塊',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/footer.js', import.meta.url)),
        },
        serviceDetail: {
            title: '服務區塊',
            subContent: '顯示服務區塊的內容',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/serviceDetail.js', import.meta.url)),
        },
        otherService: {
            title: '其他服務區塊',
            subContent: '顯示其他服務區塊的內容',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/otherService.js', import.meta.url)),
        },
        template: {
            title: "模板瀏覽",
            subContent: '顯示模板瀏覽的內容',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/template.js', import.meta.url)),
        },
        price2: {
            title: '價位區塊',
            subContent: '顯示價位區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/price2.js', import.meta.url)),
        },
        landingTop: {
            title: '頁面介紹區塊',
            subContent: 'APP置頂介紹區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/landingTop.js', import.meta.url)),
        },
        support: {
            title: '支援項目',
            subContent: '列表顯示支援項目區塊．',
            defaultData: {},
            render: Plugin.setComponent(import.meta.url, new URL('./style-1/supportWidget.js', import.meta.url)),
        },
    };
});
