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
  base: {
    ios: "#",
    android: "#",
    background: "img/tree.png",
  },
  nav: [
    { title: "intro", name: "首頁" },
    { title: "features", name: "產品特色" },
    { title: "screenshots", name: "畫面演示" },
    { title: "video", name: "影片" },
    { title: "pricing", name: "售價" },
    { title: "contact", name: "聯絡我們" },
  ],
  intro: {
    img: "img/phone1.png",
    title: "星澄基地",
    desc: "提供您企業，社團，電商，教育與自媒體應用的最佳解決方案，免後台串接免程式開發，幾項設定步驟就能為您打造屬於您的專屬應用",
  },
  features: {
    img: "img/phone2.png",
    title: "獨立管理的社群平台",
    desc: "社團建立、資訊推播，可配合標籤和置頂的方式來排序貼文，提供給組織、社團、公司等一個獨立管理與經營的社群平台.",
    list: [
      { icon: "ion-ios-heart-outline", title: "個性化的發布內容", desc: "個性化推薦可以幫助用戶看到最好的結果" },
      { icon: "ion-ios-loop", title: "提供快速發文", desc: "發文附圖是近年來使用社群的基本公式" },
      { icon: "ion-ios-pie-outline", title: "活動規劃功能", desc: "使用活動排程規劃工具來追蹤所有重要的活動" },
    ],
  },
  features_2: {
    img: { front: "img/phone-white.png", back: "img/phone-black.png" },
    title: "簡單、簡潔",
    desc: "每一個細小的區域性和裝飾，深思熟慮，在畫面上更要求精工細作。",
    btn: { name: "了解更多", link: "https://squarestudio.tw" },
  },
  features_3: {
    img: { front: "img/phone-white.png", back: "img/phone-black.png" },
    title: "人性化 & 客製化",
    desc: "響應式網頁，電腦、手機、平板 網站一次搞定，提升搜尋好感度，任何需求都能滿足",
    btn: { name: "Get Start", link: "https://squarestudio.tw" },
  },
  features_4: {
    img: "img/phone3.png",
    left: [
      {
        icon: "ion-ios-heart-outline",
        title: "電商應用",
        desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成",
      },
      { icon: "ion-ios-loop", title: "資料視覺化", desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現" },
    ],
    right: [
      {
        icon: "ion-ios-pie-outline",
        title: "企業管理",
        desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
      },
      { icon: "ion-ios-cart-outline", title: "個人網站", desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地" },
    ],
  },
  screenshots: {
    title: "實際操作畫面",
    desc: "系統實際操作複製，給您實際操作的感覺",
    img: ["img/screens/1.jpg", "img/screens/2.jpg", "img/screens/3.jpg", "img/screens/4.jpg", "img/screens/5.jpg"],
  },
  video: {
    title: "宣傳影片",
    desc: "我們服務客戶，為提高公眾可見度或知名度所使用的方式。其訊息是介紹公司服務內容給大眾了解",
    link: "https://www.youtube.com/embed/GIalL5fkhPM",
  },
  price: {
    title: "資費方案",
    desc: "方便自己尋找合適的資費，功能有社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站",
    list: [
      {
        title: "A方案",
        detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
        price: { num: 2499, unit: "月" },
        btn: { name: "選擇方案", link: ["#"] },
      },
      {
        title: "B方案",
        detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C", not: true }],
        price: { num: 3299, unit: "月" },
        btn: { name: "選擇方案", link: ["#"] },
      },
    ],
  },
  subs: { title: "訂閱我們的電子報", desc: "", btn: { name: "", link: ["#"] } },
  team: {
    title: "我們的團隊",
    desc: "我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽",
    btn: { name: "了解更多", link: ["#"] },
    list: [
      { img: "img/team (1).jpg", name: "陳志賢", pro: "執行長", link: ["https://www.facebook.com/", "https://www.instagram.com/"] },
      { img: "img/team (2).jpg", name: "黃國玟", pro: "UI／UX設計師", link: ["https://www.instagram.com/", "https://squarestudio.tw"] },
      {
        img: "img/team (3).jpg",
        name: "韓俊榮",
        pro: "前端工程師",
        link: ["https://twitter.com/", "https://www.instagram.com/", "https://github.com"],
      },
      { img: "img/team (4).jpg", name: "陳佳玲", pro: "系統規劃師", link: ["https://squarestudio.tw", "#"] },
      { img: "img/team (5).jpg", name: "黃雅茹", pro: "產品業務", link: ["https://www.facebook.com/", "https://squarestudio.tw", "#"] },
    ],
  },
  client: {
    title: "客戶回饋",
    desc: "給客戶滿意的網站設計，是我們致力奉獻的服務，可以看看我們的客戶與業主給我們什麼樣的回應",
    logo: ["img/logo1.png", "img/logo1.png", "img/logo1.png", "img/logo1.png", "img/logo1.png", "img/logo1.png"],
    test: [
      {
        name: "陳志賢",
        pro: "平面設計師",
        text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
      },
      { name: "陳佳玲", pro: "寵物店 店長", text: "萊恩設計公司的服務與溝通方式很友善" },
      { name: "韓俊榮", pro: "XX拉麵 廚師兼店長", text: "合作得很愉快，很喜歡萊恩設計" },
      {
        name: "黃國玟",
        pro: "OO診所 護理師",
        text: "達成客戶的需求，替客戶早一步想到問題點很棒",
      },
    ],
  },
  faq: {
    title: "常見問題",
    desc: "以下常見問題，萊恩設計為你回答",
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
  download: {
    title: "iOS & Android 下載",
    desc: "下載最新版本的 APP ，雙平台皆可支援",
  },
  contact: {
    title: "聯絡我們",
    desc: "若想要了解我們的服務，填妥以下表單，萊恩設計將儘速回應您",
  },
};
