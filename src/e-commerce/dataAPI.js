glitter.api = {
  debugMode: true,
  getData: function (array, obj) {
    if (glitter.api.debugMode) {
      var section = {};
      array.map((a) => {
        if (obj && obj.path.includes(a)) {
          var temp = sourceData;
          obj.path.map((x) => (temp = temp[x]));
          section[a] = temp.find((s) => s[obj.key] == obj.value);
        } else {
          section[a] = sourceData[a];
        }
      });
      return section;
    } else {
    }
  },
};

var sourceData = {
  base: {},
  nav: {
    logo: "images/icons/logo-01.png",
    menu: [
      {
        name: "MEN",
        link: ["#"],
        list: [
          {
            name: "上衣",
            link: ["#"],
            list: [
              { name: "上衣", link: ["#"], hot: true },
              { name: "襯衫", link: ["#"] },
              { name: "外套", link: ["#"] },
            ],
          },
          {
            name: "襯衫",
            link: ["#"],
            hot: true,
          },
          {
            name: "外套",
            link: ["#"],
            list: [
              { name: "上衣", link: ["#"], hot: true },
              { name: "襯衫", link: ["#"], hot: true },
              { name: "外套", link: ["#"], hot: true },
            ],
          },
        ],
        hot: true,
      },
      {
        name: "WOMEN",
        link: ["#"],
        list: [
          { name: "聯名印花短T", link: ["#"] },
          { name: "外套", link: ["#"] },
          { name: "洋裝", link: ["#"] },
        ],
      },
      {
        name: "KIDS",
        link: ["#"],
        list: [
          { name: "上衣", link: ["#"] },
          { name: "外套", link: ["#"] },
          { name: "配件", link: ["#"] },
        ],
      },
      { name: "NEWS", link: ["#"] },
      { name: "CONTACT", link: "contact" },
    ],
  },
  footer: {
    map: [
      {
        title: "類別",
        list: [
          { name: "MEN", link: ["#"] },
          { name: "WOMEN", link: ["#"] },
          { name: "KID", link: ["#"] },
          { name: "NEWS", link: ["#"] },
        ],
      },
      {
        title: "聲明條款",
        list: [
          { name: "購物流程", link: ["#"] },
          { name: "運費計價", link: ["#"] },
          { name: "隱私權政策", link: ["#"] },
        ],
      },
    ],
    info: {
      title: "關於我們",
      desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務<br><br>資料視覺化的長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現；企業管理中的薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
      link: ["https://www.facebook.com/", "https://www.instagram.com/", "https://squarestudio.tw"],
    },
    news: {
      title: "訂閱電子報",
      btn: { name: "確認送出", link: ["#"] },
    },
    payment: ["paypal", "visa", "mastercard"],
  },
  sidebar: {
    map: [
      { name: "首頁", link: ["#"] },
      { name: "我的帳戶", link: ["#"] },
      { name: "許願清單", link: ["#"] },
      { name: "優惠促銷", link: ["#"] },
      { name: "門市據點", link: ["#"] },
      { name: "常見問題", link: ["#"] },
    ],
    gallery: {
      title: "COZA 商場",
      list: [
        "images/gallery-01.jpg",
        "images/gallery-02.jpg",
        "images/gallery-03.jpg",
        "images/gallery-04.jpg",
        "images/gallery-05.jpg",
        "images/gallery-06.jpg",
        "images/gallery-07.jpg",
        "images/gallery-08.jpg",
        "images/gallery-09.jpg",
      ],
    },
    article: {
      title: "關於我們",
      desc: "優良的公司文化，與創新彈性的工作環境，我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽",
    },
  },
  slider: [
    {
      img: "images/slide-03.jpg",
      subtitle: { text: "Men Collection 2018", show: "fadeInDown" },
      title: { text: "New arrivals", show: "fadeInUp" },
      btn: { text: "Shop Now", link: ["#"], show: "zoomIn" },
    },
    {
      img: "images/slide-02.jpg",
      subtitle: { text: "Men New-Season", show: "rollIn" },
      title: { text: "Jackets & Coats", show: "lightSpeedIn" },
      btn: { text: "Shop Now", link: ["#"], show: "slideInUp" },
    },
    {
      img: "images/slide-04.jpg",
      subtitle: { text: "Women Collection 2018", show: "rotateInDownLeft" },
      title: { text: "NEW SEASON", show: "rotateInUpRight" },
      btn: { text: "Shop Now", link: ["#"], show: "rotateIn" },
    },
  ],
  banner: [
    { img: "images/banner-04.jpg", title: "女裝", subtitle: "年度盛宴", btn: { name: "了解更多", link: ["#"] } },
    { img: "images/banner-05.jpg", title: "男裝", subtitle: "2022 春季新款", btn: { name: "了解更多", link: ["#"] } },
    { img: "images/banner-06.jpg", title: "背包", subtitle: "最新款式", btn: { name: "了解更多", link: ["#"] } },
  ],
  shop: {
    tagList: [
      { name: "外套", tag: "a" },
      { name: "襯衫", tag: "b" },
      { name: "短褲", tag: "c" },
      { name: "飾品", tag: "d" },
      { name: "布偶", tag: "e" },
    ],
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
      // categories: [],
    },
    product: [
      {
        id: 0,
        img: "images/product-01.jpg",
        img_detail: ["images/product-detail-01.jpg"],
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
                img: "images/avatar-01.jpg",
                name: "陳盈玫",
                desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                star: 5,
              },
              {
                img: "images/avatar-01.jpg",
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
        img: "images/product-02.jpg",
        img_detail: ["images/product-detail-01.jpg", "images/product-detail-02.jpg", "images/product-detail-03.jpg"],
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
                img: "images/avatar-01.jpg",
                name: "陳盈玫",
                desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                star: 5,
              },
              {
                img: "images/avatar-01.jpg",
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
                img: "images/avatar-01.jpg",
                name: "陳盈玫",
                desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                star: 5,
              },
              {
                img: "images/avatar-01.jpg",
                name: "陳振鑫",
                desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                star: 3,
              },
            ],
          },
        ],
        img: "images/product-03.jpg",
        img_detail: ["images/product-detail-01.jpg", "images/product-detail-02.jpg"],
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
                img: "images/avatar-01.jpg",
                name: "陳盈玫",
                desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                star: 5,
              },
              {
                img: "images/avatar-01.jpg",
                name: "陳振鑫",
                desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                star: 3,
              },
            ],
          },
        ],
        img: "images/product-04.jpg",
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
                img: "images/avatar-01.jpg",
                name: "陳盈玫",
                desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                star: 5,
              },
              {
                img: "images/avatar-01.jpg",
                name: "陳振鑫",
                desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                star: 3,
              },
            ],
          },
        ],
        img: "images/product-05.jpg",
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
                img: "images/avatar-01.jpg",
                name: "陳盈玫",
                desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                star: 5,
              },
              {
                img: "images/avatar-01.jpg",
                name: "陳振鑫",
                desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                star: 3,
              },
            ],
          },
        ],
        img: "images/product-06.jpg",
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
                img: "images/avatar-01.jpg",
                name: "陳盈玫",
                desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                star: 5,
              },
              {
                img: "images/avatar-01.jpg",
                name: "陳振鑫",
                desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                star: 3,
              },
            ],
          },
        ],
        img: "images/product-07.jpg",
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
                img: "images/avatar-01.jpg",
                name: "陳盈玫",
                desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                star: 5,
              },
              {
                img: "images/avatar-01.jpg",
                name: "陳振鑫",
                desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                star: 3,
              },
            ],
          },
        ],
        img: "images/product-08.jpg",
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
                img: "images/avatar-01.jpg",
                name: "陳盈玫",
                desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                star: 5,
              },
              {
                img: "images/avatar-01.jpg",
                name: "陳振鑫",
                desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                star: 3,
              },
            ],
          },
        ],
        img: "images/product-09.jpg",
        name: "產品0",
        price: 800,
        onAir: "2022-07-09",
        tag: [],
        color: [],
        size: ["S", "M", "L", "XL"],
      },
      {
        id: 9,
        img: "images/product-10.jpg",
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
                img: "images/avatar-01.jpg",
                name: "陳盈玫",
                desc: "平價的和精品名牌的都有；室內的整體氛圍比起一般百貨公司更是有著獨樹一格的美感",
                star: 5,
              },
              {
                img: "images/avatar-01.jpg",
                name: "陳振鑫",
                desc: "近期重新裝潢櫃位調整後又更美觀了，環境較明亮且動線更舒適順暢",
                star: 3,
              },
            ],
          },
        ],
      },
    ],
  },
};
