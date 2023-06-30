import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            const data = {
                "order": {
                    "id": 5410803679532,
                    "admin_graphql_api_id": "gid://shopify/Order/5410803679532",
                    "app_id": 26680590337,
                    "browser_ip": null,
                    "buyer_accepts_marketing": false,
                    "cancel_reason": null,
                    "cancelled_at": null,
                    "cart_token": null,
                    "checkout_id": null,
                    "checkout_token": null,
                    "closed_at": null,
                    "confirmed": true,
                    "contact_email": "weng_cindy@hotmail.com",
                    "created_at": "2023-06-30T11:29:47+08:00",
                    "currency": "TWD",
                    "current_subtotal_price": "23886.00",
                    "current_subtotal_price_set": {
                        "shop_money": {
                            "amount": "23886.00",
                            "currency_code": "TWD"
                        },
                        "presentment_money": {
                            "amount": "23886.00",
                            "currency_code": "TWD"
                        }
                    },
                    "current_total_discounts": "0.00",
                    "current_total_discounts_set": {
                        "shop_money": {
                            "amount": "0.00",
                            "currency_code": "TWD"
                        },
                        "presentment_money": {
                            "amount": "0.00",
                            "currency_code": "TWD"
                        }
                    },
                    "current_total_duties_set": null,
                    "current_total_price": "27086.00",
                    "current_total_price_set": {
                        "shop_money": {
                            "amount": "27086.00",
                            "currency_code": "TWD"
                        },
                        "presentment_money": {
                            "amount": "27086.00",
                            "currency_code": "TWD"
                        }
                    },
                    "current_total_tax": "0.00",
                    "current_total_tax_set": {
                        "shop_money": {
                            "amount": "0.00",
                            "currency_code": "TWD"
                        },
                        "presentment_money": {
                            "amount": "0.00",
                            "currency_code": "TWD"
                        }
                    },
                    "customer_locale": null,
                    "device_id": null,
                    "discount_codes": [],
                    "email": "weng_cindy@hotmail.com",
                    "estimated_taxes": false,
                    "financial_status": "paid",
                    "fulfillment_status": null,
                    "gateway": "",
                    "landing_site": null,
                    "landing_site_ref": null,
                    "location_id": null,
                    "merchant_of_record_app_id": null,
                    "name": "2306060119",
                    "note": "用戶備註: \n訂單來源裝置: web\n金流來源與編號: 藍新金流 / 2306060119\n",
                    "note_attributes": [],
                    "number": 3195,
                    "order_number": 4195,
                    "order_status_url": "https://homee.cc/70401589548/orders/18668ec40a2a7a50732bc85ca7092bb5/authenticate?key=8015f6cd3377172326814c9e5892bc98",
                    "original_total_duties_set": null,
                    "payment_gateway_names": [
                        ""
                    ],
                    "phone": null,
                    "presentment_currency": "TWD",
                    "processed_at": "2023-06-30T11:29:47+08:00",
                    "processing_method": "",
                    "reference": null,
                    "referring_site": null,
                    "source_identifier": null,
                    "source_name": "26680590337",
                    "source_url": null,
                    "subtotal_price": "23886.00",
                    "subtotal_price_set": {
                        "shop_money": {
                            "amount": "23886.00",
                            "currency_code": "TWD"
                        },
                        "presentment_money": {
                            "amount": "23886.00",
                            "currency_code": "TWD"
                        }
                    },
                    "tags": "",
                    "tax_lines": [],
                    "taxes_included": false,
                    "test": false,
                    "token": "18668ec40a2a7a50732bc85ca7092bb5",
                    "total_discounts": "0.00",
                    "total_discounts_set": {
                        "shop_money": {
                            "amount": "0.00",
                            "currency_code": "TWD"
                        },
                        "presentment_money": {
                            "amount": "0.00",
                            "currency_code": "TWD"
                        }
                    },
                    "total_line_items_price": "23886.00",
                    "total_line_items_price_set": {
                        "shop_money": {
                            "amount": "23886.00",
                            "currency_code": "TWD"
                        },
                        "presentment_money": {
                            "amount": "23886.00",
                            "currency_code": "TWD"
                        }
                    },
                    "total_outstanding": "0.00",
                    "total_price": "27086.00",
                    "total_price_set": {
                        "shop_money": {
                            "amount": "27086.00",
                            "currency_code": "TWD"
                        },
                        "presentment_money": {
                            "amount": "27086.00",
                            "currency_code": "TWD"
                        }
                    },
                    "total_shipping_price_set": {
                        "shop_money": {
                            "amount": "3200.00",
                            "currency_code": "TWD"
                        },
                        "presentment_money": {
                            "amount": "3200.00",
                            "currency_code": "TWD"
                        }
                    },
                    "total_tax": "0.00",
                    "total_tax_set": {
                        "shop_money": {
                            "amount": "0.00",
                            "currency_code": "TWD"
                        },
                        "presentment_money": {
                            "amount": "0.00",
                            "currency_code": "TWD"
                        }
                    },
                    "total_tip_received": "0.00",
                    "total_weight": 0,
                    "updated_at": "2023-06-30T11:29:49+08:00",
                    "user_id": null,
                    "billing_address": {
                        "first_name": "張",
                        "address1": "長庚醫護新村36號13樓",
                        "phone": "0963672126",
                        "city": "龜山區",
                        "zip": "333",
                        "province": null,
                        "country": "Taiwan",
                        "last_name": "張銘真",
                        "address2": "長庚醫護新村36號13樓",
                        "company": null,
                        "latitude": null,
                        "longitude": null,
                        "name": "張 張銘真",
                        "country_code": "TW",
                        "province_code": null
                    },
                    "customer": {
                        "id": 7034348732716,
                        "email": "weng_cindy@hotmail.com",
                        "accepts_marketing": false,
                        "created_at": "2023-06-30T01:18:31+08:00",
                        "updated_at": "2023-06-30T11:52:59+08:00",
                        "first_name": "張",
                        "last_name": "張銘真",
                        "state": "enabled",
                        "note": null,
                        "verified_email": true,
                        "multipass_identifier": null,
                        "tax_exempt": false,
                        "phone": null,
                        "email_marketing_consent": {
                            "state": "not_subscribed",
                            "opt_in_level": "confirmed_opt_in",
                            "consent_updated_at": null
                        },
                        "sms_marketing_consent": null,
                        "tags": "Inbox online store chat",
                        "currency": "TWD",
                        "accepts_marketing_updated_at": "2023-06-30T01:18:31+08:00",
                        "marketing_opt_in_level": null,
                        "tax_exemptions": [],
                        "admin_graphql_api_id": "gid://shopify/Customer/7034348732716",
                        "default_address": {
                            "id": 9268328300844,
                            "customer_id": 7034348732716,
                            "first_name": "銘真",
                            "last_name": "張",
                            "company": "",
                            "address1": "長庚醫護新村36號13樓",
                            "address2": "",
                            "city": "龜山區",
                            "province": null,
                            "country": "Taiwan",
                            "zip": "333",
                            "phone": "0963672126",
                            "name": "銘真 張",
                            "province_code": null,
                            "country_code": "TW",
                            "country_name": "Taiwan",
                            "default": true
                        }
                    },
                    "discount_applications": [],
                    "fulfillments": [],
                    "line_items": [
                        {
                            "id": 13963016044844,
                            "admin_graphql_api_id": "gid://shopify/LineItem/13963016044844",
                            "fulfillable_quantity": 4,
                            "fulfillment_service": "manual",
                            "fulfillment_status": null,
                            "gift_card": false,
                            "grams": 5000,
                            "name": "THOSTE 餐椅",
                            "price": "999.00",
                            "price_set": {
                                "shop_money": {
                                    "amount": "999.00",
                                    "currency_code": "TWD"
                                },
                                "presentment_money": {
                                    "amount": "999.00",
                                    "currency_code": "TWD"
                                }
                            },
                            "product_exists": true,
                            "product_id": 8141569032492,
                            "properties": [],
                            "quantity": 4,
                            "requires_shipping": true,
                            "sku": "F010166",
                            "taxable": false,
                            "title": "THOSTE 餐椅",
                            "total_discount": "0.00",
                            "total_discount_set": {
                                "shop_money": {
                                    "amount": "0.00",
                                    "currency_code": "TWD"
                                },
                                "presentment_money": {
                                    "amount": "0.00",
                                    "currency_code": "TWD"
                                }
                            },
                            "variant_id": 44493123223852,
                            "variant_inventory_management": "shopify",
                            "variant_title": null,
                            "vendor": "高粱",
                            "tax_lines": [],
                            "duties": [],
                            "discount_allocations": []
                        },
                        {
                            "id": 13963016077612,
                            "admin_graphql_api_id": "gid://shopify/LineItem/13963016077612",
                            "fulfillable_quantity": 1,
                            "fulfillment_service": "manual",
                            "fulfillment_status": null,
                            "gift_card": false,
                            "grams": 20000,
                            "name": "PISA 岩板餐桌 - D型腳座 / 180*90 公分 / 直邊圓角",
                            "price": "19890.00",
                            "price_set": {
                                "shop_money": {
                                    "amount": "19890.00",
                                    "currency_code": "TWD"
                                },
                                "presentment_money": {
                                    "amount": "19890.00",
                                    "currency_code": "TWD"
                                }
                            },
                            "product_exists": true,
                            "product_id": 8141463781676,
                            "properties": [],
                            "quantity": 1,
                            "requires_shipping": true,
                            "sku": "A010005-5-1-2",
                            "taxable": false,
                            "title": "PISA 岩板餐桌",
                            "total_discount": "0.00",
                            "total_discount_set": {
                                "shop_money": {
                                    "amount": "0.00",
                                    "currency_code": "TWD"
                                },
                                "presentment_money": {
                                    "amount": "0.00",
                                    "currency_code": "TWD"
                                }
                            },
                            "variant_id": 44492738986284,
                            "variant_inventory_management": "shopify",
                            "variant_title": "D型腳座 / 180*90 公分 / 直邊圓角",
                            "vendor": "黑澤",
                            "tax_lines": [],
                            "duties": [],
                            "discount_allocations": []
                        }
                    ],
                    "payment_terms": null,
                    "refunds": [],
                    "shipping_address": {
                        "first_name": "張",
                        "address1": "長庚醫護新村36號13樓",
                        "phone": "0963672126",
                        "city": "龜山區",
                        "zip": "333",
                        "province": null,
                        "country": "Taiwan",
                        "last_name": "張銘真",
                        "address2": "長庚醫護新村36號13樓",
                        "company": null,
                        "latitude": 25.0577498,
                        "longitude": 121.3825146,
                        "name": "張 張銘真",
                        "country_code": "TW",
                        "province_code": null
                    },
                    "shipping_lines": [
                        {
                            "id": 4382777704748,
                            "carrier_identifier": null,
                            "code": "運費",
                            "delivery_category": null,
                            "discounted_price": "3200.00",
                            "discounted_price_set": {
                                "shop_money": {
                                    "amount": "3200.00",
                                    "currency_code": "TWD"
                                },
                                "presentment_money": {
                                    "amount": "3200.00",
                                    "currency_code": "TWD"
                                }
                            },
                            "phone": null,
                            "price": "3200.00",
                            "price_set": {
                                "shop_money": {
                                    "amount": "3200.00",
                                    "currency_code": "TWD"
                                },
                                "presentment_money": {
                                    "amount": "3200.00",
                                    "currency_code": "TWD"
                                }
                            },
                            "requested_fulfillment_service_id": null,
                            "source": null,
                            "title": "運費",
                            "tax_lines": [],
                            "discount_allocations": []
                        }
                    ]
                }
            };
            return {
                view: () => {
                    return `<div class="Polaris-Frame__Content_xd1mk">
    <div class="Polaris-Page_yisnh">
        <div class="Polaris-Box_375yx"
             style="--pc-box-padding-block-end-xs: var(--p-space-4); --pc-box-padding-block-end-md: var(--p-space-5); --pc-box-padding-block-start-xs: var(--p-space-4); --pc-box-padding-block-start-md: var(--p-space-5); --pc-box-padding-inline-start-xs: var(--p-space-4); --pc-box-padding-inline-start-sm: var(--p-space-0); --pc-box-padding-inline-end-xs: var(--p-space-4); --pc-box-padding-inline-end-sm: var(--p-space-0); position: relative;">
            <div class="Polaris-Page-Header--mediumTitle_bfol6">
                <div class="Polaris-Page-Header__Row_375v7">
                    <div class="Polaris-Page-Header__BreadcrumbWrapper_1tgwk">
                        <div class="Polaris-Box_375yx Polaris-Box--printHidden_15ag0"
                             style="--pc-box-max-width: 100%; --pc-box-padding-inline-end-xs: var(--p-space-4);">
                            <nav role="navigation"><a data-polaris-unstyled="true"
                                                      class="Polaris-Breadcrumbs__Breadcrumb_llsun"
                                                      href="/store/homee-5134/orders?inContextTimeframe=last_7_days"><span
                                    class="Polaris-Breadcrumbs__Icon_yj27d"><span class="Polaris-Icon_yj27d"><span
                                    class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                    viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false"
                                    aria-hidden="true"><path
                                    d="M17 9h-11.586l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414l-3.293-3.293h11.586a1 1 0 1 0 0-2z"></path></svg></span></span><span
                                    class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6">訂單</span></a>
                            </nav>
                        </div>
                    </div>
                    <div class="Polaris-Page-Header__TitleWrapper_bejfn">
                        <div class="Polaris-Header-Title__TitleWithMetadataWrapper_pdqv7"><h1
                                class="Polaris-Header-Title_2qj8j">${data.order.name}</h1>
                            <div class="Polaris-Header-Title__TitleMetadata_19y17">
                                <div><span class="VgwnQ"><span class="Polaris-Badge_2qgie"><span
                                        class="Polaris-Badge__PipContainer_dsjox"><span
                                        class="Polaris-Badge-Pip_375sr Polaris-Badge-Pip--progressComplete_189p5"><span
                                        class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6">完成</span></span></span><span
                                        class="Polaris-Text--root_yj4ah Polaris-Text--bodySm_nvqxj">已付款</span></span><span
                                        class="Polaris-Badge_2qgie Polaris-Badge--statusAttention_i61kn"><span
                                        class="Polaris-Badge__PipContainer_dsjox"><span
                                        class="Polaris-Badge-Pip_375sr Polaris-Badge-Pip--statusAttention_i61kn Polaris-Badge-Pip--progressIncomplete_1jg92"><span
                                        class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6">注意 未完成</span></span></span><span
                                        class="Polaris-Text--root_yj4ah Polaris-Text--bodySm_nvqxj">未出貨</span></span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Polaris-Page-Header__RightAlign_1ok1p">
                        <div class="Polaris-Page-Header__Actions_17m67">
                            <div class="Polaris-ActionMenu_1hlnt">
                                <div class="Polaris-ActionMenu-Actions__ActionsLayout_w56ri">
                                    <div class="Polaris-ButtonGroup_yy85z Polaris-ButtonGroup--extraTight_1xh3x">
                                        <div class="Polaris-ButtonGroup__Item_yiyol"><span
                                                class="Polaris-ActionMenu-SecondaryAction_1dl4i"><button
                                                id="refund-restock" class="Polaris-Button_r99lw" type="button"><span
                                                class="Polaris-Button__Content_xd1mk"><span
                                                class="Polaris-Button__Text_yj3uv">退款</span></span></button></span>
                                        </div>
                                        <div class="Polaris-ButtonGroup__Item_yiyol"><span
                                                class="Polaris-ActionMenu-SecondaryAction_1dl4i"><button id="edit"
                                                                                                         class="Polaris-Button_r99lw"
                                                                                                         type="button"><span
                                                class="Polaris-Button__Content_xd1mk"><span
                                                class="Polaris-Button__Text_yj3uv">編輯</span></span></button></span>
                                        </div>
                                        <div class="Polaris-ButtonGroup__Item_yiyol">
                                            <div><span class="Polaris-ActionMenu-SecondaryAction_1dl4i"><button
                                                    class="Polaris-Button_r99lw" type="button" tabindex="0"
                                                    aria-controls=":rrn:" aria-owns=":rrn:" aria-expanded="false"><span
                                                    class="Polaris-Button__Content_xd1mk"><span
                                                    class="Polaris-Button__Text_yj3uv">更多動作</span><span
                                                    class="Polaris-Button__Icon_yj27d"><div class=""><span
                                                    class="Polaris-Icon_yj27d"><span
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                    viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                    focusable="false" aria-hidden="true"><path
                                                    d="M13.098 8h-6.196c-.751 0-1.172.754-.708 1.268l3.098 3.432c.36.399 1.055.399 1.416 0l3.098-3.433c.464-.513.043-1.267-.708-1.267Z"></path></svg></span></div></span></span></button></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="Polaris-Page-Header__PaginationWrapper_x52mr">
                                <div class="Polaris-Box_375yx Polaris-Box--printHidden_15ag0">
                                    <nav aria-label="分頁" class="Polaris-Pagination_1af4k">
                                        <div class="Polaris-ButtonGroup_yy85z Polaris-ButtonGroup--segmented_150jh"
                                             data-buttongroup-segmented="true">
                                            <div class="Polaris-ButtonGroup__Item_yiyol">
                                                <button id="previousURL"
                                                        class="Polaris-Button_r99lw Polaris-Button--outline_1urzi Polaris-Button--disabled_hcuh9 Polaris-Button--iconOnly_viazp"
                                                        aria-label="上一頁" aria-disabled="true" type="button"
                                                        tabindex="-1"><span class="Polaris-Button__Content_xd1mk"><span
                                                        class="Polaris-Button__Icon_yj27d"><span
                                                        class="Polaris-Icon_yj27d"><span
                                                        class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                        viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                        focusable="false" aria-hidden="true"><path
                                                        d="M12 16a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414l-4.293 4.293 4.293 4.293a.999.999 0 0 1-.707 1.707z"></path></svg></span></span></span>
                                                </button>
                                            </div>
                                            <div class="Polaris-ButtonGroup__Item_yiyol"><span class=""><button
                                                    id="nextURL"
                                                    class="Polaris-Button_r99lw Polaris-Button--outline_1urzi Polaris-Button--iconOnly_viazp"
                                                    aria-label="下一頁" type="button" tabindex="0"
                                                    aria-describedby=":rro:" data-polaris-tooltip-activator="true"><span
                                                    class="Polaris-Button__Content_xd1mk"><span
                                                    class="Polaris-Button__Icon_yj27d"><span class="Polaris-Icon_yj27d"><span
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                    viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                    focusable="false" aria-hidden="true"><path
                                                    d="M8 16a.999.999 0 0 1-.707-1.707l4.293-4.293-4.293-4.293a.999.999 0 1 1 1.414-1.414l5 5a.999.999 0 0 1 0 1.414l-5 5a.997.997 0 0 1-.707.293z"></path></svg></span></span></span></button></span>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Polaris-Page-Header__Row_375v7">
                    <div class="Polaris-HorizontalStack_dv6q6"
                         style="--pc-horizontal-stack-wrap: wrap; --pc-horizontal-stack-gap-xs: var(--p-space-4);">
                        <div class="Polaris-Page-Header__AdditionalMetaData_1isxr"><span
                                class="Polaris-Text--root_yj4ah Polaris-Text--subdued_17vaa">${(() => {
                        const dateString = data.order.created_at;
                        const date = new Date(dateString);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        let period = "";
                        let formattedHours = hours;
                        if (hours >= 12) {
                            period = "下午";
                            formattedHours = hours === 12 ? 12 : hours - 12;
                        }
                        else {
                            period = "上午";
                            formattedHours = hours === 0 ? 12 : hours;
                        }
                        return `${year}年${month}月${day}日 <span class="RzCp0">${period}${formattedHours}:${minutes}</span>`;
                    })()}  <span>來自 <span>HOMEE-BACKEND</span> 的 <img alt=""
                                                                                                             src="https://cdn.shopify.com/shopifycloud/shopify/assets/default-app-74bfb89634baf86f3402062ef55df218fe55b4f2775ff605d0ccfe1a20f9c0d3.png"
                                                                                                             width="15"
                                                                                                             height="15"
                                                                                                             style="vertical-align: text-top; display: inline-block; margin-left: 2px;"></span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <div>
                <div class="xE2M8">
                    <div class="xR6IK"></div>
                </div>
                <section class="_uz_9">
                    <div class="Dhlu8">
                        <div class="Polaris-LegacyCard_l5l93">
                            <div class="Polaris-LegacyCard__Header_z4uwg">
                                <div class="OFA7i"><span class="b6uf8"><span
                                        class="Polaris-Icon_yj27d Polaris-Icon--colorWarning_14tqz Polaris-Icon--applyColor_2y25n Polaris-Icon--hasBackdrop_1anyy"><span
                                        class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" role="img"
                                        class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><circle
                                        cx="8.5" cy="8.59" r="7.2" fill="currentColor"></circle><path
                                        d="M10.09 16.41a.8.8 0 0 1-.18-1.58 6.46 6.46 0 0 0 2-.81L12 14a.79.79 0 0 1 1.07.35.8.8 0 0 1-.3 1.05 7.89 7.89 0 0 1-2.46 1 .55.55 0 0 1-.22.01zm-3.2 0h-.18a7.89 7.89 0 0 1-2.47-1A.8.8 0 0 1 5.09 14a6.49 6.49 0 0 0 2 .82.8.8 0 0 1 .6 1 .81.81 0 0 1-.78.62zm7.7-3.18a.8.8 0 0 1-.8-.8.79.79 0 0 1 .12-.42 6.27 6.27 0 0 0 .83-2 .8.8 0 0 1 1.56.36 7.89 7.89 0 0 1-1 2.47.77.77 0 0 1-.71.39zm-12.19 0a.78.78 0 0 1-.67-.37 8.14 8.14 0 0 1-1-2.46.8.8 0 0 1 1.53-.4 6.19 6.19 0 0 0 .82 2 .8.8 0 0 1-.68 1.23zm13.12-5.4a.81.81 0 0 1-.78-.63 6.46 6.46 0 0 0-.81-2 .81.81 0 0 1 .24-1.11.79.79 0 0 1 1.1.24 8 8 0 0 1 1 2.47.8.8 0 0 1-.6 1h-.18zm-14 0a.58.58 0 0 1-.19 0 .79.79 0 0 1-.6-1 8.22 8.22 0 0 1 1-2.47.82.82 0 0 1 1.11-.26.8.8 0 0 1 .25 1.11 6.49 6.49 0 0 0-.82 2 .78.78 0 0 1-.77.62zM12.33 3.3a.83.83 0 0 1-.43-.13 6.49 6.49 0 0 0-2-.82.79.79 0 0 1-.63-.93.8.8 0 0 1 .94-.64 8.15 8.15 0 0 1 2.48 1A.8.8 0 0 1 13 2.92a.78.78 0 0 1-.68.37zm-7.65 0A.82.82 0 0 1 4 2.93a.8.8 0 0 1 .22-1.1l.1-.06a7.93 7.93 0 0 1 2.39-1 .8.8 0 0 1 1 .61.79.79 0 0 1-.6 1 6.43 6.43 0 0 0-2 .82.82.82 0 0 1-.43.12z"></path></svg></span></span>
                                    <div class="Lh2Y9"><h2
                                            class="Polaris-Text--root_yj4ah Polaris-Text--headingMd_lwjt4">未出貨
                                        (5)</h2></div>
                                    <div class="eekTH">
                                        <div>
                                            <div>
                                                <button class="Polaris-Button_r99lw Polaris-Button--plain_2z97r Polaris-Button--iconOnly_viazp"
                                                        aria-label="存取更多出貨動作" type="button" tabindex="0"
                                                        aria-controls=":rt4:" aria-owns=":rt4:" aria-expanded="false">
                                                    <span class="Polaris-Button__Content_xd1mk"><span
                                                            class="Polaris-Button__Icon_yj27d"><span
                                                            class="Polaris-Icon_yj27d"><span
                                                            class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                            viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                            focusable="false" aria-hidden="true"><path
                                                            d="M6 10a2 2 0 1 1-4.001-.001 2 2 0 0 1 4.001.001zm6 0a2 2 0 1 1-4.001-.001 2 2 0 0 1 4.001.001zm6 0a2 2 0 1 1-4.001-.001 2 2 0 0 1 4.001.001z"></path></svg></span></span></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="dlZDq">
                                <div class="Polaris-Box_375yx"
                                     style="--pc-box-padding-block-start-xs: var(--p-space-3);">
                                    <div class="Polaris-HorizontalGrid_titug"
                                         style="--pc-horizontal-grid-gap-xs: var(--p-space-3);">
                                        <div class="Polaris-HorizontalGrid_titug"
                                             style="--pc-horizontal-grid-grid-template-columns-xs: 20px 1fr; --pc-horizontal-grid-gap-xs: var(--p-space-4);">
                                            <div class="Polaris-Box_375yx"
                                                 style="--pc-box-padding-block-start-xs: var(--p-space-2);"><span
                                                    class="Polaris-Icon_yj27d Polaris-Icon--colorSubdued_113xs Polaris-Icon--applyColor_2y25n"><span
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                    viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                    focusable="false" aria-hidden="true"><path fill-rule="evenodd"
                                                                                               d="M18 8c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 .15 0 .29.01.44.13 3.55 1.99 7.62 7.13 11.29.51.36 1.21.36 1.72 0 5.14-3.67 7-7.74 7.13-11.29.01-.15.01-.29.01-.44zm-5.879 2.121a2.996 2.996 0 0 0 0-4.242 2.996 2.996 0 0 0-4.242 0 2.996 2.996 0 0 0 0 4.242 2.996 2.996 0 0 0 4.242 0z"></path></svg></span>
                                            </div>
                                            <div class="Polaris-HorizontalGrid_titug"
                                                 style="--pc-horizontal-grid-gap-xs: var(--p-space-3);">
                                                <dl class="mi2Pt">
                                                    <dt><span
                                                            class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--subdued_17vaa">地點</span>
                                                    </dt>
                                                    <dd class="xag_F">
                                                        <div class="Polaris-HorizontalStack_dv6q6"
                                                             style="--pc-horizontal-stack-block-align: center; --pc-horizontal-stack-wrap: wrap; --pc-horizontal-stack-gap-xs: var(--p-space-2);">
                                                            <p class="Polaris-Text--root_yj4ah">桃園南山倉</p></div>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="Polaris-LegacyCard__Section_1b1h1">
                                <div class="Polaris-LegacyCard__Subsection_197ob">
                                    <ul class="TwAEH">
                                        <li class="ghDsA">
                                            <div class="oEqWq ePn2X">
                                                <div class="OJd70">
                                                    <div class="UeY2y">
                                                        <div class="_fy2X"><span class="Polaris-Badge_2qgie"><span
                                                                class="Polaris-Text--root_yj4ah Polaris-Text--bodySm_nvqxj">4</span></span>
                                                        </div>
                                                        <span class="Polaris-Thumbnail_15hj1 Polaris-Thumbnail--sizeSmall_7647q"><img
                                                                alt=""
                                                                src="https://cdn.shopify.com/s/files/1/0704/0158/9548/products/1_178bcef4-d3b0-4d84-96db-f44538f36ef2_160x160.jpg?v=1675778735"></span>
                                                    </div>
                                                </div>
                                                <div class="bStku">
                                                    <div class="jmzAY">
                                                        <div class="MFNuH">
                                                            <div class="TZl__"><a data-polaris-unstyled="true"
                                                                                  class="Polaris-Link_yj5sy Polaris-Link--removeUnderline_adav6"
                                                                                  href="/store/homee-5134/products/8141569032492/variants/44493123223852">THOSTE
                                                                餐椅</a></div>
                                                            <div><span
                                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--subdued_17vaa">存貨單位 (SKU)：F010166</span>
                                                            </div>
                                                        </div>
                                                        <div class="RlJC9">$999.00 × 4</div>
                                                        <div class="GKGoJ">$3,996.00</div>
                                                    </div>
                                                    <div class="PGzRG">
                                                        <div class="Polaris-TextContainer_szg8b Polaris-TextContainer--spacingTight_1o4d6">
                                                            <ul class="Polaris-List_yj3nl"></ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="ghDsA">
                                            <div class="oEqWq ePn2X">
                                                <div class="OJd70">
                                                    <div class="UeY2y">
                                                        <div class="_fy2X"><span class="Polaris-Badge_2qgie"><span
                                                                class="Polaris-Text--root_yj4ah Polaris-Text--bodySm_nvqxj">1</span></span>
                                                        </div>
                                                        <span class="Polaris-Thumbnail_15hj1 Polaris-Thumbnail--sizeSmall_7647q"><img
                                                                alt=""
                                                                src="https://cdn.shopify.com/s/files/1/0704/0158/9548/products/25432895_160x160.jpg?v=1675774237"></span>
                                                    </div>
                                                </div>
                                                <div class="bStku">
                                                    <div class="jmzAY">
                                                        <div class="MFNuH">
                                                            <div class="TZl__"><a data-polaris-unstyled="true"
                                                                                  class="Polaris-Link_yj5sy Polaris-Link--removeUnderline_adav6"
                                                                                  href="/store/homee-5134/products/8141463781676/variants/44492738986284">PISA
                                                                岩板餐桌</a></div>
                                                            <div><span
                                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--subdued_17vaa">D型腳座 / 180*90 公分 / 直邊圓角</span>
                                                            </div>
                                                            <div><span
                                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--subdued_17vaa">存貨單位 (SKU)：A010005-5-1-2</span>
                                                            </div>
                                                        </div>
                                                        <div class="RlJC9">$19,890.00 × 1</div>
                                                        <div class="GKGoJ">$19,890.00</div>
                                                    </div>
                                                    <div class="PGzRG">
                                                        <div class="Polaris-TextContainer_szg8b Polaris-TextContainer--spacingTight_1o4d6">
                                                            <ul class="Polaris-List_yj3nl"></ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="c8ldS">
                                <div class="Polaris-LegacyCard__Section_1b1h1">
                                    <div class="Polaris-HorizontalStack_dv6q6"
                                         style="--pc-horizontal-stack-align: end; --pc-horizontal-stack-wrap: wrap; --pc-horizontal-stack-gap-xs: var(--p-space-2);">
                                        <a data-polaris-unstyled="true"
                                           class="Polaris-Button_r99lw Polaris-Button--primary_7k9zs"
                                           href="/store/homee-5134/orders/5410803679532/fulfillment_orders/6310232195372/fulfill?locationId=76115575084"><span
                                                class="Polaris-Button__Content_xd1mk"><span
                                                class="Polaris-Button__Text_yj3uv">出貨商品</span></span></a></div>
                                </div>
                            </div>
                        </div>
                        <div class="Polaris-LegacyCard_l5l93">
                            <div class="Polaris-LegacyCard__Header_z4uwg">
                                <div class="Polaris-LegacyStack_eaeo0 Polaris-LegacyStack--spacingTight_1o4d6 Polaris-LegacyStack--alignmentCenter_1rtaw">
                                    <div class="Polaris-LegacyStack__Item_yiyol"><span class="ksFWH"><span
                                            class="Polaris-Icon_yj27d Polaris-Icon--colorSuccess_k0sue Polaris-Icon--applyColor_2y25n Polaris-Icon--hasBackdrop_1anyy"><span
                                            class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" role="img"
                                            class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><circle
                                            cx="8.5" cy="8.59" r="7.52" fill="currentColor"></circle><path
                                            d="M8.5 17a8.36 8.36 0 1 1 8.35-8.36A8.35 8.35 0 0 1 8.5 17zm0-15a6.69 6.69 0 1 0 6.68 6.68A6.68 6.68 0 0 0 8.5 1.91z"></path><path
                                            class="cls-2"
                                            d="M7.66 11.09a.82.82 0 0 1-.59-.24L5.4 9.18A.84.84 0 0 1 5.45 8a.82.82 0 0 1 1.13 0l1.08 1.08 2.75-2.75a.83.83 0 0 1 1.18 1.18l-3.34 3.34a.82.82 0 0 1-.59.24z"></path></svg></span></span>
                                    </div>
                                    <div class="Polaris-LegacyStack__Item_yiyol">
                                        <div class="Polaris-HorizontalStack_dv6q6"
                                             style="--pc-horizontal-stack-block-align: baseline; --pc-horizontal-stack-wrap: wrap; --pc-horizontal-stack-gap-xs: var(--p-space-2);">
                                            <h2 class="Polaris-Text--root_yj4ah Polaris-Text--headingMd_lwjt4">
                                                已付款</h2></div>
                                    </div>
                                </div>
                            </div>
                            <div class="Polaris-LegacyCard__Section_1b1h1">
                                <div class="xR6IK"></div>
                                <div class="Polaris-LegacyCard__Subsection_197ob">
                                    <div class="uwCBg">
                                        <div class="Polaris-HorizontalGrid_titug"
                                             style="--pc-horizontal-grid-grid-template-columns-xs: repeat(1, minmax(0, 1fr)); --pc-horizontal-grid-grid-template-columns-sm: 140px auto; --pc-horizontal-grid-gap-xs: var(--p-space-2);">
                                            <span><span
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s">小計</span></span>
                                            <div class="Polaris-VerticalStack_1fqes"
                                                 style="--pc-vertical-stack-order: column; --pc-vertical-stack-gap-xs: var(--p-space-4);">
                                                <div class="Polaris-VerticalStack_1fqes"
                                                     style="--pc-vertical-stack-order: column; --pc-vertical-stack-gap-xs: var(--p-space-1);">
                                                    <div class="Polaris-HorizontalGrid_titug"
                                                         style="--pc-horizontal-grid-grid-template-columns-xs: 1fr auto; --pc-horizontal-grid-gap-xs: var(--p-space-2); --pc-horizontal-grid-align-items: start;">
                                                        <div class="Polaris-HorizontalStack_dv6q6"
                                                             style="--pc-horizontal-stack-block-align: center; --pc-horizontal-stack-wrap: nowrap; --pc-horizontal-stack-gap-xs: var(--p-space-3);">
                                                            <span class="u1kTB"><span
                                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--subdued_17vaa"><div
                                                                    class="Polaris-Box_375yx">5 件商品</div></span></span>
                                                        </div>
                                                        <span class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--break_32vap">$23,886.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="Polaris-HorizontalGrid_titug"
                                             style="--pc-horizontal-grid-grid-template-columns-xs: repeat(1, minmax(0, 1fr)); --pc-horizontal-grid-grid-template-columns-sm: 140px auto; --pc-horizontal-grid-gap-xs: var(--p-space-2);">
                                            <span><span
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s">運送</span></span>
                                            <div class="Polaris-VerticalStack_1fqes"
                                                 style="--pc-vertical-stack-order: column; --pc-vertical-stack-gap-xs: var(--p-space-4);">
                                                <div class="Polaris-VerticalStack_1fqes"
                                                     style="--pc-vertical-stack-order: column; --pc-vertical-stack-gap-xs: var(--p-space-1);">
                                                    <div class="Polaris-HorizontalGrid_titug"
                                                         style="--pc-horizontal-grid-grid-template-columns-xs: 1fr auto; --pc-horizontal-grid-gap-xs: var(--p-space-2); --pc-horizontal-grid-align-items: start;">
                                                        <div class="Polaris-HorizontalStack_dv6q6"
                                                             style="--pc-horizontal-stack-block-align: center; --pc-horizontal-stack-wrap: nowrap; --pc-horizontal-stack-gap-xs: var(--p-space-3);">
                                                            <span class="u1kTB"><span
                                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--subdued_17vaa"><div
                                                                    class="Polaris-Box_375yx">運費 (41.0 kg)</div></span></span>
                                                        </div>
                                                        <span class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--break_32vap">$3,200.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="Polaris-HorizontalGrid_titug"
                                             style="--pc-horizontal-grid-grid-template-columns-xs: 140px auto; --pc-horizontal-grid-gap-xs: var(--p-space-2);">
                                            <span><span
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--semibold_k1k0m">總計</span></span>
                                            <div class="Polaris-VerticalStack_1fqes"
                                                 style="--pc-vertical-stack-order: column; --pc-vertical-stack-gap-xs: var(--p-space-4);">
                                                <div class="Polaris-VerticalStack_1fqes"
                                                     style="--pc-vertical-stack-order: column; --pc-vertical-stack-gap-xs: var(--p-space-1);">
                                                    <div class="Polaris-HorizontalGrid_titug"
                                                         style="--pc-horizontal-grid-grid-template-columns-xs: 1fr auto; --pc-horizontal-grid-gap-xs: var(--p-space-2); --pc-horizontal-grid-align-items: start;">
                                                        <div class="Polaris-HorizontalStack_dv6q6"
                                                             style="--pc-horizontal-stack-block-align: center; --pc-horizontal-stack-wrap: nowrap; --pc-horizontal-stack-gap-xs: var(--p-space-3);">
                                                            <span class="u1kTB"><span
                                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--semibold_k1k0m Polaris-Text--subdued_17vaa"><div
                                                                    class="Polaris-Box_375yx"
                                                                    style="--pc-box-color: var(--p-color-text);"></div></span></span>
                                                        </div>
                                                        <span class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--semibold_k1k0m Polaris-Text--break_32vap">$27,086.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="Polaris-LegacyCard__Subsection_197ob">
                                    <div class="LoiYC uwCBg">
                                        <div class="Polaris-HorizontalGrid_titug"
                                             style="--pc-horizontal-grid-grid-template-columns-xs: 140px auto; --pc-horizontal-grid-gap-xs: var(--p-space-2);">
                                            <span><span
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s">顧客付款</span></span>
                                            <div class="Polaris-VerticalStack_1fqes"
                                                 style="--pc-vertical-stack-order: column; --pc-vertical-stack-gap-xs: var(--p-space-4);">
                                                <div class="Polaris-VerticalStack_1fqes"
                                                     style="--pc-vertical-stack-order: column; --pc-vertical-stack-gap-xs: var(--p-space-1);">
                                                    <div class="Polaris-HorizontalGrid_titug"
                                                         style="--pc-horizontal-grid-grid-template-columns-xs: 1fr auto; --pc-horizontal-grid-gap-xs: var(--p-space-2); --pc-horizontal-grid-align-items: start;">
                                                        <div class="Polaris-HorizontalStack_dv6q6"
                                                             style="--pc-horizontal-stack-block-align: center; --pc-horizontal-stack-wrap: nowrap; --pc-horizontal-stack-gap-xs: var(--p-space-3);">
                                                            <span class="u1kTB"><span
                                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--subdued_17vaa"><div
                                                                    class="Polaris-Box_375yx"
                                                                    style="--pc-box-color: var(--p-color-text);"></div></span></span>
                                                        </div>
                                                        <span class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--break_32vap">$27,086.00</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bUgNF"></div>
                    <div class="RM5ux"></div>
                    <div class="EA9uK">
                        <div class="ZRWG1"><h2 class="Polaris-Text--root_yj4ah Polaris-Text--headingMd_lwjt4">
                            交易時間軸</h2>
                            <div class="TERo4"><label class="Polaris-Choice_j5gzq" for=":rrp:"><span
                                    class="Polaris-Choice__Control_1u8vs"><span class="Polaris-Checkbox_1d6zr"><input
                                    id=":rrp:" type="checkbox" class="Polaris-Checkbox__Input_30ock"
                                    aria-invalid="false" role="checkbox" aria-checked="true" value="" checked=""><span
                                    class="Polaris-Checkbox__Backdrop_1x2i2"></span><span
                                    class="Polaris-Checkbox__Icon_yj27d"><span class="Polaris-Icon_yj27d"><span
                                    class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                    viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false"
                                    aria-hidden="true"><path
                                    d="M14.723 6.237a.94.94 0 0 1 .053 1.277l-5.366 6.193a.834.834 0 0 1-.611.293.83.83 0 0 1-.622-.264l-2.927-3.097a.94.94 0 0 1 0-1.278.82.82 0 0 1 1.207 0l2.297 2.43 4.763-5.498a.821.821 0 0 1 1.206-.056Z"></path></svg></span></span></span></span><span
                                    class="Polaris-Choice__Label_2vd36"><span>顯示留言</span></span></label></div>
                        </div>
                        <div data-timeline="true" class="fdCVK KmUdG">
                            <div class="RBsPB KmUdG">
                                <div class="cSfMH"><span aria-label="姓名首字母為 H 的大頭貼" role="img"
                                                         class="Polaris-Avatar_z763p Polaris-Avatar--sizeMedium_5f35p Polaris-Avatar--imageHasLoaded_1bsq5 Polaris-Avatar--shapeRound_2651c"><img
                                        alt=""
                                        src="https://cdn.shopify.com/s/files/1/0704/0158/9548/users/avatar_250x250_crop_center_d88fa003-a45f-4ace-94d9-8069dc4e020a_50x50@3x.png?v=1686891285"
                                        class="Polaris-Avatar__Image_2qgms" role="presentation"></span></div>
                                <div class="kvfO0">
                                    <div>
                                        <div>
                                            <div class="c16RI"><label for="TimelineEditor1" class="bI3VW"
                                                                      id="TimelineEditorLabel1">留言</label>
                                                <div class="VvK3f">
                                                    <trix-toolbar id="trix-toolbar-1" style="display: none;">
                                                        <div class="trix-button-row">
  <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
    <button type="button" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold"
            data-trix-key="b" title="Bold" tabindex="-1">Bold</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic"
            data-trix-key="i" title="Italic" tabindex="-1">Italic</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike"
            title="Strikethrough" tabindex="-1">Strikethrough</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href"
            data-trix-action="link" data-trix-key="k" title="Link" tabindex="-1">Link</button>
  </span>

                                                            <span class="trix-button-group trix-button-group--block-tools"
                                                                  data-trix-button-group="block-tools">
    <button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1"
            data-trix-attribute="heading1" title="Heading" tabindex="-1">Heading</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote"
            title="Quote" tabindex="-1">Quote</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code"
            title="Code" tabindex="-1">Code</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list"
            data-trix-attribute="bullet" title="Bullets" tabindex="-1">Bullets</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list"
            data-trix-attribute="number" title="Numbers" tabindex="-1">Numbers</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level"
            data-trix-action="decreaseNestingLevel" title="Decrease Level" tabindex="-1">Decrease Level</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level"
            data-trix-action="increaseNestingLevel" title="Increase Level" tabindex="-1">Increase Level</button>
  </span>

                                                            <span class="trix-button-group trix-button-group--file-tools"
                                                                  data-trix-button-group="file-tools">
    <button type="button" class="trix-button trix-button--icon trix-button--icon-attach" data-trix-action="attachFiles"
            title="Attach Files" tabindex="-1">Attach Files</button>
  </span>

                                                            <span class="trix-button-group-spacer"></span>

                                                            <span class="trix-button-group trix-button-group--history-tools"
                                                                  data-trix-button-group="history-tools">
    <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo"
            data-trix-key="z" title="Undo" tabindex="-1">Undo</button>
    <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo"
            data-trix-key="shift+z" title="Redo" tabindex="-1">Redo</button>
  </span>
                                                        </div>

                                                        <div class="trix-dialogs" data-trix-dialogs="">
                                                            <div class="trix-dialog trix-dialog--link"
                                                                 data-trix-dialog="href"
                                                                 data-trix-dialog-attribute="href">
                                                                <div class="trix-dialog__link-fields">
                                                                    <input type="url" name="href"
                                                                           class="trix-input trix-input--dialog"
                                                                           placeholder="Enter a URL…" aria-label="URL"
                                                                           required="" data-trix-input=""
                                                                           disabled="disabled">
                                                                    <div class="trix-button-group">
                                                                        <input type="button"
                                                                               class="trix-button trix-button--dialog"
                                                                               value="Link"
                                                                               data-trix-method="setAttribute">
                                                                        <input type="button"
                                                                               class="trix-button trix-button--dialog"
                                                                               value="Unlink"
                                                                               data-trix-method="removeAttribute">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </trix-toolbar>
                                                    <trix-editor input="trix-input-TimelineEditor1" id="TimelineEditor1"
                                                                 class="F1GnC" placeholder="發表留言……"
                                                                 aria-describedby="TimelineEditor1HelpText"
                                                                 aria-labelledby="TimelineEditorLabel1"
                                                                 contenteditable="" role="textbox" trix-id="1"
                                                                 toolbar="trix-toolbar-1"></trix-editor>
                                                    <input id="trix-input-TimelineEditor1" type="hidden"></div>
                                            </div>
                                            <div>
                                                <div class="RsG_o">
                                                    <div class="i23U0">
                                                        <div><span class=""><button tabindex="0" class="WZyyO"
                                                                                    aria-label="新增表情符號"
                                                                                    type="button"
                                                                                    aria-describedby=":rrs:"
                                                                                    data-polaris-tooltip-activator="true"
                                                                                    aria-controls=":rrq:"
                                                                                    aria-owns=":rrq:"
                                                                                    aria-expanded="false"><span
                                                                class="Polaris-Icon_yj27d"><span
                                                                class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                                role="img" class="Polaris-Icon__Svg_375hu"
                                                                focusable="false" aria-hidden="true"><path
                                                                d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8M7 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2m6-2a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-.696 4.281c-.03.03-.786.72-2.304.72-1.497 0-2.252-.67-2.303-.718a1 1 0 0 0-1.404 1.424C6.425 12.84 7.653 14 10 14c2.346 0 3.575-1.16 3.707-1.293a.993.993 0 0 0 .005-1.397 1.006 1.006 0 0 0-1.408-.029"></path></svg></span></button></span>
                                                        </div>
                                                        <div><span class=""><button tabindex="0" class="WZyyO"
                                                                                    aria-label="提及員工" type="button"
                                                                                    aria-describedby=":rru:"
                                                                                    data-polaris-tooltip-activator="true"
                                                                                    aria-controls=":rrt:"
                                                                                    aria-owns=":rrt:"
                                                                                    aria-expanded="false"><span
                                                                class="Polaris-Icon_yj27d"><span
                                                                class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                                viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                                focusable="false" aria-hidden="true"><path
                                                                d="M10 13c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0-13c-5.514 0-10 4.486-10 10s4.486 10 10 10a1 1 0 0 0 0-2c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8v1c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5v-1c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5c1.531 0 2.887-.707 3.805-1.795a3.477 3.477 0 0 0 2.695 1.295c1.93 0 3.5-1.57 3.5-3.5v-1c0-5.514-4.486-10-10-10z"></path></svg></span></button></span>
                                                        </div>
                                                        <div class="TA0xl">
                                                            <div><span class=""><button tabindex="0" class="WZyyO"
                                                                                        aria-label="參考頁面"
                                                                                        type="button"
                                                                                        aria-describedby=":rs0:"
                                                                                        data-polaris-tooltip-activator="true"
                                                                                        aria-controls=":rrv:"
                                                                                        aria-owns=":rrv:"
                                                                                        aria-expanded="false"><span
                                                                    class="Polaris-Icon_yj27d"><span
                                                                    class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                                    viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                                    focusable="false" aria-hidden="true"><path
                                                                    fill-rule="evenodd"
                                                                    d="M7.992 2.124a1 1 0 1 0-1.984-.248l-.39 3.124h-3.618a1 1 0 0 0 0 2h3.367l-.75 6h-2.617a1 1 0 1 0 0 2h2.367l-.36 2.876a1 1 0 1 0 1.985.248l.39-3.124h5.985l-.36 2.876a1 1 0 0 0 1.985.248l.39-3.124h3.618a1 1 0 1 0 0-2h-3.367l.75-6h2.617a1 1 0 1 0 0-2h-2.367l.36-2.876a1 1 0 1 0-1.985-.248l-.39 3.124h-5.986l.36-2.876zm4.625 10.876.75-6h-5.984l-.75 6h5.984z"></path></svg></span></button></span>
                                                            </div>
                                                            <div tabindex="-1" aria-controls=":rs1:" aria-owns=":rs1:"
                                                                 aria-expanded="false">
                                                                <div class="xf3fQ"></div>
                                                            </div>
                                                        </div>
                                                        <span class=""><button tabindex="0" class="WZyyO"
                                                                               aria-label="附加檔案" type="button"
                                                                               aria-describedby=":rs2:"
                                                                               data-polaris-tooltip-activator="true"><span
                                                                class="Polaris-Icon_yj27d"><span
                                                                class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                                viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                                focusable="false" aria-hidden="true"><path
                                                                d="M5.243 20a5.228 5.228 0 0 1-3.707-1.533 5.213 5.213 0 0 1-1.536-3.708c0-1.402.546-2.719 1.536-3.708l9.515-9.519a5.25 5.25 0 0 1 8.553 1.7 5.21 5.21 0 0 1 .396 2.008 5.208 5.208 0 0 1-1.535 3.708l-4.258 4.26a3.124 3.124 0 0 1-5.092-1.012 3.098 3.098 0 0 1-.236-1.196c0-.835.324-1.619.914-2.208l4.5-4.501a1 1 0 1 1 1.414 1.414l-4.5 4.501a1.112 1.112 0 0 0-.328.794 1.114 1.114 0 0 0 1.121 1.12c.297 0 .582-.118.793-.327l4.258-4.26a3.223 3.223 0 0 0 .949-2.293c0-.866-.337-1.681-.949-2.293a3.248 3.248 0 0 0-4.586 0l-9.515 9.518a3.224 3.224 0 0 0-.95 2.295c0 .866.338 1.68.95 2.293a3.248 3.248 0 0 0 4.586 0l1.757-1.758a1 1 0 1 1 1.414 1.414l-1.757 1.758a5.236 5.236 0 0 1-3.707 1.533z"></path></svg></span></button></span>
                                                    </div>
                                                    <div class="d0ZXl">
                                                        <div class="Polaris-ButtonGroup_yy85z">
                                                            <div class="Polaris-ButtonGroup__Item_yiyol">
                                                                <button class="Polaris-Button_r99lw Polaris-Button--primary_7k9zs Polaris-Button--disabled_hcuh9"
                                                                        aria-disabled="true" type="button"
                                                                        tabindex="-1"><span
                                                                        class="Polaris-Button__Content_xd1mk"><span
                                                                        class="Polaris-Button__Text_yj3uv">張貼</span></span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ihST6" id="TimelineEditor1HelpText">只有您和其他員工可查看留言</div>
                                    </div>
                                </div>
                            </div>
                            <div class="J4d1P">
                                <div class="w81IW">
                                    <div>
                                        <div class="FtN_i"><h3
                                                class="Polaris-Text--root_yj4ah Polaris-Text--headingXs_9lann">今天</h3>
                                        </div>
                                        <ul class="JZ9zi">
                                            <li class="JCSMM"></li>
                                            <li class="JCSMM">
                                                <div class="XYnXD">
                                                    <div class="mnsxP">
                                                        <div class="hwr57 ft2nX"></div>
                                                        <div class="su3xr">
                                                            <button class="y8M2j" type="button"><span class="Kbke2"><img
                                                                    alt=""
                                                                    src="https://cdn.shopify.com/shopifycloud/shopify/assets/default-app-74bfb89634baf86f3402062ef55df218fe55b4f2775ff605d0ccfe1a20f9c0d3_50x50.png"
                                                                    width="20" height="20"
                                                                    style="vertical-align: middle;"></span><span
                                                                    class="">已使用卡片處理 $27,086.00 TWD 元的付款。</span>
                                                                <div class="VIUCi YcENg"><span
                                                                        class="Polaris-Icon_yj27d Polaris-Icon--colorBase_nqlaq Polaris-Icon--applyColor_2y25n"><span
                                                                        class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                                        viewBox="0 0 20 20"
                                                                        class="Polaris-Icon__Svg_375hu"
                                                                        focusable="false" aria-hidden="true"><path
                                                                        d="M13.098 8h-6.196c-.751 0-1.172.754-.708 1.268l3.098 3.432c.36.399 1.055.399 1.416 0l3.098-3.433c.464-.513.043-1.267-.708-1.267Z"></path></svg></span>
                                                                </div>
                                                            </button>
                                                            <p class="KDXwE">上午11:29</p></div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="JCSMM">
                                                <div class="XYnXD">
                                                    <div class="mnsxP">
                                                        <div class="hwr57 ft2nX"></div>
                                                        <div class="su3xr">
                                                            <button class="y8M2j" type="button"><span class="Kbke2"><img
                                                                    alt=""
                                                                    src="https://cdn.shopify.com/shopifycloud/shopify/assets/default-app-74bfb89634baf86f3402062ef55df218fe55b4f2775ff605d0ccfe1a20f9c0d3_50x50.png"
                                                                    width="20" height="20"
                                                                    style="vertical-align: middle;"></span><span
                                                                    class="">HOMEE-BACKEND 已新增一則備註至此訂單。</span>
                                                                <div class="VIUCi YcENg"><span
                                                                        class="Polaris-Icon_yj27d Polaris-Icon--colorBase_nqlaq Polaris-Icon--applyColor_2y25n"><span
                                                                        class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                                        viewBox="0 0 20 20"
                                                                        class="Polaris-Icon__Svg_375hu"
                                                                        focusable="false" aria-hidden="true"><path
                                                                        d="M13.098 8h-6.196c-.751 0-1.172.754-.708 1.268l3.098 3.432c.36.399 1.055.399 1.416 0l3.098-3.433c.464-.513.043-1.267-.708-1.267Z"></path></svg></span>
                                                                </div>
                                                            </button>
                                                            <p class="KDXwE">上午11:29</p></div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="JCSMM">
                                                <div class="QJdlI">
                                                    <div class="XyunH">
                                                        <div class="Jw0HT SlUc0"></div>
                                                        <span class="nlk7s"><img alt=""
                                                                                 src="https://cdn.shopify.com/shopifycloud/shopify/assets/default-app-74bfb89634baf86f3402062ef55df218fe55b4f2775ff605d0ccfe1a20f9c0d3_50x50.png"
                                                                                 width="20" height="20"
                                                                                 style="vertical-align: middle;"></span>
                                                        <p class="onT2G">張銘真張 已透過 HOMEE-BACKEND 提交此訂單。</p>
                                                        <p class="TKEqp">上午11:29</p></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="SWhZq"></div>
                    </div>
                    <div class="aYAHt">
                        <div class="Polaris-VerticalStack_1fqes"
                             style="--pc-vertical-stack-order: column; --pc-vertical-stack-gap-xs: var(--p-space-4);">
                            <div class="">
                                <div class="Polaris-LegacyCard_l5l93">
                                    <div class="Polaris-LegacyCard__Header_z4uwg">
                                        <div class="Polaris-LegacyStack_eaeo0 Polaris-LegacyStack--alignmentBaseline_aupj5">
                                            <div class="Polaris-LegacyStack__Item_yiyol Polaris-LegacyStack__Item--fill_vpuzt">
                                                <h2 class="Polaris-Text--root_yj4ah Polaris-Text--headingMd_lwjt4">
                                                    備註</h2></div>
                                            <div class="Polaris-LegacyStack__Item_yiyol">
                                                <button class="Polaris-Button_r99lw Polaris-Button--plain_2z97r"
                                                        type="button"><span class="Polaris-Button__Content_xd1mk"><span
                                                        class="Polaris-Button__Text_yj3uv">編輯</span></span></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="Polaris-LegacyCard__Section_1b1h1">
                                        <div class="zKCsv">
                                        ${data.order.note.replaceAll('\n', '<br>')}                                       
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div tabindex="-1">
                                <div class="Polaris-LegacyCard_l5l93">
                                    <div class="Polaris-LegacyCard__Header_z4uwg">
                                        <div class="Polaris-LegacyStack_eaeo0">
                                            <div class="Polaris-LegacyStack__Item_yiyol Polaris-LegacyStack__Item--fill_vpuzt">
                                                <h2 class="Polaris-Text--root_yj4ah Polaris-Text--headingMd_lwjt4">
                                                    客戶</h2></div>
                                            <div class="Polaris-LegacyStack__Item_yiyol">
                                                <button class="Polaris-Button_r99lw Polaris-Button--plain_2z97r Polaris-Button--iconOnly_viazp"
                                                        aria-label="移除顧客" type="button"><span
                                                        class="Polaris-Button__Content_xd1mk"><span
                                                        class="Polaris-Button__Icon_yj27d"><span
                                                        class="Polaris-Icon_yj27d"><span
                                                        class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                        viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                        focusable="false" aria-hidden="true"><path
                                                        d="M6.707 5.293a1 1 0 0 0-1.414 1.414l3.293 3.293-3.293 3.293a1 1 0 1 0 1.414 1.414l3.293-3.293 3.293 3.293a1 1 0 0 0 1.414-1.414l-3.293-3.293 3.293-3.293a1 1 0 0 0-1.414-1.414l-3.293 3.293-3.293-3.293Z"></path></svg></span></span></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div tabindex="-1" aria-label="客戶">
                                        <div class="Polaris-LegacyCard__Section_1b1h1">
                                            <div class="Polaris-LegacyStack_eaeo0 Polaris-LegacyStack--vertical_uiuuj Polaris-LegacyStack--spacingExtraTight_gv6hw Polaris-LegacyStack--noWrap_vecks">
                                                <div class="Polaris-LegacyStack__Item_yiyol"><p><a
                                                        data-polaris-unstyled="true"
                                                        class="Polaris-Link_yj5sy Polaris-Link--removeUnderline_adav6"
                                                        href="/store/homee-5134/customers/${data.order.customer.id}">${data.order.customer.last_name}${data.order.customer.first_name}</a>
                                                </p></div>
                                                <div class="Polaris-LegacyStack__Item_yiyol"><p><a
                                                        data-polaris-unstyled="true"
                                                        class="Polaris-Link_yj5sy Polaris-Link--removeUnderline_adav6"
                                                        href="/store/homee-5134/orders?customer_id=${data.order.customer.id}">3
                                                    筆訂單</a></p></div>
                                            </div>
                                        </div>
                                        <div class="Polaris-LegacyCard__Section_1b1h1">
                                            <div class="Polaris-LegacyCard__SectionHeader_1aytf">
                                                <div class="Polaris-LegacyStack_eaeo0">
                                                    <div class="Polaris-LegacyStack__Item_yiyol Polaris-LegacyStack__Item--fill_vpuzt">
                                                        <h3 class="Polaris-Text--root_yj4ah Polaris-Text--headingSm_14l4b">
                                                            聯絡資訊</h3></div>
                                                    <div class="Polaris-LegacyStack__Item_yiyol">
                                                        <div tabindex="-1">
                                                            <button class="Polaris-Button_r99lw Polaris-Button--plain_2z97r"
                                                                    aria-label="編輯聯絡資訊" type="button"><span
                                                                    class="Polaris-Button__Content_xd1mk"><span
                                                                    class="Polaris-Button__Text_yj3uv">編輯</span></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="Polaris-LegacyStack_eaeo0 Polaris-LegacyStack--noWrap_vecks">
                                                <div class="Polaris-LegacyStack__Item_yiyol Polaris-LegacyStack__Item--fill_vpuzt">
                                                    <div class="Polaris-TextContainer_szg8b Polaris-TextContainer--spacingTight_1o4d6">
                                                        <p class="WiNyt">
                                                            <button class="Polaris-Button_r99lw Polaris-Button--plain_2z97r Polaris-Button--textAlignLeft_1yjwh"
                                                                    type="button"><span
                                                                    class="Polaris-Button__Content_xd1mk"><span
                                                                    class="Polaris-Button__Text_yj3uv">${data.order.customer.email}</span></span>
                                                            </button>
                                                        </p>
                                                        <p><span
                                                                class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--subdued_17vaa">0${(() => {
                        if (data.order.customer.phone) {
                            return data.order.customer.phone;
                        }
                        else {
                            return '沒有電話號碼';
                        }
                    })()}</span>
                                                        </p></div>
                                                </div>
                                                <div class="Polaris-LegacyStack__Item_yiyol"><span class=""><div
                                                        class="iJ2h7"><button
                                                        class="Polaris-Button_r99lw Polaris-Button--plain_2z97r Polaris-Button--iconOnly_viazp"
                                                        aria-label="複製電子郵件" type="button" tabindex="0"
                                                        aria-describedby=":rs9:"
                                                        data-polaris-tooltip-activator="true"><span
                                                        class="Polaris-Button__Content_xd1mk"><span
                                                        class="Polaris-Button__Icon_yj27d"><span
                                                        class="Polaris-Icon_yj27d"><span
                                                        class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                        viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                        focusable="false" aria-hidden="true"><path
                                                        d="M8 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1s0 .997.996 1h2.004a2 2 0 0 1 2 2v7.586a2 2 0 0 1-.586 1.414l-2.414 2.414a2 2 0 0 1-1.414.586h-7.586a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h2.004c.996-.003.996-1 .996-1zm5 3v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1h-2v10h7v-2a1 1 0 0 1 1-1h2v-7h-2z"></path></svg></span></span></span></button></div></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="Polaris-LegacyCard__Section_1b1h1">
                                            <div class="Polaris-LegacyCard__SectionHeader_1aytf">
                                                <div class="Polaris-LegacyStack_eaeo0">
                                                    <div class="Polaris-LegacyStack__Item_yiyol Polaris-LegacyStack__Item--fill_vpuzt">
                                                        <h3 class="Polaris-Text--root_yj4ah Polaris-Text--headingSm_14l4b">
                                                            運送地址</h3></div>
                                                    <div class="Polaris-LegacyStack__Item_yiyol">
                                                        <div tabindex="-1">
                                                            <button class="Polaris-Button_r99lw Polaris-Button--plain_2z97r"
                                                                    aria-label="編輯運送地址" type="button"><span
                                                                    class="Polaris-Button__Content_xd1mk"><span
                                                                    class="Polaris-Button__Text_yj3uv">編輯</span></span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="Polaris-LegacyStack_eaeo0 Polaris-LegacyStack--vertical_uiuuj Polaris-LegacyStack--spacingTight_1o4d6">
                                                <div class="Polaris-LegacyStack__Item_yiyol">
                                                    <div class="Polaris-LegacyStack_eaeo0 Polaris-LegacyStack--noWrap_vecks">
                                                        <div class="Polaris-LegacyStack__Item_yiyol Polaris-LegacyStack__Item--fill_vpuzt">
                                                            <div class="aG2SI">
                                                                <div class="Polaris-TextContainer_szg8b Polaris-TextContainer--spacingTight_1o4d6">
                                                                    <p>${data.order.shipping_address.first_name} ${data.order.shipping_address.last_name}<br>${data.order.shipping_address.address1}<br>${data.order.shipping_address.address2}<br>${data.order.shipping_address.zip}
                                                                        ${data.order.shipping_address.city}<br>台灣<br><span>${data.order.shipping_address.phone}</span></p>
                                                                    <div class="yVl8U"><a
                                                                            href="https://maps.google.com/?q=25.0577498,121.3825146&amp;t=h&amp;z=17"
                                                                            rel="noopener noreferrer" target="_blank"
                                                                            data-polaris-unstyled="true"
                                                                            class="Polaris-Link_yj5sy">檢視地圖</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="Polaris-LegacyStack__Item_yiyol"><span class=""><div
                                                                class="yVl8U"><button
                                                                class="Polaris-Button_r99lw Polaris-Button--plain_2z97r Polaris-Button--iconOnly_viazp"
                                                                aria-label="複製地址和電話號碼" type="button"
                                                                tabindex="0" aria-describedby=":rsa:"
                                                                data-polaris-tooltip-activator="true"><span
                                                                class="Polaris-Button__Content_xd1mk"><span
                                                                class="Polaris-Button__Icon_yj27d"><span
                                                                class="Polaris-Icon_yj27d"><span
                                                                class="Polaris-Text--root_yj4ah Polaris-Text--visuallyHidden_yrtt6"></span><svg
                                                                viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu"
                                                                focusable="false" aria-hidden="true"><path
                                                                d="M8 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1s0 .997.996 1h2.004a2 2 0 0 1 2 2v7.586a2 2 0 0 1-.586 1.414l-2.414 2.414a2 2 0 0 1-1.414.586h-7.586a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h2.004c.996-.003.996-1 .996-1zm5 3v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1h-2v10h7v-2a1 1 0 0 1 1-1h2v-7h-2z"></path></svg></span></span></span></button></div></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="Polaris-LegacyCard__Section_1b1h1">
                                            <div class="Polaris-LegacyCard__SectionHeader_1aytf">
                                                <div class="Polaris-LegacyStack_eaeo0">
                                                    <div class="Polaris-LegacyStack__Item_yiyol Polaris-LegacyStack__Item--fill_vpuzt">
                                                        <h3 class="Polaris-Text--root_yj4ah Polaris-Text--headingSm_14l4b">
                                                            帳單地址</h3></div>
                                                </div>
                                            </div>
                                            <span class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--subdued_17vaa">與運送地址相同</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="Polaris-LegacyCard_l5l93 Polaris-LegacyCard--hideOnPrint_1nslv">
                                    <div class="Polaris-LegacyCard__Header_z4uwg"><h2
                                            class="Polaris-Text--root_yj4ah Polaris-Text--headingMd_lwjt4">轉換摘要</h2>
                                    </div>
                                    <div class="Polaris-LegacyCard__Section_1b1h1">
                                        <div class="Polaris-TextContainer_szg8b Polaris-TextContainer--spacingTight_1o4d6">
                                            <p>此訂單沒有任何轉換詳細資訊。</p>
                                            <p>
                                                <a href="https://help.shopify.com/zh-TW/manual/orders/conversion-summary#no-conversion-summary-available"
                                                   rel="noopener noreferrer" target="_blank"
                                                   data-polaris-unstyled="true"
                                                   class="Polaris-Link_yj5sy Polaris-Link--removeUnderline_adav6">深入瞭解</a>
                                            </p></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="Polaris-LegacyCard_l5l93 Polaris-LegacyCard--hideOnPrint_1nslv">
                                    <div class="NVDP7">
                                        <div class="lo9iX"><span
                                                class="Polaris-Text--root_yj4ah Polaris-Text--headingMd_lwjt4">詐騙分析</span>
                                        </div>
                                        <div class="fY5Os">
                                            <div class="Wtt9c">
                                                <div class="VLKER">
                                                    <div class="IRHhx">
                                                        <div class="YZ5aw">
                                                            <svg width="20" height="20"
                                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path fill="currentColor" fill-rule="evenodd"
                                                                      clip-rule="evenodd"
                                                                      d="M1 2.5a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-15zm7 2.5h8v2h-8v-2zm8 4h-8v2h8v-2zm-8 4h8v2h-8v-2zm-3-6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm1 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                                                            </svg>
                                                        </div>
                                                        <div class="pm1IY">
                                                            <button type="button" class="Polaris-Link_yj5sy">
                                                                檢視詳細資訊
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="dIcsQ"></div>
                                            </div>
                                        </div>
                                        <div class="Polaris-LegacyCard__Section_1b1h1">
                                            <div class="FOglA"><span
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodySm_nvqxj Polaris-Text--visuallyHidden_yrtt6">此訂單風險低</span>
                                                <div><span class="" tabindex="0" aria-describedby=":rsb:"
                                                           data-polaris-tooltip-activator="true"><div class="n6VKI"><div
                                                        class="USFQR"></div></div></span>
                                                    <div aria-hidden="true" class="ZTuns"><span
                                                            class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--semibold_k1k0m"><span
                                                            class="dQLv5">低</span></span><span
                                                            class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--regular_pjgr0"><span
                                                            class="E_wpM">中等</span></span><span
                                                            class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--regular_pjgr0"><span
                                                            class="ZZrsf">高</span></span></div>
                                                </div>
                                            </div>
                                            <div class="huAT1"><span
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s">推薦： </span><span
                                                    class="yFQDa"><span
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s Polaris-Text--semibold_k1k0m">出貨訂單</span></span>
                                            </div>
                                            <div class="BvgYJ"><p
                                                    class="Polaris-Text--root_yj4ah Polaris-Text--bodyMd_jaf4s">
                                                您不太可能會收到此訂單的退款。</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="Polaris-LegacyCard_l5l93 Polaris-LegacyCard--hideOnPrint_1nslv">
                                <div class="tdZ8q">
                                    <div class="Polaris-LegacyStack_eaeo0 Polaris-LegacyStack--alignmentBaseline_aupj5">
                                        <div class="Polaris-LegacyStack__Item_yiyol Polaris-LegacyStack__Item--fill_vpuzt">
                                            <h2 class="Polaris-Text--root_yj4ah Polaris-Text--headingMd_lwjt4">標籤</h2>
                                        </div>
                                        <div class="Polaris-LegacyStack__Item_yiyol">
                                            <div class="L8Rj8">
                                                <button class="Polaris-Button_r99lw Polaris-Button--plain_2z97r"
                                                        type="button"><span class="Polaris-Button__Content_xd1mk"><span
                                                        class="Polaris-Button__Text_yj3uv">管理</span></span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="Polaris-LegacyCard__Section_1b1h1">
                                    <div class="Polaris-LegacyStack_eaeo0 Polaris-LegacyStack--vertical_uiuuj Polaris-LegacyStack--spacingTight_1o4d6 Polaris-LegacyStack--distributionFill_1c1lq">
                                        <div class="Polaris-LegacyStack__Item_yiyol">
                                            <div>
                                                <div class="TextFieldWrapper">
                                                    <div class="Polaris-Labelled--hidden_riqie">
                                                        <div class="Polaris-Labelled__LabelWrapper_bf6ys">
                                                            <div class="Polaris-Label_2vd36"><label id=":rsd:Label"
                                                                                                    for=":rsd:"
                                                                                                    class="Polaris-Label__Text_yj3uv">搜尋或建立標籤</label>
                                                            </div>
                                                        </div>
                                                        <div class="Polaris-Connected_wopc9">
                                                            <div class="Polaris-Connected__Item_yiyol Polaris-Connected__Item--primary_rmh5m">
                                                                <div class="Polaris-TextField_1spwi"><input id=":rsd:"
                                                                                                            role="combobox"
                                                                                                            autocomplete="off"
                                                                                                            class="Polaris-TextField__Input_30ock"
                                                                                                            type="text"
                                                                                                            aria-labelledby=":rsd:Label"
                                                                                                            aria-invalid="false"
                                                                                                            aria-autocomplete="list"
                                                                                                            aria-expanded="false"
                                                                                                            value=""
                                                                                                            tabindex="0"
                                                                                                            aria-controls=":rsc:"
                                                                                                            aria-owns=":rsc:">
                                                                    <div class="Polaris-TextField__Backdrop_1x2i2"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="zlRMS xE2M8"></div>
                </section>
            </div>
        </div>
    </div>
</div>`;
                },
                editor: () => {
                    return ``;
                }
            };
        },
    };
});
