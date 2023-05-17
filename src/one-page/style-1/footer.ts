import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {TriggerEvent} from "../../glitterBundle/plugins/trigger-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            widget.data.logoStyle=widget.data.logoStyle??{}
            widget.data.outro = widget.data.outro ?? {
                img: ScriptStyle1.getRout(`img/index/logoFull.svg`),
                title: '萊恩設計',
                desc: '無論是套版工具或客製化整合，我們的開發團隊能提供<br />網頁／Android／iOS 的開發服務，將您的想法變成現實！',
            };
            widget.data.copyRight =
                widget.data.copyRight ??
                `Copyright &copy; ${new Date().getFullYear()}
        <a href="https://squarestudio.tw" target="_blank" rel="noreferrer noopener" style="cursor:pointer;color:ivory;"
          >Lion Design</a
        >
        All Rights Reserved.`;
            widget.data.info = widget.data.info ?? [
                {icon: 'bx bx-map', title: '台中市臺灣大道二段285號20樓'},
                {icon: 'bx bx-phone-call', title: '(886) 0978-028-730'},
                {
                    icon: 'bx bx-time',
                    title: /*html*/ `<span class="text-dark fw-semibold me-1">週一至週五</span> 09:00 AM – 19:00 PM`,
                },
                {
                    icon: 'bx bx-envelope',
                    title: /*html*/ `<a class="sent_mail" href="mailto:sam38124@gmail.com"> sam38124@gmail.com</a>`,
                },
            ];

            widget.data.copyRight=widget.data.copyRight??`Copyright &copy; ${new Date().getFullYear()}
        <a href="https://liondesign.tw/lionDesign/" target="_blank" rel="noreferrer noopener" style="cursor:pointer;color:ivory;">Lion Design</a>
        All Rights Reserved.`
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    const footer = {
                        outro: widget.data.outro,
                        info: widget.data.info,
                        btnList: widget.data.btnList,
                    };
                    return /*html*/ `<footer class="footer   pb-4 pb-lg-5 border-top" id="footer">
                                <div class="container pt-lg-4">
                                    <div class="row pb-0">
                                        <div class="col-sm-4">
                                            <div class="navbar-brand text-dark fs-4 p-0 me-0 mb-2 mb-lg-4 mt-2 mt-sm-0" style="">
                                                <img src="${footer.outro.img}" class="${glitter.htmlGenerate.styleEditor(widget.data.logoStyle).class()}" width="50" alt="Lion Design"
                                                 style="margin-right: 10px;${glitter.htmlGenerate.styleEditor(widget.data.logoStyle).style()}" />
                                                ${footer.outro.title}
                                            </div>
                                            <p class="text-muted  pb-lg-3 mb-2">${footer.outro.desc}</p>
                                        </div>
                                        <div class="col-sm-6 offset-xl-2 offset-md-1 pt-2 pt-md-1 pt-lg-0">
                                            <div class="w-100">
                                                <ul class="list-unstyled pb-3 mb-0 mb-lg-3">
                                                    <!-- Footer info -->
                                                    ${glitter.print(function () {
                        var tmp = '';
                        footer.info.map((n: any) => {
                            tmp += /*html*/ /*html*/ `<li class="d-flex mb-3">
                                                                <i class="${n.icon} text-muted fs-xl mt-1 me-2"></i>${n.title}
                                                            </li> `;
                        });
                        return tmp;
                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="fs-xs text-center text-md-start pb-2 pb-lg-0 mb-0 mt-3 mt-sm-0">${widget.data.copyRight}</p>
                                </div>
                            </footer>
                            ${glitter.print(function () {
                        var tmp = '';
                        footer.btnList.map((l: any, i: any) => {
                            var style = '';
                            Object.keys(l.style ?? []).map((s) => (style += `${s}:${l.style[s]};`));
                            tmp += /*html*/ /*html*/ `<a
                                        class="btn-conner"
                                        id="conner${i}"
                                        style="cursor:pointer;${style}"
                                        onclick="${gvc.event(l.click)}"
                                    >
                                        <span class="btn-conner-tooltip text-muted fs-lg me-2">${l.tip}</span>
                                        ${
                                l.img
                                    ? /*html*/ `<img src="${l.img}" width="40"></img>`
                                    : /*html*/ `<i class="btn-conner-icon ${l.icon}"></i>`
                            }
                                    </a>`;
                        });
                        return tmp;
                    })}
                            <a class="btn-scroll-top" href="#top" data-scroll>
                                <span class="btn-scroll-top-tooltip text-muted fs-lg me-2">Top</span>
                                <i class="btn-scroll-top-icon bx bx-chevron-up"></i>
                            </a>`;
                },
                editor: () => {

                    return gvc.map([
                        glitter.htmlGenerate.styleEditor(widget.data.logoStyle).editor(gvc,()=>{
                            widget.refreshComponent()
                        },'Logo設計樣式'),
                        Editor.uploadImage({
                            gvc: gvc,
                            title: `Logo圖標`,
                            def: widget.data.outro.img,
                            callback: (data) => {
                                widget.data.outro.img = data;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '標題',
                            default: widget.data.outro.title,
                            placeHolder: '標題',
                            callback: (text) => {
                                widget.data.outro.title = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '描述',
                            default: widget.data.outro.desc,
                            placeHolder: '描述',
                            callback: (text) => {
                                widget.data.outro.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '版權所有',
                            default: widget.data.copyRight,
                            placeHolder: '版權所有',
                            callback: (text) => {
                                widget.data.copyRight = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            gvc: gvc,
                            title: '聯絡條目',
                            originalArray:widget.data.info,
                            array: widget.data.info.map((dd: any, index: number) => {
                                return {
                                    title: `條目:${index + 1}`,
                                    expand: dd,
                                    innerHtml:
                                        Editor.fontawesome({
                                            title: 'icon',
                                            gvc: gvc,
                                            def: dd.icon,
                                            callback: (text: string) => {
                                                dd.icon = text;
                                            },
                                        }) +
                                        glitter.htmlGenerate.editeText({
                                            gvc: gvc,
                                            title: `標題`,
                                            default: dd.title,
                                            placeHolder: '輸入標題',
                                            callback: (text) => {
                                                dd.title = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    minus: gvc.event(() => {
                                        widget.data.infoList.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.infoList.push({
                                        icon: 'bx bx-map',
                                        title: '台中市北屯區後庄北路18號',
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                    ]);
                },
            };
        },
    }
})