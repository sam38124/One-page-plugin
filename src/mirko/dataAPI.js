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

var fakeArticle = glitter.print(function () {
  return /*html*/ `
    <!-- Basic -->
    <div class="ex-basic-1 pt-5 pb-5">
      <div class="container text-center">
        <div class="row">
          <div class="col-lg-12">
            <img class="img-fluid mt-5 mb-3" src="assets/images/article-details-large.jpg" alt="alternative" />
          </div>
          <!-- end of col -->
        </div>
        <!-- end of row -->
      </div>
      <!-- end of container -->
    </div>
    <!-- end of ex-basic-1 -->
    <!-- end of basic -->

    <!-- Basic -->
    <div class="ex-basic-1 pt-4">
      <div class="container">
        <div class="row">
          <div class="col-xl-10 offset-xl-1">
            <p>
            乍看之下，此項進展迅速的科技革新和非洲農民或蒙古牧民似乎沒什麼關係，但多虧了電話網路，才將這些人與科技連結起來。目前世界上每3人就有2人擁有或使用手機，就連在非洲撒哈拉沙漠以南的低度開發國家也很常見。現代人主要透過手機（電信）交流，網際網路反倒不如手機這般普及
            </p>
            <h2 class="my-3">科技界定身分</h2>
            <p class="py-2">
            據統計，已開發國家的每5個家庭有4個能上網，低度開發國家則降至每10個家庭還不到1個有網路。我們有理由擔心這樣的科技鴻溝（或者說數位鴻溝），但無法簡單將此現象與其他社會問題畫上等號。不難想見，不同的年齡層也隔著上述鴻溝。根據英國2016年的1份調查，近3個月曾使用網際網路的比例，16歲至24歲人士超過99％，75歲以上人士僅39％。
            </p>
            <p class="py-2">
            網際網路的使用情況僅代表趨勢的一角。行動網路讓網路使用模式轉向「永遠在線」的心態。1990年代出生的人，即所謂的「Z世代」，從未見識過無電腦和手機的年代，而這些人現在陸續成年。2011年，英國有份調查取樣16歲至24歲人士，發現45％的人覺得處在「上線」狀態的時候最快樂。現在多數公司會要求員工以手機和電郵隨時聯繫，人們也會利用手機與電郵在上班時間處理家務或私人事務，職場與家庭的界線也因此被打破。
            </p>
            <p class="mb-4">
            類似統計不勝枚舉，箇中意涵卻非顯而易見。若以當前統計數據外推，意謂著10年過後，全世界會有四分之三的人擁有手機。然而使用手機對肯亞農人或蒙古牧民，以及對倫敦金融中心的交易員來說，結果是兩碼子事。
            </p>
          </div>
          <!-- end of col -->
        </div>
        <!-- end of row -->
      </div>
      <!-- end of container -->
    </div>
    <!-- end of ex-basic-1 -->
    <!-- end of basic -->

    <!-- Cards -->
    <div class="ex-cards-1 pt-3 pb-3 ">
      <div class="container">
        <div class="row col-xl-10 offset-xl-1">
          <!-- Card -->
          <div class="card col-lg-4">
            <ul class="list-unstyled">
              <li class="d-flex">
                <span class="fa-stack">
                  <span class="fas fa-circle fa-stack-2x"></span>
                  <span class="fa-stack-1x">1</span>
                </span>
                <div class="flex-grow-1">
                  <h5>多了互動不代表能互相包容</h5>
                  <p>反倒可能各執一詞、僵持不下，使政治論述變得更加粗蠻，或使極端主義變得更為偏執。並無跡象顯示網際網路和社群媒體能鼓勵人們放開心胸討論是非</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- end of card -->
          <!-- end of card -->

          <!-- Card -->
          <div class="card col-lg-4">
            <ul class="list-unstyled">
              <li class="d-flex">
                <span class="fa-stack">
                  <span class="fas fa-circle fa-stack-2x"></span>
                  <span class="fa-stack-1x">2</span>
                </span>
                <div class="flex-grow-1">
                  <h5>資訊科技可能會加深偏見與誤解</h5>
                  <p>當然也有可能擴大社會的不平等。在商業貿易、藝術、娛樂、名聲等方面，市場比以往更傾向「贏家全拿」的局面</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- end of card -->
          <!-- end of card -->

          <!-- Card -->
          <div class="card col-lg-4">
            <ul class="list-unstyled">
              <li class="d-flex">
                <span class="fa-stack">
                  <span class="fas fa-circle fa-stack-2x"></span>
                  <span class="fa-stack-1x">3</span>
                </span>
                <div class="flex-grow-1">
                  <h5>工作未來多半會被機器人接手</h5>
                  <p>眼下金融市場已有諸多交易由演算法自動執行，局勢發展之快，而且自成規律，遠非人能掌控。至於規律為何，我們至今尚未真正摸清。自動化的態勢將不斷擴展到更多精密行業，如醫療保健和教育</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- end of card -->
          <!-- end of card -->
        </div>
        <!-- end of row -->
      </div>
      <!-- end of container -->
    </div>
    <!-- end of ex-cards-1 -->
    <!-- end of cards -->

    <!-- Basic -->
    <div class="ex-basic-1 pt-3 pb-5">
      <div class="container">
        <div class="row">
          <div class="col-xl-10 offset-xl-1">
            <p class="mb-5">
            以上趨勢並無明顯的單一走向，更確切地說，其中還內含許多矛盾，例如謊言更容易被揭穿，卻也散布得更快、更容易。重點是，這樣的改變並非發生於空想的社會政治情境；而這樣的改變發生在中國所代表的意義，和發生在瑞典或伊朗截然不同。
            </p>

            <h2 class="mb-4">《人類大未來：下一個五十年，科技如何讓人類更幸福？》</h2>
            <img class="img-fluid mb-5" src="assets/images/article-details-small.jpg" alt="alternative" />
            <p class="py-3">
            若說我們可從中得出以下關乎人類未來的啟示，應不至於有爭議：每個人的身分不再像過去那般單一且固定，將變得比我們想像的更多元。我們在不同的情況下使用不同的身分；這些身分互有重疊而且日益難分，卻又能清楚地以不同的方式劃定個人的觀點和選擇。特別是傳統用來界定身分的社會標準（例如年齡和國籍）都將不再那麼重要，公私身分的界線也變得越來越模糊。以社會階級、族群歸屬、政治立場為本的身分定義，將讓位給新的劃分標準，例如出身城鄉或教育程度的高低。
            </p>
            <p class="py-3">
            如果個人身分的傳統特質變得支離破碎，可以想見未來社群的向心力將會更為疏遠，社會階層的流動性降低或是邊緣化，讓種族隔離或極端主義有機可趁。但換個角度來看，科技及網路帶來人際關係的「超連結」（hyperconnectivity），將有機會強化正向群體認同，賦予營造社群的新契機。未來，無論是生活或身分，人與人都會逐漸變得密不可分。這究竟是好事還是壞事？我認為有好也有壞，而且不論何者的影響都會越來越大。
            </p>
            <div class="text-box mb-5 p-4">
              <h3>書籍介紹</h3>
              <p>
              街上人們踩著懸浮滑板，出門再也不用自己開車；科學家發明能讓人感到幸福的藥丸，基因改造讓人們永遠不再生病；AI就是你的管家，生活大小事都靠機器人打理；蜘蛛絲能建造出比鋼筋更堅固的橋，有記憶的金屬能夠自動修復；週末搭太空船去月球旅行；時光機讓你回到過去挽回曾經犯下的錯……
              </p>
            </div>
            <!-- end of text-box -->
            <p class="mb-4">
            也有可能，人們努力發展科學與經濟，想讓大家未來都過上更好的生活，卻忘了保護我們的現在，導致大自然的各種反撲……
            </p>
            <ul class="list-unstyled li-space-lg mb-5">
              <li class="d-flex py-2">
                <i class="fas fa-square"></i>
                <div class="flex-grow-1">
                  <strong>銷售及收款循環</strong> 包括訂單處理、授信管理、運送貨品、開立銷貨發票、開出帳單、記錄收入及應收帳款、執行與記錄現金收入等之政策及程序。
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="fas fa-square"></i>
                <div class="flex-grow-1">
                  <strong>採購及付款循環</strong> 包括請購、進貨或採購原料、物料、資產和勞務、處理採購單、經收貨品、檢驗品質、填寫驗收報告書或處理退貨
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="fas fa-square"></i>
                <div class="flex-grow-1">
                  <strong>生產循環</strong> 包括擬訂生產計畫、開立用料清單、儲存材料、投入生產、計算存貨生產成本、計算銷貨成本等之政策及程序。
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="fas fa-square"></i>
                <div class="flex-grow-1">
                  <strong>薪工循環</strong> 包括僱用、請假、加班、辭退、訓練、退休、決定薪資率、計時、計算薪津總額、計算薪資稅及各項代扣款、設置薪資紀錄
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="fas fa-square"></i>
                <div class="flex-grow-1">
                  <strong>融資循環</strong> 包括借款、保證、承兌、租賃、發行公司債及其他有價證券等資金融通事項之授權、執行與記錄等之政策及程序。
                </div>
              </li>
            </ul>

            <a class="btn btn-tertiary" href="index.html#contact">聯絡我們</a>
          </div>
          <!-- end of col -->
        </div>
        <!-- end of row -->
      </div>
      <!-- end of container -->
    </div>
    <!-- end of ex-basic-1 -->
    <!-- end of basic -->
  `;
});

var sourceData = {
  nav: {
    title: "萊恩設計",
    logo: "../../../glitterBundle/img/logo.svg",
    bar: [
      { name: "關於我們", link: ["about"] },
      { name: "服務項目", link: ["services"] },
      { name: "公司作品", link: ["work"] },
      {
        name: "更多內容",
        list: [
          { name: "定價方案", link: ["plans"] },
          { name: "客戶評價", link: ["test"] },
          { name: "聯絡我們", link: ["contact"] },
        ],
      },
    ],
    stack: [
      { icon: "fa-facebook-f", link: "https://www.facebook.com/" },
      { icon: "fa-twitter", link: "https://twitter.com/" },
    ],
  },
  footer: {
    intro: {
      title: "萊恩設計",
      desc: "提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站",
      social: [
        { icon: "fab fa-facebook-f", link: "https://www.facebook.com/" },
        { icon: "fab fa-twitter", link: "https://twitter.com/" },
        { icon: "fab fa-instagram", link: "https://www.instagram.com/" },
      ],
    },
    map: [
      {
        title: "網站導覽",
        list: [
          { name: "關於我們", link: ["about"] },
          { name: "定價方案", link: ["plans"] },
          { name: "公司作品", link: ["work"] },
          { name: "客戶評價", link: ["test"] },
          { name: "聯絡方式", link: ["contact"] },
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
  },
  keyVision: {
    img: "assets/images/home.jpg",
    rgba: "rgba(120, 120, 120, 0.75)",
    position: "start",
    headline: `打造優質<span class="home_text">網路服務</span><br />選擇萊恩設計`,
    desc: "優質服務範圍包括網路連線諮詢與整合、受管理網路服務和軟體定義的網路",
    iconline: [
      { icon: "fas fa-laptop-house", desc: "更穩定的網路" },
      { icon: "fas fa-wifi", desc: "更快速的網速" },
    ],
    btn: { name: "了解更多", link: "https://squarestudio.tw/" },
  },
  info: [
    { icon: "fa-user-tie", title: "完整服務", desc: "專人提供聯絡，良好的需求溝通管道與理解速度" },
    { icon: "fa-tools", title: "優質技術", desc: "使用業界上最成熟的技術，生產過許多類型的產品與樣板" },
    { icon: "fa-clock", title: "兩年維護", desc: "產品完成後，我們將提供兩年的免費保固維護" },
  ],
  about: {
    title: "關於萊恩設計<br />我們能為您做什麼？",
    desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務<br><br>資料視覺化的長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現；企業管理中的薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統<br><br>學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群平台",
    img: "./assets/images/about.jpg",
    btn: { name: "查看更多", link: ["#"] },
  },
  services: {
    title: "RWD響應式網頁 · SEO關鍵字搜尋 · 萊恩設計專業客製",
    subTitle: "社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站",
    list: [
      {
        id: 1,
        icon: "fas fa-store",
        title: "電商應用",
        desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
        link: ["article"],
      },
      {
        id: 2,
        icon: "fas fa-chart-bar",
        title: "資料視覺化",
        desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
        link: ["article"],
      },
      {
        id: 3,
        icon: "fas fa-building",
        title: "企業管理",
        desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
        link: ["article"],
      },
      {
        id: 4,
        icon: "fas fa-home",
        title: "個人網站",
        desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
        link: ["article"],
      },
      {
        id: 5,
        icon: "fas fa-globe-americas",
        title: "社群平台",
        desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
        link: ["article"],
      },
      {
        id: 6,
        icon: "fas fa-code",
        title: "線上課程網站",
        desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
        link: ["article"],
      },
    ],
  },
  plans: {
    title: "RWD響應式網頁 · SEO關鍵字搜尋 · 萊恩設計專業客製",
    subTitle: "社群平台、電商網站、個人部落格、企業管理、線上課程、資料視覺化等…功能網站",
    list: [
      {
        title: "A方案",
        desc: "基本方案，最基本的開發環境",
        detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C", not: true }],
        price: "$249元／每月",
        btn: { name: "選擇方案", link: ["#"] },
      },
      {
        title: "B方案",
        desc: "黃金方案，提供多個開發需求與一個 WEB 視覺設計",
        detail: [{ text: "功能 A" }, { text: "功能 B", not: true }, { text: "功能 C" }],
        price: "$399元／每月",
        btn: { name: "選擇方案", link: ["#"] },
      },
      {
        title: "C方案",
        desc: "白金方案，個性化開法與 APP 雙平台的上架",
        detail: [{ text: "功能 A" }, { text: "功能 B" }, { text: "功能 C" }],
        price: "$799元／每月",
        btn: { name: "選擇方案", link: ["#"] },
      },
    ],
  },
  work: {
    title: "優良的公司文化 · 創新彈性的工作環境",
    desc: "我們的員工喜歡萊恩設計的美式文化管理方針，以及富有創造力與彈性的工作環境，同時在這優良的傳統中，持續將產品優化，是我們共同維護的榮譽",
    list: [
      { icon: "fas fa-briefcase", num: 1258, title: "歷史專案數" },
      { icon: "fas fa-award", num: 150, title: "專利數量" },
      { icon: "fas fa-users", num: 642, title: "員工數" },
      { icon: "fas fa-clock", num: 86, title: "平均開發時間（工作日）" },
    ],
  },
  test: {
    title: "給客戶滿意的網站設計，是我們致力奉獻的服務",
    desc: "可以看看我們的客戶與業主給我們什麼樣的回饋！",
    list: [
      {
        name: "陳志賢",
        pro: "平面設計師",
        img: "./assets/images/testimonial-1.jpg",
        text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
      },
      { name: "陳佳玲", pro: "寵物店 店長", img: "./assets/images/testimonial-2.jpg", text: "萊恩設計公司的服務與溝通方式很友善" },
      { name: "韓俊榮", pro: "XX拉麵 廚師兼店長", img: "./assets/images/testimonial-3.jpg", text: "合作得很愉快，很喜歡萊恩設計" },
      {
        name: "黃國玟",
        pro: "OO診所 護理師",
        img: "./assets/images/testimonial-4.jpg",
        text: "達成客戶的需求，替客戶早一步想到問題點很棒",
      },
    ],
  },
  subs: { desc: "想收到與萊恩設計有關的最新消息及網站資訊，請立即訂閱我們的電子報，我們會將資訊傳送至你的信箱。" },
  contact: {
    title: "想傳達您的訊息給萊恩設計嗎？",
    desc: "若想要了解我們的服務<br />填妥以下表單，萊恩設計將儘速回應您。",
    img: "./assets/images/contact.jpg",
  },
  location: [
    { icon: "far fa-map", title: "地址", text: "台中市臺灣大道二段285號20樓" },
    { icon: "fas fa-mobile-alt", title: "電話／手機", text: "(886) 0978-028-730" },
    { icon: "far fa-envelope", title: "電子信箱", text: "jianzhi.wang@ncdesign.info" },
    { icon: "far fa-clock", title: "營業時間", text: "週一至週五 09:00 ~ 19:00" },
  ],
  article: [
    { id: 1, title: "電商應用", art: fakeArticle },
    { id: 2, title: "資料視覺化", art: fakeArticle },
    { id: 3, title: "企業管理", art: fakeArticle },
    { id: 4, title: "個人網站", art: fakeArticle },
    { id: 5, title: "社群平台", art: fakeArticle },
    { id: 6, title: "線上課程網站", art: fakeArticle },
  ],
};
