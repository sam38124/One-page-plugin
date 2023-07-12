import {BackendPlugin} from "../../glitterBundle/plugins/backend-plugin.js";
import {Editor} from "../../editor.js";
import {ShareDialog} from "../../dialog/ShareDialog.js";
import {GlobalData} from "../../event.js";


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
    saasConfig.api.getPrivateConfig(saasConfig.config.appName, "glitter_notifyConfig").then((r: { response: any, result: boolean }) => {
        if (r.response.result[0]) {
            vm.data = r.response.result[0].value
        }
        vm.loading = false
        gvc.notifyDataChange(id)
    })
    const html = String.raw
    const dialog = new ShareDialog(gvc.glitter)
    return gvc.bindView(() => {
        return {
            bind: id,
            view: () => {
                if (vm.loading) {
                    return html`
                        <div class="w-100 d-flex align-items-center justify-content-center">
                            <div class="spinner-border"></div>
                        </div>`
                }
                const form = [
                    {
                        title: `推播開關`, html: Editor.select({
                            title: '',
                            gvc: gvc,
                            def: vm.data.open ?? "true",
                            callback: (text: string) => {
                                vm.data.open = text
                                gvc.notifyDataChange(id)
                            },
                            array: [
                                {title: '打開', value: "true"},
                                {title: '關閉', value: "false"}
                            ],
                        })
                    },{
                        title: `推播類型`, html: Editor.select({
                            title: '',
                            gvc: gvc,
                            def: vm.data.type ?? "",
                            callback: (text: string) => {
                                vm.data.type = text
                                gvc.notifyDataChange(id)
                            },
                            array: [
                                {title: '媒合平台', value: "matching"},
                                {title: '社群平台', value: "social"},
                                {title: '尚未設定', value: ""}
                            ],
                        })
                    }
                ]

                return html`<h3 class=" pb-3">推播通知</h3>
                <div class="w-100 row m-0">
                    ${form.map((dd) => {
                        return `<div class="col-sm-6 col-12">
<div class="w-100 d-flex align-items-center justify-content-center p-2">
<h3 style="font-size: 16px;min-width: 80px;white-space:nowrap;" class="m-0 me-2">${dd.title}</h3>
${dd.html}
</div>
</div>`
                    }).join('')}
                </div>
                <div class="d-flex w-100">
                    <div class="flex-fill"></div>
                    <button class="btn-warning btn" style="color:black;" onclick="${gvc.event(() => {
                        dialog.dataLoading({text: '設定中', visible: true})
                        saasConfig.api.setPrivateConfig(saasConfig.config.appName, "glitter_notifyConfig", vm.data).then((r: { response: any, result: boolean }) => {
                            setTimeout(() => {
                                dialog.dataLoading({visible: false})
                                if (r.response) {
                                    dialog.successMessage({text: "設定成功"})
                                } else {
                                    dialog.errorMessage({text: "設定失敗"})
                                }
                            }, 1000)
                        })
                    })}">儲存
                    </button>
                </div>
                `
            },
            divCreate: {}
        }
    })
}, import.meta.url)