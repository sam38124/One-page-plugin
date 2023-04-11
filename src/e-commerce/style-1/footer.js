import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let footer = {
                        mapList: {
                            map: [
                                {
                                    title: "類別",
                                    list: [
                                        { name: "MEN", link: ["#"] },
                                        { name: "WOMEN", link: ["#"] },
                                        { name: "KID", link: ["#"] },
                                        { name: "NEWS", link: ["#"] },
                                    ],
                                },
                                {
                                    title: "聲明條款",
                                    list: [
                                        { name: "購物流程", link: ["#"] },
                                        { name: "運費計價", link: ["#"] },
                                        { name: "隱私權政策", link: ["#"] },
                                    ],
                                },
                            ],
                        },
                        info: {
                            title: "關於我們",
                            desc: "從電商網站設計、後台管理、產品投放分析、網站架設、金流串接，我們都有經驗能替您完成服務<br><br>資料視覺化的長條圖、雷達圖、圓餅圖、好看且可客製的表格，任何資料都能如期美觀呈現；企業管理中的薪資管理、班表分配、客戶表單，除了企業基本經營的功能，也能依造需求來打造專屬各企業的系統",
                            link: ["https://www.facebook.com/", "https://www.instagram.com/", "https://squarestudio.tw"],
                        },
                        news: {
                            title: "訂閱電子報",
                            btn: { name: "確認送出", link: ["#"] },
                        },
                        payment: ["paypal", "visa", "mastercard"],
                    };
                    function copyRight(color) {
                        return `Copyright &copy; ${new Date().getFullYear()}
                        <a href="https://squarestudio.tw" target="_blank" rel="noreferrer noopener" style="cursor:pointer;color:${color ? color : `ivory`}"
                          >Lion Design</a
                        >
                        All Rights Reserved.`;
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <!-- Footer -->
                            <footer class="bg3 p-t-75 p-b-32">
                              <div class="container">
                                <div class="row">
                                  ${glitter.print(function () {
                                var tmp = "";
                                Object.keys(footer).map((f) => {
                                    switch (f) {
                                        case "mapList":
                                            footer[f]["map"].map((m) => {
                                                tmp += `
                                                      <div class="col-sm-6 col-lg-3 p-b-50">
                                                        <h4 class="stext-301 cl0 p-b-30">${m.title}</h4>
                                                        <ul>
                                                          ${glitter.print(function () {
                                                    var tmp = "";
                                                    m.list.map((l) => {
                                                        tmp += `
                                                                <li class="p-b-10">
                                                                  <a
                                                                    class="stext-107 cl7 hov-cl1 trans-04"
                                                                    onclick=""
                                                                    style="cursor:pointer"
                                                                  >
                                                                    ${l.name}
                                                                  </a>
                                                                </li>
                                                              `;
                                                    });
                                                    return tmp;
                                                })}
                                                        </ul>
                                                      </div>
                                                    `;
                                            });
                                            break;
                                        case "info":
                                            tmp += `
                                                <div class="col-sm-6 col-lg-3 p-b-50">
                                                    <h4 class="stext-301 cl0 p-b-30">${footer[f].title}</h4>
                                                    <p class="stext-107 cl7 size-201">${footer[f].desc}</p>
                                                    <div class="p-t-27">
                                                      ${glitter.print(function () {
                                                var tmp = "";
                                                var iconList = {
                                                    facebook: "fa fa-facebook",
                                                    instagram: "fa fa-instagram",
                                                    pinterest: "fa fa-pinterest-p",
                                                    link: "fa fa-link",
                                                };
                                                footer[f].link.map((l) => {
                                                    tmp += `
                                                            <a
                                                              class="fs-18 cl7 hov-cl1 trans-04 m-r-16 text-white"
                                                              onclick=""
                                                              href="l"
                                                              style="cursor:pointer"
                                                            >
                                                              <i class="${ScriptStyle1.urlIcon(l, 'fa')}"></i>
                                                            </a>
                                                          `;
                                                });
                                                return tmp;
                                            })}
                                            </div>
                                          </div>`;
                                            break;
                                        case "news":
                                            tmp += `<div class="col-sm-6 col-lg-3 p-b-50">
                                                    <h4 class="stext-301 cl0 p-b-30">${footer[f].title}</h4>
                                                    <form>
                                                      <div class="wrap-input1 w-full p-b-4">
                                                        <input
                                                          class="input1 bg-none plh1 stext-107 cl7"
                                                          type="text"
                                                          name="email"
                                                          placeholder=""
                                                        />
                                                        <div class="focus-input1 trans-04"></div>
                                                      </div>
                                                      <div class="p-t-18">
                                                        <button class="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                                                          ${footer[f].btn.name}
                                                        </button>
                                                      </div>
                                                    </form>
                                                  </div>`;
                                            break;
                                    }
                                });
                                return tmp;
                            })}
                                </div>
                    
                                <div class="p-t-40">
                                  <div class="flex-c-m flex-w p-b-18">
                                    ${glitter.print(function () {
                                return ``;
                                let tmp = "";
                                let piList = {
                                    paypal: ScriptStyle1.getRout("assets/images/icons/icon-pay-01.png"),
                                    visa: ScriptStyle1.getRout("assets/images/icons/icon-pay-02.png"),
                                    mastercard: ScriptStyle1.getRout("assets/images/icons/icon-pay-03.png"),
                                    default: ScriptStyle1.getRout("assets/images/icons/icon-pay-def.png"),
                                };
                                footer.payment.map((p) => {
                                    var card = Object.keys(piList).find((y) => y == p) ? piList[p] : piList.default;
                                    tmp += `<a class="m-all-1"><img src="${card}" alt="ICON-PAY" /></a>`;
                                });
                                return tmp;
                            })}
                                  </div>
                    
                                  <p class="stext-107 cl6 txt-center">${copyRight()}</p>
                                </div>
                              </div>
                            </footer>
                            
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
