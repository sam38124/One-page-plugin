import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    // @ts-ignore
                    let db = new Dashboard();
                    let sourceData = {
                        data:{
                            mode: "calendarList",
                            title: "行事曆",
                            col: { pc: 6, tab: 12 },
                            list: [
                                { range: "7:30 AM - 09:00 AM", event: "與UI/UX小組會議" },
                                { range: "10:30 AM - 11:45 AM", event: "後端開發小組 - 函式庫撰寫" },
                                { range: "12:15 PM - 02:00 PM", event: "上傳至Github並規劃程式碼" },
                                { range: "5:30 PM - 07:00 PM", event: "與產品經理進度報告會議" },
                            ],
                        }
                    }
                    function threeDot() {
                        return /*html*/ `
                            <div class="dropdown float-end">
                              <a href="#" class="dropdown-toggle arrow-none card-drop p-0" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="mdi mdi-dots-vertical"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a href="javascript:void(0);" class="dropdown-item">重新整理</a>
                                <a href="javascript:void(0);" class="dropdown-item">匯出</a>
                              </div>
                            </div>
                          `;
                    }
                    function formatDate (date:any, symbol:any) {
                        var d = date === undefined || date === null || date == "" ? new Date() : new Date(date),
                            month = "" + (d.getMonth() + 1),
                            day = "" + d.getDate(),
                            year = d.getFullYear();

                        if (month.length < 2) month = "0" + month;
                        if (day.length < 2) day = "0" + day;

                        return [year, month, day].join(symbol ?? "-");
                    }
                    function calendarList (d:any, i:any) {
                        var c = {};
                        // @ts-ignore
                        setTimeout(() => ((c = $(`#calendar${i}`)), c.find(".datepicker-days").on("click", () => setTimeout(() => renderList(), 100))), 500);

                        function renderList() {
                            function formatDate (date:any, symbol:any) {
                                var d = date === undefined || date === null || date == "" ? new Date() : new Date(date),
                                    month = "" + (d.getMonth() + 1),
                                    day = "" + d.getDate(),
                                    year = d.getFullYear();

                                if (month.length < 2) month = "0" + month;
                                if (day.length < 2) day = "0" + day;

                                return [year, month, day].join(symbol ?? "-");
                            }
                            // 確認有active day的資料 && 輸出正規日期格式
                            // @ts-ignore
                            c.find(".active.day").data() && console.log(formatDate(c.find(".active.day").data().date , "-"));
                            // 獲取api更新List (現為假資料)
                            d.list = [{ range: "Loading...", event: "取得資料中..." }];
                            // 重新渲染cList
                            gvc.notifyDataChange(`cList${i}`);
                        }

                        return /*html*/ `
          <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
            <div class="card">
              <div class="card-body">
                ${threeDot()}
                <h4 class="header-title mb-3">${d.title}</h4>

                <div class="row">
                  <div class="col-md-7" id="calendar${i}">
                    <div data-provide="datepicker-inline" data-date-today-highlight="true" class="calendar-widget"></div>
                  </div>
                  <!-- end col-->
                  <div class="col-md-5" id="cList${i}">
                    ${gvc.bindView({
                            bind: `cList${i}`,
                            view: function () {
                                var HTML = `<ul class="list-unstyled">`;
                                (d.list ?? []).map((l:any) => {
                                    HTML += /*html*/ `
                            <li class="mb-4">
                              <p class="text-muted mb-1 font-13"><i class="mdi mdi-calendar"></i> ${l.range}</p>
                              <h5>${l.event}</h5>
                            </li>
                          `;
                                });
                                HTML += `</ul>`;
                                return HTML;
                            },
                        })}
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </div>
              <!-- end card body-->
            </div>
            <!-- end card -->
          </div>
        `;
                    }

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return `
                            <div class="row">
                                ${calendarList(sourceData.data , 0)}
                            
                            </div>
                           `
                        },divCreate:{},
                        onCreate:()=>{
                            // @ts-ignore
                            $('.datepicker').datepicker();

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