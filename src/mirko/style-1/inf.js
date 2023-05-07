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
                    widget.data.dataList = widget.data.dataList ?? [
                        { icon: "fa-user-tie", title: "完整服務", desc: "專人提供聯絡，良好的需求溝通管道與理解速度" },
                        { icon: "fa-tools", title: "優質技術", desc: "使用業界上最成熟的技術，生產過許多類型的產品與樣板" },
                        { icon: "fa-clock", title: "兩年維護", desc: "產品完成後，我們將提供兩年的免費保固維護" },
                    ];
                    return gvc.bindView({
                        bind: id,
                        view: () => {
                            let info = widget.data.dataList;
                            return `
        <section class="information">
          <div class="container-fluid">
            <div class="row text-light">
              ${glitter.print(function () {
                                var HTML = "";
                                info.map((inf) => {
                                    HTML += `
                    <div class="col-lg text-center p-5" data-aos="zoom-in">
                      <i class="fas ${inf.icon} fa-3x p-2"></i>
                      <h4 class="py-3">${inf.title}</h4>
                      <p class="para-light">${inf.desc}</p>
                    </div>
                  `;
                                });
                                return HTML;
                            })}
            </div>
          </div>
        </section>
      `;
                        }, divCreate: {},
                        onCreate: () => {
                        }
                    });
                },
                editor: () => {
                    return Editor.arrayItem({
                        originalArray: widget.data.dataList,
                        gvc: gvc,
                        title: '區塊內容',
                        array: widget.data.dataList.map((dd, index) => {
                            return {
                                title: dd.title || `區塊:${index + 1}`,
                                expand: dd,
                                innerHtml: gvc.map([
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `標題`,
                                        default: dd.title,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.title = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `敘述`,
                                        default: dd.desc,
                                        placeHolder: '輸入敘述文字',
                                        callback: (text) => {
                                            dd.desc = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    Editor.fontawesome({
                                        title: 'icon',
                                        gvc: gvc,
                                        def: dd.icon,
                                        callback: (text) => {
                                            dd.icon = text;
                                        },
                                    })
                                ]),
                                minus: gvc.event(() => {
                                    widget.data.dataList.splice(index, 1);
                                    widget.refreshComponent();
                                }),
                            };
                        }),
                        expand: widget.data,
                        plus: {
                            title: '添加區塊',
                            event: gvc.event(() => {
                                widget.data.dataList.push({ icon: "fa-user-tie", title: "完整服務", desc: "專人提供聯絡，良好的需求溝通管道與理解速度" });
                                widget.refreshComponent();
                            }),
                        },
                        refreshComponent: () => {
                            widget.refreshComponent();
                        }
                    });
                }
            };
        },
    };
});
