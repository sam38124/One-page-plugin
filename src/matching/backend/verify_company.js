import { BackendPlugin } from "../../glitterBundle/plugins/backend-plugin.js";
import { Editor } from "../../editor.js";
import { ShareDialog } from "../../dialog/ShareDialog.js";
import { getData } from "../../glitter-base/api/post/get-data.js";
import { ApiPost } from "../../glitter-base/route/post.js";
BackendPlugin.createPlugin((gvc) => {
    const id = gvc.glitter.getUUID();
    let vm = {
        data: [],
        query: [{ key: "idt", value: "company", type: "=" }, { key: "type", value: "identify", type: "=" }, { key: "type", value: "identify", type: "=" }, { key: "status", value: 0, type: "=" }],
        page: 0,
        selectOnly: [],
        limit: 50,
        count: 0,
        loading: true,
        datasource: []
    };
    getData.fun(gvc, {}, {}, {
        page: vm.page,
        limit: vm.limit,
        query: vm.query,
        selectOnly: vm.selectOnly,
        datasource: vm.datasource,
        callback: (response) => {
            vm.data = response.data;
            vm.count = response.count;
            vm.loading = false;
            gvc.notifyDataChange(id);
        }
    }).event();
    const dialog = new ShareDialog(gvc.glitter);
    return gvc.bindView(() => {
        return {
            bind: id,
            view: () => {
                if (vm.loading) {
                    return `<div class="w-100 d-flex align-items-center justify-content-center">
<div class="spinner-border"></div>
</div>`;
                }
                const form = [
                    {
                        title: `登入認證`, html: Editor.select({
                            title: '',
                            gvc: gvc,
                            def: vm.data.verify ?? "normal",
                            callback: (text) => {
                                vm.data.verify = text;
                                gvc.notifyDataChange(id);
                            },
                            array: [
                                { title: '無需認證', value: "normal" },
                                { title: '信箱認證', value: "mail" },
                                { title: '電話認證', value: "phone" }
                            ],
                        })
                    },
                    {
                        title: `寄件者名稱`, html: gvc.glitter.htmlGenerate.editeInput({
                            gvc: gvc, title: ``, default: vm.data.name ?? "", placeHolder: "請輸入寄件者名稱",
                            callback: (text) => {
                                vm.data.name = text;
                                gvc.notifyDataChange(id);
                            }
                        })
                    },
                    {
                        title: `認證跳轉`, html: gvc.glitter.htmlGenerate.editeInput({
                            gvc: gvc, title: ``, default: vm.data.link ?? "", placeHolder: "請輸入跳轉連結",
                            callback: (text) => {
                                vm.data.link = text;
                                gvc.notifyDataChange(id);
                            }
                        })
                    }
                ];
                return `<h3 class="border-bottom pb-3">公司審核</h3>

<div class="w-100 row m-0">
<table class="table">
<tr>
<td>用戶名稱</td>
<td>公司全名</td>
<td>公司統編</td>
<td>證明文件1</td>
<td>證明文件2</td>
<td>動作</td>
</tr>
${vm.data.map((dd) => {
                    return `<tr class="border-bottom">
<td>${dd.userData.fullName}</td>
<td>${dd.content.fullName}</td>
<td>${dd.content.idnumber}</td>
<td class="">
<i class="fa-solid fa-eye" onclick="${gvc.event(() => {
                        gvc.glitter.openDiaLog(new URL('../../dialog/image-preview.js', import.meta.url).href, 'preview', dd.content.frontImg);
                    })}"></i>
</td>
<td>
<i class="fa-solid fa-eye" onclick="${gvc.event(() => {
                        gvc.glitter.openDiaLog(new URL('../../dialog/image-preview.js', import.meta.url).href, 'preview', dd.content.backImg);
                    })}"></i>
</td>
<td>
<div class="d-flex">
<i class="fa-sharp fa-solid fa-xmark text-danger" style="font-size:30px;" onclick="${gvc.event(() => {
                        dd.content.status = -1;
                        dialog.dataLoading({
                            text: '加載中...',
                            visible: true
                        });
                        const saasConfig = window.saasConfig;
                        ApiPost.put({
                            "postData": dd.content
                        }, saasConfig.config.token)?.then((r) => {
                            setTimeout(() => {
                                dialog.dataLoading({ visible: false });
                            }, 1000);
                            location.reload();
                        });
                    })}"></i>
<i class="fa-duotone fa-check ms-2 text-success" style="font-size:30px;" onclick="${gvc.event(() => {
                        dd.content.status = 1;
                        dialog.dataLoading({
                            text: '加載中...',
                            visible: true
                        });
                        const saasConfig = window.saasConfig;
                        ApiPost.put({
                            "postData": dd.content
                        }, saasConfig.config.token)?.then((r) => {
                            setTimeout(() => {
                                dialog.dataLoading({ visible: false });
                            }, 1000);
                            location.reload();
                        });
                    })}"></i>
</div>
</td>
</tr>`;
                }).join('')}
</table>
</div>
<div class="w-100 d-flex border-top pt-3 my-2">
<div class="flex-fill"></div>
<button class="btn-warning btn" style="color:black;" onclick="${gvc.event(() => {
                })}">儲存</button>
</div>
`;
            },
            divCreate: {}
        };
    });
}, import.meta.url);
