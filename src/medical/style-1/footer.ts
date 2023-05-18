import {HtmlJson, Plugin} from "../../glitterBundle/plugins/plugin-creater.js";
import {Glitter} from "../../glitterBundle/Glitter.js";
import {GVC} from "../../glitterBundle/GVController.js";
import {ClickEvent} from "../../glitterBundle/plugins/click-event.js";
import {Editor} from "../../editor.js";
import {ScriptStyle1} from "../script-style-1.js";

Plugin.createComponent(import.meta.url, (glitter: Glitter, editMode: boolean) => {
    return {
        defaultData: {},
        render: (gvc: GVC, widget: HtmlJson, setting: HtmlJson[], hoverID: string[]) => {
            return {
                view:()=>{

                    ScriptStyle1.initialScript(gvc,widget)
                    let id = glitter.getUUID()
                    widget.data.logo = widget.data.logo??ScriptStyle1.getRout("assets/img/logo.svg");
                    widget.data.mark = widget.data.mark ?? "Silicon";
                    widget.data.desc = widget.data.desc ?? "Proin ipsum pharetra, senectus eget scelerisque varius pretium platea velit. Lacus, eget eu vitae nullam proin turpis etiam mi sit. Non feugiat feugiat egestas nulla nec. Arcu tempus, eget elementum dolor ullamcorper sodales ultrices eros.";
                    widget.data.email = widget.data.email ?? "email@example.com";
                    widget.data.anchorList = widget.data.anchorList??{
                        list:[
                            {
                                name:"Home",
                                anchor:""
                            },
                            {
                                name:"About",
                                anchor:""
                            },
                            {
                                name:"Services",
                                anchor:""
                            },
                            {
                                name:"Prices",
                                anchor:""
                            },
                            {
                                name:"News",
                                anchor:""
                            },
                        ]
                    };
                    widget.data.infList = widget.data.infList??{
                        list:[
                            {
                                name:"Terms &amp; Conditions",
                                href:""
                            },
                            {
                                name:"Privacy Policy",
                                href:""
                            }
                        ]
                    };
                    widget.data.socialList = widget.data.socialList??{
                        list:[
                            {
                                name:"Facebook",
                                href:""
                            },
                            {
                                name:"LinkedIn",
                                href:""
                            },
                            {
                                name:"Twitter",
                                href:""
                            },
                            {
                                name:"Instagram",
                                href:""
                            },
                        ]
                    };


                    return gvc.bindView({
                        bind:id,
                        view:()=>{
                            let footer:{
                                logo:string,
                                mark:string,
                                desc:string
                                anchorList:{
                                    list:{
                                        name:string,
                                        anchor:string,
                                    }[]
                                },
                                infList:{
                                    list:{
                                        name:string,
                                        href:string,
                                    }[]
                                },
                                socialList:{
                                    list:{
                                        name:string,
                                        href:string,
                                    }[]
                                },
                                email:string
                            } = {
                                logo : widget.data.logo,
                                mark : widget.data.mark,
                                desc : widget.data.desc,
                                anchorList : widget.data.anchorList,
                                infList : widget.data.infList,
                                socialList : widget.data.socialList,
                                email:widget.data.email
                            }
                            return `
                            <!-- Footer -->
    <footer class="footer bg-secondary pt-5 pb-4 pb-lg-5">
      <div class="container pt-lg-4">
        <div class="row pb-5">
          <div class="col-lg-4 col-md-6">
            <div class="navbar-brand text-dark p-0 me-0 mb-3 mb-lg-4">
              <img src="${footer.logo}" width="47" alt="Silicon">
              ${footer.mark}
            </div>
            <p class="fs-sm pb-lg-3 mb-4">${footer.desc}</p>
            <form class="needs-validation" novalidate>
              <label for="subscr-email" class="form-label">訂閱我們的最新消息</label>
              <div class="input-group">
                <input type="email" id="subscr-email" class="form-control rounded-start ps-5" placeholder="Your email" required>
                <i class="bx bx-envelope fs-lg text-muted position-absolute top-50 start-0 translate-middle-y ms-3 zindex-5"></i>
                <div class="invalid-tooltip position-absolute top-100 start-0">請輸入您的電子信箱</div>
                <button type="submit" class="btn btn-primary">訂閱</button>
              </div>
            </form>
          </div>
          <div class="col-xl-6 col-lg-7 col-md-5 offset-xl-2 offset-md-1 pt-4 pt-md-1 pt-lg-0">
            <div id="footer-links" class="row">
              <div class="col-lg-4">
                <h6 class="mb-2">
                  <a href="#useful-links" class="d-block text-dark dropdown-toggle d-lg-none py-2" data-bs-toggle="collapse">Useful Links</a>
                </h6>
                <div id="useful-links" class="collapse d-lg-block" data-bs-parent="#footer-links">
                  <ul class="nav flex-column pb-lg-1 mb-lg-3">
                    ${(()=>{
                        let html = ``;
                        footer.anchorList.list.map((data)=>{
                            html+=`
                                <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">${data.name}</a></li>
                            `
                        })
                        return html    
                    })()}            
                  </ul>
                  <ul class="nav flex-column mb-2 mb-lg-0">
                    ${(()=>{
                        let html = ``;
                        footer.infList.list.map((data)=>{
                            html+=`
                        <li class="nav-item"><a href="${data.href}" class="nav-link d-inline-block px-0 pt-1 pb-2">${data.name}</a></li>
                    `
                        })
                        return html
                    })()}  
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-lg-3">
                <h6 class="mb-2">
                  <a href="#social-links" class="d-block text-dark dropdown-toggle d-lg-none py-2" data-bs-toggle="collapse">Socials</a>
                </h6>
                <div id="social-links" class="collapse d-lg-block" data-bs-parent="#footer-links">
                  <ul class="nav flex-column mb-2 mb-lg-0">
                    ${(()=>{
                        let html = ``;
                        footer.infList.list.map((data)=>{
                            html+=`
                                <li class="nav-item"><a href="${data.href}" class="nav-link d-inline-block px-0 pt-1 pb-2">${data.name}</a></li>
                            `
                        })
                        return html
                    })()}  
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Facebook</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">LinkedIn</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Twitter</a></li>
                    <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Instagram</a></li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-4 col-lg-5 pt-2 pt-lg-0">
                <h6 class="mb-2">Contact Us</h6>
                <a href="mailto:${footer.email}" class="fw-medium">${footer.email}</a>
              </div>
            </div>
          </div>
        </div>
        <p class="nav d-block fs-xs text-center text-md-start pb-2 pb-lg-0 mb-0">
          &copy; All rights reserved. Made by 
          <a class="nav-link d-inline-block p-0" href="https://liondesign.tw/glitter/?page=index" target="_blank" rel="noopener">liondesign</a>
        </p>
      </div>
    </footer>


    <!-- Back to top button -->
    <a id="toTop" href="#top" class="btn-scroll-top" data-scroll>
      <span class="btn-scroll-top-tooltip text-muted fs-sm me-2">Top</span>
      <i class="btn-scroll-top-icon bx bx-chevron-up"></i>
    </a>
                            `
                        },divCreate:{},
                        onCreate:()=>{
                            // 监听滚动事件
                            window.addEventListener('scroll', function() {

                                var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

                                var scrollDistance = window.pageYOffset || document.documentElement.scrollTop;

                                var threshold = viewportHeight;
                                let targetElement = document.getElementById('toTop');
                                if (scrollDistance > threshold) {
                                    targetElement!.classList.add('show')
                                } else {
                                    targetElement!.classList.remove('show')
                                }
                            });


                        }

                    })
                },
                editor:()=>{
                    return gvc.map([
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: 'icon旁的文字',
                            default: widget.data.mark,
                            placeHolder: '請輸入文字',
                            callback: (text) => {
                                widget.data.mark = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeText({
                            gvc: gvc,
                            title: '請輸入簡文敘述',
                            default: widget.data.desc,
                            placeHolder: '請輸入文字',
                            callback: (text) => {
                                widget.data.desc = text;
                                widget.refreshComponent();
                            },
                        }),
                        glitter.htmlGenerate.editeInput({
                            gvc: gvc,
                            title: '請輸入聯絡信箱',
                            default: widget.data.email,
                            placeHolder: '請輸入信箱',
                            callback: (text) => {
                                widget.data.email = text;
                                widget.refreshComponent();
                            },
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.anchorList,
                            gvc: gvc,
                            title: '網頁錨點',
                            array: widget.data.anchorList.list.map((data: any, index: number) => {
                                return {
                                    title: data.name || `區段:${index + 1}`,
                                    expand: data,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '錨點名稱',
                                            default: data.name,
                                            placeHolder: '請輸入此錨點的名稱',
                                            callback: (text) => {
                                                data.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.anchorList.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.anchorList,
                            plus: {
                                title: '添加錨點',
                                event: gvc.event(() => {
                                    widget.data.anchorList.list.push( {
                                        name:"Home",
                                        anchor:""
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.infList,
                            gvc: gvc,
                            title: '更多資訊',
                            array: widget.data.infList.list.map((data: any, index: number) => {
                                return {
                                    title: data.name || `資訊:${index + 1}`,
                                    expand: data,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '資訊名稱',
                                            default: data.name,
                                            placeHolder: '請輸入此資訊的名稱',
                                            callback: (text) => {
                                                data.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '超連結',
                                            default: data.href,
                                            placeHolder: '請輸入此資訊的超連結',
                                            callback: (text) => {
                                                data.href = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.infList.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.infList,
                            plus: {
                                title: '添加資訊',
                                event: gvc.event(() => {
                                    widget.data.anchorList.list.push( {
                                        name:"Information",
                                        href:""
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                        Editor.arrayItem({
                            originalArray:widget.data.socialList,
                            gvc: gvc,
                            title: '社群連結',
                            array: widget.data.socialList.list.map((data: any, index: number) => {
                                return {
                                    title: data.name || `社群資訊:${index + 1}`,
                                    expand: data,
                                    innerHtml: gvc.map([
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '社群名稱',
                                            default: data.name,
                                            placeHolder: '請輸入此社群的名稱',
                                            callback: (text) => {
                                                data.name = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                        glitter.htmlGenerate.editeInput({
                                            gvc: gvc,
                                            title: '個人網頁網址',
                                            default: data.href,
                                            placeHolder: '請輸入網址',
                                            callback: (text) => {
                                                data.href = text;
                                                widget.refreshComponent();
                                            },
                                        }),
                                    ]),
                                    minus: gvc.event(() => {
                                        widget.data.infList.list.splice(index, 1);
                                        widget.refreshComponent();
                                    }),
                                };
                            }),
                            expand: widget.data.socialList,
                            plus: {
                                title: '添加資訊',
                                event: gvc.event(() => {
                                    widget.data.socialList.list.push( {
                                        name:"Facebook",
                                        href:""
                                    });
                                    widget.refreshComponent();
                                }),
                            },
                            refreshComponent:()=>{
                                widget.refreshComponent()
                            }
                        }),
                    ])

                }
            }
        },
    }
})