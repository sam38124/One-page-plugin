import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            const publica = {
                checkT: /*html*/ `<i class="bx bx-check text-primary fs-3"></i>`,
                checkF: /*html*/ `<i class="bx bx-x text-danger fs-3"></i>`,
                email: 'jianzhi.wang@ncdesign.info',
                glitterBase: 'https://squarestudio.tw/Glitter/home',
            };
            const price_detail = {
                title: '方案價格',
                list: [
                    {
                        專案規模: '價格',
                        簡: '3 萬 ～ 20 萬',
                        中: '20 萬～ 60 萬',
                        高: '60 萬以上',
                    },
                    {
                        專案規模: '專案規劃',
                        簡: publica.checkT,
                        中: publica.checkT,
                        高: publica.checkT,
                    },
                    {
                        專案規模: '帳號管理',
                        簡: publica.checkT,
                        中: publica.checkT,
                        高: publica.checkT,
                    },
                    {
                        專案規模: 'UI／UX 設計',
                        簡: '1 種',
                        中: '2 種',
                        高: '3 種',
                    },
                    {
                        專案規模: '後台系統',
                        簡: '套版功能',
                        中: '客製化',
                        高: '客製化',
                    },
                    {
                        專案規模: '支援平台',
                        簡: "<i class='fs-3 bx bx-globe'></i>",
                        中: "<i class='fs-3 bx bxl-android'></i><i class='fs-3 bx bxl-apple' ></i><i class='fs-3 bx bx-globe' ></i>",
                        高: "<i class='fs-3 bx bxl-android'></i><i class='fs-3 bx bxl-apple' ></i><i class='fs-3 bx bx-globe' ></i>",
                    },
                    {
                        專案規模: '數據分析',
                        簡: publica.checkF,
                        中: publica.checkT,
                        高: publica.checkT,
                    },
                    {
                        專案規模: '開發時程',
                        簡: '15天～60天',
                        中: '60天～150天',
                        高: '150天～270天',
                    },
                ],
            };
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    return /*html*/ `
                            <section class="pt-2" id="price">
                                <div class="container pt-4 pt-sm-2">
                                    <h2 class="h1 mb-4 text-center">${price_detail.title}</h2>
                                    <div class="row mt-4 mt-sm-0">
                                        <div class="tab-pane fade show active mt-3" role="tabpanel">
                                            <!-- Price table -->
                                            <div class="table-responsive border rounded shadow-sm">
                                                ${table_lion(price_detail.list, true, true)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        `;
                },
                editor: () => {
                    return ``;
                },
            };
        }
    }
})

function table_lion(json: any, stripe: boolean, hideHead: boolean) {
    const glitter = (window as any).glitter;
    return /*html*/ `
        <table class="table table-sm table-centered table-nowrap mb-0 font-14 table-hover">
            ${
        hideHead
            ? ``
            : /*html*/ `
                      <thead class="${stripe ? `` : `table-dark`}">
                          <tr class="text-center ${glitter.ut.frSize({sm: 'fs-4'}, 'fs-6')}" style="height:64px">
                              ${glitter.print(function () {
                var thHTML = '';
                Object.keys(json[0]).map((h) => (thHTML += /*html*/ `<th class="pt-4 pb-4">${h}</th>`));
                return thHTML;
            })}
                          </tr>
                      </thead>
                  `
    }
            <tbody>
                ${glitter.print(function () {
        var tdHTML = '';
        json.map((row: any) => {
            tdHTML += /*html*/ `<tr class="text-center ${glitter.ut.frSize({sm: 'fs-5'}, 'fs-sm')}" style="height: 72px;">
                            ${glitter.print(function () {
                var innertd = '';
                Object.values(row).map((d, i) => (innertd += /*html*/ `<td class="pt-4 pb-4">${d}</td>`));
                return innertd;
            })}
                        </tr>`;
        });
        return tdHTML;
    })}
            </tbody>
        </table>
    `;
}