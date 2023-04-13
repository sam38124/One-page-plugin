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
                    let db = new Dashboard();
                    let sourceData = {
                        pageTitle: "儀表板",
                        data: [
                            {
                                mode: "colCard",
                                col: { pc: 3, tab: 4 },
                                card: [
                                    { icon: "uil uil-laughing", title: "活躍使用者", value: 308, up: "5.27%", desc: "自上週以來" },
                                    { icon: "dripicons-checkmark", title: "登入總人數", value: 560, down: "1.08%", desc: "自上週以來" },
                                    { icon: "uil uil-cloud-computing", title: "會員總數", value: 13094, up: "3.44%", desc: "自去年以來" },
                                ],
                            },
                            {
                                mode: "smooth_Line",
                                col: { pc: 9, tab: 8 },
                                title: "全球科技股市即時線圖",
                                data: {
                                    series: db.stockLine(3, 10),
                                },
                            },
                            {
                                mode: "table_barChart",
                                col: { pc: 4, tab: 12 },
                                title: "台灣專輯排行榜",
                                data: {
                                    series: [{ name: "專輯總數", data: db.numberObjList(9) }],
                                    color: "#0acf97",
                                },
                                table: [
                                    { 專輯: "GOLDEN 太子 BRO", 年度: 2022, 排名: 6 },
                                    { 專輯: "我要我們在一起", 年度: 2000, 排名: 1 },
                                    { 專輯: "順著河流走", 年度: 2017, 排名: 28 },
                                    { 專輯: "為了愛夢一生", 年度: 1991, 排名: 4 },
                                    { 專輯: "Ugly Beauty", 年度: 2019, 排名: 2 },
                                ],
                            },
                            {
                                mode: "radar",
                                col: { pc: 4, tab: 6 },
                                title: "瀏覽器品牌市佔率",
                                data: {
                                    series: [{ name: "市佔率", data: db.numberList(6) }],
                                    labels: ["Chrome", "Firefox", "Safari", "Opera", "Edge", "Explorer"],
                                    color: "#727cf5",
                                },
                            },
                            {
                                mode: "multiRadial",
                                col: { pc: 4, tab: 6 },
                                title: "作業系統銷售總表",
                                detail: {
                                    title: "作業系統",
                                    data: [
                                        { name: "品牌系統", value: 5510 },
                                        { name: "自定義系統", value: 2031 },
                                        { name: "自由／免費系統", value: 850 },
                                        { name: "其他系統", value: 72 },
                                    ],
                                },
                                data: {
                                    series: db.numberList(4),
                                    labels: ["Windows", "Macintosh", "Linux", "Android"],
                                    color: ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"],
                                },
                            },
                            {
                                mode: "table",
                                col: { pc: 4, tab: 6 },
                                title: "英國觀光景點遊客流量",
                                table: [
                                    { 景點: "Tower of London", "觀光客數量/小時": 5228, 飽和程度: { td_catalog: "processBar", color: "#E59866", percent: 27 } },
                                    {
                                        景點: "Buckingham Palace",
                                        "觀光客數量/小時": 2536,
                                        飽和程度: { td_catalog: "processBar", color: "#82E0AA", percent: 82 },
                                    },
                                    {
                                        景點: "Piccadilly Circus",
                                        "觀光客數量/小時": 1425,
                                        飽和程度: { td_catalog: "processBar", color: "#CB4335", percent: 46 },
                                    },
                                    {
                                        景點: "Kensington Palace",
                                        "觀光客數量/小時": 560,
                                        飽和程度: { td_catalog: "processBar", color: "#3498DB", percent: 65 },
                                    },
                                    { 景點: "Stonehenge", "觀光客數量/小時": 205, 飽和程度: { td_catalog: "processBar", color: "#212F3D", percent: 36 } },
                                ],
                            },
                            {
                                mode: "table",
                                col: { pc: 4, tab: 6 },
                                title: "社群平台每日使用者(萬)",
                                table: [
                                    { 平台: "Facebook", 使用者: 5228, 滯留時間: { td_catalog: "processBar", color: "#3498DB", percent: 27 }, 運作: 1 },
                                    { 平台: "Line", 使用者: 2536, 滯留時間: { td_catalog: "processBar", color: "#3498DB", percent: 82 }, 運作: 1 },
                                    { 平台: "Instagram", 使用者: 1425, 滯留時間: { td_catalog: "processBar", color: "#3498DB", percent: 46 }, 運作: 1 },
                                    { 平台: "Twitter", 使用者: 560, 滯留時間: { td_catalog: "processBar", color: "#3498DB", percent: 65 }, 運作: 1 },
                                    { 平台: "LinkedIn", 使用者: 205, 滯留時間: { td_catalog: "processBar", color: "#3498DB", percent: 36 }, 運作: 1 },
                                ],
                            },
                            {
                                mode: "table",
                                col: { pc: 4, tab: 6 },
                                title: "中山路汽機車通勤速度",
                                table: [
                                    { "時速 (公里)": "0-30", 車輛總數: 2250, 違規數: 177 },
                                    { "時速 (公里)": "31-60", 車輛總數: 11501, 違規數: 924 },
                                    { "時速 (公里)": "61-120", 車輛總數: 758, 違規數: 57 },
                                    { "時速 (公里)": "121-240", 車輛總數: 12, 違規數: 0 },
                                ],
                            },
                            {
                                mode: "dataCard",
                                col: { pc: 12, tab: 12 },
                                card: [
                                    {
                                        col: { pc: 3, tab: 6 },
                                        title: "存貨",
                                        value: 9184,
                                        up: "3.27%",
                                        type: "bar",
                                        data: {
                                            series: db.numberList(10),
                                            color: "#727cf5",
                                        },
                                    },
                                    {
                                        col: { pc: 3, tab: 6 },
                                        title: "應收帳款(千)",
                                        value: 3254,
                                        down: "5.38%",
                                        type: "line",
                                        data: {
                                            series: db.numberList(10),
                                            color: "#0acf97",
                                        },
                                    },
                                    {
                                        col: { pc: 3, tab: 6 },
                                        title: "運費(千)",
                                        value: 864,
                                        up: "4.87%",
                                        type: "bar",
                                        data: {
                                            series: db.numberList(12),
                                            color: "#fa5c7c",
                                        },
                                    },
                                    {
                                        col: { pc: 3, tab: 6 },
                                        title: "本期收益",
                                        value: "$253k",
                                        up: "11.7%",
                                        type: "bar",
                                        data: {
                                            series: db.numberList(10),
                                            color: "#ffbc00",
                                        },
                                    },
                                    {
                                        col: { pc: 6, tab: 12 },
                                        title: "營運成本",
                                        value: 1845766,
                                        down: "2.97%",
                                        type: "bar",
                                        data: {
                                            series: db.numberList(20),
                                            color: "#5BB3EF",
                                        },
                                    },
                                    {
                                        col: { pc: 6, tab: 12 },
                                        title: "市值",
                                        value: 542923534,
                                        down: "5.38%",
                                        type: "line",
                                        data: {
                                            series: db.numberList(18),
                                            color: "#9BD836",
                                        },
                                    },
                                ],
                            },
                            {
                                mode: "radial",
                                col: { pc: 5, tab: 12 },
                                title: "人資部門-面試信件統計表",
                                data: [
                                    { value: 1320, series: 86, labels: "全部信件", color: "#0acf97", icon: "uil uil-envelope" },
                                    { value: 470, series: 55, labels: "重要文件", color: "#fa5c7c", icon: "uil uil-sign-right" },
                                    { value: 850, series: 26, labels: "已查閱", color: "#ffbc00", icon: "uil uil-book-open" },
                                ],
                            },
                            {
                                mode: "revenue",
                                col: { pc: 7, tab: 12 },
                                title: "公司收益",
                                detail: [
                                    { name: "上個月", value: 42025 },
                                    { name: "本月", value: 74651 },
                                ],
                                data: {
                                    series: [
                                        { name: "總收入", type: "area", data: db.numberList(12) },
                                        { name: "總支出", type: "line", data: db.numberList(12) },
                                    ],
                                    labels: monthTW(),
                                    color: ["#727cf5", "#0acf97"],
                                    yaxis: { title: "Revenue (TWD)" },
                                },
                            },
                            {
                                mode: "table",
                                col: { pc: 4, tab: 6 },
                                title: "本月KPI領先者",
                                stripe: true,
                                table: [
                                    {
                                        員工: { td_catalog: "h5_span", h5: "王妍凱", span: "業務一部 - Junior" },
                                        訂單數: 187,
                                        完成數: 145,
                                        "銷售額(萬)": 73,
                                    },
                                    {
                                        員工: { td_catalog: "h5_span", h5: "陳建紫", span: "業務一部 - Senior" },
                                        訂單數: 235,
                                        完成數: 205,
                                        "銷售額(萬)": 33,
                                    },
                                    {
                                        員工: { td_catalog: "h5_span", h5: "陸俊賢", span: "業務二部 - Senior" },
                                        訂單數: 257,
                                        完成數: 140,
                                        "銷售額(萬)": 85,
                                    },
                                    {
                                        員工: { td_catalog: "h5_span", h5: "林聖吉", span: "業務一部 - Junior" },
                                        訂單數: 485,
                                        完成數: 105,
                                        "銷售額(萬)": 178,
                                    },
                                    {
                                        員工: { td_catalog: "h5_span", h5: "楊國維", span: "業務三部 - Senior" },
                                        訂單數: 657,
                                        完成數: 255,
                                        "銷售額(萬)": 369,
                                    },
                                ],
                            },
                            {
                                mode: "stateList",
                                col: { pc: 4, tab: 6 },
                                title: "本週客戶資訊欄",
                                list: [
                                    {
                                        img: "assets/images/users/avatar-1.jpg",
                                        title: "王泰寧",
                                        sub: "richard.john@mail.com",
                                        state: { color: "info", text: "首次會面" },
                                    },
                                    {
                                        img: "assets/images/users/avatar-2.jpg",
                                        title: "Margaret D. Evans",
                                        sub: "margaret.evans@rhyta.com",
                                        state: { color: "danger", text: "項目執行中" },
                                    },
                                    {
                                        img: "assets/images/users/avatar-3.jpg",
                                        title: "郭一盈",
                                        sub: "bryuellen@dayrep.com",
                                        state: { color: "success", text: "進入驗收" },
                                    },
                                    {
                                        img: "assets/images/users/avatar-4.jpg",
                                        title: "劉俊毅",
                                        sub: "collier@jourrapide.com",
                                        state: { color: "info", text: "首次會面" },
                                    },
                                    {
                                        img: "assets/images/users/avatar-5.jpg",
                                        title: "Timothy Kauper",
                                        sub: "thykauper@rhyta.com",
                                        state: { color: "info", text: "首次會面" },
                                    },
                                    {
                                        img: "assets/images/users/avatar-6.jpg",
                                        title: "郭家瑩",
                                        sub: "austin@dayrep.com",
                                        state: { color: "success", text: "進入驗收" },
                                    },
                                ],
                            },
                            {
                                mode: "todoList",
                                title: "待辦事項",
                                col: { pc: 4, tab: 6 },
                                list: [
                                    { id: "1", text: "設計頁面 & 切版", done: !0 },
                                    { id: "2", text: "規劃渲染順序", done: !0 },
                                    { id: "3", text: "模組開發", done: !1 },
                                    { id: "4", text: "第三方測試", done: !0 },
                                    { id: "5", text: "後台系統串接", done: !0 },
                                    { id: "6", text: "公布產品資訊", done: !1 },
                                    { id: "7", text: "驗收文件格式 & 管道", done: !1 },
                                ],
                            },
                            {
                                mode: "dataCard",
                                col: { pc: 5, tab: 6 },
                                card: [
                                    {
                                        col: { pc: 6, tab: 12 },
                                        title: "顧客流量",
                                        value: 36254,
                                        up: "5.21%",
                                        desc: "自上月以來",
                                        icon: { name: "mdi mdi-account-multiple", color: "success" },
                                    },
                                    {
                                        col: { pc: 6, tab: 12 },
                                        title: "訂單",
                                        value: 5543,
                                        down: "1.05%",
                                        desc: "自上月以來",
                                        icon: { name: "mdi mdi-cart-plus", color: "danger" },
                                    },
                                    {
                                        col: { pc: 6, tab: 12 },
                                        title: "本日收益",
                                        value: "$6,254",
                                        up: "7.02%",
                                        desc: "與上月比較",
                                        icon: { name: "mdi mdi-currency-usd", color: "info" },
                                    },
                                    {
                                        col: { pc: 6, tab: 12 },
                                        title: "月成長",
                                        value: "+ 30.56%",
                                        up: "2.87%",
                                        desc: "與上月比較",
                                        icon: { name: "mdi mdi-pulse", color: "warning" },
                                    },
                                ],
                            },
                            {
                                mode: "doubleBarChart",
                                col: { pc: 7, tab: 12 },
                                title: "進存貨變化長條圖",
                                data: {
                                    series: [
                                        { name: "進貨", data: db.numberList(12) },
                                        { name: "存貨", data: db.numberList(12) },
                                    ],
                                    color: ["#727cf5", "#e3eaef"],
                                },
                            },
                            {
                                mode: "revenue_detail",
                                col: { pc: 12 },
                                title: "收益圖表(精細)",
                                detail: [
                                    { name: "上週收益總額", dot: "primary", value: 585254 },
                                    { name: "本週收益總額", dot: "success", value: 648529 },
                                ],
                                board: {
                                    title: "本日總收益: $42,530",
                                    desc: "本週進入春季最後兩個週次，營業收入比起上個月成長約13.06%，維持這個平均銷售量，夏季將...",
                                },
                                data: {
                                    series: [
                                        { name: "上週收益總額", data: db.numberList(7) },
                                        { name: "本週收益總額", data: db.numberList(7) },
                                    ],
                                    color: ["#727cf5", "#0acf97"],
                                },
                            },
                            {
                                mode: "table",
                                col: { pc: 6, tab: 8 },
                                title: "產品銷售排行",
                                hideHead: true,
                                table: [
                                    [
                                        { td_catalog: "h5_span", h5: "ASOS YUF Gaming", span: "2018-04-17" },
                                        { td_catalog: "h5_span", h5: "$79.49", span: "出貨價格" },
                                        { td_catalog: "h5_span", h5: "32", span: "數量" },
                                        { td_catalog: "h5_span", h5: "$6,518.18", span: "銷售額" },
                                    ],
                                    [
                                        { td_catalog: "h5_span", h5: "Chrorebook Vetachable CZ1", span: "2018-03-23" },
                                        { td_catalog: "h5_span", h5: "$128.50", span: "出貨價格" },
                                        { td_catalog: "h5_span", h5: "75", span: "數量" },
                                        { td_catalog: "h5_span", h5: "$4,754.50", span: "銷售額" },
                                    ],
                                    [
                                        { td_catalog: "h5_span", h5: "Logi Wireless Earbuds", span: "2018-06-01" },
                                        { td_catalog: "h5_span", h5: "$39.99", span: "出貨價格" },
                                        { td_catalog: "h5_span", h5: "64", span: "數量" },
                                        { td_catalog: "h5_span", h5: "$2,559.36", span: "銷售額" },
                                    ],
                                    [
                                        { td_catalog: "h5_span", h5: "AJ telephone mic", span: "2018-05-12" },
                                        { td_catalog: "h5_span", h5: "$20.00", span: "出貨價格" },
                                        { td_catalog: "h5_span", h5: "184", span: "數量" },
                                        { td_catalog: "h5_span", h5: "$3,680.00", span: "銷售額" },
                                    ],
                                    [
                                        { td_catalog: "h5_span", h5: "realUR GT Neo3", span: "2019-01-06" },
                                        { td_catalog: "h5_span", h5: "$28.49", span: "出貨價格" },
                                        { td_catalog: "h5_span", h5: "69", span: "數量" },
                                        { td_catalog: "h5_span", h5: "$1,965.81", span: "銷售額" },
                                    ],
                                ],
                            },
                            {
                                mode: "donutChart",
                                col: { pc: 3, tab: 6 },
                                title: "出貨國家佔比",
                                value: ["$300.56", "$135.18", "$148.96", "$254.02"],
                                data: {
                                    series: db.numberList(4).map((w) => (w -= 10)),
                                    labels: ["荷蘭", "瑞典", "捷克", "新加坡"],
                                    color: ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"],
                                },
                            },
                            {
                                mode: "timeline",
                                col: { pc: 3, tab: 6 },
                                title: "部門通知",
                                item: [
                                    {
                                        icon: "mdi mdi-upload",
                                        color: "info",
                                        title: "王偉誠 通知你會議資訊",
                                        text: `下午3點15分 會議室H2 與專案小組報告進度會議`,
                                        ago: "5 分鐘前",
                                    },
                                    {
                                        icon: "mdi mdi-airplane",
                                        color: "primary",
                                        title: "李俊洋 公布新的產業資訊",
                                        text: `歐洲最新法規 <span class="fw-bold">3C產品轉接頭皆使用Type-C</span>`,
                                        ago: "35 分鐘前",
                                    },
                                    {
                                        icon: "mdi mdi-microphone",
                                        color: "info",
                                        title: "謝俊宏 完成專案進度通知",
                                        text: `已完成 <span class="fw-bold">"上傳商品至商店"</span> 的功能`,
                                        ago: "2 小時前",
                                    },
                                    {
                                        icon: "mdi mdi-upload",
                                        color: "primary",
                                        title: "簡如君",
                                        text: `更新圖片 <span class="fw-bold">"Error404.jpg"</span>`,
                                        ago: "12 小時前",
                                    },
                                    {
                                        icon: "mdi mdi-upload",
                                        color: "info",
                                        title: "產品已在 Dave shop 上線",
                                        text: `記錄新增在 <span class="fw-bold">官方管理員</span> 上`,
                                        ago: "15 小時前",
                                    },
                                    {
                                        icon: "mdi mdi-microphone",
                                        color: "primary",
                                        title: "陳樂剛 通知了你",
                                        text: `觀看郵件 <span class="fw-bold">"你完成了嗎?"</span>`,
                                        ago: "2 天前",
                                    },
                                ],
                            },
                            {
                                mode: "rowCard",
                                card: [
                                    { icon: "dripicons-briefcase", value: "29件", name: "今年完成專案數" },
                                    { icon: "dripicons-lightbulb", value: "75件", name: "專利權數量" },
                                    { icon: "dripicons-user-group", value: "31位", name: "公司成員" },
                                    { icon: "dripicons-graph-line", value: "13%", name: "去年營業成長率" },
                                    { icon: "dripicons-cloud-download", value: "31個", name: "雲端串接服務" },
                                    { icon: "dripicons-jewel", value: "254個", name: "顧客五星評價數" },
                                ],
                            },
                            {
                                mode: "donutTrend",
                                col: { pc: 4, tab: 12 },
                                title: "專案進行狀態",
                                trend: [
                                    { title: "已完成", value: 640, icon: { state: "down", color: "#0acf97" } },
                                    { title: "進行中", value: 260, icon: { state: "up", color: "#727cf5" } },
                                    { title: "尚未開始", value: 100, icon: { state: "up", color: "#FF8473" } },
                                ],
                            },
                            {
                                mode: "taskList",
                                col: { pc: 8 },
                                title: "任務公佈欄",
                                hideHead: true,
                                text: `<p>195 件任務中尚有 <b>107</b> 件未處理</p>`,
                                table: [
                                    [
                                        { td_catalog: "h5_span", h5: "藝咖啡 - 主頁設計", span: "已過去3天" },
                                        { td_catalog: "status", state: "普通", color: "warning" },
                                        { td_catalog: "span_h5", h5: "林莉雯", span: "發起人" },
                                        { td_catalog: "span_h5", h5: "3h - 5h", span: "預估工期" },
                                        { td_catalog: "editBar" },
                                    ],
                                    [
                                        { td_catalog: "h5_span", h5: "2022下半年 - 飲料品牌圖像設計", span: "已過去2天" },
                                        { td_catalog: "status", state: "緊急", color: "danger" },
                                        { td_catalog: "span_h5", h5: "Jerry F. Powell", span: "發起人" },
                                        { td_catalog: "span_h5", h5: "12h - 18h", span: "預估工期" },
                                        { td_catalog: "editBar" },
                                    ],
                                    [
                                        { td_catalog: "h5_span", h5: "iOS APP 移轉頁面開發", span: "已過去7天" },
                                        { td_catalog: "status", state: "可等待", color: "success" },
                                        { td_catalog: "span_h5", h5: "簡誠凌", span: "發起人" },
                                        { td_catalog: "span_h5", h5: "78h - 90h", span: "預估工期" },
                                        { td_catalog: "editBar" },
                                    ],
                                    [
                                        { td_catalog: "h5_span", h5: "寄送郵件功能 - 未能送達", span: "已過去5天" },
                                        { td_catalog: "status", state: "緊急", color: "danger" },
                                        { td_catalog: "span_h5", h5: "童曉薇", span: "發起人" },
                                        { td_catalog: "span_h5", h5: "26h - 32h", span: "預估工期" },
                                        { td_catalog: "editBar" },
                                    ],
                                ],
                            },
                            {
                                mode: "barArea",
                                title: "專案進度總覽",
                                col: { pc: 12 },
                                data: {
                                    labels: [...Array(24)].map((x, i) => (x = `流程${i + 1}`)),
                                    series: db.numberList(24),
                                    color: "#3688fc",
                                    name: "進度百分比",
                                },
                            },
                            {
                                mode: "table",
                                title: "專案負責人",
                                col: { pc: 6, tab: 12 },
                                hideHead: true,
                                table: [
                                    {
                                        0: {
                                            td_catalog: "notify",
                                            img: "assets/images/users/avatar-2.jpg",
                                            h5: "陳宥茵",
                                            small: "2019-08-17",
                                            span: `從事前端開發與參與UIUX設計流程`,
                                        },
                                        1: { td_catalog: "span_h5", h5: "技術組 - 前端設計師", span: "職稱" },
                                        2: { td_catalog: "threeDot" },
                                    },
                                    {
                                        0: {
                                            td_catalog: "notify",
                                            img: "assets/images/users/avatar-6.jpg",
                                            h5: "侯政勳",
                                            small: "2020-05-20",
                                            span: `提供業主需求與進度報告的工作`,
                                        },
                                        1: { td_catalog: "span_h5", h5: "業務組 - 產品經理", span: "職稱" },
                                        2: { td_catalog: "threeDot" },
                                    },
                                    {
                                        0: {
                                            td_catalog: "notify",
                                            img: "assets/images/users/avatar-3.jpg",
                                            h5: "張欣怡",
                                            small: "2019-09-15",
                                            span: `提供業主需求與進度報告的工作`,
                                        },
                                        1: { td_catalog: "span_h5", h5: "業務組 - 產品經理", span: "職稱" },
                                        2: { td_catalog: "threeDot" },
                                    },
                                    {
                                        0: {
                                            td_catalog: "notify",
                                            img: "assets/images/users/avatar-4.jpg",
                                            h5: "林書瑋",
                                            small: "2019-04-09",
                                            span: `產品設計與開發藍圖確認`,
                                        },
                                        1: { td_catalog: "span_h5", h5: "設計組 - 主管", span: "職稱" },
                                        2: { td_catalog: "threeDot" },
                                    },
                                    {
                                        0: {
                                            td_catalog: "notify",
                                            img: "assets/images/users/avatar-5.jpg",
                                            h5: "鐘博彬",
                                            small: "2020-11-02",
                                            span: `負責資料庫設計與資訊安全驗證`,
                                        },
                                        1: { td_catalog: "span_h5", h5: "技術組 - 資料工程師", span: "職稱" },
                                        2: { td_catalog: "threeDot" },
                                    },
                                ],
                            },
                            {
                                mode: "calendarList",
                                title: "行事曆",
                                col: { pc: 6, tab: 12 },
                                list: [
                                    { range: "7:30 AM - 09:00 AM", event: "與UI/UX小組會議" },
                                    { range: "10:30 AM - 11:45 AM", event: "後端開發小組 - 函式庫撰寫" },
                                    { range: "12:15 PM - 02:00 PM", event: "上傳至Github並規劃程式碼" },
                                    { range: "5:30 PM - 07:00 PM", event: "與產品經理進度報告會議" },
                                ],
                            },
                        ],
                    };
                    function monthTW() {
                        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `

                                  <div class="row">
                                    ${glitter.print(function () {
                                let HTML = "";
                                let index = 2;
                                console.log(sourceData.data[index]);
                                HTML += db["table_barChart"](sourceData.data[index], index);
                                sourceData.data.map((d, i) => {
                                });
                                return HTML;
                            })}
                                  </div>
                                   
                            `;
                        }, divCreate: {},
                        onCreate: () => {
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
