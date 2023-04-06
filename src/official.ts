import {HtmlJson, Plugin} from "./glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "./glitterBundle/Glitter.js";
import {GVC} from "./glitterBundle/GVController.js";
import {BaseApi} from "./api/base.js";
import {Editor} from "./editor.js";

Plugin.create(import.meta.url,(glitter: Glitter, editMode: boolean)=>{
    return {
        widget:{
            title: 'HTML元件',
            subContent: '添加一個HTML元素',
            defaultData: {},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                widget.data.elem=widget.data.elem??"h3"
                widget.data.inner=widget.data.inner??""
                return {
                    view: () => {
                        return `<${widget.data.elem}
class="${glitter.htmlGenerate.styleEditor(widget.data).class()}" style="${glitter.htmlGenerate.styleEditor(widget.data).style()}"
>${widget.data.inner}</${widget.data.elem}>`;
                    },
                    editor: () => {
                        return gvc.map([
                            glitter.htmlGenerate.editeInput({
                                gvc: gvc,
                                title: 'HTML元素標籤',
                                default: widget.data.elem,
                                placeHolder: "輸入元素標籤",
                                callback: (text) => {
                                    widget.data.elem = text
                                    widget.refreshComponent()
                                }
                            }),
                            glitter.htmlGenerate.editeText({
                                gvc: gvc,
                                title: '內容',
                                default: widget.data.inner,
                                placeHolder: "輸入內容",
                                callback: (text) => {
                                    widget.data.inner = text
                                    widget.refreshComponent()
                                }
                            }),
                            glitter.htmlGenerate.styleEditor(widget.data).editor(gvc,()=>{
                                widget.refreshComponent()
                            },'元素設計樣式')
                        ]);
                    },
                };
            },
        },
        component:{
            title: "嵌入模塊",
            subContent: "可嵌入頁面的模塊．",
            defaultData:{},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                widget.data.list=widget.data.list??[]
                return {
                    view:()=>{
                        return gvc.bindView(()=>{
                            const id=glitter.getUUID()
                            let data:any=undefined
                            const saasConfig=(window as any).saasConfig
                            let fal=0
                            function getData(){
                                let tag=widget.data.tag
                                for (const b of widget.data.list){
                                    if(eval(b.code)===true){
                                        tag=b.tag
                                        break
                                    }
                                }
                                BaseApi.create({
                                    "url": saasConfig.config.url+`/api/v1/template?appName=${saasConfig.config.appName}&tag=${tag}`,
                                    "type": "GET",
                                    "timeout": 0,
                                    "headers": {
                                        "Content-Type": "application/json"
                                    }
                                }).then((d2)=>{
                                    if(!d2.result){
                                        fal+=1
                                        if(fal<5){
                                            setTimeout(()=>{getData()},200)
                                        }
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
                        function setPage(pd:any){
                            let group: string[] = [];
                            let selectGroup=''
                            let id=glitter.getUUID()
                            data.dataList.map((dd: any) => {
                                if(dd.tag===pd.tag){
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
                                                    if(d3.tag!==pd.tag){
                                                        return `<a onclick="${gvc.event(()=>{
                                                            pd.tag=d3.tag;
                                                            widget.refreshComponent()
                                                        })}"  class=" list-group-item list-group-item-action border-0 py-2 px-4"  style="border-radius: 0px;">${d3.name}</a>`
                                                    }else {
                                                        return `<a onclick="${gvc.event(()=>{
                                                            pd.tag=d3.tag;
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
                        }
                        return gvc.bindView(()=>{
                            return {
                                bind:id,
                                view:()=>{
                                    if(data.dataList){
                                        return  Editor.h3("預設嵌入頁面")+`<div class="dropdown-menu show position-relative" style="max-height: calc(100vh - 100px);width:300px;overflow-y: scroll;">
<ul class="list-group list-group-flush">
    ${setPage(widget.data)}
</ul>

  </div>
  ${Editor.arrayItem({
                                            gvc:gvc,
                                            title:"判斷式頁面嵌入",
                                            array:widget.data.list.map((dd:any,index:number)=>{
                                                return {
                                                    title:dd.name || `判斷式:${index+1}`,
                                                    expand:dd,
                                                    innerHtml:
                                                        glitter.htmlGenerate.editeInput({
                                                            gvc: gvc,
                                                            title: `判斷式名稱`,
                                                            default: dd.name,
                                                            placeHolder: "輸入判斷式名稱",
                                                            callback: (text) => {
                                                                dd.name = text
                                                                widget.refreshComponent()
                                                            }
                                                        })+glitter.htmlGenerate.editeText({
                                                            gvc: gvc,
                                                            title: `判斷式內容`,
                                                            default: dd.code,
                                                            placeHolder: "輸入程式碼",
                                                            callback: (text) => {
                                                                dd.code = text
                                                                widget.refreshComponent()
                                                            }
                                                        })+`
${Editor.h3("嵌入頁面")}
<div class="dropdown-menu show position-relative" style="max-height: calc(100vh - 100px);width:100%;overflow-y: scroll;">
<ul class="list-group list-group-flush">
    ${setPage(dd)}
</ul>

  </div>`,
                                                    minus:gvc.event(()=>{
                                                        widget.data.list.splice(index,1)
                                                        widget.refreshComponent()
                                                    })
                                                }
                                            }),
                                            expand:widget.data,
                                            plus:{
                                                title:"添加判斷",
                                                event:gvc.event(()=>{
                                                    widget.data.list.push({code:''})
                                                    widget.refreshComponent()
                                                })
                                            },
                                            refreshComponent:()=>{
                                                widget.refreshComponent()
                                            },
                                            originalArray:widget.data.list
                                        })}
`
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