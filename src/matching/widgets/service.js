import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
const servicePlace = [
    {
        id: 0,
        title: '台北市',
        city: [{ "id": 0, "title": "中山區" }, { "id": 1, "title": "大安區" }, { "id": 2, "title": "信義區" }, {
                "id": 3,
                "title": "士林區"
            }, { "id": 4, "title": "內湖區" }, { "id": 5, "title": "中正區" }, { "id": 6, "title": "萬華區" }, {
                "id": 7,
                "title": "松山區"
            }, { "id": 8, "title": "大同區" }, { "id": 9, "title": "文山區" }, { "id": 10, "title": "北投區" }, {
                "id": 11,
                "title": "南港區"
            }]
    },
    {
        id: 1,
        title: '新北市',
        city: [{ "id": 0, "title": "板橋區" }, { "id": 1, "title": "三重區" }, { "id": 2, "title": "淡水區" }, {
                "id": 3,
                "title": "中和區"
            }, { "id": 4, "title": "永和區" }, { "id": 5, "title": "新莊區" }, { "id": 6, "title": "新店區" }, {
                "id": 7,
                "title": "汐止區"
            }, { "id": 8, "title": "林口區" }, { "id": 9, "title": "蘆洲區" }, { "id": 10, "title": "土城區" }, {
                "id": 11,
                "title": "三峽區"
            }, { "id": 12, "title": "泰山區" }, { "id": 13, "title": "鶯歌區" }, { "id": 14, "title": "樹林區" }, {
                "id": 15,
                "title": "五股區"
            }, { "id": 16, "title": "八里區" }, { "id": 17, "title": "深坑區" }, { "id": 18, "title": "三芝區" }, {
                "id": 19,
                "title": "瑞芳區"
            }, { "id": 20, "title": "金山區" }, { "id": 21, "title": "萬里區" }, { "id": 22, "title": "烏來區" }, {
                "id": 23,
                "title": "貢寮區"
            }, { "id": 24, "title": "坪林區" }, { "id": 25, "title": "石碇區" }, { "id": 26, "title": "平溪區" }, {
                "id": 27,
                "title": "雙溪區"
            }, { "id": 28, "title": "石門區" }]
    },
    {
        id: 2,
        title: '基隆市',
        city: [{ "id": 0, "title": "中正區" }, { "id": 1, "title": "仁愛區" }, { "id": 2, "title": "信義區" }, {
                "id": 3,
                "title": "安樂區"
            }, { "id": 4, "title": "七堵區" }, { "id": 5, "title": "中山區" }, { "id": 6, "title": "暖暖區" }]
    },
    {
        id: 3, title: '桃園市', city: [
            { "id": 0, "title": "中壢區" },
            { "id": 1, "title": "平鎮區" },
            { "id": 2, "title": "龍潭區" },
            { "id": 3, "title": "楊梅區" },
            { "id": 4, "title": "新屋區" },
            { "id": 5, "title": "觀音區" },
            { "id": 6, "title": "桃園區" },
            { "id": 7, "title": "龜山區" },
            { "id": 8, "title": "八德區" },
            { "id": 9, "title": "大溪區" },
            { "id": 10, "title": "復興區" },
            { "id": 11, "title": "大園區" },
            { "id": 12, "title": "蘆竹區" },
        ]
    },
    {
        id: 4, title: '新竹市', city: [
            { "id": 0, "title": "東區" },
            { "id": 1, "title": "北區" },
            { "id": 2, "title": "香山區" },
        ]
    },
    {
        id: 5, title: '新竹縣', city: [
            { "id": 0, "title": "竹北市" },
            { "id": 1, "title": "竹東鎮" },
            { "id": 2, "title": "新埔鎮" },
            { "id": 3, "title": "關西鎮" },
            { "id": 4, "title": "新豐鎮" },
            { "id": 5, "title": "峨眉鄉" },
            { "id": 6, "title": "寶山鄉" },
            { "id": 7, "title": "五峰鄉" },
            { "id": 8, "title": "橫山鄉" },
            { "id": 9, "title": "北埔鄉" },
            { "id": 10, "title": "尖石鄉" },
            { "id": 11, "title": "穹林鄉" },
            { "id": 12, "title": "湖口鄉" },
        ]
    },
    {
        id: 6, title: '宜蘭縣', city: [
            { "id": 0, "title": "宜蘭市" },
            { "id": 1, "title": "羅東鎮" },
            { "id": 2, "title": "蘇澳鎮" },
            { "id": 3, "title": "頭城鎮" },
            { "id": 4, "title": "礁溪鄉" },
            { "id": 5, "title": "壯圍鄉" },
            { "id": 6, "title": "員山鄉" },
            { "id": 7, "title": "冬山鄉" },
            { "id": 8, "title": "五結鄉" },
            { "id": 9, "title": "三星鄉" },
            { "id": 10, "title": "大同鄉" },
            { "id": 11, "title": "南澳鄉" },
        ]
    },
    {
        id: 7, title: '苗栗縣', city: [
            { "id": 0, "title": "苗栗市" },
            { "id": 1, "title": "頭份市" },
            { "id": 2, "title": "竹南鎮" },
            { "id": 3, "title": "後龍鎮" },
            { "id": 4, "title": "通霄鎮" },
            { "id": 5, "title": "苑裡鎮" },
            { "id": 6, "title": "卓蘭鎮" },
            { "id": 7, "title": "造橋鄉" },
            { "id": 8, "title": "西湖鄉" },
            { "id": 9, "title": "頭屋鄉" },
            { "id": 10, "title": "公館鄉" },
            { "id": 11, "title": "銅鑼鄉" },
            { "id": 12, "title": "三義鄉" },
            { "id": 13, "title": "大湖鄉" },
            { "id": 14, "title": "獅潭鄉" },
            { "id": 15, "title": "三灣鄉" },
            { "id": 16, "title": "南庄鄉" },
            { "id": 17, "title": "泰安鄉" }
        ]
    },
    {
        id: 8, title: '臺中市', city: [
            { "id": 0, "title": "中區" },
            { "id": 1, "title": "東區" },
            { "id": 2, "title": "西區" },
            { "id": 3, "title": "南區" },
            { "id": 4, "title": "北區" },
            { "id": 5, "title": "北屯區" },
            { "id": 6, "title": "西屯區" },
            { "id": 7, "title": "南屯區" },
            { "id": 8, "title": "北屯區" },
            { "id": 9, "title": "豐原區" },
            { "id": 10, "title": "大里區" },
            { "id": 11, "title": "太平區" },
            { "id": 12, "title": "清水區" },
            { "id": 13, "title": "沙鹿區" },
            { "id": 14, "title": "大甲區" },
            { "id": 15, "title": "東勢區" },
            { "id": 16, "title": "梧棲區" },
            { "id": 17, "title": "烏日區" },
            { "id": 18, "title": "神岡區" },
            { "id": 19, "title": "大肚區" },
            { "id": 20, "title": "大雅區" },
            { "id": 21, "title": "后里區" },
            { "id": 22, "title": "霧峰區" },
            { "id": 23, "title": "潭子區" },
            { "id": 24, "title": "龍井區" },
            { "id": 25, "title": "外埔區" },
            { "id": 26, "title": "石岡區" },
            { "id": 27, "title": "大安區" },
            { "id": 28, "title": "新社區" },
        ]
    },
    {
        id: 9, title: '彰化縣', city: [
            { "id": 0, "title": "彰化市" },
            { "id": 1, "title": "員林市" },
            { "id": 2, "title": "和美鎮" },
            { "id": 3, "title": "鹿港鎮" },
            { "id": 4, "title": "溪湖鎮" },
            { "id": 5, "title": "二林鎮" },
            { "id": 6, "title": "田中鎮" },
            { "id": 7, "title": "北斗鎮" },
            { "id": 8, "title": "花壇鄉" },
            { "id": 9, "title": "芬園鄉" },
            { "id": 10, "title": "大村鄉" },
            { "id": 11, "title": "永靖鄉" },
            { "id": 12, "title": "伸港鄉" },
            { "id": 13, "title": "線西鄉" },
            { "id": 14, "title": "秀水鄉" },
            { "id": 15, "title": "埔心鄉" },
            { "id": 16, "title": "埔鹽鄉" },
            { "id": 17, "title": "大城鄉" },
            { "id": 18, "title": "芳苑鄉" },
            { "id": 19, "title": "竹塘鄉" },
            { "id": 20, "title": "社頭鄉" },
            { "id": 21, "title": "二水鄉" },
            { "id": 22, "title": "田尾鄉" },
            { "id": 23, "title": "埤頭鄉" },
            { "id": 24, "title": "溪州鄉" },
        ]
    },
    {
        id: 10, title: '南投縣', city: [
            { "id": 0, "title": "南投市" },
            { "id": 1, "title": "埔里鎮" },
            { "id": 2, "title": "草屯鎮" },
            { "id": 3, "title": "竹山鎮" },
            { "id": 4, "title": "集集鎮" },
            { "id": 5, "title": "名間鄉" },
            { "id": 6, "title": "鹿谷鄉" },
            { "id": 7, "title": "中寮鄉" },
            { "id": 8, "title": "魚池鄉" },
            { "id": 9, "title": "國姓鄉" },
            { "id": 10, "title": "水里鄉" },
            { "id": 11, "title": "仁愛鄉" },
            { "id": 12, "title": "信義鄉" },
        ]
    },
    {
        id: 11, title: '雲林縣', city: [
            { "id": 0, "title": "斗六市" },
            { "id": 1, "title": "斗南鎮" },
            { "id": 2, "title": "虎尾鎮" },
            { "id": 3, "title": "西螺鎮" },
            { "id": 4, "title": "土庫鎮" },
            { "id": 5, "title": "北港鎮" },
            { "id": 6, "title": "古坑鄉" },
            { "id": 7, "title": "大埤鄉" },
            { "id": 8, "title": "莿桐鄉" },
            { "id": 9, "title": "林內鄉" },
            { "id": 10, "title": "二崙鄉" },
            { "id": 11, "title": "崙背鄉" },
            { "id": 12, "title": "麥寮鄉" },
            { "id": 13, "title": "東勢鄉" },
            { "id": 14, "title": "褒忠鄉" },
            { "id": 15, "title": "臺西鄉" },
            { "id": 16, "title": "元長鄉" },
            { "id": 17, "title": "四湖鄉" },
            { "id": 18, "title": "口湖鄉" },
            { "id": 19, "title": "水林鄉" },
        ]
    },
    {
        id: 12, title: '嘉義市', city: [
            { "id": 0, "title": "東區" },
            { "id": 1, "title": "西區" },
        ]
    },
    {
        id: 13, title: '嘉義縣', city: [
            { "id": 0, "title": "太保市" },
            { "id": 1, "title": "朴子市" },
            { "id": 2, "title": "布袋鎮" },
            { "id": 3, "title": "大林鎮" },
            { "id": 4, "title": "民雄鄉" },
            { "id": 5, "title": "溪口鄉" },
            { "id": 6, "title": "新港鄉" },
            { "id": 7, "title": "六腳鄉" },
            { "id": 8, "title": "東石鄉" },
            { "id": 9, "title": "義竹鄉" },
            { "id": 10, "title": "鹿草鄉" },
            { "id": 11, "title": "水上鄉" },
            { "id": 12, "title": "中埔鄉" },
            { "id": 13, "title": "竹崎鄉" },
            { "id": 14, "title": "梅山鄉" },
            { "id": 15, "title": "番路鄉" },
            { "id": 16, "title": "大埔鄉" },
            { "id": 17, "title": "阿里山鄉" },
        ]
    },
    {
        id: 14, title: '臺南市', city: [
            { "id": 0, "title": "中西區" },
            { "id": 1, "title": "東區" },
            { "id": 2, "title": "南區" },
            { "id": 3, "title": "北區" },
            { "id": 4, "title": "安平區" },
            { "id": 5, "title": "安南區" },
            { "id": 6, "title": "永康區" },
            { "id": 7, "title": "歸仁區" },
            { "id": 8, "title": "新化區" },
            { "id": 9, "title": "左鎮區" },
            { "id": 10, "title": "玉井區" },
            { "id": 11, "title": "楠西區" },
            { "id": 12, "title": "南化區" },
            { "id": 13, "title": "仁德區" },
            { "id": 14, "title": "關廟區" },
            { "id": 15, "title": "龍崎區" },
            { "id": 16, "title": "官田區" },
            { "id": 17, "title": "麻豆區" },
            { "id": 18, "title": "佳里區" },
            { "id": 19, "title": "西港區" },
            { "id": 20, "title": "七股區" },
            { "id": 21, "title": "將軍區" },
            { "id": 22, "title": "學甲區" },
            { "id": 23, "title": "北門區" },
            { "id": 24, "title": "新營區" },
            { "id": 25, "title": "後壁區" },
            { "id": 26, "title": "白河區" },
            { "id": 27, "title": "東山區" },
            { "id": 28, "title": "六甲區" },
            { "id": 29, "title": "下營區" },
            { "id": 30, "title": "柳營區" },
            { "id": 31, "title": "鹽水區" },
            { "id": 32, "title": "善化區" },
            { "id": 33, "title": "大內區" },
            { "id": 34, "title": "山上區" },
            { "id": 35, "title": "新市區" },
            { "id": 36, "title": "安定區" },
        ]
    },
    {
        id: 15, title: '高雄市', city: [
            { "id": 0, "title": "楠梓區" },
            { "id": 1, "title": "左營區" },
            { "id": 2, "title": "鼓山區" },
            { "id": 3, "title": "三民區" },
            { "id": 4, "title": "苓雅區" },
            { "id": 5, "title": "新興區" },
            { "id": 6, "title": "前金區" },
            { "id": 7, "title": "鹽埕區" },
            { "id": 8, "title": "區前鎮" },
            { "id": 9, "title": "旗津區" },
            { "id": 10, "title": "小港區" },
            { "id": 11, "title": "鳳山區" },
            { "id": 12, "title": "茂林區" },
            { "id": 13, "title": "甲仙區" },
            { "id": 14, "title": "六龜區" },
            { "id": 15, "title": "杉林區" },
            { "id": 16, "title": "美濃區" },
            { "id": 17, "title": "內門區" },
            { "id": 18, "title": "仁武區" },
            { "id": 19, "title": "田寮區" },
            { "id": 20, "title": "旗山區" },
            { "id": 21, "title": "梓官區" },
            { "id": 22, "title": "阿蓮區" },
            { "id": 23, "title": "湖內區" },
            { "id": 24, "title": "岡山區" },
            { "id": 25, "title": "茄萣區" },
            { "id": 26, "title": "路竹區" },
            { "id": 27, "title": "鳥松區" },
            { "id": 28, "title": "永安區" },
            { "id": 29, "title": "燕巢區" },
            { "id": 30, "title": "大樹區" },
            { "id": 31, "title": "大寮區" },
            { "id": 32, "title": "林園區" },
            { "id": 33, "title": "彌陀區" },
            { "id": 34, "title": "橋頭區" },
            { "id": 35, "title": "大社區" },
            { "id": 36, "title": "那瑪夏區" },
            { "id": 37, "title": "桃源區" },
        ]
    },
    {
        id: 16, title: '屏東縣', city: [
            { "id": 0, "title": "屏東市" },
            { "id": 1, "title": "潮州鎮" },
            { "id": 2, "title": "內埔鄉" },
            { "id": 3, "title": "萬丹鄉" },
            { "id": 4, "title": "東港鎮" },
            { "id": 5, "title": "新園鄉" },
            { "id": 6, "title": "恆春鎮" },
            { "id": 7, "title": "長治鄉" },
            { "id": 8, "title": "里港鄉" },
            { "id": 9, "title": "鹽埔鄉" },
            { "id": 10, "title": "枋寮鄉" },
            { "id": 11, "title": "高樹鄉" },
            { "id": 12, "title": "九如鄉" },
            { "id": 13, "title": "萬巒鄉" },
            { "id": 14, "title": "佳冬鄉" },
            { "id": 15, "title": "林邊鄉" },
            { "id": 16, "title": "竹田鄉" },
            { "id": 17, "title": "崁頂鄉" },
            { "id": 18, "title": "琉球鄉" },
            { "id": 19, "title": "麟洛鄉" },
            { "id": 20, "title": "南州鄉" },
            { "id": 21, "title": "新埤鄉" },
            { "id": 22, "title": "車城鄉" },
            { "id": 23, "title": "滿州鄉" },
            { "id": 24, "title": "三地門鄉" },
            { "id": 25, "title": "來義鄉" },
            { "id": 26, "title": "瑪家鄉" },
            { "id": 27, "title": "泰武鄉" },
            { "id": 28, "title": "枋山鄉" },
            { "id": 29, "title": "春日鄉" },
            { "id": 30, "title": "獅子鄉" },
            { "id": 31, "title": "牡丹鄉" },
            { "id": 32, "title": "霧臺鄉" },
        ]
    },
    {
        id: 17, title: '花蓮縣', city: [
            { "id": 0, "title": "花蓮市" },
            { "id": 1, "title": "鳳林鎮" },
            { "id": 2, "title": "玉里鎮" },
            { "id": 3, "title": "新城鄉" },
            { "id": 4, "title": "吉安鄉" },
            { "id": 5, "title": "壽豐鄉" },
            { "id": 6, "title": "光復鄉" },
            { "id": 7, "title": "豐濱鄉" },
            { "id": 8, "title": "瑞穗鄉" },
            { "id": 9, "title": "富里鄉" },
            { "id": 10, "title": "秀林鄉" },
            { "id": 11, "title": "萬榮鄉" },
            { "id": 12, "title": "卓溪鄉" },
        ]
    },
    {
        id: 18, title: '臺東縣', city: [
            { "id": 0, "title": "臺東市" },
            { "id": 1, "title": "成功鎮" },
            { "id": 2, "title": "關山鎮" },
            { "id": 3, "title": "卑南鄉" },
            { "id": 4, "title": "大武鄉" },
            { "id": 5, "title": "太麻里鄉" },
            { "id": 6, "title": "東河鄉" },
            { "id": 7, "title": "長濱鄉" },
            { "id": 8, "title": "鹿野鄉" },
            { "id": 9, "title": "池上鄉" },
            { "id": 10, "title": "綠島鄉" },
            { "id": 11, "title": "延平鄉" },
            { "id": 12, "title": "海端鄉" },
            { "id": 13, "title": "達仁鄉" },
            { "id": 14, "title": "金峰鄉" },
            { "id": 15, "title": "蘭嶼鄉" },
        ]
    },
    {
        id: 19, title: '澎湖縣', city: [
            { "id": 0, "title": "馬公市" },
            { "id": 1, "title": "湖西鄉" },
            { "id": 2, "title": "白沙鄉" },
            { "id": 3, "title": "西嶼鄉" },
            { "id": 4, "title": "望安鄉" },
            { "id": 5, "title": "七美鄉" },
        ]
    },
    {
        id: 20, title: '金門縣', city: [
            { "id": 0, "title": "金城鎮" },
            { "id": 1, "title": "金湖鎮" },
            { "id": 2, "title": "金沙鎮" },
            { "id": 3, "title": "金寧鄉" },
            { "id": 4, "title": "烈嶼鄉" },
            { "id": 5, "title": "烏坵鄉" },
        ]
    },
    {
        id: 21, title: '連江縣', city: [
            { "id": 0, "title": "南竿鄉" },
            { "id": 1, "title": "北竿鄉" },
            { "id": 2, "title": "莒光鄉" },
            { "id": 3, "title": "東引鄉" },
        ]
    },
];
export const service = Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID, subData) => {
            widget.data.bigItem = widget.data.bigItem ?? [];
            return {
                view: () => {
                    let id = glitter.getUUID();
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let selectCity = glitter.getUrlParameter('selectCity');
                            let selectPlace = glitter.getUrlParameter('selectPlace');
                            let selectBidItem = glitter.getUrlParameter('selectBidItem');
                            let selectChild = glitter.getUrlParameter('selectChildItem');
                            if (!widget.data.bigItem.find((dd) => {
                                return dd.id === selectBidItem;
                            })) {
                                selectBidItem = widget.data.bigItem[0].id;
                            }
                            const serviceList = widget.data.bigItem.find((dd) => {
                                return dd.id === selectBidItem;
                            }).child ?? [];
                            if (!serviceList.find((dd) => {
                                return dd.id === selectChild;
                            })) {
                                selectChild = serviceList[0].id;
                            }
                            let budget = undefined;
                            if (!servicePlace.find((dd) => {
                                return dd.title === selectCity;
                            })) {
                                selectCity = undefined;
                            }
                            !selectCity || glitter.setUrlParameter('selectCity', selectCity);
                            !selectPlace || glitter.setUrlParameter('selectPlace', selectPlace);
                            glitter.setUrlParameter('selectBidItem', selectBidItem);
                            glitter.setUrlParameter('selectChildItem', selectChild);
                            const gridCol = glitter.ut.frSize({
                                sm: `col-2`
                            }, 'col-3');
                            return `<div  class="${glitter.ut.frSize({
                                sm: `container `
                            }, 'p-0')}" style="box-sizing: border-box;" >
<div  class="p-2 border w-100 d-flex  glitterTagundefined" style="overflow-x: auto; white-space: nowrap;  display: inline-block; gap:10px;" >
${widget.data.bigItem.map((dd, index) => {
                                return `<div  class="rounded position-relative d-flex flex-column align-items-center justify-content-center glitterTagundefined" style="min-width:200px;height:125px;
background:50%/cover no-repeat url('${dd.bg}');
   " onclick="${gvc.event(() => {
                                    glitter.setUrlParameter("selectBidItem", dd.id);
                                    gvc.notifyDataChange(id);
                                    glitter.share.refreshService();
                                })}">
<div  class="position-absolute w-100 h-100 bg-dark  top-0 rounded glitterTagundefined" style="opacity:${(selectBidItem === dd.id) ? `25` : `70`}%;"></div>
<span  class="text-white glitterTagundefined" style="z-index:1;font-size:25px;font-weight:500;" onclick="">${dd.title}</span>
</div>`;
                            }).join('')}
</div>
<div class="row border m-0" style="width:100%;">
<div class="position-relative border-end col-3 col-sm-2" style="background:whitesmoke;">
<span class="position-absolute  w-100 h-100 d-flex align-items-center justify-content-center " style="font-weight:500;left:0;">服務項目</span>
</div>
<div class="d-flex flex-wrap col-sm-10 col-9" style="gap:10px;padding:10px;">
${(() => {
                                return serviceList.map((dd, index) => {
                                    if (selectChild === dd.id) {
                                        return `<span style="cursor:pointer;color:orangered;border-bottom:1px solid orangered;">${dd.title}</span>`;
                                    }
                                    else {
                                        return `<span style="cursor:pointer;" onclick="${gvc.event((e, event) => {
                                            selectChild = dd.id;
                                            glitter.setUrlParameter('selectChildItem', selectChild);
                                            gvc.notifyDataChange(id);
                                            glitter.share.refreshService();
                                        })}">${dd.title}</span>`;
                                    }
                                }).join('');
                            })()}
</div>
</div>
<div class="row m-0 ${(subData.hide_place) ? `d-none` : ``}" style="width:100%;">
<div class="${gridCol} d-flex align-items-center justify-content-center border" style="font-weight:500;height:50px;background:whitesmoke;">
服務縣市
</div>
<div class="col-9 col-sm-2 d-flex align-items-center justify-content-center border" style="font-weight:500;height:50px;">
<select class="form-select" style="font-size:14px;cursor:pointer;" onchange="${gvc.event((e, event) => {
                                glitter.setUrlParameter('selectCity', e.value);
                                glitter.setUrlParameter('selectPlace', "不拘");
                                selectCity = e.value;
                                gvc.notifyDataChange(id);
                                glitter.share.refreshService();
                            })}">
<option >不拘</option>
${servicePlace.map((dd) => {
                                return `<option value="${dd.title}" ${(selectCity === dd.title) ? `selected` : ``} style="cursor:pointer;">${dd.title}</option>`;
                            })}</select>
</div>
<div class="${gridCol} d-flex align-items-center justify-content-center border" style="font-weight:500;height:50px;background:whitesmoke;">
服務地區
</div>
<div class="col-9 col-sm-2 d-flex align-items-center justify-content-center border" style="font-weight:500;height:50px;">
<select class="form-select" style="font-size:14px;" onchange="${gvc.event((e, event) => {
                                glitter.setUrlParameter('selectPlace', e.value);
                                selectPlace = e.value;
                                gvc.notifyDataChange(id);
                                glitter.share.refreshService();
                            })}">
<option >不拘</option>
${servicePlace.find((dd) => {
                                return dd.title === selectCity;
                            })?.city.map((dd) => {
                                return `<option value="${dd.title}" ${(selectPlace === dd.title) ? `selected` : ``}>${dd.title}</option>`;
                            })}</select>
</div>

<div class="col-3 col-sm-2 d-flex align-items-center justify-content-center border" style="font-weight:500;height:50px;background:whitesmoke;">
客戶預算
</div>
<div class="col-9 col-sm-2 d-flex align-items-center justify-content-center border" style="font-weight:500;height:50px;">
<input class="w-100 form-control" onchange="${gvc.event((e, event) => {
                                budget = e.value;
                                glitter.setUrlParameter('budget', e.value);
                                glitter.share.refreshService();
                            })}" placeholder="請輸入預算" value="${glitter.getUrlParameter('budget') ?? ""}">
</div>
</div>
</div>`;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        Editor.arrayItem({
                            originalArray: widget.data.bigItem,
                            gvc: gvc,
                            title: '服務大項',
                            array: widget.data.bigItem.map((lineData, index) => {
                                lineData.child = lineData.child ?? [];
                                return {
                                    title: lineData.title ?? `項目:${index}`,
                                    expand: lineData,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '大項目標題',
                                            default: lineData.title,
                                            placeHolder: '請輸入大項目的標題',
                                            callback: (text) => {
                                                lineData.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: `背景圖片`,
                                            def: lineData.bg ?? "",
                                            callback: (e) => {
                                                lineData.bg = e;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        Editor.arrayItem({
                                            originalArray: lineData.child,
                                            gvc: gvc,
                                            title: '服務子項目',
                                            array: lineData.child.map((dd, index) => {
                                                return {
                                                    title: (dd.title ?? `子項目:${index + 1}`),
                                                    expand: dd,
                                                    innerHtml: gvc.map([
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: '子項目標題',
                                                            default: dd.title,
                                                            placeHolder: '請輸入子項目的標題',
                                                            callback: (text) => {
                                                                dd.title = text;
                                                                widget.refreshComponent();
                                                            },
                                                        }),
                                                        `<button class="btn btn-warning text-dark w-100" onclick="${gvc.event(() => {
                                                            glitter.openDiaLog(new URL('../dialog/setform.js', import.meta.url).href, "setForm", {
                                                                data: dd
                                                            });
                                                        })}">設定表單</button>`
                                                    ]),
                                                    minus: gvc.event(() => {
                                                        lineData.child.splice(index, 1);
                                                        widget.refreshComponent();
                                                    }),
                                                };
                                            }),
                                            expand: widget,
                                            plus: {
                                                title: '添加區塊',
                                                event: gvc.event(() => {
                                                    lineData.child.push({ title: "服務子項目", id: `${(new Date()).getTime()}` });
                                                    widget.refreshComponent();
                                                }),
                                            },
                                            refreshComponent: () => {
                                                widget.refreshComponent();
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.bigItem.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加大項目',
                                event: gvc.event(() => {
                                    widget.data.bigItem.push({
                                        title: '清潔',
                                        bg: `https://liondesign-prd.s3.amazonaws.com/file/guest/1685366469901-Screen Shot 2023-05-29 at 9.20.47 PM.png`,
                                        smItem: '',
                                        id: `${(new Date).getTime()}`
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        })
                    ]);
                }
            };
        },
    };
});
