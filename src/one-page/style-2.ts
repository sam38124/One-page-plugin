import { HtmlJson, Plugin } from '../glitterBundle/plugins/plugin-creater.js';
import { Glitter } from '../glitterBundle/Glitter.js';
import { GVC } from '../glitterBundle/GVController';
import { Editor } from '../editor';
import { ClickEvent } from '../glitterBundle/plugins/click-event';

Plugin.create(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        keyVision: {
            title: '主視覺',
            subContent: '網站進入時的首頁主視覺',
            defaultData: {},
            render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
                widget.data = {
                    title: {
                        text: widget.data.title.text ?? '未定義',
                        color: widget.data.title.color ?? 'white',
                        size: widget.data.title.size ?? 36,
                        padding: {
                            top: 20,
                            bottom: 20,
                            left: 8,
                            right: 8,
                        },
                    },
                    btnList: [
                        { name: '線上演示', icon: 'bx bx-play-circle', color: 'primary', hyperLink: '' },
                        { name: '立即開始', icon: 'bx bx-chevron-right', color: 'danger', hyperLink: '' },
                    ],
                    lottie: [
                        {
                            displayOrder: 0,
                            json: 'https://assets5.lottiefiles.com/packages/lf20_xfx6wio6.json',
                            size: 32,
                            top: 30,
                            right: 12,
                        },
                        {
                            displayOrder: 1,
                            json: 'https://assets1.lottiefiles.com/packages/lf20_mnn2ubr9.json',
                            size: 30,
                            top: 7,
                            right: 30,
                        },
                    ],
                };
                return {
                    view: () => {
                        return /*html*/ `
                            <div class="vh-100 area" style="">


            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
                                <div
                                    class="col-md-5"
                                    style="padding:${widget.data.title.padding.top}% ${widget.data.title.padding.right}% ${
                            widget.data.title.padding.bottom
                        }% ${widget.data.title.padding.left}%"
                                >
                                    <div><h2 style="color: ${widget.data.title.color}">${widget.data.title.text}</h2></div>
                                    <div class="w-100 d-flex flex-wrap">
                                        ${glitter.print(() => {
                                            let h = '';
                                            widget.data.btnList.map(
                                                (x: { name: string; icon: string; color: string; hyperLink: string }) => {
                                                    h += /*html*/ `<div
                                                    class="btn btn-${x.color} fs-lg text-center text-md-start flex-fill mx-2 d-flex align-items-center"
                                                >
                                                    ${x.name}<i class="${x.icon} ms-1 fs-4"></i>
                                                </div>`;
                                                }
                                            );
                                            return h;
                                        })}
                                    </div>
                                </div>
                                <div class="col-md-7">
                                    ${glitter.print(() => {
                                        let h = '';
                                        const bi = Number($(window).width()) / 1920;
                                        widget.data.lottie.map(
                                            (x: { displayOrder: number; json: string; size: number; top: number; right: number }) => {
                                                h += /*html*/ `<div
                                                    class=""
                                                    style="position: absolute; top: ${x.top}%; right: ${x.right}%; z-index:${
                                                    x.displayOrder
                                                }"
                                                >
                                                    <lottie-player
                                                        autoplay
                                                        loop
                                                        mode="normal"
                                                        src="${x.json}"
                                                        style="width: ${x.size * bi}em;"
                                                    >
                                                    </lottie-player>
                                                </div>`;
                                            }
                                        );
                                        return h;
                                    })}
                                </div>
                            </div>
    </div >
                        `;
                    },
                    editor: () => {
                        return gvc.map([]);
                    },
                };
            },
        },
    };
});
