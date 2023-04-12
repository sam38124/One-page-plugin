export class CozaHTML {
    sort;
    color;
    quickView;
    constructor() {
        this.sort = function (data) {
            let list = {
                lastest: { sort: "date", asc: false, text: "最新上架" },
                price_low: { sort: "price", asc: true, text: "價格低 → 高" },
                price_high: { sort: "price", asc: false, text: "價格高 → 低" },
            };
            return `
        <li>
          <button
            class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 text-secondary"
            data-sort-by="${list[data].sort}"
            data-sort-ascend="${list[data].asc}"
          >
            ${list[data].text}
          </button>
        </li>
      `;
        };
        this.color = function (data) {
            return ` <li class="p-b-6">
        <span class="fs-15 lh-12 m-r-6" style="color: ${data.code}">
          <i class="zmdi zmdi-circle"></i>
        </span>
        <button class="filter-link stext-106 trans-04 text-secondary" data-filter=".${data.code.replace("#", "")}">${data.name}</button>
      </li>`;
        };
        this.quickView = function (data) {
            return `
        <div class="col-md-6 col-lg-7 p-b-30">
          <div class="p-l-25 p-r-30 p-lr-0-lg">
            <div class="wrap-slick3 flex-sb flex-w">
              <div class="wrap-slick3-dots"></div>
              <div class="wrap-slick3-arrows flex-sb-m flex-w"></div>
              <div class="d-none img-selected" data-img="${data.img}"></div>
              <div class="slick3 gallery-lb">
                ${(() => {
                let tmp = "";
                let slickimg = data.img_detail && data.img_detail.length !== 0 ? data.img_detail : [data.img];
                slickimg.map((g) => {
                    tmp += `
                          <div class="item-slick3" data-thumb="${g}">
                            <div class="wrap-pic-w pos-relative">
                              <img src="${g}" alt="IMG-PRODUCT" />
                              <a class="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04" href="${g}">
                                <i class="fa fa-expand"></i>
                              </a>
                            </div>
                          </div>
                        `;
                });
                return tmp;
            })()}
                
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-5 p-b-30">
          <div class="p-r-50 p-t-5 p-lr-0-lg">
            <a class="dataID d-none">${data.id}</a>
            <h4 class="mtext-105 cl2 js-name-detail p-b-14">${data.name}</h4>
            <span class="mtext-106 cl2 price-selected" data-price="${data.price}"> $${data.price.toLocaleString()}</a></span>
            <p class="stext-102 cl3 p-t-23">${data.desc ?? ``}</p>

            <div class="p-t-33">
              ${data.size && data.size.length != 0
                ? `<div class="flex-w flex-r-m p-b-10">
                      <div class="size-203 flex-c-m respon6">尺寸</div>

                      <div class="size-204 respon6-next">
                        <div class="rs1-select2 bor8 bg0">
                          <select class="js-select2" name="time">
                            ${(() => {
                    let tmp = "";
                    data.size.map((si, i) => {
                        tmp += `<option value="${si}" ${i == 0 ? `selected` : ``}>${si}</option>`;
                    });
                    return tmp;
                })()}
                        
                          </select>
                          <div class="dropDownSelect2"></div>
                        </div>
                      </div>
                    </div>`
                : ``}

              ${data.color && data.color.length != 0
                ? `<div class="flex-w flex-r-m p-b-10">
                      <div class="size-203 flex-c-m respon6">顏色</div>

                      <div class="size-204 respon6-next">
                        <div class="d-inline-flex pt-3 rs1-select2 bg0">
                            ${(() => {
                    let tmp = "";
                    data.color.map((c, i) => {
                        tmp += ` <a
                                            class="size-304 m-r-8 m-b-10 color-select bor2 tooltip100 ${i == 0 ? `color-selected bor20` : ``}"
                                            style="cursor:pointer;background-color:${c}"
                                            data-tooltip="${c}"
                                          >
                                          </a>`;
                    });
                    return tmp;
                })()}
                          
                        </div>
                      </div>
                    </div>`
                : ``}

              <div class="flex-w flex-r-m p-b-10">
                <div class="size-204 flex-w flex-m respon6-next">
                  <div class="wrap-num-product flex-w m-r-20 m-tb-10">
                    <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                      <i class="fs-16 zmdi zmdi-minus"></i>
                    </div>

                    <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1" />

                    <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                      <i class="fs-16 zmdi zmdi-plus"></i>
                    </div>
                  </div>

                  <button class="flex-c-m mt-2 stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                      加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
        };
    }
}
