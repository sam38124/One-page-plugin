import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../../script-style-1.js";
import { Dialog } from "../../dialog/dialog-mobile.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    gvc.addStyle(`
                   
                    .productTitle{
                        font-family: 'Noto Sans TC';
                        font-style: normal;
                        font-weight: 700;
                        font-size: 24px;
                        color: #292929;
                    }
                    .productPriceRow .sale_price{
                        font-family: 'Noto Sans TC';
                        font-style: normal;
                        font-weight: 500;
                        font-size: 20px;
                        color: #FD6A58;
                    }
                    .productPriceRow .price{
                        font-family: 'Noto Sans TC';
                        font-weight: 400;
                        font-size: 15px;
                        font-size: 20px;
                        color: #858585;
                        text-decoration-line: line-through;
                        
                        margin-left:40px;
                        padding-top:6px;
                    }
                    .productQTYRow .qtyBar{
                        width:40px;
                        height:2px;
                        background:#292929;
                    }
                    .productQTYRow .qtyNumber{
                        font-family: 'Noto Sans TC';
                        font-style: normal;
                        font-weight: 700;
                        font-size: 24px;
                        margin:0 16px;
                        color: #292929;
                    }
                    .kindUnselected{                                        
                        border: 1px solid #D6D6D6;
                        border-radius: 5px;
                        font-family: 'Noto Sans TC';
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        color: #292929;
                        margin-right : 8px;
                        padding: 4px 12px 3px;
                    }
                    .kindSelected{                                        
                        background: rgba(41, 41, 41, 0.1);                                                                                
                        border: 1px solid #292929;
                        border-radius: 5px;
        
                    }
                    .sizeSelectTitle{
                        font-family: 'Noto Sans TC';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 15px;
                        color: #292929;
                    }
                `);
                    let bottomInset = 0;
                    function addThousandSeparator(numStr) {
                        const num = Number(numStr);
                        return num.toLocaleString();
                    }
                    function qtyChange(action = true) {
                        widget.data.qty += (action) ? 1 : -1;
                        if (widget.data.qty < 0) {
                            widget.data.qty = 0;
                        }
                        gvc.notifyDataChange("qtyNumber");
                    }
                    function goToSlide(index) {
                        const oldActiveEl = document.querySelector('.swiper-pagination .swiper-pagination-bullet-active');
                        if (oldActiveEl) {
                            oldActiveEl.classList.remove('swiper-pagination-bullet-active');
                        }
                        const newActiveEl = document.querySelectorAll('.swiper-pagination .swiper-pagination-bullet')[index];
                        if (newActiveEl) {
                            newActiveEl.classList.add('swiper-pagination-bullet-active');
                        }
                        glitter.share.swiper.map((dd) => {
                            try {
                                dd.slideTo(index + 1);
                            }
                            catch (e) { }
                        });
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let sku_list = (widget.data.productData && widget.data.productData.sku_list) ?? {};
                            let key = [];
                            widget.data.attribute_list.map((dd) => {
                                const select = dd.attribute_values.find((d2) => {
                                    return d2.selected;
                                });
                                select && key.push(select.value);
                            });
                            const selectSku = sku_list[key.join(' / ')];
                            setTimeout(() => {
                                goToSlide(selectSku.image_index);
                            }, 250);
                            return `       
                       ${gvc.bindView({
                                bind: 'productTitle',
                                view: () => {
                                    return `  
                            <div class="productTitle" style="white-space:normal;word-wrap:break-word;word-break:break-all;">${widget.data.name}</div>
                            <div class="d-flex productPriceRow" style="">
                                <div class="sale_price">NT$ ${addThousandSeparator(selectSku.sale_price)}</div>
                                <div class="price ${selectSku && (selectSku.sale_price === selectSku.price) ? 'd-none' : ''}">NT$ ${addThousandSeparator(selectSku.price)}</div>
                            </div>`;
                                },
                                divCreate: { class: `d-flex flex-column` }
                            })}   
                        
                        <div class="productQTYRow d-flex align-items-center justify-content-between " style="margin: 16px 0;">
                            <div class="qtyBar"></div>
                            <div class="d-flex">
                                <img src="${new URL('../../img/component/minusCircle.svg', import.meta.url)}" onclick="${gvc.event(() => {
                                qtyChange(false);
                            })}">
                                ${gvc.bindView({
                                bind: "qtyNumber",
                                view: () => {
                                    return `
                                        <input class="border-0 text-center" style="width: 45px;"  value="${widget.data.qty}" onchange="${gvc.event((e) => {
                                        widget.data.qty = e.value;
                                        if (widget.data.qty < 0) {
                                            widget.data.qty = 0;
                                            gvc.notifyDataChange("qtyNumber");
                                        }
                                    })}">`;
                                }, divCreate: { class: `qtyNumber d-flex align-items-center justify-content-center`, style: `` }
                            })}
                                <img src="${new URL('../../img/component/plusCircle.svg', import.meta.url)}" onclick="${gvc.event(() => {
                                qtyChange();
                            })}">
                                
                            </div>
                        </div>
                        
                        ${gvc.bindView({
                                bind: "sizeSelect",
                                view: () => {
                                    function productKindDom(index, sizeType) {
                                        return `
                                        ${gvc.bindView({
                                            bind: `type${index}`,
                                            view: () => {
                                                return `
                                                <div class="sizeSelectTitle">
                                                    ${sizeType.attribute_key}
                                                </div>
                                                <div class="d-flex flex-wrap" style="overflow: scroll;">
                                                    ${gvc.map(sizeType.attribute_values.map((data, index) => {
                                                    let className = "kindUnselected";
                                                    if (data.selected) {
                                                        className += " kindSelected";
                                                    }
                                                    return `
                                                    <div class="${className}" style="margin-top: 8px;" onclick="${gvc.event(() => {
                                                        sizeType.attribute_values.map((dd) => {
                                                            dd.selected = false;
                                                        });
                                                        data.selected = true;
                                                        widget.refreshComponent();
                                                    })}">${data.value}
                                                    </div>
                                                        `;
                                                }))}
                                                </div>      
                                                `;
                                            }, divCreate: { class: ``, style: `margin-bottom:8px;` },
                                        })}
                                        
                                    `;
                                    }
                                    return gvc.map(widget.data.attribute_list.map((sizeType, index) => {
                                        if (sizeType.attribute_key != "Title") {
                                            return productKindDom(index, sizeType);
                                        }
                                        else
                                            return ``;
                                    }));
                                }, divCreate: { class: ``, style: "padding-bottom:32px;border-bottom:1px solid rgb(30,30,30,0.1);" },
                            })}
                        
                        ${gvc.bindView({
                                bind: `intro`,
                                view: () => {
                                    gvc.addStyle(`
                                    .intro{
                                        padding-bottom : 90px;
                                    }
                                    .intro img{
                                      max-width:100%;
                                    }
                                    .introTitle{
                                        font-family : 'Noto Sans TC';
                                        font-style : normal;
                                        font-weight : 700;
                                        font-size : 24px;
                                        color : #292929;
                                        margin-bottom : 16px;
                                    }
                                    .introText{
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 15px;
                                        color: #292929;
                                        white-space:normal;
                                        word-wrap:break-word;
                                        word-break:break-all;        
                                                                       
                                    }
                                    
                                `);
                                    return `
                                    ${gvc.map(widget.data.intro.map((intro) => {
                                        return `
                                            <div class="intro">
                                                <div class="introTitle">${intro.title}</div>
                                                <div class="introText">${intro.text}</div>
                                            </div>
                                        `;
                                    }))}
                                `;
                                }, divCreate: { class: `productIntroText`, style: `padding-top:40px;` },
                                onCreate: () => {
                                    let intro = document.querySelector('.productIntroText');
                                    let links = intro.querySelectorAll('a');
                                    links.forEach(link => {
                                        link.addEventListener('click', (event) => {
                                            event.preventDefault();
                                            gvc.glitter.runJsInterFace("openWeb", {
                                                url: link.href
                                            }, (data) => {
                                            }, {
                                                webFunction(data, callback) {
                                                    gvc.glitter.openNewTab(link.href);
                                                }
                                            });
                                        });
                                    });
                                }
                            })}
                        
                        ${gvc.bindView({
                                bind: "footer",
                                view: () => {
                                    glitter.runJsInterFace("getBottomInset", {}, (response) => {
                                        if (bottomInset != response.data) {
                                            bottomInset = response.data;
                                            gvc.notifyDataChange("footer");
                                        }
                                    }, {
                                        webFunction: () => {
                                            return { data: 20 };
                                        }
                                    });
                                    gvc.addStyle(`
                                    .footerIMG {
                                        width: 22px;
                                        height: 20px;
                                    }
                                    .footerText{
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 12px;
                                        line-height: 17px;
                                        text-align: center;
                                        color: #858585;
                                    }
                                    .footerBTN{
                                        
                                    }
                                    .footerBTNLeft{
                                        background: #FFDC6A;
                                        padding:14px 29px;
                                        border-radius: 24px 0px 0px 24px;
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 700;
                                        font-size: 14px;
                                        color: #1E1E1E;
                                    }
                                    .footerBTNRight{
                                        background: #FE5541;
                                        padding:14px 29px;
                                        border-radius: 0px 24px 24px 0px;
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 700;
                                        font-size: 14px;
                                        color: #FFFFFF;
                                    }
                                `);
                                    return `
                                <div class="footer d-flex align-items-center " style="padding:12px 20px ${bottomInset}px;background: #FFFFFF;box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.05);">
                                    <div class="d-flex flex-column align-items-center" style="width: 40px;" onclick="${gvc.event(() => {
                                        gvc.glitter.runJsInterFace("intentOutSide", {
                                            url: "fb-messenger-public://user-thread/142541949661977?intent_trigger=mme&source_id=1441792&nav=discover"
                                        }, (data) => { }, {
                                            webFunction(data, callback) {
                                                gvc.glitter.openNewTab(data.data.url);
                                            }
                                        });
                                    })}">
                                        <img class="footerIMG" src="${new URL('../../img/component/customer_service.png', import.meta.url)}" >
                                        <div class="footerText">
                                            客服
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column align-items-center d-none" style="width: 40px;">
                                        <img class="footerIMG" src="${new URL('../../img/component/send.svg', import.meta.url)}">
                                        <div class="footerText">
                                            分享給
                                        </div>
                                        
                                    </div>
                                    
                                    <div class="footerBTN  flex-fill ${selectSku.t3dModel ? `d-none` : ``} d-flex flex-fill align-items-center justify-content-center text-white" style="background: #FFDC6A;
                                        padding:14px 29px;
                                        border-radius: 24px;
                                        background: ${(selectSku.availableForSale) ? `#FE5541` : `grey`};
                                        font-family: 'Noto Sans TC';
                                        font-style: normal;
                                        font-weight: 700;
                                        font-size: 14px;
                                        margin-left: 20px;" onclick="${gvc.event((e) => {
                                        const dialog = new Dialog(gvc);
                                        if (selectSku.availableForSale) {
                                        }
                                        else {
                                            dialog.showInfo("產品已售完");
                                        }
                                    })}">${(selectSku.availableForSale) ? `加入購物車` : `已售完`}
                                    </div>
                                    <div class="footerBTN ms-auto d-flex  flex-fill ${selectSku.t3dModel ? `` : `d-none`}">
                                        <div class="footerBTNLeft d-flex align-items-center justify-content-center flex-fill" onclick="${gvc.event(() => {
                                        const data = {
                                            data: widget.data.productData.product_detail,
                                            sku: selectSku
                                        };
                                    })}">加入至空間</div>
                                        <div class="footerBTNRight d-flex align-items-center justify-content-center flex-fill" style="background: ${(selectSku.availableForSale) ? `#FE5541` : `grey`};" onclick="${gvc.event((e) => {
                                        if (selectSku.availableForSale) {
                                        }
                                        else {
                                        }
                                    })}">${(selectSku.availableForSale) ? `加入購物車` : `已售完`}</div>
                                    </div>
                                </div>
                                `;
                                }, divCreate: { style: `left: 0px;`, class: `position-fixed bottom-0 w-100 m-0 left-0 p-0` }
                            })}
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
