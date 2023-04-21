import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
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
                                            gvc.notifyDataChange('mainView');
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
                    const handleScroll = () => {
                    };
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
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
