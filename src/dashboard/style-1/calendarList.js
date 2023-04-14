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
                    let db = new Dashboard();
                    let sourceData = {
                        data: {
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
                    };
                    function threeDot() {
                        return `
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
                    function formatDate(date, symbol) {
                        var d = date === undefined || date === null || date == "" ? new Date() : new Date(date), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();
                        if (month.length < 2)
                            month = "0" + month;
                        if (day.length < 2)
                            day = "0" + day;
                        return [year, month, day].join(symbol ?? "-");
                    }
                    function calendarList(d, i) {
                        var c = {};
                        setTimeout(() => ((c = $(`#calendar${i}`)), c.find(".datepicker-days").on("click", () => setTimeout(() => renderList(), 100))), 500);
                        function renderList() {
                            function formatDate(date, symbol) {
                                var d = date === undefined || date === null || date == "" ? new Date() : new Date(date), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();
                                if (month.length < 2)
                                    month = "0" + month;
                                if (day.length < 2)
                                    day = "0" + day;
                                return [year, month, day].join(symbol ?? "-");
                            }
                            c.find(".active.day").data() && console.log(formatDate(c.find(".active.day").data().date, "-"));
                            d.list = [{ range: "Loading...", event: "取得資料中..." }];
                            gvc.notifyDataChange(`cList${i}`);
                        }
                        return `
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
                                (d.list ?? []).map((l) => {
                                    HTML += `
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
                        bind: id,
                        view: () => {
                            return `
                            <div class="row">
                                ${calendarList(sourceData.data, 0)}
                            
                            </div>
                           `;
                        }, divCreate: {},
                        onCreate: () => {
                            $('.datepicker').datepicker();
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
