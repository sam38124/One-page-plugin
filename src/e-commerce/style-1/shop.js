import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let shop = {
                        tagList: {
                            tag: [
                                { name: "外套", tag: "a" },
                                { name: "襯衫", tag: "b" },
                                { name: "短褲", tag: "c" },
                                { name: "飾品", tag: "d" },
                                { name: "布偶", tag: "e" },
                            ]
                        },
                        filter: {
                            sort: ["lastest", "price_low", "price_high"],
                            color: [
                                { name: "黑色", code: "#000000" },
                                { name: "灰色", code: "#A9A9A9" },
                                { name: "白色", code: "#E7E7E7" },
                                { name: "紅色", code: "#CE4343" },
                                { name: "褐色", code: "#B69764" },
                                { name: "青色", code: "#7AB9B8" },
                                { name: "藍色", code: "#5278D6" },
                                { name: "橘色", code: "#F59A17" },
                            ],
                        },
                        productList: {
                            product: [
                                {
                                    id: 0,
                                    img: ScriptStyle1.getRout("assets/images/product-01.jpg"),
                                    img_detail: [ScriptStyle1.getRout("assets/images/product-detail-01.jpg")],
                                    name: "產品3",
                                    price: 10,
                                    onAir: "2022-07-01",
                                    tag: ["a", "b"],
                                    color: ["#CE4343", "#B69764", "#F59A17"],
                                    size: ["S", "M", "L", "XL"],
                                    desc: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                    tab: [
                                        {
                                            mode: "def",
                                            tabName: "描述",
                                            data: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                        },
                                        {
                                            mode: "info",
                                            tabName: "資訊",
                                            data: [
                                                { title: "重量", text: "0.79 kg" },
                                                { title: "長寬", text: "110x33x100 cm" },
                                                { title: "材質", text: "60% 純棉" },
                                                { title: "顏色", text: "黑、紅、黃、白、灰" },
                                                { title: "尺寸", text: "S、M、L、XL" },
                                            ],
                                        },
                                        {
                                            mode: "reviews",
                                            tabName: "評論",
                                            data: [
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳盈玫",
                                                    desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                                                    star: 5,
                                                },
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳振鑫",
                                                    desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                                                    star: 3,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    id: 1,
                                    img: ScriptStyle1.getRout("assets/images/product-02.jpg"),
                                    img_detail: [ScriptStyle1.getRout("assets/images/product-detail-01.jpg"), ScriptStyle1.getRout("assets/images/product-detail-02.jpg"), ScriptStyle1.getRout("assets/images/product-detail-03.jpg")],
                                    name: "產品2",
                                    price: 9000,
                                    onAir: "2022-07-10",
                                    tag: ["b"],
                                    color: ["#B69764", "#F59A17"],
                                    size: ["S", "M", "L", "XL"],
                                    desc: "淡紫色宮裝長裙，長及倚地。細長腰帶束住腰身，緩步行走，翩於身後。廣袖輕盈，裙褶翩然，隨意一轉，便如叢中飛蝶。對鏡梳洗，淡妝上臉，女子陰柔之氣盡顯面容",
                                    tab: [
                                        {
                                            mode: "def",
                                            tabName: "描述",
                                            data: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                        },
                                        {
                                            mode: "info",
                                            tabName: "資訊",
                                            data: [
                                                { title: "重量", text: "0.79 kg" },
                                                { title: "長寬", text: "110x33x100 cm" },
                                                { title: "材質", text: "60% 純棉" },
                                                { title: "顏色", text: "黑、紅、黃、白、灰" },
                                                { title: "尺寸", text: "S、M、L、XL" },
                                            ],
                                        },
                                        {
                                            mode: "reviews",
                                            tabName: "評論",
                                            data: [
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳盈玫",
                                                    desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                                                    star: 5,
                                                },
                                                {
                                                    img: "assets/images/avatar-01.jpg",
                                                    name: "陳振鑫",
                                                    desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                                                    star: 3,
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    tab: [
                                        {
                                            mode: "def",
                                            tabName: "描述",
                                            data: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                        },
                                        {
                                            mode: "info",
                                            tabName: "資訊",
                                            data: [
                                                { title: "重量", text: "0.79 kg" },
                                                { title: "長寬", text: "110x33x100 cm" },
                                                { title: "材質", text: "60% 純棉" },
                                                { title: "顏色", text: "黑、紅、黃、白、灰" },
                                                { title: "尺寸", text: "S、M、L、XL" },
                                            ],
                                        },
                                        {
                                            mode: "reviews",
                                            tabName: "評論",
                                            data: [
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳盈玫",
                                                    desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                                                    star: 5,
                                                },
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳振鑫",
                                                    desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                                                    star: 3,
                                                },
                                            ],
                                        },
                                    ],
                                    img: ScriptStyle1.getRout("assets/images/product-03.jpg"),
                                    img_detail: [ScriptStyle1.getRout("assets/images/product-detail-01.jpg"), ScriptStyle1.getRout("assets/images/product-detail-02.jpg")],
                                    name: "產品1",
                                    price: 200,
                                    onAir: "2022-07-02",
                                    tag: ["d"],
                                    color: ["#E7E7E7", "#7AB9B8"],
                                    size: ["S", "M", "L", "XL"],
                                    desc: "隨風流水的靈動，無聲的控訴著時裝的「裝」，同時亦詮釋著服裝的 「簡單和純良」，靜靜的期待著與懂「她」的你一起演繹時尚的故事",
                                },
                                {
                                    id: 3,
                                    tab: [
                                        {
                                            mode: "def",
                                            tabName: "描述",
                                            data: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                        },
                                        {
                                            mode: "info",
                                            tabName: "資訊",
                                            data: [
                                                { title: "重量", text: "0.79 kg" },
                                                { title: "長寬", text: "110x33x100 cm" },
                                                { title: "材質", text: "60% 純棉" },
                                                { title: "顏色", text: "黑、紅、黃、白、灰" },
                                                { title: "尺寸", text: "S、M、L、XL" },
                                            ],
                                        },
                                        {
                                            mode: "reviews",
                                            tabName: "評論",
                                            data: [
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳盈玫",
                                                    desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                                                    star: 5,
                                                },
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳振鑫",
                                                    desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                                                    star: 3,
                                                },
                                            ],
                                        },
                                    ],
                                    img: ScriptStyle1.getRout("assets/images/product-04.jpg"),
                                    name: "產品0",
                                    price: 35,
                                    onAir: "2022-07-07",
                                    tag: ["b", "d"],
                                    color: ["#F59A17", "#A9A9A9", "#000000"],
                                    size: ["S", "M", "L", "XL"],
                                    desc: "剪裁靈感來自於阿拉伯民族服飾， 減少不必要的分割線， 幾何式造型自然營造出體積感和線條",
                                },
                                {
                                    id: 4,
                                    tab: [
                                        {
                                            mode: "def",
                                            tabName: "描述",
                                            data: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                        },
                                        {
                                            mode: "info",
                                            tabName: "資訊",
                                            data: [
                                                { title: "重量", text: "0.79 kg" },
                                                { title: "長寬", text: "110x33x100 cm" },
                                                { title: "材質", text: "60% 純棉" },
                                                { title: "顏色", text: "黑、紅、黃、白、灰" },
                                                { title: "尺寸", text: "S、M、L、XL" },
                                            ],
                                        },
                                        {
                                            mode: "reviews",
                                            tabName: "評論",
                                            data: [
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳盈玫",
                                                    desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                                                    star: 5,
                                                },
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳振鑫",
                                                    desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                                                    star: 3,
                                                },
                                            ],
                                        },
                                    ],
                                    img: ScriptStyle1.getRout("assets/images/product-05.jpg"),
                                    name: "產品0",
                                    price: 49,
                                    onAir: "2022-07-05",
                                    tag: ["a", "b", "c"],
                                    color: [],
                                    size: ["S", "M", "L", "XL"],
                                },
                                {
                                    id: 5,
                                    tab: [
                                        {
                                            mode: "def",
                                            tabName: "描述",
                                            data: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                        },
                                        {
                                            mode: "info",
                                            tabName: "資訊",
                                            data: [
                                                { title: "重量", text: "0.79 kg" },
                                                { title: "長寬", text: "110x33x100 cm" },
                                                { title: "材質", text: "60% 純棉" },
                                                { title: "顏色", text: "黑、紅、黃、白、灰" },
                                                { title: "尺寸", text: "S、M、L、XL" },
                                            ],
                                        },
                                        {
                                            mode: "reviews",
                                            tabName: "評論",
                                            data: [
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳盈玫",
                                                    desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                                                    star: 5,
                                                },
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳振鑫",
                                                    desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                                                    star: 3,
                                                },
                                            ],
                                        },
                                    ],
                                    img: ScriptStyle1.getRout("assets/images/product-06.jpg"),
                                    name: "產品0",
                                    price: 5,
                                    onAir: "2022-07-21",
                                    tag: ["c"],
                                    color: [],
                                    size: ["S", "M", "L", "XL"],
                                },
                                {
                                    id: 6,
                                    tab: [
                                        {
                                            mode: "def",
                                            tabName: "描述",
                                            data: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                        },
                                        {
                                            mode: "info",
                                            tabName: "資訊",
                                            data: [
                                                { title: "重量", text: "0.79 kg" },
                                                { title: "長寬", text: "110x33x100 cm" },
                                                { title: "材質", text: "60% 純棉" },
                                                { title: "顏色", text: "黑、紅、黃、白、灰" },
                                                { title: "尺寸", text: "S、M、L、XL" },
                                            ],
                                        },
                                        {
                                            mode: "reviews",
                                            tabName: "評論",
                                            data: [
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳盈玫",
                                                    desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                                                    star: 5,
                                                },
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳振鑫",
                                                    desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                                                    star: 3,
                                                },
                                            ],
                                        },
                                    ],
                                    img: ScriptStyle1.getRout("assets/images/product-07.jpg"),
                                    name: "產品0",
                                    price: 150,
                                    onAir: "2022-07-15",
                                    tag: ["a"],
                                    color: [],
                                    size: ["S", "M", "L", "XL"],
                                },
                                {
                                    id: 7,
                                    tab: [
                                        {
                                            mode: "def",
                                            tabName: "描述",
                                            data: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                        },
                                        {
                                            mode: "info",
                                            tabName: "資訊",
                                            data: [
                                                { title: "重量", text: "0.79 kg" },
                                                { title: "長寬", text: "110x33x100 cm" },
                                                { title: "材質", text: "60% 純棉" },
                                                { title: "顏色", text: "黑、紅、黃、白、灰" },
                                                { title: "尺寸", text: "S、M、L、XL" },
                                            ],
                                        },
                                        {
                                            mode: "reviews",
                                            tabName: "評論",
                                            data: [
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳盈玫",
                                                    desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                                                    star: 5,
                                                },
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳振鑫",
                                                    desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                                                    star: 3,
                                                },
                                            ],
                                        },
                                    ],
                                    img: ScriptStyle1.getRout("assets/images/product-08.jpg"),
                                    name: "產品0",
                                    price: 4500,
                                    onAir: "2022-07-14",
                                    tag: ["b"],
                                    color: [],
                                    size: ["S", "M", "L", "XL"],
                                },
                                {
                                    id: 8,
                                    tab: [
                                        {
                                            mode: "def",
                                            tabName: "描述",
                                            data: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                        },
                                        {
                                            mode: "info",
                                            tabName: "資訊",
                                            data: [
                                                { title: "重量", text: "0.79 kg" },
                                                { title: "長寬", text: "110x33x100 cm" },
                                                { title: "材質", text: "60% 純棉" },
                                                { title: "顏色", text: "黑、紅、黃、白、灰" },
                                                { title: "尺寸", text: "S、M、L、XL" },
                                            ],
                                        },
                                        {
                                            mode: "reviews",
                                            tabName: "評論",
                                            data: [
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳盈玫",
                                                    desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                                                    star: 5,
                                                },
                                                {
                                                    img: "assets/images/avatar-01.jpg",
                                                    name: "陳振鑫",
                                                    desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                                                    star: 3,
                                                },
                                            ],
                                        },
                                    ],
                                    img: ScriptStyle1.getRout("assets/images/product-09.jpg"),
                                    name: "產品0",
                                    price: 800,
                                    onAir: "2022-07-09",
                                    tag: [],
                                    color: [],
                                    size: ["S", "M", "L", "XL"],
                                },
                                {
                                    id: 9,
                                    img: ScriptStyle1.getRout("assets/images/product-10.jpg"),
                                    name: "產品9",
                                    price: 65,
                                    onAir: "2022-07-20",
                                    tag: ["b"],
                                    color: [],
                                    size: ["S", "M", "L", "XL"],
                                    tab: [
                                        {
                                            mode: "def",
                                            tabName: "描述",
                                            data: "碧綠的翠煙衫，散花水霧綠草百褶裙，身披翠水薄煙紗，肩若削成腰若約素，肌若凝脂氣若幽蘭。嬌媚無骨入豔三分",
                                        },
                                        {
                                            mode: "info",
                                            tabName: "資訊",
                                            data: [
                                                { title: "重量", text: "0.79 kg" },
                                                { title: "長寬", text: "110x33x100 cm" },
                                                { title: "材質", text: "60% 純棉" },
                                                { title: "顏色", text: "黑、紅、黃、白、灰" },
                                                { title: "尺寸", text: "S、M、L、XL" },
                                            ],
                                        },
                                        {
                                            mode: "reviews",
                                            tabName: "評論",
                                            data: [
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳盈玫",
                                                    desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                                                    star: 5,
                                                },
                                                {
                                                    img: ScriptStyle1.getRout("assets/images/avatar-01.jpg"),
                                                    name: "陳振鑫",
                                                    desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                                                    star: 3,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ]
                        },
                    };
                    function quickViewJS() {
                        $(".wrap-slick3").each(function () {
                            $(this)
                                .find(".slick3")
                                .slick({
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                fade: true,
                                infinite: true,
                                autoplay: false,
                                autoplaySpeed: 6000,
                                arrows: true,
                                appendArrows: $(this).find(".wrap-slick3-arrows"),
                                prevArrow: '<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
                                nextArrow: '<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
                                dots: true,
                                appendDots: $(this).find(".wrap-slick3-dots"),
                                dotsClass: "slick3-dots",
                                customPaging: function (slick, index) {
                                    var portrait = $(slick.$slides[index]).data("thumb");
                                    return '<img src=" ' + portrait + ' "/><div class="slick3-dot-overlay"></div>';
                                },
                            });
                        });
                        $(".js-select2").each(function () {
                            $(this).select2({
                                minimumResultsForSearch: 20,
                                dropdownParent: $(this).next(".dropDownSelect2"),
                            });
                        });
                        $(".btn-num-product-down").on("click", function () {
                            var numProduct = Number($(this).next().val());
                            if (numProduct > 0)
                                $(this)
                                    .next()
                                    .val(numProduct - 1);
                        });
                        $(".btn-num-product-up").on("click", function () {
                            var numProduct = Number($(this).prev().val());
                            $(this)
                                .prev()
                                .val(numProduct + 1);
                        });
                        $(".color-select").on("click", function () {
                            $(".color-select").each(function () {
                                $(this).removeClass("color-selected bor20");
                            });
                            $(this).addClass("color-selected bor20");
                        });
                    }
                    function addcart() {
                        $(".js-addcart-detail").each(function () {
                            var nameProduct = $(this).parent().parent().parent().parent().find(".js-name-detail").html();
                            $(this).on("click", function () {
                                swal(nameProduct, "已加入購物車！", "success");
                                var addProd = {
                                    id: $(".dataID").html(),
                                    name: nameProduct,
                                    img: $(".img-selected").data("img"),
                                    size: $(".js-select2").val(),
                                    color: $(".color-selected").data("tooltip"),
                                    count: $(".num-product").val(),
                                    price: $(".price-selected").data("price"),
                                };
                                gvc.notifyDataChange([`cartNoti`, 'cartPage']);
                            });
                        });
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <div class="wrap-modal1 js-modal1 p-t-60 p-b-20">
                              <div class="overlay-modal1 js-hide-modal1"></div>

                              <div class="container">
                                <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
                                  <button class="how-pos3 hov3 trans-04 js-hide-modal1">
                                    <img src="${ScriptStyle1.getRout('assets/images/icons/icon-close.png')}" alt="CLOSE" />
                                  </button>
                    
                                  <div class="row" id="quickView">
                                    ${gvc.bindView({
                                bind: "quickView",
                                view: () => (``),
                                onCreate: () => {
                                    quickViewJS();
                                    addcart();
                                }
                            })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <section class="bg0 p-t-23 p-b-140">
                              <div class="container">
                                <div class="flex-w flex-sb-m p-b-52">
                                  <!-- Tag List -->
                                  <div class="flex-w flex-l-m filter-tope-group m-tb-10">
                                    <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter="*">所有商品</button>
                                    ${glitter.print(function () {
                                var tmp = "";
                                shop.tagList.tag.map((t) => {
                                    tmp += `<button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".${t.tag}">
                                          ${t.name}
                                        </button>`;
                                });
                                return tmp;
                            })}
                                  </div>
                    
                                  <!-- Button -->
                                  <div class="flex-w flex-c-m m-tb-10">
                                    <div class="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
                                      <i class="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                                      <i class="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                      篩選
                                    </div>
                                    <div class="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
                                      <i class="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                                      <i class="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                      搜尋
                                    </div>
                                  </div>
                    
                                  <!-- Search product -->
                                  <div class="dis-none panel-search w-full p-t-10 p-b-15">
                                    <div class="bor8 dis-flex p-l-15">
                                      <button class="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                                        <i class="zmdi zmdi-search"></i>
                                      </button>
                                      <input
                                        class="mtext-107 cl2 size-114 plh2 p-r-15"
                                        type="text"
                                        name="search-product"
                                        placeholder="搜尋"
                                      />
                                    </div>
                                  </div>
                    
                                  <!-- Filter -->
                                  <div class="dis-none panel-filter w-full p-t-10">
                                    <div class="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                                      ${glitter.print(function () {
                                var tmp = "";
                                var theTitle = {
                                    sort: "排序",
                                    categories: "類別",
                                    color: "顏色",
                                };
                                Object.keys(shop.filter).map((t, i) => {
                                    tmp += ` <div class="filter-col3 p-r-15 p-b-27">
                                            <div class="mtext-102 cl2 p-b-15">${theTitle[t]}</div>
                                            <ul class="filter-det fil${i}">
                                              ${glitter.print(function () {
                                        var tmp = "";
                                        return tmp;
                                    })}
                                            </ul>
                                          </div>`;
                                });
                                return tmp;
                            })}
                                    </div>
                                  </div>
                                </div>
                    
                                <!-- Product grid -->
                                <div class="row isotope-grid">
                                  ${glitter.print(function () {
                                var tmp = "";
                                shop.productList.product.map((p) => {
                                    tmp += `
                                        <div
                                          class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${glitter.print(function () {
                                        var tmp = "";
                                        p.tag.map((t) => (tmp += t + ` `)), p.color.map((t) => (tmp += t.replace("#", "") + ` `));
                                        return tmp;
                                    })}"
                                        >
                                          <div class="d-none">
                                            ${glitter.print(function () {
                                        var tmp = "";
                                        Object.keys(p).map((k) => {
                                            return ``;
                                        });
                                        return tmp;
                                    })}
                                          </div>
                                          <!-- Block2 -->
                                          <div class="block2">
                                            <div class="block2-pic hov-img0">
                                              <img src="${p.img}" alt="IMG-PRODUCT" />
                    
                                              <a
                                                class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                                                onclick=""
                                              >
                                                詳細介紹
                                              </a>
                                            </div>
                    
                                            <div class="block2-txt flex-w flex-t p-t-14">
                                              <div class="block2-txt-child1 flex-col-l">
                                                <a
                                                  class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                                                  onclick=""
                                                >
                                                  ${p.name}
                                                </a>
                                                <span class="stext-105 cl3 price-item">$${p.price.toLocaleString()}</span>
                                              </div>
                    
                                              <div class="block2-txt-child2 flex-r p-t-3">
                                                <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                                                  <img class="icon-heart1 dis-block trans-04" src="${ScriptStyle1.getRout('assets/images/icons/icon-heart-01.png')}" alt="ICON" />
                                                  <img class="icon-heart2 dis-block trans-04 ab-t-l" src="${ScriptStyle1.getRout('assets/images/icons/icon-heart-02.png')}" alt="ICON" />
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      `;
                                });
                                return tmp;
                            })}
                                </div>
                    
                                <!-- Load more -->
                                <div class="flex-c-m flex-w w-full p-t-45">
                                  <a class="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"> 更多商品 </a>
                                </div>
                              </div>
                            </section>
                           `;
                        }, divCreate: {},
                        onCreate: () => {
                            gvc.addMtScript([
                                "assets/vendor/isotope/isotope.pkgd.min.js",
                                "assets/vendor/animsition/js/animsition.min.js",
                            ].map(((dd) => {
                                return { src: ScriptStyle1.getRout(dd) };
                            })), () => {
                                try {
                                    (function ($) {
                                        ("use strict");
                                        $(".js-show-modal-search").on("click", function () {
                                            $(".modal-search-header").addClass("show-modal-search");
                                            $(this).css("opacity", "0");
                                        });
                                        $(".js-hide-modal-search").on("click", function () {
                                            $(".modal-search-header").removeClass("show-modal-search");
                                            $(".js-show-modal-search").css("opacity", "1");
                                        });
                                        $(".container-search-header").on("click", function (e) {
                                            e.stopPropagation();
                                        });
                                        var $topeContainer = $(".isotope-grid");
                                        var $filter = $(".filter-tope-group");
                                        var $filter_det = $(".filter-det");
                                        $filter.each(function () {
                                            $filter.on("click", "button", function () {
                                                var filterValue = $(this).attr("data-filter");
                                                $topeContainer.isotope({ filter: filterValue });
                                            });
                                        });
                                        $filter_det.each(function () {
                                            $filter_det.on("click", "button", function () {
                                                var fi = $(this).attr("data-filter");
                                                var sb = $(this).attr("data-sort-by");
                                                var as = $(this).attr("data-sort-ascend") === "true";
                                                if (fi !== undefined) {
                                                    $topeContainer.isotope({ filter: fi });
                                                }
                                                else if (sb !== undefined) {
                                                    $topeContainer.isotope({ sortBy: sb, sortAscending: as });
                                                }
                                            });
                                        });
                                        $(window).on("load", function () {
                                            var $grid = $topeContainer.each(function () {
                                                $(this).isotope({
                                                    itemSelector: ".isotope-item",
                                                    layoutMode: "fitRows",
                                                    percentPosition: true,
                                                    animationEngine: "best-available",
                                                    masonry: {
                                                        columnWidth: ".isotope-item",
                                                    },
                                                    getSortData: {
                                                        price: ".price-item parseInt",
                                                        date: function (e) {
                                                            return Date.parse($(e).find(".onAir-item").text());
                                                        },
                                                    },
                                                });
                                            });
                                        });
                                        var isotopeButton = $(".filter-tope-group button");
                                        $(isotopeButton).each(function () {
                                            $(this).on("click", function () {
                                                for (var i = 0; i < isotopeButton.length; i++) {
                                                    $(isotopeButton[i]).removeClass("how-active1");
                                                }
                                                $(".filter-det").map((i) => $(`.fil${i} button`).removeClass("how-active1"));
                                                $(this).addClass("how-active1");
                                            });
                                        });
                                        $(".filter-det").map((i) => {
                                            var detButton = $(`.fil${i} button`);
                                            $(detButton).each(function () {
                                                $(this).on("click", function () {
                                                    for (var i = 0; i < detButton.length; i++) {
                                                        $(detButton[i]).removeClass("how-active1");
                                                    }
                                                    $(this).addClass("how-active1");
                                                });
                                            });
                                        });
                                        $(".js-show-filter").on("click", function () {
                                            $(this).toggleClass("show-filter");
                                            $(".panel-filter").slideToggle(400);
                                            if ($(".js-show-search").hasClass("show-search")) {
                                                $(".js-show-search").removeClass("show-search");
                                                $(".panel-search").slideUp(400);
                                            }
                                        });
                                        $(".js-show-search").on("click", function () {
                                            $(this).toggleClass("show-search");
                                            $(".panel-search").slideToggle(400);
                                            if ($(".js-show-filter").hasClass("show-filter")) {
                                                $(".js-show-filter").removeClass("show-filter");
                                                $(".panel-filter").slideUp(400);
                                            }
                                        });
                                    })(jQuery);
                                }
                                catch (e) {
                                }
                            }, () => {
                            });
                        }
                    });
                },
                editor: () => {
                    return ``;
                }
            };
        },
    };
});
