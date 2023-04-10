export class FunnelHTML {
  constructor() {
    var event = window.event;
    addMtScript(["//cdn.jsdelivr.net/npm/sweetalert2@11"], () => {});

    /* ======================== Table template ======================== */
    // Json => Table, stripe => 條紋, hideHead => 隱藏表頭, td_catalog => 區分 td 內容
    // Standard
    this.table = function (json, stripe, hideHead) {
      return /*html*/ `
        <table class="table table-sm table-centered table-nowrap mb-0 font-14 ${stripe ? `table-striped` : `table-hover`}">
          ${
            hideHead
              ? ``
              : /*html*/ `
                <thead class="${stripe ? `` : `table-light`}">
                  <tr>
                    ${glitter.print(function () {
                      var thHTML = "";
                      Object.keys(json[0]).map((h, i) => (thHTML += `<th class="text-center">${h}</th>`));
                      return thHTML;
                    })}
                  </tr>
                </thead>
              `
          }
          <tbody>
            ${glitter.print(function () {
              var tdHTML = "";
              json.map((row) => {
                tdHTML += `<tr>`;
                Object.values(row).map((d) => {
                  if (typeof d === "object") {
                    switch (d.td_catalog) {
                      case "processBar":
                        tdHTML += /*html*/ ` <td class="w-25">
                          <div class="progress" style="height: 3px">
                            <div
                              class="progress-bar"
                              role="progressbar"
                              style="width: ${d.percent.toFixed(0)}%; height: 20px; background-color:${d.color}"
                              aria-valuenow="${d.percent.toFixed(0)}"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </td>`;
                        break;
                      case "h5_span":
                        tdHTML += /*html*/ `<td>
                          <h5 class="font-15 mb-1 fw-normal">${d.h5}</h5>
                          <span class="text-muted font-13">${d.span}</span>
                        </td>`;
                        break;
                      case "span_h5":
                        tdHTML += /*html*/ `<td>
                          <span class="text-muted font-13">${d.span}</span>
                          <h5 class="font-15 mb-1 fw-normal">${d.h5}</h5>
                        </td>`;
                        break;
                      case "status":
                        tdHTML += /*html*/ `<td>
                          <span class="text-muted font-13">Status</span> <br />
                          <span class="badge badge-${d.color}-lighten">${d.state}</span>
                        </td>`;
                        break;
                      case "editBar":
                        tdHTML += /*html*/ `
                          <td class="table-action" style="width: 90px">
                            <a href="javascript: void(0);" class="action-icon"> <i class="mdi mdi-pencil"></i></a>
                            <a href="javascript: void(0);" class="action-icon"> <i class="mdi mdi-delete"></i></a>
                          </td>
                        `;
                        break;
                      case "notify":
                        tdHTML += /*html*/ `<td>
                          <div class="d-flex align-items-start">
                            <img class="me-2 rounded-circle" src="${d.img}" width="40" alt="Generic placeholder image" />
                            <div>
                              <h5 class="mt-0 mb-1">${d.h5}<small class="fw-normal ms-3">${d.small}</small></h5>
                              <span class="font-13">${d.span}</span>
                            </div>
                          </div>
                        </td> `;
                        break;
                      case "threeDot":
                        tdHTML += /*html*/ `<td class="table-action" style="width: 50px">
                          <div class="dropdown">
                            <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                              <!-- item-->
                              <a href="javascript:void(0);" class="dropdown-item">${glitter.share.language.settings}</a>
                              <!-- item-->
                              <a href="javascript:void(0);" class="dropdown-item">${glitter.share.language.viewEvent}</a>
                            </div>
                          </div>
                        </td>`;
                        break;
                      default:
                        tdHTML += `<td>${d}</td>`;
                        break;
                    }
                  } else if (typeof d === "number") {
                    tdHTML += `<td class="text-center">${d}</td>`;
                  } else {
                    tdHTML += `<td>${d}</td>`;
                  }
                });
                tdHTML += `</tr>`;
              });
              return tdHTML;
            })}
          </tbody>
        </table>
      `;
    };
    // Lion Design Mode
    this.table_lion = function (json, stripe, hideHead) {
      return /*html*/ `
        <table class="table table-sm table-centered table-nowrap mb-0 font-14 ${stripe ? `table-striped` : `table-hover`}">
          ${
            hideHead
              ? ``
              : /*html*/ `
                <thead class="${stripe ? `` : `table-dark`}">
                  <tr class="text-center ${glitter.frSize({ sm: "fs-4" }, "fs-6")}" style="height:64px">
                    ${glitter.print(function () {
                      var thHTML = "";
                      Object.keys(json[0]).map((h) => (thHTML += `<th class="pt-4 pb-4">${h}</th>`));
                      return thHTML;
                    })}
                  </tr>
                </thead>
              `
          }
          <tbody>
            ${glitter.print(function () {
              var tdHTML = "";
              json.map((row) => {
                tdHTML += /*html*/ `<tr class="text-center ${glitter.frSize({ sm: "fs-5" }, "fs-sm")}" style="height: 72px;">
                  ${glitter.print(function () {
                    var innertd = "";
                    Object.values(row).map((d, i) => (innertd += `<td class="pt-4 pb-4">${d}</td>`));
                    return innertd;
                  })}
                </tr>`;
              });
              return tdHTML;
            })}
          </tbody>
        </table>
      `;
    };

    /* ============================ Date  ============================== */
    // Any Date => yyyymmdd, symbol為間隔符號
    this.formatDate = function (date, symbol) {
      var d = date === undefined || date === null || date == "" ? new Date() : new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join(symbol ?? "-");
    };
    // Any Date => mmdd(day), symbol為間隔符號
    this.formatDate2 = function (date, symbol) {
      var tw = ["日", "一", "二", "三", "四", "五", "六"];
      var d = date === undefined || date === null || date.length === 0 ? new Date() : new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        weekDay = "(" + tw[d.getDay()] + ")";

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return month + (symbol ?? "/") + day + weekDay;
    };
    // Any Date => Day
    this.shortDay = function (date, language) {
      var weekName = {
        tw: ["日", "一", "二", "三", "四", "五", "六"],
        en: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "	Fri.", "Sat."],
      };
      var d = date === undefined || date === null || date.length === 0 ? new Date() : new Date(date);
      return weekName[language ?? "tw"][d.getDay()];
    };
    // Any Date => The weeks in Month
    this.weeksInMonth = function (date, language) {
      var d = date === undefined || date === null || date == "" ? new Date() : new Date(date);
      var numName = {
        en: [1, 2, 3, 4, 5, 6],
        tw: ["一", "二", "三", "四", "五", "六"],
      };
      var weekofMonth = Math.ceil((d.getDate() - 1 - d.getDay()) / 7);
      return numName[language ?? "en"][weekofMonth];
    };
    // Any Time => hh:mm, apm為 AM/PM
    this.formatTime = function (time, apm) {
      var d = time ? new Date(time) : new Date(),
        hour = d.getHours(),
        min = "" + d.getMinutes(),
        meridiem = hour < 12 ? " AM" : " PM";

      if (hour.length < 2) hour = "0" + hour;
      if (min.length < 2) min = "0" + min;
      var result = [hour, min].join(":");
      apm && (result += meridiem);

      return result;
    };
    // Any Date => day of the week(frmo Saturday to Sunday), format 為允許使用 formatDate 規則輸出
    this.getThatWeek = function (date, format) {
      var d = date ? new Date(date) : new Date(),
        w = [0, 1, 2, 3, 4, 5, 6];
      w.forEach(
        (index) =>
          (w[index] = format
            ? this.formatDate(d.setDate(d.getDate() - (d.getDay() - index), "/"))
            : d.setDate(d.getDate() - (d.getDay() - index)))
      );
      return w;
    };
    // Add Days, format 為允許使用 formatDate 規則輸出
    this.addDays = function (date, days, format) {
      var ta = new Date(date);
      ta.setDate(new Date(date).getDate() + days);
      return format ? this.formatDate(ta) : ta;
    };
    // Month name array Ver.EN
    this.monthEN = function () {
      return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    };
    // Month name array Ver.TW
    this.monthTW = function () {
      return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    };
    // Week name array Ver.EN
    this.weekEN = function () {
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    };
    // Week name array Ver.TW
    this.weekTW = function () {
      return ["週一", "週二", "週三", "週四", "週五", "週六", "週日"];
    };

    /* ============================= Form  ============================= */
    // 表格填入
    this.getValue = (e, f) => f.map((n) => n.id === $(e).get(0).id && (n.value = $(e).val()));
    // 表單驗證
    this.runValid = (f) => {
      var res = f.find((n) => (n.value === "" || n.value === undefined || n.value === null) && n.need);
      if (res) {
        Swal.fire({ icon: "warning", title: `請輸入${res.title}`, confirmButtonText: glitter.share.language.confirm });
      } else {
        Swal.fire({
          padding: "15px",
          title: "確定要送出此訊息？",
          showCancelButton: true,
          confirmButtonText: glitter.share.language.confirm,
          cancelButtonText: glitter.share.language.cancel,
        }).then((result) => result.isConfirmed && Swal.fire("已送出！", "", "success"));
      }
    };
    // 表格 輕量化版本
    this.lightForm = function (obj, attr) {
      attr = attr ?? false;
      var type = { email: "email", phone: "number" };
      var form = /*html*/ `
        <div ${attr.div ?? ``}>
          ${glitter.print(function () {
            var tmp = "";
            obj.map((l) => {
              switch (l.id) {
                case "message":
                  tmp += /*html*/ ` <div class="form-group mb-3">
                    <textarea
                      ${attr.textarea ?? ``}
                      name="message"
                      id="message"
                      cols="30"
                      rows="5"
                      placeholder="${glitter.share.language.messageHint}"
                      onblur="${event((e) => funnel.getValue(e, obj))}"
                    ></textarea>
                  </div>`;
                  break;
                default:
                  tmp += /*html*/ `
                    <div class="form-group mb-3">
                      <input
                        ${attr.input}
                        name="${l.id}"
                        id="${l.id}"
                        type="${type[l.id] ?? "text"}"
                        placeholder="${glitter.share.language[`${l.id}Hint`] ?? l.title}"
                        onblur="${event((e) => funnel.getValue(e, obj))}"
                      />
                    </div>
                  `;
                  break;
              }
            });
            return tmp;
          })}

          <div class="text-center text-md-right mt-3">
            <button ${attr.btn} onclick="${event(() => funnel.runValid(obj))}">${glitter.share.language.sendMessage}</button>
          </div>
        </div>
      `;
      return form;
    };
    // 表格 全方面版本
    this.generateForm = function (data, child, window) {
      var event = window.event;
      var bindView = window.bindView;
      var html = "";
      data.map(function (data, index) {
        switch (data.elem) {
          case "selected":
            if (!child) {
              html += /*html*/ `<div class="mt-2 w-100 ">
                <label for="billing-first-name" class="form-label">
                  ${data.need ? `<span style="color: red;font-size: 14px;font-weight: 200;">*</span>` : ``} ${data.name}
                </label>
              </div>`;
            }
            html += /*html*/ `<div class="w-100" style="height: auto;" id="${index}">
              ${bindView({
                bind: `${index}`,
                view: function () {
                  var html = "";
                  data.option.map(function (data2, index2) {
                    html += /*html*/ `<div class="form-check mt-0 me-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="${index}_${index2}"
                        onchange="${event(function (e) {
                          if ($(e).get(0).checked) {
                            data.option.map((data) => (data.checked = false));
                            data.value = data2.title;
                            data2.checked = true;
                          } else {
                            data.value = undefined;
                            data2.checked = false;
                          }
                          window.notifyDataChange(`${index}`);
                        })}"
                        ${data2.checked ? `checked` : ``}
                        readonly
                      />
                      <label for="${index}_${index2}" style="font-size: 16px;font-weight: 400;"> ${data2.name} </label>
                    </div>`;
                  });
                  return html;
                },
              })}
            </div>`;

            break;
          case "checked":
            if (!child) {
              html += /*html*/ `<div class="mt-2 w-100">
                <label for="billing-first-name" class="form-label">
                  ${data.need ? `<span style="color: red;font-size: 14px;font-weight: 200;">*</span>` : ``} ${data.name}
                </label>
              </div>`;
            }

            html += /*html*/ `<div id="${index}" class="w-100">
              ${bindView({
                bind: `${index}`,
                view: function () {
                  var html = "";
                  Object.keys(data.option).map(function (d3, index2) {
                    var data2 = data.option[d3];
                    html += /*html*/ `
                      <div class="form-check mt-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="${index}${index2}"
                          onchange="${event(function (e) {
                            if (data.type === "single") Object.keys(data.option).map((d4) => (data.option[d4].checked = false));
                            data2.checked = $(e).get(0).checked;
                            window.notifyDataChange(`${index}`);
                          })}"
                          ${data2.checked ? `checked` : ``}
                          ${data2.readonly ? `disabled` : ``}
                        />
                        <label for="${index}${index2}" style="font-size: 16px;font-weight: 400;"> ${data2.name} </label>
                        ${data2.checked ? framework.generateForm([data2], true, window) : ""}
                      </div>
                    `;
                  });
                  return html;
                },
              })}
            </div>`;

            break;
          case "input":
            var textFilter = event((e) => data.type === "number" && $(e).val(glitter.filterNumber($(e).val())));
            var textClick = event(function (e) {
              if (data.type === "date") {
                glitter.openDiaLog("publicResource/dialog/Dia_Date_Picker.html", "Dia_Date_Picker", false, false, {
                  callback: function (text) {
                    data.value = text.substring(0, 10);
                    $(e).val(data.value);
                  },
                  data: {
                    date: true,
                    time: false,
                    nowButton: false,
                    clearButton: false,
                    format: "YYYY/MM/DD",
                    lang: "zh-cn",
                  },
                });
              }
            });
            var theValue = function () {
              if (data.type === "date") {
                return data.value ? data.value.substring(0, 10) : "";
              } else {
                return data.value ?? "";
              }
            };
            if (child) {
              html += /*html*/ `<div class="mt-0 w-100">
                <input
                  class="form-control"
                  type="${data.type !== undefined && data.type !== "date" ? data.type : "text"}"
                  placeholder="請輸入${data.name}"
                  id="billing-first-name"
                  oninput="${textFilter}"
                  onchange="${event((e) => (data.value = $(e).val()))}"
                  onclick="${textClick}"
                  value="${theValue()}"
                  ${data.readonly ? `readonly` : ``}
                />
              </div>`;
            } else {
              html += /*html*/ ` <div class="mt-2 w-100">
                <label for="billing-first-name" class="form-label">
                  ${data.need ? `<span style="color: red;font-size: 16px;font-weight: 300;">*</span>` : ``} ${data.name}</label
                >
                <div class="input-group input-group-merge">
                  <input
                    class="form-control"
                    type="${data.type !== undefined && data.type !== "date" && !data.visible ? data.type : "text"}"
                    placeholder="${data.placeHolder ?? `請輸入${data.name}`}"
                    id="billing-first-name"
                    oninput="${textFilter}"
                    onchange="${event((e) => (data.value = $(e).val()))}"
                    onclick="${textClick}"
                    value="${theValue()}"
                    ${data.readonly ? `readonly` : ``}
                  />
                  ${glitter.print(function () {
                    if (data.type === "password") {
                      return /*html*/ ` <div
                        class="input-group-text "
                        data-password="false"
                        onclick="
                      ${event(function () {
                        data.visible = !data.visible;
                        window.notifyDataChange(`formView`);
                      })}
                      "
                      >
                        <span class="password-eye"></span>
                      </div>`;
                    } else {
                      return ``;
                    }
                  })}
                </div>
              </div>`;
            }

            break;
          case "textArea":
            html += /*html*/ `
              <div class="mt-2 w-100">
                <label for="billing-first-name" class="form-label">${data.name}</label>
                <textarea
                  class="form-control border rounded"
                  id="${data.id}"
                  rows="1"
                  style="max-height:100px;line-height: 25px; font-size: 15px; border: none; margin: 0; font-weight: 400; "
                  placeholder="請輸入${data.name}"
                  onchange="${event((e) => (data.value = $(e).val().replace(/"/g, '\\"')))}"
                >
${data.value ?? ""}</textarea
                >
              </div>
            `;
            break;
          case "tool":
            html += /*html*/ `
              <div class="mt-2 w-100">
                <label for="billing-first-name" class="form-label">${data.name}</label>
              </div>
            `;
            data.value.map(function (data2, index) {
              html += /*html*/ `<div
                  class="d-flex align-items-center justify-content-evenly"
                  style="width: 100%;height: 50px;margin-top: 10px;"
                >
                  <div
                    class="d-flex align-items-center justify-content-center"
                    style="width: 30px;height: 30px;margin-left: 0px;margin-right: 10px;"
                    onclick="${event(function () {
                      data.value.splice(index, 1);
                      window.notifyDataChange("formView");
                    })}"
                  >
                    <i class="fad fa-minus-circle" style="color: red;font-size: 20px;"></i>
                  </div>
                  <div style="width: 100%;height: 100%;" class="d-flex align-items-center">
                    <input
                      class="form-control"
                      type="text"
                      style="width: calc(100% - 40px);margin-left: 10px;"
                      placeholder="請輸入加價內容"
                      onchange="${event((e) => (data2.title = $(e).val()))}"
                      value="${data2.title ?? ""}"
                    />
                    <div
                      class="align-items-center justify-content-center d-flex"
                      style="margin-left:10px;word-break:break-all;white-space:nowrap;width: auto;padding-left:10px;padding-right:10px;border: 1px solid #76b82a;display: flex;height: 35px;color: #76b82a;"
                      onclick="${event(function () {
                        glitter.chooseImage(function (data) {
                          var img = [];
                          data.map((da) => img.push(da.data));
                          glitter.share.dia.dataLoading(true);
                          glitter.api.uploadImg(img, function (response) {
                            glitter.share.dia.dataLoading(false);
                            if (response !== undefined && response.result) {
                              data2.image = response.url[0];
                              window.notifyDataChange("formView");
                            }
                          });
                        });
                      })}"
                      id="frontImg${index}"
                    >
                      ${bindView({
                        bind: `frontImg${index}`,
                        view: function () {
                          if (data2.image) {
                            return /*html*/ `<i class="fal fa-redo" style="margin-right: 5px;"></i> 換一張`;
                          } else {
                            return /*html*/ `<i class="fal fa-upload" style="margin-right: 5px;"></i> 上傳正面`;
                          }
                        },
                      })}
                    </div>
                  </div>
                </div>
                <div style="width: 100%;" class="d-flex justify-content-start">
                  <span style="color: red;font-size: 16px;font-weight: 400;width: 50px;height: 30px;" class="d-flex align-items-center "
                    >費用</span
                  >
                  <input
                    type="number"
                    placeholder="請輸入費用"
                    class="form-control"
                    style="margin-top: 0;max-width: 100%;height: 30px;width: 150px;"
                    onchange="${event((e) => (data2.price = $(e).val()))}"
                    value="${data2.price ?? ""}"
                    onkeyup="${event(function (e) {
                      var val = $(e).val();
                      val = val.replace(/[^0-9]/gi, "");
                      $(e).val(val);
                    })}"
                  />
                </div>
                <div style="width: 100%;margin-top:10px;margin-bottom: 10px;" class="d-flex justify-content-start">
                  <span
                    style="color: darkcyan;font-size: 16px;font-weight: 400;width: 50px;height: 30px;"
                    class="d-flex align-items-center "
                    >說明</span
                  >
                  <div
                    contenteditable="true"
                    class="borderInputMax rounded-2 border"
                    role="textbox"
                    id="textArea"
                    style="flex:auto;width:100%;outline: none; user-select: text; white-space: pre-wrap; overflow-wrap: break-word;min-height: 200px;"
                    onblur="${event((e) => (data2.about = $(e).html()))}"
                  >
                    ${data2.about ?? ""}
                  </div>
                </div>`;
            });
            html += /*html*/ `<div
              class="align-items-center justify-content-center d-flex"
              style="font-size:15px;width: calc(100%);border: 1px solid #76b82a;display: flex;height: 40px;color: #76b82a;"
              onclick="
            ${event(function () {
              data.value.push({});
              window.notifyDataChange(`formView`);
            })}
            "
              id="backImg"
            >
              添加工具
            </div>`;
        }
      });
      return html;
    };

    /* ============================= Funnel  =========================== */
    // 透過 URL 產生自定義/預設的 Icon
    this.urlIcon = function (url, list) {
      var sw = { object: list, string: iconLibrary[list], undefined: iconLibrary.fab };
      var l = sw[typeof list];
      return l[Object.keys(l).find((a) => url.includes(a)) ?? "link"];
    };
    // 判斷是法為正確的 URL
    this.isURL = function (str_url) {
      var strRegex =
        "^((https|http|ftp|rtsp|mms)?://)" +
        "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
        "(([0-9]{1,3}.){3}[0-9]{1,3}" + // IP形式的URL- 199.194.52.184
        "|" + // 允許IP和DOMAIN（域名）
        "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
        "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + // 二級域名
        "[a-z]{2,6})" + // first level domain- .com or .museum
        "(:[0-9]{1,4})?" + // 端口- :80
        "((/?)|" + // a slash isn't required if there is no file name
        "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
      var re = new RegExp(strRegex);
      return re.test(str_url);
    };
    // Add Quantile
    this.addQuantile = function (num) {
      if (typeof num !== "number") return num;
      var result = [];
      num
        .toString()
        .split("")
        .reverse()
        .map((n, i) => {
          result.splice(0, 0, n);
          i % 3 == 2 && i != num.toString().length - 1 && result.splice(0, 0, ",");
        });
      return result.join("");
    };
    // Original HTML 引入的 script 輸出成 addMtScript 使用的陣列
    this.scriptSplit = function (sc) {
      var a = [];
      sc.split('<script src="').map((f, i) => i && a.push(f.split('"></script>')[0]));
      return console.log(a);
    };
    // 公司版權聲明
    this.copyRight = function (color) {
      return /*html*/ `Copyright &copy; ${new Date().getFullYear()}
        <a href="https://squarestudio.tw" target="_blank" rel="noreferrer noopener" style="cursor:pointer;color:${color ? color : `ivory`}"
          >Lion Design</a
        >
        All Rights Reserved.`;
    };
    /* 
    ================ hyperLink function ================
    findData: 傳遞 Section Page 挑選後的某項資料，格式為 { path: ["", ""], key: "", value: "" }
    pickData: 傳遞想傳遞的資料，在 index.html 的路由中被引入，成為 constructor 的 k 值
    ===============================================
    */
    this.hyperLink = function (link, findData, pickData) {
      if (Array.isArray(link)) {
        /* ========= 取得Section，並跳轉頁面 ========= */
        glitter.changePage(`page/plugin/${glitter.share.homePageData.modal}/index.html`, link[0], true, {
          page: link,
          data: glitter.api.getData(link, findData),
          pick: pickData,
        });
      } else if (funnel.isURL(link)) {
        /* ========= 取得外部URL，並新開頁面 ========= */
        window.open(link, "_blank");
      } else if (typeof link === "string" && link.includes("#")) {
        /* ========= 頁內跳轉 1 ========= */
        // document.getElementById().scrollIntoView({
        //   behavior: "smooth",
        //   block: "start",
        //   inline: "center",
        // });
        /* ========= 頁內跳轉 2 ========= */
        var yOffset = $("header").length > 0 ? -$("header").height() : 0;
        var element = document.getElementById(link.replace("#", ""));
        var y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      } else {
        /* ========= 錯誤 ========= */
        console.error("funnel.hyperLink is not work");
        return;
      }
    };
  }
}

const iconLibrary = {
  fab: {
    facebook: "fab fa-facebook-f",
    instagram: "fab fa-instagram",
    twitter: "fab fa-twitter",
    linkedin: "fab fa-linkedin-in",
    youtube: "fab fa-youtube",
    line: "fab fa-line",
    link: "fas fa-link",
  },
  fa: {
    facebook: "fa fa-facebook",
    instagram: "fa fa-instagram",
    pinterest: "fa fa-pinterest-p",
    link: "fa fa-link",
  },
  bx: {
    twitter: "bx bxl-twitter",
    facebook: "bx bxl-facebook",
    instagram: "bx bxl-instagram",
    skype: "bx bxl-skype",
    linkedin: "bx bxl-linkedin",
    link: "bx bx-link-alt",
  },
  ion: {
    facebook: "ion-social-facebook",
    instagram: "ion-social-instagram-outline",
    twitter: "ion-social-twitter",
    linkedin: "ion-social-linkedin",
    youtube: "ion-social-youtube",
    github: "ion-social-github",
    googleplus: "ion-social-googleplus",
    link: "ion-link",
  },
  ti: {
    facebook: "ti-facebook",
    twitter: "ti-twitter-alt",
    instagram: "ti-instagram",
    link: "ti-link",
  },
  bi: {
    facebook: "bi bi-facebook",
    twitter: "bi bi-twitter",
    instagram: "bi bi-instagram",
    linkedin: "bi bi-linkedin",
    link: "bi bi-link-45deg",
  },
};

var funnel = new FunnelHTML();
