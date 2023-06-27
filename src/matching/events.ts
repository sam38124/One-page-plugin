import {TriggerEvent} from "../glitterBundle/plugins/trigger-event.js";
import {globalEditer} from "../glitterBundle/html-component/global-editer.js";
import {GlobalUser} from "../glitter-base/global/global-user.js";

TriggerEvent.create(import.meta.url, {
    postCase: {
        title: '事件-登入判斷',
        fun: (gvc, widget, object, subData, element) => {
            widget.data.loginUserEvent=widget.data.loginUserEvent??{}
            return {
                editor: () => {
                    return  `<div class="border border-white m-2 p-2">
${TriggerEvent.editer(gvc, widget, widget.data.loginUserEvent, {
                        option: [],
                        title:"已登入用戶的事件",
                        hover: false
                    })}
</div>
<div class="border border-white m-2 p-2">
${TriggerEvent.editer(gvc, widget, widget.data, {
                        option: [],
                        title:"未登入用戶的事件",
                        hover: false
                    })}
</div>
`
                },
                event: () => {
                    if(!GlobalUser.token){
                        TriggerEvent.trigger({
                            gvc, widget, clickEvent: widget.data,
                        })
                    }else{
                        TriggerEvent.trigger({
                            gvc, widget, clickEvent: widget.data.loginUserEvent,
                        });
                    }
                },
            };
        },
    },
    caseInitial: {
        title: '媒合平台-服務加載',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                  return new Promise((resolve, reject)=>{
                      const saasConfig: {
                          config: any;
                          api: any;
                      } = (window as any).saasConfig;
                      saasConfig.api.getPage(saasConfig.config.appName,"select_widget").then((data: any) => {
                          try {
                              gvc.glitter.share.service=[]
                              data.response.result[0].config[0].data.bigItem.map((dd:any)=>{
                                  dd.child.map((d2:any)=>{
                                      d2.bigItemId=dd.id
                                      d2.bidTitle=dd.title
                                      gvc.glitter.share.service.push(d2)
                                  })
                              })
                              resolve(true)
                          }catch (e){
                              resolve(false)
                          }
                      });
                  })
                },
            };
        },
    }
});



