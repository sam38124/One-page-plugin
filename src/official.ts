import {HtmlJson, Plugin} from "./glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "./glitterBundle/Glitter.js";
import {GVC} from "./glitterBundle/GVController.js";
import {BaseApi} from "./api/base.js";
import {Editor} from "./editor.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    return {
        component:{
            title: "嵌入模塊",
            subContent: "可嵌入頁面的模塊．",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                return {
                    view:()=>{
                        return gvc.bindView(()=>{
                            const id=glitter.getUUID()
                            let data:any=undefined
                            const saasConfig=(window as any).saasConfig
                            function getData(){
                                BaseApi.create({
                                    "url": saasConfig.config.url+`/api/v1/template?appName=${saasConfig.config.appName}&tag=${widget.data.tag}`,
                                    "type": "GET",
                                    "timeout": 0,
                                    "headers": {
                                        "Content-Type": "application/json"
                                    }
                                }).then((d2)=>{
                                    if(!d2.result){
                                        setTimeout(()=>{getData()},200)
                                    }else{
                                        data=d2.response.result[0]
                                        gvc.notifyDataChange(id)
                                    }

                                })
                            }
                            getData()
                            return {
                                bind:id,
                                view:()=>{
                                    if(data){
                                        return new glitter.htmlGenerate(data.config, []).render(gvc);
                                    }else{
                                        return  ``
                                    }
                                },
                                divCreate:{}
                            }
                        })
                    },
                    editor:()=>{
                        const id=glitter.getUUID()
                        const data:any={
                            dataList:undefined
                        }
                        const saasConfig=(window as any).saasConfig
                        BaseApi.create({
                            "url": saasConfig.config.url+`/api/v1/template?appName=${saasConfig.config.appName}`,
                            "type": "GET",
                            "timeout": 0,
                            "headers": {
                                "Content-Type": "application/json"
                            }
                        }).then((d2)=>{
                            data.dataList=d2.response.result
                            gvc.notifyDataChange(id)
                        })
                        return gvc.bindView(()=>{
                            return {
                                bind:id,
                                view:()=>{
                                    if(data.dataList){
                                        return  Editor.h3("選擇嵌入頁面")+`<div class="dropdown-menu show" style="max-height: calc(100vh - 100px);width:300px;overflow-y: scroll;">
<ul class="list-group list-group-flush">
    ${(() => {
                                            let group: string[] = [];
                                            let selectGroup=''
                                            let id=glitter.getUUID()
                                            data.dataList.map((dd: any) => {
                                                if(dd.tag===widget.data.tag){
                                                    selectGroup=dd.group
                                                }
                                                if (group.indexOf(dd.group) === -1) {
                                                    group.push(dd.group)
                                                }
                                            })
                                            return  gvc.bindView(()=>{
                                                return {
                                                    bind:id,
                                                    view:()=>{
                                                        return group.map((dd)=>{
                                                            return `<l1 onclick="${gvc.event(()=>{
                                                                    selectGroup=dd
                                                                    gvc.notifyDataChange(id)
                                                                })}"  class="list-group-item list-group-item-action border-0 py-2 ${(selectGroup===dd) && 'active'} position-relative " style="border-radius: 0px;cursor: pointer;">${dd || "未分類"}</l1>`
                                                                +
                                                                `<div class="collapse multi-collapse ${(selectGroup===dd) && 'show'}" style="margin-left: 10px;">
 ${      data.dataList.filter((d2:any)=>{
                                                                    return d2.group===dd
                                                                }).map((d3:any)=>{
                                                                    if(d3.tag!==widget.data.tag){
                                                                        return `<a onclick="${gvc.event(()=>{
                                                                            widget.data.tag=d3.tag;
                                                                            widget.refreshComponent()
                                                                        })}"  class=" list-group-item list-group-item-action border-0 py-2 px-4"  style="border-radius: 0px;">${d3.name}</a>`
                                                                    }else {
                                                                        return `<a onclick="${gvc.event(()=>{
                                                                            widget.data.tag=d3.tag;
                                                                            widget.refreshComponent()
                                                                        })}"  class=" list-group-item list-group-item-action border-0 py-2 px-4 bg-warning"  style="cursor:pointer;background-color: #FFDC6A !important;color:black !important;border-radius: 0px;">${d3.name}</a>`
                                                                    }
                                                                }).join('')}
</div>`
                                                        }).join('')
                                                    },
                                                    divCreate:{}
                                                }
                                            })

                                        })()}
</ul>
  </div>`
                                    }else{
                                        return  ``
                                    }
                                },
                                divCreate:{}
                            }
                        })
                    }
                }
            }
        }
    }
})