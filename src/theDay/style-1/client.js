import { Plugin } from "../../glitterBundle/plugins/plugin-creater.js";
import { Editor } from "../../editor.js";
import { ScriptStyle1 } from "../script-style-1.js";
Plugin.createComponent(import.meta.url, (glitter, editMode) => {
    return {
        defaultData: {},
        render: (gvc, widget, setting, hoverID) => {
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    let id = glitter.getUUID();
                    let client = widget.data.client ?? {
                        clientLogo: [
                            { img: ScriptStyle1.getRout("assets/img/clients/client-1.png") },
                            { img: ScriptStyle1.getRout("assets/img/clients/client-2.png") },
                            { img: ScriptStyle1.getRout("assets/img/clients/client-3.png") },
                            { img: ScriptStyle1.getRout("assets/img/clients/client-4.png") },
                            { img: ScriptStyle1.getRout("assets/img/clients/client-5.png") },
                            { img: ScriptStyle1.getRout("assets/img/clients/client-6.png") }
                        ],
                    };
                    if (!widget.data.client) {
                        widget.data.client = client;
                    }
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            return `
                            <!-- ======= Clients Section ======= -->
                            <section id="client" class="clients">
                              <div class="container" data-aos="zoom-in">
                                <div class="row d-flex align-items-center">
                                ${glitter.print(function () {
                                let tmp = "";
                                client.clientLogo.map((c) => {
                                    tmp += `
                                      <div class="col-lg-2 col-md-4 col-6">
                                        <img src="${c.img}" class="img-fluid" alt="" />
                                      </div>
                                    `;
                                });
                                return tmp;
                            })}
                                </div>
                              </div>
                            </section>
                            <!-- End Clients Section -->
                            `;
                        }, divCreate: {},
                        onCreate: () => {
                            AOS.init();
                        }
                    });
                },
                editor: () => {
                    return gvc.map([
                        Editor.arrayItem({
                            originalArray: widget.data.client,
                            gvc: gvc,
                            title: '區塊內容',
                            array: widget.data.client.clientLogo.map((dd, index) => {
                                return {
                                    title: `用戶:${index + 1}`,
                                    expand: dd,
                                    innerHtml: gvc.map([
                                        Editor.uploadImage({
                                            gvc: gvc,
                                            title: '用戶圖片',
                                            def: dd.img,
                                            callback: (data) => {
                                                dd.img = data;
                                                widget.refreshComponent();
                                            }
                                        })
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.list.clientLogo.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.client,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.client.clientLogo.push({ img: "" });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent: () => {
                                widget.refreshComponent();
                            }
                        })
                    ]);
                }
            };
        },
    };
});
