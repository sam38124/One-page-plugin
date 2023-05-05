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
      { name: "產品特色", link: "#focus" },
      { name: "定價方案", link: "#price" },
      { name: "聯絡我們", link: "#contact" },
      { name: "服務範圍", link: "#service" },
      {
        name: "更多內容",
        list: [
          { name: "公司團隊", link: "#team" },
          { name: "常見問題", link: "#faq" },
          { name: "作品案例", link: "#portfolio" },
          { name: "最新消息", link: "#news" },
        ],
      },
      {
        name: "目錄",
        mode: "mega",
        list: [
          [
            { name: "目錄 1A", link: "#" },
            { name: "目錄 1B", link: "#" },
            { name: "目錄 1C", link: "#" },
            { name: "目錄 1D", link: "#" },
          ],
          [
            { name: "目錄 2A", link: "#" },
            { name: "目錄 2B", link: "#" },
            { name: "目錄 2C", link: "#" },
            { name: "目錄 2D", link: "#" },
          ],
          [
            { name: "目錄 3A", link: "#" },
            { name: "目錄 3B", link: "#" },
            { name: "目錄 3C", link: "#" },
            { name: "目錄 3D", link: "#" },
          ],
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
  keyVision: {
    title: "關於萊恩設計，我們能為您做什麼？",
    desc: "優質服務範圍包括網路連線諮詢與服務，從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
    img: "assets/img/hero-fullscreen-bg.jpg",
    btn: { name: "點此了解", link: "#" },
    video: { name: "觀賞影片", link: "https://www.youtube.com/watch?v=LXb3EKWsInQ" },
  },
  footer: {
    info: {
      title: "萊恩設計",
      list: [
        { icon: "bi bi-map", title: "台中市臺灣大道二段285號20樓" },
        { icon: "bi bi-telephone", title: "(886) 0978-028-730" },
        { icon: "bi bi-alarm", title: `週一至週五 09:00 AM – 19:00 PM` },
        { icon: "bi bi-envelope", title: `jianzhi.wang@ncdesign.info` },
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
    link: [
      "https://twitter.com/",
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://www.skype.com/",
      "https://linkedin.com/",
    ],
  },
  banner: [
    { icon: "bi bi-activity", title: "機台維護", desc: "日常維護保養，並進行故障排除、生產設備零件更換" },
    { icon: "bi bi-bounding-box-circles", title: "資訊安全", desc: "網路、網際網路、端點、API、雲端、應用程式" },
    { icon: "bi bi-calendar4-week", title: "客製化設定", desc: "設計預算有限也不影響製作品質，打造專屬頁面" },
    { icon: "bi bi-broadcast icon", title: "即時線上服務", desc: "提供即時與處理緊急狀況的撥打專線，替您解除危機" },
  ],
  about: {
    title: "萊恩設計的介紹",
    desc: "我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署<br/>我們皆能一條龍的替您服務到好",
    img: "assets/img/about.jpg",
    slogan: "只要有需求，我來打造專屬於你的系統",
    list: [
      {
        tab: "科技界定身分",
        content: `<p>
            乍看之下，此項進展迅速的科技革新和非洲農民或蒙古牧民似乎沒什麼關係，但多虧了電話網路，才將這些人與科技連結起來。目前世界上每3人就有2人擁有或使用手機，就連在非洲撒哈拉沙漠以南的低度開發國家也很常見。現代人主要透過手機（電信）交流，網際網路反倒不如手機這般普及
            </p>
            <p class="py-2">
            據統計，已開發國家的每5個家庭有4個能上網，低度開發國家則降至每10個家庭還不到1個有網路。我們有理由擔心這樣的科技鴻溝（或者說數位鴻溝），但無法簡單將此現象與其他社會問題畫上等號。不難想見，不同的年齡層也隔著上述鴻溝。根據英國2016年的1份調查，近3個月曾使用網際網路的比例，16歲至24歲人士超過99％，75歲以上人士僅39％。
            </p>
            <p class="py-2">
            網際網路的使用情況僅代表趨勢的一角。行動網路讓網路使用模式轉向「永遠在線」的心態。1990年代出生的人，即所謂的「Z世代」，從未見識過無電腦和手機的年代，而這些人現在陸續成年。2011年，英國有份調查取樣16歲至24歲人士，發現45％的人覺得處在「上線」狀態的時候最快樂。現在多數公司會要求員工以手機和電郵隨時聯繫，人們也會利用手機與電郵在上班時間處理家務或私人事務，職場與家庭的界線也因此被打破。
            </p>
            <p class="mb-4">
            類似統計不勝枚舉，箇中意涵卻非顯而易見。若以當前統計數據外推，意謂著10年過後，全世界會有四分之三的人擁有手機。然而使用手機對肯亞農人或蒙古牧民，以及對倫敦金融中心的交易員來說，結果是兩碼子事。
            </p>`,
      },
      {
        tab: "人類大未來",
        content: `
            <div class="text-box">
              <h3>書籍介紹</h3>
              <p>
              街上人們踩著懸浮滑板，出門再也不用自己開車；科學家發明能讓人感到幸福的藥丸，基因改造讓人們永遠不再生病；AI就是你的管家，生活大小事都靠機器人打理；蜘蛛絲能建造出比鋼筋更堅固的橋，有記憶的金屬能夠自動修復；週末搭太空船去月球旅行；時光機讓你回到過去挽回曾經犯下的錯……
              </p>
            </div><p class="pb-3">
            若說我們可從中得出以下關乎人類未來的啟示，應不至於有爭議：每個人的身分不再像過去那般單一且固定，將變得比我們想像的更多元。我們在不同的情況下使用不同的身分；這些身分互有重疊而且日益難分，卻又能清楚地以不同的方式劃定個人的觀點和選擇。特別是傳統用來界定身分的社會標準（例如年齡和國籍）都將不再那麼重要，公私身分的界線也變得越來越模糊。以社會階級、族群歸屬、政治立場為本的身分定義，將讓位給新的劃分標準，例如出身城鄉或教育程度的高低。
            </p>
            <p class="pb-3">
            如果個人身分的傳統特質變得支離破碎，可以想見未來社群的向心力將會更為疏遠，社會階層的流動性降低或是邊緣化，讓種族隔離或極端主義有機可趁。但換個角度來看，科技及網路帶來人際關係的「超連結」（hyperconnectivity），將有機會強化正向群體認同，賦予營造社群的新契機。未來，無論是生活或身分，人與人都會逐漸變得密不可分。這究竟是好事還是壞事？我認為有好也有壞，而且不論何者的影響都會越來越大。
            </p>`,
      },
      {
        tab: "清單列表",
        content: `<ul class="list-unstyled li-space-lg mb-5">
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>銷售及收款循環</strong> 包括訂單處理、授信管理、運送貨品、開立銷貨發票、開出帳單、記錄收入及應收帳款、執行與記錄現金收入等之政策及程序。
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>採購及付款循環</strong> 包括請購、進貨或採購原料、物料、資產和勞務、處理採購單、經收貨品、檢驗品質、填寫驗收報告書或處理退貨
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>生產循環</strong> 包括擬訂生產計畫、開立用料清單、儲存材料、投入生產、計算存貨生產成本、計算銷貨成本等之政策及程序。
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>薪工循環</strong> 包括僱用、請假、加班、辭退、訓練、退休、決定薪資率、計時、計算薪津總額、計算薪資稅及各項代扣款、設置薪資紀錄
                </div>
              </li>
              <li class="d-flex py-2">
                <i class="bi bi-check2"></i>
                <div class="flex-grow-1">
                  <strong>融資循環</strong> 包括借款、保證、承兌、租賃、發行公司債及其他有價證券等資金融通事項之授權、執行與記錄等之政策及程序。
                </div>
              </li>
            </ul>`,
      },
    ],
  },
  client: [
    "assets/img/clients/client-1.png",
    "assets/img/clients/client-2.png",
    "assets/img/clients/client-3.png",
    "assets/img/clients/client-4.png",
    "assets/img/clients/client-5.png",
    "assets/img/clients/client-6.png",
    "assets/img/clients/client-7.png",
    "assets/img/clients/client-8.png",
  ],
  action: {
    title: "想要得到 <em>萊恩設計</em> 的相關資訊嗎？",
    desc: "提供直覺的操作，讓您在電腦、平板、手機都能隨心所欲地瀏覽您的網站，我們擅長達成客戶的需求，替客戶早一步想到問題點",
    img: "assets/img/cta.jpg",
    btn: { name: "聯絡我們", link: "#contact" },
  },
  focus: {
    video: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    title: "我們的特色 — 星澄基地",
    desc: `提供您企業，社團，電商，教育與自媒體應用的最佳解決方案，免後台串接免程式開發，幾項設定步驟就能為您打造屬於您的專屬應用，例如網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地。<ul>
                <li><i class="bi bi-check-circle"></i> 網路、網際網路、端點、API、雲端、應用程式以及容器等各項與網路有關的安全機制</li>
                <li><i class="bi bi-check-circle"></i> 設計預算有限也不影響製作品質，打造您專屬的設定頁面</li>
                <li><i class="bi bi-check-circle"></i> 從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務</li>
              </ul>`,
    btn: { name: "馬上前往", link: "#" },
  },
  feature: [
    {
      icon: { name: "bi bi-binoculars", color: "#F9BA2B" },
      tab: "文教",
      title: "田地在走，科技要有",
      desc: `因應「智慧機械、亞洲矽谷、綠能科技、生醫產業、國防產業」及「新農業、循環經濟」等5+2產業創新政策，屏東縣政府、行政院農業委員會農糧署與國立屏東科技大學共同合作，於8月9-10日在屏東智慧農業學校舉辦為期兩天的「農機操作保養訓練班」，共有40名參與，10日縣府勞動暨青年發展處黃鼎倫處長特地到場參與結業式並鼓勵屏東青年投入智慧農業的行列，讓農村產業轉型升級。`,
      img: "assets/img/features-1.svg",
    },
    {
      icon: { name: "bi bi-box-seam", color: "#E92BF9" },
      tab: "消費",
      title: "庇護工場推中秋伴手禮 即日起開放預購",
      desc: `中秋節即將到來，新竹市勞工處攜手3家庇護工場推出特色伴手禮，分別有喜憨兒月餅禮盒、慢飛兒咖啡禮盒還有竹夢園手工香皂禮盒，歡迎企業團體踴躍採購。喜憨兒和慢飛兒推出應景的中秋禮盒送禮或是自用都相當適合，另一家庇護工場竹夢園以清潔工作為主，主打「喜迎中秋淨來」精美手工皂禮盒與環保清潔劑。`,
      img: "assets/img/features-2.svg",
    },
    {
      icon: { name: "bi bi-brightness-high", color: "#2B75F9" },
      tab: "社會",
      title: "eTrade hub跨境電商大講堂",
      desc: `eTrade hub「電商大講堂」網羅各鏈路跨境電商專業講師，連結產業動態與實務操作，擘劃一套系統性的學習課程，依照企業需求從初階到進階、從操作教學到成功個案分享，札實的內容獲得許多正面的迴響。剛結束的「基礎學程」起步篇，就以平台選擇、商標佈局、選品技巧為軸，吸引逾百位企業員工參與，近90%的學員表示整體課程內容相當實用、高達85%對於講師授課方式與互動表示滿意，更有學員反映「此系列課程幫助企業增廣見聞，讓企業能以新的思維，進行多方嘗試」，成效斐然。`,
      img: "assets/img/features-3.svg",
    },
    {
      icon: { name: "bi bi-command", color: "#63F92B" },
      tab: "產能",
      title: "掌握關鍵新動能 布局高雄大未來",
      desc: `大南方崛起，蓄積多項產業轉型關鍵動能的高雄，從重工業之都蛻變高科技新城，全臺目光聚焦高雄，「投資高雄正對時」！高雄市政府今(10)日於高雄林皇宮舉辦「111年投資高雄城市產業論壇」，由財訊雙週刊社長謝金河主持，會中邀請高雄市政府副秘書長王啓川、經濟發展局局長廖泰翔、都市發展局副局長王屯電、學界代表及在地產業代表，從「高科技S廊道成形，掌握高雄轉型關鍵動能」與「高雄新生活，活化整合接軌國際」兩大主題，探討在各產業進駐下市府積極推動產業轉型、打造宜居高雄環境，一同預見更美好的高雄。`,
      img: "assets/img/features-4.svg",
    },
    {
      icon: { name: "bi bi-easel", color: "#2BF9F9" },
      tab: "影音",
      title: "發呆系歌手 沈安『不稀罕別人給的完整╱狂奔』",
      desc: `『不稀罕別人給的完整╱狂奔』MV由林世穎& 陶磊兩位新銳導演執導拍攝，延續首部曲『白日夢的悲哀』在白日夢者超現實的迴圈後，畫面節奏跟著狂奔想像堆疊增加速度感，為MV特製的300公分高復刻沈安發呆容貌的大型「發呆至尊寶」呆呆搖擺人入鏡，雙寶共同激起白日夢們的生活情趣熱點。沈安說『“小明一個人在街上跳舞被罵是瘋子，於是他找了朋友跟他一起跳被罵是兩個瘋子。那請問小明找了幾個朋友?” 沈安回憶著他小學到現在都解不開的題目:“朋友要去那裡找?”』，以黑色幽默帶入白日夢者們在異想世界中的同溫層。`,
      img: "assets/img/features-5.svg",
    },
    {
      icon: { name: "bi bi-map", color: "#F53D3D" },
      tab: "藝術",
      title: "如何正確而有《次第》的學習翡翠",
      desc: `玉雕是【减法藝術】，力道偏了，就完全沒有後悔和逆轉的機會了。翡翠玉雕跟石雕不同，石雕的材質裡外基本上是一致的，雕刻時不必顧慮材料的變化因素，可以依據創作的擬稿將創意圖示保持完善，在構思創作上相對自由，能自在發揮創意。但，翡翠玉雕有許多無法掌握的因素，玉料裡頭颜色的變化和一吋吋的綹裂出現，該怎樣避開裂和利用色都要立即隨機應變，處處如履薄冰，刀刀要慎之又慎，絲毫不能有半點差池。`,
      img: "assets/img/features-6.svg",
    },
  ],
  service: {
    title: "產品服務項目",
    desc: "我們提供系統前後台或網頁設計，從一開始的產品規劃與需求傾聽，再到頁面、Logo設計、UI／UX，最後的軟體開發與部署，我們皆能一條龍的替您服務到好。",
    list: [
      {
        img: "assets/img/services-1.jpg",
        icon: "bi bi-activity",
        title: "電商應用",
        desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務",
        link: "#",
      },
      {
        img: "assets/img/services-2.jpg",
        icon: "bi bi-broadcast",
        title: "資料視覺化",
        desc: "無論是長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現",
        link: "#",
      },
      {
        img: "assets/img/services-3.jpg",
        icon: "bi bi-easel",
        title: "企業管理",
        desc: "薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
        link: "#",
      },
      {
        img: "assets/img/services-4.jpg",
        icon: "bi bi-bounding-box-circles",
        title: "個人網站",
        desc: "網紅經營部落格、分享資訊、個人專屬的網站，給您發揮自己獨創想法的天地",
        link: "#",
      },
      {
        img: "assets/img/services-5.jpg",
        icon: "bi bi-calendar4-week",
        title: "社群平台",
        desc: "學校社團經營、企業舉辦活動等內外部組職，都能擁有一個功能完善、畫面優美、自主管理的社群環境",
        link: "#",
      },
      {
        img: "assets/img/services-6.jpg",
        icon: "bi bi-chat-square-text",
        title: "線上課程網站",
        desc: "快速建立課程網站、價格差異、金流串接、自動寄送通知，講師學員皆能迅速了解資訊的課程網",
        link: "#",
      },
    ],
  },
  test: [
    {
      name: "陳志賢",
      pro: "平面設計師",
      img: "assets/img/testimonials/testimonials-2.jpg",
      text: "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識",
    },
    { name: "陳佳玲", pro: "寵物店 店長", img: "assets/img/testimonials/testimonials-1.jpg", text: "萊恩設計公司的服務與溝通方式很友善" },
    { name: "韓俊榮", pro: "XX拉麵 廚師兼店長", img: "assets/img/testimonials/testimonials-3.jpg", text: "合作得很愉快，很喜歡萊恩設計" },
    {
      name: "黃國玟",
      pro: "OO診所 護理師",
      img: "assets/img/testimonials/testimonials-4.jpg",
      text: "達成客戶的需求，替客戶早一步想到問題點很棒",
    },
  ],
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
    desc: `前往星澄基地，快速打造專屬於您的系統，製作自己想要的網站`,
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
    img: "assets/img/faq.jpg",
  },
  portfolio: {
    title: "作品案例",
    desc: "萊恩設計接手過400+的案件，網頁設計與 APP 製作流程非常值得信賴",
    tag: [
      { className: "*", title: "所有案例" },
      { className: ".app", title: "APP", color: "indigo" },
      { className: ".web", title: "網頁設計", color: "purple" },
      { className: ".cms", title: "後台系統", color: "red" },
      { className: ".dashboard", title: "資料分析", color: "orange" },
      { className: ".ble", title: "藍芽產品", color: "green" },
    ],
    list: [
      {
        title: "高雄醫藥大學",
        sub: "高雄醫藥大學校友聯繫平台 (Android / iOS)",
        tag: ["app", "cms"],
        img: "assets/img/portfolio/app-1.jpg",
      },
      {
        title: "橙的電子",
        sub: "胎壓偵測器之物聯網後台平台 (WEB)",
        tag: ["cms", "dashboard", "web"],
        img: "assets/img/portfolio/books-1.jpg",
      },
      { title: "緒玹科技", sub: "外包媒合平台 (Android / iOS)", tag: ["app"], img: "assets/img/portfolio/books-1.jpg" },
      { title: "御天科技", sub: "GOT-IT EIP (Android / iOS)", tag: ["app"], img: "assets/img/portfolio/app-2.jpg" },
      { title: "緒玹科技", sub: "外包媒合平台 WEB", tag: ["web"], img: "assets/img/portfolio/product-1.jpg" },
      {
        title: "Petstagram寵生活",
        sub: "為寵物量身打造的社群媒體平台",
        tag: ["app", "web"],
        img: "assets/img/portfolio/product-3.jpg",
      },
      {
        title: "橙的電子",
        sub: "Android 手持應用終端 Sensor 燒錄器",
        tag: ["ble", "app"],
        img: "assets/img/portfolio/branding-2.jpg",
      },
      {
        title: "橙的電子",
        sub: "後端數據分析平台",
        tag: ["cms", "dashboard", "web"],
        img: "assets/img/portfolio/branding-2.jpg",
      },
      {
        title: "緒玹科技",
        sub: "訂單與薪資管理 (Android / iOS / WEB)",
        tag: ["cms", "app", "web"],
        img: "assets/img/portfolio/books-1.jpg",
      },
      {
        title: "橙的電子",
        sub: "胎壓偵測器之物聯網接收",
        tag: ["app", "ble"],
        img: "assets/img/portfolio/branding-1.jpg",
      },
      { title: "橙的電子", sub: "USB-PAD藍芽無線燒錄器", tag: ["app", "ble"], img: "assets/img/portfolio/product-2.jpg" },
      {
        title: "星澄基地",
        sub: "星澄基地，跨站式程式開發平台．",
        tag: ["web", "cms", "dashboard"],
        img: "assets/img/portfolio/branding-1.jpg",
      },
      {
        title: "星澄基地",
        sub: "星澄基地，一站式後台管理平台．",
        tag: ["web", "cms", "dashboard"],
        img: "assets/img/portfolio/books-3.jpg",
      },
      { title: "萊恩設計", sub: "官方形象網站", tag: ["web"], img: "assets/img/portfolio/app-3.jpg" },
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
      { img: "assets/img/team/team-2.jpg",
        name: "陳佳玲",
        pro: "系統規劃師",
        link: ["https://squarestudio.tw", "#"] },
    ],
  },
  news: {
    title: "最新消息",
    desc: "有關《萊恩設計部落格》的最新消息都在這裡",
    list: [
      {
        id: 1,
        img: "https://www-image-cdn.darencademy.com/images/backend/article/x0ae9db6cd34de4aeaaaca0f5538688db.jpg.pagespeed.ic.MabxCeLHhW.webp",
        tag: "新聞",
        ago: "5 分鐘前",
        title: "你常覺得自己不夠優秀嗎？關於「比較」這件事",
        desc: "很多人看我現在自己創立公司，常覺得我應該一路都一帆風順，沒經歷這種因比較而產生的焦慮。但事實上，關於「比較｣這件事情，我的辛酸血淚史可是非常豐富啊",
        author: { id: 12, name: "姚詩豪", img: "assets/img/avatar/avatar-1.png", job: "自由工作者" },
        btn: { name: "閱讀更多", link: "#" },
      },
      {
        id: 2,
        img: "https://www.darencademy.com/images/backend/article/x3edb38da23c8c0391387f00e47acabf9.jpg.pagespeed.ic.-S84TYYMtK.webp",
        tag: "職場策略",
        ago: "13 分鐘前",
        title: "三個方法讓你勇敢說不，避免被工作壓得喘不過氣",
        desc: "不論客觀來說是否為真，但相信每個上班族或多或少都會有種「為什麼每次倒霉的都是我」或「為什麼我總是最忙的那個」的感覺。有時候可能只是自己的感覺（客觀來說，搞不好大家都超忙）",
        author: { id: 15, name: "MH", img: "assets/img/avatar/avatar-3.png", job: "新聞記者" },
        btn: { name: "閱讀更多", link: "#" },
      },
      {
        id: 3,
        img: "https://www.darencademy.com/images/backend/article/x9ad6b1201ff4a719a84d0363762bc7d1.jpg.pagespeed.ic.Xrev0XWc-z.webp",
        tag: "如何思考",
        ago: "3 小時前",
        title: "《最強提問力》讀後心得：學會提問比找答案更加重要",
        desc: "愛因斯坦曾經說過：「如果我只有一個小時可以解決一個攸關自身性命的問題，我一定會把前五十五分鐘都拿來判斷我該問的問題是什麼？」諷刺的是，到了二十一世紀資訊爆炸的年代，我們隨時",
        author: { id: 6, name: "WAKI 瓦基", img: "assets/img/avatar/avatar-2.png", job: "作家" },
        btn: { name: "閱讀更多", link: "#" },
      },
    ],
  },
  contact: {
    title: "聯絡我們 Contact Us",
    desc: "想要更加了解我們的服務？填妥以下表單，或直接聯絡信箱，萊恩設計將儘速回應您。",
    map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621",
    info: [
      { icon: "bi bi-geo-alt", title: "地址", text: "台中市臺灣大道二段285號20樓" },
      { icon: "bi bi-phone", title: "電話", text: "(886) 0978-028-730" },
      { icon: "bi bi-clock", title: "營業時間", text: "週一至週五 09:00 AM – 19:00 PM" },
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
