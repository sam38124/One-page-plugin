import {BackendPlugin} from "../../glitterBundle/plugins/backend-plugin.js";
import {Editor} from "../../editor.js";
import {ShareDialog} from "../../dialog/ShareDialog.js";


BackendPlugin.createPlugin((gvc) => {
    const id = gvc.glitter.getUUID()
    const vm: {
        loading: boolean,
        data: any
    } = {
        loading: true,
        data: {}
    }
    const saasConfig: {
        config: any,
        api: any
    } = (window as any).saasConfig
    saasConfig.api.getPrivateConfig(saasConfig.config.appName, "glitter_loginConfig").then((r: { response: any, result: boolean }) => {
        if (r.response.result[0]) {
            vm.data = r.response.result[0].value
        }
        vm.loading = false
        gvc.notifyDataChange(id)
    })
    const dialog = new ShareDialog(gvc.glitter)
    return gvc.bindView(() => {
        return {
            bind: id,
            view: () => {
                if (vm.loading) {
                    return `<div class="w-100 d-flex align-items-center justify-content-center">
<div class="spinner-border"></div>
</div>`
                }
                const form = [
                    {
                        title: `登入認證`, html: Editor.select({
                            title: '',
                            gvc: gvc,
                            def: vm.data.verify ?? "normal",
                            callback: (text: string) => {
                                vm.data.verify = text
                                gvc.notifyDataChange(id)
                            },
                            array: [
                                {title: '無需認證', value: "normal"},
                                {title: '信箱認證', value: "mail"},
                                {title: '電話認證', value: "phone"}
                            ],
                        })
                    },
                    {
                        title: `寄件者名稱`, html: gvc.glitter.htmlGenerate.editeInput({
                            gvc: gvc, title: ``, default: vm.data.name ?? "", placeHolder: "請輸入寄件者名稱",
                            callback: (text) => {
                                vm.data.name = text
                                gvc.notifyDataChange(id)
                            }
                        })
                    },
                    {
                        title: `認證跳轉`, html: gvc.glitter.htmlGenerate.editeInput({
                            gvc: gvc, title: ``, default: vm.data.link ?? "", placeHolder: "請輸入跳轉連結",
                            callback: (text) => {
                                vm.data.link = text
                                gvc.notifyDataChange(id)
                            }
                        })
                    }
                ]
                return `<h3 class="border-bottom pb-3">
登入設定
</h3>
<div class="w-100  row m-0">
${form.map((dd) => {
                    return `<div class="col-sm-6 col-12">
<div class="w-100 d-flex align-items-center justify-content-center p-2">
<h3 style="font-size: 16px;min-width: 80px;white-space:nowrap;" class="m-0 me-2">${dd.title}</h3>
${dd.html}
</div>
</div>`
                }).join('')}
</div>
<div class="w-100 d-flex border-top pt-3 my-2">
<div class="flex-fill"></div>
<button class="btn-warning btn" style="color:black;" onclick="${gvc.event(() => {
                    dialog.dataLoading({text: '設定中', visible: true})
                    saasConfig.api.setPrivateConfig(saasConfig.config.appName, "glitter_loginConfig", vm.data).then((r: { response: any, result: boolean }) => {
                        setTimeout(() => {
                            dialog.dataLoading({visible: false})
                            if (r.response) {
                                dialog.successMessage({text: "設定成功"})
                            } else {
                                dialog.errorMessage({text: "設定失敗"})
                            }
                        }, 1000)
                    })
                })}">儲存</button>
</div>
`
            },
            divCreate: {}
        }
    })
}, import.meta.url)