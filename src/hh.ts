//gvc.glitter.share.public_api.GlobalUser.updateUserData.userData.line
import {init} from "./glitterBundle/GVController.js";

init((gvc, glitter, gBundle) => {
    (() => {
        // alert(JSON.stringify(response.data))
        ``
        // console.log(`expireInfo:${JSON.stringify(response)}`);
        const b = {
            "postFrom": 282040580,
            "formData": {
                "id": 92,
                "note": "dadsa",
                "type": "post_case",
                "budget": 4000,
                "userID": 282040580,
                "progress": 1,
                "serviceID": "1685445510130",
                "selectCity": "新竹縣",
                "selectPlace": "關西鎮",
                "serviceArea": "",
                "serviceDate": "2023-06-21",
                "serviceTime": "14:54",
                "contact_phone": "0978028730",
                "serviceAddress": "台中市潭子區昌平路三段150巷15弄12號"
            },
            "formList": [{
                "col": "12",
                "key": "budget",
                "tag": "form_budget",
                "colm": "12",
                "type": "custom",
                "label": "預算填寫",
                "expand": false,
                "component": {},
                "formExpand": {"expand": true},
                "requirement": "true",
                "list": []
            }, {
                "col": "12",
                "key": "serviceDate",
                "colm": "12",
                "type": "date",
                "label": "服務日期",
                "requirement": "true",
                "formExpand": {"expand": true}
            }, {
                "col": "12",
                "key": "serviceTime",
                "colm": "12",
                "requirement": "true",
                "type": "time",
                "label": "服務時間",
                "formExpand": {"expand": true}
            }, {
                "col": "12",
                "key": "serviceArea",
                "colm": "12",
                "type": "placeSelect",
                "label": "服務地區",
                "requirement": "false",
                "formExpand": {"expand": true},
                "selectType": "manual"
            }, {
                "col": "12",
                "key": "serviceAddress",
                "colm": "12",
                "type": "address",
                "requirement": "true",
                "label": "詳細地址",
                "formExpand": {"expand": true}
            }, {
                "col": "12",
                "key": "contact_phone",
                "colm": "12",
                "type": "phone",
                "requirement": "true",
                "label": "聯絡電話",
                "formExpand": {"expand": true}
            }, {
                "col": "12",
                "key": "note",
                "colm": "12",
                "type": "textArea",
                "requirement": "true",
                "label": "用戶備註",
                "formExpand": {"expand": true}
            }, {
                "col": "12",
                "def": "post_case",
                "key": "type",
                "colm": "12",
                "type": "hideData",
                "label": "表單類型",
                "formExpand": {"expand": true},
                "requirement": "true"
            }, {
                "col": "12",
                "def": 0,
                "key": "progress",
                "colm": "12",
                "type": "hideData",
                "label": "表單類型",
                "formExpand": {"expand": true},
                "requirement": "true"
            }],
            "readonly": true,
            "parentConfig": {
                "id": "s0scs3s0sds9scs7-s7sbsas5-4s9s9sc-sbs9sas0-s2s1sbs6s3s8sdses7s4sbs4",
                "js": "$style1/official.js",
                "css": {"class": {}, "style": {}},
                "data": {
                    "tag": "post_case_cancel_footer",
                    "list": [{
                        "tag": "footer_progress",
                        "code": "(()=>{\n                return   (subData.postFrom===glitter.share.public_api.GlobalUser.userInfo.userID) &&(subData.formData.progress===1)\n            })()",
                        "name": "發案者-進行中",
                        "evenet": {},
                        "expand": false
                    }, {
                        "tag": "mycase_footer",
                        "code": "(()=>{\n   return   (subData.postFrom===glitter.share.public_api.GlobalUser.userInfo.userID) &&(subData.formData.progress===0)\n})()",
                        "name": "發案者-媒合中",
                        "evenet": {},
                        "expand": false
                    }, {
                        "tag": "post_case_cancel_footer",
                        "code": "(()=>{\n                return   (subData.postFrom===glitter.share.public_api.GlobalUser.userInfo.userID) &&(subData.formData.progress===-1)\n            })()",
                        "name": "發案者-已取消",
                        "evenet": {},
                        "expand": false
                    }, {
                        "tag": "get_case_footer",
                        "code": "(()=>{\n   return   (subData.postFrom!==glitter.share.public_api.GlobalUser.userInfo.userID) &&(subData.formData.progress===0)\n})()",
                        "name": "接案者-媒合中",
                        "expand": true
                    }],
                    "expand": true
                },
                "type": "component",
                "class": "bg-white",
                "index": 3,
                "label": "嵌入模塊",
                "styleList": [],
                "refreshAllParameter": {},
                "refreshComponentParameter": {}
            },
            "widgetComponentID": "s1s8s3s2sdscs5s6-s0scsdsc-4sds3s5-sas8sbs6-s9s0s9s2s9s0s3s6scs9s2s7",
            "option": []
        }
        //glitter.share.expireInfo
        const a = {
            "id": 21, "userID": 282040580, "account": "jianzhi.wang@gmail.com", "userData": {
                "line": "sam38124",
                "phone": "0978028730",
                "photo": "https://liondesign-prd.s3.amazonaws.com/file/guest/1686714846728-glitterai.png",
                "address": "台中市",
                "fullName": "jtest",
                "expireInfo": {
                    "service": "經過精心設計，我們提供優質的服務，以滿足您的需求。無論您是個人客戶還是企業客戶，我們都致力於為您提供最佳的服務內容。\n\n我們的服務範圍廣泛，涵蓋多個領域，包括但不限於：\n\n咨詢服務：我們擁有專業的團隊，能夠提供全面的咨詢服務，幫助您解決各種問題和挑戰。無論您需要業務咨詢、技術咨詢還是市場咨詢，我們都能夠提供專業建議和解決方案。\n\n設計和創意服務：我們的設計團隊具有豐富的經驗和創意思維，能夠為您提供各種設計服務，包括品牌設計、平面設計、網站設計等。我們將根據您的需求和目標創作出獨特而引人注目的設計作品。\n\n數字營銷：在這個數字時代，營銷已經成為推動業務增長的關鍵。我們提供全方位的數字營銷服務，包括社交媒體營銷、搜尋引擎優化、線上廣告等。我們將根據您的目標受眾和預算制定有效的營銷策略，以提升您的品牌知名度和業務銷售。\n\n技術開發：如果您需要定制的軟件開發、網站開發或移動應用開發等技術解決方案，我們的技術團隊將全力以赴，根據您的需求和規格提供高質量的開發服務。我們將確保交付具有優秀性能、易用性和擴展性的解決方案。\n\n培訓和講座：我們的專家團隊可以提供培訓和講座，涵蓋多個主題，包括領導力發展、創新思維、數字營",
                    "forcustomer": "親愛的客人，\n\n非常感謝您選擇我們作為您的服務提供者。我們的團隊致力於為您提供最好的體驗，並確保您的需求得到充分滿足。\n\n我們明白，您的時間寶貴，您的滿意是我們最大的追求。無論您面臨什麼問題或需求，我們都會全力以赴，為您提供專業、高效和友善的服務。\n\n我們的團隊由經驗豐富的專業人士組成，他們具備豐富的知識和技能，並以您的利益為優先。我們將傾聽您的需求，理解您的期望，並努力超越您的期待。\n\n我們深信每一次互動都是建立長久關係的契機。因此，我們將以真誠、尊重和溝通的態度對待每一位客人。我們鼓勵您隨時提出任何問題或反饋，我們將樂意聆聽並做出適當的改進。\n\n再次感謝您的信任與支持。我們期待為您提供優質的服務，並與您建立長期合作夥伴關係。\n\n祝您有愉快的體驗！\n\n衷心問候，\n您的服務團隊"
                }
            }, "created_time": "2023-06-08T23:40:26.000Z"
        }
        // gvc.getBundle()['expireInfo']=

        // alert(JSON.stringify(subData.userData))
        // subData.formData.
        // alert(JSON.stringify(subData))
        "".replace(/\n/g, '<br>')
        gvc.getBundle()['matchCase'] = {
            bind_case: glitter.getUrlParameter('caseID')
        }
        // (()=>{
        //     if(!gvc.getBundle().editExpireMode){
        //         return  `btn  btn-primary d-none`
        //     }else{
        //         return  `btn-warning btn text-dark`
        //     }
        // })()

//  JSON.stringify(gvc.glitter.share.public_api.GlobalUser.userInfo.userData.expireInfo)
// glitter.share.public_api.GlobalUser.userInfo.userData.expireInfo.service =element.e.value;
// gvc.glitter.share.public_api.GlobalUser.userInfo.updateUserData.expireInfo = gvc.glitter.share.public_api.GlobalUser.userInfo.updateUserData.expireInfo ?? {}
// gvc.glitter.share.public_api.GlobalUser.userInfo.userData.expireInfo = gvc.glitter.share.public_api.GlobalUser.userInfo.userData.expireInfo ?? {}
        gvc.glitter.share.public_api.GlobalUser.userInfo.userData.expireInfo.service
        if (gvc.getBundle().editExpireMode) {

            return `btn  btn-primary`
        } else {
            return `btn-warning btn text-dark`
        }
    })();
    (() => {
        if (gvc.getBundle().editExpireMode) {
            return `儲存檔案`
        } else {
            return `編輯專家檔案`
        }
    })()
    gvc.getBundle().editExpireMode
    return {
        onCreateView: () => {
            return ``
        }
    }
})

