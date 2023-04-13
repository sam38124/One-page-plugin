import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { ShareDialog } from "../../dialog/ShareDialog.js";
import { BaseApi } from "../../glitter/api/base.js";
import { User } from "../../glitter/model/User.js";
import { template } from "../style-1/template.js";
const saasConfig = window.saasConfig;
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    const vm = {
                        id: glitter.getUUID(),
                        data: [],
                        loading: true
                    };
                    const shareDialog = new ShareDialog(gvc.glitter);
                    BaseApi.create({
                        "url": saasConfig.config.url + `/api/v1/app`,
                        "type": "GET",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json",
                            "Authorization": User.getToken()
                        }
                    }).then((d2) => {
                        shareDialog.dataLoading({ visible: false });
                        if (d2.result) {
                            vm.data = d2.response.result;
                            vm.loading = false;
                            gvc.notifyDataChange(vm.id);
                        }
                        else {
                            shareDialog.errorMessage({ text: "取得資料失敗" });
                        }
                    });
                    return `
                        <div class="container pt-2">
                        <nav class="pt-2 " aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item" onclick="${gvc.event(() => {
                        const url = new URL(location.href);
                        url.searchParams.delete('page');
                        location.href = url.href;
                    })}" >
              <a><i class="bx bx-home-alt fs-lg me-1"></i>首頁</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">我的應用</li>
          </ol>
        </nav>
        <div class="d-lg-flex align-items-center justify-content-between py-4 mt-lg-2">
          <h1 class="me-3">我的應用</h1>
          <div class="d-md-flex mb-3">
          </div>
        </div>
        ${gvc.bindView(() => {
                        return {
                            bind: vm.id,
                            view: () => {
                                if (vm.loading) {
                                    return `
                                        <div class="d-flex align-items-center justify-content-center w-100 flex-column">
                                        <div class="spinner-border" role="status">
  <span class="sr-only"></span>
</div>
<span class="mt-2">加載中...</span>
</div>
                                        `;
                                }
                                return vm.data.map((dd) => {
                                    return `<div class="col pb-1 pb-lg-3 mb-4" onclick="" data-gs-event-8="event" style="cursor: pointer;">
            <article class="card h-100 border-0 shadow-sm">
              <div class="card-body pb-3">
                <h3 class="h5 mb-2 d-flex justify-content-between align-items-center" style="font-size: 16px;">
               應用名稱:${dd.appName}
               <button style="width: 30px;height: 30px;" class="btn btn-outline-light p-2" onclick="${gvc.event(() => {
                                        deleteEvent(gvc, dd);
                                    })}" ><i class="bx bx-trash"></i></button>
                </h3>
                <h4 class="mb-3" style="font-size: 16px;color: darkorange;">
                網址:
                <input class="form-control mt-2" value="${(() => {
                                        const url = new URL(location.href);
                                        return `${url.origin}/${dd.appName}/`;
                                    })()}" style="-webkit-user-select: all !important;
  -moz-user-select: all !important;
  user-select: all !important;" onclick="${gvc.event((e) => {
                                        navigator.clipboard.writeText(e.value);
                                        new ShareDialog(gvc.glitter).successMessage({ text: "複製成功" });
                                    })}"  readonly="">
</h4>
 ${(() => {
                                        const date = new Date(dd.dead_line);
                                        if (date.getTime() < new Date().getTime()) {
                                            return `<h3 class="fs-sm  text-danger " style="font-size: 16px;">已逾期:${date.getFullYear()} 年 ${date.getMonth()} 月 ${date.getDay()} 日 </h3>`;
                                        }
                                        return `<h3 class="fs-sm  text-success " style="font-size: 16px;">有效期:${date.getFullYear()} 年 ${date.getMonth()} 月 ${date.getDay()} 日 </h3>`;
                                    })()}
 
 <div class="d-flex justify-content-between" style="height: 40px;">
 <button class="btn btn-warning   " style="color:black;width: calc(50% - 5px);" onclick="${gvc.event(() => {
                                        glitter.openNewTab(location.href = `${location.origin}/${dd.appName}/`);
                                    })}">前往預覽應用</button>
  <a class="btn btn-primary  " href="${location.origin}/${dd.appName}/?type=editor" target="_blank" style="width: calc(50% - 5px);">前往後台系統</a>
</div>

              </div>
            </article>
          </div>`;
                                }).join('') + `<div class="col pb-1 pb-lg-3 mb-4" style="cursor: pointer;" onclick="${gvc.event(() => {
                                    appCreate(gvc, widget, setting, hoverID);
                                })}">
<div class="w-100 rounded d-flex align-items-center justify-content-center flex-column" style="min-height: 250px;border-style:dashed;border-color: white;">
<i class="fa-solid fa-circle-plus text-white " style="font-size: 50px;"></i>
<span class="mt-2 text-white" style="font-size: 18px;">添加應用</span>
</div>
</div>`;
                            },
                            divCreate: {
                                class: `row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 gx-3 gx-md-4 mt-n2 mt-sm-0 pt-4`
                            }
                        };
                    })}
</div>
                        `;
                },
                editor: () => {
                    return gvc.map([
                        `<div class="mt-2"></div>`,
                        Editor.toggleExpand({
                            gvc: gvc, title: "模板設定", data: widget.data, innerText: () => {
                                return template.render(gvc, widget, setting, hoverID).editor();
                            }
                        })
                    ]);
                },
            };
        },
    };
});
function deleteEvent(gvc, dd) {
    if (document.getElementById('delete-modal')) {
        $('#delete-modal').remove();
    }
    let data = {
        appName: undefined,
        delete: undefined
    };
    $('body').append(`<div id="delete-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-body">
<div class="alert alert-danger " role="alert">
                                                    <strong>警告 - </strong> 在執行刪除操作前，請務必注意刪除後將無法復原且相關資料將會被永久刪除，請謹慎進行操作。
                                                </div>

                <div class="ps-1 pe-1" >

                    <div class="mb-3">
                        <label for="username" class="form-label">APP名稱</label>
                        <input class="form-control" type="text" id="userName" required="" placeholder="請輸入APP名稱" onchange="${gvc.event((e) => {
        data.appName = e.value;
    })}">
                    </div>
 <div class="mb-3">
                        <label for="username" class="form-label">是否刪除</label>
                        <input class="form-control" type="text" id="password" required="" placeholder="請輸入我要刪除" onchange="${gvc.event((e) => {
        data.delete = e.value;
    })}">
                    </div>
                </div>
 <div class="modal-footer">
                                                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
                                                                <button type="button" class="btn btn-danger" onclick="${gvc.event(() => {
        const dialog = new ShareDialog(gvc.glitter);
        if (dd.appName !== data.appName || data.delete !== '我要刪除') {
            dialog.errorMessage({ text: "輸入錯誤" });
        }
        else {
            dialog.dataLoading({ visible: true });
            BaseApi.create({
                "url": saasConfig.config.url + `/api/v1/app`,
                "type": "DELETE",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": User.getToken()
                },
                data: JSON.stringify({
                    appName: data.appName
                })
            }).then((d2) => {
                location.reload();
            });
        }
    })}">確認刪除</button>
                                                            </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>`);
    $('#delete-modal').modal('show');
}
const swiperID = 'dmkwkmw';
function appCreate(gvc, widget, setting, hoverID) {
    if (document.getElementById(`pay`)) {
        $(`#pay`).remove();
    }
    $('body').append(`
<div class="modal fade" id="pay" tabindex="-1" role="dialog" aria-hidden="true" style="">
<div class="modal-dialog modal-dialog-centered modal-xl" style="">
     <div class="modal-content px-1 px-sm-4">
            <div class="modal-header px-3">
            <h4 class="modal-title" id="myCenterModalLabel">選擇方案</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
</div>
<section class="position-relative  pt-0" >
        <div class="container mt-3 pt-md-2 pt-lg-4 pb-2 pb-md-4 pb-lg-5 px-0">
        <p style="font-size: 18px;"><span style="color: red;" class="me-2">*</span>您的應用名稱</p>
        <input type="text"  class="form-control form-control-lg"  autocomplete="off" onchange="${gvc.event((e) => {
        widget.data.createAPP = e.value;
    })}">
         <p style="font-size: 18px;" class="mt-2"><span style="color: red;" class="me-2">*</span>選擇初始模板</p>
        ${template.render(gvc, widget, setting, hoverID).view()}
        </div>
        <!-- Slider progress -->
        <div id="swiper-progress" class="swiper-pagination bottom-0" style="top: auto;"></div>
      </section>
            </div>
</div>
</div>
`);
    $(`#pay`).modal('show');
    const swiper = new Swiper(`#${swiperID}`, {
        "slidesPerView": 1,
        "centeredSlides": true,
        "loop": true,
        "tabs": true,
        "pagination": {
            "el": "#swiper-progress",
            "type": "progressbar"
        },
        "navigation": {
            "prevEl": "#prev-screen",
            "nextEl": "#next-screen"
        },
        "breakpoints": {
            "768": { "slidesPerView": 1 }
        }
    });
}
function paying(item) {
    const glitter = window.glitter;
    return glitter.ut.frSize({
        sm: ` <div class="position-relative mx-5">
            <!-- Slider prev/next buttons -->
            <button type="button" id="prev-screen" class="btn btn-prev btn-icon position-absolute top-50 start-0 ms-n5 translate-middle-y">
              <i class="bx bx-chevron-left"></i>
            </button>
            <button type="button" id="next-screen" class="btn btn-next btn-icon position-absolute top-50 end-0 me-n5 translate-middle-y">
              <i class="bx bx-chevron-right"></i>
            </button>

            <!-- Swiper slider -->
            <div
              class="swiper " id="${swiperID}"
            >
              <div class="swiper-wrapper">
                ${glitter.print(function () {
            var html = "";
            item.map(function (dd, index) {
                html += `
                      <div class="swiper-slide" style="border-bottom-left-radius:20px!important;" data-swiper-tab="#text-${index}">
                        ${dd}
                      </div>
                    `;
            });
            return html;
        })}
              </div>
            </div>
          </div>`,
    }, glitter.print(function () {
        var html = "";
        item.map(function (dd, index) {
            html += `
              <div class="swiper-slide mb-4" style="border-bottom-left-radius:20px!important;" data-swiper-tab="#text-${index}">${dd}</div>
            `;
        });
        return html;
    }));
}
class Service {
    static free(gvc) {
        return `<div class="card h-100 border-0 shadow-sm p-xxl-3" style="max-width: 100%;width: 100%;">
                  <div class="card-body">
                    <div class="d-flex align-items-center pb-2 pb-md-3 mb-4">
                      <div class="flex-shrink-0 bg-secondary rounded-3">
                        <img src="assets/img/landing/saas-1/pricing/basic.png" width="84" alt="Icon">
                      </div>
                      <div class="ps-4">
                        <h3 class="fs-lg fw-normal text-body mb-2">7天免費試用</h3>
                      </div>
                    </div>
                    <ul class="list-unstyled fs-sm pb-md-3 mb-3">
                      <li class="d-flex mb-2">
                        <i class="bx bx-check fs-xl text-primary me-1"></i>
                        RWD網頁版本
                      </li>
                      <li class="d-flex mb-2">
                        <i class="bx bx-check fs-xl text-primary me-1"></i>
                        每月流量限制-1TB
                      </li>
                        <li class="d-flex  mb-2">
                       <i class="bx bx-check fs-xl text-primary me-1"></i>
                        網頁有效期+7天
                      </li>
                      <li class="d-flex text-muted mb-2">
                        <i class="bx bx-x fs-xl me-1"></i>
                        維護升級服務
                      </li>
                      <li class="d-flex text-muted mb-2">
                        <i class="bx bx-x fs-xl me-1"></i>
                        安卓Play商店上架服務
                      </li>
                      <li class="d-flex text-muted">
                        <i class="bx bx-x fs-xl me-1"></i>
                        蘋果Store商店上架服務
                      </li>

                    </ul>
                  </div>
                  <div class="card-footer border-0 pt-0 pb-4">
                 <div class="card-footer border-0 pt-0 pb-4">
                        <a  class="btn btn-warning  w-100"  style="color:black;" onclick="${gvc.event(() => {
            Service.createApp();
        })}">免費試用</a>
                  </div>
                  </div>
                </div>`;
    }
    static official(gvc) {
        return `<div class="card h-100 border-0 bg-info shadow-primary shadow-dark-mode-none p-xxl-3" style="max-width: 100%;width: 100%;">
                  <div class="card-body">
                    <div class="d-flex align-items-center pb-2 pb-md-3 mb-4">
                      <div class="flex-shrink-0 rounded-3" style="background-color: rgba(255,255,255, .1);">
                        <img src="assets/img/landing/saas-1/pricing/standard.png" width="84" alt="Icon">
                      </div>
                      <div class="ps-4">
                        <h3 class="fs-lg fw-normal text-light opacity-70 mb-2">標準方案</h3>
                        <h4 class="h3 text-light lh-1 mb-0">
                          <span data-monthly-price="">NT $499</span>
                          <span class="fs-sm fw-normal opacity-70"> / 每月</span>
                        </h4>
                      </div>
                    </div>
                    <ul class="list-unstyled fs-sm pb-md-3 mb-3">
                         <li class="d-flex  mb-2">
                        <i class="bx bx-check fs-xl me-1"></i>
                        RWD網頁版本
                      </li>
                    <li class="d-flex mb-2">
                        <i class="bx bx-check fs-xl  me-1"></i>
                        每月流量限制-5TB
                      </li>
                      <li class="d-flex  mb-2">
                        <i class="bx bx-check fs-xl me-1"></i>
                        維護升級服務
                      </li>
                        <li class="d-flex  mb-2">
                         <i class="bx bx-check fs-xl me-1"></i>
                        網頁有效期+31天
                      </li>
                      <li class="d-flex text-muted mb-2">
                        <i class="bx bx-x fs-xl me-1"></i>
                        安卓Play商店上架服務
                      </li>
                      <li class="d-flex text-muted">
                        <i class="bx bx-x fs-xl me-1"></i>
                        蘋果Store商店上架服務
                      </li>
                    </ul>
                  </div>
                  <div class="card-footer border-0 pt-0 pb-4">
                        <a  class="btn btn-warning  w-100"  style="color:black;" onclick="${gvc.event(() => {
            Service.createApp();
        })}">免費試用</a>
                  </div>
                </div>`;
    }
    static goal(gvc) {
        return `<div class="card h-100 border-0  shadow-sm p-xxl-3 bg-primary" style="max-width: 100%;width: 100%;">
                  <div class="card-body">
                    <div class="d-flex align-items-center pb-2 pb-md-3 mb-4">
                      <div class="flex-shrink-0 bg-secondary rounded-3" style="background-color: orangered;">
                        <img src="assets/img/landing/saas-1/pricing/ultimate.png" width="84" alt="Icon">
                      </div>
                      <div class="ps-4">
                        <h3 class="fs-lg fw-normal text-body mb-2">白金方案</h3>
                        <h4 class="h3 text-light lh-1 mb-0">
                          <span data-monthly-price="">NT $4999</span>
                          <span class="fs-sm fw-normal opacity-70"> / 每月</span>
                        </h4>
                      </div>
                    </div>
                     <ul class="list-unstyled fs-sm pb-md-3 mb-3">
                         <li class="d-flex  mb-2">
                        <i class="bx bx-check fs-xl me-1"></i>
                        RWD網頁版本
                      </li>
                       <li class="d-flex mb-2">
                        <i class="bx bx-check fs-xl  me-1"></i>
                        每月流量限制-10TB
                      </li>
                      <li class="d-flex  mb-2">
                        <i class="bx bx-check fs-xl me-1"></i>
                        維護升級服務
                      </li>
                      <li class="d-flex  mb-2">
                        <i class="bx bx-check fs-xl me-1"></i>
                        安卓Play商店上架服務
                      </li>
                      <li class="d-flex mb-2">
                        <i class="bx bx-check fs-xl me-1"></i>
                        蘋果Store商店上架服務
                      </li>
                        <li class="d-flex  mb-2">
                         <i class="bx bx-check fs-xl me-1"></i>
                        網頁有效期+31天
                      </li>
                        <li class="d-flex  mb-2">
                      <i class="bx bx-check fs-xl me-1"></i>
                        APP有效期+31天
                      </li>
                    </ul>
                  </div>
                  <div class="card-footer border-0 pt-0 pb-4">
                       <div class="card-footer border-0 pt-0 pb-4">
                        <a  class="btn btn-warning  w-100"  style="color:black;" onclick="${gvc.event(() => {
            Service.createApp();
        })}">免費試用</a>
                  </div>
                  </div>
                </div>`;
    }
    static createApp() {
        const appName = $('#appName').val();
        const glitter = window.glitter;
        const shareDialog = new ShareDialog(glitter);
        BaseApi.create({
            "url": saasConfig.config.url + `/api/v1/app`,
            "type": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "Authorization": User.getToken()
            },
            "data": JSON.stringify({
                "domain": appName,
                "appName": appName
            })
        }).then((d2) => {
            shareDialog.dataLoading({ visible: false });
            if (d2.result) {
                location.reload();
            }
            else {
                shareDialog.errorMessage({ text: "創建失敗，此名稱已被使用!" });
            }
        });
    }
}
