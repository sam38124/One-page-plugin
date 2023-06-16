import { status } from "./status.js";
export function getPostForm(formList) {
    const global_form = [
        {
            "col": "12",
            "key": "budget",
            "tag": "form_budget",
            "colm": "12",
            "type": "custom",
            "label": "預算填寫",
            "expand": false,
            "component": {},
            "formExpand": { "expand": true },
            "requirement": "true"
        }, {
            "col": "12",
            "key": "serviceDate",
            "colm": "12",
            "type": "date",
            "label": "服務日期",
            "requirement": "true",
            "formExpand": { "expand": true }
        }, {
            "col": "12",
            "key": "serviceTime",
            "colm": "12",
            "requirement": "true",
            "type": "time",
            "label": "服務時間",
            "formExpand": { "expand": true }
        }, {
            "col": "12",
            "key": "serviceArea",
            "colm": "12",
            "type": "placeSelect",
            "label": "服務地區",
            "requirement": "false",
            "formExpand": { "expand": true },
            "selectType": "manual"
        }, {
            "col": "12",
            "key": "serviceAddress",
            "colm": "12",
            "type": "address",
            "requirement": "true",
            "label": "詳細地址",
            "formExpand": { "expand": true }
        }, {
            "col": "12",
            "key": "contact_phone",
            "colm": "12",
            "type": "phone",
            "requirement": "true",
            "label": "聯絡電話",
            "formExpand": { "expand": true }
        },
        {
            "col": "12",
            "key": "note",
            "colm": "12",
            "type": "textArea",
            "requirement": "true",
            "label": "用戶備註",
            "formExpand": { "expand": true }
        },
        {
            "col": "12",
            "def": "post_case",
            "key": "type",
            "colm": "12",
            "type": "hideData",
            "label": "表單類型",
            "formExpand": {
                "expand": true
            },
            "requirement": "true"
        },
        {
            "col": "12",
            "def": status.form.onWait,
            "key": "progress",
            "colm": "12",
            "type": "hideData",
            "label": "表單類型",
            "formExpand": {
                "expand": true
            },
            "requirement": "true"
        }
    ];
    formList = formList.filter((dd) => {
        return !global_form.find((d2) => {
            return d2.key === dd.key;
        });
    });
    return global_form.concat(formList);
}
