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
    title: "萊恩設計",
    logo: "../../../glitterBundle/img/logo.svg",
    bar: [
      { name: "關於我們", link: "#about" },
      { name: "產品特色", link: "#feature" },
      { name: "聯絡我們", link: "#contact" },
      { name: "服務範圍", link: "#service" },
      {
        name: "更多內容",
        list: [
          { name: "公司團隊", link: "#team" },
          { name: "常見問題", link: "#faq" },
          { name: "作品案例", link: "#project" },
        ],
      },
    ],
    top: {
      email: "jianzhi.wang@ncdesign.info",
      phone: "(886) 0978-028-730",
      list: ["https://www.instagram.com/", "https://www.facebook.com/", "https://twitter.com/", "https://squarestudio.tw"],
    },
    btn: { name: "登入", link: "#" },
  },
  footer: {
    subs: { desc: "想收到與萊恩設計有關的最新消息，請立即訂閱我們的電子報，我們會將資訊送至你的信箱。", link: "#" },
    outro: {
      title: "萊恩設計",
      desc: "提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站",
      social: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/", "https://squarestudio.tw/"],
    },
    map: [
      {
        title: "網站導覽",
        list: [
          { name: "產品特色", link: "#feature" },
          { name: "聯絡我們", link: "#contact" },
          { name: "服務範圍", link: "#service" },
          { name: "技術領域", link: "#banner" },
          { name: "公司團隊", link: "#team" },
        ],
      },
      {
        title: "推薦網站",
        list: [
          { name: "Google", link: "https://www.google.com.tw/" },
          { name: "Yahoo", link: "https://tw.yahoo.com/" },
        ],
      },
    ],
    info: {
      title: "聯絡資訊",
      list: [
        { icon: "bx bx-map", title: "台中市臺灣大道二段285號20樓" },
        { icon: "bx bx-phone-call", title: "(886) 0978-028-730" },
        { icon: "bx bx-time", title: `週一至週五 09:00 AM – 19:00 PM` },
        { icon: "bx bx-envelope", title: `jianzhi.wang@ncdesign.info` },
      ],
    },
  },
  keyVision: {
    title: "關於<span>萊恩設計</span>，我們能為您做什麼？",
    desc: "優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
    img: "assets/img/hero-bg.jpg",
    btn: { name: "瞭解更多", link: "#" },
  },
  about: {
    img: "assets/img/about-img.jpg",
    title: "萊恩 · 提供您最佳網站服務",
    desc: `我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到UI／UX、頁面、Logo設計、，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。`,
    list: [
      { icon: "bx bx-receipt", title: "個性化的發布內容", desc: "個性化推薦可以幫助用戶看到最好的結果" },
      { icon: "bx bx-cube-alt", title: "提供快速發文", desc: "發文附圖是近年來使用社群的基本公式" },
      { icon: "bx bx-images", title: "活動規劃功能", desc: "使用活動排程規劃工具來追蹤所有重要的活動" },
      { icon: "bx bx-shield", title: "資料視覺化", desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現" },
    ],
  },
  banner: [
    { number: "01", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零件更換" },
    { number: "02", title: "資訊安全", desc: "網路、網際網路、端點、API、雲端、應用程式" },
    { number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" },
    { number: "04", title: "即時線上服務", desc: "提供即時與處理緊急狀況的撥打專線，替您解除危機" },
    { number: "05", title: "前後台版型多樣性", desc: "多種板塊可自行設計或與我們說明想要的介面" },
  ],
  feature: [
    {
      title: "電商應用",
      desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
      img: "assets/img/features-1.png",
    },
    {
      title: "資料視覺化",
      desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
      img: "assets/img/features-2.png",
    },
    {
      title: "企業管理",
      desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
      img: "assets/img/features-3.png",
    },
    {
      title: "個人網站",
      desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
      img: "assets/img/features-4.png",
    },
    {
      title: "社群平台",
      desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
      img: "assets/img/features-1.png",
    },
  ],
  service: {
    title: "產品服務項目",
    desc: "我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。",
    list: [
      {
        icon: { name: "bi bi-binoculars", color: "#F9BA2B" },
        title: "電商應用",
        desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
        link: "#",
      },
      {
        icon: { name: "bi bi-box-seam", color: "#E92BF9" },
        title: "資料視覺化",
        desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
        link: "#",
      },
      {
        icon: { name: "bi bi-brightness-high", color: "#2B75F9" },
        title: "企業管理",
        desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
        link: "#",
      },
      {
        icon: { name: "bi bi-command", color: "#63F92B" },
        title: "個人網站",
        desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
        link: "#",
      },
      {
        icon: { name: "bi bi-easel", color: "#2BF9F9" },
        title: "社群平台",
        desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
        link: "#",
      },
      {
        icon: { name: "bi bi-map", color: "#F53D3D" },
        title: "線上課程網站",
        desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
        link: "#",
      },
    ],
  },
  test: {
    title: "給客戶滿意的網站設計，是我們致力奉獻的服務",
    desc: "可以看看我們的客戶與業主給我們什麼樣的回饋！",
    list: [
      {
        name: "陳志賢",
        pro: "平面設計師",
        img: "assets/img/testimonials/testimonials-1.jpg",
        text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
      },
      { name: "陳佳玲", pro: "寵物店 店長", img: "assets/img/testimonials/testimonials-2.jpg", text: "萊恩設計公司的服務與溝通方式很友善" },
      { name: "韓俊榮", pro: "XX拉麵 廚師兼店長", img: "assets/img/testimonials/testimonials-3.jpg", text: "合作得很愉快，很喜歡萊恩設計" },
      {
        name: "黃國玟",
        pro: "OO診所 護理師",
        img: "assets/img/testimonials/testimonials-4.jpg",
        text: "達成客戶的需求，替客戶早一步想到問題點很棒",
      },
    ],
  },
  project: {
    title: "作品案例",
    desc: "萊恩設計有能力製作多種設計、多功能的單頁式網站或系統軟體",
    tag: [
      { className: "*", title: "所有作品" },
      { className: ".app", title: "APP" },
      { className: ".card", title: "活動" },
      { className: ".web", title: "網頁" },
    ],
    list: [
      { title: "Mani", desc: "App 1, Card 1", link: "#", img: "assets/img/portfolio/portfolio-1.jpg", tag: ["app", "card"] },
      { title: "Tablet", desc: "Card 2", link: "#", img: "assets/img/portfolio/portfolio-2.jpg", tag: ["card"] },
      { title: "Phone Useful", desc: "Web 1", link: "#", img: "assets/img/portfolio/portfolio-3.jpg", tag: ["web"] },
      { title: "Cheer up", desc: "App 2", link: "#", img: "assets/img/portfolio/portfolio-4.jpg", tag: ["app"] },
      { title: "Light", desc: "Card 3", link: "#", img: "assets/img/portfolio/portfolio-5.jpg", tag: ["app", "card"] },
      { title: "Booker", desc: "Web 2", link: "#", img: "assets/img/portfolio/portfolio-6.jpg", tag: ["app", "web"] },
      { title: "Thanks", desc: "App 3", link: "#", img: "assets/img/portfolio/portfolio-7.jpg", tag: ["app"] },
      { title: "Tea Time", desc: "Card 4", link: "#", img: "assets/img/portfolio/portfolio-8.jpg", tag: ["card"] },
      { title: "Watch", desc: "Web 3", link: "#", img: "assets/img/portfolio/portfolio-9.jpg", tag: ["card", "web"] },
    ],
  },
  faq: {
    title: "沒有那麼多的預算？",
    desc: `前往星澄基地，快速打造專屬於您的系統`,
    list: [
      {
        q: "星澄基地是什麼？",
        a: "星澄基地是萊恩設計所開發的套版應用平台，集結了我們所有的開發案例，讓您能用最低的成本打造您的應用",
      },
      { q: "是否支援APP上架服務？", a: "當然，購買白金方案後，會有專人聯繫您APP上架相關事宜。" },
      {
        q: "是否支援電商與金流功能？",
        a: "可以，我們採用綠界科技作為金流平台，由後台簡易帶入HASHKEY與特店編號，即可串接金流服務。",
      },
      { q: "我能從網站或 APP 中販售商品嗎？", a: "可以，您可以在電商平台上販售您設計的商品。" },
    ],
  },
  team: {
    title: "我們的團隊",
    desc: "萊恩設計中，有著來自四面八方的優質團隊",
    list: [
      {
        img: "assets/img/team/team-1.jpg",
        name: "陳志賢",
        pro: "執行長",
        link: ["https://www.facebook.com/", "https://www.instagram.com/"],
      },
      {
        img: "assets/img/team/team-3.jpg",
        name: "黃國玟",
        pro: "技術長",
        link: ["https://www.instagram.com/", "https://squarestudio.tw"],
      },
      {
        img: "assets/img/team/team-2.jpg",
        name: "陳佳玲",
        pro: "系統規劃師",
        link: ["https://squarestudio.tw", "#"],
      },
      {
        img: "assets/img/team/team-4.jpg",
        name: "張心瑜",
        pro: "業務總管",
        link: ["https://www.facebook.com/", "https://www.instagram.com/", "https://www.twitter.com", "#"],
      },
    ],
  },
  contact: {
    title: "聯絡我們",
    desc: "若想要了解我們的服務，填妥以下表單，萊恩設計將儘速回應您。",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621",
    info: [
      { icon: "bx bx-map", title: "地址", text: "台中市臺灣大道二段285號20樓" },
      { icon: "bx bx-phone", title: "電話", text: "(886) 0978-028-730" },
      { icon: "bx bx-envelope", title: "信箱", text: "jianzhi.wang@ncdesign.info" },
    ],
    form: [
      { title: "姓名", id: "name", need: true },
      { title: "信箱", id: "email", need: true },
      { title: "電話 / 手機", id: "phone", need: true },
      { title: "主旨", id: "subject", need: true },
      { title: "想說的內容", id: "message", need: true },
    ],
  },
};
