var public = {
  threeDot: function () {
    return /*html*/ `
      <div class="dropdown float-end">
        <a href="#" class="dropdown-toggle arrow-none card-drop p-0" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="mdi mdi-dots-vertical"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <a href="javascript:void(0);" class="dropdown-item">${glitter.share.language.refresh}</a>
          <a href="javascript:void(0);" class="dropdown-item">${glitter.share.language.export}</a>
        </div>
      </div>
    `;
  },
  exportButton: function () {
    return /*html*/ `<a class="p-0 float-end">${glitter.share.language.export} <i class="mdi mdi-download ms-1"></i></a>`;
  },
  fastSpan: function (card) {
    var ud = "";
    var printObj = {
      up: `<span class="text-success me-2"><span class="mdi mdi-arrow-up-bold"></span> ${card.up}</span>`,
      down: `<span class="text-danger me-2"><span class="mdi mdi-arrow-down-bold"></span> ${card.down}</span>`,
      desc: `<span class="text-nowrap">${card.desc}</span>`,
    };
    Object.keys(printObj).map((p) => card[p] && (ud += printObj[p]));
    return ud;
  },
  rc: {},
  renderChart: function (index, option) {
    this.rc[index] = setInterval(() => {
      if (document.querySelector(`#chart${index}`) !== undefined) {
        new ApexCharts(document.querySelector(`#chart${index}`), option).render(), clearInterval(this.rc[index]);
      } else {
        glitter.deBugMessage(`讀取chart${index}中`);
      }
    }, 1000);
  },
  respChart: function (r, a, e, n) {
    var i = r.get(0).getContext("2d"),
      s = r.parent();
    return (function () {
      var t;
      switch ((r.attr("width", s.width()), a)) {
        case "Line":
          t = new Chart(i, { type: "line", data: e, options: n });
          break;
        case "Bar":
          t = new Chart(i, { type: "bar", data: e, options: n });
          break;
        case "Doughnut":
          t = new Chart(i, { type: "doughnut", data: e, options: n });
      }
      return t;
    })();
  },
};

var fake = {
  stockLine: function (count, day) {
    count > 10 && (count = 10), day > 20 && (day = 20);
    var data = [];
    ["NAS", "AAPL", "TSM", "AMD", "UMC", "ASX", "KLIC", "INTC", "HPQ", "BBY"].map((n, i) => {
      if (i < count) {
        var detail = { name: n, data: [] };
        [...Array(day)].map((d, index) => {
          detail.data.push({ x: funnel.addDays(new Date(), index), y: (Math.random() * 90 + 10).toFixed(1) });
        });
        data.push(detail);
      }
    });
    return data;
  },
  numberObjList: function (e, k) {
    for (var t = [], a = 0; a < e; a++) t.push({ x: `${k ?? "Data"} ${a}`, y: (Math.random() * 90 + 10).toFixed(0) });
    return t;
  },
  numberList: function (e) {
    for (var t = [], a = 0; a < e; a++) t.push((Math.random() * 90 + 10).toFixed(0));
    return t;
  },
};

var framework = {
  // Card
  colCard: function (d) {
    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        ${glitter.print(function () {
          var HTML = "";
          d.card.map((card) => {
            HTML += /*html*/ `
              <div class="card tilebox-one">
                <div class="card-body">
                  <i class="${card.icon} float-end"></i>
                  <h5 class="text-uppercase mt-0">${card.title}</h5>
                  <h2 class="my-2 pt-1">${funnel.addQuantile(card.value)}</h2>
                  <p class="mb-0 text-muted">${public.fastSpan(card)}</p>
                </div>
                <!-- end card-body-->
              </div>
            `;
          });
          return HTML;
        })}
      </div>
    `;
  },
  dataCard: function (d, i) {
    d.card.map((c, index) => {
      if (c.type) {
        var options = {};
        colors = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"];
        if (c.type === "bar") {
          options = {
            chart: { type: "bar", height: 60, sparkline: { enabled: !0 } },
            plotOptions: { bar: { columnWidth: "60%" } },
            colors: [c.data.color],
            series: [{ data: c.data.series }],
            labels: [...Array(c.data.series.length)].map((x, ind) => ind + 1),
            xaxis: { crosshairs: { width: 1 } },
            tooltip: {
              fixed: { enabled: !1 },
              x: { show: !1 },
              y: {
                title: {
                  formatter: function (o) {
                    return "";
                  },
                },
              },
              marker: { show: !1 },
            },
          };
        } else if (c.type === "line") {
          options = {
            chart: { type: "line", height: 60, sparkline: { enabled: !0 } },
            series: [{ data: c.data.series }],
            stroke: { width: 2, curve: "smooth" },
            markers: { size: 0 },
            colors: [c.data.color],
            tooltip: {
              fixed: { enabled: !1 },
              x: { show: !1 },
              y: {
                title: {
                  formatter: function (o) {
                    return "";
                  },
                },
              },
              marker: { show: !1 },
            },
          };
        }
        public.renderChart(`${i}_${index}`, options);
      }
    });

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="row">
          ${glitter.print(function () {
            var HTML = "";
            d.card.map((card, index) => {
              HTML += /*html*/ `
                <div class="col-xl-${card.col.pc} col-lg-${card.col.tab}">
                  <div class="card">
                    <div class="card-body">
                      ${
                        card.icon
                          ? /*html*/ `
                            <div class="float-end">
                              <i class="${card.icon.name} widget-icon bg-${card.icon.color}-lighten text-${card.icon.color}"></i>
                            </div>
                            <h5 class="text-muted fw-normal mt-0" title="${card.title}">${card.title}</h5>
                            <h3 class="mt-3 mb-3">${funnel.addQuantile(card.value)}</h3>
                            <p class="mb-0 text-muted">${public.fastSpan(card)}</p>
                          `
                          : /*html*/ `
                            <div class="row align-items-center">
                              <div class="col-6">
                                <h5 class="text-muted fw-normal mt-0 text-truncate" title="${card.title}">${card.title}</h5>
                                <h3 class="my-2 py-1">${funnel.addQuantile(card.value)}</h3>
                                <p class="mb-0 text-muted">${public.fastSpan(card)}</p>
                              </div>
                              <div class="col-6">
                                <div class="text-end">
                                  <div id="chart${i}_${index}"></div>
                                </div>
                              </div>
                            </div>
                          `
                      }
                    </div>
                    <!-- end card-body -->
                  </div>
                  <!-- end card -->
                </div>
                <!-- end col -->
              `;
            });
            return HTML;
          })}
        </div>
      </div>
    `;
  },
  rowCard: function (d) {
    return /*html*/ `
      <div class="col-12">
        <div class="card widget-inline">
          <div class="card-body p-0">
            <div class="row g-0">
              ${glitter.print(function () {
                var HTML = "";
                d.card.map((c) => {
                  HTML += /*html*/ `
                    <div class="col-sm-4 ${d.card.length > 8 ? `col-lg-2` : `col-lg`}">
                      <div class="card shadow-none m-0">
                        <div class="card-body text-center">
                          <i class="${c.icon} text-muted" style="font-size: 24px;"></i>
                          <h3><span>${c.value}</span></h3>
                          <p class="text-muted font-15 mb-0">${c.name}</p>
                        </div>
                      </div>
                    </div>
                  `;
                });
                return HTML;
              })}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Table
  table: function (d) {
    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.exportButton()}
            <h4 class="header-title mt-1 mb-3">${d.title}</h4>
            <div class="table-responsive" style="max-height:480px">${funnel.table(d.table, d.stripe, d.hideHead)}</div>
          </div>
        </div>
      </div>
    `;
  },
  table_barChart: function (d, i) {
    var options = {
      chart: { height: 150, type: "bar", stacked: !0, toolbar: { show: !1 }, zoom: { enabled: !1 } },
      plotOptions: { bar: { horizontal: !1, endingShape: "rounded", columnWidth: "22%", dataLabels: { position: "top" } } },
      dataLabels: { enabled: !0, offsetY: -24, style: { fontSize: "12px", colors: ["#98a6ad"] } },
      series: d.data.series,
      colors: d.data.color,
      xaxis: { categories: [], labels: { show: !1 }, axisTicks: { show: !1 }, axisBorder: { show: !1 } },
      yaxis: { labels: { show: !1 } },
      fill: {
        type: "gradient",
        gradient: {
          inverseColors: !0,
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: void 0,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
    };

    public.renderChart(i, options);

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title">${d.title}</h4>
            <div id="chart${i}"></div>
            <div class="table-responsive">${funnel.table(d.table)}</div>
          </div>
        </div>
      </div>
    `;
  },

  // World Map
  worldMap_barChart: function (d, i) {
    // var options = {};
    // public.renderChart(i,options);

    return /*html*/ `
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title">${d.title}</h4>

            <div class="row">
              <div class="col-lg-8">
                <div id="world-map-markers" class="mt-3 mb-3" style="height: 300px"></div>
              </div>
              <div class="col-lg-4" dir="ltr">
                <div id="chart${i}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  worldMap_process: function (d, i) {
    return /*html*/ `
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title">${d.title}</h4>
            <div class="mb-4 mt-4">
              <div id="world-map-markers" style="height: 224px"></div>
            </div>

            ${glitter.print(function () {
              var HTML = "";
              d.process.map((p) => {
                HTML += /*html*/ `
                  <h5 class="mb-1 mt-0 fw-normal">${p.name}</h5>
                  <div class="progress-w-percent">
                    <span class="progress-value fw-bold w-25">${p.value} </span>
                    <div class="progress progress-sm w-75">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: ${p.percent.toFixed(0)}%; background-color:${p.color}"
                        aria-valuenow="${p.percent.toFixed(0)}"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                `;
              });
              return HTML;
            })}
          </div>
          <!-- end card-body-->
        </div>
        <!-- end card-->
      </div>
      <!-- end col-->
    `;
  },

  // Line Chart
  smooth_Line: function (d, i) {
    var options = {
      series: d.data.series,
      xaxis: { type: "datetime" },
      yaxis: { labels: { formatter: (val) => val.toFixed(1) } },
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: { type: "x", enabled: true, autoScaleYaxis: true },
        toolbar: { autoSelected: "zoom" },
      },
      dataLabels: { enabled: false },
      markers: { size: 0 },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      tooltip: { shared: false },
    };

    public.renderChart(i, options);

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card card-h-100">
          <div class="card-body">
            <h4 class="header-title mt-3 mb-3">${d.title}</h4>
            <div id="chart${i}"></div>
          </div>
        </div>
      </div>
    `;
  },
  revenue: function (d, i) {
    var options = {
      chart: { height: 321, type: "line", toolbar: { show: !1 } },
      stroke: { curve: "smooth", width: 2 },
      series: d.data.series,
      fill: { type: "solid", opacity: [0.35, 1] },
      labels: d.data.labels,
      markers: { size: 0 },
      colors: d.data.color,
      yaxis: [{ title: { text: d.data.yaxis.title }, min: 0 }],
      tooltip: {
        shared: !0,
        intersect: !1,
        y: {
          formatter: function (o) {
            return void 0 !== o ? o.toFixed(0) + "k" : o;
          },
        },
      },
      grid: { borderColor: "#f1f3fa", padding: { bottom: 5 } },
      legend: { fontSize: "14px", fontFamily: "14px", offsetY: 5 },
      responsive: [{ breakpoint: 600, options: { yaxis: { show: !1 }, legend: { show: !1 } } }],
    };

    public.renderChart(i, options);

    return /*html*/ `
      <div class="col-lg-${d.col.pc}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}

            <h4 class="header-title mb-3">${d.title}</h4>

            <div class="chart-content-bg">
              <div class="row text-center">
                ${glitter.print(function () {
                  var HTML = "";
                  d.detail.map((de) => {
                    HTML += /*html*/ `
                      <div class="col-md-6">
                        <p class="text-muted mb-0 mt-3">${de.name}</p>
                        <h2 class="fw-normal mb-3">
                          <span>$${funnel.addQuantile(de.value)}</span>
                        </h2>
                      </div>
                    `;
                  });
                  return HTML;
                })}
              </div>
            </div>

            <div dir="ltr">
              <div id="chart${i}"></div>
            </div>
          </div>
          <!-- end card body-->
        </div>
      </div>
    `;
  },
  revenue_detail: function (d, i) {
    var options = {
      chart: { height: 364, type: "line", dropShadow: { enabled: !0, opacity: 0.2, blur: 7, left: -7, top: 7 }, toolbar: !1 },
      dataLabels: { enabled: !1 },
      stroke: { curve: "smooth", width: 4 },
      series: d.data.series,
      colors: d.data.color,
      zoom: { enabled: !1 },
      legend: { show: !1 },
      xaxis: {
        type: "string",
        categories: funnel.weekTW(),
        tooltip: { enabled: !1 },
        axisBorder: { show: !1 },
      },
      yaxis: {
        labels: {
          formatter: function (e) {
            return e + "k";
          },
          offsetX: -15,
        },
      },
    };

    public.renderChart(i, options);

    return /*html*/ `
      <div class="col-lg-${d.col.pc}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title mb-3">${d.title}</h4>

            <div class="chart-content-bg">
              <div class="row text-center">
                ${glitter.print(function () {
                  var HTML = "";
                  d.detail.map((de) => {
                    HTML += /*html*/ `
                      <div class="col-md-6">
                        <p class="text-muted mb-0 mt-3">${de.name}</p>
                        <h2 class="fw-normal mb-3">
                          <small class="mdi mdi-checkbox-blank-circle text-${de.dot} align-middle me-1"></small>
                          <span>$${funnel.addQuantile(de.value)}</span>
                        </h2>
                      </div>
                    `;
                  });
                  return HTML;
                })}
              </div>
            </div>

            <div class="dash-item-overlay d-none d-md-block mb-2" dir="ltr">
              <h5>${d.board.title}</h5>
              <p class="text-muted font-13 mb-3 mt-2">${d.board.desc}</p>
            </div>

            <div dir="ltr">
              <div id="chart${i}"></div>
            </div>
          </div>
          <!-- end card-body-->
        </div>
        <!-- end card-->
      </div>
      <!-- end col-->
    `;
  },

  // Bar Chart
  doubleBarChart: function (d, i) {
    var options = {
      chart: { height: 257, type: "bar", stacked: !0, toolbar: { show: !1 } },
      plotOptions: { bar: { horizontal: !1, columnWidth: "20%" } },
      dataLabels: { enabled: !1 },
      stroke: { show: !0, width: 2, colors: ["transparent"] },
      series: d.data.series,
      zoom: { enabled: !1 },
      legend: { show: !1 },
      colors: d.data.color,
      xaxis: { categories: funnel.monthTW(), axisBorder: { show: !1 } },
      yaxis: {
        labels: {
          formatter: function (e) {
            return e + "k";
          },
          offsetX: -15,
        },
      },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: function (e) {
            return "$" + e + "k";
          },
        },
      },
    };

    public.renderChart(i, options);

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card card-h-100">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title mb-3">${d.title}</h4>

            <div dir="ltr">
              <div id="chart${i}"></div>
            </div>
          </div>
          <!-- end card-body-->
        </div>
        <!-- end card-->
      </div>
    `;
  },
  barArea: function (d, i) {
    var options = {
      labels: d.data.labels,
      datasets: [
        {
          label: d.data.name,
          backgroundColor: d.data.color || "#727cf5",
          borderColor: d.data.color || "#727cf5",
          data: d.data.series,
        },
      ],
    };

    setTimeout(() => {
      public.respChart($(`#chart${i}`), "Bar", options, {
        maintainAspectRatio: !1,
        legend: { display: !1 },
        tooltips: { intersect: !1 },
        hover: { intersect: !0 },
        plugins: { filler: { propagate: !1 } },
        scales: {
          xAxes: [{ barPercentage: 0.7, categoryPercentage: 0.5, reverse: !0, gridLines: { color: "rgba(0,0,0,0.05)" } }],
          yAxes: [
            {
              ticks: { stepSize: 10, display: !1 },
              min: 10,
              max: 100,
              display: !0,
              borderDash: [5, 5],
              gridLines: { color: "rgba(0,0,0,0)", fontColor: "#fff" },
            },
          ],
        },
      });
    }, 500);

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title mb-4">${d.title}</h4>

            <div dir="ltr">
              <div class="mt-3 chartjs-chart" style="height: 320px">
                <canvas id="chart${i}"></canvas>
              </div>
            </div>
          </div>
          <!-- end card body-->
        </div>
        <!-- end card -->
      </div>
    `;
  },

  // Donut & radial
  radial: function (d, i) {
    var options = {
      chart: { height: 304, type: "radialBar" },
      colors: [...Array(d.data.length)].map((x, i) => d.data[i].color),
      series: [...Array(d.data.length)].map((x, i) => d.data[i].series),
      labels: [...Array(d.data.length)].map((x, i) => d.data[i].labels),
      plotOptions: { radialBar: { track: { margin: 8 } } },
    };

    public.renderChart(i, options);

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}

            <h4 class="header-title mb-1">${d.title}</h4>

            <div id="chart${i}"></div>

            <div class="row text-center mt-2">
              ${glitter.print(function () {
                var HTML = "";
                d.data.map((r) => {
                  HTML += /*html*/ `
                    <div class="col-md-${d.data.length % 3 == 0 ? 4 : 6} mt-3">
                      <i class="${r.icon} widget-icon rounded-circle bg-light-lighten text-muted"></i>
                      <h3 class="fw-normal mt-2">
                        <span>${funnel.addQuantile(r.value)}</span>
                      </h3>
                      <p class="text-muted mb-0 mb-2"><i class="mdi mdi-checkbox-blank-circle" style="color:${r.color}"></i> ${r.labels}</p>
                    </div>
                  `;
                });
                return HTML;
              })}
            </div>
          </div>
          <!-- end card body-->
        </div>
        <!-- end card -->
      </div>
    `;
  },
  multiRadial: function (d, i) {
    var options = {
      chart: { height: 268, type: "radialBar" },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: { fontSize: "22px" },
            value: { fontSize: "16px" },
            total: {
              show: !0,
              label: d.detail.title,
              formatter: function (e) {
                var total = 0;
                d.detail.data.map((t) => (total += t.value));
                return total;
              },
            },
          },
        },
      },
      colors: d.data.color,
      series: d.data.series,
      labels: d.data.labels,
    };

    public.renderChart(i, options);

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title">${d.title}</h4>

            <div id="chart${i}"></div>

            <div class="row text-center mt-2">
              ${glitter.print(function () {
                var detailHTML = "";
                d.detail.data.map((t) => {
                  detailHTML += /*html*/ `
                    <div class="col-6 mb-2">
                      <h4 class="fw-normal">
                        <span>${t.value}</span>
                      </h4>
                      <p class="text-muted mb-0">${t.name}</p>
                    </div>
                  `;
                });
                return detailHTML;
              })}
            </div>
          </div>
          <!-- end card-body-->
        </div>
        <!-- end card-->
      </div>
    `;
  },
  donutChart: function (d, i) {
    var options = {
      chart: { height: 208, type: "donut" },
      legend: { show: !1 },
      stroke: { colors: ["transparent"] },
      series: d.data.series,
      labels: d.data.labels,
      colors: d.data.color,
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: "bottom" } } }],
    };

    public.renderChart(i, options);

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title">${d.title}</h4>
            <div id="chart${i}" class="d-flex justify-content-center"></div>
            <div class="chart-widget-list">
              ${glitter.print(function () {
                var HTML = "";
                d.data.labels.map((l, i) => {
                  HTML += /*html*/ `
                    <p>
                      <i class="mdi mdi-square" style="color:${d.data.color[i]}"></i> ${l}
                      <span class="float-end">${d.value[i]}</span>
                    </p>
                  `;
                });
                return HTML;
              })}
            </div>
          </div>
          <!-- end card-body-->
        </div>
        <!-- end card-->
      </div>
      <!-- end col-->
    `;
  },
  donutTrend: function (d, i) {
    var options = {
      labels: [...Array(d.trend.length)].map((x, n) => d.trend[n].title),
      datasets: [
        {
          data: [...Array(d.trend.length)].map((x, n) => d.trend[n].value),
          backgroundColor: [...Array(d.trend.length)].map((x, n) => d.trend[n].icon.color),
          borderColor: "transparent",
          borderWidth: "3",
        },
      ],
    };
    setTimeout(() => {
      public.respChart($(`#chart${i}`), "Doughnut", options, {
        maintainAspectRatio: !1,
        cutoutPercentage: 80,
        legend: { display: !1 },
      });
    }, 500);

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title mb-4">${d.title}</h4>

            <div class="my-4 chartjs-chart" style="height: 202px;">
              <canvas id="chart${i}"></canvas>
            </div>

            <div class="row text-center mt-2 py-2">
              ${glitter.print(function () {
                var HTML = "";
                d.trend.map((t) => {
                  HTML += /*html*/ `
                    <div class="col-4">
                      <i class="mdi mdi-trending-${t.icon.state} mt-3 h3" style="color:${t.icon.color};"></i>
                      <h3 class="fw-normal">
                        <span>${t.value}</span>
                      </h3>
                      <p class="text-muted mb-0">${t.title}</p>
                    </div>
                  `;
                });
                return HTML;
              })}
            </div>
            <!-- end card body-->
          </div>
          <!-- end card -->
        </div>
        <!-- end col-->
      </div>
    `;
  },

  // Radar
  radar: function (d, i) {
    var options = {
      chart: { height: 350, type: "radar", toolbar: { show: !1 } },
      series: d.data.series,
      plotOptions: { radar: { size: 150, polygons: { strokeColor: "#e9e9e9", fill: { colors: ["#f8f8f8", "#fff"] } } } },
      colors: [d.data.color],
      xaxis: {
        categories: d.data.labels,
      },
      yaxis: {
        labels: { formatter: (e) => e + "%" },
      },
      dataLabels: { enabled: !0 },
      markers: { size: 4, colors: ["#fff"], strokeColor: d.data.color, strokeWidth: 2 },
    };

    public.renderChart(i, options);

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title">${d.title}</h4>
            <div id="chart${i}"></div>
          </div>
        </div>
      </div>
    `;
  },

  // List
  stateList: function (d) {
    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title mb-4">${d.title}</h4>

            ${glitter.print(function () {
              var HTML = "";
              d.list.map((l) => {
                HTML += /*html*/ `
                  <div class="d-flex align-items-start mt-3">
                    <img class="me-3 rounded-circle" src="${l.img}" width="40" />
                    <div class="w-100 overflow-hidden">
                      <span class="badge badge-${l.state.color}-lighten float-end">${l.state.text}</span>
                      <h5 class="mt-0 mb-1">${l.title}</h5>
                      <span class="font-13">${l.sub}</span>
                    </div>
                  </div>
                `;
              });
              return HTML;
            })}
          </div>
        </div>
      </div>
    `;
  },
  todoList: function (d, i) {
    d.list.map((t) => (t.id = i + "_" + t.id));
    addMtScript(
      ["assets/js/ui/component.todo.js"],
      () => setTimeout(() => todo(d.list, i), 200),
      () => {}
    );

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title mb-2">${d.title}</h4>
            <div class="todoapp">
              <div data-simplebar style="max-height: 400px">
                <ul class="list-group list-group-flush todo-list" id="todo-list${i}"></ul>
              </div>
            </div>
            <!-- end .todoapp-->
          </div>
          <!-- end card-body -->
        </div>
      </div>
    `;
  },
  timeline: function (d, i) {
    setTimeout(() => d.item.map((it, j) => $(`#small${i}_${j}`).append(it.text)), 100);

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title mb-2">${d.title}</h4>

            <div data-simplebar style="max-height: 419px;">
              <div class="timeline-alt pb-0">
                ${glitter.print(function () {
                  var HTML = "";
                  d.item.map((it, j) => {
                    HTML += /*html*/ `
                      <div class="timeline-item">
                        <i class="${it.icon} bg-${it.color}-lighten text-${it.color} timeline-icon"></i>
                        <div class="timeline-item-info">
                          <a href="#" class="text-${it.color} fw-bold mb-1 d-block">${it.title}</a>
                          <small id="small${i}_${j}"></small>
                          <p class="mb-0 pb-2">
                            <small class="text-muted">${it.ago}</small>
                          </p>
                        </div>
                      </div>
                    `;
                  });
                  return HTML;
                })}
              </div>
              <!-- end timeline -->
            </div>
            <!-- end slimscroll -->
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card-->
      </div>
    `;
  },
  taskList: function (d, i) {
    setTimeout(() => $(`#tasklist${i}`).append(`${d.text}`), 100);
    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title mb-3">${d.title}</h4>

            <p id="tasklist${i}"></p>

            <div class="table-responsive" style="max-height:480px">${funnel.table(d.table, d.stripe, d.hideHead)}</div>
            <!-- end table-responsive-->
          </div>
          <!-- end card body-->
        </div>
        <!-- end card -->
      </div>
    `;
  },
  calendarList: function (d, i) {
    var c = {};
    setTimeout(() => ((c = $(`#calendar${i}`)), c.find(".datepicker-days").on("click", () => setTimeout(() => renderList(), 100))), 500);

    function renderList() {
      // 確認有active day的資料 && 輸出正規日期格式
      c.find(".active.day").data() && console.log(funnel.formatDate(c.find(".active.day").data().date));
      // 獲取api更新List (現為假資料)
      d.list = [{ range: "Loading...", event: "取得資料中..." }];
      // 重新渲染cList
      notifyDataChange(`cList${i}`);
    }

    return /*html*/ `
      <div class="col-xl-${d.col.pc} col-lg-${d.col.tab}">
        <div class="card">
          <div class="card-body">
            ${public.threeDot()}
            <h4 class="header-title mb-3">${d.title}</h4>

            <div class="row">
              <div class="col-md-7" id="calendar${i}">
                <div data-provide="datepicker-inline" data-date-today-highlight="true" class="calendar-widget"></div>
              </div>
              <!-- end col-->
              <div class="col-md-5" id="cList${i}">
                ${bindView({
                  bind: `cList${i}`,
                  view: function () {
                    var HTML = `<ul class="list-unstyled">`;
                    (d.list ?? []).map((l) => {
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
  },
};
