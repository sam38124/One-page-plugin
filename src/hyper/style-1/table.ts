import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ScriptStyle1} from "../script-style-1.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.getData = widget.data.getData ?? {}
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    return gvc.bindView(() => {
                        const id = glitter.getUUID()
                        const vm: {
                            callback: () => void,
                            data: any,
                            page: number,
                            pageSize: number,
                            editData:any
                        } = {
                            callback: () => {
                                gvc.notifyDataChange(id)
                            },
                            page: 0,
                            data: [],
                            pageSize: 0,
                            editData:[]
                        }

                        function getData() {
                            TriggerEvent.trigger({
                                gvc: gvc, widget: widget, clickEvent: widget.data.getData, subData: vm
                            })
                        }

                        getData()
                        return {
                            bind: id,
                            view: () => {
                                return `<div class="card-body" style="overflow-x:scroll;">
                                    <div class="d-flex mb-2 justify-content-between">
                                      
                                    </div>
                                    <div class="tableHTML">
<div id="" class="" style="">
<table class="table table-centered table-nowrap mb-0 text-center table-hover" id="sdsbs3s1s9s8s8sb-s8scs8s9-4s5sbs5-sasbs8s0-s4s6s9sfses5s8s7scs2sfs9" style="overflow-x:scroll;">
                    
                              <thead class="table-light">
                                  ${(vm.data.length === 0) ? `` : `<tr>${vm.data[0].map((dd: any) => {
                                    return `<th class="text-center">${dd.key}</th>`
                                }).join('')}</tr>`}
                              </thead>
                          
                    <tbody>
                        ${(vm.data.length === 0) ? `` : `${vm.data.map((dd: any,index:number) => {
                                    return `<tr onclick="${gvc.event(()=>{
                                        if(vm.editData[index].clickEvent){
                                            vm.editData[index].clickEvent()  
                                        }
                                        TriggerEvent.trigger({
                                            gvc: gvc, widget: widget, clickEvent: widget.data, subData: vm.editData[index]
                                        })                                
                                    })}">${dd.map((d3: any) => {
                                        return `<td class="text-center">${d3.value}</td>`
                                    }).join('')}</tr>`
                                }).join('')}`}
                    </tbody>
                </table>
<div id="sesas2ses3s8s1sf-s4s7ses7-4s9s0sb-s8s0s1s9-s0sas6sas6s0s7s2sfs7sfs4s8s2s9scs3s8s8s0-s5sasds0-4s8s1s3-sasbs2s6-sbsesfs9sbs8sbscsfs5scsb" class="" style="">
                            <nav class="d-flex my-3 justify-content-center">
                                <ul class="pagination pagination-rounded mb-0">
                                    <li class="page-item">
                                        <a class="page-link" aria-label="Previous" style="cursor:pointer" onclick="${gvc.event(() => {
                                    if (vm.page > 0) {
                                        vm.page = vm.page - 1
                                        getData()
                                    }
                                })}" >
                                            <span aria-hidden="true">«</span>
                                        </a>
                                    </li>
                                    ${(() => {
                                    let min: number[] = []
                                    let max: number[] = []
                                    for (let i = 0; i < vm.pageSize; i++) {
                                        if (i !== vm.page) {
                                            if (i < vm.page && min.length <= 2) {
                                                min.push(i)
                                            }
                                            if (i > vm.page) {
                                                if (max.length <= 2) {
                                                    max.push(i)
                                                } else {
                                                    max[max.length - 1] = i
                                                }
                                            }
                                        }
                                    }
                                    let comb: number[] = min.concat([vm.page]).concat(max)

                                    return comb.map((dd) => {
                                        return `  <li class="page-item ${(vm.page === dd) ? `active` : ``}" onclick="${gvc.event(() => {
                                            vm.page = dd
                                            getData()
                                        })}"><a class="page-link">${dd + 1}</a></li>`
                                    }).join('')
                                })()}
                                    <li class="page-item">
                                        <a class="page-link" aria-label="Next" style="cursor:pointer" onclick="
                                        ${gvc.event(() => {
                                    if (vm.page < vm.pageSize - 1) {
                                        vm.page = vm.page + 1
                                        getData()
                                    }
                                })}
                                        " >
                                            <span aria-hidden="true">»</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            
                                        <div class="d-flex justify-content-center">
                                            <div class="input-group mb-2 mx-sm-4 mx-0" style="width: ${glitter.ut.frSize({
                                    sm: `30%`
                                }, '90%')}">
                                                <div class="input-group-text">前往</div>
                                                <input type="number" class="form-control" id="gotoPage" onchange="${gvc.event((e) => {
                                    vm.page = parseInt($('#gotoPage').val() as string, 10) - 1
                                    getData()
                                })}" >
                                                <div class="input-group-text">頁</div>
                                                <button type="button" class="btn btn-info btn-rounded " onclick="${gvc.event((e) => {
                                    vm.page = parseInt($('#gotoPage').val() as string, 10) - 1
                                    getData()
                                })}" >
                                                    GO
                                                </button>
                                            </div>
                                        </div>
                                    
                        </div>
</div>
</div>
                                </div>`
                            },
                            divCreate: {class: `card`, style: ``}
                        }
                    })
                },
                editor: () => {
                    return gvc.map([
                        TriggerEvent.editer(gvc, widget, widget.data.getData, {
                            hover: true,
                            option: [],
                            title: "設定資料來源"
                        }),
                        TriggerEvent.editer(gvc, widget, widget.data, {
                            hover: true,
                            option: [],
                            title: "點擊跳轉"
                        })
                    ]);
                },
            };
        },
    }
})