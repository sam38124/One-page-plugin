import { HtmlJson, Plugin } from '../glitterBundle/plugins/plugin-creater.js';
import { Glitter } from '../glitterBundle/Glitter.js';
import { GVC } from '../glitterBundle/GVController';
import { Editor } from '../editor';
import { TriggerEvent } from '../glitterBundle/plugins/trigger-event.js';

Plugin.create(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        temp: {
            title: '網站導覽列',
            subContent: '顯示多個超連結與頁面跳轉導覽的區塊．',
            defaultData: {},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view: () => {
                        return ``;
                    },
                    editor: () => {
                        return ``;
                    },
                };
            },
        },
    };
});

// glitter.htmlGenerate.editeText({
//     gvc: gvc,
//     title: '按鈕名稱[HTML]',
//     default: widget.data.nav.btn.name,
//     placeHolder: "輸入按鈕名稱",
//     callback: (text) => {
//         widget.data.nav.btn.name = text
//         widget.refreshComponent()
//     }
// })

// Editor.toggleExpand({
//     gvc: gvc, title: "電腦版", data: widget.data.mobile.m, innerText: ``
// })

// TriggerEvent.editer(gvc, widget, widget.data.nav.btn, {
//     hover: true,
//     option: [],
//     title: "點擊事件"
// })
// glitter.htmlGenerate.styleEditor(data.btn).editor(gvc,widget,'按鈕設計樣式')
// TriggerEvent.trigger({
//     gvc, widget, clickEvent: nav.btn,
// })

// htmlGenerate.styleEditor(dd)

// <div class="alert-dark alert p-2 mt-2">
// ${Editor.h3("按鈕設定")}
// glitter.htmlGenerate.editeText({
//     gvc: gvc,
//     title: '標題',
//     default: data.btn.name,
//     placeHolder: "標題",
//     callback: (text) => {
//         data.btn.name = text
//         widget.refreshComponent()
//     }
// })
// ${(glitter.htmlGenerate as any).styleEditor(data.btn).editor(gvc,widget)}
// ${TriggerEvent.editer(gvc, widget, data.btn, {
//                                     hover: true,
//                                     option: [],
//                                     title: "點擊事件"
//                                 })}
// </div>

// (keyVision2.m.lottie.split('.').pop() === 'json') ? `
//                 <lottie-player autoplay loop mode="normal" src="${keyVision2.m.lottie}" style="height: 32vh;width: 32vh;">`:`
//                 <img src="${keyVision2.m.lottie}" style="height: 32vh;width: 32vh;">`

// Editor.uploadLottie({
//     gvc: gvc,
//     title: `圖片或Lottie動畫區塊`,
//     def:widget.data.mobile.m.lottie,
//     callback:(data)=>{
//         widget.data.mobile.m.lottie=data
//         widget.refreshComponent()
//     }
// })

// Editor.arrayItem({
//                                                             gvc:gvc,
//                                                             title:"介紹區塊",
//                                                             originalArray:dd.selectList,
//                                                             array:dd.selectList.map((dd:any,index:number)=>{
//                                                                 return {
//                                                                     title:dd.name || `區塊:${index+1}`,
//                                                                     expand:dd,
//                                                                     innerHtml:
//                                                                         glitter.htmlGenerate.editeInput({
//                                                                             gvc: gvc,
//                                                                             title: `標題`,
//                                                                             default: dd.name,
//                                                                             placeHolder: "輸入標題名稱",
//                                                                             callback: (text) => {
//                                                                                 dd.name = text
//                                                                                 widget.refreshComponent()
//                                                                             }
//                                                                         }),
//                                                                     minus:gvc.event(()=>{
//                                                                         dd.selectList.splice(index,1)
//                                                                         widget.refreshComponent()
//                                                                     })
//                                                                 }
//                                                             }),
//                                                             expand:widget.data,
//                                                             plus:{
//                                                                 title:"添加區塊",
//                                                                 event:gvc.event(()=>{
//
//                                                                     widget.refreshComponent()
//                                                                 })
//                                                             },
//                                                             refreshComponent:()=>{
//                                                                 widget.refreshComponent()
//                                                             }
//                                                         })
