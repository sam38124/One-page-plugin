'use strict';
import { Glitter } from './glitterBundle/Glitter.js';

export class Entry {
    public static onCreate(glitter: Glitter) {
        glitter.htmlGenerate.resourceHook = (src) => {
            if (location.host === `127.0.0.1:3080`) {
                return src.replace(`$style1`, `http://127.0.0.1:3080/lionHtmlExtension`);
            } else {
                return src.replace(`$style1`, `https://sam38124.github.io/One-page-plugin/src`);
            }
        };
        glitter.htmlGenerate.resourceHook = (src) => {
            if (glitter) {
            }
            if (location.host === `127.0.0.1:3080`) {
                return src.replace(`$style1`, `http://127.0.0.1:3080/lionHtmlExtension`);
            } else {
                return src.replace(`$style1`, `https://sam38124.github.io/One-page-plugin/src`);
            }
        };
        JSON.stringify([
            {
                "id": "s6s6sbs9s1s1s7s3-s5s2s0s2-4s2s0sa-sas8sasc-ses7sds5s0scs7sdsfs4s2s1",
                "js": "$style1/official.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {
                    "tag": "topbar",
                    "list": []
                },
                "type": "component",
                "label": "嵌入模塊"
            },
            {
                "id": "scsdsds9s6s5s2s8-s0scs4s2-4s0s2s3-s9s3sasa-s2sdscs9s7s1s4s1s8sds0sa",
                "js": "$style1/official.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {
                    "tag": "nav",
                    "list": []
                },
                "type": "component",
                "label": "嵌入模塊"
            },
            {
                "id": "s1sescs4s9s4sfs7-s1s4s1s1-4scs2sd-s8s8sds6-s6ses1sfs5s0s8s9s5s4s8s8",
                "js": "$style1/restaurant/style1.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {
                    "keyVision": {
                        "img": "https://liondesign-prd.s3.amazonaws.com/file/252530754/1681135536885-2021-09-23.png",
                        "desc": "快「點」來店大賺超集點數\n<br>\n單筆滿$500就送36點\n！！消費飲品 可寄杯 ！！\n<br>\n🔥開薪爽爽賺點數\n🔥喝羽茶超好「集」\n🔥揪來店裡買一波",
                        "title": "<span>全！體！樂！粉！注！意！</span><br>4/11超集開薪日",
                        "video": "https://www.youtube.com/watch?v=XwFNLsT1Wxg",
                        "listData": {
                            "list": [
                                {
                                    "link": "#",
                                    "name": "菜單"
                                },
                                {
                                    "link": "#",
                                    "name": "門市據點"
                                }
                            ],
                            "expand": true
                        },
                        "titleStyle": {
                            "style": "line-height: 70px;",
                            "styleList": []
                        },
                        "titleStyleEx": {
                            "expand": false
                        },
                        "subTitleStyle": {
                            "style": "line-height: 40px;",
                            "styleList": []
                        },
                        "titleStylesEx": {
                            "expand": false
                        }
                    }
                },
                "type": "banner",
                "label": "橫幅"
            },
            {
                "id": "s5sas4s6s7scsdsd-s3s4s9s7-4sfs5s5-sbs4s0s8-s2s9ses8s1sdsbs5sfs6s8s2",
                "js": "$style1/restaurant/style1.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {
                    "about": {
                        "img": "https://liondesign-prd.s3.amazonaws.com/file/252530754/1681138848007-C-5.jpeg",
                        "block": [
                            {
                                "text": "拾起經驗累積的美好事物，隨時間轉化，那即是文化的開始。\n樂台羽茶以多年製茶經驗及對茶敏銳的感受力，\n自許茶香師，理出一門「因茶施泡」的茶哲學。<br><br><br>\n茶香師就像用香水施展魅惑的調香師，\n專注覺醒每款茶耐人尋味的山頭氣，\n清香、果蜜、濃韻…，依茶香底韻調和鮮果或奶香，\n將二者完美契合、加乘，帶出前中後味的層次，\n讓入口到喉間，每一口感受都是各有驚豔。\n<br><br>\n樂台羽茶去除繁雜特調，回歸飲茶真實原貎，\n從「單純」中領悟留在舌尖上的甘美，\n感受入口喉韻的純萃甘好，\n體驗我們對待每一杯茶最真誠的「心」「藝」。\n",
                                "expand": true
                            }
                        ],
                        "title": "[ 茶，哲學 ] 茶香師的因茶施泡",
                        "expand": true,
                        "extend": {},
                        "background": "https://liondesign-prd.s3.amazonaws.com/file/252530754/1681139183177-about-bg.jpeg"
                    }
                },
                "type": "about",
                "label": "關於我們",
                "styleList": []
            },
            {
                "id": "s4sbs5s5ses0sdsa-s1s2sesc-4s6sas6-sbsds6sb-sesbs9sbs9ses4s5s9s7sds1",
                "js": "$style1/restaurant/style1.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {
                    "desc": "羽茶相遇",
                    "title": "飲品",
                    "expand": false,
                    "dataList": {
                        "list": [
                            {
                                "img": "https://liondesign-prd.s3.amazonaws.com/file/252530754/1681142105638-1561685433_550755200.jpeg",
                                "tag": [
                                    "starters"
                                ],
                                "desc": "小綠葉蟬著涎/自然農法\n阿里山獨有山頭氣與自然有機的栽種法，生長在高海拔的雲霧籠罩裡經由小綠葉蟬咬過每瓣嫩綠，讓茶韻散發獨特的果香及蜜香甜味。",
                                "price": "",
                                "title": "阿里山茗品",
                                "expand": false
                            },
                            {
                                "img": "https://liondesign-prd.s3.amazonaws.com/file/252530754/1681142185832-1561685711_1474756191.jpeg",
                                "tag": [
                                    "specialty"
                                ],
                                "desc": "花果香/全發酵\n茶湯色澤橙紅瑩亮，口感甘醇，喉韻優雅，帶有獨特的熟果花香與肉桂香，單飲最能品嚐出沉穩內斂、厚實甘醇的質純。",
                                "price": "",
                                "title": "日月潭紅茶",
                                "expand": false
                            },
                            {
                                "img": "https://liondesign-prd.s3.amazonaws.com/file/252530754/1681636932262-1561685754_1474756191.jpeg",
                                "tag": [
                                    "starters"
                                ],
                                "desc": "重火熟香，茶質渾厚濃韻，帶有糖炒栗子的焦糖蜜香，入喉更有龍眼乾熟火炭焙的香氣隱現，即便單品就足以令人驚豔。",
                                "price": "",
                                "title": "松柏嶺烏龍",
                                "expand": false
                            },
                            {
                                "img": "",
                                "title": "新標題",
                                "desc": "新敘述",
                                "price": 0,
                                "tag": [],
                                "expand": false
                            },
                            {
                                "img": "",
                                "title": "新標題",
                                "desc": "新敘述",
                                "price": 0,
                                "tag": [],
                                "expand": false
                            }
                        ],
                        "expand": true
                    },
                    "tagObject": {
                        "tags": [
                            {
                                "title": "所有飲品",
                                "expand": {},
                                "className": "*"
                            },
                            {
                                "title": "主食",
                                "expand": false,
                                "className": "starters"
                            },
                            {
                                "title": "副食",
                                "expand": false,
                                "className": "salads"
                            },
                            {
                                "title": "甜點",
                                "expand": false,
                                "className": "specialty"
                            }
                        ]
                    }
                },
                "type": "menu",
                "label": "服務菜單"
            },
            {
                "id": "sesbsfs1s9sfs4s0-s5s3sesa-4s8sfs7-sascs0sf-s5ses7scs1sesesdsesds7sb",
                "js": "$style1/restaurant/style1.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {
                    "list": [
                        {
                            "desc": "日常維護保養，並進行故障排除、生產設備零件更換",
                            "title": "機台維護",
                            "expand": true,
                            "number": "01",
                            "clickEvent": {
                                "src": "$style1/event.js",
                                "route": "test"
                            }
                        },
                        {
                            "desc": "網路、網際網路、端點、API、雲端、應用程式",
                            "title": "資訊安全",
                            "number": "02"
                        },
                        {
                            "desc": "設計預算有限也不影響製作品質，打造專屬頁面",
                            "title": "客製化設定",
                            "number": "03"
                        },
                        {
                            "desc": "提供即時與處理緊急狀況的撥打專線，替您解除危機",
                            "title": "即時線上服務",
                            "number": "04"
                        },
                        {
                            "desc": "多種板塊可自行設計或與我們說明想要的介面",
                            "title": "前後台版型多樣性",
                            "number": "05"
                        }
                    ],
                    "expand": true
                },
                "type": "whyUs",
                "label": "服務內容"
            },
            {
                "id": "s0s3s4s2sesds3s8-s1s6sbs5-4s2sbs8-s9sbs8se-s5sbs0s3sbs4s1s7s6s8s5sa",
                "js": "$style1/restaurant/style1.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {
                    "desc": "這是我們堅持做出好料理的理念",
                    "title": "料理主題介紹",
                    "dataList": {
                        "list": [
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension//restaurant/assets/img/specials-1.png",
                                "tab": "文教",
                                "desc": "因應「智慧機械、亞洲矽谷、綠能科技、生醫產業、國防產業」及「新農業、循環經濟」等5+2產業創新政策，屏東縣政府、行政院農業委員會農糧署與國立屏東科技大學共同合作，於8月9-10日在屏東智慧農業學校舉辦為期兩天的「農機操作保養訓練班」，共有40名參與，10日縣府勞動暨青年發展處黃鼎倫處長特地到場參與結業式並鼓勵屏東青年投入智慧農業的行列，讓農村產業轉型升級。",
                                "title": "田地在走，科技要有"
                            },
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension//restaurant/assets/img/specials-1.png",
                                "tab": "消費",
                                "desc": "中秋節即將到來，新竹市勞工處攜手3家庇護工場推出特色伴手禮，分別有喜憨兒月餅禮盒、慢飛兒咖啡禮盒還有竹夢園手工香皂禮盒，歡迎企業團體踴躍採購。喜憨兒和慢飛兒推出應景的中秋禮盒送禮或是自用都相當適合，另一家庇護工場竹夢園以清潔工作為主，主打「喜迎中秋淨來」精美手工皂禮盒與環保清潔劑。",
                                "title": "庇護工場推中秋伴手禮 即日起開放預購"
                            },
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension//restaurant/assets/img/specials-2.png",
                                "tab": "社會",
                                "desc": "eTrade hub「電商大講堂」網羅各鏈路跨境電商專業講師，連結產業動態與實務操作，擘劃一套系統性的學習課程，依照企業需求從初階到進階、從操作教學到成功個案分享，札實的內容獲得許多正面的迴響。剛結束的「基礎學程」起步篇，就以平台選擇、商標佈局、選品技巧為軸，吸引逾百位企業員工參與，近90%的學員表示整體課程內容相當實用、高達85%對於講師授課方式與互動表示滿意，更有學員反映「此系列課程幫助企業增廣見聞，讓企業能以新的思維，進行多方嘗試」，成效斐然。",
                                "title": "eTrade hub跨境電商大講堂"
                            },
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension//restaurant/assets/img/specials-3.png",
                                "tab": "產能",
                                "desc": "大南方崛起，蓄積多項產業轉型關鍵動能的高雄，從重工業之都蛻變高科技新城，全臺目光聚焦高雄，「投資高雄正對時」！高雄市政府今(10)日於高雄林皇宮舉辦「111年投資高雄城市產業論壇」，由財訊雙週刊社長謝金河主持，會中邀請高雄市政府副秘書長王啓川、經濟發展局局長廖泰翔、都市發展局副局長王屯電、學界代表及在地產業代表，從「高科技S廊道成形，掌握高雄轉型關鍵動能」與「高雄新生活，活化整合接軌國際」兩大主題，探討在各產業進駐下市府積極推動產業轉型、打造宜居高雄環境，一同預見更美好的高雄。",
                                "title": "掌握關鍵新動能 布局高雄大未來"
                            },
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension//restaurant/assets/img/specials-4.png",
                                "tab": "影音",
                                "desc": "『不稀罕別人給的完整╱狂奔』MV由林世穎& 陶磊兩位新銳導演執導拍攝，延續首部曲『白日夢的悲哀』在白日夢者超現實的迴圈後，畫面節奏跟著狂奔想像堆疊增加速度感，為MV特製的300公分高復刻沈安發呆容貌的大型「發呆至尊寶」呆呆搖擺人入鏡，雙寶共同激起白日夢們的生活情趣熱點。沈安說『“小明一個人在街上跳舞被罵是瘋子，於是他找了朋友跟他一起跳被罵是兩個瘋子。那請問小明找了幾個朋友?” 沈安回憶著他小學到現在都解不開的題目:“朋友要去那裡找?”』，以黑色幽默帶入白日夢者們在異想世界中的同溫層。",
                                "title": "發呆系歌手 沈安『不稀罕別人給的完整╱狂奔』"
                            },
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension//restaurant/assets/img/specials-5.png",
                                "tab": "藝術",
                                "desc": "玉雕是【减法藝術】，力道偏了，就完全沒有後悔和逆轉的機會了。翡翠玉雕跟石雕不同，石雕的材質裡外基本上是一致的，雕刻時不必顧慮材料的變化因素，可以依據創作的擬稿將創意圖示保持完善，在構思創作上相對自由，能自在發揮創意。但，翡翠玉雕有許多無法掌握的因素，玉料裡頭颜色的變化和一吋吋的綹裂出現，該怎樣避開裂和利用色都要立即隨機應變，處處如履薄冰，刀刀要慎之又慎，絲毫不能有半點差池。",
                                "title": "如何正確而有《次第》的學習翡翠"
                            }
                        ],
                        "expand": {}
                    }
                },
                "type": "special",
                "label": "特色料理"
            },
            {
                "id": "sas1s2scscs2sbse-s1sfs3sa-4sds9se-sbs1s1s9-s2s2s9scs0sbses6s1scs4sa",
                "js": "$style1/restaurant/style1.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {
                    "desc": "提供原創活動的餐點服務與流程",
                    "title": "活動專案",
                    "dataList": {
                        "list": [
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension/restaurant/assets/img/event-birthday.jpg",
                                "desc": "飯店提供五星級盛宴場地，佈置雅緻、時尚華麗，專屬的婚宴空間及精心研發料理，真誠的貼心服務，在這值得紀念的時刻，讓我們為您留下幸福與感動，您舉行幸福婚宴最佳場地，賓主盡情享受主廚最上乘好廚藝。",
                                "price": 24000,
                                "title": "婚禮宴會"
                            },
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension/restaurant/assets/img/event-custom.jpg",
                                "desc": "Wine Tasting + Shopping Day意大利葡萄酒有4000年歷史，是世界上最燦爛的葡萄酒生產國。擁有20個產區，近1000種葡萄，約80萬個葡萄園，每年生產約40億瓶葡萄酒 。在過去的五年裡，意大利葡萄酒的產量及出口量都位居世界第一，意大利是當之無愧的葡萄酒生產大國。有人說，外表容易騙人，品酒亦然。除非您的品酒經驗老道，否則您必須透過不同的嘗試才能找到心頭好。所以Wine Passions 及「意大利頂級酒莊聯盟」定期舉行試酒活動，讓您可以參加好評如潮的每月活動——由《新假期 》雜誌評選的「年度必到品酒工作坊」。在輕鬆的環境下，品嚐我們推介的不同美酒，而品酒工作坊亦作社交平台，讓您認識更多朋友！",
                                "price": 12000,
                                "title": "企業品酒會"
                            },
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension/restaurant/assets/img/event-private.jpg",
                                "desc": "餐點多樣，主打義大利麵，也有拼盤類餐點，適合多人聚餐，多點各式餐點一起分食享用，也有各式啤酒，店內陳設各種啤酒瓶，服務人員態度，服務品質佳，是家庭朋友聚餐會想選擇的項目",
                                "price": 8000,
                                "title": "親友聚餐"
                            }
                        ]
                    },
                    "background": "http://127.0.0.1:3090/lionHtmlExtension/restaurant/assets/img/events-bg.jpg"
                },
                "type": "slider",
                "label": "滑動式頁面"
            },
            {
                "id": "s7s5s1sasfs6s9s0-s2scs0se-4sds8sf-sbsfs3s4-scsbs3s3sas9s1sbs1s6s1sf",
                "js": "$style1/restaurant/style1.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {
                    "desc": "可以看看我們的客戶與業主給我們什麼樣的回饋！",
                    "title": "給客戶滿意的網站設計，是我們致力奉獻的服務",
                    "dataList": {
                        "list": [
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension/restaurant/assets/img/testimonials/testimonials-1.jpg",
                                "pro": "平面設計師",
                                "name": "陳志賢",
                                "text": "我覺得萊恩設計的想法很棒、很出色！下次會再次詢問相關知識"
                            },
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension/restaurant/assets/img/testimonials/testimonials-2.jpg",
                                "pro": "寵物店 店長",
                                "name": "陳佳玲",
                                "text": "萊恩設計公司的服務與溝通方式很友善"
                            },
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension/restaurant/assets/img/testimonials/testimonials-3.jpg",
                                "pro": "XX拉麵 廚師兼店長",
                                "name": "韓俊榮",
                                "text": "合作得很愉快，很喜歡萊恩設計"
                            },
                            {
                                "img": "http://127.0.0.1:3090/lionHtmlExtension/restaurant/assets/img/testimonials/testimonials-4.jpg",
                                "pro": "OO診所 護理師",
                                "name": "黃國玟",
                                "text": "達成客戶的需求，替客戶早一步想到問題點很棒"
                            }
                        ]
                    }
                },
                "type": "testimonials",
                "label": "用戶回饋"
            },
            {
                "id": "scscs7sds2s5sas9-s3sds5s2-4s5s8s0-sases9sf-s9s3s3sasbsbsdsfsbsfs3sd",
                "js": "$style1/restaurant/style1.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {},
                "type": "gallery",
                "label": "畫廊"
            },
            {
                "id": "sases9s0scs9sbs3-sas2s9sa-4s9s7s7-sas4sbsa-s0ses3s5ses7s3s3s3s9s4s2",
                "js": "$style1/restaurant/style1.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {},
                "type": "team",
                "label": "人員介紹"
            },
            {
                "id": "s2s5s4s5s7s7s8s0-s0scs9s4-4s6s7sb-s8s5s5s3-s8sbs4s5s6s3s1s6sds4s1sd",
                "js": "$style1/restaurant/style1.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {},
                "type": "Contact",
                "label": "聯絡我們"
            },
            {
                "id": "s3s2ses7s1s2s0s9-s9sfs8sf-4sbs0s8-sbs0ses2-s9sescscs3sfsbses1s5s2s0",
                "js": "$style1/official.js",
                "css": {
                    "class": {},
                    "style": {}
                },
                "data": {
                    "tag": "footer",
                    "list": []
                },
                "type": "component",
                "label": "嵌入模塊"
            }
        ])
    }
}