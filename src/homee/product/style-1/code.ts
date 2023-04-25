import {HtmlJson, Plugin} from "../../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../../glitterBundle/Glitter.js";
import {GVC} from "../../../glitterBundle/GVController.js";
import {ClickEvent} from "../../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";
import {Dialog} from "../../dialog/dialog-mobile.js";
import {Product} from "../../api/product.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{
                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()

                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            console.log("資料")
                            console.log(gvc.parameter.pageConfig)
                            const config = gvc.parameter.pageConfig?.obj.config
                            const data = gvc.parameter.pageConfig?.obj.data
                            console.log("data::::" + JSON.stringify(data))
                            const nav = config.find((dd: any) => {
                                return dd.type === 'navigationBar'
                            })
                            nav && (nav.data.title = data.name);

                            const dialog = new Dialog(gvc)

                            if(!editMode){
                                dialog.dataLoading(true)
                                const banner = config.find((dd: any) => {
                                    return dd.type === 'banner'
                                })
                                banner && (banner.data.link = ['https://oursbride.com/wp-content/uploads/2018/06/no-image.jpg'])
                                banner.refreshComponent()
                                const allPage = config.find((dd: any) => {
                                    return dd.type === 'allPage' || dd.type === 'productDetail'
                                })
                                allPage.data.loading=true
                                allPage.refreshComponent()
                            }
                            if(data.id){
                                Product.productDetail(data.id, (result) => {
                                    dialog.dataLoading(false)
                                    if (!result) {
                                        dialog.showInfo('加載失敗')
                                        setTimeout(()=>{
                                            gvc.glitter.goBack()
                                        },500)
                                    } else {
                                        const banner = config.find((dd: any) => {
                                            return dd.type === 'banner'
                                        })

                                        nav && (nav.data.title = result.product_detail.name)
                                        banner && (banner.data.link = result.product_detail.images.map((dd: any) => {

                                            return {
                                                "img": dd
                                            }
                                        }))

                                        banner.refreshComponent()
                                        const allPage = config.find((dd: any) => {
                                            return dd.type === 'allPage'  || dd.type === 'productDetail'
                                        })

                                        allPage.data.attribute_list = result.attribute_list.map((dd: any) => {
                                            dd.attribute_values[0].selected = true
                                            return dd
                                        })
                                        allPage.data.loading=false
                                        allPage && (allPage.data.name = result.product_detail.name);
                                        allPage && (allPage.data.intro[0].text = result.product_detail.bodyHtml)
                                        allPage.data.productData = result
                                        allPage.refreshComponent()
                                    }
                                })
                            }

                            return `
                           `
                        },divCreate:{},
                        onCreate:()=>{

                        }

                    })
                },
                editor:()=>{
                    return``
                }
            }
        },
    }
})