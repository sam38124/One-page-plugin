import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {ClickEvent} from "../../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {
        },
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    widget.data.link = widget.data.link??[];
                    widget.data.section = widget.data.section??[
                        {
                            title: "產品相關",
                            service: [
                                {
                                    text: "免費線上規劃軟體",
                                    onclick: () => {

                                    }
                                },
                                {
                                    text: "品質保證",
                                    onclick: () => {

                                    }
                                },
                                {
                                    text: "國際認證",
                                    onclick: () => {

                                    }
                                },
                                {
                                    text: "試睡保證",
                                    onclick: () => {

                                    }
                                },
                            ]
                        },
                        {
                            title: "購物相關",
                            service: [
                                {
                                    text: "HOMEE 分店",
                                    onclick: () => {

                                    }
                                },
                                {
                                    text: "付款方式說明",
                                    onclick: () => {

                                    }
                                },
                                {
                                    text: "隱私權保護及網站使用與購物政策   ",
                                    onclick: () => {

                                    }
                                },
                                {
                                    text: "折讓單作業說明",
                                    onclick: () => {

                                    }
                                },
                            ]
                        },
                        {
                            title: "服務相關",
                            service: [
                                {
                                    text: "運送服務",
                                    onclick: () => {

                                    }
                                },
                                {
                                    text: "組裝服務",
                                    onclick: () => {

                                    }
                                },
                                {
                                    text: "舊家具搬運 / 舊床墊回收服務",
                                    onclick: () => {

                                    }
                                },
                                {
                                    text: "空間規劃 / 丈量服務",
                                    onclick: () => {

                                    }
                                },
                                {
                                    text: "驗房服務",
                                    onclick: () => {

                                    }
                                },
                            ]
                        }

                    ];
                    widget.data.lastSection = widget.data.lastSection??{
                        contactUs: {
                            title: "聯絡我們",
                            servicePhoneTitle: "客服專線",
                            servicePhone: "0972-636-236",
                            serviceTimeTitle: "服務時間",
                            physicalStore: "週一 ~ 週五 10:00-18:00",
                            onlineStore: "週一 ~ 週日 09:00-18:00",
                            service1v1: {
                                title: "線上專人服務",
                                onclick: () => {
                                }
                            }
                        },
                        kanban: "img/kanban.png"

                    };
                    console.log("-------------data-----------------")
                    console.log(widget.data)
                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                        ${gvc.bindView({
                                bind: "serviceListGroup",
                                view: () => {
                                    let classStyle={
                                        serviceCard : `
                                        background: #FBF9F6;
                                        border-radius: 24px;
                                        padding: 16px 0px 7px;
                                        margin-bottom:16px;
                                    `,
                                        serviceTitle:`
                                        font-weight: 700;
                                        font-size: 24px;
                                        line-height: 35px;
                                        color: #292929;
                                        margin-bottom:24px;
                                    `,
                                        serviceText:`
                                        font-weight: 400;
                                        font-size: 15px;
                                        line-height: 150%;
                                        color: #858585;
                                    `,
                                        serviceRow:`
                                        padding-left : 32px;
                                        padding-right : 24px;
                                        gap : 8px;
                                        margin-bottom:17px;                          
                                        height : 23px;
                                    `,
                                        left:`
                                        font-weight: 400;
                                        font-size: 15px;
                                        line-height: 150%;                                        
                                        color: #858585;
                                    `,
                                        right:`
                                    font-weight: 400;
                                    font-size: 13px;
                                    line-height: 14px;                                                                        
                                    color: #858585;
                                    `
                                    }

                                    let returnHTML = ``;
                                    widget.data.section.forEach((serviceList: any) => {
                                        returnHTML += `                           
                                    ${gvc.bindView({
                                            bind: "service",
                                            view: () => {

                                                let serviceGroup = ``;
                                                serviceGroup = gvc.map(serviceList.service.map((service: any) => {

                                                    return `
                                                <div class="d-flex align-items-center  w-100 " style="${classStyle.serviceRow}" onclick="${gvc.event(() => {
                                                        ClickEvent.trigger({
                                                            gvc, widget, clickEvent: service
                                                        })
                                                    })}">
                                                    <div class="d-flex me-auto" style="${classStyle.left} padding-left:2px;height: 29px;align-items: center;" >
                                                        ${service.text}
                                                    </div>
                                                    <div class="d-flex align-items-center ms-auto">                                                        
                                                        <img class="ms-auto" src="${new URL!(`../../img/component/angle-right.svg`, import.meta.url)}" alt="" style="width: 24px;height: 24px;">
                                                    </div>
                                                </div>
                                              
                                              `
                                                }))

                                                return `
                                    <div class="d-flex align-items-center flex-column" style="${classStyle.serviceCard}">
                                        <div class="" style="${classStyle.serviceTitle}">${serviceList.title}</div>
                                        ${serviceGroup}
                                    </div>
                                `

                                            }
                                        })}
                                `

                                    })
                                    return returnHTML
                                }, divCreate: {style: `margin-top: 26px;font-family: 'Noto Sans TC';font-style: normal;`, class: ``}
                            })}
                        ${gvc.bindView({
                                bind: "lastSection",
                                view: () => {
                                    
                                    let styleClass = {
                                        lastSectionTitle :`
                                        font-weight: 700;
                                        font-size: 24px;
                                        line-height: 35px;                                    
                                        color: #292929;                                    
                                        margin-bottom : 24px;
                                    `,
                                        serviceTimeBlock:`
                                        font-weight: 400;
                                        font-size: 15px;
                                        line-height: 150%;
                                        color: #858585;
                                    `,
                                        servicePhoneBlock:`
                                        font-weight: 400;
                                        font-size: 15px;
                                        line-height: 150%;
                                        color: #858585;
                                    `,
                                        serviceBTN : `
                                        height: 48px;
                                        margin-top:24px;                  
                                        font-weight: 700;
                                        font-size: 18px;
                                        line-height: 26px;                                        
                                        text-align: center;
                                        letter-spacing: 0.15em;            
                                        background: #FD6A58;
                                        border-radius: 28px;                                                                                
                                        color: #FFFFFF;
                                    `

                                    }

                                    let thisModel = widget.data.lastSection
                                    return `
                        
                                <div class="d-flex justify-content-center align-items-center" style="${styleClass.lastSectionTitle}">${thisModel.contactUs.title}</div>
                                <div class=" d-flex flex-column align-items-start justify-content-start" style="${styleClass.servicePhoneBlock} margin-bottom: 16px;">
                                    <div>客服專線：0972-636-236</div>                                    
                                </div>
                                <div class="" style="${styleClass.serviceTimeBlock} ">
                                    <div>${thisModel.contactUs.serviceTimeTitle} : ${thisModel.contactUs.physicalStore}</div>                                    
                                    <div>${thisModel.contactUs.onlineStore}</div>
                                </div>
                                <button class="w-100  border-0" style="${styleClass.serviceBTN}" onclick="${gvc.event(() => {
                                        thisModel.contactUs.service1v1.onclick();
                                    })}">${thisModel.contactUs.service1v1.title}</button>
                                
                                ${gvc.bindView({
                                        bind: "kanban",
                                        view: () => {
                                            return `
                                            <div class="" style="position: absolute;bottom: 0;left:0;transform: translate(0 , 100%);padding-top: 57%;width : 100%;background:50% / cover url(${new URL!(`../../img/component/kanban.png`, import.meta.url)})"></div>
                                        `
                                        },
                                        divCreate: {class: ``, style: `width : 100%;`}
                                    })}     
                            `
                                },
                                divCreate: {
                                    class: ``,
                                    style: `background: #FBF9F6;border-radius: 24px;padding: 16px 32px 24px;margin-bottom:200px;position: relative;`
                                }
                            })}
                        `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return``
                }
            }
        },
    }
})