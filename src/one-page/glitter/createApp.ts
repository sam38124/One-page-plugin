import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {template} from "../style-1/template.js";
import {Editor} from "../../editor.js";
Plugin.createComponent(import.meta.url,(glitter, editMode)=>{
    return {
        render:(gvc, widget, setting, hoverID, subData)=>{
            return {
                view:()=>{
                    return `<section class="position-relative  pt-0" >
        <div class="container mt-3 pt-md-2 pt-lg-4 pb-2 pb-md-4 pb-lg-5 px-0">
        ${template.render(gvc,widget,setting,hoverID).view()}
        </div>
        <!-- Slider progress -->
        <div id="swiper-progress" class="swiper-pagination bottom-0" style="top: auto;"></div>
      </section>`
                },
                editor:()=>{
                    return    Editor.toggleExpand({
                        gvc:gvc,title:"模板設定",data:widget.data,innerText:()=>{
                            return (template.render(gvc,widget,setting,hoverID).editor() as string)
                        }
                    })
                }
            }
        }
    }
})