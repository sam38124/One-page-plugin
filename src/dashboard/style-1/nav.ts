import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {

            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    let title = widget.data.title??"儀表板"
                    // @ts-ignore
                    setTimeout(() => $("#dash-daterange").daterangepicker({ singleDatePicker: !0 }), 500);

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            return /*html*/ `
                              <div class="row">
                                <div class="col-12">
                                  <div class="page-title-box">
                                    <div class="page-title-right">
                                      <form class="d-flex">
                                        <div class="input-group">
                                          <input type="text" class="form-control form-control-light" id="dash-daterange" />
                                          <span class="input-group-text bg-primary border-primary text-white">
                                            <i class="mdi mdi-calendar-range font-13"></i>
                                          </span>
                                        </div>
                                            <a class="btn btn-primary ms-2" onclick="${gvc.event(()=>{
                                            //todo
                                            })}">
                                          <i class="mdi mdi-autorenew"></i>
                                        </a>
                                      </form>
                                    </div>
                                    <h4 class="page-title" style="color:black">${title}</h4>
                                  </div>
                                </div>
                              </div>
                            `;
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return ``

                }
            }
        },
    }
})