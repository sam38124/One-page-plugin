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
            widget.data.title = widget.data.title ?? '合作夥伴';
            widget.data.list = widget.data.list ?? [
                {src: 'HOMEEAI', type: 'text'},
                {src: '橙的電子', type: 'text'},
                {src: '高雄醫學大學', type: 'text'},
                {src: '御天科技', type: 'text'},
                {src: '緒玹科技', type: 'text'},
                {src: '奇樂旅遊', type: 'text'},
                {src: '星澄基地', type: 'text'},
            ];
            const client = {
                title: widget.data.title,
                list: widget.data.list,
            };
            return {
                view: () => {
                    ScriptStyle1.initialScript(gvc, widget);
                    const cl = glitter.getUUID();
                    return gvc.bindView(() => {
                        return {
                            bind: cl,
                            view: () => {
                                return /*html*/ `<h2 class="h1 pb-3 pb-lg-4 text-center">${client.title}</h2>
                                        <div
                                            class="swiper mx-n2 swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden"
                                        >
                                            <div
                                                class="swiper-wrapper"
                                                id="swiper-wrapper-5fa6577aa9a310abb"
                                                aria-live="polite"
                                                style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;"
                                            >
                                                ${glitter.print(function () {
                                    var tmp = '';
                                    client.list.map((c: any, i: any) => {
                                        tmp += /*html*/ `
                                                            <div
                                                                class="swiper-slide py-3"
                                                                role="group"
                                                                aria-label="${i + 1} / ${client.list.length}"
                                                                style="width: 185.5px; margin-right: 8px;"
                                                            >
                                                                <div
                                                                    class="card card-body card-hover px-2 mx-2"
                                                                    style="min-width: 154px;min-height: 100px;"
                                                                >
                                                                    ${glitter.print(() => {
                                            switch (c.type) {
                                                case 'text':
                                                    return /*html*/ `<span
                                                                                    class="d-block mx-auto my-2 fw-bold fs-3"
                                                                                    style=""
                                                                                    >${c.src}</span
                                                                                >`;
                                                case 'image':
                                                    return `  <img src="${c.src}" class="d-block mx-auto my-2" width="154" alt="Brand" />`;
                                            }
                                        })}
                                                                </div>
                                                            </div>
                                                        `;
                                    });
                                    return tmp;
                                })}
                                            </div>

                                            <!-- Pagination (bullets) -->
                                            <div
                                                class="swiper-pagination position-relative pt-2 mt-4 swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"
                                            >
                                                <span
                                                    class="swiper-pagination-bullet"
                                                    tabindex="0"
                                                    role="button"
                                                    aria-label="Go to slide 1"
                                                ></span
                                                ><span
                                                    class="swiper-pagination-bullet"
                                                    tabindex="0"
                                                    role="button"
                                                    aria-label="Go to slide 2"
                                                ></span
                                                ><span
                                                    class="swiper-pagination-bullet swiper-pagination-bullet-active"
                                                    tabindex="0"
                                                    role="button"
                                                    aria-label="Go to slide 3"
                                                    aria-current="true"
                                                ></span>
                                            </div>
                                            <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                                        </div>`;
                            },
                            divCreate: {
                                elem: `section`,
                                class: `container pb-5 mt-4`,
                                style: ``,
                            },
                            onCreate: () => {
                                try{
                                    //@ts-ignore
                                    const swiper = new Swiper(`[gvc-id="${gvc.id(cl)}"] .swiper`, {
                                        slidesPerView: 2,
                                        pagination: {
                                            el: `[gvc-id="${gvc.id(cl)}"] .swiper-pagination`,
                                            clickable: true,
                                        },
                                        breakpoints: {
                                            '500': {
                                                slidesPerView: 3,
                                                spaceBetween: 8,
                                            },
                                            '650': {
                                                slidesPerView: 4,
                                                spaceBetween: 8,
                                            },
                                            '900': {
                                                slidesPerView: 5,
                                                spaceBetween: 8,
                                            },
                                            '1100': {
                                                slidesPerView: 6,
                                                spaceBetween: 8,
                                            },
                                        },
                                    });
                                }catch (e){
                                    setTimeout(()=>{
                                        gvc.notifyDataChange(cl)
                                    },100)
                                }
                            },
                        };
                    });
                },
                editor: () => {
                    return (
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: `區塊標題`,
                            default: widget.data.title,
                            placeHolder: '輸入區塊標題',
                            callback: (text) => {
                                widget.data.title = text;
                                widget.refreshComponent();
                            },
                        }) +
                        Editor.arrayItem({
                            originalArray:widget.data.list,
                            gvc: gvc,
                            title: '文字區塊內容',
                            array: widget.data.list.map((dd: any, index: number) => {
                                return {
                                    title: dd.src || `區塊:${index + 1}`,
                                    expand: dd,
                                    innerHtml: glitter.htmlGenerate.editeInput({
                                        gvc: gvc,
                                        title: `標題`,
                                        default: dd.src,
                                        placeHolder: '輸入標題名稱',
                                        callback: (text) => {
                                            dd.src = text;
                                            widget.refreshComponent();
                                        },
                                    }),
                                    minus: gvc.event(() => {
                                        widget.data.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data,
                            plus: {
                                title: '添加區塊',
                                event: gvc.event(() => {
                                    widget.data.list.push({src: '萊恩設計', type: 'text'});
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        })
                    );
                },
            };
        },
    }
})