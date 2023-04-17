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
      { name: "服務項目", link: "#service" },
      { name: "產品介紹", link: "#project" },
      { name: "定價方案", link: "#price" },
      { name: "聯絡我們", link: "#contact" },
      {
        name: "更多內容",
        list: [
          { name: "技術與能力", link: "#banner" },
          { name: "公司團隊", link: "#team" },
        ],
      },
    ],
    top: {
      email: "jianzhi.wang@ncdesign.info",
      phone: "(886) 0978-028-730",
      list: ["https://www.instagram.com/", "https://www.facebook.com/", "https://twitter.com/", "https://squarestudio.tw"],
    },
  },
  footer: {
    info: {
      title: "萊恩設計",
      list: [
        { icon: "bx bx-map", title: "台中市臺灣大道二段285號20樓" },
        { icon: "bx bx-phone-call", title: "(886) 0978-028-730" },
        { icon: "bx bx-time", title: `週一至週五 09:00 AM – 19:00 PM` },
        { icon: "bx bx-envelope", title: `jianzhi.wang@ncdesign.info` },
      ],
    },
    map: [
      {
        title: "網站導覽",
        list: [
          { name: "服務項目", link: "#service" },
          { name: "產品介紹", link: "#project" },
          { name: "定價方案", link: "#price" },
          { name: "技術與能力", link: "#banner" },
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
    subs: { desc: "想收到與萊恩設計有關的最新消息，請立即訂閱我們的電子報，我們會將資訊送至你的信箱。", link: "#" },
  },
  keyVision: {
    title: "關於萊恩設計<br />我們能為您做什麼？",
    desc: "優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
    img: "assets/img/hero-bg.jpg",
    btn: { name: "點我了解", link: "#" },
  },
  about: {
    img: "assets/img/about.jpg",
    title: "關於我們能為您做些甚麼",
    desc: `我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。<ul><li><i class="bi bi-check-circle"></i> 從電商網站設計、後台管理、產品投放分析、網站架設、金流串接</li><li><i class="bi bi-check-circle"></i> 無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格</li><li><i class="bi bi-check-circle"></i> 薪資管理、班表分配、客戶表單，企業基本經營的功能與系統</li><li><i class="bi bi-check-circle"></i> 網紅經營部落格、分享資訊、個人專屬的網站</li></ul>從電商網站設計、後台管理、搜尋應用、網站架設、金流串接，我們都有經驗能替您完成服務<br><br>資料視覺化的長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現；企業管理中的薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統。`,
  },
  banner: [
    { number: "01", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零件更換" },
    { number: "02", title: "資訊安全", desc: "網路、網際網路、端點、API、雲端、應用程式" },
    { number: "03", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" },
    { number: "04", title: "即時線上服務", desc: "提供即時與處理緊急狀況的撥打專線，替您解除危機" },
    { number: "05", title: "前後台版型多樣性", desc: "多種板塊可自行設計或與我們說明想要的介面" },
  ],
  client: [
    "assets/img/clients/client-1.png",
    "assets/img/clients/client-2.png",
    "assets/img/clients/client-3.png",
    "assets/img/clients/client-4.png",
    "assets/img/clients/client-5.png",
    "assets/img/clients/client-6.png",
  ],
  service: {
    title: "星澄基地",
    desc: "提供您企業，社團，電商，教育與自媒體應用的最佳解決方案，免後台串接免程式開發，幾項設定步驟就能為您打造屬於您的專屬應用",
    list: [
      { icon: "bx bx-receipt", title: "個性化的發布內容", desc: "個性化推薦可以幫助用戶看到最好的結果" },
      { icon: "bx bx-cube-alt", title: "提供快速發文", desc: "發文附圖是近年來使用社群的基本公式" },
      { icon: "bx bx-images", title: "活動規劃功能", desc: "使用活動排程規劃工具來追蹤所有重要的活動" },
      { icon: "bx bx-shield", title: "資料視覺化", desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現" },
      { icon: "bx bx-atom", title: "個人網站", desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地" },
      { icon: "bx bx-id-card", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零組件更換" },
    ],
  },
  fullbg: {
    title: "讓資訊科技更貼近生活",
    desc: "優質服務範圍包括網路連線諮詢與整合、受管理網路服務和軟體定義的網路",
    btn: { name: "了解更多", link: "https://squarestudio.tw/" },
    img: "assets/img/cta-bg.jpg",
  },
  project: {
    title: "作品案例",
    desc: "萊恩設計有能力製作多種設計、多功能的單頁式網站或系統軟體，可在下方查找相關案例",
    tagList: [
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
  price: {
    title: "客製專案價格",
    desc: "社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站",
    list: [
      {
        title: "A方案",
        desc: "基本方案，最基本的開發環境",
        detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
        price: { num: 249, unit: "月" },
        btn: { name: "選擇方案", link: "#" },
      },
      {
        title: "B方案",
        desc: "黃金方案，提供多個開發需求與 WEB 視覺設計",
        highlight: true,
        detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C" }],
        price: { num: 399, unit: "月" },
        btn: { name: "選擇方案", link: "#" },
      },
      {
        title: "C方案",
        desc: "白金方案，個性化開法與 APP 雙平台的上架",
        detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
        price: { num: 799, unit: "月" },
        btn: { name: "選擇方案", link: "#" },
      },
    ],
  },
  team: {
    title: "我們的團隊",
    desc: "我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽",
    list: [
      {
        img: "assets/img/team/team-1.jpg",
        name: "陳志賢",
        pro: "執行長",
        desc: "企業中負責日常營運的最高行政人員。其專業與領導能力，讓公司的股東可以信任該公司的決策與產品",
        link: ["https://www.facebook.com/", "https://www.instagram.com/"],
      },
      {
        img: "assets/img/team/team-3.jpg",
        name: "黃國玟",
        pro: "UI／UX設計師",
        desc: "在使用者體驗和互動的指導下對電腦、電器、機器、移動通訊裝置、軟體或應用以及網站進行的設計",
        link: ["https://www.instagram.com/", "https://squarestudio.tw"],
      },
      {
        img: "assets/img/team/team-2.jpg",
        name: "陳佳玲",
        pro: "系統規劃師",
        desc: "評估並分析現行運作系統，確定其需求，據此發展系統架構以改良使用環境及產作業效率",
        link: ["https://squarestudio.tw", "#"],
      },
    ],
  },
  contact: {
    title: "想傳達您的訊息給萊恩設計嗎？",
    desc: "若想要了解我們的服務<br />填妥以下表單，萊恩設計將儘速回應您。",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621",
    info: [
      { icon: "bx bx-map", title: "地址", text: "台中市臺灣大道二段285號20樓" },
      { icon: "bx bx-phone", title: "電話", text: "(886) 0978-028-730" },
      { icon: "bx bx-time-five", title: "營業時間", text: "週一至週五 09:00 AM – 19:00 PM" },
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
