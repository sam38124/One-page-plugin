import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { user_star } from "./user_star.js";
import { getData } from "../../glitter-base/api/post/get-data.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID, subData) => {
            return {
                view: () => {
                    const vm = {
                        loading: true,
                        data: [],
                        id: glitter.getUUID()
                    };
                    getData.fun(gvc, widget, {}, {
                        page: 0,
                        limit: 10,
                        callback: (response) => {
                            vm.data = response;
                            vm.loading = false;
                            gvc.notifyDataChange(vm.id);
                        }
                    }).event();
                    return `
<div class="${glitter.ut.frSize({
                        sm: `container pt-4`
                    }, 'p-1')}  ">
${gvc.bindView(() => {
                        return {
                            bind: vm.id,
                            view: () => {
                                if (vm.loading) {
                                    return `<div class="d-flex align-items-center justify-content-center col-12 mt-2">
<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</div>`;
                                }
                                return vm.data.map((d2) => {
                                    const servData = gvc.glitter.share.service.find((dd) => {
                                        return dd.id === d2.content.serviceID;
                                    });
                                    if (servData) {
                                        d2.content;
                                        servData.formList = servData.formList ?? [];
                                        return `
<div class="col-12 col-sm-4 col-xl-3 col-lg-4 p-0 " >
<div class="card shadow m-0 m-sm-2" style="">
<div class="p-2"><span class="badge bg-danger position-absolute">急件</span></div>
${(() => {
                                            const budget = servData.formList.find((dd) => {
                                                return dd.key === 'budget';
                                            });
                                            if (budget && budget.value !== "-1") {
                                                return `<h3 style="color:orangered;top:10px;right:10px;font-size:18px;" class="position-absolute">$${d2.content[budget.key].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
</h3>`;
                                            }
                                            else {
                                                return `<h3 style="color:orangered;top:10px;right:10px;font-size:18px;" class="position-absolute">專家報價
</h3>`;
                                            }
                                        })()}

 <div class="card-body" style="max-height:300px;">
    <h5 class="card-title d-flex align-items-center mb-1">${servData.title}<i class="fa-solid fa-user ms-2" style="color:gray;font-size:14px;"></i>
    <span class="ms-2" style="font-size:14px;color:gray;">${d2.userData?.fullName}</span></h5>
   ${user_star.render(gvc, {
                                            data: {
                                                count: d2.userData?.star ?? 0
                                            }
                                        }, setting, hoverID, subData).view()}
   <div class="d-flex flex-wrap align-items-center my-2" style="font-size:14px;font-weight:500;">
   <div>   <i class="fa-solid fa-handshake me-1 text-primary"></i><span>${d2.userData?.handshake ?? 0}次</span></div>
   <div><i class="ms-2 fa-solid fa-location-dot me-1 text-danger" style=""></i><span>台中市，潭子區</span></div>
   <div>${(d2.userData?.verify) ? `<i class="ms-2 fa-solid fa-badge-check me-1 text-success"></i><span>已認證</span>` : `<i class="ms-2 fa-solid fa-badge-check me-1" style="color:gray;"></i><span>未認證</span>`}</div>
</div>
    <p class=" fs-sm" style="
    text-overflow: ellipsis;text-wrap:normal;word-break:break-all; max-height:100px;max-width:100%;display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;">${(servData.formList.filter((dd) => {
                                            return d2.content[dd.key] && dd.key !== 'budget';
                                        }).map((dd, index) => {
                                            let ct = (d2.content[dd.key]) ? d2.content[dd.key] : `尚未填寫`;
                                            return `${index + 1}.${dd.label}:${ct}`;
                                        })).join(',')}</p>
    <div class="d-flex w-100 align-items-end">
    <a  class="btn btn-sm btn-primary ms-auto" style="font-size:14px;">前往查看</a>
</div>
    
  </div>
</div>
</div>
`;
                                    }
                                    else {
                                        return ``;
                                    }
                                }).join('');
                            },
                            divCreate: { class: `row p-0 m-0` }
                        };
                    })}
</div>
                  
                  `;
                },
                editor: () => {
                    return ``;
                }
            };
        }
    };
});
