import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../../script-style-1.js";
import { Category } from "../../api/category.js";
import { ProductSharedView } from "../../product/shareView/shareView.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let isScrollListenerRegistered = false;
                    gvc.addStyle(`     
                        nav{
                            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
                        }
                
                        main {
                            padding: 24px 35px 44px;
                      
                            font-family: 'Noto Sans TC';
                            margin: 0;
                            box-sizing: border-box;
                        }
                        .sortRawText{
                            font-family: 'Noto Sans TC';
                            font-style: normal;
                            font-weight: 400;
                            font-size: 13px;
                            line-height: 19px;
                            /* identical to box height */
                            
                            display: flex;
                            align-items: center;
                            text-align: center;
                            
                            /* HOMEE dark grey */
                            
                            color: #858585;
                
                        }
                        a{
                        
                        }
                
                        `);
                    const gBundle = (gvc.parameter.pageConfig?.obj.data.object && gvc.parameter.pageConfig?.obj.data) ?? { "title": "本週新品", "object": { "link": "https://mitblog.pixnet.net/blog/post/37708222", "name": "本週新品", "value": "gid://shopify/Collection/435249512748", "clickEvent": { "src": "$homee/homee/event.js", "route": "category" }, "selectPage": { "tag": "product_show", "name": "產品展示頁面", "group": "產品頁" }, "subCategory": [{ "name": "銀標福利品", "value": "gid://shopify/Collection/435260719404" }, { "name": "布沙發 ( 更多商品即將更新 )", "value": "gid://shopify/Collection/432946676012" }] }, "category": "sub_category_id", "index": 0 };
                    const viewModel = {
                        select: gBundle.selectIndex ?? 0,
                        setSubCategoryRow: (category) => {
                            gvc.addStyle(`
                                .subcateTitle{
                                    font-weight: 400;
                                    font-size: 14px;
                                    line-height: 20px;
                                    display: flex;
                                    align-items: center;
                                    text-align: center;
                                    /* HOMEE dark grey */
                                    margin-left: 16px;
                                    color: #858585;
                                }
                                .selectTitle{
                                    /* HOMEE black */
                                    color: #292929;
                                    font-weight: 700;
                                }
                            `);
                            return gvc.bindView({
                                bind: "subCategoryRow",
                                view: () => {
                                    return gvc.map([].concat(gBundle.object.subCategory ?? []).map((data, index) => {
                                        return `
                                            <div class="subcateTitle ${(viewModel.select === index) ? `selectTitle` : ``}" style="" onclick="${gvc.event(() => {
                                            viewModel.loading = true;
                                            viewModel.select = index;
                                            gvc.notifyDataChange(id);
                                            gvc.notifyDataChange('cardGroup');
                                            gvc.notifyDataChange('subCategoryRow');
                                        })}">
                                                ${data["name"]}
                                                
                                            </div>
                                `;
                                    }));
                                }, divCreate: { class: `d-flex rowBar`, style: `margin-left:8px;overflow-x: scroll;padding-right:8px;` },
                                onCreate: () => {
                                    const parent = document.querySelector('.rowBar');
                                    const center = document.querySelector('.selectTitle');
                                    const centerOffsetLeft = center.offsetLeft;
                                    const centerWidth = center.offsetWidth;
                                    const parentWidth = parent.offsetWidth;
                                    let sumWidth = 0;
                                    let scrollTo = 0;
                                    const children = Array.from(parent.children);
                                    for (const data of children) {
                                        let child = data;
                                        sumWidth += child.offsetWidth + parseInt(window.getComputedStyle(child).marginLeft);
                                        if (child.offsetLeft + child.offsetWidth / 2 >= centerOffsetLeft + centerWidth / 2) {
                                            scrollTo = sumWidth - parentWidth / 2 - child.offsetWidth / 2 - parseInt(window.getComputedStyle(child).marginLeft);
                                            break;
                                        }
                                    }
                                    parent.scrollLeft = scrollTo;
                                }
                            });
                        },
                        loading: true,
                        product: [],
                        allData: []
                    };
                    let sortSelect = 0;
                    let title = gBundle.title ?? "分類頁";
                    let sortPriceOrder = -1;
                    let origData = [];
                    let cursor = "";
                    let sortBy = "manual";
                    let productSharedView = new ProductSharedView(gvc);
                    let sortRow = [
                        (() => {
                            return {
                                text: '精選', img: '', click: (e) => {
                                    const id = gBundle.object.subCategory[viewModel.select].value;
                                    window.scrollTo(0, 0);
                                    viewModel.loading = true;
                                    resetSort();
                                    sortSelect = 0;
                                    sortBy = "manual";
                                    cursor = "";
                                    window.removeEventListener('scroll', handleClick);
                                    new Category(glitter).getPageCategoryData("sub_category_id", id, 6, "", (response) => {
                                        viewModel.product = response["product_list"];
                                        cursor = response["cursor"];
                                        viewModel.loading = false;
                                        let spinnerBlcok = document.querySelector('.spinnerBlcok');
                                        spinnerBlcok.classList.remove("d-none");
                                        gvc.notifyDataChange(['sortBar', 'cardGroup']);
                                    }, sortBy);
                                }
                            };
                        })(),
                        (() => {
                            return {
                                text: '銷量', img: '', click: (e) => {
                                    const id = gBundle.object.subCategory[viewModel.select].value;
                                    viewModel.loading = true;
                                    resetSort();
                                    sortSelect = 1;
                                    sortBy = "best-selling";
                                    cursor = "";
                                    window.scrollTo(0, 0);
                                    window.removeEventListener('scroll', handleClick);
                                    new Category(glitter).getPageCategoryData("sub_category_id", id, 6, "", (response) => {
                                        viewModel.product = response["product_list"];
                                        cursor = response["cursor"];
                                        viewModel.loading = false;
                                        let spinnerBlcok = document.querySelector('.spinnerBlcok');
                                        spinnerBlcok.classList.remove("d-none");
                                        gvc.notifyDataChange(['sortBar', 'cardGroup']);
                                    }, sortBy);
                                }
                            };
                        })(),
                        (() => {
                            return {
                                text: '價格',
                                img: new URL('../../img/sample/category/sort.svg', import.meta.url).href,
                                click: (e) => {
                                    const id = gBundle.object.subCategory[viewModel.select].value;
                                    window.scrollTo(0, 0);
                                    sortSelect = 2;
                                    sortPriceOrder *= -1;
                                    cursor = "";
                                    let spinnerBlcok = document.querySelector('.spinnerBlcok');
                                    spinnerBlcok.classList.remove("d-none");
                                    window.removeEventListener('scroll', handleClick);
                                    if (sortSelect == 2) {
                                        if (sortPriceOrder == 1) {
                                            sortRow[2].img = new URL('../../img/sample/category/sortHigher.svg', import.meta.url).href;
                                            sortBy = "price";
                                            new Category(glitter).getPageCategoryData("sub_category_id", id, 6, "", (response) => {
                                                viewModel.product = response["product_list"];
                                                cursor = response["cursor"];
                                                viewModel.loading = false;
                                                gvc.notifyDataChange(['sortBar', 'cardGroup']);
                                            }, sortBy);
                                        }
                                        else {
                                            sortBy = "price-desc";
                                            sortRow[2].img = new URL('../../img/sample/category/sortSmaller.svg', import.meta.url).href;
                                            new Category(glitter).getPageCategoryData("sub_category_id", id, 6, "", (response) => {
                                                viewModel.product = response["product_list"];
                                                cursor = response["cursor"];
                                                viewModel.loading = false;
                                                gvc.notifyDataChange(['sortBar', 'cardGroup']);
                                            }, sortBy);
                                        }
                                    }
                                    viewModel.product.sort((a, b) => (a.sale_price - b.sale_price) * sortPriceOrder);
                                    gvc.notifyDataChange(['sortBar', 'cardGroup']);
                                }
                            };
                        })(),
                    ];
                    const handleScroll = () => {
                    };
                    function resetSort() {
                        sortRow[2].img = new URL('../../img/sample/category/sort.svg', import.meta.url).href;
                        sortPriceOrder = -1;
                    }
                    function handleClick(event) {
                        if (viewModel.loading) {
                            return;
                        }
                        if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight && cursor) {
                            isScrollListenerRegistered = true;
                            const id = gBundle.object.subCategory[viewModel?.select].value;
                            viewModel.loading = true;
                            new Category(glitter).getPageCategoryData("sub_category_id", id, 6, cursor, (response) => {
                                cursor = "";
                                viewModel.product.push(response["product_list"]);
                                if (response["product_list"].length == 0) {
                                    let spinnerBlcok = document.querySelector('.spinnerBlcok');
                                    spinnerBlcok.classList.add("d-none");
                                    viewModel.loading = true;
                                }
                                response["product_list"].forEach((productData) => {
                                    let element = productSharedView.productCard({ class: ``, style: `` }, productData);
                                    let leftElement = document.querySelector('.left-line');
                                    let rightElement = document.querySelector('.right-line');
                                    if (leftElement.getBoundingClientRect().height <= rightElement.getBoundingClientRect().height) {
                                        leftElement.innerHTML += element;
                                    }
                                    else {
                                        rightElement.innerHTML += element;
                                    }
                                });
                                cursor = response["cursor"];
                                viewModel.loading = false;
                            }, sortBy);
                        }
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let topInset = 0;
                            let bottomInset = 0;
                            let leftHeight = 0;
                            let rightHeight = 0;
                            glitter.runJsInterFace("getTopInset", {}, (response) => {
                                topInset = response.data;
                                gvc.notifyDataChange(['mainView']);
                            }, {
                                webFunction: () => {
                                    return { data: 0 };
                                }
                            });
                            return `
                                        <nav class="bg-white w-100 position-fixed z-index-99"  style="padding-top: ${topInset - 20}px;width: 100vw;box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);z-index: 9999;">
                                            <div class="d-flex justify-content-around w-100 align-items-center mt-auto" style="margin:0px;height: 63px; padding: 0 16px; background: #FFFFFF;position:relative;">
                                                <div class="me-auto p-0 d-flex align-items-center" style="">
                                                    <img class="" src="https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1676803803897" style="width: 24px;height: 24px;margin-right: 16px" alt="" onclick="${gvc.event(() => {
                            })}">
                                                </div>
                                                <div class=" d-flex align-items-center justify-content-center translate-middle-y translate-middle-x" style="color: #292929;;position: absolute;top: 50%;   font-family: 'Noto Sans TC';font-style: normal;font-size: 16px;font-weight: 700;">
                                                    ${title}
                                                </div>
                                            
                                            </div>
                                            <banner style="">
                                               ${((gBundle.object.subCategory ?? []).length > 0) ? viewModel.setSubCategoryRow(gBundle.parent_category_id) : ``}
                    <!--                            todo 之後如果有需要要加東西-->
                                                ${gvc.bindView({
                                bind: 'sortBar',
                                view: () => {
                                    let returnHTML = ``;
                                    sortRow.forEach((element, index) => {
                                        let style = (index == sortSelect) ? "color: #1E1E1E;" : "color: #858585;";
                                        returnHTML += `
                                                    <div class="sortRawText" style="padding: 0 24px;font-weight: 500;${style}" onclick="${gvc.event((e) => {
                                            element.click(e);
                                        })}">
                                                        ${element.text}
                                                        ${gvc.bindView({
                                            bind: "",
                                            view: () => {
                                                if (element.img) {
                                                    return `<img src="${element.img}" style="height: 16px;width: 16px;">`;
                                                }
                                                return ``;
                                            }
                                        })}
                                                    </div>
                                                    `;
                                        if (index != sortRow.length - 1) {
                                            returnHTML += `
                                                                            <div style="background: #858585; height: 5px;width: 1px;"></div>
                                                                        `;
                                        }
                                    });
                                    return returnHTML;
                                },
                                divCreate: { style: `margin-top:${(((gBundle.object.subCategory ?? []).length > 0) ? 24 : 0)}px;padding-bottom:9px;`, class: `d-flex align-items-center` }
                            })}
                                            </banner>       
                                        </nav>
                                        <main style="background: white;padding-top:${topInset - 20 + (((gBundle.object.subCategory ?? []).length > 0) ? 150 : 120)}px;padding-left: 23px;padding-right: 23px;">
                                            ${gvc.bindView({
                                bind: "cardGroup",
                                view: () => {
                                    if (viewModel.loading) {
                                        return ``;
                                    }
                                    else {
                                        return `
                                                        <div class="left-line w-50" style="height:auto; padding-right:8px;"></div>
                                                        <div class="right-line w-50" style="height:auto;padding-left:8px;"></div>                                                        
                                                        `;
                                    }
                                }, divCreate: { class: `CardGroup d-flex align-items-start` },
                                onCreate: () => {
                                    let leftElement = document.querySelector('.left-line');
                                    let rightElement = document.querySelector('.right-line');
                                    let CardGroup = document.querySelector('.CardGroup');
                                    if (!viewModel.loading) {
                                        viewModel.product.forEach((productData) => {
                                            let element = productSharedView.productCard({ class: ``, style: `` }, productData);
                                            if (leftElement.getBoundingClientRect().height <= rightElement.getBoundingClientRect().height) {
                                                leftElement.innerHTML += element;
                                            }
                                            else {
                                                rightElement.innerHTML += element;
                                            }
                                        });
                                        gvc.addStyle(`
                                                            .swiper-pagination-bullet {
                                                                background: #E0E0E0!important;;                    
                                                            }
                                                            .swiper-pagination-bullet-active{
                                                                background: #FE5541!important;;
                                                            }
                                                        `);
                                        let test = document.querySelector('main');
                                        window.addEventListener('scroll', handleClick);
                                    }
                                }
                            })} 
                                            <div class="w-100 spinnerBlcok">
                                                <div class=" rounded py-5 h-100 d-flex align-items-center flex-column">
                                                    <div class="spinner-border" role="status"></div>
                                                </div>
                                            </div>                                          
                                        </main>                         
                                        `;
                        }, divCreate: {},
                        onCreate: () => {
                            if (viewModel.loading) {
                                if (gBundle.object.subCategory) {
                                    const id = gBundle.object.subCategory[viewModel?.select].value;
                                    new Category(glitter).getPageCategoryData("sub_category_id", id, 6, "", (response) => {
                                        viewModel.product = response["product_list"];
                                        cursor = response["cursor"];
                                        viewModel.allData.push(response);
                                        viewModel.loading = false;
                                        gvc.notifyDataChange(['cardGroup']);
                                    }, sortBy);
                                    viewModel.allData.push([]);
                                }
                                else {
                                    viewModel.loading = false;
                                }
                            }
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
