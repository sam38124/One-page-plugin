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
  nav: {
    title: "萊恩設計",
    logo: "../../../glitterBundle/img/logo.svg",
    bar: [
      { name: "關於我們", link: ["about"] },
      { name: "域名服務", link: ["domain"] },
      { name: "定價方案", link: ["price"] },
      {
        name: "更多內容",
        list: [
          { name: "產品介紹", link: ["comp"] },
          { name: "客戶評價", link: ["test"] },
          { name: "公司成員", link: ["team"] },
        ],
      },
    ],
  },
  footer: {
    map: [
      {
        title: "網站導覽",
        list: [
          { name: "關於我們", link: ["about"] },
          { name: "域名服務", link: ["domain"] },
          { name: "定價方案", link: ["price"] },
          { name: "產品介紹", link: ["comp"] },
          { name: "客戶評價", link: ["test"] },
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
    info: [
      { icon: "far fa-map", text: "台中市臺灣大道二段285號20樓" },
      { icon: "fas fa-mobile-alt", text: "(886) 0978-028-730" },
      { icon: "far fa-envelope", text: "jianzhi.wang@ncdesign.info" },
      { icon: "far fa-clock", text: "週一至週五 09:00 ~ 19:00" },
    ],
    link: [
      "https://www.facebook.com/",
      "https://twitter.com/",
      "https://www.youtube.com/",
      "https://www.linkedin.com/",
      "https://www.google.com.tw/",
    ],
  },
  keyVision: {
    img: "img/hero.png",
    title: `打造優質<span class="home_text">網路服務</span><br />選擇萊恩設計`,
    desc: "優質服務範圍包括網路連線諮詢與整合、受管理網路服務和軟體定義的網路",
    prod: { title: "單頁式響應式網頁", price: 24900 },
    btn: { name: "了解更多", link: "https://squarestudio.tw/" },
  },
  domain: {
    title: "服務介紹",
    desc: "萊恩設計有能力製作多種設計、多功能的單頁式網站或系統軟體",
    placeholder: "輸入想了解的服務",
    list: [
      { name: "社群平台", text: "$45,000" },
      { name: "電商網站", text: "$38,900" },
      { name: "個人部落格", text: "$35,900" },
      { name: "企業管理", text: "$100,000" },
      { name: "資料視覺化", text: "$59,800" },
      { name: "線上課程", text: "$42,000" },
    ],
  },
  about: {
    title: "歡迎來到萊恩設計",
    desc: "從電商網站設計、後台管理、搜尋應用、網站架設、金流串接，我們都有經驗能替您完成服務<br><br>資料視覺化的長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現；企業管理中的薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統<br><br>學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群平台",
    list: [
      { icon: "fas fa-briefcase", num: 1258, title: "歷史專案數" },
      { icon: "fas fa-award", num: 150, title: "專利數量" },
      { icon: "fas fa-users", num: 642, title: "員工數" },
    ],
    img: "img/about.png",
  },
  price: {
    title: "響應單頁式網頁 · 關鍵字搜尋<br />萊恩設計專業客製",
    desc: "社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站",
    list: [
      {
        title: "A方案",
        desc: "基本方案，最基本的開發環境",
        icon: "fa fa-share-alt",
        detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
        price: { num: 249, unit: "月" },
        btn: { name: "選擇方案", link: ["#"] },
      },
      {
        title: "B方案",
        desc: "黃金方案，提供多個開發需求與 WEB 視覺設計",
        icon: "fa fa-share-alt",
        highlight: true,
        detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C" }],
        price: { num: 399, unit: "月" },
        btn: { name: "選擇方案", link: ["#"] },
      },
      {
        title: "C方案",
        desc: "白金方案，個性化開法與 APP 雙平台的上架",
        icon: "fa fa-cog",
        detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
        price: { num: 799, unit: "月" },
        btn: { name: "選擇方案", link: ["#"] },
      },
    ],
  },
  comp: {
    title: "軟硬體業務範圍",
    desc: "優質服務範圍包括網路連線諮詢與整合、受管理網路服務和軟體定義的網路",
    list: [
      {
        name: "伺服器維護",
        color: "green",
        detail: [
          { icon: "fa fa-server", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零組件更換" },
          {
            icon: "fa fa-shield-alt",
            title: "資訊安全",
            desc: "網路、網際網路、端點、API、雲端、應用程式以及容器等各項與網路有關的安全機制",
          },
          { icon: "fa fa-cog", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造您專屬的設定頁面" },
          { icon: "fa fa-headset", title: "即時線上服務", desc: "提供即時與處理緊急狀況的撥打專線，隨時替您解除危機" },
        ],
      },
      {
        name: "系統APP軟體設計",
        color: "red",
        detail: [
          {
            icon: "fas fa-store",
            title: "電商應用",
            desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
          },
          {
            icon: "fas fa-chart-bar",
            title: "資料視覺化",
            desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
          },
          {
            icon: "fas fa-building",
            title: "企業管理",
            desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
          },
          {
            icon: "fas fa-home",
            title: "個人網站",
            desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
          },
        ],
      },
    ],
  },
  test: [
    {
      name: "陳志賢",
      pro: "平面設計師",
      img: "img/testimonial-2.jpg",
      text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
    },
    { name: "陳佳玲", pro: "寵物店 店長", img: "img/testimonial-1.jpg", text: "萊恩設計公司的服務與溝通方式很友善" },
    { name: "韓俊榮", pro: "XX拉麵 廚師兼店長", img: "img/testimonial-3.jpg", text: "合作得很愉快，很喜歡萊恩設計" },
    {
      name: "黃國玟",
      pro: "OO診所 護理師",
      img: "img/testimonial-4.jpg",
      text: "達成客戶的需求，替客戶早一步想到問題點很棒",
    },
  ],
  team: {
    title: "我們的團隊",
    desc: "我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽",
    list: [
      { img: "img/team-1.jpg", name: "陳志賢", pro: "執行長", link: ["https://www.facebook.com/", "https://www.instagram.com/"] },
      { img: "img/team-3.jpg", name: "黃國玟", pro: "UI／UX設計師", link: ["https://www.instagram.com/", "https://squarestudio.tw"] },
      {
        img: "img/team-4.jpg",
        name: "韓俊榮",
        pro: "前端工程師",
        link: ["https://twitter.com/", "https://www.instagram.com/", "https://squarestudio.tw"],
      },
      { img: "img/team-2.jpg", name: "陳佳玲", pro: "系統規劃師", link: ["https://squarestudio.tw", "#"] },
    ],
  },
};
