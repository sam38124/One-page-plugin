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
      { name: "服務項目", link: "#services" },
      { name: "公司作品", link: "#project" },
      { name: "聯絡我們", link: "#contact" },
      {
        name: "更多內容",
        list: [
          { name: "常見問題", link: "#faq" },
          { name: "定價方案", link: "#price" },
          { name: "客戶評價", link: "#test" },
        ],
      },
    ],
    link: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/", "https://squarestudio.tw/"],
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
          { name: "關於我們", link: "#about" },
          { name: "服務項目", link: "#services" },
          { name: "公司作品", link: "#project" },
          { name: "定價方案", link: "#price" },
          { name: "客戶評價", link: "#test" },
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
    title: "關於萊恩設計<br/>我們能為您做什麼？",
    desc: "優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
    img: "assets/img/hero-img.png",
    btn: { name: "了解更多", link: "#" },
  },
  about: {
    img: "assets/img/about.jpg",
    title: "《人類大未來：下一個五十年》",
    desc: `<p class="py-3">
            若說我們可從中得出以下關乎人類未來的啟示，應不至於有爭議：每個人的身分不再像過去那般單一且固定，將變得比我們想像的更多元。我們在不同的情況下使用不同的身分；這些身分互有重疊而且日益難分，卻又能清楚地以不同的方式劃定個人的觀點和選擇。特別是傳統用來界定身分的社會標準（例如年齡和國籍）都將不再那麼重要，公私身分的界線也變得越來越模糊。以社會階級、族群歸屬、政治立場為本的身分定義，將讓位給新的劃分標準，例如出身城鄉或教育程度的高低。
            </p>
            <p class="py-3">
            如果個人身分的傳統特質變得支離破碎，可以想見未來社群的向心力將會更為疏遠，社會階層的流動性降低或是邊緣化，讓種族隔離或極端主義有機可趁。但換個角度來看，科技及網路帶來人際關係的「超連結」（hyperconnectivity），將有機會強化正向群體認同，賦予營造社群的新契機。未來，無論是生活或身分，人與人都會逐漸變得密不可分。這究竟是好事還是壞事？我認為有好也有壞，而且不論何者的影響都會越來越大。
            </p>`,
  },
  feature: [
    {
      icon: { name: "bi bi-binoculars", color: "#F9BA2B" },
      tab: "文教",
      title: "田地在走，科技要有",
      img: "assets/img/features-1.png",
    },
    {
      icon: { name: "bi bi-box-seam", color: "#E92BF9" },
      tab: "消費",
      title: "庇護工場推中秋伴手禮 即日起開放預購",
      img: "assets/img/features-2.png",
    },
    {
      icon: { name: "bi bi-brightness-high", color: "#2B75F9" },
      tab: "社會",
      title: "eTrade hub跨境電商大講堂",
      img: "assets/img/features-3.png",
    },
    {
      icon: { name: "bi bi-command", color: "#63F92B" },
      tab: "產能",
      title: "掌握關鍵新動能 布局高雄大未來",
      img: "assets/img/features-4.png",
    },
    {
      icon: { name: "bi bi-easel", color: "#2BF9F9" },
      tab: "影音",
      title: "發呆系歌手 沈安『不稀罕別人給的完整╱狂奔』",
      img: "assets/img/features-2.png",
    },
    {
      icon: { name: "bi bi-map", color: "#F53D3D" },
      tab: "藝術",
      title: "如何正確而有《次第》的學習翡翠",
      img: "assets/img/features-1.png",
    },
  ],
  service: {
    title: "產品服務項目",
    desc: "我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。",
    list: [
      {
        icon: { name: "bi bi-activity", color: "#000000" },
        title: "電商應用",
        desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
        link: "#",
      },
      {
        icon: { name: "bi bi-broadcast", color: "#800080" },
        title: "資料視覺化",
        desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
        link: "#",
      },
      {
        icon: { name: "bi bi-easel", color: "#00FFFF" },
        title: "企業管理",
        desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
        link: "#",
      },
      {
        icon: { name: "bi bi-bounding-box-circles", color: "#A52A2A" },
        title: "個人網站",
        desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
        link: "#",
      },
      {
        icon: { name: "bi bi-calendar4-week", color: "#7FFD4" },
        title: "社群平台",
        desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
        link: "#",
      },
      {
        icon: { name: "bi bi-chat-square-text", color: "#ADD8E6" },
        title: "線上課程網站",
        desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
        link: "#",
      },
    ],
  },
  project: {
    title: "作品案例",
    desc: "萊恩設計有能力製作多種設計、多功能的單頁式網站或系統軟體，可在下方查找相關案例",
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
  action: {
    title: "想要得到 <em>萊恩設計</em> 的相關資訊嗎？",
    desc: "提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站，我們擅長達成客戶的需求，替客戶早一步想到問題點",
    img: "assets/img/cta-bg.jpg",
    btn: { name: "聯絡我們", link: "#contact" },
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
  team: {
    title: "我們的團隊",
    desc: "我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽",
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
        pro: "UI／UX設計師",
        link: [
          "https://www.instagram.com/",
          "https://squarestudio.tw",
          "https://www.instagram.com/",
          "https://www.facebook.com/",
          "https://twitter.com/",
        ],
      },
      { img: "assets/img/team/team-2.jpg", name: "陳佳玲", pro: "系統規劃師", link: ["https://squarestudio.tw", "#"] },
    ],
  },
  client: {
    title: "合作夥伴",
    desc: "萊恩設計公司的服務與顧客的合作",
    list: [
      "assets/img/clients/client-1.png",
      "assets/img/clients/client-2.png",
      "assets/img/clients/client-3.png",
      "assets/img/clients/client-4.png",
      "assets/img/clients/client-5.png",
      "assets/img/clients/client-6.png",
    ],
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
        btn: { name: "選擇方案", link: "#" },
      },
      {
        title: "B方案",
        desc: "黃金方案，提供多個開發需求與 WEB 視覺設計",
        icon: "fa fa-share-alt",
        highlight: true,
        detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C" }],
        price: { num: 399, unit: "月" },
        btn: { name: "選擇方案", link: "#" },
      },
      {
        title: "C方案",
        desc: "白金方案，個性化開法與 APP 雙平台的上架",
        icon: "fa fa-cog",
        detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
        price: { num: 799, unit: "月" },
        btn: { name: "選擇方案", link: "#" },
      },
    ],
  },
  faq: {
    title: "沒有那麼多的預算？常見問題為您解答",
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
  contact: {
    title: "聯絡我們 Contact Us",
    desc: "想要更加了解我們的服務？填妥以下表單，或直接聯絡信箱，萊恩設計將儘速回應您。",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621",
    info: [
      { icon: "bi bi-geo-alt", title: "地址", text: "台中市臺灣大道二段285號20樓" },
      { icon: "bi bi-phone", title: "電話", text: "(886) 0978-028-730" },
      { icon: "bi bi-envelope", title: "信箱", text: "jianzhi.wang@ncdesign.info" },
    ],
    form: [
      { title: "姓名", id: "name", need: true },
      { title: "信箱", id: "email", need: true },
      { title: "電話 / 手機", id: "phone", need: true },
      { title: "想說的訊息", id: "message", need: true },
    ],
  },
};
