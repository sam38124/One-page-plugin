import { Plugin } from "../../../glitterBundle/plugins/plugin-creater.js";
import { ScriptStyle1 } from "../script-style-1.js";
import { SharedView } from "../../commenPage/shareView.js";
import { Api } from "../../homee/api/homee-api.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            const sharedView = new SharedView(gvc);
                            const api = new Api();
                            let clock = 0;
                            let vm = {
                                loading: false,
                                data: []
                            };
                            return gvc.map([
                                sharedView.navigationBar({
                                    title: ``,
                                    leftIcon: `
<img class="" src="${new URL('../../img/component/left-arrow.svg', import.meta.url).href}" style="width: 24px;height: 24px;margin-right: 16px" alt="" onclick="${gvc.event(() => {
                                    })}">
 <input class="form-control flex-fill" style="
border-radius: 20px;
font-family: 'Noto Sans TC';
padding-left: 30px;
font-style: normal;
font-weight: 400;
background: url(https://stg-homee-api-public.s3.amazonaws.com/scene/undefined/1675061987473) no-repeat scroll 7px 7px,rgba(41, 41, 41, 0.1);;
background-size: 20px;
font-size: 14px;
line-height: 150%;
color: #858585;
width: calc(100vw - 80px);
" 
placeholder="大家都在搜尋:沙發" oninput="${gvc.event((e) => {
                                        clearInterval(clock);
                                        clock = setTimeout(() => {
                                            vm.loading = true;
                                            gvc.notifyDataChange('search');
                                            api.homeeAJAX({
                                                api: Api.serverURL,
                                                route: '/api/v1/product?product_name=' + e.value,
                                                method: 'get'
                                            }, (res) => {
                                                vm.data = res.product_list;
                                                vm.loading = false;
                                                console.log(vm);
                                            });
                                        }, 1000);
                                    })}">
`,
                                    rightIcon: ``
                                }),
                                gvc.bindView({
                                    bind: 'search',
                                    view: () => {
                                        return `<div class="w-100" style="padding-top: 40px;padding-bottom: 60px;">
${(vm.loading) ? `
<div class="w-100 d-flex align-items-center justify-content-center">
<div class="spinner-border text-black mx-auto"></div>
</div>
` : ``}
</div>`;
                                    },
                                    divCreate: {}
                                })
                            ]);
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return ``;
                }
            };
        },
    };
});
