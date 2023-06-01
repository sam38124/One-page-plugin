import {TriggerEvent} from "../glitterBundle/plugins/trigger-event.js";
import {globalEditer} from "../glitterBundle/html-component/global-editer.js";

TriggerEvent.create(import.meta.url, {
    postCase: {
        title: '媒合平台-發布案子',
        fun: (gvc, widget, object, subData, element) => {
            return {
                editor: () => {
                    return ``
                },
                event: () => {
                    (window as any).glitter.openDiaLog(new URL('dialog/postform.js',import.meta.url).href,"postform",{})
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



